import { createOverlay, dismissOverlay, getOverlay } from '../../utils/overlays';
export class PopoverController {
    create(options) {
        return createOverlay(this.doc.createElement('ion-popover'), options);
    }
    dismiss(data, role, id) {
        return dismissOverlay(this.doc, data, role, 'ion-popover', id);
    }
    async getTop() {
        return getOverlay(this.doc, 'ion-popover');
    }
    static get is() { return "ion-popover-controller"; }
    static get properties() { return {
        "create": {
            "method": true
        },
        "dismiss": {
            "method": true
        },
        "doc": {
            "context": "document"
        },
        "getTop": {
            "method": true
        }
    }; }
}
