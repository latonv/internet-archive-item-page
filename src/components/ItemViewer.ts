import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { APIAdapter } from '../api/APIAdapter';
import { ArchiveItem } from '../entities/ArchiveItem';
import { InternetArchiveAPIAdapter } from '../api/InternetArchiveAPIAdapter';
import { RelatedItem } from '../entities/RelatedItem';

/**
 * High-level UI component to facilitate metadata lookup for a given identifier.
 */
@customElement('item-viewer')
export class ItemViewer extends LitElement {

  static styles = css`
    header {
      position: sticky;
      top: 0;
      height: 5rem;

      display: flex;
      flex-direction: column;
      justify-content: center;
      
      background: #87ceebe8;
      backdrop-filter: blur(4px);
      text-align: center;
    }

    #search-container {
      height: 60%;
    }
  `;

  // TODO This doesn't actually belong here; move it out into a controller eventually
  private _api: APIAdapter = new InternetArchiveAPIAdapter();

  @state()
  private _searchQuery: string;

  @state()
  private _item: ArchiveItem;

  // Note: non-reactive state, since (for now) these are only updated when the item changes
  private _relatedItems: RelatedItem[];

  /**
   * Changes the item displayed by this component
   * @param identifier The new identifier to look up
   */
  private async _changeItem(identifier: string): Promise<void> {
    this._searchQuery = identifier;
    const item = await this._api.fetchItemMetadata(identifier);

    // Invalid items won't have an identifier
    if (item.identifier) {
      this._relatedItems = await this._api.fetchRelatedItems(identifier);
      this._item = item;
    }
  }

  /**
   * Handler to call for search events from the search bar
   */
  private _handleSearchEvent(evt: CustomEvent): void {
    this._onSearch(evt.detail.query);
  }

  /**
   * Handler to call whenever a new identifier is submitted to be looked up
   */
  private _onSearch(query: string): void {
    // Don't bother repeating the last lookup if the identifier hasn't changed
    if (query === this._searchQuery) {
      return;
    }

    if (query.length > 0) {
      this._changeItem(query);
    }
  }

  protected override render() {
    return html`
      <header>
        <div id="search-container">
          <item-search-bar
            .value=${this._searchQuery ?? ''}
            @search=${this._handleSearchEvent}
          >
          </item-search-bar>
        </div>
      </header>
      <main>
        ${when(this._item, () => html`
          <item-details
            .item=${this._item}
            .relatedItems=${this._relatedItems}
            .embedURL=${this._api.itemEmbedURL(this._searchQuery)}
            @changeitem=${(evt: CustomEvent) => this._onSearch(evt.detail.identifier)}
          >
          </item-details>
        `)}
      </main>
    `;
  }
}