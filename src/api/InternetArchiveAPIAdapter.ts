import { APIAdapter } from './APIAdapter';
import { ArchiveItem } from '../entities/ArchiveItem';
import { RelatedItem, RelatedItemMetadata } from '../entities/RelatedItem';


/**
 * Expected raw data shape for a list of related items fetched from the API.
 */
 type RelatedItemsData = {
  hits: {
    hits: RelatedItemMetadata[]
  }
};

/**
 * An adapter class for the Internet Archive's API endpoints
 */
export class InternetArchiveAPIAdapter implements APIAdapter {

  constructor() {
    //
  }

  // 
  // 
  // Note: adapter method documentation is provided in the APIAdapter.ts interface file.
  // 
  // 

  
  public async fetchItemMetadata(identifier: string): Promise<ArchiveItem> {
    const metadataJSON = await fetch(`https://archive.org/metadata/${encodeURIComponent(identifier)}`);
    const responseObj = await metadataJSON.json();
    return new ArchiveItem(responseObj);
  }

  
  public async fetchRelatedItems(identifier: string): Promise<RelatedItem[]> {
    const relatedItemsJSON = await fetch(`https://be-api.us.archive.org/mds/v1/get_related/all/${encodeURIComponent(identifier)}`);
    const responseObj: RelatedItemsData = await relatedItemsJSON.json();
    
    // Pull out the list of related items
    // Two layers of 'hits' -- outer layer is an object, inner layer is an array of the actual item metadata objects
    let relatedItems: RelatedItemMetadata[];
    if ('hits' in responseObj) {
      const outerHits = responseObj['hits'];
      if ('hits' in outerHits) {
        relatedItems = outerHits['hits'];
      }
    }

    // Map each raw metadata object to a RelatedItem (or throw an error if the data has an unexpected shape)
    if (Array.isArray(relatedItems)) {
      return relatedItems.map((itemData) => new RelatedItem(itemData));
    } else {
      throw new TypeError('Unexpected data from related items API:' + relatedItems);
    }
  }

  
  public itemImageURL(identifier: string): string {
    return `https://archive.org/services/img/${encodeURIComponent(identifier)}`;
  }

  
  public itemEmbedURL(identifier: string): string {
    return `https://archive.org/embed/${encodeURIComponent(identifier)}`;
  }
}