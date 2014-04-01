// Compiled by ClojureScript 0.0-2138
goog.provide('frontier.util.edn_renderer');
goog.require('cljs.core');
goog.require('sablono.core');
goog.require('sablono.core');
frontier.util.edn_renderer.literal = (function literal(class$,x){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1017440956),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",1004015509),class$], null),cljs.core.prn_str.call(null,x)], null);
});
frontier.util.edn_renderer.join_html = (function join_html(separator,coll){return cljs.core.interpose.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.separator","span.separator",1030950067),separator], null),cljs.core.map.call(null,frontier.util.edn_renderer.html,coll));
});
frontier.util.edn_renderer.html_collection = (function html_collection(class$,opener,closer,coll){return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.collection","span.collection",1917859636),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",1004015509),class$], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.opener","span.opener",4649288461),opener], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.contents","span.contents",2746539184),frontier.util.edn_renderer.join_html.call(null," ",coll)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.closer","span.closer",4302347280),closer], null)], null);
});
frontier.util.edn_renderer.html_keyval = (function html_keyval(p__10131){var vec__10133 = p__10131;var k = cljs.core.nth.call(null,vec__10133,0,null);var v = cljs.core.nth.call(null,vec__10133,1,null);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.keyval","span.keyval",4525216504),frontier.util.edn_renderer.html.call(null,k),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.separator","span.separator",1030950067)," "], null),frontier.util.edn_renderer.html.call(null,v)], null);
});
frontier.util.edn_renderer.html_keyvals = (function html_keyvals(coll){return cljs.core.interpose.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.separator","span.separator",1030950067),", "], null),cljs.core.map.call(null,frontier.util.edn_renderer.html_keyval,coll));
});
frontier.util.edn_renderer.html_map = (function html_map(coll){return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.collection.map","span.collection.map",1421546658),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.opener","span.opener",4649288461),"{"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.contents","span.contents",2746539184),frontier.util.edn_renderer.html_keyvals.call(null,coll)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.closer","span.closer",4302347280),"}"], null)], null);
});
frontier.util.edn_renderer.html_string = (function html_string(s){return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.string","span.string",4767881895),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.opener","span.opener",4649288461),"\""], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.contents","span.contents",2746539184),s], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.closer","span.closer",4302347280),"\""], null)], null);
});
frontier.util.edn_renderer.html = (function html(x){if(typeof x === 'number')
{return frontier.util.edn_renderer.literal.call(null,"number",x);
} else
{if((x instanceof cljs.core.Keyword))
{return frontier.util.edn_renderer.literal.call(null,"keyword",x);
} else
{if((x instanceof cljs.core.Symbol))
{return frontier.util.edn_renderer.literal.call(null,"symbol",x);
} else
{if(typeof x === 'string')
{return frontier.util.edn_renderer.html_string.call(null,x);
} else
{if(cljs.core.map_QMARK_.call(null,x))
{return frontier.util.edn_renderer.html_map.call(null,x);
} else
{if(cljs.core.set_QMARK_.call(null,x))
{return frontier.util.edn_renderer.html_collection.call(null,"set","#{","}",x);
} else
{if(cljs.core.vector_QMARK_.call(null,x))
{return frontier.util.edn_renderer.html_collection.call(null,"vector","[","]",x);
} else
{if(cljs.core.seq_QMARK_.call(null,x))
{return frontier.util.edn_renderer.html_collection.call(null,"seq","(",")",x);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return frontier.util.edn_renderer.literal.call(null,"literal",x);
} else
{return null;
}
}
}
}
}
}
}
}
}
});
frontier.util.edn_renderer.html_edn = (function html_edn(e){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.rendered-edn","div.rendered-edn",1981556806),frontier.util.edn_renderer.html.call(null,e)], null);
});

//# sourceMappingURL=edn_renderer.js.map