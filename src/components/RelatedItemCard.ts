import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { RelatedItem } from '../entities/RelatedItem';

/**
 * A UI component meant to display a single RelatedItem, dispatching item click events.
 */
@customElement('related-item-card')
export class RelatedItemCard extends LitElement {

  static styles = css`
    a {
      color: inherit;
      text-decoration: inherit;
    }

    #related-item {
      display: flex;
      margin: 0.5rem 0;

      background: #ffffff;
      box-shadow: #d8d8d8 1px 1px 3px 1px;

      cursor: pointer;
      transition: background-color 0.15s ease, box-shadow 0.15s ease;
    }

    #related-item:hover {
      background: #f8f8f8;
      box-shadow: #d8d8d8 2px 2px 3px 1px;
    }

    #img-container {
      margin-bottom: -4px;
    }

    #related-item img {
      object-fit: cover;
      object-position: top;
    }

    #related-item-metadata {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      padding: 0 0.375rem;
      overflow-x: hidden;
    }

    #related-item-title {
      margin: 0.125rem 0;
      font-weight: bold;

      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }

    #related-item-id {
      flex-grow: 1;
      margin: 0.25rem 0;
      color: darkgrey;
      font-size: smaller;
    }

    #related-item-tags {
      margin-bottom: 0.5rem;
    }
  `;

  /** The related item being shown in this card */
  @property({ type: RelatedItem })
  public item: RelatedItem;

  /**
   * Handler for click events on the card, to dispatch a custom event up the tree
   */
  private _onClick(evt: Event) {
    this.dispatchEvent(new CustomEvent('changeitem', {
      detail: {
        identifier: this.item?.identifier
      }
    }));
    evt.preventDefault();
  }

  protected override render() {
    /* eslint-disable indent */
    return html`
      <a href="#" @click=${this._onClick}>
        <div id="related-item">
          <div id="img-container">
            <img
              src="https://archive.org/services/img/${this.item?.identifier}"
              width="180"
              height="135">
          </div>
          <div id="related-item-metadata">
            <p id="related-item-title">${this.item?.title || 'Untitled'}</p>
            <p id="related-item-id">${this.item?.identifier}</p>
            ${when(this.item?.subjectTags,
              () => html`<subject-tags id="related-item-tags" .tags=${this.item?.subjectTags} .maxtags=${6}></subject-tags>`
            )}
          </div>
        </div>
      </a>
    `;
    /* eslint-enable indent */
  }
}