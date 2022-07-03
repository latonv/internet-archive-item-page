import { ArchiveItem, ArchiveItemMetadata } from './ArchiveItem';

/**
 * Expected raw data shape for a related archive item, containing some but not all of the item's metadata fields.
 * Some fields are named/typed a bit differently than in the item metadata API.
 */
export type RelatedItemMetadata = {
  _id?: string, // identifier
  _source?: {
    title?: string | string[],
    description?: string | string[],
    downloads?: number | number[],
    collection?: string | string[],
    creatorSorter?: string | string[],
    publicdate?: string | string[],
    mediatype?: string | string[],
    subjectSorter?: string | string[],
  }
};

export class RelatedItem extends ArchiveItem {

  constructor(data: RelatedItemMetadata) {
    // Convert the related item's data into something the super constructor can ingest
    const normalizedData: ArchiveItemMetadata = {};

    if ('_id' in data) {
      normalizedData.identifier = data._id;
    }

    if ('_source' in data) {
      const source = data._source;

      // ArchiveItem expects a single title, not an array
      if ('title' in source) {
        normalizedData.title = RelatedItem.normalizeArrayProperty(source.title);
      }

      if ('description' in source) {
        normalizedData.description = source.description;
      }

      if ('downloads' in source) {
        normalizedData.downloads = String(RelatedItem.normalizeArrayProperty(source.downloads));
      }

      if ('collection' in source) {
        normalizedData.collection = source.collection;
      }

      if ('creatorSorter' in source) {
        normalizedData.creator = source.creatorSorter;
      }

      // ArchiveItem expects a single publication date, not an array
      if ('publicdate' in source) {
        normalizedData.date = RelatedItem.normalizeArrayProperty(source.publicdate);
      }

      // ArchiveItem expects a single media type, not an array
      if ('mediatype' in source) {
        normalizedData.mediatype = RelatedItem.normalizeArrayProperty(source.mediatype);
      }

      if ('subjectSorter' in source) {
        normalizedData.subject = source.subjectSorter;
      }
    }

    super({ metadata: normalizedData });
  }

  /**
   * Convenience method to collapse an argument that may or may not be an array type down to its element type.
   * 
   * If the argument is an array, the first element of the array is returned. The assumption is that for
   * related items, any array received for a non-repeatable item property should be a singleton array.
   * 
   * @param prop An object which may or may not be an array
   */
  private static normalizeArrayProperty<T>(prop: T | T[]): T {
    return (Array.isArray(prop) ? prop[0] : prop);
  }
}