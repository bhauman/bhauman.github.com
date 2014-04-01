// Compiled by ClojureScript 0.0-2138
goog.provide('frontier.example.components');
goog.require('cljs.core');
goog.require('jayq.util');
goog.require('cljs.core.async');
goog.require('frontier.core');
goog.require('jayq.util');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
goog.require('frontier.core');
frontier.example.components.count_trans = (function (){var method_table__4274__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__4275__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__4276__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__4277__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__4278__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("count-trans",cljs.core.identity,new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__4278__auto__,method_table__4274__auto__,prefer_table__4275__auto__,method_cache__4276__auto__,cached_hierarchy__4277__auto__));
})();
cljs.core._add_method.call(null,frontier.example.components.count_trans,new cljs.core.Keyword(null,"default","default",2558708147),(function (_,system,data){return system;
}));
cljs.core._add_method.call(null,frontier.example.components.count_trans,new cljs.core.Keyword(null,"inc","inc",1014008656),(function (_,system,data){return cljs.core.assoc.call(null,system,new cljs.core.Keyword(null,"count","count",1108755585),(new cljs.core.Keyword(null,"count","count",1108755585).cljs$core$IFn$_invoke$arity$1(system) + 1));
}));
cljs.core._add_method.call(null,frontier.example.components.count_trans,new cljs.core.Keyword(null,"dec","dec",1014003572),(function (_,system,data){return cljs.core.assoc.call(null,system,new cljs.core.Keyword(null,"count","count",1108755585),(new cljs.core.Keyword(null,"count","count",1108755585).cljs$core$IFn$_invoke$arity$1(system) - 1));
}));

/**
* @constructor
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
frontier.example.components.ExampleCounter = (function (__meta,__extmap){
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
frontier.example.components.ExampleCounter.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__3997__auto__){var self__ = this;
var this__3997__auto____$1 = this;var h__3833__auto__ = self__.__hash;if(!((h__3833__auto__ == null)))
{return h__3833__auto__;
} else
{var h__3833__auto____$1 = cljs.core.hash_imap.call(null,this__3997__auto____$1);self__.__hash = h__3833__auto____$1;
return h__3833__auto____$1;
}
});
frontier.example.components.ExampleCounter.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__4002__auto__,k__4003__auto__){var self__ = this;
var this__4002__auto____$1 = this;return cljs.core._lookup.call(null,this__4002__auto____$1,k__4003__auto__,null);
});
frontier.example.components.ExampleCounter.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4004__auto__,k10036,else__4005__auto__){var self__ = this;
var this__4004__auto____$1 = this;if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.get.call(null,self__.__extmap,k10036,else__4005__auto__);
} else
{return null;
}
});
frontier.example.components.ExampleCounter.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4009__auto__,k__4010__auto__,G__10035){var self__ = this;
var this__4009__auto____$1 = this;var pred__10038 = cljs.core.keyword_identical_QMARK_;var expr__10039 = k__4010__auto__;return (new frontier.example.components.ExampleCounter(self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__4010__auto__,G__10035),null));
});
frontier.example.components.ExampleCounter.prototype.frontier$core$iDerive$ = true;
frontier.example.components.ExampleCounter.prototype.frontier$core$iDerive$_derive$arity$2 = (function (o,system){var self__ = this;
var o__$1 = this;if(cljs.core.truth_(new cljs.core.Keyword(null,"count","count",1108755585).cljs$core$IFn$_invoke$arity$1(system)))
{return cljs.core.assoc.call(null,system,new cljs.core.Keyword(null,"double","double",3982913347),(2 * new cljs.core.Keyword(null,"count","count",1108755585).cljs$core$IFn$_invoke$arity$1(system)));
} else
{return system;
}
});
frontier.example.components.ExampleCounter.prototype.frontier$core$iPluginInit$ = true;
frontier.example.components.ExampleCounter.prototype.frontier$core$iPluginInit$_initialize$arity$3 = (function (o,system,event_chan){var self__ = this;
var o__$1 = this;return jayq.util.log.call(null,"initializing counter");
});
frontier.example.components.ExampleCounter.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__4016__auto__,writer__4017__auto__,opts__4018__auto__){var self__ = this;
var this__4016__auto____$1 = this;var pr_pair__4019__auto__ = (function (keyval__4020__auto__){return cljs.core.pr_sequential_writer.call(null,writer__4017__auto__,cljs.core.pr_writer,""," ","",opts__4018__auto__,keyval__4020__auto__);
});return cljs.core.pr_sequential_writer.call(null,writer__4017__auto__,pr_pair__4019__auto__,"#frontier.example.components.ExampleCounter{",", ","}",opts__4018__auto__,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});
frontier.example.components.ExampleCounter.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__4007__auto__,entry__4008__auto__){var self__ = this;
var this__4007__auto____$1 = this;if(cljs.core.vector_QMARK_.call(null,entry__4008__auto__))
{return cljs.core._assoc.call(null,this__4007__auto____$1,cljs.core._nth.call(null,entry__4008__auto__,0),cljs.core._nth.call(null,entry__4008__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__4007__auto____$1,entry__4008__auto__);
}
});
frontier.example.components.ExampleCounter.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4014__auto__){var self__ = this;
var this__4014__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});
frontier.example.components.ExampleCounter.prototype.frontier$core$iEffect$ = true;
frontier.example.components.ExampleCounter.prototype.frontier$core$iEffect$_effect$arity$5 = (function (o,msg,system,event_chan,effect_chan){var self__ = this;
var o__$1 = this;return jayq.util.log.call(null,"affecting");
});
frontier.example.components.ExampleCounter.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__4006__auto__){var self__ = this;
var this__4006__auto____$1 = this;return (0 + cljs.core.count.call(null,self__.__extmap));
});
frontier.example.components.ExampleCounter.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__3998__auto__,other__3999__auto__){var self__ = this;
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
frontier.example.components.ExampleCounter.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4001__auto__,G__10035){var self__ = this;
var this__4001__auto____$1 = this;return (new frontier.example.components.ExampleCounter(G__10035,self__.__extmap,self__.__hash));
});
frontier.example.components.ExampleCounter.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__4000__auto__){var self__ = this;
var this__4000__auto____$1 = this;return self__.__meta;
});
frontier.example.components.ExampleCounter.prototype.frontier$core$iTransform$ = true;
frontier.example.components.ExampleCounter.prototype.frontier$core$iTransform$_transform$arity$3 = (function (o,msg,system){var self__ = this;
var o__$1 = this;return frontier.example.components.count_trans.call(null,cljs.core.first.call(null,msg),system,cljs.core.last.call(null,msg));
});
frontier.example.components.ExampleCounter.prototype.frontier$core$iInputFilter$ = true;
frontier.example.components.ExampleCounter.prototype.frontier$core$iInputFilter$_filter_input$arity$3 = (function (_,p__10041,system){var self__ = this;
var vec__10042 = p__10041;var name = cljs.core.nth.call(null,vec__10042,0,null);var data = cljs.core.nth.call(null,vec__10042,1,null);var ___$1 = this;return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [name,data], null);
});
frontier.example.components.ExampleCounter.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__4011__auto__,k__4012__auto__){var self__ = this;
var this__4011__auto____$1 = this;if(cljs.core.contains_QMARK_.call(null,cljs.core.PersistentHashSet.EMPTY,k__4012__auto__))
{return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__4011__auto____$1),self__.__meta),k__4012__auto__);
} else
{return (new frontier.example.components.ExampleCounter(self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__4012__auto__)),null));
}
});
frontier.example.components.ExampleCounter.cljs$lang$type = true;
frontier.example.components.ExampleCounter.cljs$lang$ctorPrSeq = (function (this__4036__auto__){return cljs.core._conj.call(null,cljs.core.List.EMPTY,"frontier.example.components/ExampleCounter");
});
frontier.example.components.ExampleCounter.cljs$lang$ctorPrWriter = (function (this__4036__auto__,writer__4037__auto__){return cljs.core._write.call(null,writer__4037__auto__,"frontier.example.components/ExampleCounter");
});
frontier.example.components.__GT_ExampleCounter = (function __GT_ExampleCounter(){return (new frontier.example.components.ExampleCounter());
});
frontier.example.components.map__GT_ExampleCounter = (function map__GT_ExampleCounter(G__10037){return (new frontier.example.components.ExampleCounter(null,cljs.core.dissoc.call(null,G__10037)));
});
frontier.example.components.todo_trans = (function (){var method_table__4274__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__4275__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__4276__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__4277__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__4278__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("todo-trans",cljs.core.identity,new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__4278__auto__,method_table__4274__auto__,prefer_table__4275__auto__,method_cache__4276__auto__,cached_hierarchy__4277__auto__));
})();
cljs.core._add_method.call(null,frontier.example.components.todo_trans,new cljs.core.Keyword(null,"default","default",2558708147),(function (_,system,data){return system;
}));
cljs.core._add_method.call(null,frontier.example.components.todo_trans,new cljs.core.Keyword(null,"create-todo","create-todo",4769126889),(function (_,system,data){return cljs.core.update_in.call(null,frontier.core.add_effects.call(null,system,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"store-changes","store-changes",591905097),data], null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"todos","todos",1124439135)], null),(function (todos){return cljs.core.vec.call(null,cljs.core.conj.call(null,todos,data));
}));
}));
cljs.core._add_method.call(null,frontier.example.components.todo_trans,new cljs.core.Keyword(null,"delete-todo","delete-todo",4140878490),(function (_,system,data){return cljs.core.update_in.call(null,system,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"todos","todos",1124439135)], null),(function (todos){return cljs.core.filter.call(null,(function (p1__10043_SHARP_){return cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(p1__10043_SHARP_),new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(data));
}),todos);
}));
}));
frontier.example.components.todo_eff = (function (){var method_table__4274__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__4275__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__4276__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__4277__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__4278__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("todo-eff",cljs.core.identity,new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__4278__auto__,method_table__4274__auto__,prefer_table__4275__auto__,method_cache__4276__auto__,cached_hierarchy__4277__auto__));
})();
cljs.core._add_method.call(null,frontier.example.components.todo_eff,new cljs.core.Keyword(null,"default","default",2558708147),(function (_,system,data,event_chan){return null;
}));
cljs.core._add_method.call(null,frontier.example.components.todo_eff,new cljs.core.Keyword(null,"store-changes","store-changes",591905097),(function (_,system,data,event_chan){cljs.core.async.put_BANG_.call(null,event_chan,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"inc","inc",1014008656),cljs.core.PersistentArrayMap.EMPTY], null));
return jayq.util.log.call(null,"storing changes");
}));

/**
* @constructor
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
frontier.example.components.ExampleTodos = (function (__meta,__extmap){
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
frontier.example.components.ExampleTodos.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__3997__auto__){var self__ = this;
var this__3997__auto____$1 = this;var h__3833__auto__ = self__.__hash;if(!((h__3833__auto__ == null)))
{return h__3833__auto__;
} else
{var h__3833__auto____$1 = cljs.core.hash_imap.call(null,this__3997__auto____$1);self__.__hash = h__3833__auto____$1;
return h__3833__auto____$1;
}
});
frontier.example.components.ExampleTodos.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__4002__auto__,k__4003__auto__){var self__ = this;
var this__4002__auto____$1 = this;return cljs.core._lookup.call(null,this__4002__auto____$1,k__4003__auto__,null);
});
frontier.example.components.ExampleTodos.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4004__auto__,k10045,else__4005__auto__){var self__ = this;
var this__4004__auto____$1 = this;if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.get.call(null,self__.__extmap,k10045,else__4005__auto__);
} else
{return null;
}
});
frontier.example.components.ExampleTodos.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4009__auto__,k__4010__auto__,G__10044){var self__ = this;
var this__4009__auto____$1 = this;var pred__10047 = cljs.core.keyword_identical_QMARK_;var expr__10048 = k__4010__auto__;return (new frontier.example.components.ExampleTodos(self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__4010__auto__,G__10044),null));
});
frontier.example.components.ExampleTodos.prototype.frontier$core$iPluginInit$ = true;
frontier.example.components.ExampleTodos.prototype.frontier$core$iPluginInit$_initialize$arity$3 = (function (o,system,event_chan){var self__ = this;
var o__$1 = this;return jayq.util.log.call(null,"initializing todos");
});
frontier.example.components.ExampleTodos.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__4016__auto__,writer__4017__auto__,opts__4018__auto__){var self__ = this;
var this__4016__auto____$1 = this;var pr_pair__4019__auto__ = (function (keyval__4020__auto__){return cljs.core.pr_sequential_writer.call(null,writer__4017__auto__,cljs.core.pr_writer,""," ","",opts__4018__auto__,keyval__4020__auto__);
});return cljs.core.pr_sequential_writer.call(null,writer__4017__auto__,pr_pair__4019__auto__,"#frontier.example.components.ExampleTodos{",", ","}",opts__4018__auto__,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});
frontier.example.components.ExampleTodos.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__4007__auto__,entry__4008__auto__){var self__ = this;
var this__4007__auto____$1 = this;if(cljs.core.vector_QMARK_.call(null,entry__4008__auto__))
{return cljs.core._assoc.call(null,this__4007__auto____$1,cljs.core._nth.call(null,entry__4008__auto__,0),cljs.core._nth.call(null,entry__4008__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__4007__auto____$1,entry__4008__auto__);
}
});
frontier.example.components.ExampleTodos.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4014__auto__){var self__ = this;
var this__4014__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});
frontier.example.components.ExampleTodos.prototype.frontier$core$iEffect$ = true;
frontier.example.components.ExampleTodos.prototype.frontier$core$iEffect$_effect$arity$5 = (function (o,p__10050,system,event_chan,effect_chan){var self__ = this;
var vec__10051 = p__10050;var name = cljs.core.nth.call(null,vec__10051,0,null);var data = cljs.core.nth.call(null,vec__10051,1,null);var o__$1 = this;frontier.example.components.todo_eff.call(null,name,system,data,event_chan);
return jayq.util.log.call(null,"affecting 2");
});
frontier.example.components.ExampleTodos.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__4006__auto__){var self__ = this;
var this__4006__auto____$1 = this;return (0 + cljs.core.count.call(null,self__.__extmap));
});
frontier.example.components.ExampleTodos.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__3998__auto__,other__3999__auto__){var self__ = this;
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
frontier.example.components.ExampleTodos.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4001__auto__,G__10044){var self__ = this;
var this__4001__auto____$1 = this;return (new frontier.example.components.ExampleTodos(G__10044,self__.__extmap,self__.__hash));
});
frontier.example.components.ExampleTodos.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__4000__auto__){var self__ = this;
var this__4000__auto____$1 = this;return self__.__meta;
});
frontier.example.components.ExampleTodos.prototype.frontier$core$iTransform$ = true;
frontier.example.components.ExampleTodos.prototype.frontier$core$iTransform$_transform$arity$3 = (function (o,msg,system){var self__ = this;
var o__$1 = this;return frontier.example.components.todo_trans.call(null,cljs.core.first.call(null,msg),system,cljs.core.last.call(null,msg));
});
frontier.example.components.ExampleTodos.prototype.frontier$core$iInputFilter$ = true;
frontier.example.components.ExampleTodos.prototype.frontier$core$iInputFilter$_filter_input$arity$3 = (function (_,p__10052,system){var self__ = this;
var vec__10053 = p__10052;var name = cljs.core.nth.call(null,vec__10053,0,null);var data = cljs.core.nth.call(null,vec__10053,1,null);var ___$1 = this;if(cljs.core._EQ_.call(null,name,new cljs.core.Keyword(null,"create-todo","create-todo",4769126889)))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [name,cljs.core.assoc.call(null,data,new cljs.core.Keyword(null,"id","id",1013907597),cljs.core.rand_int.call(null,10000000))], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [name,data], null);
}
});
frontier.example.components.ExampleTodos.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__4011__auto__,k__4012__auto__){var self__ = this;
var this__4011__auto____$1 = this;if(cljs.core.contains_QMARK_.call(null,cljs.core.PersistentHashSet.EMPTY,k__4012__auto__))
{return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__4011__auto____$1),self__.__meta),k__4012__auto__);
} else
{return (new frontier.example.components.ExampleTodos(self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__4012__auto__)),null));
}
});
frontier.example.components.ExampleTodos.cljs$lang$type = true;
frontier.example.components.ExampleTodos.cljs$lang$ctorPrSeq = (function (this__4036__auto__){return cljs.core._conj.call(null,cljs.core.List.EMPTY,"frontier.example.components/ExampleTodos");
});
frontier.example.components.ExampleTodos.cljs$lang$ctorPrWriter = (function (this__4036__auto__,writer__4037__auto__){return cljs.core._write.call(null,writer__4037__auto__,"frontier.example.components/ExampleTodos");
});
frontier.example.components.__GT_ExampleTodos = (function __GT_ExampleTodos(){return (new frontier.example.components.ExampleTodos());
});
frontier.example.components.map__GT_ExampleTodos = (function map__GT_ExampleTodos(G__10046){return (new frontier.example.components.ExampleTodos(null,cljs.core.dissoc.call(null,G__10046)));
});

//# sourceMappingURL=components.js.map