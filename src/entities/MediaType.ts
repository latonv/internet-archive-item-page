/**
 * An enum of possible media types for an item in the archive.
 * 
 * @see https://archive.org/services/docs/api/metadata-schema/index.html#mediatype
 */
export enum MediaType {

  /**
   * Books, articles, newspapers, magazines, any documents with content that contains text.
   */
  TEXTS,

  /**
   * Live music concerts; items should only be uploaded for artists with collections in the
   * etree "Live Music Archive" community.
   */
  ETREE,

  /**
   * Any item where the main media content is audio files, like FLAC, mp3, WAV, etc.
   */
  AUDIO,

  /**
   * Any item where the main media content is video files, like mpeg, mov, avi, etc.
   */
  MOVIES,

  /**
   * Any item where the main media content is software intended to be run on a computer or
   * related device such as gaming devices, phones, etc.
   */
  SOFTWARE,

  /**
   * Any item where the main media content is image files (but is not a book or other text
   * item), like jpeg, gif, tiff, etc.
   */
  IMAGE,

  /**
   * Any item where the main content is not media or web pages, such as data sets.
   */
  DATA,

  /**
   * Any item where the main content is copies of web pages, usually stored in WARC or
   * ARC format.
   */
  WEB,

  /**
   * Designates the item as a collection that can "contain" other items.
   */
  COLLECTION,
  
  /**
   * Designates the item as being a user account page; can only be set by internal
   * archive systems.
   */
  ACCOUNT
}

/**
 * Convenience function to convert a lower-case media type key to its corresponding
 * enum value, if possible.
 * 
 * @param key A string representing of the valid media type strings defined at
 * https://archive.org/services/docs/api/metadata-schema/index.html#mediatype
 * @returns The MediaType enum value associated with that string, or null if an
 * invalid key is provided.
 */
export function getMediaType(key: string): MediaType | null {
  const upperKey = key.toUpperCase();

  if (upperKey in MediaType) {
    return MediaType[upperKey as keyof typeof MediaType];
  } else {
    return null;
  }
}

/**
 * Returns an emoji loosely representing the given media type.
 * 
 * @param type The MediaType to get an emoji for
 * @returns The corresponding emoji as a string, or an empty string if provided an invalid media type.
 */
export function getEmoji(type: MediaType): string {
  switch (type) {
  case MediaType.TEXTS:
    return '📖';
  case MediaType.ETREE:
    return '🎸';
  case MediaType.AUDIO:
    return '🎧';
  case MediaType.MOVIES:
    return '🎞️';
  case MediaType.SOFTWARE:
    return '💿';
  case MediaType.IMAGE:
    return '🖼️';
  case MediaType.DATA:
    return '📊';
  case MediaType.WEB:
    return '🌐';
  case MediaType.COLLECTION:
    return '📂';
  case MediaType.ACCOUNT:
    return '👤';
  default:
    return '';
  }
}