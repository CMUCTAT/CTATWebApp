import { createColorClasses } from '../../utils/theme';
export class Toolbar {
    constructor() {
        this.childrenStyles = new Map();
    }
    componentWillLoad() {
        const buttons = Array.from(this.el.querySelectorAll('ion-buttons'));
        const firstButtons = buttons.find(button => {
            return button.slot === 'start';
        });
        if (firstButtons) {
            firstButtons.classList.add('buttons-first-slot');
        }
        const buttonsReversed = buttons.reverse();
        const lastButtons = buttonsReversed.find(button => button.slot === 'end') ||
            buttonsReversed.find(button => button.slot === 'primary') ||
            buttonsReversed.find(button => button.slot === 'secondary');
        if (lastButtons) {
            lastButtons.classList.add('buttons-last-slot');
        }
    }
    childrenStyle(ev) {
        ev.stopPropagation();
        const tagName = ev.target.tagName;
        const updatedStyles = ev.detail;
        const newStyles = {};
        const childStyles = this.childrenStyles.get(tagName) || {};
        let hasStyleChange = false;
        Object.keys(updatedStyles).forEach(key => {
            const childKey = `toolbar-${key}`;
            const newValue = updatedStyles[key];
            if (newValue !== childStyles[childKey]) {
                hasStyleChange = true;
            }
            if (newValue) {
                newStyles[childKey] = true;
            }
        });
        if (hasStyleChange) {
            this.childrenStyles.set(tagName, newStyles);
            this.el.forceUpdate();
        }
    }
    hostData() {
        const childStyles = {};
        this.childrenStyles.forEach(value => {
            Object.assign(childStyles, value);
        });
        return {
            class: Object.assign({ [`${this.mode}`]: true }, childStyles, createColorClasses(this.color))
        };
    }
    render() {
        return [
            h("div", { class: "toolbar-background" }),
            h("div", { class: "toolbar-container" },
                h("slot", { name: "start" }),
                h("slot", { name: "secondary" }),
                h("div", { class: "toolbar-content" },
                    h("slot", null)),
                h("slot", { name: "primary" }),
                h("slot", { name: "end" }))
        ];
    }
    static get is() { return "ion-toolbar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "config": {
            "context": "config"
        },
        "el": {
            "elementRef": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        }
    }; }
    static get listeners() { return [{
            "name": "ionStyle",
            "method": "childrenStyle"
        }]; }
    static get style() { return "/**style-placeholder:ion-toolbar:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-toolbar:**/"; }
}
