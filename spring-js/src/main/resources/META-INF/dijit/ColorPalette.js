/*
	Copyright (c) 2004-2007, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/book/dojo-book-0-9/introduction/licensing
*/


if(!dojo._hasResource["dijit.ColorPalette"]){dojo._hasResource["dijit.ColorPalette"]=true;dojo.provide("dijit.ColorPalette");dojo.require("dijit._Widget");dojo.require("dijit._Templated");dojo.require("dojo.colors");dojo.require("dojo.i18n");dojo.requireLocalization("dojo","colors",null,"ROOT,cs,de,es,fr,hu,it,ja,ko,pl,pt,ru,zh,zh-tw");dojo.declare("dijit.ColorPalette",[dijit._Widget,dijit._Templated],{defaultTimeout:500,timeoutChangeRate:0.9,palette:"7x10",value:null,_currentFocus:0,_xDim:null,_yDim:null,_palettes:{"7x10":[["white","seashell","cornsilk","lemonchiffon","lightyellow","palegreen","paleturquoise","lightcyan","lavender","plum"],["lightgray","pink","bisque","moccasin","khaki","lightgreen","lightseagreen","lightskyblue","cornflowerblue","violet"],["silver","lightcoral","sandybrown","orange","palegoldenrod","chartreuse","mediumturquoise","skyblue","mediumslateblue","orchid"],["gray","red","orangered","darkorange","yellow","limegreen","darkseagreen","royalblue","slateblue","mediumorchid"],["dimgray","crimson","chocolate","coral","gold","forestgreen","seagreen","blue","blueviolet","darkorchid"],["darkslategray","firebrick","saddlebrown","sienna","olive","green","darkcyan","mediumblue","darkslateblue","darkmagenta"],["black","darkred","maroon","brown","darkolivegreen","darkgreen","midnightblue","navy","indigo","purple"]],"3x4":[["white","lime","green","blue"],["silver","yellow","fuchsia","navy"],["gray","red","purple","black"]]},_imagePaths:{"7x10":dojo.moduleUrl("dijit","templates/colors7x10.png"),"3x4":dojo.moduleUrl("dijit","templates/colors3x4.png")},_paletteCoords:{"leftOffset":4,"topOffset":4,"cWidth":20,"cHeight":20},templateString:"<div class=\"dijitInline dijitColorPalette\">\n\t<div class=\"dijitColorPaletteInner\" dojoAttachPoint=\"divNode\" waiRole=\"grid\" tabIndex=\"-1\">\n\t\t<img class=\"dijitColorPaletteUnder\" dojoAttachPoint=\"imageNode\" waiRole=\"presentation\">\n\t</div>\t\n</div>\n",_paletteDims:{"7x10":{"width":"206px","height":"145px"},"3x4":{"width":"86px","height":"64px"}},postCreate:function(){dojo.mixin(this.divNode.style,this._paletteDims[this.palette]);this.imageNode.setAttribute("src",this._imagePaths[this.palette]);var _1=this._palettes[this.palette];this.domNode.style.position="relative";this._highlightNodes=[];this.colorNames=dojo.i18n.getLocalization("dojo","colors",this.lang);var _2=dojo.moduleUrl("dijit","templates/blank.gif");var _3=new dojo.Color(),_4=this._paletteCoords;for(var _5=0;_5<_1.length;_5++){for(var _6=0;_6<_1[_5].length;_6++){var _7=document.createElement("img");_7.src=_2;dojo.addClass(_7,"dijitPaletteImg");var _8=_1[_5][_6],_9=_3.setColor(dojo.Color.named[_8]);_7.alt=this.colorNames[_8];_7.color=_9.toHex();var _a=_7.style;_a.color=_a.backgroundColor=_7.color;dojo.forEach(["Dijitclick","MouseOut","MouseOver","Blur","Focus"],function(_b){this.connect(_7,"on"+_b.toLowerCase(),"_onColor"+_b);},this);this.divNode.appendChild(_7);_a.top=_4.topOffset+(_5*_4.cHeight)+"px";_a.left=_4.leftOffset+(_6*_4.cWidth)+"px";_7.setAttribute("tabIndex","-1");_7.title=this.colorNames[_8];dijit.setWaiRole(_7,"gridcell");_7.index=this._highlightNodes.length;this._highlightNodes.push(_7);}}this._highlightNodes[this._currentFocus].tabIndex=0;this._xDim=_1[0].length;this._yDim=_1.length;var _c={UP_ARROW:-this._xDim,DOWN_ARROW:this._xDim,RIGHT_ARROW:1,LEFT_ARROW:-1};for(var _d in _c){this._connects.push(dijit.typematic.addKeyListener(this.domNode,{keyCode:dojo.keys[_d],ctrlKey:false,altKey:false,shiftKey:false},this,function(){var _e=_c[_d];return function(_f){this._navigateByKey(_e,_f);};}(),this.timeoutChangeRate,this.defaultTimeout));}},focus:function(){dijit.focus(this._highlightNodes[this._currentFocus]);},onChange:function(_10){},_onColorDijitclick:function(evt){var _12=evt.currentTarget;if(this._currentFocus!=_12.index){this._currentFocus=_12.index;dijit.focus(_12);}this._selectColor(_12);dojo.stopEvent(evt);},_onColorMouseOut:function(evt){dojo.removeClass(evt.currentTarget,"dijitPaletteImgHighlight");},_onColorMouseOver:function(evt){var _15=evt.currentTarget;_15.tabIndex=0;_15.focus();},_onColorBlur:function(evt){dojo.removeClass(evt.currentTarget,"dijitPaletteImgHighlight");evt.currentTarget.tabIndex=-1;this._currentFocus=0;this._highlightNodes[0].tabIndex=0;},_onColorFocus:function(evt){if(this._currentFocus!=evt.currentTarget.index){this._highlightNodes[this._currentFocus].tabIndex=-1;}this._currentFocus=evt.currentTarget.index;dojo.addClass(evt.currentTarget,"dijitPaletteImgHighlight");},_selectColor:function(_18){this.onChange(this.value=_18.color);},_navigateByKey:function(_19,_1a){if(_1a==-1){return;}var _1b=this._currentFocus+_19;if(_1b<this._highlightNodes.length&&_1b>-1){var _1c=this._highlightNodes[_1b];_1c.tabIndex=0;_1c.focus();}}});}