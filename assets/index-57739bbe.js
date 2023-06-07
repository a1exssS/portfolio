const images = document.querySelectorAll('[data-src]')
const imgOptions = {
	threshold: 0,
	rootMargin: '0px 0px 300px 0px',
}

function preloadImage(img) {
	const src = img.getAttribute('data-src')

	if (!src) {
		return
	}

	img.srcset = src
}

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
	entries.forEach(entry => {
		if (!entry.isIntersecting) {
			return
		} else {
			preloadImage(entry.target)
			imgObserver.unobserve(entry.target)
		}
	})
}, imgOptions)

images.forEach(image => {
	imgObserver.observe(image)
})
;(function () {
	const t = document.createElement('link').relList
	if (t && t.supports && t.supports('modulepreload')) return
	for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i)
	new MutationObserver(i => {
		for (const n of i) if (n.type === 'childList') for (const s of n.addedNodes) s.tagName === 'LINK' && s.rel === 'modulepreload' && r(s)
	}).observe(document, {childList: !0, subtree: !0})
	function e(i) {
		const n = {}
		return i.integrity && (n.integrity = i.integrity), i.referrerPolicy && (n.referrerPolicy = i.referrerPolicy), i.crossOrigin === 'use-credentials' ? (n.credentials = 'include') : i.crossOrigin === 'anonymous' ? (n.credentials = 'omit') : (n.credentials = 'same-origin'), n
	}
	function r(i) {
		if (i.ep) return
		i.ep = !0
		const n = e(i)
		fetch(i.href, n)
	}
})()
function ys() {
	return (
		(ys = Object.assign
			? Object.assign.bind()
			: function (a) {
					for (var t = 1; t < arguments.length; t++) {
						var e = arguments[t]
						for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (a[r] = e[r])
					}
					return a
			  }),
		ys.apply(this, arguments)
	)
}
function An(a, t, e) {
	return Math.max(a, Math.min(t, e))
}
class Xl {
	advance(t) {
		var e
		if (!this.isRunning) return
		let r = !1
		if (this.lerp) (this.value = (1 - (i = this.lerp)) * this.value + i * this.to), Math.round(this.value) === this.to && ((this.value = this.to), (r = !0))
		else {
			this.currentTime += t
			const n = An(0, this.currentTime / this.duration, 1)
			r = n >= 1
			const s = r ? 1 : this.easing(n)
			this.value = this.from + (this.to - this.from) * s
		}
		var i
		;(e = this.onUpdate) == null || e.call(this, this.value, {completed: r}), r && this.stop()
	}
	stop() {
		this.isRunning = !1
	}
	fromTo(t, e, {lerp: r = 0.1, duration: i = 1, easing: n = o => o, onUpdate: s}) {
		;(this.from = this.value = t), (this.to = e), (this.lerp = r), (this.duration = i), (this.easing = n), (this.currentTime = 0), (this.isRunning = !0), (this.onUpdate = s)
	}
}
function yo(a, t) {
	let e
	return function () {
		let r = arguments,
			i = this
		clearTimeout(e),
			(e = setTimeout(function () {
				a.apply(i, r)
			}, t))
	}
}
class Nl {
	constructor(t, e) {
		;(this.onWindowResize = () => {
			;(this.width = window.innerWidth), (this.height = window.innerHeight)
		}),
			(this.onWrapperResize = () => {
				;(this.width = this.wrapper.clientWidth), (this.height = this.wrapper.clientHeight)
			}),
			(this.onContentResize = () => {
				const r = this.wrapper === window ? document.documentElement : this.wrapper
				;(this.scrollHeight = r.scrollHeight), (this.scrollWidth = r.scrollWidth)
			}),
			(this.wrapper = t),
			(this.content = e),
			this.wrapper === window ? (window.addEventListener('resize', this.onWindowResize, !1), this.onWindowResize()) : ((this.wrapperResizeObserver = new ResizeObserver(yo(this.onWrapperResize, 100))), this.wrapperResizeObserver.observe(this.wrapper), this.onWrapperResize()),
			(this.contentResizeObserver = new ResizeObserver(yo(this.onContentResize, 100))),
			this.contentResizeObserver.observe(this.content),
			this.onContentResize()
	}
	destroy() {
		var t, e
		window.removeEventListener('resize', this.onWindowResize, !1), (t = this.wrapperResizeObserver) == null || t.disconnect(), (e = this.contentResizeObserver) == null || e.disconnect()
	}
	get limit() {
		return {x: this.scrollWidth - this.width, y: this.scrollHeight - this.height}
	}
}
let ra = () => ({
	events: {},
	emit(a, ...t) {
		let e = this.events[a] || []
		for (let r = 0, i = e.length; r < i; r++) e[r](...t)
	},
	on(a, t) {
		var e
		return (
			((e = this.events[a]) != null && e.push(t)) || (this.events[a] = [t]),
			() => {
				var r
				this.events[a] = (r = this.events[a]) == null ? void 0 : r.filter(i => t !== i)
			}
		)
	},
})
class Wl {
	constructor(t, {wheelMultiplier: e = 1, touchMultiplier: r = 2, normalizeWheel: i = !1}) {
		;(this.onTouchStart = n => {
			const {clientX: s, clientY: o} = n.targetTouches ? n.targetTouches[0] : n
			;(this.touchStart.x = s), (this.touchStart.y = o), (this.lastDelta = {x: 0, y: 0})
		}),
			(this.onTouchMove = n => {
				const {clientX: s, clientY: o} = n.targetTouches ? n.targetTouches[0] : n,
					l = -(s - this.touchStart.x) * this.touchMultiplier,
					u = -(o - this.touchStart.y) * this.touchMultiplier
				;(this.touchStart.x = s), (this.touchStart.y = o), (this.lastDelta = {x: l, y: u}), this.emitter.emit('scroll', {type: 'touch', deltaX: l, deltaY: u, event: n})
			}),
			(this.onTouchEnd = n => {
				this.emitter.emit('scroll', {type: 'touch', inertia: !0, deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: n})
			}),
			(this.onWheel = n => {
				let {deltaX: s, deltaY: o} = n
				this.normalizeWheel && ((s = An(-100, s, 100)), (o = An(-100, o, 100))), (s *= this.wheelMultiplier), (o *= this.wheelMultiplier), this.emitter.emit('scroll', {type: 'wheel', deltaX: s, deltaY: o, event: n})
			}),
			(this.element = t),
			(this.wheelMultiplier = e),
			(this.touchMultiplier = r),
			(this.normalizeWheel = i),
			(this.touchStart = {x: null, y: null}),
			(this.emitter = ra()),
			this.element.addEventListener('wheel', this.onWheel, {passive: !1}),
			this.element.addEventListener('touchstart', this.onTouchStart, {passive: !1}),
			this.element.addEventListener('touchmove', this.onTouchMove, {passive: !1}),
			this.element.addEventListener('touchend', this.onTouchEnd, {passive: !1})
	}
	on(t, e) {
		return this.emitter.on(t, e)
	}
	destroy() {
		;(this.emitter.events = {}), this.element.removeEventListener('wheel', this.onWheel, {passive: !1}), this.element.removeEventListener('touchstart', this.onTouchStart, {passive: !1}), this.element.removeEventListener('touchmove', this.onTouchMove, {passive: !1}), this.element.removeEventListener('touchend', this.onTouchEnd, {passive: !1})
	}
}
class Vl {
	constructor({direction: t, gestureDirection: e, mouseMultiplier: r, smooth: i, wrapper: n = window, content: s = document.documentElement, wheelEventsTarget: o = n, smoothWheel: l = i == null || i, smoothTouch: u = !1, syncTouch: c = !1, syncTouchLerp: _ = 0.1, touchInertiaMultiplier: h = 35, duration: f, easing: p = k => Math.min(1, 1.001 - Math.pow(2, -10 * k)), lerp: d = f ? null : 0.1, infinite: m = !1, orientation: y = t ?? 'vertical', gestureOrientation: b = e ?? 'vertical', touchMultiplier: T = 1, wheelMultiplier: v = r ?? 1, normalizeWheel: S = !1} = {}) {
		;(this.onVirtualScroll = ({type: k, inertia: w, deltaX: C, deltaY: P, event: M}) => {
			if (M.ctrlKey) return
			const A = k === 'touch',
				E = k === 'wheel'
			if ((this.options.gestureOrientation === 'vertical' && P === 0) || (this.options.gestureOrientation === 'horizontal' && C === 0) || (A && this.options.gestureOrientation === 'vertical' && this.scroll === 0 && !this.options.infinite && P <= 0) || M.composedPath().find(X => (X == null || X.hasAttribute == null ? void 0 : X.hasAttribute('data-lenis-prevent')))) return
			if (this.isStopped || this.isLocked) return void M.preventDefault()
			if (((this.isSmooth = ((this.options.smoothTouch || this.options.syncTouch) && A) || (this.options.smoothWheel && E)), !this.isSmooth)) return (this.isScrolling = !1), void this.animate.stop()
			M.preventDefault()
			let q = P
			this.options.gestureOrientation === 'both' ? (q = Math.abs(P) > Math.abs(C) ? P : C) : this.options.gestureOrientation === 'horizontal' && (q = C)
			const Y = A && this.options.syncTouch,
				B = A && w && Math.abs(q) > 1
			B && (q = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + q, ys({programmatic: !1}, Y && {lerp: B ? this.syncTouchLerp : 0.4}))
		}),
			(this.onScroll = () => {
				if (!this.isScrolling) {
					const k = this.animatedScroll
					;(this.animatedScroll = this.targetScroll = this.actualScroll), (this.velocity = 0), (this.direction = Math.sign(this.animatedScroll - k)), this.emit()
				}
			}),
			t && console.warn('Lenis: `direction` option is deprecated, use `orientation` instead'),
			e && console.warn('Lenis: `gestureDirection` option is deprecated, use `gestureOrientation` instead'),
			r && console.warn('Lenis: `mouseMultiplier` option is deprecated, use `wheelMultiplier` instead'),
			i && console.warn('Lenis: `smooth` option is deprecated, use `smoothWheel` instead'),
			(window.lenisVersion = '1.0.11'),
			(n !== document.documentElement && n !== document.body) || (n = window),
			(this.options = {wrapper: n, content: s, wheelEventsTarget: o, smoothWheel: l, smoothTouch: u, syncTouch: c, syncTouchLerp: _, touchInertiaMultiplier: h, duration: f, easing: p, lerp: d, infinite: m, gestureOrientation: b, orientation: y, touchMultiplier: T, wheelMultiplier: v, normalizeWheel: S}),
			(this.dimensions = new Nl(n, s)),
			this.rootElement.classList.add('lenis'),
			(this.velocity = 0),
			(this.isStopped = !1),
			(this.isSmooth = l || u),
			(this.isScrolling = !1),
			(this.targetScroll = this.animatedScroll = this.actualScroll),
			(this.animate = new Xl()),
			(this.emitter = ra()),
			this.options.wrapper.addEventListener('scroll', this.onScroll, {passive: !1}),
			(this.virtualScroll = new Wl(o, {touchMultiplier: T, wheelMultiplier: v, normalizeWheel: S})),
			this.virtualScroll.on('scroll', this.onVirtualScroll)
	}
	destroy() {
		;(this.emitter.events = {}), this.options.wrapper.removeEventListener('scroll', this.onScroll, {passive: !1}), this.virtualScroll.destroy()
	}
	on(t, e) {
		return this.emitter.on(t, e)
	}
	off(t, e) {
		var r
		this.emitter.events[t] = (r = this.emitter.events[t]) == null ? void 0 : r.filter(i => e !== i)
	}
	setScroll(t) {
		this.isHorizontal ? (this.rootElement.scrollLeft = t) : (this.rootElement.scrollTop = t)
	}
	emit() {
		this.emitter.emit('scroll', this)
	}
	reset() {
		;(this.isLocked = !1), (this.isScrolling = !1), (this.velocity = 0), this.animate.stop()
	}
	start() {
		;(this.isStopped = !1), this.reset()
	}
	stop() {
		;(this.isStopped = !0), this.animate.stop(), this.reset()
	}
	raf(t) {
		const e = t - (this.time || t)
		;(this.time = t), this.animate.advance(0.001 * e)
	}
	scrollTo(t, {offset: e = 0, immediate: r = !1, lock: i = !1, duration: n = this.options.duration, easing: s = this.options.easing, lerp: o = !n && this.options.lerp, onComplete: l = null, force: u = !1, programmatic: c = !0} = {}) {
		if (!this.isStopped || u) {
			if (['top', 'left', 'start'].includes(t)) t = 0
			else if (['bottom', 'right', 'end'].includes(t)) t = this.limit
			else {
				var _
				let h
				if ((typeof t == 'string' ? (h = document.querySelector(t)) : (_ = t) != null && _.nodeType && (h = t), h)) {
					if (this.options.wrapper !== window) {
						const p = this.options.wrapper.getBoundingClientRect()
						e -= this.isHorizontal ? p.left : p.top
					}
					const f = h.getBoundingClientRect()
					t = (this.isHorizontal ? f.left : f.top) + this.animatedScroll
				}
			}
			if (typeof t == 'number') {
				if (((t += e), (t = Math.round(t)), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : (t = An(0, t, this.limit)), r)) return (this.animatedScroll = this.targetScroll = t), this.setScroll(this.scroll), this.reset(), this.emit(), void (l == null || l())
				if (!c) {
					if (t === this.targetScroll) return
					this.targetScroll = t
				}
				this.animate.fromTo(this.animatedScroll, t, {
					duration: n,
					easing: s,
					lerp: o,
					onUpdate: (h, {completed: f}) => {
						i && (this.isLocked = !0),
							(this.isScrolling = !0),
							(this.velocity = h - this.animatedScroll),
							(this.direction = Math.sign(this.velocity)),
							(this.animatedScroll = h),
							this.setScroll(this.scroll),
							c && (this.targetScroll = h),
							f &&
								(i && (this.isLocked = !1),
								requestAnimationFrame(() => {
									this.isScrolling = !1
								}),
								(this.velocity = 0),
								l == null || l()),
							this.emit()
					},
				})
			}
		}
	}
	get rootElement() {
		return this.options.wrapper === window ? this.options.content : this.options.wrapper
	}
	get limit() {
		return this.isHorizontal ? this.dimensions.limit.x : this.dimensions.limit.y
	}
	get isHorizontal() {
		return this.options.orientation === 'horizontal'
	}
	get actualScroll() {
		return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop
	}
	get scroll() {
		return this.options.infinite
			? (function (t, e) {
					let r = t % e
					return ((e > 0 && r < 0) || (e < 0 && r > 0)) && (r += e), r
			  })(this.animatedScroll, this.limit)
			: this.animatedScroll
	}
	get progress() {
		return this.limit === 0 ? 1 : this.scroll / this.limit
	}
	get isSmooth() {
		return this.__isSmooth
	}
	set isSmooth(t) {
		this.__isSmooth !== t && (this.rootElement.classList.toggle('lenis-smooth', t), (this.__isSmooth = t))
	}
	get isScrolling() {
		return this.__isScrolling
	}
	set isScrolling(t) {
		this.__isScrolling !== t && (this.rootElement.classList.toggle('lenis-scrolling', t), (this.__isScrolling = t))
	}
	get isStopped() {
		return this.__isStopped
	}
	set isStopped(t) {
		this.__isStopped !== t && (this.rootElement.classList.toggle('lenis-stopped', t), (this.__isStopped = t))
	}
}
function Je(a) {
	if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
	return a
}
function ia(a, t) {
	;(a.prototype = Object.create(t.prototype)), (a.prototype.constructor = a), (a.__proto__ = t)
}
/*!
 * GSAP 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */ var ye = {autoSleep: 120, force3D: 'auto', nullTargetWarn: 1, units: {lineHeight: ''}},
	_i = {duration: 0.5, overwrite: !1, delay: 0},
	Us,
	Xt,
	vt,
	Pe = 1e8,
	et = 1 / Pe,
	vs = Math.PI * 2,
	$l = vs / 4,
	Ul = 0,
	na = Math.sqrt,
	ql = Math.cos,
	Hl = Math.sin,
	Et = function (t) {
		return typeof t == 'string'
	},
	ht = function (t) {
		return typeof t == 'function'
	},
	sr = function (t) {
		return typeof t == 'number'
	},
	qs = function (t) {
		return typeof t > 'u'
	},
	Ke = function (t) {
		return typeof t == 'object'
	},
	ne = function (t) {
		return t !== !1
	},
	Hs = function () {
		return typeof window < 'u'
	},
	un = function (t) {
		return ht(t) || Et(t)
	},
	sa = (typeof ArrayBuffer == 'function' && ArrayBuffer.isView) || function () {},
	Nt = Array.isArray,
	xs = /(?:-?\.?\d|\.)+/gi,
	oa = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
	si = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
	es = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
	aa = /[+-]=-?[.\d]+/,
	la = /[^,'"\[\]\s]+/gi,
	Gl = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
	lt,
	be,
	ws,
	Gs,
	ve = {},
	Rn = {},
	ua,
	ca = function (t) {
		return (Rn = Ur(t, ve)) && ae
	},
	Ks = function (t, e) {
		return console.warn('Invalid property', t, 'set to', e, 'Missing plugin? gsap.registerPlugin()')
	},
	Ln = function (t, e) {
		return !e && console.warn(t)
	},
	fa = function (t, e) {
		return (t && (ve[t] = e) && Rn && (Rn[t] = e)) || ve
	},
	Qi = function () {
		return 0
	},
	Kl = {suppressEvents: !0, isStart: !0, kill: !1},
	Tn = {suppressEvents: !0, kill: !1},
	Zl = {suppressEvents: !0},
	Zs = {},
	yr = [],
	Ts = {},
	ha,
	_e = {},
	rs = {},
	vo = 30,
	bn = [],
	Qs = '',
	js = function (t) {
		var e = t[0],
			r,
			i
		if ((Ke(e) || ht(e) || (t = [t]), !(r = (e._gsap || {}).harness))) {
			for (i = bn.length; i-- && !bn[i].targetTest(e); );
			r = bn[i]
		}
		for (i = t.length; i--; ) (t[i] && (t[i]._gsap || (t[i]._gsap = new Fa(t[i], r)))) || t.splice(i, 1)
		return t
	},
	Ir = function (t) {
		return t._gsap || js(ke(t))[0]._gsap
	},
	da = function (t, e, r) {
		return (r = t[e]) && ht(r) ? t[e]() : (qs(r) && t.getAttribute && t.getAttribute(e)) || r
	},
	se = function (t, e) {
		return (t = t.split(',')).forEach(e) || t
	},
	gt = function (t) {
		return Math.round(t * 1e5) / 1e5 || 0
	},
	Rt = function (t) {
		return Math.round(t * 1e7) / 1e7 || 0
	},
	ui = function (t, e) {
		var r = e.charAt(0),
			i = parseFloat(e.substr(2))
		return (t = parseFloat(t)), r === '+' ? t + i : r === '-' ? t - i : r === '*' ? t * i : t / i
	},
	Ql = function (t, e) {
		for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r; );
		return i < r
	},
	zn = function () {
		var t = yr.length,
			e = yr.slice(0),
			r,
			i
		for (Ts = {}, yr.length = 0, r = 0; r < t; r++) (i = e[r]), i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0)
	},
	_a = function (t, e, r, i) {
		yr.length && !Xt && zn(), t.render(e, r, i || (Xt && e < 0 && (t._initted || t._startAt))), yr.length && !Xt && zn()
	},
	pa = function (t) {
		var e = parseFloat(t)
		return (e || e === 0) && (t + '').match(la).length < 2 ? e : Et(t) ? t.trim() : t
	},
	ga = function (t) {
		return t
	},
	Me = function (t, e) {
		for (var r in e) r in t || (t[r] = e[r])
		return t
	},
	jl = function (t) {
		return function (e, r) {
			for (var i in r) i in e || (i === 'duration' && t) || i === 'ease' || (e[i] = r[i])
		}
	},
	Ur = function (t, e) {
		for (var r in e) t[r] = e[r]
		return t
	},
	xo = function a(t, e) {
		for (var r in e) r !== '__proto__' && r !== 'constructor' && r !== 'prototype' && (t[r] = Ke(e[r]) ? a(t[r] || (t[r] = {}), e[r]) : e[r])
		return t
	},
	Fn = function (t, e) {
		var r = {},
			i
		for (i in t) i in e || (r[i] = t[i])
		return r
	},
	Ii = function (t) {
		var e = t.parent || lt,
			r = t.keyframes ? jl(Nt(t.keyframes)) : Me
		if (ne(t.inherit)) for (; e; ) r(t, e.vars.defaults), (e = e.parent || e._dp)
		return t
	},
	Jl = function (t, e) {
		for (var r = t.length, i = r === e.length; i && r-- && t[r] === e[r]; );
		return r < 0
	},
	ma = function (t, e, r, i, n) {
		r === void 0 && (r = '_first'), i === void 0 && (i = '_last')
		var s = t[i],
			o
		if (n) for (o = e[n]; s && s[n] > o; ) s = s._prev
		return s ? ((e._next = s._next), (s._next = e)) : ((e._next = t[r]), (t[r] = e)), e._next ? (e._next._prev = e) : (t[i] = e), (e._prev = s), (e.parent = e._dp = t), e
	},
	Zn = function (t, e, r, i) {
		r === void 0 && (r = '_first'), i === void 0 && (i = '_last')
		var n = e._prev,
			s = e._next
		n ? (n._next = s) : t[r] === e && (t[r] = s), s ? (s._prev = n) : t[i] === e && (t[i] = n), (e._next = e._prev = e.parent = null)
	},
	Tr = function (t, e) {
		t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t), (t._act = 0)
	},
	Yr = function (t, e) {
		if (t && (!e || e._end > t._dur || e._start < 0)) for (var r = t; r; ) (r._dirty = 1), (r = r.parent)
		return t
	},
	tu = function (t) {
		for (var e = t.parent; e && e.parent; ) (e._dirty = 1), e.totalDuration(), (e = e.parent)
		return t
	},
	bs = function (t, e, r, i) {
		return t._startAt && (Xt ? t._startAt.revert(Tn) : (t.vars.immediateRender && !t.vars.autoRevert) || t._startAt.render(e, !0, i))
	},
	eu = function a(t) {
		return !t || (t._ts && a(t.parent))
	},
	wo = function (t) {
		return t._repeat ? pi(t._tTime, (t = t.duration() + t._rDelay)) * t : 0
	},
	pi = function (t, e) {
		var r = Math.floor((t /= e))
		return t && r === t ? r - 1 : r
	},
	Bn = function (t, e) {
		return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
	},
	Qn = function (t) {
		return (t._end = Rt(t._start + (t._tDur / Math.abs(t._ts || t._rts || et) || 0)))
	},
	jn = function (t, e) {
		var r = t._dp
		return r && r.smoothChildTiming && t._ts && ((t._start = Rt(r._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts))), Qn(t), r._dirty || Yr(r, t)), t
	},
	ya = function (t, e) {
		var r
		if (((e._time || (e._initted && !e._dur)) && ((r = Bn(t.rawTime(), e)), (!e._dur || an(0, e.totalDuration(), r) - e._tTime > et) && e.render(r, !0)), Yr(t, e)._dp && t._initted && t._time >= t._dur && t._ts)) {
			if (t._dur < t.duration()) for (r = t; r._dp; ) r.rawTime() >= 0 && r.totalTime(r._tTime), (r = r._dp)
			t._zTime = -et
		}
	},
	$e = function (t, e, r, i) {
		return e.parent && Tr(e), (e._start = Rt((sr(r) ? r : r || t !== lt ? Te(t, r, e) : t._time) + e._delay)), (e._end = Rt(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0))), ma(t, e, '_first', '_last', t._sort ? '_start' : 0), Ss(e) || (t._recent = e), i || ya(t, e), t._ts < 0 && jn(t, t._tTime), t
	},
	va = function (t, e) {
		return (ve.ScrollTrigger || Ks('scrollTrigger', e)) && ve.ScrollTrigger.create(e, t)
	},
	xa = function (t, e, r, i, n) {
		if ((to(t, e, n), !t._initted)) return 1
		if (!r && t._pt && !Xt && ((t._dur && t.vars.lazy !== !1) || (!t._dur && t.vars.lazy)) && ha !== ge.frame) return yr.push(t), (t._lazy = [n, i]), 1
	},
	ru = function a(t) {
		var e = t.parent
		return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || a(e))
	},
	Ss = function (t) {
		var e = t.data
		return e === 'isFromStart' || e === 'isStart'
	},
	iu = function (t, e, r, i) {
		var n = t.ratio,
			s = e < 0 || (!e && ((!t._start && ru(t) && !(!t._initted && Ss(t))) || ((t._ts < 0 || t._dp._ts < 0) && !Ss(t)))) ? 0 : 1,
			o = t._rDelay,
			l = 0,
			u,
			c,
			_
		if ((o && t._repeat && ((l = an(0, t._tDur, e)), (c = pi(l, o)), t._yoyo && c & 1 && (s = 1 - s), c !== pi(t._tTime, o) && ((n = 1 - s), t.vars.repeatRefresh && t._initted && t.invalidate())), s !== n || Xt || i || t._zTime === et || (!e && t._zTime))) {
			if (!t._initted && xa(t, e, i, r, l)) return
			for (_ = t._zTime, t._zTime = e || (r ? et : 0), r || (r = e && !_), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = l, u = t._pt; u; ) u.r(s, u.d), (u = u._next)
			e < 0 && bs(t, e, r, !0), t._onUpdate && !r && Ce(t, 'onUpdate'), l && t._repeat && !r && t.parent && Ce(t, 'onRepeat'), (e >= t._tDur || e < 0) && t.ratio === s && (s && Tr(t, 1), !r && !Xt && (Ce(t, s ? 'onComplete' : 'onReverseComplete', !0), t._prom && t._prom()))
		} else t._zTime || (t._zTime = e)
	},
	nu = function (t, e, r) {
		var i
		if (r > e)
			for (i = t._first; i && i._start <= r; ) {
				if (i.data === 'isPause' && i._start > e) return i
				i = i._next
			}
		else
			for (i = t._last; i && i._start >= r; ) {
				if (i.data === 'isPause' && i._start < e) return i
				i = i._prev
			}
	},
	gi = function (t, e, r, i) {
		var n = t._repeat,
			s = Rt(e) || 0,
			o = t._tTime / t._tDur
		return o && !i && (t._time *= s / t._dur), (t._dur = s), (t._tDur = n ? (n < 0 ? 1e10 : Rt(s * (n + 1) + t._rDelay * n)) : s), o > 0 && !i && jn(t, (t._tTime = t._tDur * o)), t.parent && Qn(t), r || Yr(t.parent, t), t
	},
	To = function (t) {
		return t instanceof ie ? Yr(t) : gi(t, t._dur)
	},
	su = {_start: 0, endTime: Qi, totalDuration: Qi},
	Te = function a(t, e, r) {
		var i = t.labels,
			n = t._recent || su,
			s = t.duration() >= Pe ? n.endTime(!1) : t._dur,
			o,
			l,
			u
		return Et(e) && (isNaN(e) || e in i) ? ((l = e.charAt(0)), (u = e.substr(-1) === '%'), (o = e.indexOf('=')), l === '<' || l === '>' ? (o >= 0 && (e = e.replace(/=/, '')), (l === '<' ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (u ? (o < 0 ? n : r).totalDuration() / 100 : 1)) : o < 0 ? (e in i || (i[e] = s), i[e]) : ((l = parseFloat(e.charAt(o - 1) + e.substr(o + 1))), u && r && (l = (l / 100) * (Nt(r) ? r[0] : r).totalDuration()), o > 1 ? a(t, e.substr(0, o - 1), r) + l : s + l)) : e == null ? s : +e
	},
	Yi = function (t, e, r) {
		var i = sr(e[1]),
			n = (i ? 2 : 1) + (t < 2 ? 0 : 1),
			s = e[n],
			o,
			l
		if ((i && (s.duration = e[1]), (s.parent = r), t)) {
			for (o = s, l = r; l && !('immediateRender' in o); ) (o = l.vars.defaults || {}), (l = ne(l.vars.inherit) && l.parent)
			;(s.immediateRender = ne(o.immediateRender)), t < 2 ? (s.runBackwards = 1) : (s.startAt = e[n - 1])
		}
		return new wt(e[0], s, e[n + 1])
	},
	Pr = function (t, e) {
		return t || t === 0 ? e(t) : e
	},
	an = function (t, e, r) {
		return r < t ? t : r > e ? e : r
	},
	Yt = function (t, e) {
		return !Et(t) || !(e = Gl.exec(t)) ? '' : e[1]
	},
	ou = function (t, e, r) {
		return Pr(r, function (i) {
			return an(t, e, i)
		})
	},
	Ps = [].slice,
	wa = function (t, e) {
		return t && Ke(t) && 'length' in t && ((!e && !t.length) || (t.length - 1 in t && Ke(t[0]))) && !t.nodeType && t !== be
	},
	au = function (t, e, r) {
		return (
			r === void 0 && (r = []),
			t.forEach(function (i) {
				var n
				return (Et(i) && !e) || wa(i, 1) ? (n = r).push.apply(n, ke(i)) : r.push(i)
			}) || r
		)
	},
	ke = function (t, e, r) {
		return vt && !e && vt.selector ? vt.selector(t) : Et(t) && !r && (ws || !mi()) ? Ps.call((e || Gs).querySelectorAll(t), 0) : Nt(t) ? au(t, r) : wa(t) ? Ps.call(t, 0) : t ? [t] : []
	},
	ks = function (t) {
		return (
			(t = ke(t)[0] || Ln('Invalid scope') || {}),
			function (e) {
				var r = t.current || t.nativeElement || t
				return ke(e, r.querySelectorAll ? r : r === t ? Ln('Invalid scope') || Gs.createElement('div') : t)
			}
		)
	},
	Ta = function (t) {
		return t.sort(function () {
			return 0.5 - Math.random()
		})
	},
	ba = function (t) {
		if (ht(t)) return t
		var e = Ke(t) ? t : {each: t},
			r = Xr(e.ease),
			i = e.from || 0,
			n = parseFloat(e.base) || 0,
			s = {},
			o = i > 0 && i < 1,
			l = isNaN(i) || o,
			u = e.axis,
			c = i,
			_ = i
		return (
			Et(i) ? (c = _ = {center: 0.5, edges: 0.5, end: 1}[i] || 0) : !o && l && ((c = i[0]), (_ = i[1])),
			function (h, f, p) {
				var d = (p || e).length,
					m = s[d],
					y,
					b,
					T,
					v,
					S,
					k,
					w,
					C,
					P
				if (!m) {
					if (((P = e.grid === 'auto' ? 0 : (e.grid || [1, Pe])[1]), !P)) {
						for (w = -Pe; w < (w = p[P++].getBoundingClientRect().left) && P < d; );
						P--
					}
					for (m = s[d] = [], y = l ? Math.min(P, d) * c - 0.5 : i % P, b = P === Pe ? 0 : l ? (d * _) / P - 0.5 : (i / P) | 0, w = 0, C = Pe, k = 0; k < d; k++) (T = (k % P) - y), (v = b - ((k / P) | 0)), (m[k] = S = u ? Math.abs(u === 'y' ? v : T) : na(T * T + v * v)), S > w && (w = S), S < C && (C = S)
					i === 'random' && Ta(m), (m.max = w - C), (m.min = C), (m.v = d = (parseFloat(e.amount) || parseFloat(e.each) * (P > d ? d - 1 : u ? (u === 'y' ? d / P : P) : Math.max(P, d / P)) || 0) * (i === 'edges' ? -1 : 1)), (m.b = d < 0 ? n - d : n), (m.u = Yt(e.amount || e.each) || 0), (r = r && d < 0 ? Ra(r) : r)
				}
				return (d = (m[h] - m.min) / m.max || 0), Rt(m.b + (r ? r(d) : d) * m.v) + m.u
			}
		)
	},
	Cs = function (t) {
		var e = Math.pow(10, ((t + '').split('.')[1] || '').length)
		return function (r) {
			var i = Rt(Math.round(parseFloat(r) / t) * t * e)
			return (i - (i % 1)) / e + (sr(r) ? 0 : Yt(r))
		}
	},
	Sa = function (t, e) {
		var r = Nt(t),
			i,
			n
		return (
			!r && Ke(t) && ((i = r = t.radius || Pe), t.values ? ((t = ke(t.values)), (n = !sr(t[0])) && (i *= i)) : (t = Cs(t.increment))),
			Pr(
				e,
				r
					? ht(t)
						? function (s) {
								return (n = t(s)), Math.abs(n - s) <= i ? n : s
						  }
						: function (s) {
								for (var o = parseFloat(n ? s.x : s), l = parseFloat(n ? s.y : 0), u = Pe, c = 0, _ = t.length, h, f; _--; ) n ? ((h = t[_].x - o), (f = t[_].y - l), (h = h * h + f * f)) : (h = Math.abs(t[_] - o)), h < u && ((u = h), (c = _))
								return (c = !i || u <= i ? t[c] : s), n || c === s || sr(s) ? c : c + Yt(s)
						  }
					: Cs(t)
			)
		)
	},
	Pa = function (t, e, r, i) {
		return Pr(Nt(t) ? !e : r === !0 ? !!(r = 0) : !i, function () {
			return Nt(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + '').length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + r * 0.99)) / r) * r * i) / i
		})
	},
	lu = function () {
		for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r]
		return function (i) {
			return e.reduce(function (n, s) {
				return s(n)
			}, i)
		}
	},
	uu = function (t, e) {
		return function (r) {
			return t(parseFloat(r)) + (e || Yt(r))
		}
	},
	cu = function (t, e, r) {
		return Ca(t, e, 0, 1, r)
	},
	ka = function (t, e, r) {
		return Pr(r, function (i) {
			return t[~~e(i)]
		})
	},
	fu = function a(t, e, r) {
		var i = e - t
		return Nt(t)
			? ka(t, a(0, t.length), e)
			: Pr(r, function (n) {
					return ((i + ((n - t) % i)) % i) + t
			  })
	},
	hu = function a(t, e, r) {
		var i = e - t,
			n = i * 2
		return Nt(t)
			? ka(t, a(0, t.length - 1), e)
			: Pr(r, function (s) {
					return (s = (n + ((s - t) % n)) % n || 0), t + (s > i ? n - s : s)
			  })
	},
	ji = function (t) {
		for (var e = 0, r = '', i, n, s, o; ~(i = t.indexOf('random(', e)); ) (s = t.indexOf(')', i)), (o = t.charAt(i + 7) === '['), (n = t.substr(i + 7, s - i - 7).match(o ? la : xs)), (r += t.substr(e, i - e) + Pa(o ? n : +n[0], o ? 0 : +n[1], +n[2] || 1e-5)), (e = s + 1)
		return r + t.substr(e, t.length - e)
	},
	Ca = function (t, e, r, i, n) {
		var s = e - t,
			o = i - r
		return Pr(n, function (l) {
			return r + (((l - t) / s) * o || 0)
		})
	},
	du = function a(t, e, r, i) {
		var n = isNaN(t + e)
			? 0
			: function (f) {
					return (1 - f) * t + f * e
			  }
		if (!n) {
			var s = Et(t),
				o = {},
				l,
				u,
				c,
				_,
				h
			if ((r === !0 && (i = 1) && (r = null), s)) (t = {p: t}), (e = {p: e})
			else if (Nt(t) && !Nt(e)) {
				for (c = [], _ = t.length, h = _ - 2, u = 1; u < _; u++) c.push(a(t[u - 1], t[u]))
				_--,
					(n = function (p) {
						p *= _
						var d = Math.min(h, ~~p)
						return c[d](p - d)
					}),
					(r = e)
			} else i || (t = Ur(Nt(t) ? [] : {}, t))
			if (!c) {
				for (l in e) Js.call(o, t, l, 'get', e[l])
				n = function (p) {
					return io(p, o) || (s ? t.p : t)
				}
			}
		}
		return Pr(r, n)
	},
	bo = function (t, e, r) {
		var i = t.labels,
			n = Pe,
			s,
			o,
			l
		for (s in i) (o = i[s] - e), o < 0 == !!r && o && n > (o = Math.abs(o)) && ((l = s), (n = o))
		return l
	},
	Ce = function (t, e, r) {
		var i = t.vars,
			n = i[e],
			s = vt,
			o = t._ctx,
			l,
			u,
			c
		if (n) return (l = i[e + 'Params']), (u = i.callbackScope || t), r && yr.length && zn(), o && (vt = o), (c = l ? n.apply(u, l) : n.call(u)), (vt = s), c
	},
	Ai = function (t) {
		return Tr(t), t.scrollTrigger && t.scrollTrigger.kill(!!Xt), t.progress() < 1 && Ce(t, 'onInterrupt'), t
	},
	oi,
	Oa = [],
	Ma = function (t) {
		if (!Hs()) {
			Oa.push(t)
			return
		}
		t = (!t.name && t.default) || t
		var e = t.name,
			r = ht(t),
			i =
				e && !r && t.init
					? function () {
							this._props = []
					  }
					: t,
			n = {init: Qi, render: io, add: Js, kill: Mu, modifier: Ou, rawVars: 0},
			s = {targetTest: 0, get: 0, getSetter: ro, aliases: {}, register: 0}
		if ((mi(), t !== i)) {
			if (_e[e]) return
			Me(i, Me(Fn(t, n), s)), Ur(i.prototype, Ur(n, Fn(t, s))), (_e[(i.prop = e)] = i), t.targetTest && (bn.push(i), (Zs[e] = 1)), (e = (e === 'css' ? 'CSS' : e.charAt(0).toUpperCase() + e.substr(1)) + 'Plugin')
		}
		fa(e, i), t.register && t.register(ae, i, oe)
	},
	tt = 255,
	Ri = {aqua: [0, tt, tt], lime: [0, tt, 0], silver: [192, 192, 192], black: [0, 0, 0], maroon: [128, 0, 0], teal: [0, 128, 128], blue: [0, 0, tt], navy: [0, 0, 128], white: [tt, tt, tt], olive: [128, 128, 0], yellow: [tt, tt, 0], orange: [tt, 165, 0], gray: [128, 128, 128], purple: [128, 0, 128], green: [0, 128, 0], red: [tt, 0, 0], pink: [tt, 192, 203], cyan: [0, tt, tt], transparent: [tt, tt, tt, 0]},
	is = function (t, e, r) {
		return (t += t < 0 ? 1 : t > 1 ? -1 : 0), ((t * 6 < 1 ? e + (r - e) * t * 6 : t < 0.5 ? r : t * 3 < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * tt + 0.5) | 0
	},
	Ea = function (t, e, r) {
		var i = t ? (sr(t) ? [t >> 16, (t >> 8) & tt, t & tt] : 0) : Ri.black,
			n,
			s,
			o,
			l,
			u,
			c,
			_,
			h,
			f,
			p
		if (!i) {
			if ((t.substr(-1) === ',' && (t = t.substr(0, t.length - 1)), Ri[t])) i = Ri[t]
			else if (t.charAt(0) === '#') {
				if ((t.length < 6 && ((n = t.charAt(1)), (s = t.charAt(2)), (o = t.charAt(3)), (t = '#' + n + n + s + s + o + o + (t.length === 5 ? t.charAt(4) + t.charAt(4) : ''))), t.length === 9)) return (i = parseInt(t.substr(1, 6), 16)), [i >> 16, (i >> 8) & tt, i & tt, parseInt(t.substr(7), 16) / 255]
				;(t = parseInt(t.substr(1), 16)), (i = [t >> 16, (t >> 8) & tt, t & tt])
			} else if (t.substr(0, 3) === 'hsl') {
				if (((i = p = t.match(xs)), !e)) (l = (+i[0] % 360) / 360), (u = +i[1] / 100), (c = +i[2] / 100), (s = c <= 0.5 ? c * (u + 1) : c + u - c * u), (n = c * 2 - s), i.length > 3 && (i[3] *= 1), (i[0] = is(l + 1 / 3, n, s)), (i[1] = is(l, n, s)), (i[2] = is(l - 1 / 3, n, s))
				else if (~t.indexOf('=')) return (i = t.match(oa)), r && i.length < 4 && (i[3] = 1), i
			} else i = t.match(xs) || Ri.transparent
			i = i.map(Number)
		}
		return e && !p && ((n = i[0] / tt), (s = i[1] / tt), (o = i[2] / tt), (_ = Math.max(n, s, o)), (h = Math.min(n, s, o)), (c = (_ + h) / 2), _ === h ? (l = u = 0) : ((f = _ - h), (u = c > 0.5 ? f / (2 - _ - h) : f / (_ + h)), (l = _ === n ? (s - o) / f + (s < o ? 6 : 0) : _ === s ? (o - n) / f + 2 : (n - s) / f + 4), (l *= 60)), (i[0] = ~~(l + 0.5)), (i[1] = ~~(u * 100 + 0.5)), (i[2] = ~~(c * 100 + 0.5))), r && i.length < 4 && (i[3] = 1), i
	},
	Da = function (t) {
		var e = [],
			r = [],
			i = -1
		return (
			t.split(vr).forEach(function (n) {
				var s = n.match(si) || []
				e.push.apply(e, s), r.push((i += s.length + 1))
			}),
			(e.c = r),
			e
		)
	},
	So = function (t, e, r) {
		var i = '',
			n = (t + i).match(vr),
			s = e ? 'hsla(' : 'rgba(',
			o = 0,
			l,
			u,
			c,
			_
		if (!n) return t
		if (
			((n = n.map(function (h) {
				return (h = Ea(h, e, 1)) && s + (e ? h[0] + ',' + h[1] + '%,' + h[2] + '%,' + h[3] : h.join(',')) + ')'
			})),
			r && ((c = Da(t)), (l = r.c), l.join(i) !== c.c.join(i)))
		)
			for (u = t.replace(vr, '1').split(si), _ = u.length - 1; o < _; o++) i += u[o] + (~l.indexOf(o) ? n.shift() || s + '0,0,0,0)' : (c.length ? c : n.length ? n : r).shift())
		if (!u) for (u = t.split(vr), _ = u.length - 1; o < _; o++) i += u[o] + n[o]
		return i + u[_]
	},
	vr = (function () {
		var a = '(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b',
			t
		for (t in Ri) a += '|' + t + '\\b'
		return new RegExp(a + ')', 'gi')
	})(),
	_u = /hsl[a]?\(/,
	Aa = function (t) {
		var e = t.join(' '),
			r
		if (((vr.lastIndex = 0), vr.test(e))) return (r = _u.test(e)), (t[1] = So(t[1], r)), (t[0] = So(t[0], r, Da(t[1]))), !0
	},
	Ji,
	ge = (function () {
		var a = Date.now,
			t = 500,
			e = 33,
			r = a(),
			i = r,
			n = 1e3 / 240,
			s = n,
			o = [],
			l,
			u,
			c,
			_,
			h,
			f,
			p = function d(m) {
				var y = a() - i,
					b = m === !0,
					T,
					v,
					S,
					k
				if ((y > t && (r += y - e), (i += y), (S = i - r), (T = S - s), (T > 0 || b) && ((k = ++_.frame), (h = S - _.time * 1e3), (_.time = S = S / 1e3), (s += T + (T >= n ? 4 : n - T)), (v = 1)), b || (l = u(d)), v)) for (f = 0; f < o.length; f++) o[f](S, h, k, m)
			}
		return (
			(_ = {
				time: 0,
				frame: 0,
				tick: function () {
					p(!0)
				},
				deltaRatio: function (m) {
					return h / (1e3 / (m || 60))
				},
				wake: function () {
					ua &&
						(!ws && Hs() && ((be = ws = window), (Gs = be.document || {}), (ve.gsap = ae), (be.gsapVersions || (be.gsapVersions = [])).push(ae.version), ca(Rn || be.GreenSockGlobals || (!be.gsap && be) || {}), (c = be.requestAnimationFrame), Oa.forEach(Ma)),
						l && _.sleep(),
						(u =
							c ||
							function (m) {
								return setTimeout(m, (s - _.time * 1e3 + 1) | 0)
							}),
						(Ji = 1),
						p(2))
				},
				sleep: function () {
					;(c ? be.cancelAnimationFrame : clearTimeout)(l), (Ji = 0), (u = Qi)
				},
				lagSmoothing: function (m, y) {
					;(t = m || 1 / 0), (e = Math.min(y || 33, t))
				},
				fps: function (m) {
					;(n = 1e3 / (m || 240)), (s = _.time * 1e3 + n)
				},
				add: function (m, y, b) {
					var T = y
						? function (v, S, k, w) {
								m(v, S, k, w), _.remove(T)
						  }
						: m
					return _.remove(m), o[b ? 'unshift' : 'push'](T), mi(), T
				},
				remove: function (m, y) {
					~(y = o.indexOf(m)) && o.splice(y, 1) && f >= y && f--
				},
				_listeners: o,
			}),
			_
		)
	})(),
	mi = function () {
		return !Ji && ge.wake()
	},
	Z = {},
	pu = /^[\d.\-M][\d.\-,\s]/,
	gu = /["']/g,
	mu = function (t) {
		for (var e = {}, r = t.substr(1, t.length - 3).split(':'), i = r[0], n = 1, s = r.length, o, l, u; n < s; n++) (l = r[n]), (o = n !== s - 1 ? l.lastIndexOf(',') : l.length), (u = l.substr(0, o)), (e[i] = isNaN(u) ? u.replace(gu, '').trim() : +u), (i = l.substr(o + 1).trim())
		return e
	},
	yu = function (t) {
		var e = t.indexOf('(') + 1,
			r = t.indexOf(')'),
			i = t.indexOf('(', e)
		return t.substring(e, ~i && i < r ? t.indexOf(')', r + 1) : r)
	},
	vu = function (t) {
		var e = (t + '').split('('),
			r = Z[e[0]]
		return r && e.length > 1 && r.config ? r.config.apply(null, ~t.indexOf('{') ? [mu(e[1])] : yu(t).split(',').map(pa)) : Z._CE && pu.test(t) ? Z._CE('', t) : r
	},
	Ra = function (t) {
		return function (e) {
			return 1 - t(1 - e)
		}
	},
	La = function a(t, e) {
		for (var r = t._first, i; r; ) r instanceof ie ? a(r, e) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== e && (r.timeline ? a(r.timeline, e) : ((i = r._ease), (r._ease = r._yEase), (r._yEase = i), (r._yoyo = e))), (r = r._next)
	},
	Xr = function (t, e) {
		return (t && (ht(t) ? t : Z[t] || vu(t))) || e
	},
	Kr = function (t, e, r, i) {
		r === void 0 &&
			(r = function (l) {
				return 1 - e(1 - l)
			}),
			i === void 0 &&
				(i = function (l) {
					return l < 0.5 ? e(l * 2) / 2 : 1 - e((1 - l) * 2) / 2
				})
		var n = {easeIn: e, easeOut: r, easeInOut: i},
			s
		return (
			se(t, function (o) {
				;(Z[o] = ve[o] = n), (Z[(s = o.toLowerCase())] = r)
				for (var l in n) Z[s + (l === 'easeIn' ? '.in' : l === 'easeOut' ? '.out' : '.inOut')] = Z[o + '.' + l] = n[l]
			}),
			n
		)
	},
	za = function (t) {
		return function (e) {
			return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2
		}
	},
	ns = function a(t, e, r) {
		var i = e >= 1 ? e : 1,
			n = (r || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1),
			s = (n / vs) * (Math.asin(1 / i) || 0),
			o = function (c) {
				return c === 1 ? 1 : i * Math.pow(2, -10 * c) * Hl((c - s) * n) + 1
			},
			l =
				t === 'out'
					? o
					: t === 'in'
					? function (u) {
							return 1 - o(1 - u)
					  }
					: za(o)
		return (
			(n = vs / n),
			(l.config = function (u, c) {
				return a(t, u, c)
			}),
			l
		)
	},
	ss = function a(t, e) {
		e === void 0 && (e = 1.70158)
		var r = function (s) {
				return s ? --s * s * ((e + 1) * s + e) + 1 : 0
			},
			i =
				t === 'out'
					? r
					: t === 'in'
					? function (n) {
							return 1 - r(1 - n)
					  }
					: za(r)
		return (
			(i.config = function (n) {
				return a(t, n)
			}),
			i
		)
	}
se('Linear,Quad,Cubic,Quart,Quint,Strong', function (a, t) {
	var e = t < 5 ? t + 1 : t
	Kr(
		a + ',Power' + (e - 1),
		t
			? function (r) {
					return Math.pow(r, e)
			  }
			: function (r) {
					return r
			  },
		function (r) {
			return 1 - Math.pow(1 - r, e)
		},
		function (r) {
			return r < 0.5 ? Math.pow(r * 2, e) / 2 : 1 - Math.pow((1 - r) * 2, e) / 2
		}
	)
})
Z.Linear.easeNone = Z.none = Z.Linear.easeIn
Kr('Elastic', ns('in'), ns('out'), ns())
;(function (a, t) {
	var e = 1 / t,
		r = 2 * e,
		i = 2.5 * e,
		n = function (o) {
			return o < e ? a * o * o : o < r ? a * Math.pow(o - 1.5 / t, 2) + 0.75 : o < i ? a * (o -= 2.25 / t) * o + 0.9375 : a * Math.pow(o - 2.625 / t, 2) + 0.984375
		}
	Kr(
		'Bounce',
		function (s) {
			return 1 - n(1 - s)
		},
		n
	)
})(7.5625, 2.75)
Kr('Expo', function (a) {
	return a ? Math.pow(2, 10 * (a - 1)) : 0
})
Kr('Circ', function (a) {
	return -(na(1 - a * a) - 1)
})
Kr('Sine', function (a) {
	return a === 1 ? 1 : -ql(a * $l) + 1
})
Kr('Back', ss('in'), ss('out'), ss())
Z.SteppedEase =
	Z.steps =
	ve.SteppedEase =
		{
			config: function (t, e) {
				t === void 0 && (t = 1)
				var r = 1 / t,
					i = t + (e ? 0 : 1),
					n = e ? 1 : 0,
					s = 1 - et
				return function (o) {
					return (((i * an(0, s, o)) | 0) + n) * r
				}
			},
		}
_i.ease = Z['quad.out']
se('onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt', function (a) {
	return (Qs += a + ',' + a + 'Params,')
})
var Fa = function (t, e) {
		;(this.id = Ul++), (t._gsap = this), (this.target = t), (this.harness = e), (this.get = e ? e.get : da), (this.set = e ? e.getSetter : ro)
	},
	yi = (function () {
		function a(e) {
			;(this.vars = e), (this._delay = +e.delay || 0), (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && ((this._rDelay = e.repeatDelay || 0), (this._yoyo = !!e.yoyo || !!e.yoyoEase)), (this._ts = 1), gi(this, +e.duration, 1, 1), (this.data = e.data), vt && ((this._ctx = vt), vt.data.push(this)), Ji || ge.wake()
		}
		var t = a.prototype
		return (
			(t.delay = function (r) {
				return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), (this._delay = r), this) : this._delay
			}),
			(t.duration = function (r) {
				return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur
			}),
			(t.totalDuration = function (r) {
				return arguments.length ? ((this._dirty = 0), gi(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
			}),
			(t.totalTime = function (r, i) {
				if ((mi(), !arguments.length)) return this._tTime
				var n = this._dp
				if (n && n.smoothChildTiming && this._ts) {
					for (jn(this, r), !n._dp || n.parent || ya(n, this); n && n.parent; ) n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), (n = n.parent)
					!this.parent && this._dp.autoRemoveChildren && ((this._ts > 0 && r < this._tDur) || (this._ts < 0 && r > 0) || (!this._tDur && !r)) && $e(this._dp, this, this._start - this._delay)
				}
				return (this._tTime !== r || (!this._dur && !i) || (this._initted && Math.abs(this._zTime) === et) || (!r && !this._initted && (this.add || this._ptLookup))) && (this._ts || (this._pTime = r), _a(this, r, i)), this
			}),
			(t.time = function (r, i) {
				return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + wo(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), i) : this._time
			}),
			(t.totalProgress = function (r, i) {
				return arguments.length ? this.totalTime(this.totalDuration() * r, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
			}),
			(t.progress = function (r, i) {
				return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + wo(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
			}),
			(t.iteration = function (r, i) {
				var n = this.duration() + this._rDelay
				return arguments.length ? this.totalTime(this._time + (r - 1) * n, i) : this._repeat ? pi(this._tTime, n) + 1 : 1
			}),
			(t.timeScale = function (r) {
				if (!arguments.length) return this._rts === -et ? 0 : this._rts
				if (this._rts === r) return this
				var i = this.parent && this._ts ? Bn(this.parent._time, this) : this._tTime
				return (this._rts = +r || 0), (this._ts = this._ps || r === -et ? 0 : this._rts), this.totalTime(an(-Math.abs(this._delay), this._tDur, i), !0), Qn(this), tu(this)
			}),
			(t.paused = function (r) {
				return arguments.length ? (this._ps !== r && ((this._ps = r), r ? ((this._pTime = this._tTime || Math.max(-this._delay, this.rawTime())), (this._ts = this._act = 0)) : (mi(), (this._ts = this._rts), this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== et && (this._tTime -= et)))), this) : this._ps
			}),
			(t.startTime = function (r) {
				if (arguments.length) {
					this._start = r
					var i = this.parent || this._dp
					return i && (i._sort || !this.parent) && $e(i, this, r - this._delay), this
				}
				return this._start
			}),
			(t.endTime = function (r) {
				return this._start + (ne(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
			}),
			(t.rawTime = function (r) {
				var i = this.parent || this._dp
				return i ? (r && (!this._ts || (this._repeat && this._time && this.totalProgress() < 1)) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Bn(i.rawTime(r), this) : this._tTime) : this._tTime
			}),
			(t.revert = function (r) {
				r === void 0 && (r = Zl)
				var i = Xt
				return (Xt = r), (this._initted || this._startAt) && (this.timeline && this.timeline.revert(r), this.totalTime(-0.01, r.suppressEvents)), this.data !== 'nested' && r.kill !== !1 && this.kill(), (Xt = i), this
			}),
			(t.globalTime = function (r) {
				for (var i = this, n = arguments.length ? r : i.rawTime(); i; ) (n = i._start + n / (i._ts || 1)), (i = i._dp)
				return !this.parent && this._sat ? (this._sat.vars.immediateRender ? -1 : this._sat.globalTime(r)) : n
			}),
			(t.repeat = function (r) {
				return arguments.length ? ((this._repeat = r === 1 / 0 ? -2 : r), To(this)) : this._repeat === -2 ? 1 / 0 : this._repeat
			}),
			(t.repeatDelay = function (r) {
				if (arguments.length) {
					var i = this._time
					return (this._rDelay = r), To(this), i ? this.time(i) : this
				}
				return this._rDelay
			}),
			(t.yoyo = function (r) {
				return arguments.length ? ((this._yoyo = r), this) : this._yoyo
			}),
			(t.seek = function (r, i) {
				return this.totalTime(Te(this, r), ne(i))
			}),
			(t.restart = function (r, i) {
				return this.play().totalTime(r ? -this._delay : 0, ne(i))
			}),
			(t.play = function (r, i) {
				return r != null && this.seek(r, i), this.reversed(!1).paused(!1)
			}),
			(t.reverse = function (r, i) {
				return r != null && this.seek(r || this.totalDuration(), i), this.reversed(!0).paused(!1)
			}),
			(t.pause = function (r, i) {
				return r != null && this.seek(r, i), this.paused(!0)
			}),
			(t.resume = function () {
				return this.paused(!1)
			}),
			(t.reversed = function (r) {
				return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -et : 0)), this) : this._rts < 0
			}),
			(t.invalidate = function () {
				return (this._initted = this._act = 0), (this._zTime = -et), this
			}),
			(t.isActive = function () {
				var r = this.parent || this._dp,
					i = this._start,
					n
				return !!(!r || (this._ts && this._initted && r.isActive() && (n = r.rawTime(!0)) >= i && n < this.endTime(!0) - et))
			}),
			(t.eventCallback = function (r, i, n) {
				var s = this.vars
				return arguments.length > 1 ? (i ? ((s[r] = i), n && (s[r + 'Params'] = n), r === 'onUpdate' && (this._onUpdate = i)) : delete s[r], this) : s[r]
			}),
			(t.then = function (r) {
				var i = this
				return new Promise(function (n) {
					var s = ht(r) ? r : ga,
						o = function () {
							var u = i.then
							;(i.then = null), ht(s) && (s = s(i)) && (s.then || s === i) && (i.then = u), n(s), (i.then = u)
						}
					;(i._initted && i.totalProgress() === 1 && i._ts >= 0) || (!i._tTime && i._ts < 0) ? o() : (i._prom = o)
				})
			}),
			(t.kill = function () {
				Ai(this)
			}),
			a
		)
	})()
Me(yi.prototype, {_time: 0, _start: 0, _end: 0, _tTime: 0, _tDur: 0, _dirty: 0, _repeat: 0, _yoyo: !1, parent: null, _initted: !1, _rDelay: 0, _ts: 1, _dp: 0, ratio: 0, _zTime: -et, _prom: 0, _ps: !1, _rts: 1})
var ie = (function (a) {
	ia(t, a)
	function t(r, i) {
		var n
		return r === void 0 && (r = {}), (n = a.call(this, r) || this), (n.labels = {}), (n.smoothChildTiming = !!r.smoothChildTiming), (n.autoRemoveChildren = !!r.autoRemoveChildren), (n._sort = ne(r.sortChildren)), lt && $e(r.parent || lt, Je(n), i), r.reversed && n.reverse(), r.paused && n.paused(!0), r.scrollTrigger && va(Je(n), r.scrollTrigger), n
	}
	var e = t.prototype
	return (
		(e.to = function (i, n, s) {
			return Yi(0, arguments, this), this
		}),
		(e.from = function (i, n, s) {
			return Yi(1, arguments, this), this
		}),
		(e.fromTo = function (i, n, s, o) {
			return Yi(2, arguments, this), this
		}),
		(e.set = function (i, n, s) {
			return (n.duration = 0), (n.parent = this), Ii(n).repeatDelay || (n.repeat = 0), (n.immediateRender = !!n.immediateRender), new wt(i, n, Te(this, s), 1), this
		}),
		(e.call = function (i, n, s) {
			return $e(this, wt.delayedCall(0, i, n), s)
		}),
		(e.staggerTo = function (i, n, s, o, l, u, c) {
			return (s.duration = n), (s.stagger = s.stagger || o), (s.onComplete = u), (s.onCompleteParams = c), (s.parent = this), new wt(i, s, Te(this, l)), this
		}),
		(e.staggerFrom = function (i, n, s, o, l, u, c) {
			return (s.runBackwards = 1), (Ii(s).immediateRender = ne(s.immediateRender)), this.staggerTo(i, n, s, o, l, u, c)
		}),
		(e.staggerFromTo = function (i, n, s, o, l, u, c, _) {
			return (o.startAt = s), (Ii(o).immediateRender = ne(o.immediateRender)), this.staggerTo(i, n, o, l, u, c, _)
		}),
		(e.render = function (i, n, s) {
			var o = this._time,
				l = this._dirty ? this.totalDuration() : this._tDur,
				u = this._dur,
				c = i <= 0 ? 0 : Rt(i),
				_ = this._zTime < 0 != i < 0 && (this._initted || !u),
				h,
				f,
				p,
				d,
				m,
				y,
				b,
				T,
				v,
				S,
				k,
				w
			if ((this !== lt && c > l && i >= 0 && (c = l), c !== this._tTime || s || _)) {
				if ((o !== this._time && u && ((c += this._time - o), (i += this._time - o)), (h = c), (v = this._start), (T = this._ts), (y = !T), _ && (u || (o = this._zTime), (i || !n) && (this._zTime = i)), this._repeat)) {
					if (((k = this._yoyo), (m = u + this._rDelay), this._repeat < -1 && i < 0)) return this.totalTime(m * 100 + i, n, s)
					if (((h = Rt(c % m)), c === l ? ((d = this._repeat), (h = u)) : ((d = ~~(c / m)), d && d === c / m && ((h = u), d--), h > u && (h = u)), (S = pi(this._tTime, m)), !o && this._tTime && S !== d && this._tTime - S * m - this._dur <= 0 && (S = d), k && d & 1 && ((h = u - h), (w = 1)), d !== S && !this._lock)) {
						var C = k && S & 1,
							P = C === (k && d & 1)
						if ((d < S && (C = !C), (o = C ? 0 : u), (this._lock = 1), (this.render(o || (w ? 0 : Rt(d * m)), n, !u)._lock = 0), (this._tTime = c), !n && this.parent && Ce(this, 'onRepeat'), this.vars.repeatRefresh && !w && (this.invalidate()._lock = 1), (o && o !== this._time) || y !== !this._ts || (this.vars.onRepeat && !this.parent && !this._act))) return this
						if (((u = this._dur), (l = this._tDur), P && ((this._lock = 2), (o = C ? u : -1e-4), this.render(o, !0), this.vars.repeatRefresh && !w && this.invalidate()), (this._lock = 0), !this._ts && !y)) return this
						La(this, w)
					}
				}
				if ((this._hasPause && !this._forcing && this._lock < 2 && ((b = nu(this, Rt(o), Rt(h))), b && (c -= h - (h = b._start))), (this._tTime = c), (this._time = h), (this._act = !T), this._initted || ((this._onUpdate = this.vars.onUpdate), (this._initted = 1), (this._zTime = i), (o = 0)), !o && h && !n && !d && (Ce(this, 'onStart'), this._tTime !== c))) return this
				if (h >= o && i >= 0)
					for (f = this._first; f; ) {
						if (((p = f._next), (f._act || h >= f._start) && f._ts && b !== f)) {
							if (f.parent !== this) return this.render(i, n, s)
							if ((f.render(f._ts > 0 ? (h - f._start) * f._ts : (f._dirty ? f.totalDuration() : f._tDur) + (h - f._start) * f._ts, n, s), h !== this._time || (!this._ts && !y))) {
								;(b = 0), p && (c += this._zTime = -et)
								break
							}
						}
						f = p
					}
				else {
					f = this._last
					for (var M = i < 0 ? i : h; f; ) {
						if (((p = f._prev), (f._act || M <= f._end) && f._ts && b !== f)) {
							if (f.parent !== this) return this.render(i, n, s)
							if ((f.render(f._ts > 0 ? (M - f._start) * f._ts : (f._dirty ? f.totalDuration() : f._tDur) + (M - f._start) * f._ts, n, s || (Xt && (f._initted || f._startAt))), h !== this._time || (!this._ts && !y))) {
								;(b = 0), p && (c += this._zTime = M ? -et : et)
								break
							}
						}
						f = p
					}
				}
				if (b && !n && (this.pause(), (b.render(h >= o ? 0 : -et)._zTime = h >= o ? 1 : -1), this._ts)) return (this._start = v), Qn(this), this.render(i, n, s)
				this._onUpdate && !n && Ce(this, 'onUpdate', !0), ((c === l && this._tTime >= this.totalDuration()) || (!c && o)) && (v === this._start || Math.abs(T) !== Math.abs(this._ts)) && (this._lock || ((i || !u) && ((c === l && this._ts > 0) || (!c && this._ts < 0)) && Tr(this, 1), !n && !(i < 0 && !o) && (c || o || !l) && (Ce(this, c === l && i >= 0 ? 'onComplete' : 'onReverseComplete', !0), this._prom && !(c < l && this.timeScale() > 0) && this._prom())))
			}
			return this
		}),
		(e.add = function (i, n) {
			var s = this
			if ((sr(n) || (n = Te(this, n, i)), !(i instanceof yi))) {
				if (Nt(i))
					return (
						i.forEach(function (o) {
							return s.add(o, n)
						}),
						this
					)
				if (Et(i)) return this.addLabel(i, n)
				if (ht(i)) i = wt.delayedCall(0, i)
				else return this
			}
			return this !== i ? $e(this, i, n) : this
		}),
		(e.getChildren = function (i, n, s, o) {
			i === void 0 && (i = !0), n === void 0 && (n = !0), s === void 0 && (s = !0), o === void 0 && (o = -Pe)
			for (var l = [], u = this._first; u; ) u._start >= o && (u instanceof wt ? n && l.push(u) : (s && l.push(u), i && l.push.apply(l, u.getChildren(!0, n, s)))), (u = u._next)
			return l
		}),
		(e.getById = function (i) {
			for (var n = this.getChildren(1, 1, 1), s = n.length; s--; ) if (n[s].vars.id === i) return n[s]
		}),
		(e.remove = function (i) {
			return Et(i) ? this.removeLabel(i) : ht(i) ? this.killTweensOf(i) : (Zn(this, i), i === this._recent && (this._recent = this._last), Yr(this))
		}),
		(e.totalTime = function (i, n) {
			return arguments.length ? ((this._forcing = 1), !this._dp && this._ts && (this._start = Rt(ge.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), a.prototype.totalTime.call(this, i, n), (this._forcing = 0), this) : this._tTime
		}),
		(e.addLabel = function (i, n) {
			return (this.labels[i] = Te(this, n)), this
		}),
		(e.removeLabel = function (i) {
			return delete this.labels[i], this
		}),
		(e.addPause = function (i, n, s) {
			var o = wt.delayedCall(0, n || Qi, s)
			return (o.data = 'isPause'), (this._hasPause = 1), $e(this, o, Te(this, i))
		}),
		(e.removePause = function (i) {
			var n = this._first
			for (i = Te(this, i); n; ) n._start === i && n.data === 'isPause' && Tr(n), (n = n._next)
		}),
		(e.killTweensOf = function (i, n, s) {
			for (var o = this.getTweensOf(i, s), l = o.length; l--; ) hr !== o[l] && o[l].kill(i, n)
			return this
		}),
		(e.getTweensOf = function (i, n) {
			for (var s = [], o = ke(i), l = this._first, u = sr(n), c; l; ) l instanceof wt ? Ql(l._targets, o) && (u ? (!hr || (l._initted && l._ts)) && l.globalTime(0) <= n && l.globalTime(l.totalDuration()) > n : !n || l.isActive()) && s.push(l) : (c = l.getTweensOf(o, n)).length && s.push.apply(s, c), (l = l._next)
			return s
		}),
		(e.tweenTo = function (i, n) {
			n = n || {}
			var s = this,
				o = Te(s, i),
				l = n,
				u = l.startAt,
				c = l.onStart,
				_ = l.onStartParams,
				h = l.immediateRender,
				f,
				p = wt.to(
					s,
					Me(
						{
							ease: n.ease || 'none',
							lazy: !1,
							immediateRender: !1,
							time: o,
							overwrite: 'auto',
							duration: n.duration || Math.abs((o - (u && 'time' in u ? u.time : s._time)) / s.timeScale()) || et,
							onStart: function () {
								if ((s.pause(), !f)) {
									var m = n.duration || Math.abs((o - (u && 'time' in u ? u.time : s._time)) / s.timeScale())
									p._dur !== m && gi(p, m, 0, 1).render(p._time, !0, !0), (f = 1)
								}
								c && c.apply(p, _ || [])
							},
						},
						n
					)
				)
			return h ? p.render(0) : p
		}),
		(e.tweenFromTo = function (i, n, s) {
			return this.tweenTo(n, Me({startAt: {time: Te(this, i)}}, s))
		}),
		(e.recent = function () {
			return this._recent
		}),
		(e.nextLabel = function (i) {
			return i === void 0 && (i = this._time), bo(this, Te(this, i))
		}),
		(e.previousLabel = function (i) {
			return i === void 0 && (i = this._time), bo(this, Te(this, i), 1)
		}),
		(e.currentLabel = function (i) {
			return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + et)
		}),
		(e.shiftChildren = function (i, n, s) {
			s === void 0 && (s = 0)
			for (var o = this._first, l = this.labels, u; o; ) o._start >= s && ((o._start += i), (o._end += i)), (o = o._next)
			if (n) for (u in l) l[u] >= s && (l[u] += i)
			return Yr(this)
		}),
		(e.invalidate = function (i) {
			var n = this._first
			for (this._lock = 0; n; ) n.invalidate(i), (n = n._next)
			return a.prototype.invalidate.call(this, i)
		}),
		(e.clear = function (i) {
			i === void 0 && (i = !0)
			for (var n = this._first, s; n; ) (s = n._next), this.remove(n), (n = s)
			return this._dp && (this._time = this._tTime = this._pTime = 0), i && (this.labels = {}), Yr(this)
		}),
		(e.totalDuration = function (i) {
			var n = 0,
				s = this,
				o = s._last,
				l = Pe,
				u,
				c,
				_
			if (arguments.length) return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -i : i))
			if (s._dirty) {
				for (_ = s.parent; o; ) (u = o._prev), o._dirty && o.totalDuration(), (c = o._start), c > l && s._sort && o._ts && !s._lock ? ((s._lock = 1), ($e(s, o, c - o._delay, 1)._lock = 0)) : (l = c), c < 0 && o._ts && ((n -= c), ((!_ && !s._dp) || (_ && _.smoothChildTiming)) && ((s._start += c / s._ts), (s._time -= c), (s._tTime -= c)), s.shiftChildren(-c, !1, -1 / 0), (l = 0)), o._end > n && o._ts && (n = o._end), (o = u)
				gi(s, s === lt && s._time > n ? s._time : n, 1, 1), (s._dirty = 0)
			}
			return s._tDur
		}),
		(t.updateRoot = function (i) {
			if ((lt._ts && (_a(lt, Bn(i, lt)), (ha = ge.frame)), ge.frame >= vo)) {
				vo += ye.autoSleep || 120
				var n = lt._first
				if ((!n || !n._ts) && ye.autoSleep && ge._listeners.length < 2) {
					for (; n && !n._ts; ) n = n._next
					n || ge.sleep()
				}
			}
		}),
		t
	)
})(yi)
Me(ie.prototype, {_lock: 0, _hasPause: 0, _forcing: 0})
var xu = function (t, e, r, i, n, s, o) {
		var l = new oe(this._pt, t, e, 0, 1, Wa, null, n),
			u = 0,
			c = 0,
			_,
			h,
			f,
			p,
			d,
			m,
			y,
			b
		for (l.b = r, l.e = i, r += '', i += '', (y = ~i.indexOf('random(')) && (i = ji(i)), s && ((b = [r, i]), s(b, t, e), (r = b[0]), (i = b[1])), h = r.match(es) || []; (_ = es.exec(i)); ) (p = _[0]), (d = i.substring(u, _.index)), f ? (f = (f + 1) % 5) : d.substr(-5) === 'rgba(' && (f = 1), p !== h[c++] && ((m = parseFloat(h[c - 1]) || 0), (l._pt = {_next: l._pt, p: d || c === 1 ? d : ',', s: m, c: p.charAt(1) === '=' ? ui(m, p) - m : parseFloat(p) - m, m: f && f < 4 ? Math.round : 0}), (u = es.lastIndex))
		return (l.c = u < i.length ? i.substring(u, i.length) : ''), (l.fp = o), (aa.test(i) || y) && (l.e = 0), (this._pt = l), l
	},
	Js = function (t, e, r, i, n, s, o, l, u, c) {
		ht(i) && (i = i(n || 0, t, s))
		var _ = t[e],
			h = r !== 'get' ? r : ht(_) ? (u ? t[e.indexOf('set') || !ht(t['get' + e.substr(3)]) ? e : 'get' + e.substr(3)](u) : t[e]()) : _,
			f = ht(_) ? (u ? Pu : Xa) : eo,
			p
		if ((Et(i) && (~i.indexOf('random(') && (i = ji(i)), i.charAt(1) === '=' && ((p = ui(h, i) + (Yt(h) || 0)), (p || p === 0) && (i = p))), !c || h !== i || Os)) return !isNaN(h * i) && i !== '' ? ((p = new oe(this._pt, t, e, +h || 0, i - (h || 0), typeof _ == 'boolean' ? Cu : Na, 0, f)), u && (p.fp = u), o && p.modifier(o, this, t), (this._pt = p)) : (!_ && !(e in t) && Ks(e, i), xu.call(this, t, e, h, i, f, l || ye.stringFilter, u))
	},
	wu = function (t, e, r, i, n) {
		if ((ht(t) && (t = Xi(t, n, e, r, i)), !Ke(t) || (t.style && t.nodeType) || Nt(t) || sa(t))) return Et(t) ? Xi(t, n, e, r, i) : t
		var s = {},
			o
		for (o in t) s[o] = Xi(t[o], n, e, r, i)
		return s
	},
	Ba = function (t, e, r, i, n, s) {
		var o, l, u, c
		if (_e[t] && (o = new _e[t]()).init(n, o.rawVars ? e[t] : wu(e[t], i, n, s, r), r, i, s) !== !1 && ((r._pt = l = new oe(r._pt, n, t, 0, 1, o.render, o, 0, o.priority)), r !== oi)) for (u = r._ptLookup[r._targets.indexOf(n)], c = o._props.length; c--; ) u[o._props[c]] = l
		return o
	},
	hr,
	Os,
	to = function a(t, e, r) {
		var i = t.vars,
			n = i.ease,
			s = i.startAt,
			o = i.immediateRender,
			l = i.lazy,
			u = i.onUpdate,
			c = i.onUpdateParams,
			_ = i.callbackScope,
			h = i.runBackwards,
			f = i.yoyoEase,
			p = i.keyframes,
			d = i.autoRevert,
			m = t._dur,
			y = t._startAt,
			b = t._targets,
			T = t.parent,
			v = T && T.data === 'nested' ? T.vars.targets : b,
			S = t._overwrite === 'auto' && !Us,
			k = t.timeline,
			w,
			C,
			P,
			M,
			A,
			E,
			q,
			Y,
			B,
			X,
			z,
			K,
			J
		if ((k && (!p || !n) && (n = 'none'), (t._ease = Xr(n, _i.ease)), (t._yEase = f ? Ra(Xr(f === !0 ? n : f, _i.ease)) : 0), f && t._yoyo && !t._repeat && ((f = t._yEase), (t._yEase = t._ease), (t._ease = f)), (t._from = !k && !!i.runBackwards), !k || (p && !i.stagger))) {
			if (((Y = b[0] ? Ir(b[0]).harness : 0), (K = Y && i[Y.prop]), (w = Fn(i, Zs)), y && (y._zTime < 0 && y.progress(1), e < 0 && h && o && !d ? y.render(-1, !0) : y.revert(h && m ? Tn : Kl), (y._lazy = 0)), s)) {
				if ((Tr((t._startAt = wt.set(b, Me({data: 'isStart', overwrite: !1, parent: T, immediateRender: !0, lazy: !y && ne(l), startAt: null, delay: 0, onUpdate: u, onUpdateParams: c, callbackScope: _, stagger: 0}, s)))), (t._startAt._dp = 0), (t._startAt._sat = t), e < 0 && (Xt || (!o && !d)) && t._startAt.revert(Tn), o && m && e <= 0 && r <= 0)) {
					e && (t._zTime = e)
					return
				}
			} else if (h && m && !y) {
				if ((e && (o = !1), (P = Me({overwrite: !1, data: 'isFromStart', lazy: o && !y && ne(l), immediateRender: o, stagger: 0, parent: T}, w)), K && (P[Y.prop] = K), Tr((t._startAt = wt.set(b, P))), (t._startAt._dp = 0), (t._startAt._sat = t), e < 0 && (Xt ? t._startAt.revert(Tn) : t._startAt.render(-1, !0)), (t._zTime = e), !o)) a(t._startAt, et, et)
				else if (!e) return
			}
			for (t._pt = t._ptCache = 0, l = (m && ne(l)) || (l && !m), C = 0; C < b.length; C++) {
				if (
					((A = b[C]),
					(q = A._gsap || js(b)[C]._gsap),
					(t._ptLookup[C] = X = {}),
					Ts[q.id] && yr.length && zn(),
					(z = v === b ? C : v.indexOf(A)),
					Y &&
						(B = new Y()).init(A, K || w, t, z, v) !== !1 &&
						((t._pt = M = new oe(t._pt, A, B.name, 0, 1, B.render, B, 0, B.priority)),
						B._props.forEach(function (g) {
							X[g] = M
						}),
						B.priority && (E = 1)),
					!Y || K)
				)
					for (P in w) _e[P] && (B = Ba(P, w, t, z, A, v)) ? B.priority && (E = 1) : (X[P] = M = Js.call(t, A, P, 'get', w[P], z, v, 0, i.stringFilter))
				t._op && t._op[C] && t.kill(A, t._op[C]), S && t._pt && ((hr = t), lt.killTweensOf(A, X, t.globalTime(e)), (J = !t.parent), (hr = 0)), t._pt && l && (Ts[q.id] = 1)
			}
			E && Va(t), t._onInit && t._onInit(t)
		}
		;(t._onUpdate = u), (t._initted = (!t._op || t._pt) && !J), p && e <= 0 && k.render(Pe, !0, !0)
	},
	Tu = function (t, e, r, i, n, s, o) {
		var l = ((t._pt && t._ptCache) || (t._ptCache = {}))[e],
			u,
			c,
			_,
			h
		if (!l)
			for (l = t._ptCache[e] = [], _ = t._ptLookup, h = t._targets.length; h--; ) {
				if (((u = _[h][e]), u && u.d && u.d._pt)) for (u = u.d._pt; u && u.p !== e && u.fp !== e; ) u = u._next
				if (!u) return (Os = 1), (t.vars[e] = '+=0'), to(t, o), (Os = 0), 1
				l.push(u)
			}
		for (h = l.length; h--; ) (c = l[h]), (u = c._pt || c), (u.s = (i || i === 0) && !n ? i : u.s + (i || 0) + s * u.c), (u.c = r - u.s), c.e && (c.e = gt(r) + Yt(c.e)), c.b && (c.b = u.s + Yt(c.b))
	},
	bu = function (t, e) {
		var r = t[0] ? Ir(t[0]).harness : 0,
			i = r && r.aliases,
			n,
			s,
			o,
			l
		if (!i) return e
		n = Ur({}, e)
		for (s in i) if (s in n) for (l = i[s].split(','), o = l.length; o--; ) n[l[o]] = n[s]
		return n
	},
	Su = function (t, e, r, i) {
		var n = e.ease || i || 'power1.inOut',
			s,
			o
		if (Nt(e))
			(o = r[t] || (r[t] = [])),
				e.forEach(function (l, u) {
					return o.push({t: (u / (e.length - 1)) * 100, v: l, e: n})
				})
		else for (s in e) (o = r[s] || (r[s] = [])), s === 'ease' || o.push({t: parseFloat(t), v: e[s], e: n})
	},
	Xi = function (t, e, r, i, n) {
		return ht(t) ? t.call(e, r, i, n) : Et(t) && ~t.indexOf('random(') ? ji(t) : t
	},
	Ia = Qs + 'repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert',
	Ya = {}
se(Ia + ',id,stagger,delay,duration,paused,scrollTrigger', function (a) {
	return (Ya[a] = 1)
})
var wt = (function (a) {
	ia(t, a)
	function t(r, i, n, s) {
		var o
		typeof i == 'number' && ((n.duration = i), (i = n), (n = null)), (o = a.call(this, s ? i : Ii(i)) || this)
		var l = o.vars,
			u = l.duration,
			c = l.delay,
			_ = l.immediateRender,
			h = l.stagger,
			f = l.overwrite,
			p = l.keyframes,
			d = l.defaults,
			m = l.scrollTrigger,
			y = l.yoyoEase,
			b = i.parent || lt,
			T = (Nt(r) || sa(r) ? sr(r[0]) : 'length' in i) ? [r] : ke(r),
			v,
			S,
			k,
			w,
			C,
			P,
			M,
			A
		if (((o._targets = T.length ? js(T) : Ln('GSAP target ' + r + ' not found. https://greensock.com', !ye.nullTargetWarn) || []), (o._ptLookup = []), (o._overwrite = f), p || h || un(u) || un(c))) {
			if (((i = o.vars), (v = o.timeline = new ie({data: 'nested', defaults: d || {}, targets: b && b.data === 'nested' ? b.vars.targets : T})), v.kill(), (v.parent = v._dp = Je(o)), (v._start = 0), h || un(u) || un(c))) {
				if (((w = T.length), (M = h && ba(h)), Ke(h))) for (C in h) ~Ia.indexOf(C) && (A || (A = {}), (A[C] = h[C]))
				for (S = 0; S < w; S++) (k = Fn(i, Ya)), (k.stagger = 0), y && (k.yoyoEase = y), A && Ur(k, A), (P = T[S]), (k.duration = +Xi(u, Je(o), S, P, T)), (k.delay = (+Xi(c, Je(o), S, P, T) || 0) - o._delay), !h && w === 1 && k.delay && ((o._delay = c = k.delay), (o._start += c), (k.delay = 0)), v.to(P, k, M ? M(S, P, T) : 0), (v._ease = Z.none)
				v.duration() ? (u = c = 0) : (o.timeline = 0)
			} else if (p) {
				Ii(Me(v.vars.defaults, {ease: 'none'})), (v._ease = Xr(p.ease || i.ease || 'none'))
				var E = 0,
					q,
					Y,
					B
				if (Nt(p))
					p.forEach(function (X) {
						return v.to(T, X, '>')
					}),
						v.duration()
				else {
					k = {}
					for (C in p) C === 'ease' || C === 'easeEach' || Su(C, p[C], k, p.easeEach)
					for (C in k)
						for (
							q = k[C].sort(function (X, z) {
								return X.t - z.t
							}),
								E = 0,
								S = 0;
							S < q.length;
							S++
						)
							(Y = q[S]), (B = {ease: Y.e, duration: ((Y.t - (S ? q[S - 1].t : 0)) / 100) * u}), (B[C] = Y.v), v.to(T, B, E), (E += B.duration)
					v.duration() < u && v.to({}, {duration: u - v.duration()})
				}
			}
			u || o.duration((u = v.duration()))
		} else o.timeline = 0
		return f === !0 && !Us && ((hr = Je(o)), lt.killTweensOf(T), (hr = 0)), $e(b, Je(o), n), i.reversed && o.reverse(), i.paused && o.paused(!0), (_ || (!u && !p && o._start === Rt(b._time) && ne(_) && eu(Je(o)) && b.data !== 'nested')) && ((o._tTime = -et), o.render(Math.max(0, -c) || 0)), m && va(Je(o), m), o
	}
	var e = t.prototype
	return (
		(e.render = function (i, n, s) {
			var o = this._time,
				l = this._tDur,
				u = this._dur,
				c = i < 0,
				_ = i > l - et && !c ? l : i < et ? 0 : i,
				h,
				f,
				p,
				d,
				m,
				y,
				b,
				T,
				v
			if (!u) iu(this, i, n, s)
			else if (_ !== this._tTime || !i || s || (!this._initted && this._tTime) || (this._startAt && this._zTime < 0 !== c)) {
				if (((h = _), (T = this.timeline), this._repeat)) {
					if (((d = u + this._rDelay), this._repeat < -1 && c)) return this.totalTime(d * 100 + i, n, s)
					if (((h = Rt(_ % d)), _ === l ? ((p = this._repeat), (h = u)) : ((p = ~~(_ / d)), p && p === _ / d && ((h = u), p--), h > u && (h = u)), (y = this._yoyo && p & 1), y && ((v = this._yEase), (h = u - h)), (m = pi(this._tTime, d)), h === o && !s && this._initted)) return (this._tTime = _), this
					p !== m && (T && this._yEase && La(T, y), this.vars.repeatRefresh && !y && !this._lock && ((this._lock = s = 1), (this.render(Rt(d * p), !0).invalidate()._lock = 0)))
				}
				if (!this._initted) {
					if (xa(this, c ? i : h, s, n, _)) return (this._tTime = 0), this
					if (o !== this._time) return this
					if (u !== this._dur) return this.render(i, n, s)
				}
				if (((this._tTime = _), (this._time = h), !this._act && this._ts && ((this._act = 1), (this._lazy = 0)), (this.ratio = b = (v || this._ease)(h / u)), this._from && (this.ratio = b = 1 - b), h && !o && !n && !p && (Ce(this, 'onStart'), this._tTime !== _))) return this
				for (f = this._pt; f; ) f.r(b, f.d), (f = f._next)
				;(T && T.render(i < 0 ? i : !h && y ? -et : T._dur * T._ease(h / this._dur), n, s)) || (this._startAt && (this._zTime = i)), this._onUpdate && !n && (c && bs(this, i, n, s), Ce(this, 'onUpdate')), this._repeat && p !== m && this.vars.onRepeat && !n && this.parent && Ce(this, 'onRepeat'), (_ === this._tDur || !_) && this._tTime === _ && (c && !this._onUpdate && bs(this, i, !0, !0), (i || !u) && ((_ === this._tDur && this._ts > 0) || (!_ && this._ts < 0)) && Tr(this, 1), !n && !(c && !o) && (_ || o || y) && (Ce(this, _ === l ? 'onComplete' : 'onReverseComplete', !0), this._prom && !(_ < l && this.timeScale() > 0) && this._prom()))
			}
			return this
		}),
		(e.targets = function () {
			return this._targets
		}),
		(e.invalidate = function (i) {
			return (!i || !this.vars.runBackwards) && (this._startAt = 0), (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0), (this._ptLookup = []), this.timeline && this.timeline.invalidate(i), a.prototype.invalidate.call(this, i)
		}),
		(e.resetTo = function (i, n, s, o) {
			Ji || ge.wake(), this._ts || this.play()
			var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
				u
			return this._initted || to(this, l), (u = this._ease(l / this._dur)), Tu(this, i, n, s, o, u, l) ? this.resetTo(i, n, s, o) : (jn(this, 0), this.parent || ma(this._dp, this, '_first', '_last', this._dp._sort ? '_start' : 0), this.render(0))
		}),
		(e.kill = function (i, n) {
			if ((n === void 0 && (n = 'all'), !i && (!n || n === 'all'))) return (this._lazy = this._pt = 0), this.parent ? Ai(this) : this
			if (this.timeline) {
				var s = this.timeline.totalDuration()
				return this.timeline.killTweensOf(i, n, hr && hr.vars.overwrite !== !0)._first || Ai(this), this.parent && s !== this.timeline.totalDuration() && gi(this, (this._dur * this.timeline._tDur) / s, 0, 1), this
			}
			var o = this._targets,
				l = i ? ke(i) : o,
				u = this._ptLookup,
				c = this._pt,
				_,
				h,
				f,
				p,
				d,
				m,
				y
			if ((!n || n === 'all') && Jl(o, l)) return n === 'all' && (this._pt = 0), Ai(this)
			for (
				_ = this._op = this._op || [],
					n !== 'all' &&
						(Et(n) &&
							((d = {}),
							se(n, function (b) {
								return (d[b] = 1)
							}),
							(n = d)),
						(n = bu(o, n))),
					y = o.length;
				y--;

			)
				if (~l.indexOf(o[y])) {
					;(h = u[y]), n === 'all' ? ((_[y] = n), (p = h), (f = {})) : ((f = _[y] = _[y] || {}), (p = n))
					for (d in p) (m = h && h[d]), m && ((!('kill' in m.d) || m.d.kill(d) === !0) && Zn(this, m, '_pt'), delete h[d]), f !== 'all' && (f[d] = 1)
				}
			return this._initted && !this._pt && c && Ai(this), this
		}),
		(t.to = function (i, n) {
			return new t(i, n, arguments[2])
		}),
		(t.from = function (i, n) {
			return Yi(1, arguments)
		}),
		(t.delayedCall = function (i, n, s, o) {
			return new t(n, 0, {immediateRender: !1, lazy: !1, overwrite: !1, delay: i, onComplete: n, onReverseComplete: n, onCompleteParams: s, onReverseCompleteParams: s, callbackScope: o})
		}),
		(t.fromTo = function (i, n, s) {
			return Yi(2, arguments)
		}),
		(t.set = function (i, n) {
			return (n.duration = 0), n.repeatDelay || (n.repeat = 0), new t(i, n)
		}),
		(t.killTweensOf = function (i, n, s) {
			return lt.killTweensOf(i, n, s)
		}),
		t
	)
})(yi)
Me(wt.prototype, {_targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0})
se('staggerTo,staggerFrom,staggerFromTo', function (a) {
	wt[a] = function () {
		var t = new ie(),
			e = Ps.call(arguments, 0)
		return e.splice(a === 'staggerFromTo' ? 5 : 4, 0, 0), t[a].apply(t, e)
	}
})
var eo = function (t, e, r) {
		return (t[e] = r)
	},
	Xa = function (t, e, r) {
		return t[e](r)
	},
	Pu = function (t, e, r, i) {
		return t[e](i.fp, r)
	},
	ku = function (t, e, r) {
		return t.setAttribute(e, r)
	},
	ro = function (t, e) {
		return ht(t[e]) ? Xa : qs(t[e]) && t.setAttribute ? ku : eo
	},
	Na = function (t, e) {
		return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e)
	},
	Cu = function (t, e) {
		return e.set(e.t, e.p, !!(e.s + e.c * t), e)
	},
	Wa = function (t, e) {
		var r = e._pt,
			i = ''
		if (!t && e.b) i = e.b
		else if (t === 1 && e.e) i = e.e
		else {
			for (; r; ) (i = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round((r.s + r.c * t) * 1e4) / 1e4) + i), (r = r._next)
			i += e.c
		}
		e.set(e.t, e.p, i, e)
	},
	io = function (t, e) {
		for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next)
	},
	Ou = function (t, e, r, i) {
		for (var n = this._pt, s; n; ) (s = n._next), n.p === i && n.modifier(t, e, r), (n = s)
	},
	Mu = function (t) {
		for (var e = this._pt, r, i; e; ) (i = e._next), (e.p === t && !e.op) || e.op === t ? Zn(this, e, '_pt') : e.dep || (r = 1), (e = i)
		return !r
	},
	Eu = function (t, e, r, i) {
		i.mSet(t, e, i.m.call(i.tween, r, i.mt), i)
	},
	Va = function (t) {
		for (var e = t._pt, r, i, n, s; e; ) {
			for (r = e._next, i = n; i && i.pr > e.pr; ) i = i._next
			;(e._prev = i ? i._prev : s) ? (e._prev._next = e) : (n = e), (e._next = i) ? (i._prev = e) : (s = e), (e = r)
		}
		t._pt = n
	},
	oe = (function () {
		function a(e, r, i, n, s, o, l, u, c) {
			;(this.t = r), (this.s = n), (this.c = s), (this.p = i), (this.r = o || Na), (this.d = l || this), (this.set = u || eo), (this.pr = c || 0), (this._next = e), e && (e._prev = this)
		}
		var t = a.prototype
		return (
			(t.modifier = function (r, i, n) {
				;(this.mSet = this.mSet || this.set), (this.set = Eu), (this.m = r), (this.mt = n), (this.tween = i)
			}),
			a
		)
	})()
se(Qs + 'parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger', function (a) {
	return (Zs[a] = 1)
})
ve.TweenMax = ve.TweenLite = wt
ve.TimelineLite = ve.TimelineMax = ie
lt = new ie({sortChildren: !1, defaults: _i, autoRemoveChildren: !0, id: 'root', smoothChildTiming: !0})
ye.stringFilter = Aa
var vi = [],
	Sn = {},
	Du = [],
	Po = 0,
	os = function (t) {
		return (Sn[t] || Du).map(function (e) {
			return e()
		})
	},
	Ms = function () {
		var t = Date.now(),
			e = []
		t - Po > 2 &&
			(os('matchMediaInit'),
			vi.forEach(function (r) {
				var i = r.queries,
					n = r.conditions,
					s,
					o,
					l,
					u
				for (o in i) (s = be.matchMedia(i[o]).matches), s && (l = 1), s !== n[o] && ((n[o] = s), (u = 1))
				u && (r.revert(), l && e.push(r))
			}),
			os('matchMediaRevert'),
			e.forEach(function (r) {
				return r.onMatch(r)
			}),
			(Po = t),
			os('matchMedia'))
	},
	$a = (function () {
		function a(e, r) {
			;(this.selector = r && ks(r)), (this.data = []), (this._r = []), (this.isReverted = !1), e && this.add(e)
		}
		var t = a.prototype
		return (
			(t.add = function (r, i, n) {
				ht(r) && ((n = i), (i = r), (r = ht))
				var s = this,
					o = function () {
						var u = vt,
							c = s.selector,
							_
						return u && u !== s && u.data.push(s), n && (s.selector = ks(n)), (vt = s), (_ = i.apply(s, arguments)), ht(_) && s._r.push(_), (vt = u), (s.selector = c), (s.isReverted = !1), _
					}
				return (s.last = o), r === ht ? o(s) : r ? (s[r] = o) : o
			}),
			(t.ignore = function (r) {
				var i = vt
				;(vt = null), r(this), (vt = i)
			}),
			(t.getTweens = function () {
				var r = []
				return (
					this.data.forEach(function (i) {
						return i instanceof a ? r.push.apply(r, i.getTweens()) : i instanceof wt && !(i.parent && i.parent.data === 'nested') && r.push(i)
					}),
					r
				)
			}),
			(t.clear = function () {
				this._r.length = this.data.length = 0
			}),
			(t.kill = function (r, i) {
				var n = this
				if (r) {
					var s = this.getTweens()
					this.data.forEach(function (l) {
						l.data === 'isFlip' &&
							(l.revert(),
							l.getChildren(!0, !0, !1).forEach(function (u) {
								return s.splice(s.indexOf(u), 1)
							}))
					}),
						s
							.map(function (l) {
								return {g: l.globalTime(0), t: l}
							})
							.sort(function (l, u) {
								return u.g - l.g || -1
							})
							.forEach(function (l) {
								return l.t.revert(r)
							}),
						this.data.forEach(function (l) {
							return !(l instanceof yi) && l.revert && l.revert(r)
						}),
						this._r.forEach(function (l) {
							return l(r, n)
						}),
						(this.isReverted = !0)
				} else
					this.data.forEach(function (l) {
						return l.kill && l.kill()
					})
				if ((this.clear(), i)) {
					var o = vi.indexOf(this)
					~o && vi.splice(o, 1)
				}
			}),
			(t.revert = function (r) {
				this.kill(r || {})
			}),
			a
		)
	})(),
	Au = (function () {
		function a(e) {
			;(this.contexts = []), (this.scope = e)
		}
		var t = a.prototype
		return (
			(t.add = function (r, i, n) {
				Ke(r) || (r = {matches: r})
				var s = new $a(0, n || this.scope),
					o = (s.conditions = {}),
					l,
					u,
					c
				this.contexts.push(s), (i = s.add('onMatch', i)), (s.queries = r)
				for (u in r) u === 'all' ? (c = 1) : ((l = be.matchMedia(r[u])), l && (vi.indexOf(s) < 0 && vi.push(s), (o[u] = l.matches) && (c = 1), l.addListener ? l.addListener(Ms) : l.addEventListener('change', Ms)))
				return c && i(s), this
			}),
			(t.revert = function (r) {
				this.kill(r || {})
			}),
			(t.kill = function (r) {
				this.contexts.forEach(function (i) {
					return i.kill(r, !0)
				})
			}),
			a
		)
	})(),
	In = {
		registerPlugin: function () {
			for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r]
			e.forEach(function (i) {
				return Ma(i)
			})
		},
		timeline: function (t) {
			return new ie(t)
		},
		getTweensOf: function (t, e) {
			return lt.getTweensOf(t, e)
		},
		getProperty: function (t, e, r, i) {
			Et(t) && (t = ke(t)[0])
			var n = Ir(t || {}).get,
				s = r ? ga : pa
			return (
				r === 'native' && (r = ''),
				t &&
					(e
						? s(((_e[e] && _e[e].get) || n)(t, e, r, i))
						: function (o, l, u) {
								return s(((_e[o] && _e[o].get) || n)(t, o, l, u))
						  })
			)
		},
		quickSetter: function (t, e, r) {
			if (((t = ke(t)), t.length > 1)) {
				var i = t.map(function (c) {
						return ae.quickSetter(c, e, r)
					}),
					n = i.length
				return function (c) {
					for (var _ = n; _--; ) i[_](c)
				}
			}
			t = t[0] || {}
			var s = _e[e],
				o = Ir(t),
				l = (o.harness && (o.harness.aliases || {})[e]) || e,
				u = s
					? function (c) {
							var _ = new s()
							;(oi._pt = 0), _.init(t, r ? c + r : c, oi, 0, [t]), _.render(1, _), oi._pt && io(1, oi)
					  }
					: o.set(t, l)
			return s
				? u
				: function (c) {
						return u(t, l, r ? c + r : c, o, 1)
				  }
		},
		quickTo: function (t, e, r) {
			var i,
				n = ae.to(t, Ur(((i = {}), (i[e] = '+=0.1'), (i.paused = !0), i), r || {})),
				s = function (l, u, c) {
					return n.resetTo(e, l, u, c)
				}
			return (s.tween = n), s
		},
		isTweening: function (t) {
			return lt.getTweensOf(t, !0).length > 0
		},
		defaults: function (t) {
			return t && t.ease && (t.ease = Xr(t.ease, _i.ease)), xo(_i, t || {})
		},
		config: function (t) {
			return xo(ye, t || {})
		},
		registerEffect: function (t) {
			var e = t.name,
				r = t.effect,
				i = t.plugins,
				n = t.defaults,
				s = t.extendTimeline
			;(i || '').split(',').forEach(function (o) {
				return o && !_e[o] && !ve[o] && Ln(e + ' effect requires ' + o + ' plugin.')
			}),
				(rs[e] = function (o, l, u) {
					return r(ke(o), Me(l || {}, n), u)
				}),
				s &&
					(ie.prototype[e] = function (o, l, u) {
						return this.add(rs[e](o, Ke(l) ? l : (u = l) && {}, this), u)
					})
		},
		registerEase: function (t, e) {
			Z[t] = Xr(e)
		},
		parseEase: function (t, e) {
			return arguments.length ? Xr(t, e) : Z
		},
		getById: function (t) {
			return lt.getById(t)
		},
		exportRoot: function (t, e) {
			t === void 0 && (t = {})
			var r = new ie(t),
				i,
				n
			for (r.smoothChildTiming = ne(t.smoothChildTiming), lt.remove(r), r._dp = 0, r._time = r._tTime = lt._time, i = lt._first; i; ) (n = i._next), (e || !(!i._dur && i instanceof wt && i.vars.onComplete === i._targets[0])) && $e(r, i, i._start - i._delay), (i = n)
			return $e(lt, r, 0), r
		},
		context: function (t, e) {
			return t ? new $a(t, e) : vt
		},
		matchMedia: function (t) {
			return new Au(t)
		},
		matchMediaRefresh: function () {
			return (
				vi.forEach(function (t) {
					var e = t.conditions,
						r,
						i
					for (i in e) e[i] && ((e[i] = !1), (r = 1))
					r && t.revert()
				}) || Ms()
			)
		},
		addEventListener: function (t, e) {
			var r = Sn[t] || (Sn[t] = [])
			~r.indexOf(e) || r.push(e)
		},
		removeEventListener: function (t, e) {
			var r = Sn[t],
				i = r && r.indexOf(e)
			i >= 0 && r.splice(i, 1)
		},
		utils: {wrap: fu, wrapYoyo: hu, distribute: ba, random: Pa, snap: Sa, normalize: cu, getUnit: Yt, clamp: ou, splitColor: Ea, toArray: ke, selector: ks, mapRange: Ca, pipe: lu, unitize: uu, interpolate: du, shuffle: Ta},
		install: ca,
		effects: rs,
		ticker: ge,
		updateRoot: ie.updateRoot,
		plugins: _e,
		globalTimeline: lt,
		core: {
			PropTween: oe,
			globals: fa,
			Tween: wt,
			Timeline: ie,
			Animation: yi,
			getCache: Ir,
			_removeLinkedListItem: Zn,
			reverting: function () {
				return Xt
			},
			context: function (t) {
				return t && vt && (vt.data.push(t), (t._ctx = vt)), vt
			},
			suppressOverwrites: function (t) {
				return (Us = t)
			},
		},
	}
se('to,from,fromTo,delayedCall,set,killTweensOf', function (a) {
	return (In[a] = wt[a])
})
ge.add(ie.updateRoot)
oi = In.to({}, {duration: 0})
var Ru = function (t, e) {
		for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; ) r = r._next
		return r
	},
	Lu = function (t, e) {
		var r = t._targets,
			i,
			n,
			s
		for (i in e) for (n = r.length; n--; ) (s = t._ptLookup[n][i]), s && (s = s.d) && (s._pt && (s = Ru(s, i)), s && s.modifier && s.modifier(e[i], t, r[n], i))
	},
	as = function (t, e) {
		return {
			name: t,
			rawVars: 1,
			init: function (i, n, s) {
				s._onInit = function (o) {
					var l, u
					if (
						(Et(n) &&
							((l = {}),
							se(n, function (c) {
								return (l[c] = 1)
							}),
							(n = l)),
						e)
					) {
						l = {}
						for (u in n) l[u] = e(n[u])
						n = l
					}
					Lu(o, n)
				}
			},
		}
	},
	ae =
		In.registerPlugin(
			{
				name: 'attr',
				init: function (t, e, r, i, n) {
					var s, o, l
					this.tween = r
					for (s in e) (l = t.getAttribute(s) || ''), (o = this.add(t, 'setAttribute', (l || 0) + '', e[s], i, n, 0, 0, s)), (o.op = s), (o.b = l), this._props.push(s)
				},
				render: function (t, e) {
					for (var r = e._pt; r; ) Xt ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), (r = r._next)
				},
			},
			{
				name: 'endArray',
				init: function (t, e) {
					for (var r = e.length; r--; ) this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1)
				},
			},
			as('roundProps', Cs),
			as('modifiers'),
			as('snap', Sa)
		) || In
wt.version = ie.version = ae.version = '3.11.5'
ua = 1
Hs() && mi()
Z.Power0
Z.Power1
Z.Power2
Z.Power3
Z.Power4
Z.Linear
Z.Quad
Z.Cubic
Z.Quart
Z.Quint
Z.Strong
Z.Elastic
Z.Back
Z.SteppedEase
Z.Bounce
Z.Sine
Z.Expo
Z.Circ
/*!
 * CSSPlugin 3.11.5
 * https://greensock.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */ var ko,
	dr,
	ci,
	no,
	Fr,
	Co,
	so,
	zu = function () {
		return typeof window < 'u'
	},
	or = {},
	Ar = 180 / Math.PI,
	fi = Math.PI / 180,
	ti = Math.atan2,
	Oo = 1e8,
	oo = /([A-Z])/g,
	Fu = /(left|right|width|margin|padding|x)/i,
	Bu = /[\s,\(]\S/,
	Ue = {autoAlpha: 'opacity,visibility', scale: 'scaleX,scaleY', alpha: 'opacity'},
	Es = function (t, e) {
		return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e)
	},
	Iu = function (t, e) {
		return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e)
	},
	Yu = function (t, e) {
		return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e)
	},
	Xu = function (t, e) {
		var r = e.s + e.c * t
		e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e)
	},
	Ua = function (t, e) {
		return e.set(e.t, e.p, t ? e.e : e.b, e)
	},
	qa = function (t, e) {
		return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e)
	},
	Nu = function (t, e, r) {
		return (t.style[e] = r)
	},
	Wu = function (t, e, r) {
		return t.style.setProperty(e, r)
	},
	Vu = function (t, e, r) {
		return (t._gsap[e] = r)
	},
	$u = function (t, e, r) {
		return (t._gsap.scaleX = t._gsap.scaleY = r)
	},
	Uu = function (t, e, r, i, n) {
		var s = t._gsap
		;(s.scaleX = s.scaleY = r), s.renderTransform(n, s)
	},
	qu = function (t, e, r, i, n) {
		var s = t._gsap
		;(s[e] = r), s.renderTransform(n, s)
	},
	ut = 'transform',
	Ie = ut + 'Origin',
	Hu = function a(t, e) {
		var r = this,
			i = this.target,
			n = i.style
		if (t in or) {
			if (((this.tfm = this.tfm || {}), t !== 'transform'))
				(t = Ue[t] || t),
					~t.indexOf(',')
						? t.split(',').forEach(function (s) {
								return (r.tfm[s] = tr(i, s))
						  })
						: (this.tfm[t] = i._gsap.x ? i._gsap[t] : tr(i, t))
			else
				return Ue.transform.split(',').forEach(function (s) {
					return a.call(r, s, e)
				})
			if (this.props.indexOf(ut) >= 0) return
			i._gsap.svg && ((this.svgo = i.getAttribute('data-svg-origin')), this.props.push(Ie, e, '')), (t = ut)
		}
		;(n || e) && this.props.push(t, e, n[t])
	},
	Ha = function (t) {
		t.translate && (t.removeProperty('translate'), t.removeProperty('scale'), t.removeProperty('rotate'))
	},
	Gu = function () {
		var t = this.props,
			e = this.target,
			r = e.style,
			i = e._gsap,
			n,
			s
		for (n = 0; n < t.length; n += 3) t[n + 1] ? (e[t[n]] = t[n + 2]) : t[n + 2] ? (r[t[n]] = t[n + 2]) : r.removeProperty(t[n].substr(0, 2) === '--' ? t[n] : t[n].replace(oo, '-$1').toLowerCase())
		if (this.tfm) {
			for (s in this.tfm) i[s] = this.tfm[s]
			i.svg && (i.renderTransform(), e.setAttribute('data-svg-origin', this.svgo || '')), (n = so()), (!n || !n.isStart) && !r[ut] && (Ha(r), (i.uncache = 1))
		}
	},
	Ga = function (t, e) {
		var r = {target: t, props: [], revert: Gu, save: Hu}
		return (
			t._gsap || ae.core.getCache(t),
			e &&
				e.split(',').forEach(function (i) {
					return r.save(i)
				}),
			r
		)
	},
	Ka,
	Ds = function (t, e) {
		var r = dr.createElementNS ? dr.createElementNS((e || 'http://www.w3.org/1999/xhtml').replace(/^https/, 'http'), t) : dr.createElement(t)
		return r.style ? r : dr.createElement(t)
	},
	He = function a(t, e, r) {
		var i = getComputedStyle(t)
		return i[e] || i.getPropertyValue(e.replace(oo, '-$1').toLowerCase()) || i.getPropertyValue(e) || (!r && a(t, xi(e) || e, 1)) || ''
	},
	Mo = 'O,Moz,ms,Ms,Webkit'.split(','),
	xi = function (t, e, r) {
		var i = e || Fr,
			n = i.style,
			s = 5
		if (t in n && !r) return t
		for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(Mo[s] + t in n); );
		return s < 0 ? null : (s === 3 ? 'ms' : s >= 0 ? Mo[s] : '') + t
	},
	As = function () {
		zu() && window.document && ((ko = window), (dr = ko.document), (ci = dr.documentElement), (Fr = Ds('div') || {style: {}}), Ds('div'), (ut = xi(ut)), (Ie = ut + 'Origin'), (Fr.style.cssText = 'border-width:0;line-height:0;position:absolute;padding:0'), (Ka = !!xi('perspective')), (so = ae.core.reverting), (no = 1))
	},
	ls = function a(t) {
		var e = Ds('svg', (this.ownerSVGElement && this.ownerSVGElement.getAttribute('xmlns')) || 'http://www.w3.org/2000/svg'),
			r = this.parentNode,
			i = this.nextSibling,
			n = this.style.cssText,
			s
		if ((ci.appendChild(e), e.appendChild(this), (this.style.display = 'block'), t))
			try {
				;(s = this.getBBox()), (this._gsapBBox = this.getBBox), (this.getBBox = a)
			} catch {}
		else this._gsapBBox && (s = this._gsapBBox())
		return r && (i ? r.insertBefore(this, i) : r.appendChild(this)), ci.removeChild(e), (this.style.cssText = n), s
	},
	Eo = function (t, e) {
		for (var r = e.length; r--; ) if (t.hasAttribute(e[r])) return t.getAttribute(e[r])
	},
	Za = function (t) {
		var e
		try {
			e = t.getBBox()
		} catch {
			e = ls.call(t, !0)
		}
		return (e && (e.width || e.height)) || t.getBBox === ls || (e = ls.call(t, !0)), e && !e.width && !e.x && !e.y ? {x: +Eo(t, ['x', 'cx', 'x1']) || 0, y: +Eo(t, ['y', 'cy', 'y1']) || 0, width: 0, height: 0} : e
	},
	Qa = function (t) {
		return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Za(t))
	},
	tn = function (t, e) {
		if (e) {
			var r = t.style
			e in or && e !== Ie && (e = ut), r.removeProperty ? ((e.substr(0, 2) === 'ms' || e.substr(0, 6) === 'webkit') && (e = '-' + e), r.removeProperty(e.replace(oo, '-$1').toLowerCase())) : r.removeAttribute(e)
		}
	},
	_r = function (t, e, r, i, n, s) {
		var o = new oe(t._pt, e, r, 0, 1, s ? qa : Ua)
		return (t._pt = o), (o.b = i), (o.e = n), t._props.push(r), o
	},
	Do = {deg: 1, rad: 1, turn: 1},
	Ku = {grid: 1, flex: 1},
	br = function a(t, e, r, i) {
		var n = parseFloat(r) || 0,
			s = (r + '').trim().substr((n + '').length) || 'px',
			o = Fr.style,
			l = Fu.test(e),
			u = t.tagName.toLowerCase() === 'svg',
			c = (u ? 'client' : 'offset') + (l ? 'Width' : 'Height'),
			_ = 100,
			h = i === 'px',
			f = i === '%',
			p,
			d,
			m,
			y
		return i === s || !n || Do[i] || Do[s] ? n : (s !== 'px' && !h && (n = a(t, e, r, 'px')), (y = t.getCTM && Qa(t)), (f || s === '%') && (or[e] || ~e.indexOf('adius')) ? ((p = y ? t.getBBox()[l ? 'width' : 'height'] : t[c]), gt(f ? (n / p) * _ : (n / 100) * p)) : ((o[l ? 'width' : 'height'] = _ + (h ? s : i)), (d = ~e.indexOf('adius') || (i === 'em' && t.appendChild && !u) ? t : t.parentNode), y && (d = (t.ownerSVGElement || {}).parentNode), (!d || d === dr || !d.appendChild) && (d = dr.body), (m = d._gsap), m && f && m.width && l && m.time === ge.time && !m.uncache ? gt((n / m.width) * _) : ((f || s === '%') && !Ku[He(d, 'display')] && (o.position = He(t, 'position')), d === t && (o.position = 'static'), d.appendChild(Fr), (p = Fr[c]), d.removeChild(Fr), (o.position = 'absolute'), l && f && ((m = Ir(d)), (m.time = ge.time), (m.width = d[c])), gt(h ? (p * n) / _ : p && n ? (_ / p) * n : 0))))
	},
	tr = function (t, e, r, i) {
		var n
		return no || As(), e in Ue && e !== 'transform' && ((e = Ue[e]), ~e.indexOf(',') && (e = e.split(',')[0])), or[e] && e !== 'transform' ? ((n = rn(t, i)), (n = e !== 'transformOrigin' ? n[e] : n.svg ? n.origin : Xn(He(t, Ie)) + ' ' + n.zOrigin + 'px')) : ((n = t.style[e]), (!n || n === 'auto' || i || ~(n + '').indexOf('calc(')) && (n = (Yn[e] && Yn[e](t, e, r)) || He(t, e) || da(t, e) || (e === 'opacity' ? 1 : 0))), r && !~(n + '').trim().indexOf(' ') ? br(t, e, n, r) + r : n
	},
	Zu = function (t, e, r, i) {
		if (!r || r === 'none') {
			var n = xi(e, t, 1),
				s = n && He(t, n, 1)
			s && s !== r ? ((e = n), (r = s)) : e === 'borderColor' && (r = He(t, 'borderTopColor'))
		}
		var o = new oe(this._pt, t.style, e, 0, 1, Wa),
			l = 0,
			u = 0,
			c,
			_,
			h,
			f,
			p,
			d,
			m,
			y,
			b,
			T,
			v,
			S
		if (((o.b = r), (o.e = i), (r += ''), (i += ''), i === 'auto' && ((t.style[e] = i), (i = He(t, e) || i), (t.style[e] = r)), (c = [r, i]), Aa(c), (r = c[0]), (i = c[1]), (h = r.match(si) || []), (S = i.match(si) || []), S.length)) {
			for (; (_ = si.exec(i)); ) (m = _[0]), (b = i.substring(l, _.index)), p ? (p = (p + 1) % 5) : (b.substr(-5) === 'rgba(' || b.substr(-5) === 'hsla(') && (p = 1), m !== (d = h[u++] || '') && ((f = parseFloat(d) || 0), (v = d.substr((f + '').length)), m.charAt(1) === '=' && (m = ui(f, m) + v), (y = parseFloat(m)), (T = m.substr((y + '').length)), (l = si.lastIndex - T.length), T || ((T = T || ye.units[e] || v), l === i.length && ((i += T), (o.e += T))), v !== T && (f = br(t, e, d, T) || 0), (o._pt = {_next: o._pt, p: b || u === 1 ? b : ',', s: f, c: y - f, m: (p && p < 4) || e === 'zIndex' ? Math.round : 0}))
			o.c = l < i.length ? i.substring(l, i.length) : ''
		} else o.r = e === 'display' && i === 'none' ? qa : Ua
		return aa.test(i) && (o.e = 0), (this._pt = o), o
	},
	Ao = {top: '0%', bottom: '100%', left: '0%', right: '100%', center: '50%'},
	Qu = function (t) {
		var e = t.split(' '),
			r = e[0],
			i = e[1] || '50%'
		return (r === 'top' || r === 'bottom' || i === 'left' || i === 'right') && ((t = r), (r = i), (i = t)), (e[0] = Ao[r] || r), (e[1] = Ao[i] || i), e.join(' ')
	},
	ju = function (t, e) {
		if (e.tween && e.tween._time === e.tween._dur) {
			var r = e.t,
				i = r.style,
				n = e.u,
				s = r._gsap,
				o,
				l,
				u
			if (n === 'all' || n === !0) (i.cssText = ''), (l = 1)
			else for (n = n.split(','), u = n.length; --u > -1; ) (o = n[u]), or[o] && ((l = 1), (o = o === 'transformOrigin' ? Ie : ut)), tn(r, o)
			l && (tn(r, ut), s && (s.svg && r.removeAttribute('transform'), rn(r, 1), (s.uncache = 1), Ha(i)))
		}
	},
	Yn = {
		clearProps: function (t, e, r, i, n) {
			if (n.data !== 'isFromStart') {
				var s = (t._pt = new oe(t._pt, e, r, 0, 0, ju))
				return (s.u = i), (s.pr = -10), (s.tween = n), t._props.push(r), 1
			}
		},
	},
	en = [1, 0, 0, 1, 0, 0],
	ja = {},
	Ja = function (t) {
		return t === 'matrix(1, 0, 0, 1, 0, 0)' || t === 'none' || !t
	},
	Ro = function (t) {
		var e = He(t, ut)
		return Ja(e) ? en : e.substr(7).match(oa).map(gt)
	},
	ao = function (t, e) {
		var r = t._gsap || Ir(t),
			i = t.style,
			n = Ro(t),
			s,
			o,
			l,
			u
		return r.svg && t.getAttribute('transform') ? ((l = t.transform.baseVal.consolidate().matrix), (n = [l.a, l.b, l.c, l.d, l.e, l.f]), n.join(',') === '1,0,0,1,0,0' ? en : n) : (n === en && !t.offsetParent && t !== ci && !r.svg && ((l = i.display), (i.display = 'block'), (s = t.parentNode), (!s || !t.offsetParent) && ((u = 1), (o = t.nextElementSibling), ci.appendChild(t)), (n = Ro(t)), l ? (i.display = l) : tn(t, 'display'), u && (o ? s.insertBefore(t, o) : s ? s.appendChild(t) : ci.removeChild(t))), e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n)
	},
	Rs = function (t, e, r, i, n, s) {
		var o = t._gsap,
			l = n || ao(t, !0),
			u = o.xOrigin || 0,
			c = o.yOrigin || 0,
			_ = o.xOffset || 0,
			h = o.yOffset || 0,
			f = l[0],
			p = l[1],
			d = l[2],
			m = l[3],
			y = l[4],
			b = l[5],
			T = e.split(' '),
			v = parseFloat(T[0]) || 0,
			S = parseFloat(T[1]) || 0,
			k,
			w,
			C,
			P
		r ? l !== en && (w = f * m - p * d) && ((C = v * (m / w) + S * (-d / w) + (d * b - m * y) / w), (P = v * (-p / w) + S * (f / w) - (f * b - p * y) / w), (v = C), (S = P)) : ((k = Za(t)), (v = k.x + (~T[0].indexOf('%') ? (v / 100) * k.width : v)), (S = k.y + (~(T[1] || T[0]).indexOf('%') ? (S / 100) * k.height : S))), i || (i !== !1 && o.smooth) ? ((y = v - u), (b = S - c), (o.xOffset = _ + (y * f + b * d) - y), (o.yOffset = h + (y * p + b * m) - b)) : (o.xOffset = o.yOffset = 0), (o.xOrigin = v), (o.yOrigin = S), (o.smooth = !!i), (o.origin = e), (o.originIsAbsolute = !!r), (t.style[Ie] = '0px 0px'), s && (_r(s, o, 'xOrigin', u, v), _r(s, o, 'yOrigin', c, S), _r(s, o, 'xOffset', _, o.xOffset), _r(s, o, 'yOffset', h, o.yOffset)), t.setAttribute('data-svg-origin', v + ' ' + S)
	},
	rn = function (t, e) {
		var r = t._gsap || new Fa(t)
		if ('x' in r && !e && !r.uncache) return r
		var i = t.style,
			n = r.scaleX < 0,
			s = 'px',
			o = 'deg',
			l = getComputedStyle(t),
			u = He(t, Ie) || '0',
			c,
			_,
			h,
			f,
			p,
			d,
			m,
			y,
			b,
			T,
			v,
			S,
			k,
			w,
			C,
			P,
			M,
			A,
			E,
			q,
			Y,
			B,
			X,
			z,
			K,
			J,
			g,
			rt,
			Wt,
			Ee,
			ct,
			zt
		return (
			(c = _ = h = d = m = y = b = T = v = 0),
			(f = p = 1),
			(r.svg = !!(t.getCTM && Qa(t))),
			l.translate && ((l.translate !== 'none' || l.scale !== 'none' || l.rotate !== 'none') && (i[ut] = (l.translate !== 'none' ? 'translate3d(' + (l.translate + ' 0 0').split(' ').slice(0, 3).join(', ') + ') ' : '') + (l.rotate !== 'none' ? 'rotate(' + l.rotate + ') ' : '') + (l.scale !== 'none' ? 'scale(' + l.scale.split(' ').join(',') + ') ' : '') + (l[ut] !== 'none' ? l[ut] : '')), (i.scale = i.rotate = i.translate = 'none')),
			(w = ao(t, r.svg)),
			r.svg && (r.uncache ? ((K = t.getBBox()), (u = r.xOrigin - K.x + 'px ' + (r.yOrigin - K.y) + 'px'), (z = '')) : (z = !e && t.getAttribute('data-svg-origin')), Rs(t, z || u, !!z || r.originIsAbsolute, r.smooth !== !1, w)),
			(S = r.xOrigin || 0),
			(k = r.yOrigin || 0),
			w !== en &&
				((A = w[0]),
				(E = w[1]),
				(q = w[2]),
				(Y = w[3]),
				(c = B = w[4]),
				(_ = X = w[5]),
				w.length === 6
					? ((f = Math.sqrt(A * A + E * E)), (p = Math.sqrt(Y * Y + q * q)), (d = A || E ? ti(E, A) * Ar : 0), (b = q || Y ? ti(q, Y) * Ar + d : 0), b && (p *= Math.abs(Math.cos(b * fi))), r.svg && ((c -= S - (S * A + k * q)), (_ -= k - (S * E + k * Y))))
					: ((zt = w[6]),
					  (Ee = w[7]),
					  (g = w[8]),
					  (rt = w[9]),
					  (Wt = w[10]),
					  (ct = w[11]),
					  (c = w[12]),
					  (_ = w[13]),
					  (h = w[14]),
					  (C = ti(zt, Wt)),
					  (m = C * Ar),
					  C && ((P = Math.cos(-C)), (M = Math.sin(-C)), (z = B * P + g * M), (K = X * P + rt * M), (J = zt * P + Wt * M), (g = B * -M + g * P), (rt = X * -M + rt * P), (Wt = zt * -M + Wt * P), (ct = Ee * -M + ct * P), (B = z), (X = K), (zt = J)),
					  (C = ti(-q, Wt)),
					  (y = C * Ar),
					  C && ((P = Math.cos(-C)), (M = Math.sin(-C)), (z = A * P - g * M), (K = E * P - rt * M), (J = q * P - Wt * M), (ct = Y * M + ct * P), (A = z), (E = K), (q = J)),
					  (C = ti(E, A)),
					  (d = C * Ar),
					  C && ((P = Math.cos(C)), (M = Math.sin(C)), (z = A * P + E * M), (K = B * P + X * M), (E = E * P - A * M), (X = X * P - B * M), (A = z), (B = K)),
					  m && Math.abs(m) + Math.abs(d) > 359.9 && ((m = d = 0), (y = 180 - y)),
					  (f = gt(Math.sqrt(A * A + E * E + q * q))),
					  (p = gt(Math.sqrt(X * X + zt * zt))),
					  (C = ti(B, X)),
					  (b = Math.abs(C) > 2e-4 ? C * Ar : 0),
					  (v = ct ? 1 / (ct < 0 ? -ct : ct) : 0)),
				r.svg && ((z = t.getAttribute('transform')), (r.forceCSS = t.setAttribute('transform', '') || !Ja(He(t, ut))), z && t.setAttribute('transform', z))),
			Math.abs(b) > 90 && Math.abs(b) < 270 && (n ? ((f *= -1), (b += d <= 0 ? 180 : -180), (d += d <= 0 ? 180 : -180)) : ((p *= -1), (b += b <= 0 ? 180 : -180))),
			(e = e || r.uncache),
			(r.x = c - ((r.xPercent = c && ((!e && r.xPercent) || (Math.round(t.offsetWidth / 2) === Math.round(-c) ? -50 : 0))) ? (t.offsetWidth * r.xPercent) / 100 : 0) + s),
			(r.y = _ - ((r.yPercent = _ && ((!e && r.yPercent) || (Math.round(t.offsetHeight / 2) === Math.round(-_) ? -50 : 0))) ? (t.offsetHeight * r.yPercent) / 100 : 0) + s),
			(r.z = h + s),
			(r.scaleX = gt(f)),
			(r.scaleY = gt(p)),
			(r.rotation = gt(d) + o),
			(r.rotationX = gt(m) + o),
			(r.rotationY = gt(y) + o),
			(r.skewX = b + o),
			(r.skewY = T + o),
			(r.transformPerspective = v + s),
			(r.zOrigin = parseFloat(u.split(' ')[2]) || 0) && (i[Ie] = Xn(u)),
			(r.xOffset = r.yOffset = 0),
			(r.force3D = ye.force3D),
			(r.renderTransform = r.svg ? tc : Ka ? tl : Ju),
			(r.uncache = 0),
			r
		)
	},
	Xn = function (t) {
		return (t = t.split(' '))[0] + ' ' + t[1]
	},
	us = function (t, e, r) {
		var i = Yt(e)
		return gt(parseFloat(e) + parseFloat(br(t, 'x', r + 'px', i))) + i
	},
	Ju = function (t, e) {
		;(e.z = '0px'), (e.rotationY = e.rotationX = '0deg'), (e.force3D = 0), tl(t, e)
	},
	Er = '0deg',
	Mi = '0px',
	Dr = ') ',
	tl = function (t, e) {
		var r = e || this,
			i = r.xPercent,
			n = r.yPercent,
			s = r.x,
			o = r.y,
			l = r.z,
			u = r.rotation,
			c = r.rotationY,
			_ = r.rotationX,
			h = r.skewX,
			f = r.skewY,
			p = r.scaleX,
			d = r.scaleY,
			m = r.transformPerspective,
			y = r.force3D,
			b = r.target,
			T = r.zOrigin,
			v = '',
			S = (y === 'auto' && t && t !== 1) || y === !0
		if (T && (_ !== Er || c !== Er)) {
			var k = parseFloat(c) * fi,
				w = Math.sin(k),
				C = Math.cos(k),
				P
			;(k = parseFloat(_) * fi), (P = Math.cos(k)), (s = us(b, s, w * P * -T)), (o = us(b, o, -Math.sin(k) * -T)), (l = us(b, l, C * P * -T + T))
		}
		m !== Mi && (v += 'perspective(' + m + Dr), (i || n) && (v += 'translate(' + i + '%, ' + n + '%) '), (S || s !== Mi || o !== Mi || l !== Mi) && (v += l !== Mi || S ? 'translate3d(' + s + ', ' + o + ', ' + l + ') ' : 'translate(' + s + ', ' + o + Dr), u !== Er && (v += 'rotate(' + u + Dr), c !== Er && (v += 'rotateY(' + c + Dr), _ !== Er && (v += 'rotateX(' + _ + Dr), (h !== Er || f !== Er) && (v += 'skew(' + h + ', ' + f + Dr), (p !== 1 || d !== 1) && (v += 'scale(' + p + ', ' + d + Dr), (b.style[ut] = v || 'translate(0, 0)')
	},
	tc = function (t, e) {
		var r = e || this,
			i = r.xPercent,
			n = r.yPercent,
			s = r.x,
			o = r.y,
			l = r.rotation,
			u = r.skewX,
			c = r.skewY,
			_ = r.scaleX,
			h = r.scaleY,
			f = r.target,
			p = r.xOrigin,
			d = r.yOrigin,
			m = r.xOffset,
			y = r.yOffset,
			b = r.forceCSS,
			T = parseFloat(s),
			v = parseFloat(o),
			S,
			k,
			w,
			C,
			P
		;(l = parseFloat(l)), (u = parseFloat(u)), (c = parseFloat(c)), c && ((c = parseFloat(c)), (u += c), (l += c)), l || u ? ((l *= fi), (u *= fi), (S = Math.cos(l) * _), (k = Math.sin(l) * _), (w = Math.sin(l - u) * -h), (C = Math.cos(l - u) * h), u && ((c *= fi), (P = Math.tan(u - c)), (P = Math.sqrt(1 + P * P)), (w *= P), (C *= P), c && ((P = Math.tan(c)), (P = Math.sqrt(1 + P * P)), (S *= P), (k *= P))), (S = gt(S)), (k = gt(k)), (w = gt(w)), (C = gt(C))) : ((S = _), (C = h), (k = w = 0)), ((T && !~(s + '').indexOf('px')) || (v && !~(o + '').indexOf('px'))) && ((T = br(f, 'x', s, 'px')), (v = br(f, 'y', o, 'px'))), (p || d || m || y) && ((T = gt(T + p - (p * S + d * w) + m)), (v = gt(v + d - (p * k + d * C) + y))), (i || n) && ((P = f.getBBox()), (T = gt(T + (i / 100) * P.width)), (v = gt(v + (n / 100) * P.height))), (P = 'matrix(' + S + ',' + k + ',' + w + ',' + C + ',' + T + ',' + v + ')'), f.setAttribute('transform', P), b && (f.style[ut] = P)
	},
	ec = function (t, e, r, i, n) {
		var s = 360,
			o = Et(n),
			l = parseFloat(n) * (o && ~n.indexOf('rad') ? Ar : 1),
			u = l - i,
			c = i + u + 'deg',
			_,
			h
		return o && ((_ = n.split('_')[1]), _ === 'short' && ((u %= s), u !== u % (s / 2) && (u += u < 0 ? s : -s)), _ === 'cw' && u < 0 ? (u = ((u + s * Oo) % s) - ~~(u / s) * s) : _ === 'ccw' && u > 0 && (u = ((u - s * Oo) % s) - ~~(u / s) * s)), (t._pt = h = new oe(t._pt, e, r, i, u, Iu)), (h.e = c), (h.u = 'deg'), t._props.push(r), h
	},
	Lo = function (t, e) {
		for (var r in e) t[r] = e[r]
		return t
	},
	rc = function (t, e, r) {
		var i = Lo({}, r._gsap),
			n = 'perspective,force3D,transformOrigin,svgOrigin',
			s = r.style,
			o,
			l,
			u,
			c,
			_,
			h,
			f,
			p
		i.svg ? ((u = r.getAttribute('transform')), r.setAttribute('transform', ''), (s[ut] = e), (o = rn(r, 1)), tn(r, ut), r.setAttribute('transform', u)) : ((u = getComputedStyle(r)[ut]), (s[ut] = e), (o = rn(r, 1)), (s[ut] = u))
		for (l in or) (u = i[l]), (c = o[l]), u !== c && n.indexOf(l) < 0 && ((f = Yt(u)), (p = Yt(c)), (_ = f !== p ? br(r, l, u, p) : parseFloat(u)), (h = parseFloat(c)), (t._pt = new oe(t._pt, o, l, _, h - _, Es)), (t._pt.u = p || 0), t._props.push(l))
		Lo(o, i)
	}
se('padding,margin,Width,Radius', function (a, t) {
	var e = 'Top',
		r = 'Right',
		i = 'Bottom',
		n = 'Left',
		s = (t < 3 ? [e, r, i, n] : [e + n, e + r, i + r, i + n]).map(function (o) {
			return t < 2 ? a + o : 'border' + o + a
		})
	Yn[t > 1 ? 'border' + a : a] = function (o, l, u, c, _) {
		var h, f
		if (arguments.length < 4)
			return (
				(h = s.map(function (p) {
					return tr(o, p, u)
				})),
				(f = h.join(' ')),
				f.split(h[0]).length === 5 ? h[0] : f
			)
		;(h = (c + '').split(' ')),
			(f = {}),
			s.forEach(function (p, d) {
				return (f[p] = h[d] = h[d] || h[((d - 1) / 2) | 0])
			}),
			o.init(l, f, _)
	}
})
var el = {
	name: 'css',
	register: As,
	targetTest: function (t) {
		return t.style && t.nodeType
	},
	init: function (t, e, r, i, n) {
		var s = this._props,
			o = t.style,
			l = r.vars.startAt,
			u,
			c,
			_,
			h,
			f,
			p,
			d,
			m,
			y,
			b,
			T,
			v,
			S,
			k,
			w,
			C
		no || As(), (this.styles = this.styles || Ga(t)), (C = this.styles.props), (this.tween = r)
		for (d in e)
			if (d !== 'autoRound' && ((c = e[d]), !(_e[d] && Ba(d, e, r, i, t, n)))) {
				if (((f = typeof c), (p = Yn[d]), f === 'function' && ((c = c.call(r, i, t, n)), (f = typeof c)), f === 'string' && ~c.indexOf('random(') && (c = ji(c)), p)) p(this, t, d, c, r) && (w = 1)
				else if (d.substr(0, 2) === '--') (u = (getComputedStyle(t).getPropertyValue(d) + '').trim()), (c += ''), (vr.lastIndex = 0), vr.test(u) || ((m = Yt(u)), (y = Yt(c))), y ? m !== y && (u = br(t, d, u, y) + y) : m && (c += m), this.add(o, 'setProperty', u, c, i, n, 0, 0, d), s.push(d), C.push(d, 0, o[d])
				else if (f !== 'undefined') {
					if ((l && d in l ? ((u = typeof l[d] == 'function' ? l[d].call(r, i, t, n) : l[d]), Et(u) && ~u.indexOf('random(') && (u = ji(u)), Yt(u + '') || (u += ye.units[d] || Yt(tr(t, d)) || ''), (u + '').charAt(1) === '=' && (u = tr(t, d))) : (u = tr(t, d)), (h = parseFloat(u)), (b = f === 'string' && c.charAt(1) === '=' && c.substr(0, 2)), b && (c = c.substr(2)), (_ = parseFloat(c)), d in Ue && (d === 'autoAlpha' && (h === 1 && tr(t, 'visibility') === 'hidden' && _ && (h = 0), C.push('visibility', 0, o.visibility), _r(this, o, 'visibility', h ? 'inherit' : 'hidden', _ ? 'inherit' : 'hidden', !_)), d !== 'scale' && d !== 'transform' && ((d = Ue[d]), ~d.indexOf(',') && (d = d.split(',')[0]))), (T = d in or), T)) {
						if ((this.styles.save(d), v || ((S = t._gsap), (S.renderTransform && !e.parseTransform) || rn(t, e.parseTransform), (k = e.smoothOrigin !== !1 && S.smooth), (v = this._pt = new oe(this._pt, o, ut, 0, 1, S.renderTransform, S, 0, -1)), (v.dep = 1)), d === 'scale')) (this._pt = new oe(this._pt, S, 'scaleY', S.scaleY, (b ? ui(S.scaleY, b + _) : _) - S.scaleY || 0, Es)), (this._pt.u = 0), s.push('scaleY', d), (d += 'X')
						else if (d === 'transformOrigin') {
							C.push(Ie, 0, o[Ie]), (c = Qu(c)), S.svg ? Rs(t, c, 0, k, 0, this) : ((y = parseFloat(c.split(' ')[2]) || 0), y !== S.zOrigin && _r(this, S, 'zOrigin', S.zOrigin, y), _r(this, o, d, Xn(u), Xn(c)))
							continue
						} else if (d === 'svgOrigin') {
							Rs(t, c, 1, k, 0, this)
							continue
						} else if (d in ja) {
							ec(this, S, d, h, b ? ui(h, b + c) : c)
							continue
						} else if (d === 'smoothOrigin') {
							_r(this, S, 'smooth', S.smooth, c)
							continue
						} else if (d === 'force3D') {
							S[d] = c
							continue
						} else if (d === 'transform') {
							rc(this, c, t)
							continue
						}
					} else d in o || (d = xi(d) || d)
					if (T || ((_ || _ === 0) && (h || h === 0) && !Bu.test(c) && d in o)) (m = (u + '').substr((h + '').length)), _ || (_ = 0), (y = Yt(c) || (d in ye.units ? ye.units[d] : m)), m !== y && (h = br(t, d, u, y)), (this._pt = new oe(this._pt, T ? S : o, d, h, (b ? ui(h, b + _) : _) - h, !T && (y === 'px' || d === 'zIndex') && e.autoRound !== !1 ? Xu : Es)), (this._pt.u = y || 0), m !== y && y !== '%' && ((this._pt.b = u), (this._pt.r = Yu))
					else if (d in o) Zu.call(this, t, d, u, b ? b + c : c)
					else if (d in t) this.add(t, d, u || t[d], b ? b + c : c, i, n)
					else if (d !== 'parseTransform') {
						Ks(d, c)
						continue
					}
					T || (d in o ? C.push(d, 0, o[d]) : C.push(d, 1, u || t[d])), s.push(d)
				}
			}
		w && Va(this)
	},
	render: function (t, e) {
		if (e.tween._time || !so()) for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next)
		else e.styles.revert()
	},
	get: tr,
	aliases: Ue,
	getSetter: function (t, e, r) {
		var i = Ue[e]
		return i && i.indexOf(',') < 0 && (e = i), e in or && e !== Ie && (t._gsap.x || tr(t, 'x')) ? (r && Co === r ? (e === 'scale' ? $u : Vu) : (Co = r || {}) && (e === 'scale' ? Uu : qu)) : t.style && !qs(t.style[e]) ? Nu : ~e.indexOf('-') ? Wu : ro(t, e)
	},
	core: {_removeProperty: tn, _getMatrix: ao},
}
ae.utils.checkPrefix = xi
ae.core.getStyleSaver = Ga
;(function (a, t, e, r) {
	var i = se(a + ',' + t + ',' + e, function (n) {
		or[n] = 1
	})
	se(t, function (n) {
		;(ye.units[n] = 'deg'), (ja[n] = 1)
	}),
		(Ue[i[13]] = a + ',' + t),
		se(r, function (n) {
			var s = n.split(':')
			Ue[s[1]] = i[s[0]]
		})
})('x,y,z,scale,scaleX,scaleY,xPercent,yPercent', 'rotation,rotationX,rotationY,skewX,skewY', 'transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective', '0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY')
se('x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective', function (a) {
	ye.units[a] = 'px'
})
ae.registerPlugin(el)
var Q = ae.registerPlugin(el) || ae
Q.core.Tween
function zo(a, t) {
	for (var e = 0; e < t.length; e++) {
		var r = t[e]
		;(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(a, r.key, r)
	}
}
function ic(a, t, e) {
	return t && zo(a.prototype, t), e && zo(a, e), a
}
/*!
 * Observer 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */ var Lt,
	Ls,
	me,
	pr,
	gr,
	hi,
	rl,
	Rr,
	Ni,
	il,
	rr,
	Le,
	nl,
	sl = function () {
		return Lt || (typeof window < 'u' && (Lt = window.gsap) && Lt.registerPlugin && Lt)
	},
	ol = 1,
	ai = [],
	U = [],
	Ge = [],
	Wi = Date.now,
	zs = function (t, e) {
		return e
	},
	nc = function () {
		var t = Ni.core,
			e = t.bridge || {},
			r = t._scrollers,
			i = t._proxies
		r.push.apply(r, U),
			i.push.apply(i, Ge),
			(U = r),
			(Ge = i),
			(zs = function (s, o) {
				return e[s](o)
			})
	},
	xr = function (t, e) {
		return ~Ge.indexOf(t) && Ge[Ge.indexOf(t) + 1][e]
	},
	Vi = function (t) {
		return !!~il.indexOf(t)
	},
	ee = function (t, e, r, i, n) {
		return t.addEventListener(e, r, {passive: !i, capture: !!n})
	},
	Kt = function (t, e, r, i) {
		return t.removeEventListener(e, r, !!i)
	},
	cn = 'scrollLeft',
	fn = 'scrollTop',
	Fs = function () {
		return (rr && rr.isPressed) || U.cache++
	},
	Nn = function (t, e) {
		var r = function i(n) {
			if (n || n === 0) {
				ol && (me.history.scrollRestoration = 'manual')
				var s = rr && rr.isPressed
				;(n = i.v = Math.round(n) || (rr && rr.iOS ? 1 : 0)), t(n), (i.cacheID = U.cache), s && zs('ss', n)
			} else (e || U.cache !== i.cacheID || zs('ref')) && ((i.cacheID = U.cache), (i.v = t()))
			return i.v + i.offset
		}
		return (r.offset = 0), t && r
	},
	jt = {
		s: cn,
		p: 'left',
		p2: 'Left',
		os: 'right',
		os2: 'Right',
		d: 'width',
		d2: 'Width',
		a: 'x',
		sc: Nn(function (a) {
			return arguments.length ? me.scrollTo(a, Tt.sc()) : me.pageXOffset || pr[cn] || gr[cn] || hi[cn] || 0
		}),
	},
	Tt = {
		s: fn,
		p: 'top',
		p2: 'Top',
		os: 'bottom',
		os2: 'Bottom',
		d: 'height',
		d2: 'Height',
		a: 'y',
		op: jt,
		sc: Nn(function (a) {
			return arguments.length ? me.scrollTo(jt.sc(), a) : me.pageYOffset || pr[fn] || gr[fn] || hi[fn] || 0
		}),
	},
	re = function (t) {
		return Lt.utils.toArray(t)[0] || (typeof t == 'string' && Lt.config().nullTargetWarn !== !1 ? console.warn('Element not found:', t) : null)
	},
	Sr = function (t, e) {
		var r = e.s,
			i = e.sc
		Vi(t) && (t = pr.scrollingElement || gr)
		var n = U.indexOf(t),
			s = i === Tt.sc ? 1 : 2
		!~n && (n = U.push(t) - 1), U[n + s] || t.addEventListener('scroll', Fs)
		var o = U[n + s],
			l =
				o ||
				(U[n + s] =
					Nn(xr(t, r), !0) ||
					(Vi(t)
						? i
						: Nn(function (u) {
								return arguments.length ? (t[r] = u) : t[r]
						  })))
		return (l.target = t), o || (l.smooth = Lt.getProperty(t, 'scrollBehavior') === 'smooth'), l
	},
	Bs = function (t, e, r) {
		var i = t,
			n = t,
			s = Wi(),
			o = s,
			l = e || 50,
			u = Math.max(500, l * 3),
			c = function (p, d) {
				var m = Wi()
				d || m - s > l ? ((n = i), (i = p), (o = s), (s = m)) : r ? (i += p) : (i = n + ((p - n) / (m - o)) * (s - o))
			},
			_ = function () {
				;(n = i = r ? 0 : i), (o = s = 0)
			},
			h = function (p) {
				var d = o,
					m = n,
					y = Wi()
				return (p || p === 0) && p !== i && c(p), s === o || y - o > u ? 0 : ((i + (r ? m : -m)) / ((r ? y : s) - d)) * 1e3
			}
		return {update: c, reset: _, getVelocity: h}
	},
	Ei = function (t, e) {
		return e && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t
	},
	Fo = function (t) {
		var e = Math.max.apply(Math, t),
			r = Math.min.apply(Math, t)
		return Math.abs(e) >= Math.abs(r) ? e : r
	},
	al = function () {
		;(Ni = Lt.core.globals().ScrollTrigger), Ni && Ni.core && nc()
	},
	ll = function (t) {
		return (
			(Lt = t || sl()),
			Lt &&
				typeof document < 'u' &&
				document.body &&
				((me = window),
				(pr = document),
				(gr = pr.documentElement),
				(hi = pr.body),
				(il = [me, pr, gr, hi]),
				Lt.utils.clamp,
				(nl = Lt.core.context || function () {}),
				(Rr = 'onpointerenter' in hi ? 'pointer' : 'mouse'),
				(rl = xt.isTouch = me.matchMedia && me.matchMedia('(hover: none), (pointer: coarse)').matches ? 1 : 'ontouchstart' in me || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0),
				(Le = xt.eventTypes = ('ontouchstart' in gr ? 'touchstart,touchmove,touchcancel,touchend' : 'onpointerdown' in gr ? 'pointerdown,pointermove,pointercancel,pointerup' : 'mousedown,mousemove,mouseup,mouseup').split(',')),
				setTimeout(function () {
					return (ol = 0)
				}, 500),
				al(),
				(Ls = 1)),
			Ls
		)
	}
jt.op = Tt
U.cache = 0
var xt = (function () {
	function a(e) {
		this.init(e)
	}
	var t = a.prototype
	return (
		(t.init = function (r) {
			Ls || ll(Lt) || console.warn('Please gsap.registerPlugin(Observer)'), Ni || al()
			var i = r.tolerance,
				n = r.dragMinimum,
				s = r.type,
				o = r.target,
				l = r.lineHeight,
				u = r.debounce,
				c = r.preventDefault,
				_ = r.onStop,
				h = r.onStopDelay,
				f = r.ignore,
				p = r.wheelSpeed,
				d = r.event,
				m = r.onDragStart,
				y = r.onDragEnd,
				b = r.onDrag,
				T = r.onPress,
				v = r.onRelease,
				S = r.onRight,
				k = r.onLeft,
				w = r.onUp,
				C = r.onDown,
				P = r.onChangeX,
				M = r.onChangeY,
				A = r.onChange,
				E = r.onToggleX,
				q = r.onToggleY,
				Y = r.onHover,
				B = r.onHoverEnd,
				X = r.onMove,
				z = r.ignoreCheck,
				K = r.isNormalizer,
				J = r.onGestureStart,
				g = r.onGestureEnd,
				rt = r.onWheel,
				Wt = r.onEnable,
				Ee = r.onDisable,
				ct = r.onClick,
				zt = r.scrollSpeed,
				it = r.capture,
				Ft = r.allowClicks,
				Vt = r.lockAxis,
				Ti = r.onLockAxis
			;(this.target = o = re(o) || gr), (this.vars = r), f && (f = Lt.utils.toArray(f)), (i = i || 1e-9), (n = n || 0), (p = p || 1), (zt = zt || 1), (s = s || 'wheel,touch,pointer'), (u = u !== !1), l || (l = parseFloat(me.getComputedStyle(hi).lineHeight) || 22)
			var le,
				xe,
				H,
				bt,
				ue,
				Ye,
				$t,
				x = this,
				Ze = 0,
				nt = 0,
				ar = Sr(o, jt),
				lr = Sr(o, Tt),
				Zr = ar(),
				Ut = lr(),
				bi = ~s.indexOf('touch') && !~s.indexOf('pointer') && Le[0] === 'pointerdown',
				ur = Vi(o),
				dt = o.ownerDocument || pr,
				ce = [0, 0, 0],
				qt = [0, 0, 0],
				Si = 0,
				Ht = function () {
					return (Si = Wi())
				},
				Xe = function (L, O) {
					return ((x.event = L) && f && ~f.indexOf(L.target)) || (O && bi && L.pointerType !== 'touch') || (z && z(L, O))
				},
				Pi = function () {
					x._vx.reset(), x._vy.reset(), xe.pause(), _ && _(x)
				},
				cr = function () {
					var L = (x.deltaX = Fo(ce)),
						O = (x.deltaY = Fo(qt)),
						R = Math.abs(L) >= i,
						F = Math.abs(O) >= i
					A && (R || F) && A(x, L, O, ce, qt), R && (S && x.deltaX > 0 && S(x), k && x.deltaX < 0 && k(x), P && P(x), E && x.deltaX < 0 != Ze < 0 && E(x), (Ze = x.deltaX), (ce[0] = ce[1] = ce[2] = 0)), F && (C && x.deltaY > 0 && C(x), w && x.deltaY < 0 && w(x), M && M(x), q && x.deltaY < 0 != nt < 0 && q(x), (nt = x.deltaY), (qt[0] = qt[1] = qt[2] = 0)), (bt || H) && (X && X(x), H && (b(x), (H = !1)), (bt = !1)), Ye && !(Ye = !1) && Ti && Ti(x), ue && (rt(x), (ue = !1)), (le = 0)
				},
				Qr = function (L, O, R) {
					;(ce[R] += L), (qt[R] += O), x._vx.update(L), x._vy.update(O), u ? le || (le = requestAnimationFrame(cr)) : cr()
				},
				kr = function (L, O) {
					Vt && !$t && ((x.axis = $t = Math.abs(L) > Math.abs(O) ? 'x' : 'y'), (Ye = !0)), $t !== 'y' && ((ce[2] += L), x._vx.update(L, !0)), $t !== 'x' && ((qt[2] += O), x._vy.update(O, !0)), u ? le || (le = requestAnimationFrame(cr)) : cr()
				},
				Cr = function (L) {
					if (!Xe(L, 1)) {
						L = Ei(L, c)
						var O = L.clientX,
							R = L.clientY,
							F = O - x.x,
							N = R - x.y,
							St = x.isDragging
						;(x.x = O), (x.y = R), (St || Math.abs(x.startX - O) >= n || Math.abs(x.startY - R) >= n) && (b && (H = !0), St || (x.isDragging = !0), kr(F, N), St || (m && m(x)))
					}
				},
				$ = (x.onPress = function (I) {
					Xe(I, 1) || (I && I.button) || ((x.axis = $t = null), xe.pause(), (x.isPressed = !0), (I = Ei(I)), (Ze = nt = 0), (x.startX = x.x = I.clientX), (x.startY = x.y = I.clientY), x._vx.reset(), x._vy.reset(), ee(K ? o : dt, Le[1], Cr, c, !0), (x.deltaX = x.deltaY = 0), T && T(x))
				}),
				Qe = (x.onRelease = function (I) {
					if (!Xe(I, 1)) {
						Kt(K ? o : dt, Le[1], Cr, !0)
						var L = !isNaN(x.y - x.startY),
							O = x.isDragging && (Math.abs(x.x - x.startX) > 3 || Math.abs(x.y - x.startY) > 3),
							R = Ei(I)
						!O &&
							L &&
							(x._vx.reset(),
							x._vy.reset(),
							c &&
								Ft &&
								Lt.delayedCall(0.08, function () {
									if (Wi() - Si > 300 && !I.defaultPrevented) {
										if (I.target.click) I.target.click()
										else if (dt.createEvent) {
											var F = dt.createEvent('MouseEvents')
											F.initMouseEvent('click', !0, !0, me, 1, R.screenX, R.screenY, R.clientX, R.clientY, !1, !1, !1, !1, 0, null), I.target.dispatchEvent(F)
										}
									}
								})),
							(x.isDragging = x.isGesturing = x.isPressed = !1),
							_ && !K && xe.restart(!0),
							y && O && y(x),
							v && v(x, O)
					}
				}),
				De = function (L) {
					return L.touches && L.touches.length > 1 && (x.isGesturing = !0) && J(L, x.isDragging)
				},
				Ae = function () {
					return (x.isGesturing = !1) || g(x)
				},
				we = function (L) {
					if (!Xe(L)) {
						var O = ar(),
							R = lr()
						Qr((O - Zr) * zt, (R - Ut) * zt, 1), (Zr = O), (Ut = R), _ && xe.restart(!0)
					}
				},
				Re = function (L) {
					if (!Xe(L)) {
						;(L = Ei(L, c)), rt && (ue = !0)
						var O = (L.deltaMode === 1 ? l : L.deltaMode === 2 ? me.innerHeight : 1) * p
						Qr(L.deltaX * O, L.deltaY * O, 0), _ && !K && xe.restart(!0)
					}
				},
				Or = function (L) {
					if (!Xe(L)) {
						var O = L.clientX,
							R = L.clientY,
							F = O - x.x,
							N = R - x.y
						;(x.x = O), (x.y = R), (bt = !0), (F || N) && kr(F, N)
					}
				},
				jr = function (L) {
					;(x.event = L), Y(x)
				},
				je = function (L) {
					;(x.event = L), B(x)
				},
				ki = function (L) {
					return Xe(L) || (Ei(L, c) && ct(x))
				}
			;(xe = x._dc = Lt.delayedCall(h || 0.25, Pi).pause()),
				(x.deltaX = x.deltaY = 0),
				(x._vx = Bs(0, 50, !0)),
				(x._vy = Bs(0, 50, !0)),
				(x.scrollX = ar),
				(x.scrollY = lr),
				(x.isDragging = x.isGesturing = x.isPressed = !1),
				nl(this),
				(x.enable = function (I) {
					return x.isEnabled || (ee(ur ? dt : o, 'scroll', Fs), s.indexOf('scroll') >= 0 && ee(ur ? dt : o, 'scroll', we, c, it), s.indexOf('wheel') >= 0 && ee(o, 'wheel', Re, c, it), ((s.indexOf('touch') >= 0 && rl) || s.indexOf('pointer') >= 0) && (ee(o, Le[0], $, c, it), ee(dt, Le[2], Qe), ee(dt, Le[3], Qe), Ft && ee(o, 'click', Ht, !1, !0), ct && ee(o, 'click', ki), J && ee(dt, 'gesturestart', De), g && ee(dt, 'gestureend', Ae), Y && ee(o, Rr + 'enter', jr), B && ee(o, Rr + 'leave', je), X && ee(o, Rr + 'move', Or)), (x.isEnabled = !0), I && I.type && $(I), Wt && Wt(x)), x
				}),
				(x.disable = function () {
					x.isEnabled &&
						(ai.filter(function (I) {
							return I !== x && Vi(I.target)
						}).length || Kt(ur ? dt : o, 'scroll', Fs),
						x.isPressed && (x._vx.reset(), x._vy.reset(), Kt(K ? o : dt, Le[1], Cr, !0)),
						Kt(ur ? dt : o, 'scroll', we, it),
						Kt(o, 'wheel', Re, it),
						Kt(o, Le[0], $, it),
						Kt(dt, Le[2], Qe),
						Kt(dt, Le[3], Qe),
						Kt(o, 'click', Ht, !0),
						Kt(o, 'click', ki),
						Kt(dt, 'gesturestart', De),
						Kt(dt, 'gestureend', Ae),
						Kt(o, Rr + 'enter', jr),
						Kt(o, Rr + 'leave', je),
						Kt(o, Rr + 'move', Or),
						(x.isEnabled = x.isPressed = x.isDragging = !1),
						Ee && Ee(x))
				}),
				(x.kill = x.revert =
					function () {
						x.disable()
						var I = ai.indexOf(x)
						I >= 0 && ai.splice(I, 1), rr === x && (rr = 0)
					}),
				ai.push(x),
				K && Vi(o) && (rr = x),
				x.enable(d)
		}),
		ic(a, [
			{
				key: 'velocityX',
				get: function () {
					return this._vx.getVelocity()
				},
			},
			{
				key: 'velocityY',
				get: function () {
					return this._vy.getVelocity()
				},
			},
		]),
		a
	)
})()
xt.version = '3.11.5'
xt.create = function (a) {
	return new xt(a)
}
xt.register = ll
xt.getAll = function () {
	return ai.slice()
}
xt.getById = function (a) {
	return ai.filter(function (t) {
		return t.vars.id === a
	})[0]
}
sl() && Lt.registerPlugin(xt)
/*!
 * ScrollTrigger 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */ var D,
	ii,
	G,
	st,
	Fe,
	ft,
	ul,
	Wn,
	Vn,
	li,
	Pn,
	hn,
	It,
	Jn,
	Is,
	Zt,
	Bo,
	Io,
	ni,
	cl,
	cs,
	fl,
	he,
	hl,
	dl,
	_l,
	fr,
	Ys,
	lo,
	fs,
	dn = 1,
	Qt = Date.now,
	hs = Qt(),
	Oe = 0,
	Li = 0,
	sc = function a() {
		return Li && requestAnimationFrame(a)
	},
	Yo = function () {
		return (Jn = 1)
	},
	Xo = function () {
		return (Jn = 0)
	},
	Ve = function (t) {
		return t
	},
	zi = function (t) {
		return Math.round(t * 1e5) / 1e5 || 0
	},
	pl = function () {
		return typeof window < 'u'
	},
	gl = function () {
		return D || (pl() && (D = window.gsap) && D.registerPlugin && D)
	},
	qr = function (t) {
		return !!~ul.indexOf(t)
	},
	ml = function (t) {
		return (
			xr(t, 'getBoundingClientRect') ||
			(qr(t)
				? function () {
						return (Dn.width = G.innerWidth), (Dn.height = G.innerHeight), Dn
				  }
				: function () {
						return er(t)
				  })
		)
	},
	oc = function (t, e, r) {
		var i = r.d,
			n = r.d2,
			s = r.a
		return (s = xr(t, 'getBoundingClientRect'))
			? function () {
					return s()[i]
			  }
			: function () {
					return (e ? G['inner' + n] : t['client' + n]) || 0
			  }
	},
	ac = function (t, e) {
		return !e || ~Ge.indexOf(t)
			? ml(t)
			: function () {
					return Dn
			  }
	},
	mr = function (t, e) {
		var r = e.s,
			i = e.d2,
			n = e.d,
			s = e.a
		return Math.max(0, (r = 'scroll' + i) && (s = xr(t, r)) ? s() - ml(t)()[n] : qr(t) ? (Fe[r] || ft[r]) - (G['inner' + i] || Fe['client' + i] || ft['client' + i]) : t[r] - t['offset' + i])
	},
	_n = function (t, e) {
		for (var r = 0; r < ni.length; r += 3) (!e || ~e.indexOf(ni[r + 1])) && t(ni[r], ni[r + 1], ni[r + 2])
	},
	ze = function (t) {
		return typeof t == 'string'
	},
	Jt = function (t) {
		return typeof t == 'function'
	},
	Fi = function (t) {
		return typeof t == 'number'
	},
	kn = function (t) {
		return typeof t == 'object'
	},
	Di = function (t, e, r) {
		return t && t.progress(e ? 0 : 1) && r && t.pause()
	},
	ds = function (t, e) {
		if (t.enabled) {
			var r = e(t)
			r && r.totalTime && (t.callbackAnimation = r)
		}
	},
	ei = Math.abs,
	yl = 'left',
	vl = 'top',
	uo = 'right',
	co = 'bottom',
	Nr = 'width',
	Wr = 'height',
	$i = 'Right',
	Ui = 'Left',
	qi = 'Top',
	Hi = 'Bottom',
	pt = 'padding',
	Se = 'margin',
	wi = 'Width',
	fo = 'Height',
	At = 'px',
	Be = function (t) {
		return G.getComputedStyle(t)
	},
	lc = function (t) {
		var e = Be(t).position
		t.style.position = e === 'absolute' || e === 'fixed' ? e : 'relative'
	},
	No = function (t, e) {
		for (var r in e) r in t || (t[r] = e[r])
		return t
	},
	er = function (t, e) {
		var r = e && Be(t)[Is] !== 'matrix(1, 0, 0, 1, 0, 0)' && D.to(t, {x: 0, y: 0, xPercent: 0, yPercent: 0, rotation: 0, rotationX: 0, rotationY: 0, scale: 1, skewX: 0, skewY: 0}).progress(1),
			i = t.getBoundingClientRect()
		return r && r.progress(0).kill(), i
	},
	Xs = function (t, e) {
		var r = e.d2
		return t['offset' + r] || t['client' + r] || 0
	},
	xl = function (t) {
		var e = [],
			r = t.labels,
			i = t.duration(),
			n
		for (n in r) e.push(r[n] / i)
		return e
	},
	uc = function (t) {
		return function (e) {
			return D.utils.snap(xl(t), e)
		}
	},
	ho = function (t) {
		var e = D.utils.snap(t),
			r =
				Array.isArray(t) &&
				t.slice(0).sort(function (i, n) {
					return i - n
				})
		return r
			? function (i, n, s) {
					s === void 0 && (s = 0.001)
					var o
					if (!n) return e(i)
					if (n > 0) {
						for (i -= s, o = 0; o < r.length; o++) if (r[o] >= i) return r[o]
						return r[o - 1]
					} else for (o = r.length, i += s; o--; ) if (r[o] <= i) return r[o]
					return r[0]
			  }
			: function (i, n, s) {
					s === void 0 && (s = 0.001)
					var o = e(i)
					return !n || Math.abs(o - i) < s || o - i < 0 == n < 0 ? o : e(n < 0 ? i - t : i + t)
			  }
	},
	cc = function (t) {
		return function (e, r) {
			return ho(xl(t))(e, r.direction)
		}
	},
	pn = function (t, e, r, i) {
		return r.split(',').forEach(function (n) {
			return t(e, n, i)
		})
	},
	Mt = function (t, e, r, i, n) {
		return t.addEventListener(e, r, {passive: !i, capture: !!n})
	},
	Ot = function (t, e, r, i) {
		return t.removeEventListener(e, r, !!i)
	},
	gn = function (t, e, r) {
		;(r = r && r.wheelHandler), r && (t(e, 'wheel', r), t(e, 'touchmove', r))
	},
	Wo = {startColor: 'green', endColor: 'red', indent: 0, fontSize: '16px', fontWeight: 'normal'},
	mn = {toggleActions: 'play', anticipatePin: 0},
	$n = {top: 0, left: 0, center: 0.5, bottom: 1, right: 1},
	Cn = function (t, e) {
		if (ze(t)) {
			var r = t.indexOf('='),
				i = ~r ? +(t.charAt(r - 1) + 1) * parseFloat(t.substr(r + 1)) : 0
			~r && (t.indexOf('%') > r && (i *= e / 100), (t = t.substr(0, r - 1))), (t = i + (t in $n ? $n[t] * e : ~t.indexOf('%') ? (parseFloat(t) * e) / 100 : parseFloat(t) || 0))
		}
		return t
	},
	yn = function (t, e, r, i, n, s, o, l) {
		var u = n.startColor,
			c = n.endColor,
			_ = n.fontSize,
			h = n.indent,
			f = n.fontWeight,
			p = st.createElement('div'),
			d = qr(r) || xr(r, 'pinType') === 'fixed',
			m = t.indexOf('scroller') !== -1,
			y = d ? ft : r,
			b = t.indexOf('start') !== -1,
			T = b ? u : c,
			v = 'border-color:' + T + ';font-size:' + _ + ';color:' + T + ';font-weight:' + f + ';pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;'
		return (v += 'position:' + ((m || l) && d ? 'fixed;' : 'absolute;')), (m || l || !d) && (v += (i === Tt ? uo : co) + ':' + (s + parseFloat(h)) + 'px;'), o && (v += 'box-sizing:border-box;text-align:left;width:' + o.offsetWidth + 'px;'), (p._isStart = b), p.setAttribute('class', 'gsap-marker-' + t + (e ? ' marker-' + e : '')), (p.style.cssText = v), (p.innerText = e || e === 0 ? t + '-' + e : t), y.children[0] ? y.insertBefore(p, y.children[0]) : y.appendChild(p), (p._offset = p['offset' + i.op.d2]), On(p, 0, i, b), p
	},
	On = function (t, e, r, i) {
		var n = {display: 'block'},
			s = r[i ? 'os2' : 'p2'],
			o = r[i ? 'p2' : 'os2']
		;(t._isFlipped = i), (n[r.a + 'Percent'] = i ? -100 : 0), (n[r.a] = i ? '1px' : 0), (n['border' + s + wi] = 1), (n['border' + o + wi] = 0), (n[r.p] = e + 'px'), D.set(t, n)
	},
	V = [],
	Ns = {},
	nn,
	Vo = function () {
		return Qt() - Oe > 34 && (nn || (nn = requestAnimationFrame(ir)))
	},
	ri = function () {
		;(!he || !he.isPressed || he.startX > ft.clientWidth) && (U.cache++, he ? nn || (nn = requestAnimationFrame(ir)) : ir(), Oe || Gr('scrollStart'), (Oe = Qt()))
	},
	_s = function () {
		;(_l = G.innerWidth), (dl = G.innerHeight)
	},
	Bi = function () {
		U.cache++, !It && !fl && !st.fullscreenElement && !st.webkitFullscreenElement && (!hl || _l !== G.innerWidth || Math.abs(G.innerHeight - dl) > G.innerHeight * 0.25) && Wn.restart(!0)
	},
	Hr = {},
	fc = [],
	wl = function a() {
		return Ot(W, 'scrollEnd', a) || Br(!0)
	},
	Gr = function (t) {
		return (
			(Hr[t] &&
				Hr[t].map(function (e) {
					return e()
				})) ||
			fc
		)
	},
	de = [],
	Tl = function (t) {
		for (var e = 0; e < de.length; e += 5) (!t || (de[e + 4] && de[e + 4].query === t)) && ((de[e].style.cssText = de[e + 1]), de[e].getBBox && de[e].setAttribute('transform', de[e + 2] || ''), (de[e + 3].uncache = 1))
	},
	_o = function (t, e) {
		var r
		for (Zt = 0; Zt < V.length; Zt++) (r = V[Zt]), r && (!e || r._ctx === e) && (t ? r.kill(1) : r.revert(!0, !0))
		e && Tl(e), e || Gr('revert')
	},
	bl = function (t, e) {
		U.cache++,
			(e || !pe) &&
				U.forEach(function (r) {
					return Jt(r) && r.cacheID++ && (r.rec = 0)
				}),
			ze(t) && (G.history.scrollRestoration = lo = t)
	},
	pe,
	Vr = 0,
	$o,
	hc = function () {
		if ($o !== Vr) {
			var t = ($o = Vr)
			requestAnimationFrame(function () {
				return t === Vr && Br(!0)
			})
		}
	},
	Br = function (t, e) {
		if (Oe && !t) {
			Mt(W, 'scrollEnd', wl)
			return
		}
		;(pe = W.isRefreshing = !0),
			U.forEach(function (i) {
				return Jt(i) && i.cacheID++ && (i.rec = i())
			})
		var r = Gr('refreshInit')
		cl && W.sort(),
			e || _o(),
			U.forEach(function (i) {
				Jt(i) && (i.smooth && (i.target.style.scrollBehavior = 'auto'), i(0))
			}),
			V.slice(0).forEach(function (i) {
				return i.refresh()
			}),
			V.forEach(function (i, n) {
				if (i._subPinOffset && i.pin) {
					var s = i.vars.horizontal ? 'offsetWidth' : 'offsetHeight',
						o = i.pin[s]
					i.revert(!0, 1), i.adjustPinSpacing(i.pin[s] - o), i.refresh()
				}
			}),
			V.forEach(function (i) {
				return i.vars.end === 'max' && i.setPositions(i.start, Math.max(i.start + 1, mr(i.scroller, i._dir)))
			}),
			r.forEach(function (i) {
				return i && i.render && i.render(-1)
			}),
			U.forEach(function (i) {
				Jt(i) &&
					(i.smooth &&
						requestAnimationFrame(function () {
							return (i.target.style.scrollBehavior = 'smooth')
						}),
					i.rec && i(i.rec))
			}),
			bl(lo, 1),
			Wn.pause(),
			Vr++,
			(pe = 2),
			ir(2),
			V.forEach(function (i) {
				return Jt(i.vars.onRefresh) && i.vars.onRefresh(i)
			}),
			(pe = W.isRefreshing = !1),
			Gr('refresh')
	},
	Ws = 0,
	Mn = 1,
	Gi,
	ir = function (t) {
		if (!pe || t === 2) {
			;(W.isUpdating = !0), Gi && Gi.update(0)
			var e = V.length,
				r = Qt(),
				i = r - hs >= 50,
				n = e && V[0].scroll()
			if (((Mn = Ws > n ? -1 : 1), pe || (Ws = n), i && (Oe && !Jn && r - Oe > 200 && ((Oe = 0), Gr('scrollEnd')), (Pn = hs), (hs = r)), Mn < 0)) {
				for (Zt = e; Zt-- > 0; ) V[Zt] && V[Zt].update(0, i)
				Mn = 1
			} else for (Zt = 0; Zt < e; Zt++) V[Zt] && V[Zt].update(0, i)
			W.isUpdating = !1
		}
		nn = 0
	},
	Vs = [yl, vl, co, uo, Se + Hi, Se + $i, Se + qi, Se + Ui, 'display', 'flexShrink', 'float', 'zIndex', 'gridColumnStart', 'gridColumnEnd', 'gridRowStart', 'gridRowEnd', 'gridArea', 'justifySelf', 'alignSelf', 'placeSelf', 'order'],
	En = Vs.concat([Nr, Wr, 'boxSizing', 'max' + wi, 'max' + fo, 'position', Se, pt, pt + qi, pt + $i, pt + Hi, pt + Ui]),
	dc = function (t, e, r) {
		di(r)
		var i = t._gsap
		if (i.spacerIsNative) di(i.spacerState)
		else if (t._gsap.swappedIn) {
			var n = e.parentNode
			n && (n.insertBefore(t, e), n.removeChild(e))
		}
		t._gsap.swappedIn = !1
	},
	ps = function (t, e, r, i) {
		if (!t._gsap.swappedIn) {
			for (var n = Vs.length, s = e.style, o = t.style, l; n--; ) (l = Vs[n]), (s[l] = r[l])
			;(s.position = r.position === 'absolute' ? 'absolute' : 'relative'), r.display === 'inline' && (s.display = 'inline-block'), (o[co] = o[uo] = 'auto'), (s.flexBasis = r.flexBasis || 'auto'), (s.overflow = 'visible'), (s.boxSizing = 'border-box'), (s[Nr] = Xs(t, jt) + At), (s[Wr] = Xs(t, Tt) + At), (s[pt] = o[Se] = o[vl] = o[yl] = '0'), di(i), (o[Nr] = o['max' + wi] = r[Nr]), (o[Wr] = o['max' + fo] = r[Wr]), (o[pt] = r[pt]), t.parentNode !== e && (t.parentNode.insertBefore(e, t), e.appendChild(t)), (t._gsap.swappedIn = !0)
		}
	},
	_c = /([A-Z])/g,
	di = function (t) {
		if (t) {
			var e = t.t.style,
				r = t.length,
				i = 0,
				n,
				s
			for ((t.t._gsap || D.core.getCache(t.t)).uncache = 1; i < r; i += 2) (s = t[i + 1]), (n = t[i]), s ? (e[n] = s) : e[n] && e.removeProperty(n.replace(_c, '-$1').toLowerCase())
		}
	},
	vn = function (t) {
		for (var e = En.length, r = t.style, i = [], n = 0; n < e; n++) i.push(En[n], r[En[n]])
		return (i.t = t), i
	},
	pc = function (t, e, r) {
		for (var i = [], n = t.length, s = r ? 8 : 0, o; s < n; s += 2) (o = t[s]), i.push(o, o in e ? e[o] : t[s + 1])
		return (i.t = t.t), i
	},
	Dn = {left: 0, top: 0},
	Uo = function (t, e, r, i, n, s, o, l, u, c, _, h, f) {
		Jt(t) && (t = t(l)), ze(t) && t.substr(0, 3) === 'max' && (t = h + (t.charAt(4) === '=' ? Cn('0' + t.substr(3), r) : 0))
		var p = f ? f.time() : 0,
			d,
			m,
			y
		if ((f && f.seek(0), Fi(t))) f && (t = D.utils.mapRange(f.scrollTrigger.start, f.scrollTrigger.end, 0, h, t)), o && On(o, r, i, !0)
		else {
			Jt(e) && (e = e(l))
			var b = (t || '0').split(' '),
				T,
				v,
				S,
				k
			;(y = re(e) || ft), (T = er(y) || {}), (!T || (!T.left && !T.top)) && Be(y).display === 'none' && ((k = y.style.display), (y.style.display = 'block'), (T = er(y)), k ? (y.style.display = k) : y.style.removeProperty('display')), (v = Cn(b[0], T[i.d])), (S = Cn(b[1] || '0', r)), (t = T[i.p] - u[i.p] - c + v + n - S), o && On(o, S, i, r - S < 20 || (o._isStart && S > 20)), (r -= r - S)
		}
		if (s) {
			var w = t + r,
				C = s._isStart
			;(d = 'scroll' + i.d2), On(s, w, i, (C && w > 20) || (!C && (_ ? Math.max(ft[d], Fe[d]) : s.parentNode[d]) <= w + 1)), _ && ((u = er(o)), _ && (s.style[i.op.p] = u[i.op.p] - i.op.m - s._offset + At))
		}
		return f && y && ((d = er(y)), f.seek(h), (m = er(y)), (f._caScrollDist = d[i.p] - m[i.p]), (t = (t / f._caScrollDist) * h)), f && f.seek(p), f ? t : Math.round(t)
	},
	gc = /(webkit|moz|length|cssText|inset)/i,
	qo = function (t, e, r, i) {
		if (t.parentNode !== e) {
			var n = t.style,
				s,
				o
			if (e === ft) {
				;(t._stOrig = n.cssText), (o = Be(t))
				for (s in o) !+s && !gc.test(s) && o[s] && typeof n[s] == 'string' && s !== '0' && (n[s] = o[s])
				;(n.top = r), (n.left = i)
			} else n.cssText = t._stOrig
			;(D.core.getCache(t).uncache = 1), e.appendChild(t)
		}
	},
	Sl = function (t, e, r) {
		var i = e,
			n = i
		return function (s) {
			var o = Math.round(t())
			return o !== i && o !== n && Math.abs(o - i) > 3 && Math.abs(o - n) > 3 && ((s = o), r && r()), (n = i), (i = s), s
		}
	},
	Ho = function (t, e) {
		var r = Sr(t, e),
			i = '_scroll' + e.p2,
			n = function s(o, l, u, c, _) {
				var h = s.tween,
					f = l.onComplete,
					p = {}
				u = u || r()
				var d = Sl(r, u, function () {
					h.kill(), (s.tween = 0)
				})
				return (
					(_ = (c && _) || 0),
					(c = c || o - u),
					h && h.kill(),
					(l[i] = o),
					(l.modifiers = p),
					(p[i] = function () {
						return d(u + c * h.ratio + _ * h.ratio * h.ratio)
					}),
					(l.onUpdate = function () {
						U.cache++, ir()
					}),
					(l.onComplete = function () {
						;(s.tween = 0), f && f.call(h)
					}),
					(h = s.tween = D.to(t, l)),
					h
				)
			}
		return (
			(t[i] = r),
			(r.wheelHandler = function () {
				return n.tween && n.tween.kill() && (n.tween = 0)
			}),
			Mt(t, 'wheel', r.wheelHandler),
			W.isTouch && Mt(t, 'touchmove', r.wheelHandler),
			n
		)
	},
	W = (function () {
		function a(e, r) {
			ii || a.register(D) || console.warn('Please gsap.registerPlugin(ScrollTrigger)'), this.init(e, r)
		}
		var t = a.prototype
		return (
			(t.init = function (r, i) {
				if (((this.progress = this.start = 0), this.vars && this.kill(!0, !0), !Li)) {
					this.update = this.refresh = this.kill = Ve
					return
				}
				r = No(ze(r) || Fi(r) || r.nodeType ? {trigger: r} : r, mn)
				var n = r,
					s = n.onUpdate,
					o = n.toggleClass,
					l = n.id,
					u = n.onToggle,
					c = n.onRefresh,
					_ = n.scrub,
					h = n.trigger,
					f = n.pin,
					p = n.pinSpacing,
					d = n.invalidateOnRefresh,
					m = n.anticipatePin,
					y = n.onScrubComplete,
					b = n.onSnapComplete,
					T = n.once,
					v = n.snap,
					S = n.pinReparent,
					k = n.pinSpacer,
					w = n.containerAnimation,
					C = n.fastScrollEnd,
					P = n.preventOverlaps,
					M = r.horizontal || (r.containerAnimation && r.horizontal !== !1) ? jt : Tt,
					A = !_ && _ !== 0,
					E = re(r.scroller || G),
					q = D.core.getCache(E),
					Y = qr(E),
					B = ('pinType' in r ? r.pinType : xr(E, 'pinType') || (Y && 'fixed')) === 'fixed',
					X = [r.onEnter, r.onLeave, r.onEnterBack, r.onLeaveBack],
					z = A && r.toggleActions.split(' '),
					K = 'markers' in r ? r.markers : mn.markers,
					J = Y ? 0 : parseFloat(Be(E)['border' + M.p2 + wi]) || 0,
					g = this,
					rt =
						r.onRefreshInit &&
						function () {
							return r.onRefreshInit(g)
						},
					Wt = oc(E, Y, M),
					Ee = ac(E, Y),
					ct = 0,
					zt = 0,
					it = Sr(E, M),
					Ft,
					Vt,
					Ti,
					le,
					xe,
					H,
					bt,
					ue,
					Ye,
					$t,
					x,
					Ze,
					nt,
					ar,
					lr,
					Zr,
					Ut,
					bi,
					ur,
					dt,
					ce,
					qt,
					Si,
					Ht,
					Xe,
					Pi,
					cr,
					Qr,
					kr,
					Cr,
					$,
					Qe,
					De,
					Ae,
					we,
					Re,
					Or,
					jr,
					je
				if (
					(Ys(g),
					(g._dir = M),
					(m *= 45),
					(g.scroller = E),
					(g.scroll = w ? w.time.bind(w) : it),
					(le = it()),
					(g.vars = r),
					(i = i || r.animation),
					'refreshPriority' in r && ((cl = 1), r.refreshPriority === -9999 && (Gi = g)),
					(q.tweenScroll = q.tweenScroll || {top: Ho(E, Tt), left: Ho(E, jt)}),
					(g.tweenTo = Ft = q.tweenScroll[M.p]),
					(g.scrubDuration = function (O) {
						;(Qe = Fi(O) && O),
							Qe
								? $
									? $.duration(O)
									: ($ = D.to(i, {
											ease: 'expo',
											totalProgress: '+=0.001',
											duration: Qe,
											paused: !0,
											onComplete: function () {
												return y && y(g)
											},
									  }))
								: ($ && $.progress(1).kill(), ($ = 0))
					}),
					i && ((i.vars.lazy = !1), i._initted || (i.vars.immediateRender !== !1 && r.immediateRender !== !1 && i.duration() && i.render(0, !0, !0)), (g.animation = i.pause()), (i.scrollTrigger = g), g.scrubDuration(_), $ && $.resetTo && $.resetTo('totalProgress', 0), (kr = 0), l || (l = i.vars.id)),
					V.push(g),
					v &&
						((!kn(v) || v.push) && (v = {snapTo: v}),
						'scrollBehavior' in ft.style && D.set(Y ? [ft, Fe] : E, {scrollBehavior: 'auto'}),
						U.forEach(function (O) {
							return Jt(O) && O.target === (Y ? st.scrollingElement || Fe : E) && (O.smooth = !1)
						}),
						(Ti = Jt(v.snapTo)
							? v.snapTo
							: v.snapTo === 'labels'
							? uc(i)
							: v.snapTo === 'labelsDirectional'
							? cc(i)
							: v.directional !== !1
							? function (O, R) {
									return ho(v.snapTo)(O, Qt() - zt < 500 ? 0 : R.direction)
							  }
							: D.utils.snap(v.snapTo)),
						(De = v.duration || {min: 0.1, max: 2}),
						(De = kn(De) ? li(De.min, De.max) : li(De, De)),
						(Ae = D.delayedCall(v.delay || Qe / 2 || 0.1, function () {
							var O = it(),
								R = Qt() - zt < 500,
								F = Ft.tween
							if ((R || Math.abs(g.getVelocity()) < 10) && !F && !Jn && ct !== O) {
								var N = (O - H) / nt,
									St = i && !A ? i.totalProgress() : N,
									j = R ? 0 : ((St - Cr) / (Qt() - Pn)) * 1e3 || 0,
									ot = D.utils.clamp(-N, 1 - N, (ei(j / 2) * j) / 0.185),
									Dt = N + (v.inertia === !1 ? 0 : ot),
									Pt = li(0, 1, Ti(Dt, g)),
									mt = Math.round(H + Pt * nt),
									at = v,
									fe = at.onStart,
									Gt = at.onInterrupt,
									kt = at.onComplete
								if (O <= bt && O >= H && mt !== O) {
									if (F && !F._initted && F.data <= ei(mt - O)) return
									v.inertia === !1 && (ot = Pt - N),
										Ft(
											mt,
											{
												duration: De(ei((Math.max(ei(Dt - St), ei(Pt - St)) * 0.185) / j / 0.05 || 0)),
												ease: v.ease || 'power3',
												data: ei(mt - O),
												onInterrupt: function () {
													return Ae.restart(!0) && Gt && Gt(g)
												},
												onComplete: function () {
													g.update(), (ct = it()), (kr = Cr = i && !A ? i.totalProgress() : g.progress), b && b(g), kt && kt(g)
												},
											},
											O,
											ot * nt,
											mt - O - ot * nt
										),
										fe && fe(g, Ft.tween)
								}
							} else g.isActive && ct !== O && Ae.restart(!0)
						}).pause())),
					l && (Ns[l] = g),
					(h = g.trigger = re(h || f)),
					(je = h && h._gsap && h._gsap.stRevert),
					je && (je = je(g)),
					(f = f === !0 ? h : re(f)),
					ze(o) && (o = {targets: h, className: o}),
					f && (p === !1 || p === Se || (p = !p && f.parentNode && f.parentNode.style && Be(f.parentNode).display === 'flex' ? !1 : pt), (g.pin = f), (Vt = D.core.getCache(f)), Vt.spacer ? (ar = Vt.pinState) : (k && ((k = re(k)), k && !k.nodeType && (k = k.current || k.nativeElement), (Vt.spacerIsNative = !!k), k && (Vt.spacerState = vn(k))), (Vt.spacer = Ut = k || st.createElement('div')), Ut.classList.add('pin-spacer'), l && Ut.classList.add('pin-spacer-' + l), (Vt.pinState = ar = vn(f))), r.force3D !== !1 && D.set(f, {force3D: !0}), (g.spacer = Ut = Vt.spacer), (Qr = Be(f)), (Si = Qr[p + M.os2]), (ur = D.getProperty(f)), (dt = D.quickSetter(f, M.a, At)), ps(f, Ut, Qr), (Zr = vn(f))),
					K)
				) {
					;(Ze = kn(K) ? No(K, Wo) : Wo), ($t = yn('scroller-start', l, E, M, Ze, 0)), (x = yn('scroller-end', l, E, M, Ze, 0, $t)), (bi = $t['offset' + M.op.d2])
					var ki = re(xr(E, 'content') || E)
					;(ue = this.markerStart = yn('start', l, ki, M, Ze, bi, 0, w)), (Ye = this.markerEnd = yn('end', l, ki, M, Ze, bi, 0, w)), w && (jr = D.quickSetter([ue, Ye], M.a, At)), !B && !(Ge.length && xr(E, 'fixedMarkers') === !0) && (lc(Y ? ft : E), D.set([$t, x], {force3D: !0}), (Xe = D.quickSetter($t, M.a, At)), (cr = D.quickSetter(x, M.a, At)))
				}
				if (w) {
					var I = w.vars.onUpdate,
						L = w.vars.onUpdateParams
					w.eventCallback('onUpdate', function () {
						g.update(0, 0, 1), I && I.apply(w, L || [])
					})
				}
				;(g.previous = function () {
					return V[V.indexOf(g) - 1]
				}),
					(g.next = function () {
						return V[V.indexOf(g) + 1]
					}),
					(g.revert = function (O, R) {
						if (!R) return g.kill(!0)
						var F = O !== !1 || !g.enabled,
							N = It
						F !== g.isReverted &&
							(F && ((Re = Math.max(it(), g.scroll.rec || 0)), (we = g.progress), (Or = i && i.progress())),
							ue &&
								[ue, Ye, $t, x].forEach(function (St) {
									return (St.style.display = F ? 'none' : 'block')
								}),
							F && ((It = g), g.update(F)),
							f && (!S || !g.isActive) && (F ? dc(f, Ut, ar) : ps(f, Ut, Be(f), Ht)),
							F || g.update(F),
							(It = N),
							(g.isReverted = F))
					}),
					(g.refresh = function (O, R) {
						if (!((It || !g.enabled) && !R)) {
							if (f && O && Oe) {
								Mt(a, 'scrollEnd', wl)
								return
							}
							!pe && rt && rt(g), (It = g), (zt = Qt()), Ft.tween && (Ft.tween.kill(), (Ft.tween = 0)), $ && $.pause(), d && i && i.revert({kill: !1}).invalidate(), g.isReverted || g.revert(!0, !0), (g._subPinOffset = !1)
							for (var F = Wt(), N = Ee(), St = w ? w.duration() : mr(E, M), j = nt <= 0.01, ot = 0, Dt = 0, Pt = r.end, mt = r.endTrigger || h, at = r.start || (r.start === 0 || !h ? 0 : f ? '0 0' : '0 100%'), fe = (g.pinnedContainer = r.pinnedContainer && re(r.pinnedContainer)), Gt = (h && Math.max(0, V.indexOf(g))) || 0, kt = Gt, _t, Bt, Jr, Mr, yt, Ct, Ne, ts, mo, Ci, We; kt--; ) (Ct = V[kt]), Ct.end || Ct.refresh(0, 1) || (It = g), (Ne = Ct.pin), Ne && (Ne === h || Ne === f || Ne === fe) && !Ct.isReverted && (Ci || (Ci = []), Ci.unshift(Ct), Ct.revert(!0, !0)), Ct !== V[kt] && (Gt--, kt--)
							for (Jt(at) && (at = at(g)), H = Uo(at, h, F, M, it(), ue, $t, g, N, J, B, St, w) || (f ? -0.001 : 0), Jt(Pt) && (Pt = Pt(g)), ze(Pt) && !Pt.indexOf('+=') && (~Pt.indexOf(' ') ? (Pt = (ze(at) ? at.split(' ')[0] : '') + Pt) : ((ot = Cn(Pt.substr(2), F)), (Pt = ze(at) ? at : (w ? D.utils.mapRange(0, w.duration(), w.scrollTrigger.start, w.scrollTrigger.end, H) : H) + ot), (mt = h))), bt = Math.max(H, Uo(Pt || (mt ? '100% 0' : St), mt, F, M, it() + ot, Ye, x, g, N, J, B, St, w)) || -0.001, nt = bt - H || ((H -= 0.01) && 0.001), ot = 0, kt = Gt; kt--; ) (Ct = V[kt]), (Ne = Ct.pin), Ne && Ct.start - Ct._pinPush <= H && !w && Ct.end > 0 && ((_t = Ct.end - Ct.start), ((Ne === h && Ct.start - Ct._pinPush < H) || Ne === fe) && !Fi(at) && (ot += _t * (1 - Ct.progress)), Ne === f && (Dt += _t))
							if (((H += ot), (bt += ot), j && (we = D.utils.clamp(0, 1, D.utils.normalize(H, bt, Re))), (g._pinPush = Dt), ue && ot && ((_t = {}), (_t[M.a] = '+=' + ot), fe && (_t[M.p] = '-=' + it()), D.set([ue, Ye], _t)), f))
								(_t = Be(f)),
									(Mr = M === Tt),
									(Jr = it()),
									(ce = parseFloat(ur(M.a)) + Dt),
									!St && bt > 1 && ((We = (Y ? st.scrollingElement || Fe : E).style), (We = {style: We, value: We['overflow' + M.a.toUpperCase()]}), (We.style['overflow' + M.a.toUpperCase()] = 'scroll')),
									ps(f, Ut, _t),
									(Zr = vn(f)),
									(Bt = er(f, !0)),
									(ts = B && Sr(E, Mr ? jt : Tt)()),
									p &&
										((Ht = [p + M.os2, nt + Dt + At]),
										(Ht.t = Ut),
										(kt = p === pt ? Xs(f, M) + nt + Dt : 0),
										kt && Ht.push(M.d, kt + At),
										di(Ht),
										fe &&
											V.forEach(function (Oi) {
												Oi.pin === fe && Oi.vars.pinSpacing !== !1 && (Oi._subPinOffset = !0)
											}),
										B && it(Re)),
									B && ((yt = {top: Bt.top + (Mr ? Jr - H : ts) + At, left: Bt.left + (Mr ? ts : Jr - H) + At, boxSizing: 'border-box', position: 'fixed'}), (yt[Nr] = yt['max' + wi] = Math.ceil(Bt.width) + At), (yt[Wr] = yt['max' + fo] = Math.ceil(Bt.height) + At), (yt[Se] = yt[Se + qi] = yt[Se + $i] = yt[Se + Hi] = yt[Se + Ui] = '0'), (yt[pt] = _t[pt]), (yt[pt + qi] = _t[pt + qi]), (yt[pt + $i] = _t[pt + $i]), (yt[pt + Hi] = _t[pt + Hi]), (yt[pt + Ui] = _t[pt + Ui]), (lr = pc(ar, yt, S)), pe && it(0)),
									i ? ((mo = i._initted), cs(1), i.render(i.duration(), !0, !0), (qt = ur(M.a) - ce + nt + Dt), (Pi = Math.abs(nt - qt) > 1), B && Pi && lr.splice(lr.length - 2, 2), i.render(0, !0, !0), mo || i.invalidate(!0), i.parent || i.totalTime(i.totalTime()), cs(0)) : (qt = nt),
									We && (We.value ? (We.style['overflow' + M.a.toUpperCase()] = We.value) : We.style.removeProperty('overflow-' + M.a))
							else if (h && it() && !w) for (Bt = h.parentNode; Bt && Bt !== ft; ) Bt._pinOffset && ((H -= Bt._pinOffset), (bt -= Bt._pinOffset)), (Bt = Bt.parentNode)
							Ci &&
								Ci.forEach(function (Oi) {
									return Oi.revert(!1, !0)
								}),
								(g.start = H),
								(g.end = bt),
								(le = xe = pe ? Re : it()),
								!w && !pe && (le < Re && it(Re), (g.scroll.rec = 0)),
								g.revert(!1, !0),
								Ae && ((ct = -1), g.isActive && it(H + nt * we), Ae.restart(!0)),
								(It = 0),
								i && A && (i._initted || Or) && i.progress() !== Or && i.progress(Or, !0).render(i.time(), !0, !0),
								(j || we !== g.progress || w) && (i && !A && i.totalProgress(w && H < -0.001 && !we ? D.utils.normalize(H, bt, 0) : we, !0), (g.progress = (le - H) / nt === we ? 0 : we)),
								f && p && (Ut._pinOffset = Math.round(g.progress * qt)),
								$ && $.invalidate(),
								c && !pe && c(g)
						}
					}),
					(g.getVelocity = function () {
						return ((it() - xe) / (Qt() - Pn)) * 1e3 || 0
					}),
					(g.endAnimation = function () {
						Di(g.callbackAnimation), i && ($ ? $.progress(1) : i.paused() ? A || Di(i, g.direction < 0, 1) : Di(i, i.reversed()))
					}),
					(g.labelToScroll = function (O) {
						return (i && i.labels && (H || g.refresh() || H) + (i.labels[O] / i.duration()) * nt) || 0
					}),
					(g.getTrailing = function (O) {
						var R = V.indexOf(g),
							F = g.direction > 0 ? V.slice(0, R).reverse() : V.slice(R + 1)
						return (
							ze(O)
								? F.filter(function (N) {
										return N.vars.preventOverlaps === O
								  })
								: F
						).filter(function (N) {
							return g.direction > 0 ? N.end <= H : N.start >= bt
						})
					}),
					(g.update = function (O, R, F) {
						if (!(w && !F && !O)) {
							var N = pe === !0 ? Re : g.scroll(),
								St = O ? 0 : (N - H) / nt,
								j = St < 0 ? 0 : St > 1 ? 1 : St || 0,
								ot = g.progress,
								Dt,
								Pt,
								mt,
								at,
								fe,
								Gt,
								kt,
								_t
							if ((R && ((xe = le), (le = w ? it() : N), v && ((Cr = kr), (kr = i && !A ? i.totalProgress() : j))), m && !j && f && !It && !dn && Oe && H < N + ((N - xe) / (Qt() - Pn)) * m && (j = 1e-4), j !== ot && g.enabled)) {
								if (
									((Dt = g.isActive = !!j && j < 1),
									(Pt = !!ot && ot < 1),
									(Gt = Dt !== Pt),
									(fe = Gt || !!j != !!ot),
									(g.direction = j > ot ? 1 : -1),
									(g.progress = j),
									fe && !It && ((mt = j && !ot ? 0 : j === 1 ? 1 : ot === 1 ? 2 : 3), A && ((at = (!Gt && z[mt + 1] !== 'none' && z[mt + 1]) || z[mt]), (_t = i && (at === 'complete' || at === 'reset' || at in i)))),
									P &&
										(Gt || _t) &&
										(_t || _ || !i) &&
										(Jt(P)
											? P(g)
											: g.getTrailing(P).forEach(function (yt) {
													return yt.endAnimation()
											  })),
									A || ($ && !It && !dn ? ($._dp._time - $._start !== $._time && $.render($._dp._time - $._start), $.resetTo ? $.resetTo('totalProgress', j, i._tTime / i._tDur) : (($.vars.totalProgress = j), $.invalidate().restart())) : i && i.totalProgress(j, !!It)),
									f)
								) {
									if ((O && p && (Ut.style[p + M.os2] = Si), !B)) dt(zi(ce + qt * j))
									else if (fe) {
										if (((kt = !O && j > ot && bt + 1 > N && N + 1 >= mr(E, M)), S))
											if (!O && (Dt || kt)) {
												var Bt = er(f, !0),
													Jr = N - H
												qo(f, ft, Bt.top + (M === Tt ? Jr : 0) + At, Bt.left + (M === Tt ? 0 : Jr) + At)
											} else qo(f, Ut)
										di(Dt || kt ? lr : Zr), (Pi && j < 1 && Dt) || dt(ce + (j === 1 && !kt ? qt : 0))
									}
								}
								v && !Ft.tween && !It && !dn && Ae.restart(!0),
									o &&
										(Gt || (T && j && (j < 1 || !fs))) &&
										Vn(o.targets).forEach(function (yt) {
											return yt.classList[Dt || T ? 'add' : 'remove'](o.className)
										}),
									s && !A && !O && s(g),
									fe && !It ? (A && (_t && (at === 'complete' ? i.pause().totalProgress(1) : at === 'reset' ? i.restart(!0).pause() : at === 'restart' ? i.restart(!0) : i[at]()), s && s(g)), (Gt || !fs) && (u && Gt && ds(g, u), X[mt] && ds(g, X[mt]), T && (j === 1 ? g.kill(!1, 1) : (X[mt] = 0)), Gt || ((mt = j === 1 ? 1 : 3), X[mt] && ds(g, X[mt]))), C && !Dt && Math.abs(g.getVelocity()) > (Fi(C) ? C : 2500) && (Di(g.callbackAnimation), $ ? $.progress(1) : Di(i, at === 'reverse' ? 1 : !j, 1))) : A && s && !It && s(g)
							}
							if (cr) {
								var Mr = w ? (N / w.duration()) * (w._caScrollDist || 0) : N
								Xe(Mr + ($t._isFlipped ? 1 : 0)), cr(Mr)
							}
							jr && jr((-N / w.duration()) * (w._caScrollDist || 0))
						}
					}),
					(g.enable = function (O, R) {
						g.enabled || ((g.enabled = !0), Mt(E, 'resize', Bi), Mt(Y ? st : E, 'scroll', ri), rt && Mt(a, 'refreshInit', rt), O !== !1 && ((g.progress = we = 0), (le = xe = ct = it())), R !== !1 && g.refresh())
					}),
					(g.getTween = function (O) {
						return O && Ft ? Ft.tween : $
					}),
					(g.setPositions = function (O, R) {
						f && ((ce += O - H), (qt += R - O - nt), p === pt && g.adjustPinSpacing(R - O - nt)), (g.start = H = O), (g.end = bt = R), (nt = R - O), g.update()
					}),
					(g.adjustPinSpacing = function (O) {
						if (Ht && O) {
							var R = Ht.indexOf(M.d) + 1
							;(Ht[R] = parseFloat(Ht[R]) + O + At), (Ht[1] = parseFloat(Ht[1]) + O + At), di(Ht)
						}
					}),
					(g.disable = function (O, R) {
						if (g.enabled && (O !== !1 && g.revert(!0, !0), (g.enabled = g.isActive = !1), R || ($ && $.pause()), (Re = 0), Vt && (Vt.uncache = 1), rt && Ot(a, 'refreshInit', rt), Ae && (Ae.pause(), Ft.tween && Ft.tween.kill() && (Ft.tween = 0)), !Y)) {
							for (var F = V.length; F--; ) if (V[F].scroller === E && V[F] !== g) return
							Ot(E, 'resize', Bi), Ot(E, 'scroll', ri)
						}
					}),
					(g.kill = function (O, R) {
						g.disable(O, R), $ && !R && $.kill(), l && delete Ns[l]
						var F = V.indexOf(g)
						F >= 0 && V.splice(F, 1),
							F === Zt && Mn > 0 && Zt--,
							(F = 0),
							V.forEach(function (N) {
								return N.scroller === g.scroller && (F = 1)
							}),
							F || pe || (g.scroll.rec = 0),
							i && ((i.scrollTrigger = null), O && i.revert({kill: !1}), R || i.kill()),
							ue &&
								[ue, Ye, $t, x].forEach(function (N) {
									return N.parentNode && N.parentNode.removeChild(N)
								}),
							Gi === g && (Gi = 0),
							f &&
								(Vt && (Vt.uncache = 1),
								(F = 0),
								V.forEach(function (N) {
									return N.pin === f && F++
								}),
								F || (Vt.spacer = 0)),
							r.onKill && r.onKill(g)
					}),
					g.enable(!1, !1),
					je && je(g),
					!i || !i.add || nt
						? g.refresh()
						: D.delayedCall(0.01, function () {
								return H || bt || g.refresh()
						  }) &&
						  (nt = 0.01) &&
						  (H = bt = 0),
					f && hc()
			}),
			(a.register = function (r) {
				return ii || ((D = r || gl()), pl() && window.document && a.enable(), (ii = Li)), ii
			}),
			(a.defaults = function (r) {
				if (r) for (var i in r) mn[i] = r[i]
				return mn
			}),
			(a.disable = function (r, i) {
				;(Li = 0),
					V.forEach(function (s) {
						return s[i ? 'kill' : 'disable'](r)
					}),
					Ot(G, 'wheel', ri),
					Ot(st, 'scroll', ri),
					clearInterval(hn),
					Ot(st, 'touchcancel', Ve),
					Ot(ft, 'touchstart', Ve),
					pn(Ot, st, 'pointerdown,touchstart,mousedown', Yo),
					pn(Ot, st, 'pointerup,touchend,mouseup', Xo),
					Wn.kill(),
					_n(Ot)
				for (var n = 0; n < U.length; n += 3) gn(Ot, U[n], U[n + 1]), gn(Ot, U[n], U[n + 2])
			}),
			(a.enable = function () {
				if (((G = window), (st = document), (Fe = st.documentElement), (ft = st.body), D && ((Vn = D.utils.toArray), (li = D.utils.clamp), (Ys = D.core.context || Ve), (cs = D.core.suppressOverwrites || Ve), (lo = G.history.scrollRestoration || 'auto'), (Ws = G.pageYOffset), D.core.globals('ScrollTrigger', a), ft))) {
					;(Li = 1),
						sc(),
						xt.register(D),
						(a.isTouch = xt.isTouch),
						(fr = xt.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
						Mt(G, 'wheel', ri),
						(ul = [G, st, Fe, ft]),
						D.matchMedia
							? ((a.matchMedia = function (l) {
									var u = D.matchMedia(),
										c
									for (c in l) u.add(c, l[c])
									return u
							  }),
							  D.addEventListener('matchMediaInit', function () {
									return _o()
							  }),
							  D.addEventListener('matchMediaRevert', function () {
									return Tl()
							  }),
							  D.addEventListener('matchMedia', function () {
									Br(0, 1), Gr('matchMedia')
							  }),
							  D.matchMedia('(orientation: portrait)', function () {
									return _s(), _s
							  }))
							: console.warn('Requires GSAP 3.11.0 or later'),
						_s(),
						Mt(st, 'scroll', ri)
					var r = ft.style,
						i = r.borderTopStyle,
						n = D.core.Animation.prototype,
						s,
						o
					for (
						n.revert ||
							Object.defineProperty(n, 'revert', {
								value: function () {
									return this.time(-0.01, !0)
								},
							}),
							r.borderTopStyle = 'solid',
							s = er(ft),
							Tt.m = Math.round(s.top + Tt.sc()) || 0,
							jt.m = Math.round(s.left + jt.sc()) || 0,
							i ? (r.borderTopStyle = i) : r.removeProperty('border-top-style'),
							hn = setInterval(Vo, 250),
							D.delayedCall(0.5, function () {
								return (dn = 0)
							}),
							Mt(st, 'touchcancel', Ve),
							Mt(ft, 'touchstart', Ve),
							pn(Mt, st, 'pointerdown,touchstart,mousedown', Yo),
							pn(Mt, st, 'pointerup,touchend,mouseup', Xo),
							Is = D.utils.checkPrefix('transform'),
							En.push(Is),
							ii = Qt(),
							Wn = D.delayedCall(0.2, Br).pause(),
							ni = [
								st,
								'visibilitychange',
								function () {
									var l = G.innerWidth,
										u = G.innerHeight
									st.hidden ? ((Bo = l), (Io = u)) : (Bo !== l || Io !== u) && Bi()
								},
								st,
								'DOMContentLoaded',
								Br,
								G,
								'load',
								Br,
								G,
								'resize',
								Bi,
							],
							_n(Mt),
							V.forEach(function (l) {
								return l.enable(0, 1)
							}),
							o = 0;
						o < U.length;
						o += 3
					)
						gn(Ot, U[o], U[o + 1]), gn(Ot, U[o], U[o + 2])
				}
			}),
			(a.config = function (r) {
				'limitCallbacks' in r && (fs = !!r.limitCallbacks)
				var i = r.syncInterval
				;(i && clearInterval(hn)) || ((hn = i) && setInterval(Vo, i)), 'ignoreMobileResize' in r && (hl = a.isTouch === 1 && r.ignoreMobileResize), 'autoRefreshEvents' in r && (_n(Ot) || _n(Mt, r.autoRefreshEvents || 'none'), (fl = (r.autoRefreshEvents + '').indexOf('resize') === -1))
			}),
			(a.scrollerProxy = function (r, i) {
				var n = re(r),
					s = U.indexOf(n),
					o = qr(n)
				~s && U.splice(s, o ? 6 : 2), i && (o ? Ge.unshift(G, i, ft, i, Fe, i) : Ge.unshift(n, i))
			}),
			(a.clearMatchMedia = function (r) {
				V.forEach(function (i) {
					return i._ctx && i._ctx.query === r && i._ctx.kill(!0, !0)
				})
			}),
			(a.isInViewport = function (r, i, n) {
				var s = (ze(r) ? re(r) : r).getBoundingClientRect(),
					o = s[n ? Nr : Wr] * i || 0
				return n ? s.right - o > 0 && s.left + o < G.innerWidth : s.bottom - o > 0 && s.top + o < G.innerHeight
			}),
			(a.positionInViewport = function (r, i, n) {
				ze(r) && (r = re(r))
				var s = r.getBoundingClientRect(),
					o = s[n ? Nr : Wr],
					l = i == null ? o / 2 : i in $n ? $n[i] * o : ~i.indexOf('%') ? (parseFloat(i) * o) / 100 : parseFloat(i) || 0
				return n ? (s.left + l) / G.innerWidth : (s.top + l) / G.innerHeight
			}),
			(a.killAll = function (r) {
				if (
					(V.slice(0).forEach(function (n) {
						return n.vars.id !== 'ScrollSmoother' && n.kill()
					}),
					r !== !0)
				) {
					var i = Hr.killAll || []
					;(Hr = {}),
						i.forEach(function (n) {
							return n()
						})
				}
			}),
			a
		)
	})()
W.version = '3.11.5'
W.saveStyles = function (a) {
	return a
		? Vn(a).forEach(function (t) {
				if (t && t.style) {
					var e = de.indexOf(t)
					e >= 0 && de.splice(e, 5), de.push(t, t.style.cssText, t.getBBox && t.getAttribute('transform'), D.core.getCache(t), Ys())
				}
		  })
		: de
}
W.revert = function (a, t) {
	return _o(!a, t)
}
W.create = function (a, t) {
	return new W(a, t)
}
W.refresh = function (a) {
	return a ? Bi() : (ii || W.register()) && Br(!0)
}
W.update = function (a) {
	return ++U.cache && ir(a === !0 ? 2 : 0)
}
W.clearScrollMemory = bl
W.maxScroll = function (a, t) {
	return mr(a, t ? jt : Tt)
}
W.getScrollFunc = function (a, t) {
	return Sr(re(a), t ? jt : Tt)
}
W.getById = function (a) {
	return Ns[a]
}
W.getAll = function () {
	return V.filter(function (a) {
		return a.vars.id !== 'ScrollSmoother'
	})
}
W.isScrolling = function () {
	return !!Oe
}
W.snapDirectional = ho
W.addEventListener = function (a, t) {
	var e = Hr[a] || (Hr[a] = [])
	~e.indexOf(t) || e.push(t)
}
W.removeEventListener = function (a, t) {
	var e = Hr[a],
		r = e && e.indexOf(t)
	r >= 0 && e.splice(r, 1)
}
W.batch = function (a, t) {
	var e = [],
		r = {},
		i = t.interval || 0.016,
		n = t.batchMax || 1e9,
		s = function (u, c) {
			var _ = [],
				h = [],
				f = D.delayedCall(i, function () {
					c(_, h), (_ = []), (h = [])
				}).pause()
			return function (p) {
				_.length || f.restart(!0), _.push(p.trigger), h.push(p), n <= _.length && f.progress(1)
			}
		},
		o
	for (o in t) r[o] = o.substr(0, 2) === 'on' && Jt(t[o]) && o !== 'onRefreshInit' ? s(o, t[o]) : t[o]
	return (
		Jt(n) &&
			((n = n()),
			Mt(W, 'refresh', function () {
				return (n = t.batchMax())
			})),
		Vn(a).forEach(function (l) {
			var u = {}
			for (o in r) u[o] = r[o]
			;(u.trigger = l), e.push(W.create(u))
		}),
		e
	)
}
var Go = function (t, e, r, i) {
		return e > i ? t(i) : e < 0 && t(0), r > i ? (i - e) / (r - e) : r < 0 ? e / (e - r) : 1
	},
	gs = function a(t, e) {
		e === !0 ? t.style.removeProperty('touch-action') : (t.style.touchAction = e === !0 ? 'auto' : e ? 'pan-' + e + (xt.isTouch ? ' pinch-zoom' : '') : 'none'), t === Fe && a(ft, e)
	},
	xn = {auto: 1, scroll: 1},
	mc = function (t) {
		var e = t.event,
			r = t.target,
			i = t.axis,
			n = (e.changedTouches ? e.changedTouches[0] : e).target,
			s = n._gsap || D.core.getCache(n),
			o = Qt(),
			l
		if (!s._isScrollT || o - s._isScrollT > 2e3) {
			for (; n && n !== ft && ((n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth) || !(xn[(l = Be(n)).overflowY] || xn[l.overflowX])); ) n = n.parentNode
			;(s._isScroll = n && n !== r && !qr(n) && (xn[(l = Be(n)).overflowY] || xn[l.overflowX])), (s._isScrollT = o)
		}
		;(s._isScroll || i === 'x') && (e.stopPropagation(), (e._gsapAllow = !0))
	},
	Pl = function (t, e, r, i) {
		return xt.create({
			target: t,
			capture: !0,
			debounce: !1,
			lockAxis: !0,
			type: e,
			onWheel: (i = i && mc),
			onPress: i,
			onDrag: i,
			onScroll: i,
			onEnable: function () {
				return r && Mt(st, xt.eventTypes[0], Zo, !1, !0)
			},
			onDisable: function () {
				return Ot(st, xt.eventTypes[0], Zo, !0)
			},
		})
	},
	yc = /(input|label|select|textarea)/i,
	Ko,
	Zo = function (t) {
		var e = yc.test(t.target.tagName)
		;(e || Ko) && ((t._gsapAllow = !0), (Ko = e))
	},
	vc = function (t) {
		kn(t) || (t = {}), (t.preventDefault = t.isNormalizer = t.allowClicks = !0), t.type || (t.type = 'wheel,touch'), (t.debounce = !!t.debounce), (t.id = t.id || 'normalizer')
		var e = t,
			r = e.normalizeScrollX,
			i = e.momentum,
			n = e.allowNestedScroll,
			s = e.onRelease,
			o,
			l,
			u = re(t.target) || Fe,
			c = D.core.globals().ScrollSmoother,
			_ = c && c.get(),
			h = fr && ((t.content && re(t.content)) || (_ && t.content !== !1 && !_.smooth() && _.content())),
			f = Sr(u, Tt),
			p = Sr(u, jt),
			d = 1,
			m = (xt.isTouch && G.visualViewport ? G.visualViewport.scale * G.visualViewport.width : G.outerWidth) / G.innerWidth,
			y = 0,
			b = Jt(i)
				? function () {
						return i(o)
				  }
				: function () {
						return i || 2.8
				  },
			T,
			v,
			S = Pl(u, t.type, !0, n),
			k = function () {
				return (v = !1)
			},
			w = Ve,
			C = Ve,
			P = function () {
				;(l = mr(u, Tt)), (C = li(fr ? 1 : 0, l)), r && (w = li(0, mr(u, jt))), (T = Vr)
			},
			M = function () {
				;(h._gsap.y = zi(parseFloat(h._gsap.y) + f.offset) + 'px'), (h.style.transform = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' + parseFloat(h._gsap.y) + ', 0, 1)'), (f.offset = f.cacheID = 0)
			},
			A = function () {
				if (v) {
					requestAnimationFrame(k)
					var K = zi(o.deltaY / 2),
						J = C(f.v - K)
					if (h && J !== f.v + f.offset) {
						f.offset = J - f.v
						var g = zi((parseFloat(h && h._gsap.y) || 0) - f.offset)
						;(h.style.transform = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' + g + ', 0, 1)'), (h._gsap.y = g + 'px'), (f.cacheID = U.cache), ir()
					}
					return !0
				}
				f.offset && M(), (v = !0)
			},
			E,
			q,
			Y,
			B,
			X = function () {
				P(), E.isActive() && E.vars.scrollY > l && (f() > l ? E.progress(1) && f(l) : E.resetTo('scrollY', l))
			}
		return (
			h && D.set(h, {y: '+=0'}),
			(t.ignoreCheck = function (z) {
				return (fr && z.type === 'touchmove' && A()) || (d > 1.05 && z.type !== 'touchstart') || o.isGesturing || (z.touches && z.touches.length > 1)
			}),
			(t.onPress = function () {
				v = !1
				var z = d
				;(d = zi(((G.visualViewport && G.visualViewport.scale) || 1) / m)), E.pause(), z !== d && gs(u, d > 1.01 ? !0 : r ? !1 : 'x'), (q = p()), (Y = f()), P(), (T = Vr)
			}),
			(t.onRelease = t.onGestureStart =
				function (z, K) {
					if ((f.offset && M(), !K)) B.restart(!0)
					else {
						U.cache++
						var J = b(),
							g,
							rt
						r && ((g = p()), (rt = g + (J * 0.05 * -z.velocityX) / 0.227), (J *= Go(p, g, rt, mr(u, jt))), (E.vars.scrollX = w(rt))), (g = f()), (rt = g + (J * 0.05 * -z.velocityY) / 0.227), (J *= Go(f, g, rt, mr(u, Tt))), (E.vars.scrollY = C(rt)), E.invalidate().duration(J).play(0.01), ((fr && E.vars.scrollY >= l) || g >= l - 1) && D.to({}, {onUpdate: X, duration: J})
					}
					s && s(z)
				}),
			(t.onWheel = function () {
				E._ts && E.pause(), Qt() - y > 1e3 && ((T = 0), (y = Qt()))
			}),
			(t.onChange = function (z, K, J, g, rt) {
				if ((Vr !== T && P(), K && r && p(w(g[2] === K ? q + (z.startX - z.x) : p() + K - g[1])), J)) {
					f.offset && M()
					var Wt = rt[2] === J,
						Ee = Wt ? Y + z.startY - z.y : f() + J - rt[1],
						ct = C(Ee)
					Wt && Ee !== ct && (Y += ct - Ee), f(ct)
				}
				;(J || K) && ir()
			}),
			(t.onEnable = function () {
				gs(u, r ? !1 : 'x'), W.addEventListener('refresh', X), Mt(G, 'resize', X), f.smooth && ((f.target.style.scrollBehavior = 'auto'), (f.smooth = p.smooth = !1)), S.enable()
			}),
			(t.onDisable = function () {
				gs(u, !0), Ot(G, 'resize', X), W.removeEventListener('refresh', X), S.kill()
			}),
			(t.lockAxis = t.lockAxis !== !1),
			(o = new xt(t)),
			(o.iOS = fr),
			fr && !f() && f(1),
			fr && D.ticker.add(Ve),
			(B = o._dc),
			(E = D.to(o, {
				ease: 'power4',
				paused: !0,
				scrollX: r ? '+=0.1' : '+=0',
				scrollY: '+=0.1',
				modifiers: {
					scrollY: Sl(f, f(), function () {
						return E.pause()
					}),
				},
				onUpdate: ir,
				onComplete: B.vars.onComplete,
			})),
			o
		)
	}
W.sort = function (a) {
	return V.sort(
		a ||
			function (t, e) {
				return (t.vars.refreshPriority || 0) * -1e6 + t.start - (e.start + (e.vars.refreshPriority || 0) * -1e6)
			}
	)
}
W.observe = function (a) {
	return new xt(a)
}
W.normalizeScroll = function (a) {
	if (typeof a > 'u') return he
	if (a === !0 && he) return he.enable()
	if (a === !1) return he && he.kill()
	var t = a instanceof xt ? a : vc(a)
	return he && he.target === t.target && he.kill(), qr(t.target) && (he = t), t
}
W.core = {
	_getVelocityProp: Bs,
	_inputObserver: Pl,
	_scrollers: U,
	_proxies: Ge,
	bridge: {
		ss: function () {
			Oe || Gr('scrollStart'), (Oe = Qt())
		},
		ref: function () {
			return It
		},
	},
}
gl() && D.registerPlugin(W)
/*!
 * ScrollToPlugin 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */ var te,
	kl,
	nr,
	qe,
	wr,
	Cl,
	Ol,
	wn,
	Ml = function () {
		return typeof window < 'u'
	},
	El = function () {
		return te || (Ml() && (te = window.gsap) && te.registerPlugin && te)
	},
	Dl = function (t) {
		return typeof t == 'string'
	},
	Qo = function (t) {
		return typeof t == 'function'
	},
	sn = function (t, e) {
		var r = e === 'x' ? 'Width' : 'Height',
			i = 'scroll' + r,
			n = 'client' + r
		return t === nr || t === qe || t === wr ? Math.max(qe[i], wr[i]) - (nr['inner' + r] || qe[n] || wr[n]) : t[i] - t['offset' + r]
	},
	on = function (t, e) {
		var r = 'scroll' + (e === 'x' ? 'Left' : 'Top')
		return (
			t === nr && (t.pageXOffset != null ? (r = 'page' + e.toUpperCase() + 'Offset') : (t = qe[r] != null ? qe : wr)),
			function () {
				return t[r]
			}
		)
	},
	xc = function (t, e, r, i) {
		if ((Qo(t) && (t = t(e, r, i)), typeof t != 'object')) return Dl(t) && t !== 'max' && t.charAt(1) !== '=' ? {x: t, y: t} : {y: t}
		if (t.nodeType) return {y: t, x: t}
		var n = {},
			s
		for (s in t) n[s] = s !== 'onAutoKill' && Qo(t[s]) ? t[s](e, r, i) : t[s]
		return n
	},
	Al = function (t, e) {
		if (((t = Cl(t)[0]), !t || !t.getBoundingClientRect)) return console.warn("scrollTo target doesn't exist. Using 0") || {x: 0, y: 0}
		var r = t.getBoundingClientRect(),
			i = !e || e === nr || e === wr,
			n = i ? {top: qe.clientTop - (nr.pageYOffset || qe.scrollTop || wr.scrollTop || 0), left: qe.clientLeft - (nr.pageXOffset || qe.scrollLeft || wr.scrollLeft || 0)} : e.getBoundingClientRect(),
			s = {x: r.left - n.left, y: r.top - n.top}
		return !i && e && ((s.x += on(e, 'x')()), (s.y += on(e, 'y')())), s
	},
	jo = function (t, e, r, i, n) {
		return !isNaN(t) && typeof t != 'object' ? parseFloat(t) - n : Dl(t) && t.charAt(1) === '=' ? parseFloat(t.substr(2)) * (t.charAt(0) === '-' ? -1 : 1) + i - n : t === 'max' ? sn(e, r) - n : Math.min(sn(e, r), Al(t, e)[r] - n)
	},
	Jo = function () {
		;(te = El()), Ml() && te && typeof document < 'u' && document.body && ((nr = window), (wr = document.body), (qe = document.documentElement), (Cl = te.utils.toArray), te.config({autoKillThreshold: 7}), (Ol = te.config()), (kl = 1))
	},
	ln = {
		version: '3.11.5',
		name: 'scrollTo',
		rawVars: 1,
		register: function (t) {
			;(te = t), Jo()
		},
		init: function (t, e, r, i, n) {
			kl || Jo()
			var s = this,
				o = te.getProperty(t, 'scrollSnapType')
			;(s.isWin = t === nr), (s.target = t), (s.tween = r), (e = xc(e, i, t, n)), (s.vars = e), (s.autoKill = !!e.autoKill), (s.getX = on(t, 'x')), (s.getY = on(t, 'y')), (s.x = s.xPrev = s.getX()), (s.y = s.yPrev = s.getY()), wn || (wn = te.core.globals().ScrollTrigger), te.getProperty(t, 'scrollBehavior') === 'smooth' && te.set(t, {scrollBehavior: 'auto'}), o && o !== 'none' && ((s.snap = 1), (s.snapInline = t.style.scrollSnapType), (t.style.scrollSnapType = 'none')), e.x != null ? (s.add(s, 'x', s.x, jo(e.x, t, 'x', s.x, e.offsetX || 0), i, n), s._props.push('scrollTo_x')) : (s.skipX = 1), e.y != null ? (s.add(s, 'y', s.y, jo(e.y, t, 'y', s.y, e.offsetY || 0), i, n), s._props.push('scrollTo_y')) : (s.skipY = 1)
		},
		render: function (t, e) {
			for (var r = e._pt, i = e.target, n = e.tween, s = e.autoKill, o = e.xPrev, l = e.yPrev, u = e.isWin, c = e.snap, _ = e.snapInline, h, f, p, d, m; r; ) r.r(t, r.d), (r = r._next)
			;(h = u || !e.skipX ? e.getX() : o), (f = u || !e.skipY ? e.getY() : l), (p = f - l), (d = h - o), (m = Ol.autoKillThreshold), e.x < 0 && (e.x = 0), e.y < 0 && (e.y = 0), s && (!e.skipX && (d > m || d < -m) && h < sn(i, 'x') && (e.skipX = 1), !e.skipY && (p > m || p < -m) && f < sn(i, 'y') && (e.skipY = 1), e.skipX && e.skipY && (n.kill(), e.vars.onAutoKill && e.vars.onAutoKill.apply(n, e.vars.onAutoKillParams || []))), u ? nr.scrollTo(e.skipX ? h : e.x, e.skipY ? f : e.y) : (e.skipY || (i.scrollTop = e.y), e.skipX || (i.scrollLeft = e.x)), c && (t === 1 || t === 0) && ((f = i.scrollTop), (h = i.scrollLeft), _ ? (i.style.scrollSnapType = _) : i.style.removeProperty('scroll-snap-type'), (i.scrollTop = f + 1), (i.scrollLeft = h + 1), (i.scrollTop = f), (i.scrollLeft = h)), (e.xPrev = e.x), (e.yPrev = e.y), wn && wn.update()
		},
		kill: function (t) {
			var e = t === 'scrollTo'
			;(e || t === 'scrollTo_x') && (this.skipX = 1), (e || t === 'scrollTo_y') && (this.skipY = 1)
		},
	}
ln.max = sn
ln.getOffset = Al
ln.buildGetter = on
El() && te.registerPlugin(ln)
function Rl() {
	const a = new Vl({duration: 1.2, easing: e => Math.min(1, 1.001 - Math.pow(2, -10 * e)), direction: 'vertical', gestureDirection: 'vertical', smooth: !0, mouseMultiplier: 1, smoothTouch: !1, touchMultiplier: 2, infinite: !1})
	function t(e) {
		a.raf(e), requestAnimationFrame(t)
	}
	requestAnimationFrame(t)
}
Q.registerPlugin(W, ln)
const wc = Q.timeline(),
	Tc = Q.timeline({defaults: {durations: 0.5}, repeat: -1, repeatDelay: 1}),
	bc = Q.timeline({defaults: {durations: 0.5}, repeat: -1, repeatDelay: 1}),
	Sc = Q.timeline({defaults: {durations: 0.5}, repeat: -1, repeatDelay: 1})
wc.fromTo('.hero__title', {opacity: 0, x: 30}, {opacity: 1, duration: 1, x: 0}, 0.5).fromTo('.hero__subtitle', {opacity: 0, x: -30}, {opacity: 1, duration: 1, x: 0}, 1).fromTo('.hero__link', {opacity: 0, y: 30}, {opacity: 1, duration: 1, y: 0}, 1.5).fromTo('.header__logo', {y: -20, opacity: 0}, {y: 0, opacity: 1, duration: 1}, 0.5).fromTo('.header__navigation a', {y: -20, opacity: 0}, {y: 0, duration: 0.2, stagger: 0.15, opacity: 1}, 0.5).fromTo('.hero__background-video', {opacity: 0}, {opacity: 1, duration: 1}, 0.5)
const po = window.pageYOffset || document.documentElement.scrollTop,
	Pc = document.querySelector('.about__title'),
	kc = document.querySelector('.portfolio__main-title'),
	Cc = document.querySelector('.contacts__title')
function Oc() {
	const t = Pc.getBoundingClientRect().top + po,
		e = document.querySelector('.hero__link'),
		r = document.querySelectorAll('.navigation__link')[0]
	e.addEventListener('click', function (i) {
		i.preventDefault(), Q.to(window, {duration: 1.2, scrollTo: t, ease: 'expo.out'})
	}),
		r.addEventListener('click', function (i) {
			i.preventDefault(), Q.to(window, {duration: 1.2, scrollTo: t, ease: 'expo.out'})
		})
}
function Mc() {
	const t = kc.getBoundingClientRect().top + po
	document.querySelectorAll('.navigation__link')[1].addEventListener('click', function (r) {
		r.preventDefault(), Q.to(window, {duration: 1.2, scrollTo: t, ease: 'expo.out'})
	})
}
function Ec() {
	const t = Cc.getBoundingClientRect().top + po
	document.querySelectorAll('.navigation__link')[2].addEventListener('click', function (r) {
		r.preventDefault(), Q.to(window, {duration: 1.2, scrollTo: t, ease: 'expo.out'})
	})
}
Oc()
Mc()
Ec()
let Un = Q.utils.toArray('.about__box'),
	Ll = Q.utils.toArray('.portfolio__card'),
	Dc = Q.utils.toArray('.contacts__item'),
	Ac = Q.utils.toArray('.footer__img-link')
Sc.to('.about__skill-box svg', {stagger: {each: 0.1, from: 'edges'}, scale: 1})
	.to('.about__skill-box svg', {stagger: {each: 0.1, from: 'edges'}, scale: 1.1})
	.to('.about__skill-box svg', {stagger: {each: 0.1, from: 'edges'}, scale: 1, ease: 'power1.out'})
Ac.forEach(a => {
	bc.to(a, {rotation: -20}).to(a, {rotation: 20}).to(a, {rotation: 0, ease: 'power1.out'})
})
let Rc = Q.utils.toArray('.contacts__img')
Rc.forEach(a => {
	Tc.to(a, {scale: 1.2}).to(a, {rotation: -20}).to(a, {rotation: 20}).to(a, {scale: 1, rotation: 0, ease: 'power1.out'})
})
W.isTouch !== 1 &&
	(Ll.forEach(a => {
		Q.fromTo(a, {opacity: 0, scale: 0}, {scale: 1, opacity: 1, scrollTrigger: {trigger: '.about', start: 'bottom 94%', end: 'bottom 38%', scrub: !0}})
	}),
	Q.fromTo('.portfolio__box', {opacity: 0, y: 100}, {y: 0, opacity: 1, scrollTrigger: {trigger: '.portfolio', start: 'top 88%', end: 'top 40%', scrub: !0}}),
	Q.fromTo(Un[1], {opacity: 0, x: 100}, {opacity: 1, x: 0, scrollTrigger: {trigger: '.about', start: 'top 90%', end: 'top 45%', scrub: !0}}),
	Q.fromTo(Un[0], {opacity: 0, y: 100}, {opacity: 1, y: 0, scrollTrigger: {trigger: '.about', start: 'top 90%', end: 'top 45%', scrub: !0}}),
	Q.fromTo('.about__title', {opacity: 0, y: 100}, {opacity: 1, y: 0, scrollTrigger: {trigger: '.header', start: '140% 10%', end: '150% 0%', scrub: !0}}),
	Q.fromTo('.portfolio__main-title', {opacity: 0, y: 100}, {opacity: 1, y: 0, scrollTrigger: {trigger: '.about', start: '140% 94%', end: '150% 84%', scrub: !0}}))
W.isTouch == 1 &&
	(Ll.forEach(a => {
		Q.fromTo(a, {opacity: 0, scale: 0}, {scale: 1, opacity: 1, scrollTrigger: {trigger: '.about', start: 'bottom 94%', end: 'bottom 38%', scrub: !0}})
	}),
	Q.fromTo('.portfolio__box', {opacity: 0, y: 100}, {y: 0, opacity: 1, scrollTrigger: {trigger: '.about', start: '120% 80%', end: '125% 78%', scrub: !0}}),
	Q.fromTo(Un[1], {opacity: 0, x: 100}, {opacity: 1, x: 0, scrollTrigger: {trigger: '.about', start: '42% 90%', end: '42% 55%', scrub: !0}}),
	Q.fromTo(Un[0], {opacity: 0, y: 100}, {opacity: 1, y: 0, scrollTrigger: {trigger: '.about', start: 'top 90%', end: 'top 45%', scrub: !0}}),
	Q.fromTo('.about__title', {opacity: 0, y: 100}, {opacity: 1, y: 0, scrollTrigger: {trigger: '.header', start: '140% 10%', end: '150% 0%', scrub: !0}}),
	Q.fromTo('.portfolio__main-title', {opacity: 0, y: 100}, {opacity: 1, y: 0, scrollTrigger: {trigger: '.about', start: '124% 94%', end: '130% 84%', scrub: !0}}))
function zl() {
	Q.fromTo('.contacts__title', {opacity: 0, y: 100}, {y: 0, opacity: 1, scrollTrigger: {trigger: '.contacts', start: 'top 92%', end: 'top 80%', scrub: !0}}),
		Q.fromTo('.contacts__subtitle', {opacity: 0, y: 100}, {y: 0, opacity: 1, scrollTrigger: {trigger: '.contacts', start: 'top 90%', end: 'top 76%', scrub: !0}}),
		Dc.forEach(a => {
			Q.fromTo(a, {opacity: 0, scale: 0}, {scale: 1, opacity: 1, scrollTrigger: {trigger: '.contacts', start: 'top 88%', end: 'top 75%', scrub: !0}})
		}),
		Q.fromTo('.footer__socials', {opacity: 0, x: -100}, {x: 0, opacity: 1, scrollTrigger: {trigger: '.footer', start: 'top 96%', end: '10% 92%', scrub: !0}}),
		Q.fromTo('.footer__copy', {opacity: 0, x: 100}, {x: 0, opacity: 1, scrollTrigger: {trigger: '.footer', start: 'top 96%', end: '10% 92%', scrub: !0}}),
		W.refresh()
}
const Lc = document.querySelectorAll('.portfolio__btn'),
	ta = document.querySelectorAll('.portfolio__card')
Lc.forEach(a => {
	a.addEventListener('click', () => {
		const t = a.getAttribute('data-filter')
		t === 'all'
			? ta.forEach(e => {
					e.style.display = 'block'
			  })
			: ta.forEach(e => {
					e.classList.contains(t) ? (e.style.display = 'block') : (e.style.display = 'none')
			  })
	})
})
const zc = document.querySelectorAll('.portfolio__btn')
let ms = null,
	$s = 0,
	Fc = document.querySelector('.portfolio__btn')
$s == 0 && (zl(), Rl())
zc.forEach(a => {
	a.addEventListener('click', () => {
		++$s, $s !== 0 && (zl(), Rl()), ms && ms.classList.remove('active'), Fc.classList.remove('active'), a.classList.add('active'), (ms = a)
	})
})
document.querySelector('.footer__copy').textContent = `© ${new Date().getFullYear()} Все права защищены`
function Bc(a) {
	if (Array.isArray(a)) {
		for (var t = 0, e = Array(a.length); t < a.length; t++) e[t] = a[t]
		return e
	} else return Array.from(a)
}
var go = !1
if (typeof window < 'u') {
	var ea = {
		get passive() {
			go = !0
		},
	}
	window.addEventListener('testPassive', null, ea), window.removeEventListener('testPassive', null, ea)
}
var qn = typeof window < 'u' && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)),
	$r = [],
	Hn = !1,
	Fl = -1,
	Ki = void 0,
	Lr = void 0,
	Zi = void 0,
	Bl = function (t) {
		return $r.some(function (e) {
			return !!(e.options.allowTouchMove && e.options.allowTouchMove(t))
		})
	},
	Gn = function (t) {
		var e = t || window.event
		return Bl(e.target) || e.touches.length > 1 ? !0 : (e.preventDefault && e.preventDefault(), !1)
	},
	Ic = function (t) {
		if (Zi === void 0) {
			var e = !!t && t.reserveScrollBarGap === !0,
				r = window.innerWidth - document.documentElement.clientWidth
			if (e && r > 0) {
				var i = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'), 10)
				;(Zi = document.body.style.paddingRight), (document.body.style.paddingRight = i + r + 'px')
			}
		}
		Ki === void 0 && ((Ki = document.body.style.overflow), (document.body.style.overflow = 'hidden'))
	},
	Yc = function () {
		Zi !== void 0 && ((document.body.style.paddingRight = Zi), (Zi = void 0)), Ki !== void 0 && ((document.body.style.overflow = Ki), (Ki = void 0))
	},
	Xc = function () {
		return window.requestAnimationFrame(function () {
			if (Lr === void 0) {
				Lr = {position: document.body.style.position, top: document.body.style.top, left: document.body.style.left}
				var t = window,
					e = t.scrollY,
					r = t.scrollX,
					i = t.innerHeight
				;(document.body.style.position = 'fixed'),
					(document.body.style.top = -e),
					(document.body.style.left = -r),
					setTimeout(function () {
						return window.requestAnimationFrame(function () {
							var n = i - window.innerHeight
							n && e >= i && (document.body.style.top = -(e + n))
						})
					}, 300)
			}
		})
	},
	Nc = function () {
		if (Lr !== void 0) {
			var t = -parseInt(document.body.style.top, 10),
				e = -parseInt(document.body.style.left, 10)
			;(document.body.style.position = Lr.position), (document.body.style.top = Lr.top), (document.body.style.left = Lr.left), window.scrollTo(e, t), (Lr = void 0)
		}
	},
	Wc = function (t) {
		return t ? t.scrollHeight - t.scrollTop <= t.clientHeight : !1
	},
	Vc = function (t, e) {
		var r = t.targetTouches[0].clientY - Fl
		return Bl(t.target) ? !1 : (e && e.scrollTop === 0 && r > 0) || (Wc(e) && r < 0) ? Gn(t) : (t.stopPropagation(), !0)
	},
	$c = function (t, e) {
		if (!t) {
			console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.')
			return
		}
		if (
			!$r.some(function (i) {
				return i.targetElement === t
			})
		) {
			var r = {targetElement: t, options: e || {}}
			;($r = [].concat(Bc($r), [r])),
				qn ? Xc() : Ic(e),
				qn &&
					((t.ontouchstart = function (i) {
						i.targetTouches.length === 1 && (Fl = i.targetTouches[0].clientY)
					}),
					(t.ontouchmove = function (i) {
						i.targetTouches.length === 1 && Vc(i, t)
					}),
					Hn || (document.addEventListener('touchmove', Gn, go ? {passive: !1} : void 0), (Hn = !0)))
		}
	},
	Il = function (t) {
		if (!t) {
			console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.')
			return
		}
		;($r = $r.filter(function (e) {
			return e.targetElement !== t
		})),
			qn && ((t.ontouchstart = null), (t.ontouchmove = null), Hn && $r.length === 0 && (document.removeEventListener('touchmove', Gn, go ? {passive: !1} : void 0), (Hn = !1))),
			qn ? Nc() : Yc()
	}
const zr = document.querySelector('[data-menu]'),
	Kn = document.querySelector('[data-menu-open]'),
	Uc = document.querySelector('[data-menu-close]'),
	qc = document.querySelectorAll('.navigation__link')
qc.forEach(a => {
	a.addEventListener('click', () => {
		;(zr.dataset.menu = 'close'),
			Il(zr),
			(Kn.innerHTML = `
		<svg class="header__img-icon">
			<use xlink:href="./assets/sprite-d8b9b76e.svg#menu" />
		</svg>`)
	})
})
function Yl() {
	zr.getAttribute('data-menu') === 'open'
		? ((zr.dataset.menu = 'close'),
		  Il(zr),
		  (Kn.innerHTML = `
		<svg class="header__img-icon">
			<use xlink:href="./assets/sprite-d8b9b76e.svg#menu" />
		</svg>`))
		: ((zr.dataset.menu = 'open'),
		  $c(zr),
		  (Kn.innerHTML = `
		<svg class="header__img-icon">
			<use xlink:href="./assets/sprite-d8b9b76e.svg#close" />
		</svg>`))
}
Kn.addEventListener('click', Yl)
Uc.addEventListener('click', Yl)
