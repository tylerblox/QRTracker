(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{22:function(e,n,t){e.exports=t(42)},27:function(e,n,t){},36:function(e,n,t){e.exports=t.p+"static/media/logo.5d5d9eef.svg"},37:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var r=t(0),c=t.n(r),o=t(10),a=t.n(o),i=(t(27),t(2)),s=t(21),_=t(11),l=t(18),d=t.n(l);function m(){return function(e,n){e({type:"RESET"})}}function u(e){var n=null;if(document.cookie&&""!==document.cookie)for(var t=document.cookie.split(";"),r=0;r<t.length;r++){var c=t[r].trim();if(c.substring(0,e.length+1)===e+"="){n=decodeURIComponent(c.substring(e.length+1));break}}return n}var f=function(){return{type:"QR_SCANNER_START"}};var E=function(){return{type:"CONFIRM_CODE_START"}};t(36),t(37);var h=t(7),v=t(8),p=function(e){return c.a.createElement("div",{className:"confirm-event-modal"},c.a.createElement("div",{className:"confirm-event-content"},e.error_with_confirmation&&c.a.createElement("p",{className:"error-text"},"Error in confirming event.  Please try again, or ",c.a.createElement("span",{onClick:e.resetScanner},"Scan a new Code")),c.a.createElement("div",{className:"confirm-event-content--topic"},"Confirm this Event"),c.a.createElement("div",{className:"confirm-event-content--event"},c.a.createElement("h1",{className:"confirm-event-content--event--name"},e.most_recent_code.event.name),c.a.createElement("ul",null,c.a.createElement("li",null,e.most_recent_code.event.date),c.a.createElement("li",null,e.most_recent_code.event.location.name)))),c.a.createElement("div",{className:"confirmation-buttons"},c.a.createElement("button",{className:"button--primary",onClick:function(){e.confirmQrCode(!0,{event_promoter:e.most_recent_code.id})}},c.a.createElement(h.a,{icon:v.b,size:"4x"})),c.a.createElement("button",{className:"button--secondary",onClick:function(){e.confirmQrCode(!1,{})}},c.a.createElement(h.a,{icon:v.c,size:"4x"}))))};var C={scanQrCode:function(e){return function(n,t){n(f),fetch("https://"+e).then((function(e){if(!e.ok)throw"whoops";return e.json()})).then((function(e){return n({type:"QR_SCANNER_SUCCESS",payload:{value:e}})})).catch((function(e){return n({type:"QR_SCANNER_ERROR",payload:{error:e}})}))}},confirmQrCode:function(e,n){return e?function(e,t){e(E),fetch("https://qr-tickets.herokuapp.com/api/event_register/",{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json","X-CSRFToken":u("csrftoken")},redirect:"follow",body:JSON.stringify(n)}).then((function(e){if(!e.ok)throw"whoops";return e.json()})).then((function(n){return e({type:"CONFIRM_CODE_SUCCESS",payload:{value:n}})})).catch((function(n){return e({type:"CONFIRM_CODE_ERROR",payload:{error:n}})}))}:function(e,n){e({type:"RESET"})}},setScannerActive:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return function(n,t){var r=e?null:t().qr_scanner.most_recent_code;n({type:"SET_SCANNER_ACTIVE",payload:{scanner_active:e,most_recent_code:r}})}},resetScanner:m},S=Object(_.b)((function(e){return e.qr_scanner}),C)((function(e){var n=c.a.useState({scanMode:!0}),t=Object(s.a)(n,2),r=t[0],o=t[1],a=e.most_recent_code;c.a.useEffect((function(){a&&e.setScannerActive(!1)}),[a]),console.log(e.most_recent_code);var _=e.most_recent_code&&e.qr_code_fetched&&!e.qr_code_fetch_error&&!e.confirmed_qr_code;return c.a.createElement("div",{className:"App",style:{height:window.innerHeight}},_&&c.a.createElement(p,{most_recent_code:e.most_recent_code,confirmed_qr_code:e.confirmed_qr_code,error_with_confirmation:e.error_with_confirmation,resetScanner:e.resetScanner,confirmQrCode:e.confirmQrCode}),c.a.createElement("button",{onClick:function(){var e=r.scanMode;o(Object(i.a)({},r,{scanMode:!e}))}},r.scanMode?"Switch To Manual Input":"Switch to Scanner Mode"),r.scanMode?c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"qr-content"},e.scanner_active&&c.a.createElement(d.a,{className:"qr-scanner",delay:1e3,onError:function(e){console.error(e)},onScan:function(n){n&&e.scanQrCode(n)}})||c.a.createElement("p",null," Begin Scanning Below..."),e.most_recent_code&&e.confirmed_qr_code&&c.a.createElement("h2",{className:"registration-success"},"Successfully registered!"),e.loading&&c.a.createElement("p",null,"Loading..."),e.qr_code_fetch_error&&c.a.createElement("p",null,"There was an error scanning the QR code.. ",e.qr_code_fetch_error.message)),_?null:c.a.createElement("button",{className:e.most_recent_code?"scan-again":e.scanner_active?"scan-stop":"scan",onClick:function(){e.setScannerActive(!e.scanner_active)}},c.a.createElement(h.a,{icon:v.a,size:"2x"}))):c.a.createElement("p",null," manual entry mode todo: "))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var R=t(5),g=t(20),N={scanner_active:!0,fetching_qr_code:!1,qr_code_fetch_error:null,most_recent_code:null,qr_code_fetched:!1,confirming_qr_code:!1,error_with_confirmation:null,confirmed_qr_code:!1},O=Object(R.c)({qr_scanner:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"RESET":return Object(i.a)({},e,{},N);case"SET_SCANNER_ACTIVE":return Object(i.a)({},e,{},n.payload);case"QR_SCANNER_START":return Object(i.a)({},e,{fetching_qr_code:!0,scanner_active:!1});case"QR_SCANNER_SUCCESS":return Object(i.a)({},e,{},N,{scanner_active:!1,qr_code_fetched:!0,fetching_qr_code:!1,most_recent_code:n.payload.value});case"QR_SCANNER_ERROR":return Object(i.a)({},e,{scanner_active:!1,qr_code_fetched:!1,fetching_qr_code:!1,qr_code_fetch_error:n.payload.error});case"CONFIRM_CODE_START":return Object(i.a)({},e,{confirming_qr_code:!0});case"CONFIRM_CODE_SUCCESS":return Object(i.a)({},e,{scanner_active:!1,confirmed_qr_code:!0});case"CONFIRM_CODE_ERROR":return Object(i.a)({},e,{error_with_confirmation:n.payload.error});default:return e}}}),y=Object(R.d)(O,Object(R.a)(g.a));a.a.render(c.a.createElement(_.a,{store:y},c.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[22,1,2]]]);
//# sourceMappingURL=main.ddbdb819.chunk.js.map