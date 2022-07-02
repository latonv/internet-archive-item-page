import { ArchiveFile } from './ArchiveFile';
import { getMediaType, MediaType } from './MediaType';

/**
 * Raw data shape for archive.org items obtained from the Metadata API
 */
export type ArchiveItemData = {
  metadata?: ArchiveItemMetadata,
  files?: unknown[],
  [key: string]: unknown
};

/**
 * Raw data shape for an item's metadata object
 */
export type ArchiveItemMetadata = {
  identifier?: string,
  title?: string,
  description?: string | string[],
  addeddate?: string,
  creator?: string | string[],
  date?: string,
  language?: string | string[],
  licenseurl?: string,
  mediatype?: string,
  subject?: string | string[], // Some items seem to allow semicolon-delimited subjects within a single string
  uploader?: string,
  [key: string]: string | string[] | undefined
};

/**
 * ArchiveItem field keys that can be mapped directly onto their data object properties.
 */
type DirectMappableFieldKey = 'identifier' | 'title' | 'uploader';

/**
 * Data object representing metadata about an item in the Internet Archive.
 * 
 * All required fields and several other commonly-used fields are available as named properties.
 * Other metadata not included as a named property is available in the `otherMetadata` map.
 */
export class ArchiveItem {

  /**
   * The unique identifier for this item.
   */
  public readonly identifier: string;

  /**
   * The title for this item.
   */
  public readonly title?: string;
  
  /**
   * The description for this item. Note this may contain formatting in HTML/CSS.
   * 
   * @see https://archive.org/services/docs/api/metadata-schema/index.html#description
   */
  public readonly description?: string | string[];

  /**
   * For 2019-12 and later dates: represents the time the item was added to the public search engine.
   * 
   * Earlier dates: Date and time in UTC that the item was created on archive.org.
   * 
   * @see https://archive.org/services/docs/api/metadata-schema/index.html#addeddate
   */
  public readonly addedDate: Date;

  /**
   * The person or organization who created this item (possibly accompanied by birth/death years).
   * 
   * @see https://archive.org/services/docs/api/metadata-schema/index.html#creator
   */
  public readonly creator?: string | string[];

  /**
   * The publication date of this item.
   * 
   * @see https://archive.org/services/docs/api/metadata-schema/index.html#date
   */
  public readonly publicationDate?: Date;

  /**
   * The language(s) this item is written or recorded in (if applicable).
   * Should usually be either the full name of the language or a 3-letter MARC code.
   * 
   * @see https://archive.org/services/docs/api/metadata-schema/index.html#language
   */
  public readonly language?: string | string[];

  /**
   * A URL pointing to the license under which this media is released.
   * 
   * @see https://archive.org/services/docs/api/metadata-schema/index.html#licenseurl
   */
  public readonly licenseURL?: string;

  /**
   * The type of media this item contains.
   * 
   * @see https://archive.org/services/docs/api/metadata-schema/index.html#mediatype
   */
  public readonly mediaType: MediaType;

  /**
   * An array of strings representing the subjects or topics this item relates to.
   * 
   * @see https://archive.org/services/docs/api/metadata-schema/index.html#subject
   */
  public readonly subjectTags?: string[];

  /**
   * The email address of the user who uploaded this item.
   * 
   * @see https://archive.org/services/docs/api/metadata-schema/index.html#uploader
   */
  public readonly uploader: string;

  /**
   * An array of files attached to this item.
   */
  public readonly files: ArchiveFile[];

  /**
   * All other metadata about this item not covered by ArchiveItem class fields,
   * including custom metadata.
   */
  public readonly otherMetadata: Map<string, string | string[]>;

  /**
   * The raw metadata keys that are mapped onto properties of this class
   */
  private static readonly MAPPED_METADATA_KEYS = new Set([
    'identifier',
    'addeddate',
    'creator',
    'date',
    'description',
    'language',
    'licenseurl',
    'mediatype',
    'subject',
    'title',
    'uploader'
  ]);

  /**
   * @param data Raw data for an archived item (from the Metadata API)
   */
  constructor(data: ArchiveItemData) {

    if ('metadata' in data && typeof data.metadata === 'object') {
      const metadataFields = data.metadata;

      /* Some string fields can be set directly from the input data */

      for (const key of ['identifier', 'title', 'uploader'] as DirectMappableFieldKey[]) {
        this[key] = metadataFields[key] ?? null;
      }

      /* Other fields either need special handling or must be set individually to avoid type mismatch */

      if ('description' in metadataFields) {
        this.description = metadataFields.description;
      }
      
      if ('addeddate' in metadataFields) {
        this.addedDate = new Date(metadataFields.addeddate);
      }

      if ('creator' in metadataFields) {
        this.creator = metadataFields.creator;
      }

      // Convert date string into a Date object
      if ('date' in metadataFields) {
        this.publicationDate = new Date(metadataFields.date);
      }

      if ('language' in metadataFields) {
        this.language = metadataFields.language;
      }

      if ('licenseurl' in metadataFields) {
        this.licenseURL = metadataFields.licenseurl;
      }

      // Convert media type into an internal enum
      if ('mediatype' in metadataFields) {
        this.mediaType = getMediaType(metadataFields.mediatype);
      }

      if ('subject' in metadataFields) {
        // Either already an array, or a comma-delimited string that can be split into an array
        if (Array.isArray(metadataFields.subject)) {
          this.subjectTags = metadataFields.subject;
        } else {
          this.subjectTags = metadataFields.subject.split(/;\s?/);
        }
      }

      // Store all other metadata fields in the `otherMetadata` Map
      const otherMetadataEntries = [...Object.entries(metadataFields)]
        .filter(([key]) => !ArchiveItem.MAPPED_METADATA_KEYS.has(key));
      this.otherMetadata = new Map(otherMetadataEntries);
    }

    if ('files' in data && Array.isArray(data.files)) {
      this.files = [];
      for (const fileData of data.files) {
        try {
          this.files.push(new ArchiveFile(fileData));
        } catch (err) {
          console.error('Invalid file data:', fileData);
        }
      }
    }
  }

  public toString(): string {
    return JSON.stringify(this, (key, val) => {
      if (val instanceof Map) {
        return [...val];
      } else {
        return val;
      }
    }, 2);
  }
}