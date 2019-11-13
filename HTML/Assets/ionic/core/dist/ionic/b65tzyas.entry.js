const e=window.Ionic.h;import{c as t,d as i}from"./chunk-2f96b3d2.js";import{d as s,e as o}from"./chunk-6d7d2f8c.js";import{d as a}from"./chunk-81780b86.js";class n{constructor(){this.inputId=`ion-tg-${l++}`,this.lastDrag=0,this.activated=!1,this.name=this.inputId,this.checked=!1,this.disabled=!1,this.value="on",this.onFocus=(()=>{this.ionFocus.emit()}),this.onBlur=(()=>{this.ionBlur.emit()})}checkedChanged(e){this.ionChange.emit({checked:e,value:this.value})}disabledChanged(){this.emitStyle(),this.gesture&&this.gesture.setDisabled(this.disabled)}componentWillLoad(){this.emitStyle()}async componentDidLoad(){this.gesture=(await import("./chunk-ab1eff20.js")).createGesture({el:this.el,queue:this.queue,gestureName:"toggle",gesturePriority:100,threshold:5,passive:!1,onStart:()=>this.onStart(),onMove:e=>this.onMove(e),onEnd:e=>this.onEnd(e)}),this.disabledChanged()}componentDidUnload(){this.gesture&&(this.gesture.destroy(),this.gesture=void 0)}onClick(){this.lastDrag+300<Date.now()&&(this.checked=!this.checked)}emitStyle(){this.ionStyle.emit({"interactive-disabled":this.disabled})}onStart(){this.activated=!0,this.setFocus()}onMove(e){(function(e,t,i,s){const o="rtl"===e.dir;return t?!o&&-10>i||o&&10<i:!o&&10<i||o&&-10>i})(this.doc,this.checked,e.deltaX)&&(this.checked=!this.checked,a())}onEnd(e){this.activated=!1,this.lastDrag=Date.now(),e.event.preventDefault(),e.event.stopImmediatePropagation()}getValue(){return this.value||""}setFocus(){this.buttonEl&&this.buttonEl.focus()}hostData(){const{inputId:e,disabled:o,checked:a,activated:n,color:l,el:c}=this,d=e+"-lbl",h=s(c);return h&&(h.id=d),{role:"checkbox","aria-disabled":o?"true":null,"aria-checked":`${a}`,"aria-labelledby":d,class:Object.assign({},t(l),{[`${this.mode}`]:!0,"in-item":i("ion-item",c),"toggle-activated":n,"toggle-checked":a,"toggle-disabled":o,interactive:!0})}}render(){const t=this.getValue();return o(!0,this.el,this.name,this.checked?t:"",this.disabled),[e("div",{class:"toggle-icon"},e("div",{class:"toggle-inner"})),e("button",{type:"button",onFocus:this.onFocus,onBlur:this.onBlur,disabled:this.disabled,ref:e=>this.buttonEl=e})]}static get is(){return"ion-toggle"}static get encapsulation(){return"shadow"}static get properties(){return{activated:{state:!0},checked:{type:Boolean,attr:"checked",mutable:!0,watchCallbacks:["checkedChanged"]},color:{type:String,attr:"color"},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},doc:{context:"document"},el:{elementRef:!0},mode:{type:String,attr:"mode"},name:{type:String,attr:"name"},queue:{context:"queue"},value:{type:String,attr:"value"}}}static get events(){return[{name:"ionChange",method:"ionChange",bubbles:!0,cancelable:!0,composed:!0},{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0},{name:"ionStyle",method:"ionStyle",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"click",method:"onClick"}]}static get style(){return":host{-webkit-box-sizing:content-box!important;box-sizing:content-box!important;display:inline-block;outline:none;contain:content;cursor:pointer;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.ion-focused) input{border:2px solid #5e9ed6}:host(.toggle-disabled){pointer-events:none}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}:host-context([dir=rtl]) button,[dir=rtl] button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}:host{--background:var(--ion-item-background,var(--ion-background-color,#fff));--background-checked:var(--ion-color-primary,#3880ff);--handle-background:var(--ion-item-background,var(--ion-background-color,#fff));--handle-background-checked:var(--ion-item-background,var(--ion-background-color,#fff));-webkit-box-sizing:content-box;box-sizing:content-box;position:relative;width:51px;height:32px;contain:strict}:host(.ion-color.toggle-checked) .toggle-icon{background:var(--ion-color-base)}.toggle-icon{border-radius:16px;display:block;position:relative;width:100%;height:100%;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-transition:background-color .3s;transition:background-color .3s;background-color:var(--ion-color-step-50,#f2f2f2);overflow:hidden;pointer-events:none}.toggle-icon:before{right:2px;bottom:2px;border-radius:16px;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;background:var(--background);content:\"\"}.toggle-icon:before,.toggle-inner{left:2px;top:2px;position:absolute}.toggle-inner{border-radius:14px;width:28px;height:28px;-webkit-transition:width .12s ease-in-out 80ms,left .11s ease-in-out 80ms,right .11s ease-in-out 80ms,-webkit-transform .3s;transition:width .12s ease-in-out 80ms,left .11s ease-in-out 80ms,right .11s ease-in-out 80ms,-webkit-transform .3s;transition:transform .3s,width .12s ease-in-out 80ms,left .11s ease-in-out 80ms,right .11s ease-in-out 80ms;transition:transform .3s,width .12s ease-in-out 80ms,left .11s ease-in-out 80ms,right .11s ease-in-out 80ms,-webkit-transform .3s;background:var(--handle-background);-webkit-box-shadow:0 3px 12px rgba(0,0,0,.16),0 3px 1px rgba(0,0,0,.1);box-shadow:0 3px 12px rgba(0,0,0,.16),0 3px 1px rgba(0,0,0,.1);will-change:transform;contain:strict}:host-context([dir=rtl]) .toggle-inner,[dir=rtl] .toggle-inner{left:unset;right:unset;right:2px}:host(.toggle-checked) .toggle-icon{background:var(--background-checked)}:host(.toggle-activated) .toggle-icon:before,:host(.toggle-checked) .toggle-icon:before{-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0)}:host(.toggle-checked) .toggle-inner{-webkit-transform:translate3d(19px,0,0);transform:translate3d(19px,0,0);background:var(--handle-background-checked)}:host-context([dir=rtl]).toggle-checked .toggle-inner,:host-context([dir=rtl]):host(.toggle-checked) .toggle-inner{-webkit-transform:translate3d(calc(-1 * 19px),0,0);transform:translate3d(calc(-1 * 19px),0,0)}:host(.toggle-activated.toggle-checked) .toggle-inner:before{-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0)}:host(.toggle-activated) .toggle-inner{width:34px}:host(.toggle-activated.toggle-checked) .toggle-inner{left:-4px}:host-context([dir=rtl]).toggle-activated.toggle-checked .toggle-inner,:host-context([dir=rtl]):host(.toggle-activated.toggle-checked) .toggle-inner{left:unset;right:unset;right:-4px}:host(.toggle-disabled){opacity:.3}:host(.in-item[slot]){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:16px;padding-right:8px;padding-top:6px;padding-bottom:5px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-item[slot]){padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:8px;padding-inline-end:8px}}:host(.in-item[slot=start]){padding-left:0;padding-right:16px;padding-top:6px;padding-bottom:5px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-item[slot=start]){padding-left:unset;padding-right:unset;-webkit-padding-start:0;padding-inline-start:0;-webkit-padding-end:16px;padding-inline-end:16px}}"}static get styleMode(){return"ios"}}let l=0;export{n as IonToggle};