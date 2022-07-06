import { LitElement, html, css } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
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
    :host {
      --header-height: 5rem;
      --search-height: 3rem;

      --opaque-sky-blue: #87ceeb;
      --transparent-sky-blue: #87ceebe8;
      --off-white: #f8f8f8;

      --system-font-stack: -apple-system, system-ui, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
    }

    header {
      position: sticky;
      top: 0;
      height: var(--header-height);

      display: flex;
      flex-direction: column;
      justify-content: center;
      
      background: var(--transparent-sky-blue);
      backdrop-filter: blur(4px);
      text-align: center;
      z-index: 1;

      transition: height 0.8s ease, background-color 0.8s ease;
    }

    /* If the user prefers reduced motion, make the header transition imperceptible */
    @media (prefers-reduced-motion) {
      header {
        transition-duration: 0.001s;
      }
    }

    .full-height {
      height: 100vh;
      background: var(--opaque-sky-blue);
    }

    #search-container {
      height: var(--search-height);
    }

    #predefined-searches {
      margin-top: 2rem;
      font-family: var(--system-font-stack);
    }

    #predefined-searches a {
      margin: 0 0.1875rem;
    }

    main {
      background: var(--off-white);
    }

    #loading,
    #invalid-item-message {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100vh;
      
      display: flex;
      justify-content: center;
      align-items: center;

      background: transparent;
      font-family: var(--system-font-stack);
      color: #888888;
    }
  `;

  // TODO This would be better moved into a controller, to maintain separation of concerns
  private _api: APIAdapter = new InternetArchiveAPIAdapter();

  @query('header')
  private _header: HTMLElement;

  /** The current search query whose results are being shown */
  @state()
  private _searchQuery: string;

  /** The currently-displayed item */
  @state()
  private _item: ArchiveItem;

  /** Whether we're waiting for another item to load */
  @state()
  private _loading: boolean;

  // Note: non-reactive state, since (for now) these are only updated when the item changes
  private _relatedItems: RelatedItem[];

  /**
   * Changes the item displayed by this component
   * @param identifier The new identifier to look up
   */
  private async _changeItem(identifier: string): Promise<void> {
    // Upon first item change, collapse the full-height header down to its usual size
    this._header.classList.remove('full-height');
    this.renderRoot.querySelector('#predefined-searches')?.remove();

    this._searchQuery = identifier;
    this._loading = true;
    const [item, relatedItems] = await Promise.all([
      this._api.fetchItemMetadata(identifier),
      this._api.fetchRelatedItems(identifier)
    ]);

    // Invalid items won't have an identifier set
    if (item.identifier) {
      this._item = item;
      this._relatedItems = relatedItems;
    } else {
      this._item = null;
      this._relatedItems = [];
    }

    this._loading = false;
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
    // Set up some predefined search queries to help the user explore possibilities
    const predefinedSearchQueries = ['InformationM', 'MoonlightSonata_606', 'arcade_tetris'];
    const predefinedSearchHTML = html`
      <div id="predefined-searches">
        Or try one of these:
        ${map(predefinedSearchQueries, (query: string) => html`<a href="#" @click=${() => this._onSearch(query)}>${query}</a>`)}
      </div>
    `;

    // Define the main content of the page, depending on the current state
    let mainContent;
    if (this._loading) {
      // If currently loading some metadata, show a loading spinner
      mainContent = html`<loading-spinner id="loading"></loading-spinner>`;
    } else if (this._item) {
      // If we have an item to display, show its details!
      mainContent = html`
        <item-details
          .item=${this._item}
          .relatedItems=${this._relatedItems}
          .embedURL=${this._api.itemEmbedURL(this._searchQuery)}
          @changeitem=${(evt: CustomEvent) => this._onSearch(evt.detail.identifier)}
        >
        </item-details>
      `;
    } else {
      // Otherwise, show an 'invalid item' message
      mainContent = html`<div id="invalid-item-message">No item found with ID ${this._searchQuery}</div>`;
    }

    return html`
      <header class="full-height">
        <div id="search-container">
          <item-search-bar
            .value=${this._searchQuery ?? ''}
            @search=${this._handleSearchEvent}
          >
          </item-search-bar>
        </div>
        ${predefinedSearchHTML}
      </header>
      <main>
        ${mainContent}
      </main>
    `;
  }
}