import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { when } from 'lit/directives/when.js';
import { customElement, property, query } from 'lit/decorators.js';
import { ArchiveItem } from '../entities/ArchiveItem';
import { RelatedItem } from '../entities/RelatedItem';
import { map } from 'lit/directives/map.js';

/**
 * UI component to display details about an item in the Internet Archive
 */
@customElement('item-details')
export class ItemDetails extends LitElement {

  static styles = css`
    :host {
      /* System UI font stack */
      --system-font-stack: -apple-system, system-ui, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
    }

    h3 {
      margin: 0.125rem 0 0.5rem;
    }

    #outer-container {
      display: flex;
      flex-direction: row;
      justify-content: center;

      padding: 1rem 5%;

      font-family: var(--system-font-stack);
    }

    #left-container {
      display: flex;
      flex-direction: column;
      flex-basis: calc(100% * 2 / 3);
      max-width: 1280px;
    }

    #right-container {
      flex-basis: calc(100% / 3);
      max-width: 640px;
      
      margin-left: 1.5rem;
    }

    @media (max-width: 1200px) {
      #outer-container {
        flex-direction: column;
      }

      #left-container,
      #right-container {
        flex-basis: unset;
      }
    }

    #item-embed {
      width: 100%;
    }

    #metadata-container {
      margin-bottom: 1rem;
      padding: 0 0.375rem;
      border: 1px solid #d8d8d8;
    }

    #reviews {
      margin: 0 0 1rem;
      padding: 0;
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

  /**
   * Handle clicks on related items by re-dispatching the event up a level
   */
  private _onRelatedItemClick(evt: CustomEvent): void {
    evt.stopPropagation();
    this.dispatchEvent(new CustomEvent(evt.type, { detail: evt.detail }));
  }


  protected override render() {
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
          <item-metadata-card id="metadata-container" .item=${this.item}></item-metadata-card>
          ${when(this.item?.reviews?.length > 0, () => html`
            <h3>Reviews:</h3>
            <div id="reviews">
              ${map(this.item?.reviews, (review) => html`<review-card .review=${review}></review-card>`)}
            </div>
          `)}
        </div>
        <div id="right-container">
          <h3>Related items:</h3>
          ${repeat(this.relatedItems, // Related items could conceivably be reordered according to popularity, relevance, etc. So using repeat instead of map.
            (relItem) => relItem.identifier,
            (relItem) => html`<related-item-card .item=${relItem} @changeitem=${this._onRelatedItemClick}></related-item-card>`
          )}
        </div>
      </div>
    `;
    /* eslint-enable indent */
  }
}