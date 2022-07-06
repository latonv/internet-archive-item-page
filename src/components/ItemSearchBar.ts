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

      --go-btn-color: #dcdcdc;
      --go-btn-color-hover: #d0d0d0;
      --go-btn-color-pressed: #c8c8c8;

      --system-font-stack: -apple-system, system-ui, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
    }

    #container {
      position: relative;
      display: inline-block;
      height: 100%;
      width: var(--container-width);
    }

    #search-outer {
      position: relative;
      display: flex;
      flex-grow: 1;
      height: 100%;
      box-shadow: grey 0px 1px 2px 0px;
    }

    #search-inner {
      position: relative;
      flex-grow: 1;
      height: 100%;
    }
    
    #search-bar {
      height: 100%;
      width: 100%;

      padding: var(--search-padding-v) max(var(--search-padding-h), 3rem) var(--search-padding-v) var(--search-padding-h);
      border: 0;
      box-sizing: border-box;

      background: var(--bg-color);
      font-family: var(--system-font-stack);
      font-size: var(--search-font-size);
    }

    #clear-btn {
      position: absolute;
      top: 1px;
      right: 1px;
      height: calc(100% - 2px);
      aspect-ratio: 1; /* aspect-ratio is a fairly recent feature -- might be better to just hard-code a width for better browser support? */

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

    #go-btn {
      height: 100%;
      padding: 0 1rem;
      border: none;
      border-left: 1px solid darkgrey;
      border-radius: 0 4px 4px 0;

      background: var(--go-btn-color);
      font-size: 1rem;

      cursor: pointer;
    }

    #go-btn:hover,
    #go-btn:focus {
      background: var(--go-btn-color-hover);
    }

    #go-btn:active {
      background: var(--go-btn-color-pressed);
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
        <div id="search-outer">
          <div id="search-inner">
            <input
              id="search-bar"
              type="text" 
              placeholder="Enter an archive.org item ID (e.g., InformationM)"
              spellcheck="false"
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
          <button id="go-btn" aria-label="Search" @click=${this._handleSubmit}>Go!</button>
        </div>
      </div>
    `;
  }
}