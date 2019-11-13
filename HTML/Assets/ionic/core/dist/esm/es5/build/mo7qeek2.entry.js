import*as tslib_1 from"../polyfills/tslib.js";import{h}from"../ionic.core.js";import{b as hapticSelectionStart,a as hapticSelectionChanged,c as hapticSelectionEnd}from"./chunk-81780b86.js";var Reorder=function(){function e(){}return e.prototype.onClick=function(e){e.preventDefault(),e.stopImmediatePropagation()},e.prototype.hostData=function(){var e;return{class:(e={},e[""+this.mode]=!0,e)}},e.prototype.render=function(){return h("slot",null,h("ion-icon",{name:"reorder",lazy:!1,class:"reorder-icon"}))},Object.defineProperty(e,"is",{get:function(){return"ion-reorder"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"click",method:"onClick",capture:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px;font-size:34px;opacity:.4}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),e}(),ReorderGroup=function(){function e(){this.lastToIndex=-1,this.cachedHeights=[],this.scrollElTop=0,this.scrollElBottom=0,this.scrollElInitial=0,this.containerTop=0,this.containerBottom=0,this.state=0,this.disabled=!0}return e.prototype.disabledChanged=function(){this.gesture&&this.gesture.setDisabled(this.disabled)},e.prototype.componentDidLoad=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,t,r,o=this;return tslib_1.__generator(this,function(n){switch(n.label){case 0:return(e=this.el.closest("ion-content"))?[4,e.componentOnReady()]:[3,3];case 1:return n.sent(),t=this,[4,e.getScrollElement()];case 2:t.scrollEl=n.sent(),n.label=3;case 3:return r=this,[4,import("./chunk-ab1eff20.js")];case 4:return r.gesture=n.sent().createGesture({el:this.el,queue:this.queue,gestureName:"reorder",gesturePriority:110,threshold:0,direction:"y",passive:!1,canStart:function(e){return o.canStart(e)},onStart:function(e){return o.onStart(e)},onMove:function(e){return o.onMove(e)},onEnd:function(){return o.onEnd()}}),this.disabledChanged(),[2]}})})},e.prototype.componentDidUnload=function(){this.onEnd(),this.gesture&&(this.gesture.destroy(),this.gesture=void 0)},e.prototype.complete=function(e){return Promise.resolve(this.completeSync(e))},e.prototype.canStart=function(e){if(this.selectedItemEl||0!==this.state)return!1;var t=e.event.target.closest("ion-reorder");if(!t)return!1;var r=findReorderItem(t,this.el);return!!r&&(e.data=r,!0)},e.prototype.onStart=function(e){e.event.preventDefault();var t=this.selectedItemEl=e.data,r=this.cachedHeights;r.length=0;var o=this.el,n=o.children;if(n&&0!==n.length){for(var i=0,s=0;s<n.length;s++){var l=n[s];r.push(i+=l.offsetHeight),l.$ionIndex=s}var a=o.getBoundingClientRect();if(this.containerTop=a.top,this.containerBottom=a.bottom,this.scrollEl){var c=this.scrollEl.getBoundingClientRect();this.scrollElInitial=this.scrollEl.scrollTop,this.scrollElTop=c.top+AUTO_SCROLL_MARGIN,this.scrollElBottom=c.bottom-AUTO_SCROLL_MARGIN}else this.scrollElInitial=0,this.scrollElTop=0,this.scrollElBottom=0;this.lastToIndex=indexForItem(t),this.selectedItemHeight=t.offsetHeight,this.state=1,t.classList.add(ITEM_REORDER_SELECTED),hapticSelectionStart()}},e.prototype.onMove=function(e){var t=this.selectedItemEl;if(t){var r=this.autoscroll(e.currentY),o=this.containerTop-r,n=Math.max(o,Math.min(e.currentY,this.containerBottom-r)),i=r+n-e.startY,s=this.itemIndexForTop(n-o);if(s!==this.lastToIndex){var l=indexForItem(t);this.lastToIndex=s,hapticSelectionChanged(),this.reorderMove(l,s)}t.style.transform="translateY("+i+"px)"}},e.prototype.onEnd=function(){var e=this,t=this.selectedItemEl;if(this.state=2,t){var r=this.lastToIndex,o=indexForItem(t);r===o?(t.style.transition="transform 200ms ease-in-out",setTimeout(function(){return e.completeSync()},200)):this.ionItemReorder.emit({from:o,to:r,complete:this.completeSync.bind(this)}),hapticSelectionEnd()}else this.state=0},e.prototype.completeSync=function(e){var t=this.selectedItemEl;if(t&&2===this.state){var r=this.el.children,o=r.length,n=this.lastToIndex,i=indexForItem(t);e&&!0!==e||this.el.insertBefore(t,i<n?r[n+1]:r[n]),Array.isArray(e)&&(e=reorderArray(e,i,n));for(var s=0;s<o;s++)r[s].style.transform="";t.style.transition="",t.classList.remove(ITEM_REORDER_SELECTED),this.selectedItemEl=void 0,this.state=0}return e},e.prototype.itemIndexForTop=function(e){var t=this.cachedHeights,r=0;for(r=0;r<t.length&&!(t[r]>e);r++);return r},e.prototype.reorderMove=function(e,t){for(var r=this.selectedItemHeight,o=this.el.children,n=0;n<o.length;n++){var i="";n>e&&n<=t?i="translateY("+-r+"px)":n<e&&n>=t&&(i="translateY("+r+"px)"),o[n].style.transform=i}},e.prototype.autoscroll=function(e){if(!this.scrollEl)return 0;var t=0;return e<this.scrollElTop?t=-SCROLL_JUMP:e>this.scrollElBottom&&(t=SCROLL_JUMP),0!==t&&this.scrollEl.scrollBy(0,t),this.scrollEl.scrollTop-this.scrollElInitial},e.prototype.hostData=function(){var e;return{class:(e={},e[""+this.mode]=!0,e["reorder-enabled"]=!this.disabled,e["reorder-list-active"]=0!==this.state,e)}},Object.defineProperty(e,"is",{get:function(){return"ion-reorder-group"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{complete:{method:!0},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},doc:{context:"document"},el:{elementRef:!0},queue:{context:"queue"},state:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionItemReorder",method:"ionItemReorder",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".reorder-list-active>*{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;will-change:transform}.reorder-enabled{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.reorder-enabled ion-reorder{display:block;cursor:-webkit-grab;cursor:grab;pointer-events:all;-ms-touch-action:none;touch-action:none}.reorder-selected,.reorder-selected ion-reorder{cursor:-webkit-grabbing;cursor:grabbing}.reorder-selected{position:relative;-webkit-transition:none!important;transition:none!important;-webkit-box-shadow:0 0 10px rgba(0,0,0,.4);box-shadow:0 0 10px rgba(0,0,0,.4);opacity:.8;z-index:100}.reorder-visible ion-reorder .reorder-icon{-webkit-transform:translateZ(0);transform:translateZ(0)}"},enumerable:!0,configurable:!0}),e}();function indexForItem(e){return e.$ionIndex}function findReorderItem(e,t){for(var r;e;){if((r=e.parentElement)===t)return e;e=r}}var AUTO_SCROLL_MARGIN=60,SCROLL_JUMP=10,ITEM_REORDER_SELECTED="reorder-selected";function reorderArray(e,t,r){var o=e[t];return e.splice(t,1),e.splice(r,0,o),e.slice()}export{Reorder as IonReorder,ReorderGroup as IonReorderGroup};