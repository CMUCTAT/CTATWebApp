var __awaiter=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(o,i){function s(e){try{a(n.next(e))}catch(e){i(e)}}function l(e){try{a(n.throw(e))}catch(e){i(e)}}function a(e){e.done?o(e.value):new r(function(t){t(e.value)}).then(s,l)}a((n=n.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}};Ionic.loadBundle("39fhulxe",["require","exports","./chunk-9f86f253.js"],function(e,t,r){var n=window.Ionic.h,o=function(){function e(){}return e.prototype.onClick=function(e){e.preventDefault(),e.stopImmediatePropagation()},e.prototype.hostData=function(){var e;return{class:(e={},e[""+this.mode]=!0,e)}},e.prototype.render=function(){return n("slot",null,n("ion-icon",{name:"reorder",lazy:!1,class:"reorder-icon"}))},Object.defineProperty(e,"is",{get:function(){return"ion-reorder"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"click",method:"onClick",capture:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"[slot].sc-ion-reorder-md-h{display:none;line-height:0;z-index:100}.reorder-icon.sc-ion-reorder-md{display:block;font-size:22px;font-size:31px;opacity:.3}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"md"},enumerable:!0,configurable:!0}),e}(),i=function(){function t(){this.lastToIndex=-1,this.cachedHeights=[],this.scrollElTop=0,this.scrollElBottom=0,this.scrollElInitial=0,this.containerTop=0,this.containerBottom=0,this.state=0,this.disabled=!0}return t.prototype.disabledChanged=function(){this.gesture&&this.gesture.setDisabled(this.disabled)},t.prototype.componentDidLoad=function(){return __awaiter(this,void 0,void 0,function(){var t,r,n,o=this;return __generator(this,function(i){switch(i.label){case 0:return(t=this.el.closest("ion-content"))?[4,t.componentOnReady()]:[3,3];case 1:return i.sent(),r=this,[4,t.getScrollElement()];case 2:r.scrollEl=i.sent(),i.label=3;case 3:return n=this,[4,new Promise(function(t,r){e(["./chunk-8ba32ba1.js"],t,r)})];case 4:return n.gesture=i.sent().createGesture({el:this.el,queue:this.queue,gestureName:"reorder",gesturePriority:110,threshold:0,direction:"y",passive:!1,canStart:function(e){return o.canStart(e)},onStart:function(e){return o.onStart(e)},onMove:function(e){return o.onMove(e)},onEnd:function(){return o.onEnd()}}),this.disabledChanged(),[2]}})})},t.prototype.componentDidUnload=function(){this.onEnd(),this.gesture&&(this.gesture.destroy(),this.gesture=void 0)},t.prototype.complete=function(e){return Promise.resolve(this.completeSync(e))},t.prototype.canStart=function(e){if(this.selectedItemEl||0!==this.state)return!1;var t=e.event.target.closest("ion-reorder");if(!t)return!1;var r=function(e,t){for(var r;e;){if((r=e.parentElement)===t)return e;e=r}}(t,this.el);return!!r&&(e.data=r,!0)},t.prototype.onStart=function(e){e.event.preventDefault();var t=this.selectedItemEl=e.data,n=this.cachedHeights;n.length=0;var o=this.el,i=o.children;if(i&&0!==i.length){for(var a=0,u=0;u<i.length;u++){var h=i[u];n.push(a+=h.offsetHeight),h.$ionIndex=u}var d=o.getBoundingClientRect();if(this.containerTop=d.top,this.containerBottom=d.bottom,this.scrollEl){var f=this.scrollEl.getBoundingClientRect();this.scrollElInitial=this.scrollEl.scrollTop,this.scrollElTop=f.top+l,this.scrollElBottom=f.bottom-l}else this.scrollElInitial=0,this.scrollElTop=0,this.scrollElBottom=0;this.lastToIndex=s(t),this.selectedItemHeight=t.offsetHeight,this.state=1,t.classList.add(c),r.hapticSelectionStart()}},t.prototype.onMove=function(e){var t=this.selectedItemEl;if(t){var n=this.autoscroll(e.currentY),o=this.containerTop-n,i=Math.max(o,Math.min(e.currentY,this.containerBottom-n)),l=n+i-e.startY,a=this.itemIndexForTop(i-o);if(a!==this.lastToIndex){var c=s(t);this.lastToIndex=a,r.hapticSelectionChanged(),this.reorderMove(c,a)}t.style.transform="translateY("+l+"px)"}},t.prototype.onEnd=function(){var e=this,t=this.selectedItemEl;if(this.state=2,t){var n=this.lastToIndex,o=s(t);n===o?(t.style.transition="transform 200ms ease-in-out",setTimeout(function(){return e.completeSync()},200)):this.ionItemReorder.emit({from:o,to:n,complete:this.completeSync.bind(this)}),r.hapticSelectionEnd()}else this.state=0},t.prototype.completeSync=function(e){var t,r,n,o,i=this.selectedItemEl;if(i&&2===this.state){var l=this.el.children,a=l.length,u=this.lastToIndex,h=s(i);e&&!0!==e||this.el.insertBefore(i,h<u?l[u+1]:l[u]),Array.isArray(e)&&(n=u,o=(t=e)[r=h],t.splice(r,1),t.splice(n,0,o),e=t.slice());for(var d=0;d<a;d++)l[d].style.transform="";i.style.transition="",i.classList.remove(c),this.selectedItemEl=void 0,this.state=0}return e},t.prototype.itemIndexForTop=function(e){var t=this.cachedHeights,r=0;for(r=0;r<t.length&&!(t[r]>e);r++);return r},t.prototype.reorderMove=function(e,t){for(var r=this.selectedItemHeight,n=this.el.children,o=0;o<n.length;o++){var i="";o>e&&o<=t?i="translateY("+-r+"px)":o<e&&o>=t&&(i="translateY("+r+"px)"),n[o].style.transform=i}},t.prototype.autoscroll=function(e){if(!this.scrollEl)return 0;var t=0;return e<this.scrollElTop?t=-a:e>this.scrollElBottom&&(t=a),0!==t&&this.scrollEl.scrollBy(0,t),this.scrollEl.scrollTop-this.scrollElInitial},t.prototype.hostData=function(){var e;return{class:(e={},e[""+this.mode]=!0,e["reorder-enabled"]=!this.disabled,e["reorder-list-active"]=0!==this.state,e)}},Object.defineProperty(t,"is",{get:function(){return"ion-reorder-group"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{complete:{method:!0},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},doc:{context:"document"},el:{elementRef:!0},queue:{context:"queue"},state:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"ionItemReorder",method:"ionItemReorder",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".reorder-list-active>*{-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;will-change:transform}.reorder-enabled{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.reorder-enabled ion-reorder{display:block;cursor:-webkit-grab;cursor:grab;pointer-events:all;-ms-touch-action:none;touch-action:none}.reorder-selected,.reorder-selected ion-reorder{cursor:-webkit-grabbing;cursor:grabbing}.reorder-selected{position:relative;-webkit-transition:none!important;transition:none!important;-webkit-box-shadow:0 0 10px rgba(0,0,0,.4);box-shadow:0 0 10px rgba(0,0,0,.4);opacity:.8;z-index:100}.reorder-visible ion-reorder .reorder-icon{-webkit-transform:translateZ(0);transform:translateZ(0)}"},enumerable:!0,configurable:!0}),t}();function s(e){return e.$ionIndex}var l=60,a=10,c="reorder-selected";t.IonReorder=o,t.IonReorderGroup=i,Object.defineProperty(t,"__esModule",{value:!0})});