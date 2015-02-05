/** Oslo JavaScript Framework. */
define(["../util/util","./box","./coordinate","./size"],function(a,b,c,d){"use strict";var e=function(a,b,c,d){this.left=a,this.top=b,this.width=c,this.height=d};return e.prototype.clone=function(){return new e(this.left,this.top,this.width,this.height)},e.prototype.toBox=function(){var a=this.left+this.width,c=this.top+this.height;return new b(this.top,a,c,this.left)},e.prototype.intersection=function(a){var b=Math.max(this.left,a.left),c=Math.min(this.left+this.width,a.left+a.width);if(c>=b){var d=Math.max(this.top,a.top),e=Math.min(this.top+this.height,a.top+a.height);if(e>=d)return this.left=b,this.top=d,this.width=c-b,this.height=e-d,!0}return!1},e.createFromBox=function(a){return new e(a.left,a.top,a.right-a.left,a.bottom-a.top)},e.equals=function(a,b){return a===b?!0:a&&b?a.left===b.left&&a.width===b.width&&a.top===b.top&&a.height===b.height:!1},e.intersection=function(a,b){var c=Math.max(a.left,b.left),d=Math.min(a.left+a.width,b.left+b.width);if(d>=c){var f=Math.max(a.top,b.top),g=Math.min(a.top+a.height,b.top+b.height);if(g>=f)return new e(c,f,d-c,g-f)}return null},e.intersects=function(a,b){return a.left<=b.left+b.width&&b.left<=a.left+a.width&&a.top<=b.top+b.height&&b.top<=a.top+a.height},e.prototype.intersects=function(a){return e.intersects(this,a)},e.difference=function(a,b){var c=e.intersection(a,b);if(!c||!c.height||!c.width)return[a.clone()];var d=[],f=a.top,g=a.height,h=a.left+a.width,i=a.top+a.height,j=b.left+b.width,k=b.top+b.height;return b.top>a.top&&(d.push(new e(a.left,a.top,a.width,b.top-a.top)),f=b.top,g-=b.top-a.top),i>k&&(d.push(new e(a.left,k,a.width,i-k)),g=k-f),b.left>a.left&&d.push(new e(a.left,f,b.left-a.left,g)),h>j&&d.push(new e(j,f,h-j,g)),d},e.prototype.difference=function(a){return e.difference(this,a)},e.prototype.boundingRect=function(a){var b=Math.max(this.left+this.width,a.left+a.width),c=Math.max(this.top+this.height,a.top+a.height);this.left=Math.min(this.left,a.left),this.top=Math.min(this.top,a.top),this.width=b-this.left,this.height=c-this.top},e.boundingRect=function(a,b){if(!a||!b)return null;var c=a.clone();return c.boundingRect(b),c},e.prototype.contains=function(a){return a instanceof e?this.left<=a.left&&this.left+this.width>=a.left+a.width&&this.top<=a.top&&this.top+this.height>=a.top+a.height:a.x>=this.left&&a.x<=this.left+this.width&&a.y>=this.top&&a.y<=this.top+this.height},e.prototype.squaredDistance=function(a){var b=a.x<this.left?this.left-a.x:Math.max(a.x-(this.left+this.width),0),c=a.y<this.top?this.top-a.y:Math.max(a.y-(this.top+this.height),0);return b*b+c*c},e.prototype.distance=function(a){return Math.sqrt(this.squaredDistance(a))},e.prototype.getSize=function(){return new d(this.width,this.height)},e.prototype.getTopLeft=function(){return new c(this.left,this.top)},e.prototype.getCenter=function(){return new c(this.left+this.width/2,this.top+this.height/2)},e.prototype.getBottomRight=function(){return new c(this.left+this.width,this.top+this.height)},e.prototype.ceil=function(){return this.left=Math.ceil(this.left),this.top=Math.ceil(this.top),this.width=Math.ceil(this.width),this.height=Math.ceil(this.height),this},e.prototype.floor=function(){return this.left=Math.floor(this.left),this.top=Math.floor(this.top),this.width=Math.floor(this.width),this.height=Math.floor(this.height),this},e.prototype.round=function(){return this.left=Math.round(this.left),this.top=Math.round(this.top),this.width=Math.round(this.width),this.height=Math.round(this.height),this},e.prototype.translate=function(b,d){return b instanceof c?(this.left+=b.x,this.top+=b.y):(this.left+=b,a.isNumber(d)&&(this.top+=d)),this},e.prototype.scale=function(b,c){var d=a.isNumber(c)?c:b;return this.left*=b,this.width*=b,this.top*=d,this.height*=d,this},e});