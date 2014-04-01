// Compiled by ClojureScript 0.0-2138
goog.provide('sablono.core');
goog.require('cljs.core');
goog.require('clojure.walk');
goog.require('clojure.string');
goog.require('sablono.util');
goog.require('sablono.render');
goog.require('sablono.render');
goog.require('sablono.util');
goog.require('clojure.walk');
goog.require('clojure.string');
/**
* Add an optional attribute argument to a function that returns a element vector.
*/
sablono.core.wrap_attrs = (function wrap_attrs(func){return (function() { 
var G__14037__delegate = function (args){if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,args)))
{var vec__14036 = cljs.core.apply.call(null,func,cljs.core.rest.call(null,args));var tag = cljs.core.nth.call(null,vec__14036,0,null);var body = cljs.core.nthnext.call(null,vec__14036,1);if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,body)))
{return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.merge.call(null,cljs.core.first.call(null,body),cljs.core.first.call(null,args)),cljs.core.rest.call(null,body));
} else
{return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.first.call(null,args),body);
}
} else
{return cljs.core.apply.call(null,func,args);
}
};
var G__14037 = function (var_args){
var args = null;if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return G__14037__delegate.call(this,args);};
G__14037.cljs$lang$maxFixedArity = 0;
G__14037.cljs$lang$applyTo = (function (arglist__14038){
var args = cljs.core.seq(arglist__14038);
return G__14037__delegate(args);
});
G__14037.cljs$core$IFn$_invoke$arity$variadic = G__14037__delegate;
return G__14037;
})()
;
});
sablono.core.update_arglists = (function update_arglists(arglists){var iter__4133__auto__ = (function iter__14043(s__14044){return (new cljs.core.LazySeq(null,(function (){var s__14044__$1 = s__14044;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__14044__$1);if(temp__4092__auto__)
{var s__14044__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__14044__$2))
{var c__4131__auto__ = cljs.core.chunk_first.call(null,s__14044__$2);var size__4132__auto__ = cljs.core.count.call(null,c__4131__auto__);var b__14046 = cljs.core.chunk_buffer.call(null,size__4132__auto__);if((function (){var i__14045 = 0;while(true){
if((i__14045 < size__4132__auto__))
{var args = cljs.core._nth.call(null,c__4131__auto__,i__14045);cljs.core.chunk_append.call(null,b__14046,cljs.core.vec.call(null,cljs.core.cons.call(null,new cljs.core.Symbol(null,"attr-map?","attr-map?",-1682549128,null),args)));
{
var G__14047 = (i__14045 + 1);
i__14045 = G__14047;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14046),iter__14043.call(null,cljs.core.chunk_rest.call(null,s__14044__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14046),null);
}
} else
{var args = cljs.core.first.call(null,s__14044__$2);return cljs.core.cons.call(null,cljs.core.vec.call(null,cljs.core.cons.call(null,new cljs.core.Symbol(null,"attr-map?","attr-map?",-1682549128,null),args)),iter__14043.call(null,cljs.core.rest.call(null,s__14044__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__4133__auto__.call(null,arglists);
});
/**
* Include a list of external javascript files.
* @param {...*} var_args
*/
sablono.core.include_js = (function() { 
var include_js__delegate = function (scripts){var iter__4133__auto__ = (function iter__14052(s__14053){return (new cljs.core.LazySeq(null,(function (){var s__14053__$1 = s__14053;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__14053__$1);if(temp__4092__auto__)
{var s__14053__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__14053__$2))
{var c__4131__auto__ = cljs.core.chunk_first.call(null,s__14053__$2);var size__4132__auto__ = cljs.core.count.call(null,c__4131__auto__);var b__14055 = cljs.core.chunk_buffer.call(null,size__4132__auto__);if((function (){var i__14054 = 0;while(true){
if((i__14054 < size__4132__auto__))
{var script = cljs.core._nth.call(null,c__4131__auto__,i__14054);cljs.core.chunk_append.call(null,b__14055,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"script","script",4401185853),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),"text/javascript",new cljs.core.Keyword(null,"src","src",1014018390),sablono.util.as_str.call(null,script)], null)], null));
{
var G__14056 = (i__14054 + 1);
i__14054 = G__14056;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14055),iter__14052.call(null,cljs.core.chunk_rest.call(null,s__14053__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14055),null);
}
} else
{var script = cljs.core.first.call(null,s__14053__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"script","script",4401185853),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),"text/javascript",new cljs.core.Keyword(null,"src","src",1014018390),sablono.util.as_str.call(null,script)], null)], null),iter__14052.call(null,cljs.core.rest.call(null,s__14053__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__4133__auto__.call(null,scripts);
};
var include_js = function (var_args){
var scripts = null;if (arguments.length > 0) {
  scripts = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return include_js__delegate.call(this,scripts);};
include_js.cljs$lang$maxFixedArity = 0;
include_js.cljs$lang$applyTo = (function (arglist__14057){
var scripts = cljs.core.seq(arglist__14057);
return include_js__delegate(scripts);
});
include_js.cljs$core$IFn$_invoke$arity$variadic = include_js__delegate;
return include_js;
})()
;
/**
* Include a list of external stylesheet files.
* @param {...*} var_args
*/
sablono.core.include_css = (function() { 
var include_css__delegate = function (styles){var iter__4133__auto__ = (function iter__14062(s__14063){return (new cljs.core.LazySeq(null,(function (){var s__14063__$1 = s__14063;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__14063__$1);if(temp__4092__auto__)
{var s__14063__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__14063__$2))
{var c__4131__auto__ = cljs.core.chunk_first.call(null,s__14063__$2);var size__4132__auto__ = cljs.core.count.call(null,c__4131__auto__);var b__14065 = cljs.core.chunk_buffer.call(null,size__4132__auto__);if((function (){var i__14064 = 0;while(true){
if((i__14064 < size__4132__auto__))
{var style = cljs.core._nth.call(null,c__4131__auto__,i__14064);cljs.core.chunk_append.call(null,b__14065,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"link","link",1017226092),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),"text/css",new cljs.core.Keyword(null,"href","href",1017115293),sablono.util.as_str.call(null,style),new cljs.core.Keyword(null,"rel","rel",1014017035),"stylesheet"], null)], null));
{
var G__14066 = (i__14064 + 1);
i__14064 = G__14066;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14065),iter__14062.call(null,cljs.core.chunk_rest.call(null,s__14063__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14065),null);
}
} else
{var style = cljs.core.first.call(null,s__14063__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"link","link",1017226092),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),"text/css",new cljs.core.Keyword(null,"href","href",1017115293),sablono.util.as_str.call(null,style),new cljs.core.Keyword(null,"rel","rel",1014017035),"stylesheet"], null)], null),iter__14062.call(null,cljs.core.rest.call(null,s__14063__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__4133__auto__.call(null,styles);
};
var include_css = function (var_args){
var styles = null;if (arguments.length > 0) {
  styles = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return include_css__delegate.call(this,styles);};
include_css.cljs$lang$maxFixedArity = 0;
include_css.cljs$lang$applyTo = (function (arglist__14067){
var styles = cljs.core.seq(arglist__14067);
return include_css__delegate(styles);
});
include_css.cljs$core$IFn$_invoke$arity$variadic = include_css__delegate;
return include_css;
})()
;
/**
* Wrap the supplied javascript up in script tags and a CDATA section.
*/
sablono.core.javascript_tag = (function javascript_tag(script){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"script","script",4401185853),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1017479852),"text/javascript"], null),[cljs.core.str("//<![CDATA[\n"),cljs.core.str(script),cljs.core.str("\n//]]>")].join('')], null);
});
/**
* Wraps some content in a HTML hyperlink with the supplied URL.
* @param {...*} var_args
*/
sablono.core.link_to14068 = (function() { 
var link_to14068__delegate = function (url,content){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",1013904339),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",1017115293),sablono.util.as_str.call(null,url)], null),content], null);
};
var link_to14068 = function (url,var_args){
var content = null;if (arguments.length > 1) {
  content = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return link_to14068__delegate.call(this,url,content);};
link_to14068.cljs$lang$maxFixedArity = 1;
link_to14068.cljs$lang$applyTo = (function (arglist__14069){
var url = cljs.core.first(arglist__14069);
var content = cljs.core.rest(arglist__14069);
return link_to14068__delegate(url,content);
});
link_to14068.cljs$core$IFn$_invoke$arity$variadic = link_to14068__delegate;
return link_to14068;
})()
;
sablono.core.link_to = sablono.core.wrap_attrs.call(null,sablono.core.link_to14068);
/**
* Wraps some content in a HTML hyperlink with the supplied e-mail
* address. If no content provided use the e-mail address as content.
* @param {...*} var_args
*/
sablono.core.mail_to14070 = (function() { 
var mail_to14070__delegate = function (e_mail,p__14071){var vec__14073 = p__14071;var content = cljs.core.nth.call(null,vec__14073,0,null);return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",1013904339),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",1017115293),[cljs.core.str("mailto:"),cljs.core.str(e_mail)].join('')], null),(function (){var or__3422__auto__ = content;if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{return e_mail;
}
})()], null);
};
var mail_to14070 = function (e_mail,var_args){
var p__14071 = null;if (arguments.length > 1) {
  p__14071 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return mail_to14070__delegate.call(this,e_mail,p__14071);};
mail_to14070.cljs$lang$maxFixedArity = 1;
mail_to14070.cljs$lang$applyTo = (function (arglist__14074){
var e_mail = cljs.core.first(arglist__14074);
var p__14071 = cljs.core.rest(arglist__14074);
return mail_to14070__delegate(e_mail,p__14071);
});
mail_to14070.cljs$core$IFn$_invoke$arity$variadic = mail_to14070__delegate;
return mail_to14070;
})()
;
sablono.core.mail_to = sablono.core.wrap_attrs.call(null,sablono.core.mail_to14070);
/**
* Wrap a collection in an unordered list.
*/
sablono.core.unordered_list14075 = (function unordered_list14075(coll){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",1013907977),(function (){var iter__4133__auto__ = (function iter__14080(s__14081){return (new cljs.core.LazySeq(null,(function (){var s__14081__$1 = s__14081;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__14081__$1);if(temp__4092__auto__)
{var s__14081__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__14081__$2))
{var c__4131__auto__ = cljs.core.chunk_first.call(null,s__14081__$2);var size__4132__auto__ = cljs.core.count.call(null,c__4131__auto__);var b__14083 = cljs.core.chunk_buffer.call(null,size__4132__auto__);if((function (){var i__14082 = 0;while(true){
if((i__14082 < size__4132__auto__))
{var x = cljs.core._nth.call(null,c__4131__auto__,i__14082);cljs.core.chunk_append.call(null,b__14083,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),x], null));
{
var G__14084 = (i__14082 + 1);
i__14082 = G__14084;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14083),iter__14080.call(null,cljs.core.chunk_rest.call(null,s__14081__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14083),null);
}
} else
{var x = cljs.core.first.call(null,s__14081__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),x], null),iter__14080.call(null,cljs.core.rest.call(null,s__14081__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__4133__auto__.call(null,coll);
})()], null);
});
sablono.core.unordered_list = sablono.core.wrap_attrs.call(null,sablono.core.unordered_list14075);
/**
* Wrap a collection in an ordered list.
*/
sablono.core.ordered_list14085 = (function ordered_list14085(coll){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ol","ol",1013907791),(function (){var iter__4133__auto__ = (function iter__14090(s__14091){return (new cljs.core.LazySeq(null,(function (){var s__14091__$1 = s__14091;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__14091__$1);if(temp__4092__auto__)
{var s__14091__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__14091__$2))
{var c__4131__auto__ = cljs.core.chunk_first.call(null,s__14091__$2);var size__4132__auto__ = cljs.core.count.call(null,c__4131__auto__);var b__14093 = cljs.core.chunk_buffer.call(null,size__4132__auto__);if((function (){var i__14092 = 0;while(true){
if((i__14092 < size__4132__auto__))
{var x = cljs.core._nth.call(null,c__4131__auto__,i__14092);cljs.core.chunk_append.call(null,b__14093,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),x], null));
{
var G__14094 = (i__14092 + 1);
i__14092 = G__14094;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14093),iter__14090.call(null,cljs.core.chunk_rest.call(null,s__14091__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14093),null);
}
} else
{var x = cljs.core.first.call(null,s__14091__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),x], null),iter__14090.call(null,cljs.core.rest.call(null,s__14091__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__4133__auto__.call(null,coll);
})()], null);
});
sablono.core.ordered_list = sablono.core.wrap_attrs.call(null,sablono.core.ordered_list14085);
/**
* Create an image element.
*/
sablono.core.image14095 = (function() {
var image14095 = null;
var image14095__1 = (function (src){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1014008629),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",1014018390),sablono.util.as_str.call(null,src)], null)], null);
});
var image14095__2 = (function (src,alt){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1014008629),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src","src",1014018390),sablono.util.as_str.call(null,src),new cljs.core.Keyword(null,"alt","alt",1014000923),alt], null)], null);
});
image14095 = function(src,alt){
switch(arguments.length){
case 1:
return image14095__1.call(this,src);
case 2:
return image14095__2.call(this,src,alt);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
image14095.cljs$core$IFn$_invoke$arity$1 = image14095__1;
image14095.cljs$core$IFn$_invoke$arity$2 = image14095__2;
return image14095;
})()
;
sablono.core.image = sablono.core.wrap_attrs.call(null,sablono.core.image14095);
sablono.core._STAR_group_STAR_ = cljs.core.PersistentVector.EMPTY;
/**
* Create a field name from the supplied argument the current field group.
*/
sablono.core.make_name = (function make_name(name){return cljs.core.reduce.call(null,(function (p1__14096_SHARP_,p2__14097_SHARP_){return [cljs.core.str(p1__14096_SHARP_),cljs.core.str("["),cljs.core.str(p2__14097_SHARP_),cljs.core.str("]")].join('');
}),cljs.core.conj.call(null,sablono.core._STAR_group_STAR_,sablono.util.as_str.call(null,name)));
});
/**
* Create a field id from the supplied argument and current field group.
*/
sablono.core.make_id = (function make_id(name){return cljs.core.reduce.call(null,(function (p1__14098_SHARP_,p2__14099_SHARP_){return [cljs.core.str(p1__14098_SHARP_),cljs.core.str("-"),cljs.core.str(p2__14099_SHARP_)].join('');
}),cljs.core.conj.call(null,sablono.core._STAR_group_STAR_,sablono.util.as_str.call(null,name)));
});
/**
* Creates a new <input> element.
*/
sablono.core.input_field = (function input_field(type,name,value){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1017479852),type,new cljs.core.Keyword(null,"name","name",1017277949),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",1013907597),sablono.core.make_id.call(null,name),new cljs.core.Keyword(null,"value","value",1125876963),value], null)], null);
});
/**
* Creates a hidden input field.
*/
sablono.core.hidden_field14100 = (function() {
var hidden_field14100 = null;
var hidden_field14100__1 = (function (name){return hidden_field14100.call(null,name,null);
});
var hidden_field14100__2 = (function (name,value){return sablono.core.input_field.call(null,"hidden",name,value);
});
hidden_field14100 = function(name,value){
switch(arguments.length){
case 1:
return hidden_field14100__1.call(this,name);
case 2:
return hidden_field14100__2.call(this,name,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
hidden_field14100.cljs$core$IFn$_invoke$arity$1 = hidden_field14100__1;
hidden_field14100.cljs$core$IFn$_invoke$arity$2 = hidden_field14100__2;
return hidden_field14100;
})()
;
sablono.core.hidden_field = sablono.core.wrap_attrs.call(null,sablono.core.hidden_field14100);
/**
* Creates a new text input field.
*/
sablono.core.text_field14101 = (function() {
var text_field14101 = null;
var text_field14101__1 = (function (name){return text_field14101.call(null,name,null);
});
var text_field14101__2 = (function (name,value){return sablono.core.input_field.call(null,"text",name,value);
});
text_field14101 = function(name,value){
switch(arguments.length){
case 1:
return text_field14101__1.call(this,name);
case 2:
return text_field14101__2.call(this,name,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
text_field14101.cljs$core$IFn$_invoke$arity$1 = text_field14101__1;
text_field14101.cljs$core$IFn$_invoke$arity$2 = text_field14101__2;
return text_field14101;
})()
;
sablono.core.text_field = sablono.core.wrap_attrs.call(null,sablono.core.text_field14101);
/**
* Creates a new password field.
*/
sablono.core.password_field14102 = (function() {
var password_field14102 = null;
var password_field14102__1 = (function (name){return password_field14102.call(null,name,null);
});
var password_field14102__2 = (function (name,value){return sablono.core.input_field.call(null,"password",name,value);
});
password_field14102 = function(name,value){
switch(arguments.length){
case 1:
return password_field14102__1.call(this,name);
case 2:
return password_field14102__2.call(this,name,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
password_field14102.cljs$core$IFn$_invoke$arity$1 = password_field14102__1;
password_field14102.cljs$core$IFn$_invoke$arity$2 = password_field14102__2;
return password_field14102;
})()
;
sablono.core.password_field = sablono.core.wrap_attrs.call(null,sablono.core.password_field14102);
/**
* Creates a new email input field.
*/
sablono.core.email_field14103 = (function() {
var email_field14103 = null;
var email_field14103__1 = (function (name){return email_field14103.call(null,name,null);
});
var email_field14103__2 = (function (name,value){return sablono.core.input_field.call(null,"email",name,value);
});
email_field14103 = function(name,value){
switch(arguments.length){
case 1:
return email_field14103__1.call(this,name);
case 2:
return email_field14103__2.call(this,name,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
email_field14103.cljs$core$IFn$_invoke$arity$1 = email_field14103__1;
email_field14103.cljs$core$IFn$_invoke$arity$2 = email_field14103__2;
return email_field14103;
})()
;
sablono.core.email_field = sablono.core.wrap_attrs.call(null,sablono.core.email_field14103);
/**
* Creates a check box.
*/
sablono.core.check_box14104 = (function() {
var check_box14104 = null;
var check_box14104__1 = (function (name){return check_box14104.call(null,name,null);
});
var check_box14104__2 = (function (name,checked_QMARK_){return check_box14104.call(null,name,checked_QMARK_,"true");
});
var check_box14104__3 = (function (name,checked_QMARK_,value){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1017479852),"checkbox",new cljs.core.Keyword(null,"name","name",1017277949),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",1013907597),sablono.core.make_id.call(null,name),new cljs.core.Keyword(null,"value","value",1125876963),value,new cljs.core.Keyword(null,"checked","checked",1756218137),checked_QMARK_], null)], null);
});
check_box14104 = function(name,checked_QMARK_,value){
switch(arguments.length){
case 1:
return check_box14104__1.call(this,name);
case 2:
return check_box14104__2.call(this,name,checked_QMARK_);
case 3:
return check_box14104__3.call(this,name,checked_QMARK_,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
check_box14104.cljs$core$IFn$_invoke$arity$1 = check_box14104__1;
check_box14104.cljs$core$IFn$_invoke$arity$2 = check_box14104__2;
check_box14104.cljs$core$IFn$_invoke$arity$3 = check_box14104__3;
return check_box14104;
})()
;
sablono.core.check_box = sablono.core.wrap_attrs.call(null,sablono.core.check_box14104);
/**
* Creates a radio button.
*/
sablono.core.radio_button14105 = (function() {
var radio_button14105 = null;
var radio_button14105__1 = (function (group){return radio_button14105.call(null,group,null);
});
var radio_button14105__2 = (function (group,checked_QMARK_){return radio_button14105.call(null,group,checked_QMARK_,"true");
});
var radio_button14105__3 = (function (group,checked_QMARK_,value){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1017479852),"radio",new cljs.core.Keyword(null,"name","name",1017277949),sablono.core.make_name.call(null,group),new cljs.core.Keyword(null,"id","id",1013907597),sablono.core.make_id.call(null,[cljs.core.str(sablono.util.as_str.call(null,group)),cljs.core.str("-"),cljs.core.str(sablono.util.as_str.call(null,value))].join('')),new cljs.core.Keyword(null,"value","value",1125876963),value,new cljs.core.Keyword(null,"checked","checked",1756218137),checked_QMARK_], null)], null);
});
radio_button14105 = function(group,checked_QMARK_,value){
switch(arguments.length){
case 1:
return radio_button14105__1.call(this,group);
case 2:
return radio_button14105__2.call(this,group,checked_QMARK_);
case 3:
return radio_button14105__3.call(this,group,checked_QMARK_,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
radio_button14105.cljs$core$IFn$_invoke$arity$1 = radio_button14105__1;
radio_button14105.cljs$core$IFn$_invoke$arity$2 = radio_button14105__2;
radio_button14105.cljs$core$IFn$_invoke$arity$3 = radio_button14105__3;
return radio_button14105;
})()
;
sablono.core.radio_button = sablono.core.wrap_attrs.call(null,sablono.core.radio_button14105);
/**
* Creates a seq of option tags from a collection.
*/
sablono.core.select_options14106 = (function() {
var select_options14106 = null;
var select_options14106__1 = (function (coll){return select_options14106.call(null,coll,null);
});
var select_options14106__2 = (function (coll,selected){var iter__4133__auto__ = (function iter__14115(s__14116){return (new cljs.core.LazySeq(null,(function (){var s__14116__$1 = s__14116;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__14116__$1);if(temp__4092__auto__)
{var s__14116__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__14116__$2))
{var c__4131__auto__ = cljs.core.chunk_first.call(null,s__14116__$2);var size__4132__auto__ = cljs.core.count.call(null,c__4131__auto__);var b__14118 = cljs.core.chunk_buffer.call(null,size__4132__auto__);if((function (){var i__14117 = 0;while(true){
if((i__14117 < size__4132__auto__))
{var x = cljs.core._nth.call(null,c__4131__auto__,i__14117);cljs.core.chunk_append.call(null,b__14118,((cljs.core.sequential_QMARK_.call(null,x))?(function (){var vec__14121 = x;var text = cljs.core.nth.call(null,vec__14121,0,null);var val = cljs.core.nth.call(null,vec__14121,1,null);if(cljs.core.sequential_QMARK_.call(null,val))
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"optgroup","optgroup",933131038),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),text], null),select_options14106.call(null,val,selected)], null);
} else
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",4298734567),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",1125876963),val,new cljs.core.Keyword(null,"selected","selected",2205476365),cljs.core._EQ_.call(null,val,selected)], null),text], null);
}
})():new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",4298734567),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected","selected",2205476365),cljs.core._EQ_.call(null,x,selected)], null),x], null)));
{
var G__14123 = (i__14117 + 1);
i__14117 = G__14123;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14118),iter__14115.call(null,cljs.core.chunk_rest.call(null,s__14116__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14118),null);
}
} else
{var x = cljs.core.first.call(null,s__14116__$2);return cljs.core.cons.call(null,((cljs.core.sequential_QMARK_.call(null,x))?(function (){var vec__14122 = x;var text = cljs.core.nth.call(null,vec__14122,0,null);var val = cljs.core.nth.call(null,vec__14122,1,null);if(cljs.core.sequential_QMARK_.call(null,val))
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"optgroup","optgroup",933131038),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),text], null),select_options14106.call(null,val,selected)], null);
} else
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",4298734567),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",1125876963),val,new cljs.core.Keyword(null,"selected","selected",2205476365),cljs.core._EQ_.call(null,val,selected)], null),text], null);
}
})():new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",4298734567),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected","selected",2205476365),cljs.core._EQ_.call(null,x,selected)], null),x], null)),iter__14115.call(null,cljs.core.rest.call(null,s__14116__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__4133__auto__.call(null,coll);
});
select_options14106 = function(coll,selected){
switch(arguments.length){
case 1:
return select_options14106__1.call(this,coll);
case 2:
return select_options14106__2.call(this,coll,selected);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
select_options14106.cljs$core$IFn$_invoke$arity$1 = select_options14106__1;
select_options14106.cljs$core$IFn$_invoke$arity$2 = select_options14106__2;
return select_options14106;
})()
;
sablono.core.select_options = sablono.core.wrap_attrs.call(null,sablono.core.select_options14106);
/**
* Creates a drop-down box using the <select> tag.
*/
sablono.core.drop_down14124 = (function() {
var drop_down14124 = null;
var drop_down14124__2 = (function (name,options){return drop_down14124.call(null,name,options,null);
});
var drop_down14124__3 = (function (name,options,selected){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",4402849902),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",1013907597),sablono.core.make_id.call(null,name)], null),sablono.core.select_options.call(null,options,selected)], null);
});
drop_down14124 = function(name,options,selected){
switch(arguments.length){
case 2:
return drop_down14124__2.call(this,name,options);
case 3:
return drop_down14124__3.call(this,name,options,selected);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
drop_down14124.cljs$core$IFn$_invoke$arity$2 = drop_down14124__2;
drop_down14124.cljs$core$IFn$_invoke$arity$3 = drop_down14124__3;
return drop_down14124;
})()
;
sablono.core.drop_down = sablono.core.wrap_attrs.call(null,sablono.core.drop_down14124);
/**
* Creates a text area element.
*/
sablono.core.text_area14125 = (function() {
var text_area14125 = null;
var text_area14125__1 = (function (name){return text_area14125.call(null,name,null);
});
var text_area14125__2 = (function (name,value){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"textarea","textarea",4305627820),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",1013907597),sablono.core.make_id.call(null,name)], null),sablono.util.as_str.call(null,value)], null);
});
text_area14125 = function(name,value){
switch(arguments.length){
case 1:
return text_area14125__1.call(this,name);
case 2:
return text_area14125__2.call(this,name,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
text_area14125.cljs$core$IFn$_invoke$arity$1 = text_area14125__1;
text_area14125.cljs$core$IFn$_invoke$arity$2 = text_area14125__2;
return text_area14125;
})()
;
sablono.core.text_area = sablono.core.wrap_attrs.call(null,sablono.core.text_area14125);
/**
* Creates a file upload input.
*/
sablono.core.file_upload14126 = (function file_upload14126(name){return sablono.core.input_field.call(null,"file",name,null);
});
sablono.core.file_upload = sablono.core.wrap_attrs.call(null,sablono.core.file_upload14126);
/**
* Creates a label for an input field with the supplied name.
*/
sablono.core.label14127 = (function label14127(name,text){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1116631654),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"htmlFor","htmlFor",2249940112),sablono.core.make_id.call(null,name)], null),text], null);
});
sablono.core.label = sablono.core.wrap_attrs.call(null,sablono.core.label14127);
/**
* Creates a submit button.
*/
sablono.core.submit_button14128 = (function submit_button14128(text){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),"submit",new cljs.core.Keyword(null,"value","value",1125876963),text], null)], null);
});
sablono.core.submit_button = sablono.core.wrap_attrs.call(null,sablono.core.submit_button14128);
/**
* Creates a form reset button.
*/
sablono.core.reset_button14129 = (function reset_button14129(text){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),"reset",new cljs.core.Keyword(null,"value","value",1125876963),text], null)], null);
});
sablono.core.reset_button = sablono.core.wrap_attrs.call(null,sablono.core.reset_button14129);
/**
* Create a form that points to a particular method and route.
* e.g. (form-to [:put "/post"]
* ...)
* @param {...*} var_args
*/
sablono.core.form_to14130 = (function() { 
var form_to14130__delegate = function (p__14131,body){var vec__14133 = p__14131;var method = cljs.core.nth.call(null,vec__14133,0,null);var action = cljs.core.nth.call(null,vec__14133,1,null);var method_str = clojure.string.upper_case.call(null,cljs.core.name.call(null,method));var action_uri = sablono.util.to_uri.call(null,action);return cljs.core.vec.call(null,cljs.core.concat.call(null,((cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"get","get",1014006472),null,new cljs.core.Keyword(null,"post","post",1017351186),null], null), null),method))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",1017053238),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",4231316563),method_str,new cljs.core.Keyword(null,"action","action",3885920680),action_uri], null)], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",1017053238),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",4231316563),"POST",new cljs.core.Keyword(null,"action","action",3885920680),action_uri], null),sablono.core.hidden_field.call(null,"_method",method_str)], null)),body));
};
var form_to14130 = function (p__14131,var_args){
var body = null;if (arguments.length > 1) {
  body = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return form_to14130__delegate.call(this,p__14131,body);};
form_to14130.cljs$lang$maxFixedArity = 1;
form_to14130.cljs$lang$applyTo = (function (arglist__14134){
var p__14131 = cljs.core.first(arglist__14134);
var body = cljs.core.rest(arglist__14134);
return form_to14130__delegate(p__14131,body);
});
form_to14130.cljs$core$IFn$_invoke$arity$variadic = form_to14130__delegate;
return form_to14130;
})()
;
sablono.core.form_to = sablono.core.wrap_attrs.call(null,sablono.core.form_to14130);

//# sourceMappingURL=core.js.map