const e=window.Ionic.h;import{c as t,d as i}from"./chunk-2f96b3d2.js";import{d as o}from"./chunk-6d7d2f8c.js";class a{constructor(){this.inputId=`ion-rb-${l++}`,this.name=this.inputId,this.disabled=!1,this.checked=!1,this.onFocus=(()=>{this.ionFocus.emit()}),this.onBlur=(()=>{this.ionBlur.emit()})}colorChanged(){this.emitStyle()}checkedChanged(e){e&&this.ionSelect.emit({checked:!0,value:this.value}),this.emitStyle()}disabledChanged(){this.emitStyle()}componentWillLoad(){void 0===this.value&&(this.value=this.inputId),this.emitStyle()}componentDidLoad(){this.ionRadioDidLoad.emit()}componentDidUnload(){this.ionRadioDidUnload.emit()}onClick(){this.checked?this.ionDeselect.emit():this.checked=!0}emitStyle(){this.ionStyle.emit({"radio-checked":this.checked,"interactive-disabled":this.disabled})}hostData(){const{inputId:e,disabled:a,checked:l,color:n,el:d}=this,s=e+"-lbl",c=o(d);return c&&(c.id=s),{role:"radio","aria-disabled":a?"true":null,"aria-checked":`${l}`,"aria-labelledby":s,class:Object.assign({},t(n),{[`${this.mode}`]:!0,"in-item":i("ion-item",d),interactive:!0,"radio-checked":l,"radio-disabled":a})}}render(){return[e("div",{class:"radio-icon"},e("div",{class:"radio-inner"})),e("button",{type:"button",onFocus:this.onFocus,onBlur:this.onBlur,disabled:this.disabled})]}static get is(){return"ion-radio"}static get encapsulation(){return"shadow"}static get properties(){return{checked:{type:Boolean,attr:"checked",mutable:!0,watchCallbacks:["checkedChanged"]},color:{type:String,attr:"color",watchCallbacks:["colorChanged"]},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},el:{elementRef:!0},mode:{type:String,attr:"mode"},name:{type:String,attr:"name"},value:{type:"Any",attr:"value",mutable:!0}}}static get events(){return[{name:"ionRadioDidLoad",method:"ionRadioDidLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionRadioDidUnload",method:"ionRadioDidUnload",bubbles:!0,cancelable:!0,composed:!0},{name:"ionStyle",method:"ionStyle",bubbles:!0,cancelable:!0,composed:!0},{name:"ionSelect",method:"ionSelect",bubbles:!0,cancelable:!0,composed:!0},{name:"ionDeselect",method:"ionDeselect",bubbles:!0,cancelable:!0,composed:!0},{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"click",method:"onClick"}]}static get style(){return":host{display:inline-block;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.radio-disabled){pointer-events:none}.radio-icon{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;contain:layout size style}.radio-icon,button{width:100%;height:100%}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}:host-context([dir=rtl]) button,[dir=rtl] button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}.radio-icon,.radio-inner{-webkit-box-sizing:border-box;box-sizing:border-box}:host{--color:var(--ion-color-step-400,#999);--color-checked:var(--ion-color-primary,#3880ff);--border-width:2px;--border-style:solid;width:20px;height:20px}:host(.ion-color) .radio-inner{background:var(--ion-color-base)}:host(.ion-color.radio-checked) .radio-icon{border-color:var(--ion-color-base)}.radio-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;border-radius:50%;border-width:var(--border-width);border-style:var(--border-style);border-color:var(--color)}.radio-inner{border-radius:50%;width:calc(50% + var(--border-width));height:calc(50% + var(--border-width));-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0);-webkit-transition:-webkit-transform .28s cubic-bezier(.4,0,.2,1);transition:-webkit-transform .28s cubic-bezier(.4,0,.2,1);transition:transform .28s cubic-bezier(.4,0,.2,1);transition:transform .28s cubic-bezier(.4,0,.2,1),-webkit-transform .28s cubic-bezier(.4,0,.2,1);background:var(--color-checked)}:host(.radio-checked) .radio-icon{border-color:var(--color-checked)}:host(.radio-checked) .radio-inner{-webkit-transform:scaleX(1);transform:scaleX(1)}:host(.radio-disabled){opacity:.3}:host(.ion-focused) .radio-icon:after{border-radius:50%;left:-12px;top:-12px;display:block;position:absolute;width:36px;height:36px;background:var(--ion-color-primary-tint,#4c8dff);content:\"\";opacity:.2}:host-context([dir=rtl]).ion-focused .radio-icon:after,:host-context([dir=rtl]):host(.ion-focused) .radio-icon:after{left:unset;right:unset;right:-12px}:host(.in-item){margin-left:0;margin-right:0;margin-top:9px;margin-bottom:9px;display:block;position:static}:host(.in-item[slot=start]){margin-left:4px;margin-right:36px;margin-top:11px;margin-bottom:10px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-item[slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:4px;margin-inline-start:4px;-webkit-margin-end:36px;margin-inline-end:36px}}"}static get styleMode(){return"md"}}let l=0;class n{constructor(){this.inputId=`ion-rg-${d++}`,this.labelId=`${this.inputId}-lbl`,this.radios=[],this.allowEmptySelection=!1,this.name=this.inputId}valueChanged(e){this.updateRadios(),this.ionChange.emit({value:e})}onRadioDidLoad(e){const t=e.target;t.name=this.name,this.radios.push(t),null==this.value&&t.checked?this.value=t.value:this.updateRadios()}onRadioDidUnload(e){const t=this.radios.indexOf(e.target);t>-1&&this.radios.splice(t,1)}onRadioSelect(e){const t=e.target;t&&(this.value=t.value)}onRadioDeselect(e){if(this.allowEmptySelection){const t=e.target;t&&(t.checked=!1,this.value=void 0)}}componentDidLoad(){let e=this.el.querySelector("ion-list-header");if(e||(e=this.el.querySelector("ion-item-divider")),e){const t=e.querySelector("ion-label");t&&(this.labelId=t.id=this.name+"-lbl")}this.updateRadios()}updateRadios(){const e=this.value;let t=!1;for(const i of this.radios)t||i.value!==e?i.checked=!1:(t=!0,i.checked=!0)}hostData(){return{role:"radiogroup","aria-labelledby":this.labelId,class:{[`${this.mode}`]:!0}}}static get is(){return"ion-radio-group"}static get properties(){return{allowEmptySelection:{type:Boolean,attr:"allow-empty-selection"},el:{elementRef:!0},name:{type:String,attr:"name"},value:{type:"Any",attr:"value",mutable:!0,watchCallbacks:["valueChanged"]}}}static get events(){return[{name:"ionChange",method:"ionChange",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"ionRadioDidLoad",method:"onRadioDidLoad"},{name:"ionRadioDidUnload",method:"onRadioDidUnload"},{name:"ionSelect",method:"onRadioSelect"},{name:"ionDeselect",method:"onRadioDeselect"}]}}let d=0;export{a as IonRadio,n as IonRadioGroup};