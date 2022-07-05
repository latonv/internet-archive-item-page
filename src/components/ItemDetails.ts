import { LitElement, html, css } from 'lit';
import { when } from 'lit/directives/when.js';
import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ArchiveItem } from '../entities/ArchiveItem';

/**
 * UI component to display details about an item in the Internet Archive
 */
@customElement('item-details')
export class ItemDetails extends LitElement {

  static styles = css`
    h2, h3 {
      margin: 0.25rem 0;
    }

    #outer-container {
      display: flex;
      flex-direction: row;
      justify-content: center;

      padding-top: 1rem;
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
    }

    #item-embed {
      width: 100%;
    }

    #metadata-container {
      padding: 0 0.375rem;
      border: 1px solid #d8d8d8;

      font-family: system-ui, sans-serif;
    }

    #title {
      display: inline-block;
    }

    .tags-container {
      display: inline;
      padding: 0;
      margin-left: 0.75rem;
      vertical-align: text-bottom;
    }

    .tag {
      display: inline-block;
      margin: 0 0.125rem;
      padding: 4px;

      background: #d8d8d8;
      font-size: 0.75rem;
    }
  `;
  
  @property()
  public item: ArchiveItem;

  @property()
  public embedURL: string;

  protected override render() {
    // I'm making the assumption that archive.org item descriptions have already been sanitized and are trustworthy.
    // Realistically, they should probably still be sanitized before being included in the DOM, just to be safe.

    /* eslint-disable indent */// (The default indent rules don't handle some parts of this html block well)
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
            >
          `)}
          <div id="metadata-container">
            ${when(this.item.title,
              () => html`<h2 id="title">${this.item.title}</h2>`, // If the item has a title, use it
              () => html`<h2 id="title">${this.item.identifier}</h2>` // Otherwise, just use its identifier instead
            )}
            ${when(this.item.subjectTags,
              () => html`
                <ul class="tags-container">
                  ${map(this.item.subjectTags, (tag) => html`<li class="tag">${tag}</li>`)}
                </ul>
              `
            )}
            ${when(this.item.creator, 
              () => html`<h3>Created by: ${this.item.creator}</h3>`
            )}
            <p>
              ${unsafeHTML([].concat(this.item.description).join('<br>').replace(/\n/g, '<br>'))}
            </p>
          </div>
        </div>
        <div id="right-container">
          Related items go here
        </div>
      </div>
      <pre>${this.item}</pre>
    `;
    /* eslint-enable indent */
  }
}