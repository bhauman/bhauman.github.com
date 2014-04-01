// Compiled by ClojureScript 0.0-2138
goog.provide('frontier.core');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
frontier.core.dev_null = (function dev_null(in$){var c__6387__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_9720){var state_val_9721 = (state_9720[1]);if((state_val_9721 === 8))
{var inst_9713 = (state_9720[2]);var inst_9707 = inst_9713;var state_9720__$1 = (function (){var statearr_9722 = state_9720;(statearr_9722[7] = inst_9707);
return statearr_9722;
})();var statearr_9723_9737 = state_9720__$1;(statearr_9723_9737[2] = null);
(statearr_9723_9737[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9721 === 7))
{var inst_9716 = (state_9720[2]);var state_9720__$1 = state_9720;var statearr_9724_9738 = state_9720__$1;(statearr_9724_9738[2] = inst_9716);
(statearr_9724_9738[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9721 === 6))
{var state_9720__$1 = state_9720;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_9720__$1,8,in$);
} else
{if((state_val_9721 === 5))
{var state_9720__$1 = state_9720;var statearr_9725_9739 = state_9720__$1;(statearr_9725_9739[2] = new cljs.core.Keyword(null,"closed","closed",3951351006));
(statearr_9725_9739[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9721 === 4))
{var inst_9718 = (state_9720[2]);var state_9720__$1 = state_9720;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_9720__$1,inst_9718);
} else
{if((state_val_9721 === 3))
{var inst_9707 = (state_9720[7]);var inst_9709 = (inst_9707 == null);var state_9720__$1 = state_9720;if(cljs.core.truth_(inst_9709))
{var statearr_9726_9740 = state_9720__$1;(statearr_9726_9740[1] = 5);
} else
{var statearr_9727_9741 = state_9720__$1;(statearr_9727_9741[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9721 === 2))
{var inst_9706 = (state_9720[2]);var inst_9707 = inst_9706;var state_9720__$1 = (function (){var statearr_9728 = state_9720;(statearr_9728[7] = inst_9707);
return statearr_9728;
})();var statearr_9729_9742 = state_9720__$1;(statearr_9729_9742[2] = null);
(statearr_9729_9742[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9721 === 1))
{var state_9720__$1 = state_9720;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_9720__$1,2,in$);
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
});return ((function (switch__6317__auto__){
return (function() {
var state_machine__6318__auto__ = null;
var state_machine__6318__auto____0 = (function (){var statearr_9733 = [null,null,null,null,null,null,null,null];(statearr_9733[0] = state_machine__6318__auto__);
(statearr_9733[1] = 1);
return statearr_9733;
});
var state_machine__6318__auto____1 = (function (state_9720){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_9720);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e9734){if((e9734 instanceof Object))
{var ex__6321__auto__ = e9734;var statearr_9735_9743 = state_9720;(statearr_9735_9743[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_9720);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e9734;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__9744 = state_9720;
state_9720 = G__9744;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_9720){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_9720);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_9736 = f__6388__auto__.call(null);(statearr_9736[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto__);
return statearr_9736;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return c__6387__auto__;
});
frontier.core.iPluginInit = (function (){var obj9746 = {};return obj9746;
})();
frontier.core._initialize = (function _initialize(_,system,event_chan){if((function (){var and__3410__auto__ = _;if(and__3410__auto__)
{return _.frontier$core$iPluginInit$_initialize$arity$3;
} else
{return and__3410__auto__;
}
})())
{return _.frontier$core$iPluginInit$_initialize$arity$3(_,system,event_chan);
} else
{var x__4043__auto__ = (((_ == null))?null:_);return (function (){var or__3422__auto__ = (frontier.core._initialize[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (frontier.core._initialize["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"iPluginInit.-initialize",_);
}
}
})().call(null,_,system,event_chan);
}
});
frontier.core.iTransform = (function (){var obj9748 = {};return obj9748;
})();
frontier.core._transform = (function _transform(_,msg,system){if((function (){var and__3410__auto__ = _;if(and__3410__auto__)
{return _.frontier$core$iTransform$_transform$arity$3;
} else
{return and__3410__auto__;
}
})())
{return _.frontier$core$iTransform$_transform$arity$3(_,msg,system);
} else
{var x__4043__auto__ = (((_ == null))?null:_);return (function (){var or__3422__auto__ = (frontier.core._transform[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (frontier.core._transform["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"iTransform.-transform",_);
}
}
})().call(null,_,msg,system);
}
});
frontier.core.iEffect = (function (){var obj9750 = {};return obj9750;
})();
frontier.core._effect = (function _effect(_,msg,system,event_chan,effect_chan){if((function (){var and__3410__auto__ = _;if(and__3410__auto__)
{return _.frontier$core$iEffect$_effect$arity$5;
} else
{return and__3410__auto__;
}
})())
{return _.frontier$core$iEffect$_effect$arity$5(_,msg,system,event_chan,effect_chan);
} else
{var x__4043__auto__ = (((_ == null))?null:_);return (function (){var or__3422__auto__ = (frontier.core._effect[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (frontier.core._effect["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"iEffect.-effect",_);
}
}
})().call(null,_,msg,system,event_chan,effect_chan);
}
});
frontier.core.iInputFilter = (function (){var obj9752 = {};return obj9752;
})();
frontier.core._filter_input = (function _filter_input(_,msg,system){if((function (){var and__3410__auto__ = _;if(and__3410__auto__)
{return _.frontier$core$iInputFilter$_filter_input$arity$3;
} else
{return and__3410__auto__;
}
})())
{return _.frontier$core$iInputFilter$_filter_input$arity$3(_,msg,system);
} else
{var x__4043__auto__ = (((_ == null))?null:_);return (function (){var or__3422__auto__ = (frontier.core._filter_input[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (frontier.core._filter_input["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"iInputFilter.-filter-input",_);
}
}
})().call(null,_,msg,system);
}
});
frontier.core.iDerive = (function (){var obj9754 = {};return obj9754;
})();
frontier.core._derive = (function _derive(_,system){if((function (){var and__3410__auto__ = _;if(and__3410__auto__)
{return _.frontier$core$iDerive$_derive$arity$2;
} else
{return and__3410__auto__;
}
})())
{return _.frontier$core$iDerive$_derive$arity$2(_,system);
} else
{var x__4043__auto__ = (((_ == null))?null:_);return (function (){var or__3422__auto__ = (frontier.core._derive[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (frontier.core._derive["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"iDerive.-derive",_);
}
}
})().call(null,_,system);
}
});
/**
* @param {...*} var_args
*/
frontier.core.add_effects = (function() { 
var add_effects__delegate = function (system,args){return cljs.core.update_in.call(null,system,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"__effects","__effects",1628718228)], null),(function (effects){return cljs.core.concat.call(null,effects,args);
}));
};
var add_effects = function (system,var_args){
var args = null;if (arguments.length > 1) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return add_effects__delegate.call(this,system,args);};
add_effects.cljs$lang$maxFixedArity = 1;
add_effects.cljs$lang$applyTo = (function (arglist__9755){
var system = cljs.core.first(arglist__9755);
var args = cljs.core.rest(arglist__9755);
return add_effects__delegate(system,args);
});
add_effects.cljs$core$IFn$_invoke$arity$variadic = add_effects__delegate;
return add_effects;
})()
;
/**
* @param {...*} var_args
*/
frontier.core.component_group = (function() { 
var component_group__delegate = function (components){var initializers = cljs.core.filter.call(null,(function (p1__9756_SHARP_){var G__9781 = p1__9756_SHARP_;if(G__9781)
{var bit__4066__auto__ = null;if(cljs.core.truth_((function (){var or__3422__auto__ = bit__4066__auto__;if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{return G__9781.frontier$core$iPluginInit$;
}
})()))
{return true;
} else
{if((!G__9781.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,frontier.core.iPluginInit,G__9781);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,frontier.core.iPluginInit,G__9781);
}
}),components);var transforms = cljs.core.filter.call(null,((function (initializers){
return (function (p1__9757_SHARP_){var G__9782 = p1__9757_SHARP_;if(G__9782)
{var bit__4066__auto__ = null;if(cljs.core.truth_((function (){var or__3422__auto__ = bit__4066__auto__;if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{return G__9782.frontier$core$iTransform$;
}
})()))
{return true;
} else
{if((!G__9782.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,frontier.core.iTransform,G__9782);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,frontier.core.iTransform,G__9782);
}
});})(initializers))
,components);var effects = cljs.core.filter.call(null,((function (initializers,transforms){
return (function (p1__9758_SHARP_){var G__9783 = p1__9758_SHARP_;if(G__9783)
{var bit__4066__auto__ = null;if(cljs.core.truth_((function (){var or__3422__auto__ = bit__4066__auto__;if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{return G__9783.frontier$core$iEffect$;
}
})()))
{return true;
} else
{if((!G__9783.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,frontier.core.iEffect,G__9783);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,frontier.core.iEffect,G__9783);
}
});})(initializers,transforms))
,components);var input_filters = cljs.core.filter.call(null,((function (initializers,transforms,effects){
return (function (p1__9759_SHARP_){var G__9784 = p1__9759_SHARP_;if(G__9784)
{var bit__4066__auto__ = null;if(cljs.core.truth_((function (){var or__3422__auto__ = bit__4066__auto__;if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{return G__9784.frontier$core$iInputFilter$;
}
})()))
{return true;
} else
{if((!G__9784.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,frontier.core.iInputFilter,G__9784);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,frontier.core.iInputFilter,G__9784);
}
});})(initializers,transforms,effects))
,components);var derivatives = cljs.core.filter.call(null,((function (initializers,transforms,effects,input_filters){
return (function (p1__9760_SHARP_){var G__9785 = p1__9760_SHARP_;if(G__9785)
{var bit__4066__auto__ = null;if(cljs.core.truth_((function (){var or__3422__auto__ = bit__4066__auto__;if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{return G__9785.frontier$core$iDerive$;
}
})()))
{return true;
} else
{if((!G__9785.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,frontier.core.iDerive,G__9785);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,frontier.core.iDerive,G__9785);
}
});})(initializers,transforms,effects,input_filters))
,components);var ifilter = cljs.core.apply.call(null,cljs.core.comp,cljs.core.mapv.call(null,((function (initializers,transforms,effects,input_filters,derivatives){
return (function (pl){var func = cljs.core.partial.call(null,frontier.core._filter_input,pl);return ((function (func,initializers,transforms,effects,input_filters,derivatives){
return (function (p__9786){var vec__9787 = p__9786;var msg = cljs.core.nth.call(null,vec__9787,0,null);var system = cljs.core.nth.call(null,vec__9787,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [func.call(null,msg,system),system], null);
});
;})(func,initializers,transforms,effects,input_filters,derivatives))
});})(initializers,transforms,effects,input_filters,derivatives))
,cljs.core.reverse.call(null,input_filters)));var itrans = cljs.core.apply.call(null,cljs.core.comp,cljs.core.mapv.call(null,((function (initializers,transforms,effects,input_filters,derivatives,ifilter){
return (function (pl){var func = cljs.core.partial.call(null,frontier.core._transform,pl);return ((function (func,initializers,transforms,effects,input_filters,derivatives,ifilter){
return (function (p__9788){var vec__9789 = p__9788;var msg = cljs.core.nth.call(null,vec__9789,0,null);var system = cljs.core.nth.call(null,vec__9789,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [msg,func.call(null,msg,system)], null);
});
;})(func,initializers,transforms,effects,input_filters,derivatives,ifilter))
});})(initializers,transforms,effects,input_filters,derivatives,ifilter))
,cljs.core.reverse.call(null,transforms)));var ideriv = cljs.core.apply.call(null,cljs.core.comp,cljs.core.mapv.call(null,((function (initializers,transforms,effects,input_filters,derivatives,ifilter,itrans){
return (function (pl){return cljs.core.partial.call(null,frontier.core._derive,pl);
});})(initializers,transforms,effects,input_filters,derivatives,ifilter,itrans))
,cljs.core.reverse.call(null,derivatives)));var ieffects = ((function (initializers,transforms,effects,input_filters,derivatives,ifilter,itrans,ideriv){
return (function (msg,system,event_chan,effect_chan){var seq__9790 = cljs.core.seq.call(null,cljs.core.reverse.call(null,effects));var chunk__9791 = null;var count__9792 = 0;var i__9793 = 0;while(true){
if((i__9793 < count__9792))
{var pl = cljs.core._nth.call(null,chunk__9791,i__9793);frontier.core._effect.call(null,pl,msg,system,event_chan,effect_chan);
{
var G__9801 = seq__9790;
var G__9802 = chunk__9791;
var G__9803 = count__9792;
var G__9804 = (i__9793 + 1);
seq__9790 = G__9801;
chunk__9791 = G__9802;
count__9792 = G__9803;
i__9793 = G__9804;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__9790);if(temp__4092__auto__)
{var seq__9790__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9790__$1))
{var c__4164__auto__ = cljs.core.chunk_first.call(null,seq__9790__$1);{
var G__9805 = cljs.core.chunk_rest.call(null,seq__9790__$1);
var G__9806 = c__4164__auto__;
var G__9807 = cljs.core.count.call(null,c__4164__auto__);
var G__9808 = 0;
seq__9790 = G__9805;
chunk__9791 = G__9806;
count__9792 = G__9807;
i__9793 = G__9808;
continue;
}
} else
{var pl = cljs.core.first.call(null,seq__9790__$1);frontier.core._effect.call(null,pl,msg,system,event_chan,effect_chan);
{
var G__9809 = cljs.core.next.call(null,seq__9790__$1);
var G__9810 = null;
var G__9811 = 0;
var G__9812 = 0;
seq__9790 = G__9809;
chunk__9791 = G__9810;
count__9792 = G__9811;
i__9793 = G__9812;
continue;
}
}
} else
{return null;
}
}
break;
}
});})(initializers,transforms,effects,input_filters,derivatives,ifilter,itrans,ideriv))
;if(typeof frontier.core.t9794 !== 'undefined')
{} else
{
/**
* @constructor
*/
frontier.core.t9794 = (function (ifilter,derivatives,components,component_group,ieffects,input_filters,itrans,ideriv,effects,initializers,transforms,meta9795){
this.ifilter = ifilter;
this.derivatives = derivatives;
this.components = components;
this.component_group = component_group;
this.ieffects = ieffects;
this.input_filters = input_filters;
this.itrans = itrans;
this.ideriv = ideriv;
this.effects = effects;
this.initializers = initializers;
this.transforms = transforms;
this.meta9795 = meta9795;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
frontier.core.t9794.cljs$lang$type = true;
frontier.core.t9794.cljs$lang$ctorStr = "frontier.core/t9794";
frontier.core.t9794.cljs$lang$ctorPrWriter = (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"frontier.core/t9794");
});
frontier.core.t9794.prototype.frontier$core$iDerive$ = true;
frontier.core.t9794.prototype.frontier$core$iDerive$_derive$arity$2 = (function (_,system){var self__ = this;
var ___$1 = this;return self__.ideriv.call(null,system);
});
frontier.core.t9794.prototype.frontier$core$iInputFilter$ = true;
frontier.core.t9794.prototype.frontier$core$iInputFilter$_filter_input$arity$3 = (function (_,msg,system){var self__ = this;
var ___$1 = this;return cljs.core.first.call(null,self__.ifilter.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [msg,system], null)));
});
frontier.core.t9794.prototype.frontier$core$iEffect$ = true;
frontier.core.t9794.prototype.frontier$core$iEffect$_effect$arity$5 = (function (_,msg,system,event_chan,effect_chan){var self__ = this;
var ___$1 = this;return self__.ieffects.call(null,msg,system,event_chan,effect_chan);
});
frontier.core.t9794.prototype.frontier$core$iTransform$ = true;
frontier.core.t9794.prototype.frontier$core$iTransform$_transform$arity$3 = (function (_,msg,system){var self__ = this;
var ___$1 = this;return cljs.core.last.call(null,self__.itrans.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [msg,system], null)));
});
frontier.core.t9794.prototype.frontier$core$iPluginInit$ = true;
frontier.core.t9794.prototype.frontier$core$iPluginInit$_initialize$arity$3 = (function (_,system,event_chan){var self__ = this;
var ___$1 = this;var seq__9797 = cljs.core.seq.call(null,self__.initializers);var chunk__9798 = null;var count__9799 = 0;var i__9800 = 0;while(true){
if((i__9800 < count__9799))
{var pl = cljs.core._nth.call(null,chunk__9798,i__9800);frontier.core._initialize.call(null,pl,system,event_chan);
{
var G__9813 = seq__9797;
var G__9814 = chunk__9798;
var G__9815 = count__9799;
var G__9816 = (i__9800 + 1);
seq__9797 = G__9813;
chunk__9798 = G__9814;
count__9799 = G__9815;
i__9800 = G__9816;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__9797);if(temp__4092__auto__)
{var seq__9797__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9797__$1))
{var c__4164__auto__ = cljs.core.chunk_first.call(null,seq__9797__$1);{
var G__9817 = cljs.core.chunk_rest.call(null,seq__9797__$1);
var G__9818 = c__4164__auto__;
var G__9819 = cljs.core.count.call(null,c__4164__auto__);
var G__9820 = 0;
seq__9797 = G__9817;
chunk__9798 = G__9818;
count__9799 = G__9819;
i__9800 = G__9820;
continue;
}
} else
{var pl = cljs.core.first.call(null,seq__9797__$1);frontier.core._initialize.call(null,pl,system,event_chan);
{
var G__9821 = cljs.core.next.call(null,seq__9797__$1);
var G__9822 = null;
var G__9823 = 0;
var G__9824 = 0;
seq__9797 = G__9821;
chunk__9798 = G__9822;
count__9799 = G__9823;
i__9800 = G__9824;
continue;
}
}
} else
{return null;
}
}
break;
}
});
frontier.core.t9794.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_9796){var self__ = this;
var _9796__$1 = this;return self__.meta9795;
});
frontier.core.t9794.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_9796,meta9795__$1){var self__ = this;
var _9796__$1 = this;return (new frontier.core.t9794(self__.ifilter,self__.derivatives,self__.components,self__.component_group,self__.ieffects,self__.input_filters,self__.itrans,self__.ideriv,self__.effects,self__.initializers,self__.transforms,meta9795__$1));
});
frontier.core.__GT_t9794 = (function __GT_t9794(ifilter__$1,derivatives__$1,components__$1,component_group__$1,ieffects__$1,input_filters__$1,itrans__$1,ideriv__$1,effects__$1,initializers__$1,transforms__$1,meta9795){return (new frontier.core.t9794(ifilter__$1,derivatives__$1,components__$1,component_group__$1,ieffects__$1,input_filters__$1,itrans__$1,ideriv__$1,effects__$1,initializers__$1,transforms__$1,meta9795));
});
}
return (new frontier.core.t9794(ifilter,derivatives,components,component_group,ieffects,input_filters,itrans,ideriv,effects,initializers,transforms,null));
};
var component_group = function (var_args){
var components = null;if (arguments.length > 0) {
  components = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return component_group__delegate.call(this,components);};
component_group.cljs$lang$maxFixedArity = 0;
component_group.cljs$lang$applyTo = (function (arglist__9825){
var components = cljs.core.seq(arglist__9825);
return component_group__delegate(components);
});
component_group.cljs$core$IFn$_invoke$arity$variadic = component_group__delegate;
return component_group;
})()
;
frontier.core.trans_helper_STAR_ = (function trans_helper_STAR_(comp,effect_handler,sys,msg){var temp__4090__auto__ = frontier.core._transform.call(null,comp,msg,sys);if(cljs.core.truth_(temp__4090__auto__))
{var new_sys = temp__4090__auto__;effect_handler.call(null,new cljs.core.Keyword(null,"__effects","__effects",1628718228).cljs$core$IFn$_invoke$arity$1(new_sys));
return cljs.core.dissoc.call(null,cljs.core.assoc.call(null,new_sys,new cljs.core.Keyword(null,"__msg","__msg",1104577299),msg),new cljs.core.Keyword(null,"__effects","__effects",1628718228));
} else
{return sys;
}
});
frontier.core.trans_helper_new_STAR_ = (function trans_helper_new_STAR_(comp,sys,msg){var temp__4090__auto__ = frontier.core._transform.call(null,comp,msg,sys);if(cljs.core.truth_(temp__4090__auto__))
{var new_sys = temp__4090__auto__;return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"__effects","__effects",1628718228).cljs$core$IFn$_invoke$arity$1(new_sys),cljs.core.dissoc.call(null,cljs.core.assoc.call(null,new_sys,new cljs.core.Keyword(null,"__msg","__msg",1104577299),msg),new cljs.core.Keyword(null,"__effects","__effects",1628718228))], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,sys], null);
}
});
frontier.core.system = (function system(initial_state,comp,state_callback){var state = cljs.core.atom.call(null,initial_state);var event_chan = cljs.core.async.chan.call(null);var effect_chan = cljs.core.async.chan.call(null);var trans_without_effect = cljs.core.partial.call(null,frontier.core.trans_helper_STAR_,comp,cljs.core.identity);var transformer = cljs.core.partial.call(null,frontier.core.trans_helper_STAR_,comp,((function (state,event_chan,effect_chan,trans_without_effect){
return (function (p1__9826_SHARP_){var seq__9831 = cljs.core.seq.call(null,p1__9826_SHARP_);var chunk__9832 = null;var count__9833 = 0;var i__9834 = 0;while(true){
if((i__9834 < count__9833))
{var ef = cljs.core._nth.call(null,chunk__9832,i__9834);cljs.core.async.put_BANG_.call(null,effect_chan,ef);
{
var G__9835 = seq__9831;
var G__9836 = chunk__9832;
var G__9837 = count__9833;
var G__9838 = (i__9834 + 1);
seq__9831 = G__9835;
chunk__9832 = G__9836;
count__9833 = G__9837;
i__9834 = G__9838;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__9831);if(temp__4092__auto__)
{var seq__9831__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9831__$1))
{var c__4164__auto__ = cljs.core.chunk_first.call(null,seq__9831__$1);{
var G__9839 = cljs.core.chunk_rest.call(null,seq__9831__$1);
var G__9840 = c__4164__auto__;
var G__9841 = cljs.core.count.call(null,c__4164__auto__);
var G__9842 = 0;
seq__9831 = G__9839;
chunk__9832 = G__9840;
count__9833 = G__9841;
i__9834 = G__9842;
continue;
}
} else
{var ef = cljs.core.first.call(null,seq__9831__$1);cljs.core.async.put_BANG_.call(null,effect_chan,ef);
{
var G__9843 = cljs.core.next.call(null,seq__9831__$1);
var G__9844 = null;
var G__9845 = 0;
var G__9846 = 0;
seq__9831 = G__9843;
chunk__9832 = G__9844;
count__9833 = G__9845;
i__9834 = G__9846;
continue;
}
}
} else
{return null;
}
}
break;
}
});})(state,event_chan,effect_chan,trans_without_effect))
);cljs.core.add_watch.call(null,state,new cljs.core.Keyword(null,"renderer","renderer",519058485),(function (_,___$1,o,n){return state_callback.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"state","state",1123661827),frontier.core._derive.call(null,comp,n),new cljs.core.Keyword(null,"event-chan","event-chan",1951581719),event_chan], null));
}));
frontier.core._initialize.call(null,comp,initial_state,event_chan);
frontier.core.dev_null.call(null,cljs.core.async.map_LT_.call(null,(function (msg){frontier.core._effect.call(null,comp,msg,cljs.core.deref.call(null,state),event_chan,effect_chan);
return true;
}),effect_chan));
frontier.core.dev_null.call(null,cljs.core.async.map_LT_.call(null,(function (msg){var new_msg = frontier.core._filter_input.call(null,comp,msg,cljs.core.deref.call(null,state));return cljs.core.swap_BANG_.call(null,state,transformer,new_msg);
}),event_chan));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"state","state",1123661827),state,new cljs.core.Keyword(null,"event-chan","event-chan",1951581719),event_chan,new cljs.core.Keyword(null,"effect-chan","effect-chan",2628469120),effect_chan,new cljs.core.Keyword(null,"component","component",3908964463),comp], null);
});
frontier.core.system_with_initial_inputs = (function system_with_initial_inputs(initial_state,comp,state_callback,initial_inputs){var system = frontier.core.system.call(null,initial_state,comp,state_callback);var trans = cljs.core.partial.call(null,frontier.core.trans_helper_STAR_,comp,cljs.core.identity);var seq__9851_9855 = cljs.core.seq.call(null,initial_inputs);var chunk__9852_9856 = null;var count__9853_9857 = 0;var i__9854_9858 = 0;while(true){
if((i__9854_9858 < count__9853_9857))
{var msg_9859 = cljs.core._nth.call(null,chunk__9852_9856,i__9854_9858);cljs.core.swap_BANG_.call(null,new cljs.core.Keyword(null,"state","state",1123661827).cljs$core$IFn$_invoke$arity$1(system),trans,msg_9859);
{
var G__9860 = seq__9851_9855;
var G__9861 = chunk__9852_9856;
var G__9862 = count__9853_9857;
var G__9863 = (i__9854_9858 + 1);
seq__9851_9855 = G__9860;
chunk__9852_9856 = G__9861;
count__9853_9857 = G__9862;
i__9854_9858 = G__9863;
continue;
}
} else
{var temp__4092__auto___9864 = cljs.core.seq.call(null,seq__9851_9855);if(temp__4092__auto___9864)
{var seq__9851_9865__$1 = temp__4092__auto___9864;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9851_9865__$1))
{var c__4164__auto___9866 = cljs.core.chunk_first.call(null,seq__9851_9865__$1);{
var G__9867 = cljs.core.chunk_rest.call(null,seq__9851_9865__$1);
var G__9868 = c__4164__auto___9866;
var G__9869 = cljs.core.count.call(null,c__4164__auto___9866);
var G__9870 = 0;
seq__9851_9855 = G__9867;
chunk__9852_9856 = G__9868;
count__9853_9857 = G__9869;
i__9854_9858 = G__9870;
continue;
}
} else
{var msg_9871 = cljs.core.first.call(null,seq__9851_9865__$1);cljs.core.swap_BANG_.call(null,new cljs.core.Keyword(null,"state","state",1123661827).cljs$core$IFn$_invoke$arity$1(system),trans,msg_9871);
{
var G__9872 = cljs.core.next.call(null,seq__9851_9865__$1);
var G__9873 = null;
var G__9874 = 0;
var G__9875 = 0;
seq__9851_9855 = G__9872;
chunk__9852_9856 = G__9873;
count__9853_9857 = G__9874;
i__9854_9858 = G__9875;
continue;
}
}
} else
{}
}
break;
}
return system;
});

//# sourceMappingURL=core.js.map