import { LitElement, html } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { APIAdapter } from '../api/APIAdapter';
import { ArchiveItem } from '../entities/ArchiveItem';
import { InternetArchiveAPIAdapter } from '../api/InternetArchiveAPIAdapter';

/**
 * High-level UI component to facilitate metadata lookup for a given identifier.
 */
@customElement('item-viewer')
export class ItemViewer extends LitElement {

  // TODO This doesn't actually belong here; move it out into a controller eventually
  private _api: APIAdapter = new InternetArchiveAPIAdapter();

  @query('#item-id-input')
  private _input: HTMLInputElement;

  @state()
  private _item: ArchiveItem;

  /**
   * Changes the item displayed by this component
   * @param identifier The new identifier to look up
   */
  private async _changeItem(identifier: string): Promise<void> {
    const item = await this._api.fetchItemMetadata(identifier);
    this._item = item;
  }

  /**
   * Handler to call for keyup events on the input field
   */
  private _handleInputKeyup(evt: KeyboardEvent) {
    if (evt.key === 'Enter') {
      this._handleSubmit();
    }
  }

  /**
   * Handler to call whenever a new identifier is submitted to be looked up
   */
  private _handleSubmit() {
    const identifier = this._input.value;

    // Don't bother repeating the last lookup if the identifier hasn't changed
    if (identifier === this._item?.identifier) {
      return;
    }

    if (identifier.length > 0) {
      this._changeItem(identifier);
    }
  }

  protected override render() {
    return html`
      <div>
        <label for="item-id-input">Item Identifier: </label>
        <input id="item-id-input" type="text" @keyup=${this._handleInputKeyup}>
        <button @click=${this._handleSubmit}>Get metadata</button>
      </div>
      <pre>${this._item}</pre>
    `;
  }
}