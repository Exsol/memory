import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    connect() {
        this.element.addEventListener('dropzone:change', this._onChange);
    }
    disconnect() {
        this.element.removeEventListener('dropzone:change', this._onChange);
    }
    _onChange(event) {
        console.log(event)
        // console.log(event.detail.size);
        // console.log(event.detail.type);
        // console.log(event.detail.name);

    }


}