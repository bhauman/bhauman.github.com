// Compiled by ClojureScript 0.0-2138
goog.provide('cljs.core.logic');
goog.require('cljs.core');
goog.require('clojure.walk');
goog.require('clojure.walk');
goog.require('clojure.set');
goog.require('clojure.set');
cljs.core.logic._STAR_occurs_check_STAR_ = true;
cljs.core.logic.IUnifyTerms = (function (){var obj10217 = {};return obj10217;
})();
cljs.core.logic._unify_terms = (function _unify_terms(u,v,s){if((function (){var and__3410__auto__ = u;if(and__3410__auto__)
{return u.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3;
} else
{return and__3410__auto__;
}
})())
{return u.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3(u,v,s);
} else
{var x__4043__auto__ = (((u == null))?null:u);return (function (){var or__3422__auto__ = (cljs.core.logic._unify_terms[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._unify_terms["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyTerms.-unify-terms",u);
}
}
})().call(null,u,v,s);
}
});
cljs.core.logic.IUnifyWithNil = (function (){var obj10219 = {};return obj10219;
})();
cljs.core.logic._unify_with_nil = (function _unify_with_nil(v,u,s){if((function (){var and__3410__auto__ = v;if(and__3410__auto__)
{return v.cljs$core$logic$IUnifyWithNil$_unify_with_nil$arity$3;
} else
{return and__3410__auto__;
}
})())
{return v.cljs$core$logic$IUnifyWithNil$_unify_with_nil$arity$3(v,u,s);
} else
{var x__4043__auto__ = (((v == null))?null:v);return (function (){var or__3422__auto__ = (cljs.core.logic._unify_with_nil[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._unify_with_nil["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyWithNil.-unify-with-nil",v);
}
}
})().call(null,v,u,s);
}
});
cljs.core.logic.IUnifyWithObject = (function (){var obj10221 = {};return obj10221;
})();
cljs.core.logic._unify_with_object = (function _unify_with_object(v,u,s){if((function (){var and__3410__auto__ = v;if(and__3410__auto__)
{return v.cljs$core$logic$IUnifyWithObject$_unify_with_object$arity$3;
} else
{return and__3410__auto__;
}
})())
{return v.cljs$core$logic$IUnifyWithObject$_unify_with_object$arity$3(v,u,s);
} else
{var x__4043__auto__ = (((v == null))?null:v);return (function (){var or__3422__auto__ = (cljs.core.logic._unify_with_object[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._unify_with_object["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyWithObject.-unify-with-object",v);
}
}
})().call(null,v,u,s);
}
});
cljs.core.logic.IUnifyWithLVar = (function (){var obj10223 = {};return obj10223;
})();
cljs.core.logic._unify_with_lvar = (function _unify_with_lvar(v,u,s){if((function (){var and__3410__auto__ = v;if(and__3410__auto__)
{return v.cljs$core$logic$IUnifyWithLVar$_unify_with_lvar$arity$3;
} else
{return and__3410__auto__;
}
})())
{return v.cljs$core$logic$IUnifyWithLVar$_unify_with_lvar$arity$3(v,u,s);
} else
{var x__4043__auto__ = (((v == null))?null:v);return (function (){var or__3422__auto__ = (cljs.core.logic._unify_with_lvar[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._unify_with_lvar["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyWithLVar.-unify-with-lvar",v);
}
}
})().call(null,v,u,s);
}
});
cljs.core.logic.IUnifyWithLSeq = (function (){var obj10225 = {};return obj10225;
})();
cljs.core.logic._unify_with_lseq = (function _unify_with_lseq(v,u,s){if((function (){var and__3410__auto__ = v;if(and__3410__auto__)
{return v.cljs$core$logic$IUnifyWithLSeq$_unify_with_lseq$arity$3;
} else
{return and__3410__auto__;
}
})())
{return v.cljs$core$logic$IUnifyWithLSeq$_unify_with_lseq$arity$3(v,u,s);
} else
{var x__4043__auto__ = (((v == null))?null:v);return (function (){var or__3422__auto__ = (cljs.core.logic._unify_with_lseq[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._unify_with_lseq["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyWithLSeq.-unify-with-lseq",v);
}
}
})().call(null,v,u,s);
}
});
cljs.core.logic.IUnifyWithSequential = (function (){var obj10227 = {};return obj10227;
})();
cljs.core.logic._unify_with_seq = (function _unify_with_seq(v,u,s){if((function (){var and__3410__auto__ = v;if(and__3410__auto__)
{return v.cljs$core$logic$IUnifyWithSequential$_unify_with_seq$arity$3;
} else
{return and__3410__auto__;
}
})())
{return v.cljs$core$logic$IUnifyWithSequential$_unify_with_seq$arity$3(v,u,s);
} else
{var x__4043__auto__ = (((v == null))?null:v);return (function (){var or__3422__auto__ = (cljs.core.logic._unify_with_seq[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._unify_with_seq["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyWithSequential.-unify-with-seq",v);
}
}
})().call(null,v,u,s);
}
});
cljs.core.logic.IUnifyWithMap = (function (){var obj10229 = {};return obj10229;
})();
cljs.core.logic._unify_with_map = (function _unify_with_map(v,u,s){if((function (){var and__3410__auto__ = v;if(and__3410__auto__)
{return v.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3;
} else
{return and__3410__auto__;
}
})())
{return v.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3(v,u,s);
} else
{var x__4043__auto__ = (((v == null))?null:v);return (function (){var or__3422__auto__ = (cljs.core.logic._unify_with_map[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._unify_with_map["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyWithMap.-unify-with-map",v);
}
}
})().call(null,v,u,s);
}
});
cljs.core.logic.IReifyTerm = (function (){var obj10231 = {};return obj10231;
})();
cljs.core.logic._reify_term = (function _reify_term(v,s){if((function (){var and__3410__auto__ = v;if(and__3410__auto__)
{return v.cljs$core$logic$IReifyTerm$_reify_term$arity$2;
} else
{return and__3410__auto__;
}
})())
{return v.cljs$core$logic$IReifyTerm$_reify_term$arity$2(v,s);
} else
{var x__4043__auto__ = (((v == null))?null:v);return (function (){var or__3422__auto__ = (cljs.core.logic._reify_term[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._reify_term["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IReifyTerm.-reify-term",v);
}
}
})().call(null,v,s);
}
});
cljs.core.logic.IWalkTerm = (function (){var obj10233 = {};return obj10233;
})();
cljs.core.logic._walk_term = (function _walk_term(v,s){if((function (){var and__3410__auto__ = v;if(and__3410__auto__)
{return v.cljs$core$logic$IWalkTerm$_walk_term$arity$2;
} else
{return and__3410__auto__;
}
})())
{return v.cljs$core$logic$IWalkTerm$_walk_term$arity$2(v,s);
} else
{var x__4043__auto__ = (((v == null))?null:v);return (function (){var or__3422__auto__ = (cljs.core.logic._walk_term[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._walk_term["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IWalkTerm.-walk-term",v);
}
}
})().call(null,v,s);
}
});
cljs.core.logic.IOccursCheckTerm = (function (){var obj10235 = {};return obj10235;
})();
cljs.core.logic._occurs_check_term = (function _occurs_check_term(v,x,s){if((function (){var and__3410__auto__ = v;if(and__3410__auto__)
{return v.cljs$core$logic$IOccursCheckTerm$_occurs_check_term$arity$3;
} else
{return and__3410__auto__;
}
})())
{return v.cljs$core$logic$IOccursCheckTerm$_occurs_check_term$arity$3(v,x,s);
} else
{var x__4043__auto__ = (((v == null))?null:v);return (function (){var or__3422__auto__ = (cljs.core.logic._occurs_check_term[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._occurs_check_term["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IOccursCheckTerm.-occurs-check-term",v);
}
}
})().call(null,v,x,s);
}
});
cljs.core.logic.IBuildTerm = (function (){var obj10237 = {};return obj10237;
})();
cljs.core.logic._build_term = (function _build_term(u,s){if((function (){var and__3410__auto__ = u;if(and__3410__auto__)
{return u.cljs$core$logic$IBuildTerm$_build_term$arity$2;
} else
{return and__3410__auto__;
}
})())
{return u.cljs$core$logic$IBuildTerm$_build_term$arity$2(u,s);
} else
{var x__4043__auto__ = (((u == null))?null:u);return (function (){var or__3422__auto__ = (cljs.core.logic._build_term[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._build_term["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IBuildTerm.-build-term",u);
}
}
})().call(null,u,s);
}
});
cljs.core.logic.IBind = (function (){var obj10239 = {};return obj10239;
})();
cljs.core.logic._bind = (function _bind(this$,g){if((function (){var and__3410__auto__ = this$;if(and__3410__auto__)
{return this$.cljs$core$logic$IBind$_bind$arity$2;
} else
{return and__3410__auto__;
}
})())
{return this$.cljs$core$logic$IBind$_bind$arity$2(this$,g);
} else
{var x__4043__auto__ = (((this$ == null))?null:this$);return (function (){var or__3422__auto__ = (cljs.core.logic._bind[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._bind["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IBind.-bind",this$);
}
}
})().call(null,this$,g);
}
});
cljs.core.logic.IMPlus = (function (){var obj10241 = {};return obj10241;
})();
cljs.core.logic._mplus = (function _mplus(a,f){if((function (){var and__3410__auto__ = a;if(and__3410__auto__)
{return a.cljs$core$logic$IMPlus$_mplus$arity$2;
} else
{return and__3410__auto__;
}
})())
{return a.cljs$core$logic$IMPlus$_mplus$arity$2(a,f);
} else
{var x__4043__auto__ = (((a == null))?null:a);return (function (){var or__3422__auto__ = (cljs.core.logic._mplus[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._mplus["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IMPlus.-mplus",a);
}
}
})().call(null,a,f);
}
});
cljs.core.logic.ITake = (function (){var obj10243 = {};return obj10243;
})();
cljs.core.logic._take_STAR_ = (function _take_STAR_(a){if((function (){var and__3410__auto__ = a;if(and__3410__auto__)
{return a.cljs$core$logic$ITake$_take_STAR_$arity$1;
} else
{return and__3410__auto__;
}
})())
{return a.cljs$core$logic$ITake$_take_STAR_$arity$1(a);
} else
{var x__4043__auto__ = (((a == null))?null:a);return (function (){var or__3422__auto__ = (cljs.core.logic._take_STAR_[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._take_STAR_["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ITake.-take*",a);
}
}
})().call(null,a);
}
});
cljs.core.logic.IPair = (function (){var obj10245 = {};return obj10245;
})();
cljs.core.logic._lhs = (function _lhs(this$){if((function (){var and__3410__auto__ = this$;if(and__3410__auto__)
{return this$.cljs$core$logic$IPair$_lhs$arity$1;
} else
{return and__3410__auto__;
}
})())
{return this$.cljs$core$logic$IPair$_lhs$arity$1(this$);
} else
{var x__4043__auto__ = (((this$ == null))?null:this$);return (function (){var or__3422__auto__ = (cljs.core.logic._lhs[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._lhs["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IPair.-lhs",this$);
}
}
})().call(null,this$);
}
});
cljs.core.logic._rhs = (function _rhs(this$){if((function (){var and__3410__auto__ = this$;if(and__3410__auto__)
{return this$.cljs$core$logic$IPair$_rhs$arity$1;
} else
{return and__3410__auto__;
}
})())
{return this$.cljs$core$logic$IPair$_rhs$arity$1(this$);
} else
{var x__4043__auto__ = (((this$ == null))?null:this$);return (function (){var or__3422__auto__ = (cljs.core.logic._rhs[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._rhs["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IPair.-rhs",this$);
}
}
})().call(null,this$);
}
});

/**
* @constructor
*/
cljs.core.logic.Pair = (function (lhs,rhs){
this.lhs = lhs;
this.rhs = rhs;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2149580818;
})
cljs.core.logic.Pair.cljs$lang$type = true;
cljs.core.logic.Pair.cljs$lang$ctorStr = "cljs.core.logic/Pair";
cljs.core.logic.Pair.cljs$lang$ctorPrWriter = (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.logic/Pair");
});
cljs.core.logic.Pair.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){var self__ = this;
var coll__$1 = this;return cljs.core._write.call(null,writer,[cljs.core.str("("),cljs.core.str(self__.lhs),cljs.core.str(" . "),cljs.core.str(self__.rhs),cljs.core.str(")")].join(''));
});
cljs.core.logic.Pair.prototype.cljs$core$logic$IPair$ = true;
cljs.core.logic.Pair.prototype.cljs$core$logic$IPair$_lhs$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.lhs;
});
cljs.core.logic.Pair.prototype.cljs$core$logic$IPair$_rhs$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.rhs;
});
cljs.core.logic.Pair.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (_,i){var self__ = this;
var ___$1 = this;var pred__10246 = cljs.core._EQ__EQ_;var expr__10247 = i;if(cljs.core.truth_(pred__10246.call(null,0,expr__10247)))
{return self__.lhs;
} else
{if(cljs.core.truth_(pred__10246.call(null,1,expr__10247)))
{return self__.rhs;
} else
{throw (new Error("Index out of bounds"));
}
}
});
cljs.core.logic.Pair.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (_,i,not_found){var self__ = this;
var ___$1 = this;var pred__10249 = cljs.core._EQ__EQ_;var expr__10250 = i;if(cljs.core.truth_(pred__10249.call(null,0,expr__10250)))
{return self__.lhs;
} else
{if(cljs.core.truth_(pred__10249.call(null,1,expr__10250)))
{return self__.rhs;
} else
{return not_found;
}
}
});
cljs.core.logic.Pair.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return 2;
});
cljs.core.logic.Pair.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){var self__ = this;
var this$__$1 = this;return (cljs.core._EQ_.call(null,self__.lhs,other.lhs)) && (cljs.core._EQ_.call(null,self__.rhs,other.rhs));
});
cljs.core.logic.__GT_Pair = (function __GT_Pair(lhs,rhs){return (new cljs.core.logic.Pair(lhs,rhs));
});
cljs.core.logic.pair = (function pair(lhs,rhs){return (new cljs.core.logic.Pair(lhs,rhs));
});
cljs.core.logic.lvar_QMARK_ = (function lvar_QMARK_(x){return (x instanceof cljs.core.logic.LVar);
});
cljs.core.logic.ISubstitutions = (function (){var obj10253 = {};return obj10253;
})();
cljs.core.logic._occurs_check = (function _occurs_check(this$,u,v){if((function (){var and__3410__auto__ = this$;if(and__3410__auto__)
{return this$.cljs$core$logic$ISubstitutions$_occurs_check$arity$3;
} else
{return and__3410__auto__;
}
})())
{return this$.cljs$core$logic$ISubstitutions$_occurs_check$arity$3(this$,u,v);
} else
{var x__4043__auto__ = (((this$ == null))?null:this$);return (function (){var or__3422__auto__ = (cljs.core.logic._occurs_check[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._occurs_check["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-occurs-check",this$);
}
}
})().call(null,this$,u,v);
}
});
cljs.core.logic._ext = (function _ext(this$,u,v){if((function (){var and__3410__auto__ = this$;if(and__3410__auto__)
{return this$.cljs$core$logic$ISubstitutions$_ext$arity$3;
} else
{return and__3410__auto__;
}
})())
{return this$.cljs$core$logic$ISubstitutions$_ext$arity$3(this$,u,v);
} else
{var x__4043__auto__ = (((this$ == null))?null:this$);return (function (){var or__3422__auto__ = (cljs.core.logic._ext[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._ext["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-ext",this$);
}
}
})().call(null,this$,u,v);
}
});
cljs.core.logic._ext_no_check = (function _ext_no_check(this$,u,v){if((function (){var and__3410__auto__ = this$;if(and__3410__auto__)
{return this$.cljs$core$logic$ISubstitutions$_ext_no_check$arity$3;
} else
{return and__3410__auto__;
}
})())
{return this$.cljs$core$logic$ISubstitutions$_ext_no_check$arity$3(this$,u,v);
} else
{var x__4043__auto__ = (((this$ == null))?null:this$);return (function (){var or__3422__auto__ = (cljs.core.logic._ext_no_check[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._ext_no_check["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-ext-no-check",this$);
}
}
})().call(null,this$,u,v);
}
});
cljs.core.logic._walk = (function _walk(this$,v){if((function (){var and__3410__auto__ = this$;if(and__3410__auto__)
{return this$.cljs$core$logic$ISubstitutions$_walk$arity$2;
} else
{return and__3410__auto__;
}
})())
{return this$.cljs$core$logic$ISubstitutions$_walk$arity$2(this$,v);
} else
{var x__4043__auto__ = (((this$ == null))?null:this$);return (function (){var or__3422__auto__ = (cljs.core.logic._walk[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._walk["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-walk",this$);
}
}
})().call(null,this$,v);
}
});
cljs.core.logic._walk_STAR_ = (function _walk_STAR_(this$,v){if((function (){var and__3410__auto__ = this$;if(and__3410__auto__)
{return this$.cljs$core$logic$ISubstitutions$_walk_STAR_$arity$2;
} else
{return and__3410__auto__;
}
})())
{return this$.cljs$core$logic$ISubstitutions$_walk_STAR_$arity$2(this$,v);
} else
{var x__4043__auto__ = (((this$ == null))?null:this$);return (function (){var or__3422__auto__ = (cljs.core.logic._walk_STAR_[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._walk_STAR_["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-walk*",this$);
}
}
})().call(null,this$,v);
}
});
cljs.core.logic._unify = (function _unify(this$,u,v){if((function (){var and__3410__auto__ = this$;if(and__3410__auto__)
{return this$.cljs$core$logic$ISubstitutions$_unify$arity$3;
} else
{return and__3410__auto__;
}
})())
{return this$.cljs$core$logic$ISubstitutions$_unify$arity$3(this$,u,v);
} else
{var x__4043__auto__ = (((this$ == null))?null:this$);return (function (){var or__3422__auto__ = (cljs.core.logic._unify[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._unify["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-unify",this$);
}
}
})().call(null,this$,u,v);
}
});
cljs.core.logic._reify_lvar_name = (function _reify_lvar_name(_){if((function (){var and__3410__auto__ = _;if(and__3410__auto__)
{return _.cljs$core$logic$ISubstitutions$_reify_lvar_name$arity$1;
} else
{return and__3410__auto__;
}
})())
{return _.cljs$core$logic$ISubstitutions$_reify_lvar_name$arity$1(_);
} else
{var x__4043__auto__ = (((_ == null))?null:_);return (function (){var or__3422__auto__ = (cljs.core.logic._reify_lvar_name[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._reify_lvar_name["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-reify-lvar-name",_);
}
}
})().call(null,_);
}
});
cljs.core.logic._reify_STAR_ = (function _reify_STAR_(this$,v){if((function (){var and__3410__auto__ = this$;if(and__3410__auto__)
{return this$.cljs$core$logic$ISubstitutions$_reify_STAR_$arity$2;
} else
{return and__3410__auto__;
}
})())
{return this$.cljs$core$logic$ISubstitutions$_reify_STAR_$arity$2(this$,v);
} else
{var x__4043__auto__ = (((this$ == null))?null:this$);return (function (){var or__3422__auto__ = (cljs.core.logic._reify_STAR_[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._reify_STAR_["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-reify*",this$);
}
}
})().call(null,this$,v);
}
});
cljs.core.logic._reify = (function _reify(this$,v){if((function (){var and__3410__auto__ = this$;if(and__3410__auto__)
{return this$.cljs$core$logic$ISubstitutions$_reify$arity$2;
} else
{return and__3410__auto__;
}
})())
{return this$.cljs$core$logic$ISubstitutions$_reify$arity$2(this$,v);
} else
{var x__4043__auto__ = (((this$ == null))?null:this$);return (function (){var or__3422__auto__ = (cljs.core.logic._reify[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._reify["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-reify",this$);
}
}
})().call(null,this$,v);
}
});
cljs.core.logic.not_found = (function (){var obj10255 = {};return obj10255;
})();
/**
* Similar to Scheme assq, xs must be a List of Pairs
*/
cljs.core.logic.assq = (function assq(k,xs){var xs__$1 = cljs.core._seq.call(null,xs);while(true){
if((xs__$1 == null))
{return cljs.core.logic.not_found;
} else
{var x = cljs.core._first.call(null,xs__$1);var lhs = x.lhs;if((k === lhs))
{return x.rhs;
} else
{{
var G__10256 = cljs.core._next.call(null,xs__$1);
xs__$1 = G__10256;
continue;
}
}
}
break;
}
});

/**
* @constructor
*/
cljs.core.logic.Substitutions = (function (s){
this.s = s;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2149580800;
})
cljs.core.logic.Substitutions.cljs$lang$type = true;
cljs.core.logic.Substitutions.cljs$lang$ctorStr = "cljs.core.logic/Substitutions";
cljs.core.logic.Substitutions.cljs$lang$ctorPrWriter = (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.logic/Substitutions");
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ITake$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ITake$_take_STAR_$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return this$__$1;
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IMPlus$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IMPlus$_mplus$arity$2 = (function (this$,f){var self__ = this;
var this$__$1 = this;return cljs.core.logic.choice.call(null,this$__$1,f);
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IBind$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IBind$_bind$arity$2 = (function (this$,g){var self__ = this;
var this$__$1 = this;return g.call(null,this$__$1);
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_walk$arity$2 = (function (this$,v){var self__ = this;
var this$__$1 = this;if(cljs.core.truth_(cljs.core.logic.lvar_QMARK_.call(null,v)))
{var rhs = cljs.core.logic.assq.call(null,v,self__.s);var vp = cljs.core.logic._walk.call(null,this$__$1,rhs);if((cljs.core.logic.not_found === vp))
{return v;
} else
{return vp;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return v;
} else
{return null;
}
}
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_reify_STAR_$arity$2 = (function (this$,v){var self__ = this;
var this$__$1 = this;var v__$1 = cljs.core.logic._walk.call(null,this$__$1,v);return cljs.core.logic._reify_term.call(null,v__$1,this$__$1);
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_walk_STAR_$arity$2 = (function (this$,v){var self__ = this;
var this$__$1 = this;var v__$1 = cljs.core.logic._walk.call(null,this$__$1,v);return cljs.core.logic._walk_term.call(null,v__$1,this$__$1);
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_reify_lvar_name$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return cljs.core.symbol.call(null,[cljs.core.str("_."),cljs.core.str(cljs.core.count.call(null,self__.s))].join(''));
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_reify$arity$2 = (function (this$,v){var self__ = this;
var this$__$1 = this;var v__$1 = cljs.core.logic._walk_STAR_.call(null,this$__$1,v);return cljs.core.logic._walk_STAR_.call(null,cljs.core.logic._reify_STAR_.call(null,cljs.core.logic.empty_s,v__$1),v__$1);
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_unify$arity$3 = (function (this$,u,v){var self__ = this;
var this$__$1 = this;if((u === v))
{return this$__$1;
} else
{var u__$1 = cljs.core.logic._walk.call(null,this$__$1,u);var v__$1 = cljs.core.logic._walk.call(null,this$__$1,v);if((u__$1 === v__$1))
{return this$__$1;
} else
{return cljs.core.logic._unify_terms.call(null,u__$1,v__$1,this$__$1);
}
}
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_ext$arity$3 = (function (this$,u,v){var self__ = this;
var this$__$1 = this;if((cljs.core.logic._STAR_occurs_check_STAR_) && (cljs.core.logic._occurs_check.call(null,this$__$1,u,v)))
{return cljs.core.logic.fail.call(null,this$__$1);
} else
{return cljs.core.logic._ext_no_check.call(null,this$__$1,u,v);
}
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_ext_no_check$arity$3 = (function (this$,u,v){var self__ = this;
var this$__$1 = this;return (new cljs.core.logic.Substitutions(cljs.core.conj.call(null,self__.s,(new cljs.core.logic.Pair(u,v)))));
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_occurs_check$arity$3 = (function (this$,u,v){var self__ = this;
var this$__$1 = this;var v__$1 = cljs.core.logic._walk.call(null,this$__$1,v);return cljs.core.logic._occurs_check_term.call(null,v__$1,u,this$__$1);
});
cljs.core.logic.Substitutions.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,writer,opts){var self__ = this;
var this$__$1 = this;return cljs.core._pr_writer.call(null,self__.s,writer,opts);
});
cljs.core.logic.Substitutions.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,o){var self__ = this;
var this$__$1 = this;return ((this$__$1 === o)) || (((o instanceof cljs.core.logic.Substitutions)) && (cljs.core._EQ_.call(null,self__.s,o.s)));
});
cljs.core.logic.__GT_Substitutions = (function __GT_Substitutions(s){return (new cljs.core.logic.Substitutions(s));
});
cljs.core.logic.make_s = (function make_s(s){return (new cljs.core.logic.Substitutions(s));
});
cljs.core.logic.empty_s = cljs.core.logic.make_s.call(null,cljs.core.List.EMPTY);
cljs.core.logic.subst_QMARK_ = (function subst_QMARK_(x){return (x instanceof cljs.core.logic.Substitutions);
});
cljs.core.logic.to_s = (function to_s(v){var s = cljs.core.reduce.call(null,(function (l,p__10259){var vec__10260 = p__10259;var k = cljs.core.nth.call(null,vec__10260,0,null);var v__$1 = cljs.core.nth.call(null,vec__10260,1,null);return cljs.core.conj.call(null,l,cljs.core.logic.pair.call(null,k,v__$1));
}),cljs.core.List.EMPTY,v);return cljs.core.logic.make_s.call(null,s);
});

/**
* @constructor
*/
cljs.core.logic.LVar = (function (name,meta){
this.name = name;
this.meta = meta;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2154168320;
})
cljs.core.logic.LVar.cljs$lang$type = true;
cljs.core.logic.LVar.cljs$lang$ctorStr = "cljs.core.logic/LVar";
cljs.core.logic.LVar.cljs$lang$ctorPrWriter = (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.logic/LVar");
});
cljs.core.logic.LVar.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return cljs.core._hash.call(null,self__.name);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithLVar$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithLVar$_unify_with_lvar$arity$3 = (function (v,u,s){var self__ = this;
var v__$1 = this;return cljs.core.logic._ext_no_check.call(null,s,u,v__$1);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithSequential$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithSequential$_unify_with_seq$arity$3 = (function (v,u,s){var self__ = this;
var v__$1 = this;return cljs.core.logic._ext.call(null,s,v__$1,u);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IReifyTerm$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IReifyTerm$_reify_term$arity$2 = (function (v,s){var self__ = this;
var v__$1 = this;return cljs.core.logic._ext.call(null,s,v__$1,cljs.core.logic._reify_lvar_name.call(null,s));
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){var self__ = this;
var u__$1 = this;return cljs.core.logic._unify_with_lvar.call(null,v,u__$1,s);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithNil$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithNil$_unify_with_nil$arity$3 = (function (v,u,s){var self__ = this;
var v__$1 = this;return cljs.core.logic._ext_no_check.call(null,s,v__$1,u);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithMap$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3 = (function (v,u,s){var self__ = this;
var v__$1 = this;return cljs.core.logic._ext.call(null,s,v__$1,u);
});
cljs.core.logic.LVar.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (_,writer,opts){var self__ = this;
var ___$1 = this;return cljs.core._write.call(null,writer,[cljs.core.str("<lvar:"),cljs.core.str(self__.name),cljs.core.str(">")].join(''));
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IOccursCheckTerm$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IOccursCheckTerm$_occurs_check_term$arity$3 = (function (v,x,s){var self__ = this;
var v__$1 = this;return cljs.core._EQ_.call(null,cljs.core.logic._walk.call(null,s,v__$1),x);
});
cljs.core.logic.LVar.prototype.toString = (function (){var self__ = this;
var this$ = this;return cljs.core.pr_str.call(null,this$);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IWalkTerm$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IWalkTerm$_walk_term$arity$2 = (function (v,s){var self__ = this;
var v__$1 = this;return v__$1;
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithObject$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithObject$_unify_with_object$arity$3 = (function (v,u,s){var self__ = this;
var v__$1 = this;return cljs.core.logic._ext.call(null,s,v__$1,u);
});
cljs.core.logic.LVar.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,o){var self__ = this;
var this$__$1 = this;var and__3410__auto__ = (o instanceof cljs.core.logic.LVar);if(and__3410__auto__)
{var o__$1 = o;return (self__.name === o__$1.name);
} else
{return and__3410__auto__;
}
});
cljs.core.logic.LVar.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this$,new_meta){var self__ = this;
var this$__$1 = this;return (new cljs.core.logic.LVar(self__.name,self__.meta));
});
cljs.core.logic.LVar.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return self__.meta;
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithLSeq$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithLSeq$_unify_with_lseq$arity$3 = (function (v,u,s){var self__ = this;
var v__$1 = this;return cljs.core.logic._ext.call(null,s,v__$1,u);
});
cljs.core.logic.__GT_LVar = (function __GT_LVar(name,meta){return (new cljs.core.logic.LVar(name,meta));
});
cljs.core.logic.lvar_sym_counter = cljs.core.atom.call(null,0);
cljs.core.logic.lvar = (function() {
var lvar = null;
var lvar__0 = (function (){return lvar.call(null,new cljs.core.Symbol(null,"gen","gen",-1640429303,null));
});
var lvar__1 = (function (name){var name__$1 = [cljs.core.str(name),cljs.core.str("_"),cljs.core.str(cljs.core.swap_BANG_.call(null,cljs.core.logic.lvar_sym_counter,cljs.core.inc))].join('');return (new cljs.core.logic.LVar(name__$1,null));
});
lvar = function(name){
switch(arguments.length){
case 0:
return lvar__0.call(this);
case 1:
return lvar__1.call(this,name);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lvar.cljs$core$IFn$_invoke$arity$0 = lvar__0;
lvar.cljs$core$IFn$_invoke$arity$1 = lvar__1;
return lvar;
})()
;
cljs.core.logic.LConsSeq = (function (){var obj10262 = {};return obj10262;
})();
cljs.core.logic._lfirst = (function _lfirst(this$){if((function (){var and__3410__auto__ = this$;if(and__3410__auto__)
{return this$.cljs$core$logic$LConsSeq$_lfirst$arity$1;
} else
{return and__3410__auto__;
}
})())
{return this$.cljs$core$logic$LConsSeq$_lfirst$arity$1(this$);
} else
{var x__4043__auto__ = (((this$ == null))?null:this$);return (function (){var or__3422__auto__ = (cljs.core.logic._lfirst[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._lfirst["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"LConsSeq.-lfirst",this$);
}
}
})().call(null,this$);
}
});
cljs.core.logic._lnext = (function _lnext(this$){if((function (){var and__3410__auto__ = this$;if(and__3410__auto__)
{return this$.cljs$core$logic$LConsSeq$_lnext$arity$1;
} else
{return and__3410__auto__;
}
})())
{return this$.cljs$core$logic$LConsSeq$_lnext$arity$1(this$);
} else
{var x__4043__auto__ = (((this$ == null))?null:this$);return (function (){var or__3422__auto__ = (cljs.core.logic._lnext[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._lnext["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"LConsSeq.-lnext",this$);
}
}
})().call(null,this$);
}
});
cljs.core.logic.lcons_QMARK_ = (function lcons_QMARK_(x){return (x instanceof cljs.core.logic.LCons);
});
cljs.core.logic.lcons_pr_seq = (function lcons_pr_seq(x){if(cljs.core.logic.lcons_QMARK_.call(null,x))
{return (new cljs.core.LazySeq(null,(function (){return cljs.core.cons.call(null,cljs.core.logic._lfirst.call(null,x),lcons_pr_seq.call(null,cljs.core.logic._lnext.call(null,x)));
}),null,null));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,x),new cljs.core.Symbol(null,".",".",-1640531481,null));
} else
{return null;
}
}
});

/**
* @constructor
*/
cljs.core.logic.LCons = (function (a,d,meta){
this.a = a;
this.d = d;
this.meta = meta;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2149974016;
})
cljs.core.logic.LCons.cljs$lang$type = true;
cljs.core.logic.LCons.cljs$lang$ctorStr = "cljs.core.logic/LCons";
cljs.core.logic.LCons.cljs$lang$ctorPrWriter = (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.logic/LCons");
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithSequential$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithSequential$_unify_with_seq$arity$3 = (function (v,u,s){var self__ = this;
var v__$1 = this;return cljs.core.logic._unify_with_lseq.call(null,u,v__$1,s);
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IReifyTerm$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IReifyTerm$_reify_term$arity$2 = (function (v,s){var self__ = this;
var v__$1 = this;var v__$2 = v__$1;var s__$1 = s;while(true){
if(cljs.core.logic.lcons_QMARK_.call(null,v__$2))
{{
var G__10263 = cljs.core.logic._lnext.call(null,v__$2);
var G__10264 = cljs.core.logic._reify_STAR_.call(null,s__$1,cljs.core.logic._lfirst.call(null,v__$2));
v__$2 = G__10263;
s__$1 = G__10264;
continue;
}
} else
{return cljs.core.logic._reify_STAR_.call(null,s__$1,v__$2);
}
break;
}
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){var self__ = this;
var u__$1 = this;return cljs.core.logic._unify_with_lseq.call(null,v,u__$1,s);
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithNil$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithNil$_unify_with_nil$arity$3 = (function (v,u,s){var self__ = this;
var v__$1 = this;return cljs.core.logic.fail.call(null,s);
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithMap$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3 = (function (v,u,s){var self__ = this;
var v__$1 = this;return cljs.core.logic.fail.call(null,s);
});
cljs.core.logic.LCons.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,writer,opts){var self__ = this;
var this$__$1 = this;return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"("," ",")",opts,cljs.core.logic.lcons_pr_seq.call(null,this$__$1));
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IOccursCheckTerm$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IOccursCheckTerm$_occurs_check_term$arity$3 = (function (v,x,s){var self__ = this;
var v__$1 = this;var v__$2 = v__$1;var x__$1 = x;var s__$1 = s;while(true){
if(cljs.core.logic.lcons_QMARK_.call(null,v__$2))
{var or__3422__auto__ = cljs.core.logic._occurs_check.call(null,s__$1,x__$1,cljs.core.logic._lfirst.call(null,v__$2));if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{{
var G__10265 = cljs.core.logic._lnext.call(null,v__$2);
var G__10266 = x__$1;
var G__10267 = s__$1;
v__$2 = G__10265;
x__$1 = G__10266;
s__$1 = G__10267;
continue;
}
}
} else
{return cljs.core.logic._occurs_check.call(null,s__$1,x__$1,v__$2);
}
break;
}
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IWalkTerm$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IWalkTerm$_walk_term$arity$2 = (function (v,s){var self__ = this;
var v__$1 = this;return cljs.core.logic.lcons.call(null,cljs.core.logic._walk_STAR_.call(null,s,cljs.core.logic._lfirst.call(null,v__$1)),cljs.core.logic._walk_STAR_.call(null,s,cljs.core.logic._lnext.call(null,v__$1)));
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithObject$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithObject$_unify_with_object$arity$3 = (function (v,u,s){var self__ = this;
var v__$1 = this;return cljs.core.logic.fail.call(null,s);
});
cljs.core.logic.LCons.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,o){var self__ = this;
var this$__$1 = this;var or__3422__auto__ = (this$__$1 === o);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var and__3410__auto__ = (o instanceof cljs.core.logic.LCons);if(and__3410__auto__)
{var me = this$__$1;var you = o;while(true){
if((me == null))
{return (you == null);
} else
{if(cljs.core.truth_(cljs.core.logic.lvar_QMARK_.call(null,me)))
{return true;
} else
{if(cljs.core.truth_(cljs.core.logic.lvar_QMARK_.call(null,you)))
{return true;
} else
{if((cljs.core.logic.lcons_QMARK_.call(null,me)) && (cljs.core.logic.lcons_QMARK_.call(null,you)))
{var mef = cljs.core.logic._lfirst.call(null,me);var youf = cljs.core.logic._lfirst.call(null,you);var and__3410__auto____$1 = (function (){var or__3422__auto____$1 = cljs.core._EQ_.call(null,mef,youf);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{var or__3422__auto____$2 = cljs.core.logic.lvar_QMARK_.call(null,mef);if(cljs.core.truth_(or__3422__auto____$2))
{return or__3422__auto____$2;
} else
{return cljs.core.logic.lvar_QMARK_.call(null,youf);
}
}
})();if(cljs.core.truth_(and__3410__auto____$1))
{{
var G__10268 = cljs.core.logic._lnext.call(null,me);
var G__10269 = cljs.core.logic._lnext.call(null,you);
me = G__10268;
you = G__10269;
continue;
}
} else
{return and__3410__auto____$1;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core._EQ_.call(null,me,you);
} else
{return null;
}
}
}
}
}
break;
}
} else
{return and__3410__auto__;
}
}
});
cljs.core.logic.LCons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this$,new_meta){var self__ = this;
var this$__$1 = this;return (new cljs.core.logic.LCons(self__.a,self__.d,new_meta));
});
cljs.core.logic.LCons.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return self__.meta;
});
cljs.core.logic.LCons.prototype.cljs$core$logic$LConsSeq$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$LConsSeq$_lfirst$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.a;
});
cljs.core.logic.LCons.prototype.cljs$core$logic$LConsSeq$_lnext$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.d;
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithLSeq$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithLSeq$_unify_with_lseq$arity$3 = (function (v,u,s){var self__ = this;
var v__$1 = this;var u__$1 = u;var v__$2 = v__$1;var s__$1 = s;while(true){
if(cljs.core.truth_(cljs.core.logic.lvar_QMARK_.call(null,u__$1)))
{return cljs.core.logic._unify.call(null,s__$1,u__$1,v__$2);
} else
{if(cljs.core.truth_(cljs.core.logic.lvar_QMARK_.call(null,v__$2)))
{return cljs.core.logic._unify.call(null,s__$1,v__$2,u__$1);
} else
{if((cljs.core.logic.lcons_QMARK_.call(null,u__$1)) && (cljs.core.logic.lcons_QMARK_.call(null,v__$2)))
{var s__$2 = cljs.core.logic._unify.call(null,s__$1,cljs.core.logic._lfirst.call(null,u__$1),cljs.core.logic._lfirst.call(null,v__$2));if(cljs.core.not.call(null,cljs.core.logic.failed_QMARK_.call(null,s__$2)))
{{
var G__10270 = cljs.core.logic._lnext.call(null,u__$1);
var G__10271 = cljs.core.logic._lnext.call(null,v__$2);
var G__10272 = s__$2;
u__$1 = G__10270;
v__$2 = G__10271;
s__$1 = G__10272;
continue;
}
} else
{return s__$2;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.logic._unify.call(null,s__$1,u__$1,v__$2);
} else
{return null;
}
}
}
}
break;
}
});
cljs.core.logic.__GT_LCons = (function __GT_LCons(a,d,meta){return (new cljs.core.logic.LCons(a,d,meta));
});
/**
* Constructs a sequence a with an improper tail d if d is a logic variable.
*/
cljs.core.logic.lcons = (function lcons(a,d){if((cljs.core.coll_QMARK_.call(null,d)) || ((d == null)))
{return cljs.core.cons.call(null,a,cljs.core.seq.call(null,d));
} else
{return (new cljs.core.logic.LCons(a,d,null));
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){var u__$1 = this;return cljs.core.logic._unify_with_map.call(null,v,u__$1,s);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){var u__$1 = this;return cljs.core.logic._unify_with_map.call(null,v,u__$1,s);
});
(cljs.core.logic.IUnifyTerms["_"] = true);
(cljs.core.logic._unify_terms["_"] = (function (u,v,s){if(cljs.core.sequential_QMARK_.call(null,u))
{return cljs.core.logic._unify_with_seq.call(null,v,u,s);
} else
{return cljs.core.logic._unify_with_object.call(null,v,u,s);
}
}));
(cljs.core.logic.IUnifyTerms["null"] = true);
(cljs.core.logic._unify_terms["null"] = (function (u,v,s){return cljs.core.logic._unify_with_nil.call(null,v,u,s);
}));
(cljs.core.logic.IUnifyWithNil["_"] = true);
(cljs.core.logic._unify_with_nil["_"] = (function (v,u,s){return cljs.core.logic.fail.call(null,s);
}));
(cljs.core.logic.IUnifyWithNil["null"] = true);
(cljs.core.logic._unify_with_nil["null"] = (function (v,u,s){return s;
}));
(cljs.core.logic.IUnifyWithObject["_"] = true);
(cljs.core.logic._unify_with_object["_"] = (function (v,u,s){if(cljs.core._EQ_.call(null,u,v))
{return s;
} else
{return cljs.core.logic.fail.call(null,s);
}
}));
(cljs.core.logic.IUnifyWithObject["null"] = true);
(cljs.core.logic._unify_with_object["null"] = (function (v,u,s){return cljs.core.logic.fail.call(null,s);
}));
(cljs.core.logic.IUnifyWithLVar["_"] = true);
(cljs.core.logic._unify_with_lvar["_"] = (function (v,u,s){return cljs.core.logic._ext.call(null,s,u,v);
}));
(cljs.core.logic.IUnifyWithLVar["null"] = true);
(cljs.core.logic._unify_with_lvar["null"] = (function (v,u,s){return cljs.core.logic._ext_no_check.call(null,s,u,v);
}));
(cljs.core.logic.IUnifyWithLSeq["_"] = true);
(cljs.core.logic._unify_with_lseq["_"] = (function (v,u,s){if((cljs.core.sequential_QMARK_.call(null,v)) && (!((v == null))))
{var u__$1 = u;var v__$1 = cljs.core._seq.call(null,v);var s__$1 = s;while(true){
if(!((v__$1 == null)))
{if(cljs.core.logic.lcons_QMARK_.call(null,u__$1))
{var s__$2 = cljs.core.logic._unify.call(null,s__$1,cljs.core.logic._lfirst.call(null,u__$1),cljs.core._first.call(null,v__$1));if(cljs.core.not.call(null,cljs.core.logic.failed_QMARK_.call(null,s__$2)))
{{
var G__10273 = cljs.core.logic._lnext.call(null,u__$1);
var G__10274 = cljs.core._next.call(null,v__$1);
var G__10275 = s__$2;
u__$1 = G__10273;
v__$1 = G__10274;
s__$1 = G__10275;
continue;
}
} else
{return s__$2;
}
} else
{return cljs.core.logic._unify.call(null,s__$1,u__$1,v__$1);
}
} else
{if(cljs.core.truth_(cljs.core.logic.lvar_QMARK_.call(null,u__$1)))
{return cljs.core.logic._unify.call(null,s__$1,u__$1,cljs.core.List.EMPTY);
} else
{return cljs.core.logic.fail.call(null,s__$1);
}
}
break;
}
} else
{return cljs.core.logic.fail.call(null,s);
}
}));
(cljs.core.logic.IUnifyWithLSeq["null"] = true);
(cljs.core.logic._unify_with_lseq["null"] = (function (v,u,s){return cljs.core.logic.fail.call(null,s);
}));
(cljs.core.logic.IUnifyWithSequential["_"] = true);
(cljs.core.logic._unify_with_seq["_"] = (function (v,u,s){if((cljs.core.sequential_QMARK_.call(null,v)) && (!((v == null))))
{var u__$1 = cljs.core._seq.call(null,u);var v__$1 = cljs.core._seq.call(null,v);var s__$1 = s;while(true){
if(!((u__$1 == null)))
{if(!((v__$1 == null)))
{var s__$2 = cljs.core.logic._unify.call(null,s__$1,cljs.core._first.call(null,u__$1),cljs.core._first.call(null,v__$1));if(cljs.core.not.call(null,cljs.core.logic.failed_QMARK_.call(null,s__$2)))
{{
var G__10276 = cljs.core._next.call(null,u__$1);
var G__10277 = cljs.core._next.call(null,v__$1);
var G__10278 = s__$2;
u__$1 = G__10276;
v__$1 = G__10277;
s__$1 = G__10278;
continue;
}
} else
{return s__$2;
}
} else
{return cljs.core.logic.fail.call(null,s__$1);
}
} else
{if(!((v__$1 == null)))
{return cljs.core.logic.fail.call(null,s__$1);
} else
{return s__$1;
}
}
break;
}
} else
{return cljs.core.logic.fail.call(null,s);
}
}));
(cljs.core.logic.IUnifyWithSequential["null"] = true);
(cljs.core.logic._unify_with_seq["null"] = (function (v,u,s){return cljs.core.logic.fail.call(null,s);
}));
cljs.core.logic.not_found = (function (){var obj10280 = {};return obj10280;
})();
cljs.core.logic.unify_with_map_STAR_ = (function unify_with_map_STAR_(v,u,s){if(!((cljs.core.count.call(null,v) === cljs.core.count.call(null,u))))
{return cljs.core.logic.fail.call(null,s);
} else
{var ks = cljs.core.seq.call(null,cljs.core.keys.call(null,u));var s__$1 = s;while(true){
if(ks)
{var kf = cljs.core.first.call(null,ks);var vf = cljs.core.get.call(null,v,kf,cljs.core.logic.not_found);if((vf === cljs.core.logic.not_found))
{return cljs.core.logic.fail.call(null,s__$1);
} else
{var s__$2 = cljs.core.logic._unify.call(null,s__$1,cljs.core.get.call(null,u,kf),vf);if(cljs.core.not.call(null,cljs.core.logic.failed_QMARK_.call(null,s__$2)))
{{
var G__10281 = cljs.core.next.call(null,ks);
var G__10282 = s__$2;
ks = G__10281;
s__$1 = G__10282;
continue;
}
} else
{return cljs.core.logic.fail.call(null,s__$2);
}
}
} else
{return s__$1;
}
break;
}
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IUnifyWithMap$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3 = (function (v,u,s){var v__$1 = this;return cljs.core.logic.unify_with_map_STAR_.call(null,v__$1,u,s);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyWithMap$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3 = (function (v,u,s){var v__$1 = this;return cljs.core.logic.unify_with_map_STAR_.call(null,v__$1,u,s);
});
(cljs.core.logic.IUnifyWithMap["_"] = true);
(cljs.core.logic._unify_with_map["_"] = (function (v,u,s){return cljs.core.logic.fail.call(null,s);
}));
(cljs.core.logic.IUnifyWithMap["null"] = true);
(cljs.core.logic._unify_with_map["null"] = (function (v,u,s){return cljs.core.logic.fail.call(null,s);
}));
(cljs.core.logic.IReifyTerm["_"] = true);
(cljs.core.logic._reify_term["_"] = (function (v,s){if(cljs.core.sequential_QMARK_.call(null,v))
{var v__$1 = v;var s__$1 = s;while(true){
if(cljs.core.seq.call(null,v__$1))
{{
var G__10283 = cljs.core.next.call(null,v__$1);
var G__10284 = cljs.core.logic._reify_STAR_.call(null,s__$1,cljs.core.first.call(null,v__$1));
v__$1 = G__10283;
s__$1 = G__10284;
continue;
}
} else
{return s__$1;
}
break;
}
} else
{return s;
}
}));
(cljs.core.logic.IReifyTerm["null"] = true);
(cljs.core.logic._reify_term["null"] = (function (v,s){return s;
}));
cljs.core.logic.walk_term_map_STAR_ = (function walk_term_map_STAR_(v,s){var v__$1 = cljs.core._seq.call(null,v);var r = cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY);while(true){
if(!((v__$1 == null)))
{var vec__10286 = cljs.core._first.call(null,v__$1);var vfk = cljs.core.nth.call(null,vec__10286,0,null);var vfv = cljs.core.nth.call(null,vec__10286,1,null);{
var G__10287 = cljs.core._next.call(null,v__$1);
var G__10288 = cljs.core._assoc_BANG_.call(null,r,vfk,cljs.core.logic._walk_STAR_.call(null,s,vfv));
v__$1 = G__10287;
r = G__10288;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,r);
}
break;
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IWalkTerm$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IWalkTerm$_walk_term$arity$2 = (function (v,s){var v__$1 = this;return cljs.core.logic.walk_term_map_STAR_.call(null,v__$1,s);
});
cljs.core.PersistentVector.prototype.cljs$core$logic$IWalkTerm$ = true;
cljs.core.PersistentVector.prototype.cljs$core$logic$IWalkTerm$_walk_term$arity$2 = (function (v,s){var v__$1 = this;var v__$2 = cljs.core._seq.call(null,v__$1);var r = cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY);while(true){
if(!((v__$2 == null)))
{{
var G__10290 = cljs.core._next.call(null,v__$2);
var G__10291 = cljs.core._conj_BANG_.call(null,r,cljs.core.logic._walk_STAR_.call(null,s,cljs.core.first.call(null,v__$2)));
v__$2 = G__10290;
r = G__10291;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,r);
}
break;
}
});
(cljs.core.logic.IWalkTerm["_"] = true);
(cljs.core.logic._walk_term["_"] = (function (v,s){if(cljs.core.sequential_QMARK_.call(null,v))
{return cljs.core.map.call(null,(function (p1__10289_SHARP_){return cljs.core.logic._walk_STAR_.call(null,s,p1__10289_SHARP_);
}),v);
} else
{return v;
}
}));
(cljs.core.logic.IWalkTerm["null"] = true);
(cljs.core.logic._walk_term["null"] = (function (v,s){return null;
}));
(cljs.core.logic.IOccursCheckTerm["_"] = true);
(cljs.core.logic._occurs_check_term["_"] = (function (v,x,s){if(cljs.core.sequential_QMARK_.call(null,v))
{var v__$1 = cljs.core.seq.call(null,v);var x__$1 = x;var s__$1 = s;while(true){
if(!((v__$1 == null)))
{var or__3422__auto__ = cljs.core.logic._occurs_check.call(null,s__$1,x__$1,cljs.core._first.call(null,v__$1));if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{{
var G__10292 = cljs.core._next.call(null,v__$1);
var G__10293 = x__$1;
var G__10294 = s__$1;
v__$1 = G__10292;
x__$1 = G__10293;
s__$1 = G__10294;
continue;
}
}
} else
{return false;
}
break;
}
} else
{return false;
}
}));
(cljs.core.logic.IOccursCheckTerm["null"] = true);
(cljs.core.logic._occurs_check_term["null"] = (function (v,x,s){return false;
}));
cljs.core.logic.mplus = (function mplus(a,f){if((function (){var G__10296 = a;if(G__10296)
{var bit__4059__auto__ = null;if(cljs.core.truth_((function (){var or__3422__auto__ = bit__4059__auto__;if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{return G__10296.cljs$core$logic$IMPlus$;
}
})()))
{return true;
} else
{return false;
}
} else
{return false;
}
})())
{return cljs.core.logic._mplus.call(null,a,f);
} else
{return (new cljs.core.logic.Choice(a,f));
}
});
cljs.core.logic.take_STAR_ = (function take_STAR_(x){if((function (){var G__10298 = x;if(G__10298)
{var bit__4059__auto__ = null;if(cljs.core.truth_((function (){var or__3422__auto__ = bit__4059__auto__;if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{return G__10298.cljs$core$logic$ITake$;
}
})()))
{return true;
} else
{return false;
}
} else
{return false;
}
})())
{return cljs.core.logic._take_STAR_.call(null,x);
} else
{return cljs.core._conj.call(null,cljs.core.List.EMPTY,x);
}
});

/**
* @constructor
*/
cljs.core.logic.Choice = (function (a,f){
this.a = a;
this.f = f;
})
cljs.core.logic.Choice.cljs$lang$type = true;
cljs.core.logic.Choice.cljs$lang$ctorStr = "cljs.core.logic/Choice";
cljs.core.logic.Choice.cljs$lang$ctorPrWriter = (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.logic/Choice");
});
cljs.core.logic.Choice.prototype.cljs$core$logic$ITake$ = true;
cljs.core.logic.Choice.prototype.cljs$core$logic$ITake$_take_STAR_$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return (new cljs.core.LazySeq(null,(function (){return cljs.core.cons.call(null,self__.a,(new cljs.core.LazySeq(null,(function (){return cljs.core.logic.take_STAR_.call(null,self__.f);
}),null,null)));
}),null,null));
});
cljs.core.logic.Choice.prototype.cljs$core$logic$IMPlus$ = true;
cljs.core.logic.Choice.prototype.cljs$core$logic$IMPlus$_mplus$arity$2 = (function (this$,fp){var self__ = this;
var this$__$1 = this;return (new cljs.core.logic.Choice(self__.a,(new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,fp.call(null),self__.f);
})))));
});
cljs.core.logic.Choice.prototype.cljs$core$logic$IBind$ = true;
cljs.core.logic.Choice.prototype.cljs$core$logic$IBind$_bind$arity$2 = (function (this$,g){var self__ = this;
var this$__$1 = this;return cljs.core.logic.mplus.call(null,g.call(null,self__.a),(new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,self__.f,g);
}))));
});
cljs.core.logic.__GT_Choice = (function __GT_Choice(a,f){return (new cljs.core.logic.Choice(a,f));
});
cljs.core.logic.choice = (function choice(a,f){return (new cljs.core.logic.Choice(a,f));
});

/**
* @constructor
*/
cljs.core.logic.Inc = (function (f){
this.f = f;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 1;
})
cljs.core.logic.Inc.cljs$lang$type = true;
cljs.core.logic.Inc.cljs$lang$ctorStr = "cljs.core.logic/Inc";
cljs.core.logic.Inc.cljs$lang$ctorPrWriter = (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.logic/Inc");
});
cljs.core.logic.Inc.prototype.cljs$core$logic$ITake$ = true;
cljs.core.logic.Inc.prototype.cljs$core$logic$ITake$_take_STAR_$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return (new cljs.core.LazySeq(null,(function (){return cljs.core.logic.take_STAR_.call(null,self__.f.call(null));
}),null,null));
});
cljs.core.logic.Inc.prototype.cljs$core$logic$IMPlus$ = true;
cljs.core.logic.Inc.prototype.cljs$core$logic$IMPlus$_mplus$arity$2 = (function (this$,fp){var self__ = this;
var this$__$1 = this;return (new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,fp.call(null),this$__$1);
})));
});
cljs.core.logic.Inc.prototype.cljs$core$logic$IBind$ = true;
cljs.core.logic.Inc.prototype.cljs$core$logic$IBind$_bind$arity$2 = (function (this$,g){var self__ = this;
var this$__$1 = this;return (new cljs.core.logic.Inc((function (){var a = self__.f.call(null);return cljs.core.logic._bind.call(null,a,g);
})));
});
cljs.core.logic.Inc.prototype.call = (function (self__){var self__ = this;
var self____$1 = this;var _ = self____$1;return self__.f.call(null);
});
cljs.core.logic.Inc.prototype.apply = (function (self__,args10299){var self__ = this;
var self____$1 = this;return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args10299)));
});
cljs.core.logic.Inc.prototype.cljs$core$IFn$_invoke$arity$0 = (function (){var self__ = this;
var _ = this;return self__.f.call(null);
});
cljs.core.logic.__GT_Inc = (function __GT_Inc(f){return (new cljs.core.logic.Inc(f));
});

/**
* @constructor
*/
cljs.core.logic.Fail = (function (a){
this.a = a;
})
cljs.core.logic.Fail.cljs$lang$type = true;
cljs.core.logic.Fail.cljs$lang$ctorStr = "cljs.core.logic/Fail";
cljs.core.logic.Fail.cljs$lang$ctorPrWriter = (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.logic/Fail");
});
cljs.core.logic.Fail.prototype.cljs$core$logic$ITake$ = true;
cljs.core.logic.Fail.prototype.cljs$core$logic$ITake$_take_STAR_$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return cljs.core.List.EMPTY;
});
cljs.core.logic.Fail.prototype.cljs$core$logic$IMPlus$ = true;
cljs.core.logic.Fail.prototype.cljs$core$logic$IMPlus$_mplus$arity$2 = (function (this$,fp){var self__ = this;
var this$__$1 = this;return fp;
});
cljs.core.logic.Fail.prototype.cljs$core$logic$IBind$ = true;
cljs.core.logic.Fail.prototype.cljs$core$logic$IBind$_bind$arity$2 = (function (this$,g){var self__ = this;
var this$__$1 = this;return this$__$1;
});
cljs.core.logic.__GT_Fail = (function __GT_Fail(a){return (new cljs.core.logic.Fail(a));
});
cljs.core.logic.failed_QMARK_ = (function failed_QMARK_(x){return (x instanceof cljs.core.logic.Fail);
});
/**
* A goal that always succeeds.
*/
cljs.core.logic.succeed = (function succeed(a){return a;
});
/**
* A goal that always fails.
*/
cljs.core.logic.fail = (function fail(a){return (new cljs.core.logic.Fail(a));
});
cljs.core.logic.s_SHARP_ = cljs.core.logic.succeed;
cljs.core.logic.u_SHARP_ = cljs.core.logic.fail;
cljs.core.logic.IIfA = (function (){var obj10301 = {};return obj10301;
})();
cljs.core.logic._ifa = (function _ifa(b,gs,c){if((function (){var and__3410__auto__ = b;if(and__3410__auto__)
{return b.cljs$core$logic$IIfA$_ifa$arity$3;
} else
{return and__3410__auto__;
}
})())
{return b.cljs$core$logic$IIfA$_ifa$arity$3(b,gs,c);
} else
{var x__4043__auto__ = (((b == null))?null:b);return (function (){var or__3422__auto__ = (cljs.core.logic._ifa[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._ifa["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IIfA.-ifa",b);
}
}
})().call(null,b,gs,c);
}
});
cljs.core.logic.IIfU = (function (){var obj10303 = {};return obj10303;
})();
cljs.core.logic._ifu = (function _ifu(b,gs,c){if((function (){var and__3410__auto__ = b;if(and__3410__auto__)
{return b.cljs$core$logic$IIfU$_ifu$arity$3;
} else
{return and__3410__auto__;
}
})())
{return b.cljs$core$logic$IIfU$_ifu$arity$3(b,gs,c);
} else
{var x__4043__auto__ = (((b == null))?null:b);return (function (){var or__3422__auto__ = (cljs.core.logic._ifu[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic._ifu["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IIfU.-ifu",b);
}
}
})().call(null,b,gs,c);
}
});
cljs.core.logic.Fail.prototype.cljs$core$logic$IIfA$ = true;
cljs.core.logic.Fail.prototype.cljs$core$logic$IIfA$_ifa$arity$3 = (function (b,gs,c){var b__$1 = this;if(cljs.core.truth_(c))
{return cljs.core.force.call(null,c);
} else
{return null;
}
});
cljs.core.logic.Fail.prototype.cljs$core$logic$IIfU$ = true;
cljs.core.logic.Fail.prototype.cljs$core$logic$IIfU$_ifu$arity$3 = (function (b,gs,c){var b__$1 = this;if(cljs.core.truth_(c))
{return cljs.core.force.call(null,c);
} else
{return null;
}
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IIfA$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IIfA$_ifa$arity$3 = (function (b,gs,c){var b__$1 = this;var b__$2 = b__$1;var G__10305 = gs;var vec__10306 = G__10305;var g0 = cljs.core.nth.call(null,vec__10306,0,null);var gr = cljs.core.nthnext.call(null,vec__10306,1);var b__$3 = b__$2;var G__10305__$1 = G__10305;while(true){
var b__$4 = b__$3;var vec__10307 = G__10305__$1;var g0__$1 = cljs.core.nth.call(null,vec__10307,0,null);var gr__$1 = cljs.core.nthnext.call(null,vec__10307,1);if(cljs.core.truth_(g0__$1))
{var temp__4092__auto__ = g0__$1.call(null,b__$4);if(cljs.core.truth_(temp__4092__auto__))
{var b__$5 = temp__4092__auto__;{
var G__10308 = b__$5;
var G__10309 = gr__$1;
b__$3 = G__10308;
G__10305__$1 = G__10309;
continue;
}
} else
{return null;
}
} else
{return b__$4;
}
break;
}
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IIfU$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IIfU$_ifu$arity$3 = (function (b,gs,c){var b__$1 = this;var b__$2 = b__$1;var G__10311 = gs;var vec__10312 = G__10311;var g0 = cljs.core.nth.call(null,vec__10312,0,null);var gr = cljs.core.nthnext.call(null,vec__10312,1);var b__$3 = b__$2;var G__10311__$1 = G__10311;while(true){
var b__$4 = b__$3;var vec__10313 = G__10311__$1;var g0__$1 = cljs.core.nth.call(null,vec__10313,0,null);var gr__$1 = cljs.core.nthnext.call(null,vec__10313,1);if(cljs.core.truth_(g0__$1))
{var temp__4092__auto__ = g0__$1.call(null,b__$4);if(cljs.core.truth_(temp__4092__auto__))
{var b__$5 = temp__4092__auto__;{
var G__10314 = b__$5;
var G__10315 = gr__$1;
b__$3 = G__10314;
G__10311__$1 = G__10315;
continue;
}
} else
{return null;
}
} else
{return b__$4;
}
break;
}
});
cljs.core.logic.Inc.prototype.cljs$core$logic$IIfU$ = true;
cljs.core.logic.Inc.prototype.cljs$core$logic$IIfU$_ifu$arity$3 = (function (b,gs,c){var b__$1 = this;return (new cljs.core.logic.Inc((function (){return cljs.core.logic._ifu.call(null,b__$1.call(null),gs,c);
})));
});
cljs.core.logic.Inc.prototype.cljs$core$logic$IIfA$ = true;
cljs.core.logic.Inc.prototype.cljs$core$logic$IIfA$_ifa$arity$3 = (function (b,gs,c){var b__$1 = this;return (new cljs.core.logic.Inc((function (){return cljs.core.logic._ifa.call(null,b__$1.call(null),gs,c);
})));
});
cljs.core.logic.Choice.prototype.cljs$core$logic$IIfA$ = true;
cljs.core.logic.Choice.prototype.cljs$core$logic$IIfA$_ifa$arity$3 = (function (b,gs,c){var b__$1 = this;return cljs.core.reduce.call(null,cljs.core.logic._bind,b__$1,gs);
});
cljs.core.logic.Choice.prototype.cljs$core$logic$IIfU$ = true;
cljs.core.logic.Choice.prototype.cljs$core$logic$IIfU$_ifu$arity$3 = (function (b,gs,c){var b__$1 = this;return cljs.core.reduce.call(null,cljs.core.logic._bind,b__$1.a,gs);
});
/**
* A relation where a is nil
*/
cljs.core.logic.nilo = (function nilo(a){return (function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,null,a);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
});
});
/**
* A relation where a is the empty list
*/
cljs.core.logic.emptyo = (function emptyo(a){return (function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.List.EMPTY,a);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
});
});
/**
* A relation where l is a collection, such that a is the first of l
* and d is the rest of l
*/
cljs.core.logic.conso = (function conso(a,d,l){return (function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,a,d),l);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
});
});
/**
* A relation where l is a collection, such that a is the first of l
*/
cljs.core.logic.firsto = (function firsto(l,a){return (function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var d = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"d","d",-1640531427,null));return cljs.core.logic._bind.call(null,a__4379__auto__,cljs.core.logic.conso.call(null,a,d,l));
})));
});
});
/**
* A relation where l is a collection, such that d is the rest of l
*/
cljs.core.logic.resto = (function resto(l,d){return (function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var a = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"a","a",-1640531430,null));return cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,a,d),l);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
});
});
/**
* A relation where l is a collection, such that l contains x
*/
cljs.core.logic.membero = (function membero(x,l){return (function (a10317){return (new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a10317,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var tail = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"tail","tail",-1636979191,null));return cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,x,tail),l);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a10317,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var head = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"head","head",-1637333095,null));var tail = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"tail","tail",-1636979191,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,head,tail),l);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),membero.call(null,x,tail));
})));
}));
}))));
})));
});
});
/**
* A relation where x, y, and z are proper collections,
* such that z is x appended to y
*/
cljs.core.logic.appendo = (function appendo(x,y,z){return (function (a10319){return (new cljs.core.logic.Inc((function (){return cljs.core.logic.mplus.call(null,cljs.core.logic._bind.call(null,a10319,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.List.EMPTY,x);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,y,z);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){return cljs.core.logic._bind.call(null,a10319,(function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var a = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"a","a",-1640531430,null));var d = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"d","d",-1640531427,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,a,d),x);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),(function (a__4379__auto____$1){return (new cljs.core.logic.Inc((function (){var r = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"r","r",-1640531413,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto____$1,(function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,cljs.core.logic.lcons.call(null,a,r),z);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
})),appendo.call(null,d,y,r));
})));
}));
})));
}));
}))));
})));
});
});
cljs.core.logic.prefix = (function prefix(s,_LT_s){if(cljs.core._EQ_.call(null,s,_LT_s))
{return cljs.core.List.EMPTY;
} else
{return cljs.core.conj.call(null,prefix.call(null,cljs.core.rest.call(null,s),_LT_s),cljs.core.first.call(null,s));
}
});
cljs.core.logic.IUnifyWithPMap = (function (){var obj10321 = {};return obj10321;
})();
cljs.core.logic.unify_with_pmap = (function unify_with_pmap(pmap,u,s){if((function (){var and__3410__auto__ = pmap;if(and__3410__auto__)
{return pmap.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3;
} else
{return and__3410__auto__;
}
})())
{return pmap.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3(pmap,u,s);
} else
{var x__4043__auto__ = (((pmap == null))?null:pmap);return (function (){var or__3422__auto__ = (cljs.core.logic.unify_with_pmap[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.logic.unify_with_pmap["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyWithPMap.unify-with-pmap",pmap);
}
}
})().call(null,pmap,u,s);
}
});

/**
* @constructor
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
cljs.core.logic.PMap = (function (__meta,__extmap){
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
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyWithPMap$ = true;
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3 = (function (v,u,s){var self__ = this;
var v__$1 = this;return cljs.core.logic._unify_with_map.call(null,v__$1,u,s);
});
cljs.core.logic.PMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__3997__auto__){var self__ = this;
var this__3997__auto____$1 = this;var h__3833__auto__ = self__.__hash;if(!((h__3833__auto__ == null)))
{return h__3833__auto__;
} else
{var h__3833__auto____$1 = cljs.core.hash_imap.call(null,this__3997__auto____$1);self__.__hash = h__3833__auto____$1;
return h__3833__auto____$1;
}
});
cljs.core.logic.PMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__4002__auto__,k__4003__auto__){var self__ = this;
var this__4002__auto____$1 = this;return cljs.core._lookup.call(null,this__4002__auto____$1,k__4003__auto__,null);
});
cljs.core.logic.PMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4004__auto__,k10323,else__4005__auto__){var self__ = this;
var this__4004__auto____$1 = this;if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.get.call(null,self__.__extmap,k10323,else__4005__auto__);
} else
{return null;
}
});
cljs.core.logic.PMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4009__auto__,k__4010__auto__,G__10322){var self__ = this;
var this__4009__auto____$1 = this;var pred__10325 = cljs.core.keyword_identical_QMARK_;var expr__10326 = k__4010__auto__;return (new cljs.core.logic.PMap(self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__4010__auto__,G__10322),null));
});
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyWithLVar$ = true;
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyWithLVar$_unify_with_lvar$arity$3 = (function (v,u,s){var self__ = this;
var v__$1 = this;return cljs.core.logic._ext_no_check.call(null,s,u,v__$1);
});
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){var self__ = this;
var u__$1 = this;return cljs.core.logic.unify_with_pmap.call(null,v,u__$1,s);
});
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyWithMap$ = true;
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3 = (function (v,u,s){var self__ = this;
var v__$1 = this;var ks = cljs.core.keys.call(null,v__$1);var s__$1 = s;while(true){
if(cljs.core.seq.call(null,ks))
{var kf = cljs.core.first.call(null,ks);var uf = cljs.core.get.call(null,u,kf,new cljs.core.Keyword("cljs.core.logic","not-found","cljs.core.logic/not-found",3358757009));if(cljs.core._EQ_.call(null,uf,new cljs.core.Keyword("cljs.core.logic","not-found","cljs.core.logic/not-found",3358757009)))
{return cljs.core.logic.fail.call(null,s__$1);
} else
{var s__$2 = cljs.core.logic._unify.call(null,s__$1,cljs.core.get.call(null,v__$1,kf),uf);if(!(cljs.core.logic.failed_QMARK_.call(null,s__$2)))
{{
var G__10328 = cljs.core.next.call(null,ks);
var G__10329 = s__$2;
ks = G__10328;
s__$1 = G__10329;
continue;
}
} else
{return s__$2;
}
}
} else
{return s__$1;
}
break;
}
});
cljs.core.logic.PMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__4016__auto__,writer__4017__auto__,opts__4018__auto__){var self__ = this;
var this__4016__auto____$1 = this;var pr_pair__4019__auto__ = (function (keyval__4020__auto__){return cljs.core.pr_sequential_writer.call(null,writer__4017__auto__,cljs.core.pr_writer,""," ","",opts__4018__auto__,keyval__4020__auto__);
});return cljs.core.pr_sequential_writer.call(null,writer__4017__auto__,pr_pair__4019__auto__,"#cljs.core.logic.PMap{",", ","}",opts__4018__auto__,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});
cljs.core.logic.PMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__4007__auto__,entry__4008__auto__){var self__ = this;
var this__4007__auto____$1 = this;if(cljs.core.vector_QMARK_.call(null,entry__4008__auto__))
{return cljs.core._assoc.call(null,this__4007__auto____$1,cljs.core._nth.call(null,entry__4008__auto__,0),cljs.core._nth.call(null,entry__4008__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__4007__auto____$1,entry__4008__auto__);
}
});
cljs.core.logic.PMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4014__auto__){var self__ = this;
var this__4014__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});
cljs.core.logic.PMap.prototype.cljs$core$logic$IWalkTerm$ = true;
cljs.core.logic.PMap.prototype.cljs$core$logic$IWalkTerm$_walk_term$arity$2 = (function (v,s){var self__ = this;
var v__$1 = this;return cljs.core.logic.walk_term_map_STAR_.call(null,v__$1,s);
});
cljs.core.logic.PMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__4006__auto__){var self__ = this;
var this__4006__auto____$1 = this;return (0 + cljs.core.count.call(null,self__.__extmap));
});
cljs.core.logic.PMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__3998__auto__,other__3999__auto__){var self__ = this;
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
cljs.core.logic.PMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4001__auto__,G__10322){var self__ = this;
var this__4001__auto____$1 = this;return (new cljs.core.logic.PMap(G__10322,self__.__extmap,self__.__hash));
});
cljs.core.logic.PMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__4000__auto__){var self__ = this;
var this__4000__auto____$1 = this;return self__.__meta;
});
cljs.core.logic.PMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__4011__auto__,k__4012__auto__){var self__ = this;
var this__4011__auto____$1 = this;if(cljs.core.contains_QMARK_.call(null,cljs.core.PersistentHashSet.EMPTY,k__4012__auto__))
{return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__4011__auto____$1),self__.__meta),k__4012__auto__);
} else
{return (new cljs.core.logic.PMap(self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__4012__auto__)),null));
}
});
cljs.core.logic.PMap.cljs$lang$type = true;
cljs.core.logic.PMap.cljs$lang$ctorPrSeq = (function (this__4036__auto__){return cljs.core._conj.call(null,cljs.core.List.EMPTY,"cljs.core.logic/PMap");
});
cljs.core.logic.PMap.cljs$lang$ctorPrWriter = (function (this__4036__auto__,writer__4037__auto__){return cljs.core._write.call(null,writer__4037__auto__,"cljs.core.logic/PMap");
});
cljs.core.logic.__GT_PMap = (function __GT_PMap(){return (new cljs.core.logic.PMap());
});
cljs.core.logic.map__GT_PMap = (function map__GT_PMap(G__10324){return (new cljs.core.logic.PMap(null,cljs.core.dissoc.call(null,G__10324)));
});
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IUnifyWithPMap$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3 = (function (v,u,s){var v__$1 = this;return cljs.core.logic._unify_with_map.call(null,u,v__$1,s);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyWithPMap$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3 = (function (v,u,s){var v__$1 = this;return cljs.core.logic._unify_with_map.call(null,u,v__$1,s);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithPMap$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3 = (function (v,u,s){var v__$1 = this;return cljs.core.logic._ext.call(null,s,v__$1,u);
});
(cljs.core.logic.IUnifyWithPMap["_"] = true);
(cljs.core.logic.unify_with_pmap["_"] = (function (v,u,s){return cljs.core.logic.fail.call(null,s);
}));
(cljs.core.logic.IUnifyWithPMap["null"] = true);
(cljs.core.logic.unify_with_pmap["null"] = (function (v,u,s){return cljs.core.logic.fail.call(null,s);
}));
/**
* Given map m, returns partial map that unifies with maps even if it doesn't share all of the keys of that map.
* Only the keys of the partial map will be unified:
* 
* (m/run* [q]
* (m/fresh [pm x]
* (m/== pm (partial-map {:a x}))
* (m/== pm {:a 1 :b 2})
* (m/== pm q)))
* ;;=> ({:a 1})
*/
cljs.core.logic.partial_map = (function partial_map(m){return cljs.core.logic.map__GT_PMap.call(null,m);
});
cljs.core.logic.lvarq_sym_QMARK_ = (function lvarq_sym_QMARK_(s){return ((s instanceof cljs.core.Symbol)) && (cljs.core._EQ_.call(null,cljs.core.first.call(null,[cljs.core.str(s)].join('')),"?"));
});
cljs.core.logic.proc_lvar = (function proc_lvar(lvar_expr,store){var v = (function (){var temp__4090__auto__ = cljs.core.deref.call(null,store).call(null,lvar_expr);if(cljs.core.truth_(temp__4090__auto__))
{var u = temp__4090__auto__;return u;
} else
{return cljs.core.logic.lvar.call(null,lvar_expr);
}
})();cljs.core.swap_BANG_.call(null,store,cljs.core.conj,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lvar_expr,v], null));
return v;
});
cljs.core.logic.lcons_expr_QMARK_ = (function lcons_expr_QMARK_(expr){var and__3410__auto__ = cljs.core.seq_QMARK_.call(null,expr);if(and__3410__auto__)
{return cljs.core.some.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Symbol(null,".",".",-1640531481,null),null], null), null),cljs.core.set.call(null,expr));
} else
{return and__3410__auto__;
}
});
cljs.core.logic.replace_lvar = (function replace_lvar(store){return (function (expr){if(cljs.core.logic.lvarq_sym_QMARK_.call(null,expr))
{return cljs.core.logic.proc_lvar.call(null,expr,store);
} else
{if(cljs.core.truth_(cljs.core.logic.lcons_expr_QMARK_.call(null,expr)))
{return cljs.core.logic.prep_STAR_.call(null,expr,store);
} else
{return expr;
}
}
});
});
cljs.core.logic.prep_STAR_ = (function() {
var prep_STAR_ = null;
var prep_STAR___2 = (function (expr,store){return prep_STAR_.call(null,expr,store,false,false);
});
var prep_STAR___3 = (function (expr,store,lcons_QMARK_){return prep_STAR_.call(null,expr,store,lcons_QMARK_,false);
});
var prep_STAR___4 = (function (expr,store,lcons_QMARK_,last_QMARK_){var expr__$1 = (cljs.core.truth_((function (){var and__3410__auto__ = last_QMARK_;if(cljs.core.truth_(and__3410__auto__))
{return cljs.core.seq.call(null,expr);
} else
{return and__3410__auto__;
}
})())?cljs.core.first.call(null,expr):expr);if(cljs.core.logic.lvarq_sym_QMARK_.call(null,expr__$1))
{return cljs.core.logic.proc_lvar.call(null,expr__$1,store);
} else
{if(cljs.core.seq_QMARK_.call(null,expr__$1))
{if(cljs.core.truth_((function (){var or__3422__auto__ = lcons_QMARK_;if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{return cljs.core.logic.lcons_expr_QMARK_.call(null,expr__$1);
}
})()))
{var vec__10331 = expr__$1;var f = cljs.core.nth.call(null,vec__10331,0,null);var n = cljs.core.nthnext.call(null,vec__10331,1);var skip = cljs.core._EQ_.call(null,f,new cljs.core.Symbol(null,".",".",-1640531481,null));var tail = prep_STAR_.call(null,n,store,lcons_QMARK_,skip);if(skip)
{return tail;
} else
{return cljs.core.logic.lcons.call(null,prep_STAR_.call(null,f,store),tail);
}
} else
{return clojure.walk.postwalk.call(null,cljs.core.logic.replace_lvar.call(null,store),expr__$1);
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return expr__$1;
} else
{return null;
}
}
}
});
prep_STAR_ = function(expr,store,lcons_QMARK_,last_QMARK_){
switch(arguments.length){
case 2:
return prep_STAR___2.call(this,expr,store);
case 3:
return prep_STAR___3.call(this,expr,store,lcons_QMARK_);
case 4:
return prep_STAR___4.call(this,expr,store,lcons_QMARK_,last_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
prep_STAR_.cljs$core$IFn$_invoke$arity$2 = prep_STAR___2;
prep_STAR_.cljs$core$IFn$_invoke$arity$3 = prep_STAR___3;
prep_STAR_.cljs$core$IFn$_invoke$arity$4 = prep_STAR___4;
return prep_STAR_;
})()
;
/**
* Prep a quoted expression. All symbols preceded by ? will
* be replaced with logic vars.
*/
cljs.core.logic.prep = (function prep(expr){var lvars = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prepped = (cljs.core.truth_(cljs.core.logic.lcons_expr_QMARK_.call(null,expr))?cljs.core.logic.prep_STAR_.call(null,expr,lvars,true):clojure.walk.postwalk.call(null,cljs.core.logic.replace_lvar.call(null,lvars),expr));return cljs.core.with_meta.call(null,prepped,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"lvars","lvars",1117256714),cljs.core.deref.call(null,lvars)], null));
});
cljs.core.logic.unify = (function unify(s,u,v){if((u === v))
{return s;
} else
{var u__$1 = cljs.core.logic._walk.call(null,s,u);var v__$1 = cljs.core.logic._walk.call(null,s,v);if((u__$1 === v__$1))
{return s;
} else
{return cljs.core.logic._unify_terms.call(null,u__$1,v__$1,s);
}
}
});
/**
* Unify the terms u and w.
* @param {...*} var_args
*/
cljs.core.logic.unifier_STAR_ = (function() {
var unifier_STAR_ = null;
var unifier_STAR___2 = (function (u,w){return cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__4387__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){return (function (a__4379__auto__){return (new cljs.core.logic.Inc((function (){var q = cljs.core.logic.lvar.call(null,new cljs.core.Symbol(null,"q","q",-1640531414,null));return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__4379__auto__,((function (q){
return (function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,u,w);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
});})(q))
),((function (q){
return (function (a__4367__auto__){var temp__4090__auto__ = cljs.core.logic._unify.call(null,a__4367__auto__,u,q);if(cljs.core.truth_(temp__4090__auto__))
{var b__4368__auto__ = temp__4090__auto__;return b__4368__auto__;
} else
{return cljs.core.logic.fail.call(null,a__4367__auto__);
}
});})(q))
),((function (q){
return (function (a__4388__auto__){return cljs.core.logic._reify.call(null,a__4388__auto__,q);
});})(q))
);
})));
}).call(null,cljs.core.logic.empty_s);
}))));if(false)
{return cljs.core.take.call(null,false,xs__4387__auto__);
} else
{return xs__4387__auto__;
}
})()));
});
var unifier_STAR___3 = (function() { 
var G__10332__delegate = function (u,w,ts){return cljs.core.apply.call(null,unifier_STAR_,unifier_STAR_.call(null,u,w),ts);
};
var G__10332 = function (u,w,var_args){
var ts = null;if (arguments.length > 2) {
  ts = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__10332__delegate.call(this,u,w,ts);};
G__10332.cljs$lang$maxFixedArity = 2;
G__10332.cljs$lang$applyTo = (function (arglist__10333){
var u = cljs.core.first(arglist__10333);
arglist__10333 = cljs.core.next(arglist__10333);
var w = cljs.core.first(arglist__10333);
var ts = cljs.core.rest(arglist__10333);
return G__10332__delegate(u,w,ts);
});
G__10332.cljs$core$IFn$_invoke$arity$variadic = G__10332__delegate;
return G__10332;
})()
;
unifier_STAR_ = function(u,w,var_args){
var ts = var_args;
switch(arguments.length){
case 2:
return unifier_STAR___2.call(this,u,w);
default:
return unifier_STAR___3.cljs$core$IFn$_invoke$arity$variadic(u,w, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unifier_STAR_.cljs$lang$maxFixedArity = 2;
unifier_STAR_.cljs$lang$applyTo = unifier_STAR___3.cljs$lang$applyTo;
unifier_STAR_.cljs$core$IFn$_invoke$arity$2 = unifier_STAR___2;
unifier_STAR_.cljs$core$IFn$_invoke$arity$variadic = unifier_STAR___3.cljs$core$IFn$_invoke$arity$variadic;
return unifier_STAR_;
})()
;
/**
* Return the binding map that unifies terms u and w.
* u and w should prepped terms.
* @param {...*} var_args
*/
cljs.core.logic.binding_map_STAR_ = (function() {
var binding_map_STAR_ = null;
var binding_map_STAR___2 = (function (u,w){var lvars = cljs.core.merge.call(null,new cljs.core.Keyword(null,"lvars","lvars",1117256714).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,u)),new cljs.core.Keyword(null,"lvars","lvars",1117256714).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,w)));var s = cljs.core.logic.unify.call(null,cljs.core.logic.empty_s,u,w);if(cljs.core.logic.failed_QMARK_.call(null,s))
{return null;
} else
{return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,(function (p__10336){var vec__10337 = p__10336;var k = cljs.core.nth.call(null,vec__10337,0,null);var v = cljs.core.nth.call(null,vec__10337,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.logic._reify.call(null,s,v)], null);
}),lvars));
}
});
var binding_map_STAR___3 = (function() { 
var G__10338__delegate = function (u,w,ts){return cljs.core.apply.call(null,binding_map_STAR_,binding_map_STAR_.call(null,u,w),ts);
};
var G__10338 = function (u,w,var_args){
var ts = null;if (arguments.length > 2) {
  ts = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__10338__delegate.call(this,u,w,ts);};
G__10338.cljs$lang$maxFixedArity = 2;
G__10338.cljs$lang$applyTo = (function (arglist__10339){
var u = cljs.core.first(arglist__10339);
arglist__10339 = cljs.core.next(arglist__10339);
var w = cljs.core.first(arglist__10339);
var ts = cljs.core.rest(arglist__10339);
return G__10338__delegate(u,w,ts);
});
G__10338.cljs$core$IFn$_invoke$arity$variadic = G__10338__delegate;
return G__10338;
})()
;
binding_map_STAR_ = function(u,w,var_args){
var ts = var_args;
switch(arguments.length){
case 2:
return binding_map_STAR___2.call(this,u,w);
default:
return binding_map_STAR___3.cljs$core$IFn$_invoke$arity$variadic(u,w, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
binding_map_STAR_.cljs$lang$maxFixedArity = 2;
binding_map_STAR_.cljs$lang$applyTo = binding_map_STAR___3.cljs$lang$applyTo;
binding_map_STAR_.cljs$core$IFn$_invoke$arity$2 = binding_map_STAR___2;
binding_map_STAR_.cljs$core$IFn$_invoke$arity$variadic = binding_map_STAR___3.cljs$core$IFn$_invoke$arity$variadic;
return binding_map_STAR_;
})()
;
/**
* Unify the terms u and w. Will prep the terms.
* @param {...*} var_args
*/
cljs.core.logic.unifier = (function() {
var unifier = null;
var unifier__2 = (function (u,w){if(!(cljs.core.logic.lcons_QMARK_.call(null,u)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"not","not",-1640422260,null),cljs.core.list(new cljs.core.Symbol(null,"lcons?","lcons?",1546261499,null),new cljs.core.Symbol(null,"u","u",-1640531410,null)))))].join('')));
}
if(!(cljs.core.logic.lcons_QMARK_.call(null,w)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"not","not",-1640422260,null),cljs.core.list(new cljs.core.Symbol(null,"lcons?","lcons?",1546261499,null),new cljs.core.Symbol(null,"w","w",-1640531408,null)))))].join('')));
}
var up = cljs.core.logic.prep.call(null,u);var wp = cljs.core.logic.prep.call(null,w);return cljs.core.logic.unifier_STAR_.call(null,up,wp);
});
var unifier__3 = (function() { 
var G__10340__delegate = function (u,w,ts){return cljs.core.apply.call(null,unifier,unifier.call(null,u,w),ts);
};
var G__10340 = function (u,w,var_args){
var ts = null;if (arguments.length > 2) {
  ts = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__10340__delegate.call(this,u,w,ts);};
G__10340.cljs$lang$maxFixedArity = 2;
G__10340.cljs$lang$applyTo = (function (arglist__10341){
var u = cljs.core.first(arglist__10341);
arglist__10341 = cljs.core.next(arglist__10341);
var w = cljs.core.first(arglist__10341);
var ts = cljs.core.rest(arglist__10341);
return G__10340__delegate(u,w,ts);
});
G__10340.cljs$core$IFn$_invoke$arity$variadic = G__10340__delegate;
return G__10340;
})()
;
unifier = function(u,w,var_args){
var ts = var_args;
switch(arguments.length){
case 2:
return unifier__2.call(this,u,w);
default:
return unifier__3.cljs$core$IFn$_invoke$arity$variadic(u,w, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unifier.cljs$lang$maxFixedArity = 2;
unifier.cljs$lang$applyTo = unifier__3.cljs$lang$applyTo;
unifier.cljs$core$IFn$_invoke$arity$2 = unifier__2;
unifier.cljs$core$IFn$_invoke$arity$variadic = unifier__3.cljs$core$IFn$_invoke$arity$variadic;
return unifier;
})()
;
/**
* Return the binding map that unifies terms u and w.
* Will prep the terms.
* @param {...*} var_args
*/
cljs.core.logic.binding_map = (function() {
var binding_map = null;
var binding_map__2 = (function (u,w){if(!(cljs.core.logic.lcons_QMARK_.call(null,u)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"not","not",-1640422260,null),cljs.core.list(new cljs.core.Symbol(null,"lcons?","lcons?",1546261499,null),new cljs.core.Symbol(null,"u","u",-1640531410,null)))))].join('')));
}
if(!(cljs.core.logic.lcons_QMARK_.call(null,w)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"not","not",-1640422260,null),cljs.core.list(new cljs.core.Symbol(null,"lcons?","lcons?",1546261499,null),new cljs.core.Symbol(null,"w","w",-1640531408,null)))))].join('')));
}
var up = cljs.core.logic.prep.call(null,u);var wp = cljs.core.logic.prep.call(null,w);return cljs.core.logic.binding_map_STAR_.call(null,up,wp);
});
var binding_map__3 = (function() { 
var G__10342__delegate = function (u,w,ts){return cljs.core.apply.call(null,binding_map,binding_map.call(null,u,w),ts);
};
var G__10342 = function (u,w,var_args){
var ts = null;if (arguments.length > 2) {
  ts = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__10342__delegate.call(this,u,w,ts);};
G__10342.cljs$lang$maxFixedArity = 2;
G__10342.cljs$lang$applyTo = (function (arglist__10343){
var u = cljs.core.first(arglist__10343);
arglist__10343 = cljs.core.next(arglist__10343);
var w = cljs.core.first(arglist__10343);
var ts = cljs.core.rest(arglist__10343);
return G__10342__delegate(u,w,ts);
});
G__10342.cljs$core$IFn$_invoke$arity$variadic = G__10342__delegate;
return G__10342;
})()
;
binding_map = function(u,w,var_args){
var ts = var_args;
switch(arguments.length){
case 2:
return binding_map__2.call(this,u,w);
default:
return binding_map__3.cljs$core$IFn$_invoke$arity$variadic(u,w, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
binding_map.cljs$lang$maxFixedArity = 2;
binding_map.cljs$lang$applyTo = binding_map__3.cljs$lang$applyTo;
binding_map.cljs$core$IFn$_invoke$arity$2 = binding_map__2;
binding_map.cljs$core$IFn$_invoke$arity$variadic = binding_map__3.cljs$core$IFn$_invoke$arity$variadic;
return binding_map;
})()
;

//# sourceMappingURL=logic.js.map