import { LitElement, html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, state } from 'lit/decorators.js';
import { APIAdapter } from '../api/APIAdapter';
import { ArchiveItem } from '../entities/ArchiveItem';
import { InternetArchiveAPIAdapter } from '../api/InternetArchiveAPIAdapter';

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
  private _item: ArchiveItem;

  /**
   * Changes the item displayed by this component
   * @param identifier The new identifier to look up
   */
  private async _changeItem(identifier: string): Promise<void> {
    const item = await this._api.fetchItemMetadata(identifier);
    this._item = item;
  }

  /**
   * Handler to call for search events from the search bar
   */
  private _handleSearchEvent(evt: CustomEvent) {
    this._search(evt.detail.query);
  }

  /**
   * Handler to call whenever a new identifier is submitted to be looked up
   */
  private _search(searchQuery: string) {
    // Don't bother repeating the last lookup if the identifier hasn't changed
    if (searchQuery === this._item?.identifier) {
      return;
    }

    if (searchQuery.length > 0) {
      this._changeItem(searchQuery);
    }
  }

  protected override render() {
    return html`
      <header>
        <div id="search-container">
          <item-search-bar @search=${this._handleSearchEvent}></item-search-bar>
        </div>
      </header>
      <main>
        <item-details
          .item=${this._item}
          .embedURL=${ifDefined(this._api.itemEmbedURL(this._item?.identifier))}>
        </item-details>
      </main>
    `;
  }
}