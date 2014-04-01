// Compiled by ClojureScript 0.0-2138
goog.provide('reactor.core');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
reactor.core.Pure = React.createClass((function (){var obj10135 = {"shouldComponentUpdate":(function (next_props,next_state){var this$ = this;return !(cljs.core._EQ_.call(null,this$.props.value,next_props.value));
}),"render":(function (){var this$ = this;return this$.props.children.call(null);
})};return obj10135;
})());
reactor.core.OwnerReference = React.createClass((function (){var obj10137 = {"render":(function (){var this$ = this;return this$.props.children.call(null,this$);
})};return obj10137;
})());
reactor.core.render_to = (function render_to(react_dom,html_node,callback){return React.renderComponent(react_dom,html_node,callback);
});
reactor.core.react_render = (function react_render(html_node,react_dom){var out = cljs.core.async.chan.call(null);reactor.core.render_to.call(null,react_dom,html_node,(function (){cljs.core.async.put_BANG_.call(null,out,new cljs.core.Keyword(null,"rendered","rendered",519058471));
return cljs.core.async.close_BANG_.call(null,out);
}));
return out;
});
reactor.core.react_render_loop = (function react_render_loop(html_node,react_dom_chan){var c__6387__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_10185){var state_val_10186 = (state_10185[1]);if((state_val_10186 === 8))
{var inst_10178 = (state_10185[2]);var state_10185__$1 = (function (){var statearr_10187 = state_10185;(statearr_10187[7] = inst_10178);
return statearr_10187;
})();var statearr_10188_10202 = state_10185__$1;(statearr_10188_10202[2] = null);
(statearr_10188_10202[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10186 === 7))
{var inst_10181 = (state_10185[2]);var state_10185__$1 = state_10185;var statearr_10189_10203 = state_10185__$1;(statearr_10189_10203[2] = inst_10181);
(statearr_10189_10203[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10186 === 6))
{var inst_10172 = (state_10185[8]);var inst_10176 = reactor.core.react_render.call(null,html_node,inst_10172);var state_10185__$1 = state_10185;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10185__$1,8,inst_10176);
} else
{if((state_val_10186 === 5))
{var state_10185__$1 = state_10185;var statearr_10190_10204 = state_10185__$1;(statearr_10190_10204[2] = new cljs.core.Keyword(null,"finished","finished",4635210724));
(statearr_10190_10204[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10186 === 4))
{var inst_10172 = (state_10185[8]);var inst_10172__$1 = (state_10185[2]);var inst_10173 = (inst_10172__$1 == null);var state_10185__$1 = (function (){var statearr_10191 = state_10185;(statearr_10191[8] = inst_10172__$1);
return statearr_10191;
})();if(cljs.core.truth_(inst_10173))
{var statearr_10192_10205 = state_10185__$1;(statearr_10192_10205[1] = 5);
} else
{var statearr_10193_10206 = state_10185__$1;(statearr_10193_10206[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10186 === 3))
{var inst_10183 = (state_10185[2]);var state_10185__$1 = state_10185;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10185__$1,inst_10183);
} else
{if((state_val_10186 === 2))
{var state_10185__$1 = state_10185;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10185__$1,4,react_dom_chan);
} else
{if((state_val_10186 === 1))
{var state_10185__$1 = state_10185;var statearr_10194_10207 = state_10185__$1;(statearr_10194_10207[2] = null);
(statearr_10194_10207[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
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
var state_machine__6318__auto____0 = (function (){var statearr_10198 = [null,null,null,null,null,null,null,null,null];(statearr_10198[0] = state_machine__6318__auto__);
(statearr_10198[1] = 1);
return statearr_10198;
});
var state_machine__6318__auto____1 = (function (state_10185){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_10185);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e10199){if((e10199 instanceof Object))
{var ex__6321__auto__ = e10199;var statearr_10200_10208 = state_10185;(statearr_10200_10208[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10185);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e10199;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__10209 = state_10185;
state_10185 = G__10209;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_10185){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_10185);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_10201 = f__6388__auto__.call(null);(statearr_10201[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto__);
return statearr_10201;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return c__6387__auto__;
});
reactor.core.raw = (function raw(raw_html_str){return React.DOM.div(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",871417640),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",3824621309),raw_html_str], null)], null)));
});
reactor.core.set_state = (function set_state(owner,new_state_map){return owner.setState(cljs.core.clj__GT_js.call(null,new_state_map));
});
reactor.core.get_state_val = (function get_state_val(owner,state_key){var temp__4090__auto__ = owner.state;if(cljs.core.truth_(temp__4090__auto__))
{var state = temp__4090__auto__;return (state[cljs.core.name.call(null,state_key)]);
} else
{return null;
}
});
reactor.core.get_prop_val = (function get_prop_val(owner,prop_key){var temp__4090__auto__ = owner.props;if(cljs.core.truth_(temp__4090__auto__))
{var state = temp__4090__auto__;return (state[cljs.core.name.call(null,prop_key)]);
} else
{return null;
}
});
reactor.core.get_children = (function get_children(owner){return owner.props.children;
});
reactor.core.get_ref = (function get_ref(owner,ref_name){return (owner.refs[cljs.core.name.call(null,ref_name)]);
});
reactor.core.get_node = (function get_node(owner,ref_name){return reactor.core.get_ref.call(null,owner,ref_name).getDOMNode();
});
reactor.core.input_value = (function input_value(owner,ref_name){var node = reactor.core.get_node.call(null,owner,ref_name);var pred__10213 = cljs.core._EQ_;var expr__10214 = node.type;if(cljs.core.truth_(pred__10213.call(null,"checkbox",expr__10214)))
{return node.checked;
} else
{return node.value;
}
});
reactor.core.form_values = (function form_values(owner,refs){return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,cljs.core.juxt.call(null,cljs.core.identity,cljs.core.partial.call(null,reactor.core.input_value,owner)),refs));
});
reactor.core.prevent_default_wrap = (function prevent_default_wrap(f){return (function (x){x.preventDefault();
return f.call(null,x);
});
});
reactor.core.form_submit = (function form_submit(owner,chan,msg,fields){return reactor.core.prevent_default_wrap.call(null,(function (){return cljs.core.async.put_BANG_.call(null,chan,(function (){var form_vals = reactor.core.form_values.call(null,owner,fields);console.log("form submit");
console.log(form_vals);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [msg,form_vals], null);
})());
}));
});

//# sourceMappingURL=core.js.map