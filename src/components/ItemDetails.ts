import { LitElement, html, css } from 'lit';
import { map } from 'lit/directives/map.js';
import { repeat } from 'lit/directives/repeat.js';
import { when } from 'lit/directives/when.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property, query } from 'lit/decorators.js';
import { ArchiveItem } from '../entities/ArchiveItem';
import { RelatedItem } from '../entities/RelatedItem';

declare const DOMPurify: { sanitize: (input: string) => string };

/**
 * UI component to display details about an item in the Internet Archive
 */
@customElement('item-details')
export class ItemDetails extends LitElement {

  static styles = css`
    h1, h2 {
      margin: 0.25rem 0;
    }

    h3 {
      margin: 0.125rem 0 0.5rem;
    }

    a {
      color: inherit;
      text-decoration: inherit;
    }

    #outer-container {
      display: flex;
      flex-direction: row;
      justify-content: center;

      padding-top: 1rem;

      /* System UI font stack */
      font-family: -apple-system, system-ui, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
    }

    #left-container {
      display: flex;
      flex-direction: column;
      flex-basis: 60%;
      max-width: 1440px;
    }

    #right-container {
      flex-basis: 30%;
      max-width: 720px;
      
      margin-left: 1.5rem;
    }

    #item-embed {
      width: 100%;
    }

    #metadata-container {
      padding: 0 0.375rem;
      border: 1px solid #d8d8d8;
    }

    #title-container {
      display: flex;
      align-items: center;
    }

    #title {
      display: inline-block;
      margin-right: 0.75rem;
    }

    .tags-container {
      display: inline;
      padding: 0;
    }

    .tag {
      display: inline-block;
      margin: 0 0.125rem;
      padding: 0.25rem;

      background: #d8d8d8;
      font-size: 0.75rem;
    }

    .related-item {
      display: flex;
      margin: 0.5rem 0;

      background: #ffffff;
      box-shadow: #d8d8d8 1px 1px 3px 1px;

      cursor: pointer;
      transition: background-color 0.15s ease, box-shadow 0.15s ease;
    }

    .related-item:hover {
      background: #f8f8f8;
      box-shadow: #d8d8d8 2px 2px 3px 1px;
    }

    .related-item img {
      object-fit: cover;
      object-position: top;
    }

    .related-item-metadata {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      padding-left: 0.375rem;
    }

    .related-item-title {
      margin: 0.125rem 0;
      font-weight: bold;
    }

    .related-item-id {
      flex-grow: 1;
      margin: 0.25rem 0;
      color: darkgrey;
      font-size: smaller;
    }
  `;

  @query('#item-embed')
  private _embedIframe!: HTMLIFrameElement;
  
  @property({ type: ArchiveItem })
  public item: ArchiveItem;

  @property({ type: Array })
  public relatedItems: RelatedItem[];

  @property({ type: String })
  public embedURL: string;

  private _onRelatedItemClick(identifier: string): void {
    this.dispatchEvent(new CustomEvent('changeitem', {
      detail: {
        identifier
      }
    }));
  }

  protected override render() {
    // It's likely the case that archive.org item descriptions have already been sanitized and are trustworthy.
    // But just in case, let's sanitize them before inclusion in the DOM, just to be safe.
    const joinedDescription = [].concat(this.item?.description).join('<br>').replace(/\n/g, '<br>');
    const descriptionBlock = unsafeHTML(DOMPurify.sanitize(joinedDescription));

    /* eslint-disable indent */// (The default indent rules don't seem to handle html blocks well)
    return html`
      <div id="outer-container">
        <div id="left-container">
          ${when(this.embedURL, () => html`
            <iframe
              src=${this.embedURL}
              id="item-embed"
              width="640"
              height="480"
              frameborder="0"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowfullscreen
              @load=${() => this._embedIframe.setAttribute('height', '' + this._embedIframe.getBoundingClientRect().width * 9 / 16)}
            >
          `)}
          <div id="metadata-container">
            <div id="title-container">
              ${when(this.item?.title,
                () => html`<h1 id="title">${this.item.title}</h1>`, // If the item has a title, use it
                () => html`<h1 id="title">Untitled (${this.item?.identifier})</h1>` // Otherwise, show its identifier instead
              )}
              ${when(this.item?.subjectTags,
                () => html`
                  <ul class="tags-container">
                    ${map(this.item.subjectTags, (tag) => html`<li class="tag">${tag}</li>`)}
                  </ul>
                `
              )}
            </div>
            ${when(this.item?.creator, 
              () => html`<h2>Created by: ${[].concat(this.item.creator).join(', ')}</h2>`
            )}
            <p>${descriptionBlock}</p>
          </div>
        </div>
        <div id="right-container">
          <h3>Related items:</h3>
          ${repeat(this.relatedItems,
            (item) => item.identifier,
            (item) => html`
              <a href="#" @click=${() => this._onRelatedItemClick(item.identifier)}>
                <div class="related-item">
                  <img
                    src="https://archive.org/services/img/${item.identifier}"
                    width="180"
                    height="135"
                  >
                  <div class="related-item-metadata">
                    <p class="related-item-title">${item.title || 'Untitled'}</p>
                    <p class="related-item-id">${item.identifier}</p>
                    ${when(item.subjectTags,
                      () => html`
                        <ul class="tags-container">
                          ${map(item.subjectTags, (tag) => html`<li class="tag">${tag}</li>`)}
                        </ul>
                      `
                    )}
                  </div>
                </div>
              </a>
            `
          )}
        </div>
      </div>
      <pre>${this.item}</pre>
    `;
    /* eslint-enable indent */
  }
}