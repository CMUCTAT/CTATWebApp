var DURATION=500,EASING="cubic-bezier(0.36,0.66,0.04,1)",OPACITY="opacity",TRANSFORM="transform",TRANSLATEX="translateX",CENTER="0%",OFF_OPACITY=.8;function shadow(e){return e.shadowRoot||e}function iosTransitionAnimation(e,o,r){var t="rtl"===o.ownerDocument.dir,n=t?"-99.5%":"99.5%",a=t?"33%":"-33%",T=r.enteringEl,l=r.leavingEl,d=new e;if(d.addElement(T).duration(r.duration||DURATION).easing(r.easing||EASING).beforeRemoveClass("ion-page-invisible"),l&&o){var A=new e;A.addElement(o),d.add(A)}var E="back"===r.direction,i=T.querySelector(":scope > ion-content"),m=T.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"),f=T.querySelectorAll(":scope > ion-header > ion-toolbar"),C=new e;if(i||0!==f.length||0!==m.length?(C.addElement(i),C.addElement(m)):C.addElement(T.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")),d.add(C),E?C.beforeClearStyles([OPACITY]).fromTo(TRANSLATEX,a,CENTER,!0).fromTo(OPACITY,OFF_OPACITY,1,!0):C.beforeClearStyles([OPACITY]).fromTo(TRANSLATEX,n,CENTER,!0),f.forEach(function(o){var r=new e;r.addElement(o),d.add(r);var T=new e;T.addElement(o.querySelector("ion-title"));var l=new e;l.addElement(o.querySelectorAll("ion-buttons,[menuToggle]"));var A=new e;A.addElement(o.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])"));var i=new e;i.addElement(shadow(o).querySelector(".toolbar-background"));var m=new e,f=o.querySelector("ion-back-button");if(f&&m.addElement(f),r.add(T).add(l).add(A).add(i).add(m),T.fromTo(OPACITY,.01,1,!0),l.fromTo(OPACITY,.01,1,!0),A.fromTo(OPACITY,.01,1,!0),E)T.fromTo(TRANSLATEX,a,CENTER,!0),A.fromTo(TRANSLATEX,a,CENTER,!0),m.fromTo(OPACITY,.01,1,!0);else if(T.fromTo(TRANSLATEX,n,CENTER,!0),A.fromTo(TRANSLATEX,n,CENTER,!0),i.beforeClearStyles([OPACITY]).fromTo(OPACITY,.01,1,!0),m.fromTo(OPACITY,.01,1,!0),f){var C=new e;C.addElement(shadow(f).querySelector(".button-text")).fromTo(TRANSLATEX,t?"-100px":"100px","0px"),r.add(C)}}),l){var c=new e;c.addElement(l.querySelector(":scope > ion-content")),c.addElement(l.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *")),d.add(c),E?c.beforeClearStyles([OPACITY]).fromTo(TRANSLATEX,CENTER,t?"-100%":"100%"):c.fromTo(TRANSLATEX,CENTER,a,!0).fromTo(OPACITY,1,OFF_OPACITY,!0),l.querySelectorAll(":scope > ion-header > ion-toolbar").forEach(function(o){var r=new e;r.addElement(o);var n=new e;n.addElement(o.querySelector("ion-title"));var T=new e;T.addElement(o.querySelectorAll("ion-buttons,[menuToggle]"));var l=new e,A=o.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])");A.length>0&&l.addElement(A);var i=new e;i.addElement(shadow(o).querySelector(".toolbar-background"));var m=new e,f=o.querySelector("ion-back-button");if(f&&m.addElement(f),r.add(n).add(T).add(l).add(m).add(i),d.add(r),m.fromTo(OPACITY,.99,0),n.fromTo(OPACITY,.99,0),T.fromTo(OPACITY,.99,0,0),l.fromTo(OPACITY,.99,0),E){if(n.fromTo(TRANSLATEX,CENTER,t?"-100%":"100%"),l.fromTo(TRANSLATEX,CENTER,t?"-100%":"100%"),i.beforeClearStyles([OPACITY]).fromTo(OPACITY,1,.01),f){var C=new e;C.addElement(shadow(f).querySelector(".button-text")),C.fromTo(TRANSLATEX,CENTER,(t?-124:124)+"px"),r.add(C)}}else n.fromTo(TRANSLATEX,CENTER,a).afterClearStyles([TRANSFORM]),l.fromTo(TRANSLATEX,CENTER,a).afterClearStyles([TRANSFORM,OPACITY]),m.afterClearStyles([OPACITY]),n.afterClearStyles([OPACITY]),T.afterClearStyles([OPACITY])})}return Promise.resolve(d)}export{shadow,iosTransitionAnimation};