import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * A simple "indeterminate progress" spinner component that can be dropped in anywhere
 */
@customElement('loading-spinner')
export class LoadingSpinner extends LitElement {

  static styles = css`
    /* The outer div constantly spins 3x slower than the inner one, for a bit more visual variety */
    #load-spinner-outer {
      width: 75px;
      height: 75px;
      box-sizing: content-box;
      animation: spin 3.6s infinite linear
    }

    #load-spinner-inner {
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
      border-top: 6px solid grey;
      border-radius: 50%;
      box-sizing: border-box;
      animation: spin 1.2s infinite cubic-bezier(0.36, -0.26, 0.21, 1.41);
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  `;

  protected override render() {
    return html`
      <div id="load-spinner-outer">
        <div id="load-spinner-inner">
        </div>
      </div>
    `;
  }
}