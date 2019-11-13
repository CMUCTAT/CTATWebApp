import { menuOverlayAnimation } from './animations/overlay';
import { menuPushAnimation } from './animations/push';
import { menuRevealAnimation } from './animations/reveal';
export class MenuController {
    constructor() {
        this.menus = [];
        this.menuAnimations = new Map();
        this.registerAnimation('reveal', menuRevealAnimation);
        this.registerAnimation('push', menuPushAnimation);
        this.registerAnimation('overlay', menuOverlayAnimation);
    }
    async open(menu) {
        const menuEl = await this.get(menu);
        if (menuEl) {
            return menuEl.open();
        }
        return false;
    }
    async close(menu) {
        const menuEl = await (menu !== undefined ? this.get(menu) : this.getOpen());
        if (menuEl !== undefined) {
            return menuEl.close();
        }
        return false;
    }
    async toggle(menu) {
        const menuEl = await this.get(menu);
        if (menuEl) {
            return menuEl.toggle();
        }
        return false;
    }
    async enable(enable, menu) {
        const menuEl = await this.get(menu);
        if (menuEl) {
            menuEl.disabled = !enable;
        }
        return menuEl;
    }
    async swipeGesture(enable, menu) {
        const menuEl = await this.get(menu);
        if (menuEl) {
            menuEl.swipeGesture = enable;
        }
        return menuEl;
    }
    async isOpen(menu) {
        if (menu != null) {
            const menuEl = await this.get(menu);
            return (menuEl !== undefined && menuEl.isOpen());
        }
        else {
            const menuEl = await this.getOpen();
            return menuEl !== undefined;
        }
    }
    async isEnabled(menu) {
        const menuEl = await this.get(menu);
        if (menuEl) {
            return !menuEl.disabled;
        }
        return false;
    }
    async get(menu) {
        if (Build.isDev) {
            if (menu === 'left') {
                console.error('menu.side=left is deprecated, use "start" instead');
                return undefined;
            }
            if (menu === 'right') {
                console.error('menu.side=right is deprecated, use "end" instead');
                return undefined;
            }
        }
        await this.waitUntilReady();
        if (menu === 'start' || menu === 'end') {
            const menuRef = this.find(m => m.side === menu && !m.disabled);
            if (menuRef) {
                return menuRef;
            }
            return this.find(m => m.side === menu);
        }
        else if (menu != null) {
            return this.find(m => m.menuId === menu);
        }
        const menuEl = this.find(m => !m.disabled);
        if (menuEl) {
            return menuEl;
        }
        return this.menus.length > 0 ? this.menus[0].el : undefined;
    }
    async getOpen() {
        await this.waitUntilReady();
        return this.getOpenSync();
    }
    async getMenus() {
        await this.waitUntilReady();
        return this.getMenusSync();
    }
    async isAnimating() {
        await this.waitUntilReady();
        return this.isAnimatingSync();
    }
    registerAnimation(name, animation) {
        this.menuAnimations.set(name, animation);
    }
    _getInstance() {
        return Promise.resolve(this);
    }
    _register(menu) {
        const menus = this.menus;
        if (menus.indexOf(menu) < 0) {
            if (!menu.disabled) {
                this._setActiveMenu(menu);
            }
            menus.push(menu);
        }
    }
    _unregister(menu) {
        const index = this.menus.indexOf(menu);
        if (index > -1) {
            this.menus.splice(index, 1);
        }
    }
    _setActiveMenu(menu) {
        const side = menu.side;
        this.menus
            .filter(m => m.side === side && m !== menu)
            .forEach(m => m.disabled = true);
    }
    async _setOpen(menu, shouldOpen, animated) {
        if (this.isAnimatingSync()) {
            return false;
        }
        if (shouldOpen) {
            const openedMenu = await this.getOpen();
            if (openedMenu && menu.el !== openedMenu) {
                await openedMenu.setOpen(false, false);
            }
        }
        return menu._setOpen(shouldOpen, animated);
    }
    async _createAnimation(type, menuCmp) {
        const animationBuilder = this.menuAnimations.get(type);
        if (!animationBuilder) {
            throw new Error('animation not registered');
        }
        const animation = await import('../../utils/animation')
            .then(mod => mod.create(animationBuilder, null, menuCmp));
        if (!this.config.getBoolean('animated', true)) {
            animation.duration(0);
        }
        return animation;
    }
    getOpenSync() {
        return this.find(m => m._isOpen);
    }
    getMenusSync() {
        return this.menus.map(menu => menu.el);
    }
    isAnimatingSync() {
        return this.menus.some(menu => menu.isAnimating);
    }
    find(predicate) {
        const instance = this.menus.find(predicate);
        if (instance !== undefined) {
            return instance.el;
        }
        return undefined;
    }
    waitUntilReady() {
        return Promise.all(Array.from(this.doc.querySelectorAll('ion-menu'))
            .map(menu => menu.componentOnReady()));
    }
    static get is() { return "ion-menu-controller"; }
    static get properties() { return {
        "_getInstance": {
            "method": true
        },
        "close": {
            "method": true
        },
        "config": {
            "context": "config"
        },
        "doc": {
            "context": "document"
        },
        "enable": {
            "method": true
        },
        "get": {
            "method": true
        },
        "getMenus": {
            "method": true
        },
        "getOpen": {
            "method": true
        },
        "isAnimating": {
            "method": true
        },
        "isEnabled": {
            "method": true
        },
        "isOpen": {
            "method": true
        },
        "open": {
            "method": true
        },
        "registerAnimation": {
            "method": true
        },
        "swipeGesture": {
            "method": true
        },
        "toggle": {
            "method": true
        }
    }; }
    static get style() { return "/**style-placeholder:ion-menu-controller:**/"; }
}