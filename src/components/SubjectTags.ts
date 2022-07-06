import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

/**
 * A small UI component to display a list of tags, optionally cut off after a certain number of them.
 */
@customElement('subject-tags')
export class SubjectTags extends LitElement {

  static styles = css`
    #tags-container {
      display: inline;
      padding: 0;
    }

    .tag, .more-tag {
      display: inline-block;
      margin: 0 0.125rem;
      padding: 0.25rem;
      font-size: 0.75rem;
    }

    .tag {
      background: #d8d8d8;
    }
  `;

  @property({ type: Array })
  public tags: string[] = [];

  @property({ type: Number })
  public maxtags = Infinity;

  protected override render() {
    return html`
      <ul id="tags-container">
        ${map(this.tags.slice(0, this.maxtags), (tag) => html`<li class="tag">${tag}</li>`)}<!--
     -->${when(this.tags?.length > this.maxtags, () => html`<li class="more-tag">...</li>`)}
      </ul>
    `;
  }
}