const t=window.Ionic.h;import{j as e}from"./chunk-6d7d2f8c.js";import{a as n,b as o}from"./chunk-99929188.js";import"./chunk-90d954cd.js";import{c as i}from"./chunk-19910bac.js";class a{constructor(){this.url=""}onUpdate(t){this.ionRouteDataChanged.emit(t)}onComponentProps(t,e){if(t===e)return;const n=t?Object.keys(t):[],o=e?Object.keys(e):[];if(n.length===o.length){for(const o of n)if(t[o]!==e[o])return void this.onUpdate(t)}else this.onUpdate(t)}componentDidLoad(){this.ionRouteDataChanged.emit()}componentDidUnload(){this.ionRouteDataChanged.emit()}static get is(){return"ion-route"}static get properties(){return{component:{type:String,attr:"component",watchCallbacks:["onUpdate"]},componentProps:{type:"Any",attr:"component-props",watchCallbacks:["onComponentProps"]},url:{type:String,attr:"url",watchCallbacks:["onUpdate"]}}}static get events(){return[{name:"ionRouteDataChanged",method:"ionRouteDataChanged",bubbles:!0,cancelable:!0,composed:!0}]}}class r{propDidChange(){this.ionRouteRedirectChanged.emit()}componentDidLoad(){this.ionRouteRedirectChanged.emit()}componentDidUnload(){this.ionRouteRedirectChanged.emit()}static get is(){return"ion-route-redirect"}static get properties(){return{from:{type:String,attr:"from",watchCallbacks:["propDidChange"]},to:{type:String,attr:"to",watchCallbacks:["propDidChange"]}}}static get events(){return[{name:"ionRouteRedirectChanged",method:"ionRouteRedirectChanged",bubbles:!0,cancelable:!0,composed:!0}]}}const s="root",c="forward",h="back";function l(t){return"/"+t.filter(t=>t.length>0).join("/")}function u(t){if(null==t)return[""];const e=t.split("/").map(t=>t.trim()).filter(t=>t.length>0);return 0===e.length?[""]:e}const d=":not([no-router]) ion-nav, :not([no-router]) ion-tabs, :not([no-router]) ion-router-outlet";function m(t){if(!t)return;if(t.matches(d))return t;return t.querySelector(d)||void 0}function p(t,e){return e.find(e=>(function(t,e){const{from:n,to:o}=e;if(void 0===o)return!1;if(n.length>t.length)return!1;for(let e=0;e<n.length;e++){const o=n[e];if("*"===o)return!0;if(o!==t[e])return!1}return n.length===t.length})(t,e))}function g(t,e){const n=Math.min(t.length,e.length);let o=0;for(;o<n&&t[o].toLowerCase()===e[o].id;o++);return o}function f(t,e){const n=new v(t);let o,i=!1;for(let t=0;t<e.length;t++){const a=e[t].path;if(""===a[0])i=!0;else{for(const e of a){const i=n.next();if(":"===e[0]){if(""===i)return null;((o=o||[])[t]||(o[t]={}))[e.slice(1)]=i}else if(i!==e)return null}i=!1}}return i&&i!==(""===n.next())?null:o?e.map((t,e)=>({id:t.id,path:t.path,params:w(t.params,o[e])})):e}function w(t,e){return!t&&e?e:t&&!e?t:t&&e?Object.assign({},t,e):void 0}function b(t){let e=1,n=1;for(const o of t)for(const t of o.path)":"===t[0]?e+=Math.pow(1,n):""!==t&&(e+=Math.pow(2,n)),n++;return e}class v{constructor(t){this.path=t.slice()}next(){return this.path.length>0?this.path.shift():""}}function y(t){return Array.from(t.children).filter(t=>"ION-ROUTE-REDIRECT"===t.tagName).map(t=>{const e=C(t,"to");return{from:u(C(t,"from")),to:null==e?void 0:u(e)}})}function R(t){return function(t){const e=[];for(const n of t)k([],e,n);return e}(function t(e,n=e){return Array.from(n.children).filter(t=>"ION-ROUTE"===t.tagName&&t.component).map(n=>{const o=C(n,"component");if(null==o)throw new Error("component missing in ion-route");return{path:u(C(n,"url")),id:o.toLowerCase(),params:n.componentProps,children:t(e,n)}})}(t))}function C(t,e){return e in t?t[e]:t.hasAttribute(e)?t.getAttribute(e):null}function k(t,e,n){const o=t.slice();if(o.push({id:n.id,path:n.path,params:n.params}),0!==n.children.length)for(const t of n.children)k(o,e,t);else e.push(o)}class S{constructor(){this.previousPath=null,this.busy=!1,this.state=0,this.lastState=0,this.root="/",this.useHash=!0}async componentWillLoad(){var t;await(t=this.win,m(t.document.body)?Promise.resolve():new Promise(e=>{t.addEventListener("ionNavWillLoad",e,{once:!0})})),await this.onRoutesChanged()}componentDidLoad(){this.win.addEventListener("ionRouteRedirectChanged",e(this.onRedirectChanged.bind(this),10)),this.win.addEventListener("ionRouteDataChanged",e(this.onRoutesChanged.bind(this),100))}onPopState(){const t=this.historyDirection(),e=this.getPath();return this.writeNavStateRoot(e,t)}onBackButton(t){t.detail.register(0,()=>this.back())}push(t,e="forward"){t.startsWith(".")&&(t=new URL(t,this.win.location.href).pathname);const n=u(t);return this.setPath(n,e),this.writeNavStateRoot(n,e)}back(){return this.win.history.back(),Promise.resolve(this.waitPromise)}printDebug(){this.getPath(),function(t){console.group(`[ion-core] ROUTES[${t.length}]`);for(const e of t){const t=[];e.forEach(e=>t.push(...e.path));const n=e.map(t=>t.id);l(t),n.join(", ")}console.groupEnd()}(R(this.el)),function(t){console.group(`[ion-core] REDIRECTS[${t.length}]`);for(const e of t)e.to&&(l(e.from),l(e.to));console.groupEnd()}(y(this.el))}async navChanged(t){if(this.busy)return console.warn("[ion-router] router is busy, navChanged was cancelled"),!1;const{ids:e,outlet:n}=await async function(t){const e=[];let n,o=t;for(;n=m(o);){const t=await n.getRouteId();if(!t)break;o=t.element,t.element=void 0,e.push(t)}return{ids:e,outlet:n}}(this.win.document.body),o=function(t,e){let n=null,o=0;const i=t.map(t=>t.id);for(const t of e){const e=g(i,t);e>o&&(n=t,o=e)}return n?n.map((e,n)=>({id:e.id,path:e.path,params:w(e.params,t[n]&&t[n].params)})):null}(e,R(this.el));if(!o)return console.warn("[ion-router] no matching URL for ",e.map(t=>t.id)),!1;const i=function(t){const e=[];for(const n of t)for(const t of n.path)if(":"===t[0]){const o=n.params&&n.params[t.slice(1)];if(!o)return null;e.push(o)}else""!==t&&e.push(t);return e}(o);return i?(this.setPath(i,t),await this.safeWriteNavState(n,o,s,i,null,e.length),!0):(console.warn("[ion-router] router could not match path because some required param is missing"),!1)}onRedirectChanged(){const t=this.getPath();t&&p(t,y(this.el))&&this.writeNavStateRoot(t,s)}onRoutesChanged(){return this.writeNavStateRoot(this.getPath(),s)}historyDirection(){const t=this.win;null===t.history.state&&(this.state++,t.history.replaceState(this.state,t.document.title,t.document.location&&t.document.location.href));const e=t.history.state,n=this.lastState;return this.lastState=e,e>n?c:e<n?h:s}async writeNavStateRoot(t,e){if(!t)return console.error("[ion-router] URL is not part of the routing set"),!1;const n=p(t,y(this.el));let o=null;n&&(this.setPath(n.to,e),o=n.from,t=n.to);const i=function(t,e){let n=null,o=0;for(const i of e){const e=f(t,i);if(null!==e){const t=b(e);t>o&&(o=t,n=e)}}return n}(t,R(this.el));return i?this.safeWriteNavState(this.win.document.body,i,e,t,o):(console.error("[ion-router] the path does not match any route"),!1)}async safeWriteNavState(t,e,n,o,i,a=0){const r=await this.lock();let s=!1;try{s=await this.writeNavState(t,e,n,o,i,a)}catch(t){console.error(t)}return r(),s}async lock(){const t=this.waitPromise;let e;return this.waitPromise=new Promise(t=>e=t),void 0!==t&&await t,e}async writeNavState(t,e,n,o,i,a=0){if(this.busy)return console.warn("[ion-router] router is busy, transition was cancelled"),!1;this.busy=!0;const r=this.routeChangeEvent(o,i);r&&this.ionRouteWillChange.emit(r);const c=await async function t(e,n,o,i,a=!1){try{const r=m(e);if(i>=n.length||!r)return a;await r.componentOnReady();const c=n[i],h=await r.setRouteId(c.id,c.params,o);return h.changed&&(o=s,a=!0),a=await t(h.element,n,o,i+1,a),h.markVisible&&await h.markVisible(),a}catch(t){return console.error(t),!1}}(t,e,n,a);return this.busy=!1,r&&this.ionRouteDidChange.emit(r),c}setPath(t,e){this.state++,function(t,e,n,o,i,a){let r=l([...u(e),...o]);n&&(r="#"+r),i===c?t.pushState(a,"",r):t.replaceState(a,"",r)}(this.win.history,this.root,this.useHash,t,e,this.state)}getPath(){return function(t,e,n){let o=t.pathname;if(n){const e=t.hash;o="#"===e[0]?e.slice(1):""}return function(t,e){if(t.length>e.length)return null;if(t.length<=1&&""===t[0])return e;for(let n=0;n<t.length;n++)if(t[n].length>0&&t[n]!==e[n])return null;return e.length===t.length?[""]:e.slice(t.length)}(u(e),u(o))}(this.win.location,this.root,this.useHash)}routeChangeEvent(t,e){const n=this.previousPath,o=l(t);return this.previousPath=o,o===n?null:{from:n,redirectedFrom:e?l(e):null,to:o}}static get is(){return"ion-router"}static get properties(){return{back:{method:!0},config:{context:"config"},el:{elementRef:!0},navChanged:{method:!0},printDebug:{method:!0},push:{method:!0},queue:{context:"queue"},root:{type:String,attr:"root"},useHash:{type:Boolean,attr:"use-hash"},win:{context:"window"}}}static get events(){return[{name:"ionRouteWillChange",method:"ionRouteWillChange",bubbles:!0,cancelable:!0,composed:!0},{name:"ionRouteDidChange",method:"ionRouteDidChange",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"window:popstate",method:"onPopState"},{name:"document:ionBackButton",method:"onBackButton"}]}}class D{constructor(){this.animated=!0}swipeHandlerChanged(){this.gesture&&this.gesture.setDisabled(void 0===this.swipeHandler)}componentWillLoad(){this.ionNavWillLoad.emit()}async componentDidLoad(){this.gesture=(await import("./chunk-267dafff.js")).createSwipeBackGesture(this.el,this.queue,()=>!!this.swipeHandler&&this.swipeHandler.canStart(),()=>this.swipeHandler&&this.swipeHandler.onStart(),t=>this.ani&&this.ani.progressStep(t),(t,e,n)=>{this.ani&&this.ani.progressEnd(t,e,n),this.swipeHandler&&this.swipeHandler.onEnd(t)}),this.swipeHandlerChanged()}componentDidUnload(){this.activeEl=this.activeComponent=void 0,this.gesture&&(this.gesture.destroy(),this.gesture=void 0)}async commit(t,e,n){const o=await this.lock();let i=!1;try{i=await this.transition(t,e,n)}catch(t){console.error(t)}return o(),i}async setRouteId(t,e,n){return{changed:await this.setRoot(t,e,{duration:"root"===n?0:void 0,direction:"back"===n?"back":"forward"}),element:this.activeEl}}async getRouteId(){const t=this.activeEl;return t?{id:t.tagName,element:t}:void 0}async setRoot(t,e,i){if(this.activeComponent===t)return!1;const a=this.activeEl,r=await n(this.delegate,this.el,t,["ion-page","ion-page-invisible"],e);return this.activeComponent=t,this.activeEl=r,await this.commit(r,a,i),await o(this.delegate,a),!0}async transition(t,e,n={}){if(e===t)return!1;this.ionNavWillChange.emit();const{mode:o,queue:a,win:r,el:s}=this,c=this.animated&&this.config.getBoolean("animated",!0),h=this.animation||n.animationBuilder||this.config.get("navAnimation");return await i(Object.assign({mode:o,queue:a,animated:c,animationBuilder:h,window:r,enteringEl:t,leavingEl:e,baseEl:s,progressCallback:n.progressAnimation?t=>this.ani=t:void 0},n)),this.ionNavDidChange.emit(),!0}async lock(){const t=this.waitPromise;let e;return this.waitPromise=new Promise(t=>e=t),void 0!==t&&await t,e}render(){return t("slot",null)}static get is(){return"ion-router-outlet"}static get encapsulation(){return"shadow"}static get properties(){return{animated:{type:Boolean,attr:"animated"},animation:{type:"Any",attr:"animation"},commit:{method:!0},config:{context:"config"},delegate:{type:"Any",attr:"delegate"},el:{elementRef:!0},getRouteId:{method:!0},mode:{type:String,attr:"mode"},queue:{context:"queue"},setRouteId:{method:!0},swipeHandler:{type:"Any",attr:"swipe-handler",watchCallbacks:["swipeHandlerChanged"]},win:{context:"window"}}}static get events(){return[{name:"ionNavWillLoad",method:"ionNavWillLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionNavWillChange",method:"ionNavWillChange",bubbles:!1,cancelable:!0,composed:!0},{name:"ionNavDidChange",method:"ionNavDidChange",bubbles:!1,cancelable:!0,composed:!0}]}static get style(){return".sc-ion-router-outlet-h{left:0;right:0;top:0;bottom:0;position:absolute;contain:layout size style;overflow:hidden;z-index:0}"}}export{a as IonRoute,r as IonRouteRedirect,S as IonRouter,D as IonRouterOutlet};