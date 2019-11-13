import*as tslib_1 from"../polyfills/tslib.js";import{h}from"../ionic.core.js";import{c as present,d as dismiss,e as eventMethod,b as isCancel,f as createOverlay,g as dismissOverlay,h as getOverlay}from"./chunk-d97dc981.js";import{c as createColorClasses,a as getClassMap}from"./chunk-2f96b3d2.js";import{a as sanitizeDOMString}from"./chunk-8b4dfddb.js";function iosEnterAnimation(t,e,o){var n=new t,s=new t,i=e.host||e,r=e.querySelector(".toast-wrapper");switch(s.addElement(r),o){case"top":s.fromTo("translateY","-100%","calc(10px + var(--ion-safe-area-top, 0px))");break;case"middle":var a=Math.floor(i.clientHeight/2-r.clientHeight/2);r.style.top=a+"px",s.fromTo("opacity",.01,1);break;default:s.fromTo("translateY","100%","calc(-10px - var(--ion-safe-area-bottom, 0px))")}return Promise.resolve(n.addElement(i).easing("cubic-bezier(.155,1.105,.295,1.12)").duration(400).add(s))}function iosLeaveAnimation(t,e,o){var n=new t,s=new t,i=e.host||e,r=e.querySelector(".toast-wrapper");switch(s.addElement(r),o){case"top":s.fromTo("translateY","calc(10px + var(--ion-safe-area-top, 0px))","-100%");break;case"middle":s.fromTo("opacity",.99,0);break;default:s.fromTo("translateY","calc(-10px - var(--ion-safe-area-bottom, 0px))","100%")}return Promise.resolve(n.addElement(i).easing("cubic-bezier(.36,.66,.04,1)").duration(300).add(s))}function mdEnterAnimation(t,e,o){var n=new t,s=new t,i=e.host||e,r=e.querySelector(".toast-wrapper");switch(s.addElement(r),o){case"top":r.style.top="calc(8px + var(--ion-safe-area-top, 0px))",s.fromTo("opacity",.01,1);break;case"middle":var a=Math.floor(i.clientHeight/2-r.clientHeight/2);r.style.top=a+"px",s.fromTo("opacity",.01,1);break;default:r.style.bottom="calc(8px + var(--ion-safe-area-bottom, 0px))",s.fromTo("opacity",.01,1)}return Promise.resolve(n.addElement(i).easing("cubic-bezier(.36,.66,.04,1)").duration(400).add(s))}function mdLeaveAnimation(t,e){var o=new t,n=new t,s=e.host||e,i=e.querySelector(".toast-wrapper");return n.addElement(i),n.fromTo("opacity",.99,0),Promise.resolve(o.addElement(s).easing("cubic-bezier(.36,.66,.04,1)").duration(300).add(n))}var Toast=function(){function t(){this.presented=!1,this.duration=0,this.keyboardClose=!1,this.position="bottom",this.showCloseButton=!1,this.translucent=!1,this.animated=!0}return t.prototype.present=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){var t=this;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,present(this,"toastEnter",iosEnterAnimation,mdEnterAnimation,this.position)];case 1:return e.sent(),this.duration>0&&(this.durationTimeout=setTimeout(function(){return t.dismiss(void 0,"timeout")},this.duration)),[2]}})})},t.prototype.dismiss=function(t,e){return this.durationTimeout&&clearTimeout(this.durationTimeout),dismiss(this,t,e,"toastLeave",iosLeaveAnimation,mdLeaveAnimation,this.position)},t.prototype.onDidDismiss=function(){return eventMethod(this.el,"ionToastDidDismiss")},t.prototype.onWillDismiss=function(){return eventMethod(this.el,"ionToastWillDismiss")},t.prototype.getButtons=function(){var t=this,e=this.buttons?this.buttons.map(function(t){return"string"==typeof t?{text:t}:t}):[];return this.showCloseButton&&e.push({text:this.closeButtonText||"Close",handler:function(){return t.dismiss(void 0,"cancel")}}),e},t.prototype.buttonClick=function(t){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(o){switch(o.label){case 0:return isCancel(e=t.role)?[2,this.dismiss(void 0,e)]:[4,this.callButtonHandler(t)];case 1:return o.sent()?[2,this.dismiss(void 0,t.role)]:[2,Promise.resolve()]}})})},t.prototype.callButtonHandler=function(t){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(o){switch(o.label){case 0:if(!t||!t.handler)return[3,4];o.label=1;case 1:return o.trys.push([1,3,,4]),[4,t.handler()];case 2:return!1===o.sent()?[2,!1]:[3,4];case 3:return e=o.sent(),console.error(e),[3,4];case 4:return[2,!0]}})})},t.prototype.hostData=function(){var t;return{style:{zIndex:6e4+this.overlayIndex},class:Object.assign((t={},t[""+this.mode]=!0,t),createColorClasses(this.color),getClassMap(this.cssClass),{"toast-translucent":this.translucent})}},t.prototype.renderButtons=function(t,e){var o,n=this;if(0!==t.length){var s=((o={"toast-button-group":!0})["toast-button-group-"+e]=!0,o);return h("div",{class:s},t.map(function(t){return h("button",{type:"button",class:buttonClass(t),tabIndex:0,onClick:function(){return n.buttonClick(t)}},h("div",{class:"toast-button-inner"},t.icon&&h("ion-icon",{name:t.icon,slot:void 0===t.text?"icon-only":void 0,class:"toast-icon"}),t.text),"md"===n.mode&&h("ion-ripple-effect",{type:void 0!==t.icon&&void 0===t.text?"unbounded":"bounded"}))}))}},t.prototype.render=function(){var t,e=this.getButtons(),o=e.filter(function(t){return"start"===t.side}),n=e.filter(function(t){return"start"!==t.side}),s=((t={"toast-wrapper":!0})["toast-"+this.position]=!0,t);return h("div",{class:s},h("div",{class:"toast-container"},this.renderButtons(o,"start"),h("div",{class:"toast-content"},void 0!==this.header&&h("div",{class:"toast-header"},this.header),void 0!==this.message&&h("div",{class:"toast-message",innerHTML:sanitizeDOMString(this.message)})),this.renderButtons(n,"end")))},Object.defineProperty(t,"is",{get:function(){return"ion-toast"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{animated:{type:Boolean,attr:"animated"},buttons:{type:"Any",attr:"buttons"},closeButtonText:{type:String,attr:"close-button-text"},color:{type:String,attr:"color"},config:{context:"config"},cssClass:{type:String,attr:"css-class"},dismiss:{method:!0},duration:{type:Number,attr:"duration"},el:{elementRef:!0},enterAnimation:{type:"Any",attr:"enter-animation"},header:{type:String,attr:"header"},keyboardClose:{type:Boolean,attr:"keyboard-close"},leaveAnimation:{type:"Any",attr:"leave-animation"},message:{type:String,attr:"message"},mode:{type:String,attr:"mode"},onDidDismiss:{method:!0},onWillDismiss:{method:!0},overlayIndex:{type:Number,attr:"overlay-index"},position:{type:String,attr:"position"},present:{method:!0},showCloseButton:{type:Boolean,attr:"show-close-button"},translucent:{type:Boolean,attr:"translucent"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"ionToastDidPresent",method:"didPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionToastWillPresent",method:"willPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionToastWillDismiss",method:"willDismiss",bubbles:!0,cancelable:!0,composed:!0},{name:"ionToastDidDismiss",method:"didDismiss",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-ion-toast-ios-h{--border-width:0;--border-style:none;--border-color:initial;--box-shadow:none;--min-width:auto;--width:auto;--min-height:auto;--height:auto;--max-height:auto;left:0;top:0;display:block;position:absolute;width:100%;height:100%;color:var(--color);font-family:var(--ion-font-family,inherit);contain:strict;z-index:1000;pointer-events:none}[dir=rtl].sc-ion-toast-ios-h, [dir=rtl]   .sc-ion-toast-ios-h{left:unset;right:unset;right:0}.overlay-hidden.sc-ion-toast-ios-h{display:none}.ion-color.sc-ion-toast-ios-h{--button-color:inherit;color:var(--ion-color-contrast)}.ion-color.sc-ion-toast-ios-h   .toast-wrapper.sc-ion-toast-ios{background:var(--ion-color-base)}.toast-wrapper.sc-ion-toast-ios{border-radius:var(--border-radius);left:var(--start);right:var(--end);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}[dir=rtl].sc-ion-toast-ios-h   .toast-wrapper.sc-ion-toast-ios, [dir=rtl]   .sc-ion-toast-ios-h   .toast-wrapper.sc-ion-toast-ios, [dir=rtl].sc-ion-toast-ios   .toast-wrapper.sc-ion-toast-ios{left:unset;right:unset;left:var(--end);right:var(--start)}.toast-container.sc-ion-toast-ios{-ms-flex-align:center;align-items:center;pointer-events:auto;contain:content}.toast-container.sc-ion-toast-ios, .toast-content.sc-ion-toast-ios{display:-ms-flexbox;display:flex}.toast-content.sc-ion-toast-ios{-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.toast-message.sc-ion-toast-ios{-ms-flex:1;flex:1;white-space:pre-wrap}.toast-button-group.sc-ion-toast-ios{display:-ms-flexbox;display:flex}.toast-button.sc-ion-toast-ios{outline:none;color:var(--button-color);z-index:0}.toast-icon.sc-ion-toast-ios{font-size:1.4em}.toast-button-inner.sc-ion-toast-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}\@media (any-hover:hover){.toast-button.sc-ion-toast-ios:hover{cursor:pointer}}.sc-ion-toast-ios-h{--background:var(--ion-color-step-50,#f2f2f2);--border-radius:14px;--button-color:var(--ion-color-primary,#3880ff);--color:var(--ion-color-step-850,#262626);--max-width:700px;--start:10px;--end:10px;font-size:14px}.toast-wrapper.sc-ion-toast-ios{margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;display:block;position:absolute;z-index:10}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-wrapper.sc-ion-toast-ios{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}.toast-translucent.sc-ion-toast-ios-h   .toast-wrapper.sc-ion-toast-ios{background:rgba(var(--ion-background-color-rgb,255,255,255),.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.toast-wrapper.toast-top.sc-ion-toast-ios{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);top:0}.toast-wrapper.toast-middle.sc-ion-toast-ios{opacity:.01}.toast-wrapper.toast-bottom.sc-ion-toast-ios{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);bottom:0}.toast-content.sc-ion-toast-ios{padding-left:15px;padding-right:15px;padding-top:15px;padding-bottom:15px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-content.sc-ion-toast-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-header.sc-ion-toast-ios{margin-bottom:2px;font-weight:500}.toast-button.sc-ion-toast-ios{padding-left:15px;padding-right:15px;padding-top:10px;padding-bottom:10px;height:44px;-webkit-transition:background-color,opacity .1s linear;transition:background-color,opacity .1s linear;border:0;background-color:transparent;font-family:var(--ion-font-family);font-size:17px;font-weight:500;overflow:hidden}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-button.sc-ion-toast-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-button.activated.sc-ion-toast-ios{opacity:.4}\@media (any-hover:hover){.toast-button.sc-ion-toast-ios:hover{opacity:.6}}"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),t}();function buttonClass(t){var e;return Object.assign(((e={"toast-button":!0,"toast-button-icon-only":void 0!==t.icon&&void 0===t.text})["toast-button-"+t.role]=void 0!==t.role,e["ion-focusable"]=!0,e["ion-activatable"]=!0,e),getClassMap(t.cssClass))}var ToastController=function(){function t(){}return t.prototype.create=function(t){return createOverlay(this.doc.createElement("ion-toast"),t)},t.prototype.dismiss=function(t,e,o){return dismissOverlay(this.doc,t,e,"ion-toast",o)},t.prototype.getTop=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return[2,getOverlay(this.doc,"ion-toast")]})})},Object.defineProperty(t,"is",{get:function(){return"ion-toast-controller"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{create:{method:!0},dismiss:{method:!0},doc:{context:"document"},getTop:{method:!0}}},enumerable:!0,configurable:!0}),t}();export{Toast as IonToast,ToastController as IonToastController};