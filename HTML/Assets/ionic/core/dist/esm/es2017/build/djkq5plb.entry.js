import { h } from '../ionic.core.js';

import { c as createColorClasses } from './chunk-2f96b3d2.js';

class Segment {
    constructor() {
        this.disabled = false;
        this.scrollable = false;
    }
    valueChanged(value) {
        this.updateButtons();
        this.ionChange.emit({ value });
    }
    segmentClick(ev) {
        const selectedButton = ev.target;
        this.value = selectedButton.value;
    }
    componentWillLoad() {
        this.emitStyle();
    }
    componentDidLoad() {
        if (this.value == null) {
            const checked = this.getButtons().find(b => b.checked);
            if (checked) {
                this.value = checked.value;
            }
        }
        this.updateButtons();
    }
    emitStyle() {
        this.ionStyle.emit({
            'segment': true
        });
    }
    updateButtons() {
        const value = this.value;
        for (const button of this.getButtons()) {
            button.checked = (button.value === value);
        }
    }
    getButtons() {
        return Array.from(this.el.querySelectorAll('ion-segment-button'));
    }
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${this.mode}`]: true, 'segment-disabled': this.disabled, 'segment-scrollable': this.scrollable })
        };
    }
    static get is() { return "ion-segment"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "el": {
            "elementRef": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "scrollable": {
            "type": Boolean,
            "attr": "scrollable"
        },
        "value": {
            "type": String,
            "attr": "value",
            "mutable": true,
            "watchCallbacks": ["valueChanged"]
        }
    }; }
    static get events() { return [{
            "name": "ionChange",
            "method": "ionChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionStyle",
            "method": "ionStyle",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionSelect",
            "method": "segmentClick"
        }]; }
    static get style() { return ".sc-ion-segment-md-h{--indicator-color-checked:initial;--ripple-color:initial;--color-activated:initial;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;-ms-flex-align:stretch;align-items:stretch;-ms-flex-pack:center;justify-content:center;width:100%;font-family:var(--ion-font-family,inherit);text-align:center}.sc-ion-segment-md-s > .segment-button-disabled, .segment-disabled.sc-ion-segment-md-h{pointer-events:none}.segment-scrollable.sc-ion-segment-md-h{-ms-flex-pack:start;justify-content:start;width:auto;overflow-x:scroll}.segment-scrollable.sc-ion-segment-md-h::-webkit-scrollbar{display:none}.sc-ion-segment-md-h{--background:none;--background-checked:none;--background-hover:rgba(var(--ion-color-primary-rgb,56,128,255),0.04);--background-activated:rgba(var(--ion-color-primary-rgb,56,128,255),0.16);--color:rgba(var(--ion-text-color-rgb,0,0,0),0.6);--color-checked:var(--ion-color-primary,#3880ff);--color-checked-disabled:var(--color-checked);--indicator-color:transparent}.segment-disabled.sc-ion-segment-md-h{opacity:.3}.sc-ion-segment-md-h.ion-color.sc-ion-segment-md-s > ion-segment-button{--background-hover:rgba(var(--ion-color-base-rgb),0.04);--background-activated:rgba(var(--ion-color-base-rgb),0.16);--ripple-color:var(--ion-color-base);background:transparent;color:rgba(var(--ion-text-color-rgb,0,0,0),.6)}.sc-ion-segment-md-h.ion-color.sc-ion-segment-md-s > .segment-button-checked{--indicator-color-checked:var(--ion-color-base);color:var(--ion-color-base)}.sc-ion-segment-md-h.ion-color.sc-ion-segment-md-s > .segment-button-checked.activated{color:var(--ion-color-base)}.sc-ion-segment-md-hion-toolbar:not(.ion-color):not(.ion-color).sc-ion-segment-md-s > ion-segment-button, ion-toolbar:not(.ion-color) .sc-ion-segment-md-h:not(.ion-color).sc-ion-segment-md-s > ion-segment-button{color:var(--ion-toolbar-color-unchecked,var(--color))}.sc-ion-segment-md-hion-toolbar:not(.ion-color):not(.ion-color).sc-ion-segment-md-s > .segment-button-checked, ion-toolbar:not(.ion-color) .sc-ion-segment-md-h:not(.ion-color).sc-ion-segment-md-s > .segment-button-checked{--indicator-color-checked:var(--ion-toolbar-color-checked,var(--color-checked));color:var(--ion-toolbar-color-checked,var(--color-checked))}.sc-ion-segment-md-hion-toolbar.ion-color:not(.ion-color).sc-ion-segment-md-s > ion-segment-button, ion-toolbar.ion-color .sc-ion-segment-md-h:not(.ion-color).sc-ion-segment-md-s > ion-segment-button{--background-hover:rgba(var(--ion-color-contrast-rgb),0.04);--background-activated:var(--ion-color-base);--color:rgba(var(--ion-color-contrast-rgb),0.6);--color-checked:var(--ion-color-contrast);--indicator-color-checked:var(--ion-color-contrast)}"; }
    static get styleMode() { return "md"; }
}

let ids = 0;
class SegmentButton {
    constructor() {
        this.checked = false;
        this.disabled = false;
        this.layout = 'icon-top';
        this.value = 'ion-sb-' + (ids++);
    }
    checkedChanged(checked, prev) {
        if (checked && !prev) {
            this.ionSelect.emit();
        }
    }
    onClick() {
        this.checked = true;
    }
    get hasLabel() {
        return !!this.el.querySelector('ion-label');
    }
    get hasIcon() {
        return !!this.el.querySelector('ion-icon');
    }
    hostData() {
        const { checked, disabled, hasIcon, hasLabel, layout } = this;
        return {
            'aria-disabled': disabled ? 'true' : null,
            class: {
                [`${this.mode}`]: true,
                'segment-button-has-label': hasLabel,
                'segment-button-has-icon': hasIcon,
                'segment-button-has-label-only': hasLabel && !hasIcon,
                'segment-button-has-icon-only': hasIcon && !hasLabel,
                'segment-button-disabled': disabled,
                'segment-button-checked': checked,
                [`segment-button-layout-${layout}`]: true,
                'ion-activatable': true,
                'ion-activatable-instant': true,
            }
        };
    }
    render() {
        return [
            h("button", { type: "button", "aria-pressed": this.checked ? 'true' : null, class: "button-native", disabled: this.disabled },
                h("slot", null),
                this.mode === 'md' && h("ion-ripple-effect", null)),
            h("div", { class: "segment-button-indicator" })
        ];
    }
    static get is() { return "ion-segment-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "checked": {
            "type": Boolean,
            "attr": "checked",
            "mutable": true,
            "watchCallbacks": ["checkedChanged"]
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "el": {
            "elementRef": true
        },
        "layout": {
            "type": String,
            "attr": "layout"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "value": {
            "type": String,
            "attr": "value"
        }
    }; }
    static get events() { return [{
            "name": "ionSelect",
            "method": "ionSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick"
        }]; }
    static get style() { return ":host{--padding-start:0;--padding-end:0;display:-ms-flexbox;display:flex;-ms-flex:1 0 auto;flex:1 0 auto;-ms-flex-direction:column;flex-direction:column;height:auto;border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);color:var(--color);text-decoration:none;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-font-kerning:none;font-kerning:none}:host(:first-of-type){border-top-left-radius:var(--border-radius);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--border-radius)}:host-context([dir=rtl]):first-of-type,:host-context([dir=rtl]):host(:first-of-type){border-top-left-radius:0;border-top-right-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius);border-bottom-left-radius:0}:host(:not(:first-of-type)){border-left-width:0}:host-context([dir=rtl]):host(:not(:first-of-type)),:host-context([dir=rtl]):not(:first-of-type){border-right-width:0;border-left-width:var(--border-width)}:host(:last-of-type){border-top-left-radius:0;border-top-right-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius);border-bottom-left-radius:0}:host-context([dir=rtl]):host(:last-of-type),:host-context([dir=rtl]):last-of-type{border-top-left-radius:var(--border-radius);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--border-radius)}.button-native{border-radius:inherit;font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin-left:var(--margin-start);margin-right:var(--margin-end);margin-top:var(--margin-top);margin-bottom:var(--margin-bottom);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;min-width:inherit;max-width:inherit;height:auto;min-height:inherit;max-height:inherit;-webkit-transition:var(--transition);transition:var(--transition);border:none;outline:none;background:transparent;contain:content;cursor:pointer}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.button-native{margin-left:unset;margin-right:unset;-webkit-margin-start:var(--margin-start);margin-inline-start:var(--margin-start);-webkit-margin-end:var(--margin-end);margin-inline-end:var(--margin-end);padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.segment-button-indicator{-ms-flex-item-align:end;align-self:flex-end;width:100%;height:2px;background-color:var(--indicator-color);opacity:1}:host(.segment-button-checked){background:var(--background-checked);color:var(--color-checked)}:host(.segment-button-checked) .segment-button-indicator{background-color:var(--indicator-color-checked,var(--color-checked))}:host(.activated){color:var(--color-activated,var(--color))}:host(.segment-button-disabled){color:var(--color-disabled)}:host(.segment-button-disabled.segment-button-checked){color:var(--color-checked-disabled)}::slotted(ion-icon){-ms-flex-order:-1;order:-1}::slotted(ion-label){display:block;-ms-flex-item-align:center;align-self:center;line-height:22px;text-overflow:ellipsis;white-space:nowrap;-webkit-box-sizing:border-box;box-sizing:border-box}:host(.segment-button-layout-icon-start) .button-native{-ms-flex-direction:row;flex-direction:row}:host(.segment-button-layout-icon-end) .button-native{-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.segment-button-layout-icon-bottom) .button-native{-ms-flex-direction:column-reverse;flex-direction:column-reverse}:host(.segment-button-layout-icon-hide) ::slotted(ion-icon),:host(.segment-button-layout-label-hide) ::slotted(ion-label){display:none}ion-ripple-effect{color:var(--ripple-color,var(--color-checked))}:host{--padding-top:0;--padding-end:16px;--padding-bottom:0;--padding-start:16px;--transition:color 0.15s linear 0s,opacity 0.15s linear 0s;min-width:90px;max-width:360px;min-height:48px;font-size:14px;font-weight:500;letter-spacing:.06em;line-height:40px;text-transform:uppercase}:host(.activated),:host(.segment-button-checked){--border-color:var(--ion-color-primary,#3880ff);opacity:1}:host(.segment-button-disabled){opacity:.3}::slotted(ion-icon){font-size:24px}::slotted(ion-icon),::slotted(ion-label){margin-top:12px;margin-bottom:12px}:host(.segment-button-layout-icon-bottom) ::slotted(ion-icon),:host(.segment-button-layout-icon-top) ::slotted(ion-label){margin-top:0}:host(.segment-button-layout-icon-bottom) ::slotted(ion-label),:host(.segment-button-layout-icon-top) ::slotted(ion-icon){margin-bottom:0}:host(.segment-button-layout-icon-start) ::slotted(ion-label){margin-left:8px;margin-right:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.segment-button-layout-icon-start) ::slotted(ion-label){margin-left:unset;margin-right:unset;-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:0;margin-inline-end:0}}:host(.segment-button-layout-icon-end) ::slotted(ion-label){margin-left:0;margin-right:8px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.segment-button-layout-icon-end) ::slotted(ion-label){margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:8px;margin-inline-end:8px}}:host(.segment-button-has-icon-only) ::slotted(ion-icon),:host(.segment-button-has-label-only) ::slotted(ion-label){margin-top:12px;margin-bottom:12px}:host(.segment-button-checked.activated){color:var(--color-checked)}\@media (any-hover:hover){:host(:hover){background:var(--background-hover)}}"; }
    static get styleMode() { return "md"; }
}

export { Segment as IonSegment, SegmentButton as IonSegmentButton };
