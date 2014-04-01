// Compiled by ClojureScript 0.0-2138
goog.provide('sablono.util');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.string');
goog.require('goog.Uri');
sablono.util._STAR_base_url_STAR_ = null;
/**
* Regular expression that parses a CSS-style id and class from an element name.
*/
sablono.util.re_tag = /([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?/;
sablono.util.ToString = (function (){var obj14142 = {};return obj14142;
})();
sablono.util.to_str = (function to_str(x){if((function (){var and__3410__auto__ = x;if(and__3410__auto__)
{return x.sablono$util$ToString$to_str$arity$1;
} else
{return and__3410__auto__;
}
})())
{return x.sablono$util$ToString$to_str$arity$1(x);
} else
{var x__4043__auto__ = (((x == null))?null:x);return (function (){var or__3422__auto__ = (sablono.util.to_str[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (sablono.util.to_str["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ToString.to-str",x);
}
}
})().call(null,x);
}
});
sablono.util.ToURI = (function (){var obj14144 = {};return obj14144;
})();
sablono.util.to_uri = (function to_uri(x){if((function (){var and__3410__auto__ = x;if(and__3410__auto__)
{return x.sablono$util$ToURI$to_uri$arity$1;
} else
{return and__3410__auto__;
}
})())
{return x.sablono$util$ToURI$to_uri$arity$1(x);
} else
{var x__4043__auto__ = (((x == null))?null:x);return (function (){var or__3422__auto__ = (sablono.util.to_uri[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (sablono.util.to_uri["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ToURI.to-uri",x);
}
}
})().call(null,x);
}
});
/**
* Converts its arguments into a string using to-str.
* @param {...*} var_args
*/
sablono.util.as_str = (function() { 
var as_str__delegate = function (xs){return cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,sablono.util.to_str,xs));
};
var as_str = function (var_args){
var xs = null;if (arguments.length > 0) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return as_str__delegate.call(this,xs);};
as_str.cljs$lang$maxFixedArity = 0;
as_str.cljs$lang$applyTo = (function (arglist__14145){
var xs = cljs.core.seq(arglist__14145);
return as_str__delegate(xs);
});
as_str.cljs$core$IFn$_invoke$arity$variadic = as_str__delegate;
return as_str;
})()
;
/**
* Removes all map entries where value is nil.
*/
sablono.util.compact_map = (function compact_map(m){return cljs.core.reduce.call(null,(function (m__$1,k){var temp__4090__auto__ = cljs.core.get.call(null,m__$1,k);if(cljs.core.truth_(temp__4090__auto__))
{var v = temp__4090__auto__;return m__$1;
} else
{return cljs.core.dissoc.call(null,m__$1,k);
}
}),m,cljs.core.keys.call(null,m));
});
/**
* Like clojure.core/merge but concat :className entries.
* @param {...*} var_args
*/
sablono.util.merge_with_class = (function() { 
var merge_with_class__delegate = function (maps){var classes = cljs.core.vec.call(null,cljs.core.remove.call(null,cljs.core.nil_QMARK_,cljs.core.mapcat.call(null,(function (p1__14146_SHARP_){if(cljs.core.list_QMARK_.call(null,p1__14146_SHARP_))
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__14146_SHARP_], null);
} else
{if(cljs.core.vector_QMARK_.call(null,p1__14146_SHARP_))
{return p1__14146_SHARP_;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__14146_SHARP_], null);
} else
{return null;
}
}
}
}),cljs.core.map.call(null,new cljs.core.Keyword(null,"className","className",1004015509),maps))));var maps__$1 = cljs.core.apply.call(null,cljs.core.merge,maps);if(cljs.core.empty_QMARK_.call(null,classes))
{return maps__$1;
} else
{return cljs.core.assoc.call(null,maps__$1,new cljs.core.Keyword(null,"className","className",1004015509),classes);
}
};
var merge_with_class = function (var_args){
var maps = null;if (arguments.length > 0) {
  maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return merge_with_class__delegate.call(this,maps);};
merge_with_class.cljs$lang$maxFixedArity = 0;
merge_with_class.cljs$lang$applyTo = (function (arglist__14147){
var maps = cljs.core.seq(arglist__14147);
return merge_with_class__delegate(maps);
});
merge_with_class.cljs$core$IFn$_invoke$arity$variadic = merge_with_class__delegate;
return merge_with_class;
})()
;
/**
* Ensure an element vector is of the form [tag-name attrs content].
*/
sablono.util.normalize_element = (function normalize_element(p__14148){var vec__14151 = p__14148;var tag = cljs.core.nth.call(null,vec__14151,0,null);var content = cljs.core.nthnext.call(null,vec__14151,1);if(!(((tag instanceof cljs.core.Keyword)) || ((tag instanceof cljs.core.Symbol)) || (typeof tag === 'string')))
{throw cljs.core.ex_info.call(null,[cljs.core.str(tag),cljs.core.str(" is not a valid element name.")].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",1014018828),tag,new cljs.core.Keyword(null,"content","content",1965434859),content], null));
} else
{}
var vec__14152 = cljs.core.re_matches.call(null,sablono.util.re_tag,cljs.core.name.call(null,tag));var _ = cljs.core.nth.call(null,vec__14152,0,null);var tag__$1 = cljs.core.nth.call(null,vec__14152,1,null);var id = cljs.core.nth.call(null,vec__14152,2,null);var class$ = cljs.core.nth.call(null,vec__14152,3,null);var tag_attrs = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",1013907597),id,new cljs.core.Keyword(null,"className","className",1004015509),(cljs.core.truth_(class$)?clojure.string.split.call(null,class$,/\./):null)], null);var map_attrs = cljs.core.first.call(null,content);if(cljs.core.map_QMARK_.call(null,map_attrs))
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag__$1,sablono.util.compact_map.call(null,sablono.util.merge_with_class.call(null,tag_attrs,map_attrs)),cljs.core.next.call(null,content)], null);
} else
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag__$1,sablono.util.compact_map.call(null,tag_attrs),content], null);
}
});
/**
* Join the `classes` with a whitespace.
*/
sablono.util.join_classes = (function join_classes(classes){return clojure.string.join.call(null," ",cljs.core.flatten.call(null,classes));
});
/**
* Returns the React function to render `tag` as a symbol.
*/
sablono.util.react_symbol = (function react_symbol(tag){return cljs.core.symbol.call(null,"js",[cljs.core.str("React.DOM."),cljs.core.str(cljs.core.name.call(null,tag))].join(''));
});
(sablono.util.ToString["_"] = true);
(sablono.util.to_str["_"] = (function (x){return [cljs.core.str(x)].join('');
}));
(sablono.util.ToString["number"] = true);
(sablono.util.to_str["number"] = (function (x){return [cljs.core.str(x)].join('');
}));
(sablono.util.ToString["null"] = true);
(sablono.util.to_str["null"] = (function (_){return "";
}));
goog.Uri.prototype.sablono$util$ToString$ = true;
goog.Uri.prototype.sablono$util$ToString$to_str$arity$1 = (function (x){var x__$1 = this;if(cljs.core.truth_((function (){var or__3422__auto__ = x__$1.hasDomain();if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{return ((x__$1.getPath() == null)) || (cljs.core.not.call(null,cljs.core.re_matches.call(null,/^\/.*/,x__$1.getPath())));
}
})()))
{return [cljs.core.str(x__$1)].join('');
} else
{var base = [cljs.core.str(sablono.util._STAR_base_url_STAR_)].join('');if(cljs.core.truth_(cljs.core.re_matches.call(null,/.*\/$/,base)))
{return [cljs.core.str(cljs.core.subs.call(null,base,0,(cljs.core.count.call(null,base) - 1))),cljs.core.str(x__$1)].join('');
} else
{return [cljs.core.str(base),cljs.core.str(x__$1)].join('');
}
}
});
cljs.core.Keyword.prototype.sablono$util$ToString$ = true;
cljs.core.Keyword.prototype.sablono$util$ToString$to_str$arity$1 = (function (x){var x__$1 = this;return cljs.core.name.call(null,x__$1);
});
(sablono.util.ToURI["_"] = true);
(sablono.util.to_uri["_"] = (function (x){return (new goog.Uri([cljs.core.str(x)].join('')));
}));
goog.Uri.prototype.sablono$util$ToURI$ = true;
goog.Uri.prototype.sablono$util$ToURI$to_uri$arity$1 = (function (x){var x__$1 = this;return x__$1;
});

//# sourceMappingURL=util.js.map