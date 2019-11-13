import { createColorClasses, openURL } from '../../utils/theme';
export class BackButton {
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
    static get style() { return "/**style-placeholder:ion-back-button:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-back-button:**/"; }
}
