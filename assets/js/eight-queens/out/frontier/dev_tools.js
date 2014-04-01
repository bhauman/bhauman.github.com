// Compiled by ClojureScript 0.0-2138
goog.provide('frontier.dev_tools');
goog.require('cljs.core');
goog.require('frontier.util.edn_renderer');
goog.require('jayq.util');
goog.require('reactor.core');
goog.require('cljs.core.async');
goog.require('frontier.core');
goog.require('jayq.util');
goog.require('frontier.core');
goog.require('frontier.util.edn_renderer');
goog.require('sablono.core');
goog.require('sablono.core');
goog.require('reactor.core');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
frontier.dev_tools.can_go_forward_QMARK_ = (function can_go_forward_QMARK_(p__9876){var map__9878 = p__9876;var map__9878__$1 = ((cljs.core.seq_QMARK_.call(null,map__9878))?cljs.core.apply.call(null,cljs.core.hash_map,map__9878):map__9878);var pointer = cljs.core.get.call(null,map__9878__$1,new cljs.core.Keyword(null,"pointer","pointer",613298607));var history = cljs.core.get.call(null,map__9878__$1,new cljs.core.Keyword(null,"history","history",1940838406));return (pointer < (cljs.core.count.call(null,history) - 1));
});
frontier.dev_tools.can_go_back_QMARK_ = (function can_go_back_QMARK_(p__9879){var map__9881 = p__9879;var map__9881__$1 = ((cljs.core.seq_QMARK_.call(null,map__9881))?cljs.core.apply.call(null,cljs.core.hash_map,map__9881):map__9881);var pointer = cljs.core.get.call(null,map__9881__$1,new cljs.core.Keyword(null,"pointer","pointer",613298607));return (pointer > 0);
});
frontier.dev_tools.current_state = (function current_state(p__9882){var map__9884 = p__9882;var map__9884__$1 = ((cljs.core.seq_QMARK_.call(null,map__9884))?cljs.core.apply.call(null,cljs.core.hash_map,map__9884):map__9884);var pointer = cljs.core.get.call(null,map__9884__$1,new cljs.core.Keyword(null,"pointer","pointer",613298607));var history = cljs.core.get.call(null,map__9884__$1,new cljs.core.Keyword(null,"history","history",1940838406));return cljs.core.get.call(null,history,pointer);
});
frontier.dev_tools.hist_trans = (function (){var method_table__4274__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__4275__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__4276__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__4277__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__4278__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("hist-trans",cljs.core.identity,new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__4278__auto__,method_table__4274__auto__,prefer_table__4275__auto__,method_cache__4276__auto__,cached_hierarchy__4277__auto__));
})();
cljs.core._add_method.call(null,frontier.dev_tools.hist_trans,new cljs.core.Keyword(null,"default","default",2558708147),(function (_,system,data){return system;
}));
cljs.core._add_method.call(null,frontier.dev_tools.hist_trans,new cljs.core.Keyword(null,"goto","goto",1017083093),(function (_,p__9885,p){var map__9886 = p__9885;var map__9886__$1 = ((cljs.core.seq_QMARK_.call(null,map__9886))?cljs.core.apply.call(null,cljs.core.hash_map,map__9886):map__9886);var sys = map__9886__$1;var pointer = cljs.core.get.call(null,map__9886__$1,new cljs.core.Keyword(null,"pointer","pointer",613298607));var history = cljs.core.get.call(null,map__9886__$1,new cljs.core.Keyword(null,"history","history",1940838406));return cljs.core.assoc.call(null,cljs.core.assoc.call(null,sys,new cljs.core.Keyword(null,"pointer","pointer",613298607),p),new cljs.core.Keyword(null,"render-state","render-state",666961164),cljs.core.get.call(null,history,p));
}));
cljs.core._add_method.call(null,frontier.dev_tools.hist_trans,new cljs.core.Keyword(null,"collect","collect",1963349148),(function (_,system,data){return cljs.core.update_in.call(null,cljs.core.update_in.call(null,system,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pointer","pointer",613298607)], null),(function (p){return cljs.core.count.call(null,new cljs.core.Keyword(null,"history","history",1940838406).cljs$core$IFn$_invoke$arity$1(system));
})),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"history","history",1940838406)], null),(function (hist){return cljs.core.conj.call(null,cljs.core.vec.call(null,hist),data);
}));
}));
cljs.core._add_method.call(null,frontier.dev_tools.hist_trans,new cljs.core.Keyword(null,"back","back",1016920153),(function (_,p__9887,___$1){var map__9888 = p__9887;var map__9888__$1 = ((cljs.core.seq_QMARK_.call(null,map__9888))?cljs.core.apply.call(null,cljs.core.hash_map,map__9888):map__9888);var sys = map__9888__$1;var pointer = cljs.core.get.call(null,map__9888__$1,new cljs.core.Keyword(null,"pointer","pointer",613298607));var history = cljs.core.get.call(null,map__9888__$1,new cljs.core.Keyword(null,"history","history",1940838406));if(frontier.dev_tools.can_go_back_QMARK_.call(null,sys))
{return cljs.core.assoc.call(null,cljs.core.update_in.call(null,sys,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pointer","pointer",613298607)], null),cljs.core.dec),new cljs.core.Keyword(null,"render-state","render-state",666961164),cljs.core.get.call(null,history,(pointer - 1)));
} else
{return sys;
}
}));
cljs.core._add_method.call(null,frontier.dev_tools.hist_trans,new cljs.core.Keyword(null,"forward","forward",4631725623),(function (_,p__9889,___$1){var map__9890 = p__9889;var map__9890__$1 = ((cljs.core.seq_QMARK_.call(null,map__9890))?cljs.core.apply.call(null,cljs.core.hash_map,map__9890):map__9890);var sys = map__9890__$1;var pointer = cljs.core.get.call(null,map__9890__$1,new cljs.core.Keyword(null,"pointer","pointer",613298607));var history = cljs.core.get.call(null,map__9890__$1,new cljs.core.Keyword(null,"history","history",1940838406));if(frontier.dev_tools.can_go_forward_QMARK_.call(null,sys))
{return cljs.core.assoc.call(null,cljs.core.update_in.call(null,sys,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pointer","pointer",613298607)], null),cljs.core.inc),new cljs.core.Keyword(null,"render-state","render-state",666961164),cljs.core.get.call(null,history,(pointer + 1)));
} else
{return sys;
}
}));
cljs.core._add_method.call(null,frontier.dev_tools.hist_trans,new cljs.core.Keyword(null,"keep","keep",1017192183),(function (_,p__9891,___$1){var map__9892 = p__9891;var map__9892__$1 = ((cljs.core.seq_QMARK_.call(null,map__9892))?cljs.core.apply.call(null,cljs.core.hash_map,map__9892):map__9892);var sys = map__9892__$1;var pointer = cljs.core.get.call(null,map__9892__$1,new cljs.core.Keyword(null,"pointer","pointer",613298607));var history = cljs.core.get.call(null,map__9892__$1,new cljs.core.Keyword(null,"history","history",1940838406));return cljs.core.dissoc.call(null,cljs.core.assoc.call(null,frontier.core.add_effects.call(null,sys,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-state","set-state",514537176),cljs.core.get.call(null,history,pointer)], null)),new cljs.core.Keyword(null,"pointer","pointer",613298607),(cljs.core.count.call(null,history) - 1)),new cljs.core.Keyword(null,"render-state","render-state",666961164));
}));
cljs.core._add_method.call(null,frontier.dev_tools.hist_trans,new cljs.core.Keyword(null,"cancel","cancel",3941147116),(function (_,p__9893,___$1){var map__9894 = p__9893;var map__9894__$1 = ((cljs.core.seq_QMARK_.call(null,map__9894))?cljs.core.apply.call(null,cljs.core.hash_map,map__9894):map__9894);var sys = map__9894__$1;var pointer = cljs.core.get.call(null,map__9894__$1,new cljs.core.Keyword(null,"pointer","pointer",613298607));var history = cljs.core.get.call(null,map__9894__$1,new cljs.core.Keyword(null,"history","history",1940838406));return cljs.core.dissoc.call(null,cljs.core.assoc.call(null,sys,new cljs.core.Keyword(null,"pointer","pointer",613298607),(cljs.core.count.call(null,history) - 1)),new cljs.core.Keyword(null,"render-state","render-state",666961164));
}));
frontier.dev_tools.under_control = (function under_control(system){if(cljs.core.truth_(new cljs.core.Keyword(null,"render-state","render-state",666961164).cljs$core$IFn$_invoke$arity$1(system)))
{return cljs.core.assoc.call(null,system,new cljs.core.Keyword(null,"under-control","under-control",2562402010),true);
} else
{return system;
}
});
frontier.dev_tools.can_go_forward = (function can_go_forward(state){if(frontier.dev_tools.can_go_forward_QMARK_.call(null,state))
{return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"can-go-forward","can-go-forward",4778555503),true);
} else
{return state;
}
});
frontier.dev_tools.can_go_back = (function can_go_back(state){if(frontier.dev_tools.can_go_back_QMARK_.call(null,state))
{return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"can-go-back","can-go-back",1633972513),true);
} else
{return state;
}
});
frontier.dev_tools.add_msg = (function add_msg(state){return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"msg","msg",1014012659),new cljs.core.Keyword(null,"__msg","__msg",1104577299).cljs$core$IFn$_invoke$arity$1(frontier.dev_tools.current_state.call(null,state)));
});
frontier.dev_tools.messages = (function messages(state){return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"messages","messages",551810238),cljs.core.take.call(null,20,cljs.core.reverse.call(null,cljs.core.map_indexed.call(null,(function (i,x){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,new cljs.core.Keyword(null,"__msg","__msg",1104577299).cljs$core$IFn$_invoke$arity$1(x)], null);
}),new cljs.core.Keyword(null,"history","history",1940838406).cljs$core$IFn$_invoke$arity$1(state)))));
});

/**
* @constructor
* @param {*} managed_system_event_chan
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
frontier.dev_tools.HistoryManager = (function (managed_system_event_chan,__meta,__extmap){
this.managed_system_event_chan = managed_system_event_chan;
this.__meta = __meta;
this.__extmap = __extmap;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
if(arguments.length>1){
this.__meta = __meta;
this.__extmap = __extmap;
} else {
this.__meta=null;
this.__extmap=null;
}
})
frontier.dev_tools.HistoryManager.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__3997__auto__){var self__ = this;
var this__3997__auto____$1 = this;var h__3833__auto__ = self__.__hash;if(!((h__3833__auto__ == null)))
{return h__3833__auto__;
} else
{var h__3833__auto____$1 = cljs.core.hash_imap.call(null,this__3997__auto____$1);self__.__hash = h__3833__auto____$1;
return h__3833__auto____$1;
}
});
frontier.dev_tools.HistoryManager.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__4002__auto__,k__4003__auto__){var self__ = this;
var this__4002__auto____$1 = this;return cljs.core._lookup.call(null,this__4002__auto____$1,k__4003__auto__,null);
});
frontier.dev_tools.HistoryManager.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4004__auto__,k9896,else__4005__auto__){var self__ = this;
var this__4004__auto____$1 = this;if(cljs.core.keyword_identical_QMARK_.call(null,k9896,new cljs.core.Keyword(null,"managed-system-event-chan","managed-system-event-chan",2296816071)))
{return self__.managed_system_event_chan;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.get.call(null,self__.__extmap,k9896,else__4005__auto__);
} else
{return null;
}
}
});
frontier.dev_tools.HistoryManager.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4009__auto__,k__4010__auto__,G__9895){var self__ = this;
var this__4009__auto____$1 = this;var pred__9898 = cljs.core.keyword_identical_QMARK_;var expr__9899 = k__4010__auto__;if(cljs.core.truth_(pred__9898.call(null,new cljs.core.Keyword(null,"managed-system-event-chan","managed-system-event-chan",2296816071),expr__9899)))
{return (new frontier.dev_tools.HistoryManager(G__9895,self__.__meta,self__.__extmap,null));
} else
{return (new frontier.dev_tools.HistoryManager(self__.managed_system_event_chan,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__4010__auto__,G__9895),null));
}
});
frontier.dev_tools.HistoryManager.prototype.frontier$core$iDerive$ = true;
frontier.dev_tools.HistoryManager.prototype.frontier$core$iDerive$_derive$arity$2 = (function (o,system){var self__ = this;
var o__$1 = this;return frontier.dev_tools.messages.call(null,frontier.dev_tools.add_msg.call(null,frontier.dev_tools.can_go_back.call(null,frontier.dev_tools.can_go_forward.call(null,frontier.dev_tools.under_control.call(null,system)))));
});
frontier.dev_tools.HistoryManager.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__4016__auto__,writer__4017__auto__,opts__4018__auto__){var self__ = this;
var this__4016__auto____$1 = this;var pr_pair__4019__auto__ = (function (keyval__4020__auto__){return cljs.core.pr_sequential_writer.call(null,writer__4017__auto__,cljs.core.pr_writer,""," ","",opts__4018__auto__,keyval__4020__auto__);
});return cljs.core.pr_sequential_writer.call(null,writer__4017__auto__,pr_pair__4019__auto__,"#frontier.dev-tools.HistoryManager{",", ","}",opts__4018__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"managed-system-event-chan","managed-system-event-chan",2296816071),self__.managed_system_event_chan],null))], null),self__.__extmap));
});
frontier.dev_tools.HistoryManager.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__4007__auto__,entry__4008__auto__){var self__ = this;
var this__4007__auto____$1 = this;if(cljs.core.vector_QMARK_.call(null,entry__4008__auto__))
{return cljs.core._assoc.call(null,this__4007__auto____$1,cljs.core._nth.call(null,entry__4008__auto__,0),cljs.core._nth.call(null,entry__4008__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__4007__auto____$1,entry__4008__auto__);
}
});
frontier.dev_tools.HistoryManager.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4014__auto__){var self__ = this;
var this__4014__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"managed-system-event-chan","managed-system-event-chan",2296816071),self__.managed_system_event_chan],null))], null),self__.__extmap));
});
frontier.dev_tools.HistoryManager.prototype.frontier$core$iEffect$ = true;
frontier.dev_tools.HistoryManager.prototype.frontier$core$iEffect$_effect$arity$5 = (function (o,p__9901,system,event_chan,effect_chan){var self__ = this;
var vec__9902 = p__9901;var msg = cljs.core.nth.call(null,vec__9902,0,null);var data = cljs.core.nth.call(null,vec__9902,1,null);var o__$1 = this;if(cljs.core._EQ_.call(null,msg,new cljs.core.Keyword(null,"set-state","set-state",514537176)))
{return cljs.core.async.put_BANG_.call(null,self__.managed_system_event_chan,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"__system.set-state","__system.set-state",2864486841),data], null));
} else
{return null;
}
});
frontier.dev_tools.HistoryManager.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__4006__auto__){var self__ = this;
var this__4006__auto____$1 = this;return (1 + cljs.core.count.call(null,self__.__extmap));
});
frontier.dev_tools.HistoryManager.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__3998__auto__,other__3999__auto__){var self__ = this;
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
frontier.dev_tools.HistoryManager.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4001__auto__,G__9895){var self__ = this;
var this__4001__auto____$1 = this;return (new frontier.dev_tools.HistoryManager(self__.managed_system_event_chan,G__9895,self__.__extmap,self__.__hash));
});
frontier.dev_tools.HistoryManager.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__4000__auto__){var self__ = this;
var this__4000__auto____$1 = this;return self__.__meta;
});
frontier.dev_tools.HistoryManager.prototype.frontier$core$iTransform$ = true;
frontier.dev_tools.HistoryManager.prototype.frontier$core$iTransform$_transform$arity$3 = (function (o,p__9903,system){var self__ = this;
var vec__9904 = p__9903;var msg = cljs.core.nth.call(null,vec__9904,0,null);var data = cljs.core.nth.call(null,vec__9904,1,null);var o__$1 = this;return frontier.dev_tools.hist_trans.call(null,msg,system,data);
});
frontier.dev_tools.HistoryManager.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__4011__auto__,k__4012__auto__){var self__ = this;
var this__4011__auto____$1 = this;if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"managed-system-event-chan","managed-system-event-chan",2296816071),null], null), null),k__4012__auto__))
{return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__4011__auto____$1),self__.__meta),k__4012__auto__);
} else
{return (new frontier.dev_tools.HistoryManager(self__.managed_system_event_chan,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__4012__auto__)),null));
}
});
frontier.dev_tools.HistoryManager.cljs$lang$type = true;
frontier.dev_tools.HistoryManager.cljs$lang$ctorPrSeq = (function (this__4036__auto__){return cljs.core._conj.call(null,cljs.core.List.EMPTY,"frontier.dev-tools/HistoryManager");
});
frontier.dev_tools.HistoryManager.cljs$lang$ctorPrWriter = (function (this__4036__auto__,writer__4037__auto__){return cljs.core._write.call(null,writer__4037__auto__,"frontier.dev-tools/HistoryManager");
});
frontier.dev_tools.__GT_HistoryManager = (function __GT_HistoryManager(managed_system_event_chan){return (new frontier.dev_tools.HistoryManager(managed_system_event_chan));
});
frontier.dev_tools.map__GT_HistoryManager = (function map__GT_HistoryManager(G__9897){return (new frontier.dev_tools.HistoryManager(new cljs.core.Keyword(null,"managed-system-event-chan","managed-system-event-chan",2296816071).cljs$core$IFn$_invoke$arity$1(G__9897),null,cljs.core.dissoc.call(null,G__9897,new cljs.core.Keyword(null,"managed-system-event-chan","managed-system-event-chan",2296816071))));
});

/**
* @constructor
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
frontier.dev_tools.SystemSetter = (function (__meta,__extmap){
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
frontier.dev_tools.SystemSetter.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__3997__auto__){var self__ = this;
var this__3997__auto____$1 = this;var h__3833__auto__ = self__.__hash;if(!((h__3833__auto__ == null)))
{return h__3833__auto__;
} else
{var h__3833__auto____$1 = cljs.core.hash_imap.call(null,this__3997__auto____$1);self__.__hash = h__3833__auto____$1;
return h__3833__auto____$1;
}
});
frontier.dev_tools.SystemSetter.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__4002__auto__,k__4003__auto__){var self__ = this;
var this__4002__auto____$1 = this;return cljs.core._lookup.call(null,this__4002__auto____$1,k__4003__auto__,null);
});
frontier.dev_tools.SystemSetter.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4004__auto__,k9906,else__4005__auto__){var self__ = this;
var this__4004__auto____$1 = this;if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.get.call(null,self__.__extmap,k9906,else__4005__auto__);
} else
{return null;
}
});
frontier.dev_tools.SystemSetter.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4009__auto__,k__4010__auto__,G__9905){var self__ = this;
var this__4009__auto____$1 = this;var pred__9908 = cljs.core.keyword_identical_QMARK_;var expr__9909 = k__4010__auto__;return (new frontier.dev_tools.SystemSetter(self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__4010__auto__,G__9905),null));
});
frontier.dev_tools.SystemSetter.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__4016__auto__,writer__4017__auto__,opts__4018__auto__){var self__ = this;
var this__4016__auto____$1 = this;var pr_pair__4019__auto__ = (function (keyval__4020__auto__){return cljs.core.pr_sequential_writer.call(null,writer__4017__auto__,cljs.core.pr_writer,""," ","",opts__4018__auto__,keyval__4020__auto__);
});return cljs.core.pr_sequential_writer.call(null,writer__4017__auto__,pr_pair__4019__auto__,"#frontier.dev-tools.SystemSetter{",", ","}",opts__4018__auto__,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});
frontier.dev_tools.SystemSetter.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__4007__auto__,entry__4008__auto__){var self__ = this;
var this__4007__auto____$1 = this;if(cljs.core.vector_QMARK_.call(null,entry__4008__auto__))
{return cljs.core._assoc.call(null,this__4007__auto____$1,cljs.core._nth.call(null,entry__4008__auto__,0),cljs.core._nth.call(null,entry__4008__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__4007__auto____$1,entry__4008__auto__);
}
});
frontier.dev_tools.SystemSetter.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4014__auto__){var self__ = this;
var this__4014__auto____$1 = this;return cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});
frontier.dev_tools.SystemSetter.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__4006__auto__){var self__ = this;
var this__4006__auto____$1 = this;return (0 + cljs.core.count.call(null,self__.__extmap));
});
frontier.dev_tools.SystemSetter.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__3998__auto__,other__3999__auto__){var self__ = this;
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
frontier.dev_tools.SystemSetter.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4001__auto__,G__9905){var self__ = this;
var this__4001__auto____$1 = this;return (new frontier.dev_tools.SystemSetter(G__9905,self__.__extmap,self__.__hash));
});
frontier.dev_tools.SystemSetter.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__4000__auto__){var self__ = this;
var this__4000__auto____$1 = this;return self__.__meta;
});
frontier.dev_tools.SystemSetter.prototype.frontier$core$iTransform$ = true;
frontier.dev_tools.SystemSetter.prototype.frontier$core$iTransform$_transform$arity$3 = (function (o,p__9911,system){var self__ = this;
var vec__9912 = p__9911;var msg = cljs.core.nth.call(null,vec__9912,0,null);var data = cljs.core.nth.call(null,vec__9912,1,null);var o__$1 = this;if(cljs.core._EQ_.call(null,msg,new cljs.core.Keyword(null,"__system.set-state","__system.set-state",2864486841)))
{return data;
} else
{return system;
}
});
frontier.dev_tools.SystemSetter.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__4011__auto__,k__4012__auto__){var self__ = this;
var this__4011__auto____$1 = this;if(cljs.core.contains_QMARK_.call(null,cljs.core.PersistentHashSet.EMPTY,k__4012__auto__))
{return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__4011__auto____$1),self__.__meta),k__4012__auto__);
} else
{return (new frontier.dev_tools.SystemSetter(self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__4012__auto__)),null));
}
});
frontier.dev_tools.SystemSetter.cljs$lang$type = true;
frontier.dev_tools.SystemSetter.cljs$lang$ctorPrSeq = (function (this__4036__auto__){return cljs.core._conj.call(null,cljs.core.List.EMPTY,"frontier.dev-tools/SystemSetter");
});
frontier.dev_tools.SystemSetter.cljs$lang$ctorPrWriter = (function (this__4036__auto__,writer__4037__auto__){return cljs.core._write.call(null,writer__4037__auto__,"frontier.dev-tools/SystemSetter");
});
frontier.dev_tools.__GT_SystemSetter = (function __GT_SystemSetter(){return (new frontier.dev_tools.SystemSetter());
});
frontier.dev_tools.map__GT_SystemSetter = (function map__GT_SystemSetter(G__9907){return (new frontier.dev_tools.SystemSetter(null,cljs.core.dissoc.call(null,G__9907)));
});
frontier.dev_tools.managed_system = (function managed_system(initial_state,comp,state_callback,initial_inputs){var managed_state = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var watch = cljs.core.add_watch.call(null,managed_state,new cljs.core.Keyword(null,"renderer","renderer",519058485),((function (managed_state){
return (function (_,___$1,___$2,cs){return state_callback.call(null,cs);
});})(managed_state))
);var sys_comp = frontier.core.component_group.call(null,(new frontier.dev_tools.SystemSetter()),comp);var sys = frontier.core.system.call(null,initial_state,sys_comp,((function (managed_state,watch,sys_comp){
return (function (p__9921){var map__9922 = p__9921;var map__9922__$1 = ((cljs.core.seq_QMARK_.call(null,map__9922))?cljs.core.apply.call(null,cljs.core.hash_map,map__9922):map__9922);var event_chan = cljs.core.get.call(null,map__9922__$1,new cljs.core.Keyword(null,"event-chan","event-chan",1951581719));var state = cljs.core.get.call(null,map__9922__$1,new cljs.core.Keyword(null,"state","state",1123661827));return cljs.core.swap_BANG_.call(null,managed_state,cljs.core.assoc,new cljs.core.Keyword(null,"sys-state","sys-state",4418469123),state,new cljs.core.Keyword(null,"sys-chan","sys-chan",2924356036),event_chan);
});})(managed_state,watch,sys_comp))
);var history = frontier.core.system.call(null,cljs.core.PersistentArrayMap.EMPTY,frontier.core.component_group.call(null,(new frontier.dev_tools.HistoryManager(new cljs.core.Keyword(null,"event-chan","event-chan",1951581719).cljs$core$IFn$_invoke$arity$1(sys)))),((function (managed_state,watch,sys_comp,sys){
return (function (p__9923){var map__9924 = p__9923;var map__9924__$1 = ((cljs.core.seq_QMARK_.call(null,map__9924))?cljs.core.apply.call(null,cljs.core.hash_map,map__9924):map__9924);var event_chan = cljs.core.get.call(null,map__9924__$1,new cljs.core.Keyword(null,"event-chan","event-chan",1951581719));var state = cljs.core.get.call(null,map__9924__$1,new cljs.core.Keyword(null,"state","state",1123661827));return cljs.core.swap_BANG_.call(null,managed_state,cljs.core.assoc,new cljs.core.Keyword(null,"hist-state","hist-state",1076185496),state,new cljs.core.Keyword(null,"hist-chan","hist-chan",2677993103),event_chan);
});})(managed_state,watch,sys_comp,sys))
);cljs.core.add_watch.call(null,new cljs.core.Keyword(null,"state","state",1123661827).cljs$core$IFn$_invoke$arity$1(sys),new cljs.core.Keyword(null,"history-collect","history-collect",3930540131),(function (_,___$1,___$2,n){return cljs.core.async.put_BANG_.call(null,new cljs.core.Keyword(null,"event-chan","event-chan",1951581719).cljs$core$IFn$_invoke$arity$1(history),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"collect","collect",1963349148),frontier.core._derive.call(null,sys_comp,n)], null));
}));
if(cljs.core.truth_(initial_inputs))
{var seq__9925_9929 = cljs.core.seq.call(null,initial_inputs);var chunk__9926_9930 = null;var count__9927_9931 = 0;var i__9928_9932 = 0;while(true){
if((i__9928_9932 < count__9927_9931))
{var msg_9933 = cljs.core._nth.call(null,chunk__9926_9930,i__9928_9932);cljs.core.swap_BANG_.call(null,new cljs.core.Keyword(null,"state","state",1123661827).cljs$core$IFn$_invoke$arity$1(sys),cljs.core.partial.call(null,frontier.core.trans_helper_STAR_,sys_comp,cljs.core.identity),msg_9933);
{
var G__9934 = seq__9925_9929;
var G__9935 = chunk__9926_9930;
var G__9936 = count__9927_9931;
var G__9937 = (i__9928_9932 + 1);
seq__9925_9929 = G__9934;
chunk__9926_9930 = G__9935;
count__9927_9931 = G__9936;
i__9928_9932 = G__9937;
continue;
}
} else
{var temp__4092__auto___9938 = cljs.core.seq.call(null,seq__9925_9929);if(temp__4092__auto___9938)
{var seq__9925_9939__$1 = temp__4092__auto___9938;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9925_9939__$1))
{var c__4164__auto___9940 = cljs.core.chunk_first.call(null,seq__9925_9939__$1);{
var G__9941 = cljs.core.chunk_rest.call(null,seq__9925_9939__$1);
var G__9942 = c__4164__auto___9940;
var G__9943 = cljs.core.count.call(null,c__4164__auto___9940);
var G__9944 = 0;
seq__9925_9929 = G__9941;
chunk__9926_9930 = G__9942;
count__9927_9931 = G__9943;
i__9928_9932 = G__9944;
continue;
}
} else
{var msg_9945 = cljs.core.first.call(null,seq__9925_9939__$1);cljs.core.swap_BANG_.call(null,new cljs.core.Keyword(null,"state","state",1123661827).cljs$core$IFn$_invoke$arity$1(sys),cljs.core.partial.call(null,frontier.core.trans_helper_STAR_,sys_comp,cljs.core.identity),msg_9945);
{
var G__9946 = cljs.core.next.call(null,seq__9925_9939__$1);
var G__9947 = null;
var G__9948 = 0;
var G__9949 = 0;
seq__9925_9929 = G__9946;
chunk__9926_9930 = G__9947;
count__9927_9931 = G__9948;
i__9928_9932 = G__9949;
continue;
}
}
} else
{}
}
break;
}
} else
{}
return sys;
});
frontier.dev_tools.render_history_controls = (function render_history_controls(p__9950,hist_chan){var map__9983 = p__9950;var map__9983__$1 = ((cljs.core.seq_QMARK_.call(null,map__9983))?cljs.core.apply.call(null,cljs.core.hash_map,map__9983):map__9983);var sys = map__9983__$1;var messages = cljs.core.get.call(null,map__9983__$1,new cljs.core.Keyword(null,"messages","messages",551810238));var msg = cljs.core.get.call(null,map__9983__$1,new cljs.core.Keyword(null,"msg","msg",1014012659));var can_go_forward = cljs.core.get.call(null,map__9983__$1,new cljs.core.Keyword(null,"can-go-forward","can-go-forward",4778555503));var can_go_back = cljs.core.get.call(null,map__9983__$1,new cljs.core.Keyword(null,"can-go-back","can-go-back",1633972513));var under_control = cljs.core.get.call(null,map__9983__$1,new cljs.core.Keyword(null,"under-control","under-control",2562402010));return React.DOM.div({"className": "navbar navbar-default"},(function (){var attrs9984 = (cljs.core.truth_(can_go_back)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.btn.btn-default.navbar-btn","a.btn.btn-default.navbar-btn",1990552814),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"className","className",1004015509),"",new cljs.core.Keyword(null,"href","href",1017115293),"#",new cljs.core.Keyword(null,"onClick","onClick",3956969051),(function (x){x.preventDefault();
return cljs.core.async.put_BANG_.call(null,hist_chan,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"back","back",1016920153)], null));
})], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.glyphicon.glyphicon-step-backward","span.glyphicon.glyphicon-step-backward",3594472481)], null)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.btn.btn-default.navbar-btn.disabled","a.btn.btn-default.navbar-btn.disabled",3715469856),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.glyphicon.glyphicon-step-backward","span.glyphicon.glyphicon-step-backward",3594472481)], null)], null));if(cljs.core.map_QMARK_.call(null,attrs9984))
{return React.DOM.div(sablono.render.render_attrs.call(null,sablono.util.merge_with_class.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",1004015509),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["nav","navbar-nav","btn-group"], null)], null),attrs9984)),(cljs.core.truth_(under_control)?React.DOM.a({"onClick": (function (x){x.preventDefault();
return cljs.core.async.put_BANG_.call(null,hist_chan,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cancel","cancel",3941147116)], null));
}), "className": "btn btn-default navbar-btn "},React.DOM.span({"className": "glyphicon glyphicon-stop"})):React.DOM.a({"className": "btn btn-default navbar-btn disabled"},React.DOM.span({"className": "glyphicon glyphicon-stop"}))),(cljs.core.truth_(under_control)?React.DOM.a({"onClick": (function (x){x.preventDefault();
return cljs.core.async.put_BANG_.call(null,hist_chan,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"keep","keep",1017192183)], null));
}), "className": "btn btn-default navbar-btn "},React.DOM.span({"className": "glyphicon glyphicon-download-alt"})):React.DOM.a({"className": "btn btn-default navbar-btn disabled"},React.DOM.span({"className": "glyphicon glyphicon-download-alt"}))),(cljs.core.truth_((function (){var and__3410__auto__ = under_control;if(cljs.core.truth_(and__3410__auto__))
{return can_go_forward;
} else
{return and__3410__auto__;
}
})())?React.DOM.a({"onClick": (function (x){x.preventDefault();
return cljs.core.async.put_BANG_.call(null,hist_chan,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"forward","forward",4631725623)], null));
}), "className": "btn btn-default navbar-btn right"},React.DOM.span({"className": "glyphicon glyphicon-step-forward"})):React.DOM.a({"className": "btn btn-default navbar-btn disabled"},React.DOM.span({"className": "glyphicon glyphicon-step-forward"}))));
} else
{return React.DOM.div({"className": "nav navbar-nav btn-group"},sablono.render.render_html.call(null,attrs9984),(cljs.core.truth_(under_control)?React.DOM.a({"onClick": (function (x){x.preventDefault();
return cljs.core.async.put_BANG_.call(null,hist_chan,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cancel","cancel",3941147116)], null));
}), "className": "btn btn-default navbar-btn "},React.DOM.span({"className": "glyphicon glyphicon-stop"})):React.DOM.a({"className": "btn btn-default navbar-btn disabled"},React.DOM.span({"className": "glyphicon glyphicon-stop"}))),(cljs.core.truth_(under_control)?React.DOM.a({"onClick": (function (x){x.preventDefault();
return cljs.core.async.put_BANG_.call(null,hist_chan,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"keep","keep",1017192183)], null));
}), "className": "btn btn-default navbar-btn "},React.DOM.span({"className": "glyphicon glyphicon-download-alt"})):React.DOM.a({"className": "btn btn-default navbar-btn disabled"},React.DOM.span({"className": "glyphicon glyphicon-download-alt"}))),(cljs.core.truth_((function (){var and__3410__auto__ = under_control;if(cljs.core.truth_(and__3410__auto__))
{return can_go_forward;
} else
{return and__3410__auto__;
}
})())?React.DOM.a({"onClick": (function (x){x.preventDefault();
return cljs.core.async.put_BANG_.call(null,hist_chan,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"forward","forward",4631725623)], null));
}), "className": "btn btn-default navbar-btn right"},React.DOM.span({"className": "glyphicon glyphicon-step-forward"})):React.DOM.a({"className": "btn btn-default navbar-btn disabled"},React.DOM.span({"className": "glyphicon glyphicon-step-forward"}))));
}
})(),React.DOM.ul({"className": "nav navbar-nav"},React.DOM.li({"className": "dropdown"},React.DOM.a({"data-toggle": "dropdown", "className": "dropdown-toggle"},"Input history ",React.DOM.b({"className": "caret"})),(function (){var attrs9987 = cljs.core.map.call(null,(function (p__10013){var vec__10014 = p__10013;var i = cljs.core.nth.call(null,vec__10014,0,null);var m = cljs.core.nth.call(null,vec__10014,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",1013904339),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"href","href",1017115293),"#",new cljs.core.Keyword(null,"onClick","onClick",3956969051),((function (vec__10014,i,m){
return (function (x){x.preventDefault();
return cljs.core.async.put_BANG_.call(null,hist_chan,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"goto","goto",1017083093),i], null));
});})(vec__10014,i,m))
], null),[cljs.core.str(i),cljs.core.str(" "),cljs.core.str(cljs.core.prn_str.call(null,m))].join('')], null)], null);
}),messages);if(cljs.core.map_QMARK_.call(null,attrs9987))
{return React.DOM.ul(sablono.render.render_attrs.call(null,sablono.util.merge_with_class.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",1004015509),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["dropdown-menu"], null)], null),attrs9987)),null);
} else
{return React.DOM.ul({"className": "dropdown-menu"},sablono.render.render_html.call(null,attrs9987));
}
})())),(function (){var attrs9988 = cljs.core.prn_str.call(null,msg);if(cljs.core.map_QMARK_.call(null,attrs9988))
{return React.DOM.p(sablono.render.render_attrs.call(null,sablono.util.merge_with_class.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",1004015509),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["navbar-text"], null)], null),attrs9988)),null);
} else
{return React.DOM.p({"className": "navbar-text"},sablono.render.render_html.call(null,attrs9988));
}
})());
});
frontier.dev_tools.managed_renderer = (function managed_renderer(target_id,render_func){var target_node = document.getElementById(target_id);return (function (p__10018){var map__10019 = p__10018;var map__10019__$1 = ((cljs.core.seq_QMARK_.call(null,map__10019))?cljs.core.apply.call(null,cljs.core.hash_map,map__10019):map__10019);var hist_chan = cljs.core.get.call(null,map__10019__$1,new cljs.core.Keyword(null,"hist-chan","hist-chan",2677993103));var hist_state = cljs.core.get.call(null,map__10019__$1,new cljs.core.Keyword(null,"hist-state","hist-state",1076185496));var sys_chan = cljs.core.get.call(null,map__10019__$1,new cljs.core.Keyword(null,"sys-chan","sys-chan",2924356036));var sys_state = cljs.core.get.call(null,map__10019__$1,new cljs.core.Keyword(null,"sys-state","sys-state",4418469123));var state = (function (){var or__3422__auto__ = new cljs.core.Keyword(null,"render-state","render-state",666961164).cljs$core$IFn$_invoke$arity$1(hist_state);if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{return sys_state;
}
})();return reactor.core.render_to.call(null,(function (){var attrs10020 = frontier.dev_tools.render_history_controls.call(null,hist_state,hist_chan);if(cljs.core.map_QMARK_.call(null,attrs10020))
{return React.DOM.div(sablono.render.render_attrs.call(null,sablono.util.merge_with_class.call(null,cljs.core.PersistentArrayMap.EMPTY,attrs10020)),sablono.render.render_html.call(null,render_func.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"state","state",1123661827),state,new cljs.core.Keyword(null,"event-chan","event-chan",1951581719),sys_chan], null),new cljs.core.Keyword(null,"disabled","disabled",1284845038),new cljs.core.Keyword(null,"render-state","render-state",666961164).cljs$core$IFn$_invoke$arity$1(hist_state))),sablono.render.render_html.call(null,frontier.util.edn_renderer.html_edn.call(null,cljs.core.dissoc.call(null,state,new cljs.core.Keyword(null,"__msg","__msg",1104577299)))));
} else
{return React.DOM.div({},sablono.render.render_html.call(null,attrs10020),sablono.render.render_html.call(null,render_func.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"state","state",1123661827),state,new cljs.core.Keyword(null,"event-chan","event-chan",1951581719),sys_chan], null),new cljs.core.Keyword(null,"disabled","disabled",1284845038),new cljs.core.Keyword(null,"render-state","render-state",666961164).cljs$core$IFn$_invoke$arity$1(hist_state))),sablono.render.render_html.call(null,frontier.util.edn_renderer.html_edn.call(null,cljs.core.dissoc.call(null,state,new cljs.core.Keyword(null,"__msg","__msg",1104577299)))));
}
})(),target_node,cljs.core.identity);
});
});
/**
* @param {...*} var_args
*/
frontier.dev_tools.render_input_message_links = (function() { 
var render_input_message_links__delegate = function (msgs,event_chan,p__10021){var map__10023 = p__10021;var map__10023__$1 = ((cljs.core.seq_QMARK_.call(null,map__10023))?cljs.core.apply.call(null,cljs.core.hash_map,map__10023):map__10023);var disabled = cljs.core.get.call(null,map__10023__$1,new cljs.core.Keyword(null,"disabled","disabled",1284845038));return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",1013907977),cljs.core.map.call(null,(function (x){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),(cljs.core.truth_(disabled)?cljs.core.prn_str.call(null,x):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",1013904339),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"onClick","onClick",3956969051),(function (){return cljs.core.async.put_BANG_.call(null,event_chan,x);
})], null),cljs.core.prn_str.call(null,x)], null))], null);
}),msgs)], null);
};
var render_input_message_links = function (msgs,event_chan,var_args){
var p__10021 = null;if (arguments.length > 2) {
  p__10021 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return render_input_message_links__delegate.call(this,msgs,event_chan,p__10021);};
render_input_message_links.cljs$lang$maxFixedArity = 2;
render_input_message_links.cljs$lang$applyTo = (function (arglist__10024){
var msgs = cljs.core.first(arglist__10024);
arglist__10024 = cljs.core.next(arglist__10024);
var event_chan = cljs.core.first(arglist__10024);
var p__10021 = cljs.core.rest(arglist__10024);
return render_input_message_links__delegate(msgs,event_chan,p__10021);
});
render_input_message_links.cljs$core$IFn$_invoke$arity$variadic = render_input_message_links__delegate;
return render_input_message_links;
})()
;
frontier.dev_tools.input_controls_renderer = (function input_controls_renderer(input_messages){return (function() { 
var G__10033__delegate = function (p__10029,p__10030){var map__10031 = p__10029;var map__10031__$1 = ((cljs.core.seq_QMARK_.call(null,map__10031))?cljs.core.apply.call(null,cljs.core.hash_map,map__10031):map__10031);var event_chan = cljs.core.get.call(null,map__10031__$1,new cljs.core.Keyword(null,"event-chan","event-chan",1951581719));var map__10032 = p__10030;var map__10032__$1 = ((cljs.core.seq_QMARK_.call(null,map__10032))?cljs.core.apply.call(null,cljs.core.hash_map,map__10032):map__10032);var disabled = cljs.core.get.call(null,map__10032__$1,new cljs.core.Keyword(null,"disabled","disabled",1284845038));return frontier.dev_tools.render_input_message_links.call(null,input_messages,event_chan,new cljs.core.Keyword(null,"disabled","disabled",1284845038),disabled);
};
var G__10033 = function (p__10029,var_args){
var p__10030 = null;if (arguments.length > 1) {
  p__10030 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return G__10033__delegate.call(this,p__10029,p__10030);};
G__10033.cljs$lang$maxFixedArity = 1;
G__10033.cljs$lang$applyTo = (function (arglist__10034){
var p__10029 = cljs.core.first(arglist__10034);
var p__10030 = cljs.core.rest(arglist__10034);
return G__10033__delegate(p__10029,p__10030);
});
G__10033.cljs$core$IFn$_invoke$arity$variadic = G__10033__delegate;
return G__10033;
})()
;
});

//# sourceMappingURL=dev_tools.js.map