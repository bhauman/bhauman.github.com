// Compiled by ClojureScript 0.0-2138
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.ioc_helpers');
cljs.core.async.fn_handler = (function fn_handler(f){if(typeof cljs.core.async.t11403 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11403 = (function (f,fn_handler,meta11404){
this.f = f;
this.fn_handler = fn_handler;
this.meta11404 = meta11404;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11403.cljs$lang$type = true;
cljs.core.async.t11403.cljs$lang$ctorStr = "cljs.core.async/t11403";
cljs.core.async.t11403.cljs$lang$ctorPrWriter = (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.async/t11403");
});
cljs.core.async.t11403.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11403.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return true;
});
cljs.core.async.t11403.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.f;
});
cljs.core.async.t11403.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11405){var self__ = this;
var _11405__$1 = this;return self__.meta11404;
});
cljs.core.async.t11403.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11405,meta11404__$1){var self__ = this;
var _11405__$1 = this;return (new cljs.core.async.t11403(self__.f,self__.fn_handler,meta11404__$1));
});
cljs.core.async.__GT_t11403 = (function __GT_t11403(f__$1,fn_handler__$1,meta11404){return (new cljs.core.async.t11403(f__$1,fn_handler__$1,meta11404));
});
}
return (new cljs.core.async.t11403(f,fn_handler,null));
});
/**
* Returns a fixed buffer of size n. When full, puts will block/park.
*/
cljs.core.async.buffer = (function buffer(n){return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
* Returns a buffer of size n. When full, puts will complete but
* val will be dropped (no transfer).
*/
cljs.core.async.dropping_buffer = (function dropping_buffer(n){return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
* Returns a buffer of size n. When full, puts will complete, and be
* buffered, but oldest elements in buffer will be dropped (not
* transferred).
*/
cljs.core.async.sliding_buffer = (function sliding_buffer(n){return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
* Returns true if a channel created with buff will never block. That is to say,
* puts into this buffer will never cause the buffer to be full.
*/
cljs.core.async.unblocking_buffer_QMARK_ = (function unblocking_buffer_QMARK_(buff){var G__11407 = buff;if(G__11407)
{var bit__4066__auto__ = null;if(cljs.core.truth_((function (){var or__3422__auto__ = bit__4066__auto__;if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{return G__11407.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})()))
{return true;
} else
{if((!G__11407.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__11407);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__11407);
}
});
/**
* Creates a channel with an optional buffer. If buf-or-n is a number,
* will create and use a fixed buffer of that size.
*/
cljs.core.async.chan = (function() {
var chan = null;
var chan__0 = (function (){return chan.call(null,null);
});
var chan__1 = (function (buf_or_n){var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,0))?null:buf_or_n);return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1));
});
chan = function(buf_or_n){
switch(arguments.length){
case 0:
return chan__0.call(this);
case 1:
return chan__1.call(this,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chan.cljs$core$IFn$_invoke$arity$0 = chan__0;
chan.cljs$core$IFn$_invoke$arity$1 = chan__1;
return chan;
})()
;
/**
* Returns a channel that will close after msecs
*/
cljs.core.async.timeout = (function timeout(msecs){return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
* takes a val from port. Must be called inside a (go ...) block. Will
* return nil if closed. Will park if nothing is available.
*/
cljs.core.async._LT__BANG_ = (function _LT__BANG_(port){if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("<! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
});
/**
* Asynchronously takes a val from port, passing to fn1. Will pass nil
* if closed. If on-caller? (default true) is true, and value is
* immediately available, will call fn1 on calling thread.
* Returns nil.
*/
cljs.core.async.take_BANG_ = (function() {
var take_BANG_ = null;
var take_BANG___2 = (function (port,fn1){return take_BANG_.call(null,port,fn1,true);
});
var take_BANG___3 = (function (port,fn1,on_caller_QMARK_){var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));if(cljs.core.truth_(ret))
{var val_11408 = cljs.core.deref.call(null,ret);if(cljs.core.truth_(on_caller_QMARK_))
{fn1.call(null,val_11408);
} else
{cljs.core.async.impl.dispatch.run.call(null,(function (){return fn1.call(null,val_11408);
}));
}
} else
{}
return null;
});
take_BANG_ = function(port,fn1,on_caller_QMARK_){
switch(arguments.length){
case 2:
return take_BANG___2.call(this,port,fn1);
case 3:
return take_BANG___3.call(this,port,fn1,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take_BANG_.cljs$core$IFn$_invoke$arity$2 = take_BANG___2;
take_BANG_.cljs$core$IFn$_invoke$arity$3 = take_BANG___3;
return take_BANG_;
})()
;
cljs.core.async.nop = (function nop(){return null;
});
/**
* puts a val into port. nil values are not allowed. Must be called
* inside a (go ...) block. Will park if no buffer space is available.
*/
cljs.core.async._GT__BANG_ = (function _GT__BANG_(port,val){if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(">! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
});
/**
* Asynchronously puts a val into port, calling fn0 (if supplied) when
* complete. nil values are not allowed. Will throw if closed. If
* on-caller? (default true) is true, and the put is immediately
* accepted, will call fn0 on calling thread.  Returns nil.
*/
cljs.core.async.put_BANG_ = (function() {
var put_BANG_ = null;
var put_BANG___2 = (function (port,val){return put_BANG_.call(null,port,val,cljs.core.async.nop);
});
var put_BANG___3 = (function (port,val,fn0){return put_BANG_.call(null,port,val,fn0,true);
});
var put_BANG___4 = (function (port,val,fn0,on_caller_QMARK_){var ret = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn0));if(cljs.core.truth_((function (){var and__3410__auto__ = ret;if(cljs.core.truth_(and__3410__auto__))
{return cljs.core.not_EQ_.call(null,fn0,cljs.core.async.nop);
} else
{return and__3410__auto__;
}
})()))
{if(cljs.core.truth_(on_caller_QMARK_))
{fn0.call(null);
} else
{cljs.core.async.impl.dispatch.run.call(null,fn0);
}
} else
{}
return null;
});
put_BANG_ = function(port,val,fn0,on_caller_QMARK_){
switch(arguments.length){
case 2:
return put_BANG___2.call(this,port,val);
case 3:
return put_BANG___3.call(this,port,val,fn0);
case 4:
return put_BANG___4.call(this,port,val,fn0,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
put_BANG_.cljs$core$IFn$_invoke$arity$2 = put_BANG___2;
put_BANG_.cljs$core$IFn$_invoke$arity$3 = put_BANG___3;
put_BANG_.cljs$core$IFn$_invoke$arity$4 = put_BANG___4;
return put_BANG_;
})()
;
cljs.core.async.close_BANG_ = (function close_BANG_(port){return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function random_array(n){var a = (new Array(n));var n__4264__auto___11409 = n;var x_11410 = 0;while(true){
if((x_11410 < n__4264__auto___11409))
{(a[x_11410] = 0);
{
var G__11411 = (x_11410 + 1);
x_11410 = G__11411;
continue;
}
} else
{}
break;
}
var i = 1;while(true){
if(cljs.core._EQ_.call(null,i,n))
{return a;
} else
{var j = cljs.core.rand_int.call(null,i);(a[i] = (a[j]));
(a[j] = i);
{
var G__11412 = (i + 1);
i = G__11412;
continue;
}
}
break;
}
});
cljs.core.async.alt_flag = (function alt_flag(){var flag = cljs.core.atom.call(null,true);if(typeof cljs.core.async.t11416 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11416 = (function (flag,alt_flag,meta11417){
this.flag = flag;
this.alt_flag = alt_flag;
this.meta11417 = meta11417;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11416.cljs$lang$type = true;
cljs.core.async.t11416.cljs$lang$ctorStr = "cljs.core.async/t11416";
cljs.core.async.t11416.cljs$lang$ctorPrWriter = (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.async/t11416");
});
cljs.core.async.t11416.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11416.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.deref.call(null,self__.flag);
});
cljs.core.async.t11416.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.flag,null);
return true;
});
cljs.core.async.t11416.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11418){var self__ = this;
var _11418__$1 = this;return self__.meta11417;
});
cljs.core.async.t11416.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11418,meta11417__$1){var self__ = this;
var _11418__$1 = this;return (new cljs.core.async.t11416(self__.flag,self__.alt_flag,meta11417__$1));
});
cljs.core.async.__GT_t11416 = (function __GT_t11416(flag__$1,alt_flag__$1,meta11417){return (new cljs.core.async.t11416(flag__$1,alt_flag__$1,meta11417));
});
}
return (new cljs.core.async.t11416(flag,alt_flag,null));
});
cljs.core.async.alt_handler = (function alt_handler(flag,cb){if(typeof cljs.core.async.t11422 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11422 = (function (cb,flag,alt_handler,meta11423){
this.cb = cb;
this.flag = flag;
this.alt_handler = alt_handler;
this.meta11423 = meta11423;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11422.cljs$lang$type = true;
cljs.core.async.t11422.cljs$lang$ctorStr = "cljs.core.async/t11422";
cljs.core.async.t11422.cljs$lang$ctorPrWriter = (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.async/t11422");
});
cljs.core.async.t11422.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11422.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});
cljs.core.async.t11422.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.async.impl.protocols.commit.call(null,self__.flag);
return self__.cb;
});
cljs.core.async.t11422.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11424){var self__ = this;
var _11424__$1 = this;return self__.meta11423;
});
cljs.core.async.t11422.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11424,meta11423__$1){var self__ = this;
var _11424__$1 = this;return (new cljs.core.async.t11422(self__.cb,self__.flag,self__.alt_handler,meta11423__$1));
});
cljs.core.async.__GT_t11422 = (function __GT_t11422(cb__$1,flag__$1,alt_handler__$1,meta11423){return (new cljs.core.async.t11422(cb__$1,flag__$1,alt_handler__$1,meta11423));
});
}
return (new cljs.core.async.t11422(cb,flag,alt_handler,null));
});
/**
* returns derefable [val port] if immediate, nil if enqueued
*/
cljs.core.async.do_alts = (function do_alts(fret,ports,opts){var flag = cljs.core.async.alt_flag.call(null);var n = cljs.core.count.call(null,ports);var idxs = cljs.core.async.random_array.call(null,n);var priority = new cljs.core.Keyword(null,"priority","priority",4143410454).cljs$core$IFn$_invoke$arity$1(opts);var ret = (function (){var i = 0;while(true){
if((i < n))
{var idx = (cljs.core.truth_(priority)?i:(idxs[i]));var port = cljs.core.nth.call(null,ports,idx);var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,0):null);var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,1);return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__11425_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__11425_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));if(cljs.core.truth_(vbox))
{return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__3422__auto__ = wport;if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{return port;
}
})()], null));
} else
{{
var G__11426 = (i + 1);
i = G__11426;
continue;
}
}
} else
{return null;
}
break;
}
})();var or__3422__auto__ = ret;if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",2558708147)))
{var temp__4092__auto__ = (function (){var and__3410__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);if(cljs.core.truth_(and__3410__auto__))
{return cljs.core.async.impl.protocols.commit.call(null,flag);
} else
{return and__3410__auto__;
}
})();if(cljs.core.truth_(temp__4092__auto__))
{var got = temp__4092__auto__;return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",2558708147)], null));
} else
{return null;
}
} else
{return null;
}
}
});
/**
* Completes at most one of several channel operations. Must be called
* inside a (go ...) block. ports is a vector of channel endpoints, which
* can be either a channel to take from or a vector of
* [channel-to-put-to val-to-put], in any combination. Takes will be
* made as if by <!, and puts will be made as if by >!. Unless
* the :priority option is true, if more than one port operation is
* ready a non-deterministic choice will be made. If no operation is
* ready and a :default value is supplied, [default-val :default] will
* be returned, otherwise alts! will park until the first operation to
* become ready completes. Returns [val port] of the completed
* operation, where val is the value taken for takes, and nil for puts.
* 
* opts are passed as :key val ... Supported options:
* 
* :default val - the value to use if none of the operations are immediately ready
* :priority true - (default nil) when true, the operations will be tried in order.
* 
* Note: there is no guarantee that the port exps or val exprs will be
* used, nor in what order should they be, so they should not be
* depended upon for side effects.
* @param {...*} var_args
*/
cljs.core.async.alts_BANG_ = (function() { 
var alts_BANG___delegate = function (ports,p__11427){var map__11429 = p__11427;var map__11429__$1 = ((cljs.core.seq_QMARK_.call(null,map__11429))?cljs.core.apply.call(null,cljs.core.hash_map,map__11429):map__11429);var opts = map__11429__$1;if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("alts! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
};
var alts_BANG_ = function (ports,var_args){
var p__11427 = null;if (arguments.length > 1) {
  p__11427 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return alts_BANG___delegate.call(this,ports,p__11427);};
alts_BANG_.cljs$lang$maxFixedArity = 1;
alts_BANG_.cljs$lang$applyTo = (function (arglist__11430){
var ports = cljs.core.first(arglist__11430);
var p__11427 = cljs.core.rest(arglist__11430);
return alts_BANG___delegate(ports,p__11427);
});
alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = alts_BANG___delegate;
return alts_BANG_;
})()
;
/**
* Takes a function and a source channel, and returns a channel which
* contains the values produced by applying f to each value taken from
* the source channel
*/
cljs.core.async.map_LT_ = (function map_LT_(f,ch){if(typeof cljs.core.async.t11438 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11438 = (function (ch,f,map_LT_,meta11439){
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta11439 = meta11439;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11438.cljs$lang$type = true;
cljs.core.async.t11438.cljs$lang$ctorStr = "cljs.core.async/t11438";
cljs.core.async.t11438.cljs$lang$ctorPrWriter = (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.async/t11438");
});
cljs.core.async.t11438.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t11438.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn0);
});
cljs.core.async.t11438.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t11438.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){if(typeof cljs.core.async.t11441 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11441 = (function (fn1,_,meta11439,ch,f,map_LT_,meta11442){
this.fn1 = fn1;
this._ = _;
this.meta11439 = meta11439;
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta11442 = meta11442;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11441.cljs$lang$type = true;
cljs.core.async.t11441.cljs$lang$ctorStr = "cljs.core.async/t11441";
cljs.core.async.t11441.cljs$lang$ctorPrWriter = (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.async/t11441");
});
cljs.core.async.t11441.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11441.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});
cljs.core.async.t11441.prototype.cljs$core$async$impl$protocols$Handler$lock_id$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.lock_id.call(null,self__.fn1);
});
cljs.core.async.t11441.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);return ((function (f1,___$4){
return (function (p1__11431_SHARP_){return f1.call(null,(((p1__11431_SHARP_ == null))?null:self__.f.call(null,p1__11431_SHARP_)));
});
;})(f1,___$4))
});
cljs.core.async.t11441.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11443){var self__ = this;
var _11443__$1 = this;return self__.meta11442;
});
cljs.core.async.t11441.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11443,meta11442__$1){var self__ = this;
var _11443__$1 = this;return (new cljs.core.async.t11441(self__.fn1,self__._,self__.meta11439,self__.ch,self__.f,self__.map_LT_,meta11442__$1));
});
cljs.core.async.__GT_t11441 = (function __GT_t11441(fn1__$1,___$2,meta11439__$1,ch__$2,f__$2,map_LT___$2,meta11442){return (new cljs.core.async.t11441(fn1__$1,___$2,meta11439__$1,ch__$2,f__$2,map_LT___$2,meta11442));
});
}
return (new cljs.core.async.t11441(fn1,___$1,self__.meta11439,self__.ch,self__.f,self__.map_LT_,null));
})());if(cljs.core.truth_((function (){var and__3410__auto__ = ret;if(cljs.core.truth_(and__3410__auto__))
{return !((cljs.core.deref.call(null,ret) == null));
} else
{return and__3410__auto__;
}
})()))
{return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else
{return ret;
}
});
cljs.core.async.t11438.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t11438.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t11438.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11440){var self__ = this;
var _11440__$1 = this;return self__.meta11439;
});
cljs.core.async.t11438.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11440,meta11439__$1){var self__ = this;
var _11440__$1 = this;return (new cljs.core.async.t11438(self__.ch,self__.f,self__.map_LT_,meta11439__$1));
});
cljs.core.async.__GT_t11438 = (function __GT_t11438(ch__$1,f__$1,map_LT___$1,meta11439){return (new cljs.core.async.t11438(ch__$1,f__$1,map_LT___$1,meta11439));
});
}
return (new cljs.core.async.t11438(ch,f,map_LT_,null));
});
/**
* Takes a function and a target channel, and returns a channel which
* applies f to each value before supplying it to the target channel.
*/
cljs.core.async.map_GT_ = (function map_GT_(f,ch){if(typeof cljs.core.async.t11447 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11447 = (function (ch,f,map_GT_,meta11448){
this.ch = ch;
this.f = f;
this.map_GT_ = map_GT_;
this.meta11448 = meta11448;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11447.cljs$lang$type = true;
cljs.core.async.t11447.cljs$lang$ctorStr = "cljs.core.async/t11447";
cljs.core.async.t11447.cljs$lang$ctorPrWriter = (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.async/t11447");
});
cljs.core.async.t11447.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t11447.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn0);
});
cljs.core.async.t11447.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t11447.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t11447.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t11447.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t11447.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11449){var self__ = this;
var _11449__$1 = this;return self__.meta11448;
});
cljs.core.async.t11447.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11449,meta11448__$1){var self__ = this;
var _11449__$1 = this;return (new cljs.core.async.t11447(self__.ch,self__.f,self__.map_GT_,meta11448__$1));
});
cljs.core.async.__GT_t11447 = (function __GT_t11447(ch__$1,f__$1,map_GT___$1,meta11448){return (new cljs.core.async.t11447(ch__$1,f__$1,map_GT___$1,meta11448));
});
}
return (new cljs.core.async.t11447(ch,f,map_GT_,null));
});
/**
* Takes a predicate and a target channel, and returns a channel which
* supplies only the values for which the predicate returns true to the
* target channel.
*/
cljs.core.async.filter_GT_ = (function filter_GT_(p,ch){if(typeof cljs.core.async.t11453 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11453 = (function (ch,p,filter_GT_,meta11454){
this.ch = ch;
this.p = p;
this.filter_GT_ = filter_GT_;
this.meta11454 = meta11454;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11453.cljs$lang$type = true;
cljs.core.async.t11453.cljs$lang$ctorStr = "cljs.core.async/t11453";
cljs.core.async.t11453.cljs$lang$ctorPrWriter = (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.async/t11453");
});
cljs.core.async.t11453.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t11453.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.p.call(null,val)))
{return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn0);
} else
{return cljs.core.async.impl.channels.box.call(null,null);
}
});
cljs.core.async.t11453.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t11453.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t11453.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t11453.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t11453.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11455){var self__ = this;
var _11455__$1 = this;return self__.meta11454;
});
cljs.core.async.t11453.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11455,meta11454__$1){var self__ = this;
var _11455__$1 = this;return (new cljs.core.async.t11453(self__.ch,self__.p,self__.filter_GT_,meta11454__$1));
});
cljs.core.async.__GT_t11453 = (function __GT_t11453(ch__$1,p__$1,filter_GT___$1,meta11454){return (new cljs.core.async.t11453(ch__$1,p__$1,filter_GT___$1,meta11454));
});
}
return (new cljs.core.async.t11453(ch,p,filter_GT_,null));
});
/**
* Takes a predicate and a target channel, and returns a channel which
* supplies only the values for which the predicate returns false to the
* target channel.
*/
cljs.core.async.remove_GT_ = (function remove_GT_(p,ch){return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
* Takes a predicate and a source channel, and returns a channel which
* contains only the values taken from the source channel for which the
* predicate returns true. The returned channel will be unbuffered by
* default, or a buf-or-n can be supplied. The channel will close
* when the source channel closes.
*/
cljs.core.async.filter_LT_ = (function() {
var filter_LT_ = null;
var filter_LT___2 = (function (p,ch){return filter_LT_.call(null,p,ch,null);
});
var filter_LT___3 = (function (p,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6387__auto___11538 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_11517){var state_val_11518 = (state_11517[1]);if((state_val_11518 === 1))
{var state_11517__$1 = state_11517;var statearr_11519_11539 = state_11517__$1;(statearr_11519_11539[2] = null);
(statearr_11519_11539[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11518 === 2))
{var state_11517__$1 = state_11517;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11517__$1,4,ch);
} else
{if((state_val_11518 === 3))
{var inst_11515 = (state_11517[2]);var state_11517__$1 = state_11517;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11517__$1,inst_11515);
} else
{if((state_val_11518 === 4))
{var inst_11499 = (state_11517[7]);var inst_11499__$1 = (state_11517[2]);var inst_11500 = (inst_11499__$1 == null);var state_11517__$1 = (function (){var statearr_11520 = state_11517;(statearr_11520[7] = inst_11499__$1);
return statearr_11520;
})();if(cljs.core.truth_(inst_11500))
{var statearr_11521_11540 = state_11517__$1;(statearr_11521_11540[1] = 5);
} else
{var statearr_11522_11541 = state_11517__$1;(statearr_11522_11541[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11518 === 5))
{var inst_11502 = cljs.core.async.close_BANG_.call(null,out);var state_11517__$1 = state_11517;var statearr_11523_11542 = state_11517__$1;(statearr_11523_11542[2] = inst_11502);
(statearr_11523_11542[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11518 === 6))
{var inst_11499 = (state_11517[7]);var inst_11504 = p.call(null,inst_11499);var state_11517__$1 = state_11517;if(cljs.core.truth_(inst_11504))
{var statearr_11524_11543 = state_11517__$1;(statearr_11524_11543[1] = 8);
} else
{var statearr_11525_11544 = state_11517__$1;(statearr_11525_11544[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11518 === 7))
{var inst_11513 = (state_11517[2]);var state_11517__$1 = state_11517;var statearr_11526_11545 = state_11517__$1;(statearr_11526_11545[2] = inst_11513);
(statearr_11526_11545[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11518 === 8))
{var inst_11499 = (state_11517[7]);var state_11517__$1 = state_11517;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11517__$1,11,out,inst_11499);
} else
{if((state_val_11518 === 9))
{var state_11517__$1 = state_11517;var statearr_11527_11546 = state_11517__$1;(statearr_11527_11546[2] = null);
(statearr_11527_11546[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11518 === 10))
{var inst_11510 = (state_11517[2]);var state_11517__$1 = (function (){var statearr_11528 = state_11517;(statearr_11528[8] = inst_11510);
return statearr_11528;
})();var statearr_11529_11547 = state_11517__$1;(statearr_11529_11547[2] = null);
(statearr_11529_11547[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11518 === 11))
{var inst_11507 = (state_11517[2]);var state_11517__$1 = state_11517;var statearr_11530_11548 = state_11517__$1;(statearr_11530_11548[2] = inst_11507);
(statearr_11530_11548[1] = 10);
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
}
}
}
});return ((function (switch__6317__auto__){
return (function() {
var state_machine__6318__auto__ = null;
var state_machine__6318__auto____0 = (function (){var statearr_11534 = [null,null,null,null,null,null,null,null,null];(statearr_11534[0] = state_machine__6318__auto__);
(statearr_11534[1] = 1);
return statearr_11534;
});
var state_machine__6318__auto____1 = (function (state_11517){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_11517);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e11535){if((e11535 instanceof Object))
{var ex__6321__auto__ = e11535;var statearr_11536_11549 = state_11517;(statearr_11536_11549[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11517);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e11535;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__11550 = state_11517;
state_11517 = G__11550;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_11517){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_11517);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_11537 = f__6388__auto__.call(null);(statearr_11537[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto___11538);
return statearr_11537;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return out;
});
filter_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return filter_LT___2.call(this,p,ch);
case 3:
return filter_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
filter_LT_.cljs$core$IFn$_invoke$arity$2 = filter_LT___2;
filter_LT_.cljs$core$IFn$_invoke$arity$3 = filter_LT___3;
return filter_LT_;
})()
;
/**
* Takes a predicate and a source channel, and returns a channel which
* contains only the values taken from the source channel for which the
* predicate returns false. The returned channel will be unbuffered by
* default, or a buf-or-n can be supplied. The channel will close
* when the source channel closes.
*/
cljs.core.async.remove_LT_ = (function() {
var remove_LT_ = null;
var remove_LT___2 = (function (p,ch){return remove_LT_.call(null,p,ch,null);
});
var remove_LT___3 = (function (p,ch,buf_or_n){return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});
remove_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return remove_LT___2.call(this,p,ch);
case 3:
return remove_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
remove_LT_.cljs$core$IFn$_invoke$arity$2 = remove_LT___2;
remove_LT_.cljs$core$IFn$_invoke$arity$3 = remove_LT___3;
return remove_LT_;
})()
;
cljs.core.async.mapcat_STAR_ = (function mapcat_STAR_(f,in$,out){var c__6387__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_11702){var state_val_11703 = (state_11702[1]);if((state_val_11703 === 1))
{var state_11702__$1 = state_11702;var statearr_11704_11741 = state_11702__$1;(statearr_11704_11741[2] = null);
(statearr_11704_11741[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11703 === 2))
{var state_11702__$1 = state_11702;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11702__$1,4,in$);
} else
{if((state_val_11703 === 3))
{var inst_11700 = (state_11702[2]);var state_11702__$1 = state_11702;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11702__$1,inst_11700);
} else
{if((state_val_11703 === 4))
{var inst_11648 = (state_11702[7]);var inst_11648__$1 = (state_11702[2]);var inst_11649 = (inst_11648__$1 == null);var state_11702__$1 = (function (){var statearr_11705 = state_11702;(statearr_11705[7] = inst_11648__$1);
return statearr_11705;
})();if(cljs.core.truth_(inst_11649))
{var statearr_11706_11742 = state_11702__$1;(statearr_11706_11742[1] = 5);
} else
{var statearr_11707_11743 = state_11702__$1;(statearr_11707_11743[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11703 === 5))
{var inst_11651 = cljs.core.async.close_BANG_.call(null,out);var state_11702__$1 = state_11702;var statearr_11708_11744 = state_11702__$1;(statearr_11708_11744[2] = inst_11651);
(statearr_11708_11744[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11703 === 6))
{var inst_11648 = (state_11702[7]);var inst_11653 = f.call(null,inst_11648);var inst_11658 = cljs.core.seq.call(null,inst_11653);var inst_11659 = inst_11658;var inst_11660 = null;var inst_11661 = 0;var inst_11662 = 0;var state_11702__$1 = (function (){var statearr_11709 = state_11702;(statearr_11709[8] = inst_11662);
(statearr_11709[9] = inst_11661);
(statearr_11709[10] = inst_11660);
(statearr_11709[11] = inst_11659);
return statearr_11709;
})();var statearr_11710_11745 = state_11702__$1;(statearr_11710_11745[2] = null);
(statearr_11710_11745[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11703 === 7))
{var inst_11698 = (state_11702[2]);var state_11702__$1 = state_11702;var statearr_11711_11746 = state_11702__$1;(statearr_11711_11746[2] = inst_11698);
(statearr_11711_11746[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11703 === 8))
{var inst_11662 = (state_11702[8]);var inst_11661 = (state_11702[9]);var inst_11664 = (inst_11662 < inst_11661);var inst_11665 = inst_11664;var state_11702__$1 = state_11702;if(cljs.core.truth_(inst_11665))
{var statearr_11712_11747 = state_11702__$1;(statearr_11712_11747[1] = 10);
} else
{var statearr_11713_11748 = state_11702__$1;(statearr_11713_11748[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11703 === 9))
{var inst_11695 = (state_11702[2]);var state_11702__$1 = (function (){var statearr_11714 = state_11702;(statearr_11714[12] = inst_11695);
return statearr_11714;
})();var statearr_11715_11749 = state_11702__$1;(statearr_11715_11749[2] = null);
(statearr_11715_11749[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11703 === 10))
{var inst_11662 = (state_11702[8]);var inst_11660 = (state_11702[10]);var inst_11667 = cljs.core._nth.call(null,inst_11660,inst_11662);var state_11702__$1 = state_11702;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11702__$1,13,out,inst_11667);
} else
{if((state_val_11703 === 11))
{var inst_11659 = (state_11702[11]);var inst_11673 = (state_11702[13]);var inst_11673__$1 = cljs.core.seq.call(null,inst_11659);var state_11702__$1 = (function (){var statearr_11719 = state_11702;(statearr_11719[13] = inst_11673__$1);
return statearr_11719;
})();if(inst_11673__$1)
{var statearr_11720_11750 = state_11702__$1;(statearr_11720_11750[1] = 14);
} else
{var statearr_11721_11751 = state_11702__$1;(statearr_11721_11751[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11703 === 12))
{var inst_11693 = (state_11702[2]);var state_11702__$1 = state_11702;var statearr_11722_11752 = state_11702__$1;(statearr_11722_11752[2] = inst_11693);
(statearr_11722_11752[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11703 === 13))
{var inst_11662 = (state_11702[8]);var inst_11661 = (state_11702[9]);var inst_11660 = (state_11702[10]);var inst_11659 = (state_11702[11]);var inst_11669 = (state_11702[2]);var inst_11670 = (inst_11662 + 1);var tmp11716 = inst_11661;var tmp11717 = inst_11660;var tmp11718 = inst_11659;var inst_11659__$1 = tmp11718;var inst_11660__$1 = tmp11717;var inst_11661__$1 = tmp11716;var inst_11662__$1 = inst_11670;var state_11702__$1 = (function (){var statearr_11723 = state_11702;(statearr_11723[14] = inst_11669);
(statearr_11723[8] = inst_11662__$1);
(statearr_11723[9] = inst_11661__$1);
(statearr_11723[10] = inst_11660__$1);
(statearr_11723[11] = inst_11659__$1);
return statearr_11723;
})();var statearr_11724_11753 = state_11702__$1;(statearr_11724_11753[2] = null);
(statearr_11724_11753[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11703 === 14))
{var inst_11673 = (state_11702[13]);var inst_11675 = cljs.core.chunked_seq_QMARK_.call(null,inst_11673);var state_11702__$1 = state_11702;if(inst_11675)
{var statearr_11725_11754 = state_11702__$1;(statearr_11725_11754[1] = 17);
} else
{var statearr_11726_11755 = state_11702__$1;(statearr_11726_11755[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11703 === 15))
{var state_11702__$1 = state_11702;var statearr_11727_11756 = state_11702__$1;(statearr_11727_11756[2] = null);
(statearr_11727_11756[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11703 === 16))
{var inst_11691 = (state_11702[2]);var state_11702__$1 = state_11702;var statearr_11728_11757 = state_11702__$1;(statearr_11728_11757[2] = inst_11691);
(statearr_11728_11757[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11703 === 17))
{var inst_11673 = (state_11702[13]);var inst_11677 = cljs.core.chunk_first.call(null,inst_11673);var inst_11678 = cljs.core.chunk_rest.call(null,inst_11673);var inst_11679 = cljs.core.count.call(null,inst_11677);var inst_11659 = inst_11678;var inst_11660 = inst_11677;var inst_11661 = inst_11679;var inst_11662 = 0;var state_11702__$1 = (function (){var statearr_11729 = state_11702;(statearr_11729[8] = inst_11662);
(statearr_11729[9] = inst_11661);
(statearr_11729[10] = inst_11660);
(statearr_11729[11] = inst_11659);
return statearr_11729;
})();var statearr_11730_11758 = state_11702__$1;(statearr_11730_11758[2] = null);
(statearr_11730_11758[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11703 === 18))
{var inst_11673 = (state_11702[13]);var inst_11682 = cljs.core.first.call(null,inst_11673);var state_11702__$1 = state_11702;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11702__$1,20,out,inst_11682);
} else
{if((state_val_11703 === 19))
{var inst_11688 = (state_11702[2]);var state_11702__$1 = state_11702;var statearr_11731_11759 = state_11702__$1;(statearr_11731_11759[2] = inst_11688);
(statearr_11731_11759[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11703 === 20))
{var inst_11673 = (state_11702[13]);var inst_11684 = (state_11702[2]);var inst_11685 = cljs.core.next.call(null,inst_11673);var inst_11659 = inst_11685;var inst_11660 = null;var inst_11661 = 0;var inst_11662 = 0;var state_11702__$1 = (function (){var statearr_11732 = state_11702;(statearr_11732[8] = inst_11662);
(statearr_11732[9] = inst_11661);
(statearr_11732[10] = inst_11660);
(statearr_11732[15] = inst_11684);
(statearr_11732[11] = inst_11659);
return statearr_11732;
})();var statearr_11733_11760 = state_11702__$1;(statearr_11733_11760[2] = null);
(statearr_11733_11760[1] = 8);
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
}
}
}
}
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
var state_machine__6318__auto____0 = (function (){var statearr_11737 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_11737[0] = state_machine__6318__auto__);
(statearr_11737[1] = 1);
return statearr_11737;
});
var state_machine__6318__auto____1 = (function (state_11702){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_11702);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e11738){if((e11738 instanceof Object))
{var ex__6321__auto__ = e11738;var statearr_11739_11761 = state_11702;(statearr_11739_11761[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11702);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e11738;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__11762 = state_11702;
state_11702 = G__11762;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_11702){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_11702);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_11740 = f__6388__auto__.call(null);(statearr_11740[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto__);
return statearr_11740;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return c__6387__auto__;
});
/**
* Takes a function and a source channel, and returns a channel which
* contains the values in each collection produced by applying f to
* each value taken from the source channel. f must return a
* collection.
* 
* The returned channel will be unbuffered by default, or a buf-or-n
* can be supplied. The channel will close when the source channel
* closes.
*/
cljs.core.async.mapcat_LT_ = (function() {
var mapcat_LT_ = null;
var mapcat_LT___2 = (function (f,in$){return mapcat_LT_.call(null,f,in$,null);
});
var mapcat_LT___3 = (function (f,in$,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);cljs.core.async.mapcat_STAR_.call(null,f,in$,out);
return out;
});
mapcat_LT_ = function(f,in$,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_LT___2.call(this,f,in$);
case 3:
return mapcat_LT___3.call(this,f,in$,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = mapcat_LT___2;
mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = mapcat_LT___3;
return mapcat_LT_;
})()
;
/**
* Takes a function and a target channel, and returns a channel which
* applies f to each value put, then supplies each element of the result
* to the target channel. f must return a collection.
* 
* The returned channel will be unbuffered by default, or a buf-or-n
* can be supplied. The target channel will be closed when the source
* channel closes.
*/
cljs.core.async.mapcat_GT_ = (function() {
var mapcat_GT_ = null;
var mapcat_GT___2 = (function (f,out){return mapcat_GT_.call(null,f,out,null);
});
var mapcat_GT___3 = (function (f,out,buf_or_n){var in$ = cljs.core.async.chan.call(null,buf_or_n);cljs.core.async.mapcat_STAR_.call(null,f,in$,out);
return in$;
});
mapcat_GT_ = function(f,out,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_GT___2.call(this,f,out);
case 3:
return mapcat_GT___3.call(this,f,out,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = mapcat_GT___2;
mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = mapcat_GT___3;
return mapcat_GT_;
})()
;
/**
* Takes elements from the from channel and supplies them to the to
* channel. By default, the to channel will be closed when the
* from channel closes, but can be determined by the close?
* parameter.
*/
cljs.core.async.pipe = (function() {
var pipe = null;
var pipe__2 = (function (from,to){return pipe.call(null,from,to,true);
});
var pipe__3 = (function (from,to,close_QMARK_){var c__6387__auto___11843 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_11822){var state_val_11823 = (state_11822[1]);if((state_val_11823 === 1))
{var state_11822__$1 = state_11822;var statearr_11824_11844 = state_11822__$1;(statearr_11824_11844[2] = null);
(statearr_11824_11844[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11823 === 2))
{var state_11822__$1 = state_11822;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11822__$1,4,from);
} else
{if((state_val_11823 === 3))
{var inst_11820 = (state_11822[2]);var state_11822__$1 = state_11822;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11822__$1,inst_11820);
} else
{if((state_val_11823 === 4))
{var inst_11805 = (state_11822[7]);var inst_11805__$1 = (state_11822[2]);var inst_11806 = (inst_11805__$1 == null);var state_11822__$1 = (function (){var statearr_11825 = state_11822;(statearr_11825[7] = inst_11805__$1);
return statearr_11825;
})();if(cljs.core.truth_(inst_11806))
{var statearr_11826_11845 = state_11822__$1;(statearr_11826_11845[1] = 5);
} else
{var statearr_11827_11846 = state_11822__$1;(statearr_11827_11846[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11823 === 5))
{var state_11822__$1 = state_11822;if(cljs.core.truth_(close_QMARK_))
{var statearr_11828_11847 = state_11822__$1;(statearr_11828_11847[1] = 8);
} else
{var statearr_11829_11848 = state_11822__$1;(statearr_11829_11848[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11823 === 6))
{var inst_11805 = (state_11822[7]);var state_11822__$1 = state_11822;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11822__$1,11,to,inst_11805);
} else
{if((state_val_11823 === 7))
{var inst_11818 = (state_11822[2]);var state_11822__$1 = state_11822;var statearr_11830_11849 = state_11822__$1;(statearr_11830_11849[2] = inst_11818);
(statearr_11830_11849[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11823 === 8))
{var inst_11809 = cljs.core.async.close_BANG_.call(null,to);var state_11822__$1 = state_11822;var statearr_11831_11850 = state_11822__$1;(statearr_11831_11850[2] = inst_11809);
(statearr_11831_11850[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11823 === 9))
{var state_11822__$1 = state_11822;var statearr_11832_11851 = state_11822__$1;(statearr_11832_11851[2] = null);
(statearr_11832_11851[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11823 === 10))
{var inst_11812 = (state_11822[2]);var state_11822__$1 = state_11822;var statearr_11833_11852 = state_11822__$1;(statearr_11833_11852[2] = inst_11812);
(statearr_11833_11852[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11823 === 11))
{var inst_11815 = (state_11822[2]);var state_11822__$1 = (function (){var statearr_11834 = state_11822;(statearr_11834[8] = inst_11815);
return statearr_11834;
})();var statearr_11835_11853 = state_11822__$1;(statearr_11835_11853[2] = null);
(statearr_11835_11853[1] = 2);
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
}
}
}
});return ((function (switch__6317__auto__){
return (function() {
var state_machine__6318__auto__ = null;
var state_machine__6318__auto____0 = (function (){var statearr_11839 = [null,null,null,null,null,null,null,null,null];(statearr_11839[0] = state_machine__6318__auto__);
(statearr_11839[1] = 1);
return statearr_11839;
});
var state_machine__6318__auto____1 = (function (state_11822){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_11822);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e11840){if((e11840 instanceof Object))
{var ex__6321__auto__ = e11840;var statearr_11841_11854 = state_11822;(statearr_11841_11854[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11822);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e11840;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__11855 = state_11822;
state_11822 = G__11855;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_11822){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_11822);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_11842 = f__6388__auto__.call(null);(statearr_11842[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto___11843);
return statearr_11842;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return to;
});
pipe = function(from,to,close_QMARK_){
switch(arguments.length){
case 2:
return pipe__2.call(this,from,to);
case 3:
return pipe__3.call(this,from,to,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pipe.cljs$core$IFn$_invoke$arity$2 = pipe__2;
pipe.cljs$core$IFn$_invoke$arity$3 = pipe__3;
return pipe;
})()
;
/**
* Takes a predicate and a source channel and returns a vector of two
* channels, the first of which will contain the values for which the
* predicate returned true, the second those for which it returned
* false.
* 
* The out channels will be unbuffered by default, or two buf-or-ns can
* be supplied. The channels will close after the source channel has
* closed.
*/
cljs.core.async.split = (function() {
var split = null;
var split__2 = (function (p,ch){return split.call(null,p,ch,null,null);
});
var split__4 = (function (p,ch,t_buf_or_n,f_buf_or_n){var tc = cljs.core.async.chan.call(null,t_buf_or_n);var fc = cljs.core.async.chan.call(null,f_buf_or_n);var c__6387__auto___11942 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_11920){var state_val_11921 = (state_11920[1]);if((state_val_11921 === 1))
{var state_11920__$1 = state_11920;var statearr_11922_11943 = state_11920__$1;(statearr_11922_11943[2] = null);
(statearr_11922_11943[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11921 === 2))
{var state_11920__$1 = state_11920;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11920__$1,4,ch);
} else
{if((state_val_11921 === 3))
{var inst_11918 = (state_11920[2]);var state_11920__$1 = state_11920;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11920__$1,inst_11918);
} else
{if((state_val_11921 === 4))
{var inst_11901 = (state_11920[7]);var inst_11901__$1 = (state_11920[2]);var inst_11902 = (inst_11901__$1 == null);var state_11920__$1 = (function (){var statearr_11923 = state_11920;(statearr_11923[7] = inst_11901__$1);
return statearr_11923;
})();if(cljs.core.truth_(inst_11902))
{var statearr_11924_11944 = state_11920__$1;(statearr_11924_11944[1] = 5);
} else
{var statearr_11925_11945 = state_11920__$1;(statearr_11925_11945[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11921 === 5))
{var inst_11904 = cljs.core.async.close_BANG_.call(null,tc);var inst_11905 = cljs.core.async.close_BANG_.call(null,fc);var state_11920__$1 = (function (){var statearr_11926 = state_11920;(statearr_11926[8] = inst_11904);
return statearr_11926;
})();var statearr_11927_11946 = state_11920__$1;(statearr_11927_11946[2] = inst_11905);
(statearr_11927_11946[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11921 === 6))
{var inst_11901 = (state_11920[7]);var inst_11907 = p.call(null,inst_11901);var state_11920__$1 = state_11920;if(cljs.core.truth_(inst_11907))
{var statearr_11928_11947 = state_11920__$1;(statearr_11928_11947[1] = 9);
} else
{var statearr_11929_11948 = state_11920__$1;(statearr_11929_11948[1] = 10);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11921 === 7))
{var inst_11916 = (state_11920[2]);var state_11920__$1 = state_11920;var statearr_11930_11949 = state_11920__$1;(statearr_11930_11949[2] = inst_11916);
(statearr_11930_11949[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11921 === 8))
{var inst_11913 = (state_11920[2]);var state_11920__$1 = (function (){var statearr_11931 = state_11920;(statearr_11931[9] = inst_11913);
return statearr_11931;
})();var statearr_11932_11950 = state_11920__$1;(statearr_11932_11950[2] = null);
(statearr_11932_11950[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11921 === 9))
{var state_11920__$1 = state_11920;var statearr_11933_11951 = state_11920__$1;(statearr_11933_11951[2] = tc);
(statearr_11933_11951[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11921 === 10))
{var state_11920__$1 = state_11920;var statearr_11934_11952 = state_11920__$1;(statearr_11934_11952[2] = fc);
(statearr_11934_11952[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_11921 === 11))
{var inst_11901 = (state_11920[7]);var inst_11911 = (state_11920[2]);var state_11920__$1 = state_11920;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11920__$1,8,inst_11911,inst_11901);
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
}
}
});return ((function (switch__6317__auto__){
return (function() {
var state_machine__6318__auto__ = null;
var state_machine__6318__auto____0 = (function (){var statearr_11938 = [null,null,null,null,null,null,null,null,null,null];(statearr_11938[0] = state_machine__6318__auto__);
(statearr_11938[1] = 1);
return statearr_11938;
});
var state_machine__6318__auto____1 = (function (state_11920){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_11920);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e11939){if((e11939 instanceof Object))
{var ex__6321__auto__ = e11939;var statearr_11940_11953 = state_11920;(statearr_11940_11953[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11920);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e11939;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__11954 = state_11920;
state_11920 = G__11954;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_11920){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_11920);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_11941 = f__6388__auto__.call(null);(statearr_11941[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto___11942);
return statearr_11941;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});
split = function(p,ch,t_buf_or_n,f_buf_or_n){
switch(arguments.length){
case 2:
return split__2.call(this,p,ch);
case 4:
return split__4.call(this,p,ch,t_buf_or_n,f_buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
split.cljs$core$IFn$_invoke$arity$2 = split__2;
split.cljs$core$IFn$_invoke$arity$4 = split__4;
return split;
})()
;
/**
* f should be a function of 2 arguments. Returns a channel containing
* the single result of applying f to init and the first item from the
* channel, then applying f to that result and the 2nd item, etc. If
* the channel closes without yielding items, returns init and f is not
* called. ch must close before reduce produces a result.
*/
cljs.core.async.reduce = (function reduce(f,init,ch){var c__6387__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_12001){var state_val_12002 = (state_12001[1]);if((state_val_12002 === 7))
{var inst_11997 = (state_12001[2]);var state_12001__$1 = state_12001;var statearr_12003_12019 = state_12001__$1;(statearr_12003_12019[2] = inst_11997);
(statearr_12003_12019[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12002 === 6))
{var inst_11990 = (state_12001[7]);var inst_11987 = (state_12001[8]);var inst_11994 = f.call(null,inst_11987,inst_11990);var inst_11987__$1 = inst_11994;var state_12001__$1 = (function (){var statearr_12004 = state_12001;(statearr_12004[8] = inst_11987__$1);
return statearr_12004;
})();var statearr_12005_12020 = state_12001__$1;(statearr_12005_12020[2] = null);
(statearr_12005_12020[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12002 === 5))
{var inst_11987 = (state_12001[8]);var state_12001__$1 = state_12001;var statearr_12006_12021 = state_12001__$1;(statearr_12006_12021[2] = inst_11987);
(statearr_12006_12021[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12002 === 4))
{var inst_11990 = (state_12001[7]);var inst_11990__$1 = (state_12001[2]);var inst_11991 = (inst_11990__$1 == null);var state_12001__$1 = (function (){var statearr_12007 = state_12001;(statearr_12007[7] = inst_11990__$1);
return statearr_12007;
})();if(cljs.core.truth_(inst_11991))
{var statearr_12008_12022 = state_12001__$1;(statearr_12008_12022[1] = 5);
} else
{var statearr_12009_12023 = state_12001__$1;(statearr_12009_12023[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12002 === 3))
{var inst_11999 = (state_12001[2]);var state_12001__$1 = state_12001;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12001__$1,inst_11999);
} else
{if((state_val_12002 === 2))
{var state_12001__$1 = state_12001;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12001__$1,4,ch);
} else
{if((state_val_12002 === 1))
{var inst_11987 = init;var state_12001__$1 = (function (){var statearr_12010 = state_12001;(statearr_12010[8] = inst_11987);
return statearr_12010;
})();var statearr_12011_12024 = state_12001__$1;(statearr_12011_12024[2] = null);
(statearr_12011_12024[1] = 2);
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
});return ((function (switch__6317__auto__){
return (function() {
var state_machine__6318__auto__ = null;
var state_machine__6318__auto____0 = (function (){var statearr_12015 = [null,null,null,null,null,null,null,null,null];(statearr_12015[0] = state_machine__6318__auto__);
(statearr_12015[1] = 1);
return statearr_12015;
});
var state_machine__6318__auto____1 = (function (state_12001){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_12001);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e12016){if((e12016 instanceof Object))
{var ex__6321__auto__ = e12016;var statearr_12017_12025 = state_12001;(statearr_12017_12025[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12001);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e12016;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__12026 = state_12001;
state_12001 = G__12026;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_12001){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_12001);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_12018 = f__6388__auto__.call(null);(statearr_12018[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto__);
return statearr_12018;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return c__6387__auto__;
});
/**
* Puts the contents of coll into the supplied channel.
* 
* By default the channel will be closed after the items are copied,
* but can be determined by the close? parameter.
* 
* Returns a channel which will close after the items are copied.
*/
cljs.core.async.onto_chan = (function() {
var onto_chan = null;
var onto_chan__2 = (function (ch,coll){return onto_chan.call(null,ch,coll,true);
});
var onto_chan__3 = (function (ch,coll,close_QMARK_){var c__6387__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_12088){var state_val_12089 = (state_12088[1]);if((state_val_12089 === 1))
{var inst_12068 = cljs.core.seq.call(null,coll);var inst_12069 = inst_12068;var state_12088__$1 = (function (){var statearr_12090 = state_12088;(statearr_12090[7] = inst_12069);
return statearr_12090;
})();var statearr_12091_12109 = state_12088__$1;(statearr_12091_12109[2] = null);
(statearr_12091_12109[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12089 === 2))
{var inst_12069 = (state_12088[7]);var state_12088__$1 = state_12088;if(cljs.core.truth_(inst_12069))
{var statearr_12092_12110 = state_12088__$1;(statearr_12092_12110[1] = 4);
} else
{var statearr_12093_12111 = state_12088__$1;(statearr_12093_12111[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12089 === 3))
{var inst_12086 = (state_12088[2]);var state_12088__$1 = state_12088;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12088__$1,inst_12086);
} else
{if((state_val_12089 === 4))
{var inst_12069 = (state_12088[7]);var inst_12072 = cljs.core.first.call(null,inst_12069);var state_12088__$1 = state_12088;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12088__$1,7,ch,inst_12072);
} else
{if((state_val_12089 === 5))
{var state_12088__$1 = state_12088;if(cljs.core.truth_(close_QMARK_))
{var statearr_12094_12112 = state_12088__$1;(statearr_12094_12112[1] = 8);
} else
{var statearr_12095_12113 = state_12088__$1;(statearr_12095_12113[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12089 === 6))
{var inst_12084 = (state_12088[2]);var state_12088__$1 = state_12088;var statearr_12096_12114 = state_12088__$1;(statearr_12096_12114[2] = inst_12084);
(statearr_12096_12114[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12089 === 7))
{var inst_12069 = (state_12088[7]);var inst_12074 = (state_12088[2]);var inst_12075 = cljs.core.next.call(null,inst_12069);var inst_12069__$1 = inst_12075;var state_12088__$1 = (function (){var statearr_12097 = state_12088;(statearr_12097[8] = inst_12074);
(statearr_12097[7] = inst_12069__$1);
return statearr_12097;
})();var statearr_12098_12115 = state_12088__$1;(statearr_12098_12115[2] = null);
(statearr_12098_12115[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12089 === 8))
{var inst_12079 = cljs.core.async.close_BANG_.call(null,ch);var state_12088__$1 = state_12088;var statearr_12099_12116 = state_12088__$1;(statearr_12099_12116[2] = inst_12079);
(statearr_12099_12116[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12089 === 9))
{var state_12088__$1 = state_12088;var statearr_12100_12117 = state_12088__$1;(statearr_12100_12117[2] = null);
(statearr_12100_12117[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12089 === 10))
{var inst_12082 = (state_12088[2]);var state_12088__$1 = state_12088;var statearr_12101_12118 = state_12088__$1;(statearr_12101_12118[2] = inst_12082);
(statearr_12101_12118[1] = 6);
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
}
}
});return ((function (switch__6317__auto__){
return (function() {
var state_machine__6318__auto__ = null;
var state_machine__6318__auto____0 = (function (){var statearr_12105 = [null,null,null,null,null,null,null,null,null];(statearr_12105[0] = state_machine__6318__auto__);
(statearr_12105[1] = 1);
return statearr_12105;
});
var state_machine__6318__auto____1 = (function (state_12088){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_12088);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e12106){if((e12106 instanceof Object))
{var ex__6321__auto__ = e12106;var statearr_12107_12119 = state_12088;(statearr_12107_12119[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12088);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e12106;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__12120 = state_12088;
state_12088 = G__12120;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_12088){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_12088);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_12108 = f__6388__auto__.call(null);(statearr_12108[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto__);
return statearr_12108;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return c__6387__auto__;
});
onto_chan = function(ch,coll,close_QMARK_){
switch(arguments.length){
case 2:
return onto_chan__2.call(this,ch,coll);
case 3:
return onto_chan__3.call(this,ch,coll,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
onto_chan.cljs$core$IFn$_invoke$arity$2 = onto_chan__2;
onto_chan.cljs$core$IFn$_invoke$arity$3 = onto_chan__3;
return onto_chan;
})()
;
/**
* Creates and returns a channel which contains the contents of coll,
* closing when exhausted.
*/
cljs.core.async.to_chan = (function to_chan(coll){var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,100,coll));cljs.core.async.onto_chan.call(null,ch,coll);
return ch;
});
cljs.core.async.Mux = (function (){var obj12122 = {};return obj12122;
})();
cljs.core.async.muxch_STAR_ = (function muxch_STAR_(_){if((function (){var and__3410__auto__ = _;if(and__3410__auto__)
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1;
} else
{return and__3410__auto__;
}
})())
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else
{var x__4043__auto__ = (((_ == null))?null:_);return (function (){var or__3422__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
})().call(null,_);
}
});
cljs.core.async.Mult = (function (){var obj12124 = {};return obj12124;
})();
cljs.core.async.tap_STAR_ = (function tap_STAR_(m,ch,close_QMARK_){if((function (){var and__3410__auto__ = m;if(and__3410__auto__)
{return m.cljs$core$async$Mult$tap_STAR_$arity$3;
} else
{return and__3410__auto__;
}
})())
{return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else
{var x__4043__auto__ = (((m == null))?null:m);return (function (){var or__3422__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.async.tap_STAR_["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
})().call(null,m,ch,close_QMARK_);
}
});
cljs.core.async.untap_STAR_ = (function untap_STAR_(m,ch){if((function (){var and__3410__auto__ = m;if(and__3410__auto__)
{return m.cljs$core$async$Mult$untap_STAR_$arity$2;
} else
{return and__3410__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else
{var x__4043__auto__ = (((m == null))?null:m);return (function (){var or__3422__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.async.untap_STAR_["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.untap_all_STAR_ = (function untap_all_STAR_(m){if((function (){var and__3410__auto__ = m;if(and__3410__auto__)
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1;
} else
{return and__3410__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else
{var x__4043__auto__ = (((m == null))?null:m);return (function (){var or__3422__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
})().call(null,m);
}
});
/**
* Creates and returns a mult(iple) of the supplied channel. Channels
* containing copies of the channel can be created with 'tap', and
* detached with 'untap'.
* 
* Each item is distributed to all taps in parallel and synchronously,
* i.e. each tap must accept before the next item is distributed. Use
* buffering/windowing to prevent slow taps from holding up the mult.
* 
* If a tap put throws an exception, it will be removed from the mult.
*/
cljs.core.async.mult = (function mult(ch){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var m = (function (){if(typeof cljs.core.async.t12339 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t12339 = (function (cs,ch,mult,meta12340){
this.cs = cs;
this.ch = ch;
this.mult = mult;
this.meta12340 = meta12340;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t12339.cljs$lang$type = true;
cljs.core.async.t12339.cljs$lang$ctorStr = "cljs.core.async/t12339";
cljs.core.async.t12339.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.async/t12339");
});})(cs))
;
cljs.core.async.t12339.prototype.cljs$core$async$Mult$ = true;
cljs.core.async.t12339.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$2,close_QMARK_){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$2,close_QMARK_);
return null;
});})(cs))
;
cljs.core.async.t12339.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$2){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$2);
return null;
});})(cs))
;
cljs.core.async.t12339.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return null;
});})(cs))
;
cljs.core.async.t12339.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t12339.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(cs))
;
cljs.core.async.t12339.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_12341){var self__ = this;
var _12341__$1 = this;return self__.meta12340;
});})(cs))
;
cljs.core.async.t12339.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_12341,meta12340__$1){var self__ = this;
var _12341__$1 = this;return (new cljs.core.async.t12339(self__.cs,self__.ch,self__.mult,meta12340__$1));
});})(cs))
;
cljs.core.async.__GT_t12339 = ((function (cs){
return (function __GT_t12339(cs__$1,ch__$1,mult__$1,meta12340){return (new cljs.core.async.t12339(cs__$1,ch__$1,mult__$1,meta12340));
});})(cs))
;
}
return (new cljs.core.async.t12339(cs,ch,mult,null));
})();var dchan = cljs.core.async.chan.call(null,1);var dctr = cljs.core.atom.call(null,null);var done = ((function (cs,m,dchan,dctr){
return (function (){if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === 0))
{return cljs.core.async.put_BANG_.call(null,dchan,true);
} else
{return null;
}
});})(cs,m,dchan,dctr))
;var c__6387__auto___12553 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_12471){var state_val_12472 = (state_12471[1]);if((state_val_12472 === 32))
{var inst_12344 = (state_12471[7]);var inst_12420 = (state_12471[8]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_12471,31,Object,null,30);var inst_12427 = cljs.core.async.put_BANG_.call(null,inst_12420,inst_12344,done);var state_12471__$1 = state_12471;var statearr_12473_12554 = state_12471__$1;(statearr_12473_12554[2] = inst_12427);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12471__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 1))
{var state_12471__$1 = state_12471;var statearr_12474_12555 = state_12471__$1;(statearr_12474_12555[2] = null);
(statearr_12474_12555[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 33))
{var inst_12433 = (state_12471[9]);var inst_12435 = cljs.core.chunked_seq_QMARK_.call(null,inst_12433);var state_12471__$1 = state_12471;if(inst_12435)
{var statearr_12475_12556 = state_12471__$1;(statearr_12475_12556[1] = 36);
} else
{var statearr_12476_12557 = state_12471__$1;(statearr_12476_12557[1] = 37);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 2))
{var state_12471__$1 = state_12471;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12471__$1,4,ch);
} else
{if((state_val_12472 === 34))
{var state_12471__$1 = state_12471;var statearr_12477_12558 = state_12471__$1;(statearr_12477_12558[2] = null);
(statearr_12477_12558[1] = 35);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 3))
{var inst_12469 = (state_12471[2]);var state_12471__$1 = state_12471;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12471__$1,inst_12469);
} else
{if((state_val_12472 === 35))
{var inst_12458 = (state_12471[2]);var state_12471__$1 = state_12471;var statearr_12478_12559 = state_12471__$1;(statearr_12478_12559[2] = inst_12458);
(statearr_12478_12559[1] = 29);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 4))
{var inst_12344 = (state_12471[7]);var inst_12344__$1 = (state_12471[2]);var inst_12345 = (inst_12344__$1 == null);var state_12471__$1 = (function (){var statearr_12479 = state_12471;(statearr_12479[7] = inst_12344__$1);
return statearr_12479;
})();if(cljs.core.truth_(inst_12345))
{var statearr_12480_12560 = state_12471__$1;(statearr_12480_12560[1] = 5);
} else
{var statearr_12481_12561 = state_12471__$1;(statearr_12481_12561[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 36))
{var inst_12433 = (state_12471[9]);var inst_12437 = cljs.core.chunk_first.call(null,inst_12433);var inst_12438 = cljs.core.chunk_rest.call(null,inst_12433);var inst_12439 = cljs.core.count.call(null,inst_12437);var inst_12412 = inst_12438;var inst_12413 = inst_12437;var inst_12414 = inst_12439;var inst_12415 = 0;var state_12471__$1 = (function (){var statearr_12482 = state_12471;(statearr_12482[10] = inst_12413);
(statearr_12482[11] = inst_12414);
(statearr_12482[12] = inst_12415);
(statearr_12482[13] = inst_12412);
return statearr_12482;
})();var statearr_12483_12562 = state_12471__$1;(statearr_12483_12562[2] = null);
(statearr_12483_12562[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 5))
{var inst_12351 = cljs.core.deref.call(null,cs);var inst_12352 = cljs.core.seq.call(null,inst_12351);var inst_12353 = inst_12352;var inst_12354 = null;var inst_12355 = 0;var inst_12356 = 0;var state_12471__$1 = (function (){var statearr_12484 = state_12471;(statearr_12484[14] = inst_12356);
(statearr_12484[15] = inst_12355);
(statearr_12484[16] = inst_12354);
(statearr_12484[17] = inst_12353);
return statearr_12484;
})();var statearr_12485_12563 = state_12471__$1;(statearr_12485_12563[2] = null);
(statearr_12485_12563[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 37))
{var inst_12433 = (state_12471[9]);var inst_12442 = cljs.core.first.call(null,inst_12433);var state_12471__$1 = (function (){var statearr_12486 = state_12471;(statearr_12486[18] = inst_12442);
return statearr_12486;
})();var statearr_12487_12564 = state_12471__$1;(statearr_12487_12564[2] = null);
(statearr_12487_12564[1] = 41);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 6))
{var inst_12403 = cljs.core.deref.call(null,cs);var inst_12404 = cljs.core.keys.call(null,inst_12403);var inst_12405 = cljs.core.count.call(null,inst_12404);var inst_12406 = cljs.core.reset_BANG_.call(null,dctr,inst_12405);var inst_12411 = cljs.core.seq.call(null,inst_12404);var inst_12412 = inst_12411;var inst_12413 = null;var inst_12414 = 0;var inst_12415 = 0;var state_12471__$1 = (function (){var statearr_12488 = state_12471;(statearr_12488[19] = inst_12406);
(statearr_12488[10] = inst_12413);
(statearr_12488[11] = inst_12414);
(statearr_12488[12] = inst_12415);
(statearr_12488[13] = inst_12412);
return statearr_12488;
})();var statearr_12489_12565 = state_12471__$1;(statearr_12489_12565[2] = null);
(statearr_12489_12565[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 38))
{var inst_12455 = (state_12471[2]);var state_12471__$1 = state_12471;var statearr_12490_12566 = state_12471__$1;(statearr_12490_12566[2] = inst_12455);
(statearr_12490_12566[1] = 35);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 7))
{var inst_12467 = (state_12471[2]);var state_12471__$1 = state_12471;var statearr_12491_12567 = state_12471__$1;(statearr_12491_12567[2] = inst_12467);
(statearr_12491_12567[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 39))
{var inst_12433 = (state_12471[9]);var inst_12451 = (state_12471[2]);var inst_12452 = cljs.core.next.call(null,inst_12433);var inst_12412 = inst_12452;var inst_12413 = null;var inst_12414 = 0;var inst_12415 = 0;var state_12471__$1 = (function (){var statearr_12492 = state_12471;(statearr_12492[10] = inst_12413);
(statearr_12492[11] = inst_12414);
(statearr_12492[12] = inst_12415);
(statearr_12492[13] = inst_12412);
(statearr_12492[20] = inst_12451);
return statearr_12492;
})();var statearr_12493_12568 = state_12471__$1;(statearr_12493_12568[2] = null);
(statearr_12493_12568[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 8))
{var inst_12356 = (state_12471[14]);var inst_12355 = (state_12471[15]);var inst_12358 = (inst_12356 < inst_12355);var inst_12359 = inst_12358;var state_12471__$1 = state_12471;if(cljs.core.truth_(inst_12359))
{var statearr_12494_12569 = state_12471__$1;(statearr_12494_12569[1] = 10);
} else
{var statearr_12495_12570 = state_12471__$1;(statearr_12495_12570[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 40))
{var inst_12442 = (state_12471[18]);var inst_12443 = (state_12471[2]);var inst_12444 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var inst_12445 = cljs.core.async.untap_STAR_.call(null,m,inst_12442);var state_12471__$1 = (function (){var statearr_12496 = state_12471;(statearr_12496[21] = inst_12444);
(statearr_12496[22] = inst_12443);
return statearr_12496;
})();var statearr_12497_12571 = state_12471__$1;(statearr_12497_12571[2] = inst_12445);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12471__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 9))
{var inst_12401 = (state_12471[2]);var state_12471__$1 = state_12471;var statearr_12498_12572 = state_12471__$1;(statearr_12498_12572[2] = inst_12401);
(statearr_12498_12572[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 41))
{var inst_12344 = (state_12471[7]);var inst_12442 = (state_12471[18]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_12471,40,Object,null,39);var inst_12449 = cljs.core.async.put_BANG_.call(null,inst_12442,inst_12344,done);var state_12471__$1 = state_12471;var statearr_12499_12573 = state_12471__$1;(statearr_12499_12573[2] = inst_12449);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12471__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 10))
{var inst_12356 = (state_12471[14]);var inst_12354 = (state_12471[16]);var inst_12362 = cljs.core._nth.call(null,inst_12354,inst_12356);var inst_12363 = cljs.core.nth.call(null,inst_12362,0,null);var inst_12364 = cljs.core.nth.call(null,inst_12362,1,null);var state_12471__$1 = (function (){var statearr_12500 = state_12471;(statearr_12500[23] = inst_12363);
return statearr_12500;
})();if(cljs.core.truth_(inst_12364))
{var statearr_12501_12574 = state_12471__$1;(statearr_12501_12574[1] = 13);
} else
{var statearr_12502_12575 = state_12471__$1;(statearr_12502_12575[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 42))
{var inst_12464 = (state_12471[2]);var state_12471__$1 = (function (){var statearr_12503 = state_12471;(statearr_12503[24] = inst_12464);
return statearr_12503;
})();var statearr_12504_12576 = state_12471__$1;(statearr_12504_12576[2] = null);
(statearr_12504_12576[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 11))
{var inst_12353 = (state_12471[17]);var inst_12373 = (state_12471[25]);var inst_12373__$1 = cljs.core.seq.call(null,inst_12353);var state_12471__$1 = (function (){var statearr_12505 = state_12471;(statearr_12505[25] = inst_12373__$1);
return statearr_12505;
})();if(inst_12373__$1)
{var statearr_12506_12577 = state_12471__$1;(statearr_12506_12577[1] = 16);
} else
{var statearr_12507_12578 = state_12471__$1;(statearr_12507_12578[1] = 17);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 12))
{var inst_12399 = (state_12471[2]);var state_12471__$1 = state_12471;var statearr_12508_12579 = state_12471__$1;(statearr_12508_12579[2] = inst_12399);
(statearr_12508_12579[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 13))
{var inst_12363 = (state_12471[23]);var inst_12366 = cljs.core.async.close_BANG_.call(null,inst_12363);var state_12471__$1 = state_12471;var statearr_12512_12580 = state_12471__$1;(statearr_12512_12580[2] = inst_12366);
(statearr_12512_12580[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 14))
{var state_12471__$1 = state_12471;var statearr_12513_12581 = state_12471__$1;(statearr_12513_12581[2] = null);
(statearr_12513_12581[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 15))
{var inst_12356 = (state_12471[14]);var inst_12355 = (state_12471[15]);var inst_12354 = (state_12471[16]);var inst_12353 = (state_12471[17]);var inst_12369 = (state_12471[2]);var inst_12370 = (inst_12356 + 1);var tmp12509 = inst_12355;var tmp12510 = inst_12354;var tmp12511 = inst_12353;var inst_12353__$1 = tmp12511;var inst_12354__$1 = tmp12510;var inst_12355__$1 = tmp12509;var inst_12356__$1 = inst_12370;var state_12471__$1 = (function (){var statearr_12514 = state_12471;(statearr_12514[14] = inst_12356__$1);
(statearr_12514[15] = inst_12355__$1);
(statearr_12514[16] = inst_12354__$1);
(statearr_12514[17] = inst_12353__$1);
(statearr_12514[26] = inst_12369);
return statearr_12514;
})();var statearr_12515_12582 = state_12471__$1;(statearr_12515_12582[2] = null);
(statearr_12515_12582[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 16))
{var inst_12373 = (state_12471[25]);var inst_12375 = cljs.core.chunked_seq_QMARK_.call(null,inst_12373);var state_12471__$1 = state_12471;if(inst_12375)
{var statearr_12516_12583 = state_12471__$1;(statearr_12516_12583[1] = 19);
} else
{var statearr_12517_12584 = state_12471__$1;(statearr_12517_12584[1] = 20);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 17))
{var state_12471__$1 = state_12471;var statearr_12518_12585 = state_12471__$1;(statearr_12518_12585[2] = null);
(statearr_12518_12585[1] = 18);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 18))
{var inst_12397 = (state_12471[2]);var state_12471__$1 = state_12471;var statearr_12519_12586 = state_12471__$1;(statearr_12519_12586[2] = inst_12397);
(statearr_12519_12586[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 19))
{var inst_12373 = (state_12471[25]);var inst_12377 = cljs.core.chunk_first.call(null,inst_12373);var inst_12378 = cljs.core.chunk_rest.call(null,inst_12373);var inst_12379 = cljs.core.count.call(null,inst_12377);var inst_12353 = inst_12378;var inst_12354 = inst_12377;var inst_12355 = inst_12379;var inst_12356 = 0;var state_12471__$1 = (function (){var statearr_12520 = state_12471;(statearr_12520[14] = inst_12356);
(statearr_12520[15] = inst_12355);
(statearr_12520[16] = inst_12354);
(statearr_12520[17] = inst_12353);
return statearr_12520;
})();var statearr_12521_12587 = state_12471__$1;(statearr_12521_12587[2] = null);
(statearr_12521_12587[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 20))
{var inst_12373 = (state_12471[25]);var inst_12383 = cljs.core.first.call(null,inst_12373);var inst_12384 = cljs.core.nth.call(null,inst_12383,0,null);var inst_12385 = cljs.core.nth.call(null,inst_12383,1,null);var state_12471__$1 = (function (){var statearr_12522 = state_12471;(statearr_12522[27] = inst_12384);
return statearr_12522;
})();if(cljs.core.truth_(inst_12385))
{var statearr_12523_12588 = state_12471__$1;(statearr_12523_12588[1] = 22);
} else
{var statearr_12524_12589 = state_12471__$1;(statearr_12524_12589[1] = 23);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 21))
{var inst_12394 = (state_12471[2]);var state_12471__$1 = state_12471;var statearr_12525_12590 = state_12471__$1;(statearr_12525_12590[2] = inst_12394);
(statearr_12525_12590[1] = 18);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 22))
{var inst_12384 = (state_12471[27]);var inst_12387 = cljs.core.async.close_BANG_.call(null,inst_12384);var state_12471__$1 = state_12471;var statearr_12526_12591 = state_12471__$1;(statearr_12526_12591[2] = inst_12387);
(statearr_12526_12591[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 23))
{var state_12471__$1 = state_12471;var statearr_12527_12592 = state_12471__$1;(statearr_12527_12592[2] = null);
(statearr_12527_12592[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 24))
{var inst_12373 = (state_12471[25]);var inst_12390 = (state_12471[2]);var inst_12391 = cljs.core.next.call(null,inst_12373);var inst_12353 = inst_12391;var inst_12354 = null;var inst_12355 = 0;var inst_12356 = 0;var state_12471__$1 = (function (){var statearr_12528 = state_12471;(statearr_12528[14] = inst_12356);
(statearr_12528[15] = inst_12355);
(statearr_12528[16] = inst_12354);
(statearr_12528[17] = inst_12353);
(statearr_12528[28] = inst_12390);
return statearr_12528;
})();var statearr_12529_12593 = state_12471__$1;(statearr_12529_12593[2] = null);
(statearr_12529_12593[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 25))
{var inst_12414 = (state_12471[11]);var inst_12415 = (state_12471[12]);var inst_12417 = (inst_12415 < inst_12414);var inst_12418 = inst_12417;var state_12471__$1 = state_12471;if(cljs.core.truth_(inst_12418))
{var statearr_12530_12594 = state_12471__$1;(statearr_12530_12594[1] = 27);
} else
{var statearr_12531_12595 = state_12471__$1;(statearr_12531_12595[1] = 28);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 26))
{var inst_12462 = (state_12471[2]);var state_12471__$1 = (function (){var statearr_12532 = state_12471;(statearr_12532[29] = inst_12462);
return statearr_12532;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12471__$1,42,dchan);
} else
{if((state_val_12472 === 27))
{var inst_12413 = (state_12471[10]);var inst_12415 = (state_12471[12]);var inst_12420 = cljs.core._nth.call(null,inst_12413,inst_12415);var state_12471__$1 = (function (){var statearr_12533 = state_12471;(statearr_12533[8] = inst_12420);
return statearr_12533;
})();var statearr_12534_12596 = state_12471__$1;(statearr_12534_12596[2] = null);
(statearr_12534_12596[1] = 32);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 28))
{var inst_12433 = (state_12471[9]);var inst_12412 = (state_12471[13]);var inst_12433__$1 = cljs.core.seq.call(null,inst_12412);var state_12471__$1 = (function (){var statearr_12538 = state_12471;(statearr_12538[9] = inst_12433__$1);
return statearr_12538;
})();if(inst_12433__$1)
{var statearr_12539_12597 = state_12471__$1;(statearr_12539_12597[1] = 33);
} else
{var statearr_12540_12598 = state_12471__$1;(statearr_12540_12598[1] = 34);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 29))
{var inst_12460 = (state_12471[2]);var state_12471__$1 = state_12471;var statearr_12541_12599 = state_12471__$1;(statearr_12541_12599[2] = inst_12460);
(statearr_12541_12599[1] = 26);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 30))
{var inst_12413 = (state_12471[10]);var inst_12414 = (state_12471[11]);var inst_12415 = (state_12471[12]);var inst_12412 = (state_12471[13]);var inst_12429 = (state_12471[2]);var inst_12430 = (inst_12415 + 1);var tmp12535 = inst_12413;var tmp12536 = inst_12414;var tmp12537 = inst_12412;var inst_12412__$1 = tmp12537;var inst_12413__$1 = tmp12535;var inst_12414__$1 = tmp12536;var inst_12415__$1 = inst_12430;var state_12471__$1 = (function (){var statearr_12542 = state_12471;(statearr_12542[10] = inst_12413__$1);
(statearr_12542[11] = inst_12414__$1);
(statearr_12542[12] = inst_12415__$1);
(statearr_12542[13] = inst_12412__$1);
(statearr_12542[30] = inst_12429);
return statearr_12542;
})();var statearr_12543_12600 = state_12471__$1;(statearr_12543_12600[2] = null);
(statearr_12543_12600[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12472 === 31))
{var inst_12420 = (state_12471[8]);var inst_12421 = (state_12471[2]);var inst_12422 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var inst_12423 = cljs.core.async.untap_STAR_.call(null,m,inst_12420);var state_12471__$1 = (function (){var statearr_12544 = state_12471;(statearr_12544[31] = inst_12422);
(statearr_12544[32] = inst_12421);
return statearr_12544;
})();var statearr_12545_12601 = state_12471__$1;(statearr_12545_12601[2] = inst_12423);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12471__$1);
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
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
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
var state_machine__6318__auto____0 = (function (){var statearr_12549 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_12549[0] = state_machine__6318__auto__);
(statearr_12549[1] = 1);
return statearr_12549;
});
var state_machine__6318__auto____1 = (function (state_12471){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_12471);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e12550){if((e12550 instanceof Object))
{var ex__6321__auto__ = e12550;var statearr_12551_12602 = state_12471;(statearr_12551_12602[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12471);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e12550;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__12603 = state_12471;
state_12471 = G__12603;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_12471){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_12471);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_12552 = f__6388__auto__.call(null);(statearr_12552[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto___12553);
return statearr_12552;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return m;
});
/**
* Copies the mult source onto the supplied channel.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.tap = (function() {
var tap = null;
var tap__2 = (function (mult,ch){return tap.call(null,mult,ch,true);
});
var tap__3 = (function (mult,ch,close_QMARK_){cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);
return ch;
});
tap = function(mult,ch,close_QMARK_){
switch(arguments.length){
case 2:
return tap__2.call(this,mult,ch);
case 3:
return tap__3.call(this,mult,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
tap.cljs$core$IFn$_invoke$arity$2 = tap__2;
tap.cljs$core$IFn$_invoke$arity$3 = tap__3;
return tap;
})()
;
/**
* Disconnects a target channel from a mult
*/
cljs.core.async.untap = (function untap(mult,ch){return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
* Disconnects all target channels from a mult
*/
cljs.core.async.untap_all = (function untap_all(mult){return cljs.core.async.untap_all_STAR_.call(null,mult);
});
cljs.core.async.Mix = (function (){var obj12605 = {};return obj12605;
})();
cljs.core.async.admix_STAR_ = (function admix_STAR_(m,ch){if((function (){var and__3410__auto__ = m;if(and__3410__auto__)
{return m.cljs$core$async$Mix$admix_STAR_$arity$2;
} else
{return and__3410__auto__;
}
})())
{return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else
{var x__4043__auto__ = (((m == null))?null:m);return (function (){var or__3422__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.async.admix_STAR_["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_STAR_ = (function unmix_STAR_(m,ch){if((function (){var and__3410__auto__ = m;if(and__3410__auto__)
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2;
} else
{return and__3410__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else
{var x__4043__auto__ = (((m == null))?null:m);return (function (){var or__3422__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_all_STAR_ = (function unmix_all_STAR_(m){if((function (){var and__3410__auto__ = m;if(and__3410__auto__)
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1;
} else
{return and__3410__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else
{var x__4043__auto__ = (((m == null))?null:m);return (function (){var or__3422__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
})().call(null,m);
}
});
cljs.core.async.toggle_STAR_ = (function toggle_STAR_(m,state_map){if((function (){var and__3410__auto__ = m;if(and__3410__auto__)
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2;
} else
{return and__3410__auto__;
}
})())
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else
{var x__4043__auto__ = (((m == null))?null:m);return (function (){var or__3422__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
})().call(null,m,state_map);
}
});
cljs.core.async.solo_mode_STAR_ = (function solo_mode_STAR_(m,mode){if((function (){var and__3410__auto__ = m;if(and__3410__auto__)
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2;
} else
{return and__3410__auto__;
}
})())
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else
{var x__4043__auto__ = (((m == null))?null:m);return (function (){var or__3422__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
})().call(null,m,mode);
}
});
/**
* Creates and returns a mix of one or more input channels which will
* be put on the supplied out channel. Input sources can be added to
* the mix with 'admix', and removed with 'unmix'. A mix supports
* soloing, muting and pausing multiple inputs atomically using
* 'toggle', and can solo using either muting or pausing as determined
* by 'solo-mode'.
* 
* Each channel can have zero or more boolean modes set via 'toggle':
* 
* :solo - when true, only this (ond other soloed) channel(s) will appear
* in the mix output channel. :mute and :pause states of soloed
* channels are ignored. If solo-mode is :mute, non-soloed
* channels are muted, if :pause, non-soloed channels are
* paused.
* 
* :mute - muted channels will have their contents consumed but not included in the mix
* :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
*/
cljs.core.async.mix = (function mix(out){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",1120344424),null,new cljs.core.Keyword(null,"mute","mute",1017267595),null], null), null);var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",1017440337));var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1017267595));var change = cljs.core.async.chan.call(null);var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){if(cljs.core.truth_(attr.call(null,v)))
{return cljs.core.conj.call(null,ret,c);
} else
{return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){var chs = cljs.core.deref.call(null,cs);var mode = cljs.core.deref.call(null,solo_mode);var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",1017440337),chs);var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",1120344424),chs);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1123523302),solos,new cljs.core.Keyword(null,"mutes","mutes",1118168300),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1017267595),chs),new cljs.core.Keyword(null,"reads","reads",1122290959),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",1120344424))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;var m = (function (){if(typeof cljs.core.async.t12715 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t12715 = (function (pick,out,attrs,cs,calc_state,solo_modes,mix,changed,change,solo_mode,meta12716){
this.pick = pick;
this.out = out;
this.attrs = attrs;
this.cs = cs;
this.calc_state = calc_state;
this.solo_modes = solo_modes;
this.mix = mix;
this.changed = changed;
this.change = change;
this.solo_mode = solo_mode;
this.meta12716 = meta12716;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t12715.cljs$lang$type = true;
cljs.core.async.t12715.cljs$lang$ctorStr = "cljs.core.async/t12715";
cljs.core.async.t12715.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.async/t12715");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12715.prototype.cljs$core$async$Mix$ = true;
cljs.core.async.t12715.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12715.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12715.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12715.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12715.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.solo_modes.call(null,mode)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",-1162732933,null),new cljs.core.Symbol(null,"mode","mode",-1637174436,null))))].join('')));
}
cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12715.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t12715.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12715.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_12717){var self__ = this;
var _12717__$1 = this;return self__.meta12716;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12715.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_12717,meta12716__$1){var self__ = this;
var _12717__$1 = this;return (new cljs.core.async.t12715(self__.pick,self__.out,self__.attrs,self__.cs,self__.calc_state,self__.solo_modes,self__.mix,self__.changed,self__.change,self__.solo_mode,meta12716__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.__GT_t12715 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function __GT_t12715(pick__$1,out__$1,attrs__$1,cs__$1,calc_state__$1,solo_modes__$1,mix__$1,changed__$1,change__$1,solo_mode__$1,meta12716){return (new cljs.core.async.t12715(pick__$1,out__$1,attrs__$1,cs__$1,calc_state__$1,solo_modes__$1,mix__$1,changed__$1,change__$1,solo_mode__$1,meta12716));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
}
return (new cljs.core.async.t12715(pick,out,attrs,cs,calc_state,solo_modes,mix,changed,change,solo_mode,null));
})();var c__6387__auto___12824 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_12782){var state_val_12783 = (state_12782[1]);if((state_val_12783 === 1))
{var inst_12721 = (state_12782[7]);var inst_12721__$1 = calc_state.call(null);var inst_12722 = cljs.core.seq_QMARK_.call(null,inst_12721__$1);var state_12782__$1 = (function (){var statearr_12784 = state_12782;(statearr_12784[7] = inst_12721__$1);
return statearr_12784;
})();if(inst_12722)
{var statearr_12785_12825 = state_12782__$1;(statearr_12785_12825[1] = 2);
} else
{var statearr_12786_12826 = state_12782__$1;(statearr_12786_12826[1] = 3);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 2))
{var inst_12721 = (state_12782[7]);var inst_12724 = cljs.core.apply.call(null,cljs.core.hash_map,inst_12721);var state_12782__$1 = state_12782;var statearr_12787_12827 = state_12782__$1;(statearr_12787_12827[2] = inst_12724);
(statearr_12787_12827[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 3))
{var inst_12721 = (state_12782[7]);var state_12782__$1 = state_12782;var statearr_12788_12828 = state_12782__$1;(statearr_12788_12828[2] = inst_12721);
(statearr_12788_12828[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 4))
{var inst_12721 = (state_12782[7]);var inst_12727 = (state_12782[2]);var inst_12728 = cljs.core.get.call(null,inst_12727,new cljs.core.Keyword(null,"reads","reads",1122290959));var inst_12729 = cljs.core.get.call(null,inst_12727,new cljs.core.Keyword(null,"mutes","mutes",1118168300));var inst_12730 = cljs.core.get.call(null,inst_12727,new cljs.core.Keyword(null,"solos","solos",1123523302));var inst_12731 = inst_12721;var state_12782__$1 = (function (){var statearr_12789 = state_12782;(statearr_12789[8] = inst_12728);
(statearr_12789[9] = inst_12729);
(statearr_12789[10] = inst_12731);
(statearr_12789[11] = inst_12730);
return statearr_12789;
})();var statearr_12790_12829 = state_12782__$1;(statearr_12790_12829[2] = null);
(statearr_12790_12829[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 5))
{var inst_12731 = (state_12782[10]);var inst_12734 = cljs.core.seq_QMARK_.call(null,inst_12731);var state_12782__$1 = state_12782;if(inst_12734)
{var statearr_12791_12830 = state_12782__$1;(statearr_12791_12830[1] = 7);
} else
{var statearr_12792_12831 = state_12782__$1;(statearr_12792_12831[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 6))
{var inst_12780 = (state_12782[2]);var state_12782__$1 = state_12782;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12782__$1,inst_12780);
} else
{if((state_val_12783 === 7))
{var inst_12731 = (state_12782[10]);var inst_12736 = cljs.core.apply.call(null,cljs.core.hash_map,inst_12731);var state_12782__$1 = state_12782;var statearr_12793_12832 = state_12782__$1;(statearr_12793_12832[2] = inst_12736);
(statearr_12793_12832[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 8))
{var inst_12731 = (state_12782[10]);var state_12782__$1 = state_12782;var statearr_12794_12833 = state_12782__$1;(statearr_12794_12833[2] = inst_12731);
(statearr_12794_12833[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 9))
{var inst_12739 = (state_12782[12]);var inst_12739__$1 = (state_12782[2]);var inst_12740 = cljs.core.get.call(null,inst_12739__$1,new cljs.core.Keyword(null,"reads","reads",1122290959));var inst_12741 = cljs.core.get.call(null,inst_12739__$1,new cljs.core.Keyword(null,"mutes","mutes",1118168300));var inst_12742 = cljs.core.get.call(null,inst_12739__$1,new cljs.core.Keyword(null,"solos","solos",1123523302));var state_12782__$1 = (function (){var statearr_12795 = state_12782;(statearr_12795[13] = inst_12742);
(statearr_12795[14] = inst_12741);
(statearr_12795[12] = inst_12739__$1);
return statearr_12795;
})();return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_12782__$1,10,inst_12740);
} else
{if((state_val_12783 === 10))
{var inst_12746 = (state_12782[15]);var inst_12747 = (state_12782[16]);var inst_12745 = (state_12782[2]);var inst_12746__$1 = cljs.core.nth.call(null,inst_12745,0,null);var inst_12747__$1 = cljs.core.nth.call(null,inst_12745,1,null);var inst_12748 = (inst_12746__$1 == null);var inst_12749 = cljs.core._EQ_.call(null,inst_12747__$1,change);var inst_12750 = (inst_12748) || (inst_12749);var state_12782__$1 = (function (){var statearr_12796 = state_12782;(statearr_12796[15] = inst_12746__$1);
(statearr_12796[16] = inst_12747__$1);
return statearr_12796;
})();if(cljs.core.truth_(inst_12750))
{var statearr_12797_12834 = state_12782__$1;(statearr_12797_12834[1] = 11);
} else
{var statearr_12798_12835 = state_12782__$1;(statearr_12798_12835[1] = 12);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 11))
{var inst_12746 = (state_12782[15]);var inst_12752 = (inst_12746 == null);var state_12782__$1 = state_12782;if(cljs.core.truth_(inst_12752))
{var statearr_12799_12836 = state_12782__$1;(statearr_12799_12836[1] = 14);
} else
{var statearr_12800_12837 = state_12782__$1;(statearr_12800_12837[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 12))
{var inst_12742 = (state_12782[13]);var inst_12747 = (state_12782[16]);var inst_12761 = (state_12782[17]);var inst_12761__$1 = inst_12742.call(null,inst_12747);var state_12782__$1 = (function (){var statearr_12801 = state_12782;(statearr_12801[17] = inst_12761__$1);
return statearr_12801;
})();if(cljs.core.truth_(inst_12761__$1))
{var statearr_12802_12838 = state_12782__$1;(statearr_12802_12838[1] = 17);
} else
{var statearr_12803_12839 = state_12782__$1;(statearr_12803_12839[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 13))
{var inst_12778 = (state_12782[2]);var state_12782__$1 = state_12782;var statearr_12804_12840 = state_12782__$1;(statearr_12804_12840[2] = inst_12778);
(statearr_12804_12840[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 14))
{var inst_12747 = (state_12782[16]);var inst_12754 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_12747);var state_12782__$1 = state_12782;var statearr_12805_12841 = state_12782__$1;(statearr_12805_12841[2] = inst_12754);
(statearr_12805_12841[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 15))
{var state_12782__$1 = state_12782;var statearr_12806_12842 = state_12782__$1;(statearr_12806_12842[2] = null);
(statearr_12806_12842[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 16))
{var inst_12757 = (state_12782[2]);var inst_12758 = calc_state.call(null);var inst_12731 = inst_12758;var state_12782__$1 = (function (){var statearr_12807 = state_12782;(statearr_12807[10] = inst_12731);
(statearr_12807[18] = inst_12757);
return statearr_12807;
})();var statearr_12808_12843 = state_12782__$1;(statearr_12808_12843[2] = null);
(statearr_12808_12843[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 17))
{var inst_12761 = (state_12782[17]);var state_12782__$1 = state_12782;var statearr_12809_12844 = state_12782__$1;(statearr_12809_12844[2] = inst_12761);
(statearr_12809_12844[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 18))
{var inst_12742 = (state_12782[13]);var inst_12741 = (state_12782[14]);var inst_12747 = (state_12782[16]);var inst_12764 = cljs.core.empty_QMARK_.call(null,inst_12742);var inst_12765 = inst_12741.call(null,inst_12747);var inst_12766 = cljs.core.not.call(null,inst_12765);var inst_12767 = (inst_12764) && (inst_12766);var state_12782__$1 = state_12782;var statearr_12810_12845 = state_12782__$1;(statearr_12810_12845[2] = inst_12767);
(statearr_12810_12845[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 19))
{var inst_12769 = (state_12782[2]);var state_12782__$1 = state_12782;if(cljs.core.truth_(inst_12769))
{var statearr_12811_12846 = state_12782__$1;(statearr_12811_12846[1] = 20);
} else
{var statearr_12812_12847 = state_12782__$1;(statearr_12812_12847[1] = 21);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 20))
{var inst_12746 = (state_12782[15]);var state_12782__$1 = state_12782;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12782__$1,23,out,inst_12746);
} else
{if((state_val_12783 === 21))
{var state_12782__$1 = state_12782;var statearr_12813_12848 = state_12782__$1;(statearr_12813_12848[2] = null);
(statearr_12813_12848[1] = 22);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 22))
{var inst_12739 = (state_12782[12]);var inst_12775 = (state_12782[2]);var inst_12731 = inst_12739;var state_12782__$1 = (function (){var statearr_12814 = state_12782;(statearr_12814[10] = inst_12731);
(statearr_12814[19] = inst_12775);
return statearr_12814;
})();var statearr_12815_12849 = state_12782__$1;(statearr_12815_12849[2] = null);
(statearr_12815_12849[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_12783 === 23))
{var inst_12772 = (state_12782[2]);var state_12782__$1 = state_12782;var statearr_12816_12850 = state_12782__$1;(statearr_12816_12850[2] = inst_12772);
(statearr_12816_12850[1] = 22);
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
}
}
}
}
}
}
}
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
var state_machine__6318__auto____0 = (function (){var statearr_12820 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_12820[0] = state_machine__6318__auto__);
(statearr_12820[1] = 1);
return statearr_12820;
});
var state_machine__6318__auto____1 = (function (state_12782){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_12782);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e12821){if((e12821 instanceof Object))
{var ex__6321__auto__ = e12821;var statearr_12822_12851 = state_12782;(statearr_12822_12851[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12782);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e12821;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__12852 = state_12782;
state_12782 = G__12852;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_12782){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_12782);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_12823 = f__6388__auto__.call(null);(statearr_12823[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto___12824);
return statearr_12823;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return m;
});
/**
* Adds ch as an input to the mix
*/
cljs.core.async.admix = (function admix(mix,ch){return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
* Removes ch as an input to the mix
*/
cljs.core.async.unmix = (function unmix(mix,ch){return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
* removes all inputs from the mix
*/
cljs.core.async.unmix_all = (function unmix_all(mix){return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
* Atomically sets the state(s) of one or more channels in a mix. The
* state map is a map of channels -> channel-state-map. A
* channel-state-map is a map of attrs -> boolean, where attr is one or
* more of :mute, :pause or :solo. Any states supplied are merged with
* the current state.
* 
* Note that channels can be added to a mix via toggle, which can be
* used to add channels in a particular (e.g. paused) state.
*/
cljs.core.async.toggle = (function toggle(mix,state_map){return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
* Sets the solo mode of the mix. mode must be one of :mute or :pause
*/
cljs.core.async.solo_mode = (function solo_mode(mix,mode){return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});
cljs.core.async.Pub = (function (){var obj12854 = {};return obj12854;
})();
cljs.core.async.sub_STAR_ = (function sub_STAR_(p,v,ch,close_QMARK_){if((function (){var and__3410__auto__ = p;if(and__3410__auto__)
{return p.cljs$core$async$Pub$sub_STAR_$arity$4;
} else
{return and__3410__auto__;
}
})())
{return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else
{var x__4043__auto__ = (((p == null))?null:p);return (function (){var or__3422__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.async.sub_STAR_["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
})().call(null,p,v,ch,close_QMARK_);
}
});
cljs.core.async.unsub_STAR_ = (function unsub_STAR_(p,v,ch){if((function (){var and__3410__auto__ = p;if(and__3410__auto__)
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3;
} else
{return and__3410__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else
{var x__4043__auto__ = (((p == null))?null:p);return (function (){var or__3422__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
})().call(null,p,v,ch);
}
});
cljs.core.async.unsub_all_STAR_ = (function() {
var unsub_all_STAR_ = null;
var unsub_all_STAR___1 = (function (p){if((function (){var and__3410__auto__ = p;if(and__3410__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1;
} else
{return and__3410__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else
{var x__4043__auto__ = (((p == null))?null:p);return (function (){var or__3422__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p);
}
});
var unsub_all_STAR___2 = (function (p,v){if((function (){var and__3410__auto__ = p;if(and__3410__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2;
} else
{return and__3410__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else
{var x__4043__auto__ = (((p == null))?null:p);return (function (){var or__3422__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4043__auto__)]);if(or__3422__auto__)
{return or__3422__auto__;
} else
{var or__3422__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__3422__auto____$1)
{return or__3422__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p,v);
}
});
unsub_all_STAR_ = function(p,v){
switch(arguments.length){
case 1:
return unsub_all_STAR___1.call(this,p);
case 2:
return unsub_all_STAR___2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = unsub_all_STAR___1;
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = unsub_all_STAR___2;
return unsub_all_STAR_;
})()
;
/**
* Creates and returns a pub(lication) of the supplied channel,
* partitioned into topics by the topic-fn. topic-fn will be applied to
* each value on the channel and the result will determine the 'topic'
* on which that value will be put. Channels can be subscribed to
* receive copies of topics using 'sub', and unsubscribed using
* 'unsub'. Each topic will be handled by an internal mult on a
* dedicated channel. By default these internal channels are
* unbuffered, but a buf-fn can be supplied which, given a topic,
* creates a buffer with desired properties.
* 
* Each item is distributed to all subs in parallel and synchronously,
* i.e. each sub must accept before the next item is distributed. Use
* buffering/windowing to prevent slow subs from holding up the pub.
* 
* Note that if buf-fns are used then each topic is handled
* asynchronously, i.e. if a channel is subscribed to more than one
* topic it should not expect them to be interleaved identically with
* the source.
*/
cljs.core.async.pub = (function() {
var pub = null;
var pub__2 = (function (ch,topic_fn){return pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});
var pub__3 = (function (ch,topic_fn,buf_fn){var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var ensure_mult = ((function (mults){
return (function (topic){var or__3422__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);if(cljs.core.truth_(or__3422__auto__))
{return or__3422__auto__;
} else
{return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__3422__auto__,mults){
return (function (p1__12855_SHARP_){if(cljs.core.truth_(p1__12855_SHARP_.call(null,topic)))
{return p1__12855_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__12855_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__3422__auto__,mults))
),topic);
}
});})(mults))
;var p = (function (){if(typeof cljs.core.async.t12980 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t12980 = (function (ensure_mult,mults,buf_fn,topic_fn,ch,pub,meta12981){
this.ensure_mult = ensure_mult;
this.mults = mults;
this.buf_fn = buf_fn;
this.topic_fn = topic_fn;
this.ch = ch;
this.pub = pub;
this.meta12981 = meta12981;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t12980.cljs$lang$type = true;
cljs.core.async.t12980.cljs$lang$ctorStr = "cljs.core.async/t12980";
cljs.core.async.t12980.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__3984__auto__,writer__3985__auto__,opt__3986__auto__){return cljs.core._write.call(null,writer__3985__auto__,"cljs.core.async/t12980");
});})(mults,ensure_mult))
;
cljs.core.async.t12980.prototype.cljs$core$async$Pub$ = true;
cljs.core.async.t12980.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2,close_QMARK_){var self__ = this;
var p__$1 = this;var m = self__.ensure_mult.call(null,topic);return cljs.core.async.tap.call(null,m,ch__$2,close_QMARK_);
});})(mults,ensure_mult))
;
cljs.core.async.t12980.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2){var self__ = this;
var p__$1 = this;var temp__4092__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);if(cljs.core.truth_(temp__4092__auto__))
{var m = temp__4092__auto__;return cljs.core.async.untap.call(null,m,ch__$2);
} else
{return null;
}
});})(mults,ensure_mult))
;
cljs.core.async.t12980.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;
cljs.core.async.t12980.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){var self__ = this;
var ___$1 = this;return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;
cljs.core.async.t12980.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t12980.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(mults,ensure_mult))
;
cljs.core.async.t12980.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_12982){var self__ = this;
var _12982__$1 = this;return self__.meta12981;
});})(mults,ensure_mult))
;
cljs.core.async.t12980.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_12982,meta12981__$1){var self__ = this;
var _12982__$1 = this;return (new cljs.core.async.t12980(self__.ensure_mult,self__.mults,self__.buf_fn,self__.topic_fn,self__.ch,self__.pub,meta12981__$1));
});})(mults,ensure_mult))
;
cljs.core.async.__GT_t12980 = ((function (mults,ensure_mult){
return (function __GT_t12980(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta12981){return (new cljs.core.async.t12980(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta12981));
});})(mults,ensure_mult))
;
}
return (new cljs.core.async.t12980(ensure_mult,mults,buf_fn,topic_fn,ch,pub,null));
})();var c__6387__auto___13104 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_13056){var state_val_13057 = (state_13056[1]);if((state_val_13057 === 1))
{var state_13056__$1 = state_13056;var statearr_13058_13105 = state_13056__$1;(statearr_13058_13105[2] = null);
(statearr_13058_13105[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 2))
{var state_13056__$1 = state_13056;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13056__$1,4,ch);
} else
{if((state_val_13057 === 3))
{var inst_13054 = (state_13056[2]);var state_13056__$1 = state_13056;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13056__$1,inst_13054);
} else
{if((state_val_13057 === 4))
{var inst_12985 = (state_13056[7]);var inst_12985__$1 = (state_13056[2]);var inst_12986 = (inst_12985__$1 == null);var state_13056__$1 = (function (){var statearr_13059 = state_13056;(statearr_13059[7] = inst_12985__$1);
return statearr_13059;
})();if(cljs.core.truth_(inst_12986))
{var statearr_13060_13106 = state_13056__$1;(statearr_13060_13106[1] = 5);
} else
{var statearr_13061_13107 = state_13056__$1;(statearr_13061_13107[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 5))
{var inst_12992 = cljs.core.deref.call(null,mults);var inst_12993 = cljs.core.vals.call(null,inst_12992);var inst_12994 = cljs.core.seq.call(null,inst_12993);var inst_12995 = inst_12994;var inst_12996 = null;var inst_12997 = 0;var inst_12998 = 0;var state_13056__$1 = (function (){var statearr_13062 = state_13056;(statearr_13062[8] = inst_12995);
(statearr_13062[9] = inst_12996);
(statearr_13062[10] = inst_12997);
(statearr_13062[11] = inst_12998);
return statearr_13062;
})();var statearr_13063_13108 = state_13056__$1;(statearr_13063_13108[2] = null);
(statearr_13063_13108[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 6))
{var inst_13035 = (state_13056[12]);var inst_13033 = (state_13056[13]);var inst_12985 = (state_13056[7]);var inst_13033__$1 = topic_fn.call(null,inst_12985);var inst_13034 = cljs.core.deref.call(null,mults);var inst_13035__$1 = cljs.core.get.call(null,inst_13034,inst_13033__$1);var state_13056__$1 = (function (){var statearr_13064 = state_13056;(statearr_13064[12] = inst_13035__$1);
(statearr_13064[13] = inst_13033__$1);
return statearr_13064;
})();if(cljs.core.truth_(inst_13035__$1))
{var statearr_13065_13109 = state_13056__$1;(statearr_13065_13109[1] = 19);
} else
{var statearr_13066_13110 = state_13056__$1;(statearr_13066_13110[1] = 20);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 7))
{var inst_13052 = (state_13056[2]);var state_13056__$1 = state_13056;var statearr_13067_13111 = state_13056__$1;(statearr_13067_13111[2] = inst_13052);
(statearr_13067_13111[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 8))
{var inst_12997 = (state_13056[10]);var inst_12998 = (state_13056[11]);var inst_13000 = (inst_12998 < inst_12997);var inst_13001 = inst_13000;var state_13056__$1 = state_13056;if(cljs.core.truth_(inst_13001))
{var statearr_13071_13112 = state_13056__$1;(statearr_13071_13112[1] = 10);
} else
{var statearr_13072_13113 = state_13056__$1;(statearr_13072_13113[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 9))
{var inst_13031 = (state_13056[2]);var state_13056__$1 = state_13056;var statearr_13073_13114 = state_13056__$1;(statearr_13073_13114[2] = inst_13031);
(statearr_13073_13114[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 10))
{var inst_12995 = (state_13056[8]);var inst_12996 = (state_13056[9]);var inst_12997 = (state_13056[10]);var inst_12998 = (state_13056[11]);var inst_13003 = cljs.core._nth.call(null,inst_12996,inst_12998);var inst_13004 = cljs.core.async.muxch_STAR_.call(null,inst_13003);var inst_13005 = cljs.core.async.close_BANG_.call(null,inst_13004);var inst_13006 = (inst_12998 + 1);var tmp13068 = inst_12995;var tmp13069 = inst_12996;var tmp13070 = inst_12997;var inst_12995__$1 = tmp13068;var inst_12996__$1 = tmp13069;var inst_12997__$1 = tmp13070;var inst_12998__$1 = inst_13006;var state_13056__$1 = (function (){var statearr_13074 = state_13056;(statearr_13074[8] = inst_12995__$1);
(statearr_13074[14] = inst_13005);
(statearr_13074[9] = inst_12996__$1);
(statearr_13074[10] = inst_12997__$1);
(statearr_13074[11] = inst_12998__$1);
return statearr_13074;
})();var statearr_13075_13115 = state_13056__$1;(statearr_13075_13115[2] = null);
(statearr_13075_13115[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 11))
{var inst_12995 = (state_13056[8]);var inst_13009 = (state_13056[15]);var inst_13009__$1 = cljs.core.seq.call(null,inst_12995);var state_13056__$1 = (function (){var statearr_13076 = state_13056;(statearr_13076[15] = inst_13009__$1);
return statearr_13076;
})();if(inst_13009__$1)
{var statearr_13077_13116 = state_13056__$1;(statearr_13077_13116[1] = 13);
} else
{var statearr_13078_13117 = state_13056__$1;(statearr_13078_13117[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 12))
{var inst_13029 = (state_13056[2]);var state_13056__$1 = state_13056;var statearr_13079_13118 = state_13056__$1;(statearr_13079_13118[2] = inst_13029);
(statearr_13079_13118[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 13))
{var inst_13009 = (state_13056[15]);var inst_13011 = cljs.core.chunked_seq_QMARK_.call(null,inst_13009);var state_13056__$1 = state_13056;if(inst_13011)
{var statearr_13080_13119 = state_13056__$1;(statearr_13080_13119[1] = 16);
} else
{var statearr_13081_13120 = state_13056__$1;(statearr_13081_13120[1] = 17);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 14))
{var state_13056__$1 = state_13056;var statearr_13082_13121 = state_13056__$1;(statearr_13082_13121[2] = null);
(statearr_13082_13121[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 15))
{var inst_13027 = (state_13056[2]);var state_13056__$1 = state_13056;var statearr_13083_13122 = state_13056__$1;(statearr_13083_13122[2] = inst_13027);
(statearr_13083_13122[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 16))
{var inst_13009 = (state_13056[15]);var inst_13013 = cljs.core.chunk_first.call(null,inst_13009);var inst_13014 = cljs.core.chunk_rest.call(null,inst_13009);var inst_13015 = cljs.core.count.call(null,inst_13013);var inst_12995 = inst_13014;var inst_12996 = inst_13013;var inst_12997 = inst_13015;var inst_12998 = 0;var state_13056__$1 = (function (){var statearr_13084 = state_13056;(statearr_13084[8] = inst_12995);
(statearr_13084[9] = inst_12996);
(statearr_13084[10] = inst_12997);
(statearr_13084[11] = inst_12998);
return statearr_13084;
})();var statearr_13085_13123 = state_13056__$1;(statearr_13085_13123[2] = null);
(statearr_13085_13123[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 17))
{var inst_13009 = (state_13056[15]);var inst_13018 = cljs.core.first.call(null,inst_13009);var inst_13019 = cljs.core.async.muxch_STAR_.call(null,inst_13018);var inst_13020 = cljs.core.async.close_BANG_.call(null,inst_13019);var inst_13021 = cljs.core.next.call(null,inst_13009);var inst_12995 = inst_13021;var inst_12996 = null;var inst_12997 = 0;var inst_12998 = 0;var state_13056__$1 = (function (){var statearr_13086 = state_13056;(statearr_13086[8] = inst_12995);
(statearr_13086[9] = inst_12996);
(statearr_13086[10] = inst_12997);
(statearr_13086[16] = inst_13020);
(statearr_13086[11] = inst_12998);
return statearr_13086;
})();var statearr_13087_13124 = state_13056__$1;(statearr_13087_13124[2] = null);
(statearr_13087_13124[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 18))
{var inst_13024 = (state_13056[2]);var state_13056__$1 = state_13056;var statearr_13088_13125 = state_13056__$1;(statearr_13088_13125[2] = inst_13024);
(statearr_13088_13125[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 19))
{var state_13056__$1 = state_13056;var statearr_13089_13126 = state_13056__$1;(statearr_13089_13126[2] = null);
(statearr_13089_13126[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 20))
{var state_13056__$1 = state_13056;var statearr_13090_13127 = state_13056__$1;(statearr_13090_13127[2] = null);
(statearr_13090_13127[1] = 21);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 21))
{var inst_13049 = (state_13056[2]);var state_13056__$1 = (function (){var statearr_13091 = state_13056;(statearr_13091[17] = inst_13049);
return statearr_13091;
})();var statearr_13092_13128 = state_13056__$1;(statearr_13092_13128[2] = null);
(statearr_13092_13128[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 22))
{var inst_13046 = (state_13056[2]);var state_13056__$1 = state_13056;var statearr_13093_13129 = state_13056__$1;(statearr_13093_13129[2] = inst_13046);
(statearr_13093_13129[1] = 21);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 23))
{var inst_13033 = (state_13056[13]);var inst_13037 = (state_13056[2]);var inst_13038 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_13033);var state_13056__$1 = (function (){var statearr_13094 = state_13056;(statearr_13094[18] = inst_13037);
return statearr_13094;
})();var statearr_13095_13130 = state_13056__$1;(statearr_13095_13130[2] = inst_13038);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13056__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13057 === 24))
{var inst_13035 = (state_13056[12]);var inst_12985 = (state_13056[7]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_13056,23,Object,null,22);var inst_13042 = cljs.core.async.muxch_STAR_.call(null,inst_13035);var state_13056__$1 = state_13056;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13056__$1,25,inst_13042,inst_12985);
} else
{if((state_val_13057 === 25))
{var inst_13044 = (state_13056[2]);var state_13056__$1 = state_13056;var statearr_13096_13131 = state_13056__$1;(statearr_13096_13131[2] = inst_13044);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13056__$1);
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
}
}
}
}
}
}
}
}
}
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
var state_machine__6318__auto____0 = (function (){var statearr_13100 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13100[0] = state_machine__6318__auto__);
(statearr_13100[1] = 1);
return statearr_13100;
});
var state_machine__6318__auto____1 = (function (state_13056){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_13056);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e13101){if((e13101 instanceof Object))
{var ex__6321__auto__ = e13101;var statearr_13102_13132 = state_13056;(statearr_13102_13132[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13056);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e13101;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__13133 = state_13056;
state_13056 = G__13133;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_13056){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_13056);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_13103 = f__6388__auto__.call(null);(statearr_13103[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto___13104);
return statearr_13103;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return p;
});
pub = function(ch,topic_fn,buf_fn){
switch(arguments.length){
case 2:
return pub__2.call(this,ch,topic_fn);
case 3:
return pub__3.call(this,ch,topic_fn,buf_fn);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pub.cljs$core$IFn$_invoke$arity$2 = pub__2;
pub.cljs$core$IFn$_invoke$arity$3 = pub__3;
return pub;
})()
;
/**
* Subscribes a channel to a topic of a pub.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.sub = (function() {
var sub = null;
var sub__3 = (function (p,topic,ch){return sub.call(null,p,topic,ch,true);
});
var sub__4 = (function (p,topic,ch,close_QMARK_){return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});
sub = function(p,topic,ch,close_QMARK_){
switch(arguments.length){
case 3:
return sub__3.call(this,p,topic,ch);
case 4:
return sub__4.call(this,p,topic,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
sub.cljs$core$IFn$_invoke$arity$3 = sub__3;
sub.cljs$core$IFn$_invoke$arity$4 = sub__4;
return sub;
})()
;
/**
* Unsubscribes a channel from a topic of a pub
*/
cljs.core.async.unsub = (function unsub(p,topic,ch){return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
* Unsubscribes all channels from a pub, or a topic of a pub
*/
cljs.core.async.unsub_all = (function() {
var unsub_all = null;
var unsub_all__1 = (function (p){return cljs.core.async.unsub_all_STAR_.call(null,p);
});
var unsub_all__2 = (function (p,topic){return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});
unsub_all = function(p,topic){
switch(arguments.length){
case 1:
return unsub_all__1.call(this,p);
case 2:
return unsub_all__2.call(this,p,topic);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all.cljs$core$IFn$_invoke$arity$1 = unsub_all__1;
unsub_all.cljs$core$IFn$_invoke$arity$2 = unsub_all__2;
return unsub_all;
})()
;
/**
* Takes a function and a collection of source channels, and returns a
* channel which contains the values produced by applying f to the set
* of first items taken from each source channel, followed by applying
* f to the set of second items from each channel, until any one of the
* channels is closed, at which point the output channel will be
* closed. The returned channel will be unbuffered by default, or a
* buf-or-n can be supplied
*/
cljs.core.async.map = (function() {
var map = null;
var map__2 = (function (f,chs){return map.call(null,f,chs,null);
});
var map__3 = (function (f,chs,buf_or_n){var chs__$1 = cljs.core.vec.call(null,chs);var out = cljs.core.async.chan.call(null,buf_or_n);var cnt = cljs.core.count.call(null,chs__$1);var rets = cljs.core.object_array.call(null,cnt);var dchan = cljs.core.async.chan.call(null,1);var dctr = cljs.core.atom.call(null,null);var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){(rets[i] = ret);
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === 0))
{return cljs.core.async.put_BANG_.call(null,dchan,rets.slice(0));
} else
{return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));var c__6387__auto___13270 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_13240){var state_val_13241 = (state_13240[1]);if((state_val_13241 === 1))
{var state_13240__$1 = state_13240;var statearr_13242_13271 = state_13240__$1;(statearr_13242_13271[2] = null);
(statearr_13242_13271[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13241 === 2))
{var inst_13203 = cljs.core.reset_BANG_.call(null,dctr,cnt);var inst_13204 = 0;var state_13240__$1 = (function (){var statearr_13243 = state_13240;(statearr_13243[7] = inst_13204);
(statearr_13243[8] = inst_13203);
return statearr_13243;
})();var statearr_13244_13272 = state_13240__$1;(statearr_13244_13272[2] = null);
(statearr_13244_13272[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13241 === 3))
{var inst_13238 = (state_13240[2]);var state_13240__$1 = state_13240;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13240__$1,inst_13238);
} else
{if((state_val_13241 === 4))
{var inst_13204 = (state_13240[7]);var inst_13206 = (inst_13204 < cnt);var state_13240__$1 = state_13240;if(cljs.core.truth_(inst_13206))
{var statearr_13245_13273 = state_13240__$1;(statearr_13245_13273[1] = 6);
} else
{var statearr_13246_13274 = state_13240__$1;(statearr_13246_13274[1] = 7);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13241 === 5))
{var inst_13224 = (state_13240[2]);var state_13240__$1 = (function (){var statearr_13247 = state_13240;(statearr_13247[9] = inst_13224);
return statearr_13247;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13240__$1,12,dchan);
} else
{if((state_val_13241 === 6))
{var state_13240__$1 = state_13240;var statearr_13248_13275 = state_13240__$1;(statearr_13248_13275[2] = null);
(statearr_13248_13275[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13241 === 7))
{var state_13240__$1 = state_13240;var statearr_13249_13276 = state_13240__$1;(statearr_13249_13276[2] = null);
(statearr_13249_13276[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13241 === 8))
{var inst_13222 = (state_13240[2]);var state_13240__$1 = state_13240;var statearr_13250_13277 = state_13240__$1;(statearr_13250_13277[2] = inst_13222);
(statearr_13250_13277[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13241 === 9))
{var inst_13204 = (state_13240[7]);var inst_13217 = (state_13240[2]);var inst_13218 = (inst_13204 + 1);var inst_13204__$1 = inst_13218;var state_13240__$1 = (function (){var statearr_13251 = state_13240;(statearr_13251[7] = inst_13204__$1);
(statearr_13251[10] = inst_13217);
return statearr_13251;
})();var statearr_13252_13278 = state_13240__$1;(statearr_13252_13278[2] = null);
(statearr_13252_13278[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13241 === 10))
{var inst_13208 = (state_13240[2]);var inst_13209 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var state_13240__$1 = (function (){var statearr_13253 = state_13240;(statearr_13253[11] = inst_13208);
return statearr_13253;
})();var statearr_13254_13279 = state_13240__$1;(statearr_13254_13279[2] = inst_13209);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13240__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13241 === 11))
{var inst_13204 = (state_13240[7]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_13240,10,Object,null,9);var inst_13213 = chs__$1.call(null,inst_13204);var inst_13214 = done.call(null,inst_13204);var inst_13215 = cljs.core.async.take_BANG_.call(null,inst_13213,inst_13214);var state_13240__$1 = state_13240;var statearr_13255_13280 = state_13240__$1;(statearr_13255_13280[2] = inst_13215);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13240__$1);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13241 === 12))
{var inst_13226 = (state_13240[12]);var inst_13226__$1 = (state_13240[2]);var inst_13227 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_13226__$1);var state_13240__$1 = (function (){var statearr_13256 = state_13240;(statearr_13256[12] = inst_13226__$1);
return statearr_13256;
})();if(cljs.core.truth_(inst_13227))
{var statearr_13257_13281 = state_13240__$1;(statearr_13257_13281[1] = 13);
} else
{var statearr_13258_13282 = state_13240__$1;(statearr_13258_13282[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13241 === 13))
{var inst_13229 = cljs.core.async.close_BANG_.call(null,out);var state_13240__$1 = state_13240;var statearr_13259_13283 = state_13240__$1;(statearr_13259_13283[2] = inst_13229);
(statearr_13259_13283[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13241 === 14))
{var inst_13226 = (state_13240[12]);var inst_13231 = cljs.core.apply.call(null,f,inst_13226);var state_13240__$1 = state_13240;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13240__$1,16,out,inst_13231);
} else
{if((state_val_13241 === 15))
{var inst_13236 = (state_13240[2]);var state_13240__$1 = state_13240;var statearr_13260_13284 = state_13240__$1;(statearr_13260_13284[2] = inst_13236);
(statearr_13260_13284[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13241 === 16))
{var inst_13233 = (state_13240[2]);var state_13240__$1 = (function (){var statearr_13261 = state_13240;(statearr_13261[13] = inst_13233);
return statearr_13261;
})();var statearr_13262_13285 = state_13240__$1;(statearr_13262_13285[2] = null);
(statearr_13262_13285[1] = 2);
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
var state_machine__6318__auto____0 = (function (){var statearr_13266 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13266[0] = state_machine__6318__auto__);
(statearr_13266[1] = 1);
return statearr_13266;
});
var state_machine__6318__auto____1 = (function (state_13240){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_13240);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e13267){if((e13267 instanceof Object))
{var ex__6321__auto__ = e13267;var statearr_13268_13286 = state_13240;(statearr_13268_13286[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13240);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e13267;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__13287 = state_13240;
state_13240 = G__13287;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_13240){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_13240);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_13269 = f__6388__auto__.call(null);(statearr_13269[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto___13270);
return statearr_13269;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return out;
});
map = function(f,chs,buf_or_n){
switch(arguments.length){
case 2:
return map__2.call(this,f,chs);
case 3:
return map__3.call(this,f,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
map.cljs$core$IFn$_invoke$arity$2 = map__2;
map.cljs$core$IFn$_invoke$arity$3 = map__3;
return map;
})()
;
/**
* Takes a collection of source channels and returns a channel which
* contains all values taken from them. The returned channel will be
* unbuffered by default, or a buf-or-n can be supplied. The channel
* will close after all the source channels have closed.
*/
cljs.core.async.merge = (function() {
var merge = null;
var merge__1 = (function (chs){return merge.call(null,chs,null);
});
var merge__2 = (function (chs,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6387__auto___13395 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_13371){var state_val_13372 = (state_13371[1]);if((state_val_13372 === 1))
{var inst_13342 = cljs.core.vec.call(null,chs);var inst_13343 = inst_13342;var state_13371__$1 = (function (){var statearr_13373 = state_13371;(statearr_13373[7] = inst_13343);
return statearr_13373;
})();var statearr_13374_13396 = state_13371__$1;(statearr_13374_13396[2] = null);
(statearr_13374_13396[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13372 === 2))
{var inst_13343 = (state_13371[7]);var inst_13345 = cljs.core.count.call(null,inst_13343);var inst_13346 = (inst_13345 > 0);var state_13371__$1 = state_13371;if(cljs.core.truth_(inst_13346))
{var statearr_13375_13397 = state_13371__$1;(statearr_13375_13397[1] = 4);
} else
{var statearr_13376_13398 = state_13371__$1;(statearr_13376_13398[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13372 === 3))
{var inst_13369 = (state_13371[2]);var state_13371__$1 = state_13371;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13371__$1,inst_13369);
} else
{if((state_val_13372 === 4))
{var inst_13343 = (state_13371[7]);var state_13371__$1 = state_13371;return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_13371__$1,7,inst_13343);
} else
{if((state_val_13372 === 5))
{var inst_13365 = cljs.core.async.close_BANG_.call(null,out);var state_13371__$1 = state_13371;var statearr_13377_13399 = state_13371__$1;(statearr_13377_13399[2] = inst_13365);
(statearr_13377_13399[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13372 === 6))
{var inst_13367 = (state_13371[2]);var state_13371__$1 = state_13371;var statearr_13378_13400 = state_13371__$1;(statearr_13378_13400[2] = inst_13367);
(statearr_13378_13400[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13372 === 7))
{var inst_13351 = (state_13371[8]);var inst_13350 = (state_13371[9]);var inst_13350__$1 = (state_13371[2]);var inst_13351__$1 = cljs.core.nth.call(null,inst_13350__$1,0,null);var inst_13352 = cljs.core.nth.call(null,inst_13350__$1,1,null);var inst_13353 = (inst_13351__$1 == null);var state_13371__$1 = (function (){var statearr_13379 = state_13371;(statearr_13379[8] = inst_13351__$1);
(statearr_13379[10] = inst_13352);
(statearr_13379[9] = inst_13350__$1);
return statearr_13379;
})();if(cljs.core.truth_(inst_13353))
{var statearr_13380_13401 = state_13371__$1;(statearr_13380_13401[1] = 8);
} else
{var statearr_13381_13402 = state_13371__$1;(statearr_13381_13402[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13372 === 8))
{var inst_13351 = (state_13371[8]);var inst_13352 = (state_13371[10]);var inst_13350 = (state_13371[9]);var inst_13343 = (state_13371[7]);var inst_13355 = (function (){var c = inst_13352;var v = inst_13351;var vec__13348 = inst_13350;var cs = inst_13343;return ((function (c,v,vec__13348,cs,inst_13351,inst_13352,inst_13350,inst_13343,state_val_13372){
return (function (p1__13288_SHARP_){return cljs.core.not_EQ_.call(null,c,p1__13288_SHARP_);
});
;})(c,v,vec__13348,cs,inst_13351,inst_13352,inst_13350,inst_13343,state_val_13372))
})();var inst_13356 = cljs.core.filterv.call(null,inst_13355,inst_13343);var inst_13343__$1 = inst_13356;var state_13371__$1 = (function (){var statearr_13382 = state_13371;(statearr_13382[7] = inst_13343__$1);
return statearr_13382;
})();var statearr_13383_13403 = state_13371__$1;(statearr_13383_13403[2] = null);
(statearr_13383_13403[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13372 === 9))
{var inst_13351 = (state_13371[8]);var state_13371__$1 = state_13371;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13371__$1,11,out,inst_13351);
} else
{if((state_val_13372 === 10))
{var inst_13363 = (state_13371[2]);var state_13371__$1 = state_13371;var statearr_13385_13404 = state_13371__$1;(statearr_13385_13404[2] = inst_13363);
(statearr_13385_13404[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13372 === 11))
{var inst_13343 = (state_13371[7]);var inst_13360 = (state_13371[2]);var tmp13384 = inst_13343;var inst_13343__$1 = tmp13384;var state_13371__$1 = (function (){var statearr_13386 = state_13371;(statearr_13386[11] = inst_13360);
(statearr_13386[7] = inst_13343__$1);
return statearr_13386;
})();var statearr_13387_13405 = state_13371__$1;(statearr_13387_13405[2] = null);
(statearr_13387_13405[1] = 2);
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
}
}
}
});return ((function (switch__6317__auto__){
return (function() {
var state_machine__6318__auto__ = null;
var state_machine__6318__auto____0 = (function (){var statearr_13391 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13391[0] = state_machine__6318__auto__);
(statearr_13391[1] = 1);
return statearr_13391;
});
var state_machine__6318__auto____1 = (function (state_13371){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_13371);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e13392){if((e13392 instanceof Object))
{var ex__6321__auto__ = e13392;var statearr_13393_13406 = state_13371;(statearr_13393_13406[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13371);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e13392;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__13407 = state_13371;
state_13371 = G__13407;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_13371){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_13371);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_13394 = f__6388__auto__.call(null);(statearr_13394[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto___13395);
return statearr_13394;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return out;
});
merge = function(chs,buf_or_n){
switch(arguments.length){
case 1:
return merge__1.call(this,chs);
case 2:
return merge__2.call(this,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
merge.cljs$core$IFn$_invoke$arity$1 = merge__1;
merge.cljs$core$IFn$_invoke$arity$2 = merge__2;
return merge;
})()
;
/**
* Returns a channel containing the single (collection) result of the
* items taken from the channel conjoined to the supplied
* collection. ch must close before into produces a result.
*/
cljs.core.async.into = (function into(coll,ch){return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
* Returns a channel that will return, at most, n items from ch. After n items
* have been returned, or ch has been closed, the return chanel will close.
* 
* The output channel is unbuffered by default, unless buf-or-n is given.
*/
cljs.core.async.take = (function() {
var take = null;
var take__2 = (function (n,ch){return take.call(null,n,ch,null);
});
var take__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6387__auto___13500 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_13477){var state_val_13478 = (state_13477[1]);if((state_val_13478 === 1))
{var inst_13454 = 0;var state_13477__$1 = (function (){var statearr_13479 = state_13477;(statearr_13479[7] = inst_13454);
return statearr_13479;
})();var statearr_13480_13501 = state_13477__$1;(statearr_13480_13501[2] = null);
(statearr_13480_13501[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13478 === 2))
{var inst_13454 = (state_13477[7]);var inst_13456 = (inst_13454 < n);var state_13477__$1 = state_13477;if(cljs.core.truth_(inst_13456))
{var statearr_13481_13502 = state_13477__$1;(statearr_13481_13502[1] = 4);
} else
{var statearr_13482_13503 = state_13477__$1;(statearr_13482_13503[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13478 === 3))
{var inst_13474 = (state_13477[2]);var inst_13475 = cljs.core.async.close_BANG_.call(null,out);var state_13477__$1 = (function (){var statearr_13483 = state_13477;(statearr_13483[8] = inst_13474);
return statearr_13483;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13477__$1,inst_13475);
} else
{if((state_val_13478 === 4))
{var state_13477__$1 = state_13477;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13477__$1,7,ch);
} else
{if((state_val_13478 === 5))
{var state_13477__$1 = state_13477;var statearr_13484_13504 = state_13477__$1;(statearr_13484_13504[2] = null);
(statearr_13484_13504[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13478 === 6))
{var inst_13472 = (state_13477[2]);var state_13477__$1 = state_13477;var statearr_13485_13505 = state_13477__$1;(statearr_13485_13505[2] = inst_13472);
(statearr_13485_13505[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13478 === 7))
{var inst_13459 = (state_13477[9]);var inst_13459__$1 = (state_13477[2]);var inst_13460 = (inst_13459__$1 == null);var inst_13461 = cljs.core.not.call(null,inst_13460);var state_13477__$1 = (function (){var statearr_13486 = state_13477;(statearr_13486[9] = inst_13459__$1);
return statearr_13486;
})();if(inst_13461)
{var statearr_13487_13506 = state_13477__$1;(statearr_13487_13506[1] = 8);
} else
{var statearr_13488_13507 = state_13477__$1;(statearr_13488_13507[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13478 === 8))
{var inst_13459 = (state_13477[9]);var state_13477__$1 = state_13477;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13477__$1,11,out,inst_13459);
} else
{if((state_val_13478 === 9))
{var state_13477__$1 = state_13477;var statearr_13489_13508 = state_13477__$1;(statearr_13489_13508[2] = null);
(statearr_13489_13508[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13478 === 10))
{var inst_13469 = (state_13477[2]);var state_13477__$1 = state_13477;var statearr_13490_13509 = state_13477__$1;(statearr_13490_13509[2] = inst_13469);
(statearr_13490_13509[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13478 === 11))
{var inst_13454 = (state_13477[7]);var inst_13464 = (state_13477[2]);var inst_13465 = (inst_13454 + 1);var inst_13454__$1 = inst_13465;var state_13477__$1 = (function (){var statearr_13491 = state_13477;(statearr_13491[10] = inst_13464);
(statearr_13491[7] = inst_13454__$1);
return statearr_13491;
})();var statearr_13492_13510 = state_13477__$1;(statearr_13492_13510[2] = null);
(statearr_13492_13510[1] = 2);
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
}
}
}
});return ((function (switch__6317__auto__){
return (function() {
var state_machine__6318__auto__ = null;
var state_machine__6318__auto____0 = (function (){var statearr_13496 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_13496[0] = state_machine__6318__auto__);
(statearr_13496[1] = 1);
return statearr_13496;
});
var state_machine__6318__auto____1 = (function (state_13477){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_13477);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e13497){if((e13497 instanceof Object))
{var ex__6321__auto__ = e13497;var statearr_13498_13511 = state_13477;(statearr_13498_13511[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13477);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e13497;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__13512 = state_13477;
state_13477 = G__13512;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_13477){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_13477);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_13499 = f__6388__auto__.call(null);(statearr_13499[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto___13500);
return statearr_13499;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return out;
});
take = function(n,ch,buf_or_n){
switch(arguments.length){
case 2:
return take__2.call(this,n,ch);
case 3:
return take__3.call(this,n,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take.cljs$core$IFn$_invoke$arity$2 = take__2;
take.cljs$core$IFn$_invoke$arity$3 = take__3;
return take;
})()
;
/**
* Returns a channel that will contain values from ch. Consecutive duplicate
* values will be dropped.
* 
* The output channel is unbuffered by default, unless buf-or-n is given.
*/
cljs.core.async.unique = (function() {
var unique = null;
var unique__1 = (function (ch){return unique.call(null,ch,null);
});
var unique__2 = (function (ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6387__auto___13609 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_13584){var state_val_13585 = (state_13584[1]);if((state_val_13585 === 1))
{var inst_13561 = null;var state_13584__$1 = (function (){var statearr_13586 = state_13584;(statearr_13586[7] = inst_13561);
return statearr_13586;
})();var statearr_13587_13610 = state_13584__$1;(statearr_13587_13610[2] = null);
(statearr_13587_13610[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13585 === 2))
{var state_13584__$1 = state_13584;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13584__$1,4,ch);
} else
{if((state_val_13585 === 3))
{var inst_13581 = (state_13584[2]);var inst_13582 = cljs.core.async.close_BANG_.call(null,out);var state_13584__$1 = (function (){var statearr_13588 = state_13584;(statearr_13588[8] = inst_13581);
return statearr_13588;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13584__$1,inst_13582);
} else
{if((state_val_13585 === 4))
{var inst_13564 = (state_13584[9]);var inst_13564__$1 = (state_13584[2]);var inst_13565 = (inst_13564__$1 == null);var inst_13566 = cljs.core.not.call(null,inst_13565);var state_13584__$1 = (function (){var statearr_13589 = state_13584;(statearr_13589[9] = inst_13564__$1);
return statearr_13589;
})();if(inst_13566)
{var statearr_13590_13611 = state_13584__$1;(statearr_13590_13611[1] = 5);
} else
{var statearr_13591_13612 = state_13584__$1;(statearr_13591_13612[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13585 === 5))
{var inst_13564 = (state_13584[9]);var inst_13561 = (state_13584[7]);var inst_13568 = cljs.core._EQ_.call(null,inst_13564,inst_13561);var state_13584__$1 = state_13584;if(inst_13568)
{var statearr_13592_13613 = state_13584__$1;(statearr_13592_13613[1] = 8);
} else
{var statearr_13593_13614 = state_13584__$1;(statearr_13593_13614[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13585 === 6))
{var state_13584__$1 = state_13584;var statearr_13595_13615 = state_13584__$1;(statearr_13595_13615[2] = null);
(statearr_13595_13615[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13585 === 7))
{var inst_13579 = (state_13584[2]);var state_13584__$1 = state_13584;var statearr_13596_13616 = state_13584__$1;(statearr_13596_13616[2] = inst_13579);
(statearr_13596_13616[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13585 === 8))
{var inst_13561 = (state_13584[7]);var tmp13594 = inst_13561;var inst_13561__$1 = tmp13594;var state_13584__$1 = (function (){var statearr_13597 = state_13584;(statearr_13597[7] = inst_13561__$1);
return statearr_13597;
})();var statearr_13598_13617 = state_13584__$1;(statearr_13598_13617[2] = null);
(statearr_13598_13617[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13585 === 9))
{var inst_13564 = (state_13584[9]);var state_13584__$1 = state_13584;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13584__$1,11,out,inst_13564);
} else
{if((state_val_13585 === 10))
{var inst_13576 = (state_13584[2]);var state_13584__$1 = state_13584;var statearr_13599_13618 = state_13584__$1;(statearr_13599_13618[2] = inst_13576);
(statearr_13599_13618[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13585 === 11))
{var inst_13564 = (state_13584[9]);var inst_13573 = (state_13584[2]);var inst_13561 = inst_13564;var state_13584__$1 = (function (){var statearr_13600 = state_13584;(statearr_13600[7] = inst_13561);
(statearr_13600[10] = inst_13573);
return statearr_13600;
})();var statearr_13601_13619 = state_13584__$1;(statearr_13601_13619[2] = null);
(statearr_13601_13619[1] = 2);
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
}
}
}
});return ((function (switch__6317__auto__){
return (function() {
var state_machine__6318__auto__ = null;
var state_machine__6318__auto____0 = (function (){var statearr_13605 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_13605[0] = state_machine__6318__auto__);
(statearr_13605[1] = 1);
return statearr_13605;
});
var state_machine__6318__auto____1 = (function (state_13584){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_13584);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e13606){if((e13606 instanceof Object))
{var ex__6321__auto__ = e13606;var statearr_13607_13620 = state_13584;(statearr_13607_13620[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13584);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e13606;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__13621 = state_13584;
state_13584 = G__13621;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_13584){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_13584);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_13608 = f__6388__auto__.call(null);(statearr_13608[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto___13609);
return statearr_13608;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return out;
});
unique = function(ch,buf_or_n){
switch(arguments.length){
case 1:
return unique__1.call(this,ch);
case 2:
return unique__2.call(this,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unique.cljs$core$IFn$_invoke$arity$1 = unique__1;
unique.cljs$core$IFn$_invoke$arity$2 = unique__2;
return unique;
})()
;
/**
* Returns a channel that will contain vectors of n items taken from ch. The
* final vector in the return channel may be smaller than n if ch closed before
* the vector could be completely filled.
* 
* The output channel is unbuffered by default, unless buf-or-n is given
*/
cljs.core.async.partition = (function() {
var partition = null;
var partition__2 = (function (n,ch){return partition.call(null,n,ch,null);
});
var partition__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6387__auto___13756 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_13726){var state_val_13727 = (state_13726[1]);if((state_val_13727 === 1))
{var inst_13689 = (new Array(n));var inst_13690 = inst_13689;var inst_13691 = 0;var state_13726__$1 = (function (){var statearr_13728 = state_13726;(statearr_13728[7] = inst_13691);
(statearr_13728[8] = inst_13690);
return statearr_13728;
})();var statearr_13729_13757 = state_13726__$1;(statearr_13729_13757[2] = null);
(statearr_13729_13757[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13727 === 2))
{var state_13726__$1 = state_13726;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13726__$1,4,ch);
} else
{if((state_val_13727 === 3))
{var inst_13724 = (state_13726[2]);var state_13726__$1 = state_13726;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13726__$1,inst_13724);
} else
{if((state_val_13727 === 4))
{var inst_13694 = (state_13726[9]);var inst_13694__$1 = (state_13726[2]);var inst_13695 = (inst_13694__$1 == null);var inst_13696 = cljs.core.not.call(null,inst_13695);var state_13726__$1 = (function (){var statearr_13730 = state_13726;(statearr_13730[9] = inst_13694__$1);
return statearr_13730;
})();if(inst_13696)
{var statearr_13731_13758 = state_13726__$1;(statearr_13731_13758[1] = 5);
} else
{var statearr_13732_13759 = state_13726__$1;(statearr_13732_13759[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13727 === 5))
{var inst_13694 = (state_13726[9]);var inst_13691 = (state_13726[7]);var inst_13690 = (state_13726[8]);var inst_13699 = (state_13726[10]);var inst_13698 = (inst_13690[inst_13691] = inst_13694);var inst_13699__$1 = (inst_13691 + 1);var inst_13700 = (inst_13699__$1 < n);var state_13726__$1 = (function (){var statearr_13733 = state_13726;(statearr_13733[10] = inst_13699__$1);
(statearr_13733[11] = inst_13698);
return statearr_13733;
})();if(cljs.core.truth_(inst_13700))
{var statearr_13734_13760 = state_13726__$1;(statearr_13734_13760[1] = 8);
} else
{var statearr_13735_13761 = state_13726__$1;(statearr_13735_13761[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13727 === 6))
{var inst_13691 = (state_13726[7]);var inst_13712 = (inst_13691 > 0);var state_13726__$1 = state_13726;if(cljs.core.truth_(inst_13712))
{var statearr_13737_13762 = state_13726__$1;(statearr_13737_13762[1] = 12);
} else
{var statearr_13738_13763 = state_13726__$1;(statearr_13738_13763[1] = 13);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13727 === 7))
{var inst_13722 = (state_13726[2]);var state_13726__$1 = state_13726;var statearr_13739_13764 = state_13726__$1;(statearr_13739_13764[2] = inst_13722);
(statearr_13739_13764[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13727 === 8))
{var inst_13690 = (state_13726[8]);var inst_13699 = (state_13726[10]);var tmp13736 = inst_13690;var inst_13690__$1 = tmp13736;var inst_13691 = inst_13699;var state_13726__$1 = (function (){var statearr_13740 = state_13726;(statearr_13740[7] = inst_13691);
(statearr_13740[8] = inst_13690__$1);
return statearr_13740;
})();var statearr_13741_13765 = state_13726__$1;(statearr_13741_13765[2] = null);
(statearr_13741_13765[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13727 === 9))
{var inst_13690 = (state_13726[8]);var inst_13704 = cljs.core.vec.call(null,inst_13690);var state_13726__$1 = state_13726;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13726__$1,11,out,inst_13704);
} else
{if((state_val_13727 === 10))
{var inst_13710 = (state_13726[2]);var state_13726__$1 = state_13726;var statearr_13742_13766 = state_13726__$1;(statearr_13742_13766[2] = inst_13710);
(statearr_13742_13766[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13727 === 11))
{var inst_13706 = (state_13726[2]);var inst_13707 = (new Array(n));var inst_13690 = inst_13707;var inst_13691 = 0;var state_13726__$1 = (function (){var statearr_13743 = state_13726;(statearr_13743[12] = inst_13706);
(statearr_13743[7] = inst_13691);
(statearr_13743[8] = inst_13690);
return statearr_13743;
})();var statearr_13744_13767 = state_13726__$1;(statearr_13744_13767[2] = null);
(statearr_13744_13767[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13727 === 12))
{var inst_13690 = (state_13726[8]);var inst_13714 = cljs.core.vec.call(null,inst_13690);var state_13726__$1 = state_13726;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13726__$1,15,out,inst_13714);
} else
{if((state_val_13727 === 13))
{var state_13726__$1 = state_13726;var statearr_13745_13768 = state_13726__$1;(statearr_13745_13768[2] = null);
(statearr_13745_13768[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13727 === 14))
{var inst_13719 = (state_13726[2]);var inst_13720 = cljs.core.async.close_BANG_.call(null,out);var state_13726__$1 = (function (){var statearr_13746 = state_13726;(statearr_13746[13] = inst_13719);
return statearr_13746;
})();var statearr_13747_13769 = state_13726__$1;(statearr_13747_13769[2] = inst_13720);
(statearr_13747_13769[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13727 === 15))
{var inst_13716 = (state_13726[2]);var state_13726__$1 = state_13726;var statearr_13748_13770 = state_13726__$1;(statearr_13748_13770[2] = inst_13716);
(statearr_13748_13770[1] = 14);
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
var state_machine__6318__auto____0 = (function (){var statearr_13752 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13752[0] = state_machine__6318__auto__);
(statearr_13752[1] = 1);
return statearr_13752;
});
var state_machine__6318__auto____1 = (function (state_13726){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_13726);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e13753){if((e13753 instanceof Object))
{var ex__6321__auto__ = e13753;var statearr_13754_13771 = state_13726;(statearr_13754_13771[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13726);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e13753;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__13772 = state_13726;
state_13726 = G__13772;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_13726){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_13726);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_13755 = f__6388__auto__.call(null);(statearr_13755[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto___13756);
return statearr_13755;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return out;
});
partition = function(n,ch,buf_or_n){
switch(arguments.length){
case 2:
return partition__2.call(this,n,ch);
case 3:
return partition__3.call(this,n,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
partition.cljs$core$IFn$_invoke$arity$2 = partition__2;
partition.cljs$core$IFn$_invoke$arity$3 = partition__3;
return partition;
})()
;
/**
* Returns a channel that will contain vectors of items taken from ch. New
* vectors will be created whenever (f itm) returns a value that differs from
* the previous item's (f itm).
* 
* The output channel is unbuffered, unless buf-or-n is given
*/
cljs.core.async.partition_by = (function() {
var partition_by = null;
var partition_by__2 = (function (f,ch){return partition_by.call(null,f,ch,null);
});
var partition_by__3 = (function (f,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6387__auto___13915 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6388__auto__ = (function (){var switch__6317__auto__ = (function (state_13885){var state_val_13886 = (state_13885[1]);if((state_val_13886 === 1))
{var inst_13844 = [];var inst_13845 = inst_13844;var inst_13846 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",4382193538);var state_13885__$1 = (function (){var statearr_13887 = state_13885;(statearr_13887[7] = inst_13845);
(statearr_13887[8] = inst_13846);
return statearr_13887;
})();var statearr_13888_13916 = state_13885__$1;(statearr_13888_13916[2] = null);
(statearr_13888_13916[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13886 === 2))
{var state_13885__$1 = state_13885;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13885__$1,4,ch);
} else
{if((state_val_13886 === 3))
{var inst_13883 = (state_13885[2]);var state_13885__$1 = state_13885;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13885__$1,inst_13883);
} else
{if((state_val_13886 === 4))
{var inst_13849 = (state_13885[9]);var inst_13849__$1 = (state_13885[2]);var inst_13850 = (inst_13849__$1 == null);var inst_13851 = cljs.core.not.call(null,inst_13850);var state_13885__$1 = (function (){var statearr_13889 = state_13885;(statearr_13889[9] = inst_13849__$1);
return statearr_13889;
})();if(inst_13851)
{var statearr_13890_13917 = state_13885__$1;(statearr_13890_13917[1] = 5);
} else
{var statearr_13891_13918 = state_13885__$1;(statearr_13891_13918[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13886 === 5))
{var inst_13849 = (state_13885[9]);var inst_13853 = (state_13885[10]);var inst_13846 = (state_13885[8]);var inst_13853__$1 = f.call(null,inst_13849);var inst_13854 = cljs.core._EQ_.call(null,inst_13853__$1,inst_13846);var inst_13855 = cljs.core.keyword_identical_QMARK_.call(null,inst_13846,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",4382193538));var inst_13856 = (inst_13854) || (inst_13855);var state_13885__$1 = (function (){var statearr_13892 = state_13885;(statearr_13892[10] = inst_13853__$1);
return statearr_13892;
})();if(cljs.core.truth_(inst_13856))
{var statearr_13893_13919 = state_13885__$1;(statearr_13893_13919[1] = 8);
} else
{var statearr_13894_13920 = state_13885__$1;(statearr_13894_13920[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13886 === 6))
{var inst_13845 = (state_13885[7]);var inst_13870 = inst_13845.length;var inst_13871 = (inst_13870 > 0);var state_13885__$1 = state_13885;if(cljs.core.truth_(inst_13871))
{var statearr_13896_13921 = state_13885__$1;(statearr_13896_13921[1] = 12);
} else
{var statearr_13897_13922 = state_13885__$1;(statearr_13897_13922[1] = 13);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13886 === 7))
{var inst_13881 = (state_13885[2]);var state_13885__$1 = state_13885;var statearr_13898_13923 = state_13885__$1;(statearr_13898_13923[2] = inst_13881);
(statearr_13898_13923[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13886 === 8))
{var inst_13849 = (state_13885[9]);var inst_13853 = (state_13885[10]);var inst_13845 = (state_13885[7]);var inst_13858 = inst_13845.push(inst_13849);var tmp13895 = inst_13845;var inst_13845__$1 = tmp13895;var inst_13846 = inst_13853;var state_13885__$1 = (function (){var statearr_13899 = state_13885;(statearr_13899[11] = inst_13858);
(statearr_13899[7] = inst_13845__$1);
(statearr_13899[8] = inst_13846);
return statearr_13899;
})();var statearr_13900_13924 = state_13885__$1;(statearr_13900_13924[2] = null);
(statearr_13900_13924[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13886 === 9))
{var inst_13845 = (state_13885[7]);var inst_13861 = cljs.core.vec.call(null,inst_13845);var state_13885__$1 = state_13885;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13885__$1,11,out,inst_13861);
} else
{if((state_val_13886 === 10))
{var inst_13868 = (state_13885[2]);var state_13885__$1 = state_13885;var statearr_13901_13925 = state_13885__$1;(statearr_13901_13925[2] = inst_13868);
(statearr_13901_13925[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13886 === 11))
{var inst_13849 = (state_13885[9]);var inst_13853 = (state_13885[10]);var inst_13863 = (state_13885[2]);var inst_13864 = [];var inst_13865 = inst_13864.push(inst_13849);var inst_13845 = inst_13864;var inst_13846 = inst_13853;var state_13885__$1 = (function (){var statearr_13902 = state_13885;(statearr_13902[12] = inst_13865);
(statearr_13902[13] = inst_13863);
(statearr_13902[7] = inst_13845);
(statearr_13902[8] = inst_13846);
return statearr_13902;
})();var statearr_13903_13926 = state_13885__$1;(statearr_13903_13926[2] = null);
(statearr_13903_13926[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13886 === 12))
{var inst_13845 = (state_13885[7]);var inst_13873 = cljs.core.vec.call(null,inst_13845);var state_13885__$1 = state_13885;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13885__$1,15,out,inst_13873);
} else
{if((state_val_13886 === 13))
{var state_13885__$1 = state_13885;var statearr_13904_13927 = state_13885__$1;(statearr_13904_13927[2] = null);
(statearr_13904_13927[1] = 14);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13886 === 14))
{var inst_13878 = (state_13885[2]);var inst_13879 = cljs.core.async.close_BANG_.call(null,out);var state_13885__$1 = (function (){var statearr_13905 = state_13885;(statearr_13905[14] = inst_13878);
return statearr_13905;
})();var statearr_13906_13928 = state_13885__$1;(statearr_13906_13928[2] = inst_13879);
(statearr_13906_13928[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_13886 === 15))
{var inst_13875 = (state_13885[2]);var state_13885__$1 = state_13885;var statearr_13907_13929 = state_13885__$1;(statearr_13907_13929[2] = inst_13875);
(statearr_13907_13929[1] = 14);
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
var state_machine__6318__auto____0 = (function (){var statearr_13911 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13911[0] = state_machine__6318__auto__);
(statearr_13911[1] = 1);
return statearr_13911;
});
var state_machine__6318__auto____1 = (function (state_13885){while(true){
var ret_value__6319__auto__ = (function (){try{while(true){
var result__6320__auto__ = switch__6317__auto__.call(null,state_13885);if(cljs.core.keyword_identical_QMARK_.call(null,result__6320__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6320__auto__;
}
break;
}
}catch (e13912){if((e13912 instanceof Object))
{var ex__6321__auto__ = e13912;var statearr_13913_13930 = state_13885;(statearr_13913_13930[5] = ex__6321__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13885);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e13912;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6319__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__13931 = state_13885;
state_13885 = G__13931;
continue;
}
} else
{return ret_value__6319__auto__;
}
break;
}
});
state_machine__6318__auto__ = function(state_13885){
switch(arguments.length){
case 0:
return state_machine__6318__auto____0.call(this);
case 1:
return state_machine__6318__auto____1.call(this,state_13885);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6318__auto____0;
state_machine__6318__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6318__auto____1;
return state_machine__6318__auto__;
})()
;})(switch__6317__auto__))
})();var state__6389__auto__ = (function (){var statearr_13914 = f__6388__auto__.call(null);(statearr_13914[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6387__auto___13915);
return statearr_13914;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6389__auto__);
}));
return out;
});
partition_by = function(f,ch,buf_or_n){
switch(arguments.length){
case 2:
return partition_by__2.call(this,f,ch);
case 3:
return partition_by__3.call(this,f,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
partition_by.cljs$core$IFn$_invoke$arity$2 = partition_by__2;
partition_by.cljs$core$IFn$_invoke$arity$3 = partition_by__3;
return partition_by;
})()
;

//# sourceMappingURL=async.js.map