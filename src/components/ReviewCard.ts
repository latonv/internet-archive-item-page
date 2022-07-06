import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Review } from '../entities/Review';

/**
 * A UI component to display a single review.
 */
@customElement('review-card')
export class ReviewCard extends LitElement {
  static styles = css`
    #container {
      display: block;
      margin: 0.5rem 0;
      padding: 4px;

      background: #ffffff;
      box-shadow: #d8d8d8 1px 1px 3px 1px;
      font-size: 0.875rem;
    }

    #title {
      margin: 0.25rem 0;

      font-weight: bold;
    }

    #stars {
      font-weight: normal;
    }

    #author {
      margin: 0.125rem 0;
      font-size: smaller;
      color: #808080;
    }
  `;

  /** The review to display details for */
  @property({ type: Review })
  private review: Review;

  protected override render() {
    return html`
      <div id="container">
        <p id="title">${this.review?.title} <span id="stars">(${this.review?.stars}/5 stars)</span></p>
        <p id="author">by ${this.review?.reviewer}</p>
        <p id="body">${this.review?.body?.replace(/\n/g, '<br>')}</p>
      </div>
    `;
  }
}