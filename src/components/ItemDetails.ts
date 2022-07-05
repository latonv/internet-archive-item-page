import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ArchiveItem } from '../entities/ArchiveItem';

/**
 * UI component to display details about an item in the Internet Archive
 */
@customElement('item-details')
export class ItemDetails extends LitElement {
  
  @property()
  public item: ArchiveItem;

  protected override render() {
    return html`
      <pre>${this.item}</pre>
    `;
  }
}