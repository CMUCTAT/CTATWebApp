import*as tslib_1 from"../polyfills/tslib.js";import{h}from"../ionic.core.js";import{d as hostContext}from"./chunk-2f96b3d2.js";import{d as findItemLabel,e as renderHiddenInput}from"./chunk-6d7d2f8c.js";var Select=function(){function e(){var e=this;this.childOpts=[],this.inputId="ion-sel-"+selectIds++,this.didInit=!1,this.isExpanded=!1,this.disabled=!1,this.cancelText="Cancel",this.okText="OK",this.name=this.inputId,this.multiple=!1,this.interface="alert",this.interfaceOptions={},this.onFocus=function(){e.ionFocus.emit()},this.onBlur=function(){e.ionBlur.emit()}}return e.prototype.disabledChanged=function(){this.emitStyle()},e.prototype.valueChanged=function(){this.didInit&&(this.updateOptions(),this.ionChange.emit({value:this.value}),this.emitStyle())},e.prototype.selectOptionChanged=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,this.loadOptions()];case 1:return e.sent(),this.didInit&&(this.updateOptions(),this.updateOverlayOptions(),this.emitStyle(),void 0!==this.value&&this.el.forceUpdate()),[2]}})})},e.prototype.onClick=function(e){this.setFocus(),this.open(e)},e.prototype.componentDidLoad=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.loadOptions()];case 1:return t.sent(),void 0===this.value&&(this.multiple?(e=this.childOpts.filter(function(e){return e.selected}),this.value=e.map(function(e){return e.value})):(e=this.childOpts.find(function(e){return e.selected}))&&(this.value=e.value)),this.updateOptions(),this.emitStyle(),this.el.forceUpdate(),this.didInit=!0,[2]}})})},e.prototype.open=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){var t,n,i=this;return tslib_1.__generator(this,function(o){switch(o.label){case 0:return this.disabled||this.isExpanded?[2,void 0]:(n=this,[4,this.createOverlay(e)]);case 1:return t=n.overlay=o.sent(),this.isExpanded=!0,t.onDidDismiss().then(function(){i.overlay=void 0,i.isExpanded=!1,i.setFocus()}),[4,t.present()];case 2:return o.sent(),[2,t]}})})},e.prototype.createOverlay=function(e){var t=this.interface;return"action-sheet"!==t&&"popover"!==t||!this.multiple||(console.warn('Select interface cannot be "'+t+'" with a multi-value select. Using the "alert" interface instead.'),t="alert"),"popover"!==t||e||(console.warn('Select interface cannot be a "popover" without passing an event. Using the "alert" interface instead.'),t="alert"),"popover"===t?this.openPopover(e):"action-sheet"===t?this.openActionSheet():this.openAlert()},e.prototype.updateOverlayOptions=function(){if(this.overlay){var e=this.overlay;switch(this.interface){case"action-sheet":e.buttons=this.createActionSheetButtons(this.childOpts);break;case"popover":var t=e.querySelector("ion-select-popover");t&&(t.options=this.createPopoverOptions(this.childOpts));break;default:e.inputs=this.createAlertInputs(this.childOpts,this.multiple?"checkbox":"radio")}}},e.prototype.createActionSheetButtons=function(e){var t=this,n=e.map(function(e){return{role:e.selected?"selected":"",text:e.textContent,handler:function(){t.value=e.value}}});return n.push({text:this.cancelText,role:"cancel",handler:function(){t.ionCancel.emit()}}),n},e.prototype.createAlertInputs=function(e,t){return e.map(function(e){return{type:t,label:e.textContent,value:e.value,checked:e.selected,disabled:e.disabled}})},e.prototype.createPopoverOptions=function(e){var t=this;return e.map(function(e){return{text:e.textContent,value:e.value,checked:e.selected,disabled:e.disabled,handler:function(){t.value=e.value,t.close()}}})},e.prototype.openPopover=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){var t,n;return tslib_1.__generator(this,function(i){return t=this.interfaceOptions,n=Object.assign({mode:this.mode},t,{component:"ion-select-popover",cssClass:["select-popover",t.cssClass],event:e,componentProps:{header:t.header,subHeader:t.subHeader,message:t.message,value:this.value,options:this.createPopoverOptions(this.childOpts)}}),[2,this.popoverCtrl.create(n)]})})},e.prototype.openActionSheet=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,t;return tslib_1.__generator(this,function(n){return e=this.interfaceOptions,t=Object.assign({mode:this.mode},e,{buttons:this.createActionSheetButtons(this.childOpts),cssClass:["select-action-sheet",e.cssClass]}),[2,this.actionSheetCtrl.create(t)]})})},e.prototype.openAlert=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,t,n,i,o=this;return tslib_1.__generator(this,function(r){return e=this.getLabel(),t=e?e.textContent:null,n=this.interfaceOptions,i=Object.assign({mode:this.mode},n,{header:n.header?n.header:t,inputs:this.createAlertInputs(this.childOpts,this.multiple?"checkbox":"radio"),buttons:[{text:this.cancelText,role:"cancel",handler:function(){o.ionCancel.emit()}},{text:this.okText,handler:function(e){o.value=e}}],cssClass:["select-alert",n.cssClass,this.multiple?"multiple-select-alert":"single-select-alert"]}),[2,this.alertCtrl.create(i)]})})},e.prototype.close=function(){return this.overlay?this.overlay.dismiss():Promise.resolve(!1)},e.prototype.loadOptions=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return e=this,[4,Promise.all(Array.from(this.el.querySelectorAll("ion-select-option")).map(function(e){return e.componentOnReady()}))];case 1:return e.childOpts=t.sent(),[2]}})})},e.prototype.updateOptions=function(){for(var e=!0,t=0,n=this.childOpts;t<n.length;t++){var i=n[t],o=e&&isOptionSelected(this.value,i.value,this.compareWith);i.selected=o,o&&!this.multiple&&(e=!1)}},e.prototype.getLabel=function(){return findItemLabel(this.el)},e.prototype.hasValue=function(){return""!==this.getText()},e.prototype.getText=function(){var e=this.selectedText;return null!=e&&""!==e?e:generateText(this.childOpts,this.value,this.compareWith)},e.prototype.setFocus=function(){this.buttonEl&&this.buttonEl.focus()},e.prototype.emitStyle=function(){this.ionStyle.emit({interactive:!0,select:!0,"has-placeholder":null!=this.placeholder,"has-value":this.hasValue(),"interactive-disabled":this.disabled,"select-disabled":this.disabled})},e.prototype.hostData=function(){var e,t=this.inputId+"-lbl",n=findItemLabel(this.el);return n&&(n.id=t),{role:"combobox","aria-disabled":this.disabled?"true":null,"aria-expanded":""+this.isExpanded,"aria-haspopup":"dialog","aria-labelledby":t,class:(e={},e[""+this.mode]=!0,e["in-item"]=hostContext("ion-item",this.el),e["select-disabled"]=this.disabled,e)}},e.prototype.render=function(){var e=this;renderHiddenInput(!0,this.el,this.name,parseValue(this.value),this.disabled);var t=this.inputId+"-lbl",n=findItemLabel(this.el);n&&(n.id=t);var i=!1,o=this.getText();return""===o&&null!=this.placeholder&&(o=this.placeholder,i=!0),[h("div",{class:{"select-text":!0,"select-placeholder":i}},o),h("div",{class:"select-icon",role:"presentation"},h("div",{class:"select-icon-inner"})),h("button",{type:"button",onFocus:this.onFocus,onBlur:this.onBlur,disabled:this.disabled,ref:function(t){return e.buttonEl=t}})]},Object.defineProperty(e,"is",{get:function(){return"ion-select"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{actionSheetCtrl:{connect:"ion-action-sheet-controller"},alertCtrl:{connect:"ion-alert-controller"},cancelText:{type:String,attr:"cancel-text"},compareWith:{type:String,attr:"compare-with"},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},el:{elementRef:!0},interface:{type:String,attr:"interface"},interfaceOptions:{type:"Any",attr:"interface-options"},isExpanded:{state:!0},mode:{type:String,attr:"mode"},multiple:{type:Boolean,attr:"multiple"},name:{type:String,attr:"name"},okText:{type:String,attr:"ok-text"},open:{method:!0},placeholder:{type:String,attr:"placeholder"},popoverCtrl:{connect:"ion-popover-controller"},selectedText:{type:String,attr:"selected-text"},value:{type:"Any",attr:"value",mutable:!0,watchCallbacks:["valueChanged"]}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionChange",method:"ionChange",bubbles:!0,cancelable:!0,composed:!0},{name:"ionCancel",method:"ionCancel",bubbles:!0,cancelable:!0,composed:!0},{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0},{name:"ionStyle",method:"ionStyle",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"ionSelectOptionDidLoad",method:"selectOptionChanged"},{name:"ionSelectOptionDidUnload",method:"selectOptionChanged"},{name:"click",method:"onClick"}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return":host{padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;font-family:var(--ion-font-family,inherit);overflow:hidden;z-index:2}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}:host(.in-item){position:static;max-width:45%}:host(.select-disabled){opacity:.4;pointer-events:none}:host(.ion-focused) button{border:2px solid #5e9ed6}.select-placeholder{color:currentColor;opacity:.33}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}:host-context([dir=rtl]) button,[dir=rtl] button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}.select-icon{position:relative}.select-text{-ms-flex:1;flex:1;min-width:16px;font-size:inherit;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.select-icon-inner{left:5px;top:50%;margin-top:-3px;position:absolute;width:0;height:0;border-top:5px solid;border-right:5px solid transparent;border-left:5px solid transparent;color:currentColor;opacity:.33;pointer-events:none}:host-context([dir=rtl]) .select-icon-inner,[dir=rtl] .select-icon-inner{left:unset;right:unset;right:5px}:host{--padding-top:10px;--padding-end:8px;--padding-bottom:10px;--padding-start:16px}.select-icon{width:12px;height:18px}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),e}();function parseValue(e){if(null!=e)return Array.isArray(e)?e.join(","):e.toString()}function isOptionSelected(e,t,n){return void 0!==e&&(Array.isArray(e)?e.some(function(e){return compareOptions(e,t,n)}):compareOptions(e,t,n))}function compareOptions(e,t,n){return"function"==typeof n?n(e,t):"string"==typeof n?e[n]===t[n]:e===t}function generateText(e,t,n){return void 0===t?"":Array.isArray(t)?t.map(function(t){return textForValue(e,t,n)}).filter(function(e){return null!==e}).join(", "):textForValue(e,t,n)||""}function textForValue(e,t,n){var i=e.find(function(e){return compareOptions(e.value,t,n)});return i?i.textContent:null}var selectIds=0,SelectOption=function(){function e(){this.inputId="ion-selopt-"+selectOptionIds++,this.disabled=!1,this.selected=!1}return e.prototype.componentWillLoad=function(){void 0===this.value&&(this.value=this.el.textContent||"")},e.prototype.componentDidLoad=function(){this.ionSelectOptionDidLoad.emit()},e.prototype.componentDidUnload=function(){this.ionSelectOptionDidUnload.emit()},e.prototype.hostData=function(){var e;return{role:"option",id:this.inputId,class:(e={},e[""+this.mode]=!0,e)}},Object.defineProperty(e,"is",{get:function(){return"ion-select-option"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{disabled:{type:Boolean,attr:"disabled"},el:{elementRef:!0},selected:{type:Boolean,attr:"selected"},value:{type:"Any",attr:"value",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionSelectOptionDidLoad",method:"ionSelectOptionDidLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionSelectOptionDidUnload",method:"ionSelectOptionDidUnload",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return":host{display:none}"},enumerable:!0,configurable:!0}),e}(),selectOptionIds=0,SelectPopover=function(){function e(){this.options=[]}return e.prototype.onSelect=function(e){var t=this.options.find(function(t){return t.value===e.target.value});t&&t.handler&&t.handler()},e.prototype.hostData=function(){var e;return{class:(e={},e[""+this.mode]=!0,e)}},e.prototype.render=function(){return h("ion-list",null,void 0!==this.header&&h("ion-list-header",null,this.header),(void 0!==this.subHeader||void 0!==this.message)&&h("ion-item",null,h("ion-label",{"text-wrap":!0},void 0!==this.subHeader&&h("h3",null,this.subHeader),void 0!==this.message&&h("p",null,this.message))),h("ion-radio-group",null,this.options.map(function(e){return h("ion-item",null,h("ion-label",null,e.text),h("ion-radio",{checked:e.checked,value:e.value,disabled:e.disabled}))})))},Object.defineProperty(e,"is",{get:function(){return"ion-select-popover"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"scoped"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{header:{type:String,attr:"header"},message:{type:String,attr:"message"},options:{type:"Any",attr:"options"},subHeader:{type:String,attr:"sub-header"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"ionSelect",method:"onSelect"}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".sc-ion-select-popover-h   ion-list.sc-ion-select-popover{margin-left:0;margin-right:0;margin-top:-1px;margin-bottom:-1px}.sc-ion-select-popover-h   ion-label.sc-ion-select-popover, .sc-ion-select-popover-h   ion-list-header.sc-ion-select-popover{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}"},enumerable:!0,configurable:!0}),e}();export{Select as IonSelect,SelectOption as IonSelectOption,SelectPopover as IonSelectPopover};