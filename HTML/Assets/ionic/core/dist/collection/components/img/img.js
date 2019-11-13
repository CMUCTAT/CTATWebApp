export class Img {
    constructor() {
        this.onLoad = () => {
            this.ionImgDidLoad.emit();
        };
        this.onError = () => {
            this.ionError.emit();
        };
    }
    srcChanged() {
        this.addIO();
    }
    componentDidLoad() {
        this.addIO();
    }
    addIO() {
        if (this.src === undefined) {
            return;
        }
        if ('IntersectionObserver' in window) {
            this.removeIO();
            this.io = new IntersectionObserver(data => {
                if (data[0].isIntersecting) {
                    this.load();
                    this.removeIO();
                }
            });
            this.io.observe(this.el);
        }
        else {
            setTimeout(() => this.load(), 200);
        }
    }
    load() {
        this.loadError = this.onError;
        this.loadSrc = this.src;
        this.ionImgWillLoad.emit();
    }
    removeIO() {
        if (this.io) {
            this.io.disconnect();
            this.io = undefined;
        }
    }
    hostData() {
        return {
            class: {
                [`${this.mode}`]: true,
            }
        };
    }
    render() {
        return (h("img", { src: this.loadSrc, alt: this.alt, decoding: "async", onLoad: this.onLoad, onError: this.loadError }));
    }
    static get is() { return "ion-img"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "alt": {
            "type": String,
            "attr": "alt"
        },
        "el": {
            "elementRef": true
        },
        "loadError": {
            "state": true
        },
        "loadSrc": {
            "state": true
        },
        "src": {
            "type": String,
            "attr": "src",
            "watchCallbacks": ["srcChanged"]
        }
    }; }
    static get events() { return [{
            "name": "ionImgWillLoad",
            "method": "ionImgWillLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionImgDidLoad",
            "method": "ionImgDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionError",
            "method": "ionError",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:ion-img:**/"; }
}
