import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';
import { ArchiveItem } from '../entities/ArchiveItem';
import { getEmoji, MediaType } from '../entities/MediaType';

// Loading DOMPurify library via script tag
declare const DOMPurify: { sanitize: (input: string) => string };

@customElement('item-metadata-card')
export class ItemMetadataCard extends LitElement {

  static styles = css`
    :host {
      background: #ffffff;
    }

    h1, h2 {
      margin: 0.25rem 0;
    }

    h3 {
      margin: 0.125rem 0 0.5rem;
    }

    a {
      color: inherit;
    }

    dl {
      display: flex;
      flex-wrap: wrap;
      width: 80%;
    }

    dt, dd {
      display: inline-block;
      margin: 1px 0;
    }

    dt {
      flex-basis: 25%;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    dd {
      flex-basis: 75%;
    }

    #title-container {
      display: flex;
      align-items: center;
    }

    #title {
      display: inline-block;
      margin-right: 1.5rem;
    }

    #title-container subject-tags {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .subtle-metadata {
      font-size: smaller;
      color: #808080;
      margin: 0;
    }

    .subtle-metadata:last-of-type {
      margin-bottom: 1rem;
    }
  `;

  @property({ type: ArchiveItem })
  public item: ArchiveItem;

  protected override render() {
    // It's likely the case that archive.org item descriptions have already been sanitized and are trustworthy.
    // But just in case, let's sanitize them before inclusion in the DOM, to be safer from XSS attacks.
    const joinedDescription = [].concat(this.item?.description).join('<br>').replace(/\n/g, '<br>');
    const descriptionBlock = unsafeHTML(DOMPurify.sanitize(joinedDescription));

    // Extract the year of publication to accompany the item's title
    const publicationYear = this.item?.publicationDate?.getFullYear();

    // A nice readable format for the date the item was added to the archive
    const addedDateStr = this.item?.addedDate?.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Determine which emoji to display beside the title, based on the item's media type
    const mediaTypeEmoji = getEmoji(this.item?.mediaType);
    const mediaTypeReadable = MediaType[this.item?.mediaType]?.toLowerCase() + ' media';

    /* eslint-disable indent */// (The default indent rules don't seem to handle html blocks well)
    return html`
      <div id="title-container">
        ${when(this.item?.title, // If the item has a title, use it. Otherwise, show its identifier instead
          () => html`
            <h1 id="title">
              ${this.item.title} ${when(publicationYear, () => `(${publicationYear})`)}
              <span aria-label=${mediaTypeReadable} title=${mediaTypeReadable}>${mediaTypeEmoji}</span>
            </h1>
          `, 
          () => html`
            <h1 id="title">
              Untitled (${this.item?.identifier}) 
              <span aria-label=${mediaTypeReadable} title=${mediaTypeReadable}>${mediaTypeEmoji}</span>
            </h1>
          `
        )}
        ${when(this.item?.subjectTags,
          () => html`<subject-tags .tags=${this.item.subjectTags} .maxtags=${6}></subject-tags>`
        )}
      </div>
      ${when(this.item?.creator, 
        () => html`<h2>Created by: ${[].concat(this.item.creator).join(', ')}</h2>`
      )}
      <p id="description">${descriptionBlock}</p>
      <p class="subtle-metadata">
        Uploaded${when(addedDateStr, () => ' ' + addedDateStr)} by ${when(this.item?.uploader, () => this.item.uploader, () => 'Unknown User')}
      </p>
      ${when(this.item?.language, () => html`<p class="subtle-metadata">Language: ${this.item.language}</p>`)}
      ${when(this.item?.licenseURL, () => html`
        <p class="subtle-metadata">
          License info: 
          <a href=${this.item.licenseURL} rel="noopener noreferrer" target="_blank">${this.item.licenseURL}</a>
        </p>
      `)}
      <div id="metadata-divider"></div>
      <div id="other-metadata">
        <h3>Other metadata:</h3>
        <dl>
          <dt>Identifier</dt>
          <dd>${this.item?.identifier}</dd>
          ${map(this.item?.otherMetadata, ([key, val]) => html`
            <dt>${key}</dt>
            <dd>${[].concat(val).join(', ')}</dd>
          `)}
        </dl>
      </div>
    `;
  }
  /* eslint-enable indent */
}