// Compiled by ClojureScript 0.0-2138
goog.provide('eight_queens.core');
goog.require('cljs.core');
goog.require('frontier.dev_tools');
goog.require('cljs.core.async');
goog.require('frontier.core');
goog.require('cljs.core.logic');
goog.require('frontier.dev_tools');
goog.require('frontier.core');
goog.require('cljs.core.logic');
goog.require('cljs.core.async');
eight_queens.core.log = (function log(a){return console.log(a);
});
eight_queens.core.logd = (function logd(a){return console.log(cljs.core.clj__GT_js.call(null,a));
});
eight_queens.core.logp = (function logp(a){return console.log(cljs.core.prn_str.call(null,a));
});
cljs.core.set_print_fn_BANG_.call(null,eight_queens.core.log);
eight_queens.core.mapo = (function mapo(l,g,o){return (function (a9640){return (new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9640,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.PersistentVector.EMPTY,l);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.PersistentVector.EMPTY,o);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a9640,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var r = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"r","r",-1640531413,null));var f = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"f","f",-1640531425,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,f,r),l);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){var nr = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"nr","nr",-1640528003,null));var nf = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"nf","nf",-1640528015,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,nf,nr),o);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),g.call(null,f,nf)),mapo.call(null,r,g,nr));
})));
}));
})));
}));
}))));
})));
});
});
eight_queens.core.reverseo = (function reverseo(lst,acum,res){return (function (a9642){return (new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9642,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.PersistentVector.EMPTY,lst);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,acum,res);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a9642,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var y = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"y","y",-1640531406,null));var x = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"x","x",-1640531407,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,x,y),lst);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){var z = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"z","z",-1640531405,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,z,acum);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$2){return (new cljs.core.logic.Inc((function (){var w = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"w","w",-1640531408,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto____$2,cljs.core.logic.conso.call(null,x,z,w)),reverseo.call(null,y,w,res));
})));
}));
})));
}));
})));
}));
}))));
})));
});
});
eight_queens.core.rembero = (function rembero(x,l,o){return (function (a9644){return cljs.core.logic._ifa.call(null,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [l,o], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY,cljs.core.PersistentVector.EMPTY], null));if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}).call(null,a9644),cljs.core.PersistentVector.EMPTY,(new cljs.core.Delay(cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"done","done",1016993524),false,new cljs.core.Keyword(null,"value","value",1125876963),null], null)),(function (){return cljs.core.logic._ifa.call(null,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var f = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"f","f",-1640531425,null));var r = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"r","r",-1640531413,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,cljs.core.logic.conso.call(null,f,r,l)),(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,f,x);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),rembero.call(null,x,r,o));
})));
}).call(null,a9644),cljs.core.PersistentVector.EMPTY,(new cljs.core.Delay(cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"done","done",1016993524),false,new cljs.core.Keyword(null,"value","value",1125876963),null], null)),(function (){return cljs.core.logic._ifa.call(null,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var f = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"f","f",-1640531425,null));var r = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"r","r",-1640531413,null));var op = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"op","op",-1640527974,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,cljs.core.logic.conso.call(null,f,r,l)),rembero.call(null,x,r,op)),cljs.core.logic.conso.call(null,f,op,o));
})));
}).call(null,a9644),cljs.core.PersistentVector.EMPTY,null);
}))));
}))));
});
});
eight_queens.core.nb = new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [4,6,8,2,7,1,3,5], null);
eight_queens.core.nshifto = (function nshifto(x,o){return (function (a9646){return (new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9646,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,0,x);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,0,o);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9646,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,0,x);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,1,o);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9646,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,1,x);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,2,o);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9646,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,2,x);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,3,o);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9646,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,3,x);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,4,o);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9646,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,4,x);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,5,o);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9646,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,5,x);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,6,o);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9646,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,6,x);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,7,o);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9646,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,7,x);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,8,o);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9646,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,8,x);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,9,o);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a9646,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,9,x);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,9,o);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
}));
}))));
}))));
}))));
}))));
}))));
}))));
}))));
}))));
}))));
}))));
})));
});
});
eight_queens.core.nlshifto = (function nlshifto(x,o){return eight_queens.core.nshifto.call(null,x,o);
});
eight_queens.core.nrshifto = (function nrshifto(x,o){return eight_queens.core.nshifto.call(null,o,x);
});
eight_queens.core.possible_moves = (function possible_moves(cm,cls,crs,cpossibles,opossibles){return (function (a9648){return (new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9648,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.PersistentVector.EMPTY,cpossibles);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.PersistentVector.EMPTY,opossibles);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a9648,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var r = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"r","r",-1640531413,null));var f = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"f","f",-1640531425,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,f,r),cpossibles);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){var op = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"op","op",-1640527974,null));var of = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"of","of",-1640527984,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,of,op),opossibles);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$2){return (new cljs.core.logic.Inc((function (){var ls = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"ls","ls",-1640528064,null));var rs = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"rs","rs",-1640527878,null));var of1 = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"of1","of1",-1640421645,null));var of2 = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"of2","of2",-1640421644,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto____$2,eight_queens.core.nlshifto.call(null,cls,ls)),eight_queens.core.nrshifto.call(null,crs,rs)),eight_queens.core.rembero.call(null,cm,f,of1)),eight_queens.core.rembero.call(null,ls,of1,of2)),eight_queens.core.rembero.call(null,rs,of2,of)),possible_moves.call(null,cm,ls,rs,r,op));
})));
}));
})));
}));
})));
}));
}))));
})));
});
});
eight_queens.core.proper_board_helper = (function proper_board_helper(b,pm){return (function (a9650){return (new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9650,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.PersistentVector.EMPTY,b);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.PersistentVector.EMPTY,pm);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a9650,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var r = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"r","r",-1640531413,null));var f = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"f","f",-1640531425,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,f,r),b);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){var cs = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"cs","cs",-1640528343,null));var rs = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"rs","rs",-1640527878,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,cs,rs),pm);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$2){return (new cljs.core.logic.Inc((function (){var ns = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"ns","ns",-1640528002,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto____$2,cljs.core.logic.membero.call(null,f,cs)),eight_queens.core.possible_moves.call(null,f,f,f,rs,ns)),proper_board_helper.call(null,r,ns));
})));
}));
})));
}));
})));
}));
}))));
})));
});
});
eight_queens.core.all_possible_moves_forward = (function all_possible_moves_forward(b,cpossibles,opossibles){return (function (a9652){return (new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9652,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.PersistentVector.EMPTY,b);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.PersistentVector.EMPTY,cpossibles);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$2){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$2,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.PersistentVector.EMPTY,opossibles);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9652,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var r = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"r","r",-1640531413,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,new cljs.core.Keyword(null,"_","_",1013904337),r),b);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){var c = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"c","c",-1640531428,null));var cr = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"cr","cr",-1640528344,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,c,cr),cpossibles);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$2){return (new cljs.core.logic.Inc((function (){var op = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"op","op",-1640527974,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto____$2,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,c,op),opossibles);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),all_possible_moves_forward.call(null,r,cr,op));
})));
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a9652,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var r = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"r","r",-1640531413,null));var x = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"x","x",-1640531407,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,x,r),b);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){var cs = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"cs","cs",-1640528343,null));var rs = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"rs","rs",-1640527878,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,cs,rs),cpossibles);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$2){return (new cljs.core.logic.Inc((function (){var op = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"op","op",-1640527974,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto____$2,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,cljs.core.PersistentVector.EMPTY,op),opossibles);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$3){return (new cljs.core.logic.Inc((function (){var cp = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"cp","cp",-1640528346,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto____$3,cljs.core.logic.membero.call(null,x,new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,1,2,3,4,5,6,7,8,9], null))),eight_queens.core.possible_moves.call(null,x,x,x,rs,cp)),all_possible_moves_forward.call(null,r,cp,op));
})));
}));
})));
}));
})));
}));
})));
}));
}))));
}))));
})));
});
});
eight_queens.core.all_possible_moves = (function all_possible_moves(b,cpossibles,opossibles){return (function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var rb = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"rb","rb",-1640527895,null));var rcp = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"rcp","rcp",-1640418792,null));var fop = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"fop","fop",-1640429952,null));var rop = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"rop","rop",-1640418420,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,eight_queens.core.all_possible_moves_forward.call(null,b,cpossibles,fop)),eight_queens.core.reverseo.call(null,fop,cljs.core.PersistentVector.EMPTY,rcp)),eight_queens.core.reverseo.call(null,b,cljs.core.PersistentVector.EMPTY,rb)),eight_queens.core.all_possible_moves_forward.call(null,rb,rcp,rop)),eight_queens.core.reverseo.call(null,rop,cljs.core.PersistentVector.EMPTY,opossibles));
})));
});
});
eight_queens.core.get_possible_moves = (function get_possible_moves(b,cp){return cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__4387__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){return (function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var q = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"q","q",-1640531414,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,eight_queens.core.all_possible_moves.call(null,b,cp,q)),((function (q){
return (function (a__4388__auto__){return cljs.core.logic._reify.call(null,a__4388__auto__,q);
});})(q))
);
})));
}).call(null,cljs.core.logic.empty_s);
}))));if(1)
{return cljs.core.take.call(null,1,xs__4387__auto__);
} else
{return xs__4387__auto__;
}
})()));
});
eight_queens.core.to_query = (function to_query(i,q){return (function (a9654){return (new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a9654,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,new cljs.core.Keyword(null,"_","_",1013904337),i);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){var x = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"x","x",-1640531407,null));return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,x,q);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a9654,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var r = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"r","r",-1640531413,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,r,i);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,r,q);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),cljs.core.logic.membero.call(null,r,new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,1,2,3,4,5,6,7,8,9], null)));
})));
}));
})));
}));
}))));
})));
});
});
eight_queens.core.board_to_query = (function board_to_query(b,q){return (function (a__4431__auto__){return cljs.core.logic._bind.call(null,a__4431__auto__,eight_queens.core.mapo.call(null,b,eight_queens.core.to_query,q));
});
});
eight_queens.core.board_can_win_QMARK_ = (function board_can_win_QMARK_(b,pm){if((4 <= cljs.core.count.call(null,cljs.core.set.call(null,b))))
{var pm__$1 = cljs.core.map.call(null,(function (bm,mvs){if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"_","_",1013904337),bm))
{return mvs;
} else
{return cljs.core.vec.call(null,cljs.core.set.call(null,cljs.core.conj.call(null,mvs,bm)));
}
}),b,pm);var res = cljs.core.doall.call(null,(function (){var xs__4387__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc(((function (pm__$1){
return (function (){return ((function (pm__$1){
return (function (a__4379__auto__){return (new cljs.core.logic.Inc(((function (pm__$1){
return (function (){var q = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"q","q",-1640531414,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,eight_queens.core.board_to_query.call(null,b,q)),eight_queens.core.proper_board_helper.call(null,q,pm__$1)),((function (q,pm__$1){
return (function (a__4388__auto__){return cljs.core.logic._reify.call(null,a__4388__auto__,q);
});})(q,pm__$1))
);
});})(pm__$1))
));
});})(pm__$1))
.call(null,cljs.core.logic.empty_s);
});})(pm__$1))
)));if(1)
{return cljs.core.take.call(null,1,xs__4387__auto__);
} else
{return xs__4387__auto__;
}
})());return cljs.core.first.call(null,res);
} else
{return true;
}
});
eight_queens.core.has_won_QMARK_ = (function has_won_QMARK_(b){return (cljs.core._EQ_.call(null,8,cljs.core.count.call(null,b))) && (cljs.core.not.call(null,cljs.core.some.call(null,(function (p1__9655_SHARP_){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"_","_",1013904337),p1__9655_SHARP_);
}),b)));
});
eight_queens.core.has_lost_QMARK_ = (function has_lost_QMARK_(b,pm){var and__3410__auto__ = cljs.core._EQ_.call(null,8,cljs.core.count.call(null,b));if(and__3410__auto__)
{var and__3410__auto____$1 = cljs.core.some.call(null,(function (p1__9656_SHARP_){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"_","_",1013904337),p1__9656_SHARP_);
}),b);if(cljs.core.truth_(and__3410__auto____$1))
{return cljs.core.every_QMARK_.call(null,(function (p1__9657_SHARP_){return cljs.core._EQ_.call(null,cljs.core.PersistentVector.EMPTY,p1__9657_SHARP_);
}),pm);
} else
{return and__3410__auto____$1;
}
} else
{return and__3410__auto__;
}
});
eight_queens.core.moves = (function (){var method_table__4274__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__4275__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__4276__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__4277__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__4278__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("moves",cljs.core.first,new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__4278__auto__,method_table__4274__auto__,prefer_table__4275__auto__,method_cache__4276__auto__,cached_hierarchy__4277__auto__));
})();
cljs.core._add_method.call(null,eight_queens.core.moves,new cljs.core.Keyword(null,"default","default",2558708147),(function (msg,system){return system;
}));
cljs.core._add_method.call(null,eight_queens.core.moves,new cljs.core.Keyword(null,"reset","reset",1122308289),(function (msg,system){return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"board","board",1107812952),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"_","_",1013904337),new cljs.core.Keyword(null,"_","_",1013904337),new cljs.core.Keyword(null,"_","_",1013904337),new cljs.core.Keyword(null,"_","_",1013904337),new cljs.core.Keyword(null,"_","_",1013904337),new cljs.core.Keyword(null,"_","_",1013904337),new cljs.core.Keyword(null,"_","_",1013904337),new cljs.core.Keyword(null,"_","_",1013904337)], null),new cljs.core.Keyword(null,"poss-moves","poss-moves",651078534),cljs.core.take.call(null,8,cljs.core.repeat.call(null,cljs.core.range.call(null,1,9)))], null);
}));
cljs.core._add_method.call(null,eight_queens.core.moves,new cljs.core.Keyword(null,"move","move",1017261891),(function (p__9658,system){var vec__9659 = p__9658;var _ = cljs.core.nth.call(null,vec__9659,0,null);var map__9660 = cljs.core.nth.call(null,vec__9659,1,null);var map__9660__$1 = ((cljs.core.seq_QMARK_.call(null,map__9660))?cljs.core.apply.call(null,cljs.core.hash_map,map__9660):map__9660);var pos = cljs.core.get.call(null,map__9660__$1,new cljs.core.Keyword(null,"pos","pos",1014015430));var row = cljs.core.get.call(null,map__9660__$1,new cljs.core.Keyword(null,"row","row",1014017356));if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"_","_",1013904337),cljs.core.get_in.call(null,system,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"board","board",1107812952),(row - 1)], null))))
{var board = cljs.core.assoc.call(null,new cljs.core.Keyword(null,"board","board",1107812952).cljs$core$IFn$_invoke$arity$1(system),(row - 1),pos);return cljs.core.assoc.call(null,cljs.core.assoc.call(null,system,new cljs.core.Keyword(null,"board","board",1107812952),board),new cljs.core.Keyword(null,"poss-moves","poss-moves",651078534),eight_queens.core.get_possible_moves.call(null,board,new cljs.core.Keyword(null,"poss-moves","poss-moves",651078534).cljs$core$IFn$_invoke$arity$1(system)));
} else
{return system;
}
}));

/**
* @constructor
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
eight_queens.core.MovesComp = (function (__meta,__extmap){
this.__meta = __meta;
this.__extmap = __extmap;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
if(arguments.length>0){
this.__meta = __meta;
this.__extmap = __extmap;
} else {
this.__meta=null;
this.__extmap=null;
}
})
eight_queens.core.MovesComp.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__3997__auto__){var self__ = this;
var this__3997__auto____$1 = this;var h__3833__auto__ = self__.__hash;if(!((h__3833__auto__ == null)))
{return h__3833__auto__;
} else
{var h__3833__auto____$1 = cljs.core.hash_imap.call(null,this__3997__auto____$1);self__.__hash = h__3833__auto____$1;
return h__3833__auto____$1;
}
});
eight_queens.core.MovesComp.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__4002__auto__,k__4003__auto__){var self__ = this;
var this__4002__auto____$1 = this;return cljs.core._lookup.call(null,this__4002__auto____$1,k__4003__auto__,null);
});
eight_queens.core.MovesComp.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4004__auto__,k9662,else__4005__auto__){var self__ = this;
var this__4004__auto____$1 = this;if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.get.call(null,self__.__extmap,k9662,else__4005__auto__);
} else
{return null;
}
});
eight_queens.core.MovesComp.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4009__auto__,k__4010__auto__,G__9661){var self__ = this;
var this__4009__auto____$1 = this;var pred__9664 = cljs.core.keyword_identical_QMARK_;var expr__9665 = k__4010__auto__;return (new eight_queens.core.MovesComp(self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__4010__auto__,G__9661),null));
});
eight_queens.core.MovesComp.prototype.frontier$core$iDerive$ = true;
eight_queens.core.MovesComp.prototype.frontier$core$iDerive$_derive$arity$2 = (function (_,system){var self__ = this;
var ___$1 = this;eight_queens.core.log.call(null,"in derive");
var board = new cljs.core.Keyword(null,"board","board",1107812952).cljs$core$IFn$_invoke$arity$1(system);var poss_moves = new cljs.core.Keyword(null,"poss-moves","poss-moves",651078534).cljs$core$IFn$_invoke$arity$1(system);return cljs.core.assoc.call(null,cljs.core.assoc.call(null,cljs.core.assoc.call(null,cljs.core.assoc.call(null,system,new cljs.core.Keyword(null,"queen-count","queen-count",589817886),cljs.core.count.call(null,cljs.core.filter.call(null,cljs.core.number_QMARK_,board))),new cljs.core.Keyword(null,"has-won?","has-won?",1108662574),eight_queens.core.has_won_QMARK_.call(null,board)),new cljs.core.Keyword(null,"has-lost?","has-lost?",3941260314),eight_queens.core.has_lost_QMARK_.call(null,board,poss_moves)),new cljs.core.Keyword(null,"can-win?","can-win?",841393970),eight_queens.core.board_can_win_QMARK_.call(null,board,poss_moves));
});
eight_queens.core.MovesComp.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__4016__auto__,writer__4017__auto__,opts__4018__auto__){var self__ = this;
var this__4016__auto____$1 = this;var pr_pair__4019__auto__ = (function (keyval__4020__auto__){return cljs.core.pr_sequential_writer.call(null,writer__4017__auto__,cljs.core.pr_writer,""," ","",opts__4018__auto__,keyval__4020__auto__);
});return cljs.core.pr_sequential_writer.call(null,writer__4017__auto__,pr_pair__4019__auto__,"#eight-queens.core.MovesComp{",", ","}",opts__4018__auto__,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});
eight_queens.core.MovesComp.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__4007__auto__,entry__4008__auto__){var self__ = this;
var this__4007__auto____$1 = this;if(cljs.core.vector_QMARK_.call(null,entry__4008__auto__))
{return cljs.core._assoc.call(null,this__4007__auto____$1,cljs.core._nth.call(null,entry__4008__auto__,0),cljs.core._nth.call(null,entry__4008__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__4007__auto____$1,entry__4008__auto__);
}
});
eight_queens.core.MovesComp.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4014__auto__){var self__ = this;
var this__4014__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});
eight_queens.core.MovesComp.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__4006__auto__){var self__ = this;
var this__4006__auto____$1 = this;return (0 + cljs.core.count.call(null,self__.__extmap));
});
eight_queens.core.MovesComp.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__3998__auto__,other__3999__auto__){var self__ = this;
var this__3998__auto____$1 = this;if(cljs.core.truth_((function (){var and__3410__auto__ = other__3999__auto__;if(cljs.core.truth_(and__3410__auto__))
{return ((this__3998__auto____$1.constructor === other__3999__auto__.constructor)) && (cljs.core.equiv_map.call(null,this__3998__auto____$1,other__3999__auto__));
} else
{return and__3410__auto__;
}
})()))
{return true;
} else
{return false;
}
});
eight_queens.core.MovesComp.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4001__auto__,G__9661){var self__ = this;
var this__4001__auto____$1 = this;return (new eight_queens.core.MovesComp(G__9661,self__.__extmap,self__.__hash));
});
eight_queens.core.MovesComp.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__4000__auto__){var self__ = this;
var this__4000__auto____$1 = this;return self__.__meta;
});
eight_queens.core.MovesComp.prototype.frontier$core$iTransform$ = true;
eight_queens.core.MovesComp.prototype.frontier$core$iTransform$_transform$arity$3 = (function (o,msg,system){var self__ = this;
var o__$1 = this;return eight_queens.core.moves.call(null,msg,system);
});
eight_queens.core.MovesComp.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__4011__auto__,k__4012__auto__){var self__ = this;
var this__4011__auto____$1 = this;if(cljs.core.contains_QMARK_.call(null,cljs.core.PersistentHashSet.EMPTY,k__4012__auto__))
{return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__4011__auto____$1),self__.__meta),k__4012__auto__);
} else
{return (new eight_queens.core.MovesComp(self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__4012__auto__)),null));
}
});
eight_queens.core.MovesComp.cljs$lang$type = true;
eight_queens.core.MovesComp.cljs$lang$ctorPrSeq = (function (this__4036__auto__){return cljs.core._conj.call(null,cljs.core.List.EMPTY,"eight-queens.core/MovesComp");
});
eight_queens.core.MovesComp.cljs$lang$ctorPrWriter = (function (this__4036__auto__,writer__4037__auto__){return cljs.core._write.call(null,writer__4037__auto__,"eight-queens.core/MovesComp");
});
eight_queens.core.__GT_MovesComp = (function __GT_MovesComp(){return (new eight_queens.core.MovesComp());
});
eight_queens.core.map__GT_MovesComp = (function map__GT_MovesComp(G__9663){return (new eight_queens.core.MovesComp(null,cljs.core.dissoc.call(null,G__9663)));
});
eight_queens.core.render_cell = (function render_cell(i,r,c,mvs,ec){if(cljs.core._EQ_.call(null,c,r))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td.queen","td.queen",1297379742),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.queen","span.queen",1133170424)], null)], null);
} else
{if(cljs.core.truth_(cljs.core.set.call(null,mvs).call(null,c)))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td.move","td.move",3793870849),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"className","className",1004015509),((cljs.core.odd_QMARK_.call(null,c))?"odd":"even"),new cljs.core.Keyword(null,"onClick","onClick",3956969051),(function (_){return cljs.core.async.put_BANG_.call(null,ec,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"move","move",1017261891),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"row","row",1014017356),i,new cljs.core.Keyword(null,"pos","pos",1014015430),c], null)], null));
})], null)], null);
} else
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td.nomove","td.nomove",1120529858)], null);
}
}
});
eight_queens.core.render_board = (function render_board(b,pm,ec){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table.table.table-bordered.chess-board","table.table.table-bordered.chess-board",2759831175),cljs.core.map.call(null,(function (i,r,mvs){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",1013907952),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",1004015509),((cljs.core.odd_QMARK_.call(null,i))?"odd":"even")], null),cljs.core.map.call(null,(function (c){return eight_queens.core.render_cell.call(null,i,r,c,mvs,ec);
}),cljs.core.range.call(null,1,9))], null);
}),cljs.core.range.call(null,1,9),b,pm)], null);
});
eight_queens.core.render_board_area = (function render_board_area(p__9667,ec){var map__9669 = p__9667;var map__9669__$1 = ((cljs.core.seq_QMARK_.call(null,map__9669))?cljs.core.apply.call(null,cljs.core.hash_map,map__9669):map__9669);var state = map__9669__$1;var queen_count = cljs.core.get.call(null,map__9669__$1,new cljs.core.Keyword(null,"queen-count","queen-count",589817886));var can_win_QMARK_ = cljs.core.get.call(null,map__9669__$1,new cljs.core.Keyword(null,"can-win?","can-win?",841393970));var has_lost_QMARK_ = cljs.core.get.call(null,map__9669__$1,new cljs.core.Keyword(null,"has-lost?","has-lost?",3941260314));var has_won_QMARK_ = cljs.core.get.call(null,map__9669__$1,new cljs.core.Keyword(null,"has-won?","has-won?",1108662574));var poss_moves = cljs.core.get.call(null,map__9669__$1,new cljs.core.Keyword(null,"poss-moves","poss-moves",651078534));var board = cljs.core.get.call(null,map__9669__$1,new cljs.core.Keyword(null,"board","board",1107812952));return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.board-area","div.board-area",4256701443),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",1004015509),(function (){var or__3422__auto__ = (function (){var and__3410__auto__ = has_won_QMARK_;if(cljs.core.truth_(and__3410__auto__))
{return "has-won";
} else
{return and__3410__auto__;
}
})();if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (function (){var and__3410__auto__ = has_lost_QMARK_;if(cljs.core.truth_(and__3410__auto__))
{return "has-lost";
} else
{return and__3410__auto__;
}
})();if(cljs.core.truth_(or__3422__auto____$1))
{return or__3422__auto____$1;
} else
{return "";
}
}
})()], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.controls","div.controls",1811692261),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-default.lefter","button.btn.btn-default.lefter",1671831890),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),"button",new cljs.core.Keyword(null,"onClick","onClick",3956969051),(function (x){return cljs.core.async.put_BANG_.call(null,ec,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reset","reset",1122308289)], null));
})], null),"Start Over"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.righter.queen-count","span.righter.queen-count",2290672853),"Queens: ",queen_count], null),(function (){var or__3422__auto__ = (function (){var and__3410__auto__ = has_won_QMARK_;if(cljs.core.truth_(and__3410__auto__))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text-success","span.text-success",3707550457),"You found 8 Queens!"], null);
} else
{return and__3410__auto__;
}
})();if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (function (){var and__3410__auto__ = has_lost_QMARK_;if(cljs.core.truth_(and__3410__auto__))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text-danger","span.text-danger",3147071889),"Well that didn't work."], null);
} else
{return and__3410__auto__;
}
})();if(cljs.core.truth_(or__3422__auto____$1))
{return or__3422__auto____$1;
} else
{var or__3422__auto____$2 = (function (){var and__3410__auto__ = cljs.core.not.call(null,can_win_QMARK_);if(and__3410__auto__)
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text-warning","span.text-warning",2404199058),"Uhhh ... maybe not."], null);
} else
{return and__3410__auto__;
}
})();if(cljs.core.truth_(or__3422__auto____$2))
{return or__3422__auto____$2;
} else
{return "";
}
}
}
})()], null),eight_queens.core.render_board.call(null,board,poss_moves,ec)], null);
});
eight_queens.core.board_renderer = (function board_renderer(p__9670){var map__9672 = p__9670;var map__9672__$1 = ((cljs.core.seq_QMARK_.call(null,map__9672))?cljs.core.apply.call(null,cljs.core.hash_map,map__9672):map__9672);var state = cljs.core.get.call(null,map__9672__$1,new cljs.core.Keyword(null,"state","state",1123661827));var event_chan = cljs.core.get.call(null,map__9672__$1,new cljs.core.Keyword(null,"event-chan","event-chan",1951581719));return eight_queens.core.render_board_area.call(null,state,event_chan);
});
eight_queens.core.run_example = (function run_example(target_id){return frontier.dev_tools.managed_system.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"board","board",1107812952),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"_","_",1013904337),new cljs.core.Keyword(null,"_","_",1013904337),new cljs.core.Keyword(null,"_","_",1013904337),new cljs.core.Keyword(null,"_","_",1013904337),new cljs.core.Keyword(null,"_","_",1013904337),new cljs.core.Keyword(null,"_","_",1013904337),new cljs.core.Keyword(null,"_","_",1013904337),new cljs.core.Keyword(null,"_","_",1013904337)], null),new cljs.core.Keyword(null,"poss-moves","poss-moves",651078534),cljs.core.take.call(null,8,cljs.core.repeat.call(null,cljs.core.range.call(null,1,9)))], null),frontier.core.component_group.call(null,(new eight_queens.core.MovesComp())),frontier.dev_tools.managed_renderer.call(null,target_id,eight_queens.core.board_renderer),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"move","move",1017261891),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"row","row",1014017356),0,new cljs.core.Keyword(null,"pos","pos",1014015430),0], null)], null)], null));
});
eight_queens.core.run_example.call(null,"example1");

//# sourceMappingURL=core.js.map