import { ArchiveItem } from '../entities/ArchiveItem';
import { RelatedItem } from '../entities/RelatedItem';

/**
 * An interface specifying the API methods required by components (should be simple to mock for testing).
 */
export interface APIAdapter {

  /**
   * Retrieves metadata for the item with the given identifier on the Internet Archive.
   * 
   * @param identifier The item identifier to retrieve metadata for
   * @returns A promise resolving to an ArchiveItem representing the fetched data, or rejecting if
   * an error is encountered.
   */
  fetchItemMetadata(identifier: string): Promise<ArchiveItem>;

  /**
   * Retrieves a list of related items for the given identifier.
   * 
   * @param identifier The item identifier to retrieve related items for
   * @returns A promise resolving to an array of RelatedItems representing the fetched data, or rejecting if
   * an error is encountered or an unexpected data format is received.
   */
  fetchRelatedItems(identifier: string): Promise<RelatedItem[]>;

  /**
   * Returns the URL for an image representing the item with the given identifier.
   * 
   * @param identifier The item identifier to construct an image URL for
   * @returns The image URL as a string
   */
  itemImageURL(identifier: string): string;

  /**
   * Returns the URL for an item's embeddable content (video player, PDF reader, etc.)
   * 
   * @param identifier The item identifier to construct an embed URL for
   * @returns The embed URL as a string
   */
  itemEmbedURL(identifier: string): string;
  
}