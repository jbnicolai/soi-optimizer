/** Oslo JavaScript Framework. */
define(["../util/util","./browserevent","./actioneventtype"],function(a,b,c){"use strict";var d=function(a){b.call(this,a.getBrowserEvent()),this.type=c.BEFOREACTION};return a.inherits(d,b),d});