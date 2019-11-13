import{h}from"../ionic.core.js";var Img=function(){function e(){var e=this;this.onLoad=function(){e.ionImgDidLoad.emit()},this.onError=function(){e.ionError.emit()}}return e.prototype.srcChanged=function(){this.addIO()},e.prototype.componentDidLoad=function(){this.addIO()},e.prototype.addIO=function(){var e=this;void 0!==this.src&&("IntersectionObserver"in window?(this.removeIO(),this.io=new IntersectionObserver(function(o){o[0].isIntersecting&&(e.load(),e.removeIO())}),this.io.observe(this.el)):setTimeout(function(){return e.load()},200))},e.prototype.load=function(){this.loadError=this.onError,this.loadSrc=this.src,this.ionImgWillLoad.emit()},e.prototype.removeIO=function(){this.io&&(this.io.disconnect(),this.io=void 0)},e.prototype.hostData=function(){var e;return{class:(e={},e[""+this.mode]=!0,e)}},e.prototype.render=function(){return h("img",{src:this.loadSrc,alt:this.alt,decoding:"async",onLoad:this.onLoad,onError:this.loadError})},Object.defineProperty(e,"is",{get:function(){return"ion-img"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{alt:{type:String,attr:"alt"},el:{elementRef:!0},loadError:{state:!0},loadSrc:{state:!0},src:{type:String,attr:"src",watchCallbacks:["srcChanged"]}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionImgWillLoad",method:"ionImgWillLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionImgDidLoad",method:"ionImgDidLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionError",method:"ionError",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return":host{-o-object-fit:contain;object-fit:contain}:host,img{display:block}img{width:100%;height:100%;-o-object-fit:inherit;object-fit:inherit;-o-object-position:inherit;object-position:inherit}"},enumerable:!0,configurable:!0}),e}();export{Img as IonImg};