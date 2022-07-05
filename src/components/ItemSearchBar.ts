import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

/**
 * Search bar component for the page header
 */
@customElement('item-search-bar')
export class ItemSearchBar extends LitElement {

  static styles = css`
    :host {
      --container-width: 50%;

      --search-padding-v: 0.25rem;
      --search-padding-h: 0.5rem;

      --search-font-size: 1.25rem;
      --clear-font-size: 1.5rem;
      
      --bg-color: #ffffff;
      --accent-color: #e0e0e0;
      --accent-color-darker: #d0d0d0;
    }

    #container {
      position: relative;
      display: inline-block;
      height: 100%;
      width: var(--container-width);
    }
    
    #search-bar {
      height: 100%;
      width: 100%;

      padding: var(--search-padding-v) max(var(--search-padding-h), 3rem) var(--search-padding-v) var(--search-padding-h);
      border: 0;
      box-sizing: border-box;

      background: var(--bg-color);
      font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, Arial, sans-serif;
      font-size: var(--search-font-size);
    }

    #clear-btn {
      position: absolute;
      top: 1px;
      right: 1px;
      height: calc(100% - 2px);
      aspect-ratio: 1;

      display: flex;
      justify-content: center;
      align-items: center;

      padding: 0.75rem;
      border: 0;
      border-radius: 50%;

      background: var(--bg-color);
      font-size: var(--clear-font-size);

      cursor: pointer;

      transition: background-color 0.2s ease;
    }

    #clear-btn[hidden] {
      display: none;
    }

    #clear-btn::before {
      /* U+2715 Multiplication X */
      content: "\u2715"
    }

    #clear-btn:hover,
    #clear-btn:focus {
      background: var(--accent-color);
    }

    #clear-btn:active {
      background: var(--accent-color-darker);
      transition-duration: 0.05s;
    }
  `;

  @query('#search-bar')
  private _searchBar!: HTMLInputElement;

  @property({ type: String })
  public value = '';

  private _clear(): void {
    this._searchBar.value = '';
    this._updateValue();
    this._searchBar.focus();
  }

  /**
   * Handler to call for keyup events on the input field
   */
  private _handleInputKeyup(evt: KeyboardEvent): void {
    // keyCode is deprecated, but needed for compatibility with some older browsers
    if (evt.key === 'Enter' || evt.keyCode === 13) {
      this._handleSubmit();
    }
  }

  private _updateValue(): void {
    this.value = this._searchBar.value;
  }

  /**
   * Handler to call whenever a new identifier is submitted to be looked up
   */
  private _handleSubmit(): void {
    const searchQuery = this._searchBar.value.trim();

    if (searchQuery.length > 0) {
      this.dispatchEvent(new CustomEvent('search', {
        detail: {
          query: searchQuery
        }
      }));
    }
  }

  protected override render() {
    return html`
      <div id="container">
        <input
          id="search-bar"
          type="text" 
          placeholder="Enter an archive.org item ID (e.g., InformationM)"
          autofocus
          .value=${this.value}
          @keyup=${this._handleInputKeyup}
          @input=${this._updateValue}
        >
        <button
          id="clear-btn"
          aria-label="Clear search bar"
          ?hidden=${this.value?.length == 0}
          @click=${this._clear}>
        </button>
      </div>
    `;
  }
}