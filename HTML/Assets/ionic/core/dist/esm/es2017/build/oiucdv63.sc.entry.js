import { h } from '../ionic.core.js';

import { b as openURL, c as createColorClasses } from './chunk-2f96b3d2.js';

class Anchor {
    constructor() {
        this.routerDirection = 'forward';
    }
    onClick(ev) {
        openURL(this.win, this.href, ev, this.routerDirection);
    }
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${this.mode}`]: true, 'ion-activatable': true })
        };
    }
    render() {
        return (h("a", { href: this.href },
            h("slot", null)));
    }
    static get is() { return "ion-anchor"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "href": {
            "type": String,
            "attr": "href"
        },
        "routerDirection": {
            "type": String,
            "attr": "router-direction"
        },
        "win": {
            "context": "window"
        }
    }; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick"
        }]; }
    static get style() { return ".sc-ion-anchor-h{--background:transparent;--color:var(--ion-color-primary,#3880ff);background:var(--background);color:var(--color)}.ion-color.sc-ion-anchor-h{color:var(--ion-color-base)}a.sc-ion-anchor{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit}"; }
}

class BackButton {
    async onClick(ev) {
        const nav = this.el.closest('ion-nav');
        ev.preventDefault();
        if (nav && await nav.canGoBack()) {
            return nav.pop({ skipIfBusy: true });
        }
        return openURL(this.win, this.defaultHref, ev, 'back');
    }
    get backButtonIcon() {
        return this.icon != null ? this.icon : this.config.get('backButtonIcon', 'arrow-back');
    }
    get backButtonText() {
        const defaultBackButtonText = this.mode === 'ios' ? 'Back' : null;
        return this.text != null ? this.text : this.config.get('backButtonText', defaultBackButtonText);
    }
    get hasIconOnly() {
        return this.backButtonIcon && !this.backButtonText;
    }
    get rippleType() {
        if (this.hasIconOnly) {
            return 'unbounded';
        }
        return 'bounded';
    }
    hostData() {
        const showBackButton = this.defaultHref !== undefined;
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${this.mode}`]: true, 'button': true, 'back-button-has-icon-only': this.hasIconOnly, 'ion-activatable': true, 'ion-focusable': true, 'show-back-button': showBackButton })
        };
    }
    render() {
        const { backButtonIcon, backButtonText } = this;
        return (h("button", { type: "button", class: "button-native" },
            h("span", { class: "button-inner" },
                backButtonIcon && h("ion-icon", { icon: backButtonIcon, lazy: false }),
                backButtonText && h("span", { class: "button-text" }, backButtonText)),
            this.mode === 'md' && h("ion-ripple-effect", { type: this.rippleType })));
    }
    static get is() { return "ion-back-button"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "config": {
            "context": "config"
        },
        "defaultHref": {
            "type": String,
            "attr": "default-href"
        },
        "el": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "text": {
            "type": String,
            "attr": "text"
        },
        "win": {
            "context": "window"
        }
    }; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick"
        }]; }
    static get style() { return ".sc-ion-back-button-ios-h{--background:transparent;--color-focused:var(--color);--color-hover:var(--color);--icon-margin-top:0;--icon-margin-bottom:0;--icon-padding-top:0;--icon-padding-end:0;--icon-padding-bottom:0;--icon-padding-start:0;--margin-top:0;--margin-end:0;--margin-bottom:0;--margin-start:0;--min-width:auto;--min-height:auto;--padding-top:0;--padding-end:0;--padding-bottom:0;--padding-start:0;--opacity:1;--ripple-color:currentColor;--transition:background-color,opacity 100ms linear;display:none;min-width:var(--min-width);min-height:var(--min-height);color:var(--color);font-family:var(--ion-font-family,inherit);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-font-kerning:none;font-kerning:none}.ion-color.sc-ion-back-button-ios-h   .button-native.sc-ion-back-button-ios{color:var(--ion-color-base)}.show-back-button.sc-ion-back-button-ios-h, .can-go-back.sc-ion-back-button-ios-h > ion-header.sc-ion-back-button-ios, .can-go-back > ion-header   .sc-ion-back-button-ios-h{display:block}.button-native.sc-ion-back-button-ios{border-radius:var(--border-radius);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin-left:var(--margin-start);margin-right:var(--margin-end);margin-top:var(--margin-top);margin-bottom:var(--margin-bottom);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;min-height:inherit;-webkit-transition:var(--transition);transition:var(--transition);border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;opacity:var(--opacity);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.button-native.sc-ion-back-button-ios{margin-left:unset;margin-right:unset;-webkit-margin-start:var(--margin-start);margin-inline-start:var(--margin-start);-webkit-margin-end:var(--margin-end);margin-inline-end:var(--margin-end);padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.button-inner.sc-ion-back-button-ios{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}ion-icon.sc-ion-back-button-ios{padding-left:var(--icon-padding-start);padding-right:var(--icon-padding-end);padding-top:var(--icon-padding-top);padding-bottom:var(--icon-padding-bottom);margin-left:var(--icon-margin-start);margin-right:var(--icon-margin-end);margin-top:var(--icon-margin-top);margin-bottom:var(--icon-margin-bottom);display:inherit;font-size:var(--icon-font-size);font-weight:var(--icon-font-weight);pointer-events:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){ion-icon.sc-ion-back-button-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--icon-padding-start);padding-inline-start:var(--icon-padding-start);-webkit-padding-end:var(--icon-padding-end);padding-inline-end:var(--icon-padding-end);margin-left:unset;margin-right:unset;-webkit-margin-start:var(--icon-margin-start);margin-inline-start:var(--icon-margin-start);-webkit-margin-end:var(--icon-margin-end);margin-inline-end:var(--icon-margin-end)}}\@media (any-hover:hover){.sc-ion-back-button-ios-h:hover   .button-native.sc-ion-back-button-ios{background:var(--background-hover);color:var(--color-hover)}}.ion-focused.sc-ion-back-button-ios-h   .button-native.sc-ion-back-button-ios{background:var(--background-focused);color:var(--color-focused)}\@media (any-hover:hover){.ion-color.sc-ion-back-button-ios-h:hover   .button-native.sc-ion-back-button-ios{color:var(--ion-color-base)}}.ion-color.ion-focused.sc-ion-back-button-ios-h   .button-native.sc-ion-back-button-ios{color:var(--ion-color-base)}ion-toolbar.sc-ion-back-button-ios-h:not(.ion-color):not(.ion-color), ion-toolbar:not(.ion-color)   .sc-ion-back-button-ios-h:not(.ion-color){color:var(--ion-toolbar-color,var(--color))}.sc-ion-back-button-ios-h{--background-focused:rgba(var(--ion-color-primary-rgb,56,128,255),0.1);--border-radius:4px;--color:var(--ion-color-primary,#3880ff);--icon-margin-end:-5px;--icon-margin-start:-4px;--icon-font-size:1.85em;--min-height:32px;font-size:17px}.button-native.sc-ion-back-button-ios{-webkit-transform:translateZ(0);transform:translateZ(0);overflow:visible;z-index:99}.activated.sc-ion-back-button-ios-h   .button-native.sc-ion-back-button-ios{opacity:.4}\@media (any-hover:hover){.sc-ion-back-button-ios-h:hover{--opacity:.6}}.ion-color.ion-focused.sc-ion-back-button-ios-h   .button-native.sc-ion-back-button-ios{background:rgba(var(--ion-color-base-rgb),.1)}"; }
    static get styleMode() { return "ios"; }
}

export { Anchor as IonAnchor, BackButton as IonBackButton };
