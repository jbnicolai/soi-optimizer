/** Oslo JavaScript Framework. */
define(["../string/util"],function(a){"use strict";var b=!1,c="";if(navigator.plugins&&navigator.plugins.length){var d=navigator.plugins["Shockwave Flash"];d&&(b=!0,d.description&&(c=j(d.description))),navigator.plugins["Shockwave Flash 2.0"]&&(b=!0,c="2.0.0.11")}else if(navigator.mimeTypes&&navigator.mimeTypes.length){var e=navigator.mimeTypes["application/x-shockwave-flash"];b=e&&e.enabledPlugin,b&&(c=j(e.enabledPlugin.description))}else{var f;try{f=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),b=!0,c=j(f.GetVariable("$version"))}catch(g){try{f=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),b=!0,c="6.0.21"}catch(h){try{f=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),b=!0,c=j(f.GetVariable("$version"))}catch(i){}}}}function j(a){var b=a.match(/[\d]+/g);return b.length=3,b.join(".")}return{HAS_FLASH:b,VERSION:c,isVersion:function(b){return a.compareVersions(c,b)>=0}}});