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
const Yl = document.querySelectorAll('.portfolio__btn'),
	mo = document.querySelectorAll('.portfolio__card')
Yl.forEach(a => {
	a.addEventListener('click', () => {
		const t = a.getAttribute('data-filter')
		t === 'all'
			? mo.forEach(e => {
					e.style.display = 'block'
			  })
			: mo.forEach(e => {
					e.classList.contains(t) ? (e.style.display = 'block') : (e.style.display = 'none')
			  })
	})
})
const Xl = document.querySelectorAll('.portfolio__btn')
let es = null,
	Nl = document.querySelector('.portfolio__btn')
Xl.forEach(a => {
	a.addEventListener('click', () => {
		es && es.classList.remove('active'), Nl.classList.remove('active'), a.classList.add('active'), (es = a)
	})
})
document.querySelector('.footer__copy').textContent = `© ${new Date().getFullYear()} Все права защищены`
function Wl(a) {
	if (Array.isArray(a)) {
		for (var t = 0, e = Array(a.length); t < a.length; t++) e[t] = a[t]
		return e
	} else return Array.from(a)
}
var $s = !1
if (typeof window < 'u') {
	var yo = {
		get passive() {
			$s = !0
		},
	}
	window.addEventListener('testPassive', null, yo), window.removeEventListener('testPassive', null, yo)
}
var An = typeof window < 'u' && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)),
	Ir = [],
	Rn = !1,
	ea = -1,
	Ii = void 0,
	Lr = void 0,
	Yi = void 0,
	ra = function (t) {
		return Ir.some(function (e) {
			return !!(e.options.allowTouchMove && e.options.allowTouchMove(t))
		})
	},
	Ln = function (t) {
		var e = t || window.event
		return ra(e.target) || e.touches.length > 1 ? !0 : (e.preventDefault && e.preventDefault(), !1)
	},
	Vl = function (t) {
		if (Yi === void 0) {
			var e = !!t && t.reserveScrollBarGap === !0,
				r = window.innerWidth - document.documentElement.clientWidth
			if (e && r > 0) {
				var i = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'), 10)
				;(Yi = document.body.style.paddingRight), (document.body.style.paddingRight = i + r + 'px')
			}
		}
		Ii === void 0 && ((Ii = document.body.style.overflow), (document.body.style.overflow = 'hidden'))
	},
	$l = function () {
		Yi !== void 0 && ((document.body.style.paddingRight = Yi), (Yi = void 0)), Ii !== void 0 && ((document.body.style.overflow = Ii), (Ii = void 0))
	},
	Ul = function () {
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
	ql = function () {
		if (Lr !== void 0) {
			var t = -parseInt(document.body.style.top, 10),
				e = -parseInt(document.body.style.left, 10)
			;(document.body.style.position = Lr.position), (document.body.style.top = Lr.top), (document.body.style.left = Lr.left), window.scrollTo(e, t), (Lr = void 0)
		}
	},
	Hl = function (t) {
		return t ? t.scrollHeight - t.scrollTop <= t.clientHeight : !1
	},
	Gl = function (t, e) {
		var r = t.targetTouches[0].clientY - ea
		return ra(t.target) ? !1 : (e && e.scrollTop === 0 && r > 0) || (Hl(e) && r < 0) ? Ln(t) : (t.stopPropagation(), !0)
	},
	Kl = function (t, e) {
		if (!t) {
			console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.')
			return
		}
		if (
			!Ir.some(function (i) {
				return i.targetElement === t
			})
		) {
			var r = {targetElement: t, options: e || {}}
			;(Ir = [].concat(Wl(Ir), [r])),
				An ? Ul() : Vl(e),
				An &&
					((t.ontouchstart = function (i) {
						i.targetTouches.length === 1 && (ea = i.targetTouches[0].clientY)
					}),
					(t.ontouchmove = function (i) {
						i.targetTouches.length === 1 && Gl(i, t)
					}),
					Rn || (document.addEventListener('touchmove', Ln, $s ? {passive: !1} : void 0), (Rn = !0)))
		}
	},
	ia = function (t) {
		if (!t) {
			console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.')
			return
		}
		;(Ir = Ir.filter(function (e) {
			return e.targetElement !== t
		})),
			An && ((t.ontouchstart = null), (t.ontouchmove = null), Rn && Ir.length === 0 && (document.removeEventListener('touchmove', Ln, $s ? {passive: !1} : void 0), (Rn = !1))),
			An ? ql() : $l()
	}
const zr = document.querySelector('[data-menu]'),
	zn = document.querySelector('[data-menu-open]'),
	Zl = document.querySelector('[data-menu-close]'),
	Ql = document.querySelectorAll('.navigation__link')
Ql.forEach(a => {
	a.addEventListener('click', () => {
		;(zr.dataset.menu = 'close'),
			ia(zr),
			(zn.innerHTML = `
		<svg class="header__img-icon">
			<use xlink:href="./assets/sprite-d8b9b76e.svg#menu" />
		</svg>`)
	})
})
function na() {
	zr.getAttribute('data-menu') === 'open'
		? ((zr.dataset.menu = 'close'),
		  ia(zr),
		  (zn.innerHTML = `
		<svg class="header__img-icon">
			<use xlink:href="./assets/sprite-d8b9b76e.svg#menu" />
		</svg>`))
		: ((zr.dataset.menu = 'open'),
		  Kl(zr),
		  (zn.innerHTML = `
		<svg class="header__img-icon">
			<use xlink:href="./assets/sprite-d8b9b76e.svg#close" />
		</svg>`))
}
zn.addEventListener('click', na)
Zl.addEventListener('click', na)
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
function Fn(a, t, e) {
	return Math.max(a, Math.min(t, e))
}
class jl {
	advance(t) {
		var e
		if (!this.isRunning) return
		let r = !1
		if (this.lerp) (this.value = (1 - (i = this.lerp)) * this.value + i * this.to), Math.round(this.value) === this.to && ((this.value = this.to), (r = !0))
		else {
			this.currentTime += t
			const n = Fn(0, this.currentTime / this.duration, 1)
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
function vo(a, t) {
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
class Jl {
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
			this.wrapper === window ? (window.addEventListener('resize', this.onWindowResize, !1), this.onWindowResize()) : ((this.wrapperResizeObserver = new ResizeObserver(vo(this.onWrapperResize, 100))), this.wrapperResizeObserver.observe(this.wrapper), this.onWrapperResize()),
			(this.contentResizeObserver = new ResizeObserver(vo(this.onContentResize, 100))),
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
let sa = () => ({
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
class tu {
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
				this.normalizeWheel && ((s = Fn(-100, s, 100)), (o = Fn(-100, o, 100))), (s *= this.wheelMultiplier), (o *= this.wheelMultiplier), this.emitter.emit('scroll', {type: 'wheel', deltaX: s, deltaY: o, event: n})
			}),
			(this.element = t),
			(this.wheelMultiplier = e),
			(this.touchMultiplier = r),
			(this.normalizeWheel = i),
			(this.touchStart = {x: null, y: null}),
			(this.emitter = sa()),
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
class eu {
	constructor({direction: t, gestureDirection: e, mouseMultiplier: r, smooth: i, wrapper: n = window, content: s = document.documentElement, wheelEventsTarget: o = n, smoothWheel: l = i == null || i, smoothTouch: u = !1, syncTouch: c = !1, syncTouchLerp: p = 0.1, touchInertiaMultiplier: h = 35, duration: f, easing: _ = k => Math.min(1, 1.001 - Math.pow(2, -10 * k)), lerp: d = f ? null : 0.1, infinite: m = !1, orientation: y = t ?? 'vertical', gestureOrientation: b = e ?? 'vertical', touchMultiplier: w = 1, wheelMultiplier: v = r ?? 1, normalizeWheel: S = !1} = {}) {
		;(this.onVirtualScroll = ({type: k, inertia: T, deltaX: C, deltaY: P, event: M}) => {
			if (M.ctrlKey) return
			const A = k === 'touch',
				E = k === 'wheel'
			if ((this.options.gestureOrientation === 'vertical' && P === 0) || (this.options.gestureOrientation === 'horizontal' && C === 0) || (A && this.options.gestureOrientation === 'vertical' && this.scroll === 0 && !this.options.infinite && P <= 0) || M.composedPath().find(X => (X == null || X.hasAttribute == null ? void 0 : X.hasAttribute('data-lenis-prevent')))) return
			if (this.isStopped || this.isLocked) return void M.preventDefault()
			if (((this.isSmooth = ((this.options.smoothTouch || this.options.syncTouch) && A) || (this.options.smoothWheel && E)), !this.isSmooth)) return (this.isScrolling = !1), void this.animate.stop()
			M.preventDefault()
			let H = P
			this.options.gestureOrientation === 'both' ? (H = Math.abs(P) > Math.abs(C) ? P : C) : this.options.gestureOrientation === 'horizontal' && (H = C)
			const Y = A && this.options.syncTouch,
				B = A && T && Math.abs(H) > 1
			B && (H = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + H, ys({programmatic: !1}, Y && {lerp: B ? this.syncTouchLerp : 0.4}))
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
			(this.options = {wrapper: n, content: s, wheelEventsTarget: o, smoothWheel: l, smoothTouch: u, syncTouch: c, syncTouchLerp: p, touchInertiaMultiplier: h, duration: f, easing: _, lerp: d, infinite: m, gestureOrientation: b, orientation: y, touchMultiplier: w, wheelMultiplier: v, normalizeWheel: S}),
			(this.dimensions = new Jl(n, s)),
			this.rootElement.classList.add('lenis'),
			(this.velocity = 0),
			(this.isStopped = !1),
			(this.isSmooth = l || u),
			(this.isScrolling = !1),
			(this.targetScroll = this.animatedScroll = this.actualScroll),
			(this.animate = new jl()),
			(this.emitter = sa()),
			this.options.wrapper.addEventListener('scroll', this.onScroll, {passive: !1}),
			(this.virtualScroll = new tu(o, {touchMultiplier: w, wheelMultiplier: v, normalizeWheel: S})),
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
				var p
				let h
				if ((typeof t == 'string' ? (h = document.querySelector(t)) : (p = t) != null && p.nodeType && (h = t), h)) {
					if (this.options.wrapper !== window) {
						const _ = this.options.wrapper.getBoundingClientRect()
						e -= this.isHorizontal ? _.left : _.top
					}
					const f = h.getBoundingClientRect()
					t = (this.isHorizontal ? f.left : f.top) + this.animatedScroll
				}
			}
			if (typeof t == 'number') {
				if (((t += e), (t = Math.round(t)), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : (t = Fn(0, t, this.limit)), r)) return (this.animatedScroll = this.targetScroll = t), this.setScroll(this.scroll), this.reset(), this.emit(), void (l == null || l())
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
function oa(a, t) {
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
	pi = {duration: 0.5, overwrite: !1, delay: 0},
	Us,
	Xt,
	vt,
	Pe = 1e8,
	et = 1 / Pe,
	vs = Math.PI * 2,
	ru = vs / 4,
	iu = 0,
	aa = Math.sqrt,
	nu = Math.cos,
	su = Math.sin,
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
	la = (typeof ArrayBuffer == 'function' && ArrayBuffer.isView) || function () {},
	Nt = Array.isArray,
	xs = /(?:-?\.?\d|\.)+/gi,
	ua = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
	si = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
	rs = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
	ca = /[+-]=-?[.\d]+/,
	fa = /[^,'"\[\]\s]+/gi,
	ou = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
	lt,
	be,
	Ts,
	Gs,
	ve = {},
	Bn = {},
	ha,
	da = function (t) {
		return (Bn = Ur(t, ve)) && ae
	},
	Ks = function (t, e) {
		return console.warn('Invalid property', t, 'set to', e, 'Missing plugin? gsap.registerPlugin()')
	},
	In = function (t, e) {
		return !e && console.warn(t)
	},
	pa = function (t, e) {
		return (t && (ve[t] = e) && Bn && (Bn[t] = e)) || ve
	},
	Qi = function () {
		return 0
	},
	au = {suppressEvents: !0, isStart: !0, kill: !1},
	wn = {suppressEvents: !0, kill: !1},
	lu = {suppressEvents: !0},
	Zs = {},
	yr = [],
	ws = {},
	_a,
	pe = {},
	is = {},
	xo = 30,
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
		for (i = t.length; i--; ) (t[i] && (t[i]._gsap || (t[i]._gsap = new Ya(t[i], r)))) || t.splice(i, 1)
		return t
	},
	Yr = function (t) {
		return t._gsap || js(ke(t))[0]._gsap
	},
	ga = function (t, e, r) {
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
	uu = function (t, e) {
		for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r; );
		return i < r
	},
	Yn = function () {
		var t = yr.length,
			e = yr.slice(0),
			r,
			i
		for (ws = {}, yr.length = 0, r = 0; r < t; r++) (i = e[r]), i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0)
	},
	ma = function (t, e, r, i) {
		yr.length && !Xt && Yn(), t.render(e, r, i || (Xt && e < 0 && (t._initted || t._startAt))), yr.length && !Xt && Yn()
	},
	ya = function (t) {
		var e = parseFloat(t)
		return (e || e === 0) && (t + '').match(fa).length < 2 ? e : Et(t) ? t.trim() : t
	},
	va = function (t) {
		return t
	},
	Me = function (t, e) {
		for (var r in e) r in t || (t[r] = e[r])
		return t
	},
	cu = function (t) {
		return function (e, r) {
			for (var i in r) i in e || (i === 'duration' && t) || i === 'ease' || (e[i] = r[i])
		}
	},
	Ur = function (t, e) {
		for (var r in e) t[r] = e[r]
		return t
	},
	To = function a(t, e) {
		for (var r in e) r !== '__proto__' && r !== 'constructor' && r !== 'prototype' && (t[r] = Ke(e[r]) ? a(t[r] || (t[r] = {}), e[r]) : e[r])
		return t
	},
	Xn = function (t, e) {
		var r = {},
			i
		for (i in t) i in e || (r[i] = t[i])
		return r
	},
	Xi = function (t) {
		var e = t.parent || lt,
			r = t.keyframes ? cu(Nt(t.keyframes)) : Me
		if (ne(t.inherit)) for (; e; ) r(t, e.vars.defaults), (e = e.parent || e._dp)
		return t
	},
	fu = function (t, e) {
		for (var r = t.length, i = r === e.length; i && r-- && t[r] === e[r]; );
		return r < 0
	},
	xa = function (t, e, r, i, n) {
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
	wr = function (t, e) {
		t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t), (t._act = 0)
	},
	Xr = function (t, e) {
		if (t && (!e || e._end > t._dur || e._start < 0)) for (var r = t; r; ) (r._dirty = 1), (r = r.parent)
		return t
	},
	hu = function (t) {
		for (var e = t.parent; e && e.parent; ) (e._dirty = 1), e.totalDuration(), (e = e.parent)
		return t
	},
	bs = function (t, e, r, i) {
		return t._startAt && (Xt ? t._startAt.revert(wn) : (t.vars.immediateRender && !t.vars.autoRevert) || t._startAt.render(e, !0, i))
	},
	du = function a(t) {
		return !t || (t._ts && a(t.parent))
	},
	wo = function (t) {
		return t._repeat ? _i(t._tTime, (t = t.duration() + t._rDelay)) * t : 0
	},
	_i = function (t, e) {
		var r = Math.floor((t /= e))
		return t && r === t ? r - 1 : r
	},
	Nn = function (t, e) {
		return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
	},
	Qn = function (t) {
		return (t._end = Rt(t._start + (t._tDur / Math.abs(t._ts || t._rts || et) || 0)))
	},
	jn = function (t, e) {
		var r = t._dp
		return r && r.smoothChildTiming && t._ts && ((t._start = Rt(r._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts))), Qn(t), r._dirty || Xr(r, t)), t
	},
	Ta = function (t, e) {
		var r
		if (((e._time || (e._initted && !e._dur)) && ((r = Nn(t.rawTime(), e)), (!e._dur || an(0, e.totalDuration(), r) - e._tTime > et) && e.render(r, !0)), Xr(t, e)._dp && t._initted && t._time >= t._dur && t._ts)) {
			if (t._dur < t.duration()) for (r = t; r._dp; ) r.rawTime() >= 0 && r.totalTime(r._tTime), (r = r._dp)
			t._zTime = -et
		}
	},
	$e = function (t, e, r, i) {
		return e.parent && wr(e), (e._start = Rt((sr(r) ? r : r || t !== lt ? we(t, r, e) : t._time) + e._delay)), (e._end = Rt(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0))), xa(t, e, '_first', '_last', t._sort ? '_start' : 0), Ss(e) || (t._recent = e), i || Ta(t, e), t._ts < 0 && jn(t, t._tTime), t
	},
	wa = function (t, e) {
		return (ve.ScrollTrigger || Ks('scrollTrigger', e)) && ve.ScrollTrigger.create(e, t)
	},
	ba = function (t, e, r, i, n) {
		if ((to(t, e, n), !t._initted)) return 1
		if (!r && t._pt && !Xt && ((t._dur && t.vars.lazy !== !1) || (!t._dur && t.vars.lazy)) && _a !== ge.frame) return yr.push(t), (t._lazy = [n, i]), 1
	},
	pu = function a(t) {
		var e = t.parent
		return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || a(e))
	},
	Ss = function (t) {
		var e = t.data
		return e === 'isFromStart' || e === 'isStart'
	},
	_u = function (t, e, r, i) {
		var n = t.ratio,
			s = e < 0 || (!e && ((!t._start && pu(t) && !(!t._initted && Ss(t))) || ((t._ts < 0 || t._dp._ts < 0) && !Ss(t)))) ? 0 : 1,
			o = t._rDelay,
			l = 0,
			u,
			c,
			p
		if ((o && t._repeat && ((l = an(0, t._tDur, e)), (c = _i(l, o)), t._yoyo && c & 1 && (s = 1 - s), c !== _i(t._tTime, o) && ((n = 1 - s), t.vars.repeatRefresh && t._initted && t.invalidate())), s !== n || Xt || i || t._zTime === et || (!e && t._zTime))) {
			if (!t._initted && ba(t, e, i, r, l)) return
			for (p = t._zTime, t._zTime = e || (r ? et : 0), r || (r = e && !p), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = l, u = t._pt; u; ) u.r(s, u.d), (u = u._next)
			e < 0 && bs(t, e, r, !0), t._onUpdate && !r && Ce(t, 'onUpdate'), l && t._repeat && !r && t.parent && Ce(t, 'onRepeat'), (e >= t._tDur || e < 0) && t.ratio === s && (s && wr(t, 1), !r && !Xt && (Ce(t, s ? 'onComplete' : 'onReverseComplete', !0), t._prom && t._prom()))
		} else t._zTime || (t._zTime = e)
	},
	gu = function (t, e, r) {
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
		return o && !i && (t._time *= s / t._dur), (t._dur = s), (t._tDur = n ? (n < 0 ? 1e10 : Rt(s * (n + 1) + t._rDelay * n)) : s), o > 0 && !i && jn(t, (t._tTime = t._tDur * o)), t.parent && Qn(t), r || Xr(t.parent, t), t
	},
	bo = function (t) {
		return t instanceof ie ? Xr(t) : gi(t, t._dur)
	},
	mu = {_start: 0, endTime: Qi, totalDuration: Qi},
	we = function a(t, e, r) {
		var i = t.labels,
			n = t._recent || mu,
			s = t.duration() >= Pe ? n.endTime(!1) : t._dur,
			o,
			l,
			u
		return Et(e) && (isNaN(e) || e in i) ? ((l = e.charAt(0)), (u = e.substr(-1) === '%'), (o = e.indexOf('=')), l === '<' || l === '>' ? (o >= 0 && (e = e.replace(/=/, '')), (l === '<' ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (u ? (o < 0 ? n : r).totalDuration() / 100 : 1)) : o < 0 ? (e in i || (i[e] = s), i[e]) : ((l = parseFloat(e.charAt(o - 1) + e.substr(o + 1))), u && r && (l = (l / 100) * (Nt(r) ? r[0] : r).totalDuration()), o > 1 ? a(t, e.substr(0, o - 1), r) + l : s + l)) : e == null ? s : +e
	},
	Ni = function (t, e, r) {
		var i = sr(e[1]),
			n = (i ? 2 : 1) + (t < 2 ? 0 : 1),
			s = e[n],
			o,
			l
		if ((i && (s.duration = e[1]), (s.parent = r), t)) {
			for (o = s, l = r; l && !('immediateRender' in o); ) (o = l.vars.defaults || {}), (l = ne(l.vars.inherit) && l.parent)
			;(s.immediateRender = ne(o.immediateRender)), t < 2 ? (s.runBackwards = 1) : (s.startAt = e[n - 1])
		}
		return new Tt(e[0], s, e[n + 1])
	},
	Pr = function (t, e) {
		return t || t === 0 ? e(t) : e
	},
	an = function (t, e, r) {
		return r < t ? t : r > e ? e : r
	},
	Yt = function (t, e) {
		return !Et(t) || !(e = ou.exec(t)) ? '' : e[1]
	},
	yu = function (t, e, r) {
		return Pr(r, function (i) {
			return an(t, e, i)
		})
	},
	Ps = [].slice,
	Sa = function (t, e) {
		return t && Ke(t) && 'length' in t && ((!e && !t.length) || (t.length - 1 in t && Ke(t[0]))) && !t.nodeType && t !== be
	},
	vu = function (t, e, r) {
		return (
			r === void 0 && (r = []),
			t.forEach(function (i) {
				var n
				return (Et(i) && !e) || Sa(i, 1) ? (n = r).push.apply(n, ke(i)) : r.push(i)
			}) || r
		)
	},
	ke = function (t, e, r) {
		return vt && !e && vt.selector ? vt.selector(t) : Et(t) && !r && (Ts || !mi()) ? Ps.call((e || Gs).querySelectorAll(t), 0) : Nt(t) ? vu(t, r) : Sa(t) ? Ps.call(t, 0) : t ? [t] : []
	},
	ks = function (t) {
		return (
			(t = ke(t)[0] || In('Invalid scope') || {}),
			function (e) {
				var r = t.current || t.nativeElement || t
				return ke(e, r.querySelectorAll ? r : r === t ? In('Invalid scope') || Gs.createElement('div') : t)
			}
		)
	},
	Pa = function (t) {
		return t.sort(function () {
			return 0.5 - Math.random()
		})
	},
	ka = function (t) {
		if (ht(t)) return t
		var e = Ke(t) ? t : {each: t},
			r = Nr(e.ease),
			i = e.from || 0,
			n = parseFloat(e.base) || 0,
			s = {},
			o = i > 0 && i < 1,
			l = isNaN(i) || o,
			u = e.axis,
			c = i,
			p = i
		return (
			Et(i) ? (c = p = {center: 0.5, edges: 0.5, end: 1}[i] || 0) : !o && l && ((c = i[0]), (p = i[1])),
			function (h, f, _) {
				var d = (_ || e).length,
					m = s[d],
					y,
					b,
					w,
					v,
					S,
					k,
					T,
					C,
					P
				if (!m) {
					if (((P = e.grid === 'auto' ? 0 : (e.grid || [1, Pe])[1]), !P)) {
						for (T = -Pe; T < (T = _[P++].getBoundingClientRect().left) && P < d; );
						P--
					}
					for (m = s[d] = [], y = l ? Math.min(P, d) * c - 0.5 : i % P, b = P === Pe ? 0 : l ? (d * p) / P - 0.5 : (i / P) | 0, T = 0, C = Pe, k = 0; k < d; k++) (w = (k % P) - y), (v = b - ((k / P) | 0)), (m[k] = S = u ? Math.abs(u === 'y' ? v : w) : aa(w * w + v * v)), S > T && (T = S), S < C && (C = S)
					i === 'random' && Pa(m), (m.max = T - C), (m.min = C), (m.v = d = (parseFloat(e.amount) || parseFloat(e.each) * (P > d ? d - 1 : u ? (u === 'y' ? d / P : P) : Math.max(P, d / P)) || 0) * (i === 'edges' ? -1 : 1)), (m.b = d < 0 ? n - d : n), (m.u = Yt(e.amount || e.each) || 0), (r = r && d < 0 ? Fa(r) : r)
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
	Ca = function (t, e) {
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
								for (var o = parseFloat(n ? s.x : s), l = parseFloat(n ? s.y : 0), u = Pe, c = 0, p = t.length, h, f; p--; ) n ? ((h = t[p].x - o), (f = t[p].y - l), (h = h * h + f * f)) : (h = Math.abs(t[p] - o)), h < u && ((u = h), (c = p))
								return (c = !i || u <= i ? t[c] : s), n || c === s || sr(s) ? c : c + Yt(s)
						  }
					: Cs(t)
			)
		)
	},
	Oa = function (t, e, r, i) {
		return Pr(Nt(t) ? !e : r === !0 ? !!(r = 0) : !i, function () {
			return Nt(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + '').length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + r * 0.99)) / r) * r * i) / i
		})
	},
	xu = function () {
		for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r]
		return function (i) {
			return e.reduce(function (n, s) {
				return s(n)
			}, i)
		}
	},
	Tu = function (t, e) {
		return function (r) {
			return t(parseFloat(r)) + (e || Yt(r))
		}
	},
	wu = function (t, e, r) {
		return Ea(t, e, 0, 1, r)
	},
	Ma = function (t, e, r) {
		return Pr(r, function (i) {
			return t[~~e(i)]
		})
	},
	bu = function a(t, e, r) {
		var i = e - t
		return Nt(t)
			? Ma(t, a(0, t.length), e)
			: Pr(r, function (n) {
					return ((i + ((n - t) % i)) % i) + t
			  })
	},
	Su = function a(t, e, r) {
		var i = e - t,
			n = i * 2
		return Nt(t)
			? Ma(t, a(0, t.length - 1), e)
			: Pr(r, function (s) {
					return (s = (n + ((s - t) % n)) % n || 0), t + (s > i ? n - s : s)
			  })
	},
	ji = function (t) {
		for (var e = 0, r = '', i, n, s, o; ~(i = t.indexOf('random(', e)); ) (s = t.indexOf(')', i)), (o = t.charAt(i + 7) === '['), (n = t.substr(i + 7, s - i - 7).match(o ? fa : xs)), (r += t.substr(e, i - e) + Oa(o ? n : +n[0], o ? 0 : +n[1], +n[2] || 1e-5)), (e = s + 1)
		return r + t.substr(e, t.length - e)
	},
	Ea = function (t, e, r, i, n) {
		var s = e - t,
			o = i - r
		return Pr(n, function (l) {
			return r + (((l - t) / s) * o || 0)
		})
	},
	Pu = function a(t, e, r, i) {
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
				p,
				h
			if ((r === !0 && (i = 1) && (r = null), s)) (t = {p: t}), (e = {p: e})
			else if (Nt(t) && !Nt(e)) {
				for (c = [], p = t.length, h = p - 2, u = 1; u < p; u++) c.push(a(t[u - 1], t[u]))
				p--,
					(n = function (_) {
						_ *= p
						var d = Math.min(h, ~~_)
						return c[d](_ - d)
					}),
					(r = e)
			} else i || (t = Ur(Nt(t) ? [] : {}, t))
			if (!c) {
				for (l in e) Js.call(o, t, l, 'get', e[l])
				n = function (_) {
					return io(_, o) || (s ? t.p : t)
				}
			}
		}
		return Pr(r, n)
	},
	So = function (t, e, r) {
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
		if (n) return (l = i[e + 'Params']), (u = i.callbackScope || t), r && yr.length && Yn(), o && (vt = o), (c = l ? n.apply(u, l) : n.call(u)), (vt = s), c
	},
	Ai = function (t) {
		return wr(t), t.scrollTrigger && t.scrollTrigger.kill(!!Xt), t.progress() < 1 && Ce(t, 'onInterrupt'), t
	},
	oi,
	Da = [],
	Aa = function (t) {
		if (!Hs()) {
			Da.push(t)
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
			n = {init: Qi, render: io, add: Js, kill: Nu, modifier: Xu, rawVars: 0},
			s = {targetTest: 0, get: 0, getSetter: ro, aliases: {}, register: 0}
		if ((mi(), t !== i)) {
			if (pe[e]) return
			Me(i, Me(Xn(t, n), s)), Ur(i.prototype, Ur(n, Xn(t, s))), (pe[(i.prop = e)] = i), t.targetTest && (bn.push(i), (Zs[e] = 1)), (e = (e === 'css' ? 'CSS' : e.charAt(0).toUpperCase() + e.substr(1)) + 'Plugin')
		}
		pa(e, i), t.register && t.register(ae, i, oe)
	},
	tt = 255,
	Ri = {aqua: [0, tt, tt], lime: [0, tt, 0], silver: [192, 192, 192], black: [0, 0, 0], maroon: [128, 0, 0], teal: [0, 128, 128], blue: [0, 0, tt], navy: [0, 0, 128], white: [tt, tt, tt], olive: [128, 128, 0], yellow: [tt, tt, 0], orange: [tt, 165, 0], gray: [128, 128, 128], purple: [128, 0, 128], green: [0, 128, 0], red: [tt, 0, 0], pink: [tt, 192, 203], cyan: [0, tt, tt], transparent: [tt, tt, tt, 0]},
	ns = function (t, e, r) {
		return (t += t < 0 ? 1 : t > 1 ? -1 : 0), ((t * 6 < 1 ? e + (r - e) * t * 6 : t < 0.5 ? r : t * 3 < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * tt + 0.5) | 0
	},
	Ra = function (t, e, r) {
		var i = t ? (sr(t) ? [t >> 16, (t >> 8) & tt, t & tt] : 0) : Ri.black,
			n,
			s,
			o,
			l,
			u,
			c,
			p,
			h,
			f,
			_
		if (!i) {
			if ((t.substr(-1) === ',' && (t = t.substr(0, t.length - 1)), Ri[t])) i = Ri[t]
			else if (t.charAt(0) === '#') {
				if ((t.length < 6 && ((n = t.charAt(1)), (s = t.charAt(2)), (o = t.charAt(3)), (t = '#' + n + n + s + s + o + o + (t.length === 5 ? t.charAt(4) + t.charAt(4) : ''))), t.length === 9)) return (i = parseInt(t.substr(1, 6), 16)), [i >> 16, (i >> 8) & tt, i & tt, parseInt(t.substr(7), 16) / 255]
				;(t = parseInt(t.substr(1), 16)), (i = [t >> 16, (t >> 8) & tt, t & tt])
			} else if (t.substr(0, 3) === 'hsl') {
				if (((i = _ = t.match(xs)), !e)) (l = (+i[0] % 360) / 360), (u = +i[1] / 100), (c = +i[2] / 100), (s = c <= 0.5 ? c * (u + 1) : c + u - c * u), (n = c * 2 - s), i.length > 3 && (i[3] *= 1), (i[0] = ns(l + 1 / 3, n, s)), (i[1] = ns(l, n, s)), (i[2] = ns(l - 1 / 3, n, s))
				else if (~t.indexOf('=')) return (i = t.match(ua)), r && i.length < 4 && (i[3] = 1), i
			} else i = t.match(xs) || Ri.transparent
			i = i.map(Number)
		}
		return e && !_ && ((n = i[0] / tt), (s = i[1] / tt), (o = i[2] / tt), (p = Math.max(n, s, o)), (h = Math.min(n, s, o)), (c = (p + h) / 2), p === h ? (l = u = 0) : ((f = p - h), (u = c > 0.5 ? f / (2 - p - h) : f / (p + h)), (l = p === n ? (s - o) / f + (s < o ? 6 : 0) : p === s ? (o - n) / f + 2 : (n - s) / f + 4), (l *= 60)), (i[0] = ~~(l + 0.5)), (i[1] = ~~(u * 100 + 0.5)), (i[2] = ~~(c * 100 + 0.5))), r && i.length < 4 && (i[3] = 1), i
	},
	La = function (t) {
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
	Po = function (t, e, r) {
		var i = '',
			n = (t + i).match(vr),
			s = e ? 'hsla(' : 'rgba(',
			o = 0,
			l,
			u,
			c,
			p
		if (!n) return t
		if (
			((n = n.map(function (h) {
				return (h = Ra(h, e, 1)) && s + (e ? h[0] + ',' + h[1] + '%,' + h[2] + '%,' + h[3] : h.join(',')) + ')'
			})),
			r && ((c = La(t)), (l = r.c), l.join(i) !== c.c.join(i)))
		)
			for (u = t.replace(vr, '1').split(si), p = u.length - 1; o < p; o++) i += u[o] + (~l.indexOf(o) ? n.shift() || s + '0,0,0,0)' : (c.length ? c : n.length ? n : r).shift())
		if (!u) for (u = t.split(vr), p = u.length - 1; o < p; o++) i += u[o] + n[o]
		return i + u[p]
	},
	vr = (function () {
		var a = '(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b',
			t
		for (t in Ri) a += '|' + t + '\\b'
		return new RegExp(a + ')', 'gi')
	})(),
	ku = /hsl[a]?\(/,
	za = function (t) {
		var e = t.join(' '),
			r
		if (((vr.lastIndex = 0), vr.test(e))) return (r = ku.test(e)), (t[1] = Po(t[1], r)), (t[0] = Po(t[0], r, La(t[1]))), !0
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
			p,
			h,
			f,
			_ = function d(m) {
				var y = a() - i,
					b = m === !0,
					w,
					v,
					S,
					k
				if ((y > t && (r += y - e), (i += y), (S = i - r), (w = S - s), (w > 0 || b) && ((k = ++p.frame), (h = S - p.time * 1e3), (p.time = S = S / 1e3), (s += w + (w >= n ? 4 : n - w)), (v = 1)), b || (l = u(d)), v)) for (f = 0; f < o.length; f++) o[f](S, h, k, m)
			}
		return (
			(p = {
				time: 0,
				frame: 0,
				tick: function () {
					_(!0)
				},
				deltaRatio: function (m) {
					return h / (1e3 / (m || 60))
				},
				wake: function () {
					ha &&
						(!Ts && Hs() && ((be = Ts = window), (Gs = be.document || {}), (ve.gsap = ae), (be.gsapVersions || (be.gsapVersions = [])).push(ae.version), da(Bn || be.GreenSockGlobals || (!be.gsap && be) || {}), (c = be.requestAnimationFrame), Da.forEach(Aa)),
						l && p.sleep(),
						(u =
							c ||
							function (m) {
								return setTimeout(m, (s - p.time * 1e3 + 1) | 0)
							}),
						(Ji = 1),
						_(2))
				},
				sleep: function () {
					;(c ? be.cancelAnimationFrame : clearTimeout)(l), (Ji = 0), (u = Qi)
				},
				lagSmoothing: function (m, y) {
					;(t = m || 1 / 0), (e = Math.min(y || 33, t))
				},
				fps: function (m) {
					;(n = 1e3 / (m || 240)), (s = p.time * 1e3 + n)
				},
				add: function (m, y, b) {
					var w = y
						? function (v, S, k, T) {
								m(v, S, k, T), p.remove(w)
						  }
						: m
					return p.remove(m), o[b ? 'unshift' : 'push'](w), mi(), w
				},
				remove: function (m, y) {
					~(y = o.indexOf(m)) && o.splice(y, 1) && f >= y && f--
				},
				_listeners: o,
			}),
			p
		)
	})(),
	mi = function () {
		return !Ji && ge.wake()
	},
	Q = {},
	Cu = /^[\d.\-M][\d.\-,\s]/,
	Ou = /["']/g,
	Mu = function (t) {
		for (var e = {}, r = t.substr(1, t.length - 3).split(':'), i = r[0], n = 1, s = r.length, o, l, u; n < s; n++) (l = r[n]), (o = n !== s - 1 ? l.lastIndexOf(',') : l.length), (u = l.substr(0, o)), (e[i] = isNaN(u) ? u.replace(Ou, '').trim() : +u), (i = l.substr(o + 1).trim())
		return e
	},
	Eu = function (t) {
		var e = t.indexOf('(') + 1,
			r = t.indexOf(')'),
			i = t.indexOf('(', e)
		return t.substring(e, ~i && i < r ? t.indexOf(')', r + 1) : r)
	},
	Du = function (t) {
		var e = (t + '').split('('),
			r = Q[e[0]]
		return r && e.length > 1 && r.config ? r.config.apply(null, ~t.indexOf('{') ? [Mu(e[1])] : Eu(t).split(',').map(ya)) : Q._CE && Cu.test(t) ? Q._CE('', t) : r
	},
	Fa = function (t) {
		return function (e) {
			return 1 - t(1 - e)
		}
	},
	Ba = function a(t, e) {
		for (var r = t._first, i; r; ) r instanceof ie ? a(r, e) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== e && (r.timeline ? a(r.timeline, e) : ((i = r._ease), (r._ease = r._yEase), (r._yEase = i), (r._yoyo = e))), (r = r._next)
	},
	Nr = function (t, e) {
		return (t && (ht(t) ? t : Q[t] || Du(t))) || e
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
				;(Q[o] = ve[o] = n), (Q[(s = o.toLowerCase())] = r)
				for (var l in n) Q[s + (l === 'easeIn' ? '.in' : l === 'easeOut' ? '.out' : '.inOut')] = Q[o + '.' + l] = n[l]
			}),
			n
		)
	},
	Ia = function (t) {
		return function (e) {
			return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2
		}
	},
	ss = function a(t, e, r) {
		var i = e >= 1 ? e : 1,
			n = (r || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1),
			s = (n / vs) * (Math.asin(1 / i) || 0),
			o = function (c) {
				return c === 1 ? 1 : i * Math.pow(2, -10 * c) * su((c - s) * n) + 1
			},
			l =
				t === 'out'
					? o
					: t === 'in'
					? function (u) {
							return 1 - o(1 - u)
					  }
					: Ia(o)
		return (
			(n = vs / n),
			(l.config = function (u, c) {
				return a(t, u, c)
			}),
			l
		)
	},
	os = function a(t, e) {
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
					: Ia(r)
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
Q.Linear.easeNone = Q.none = Q.Linear.easeIn
Kr('Elastic', ss('in'), ss('out'), ss())
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
	return -(aa(1 - a * a) - 1)
})
Kr('Sine', function (a) {
	return a === 1 ? 1 : -nu(a * ru) + 1
})
Kr('Back', os('in'), os('out'), os())
Q.SteppedEase =
	Q.steps =
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
pi.ease = Q['quad.out']
se('onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt', function (a) {
	return (Qs += a + ',' + a + 'Params,')
})
var Ya = function (t, e) {
		;(this.id = iu++), (t._gsap = this), (this.target = t), (this.harness = e), (this.get = e ? e.get : ga), (this.set = e ? e.getSetter : ro)
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
					for (jn(this, r), !n._dp || n.parent || Ta(n, this); n && n.parent; ) n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), (n = n.parent)
					!this.parent && this._dp.autoRemoveChildren && ((this._ts > 0 && r < this._tDur) || (this._ts < 0 && r > 0) || (!this._tDur && !r)) && $e(this._dp, this, this._start - this._delay)
				}
				return (this._tTime !== r || (!this._dur && !i) || (this._initted && Math.abs(this._zTime) === et) || (!r && !this._initted && (this.add || this._ptLookup))) && (this._ts || (this._pTime = r), ma(this, r, i)), this
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
				return arguments.length ? this.totalTime(this._time + (r - 1) * n, i) : this._repeat ? _i(this._tTime, n) + 1 : 1
			}),
			(t.timeScale = function (r) {
				if (!arguments.length) return this._rts === -et ? 0 : this._rts
				if (this._rts === r) return this
				var i = this.parent && this._ts ? Nn(this.parent._time, this) : this._tTime
				return (this._rts = +r || 0), (this._ts = this._ps || r === -et ? 0 : this._rts), this.totalTime(an(-Math.abs(this._delay), this._tDur, i), !0), Qn(this), hu(this)
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
				return i ? (r && (!this._ts || (this._repeat && this._time && this.totalProgress() < 1)) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Nn(i.rawTime(r), this) : this._tTime) : this._tTime
			}),
			(t.revert = function (r) {
				r === void 0 && (r = lu)
				var i = Xt
				return (Xt = r), (this._initted || this._startAt) && (this.timeline && this.timeline.revert(r), this.totalTime(-0.01, r.suppressEvents)), this.data !== 'nested' && r.kill !== !1 && this.kill(), (Xt = i), this
			}),
			(t.globalTime = function (r) {
				for (var i = this, n = arguments.length ? r : i.rawTime(); i; ) (n = i._start + n / (i._ts || 1)), (i = i._dp)
				return !this.parent && this._sat ? (this._sat.vars.immediateRender ? -1 : this._sat.globalTime(r)) : n
			}),
			(t.repeat = function (r) {
				return arguments.length ? ((this._repeat = r === 1 / 0 ? -2 : r), bo(this)) : this._repeat === -2 ? 1 / 0 : this._repeat
			}),
			(t.repeatDelay = function (r) {
				if (arguments.length) {
					var i = this._time
					return (this._rDelay = r), bo(this), i ? this.time(i) : this
				}
				return this._rDelay
			}),
			(t.yoyo = function (r) {
				return arguments.length ? ((this._yoyo = r), this) : this._yoyo
			}),
			(t.seek = function (r, i) {
				return this.totalTime(we(this, r), ne(i))
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
					var s = ht(r) ? r : va,
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
	oa(t, a)
	function t(r, i) {
		var n
		return r === void 0 && (r = {}), (n = a.call(this, r) || this), (n.labels = {}), (n.smoothChildTiming = !!r.smoothChildTiming), (n.autoRemoveChildren = !!r.autoRemoveChildren), (n._sort = ne(r.sortChildren)), lt && $e(r.parent || lt, Je(n), i), r.reversed && n.reverse(), r.paused && n.paused(!0), r.scrollTrigger && wa(Je(n), r.scrollTrigger), n
	}
	var e = t.prototype
	return (
		(e.to = function (i, n, s) {
			return Ni(0, arguments, this), this
		}),
		(e.from = function (i, n, s) {
			return Ni(1, arguments, this), this
		}),
		(e.fromTo = function (i, n, s, o) {
			return Ni(2, arguments, this), this
		}),
		(e.set = function (i, n, s) {
			return (n.duration = 0), (n.parent = this), Xi(n).repeatDelay || (n.repeat = 0), (n.immediateRender = !!n.immediateRender), new Tt(i, n, we(this, s), 1), this
		}),
		(e.call = function (i, n, s) {
			return $e(this, Tt.delayedCall(0, i, n), s)
		}),
		(e.staggerTo = function (i, n, s, o, l, u, c) {
			return (s.duration = n), (s.stagger = s.stagger || o), (s.onComplete = u), (s.onCompleteParams = c), (s.parent = this), new Tt(i, s, we(this, l)), this
		}),
		(e.staggerFrom = function (i, n, s, o, l, u, c) {
			return (s.runBackwards = 1), (Xi(s).immediateRender = ne(s.immediateRender)), this.staggerTo(i, n, s, o, l, u, c)
		}),
		(e.staggerFromTo = function (i, n, s, o, l, u, c, p) {
			return (o.startAt = s), (Xi(o).immediateRender = ne(o.immediateRender)), this.staggerTo(i, n, o, l, u, c, p)
		}),
		(e.render = function (i, n, s) {
			var o = this._time,
				l = this._dirty ? this.totalDuration() : this._tDur,
				u = this._dur,
				c = i <= 0 ? 0 : Rt(i),
				p = this._zTime < 0 != i < 0 && (this._initted || !u),
				h,
				f,
				_,
				d,
				m,
				y,
				b,
				w,
				v,
				S,
				k,
				T
			if ((this !== lt && c > l && i >= 0 && (c = l), c !== this._tTime || s || p)) {
				if ((o !== this._time && u && ((c += this._time - o), (i += this._time - o)), (h = c), (v = this._start), (w = this._ts), (y = !w), p && (u || (o = this._zTime), (i || !n) && (this._zTime = i)), this._repeat)) {
					if (((k = this._yoyo), (m = u + this._rDelay), this._repeat < -1 && i < 0)) return this.totalTime(m * 100 + i, n, s)
					if (((h = Rt(c % m)), c === l ? ((d = this._repeat), (h = u)) : ((d = ~~(c / m)), d && d === c / m && ((h = u), d--), h > u && (h = u)), (S = _i(this._tTime, m)), !o && this._tTime && S !== d && this._tTime - S * m - this._dur <= 0 && (S = d), k && d & 1 && ((h = u - h), (T = 1)), d !== S && !this._lock)) {
						var C = k && S & 1,
							P = C === (k && d & 1)
						if ((d < S && (C = !C), (o = C ? 0 : u), (this._lock = 1), (this.render(o || (T ? 0 : Rt(d * m)), n, !u)._lock = 0), (this._tTime = c), !n && this.parent && Ce(this, 'onRepeat'), this.vars.repeatRefresh && !T && (this.invalidate()._lock = 1), (o && o !== this._time) || y !== !this._ts || (this.vars.onRepeat && !this.parent && !this._act))) return this
						if (((u = this._dur), (l = this._tDur), P && ((this._lock = 2), (o = C ? u : -1e-4), this.render(o, !0), this.vars.repeatRefresh && !T && this.invalidate()), (this._lock = 0), !this._ts && !y)) return this
						Ba(this, T)
					}
				}
				if ((this._hasPause && !this._forcing && this._lock < 2 && ((b = gu(this, Rt(o), Rt(h))), b && (c -= h - (h = b._start))), (this._tTime = c), (this._time = h), (this._act = !w), this._initted || ((this._onUpdate = this.vars.onUpdate), (this._initted = 1), (this._zTime = i), (o = 0)), !o && h && !n && !d && (Ce(this, 'onStart'), this._tTime !== c))) return this
				if (h >= o && i >= 0)
					for (f = this._first; f; ) {
						if (((_ = f._next), (f._act || h >= f._start) && f._ts && b !== f)) {
							if (f.parent !== this) return this.render(i, n, s)
							if ((f.render(f._ts > 0 ? (h - f._start) * f._ts : (f._dirty ? f.totalDuration() : f._tDur) + (h - f._start) * f._ts, n, s), h !== this._time || (!this._ts && !y))) {
								;(b = 0), _ && (c += this._zTime = -et)
								break
							}
						}
						f = _
					}
				else {
					f = this._last
					for (var M = i < 0 ? i : h; f; ) {
						if (((_ = f._prev), (f._act || M <= f._end) && f._ts && b !== f)) {
							if (f.parent !== this) return this.render(i, n, s)
							if ((f.render(f._ts > 0 ? (M - f._start) * f._ts : (f._dirty ? f.totalDuration() : f._tDur) + (M - f._start) * f._ts, n, s || (Xt && (f._initted || f._startAt))), h !== this._time || (!this._ts && !y))) {
								;(b = 0), _ && (c += this._zTime = M ? -et : et)
								break
							}
						}
						f = _
					}
				}
				if (b && !n && (this.pause(), (b.render(h >= o ? 0 : -et)._zTime = h >= o ? 1 : -1), this._ts)) return (this._start = v), Qn(this), this.render(i, n, s)
				this._onUpdate && !n && Ce(this, 'onUpdate', !0), ((c === l && this._tTime >= this.totalDuration()) || (!c && o)) && (v === this._start || Math.abs(w) !== Math.abs(this._ts)) && (this._lock || ((i || !u) && ((c === l && this._ts > 0) || (!c && this._ts < 0)) && wr(this, 1), !n && !(i < 0 && !o) && (c || o || !l) && (Ce(this, c === l && i >= 0 ? 'onComplete' : 'onReverseComplete', !0), this._prom && !(c < l && this.timeScale() > 0) && this._prom())))
			}
			return this
		}),
		(e.add = function (i, n) {
			var s = this
			if ((sr(n) || (n = we(this, n, i)), !(i instanceof yi))) {
				if (Nt(i))
					return (
						i.forEach(function (o) {
							return s.add(o, n)
						}),
						this
					)
				if (Et(i)) return this.addLabel(i, n)
				if (ht(i)) i = Tt.delayedCall(0, i)
				else return this
			}
			return this !== i ? $e(this, i, n) : this
		}),
		(e.getChildren = function (i, n, s, o) {
			i === void 0 && (i = !0), n === void 0 && (n = !0), s === void 0 && (s = !0), o === void 0 && (o = -Pe)
			for (var l = [], u = this._first; u; ) u._start >= o && (u instanceof Tt ? n && l.push(u) : (s && l.push(u), i && l.push.apply(l, u.getChildren(!0, n, s)))), (u = u._next)
			return l
		}),
		(e.getById = function (i) {
			for (var n = this.getChildren(1, 1, 1), s = n.length; s--; ) if (n[s].vars.id === i) return n[s]
		}),
		(e.remove = function (i) {
			return Et(i) ? this.removeLabel(i) : ht(i) ? this.killTweensOf(i) : (Zn(this, i), i === this._recent && (this._recent = this._last), Xr(this))
		}),
		(e.totalTime = function (i, n) {
			return arguments.length ? ((this._forcing = 1), !this._dp && this._ts && (this._start = Rt(ge.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), a.prototype.totalTime.call(this, i, n), (this._forcing = 0), this) : this._tTime
		}),
		(e.addLabel = function (i, n) {
			return (this.labels[i] = we(this, n)), this
		}),
		(e.removeLabel = function (i) {
			return delete this.labels[i], this
		}),
		(e.addPause = function (i, n, s) {
			var o = Tt.delayedCall(0, n || Qi, s)
			return (o.data = 'isPause'), (this._hasPause = 1), $e(this, o, we(this, i))
		}),
		(e.removePause = function (i) {
			var n = this._first
			for (i = we(this, i); n; ) n._start === i && n.data === 'isPause' && wr(n), (n = n._next)
		}),
		(e.killTweensOf = function (i, n, s) {
			for (var o = this.getTweensOf(i, s), l = o.length; l--; ) hr !== o[l] && o[l].kill(i, n)
			return this
		}),
		(e.getTweensOf = function (i, n) {
			for (var s = [], o = ke(i), l = this._first, u = sr(n), c; l; ) l instanceof Tt ? uu(l._targets, o) && (u ? (!hr || (l._initted && l._ts)) && l.globalTime(0) <= n && l.globalTime(l.totalDuration()) > n : !n || l.isActive()) && s.push(l) : (c = l.getTweensOf(o, n)).length && s.push.apply(s, c), (l = l._next)
			return s
		}),
		(e.tweenTo = function (i, n) {
			n = n || {}
			var s = this,
				o = we(s, i),
				l = n,
				u = l.startAt,
				c = l.onStart,
				p = l.onStartParams,
				h = l.immediateRender,
				f,
				_ = Tt.to(
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
									_._dur !== m && gi(_, m, 0, 1).render(_._time, !0, !0), (f = 1)
								}
								c && c.apply(_, p || [])
							},
						},
						n
					)
				)
			return h ? _.render(0) : _
		}),
		(e.tweenFromTo = function (i, n, s) {
			return this.tweenTo(n, Me({startAt: {time: we(this, i)}}, s))
		}),
		(e.recent = function () {
			return this._recent
		}),
		(e.nextLabel = function (i) {
			return i === void 0 && (i = this._time), So(this, we(this, i))
		}),
		(e.previousLabel = function (i) {
			return i === void 0 && (i = this._time), So(this, we(this, i), 1)
		}),
		(e.currentLabel = function (i) {
			return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + et)
		}),
		(e.shiftChildren = function (i, n, s) {
			s === void 0 && (s = 0)
			for (var o = this._first, l = this.labels, u; o; ) o._start >= s && ((o._start += i), (o._end += i)), (o = o._next)
			if (n) for (u in l) l[u] >= s && (l[u] += i)
			return Xr(this)
		}),
		(e.invalidate = function (i) {
			var n = this._first
			for (this._lock = 0; n; ) n.invalidate(i), (n = n._next)
			return a.prototype.invalidate.call(this, i)
		}),
		(e.clear = function (i) {
			i === void 0 && (i = !0)
			for (var n = this._first, s; n; ) (s = n._next), this.remove(n), (n = s)
			return this._dp && (this._time = this._tTime = this._pTime = 0), i && (this.labels = {}), Xr(this)
		}),
		(e.totalDuration = function (i) {
			var n = 0,
				s = this,
				o = s._last,
				l = Pe,
				u,
				c,
				p
			if (arguments.length) return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -i : i))
			if (s._dirty) {
				for (p = s.parent; o; ) (u = o._prev), o._dirty && o.totalDuration(), (c = o._start), c > l && s._sort && o._ts && !s._lock ? ((s._lock = 1), ($e(s, o, c - o._delay, 1)._lock = 0)) : (l = c), c < 0 && o._ts && ((n -= c), ((!p && !s._dp) || (p && p.smoothChildTiming)) && ((s._start += c / s._ts), (s._time -= c), (s._tTime -= c)), s.shiftChildren(-c, !1, -1 / 0), (l = 0)), o._end > n && o._ts && (n = o._end), (o = u)
				gi(s, s === lt && s._time > n ? s._time : n, 1, 1), (s._dirty = 0)
			}
			return s._tDur
		}),
		(t.updateRoot = function (i) {
			if ((lt._ts && (ma(lt, Nn(i, lt)), (_a = ge.frame)), ge.frame >= xo)) {
				xo += ye.autoSleep || 120
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
var Au = function (t, e, r, i, n, s, o) {
		var l = new oe(this._pt, t, e, 0, 1, Ua, null, n),
			u = 0,
			c = 0,
			p,
			h,
			f,
			_,
			d,
			m,
			y,
			b
		for (l.b = r, l.e = i, r += '', i += '', (y = ~i.indexOf('random(')) && (i = ji(i)), s && ((b = [r, i]), s(b, t, e), (r = b[0]), (i = b[1])), h = r.match(rs) || []; (p = rs.exec(i)); ) (_ = p[0]), (d = i.substring(u, p.index)), f ? (f = (f + 1) % 5) : d.substr(-5) === 'rgba(' && (f = 1), _ !== h[c++] && ((m = parseFloat(h[c - 1]) || 0), (l._pt = {_next: l._pt, p: d || c === 1 ? d : ',', s: m, c: _.charAt(1) === '=' ? ui(m, _) - m : parseFloat(_) - m, m: f && f < 4 ? Math.round : 0}), (u = rs.lastIndex))
		return (l.c = u < i.length ? i.substring(u, i.length) : ''), (l.fp = o), (ca.test(i) || y) && (l.e = 0), (this._pt = l), l
	},
	Js = function (t, e, r, i, n, s, o, l, u, c) {
		ht(i) && (i = i(n || 0, t, s))
		var p = t[e],
			h = r !== 'get' ? r : ht(p) ? (u ? t[e.indexOf('set') || !ht(t['get' + e.substr(3)]) ? e : 'get' + e.substr(3)](u) : t[e]()) : p,
			f = ht(p) ? (u ? Bu : Va) : eo,
			_
		if ((Et(i) && (~i.indexOf('random(') && (i = ji(i)), i.charAt(1) === '=' && ((_ = ui(h, i) + (Yt(h) || 0)), (_ || _ === 0) && (i = _))), !c || h !== i || Os)) return !isNaN(h * i) && i !== '' ? ((_ = new oe(this._pt, t, e, +h || 0, i - (h || 0), typeof p == 'boolean' ? Yu : $a, 0, f)), u && (_.fp = u), o && _.modifier(o, this, t), (this._pt = _)) : (!p && !(e in t) && Ks(e, i), Au.call(this, t, e, h, i, f, l || ye.stringFilter, u))
	},
	Ru = function (t, e, r, i, n) {
		if ((ht(t) && (t = Wi(t, n, e, r, i)), !Ke(t) || (t.style && t.nodeType) || Nt(t) || la(t))) return Et(t) ? Wi(t, n, e, r, i) : t
		var s = {},
			o
		for (o in t) s[o] = Wi(t[o], n, e, r, i)
		return s
	},
	Xa = function (t, e, r, i, n, s) {
		var o, l, u, c
		if (pe[t] && (o = new pe[t]()).init(n, o.rawVars ? e[t] : Ru(e[t], i, n, s, r), r, i, s) !== !1 && ((r._pt = l = new oe(r._pt, n, t, 0, 1, o.render, o, 0, o.priority)), r !== oi)) for (u = r._ptLookup[r._targets.indexOf(n)], c = o._props.length; c--; ) u[o._props[c]] = l
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
			p = i.callbackScope,
			h = i.runBackwards,
			f = i.yoyoEase,
			_ = i.keyframes,
			d = i.autoRevert,
			m = t._dur,
			y = t._startAt,
			b = t._targets,
			w = t.parent,
			v = w && w.data === 'nested' ? w.vars.targets : b,
			S = t._overwrite === 'auto' && !Us,
			k = t.timeline,
			T,
			C,
			P,
			M,
			A,
			E,
			H,
			Y,
			B,
			X,
			z,
			Z,
			J
		if ((k && (!_ || !n) && (n = 'none'), (t._ease = Nr(n, pi.ease)), (t._yEase = f ? Fa(Nr(f === !0 ? n : f, pi.ease)) : 0), f && t._yoyo && !t._repeat && ((f = t._yEase), (t._yEase = t._ease), (t._ease = f)), (t._from = !k && !!i.runBackwards), !k || (_ && !i.stagger))) {
			if (((Y = b[0] ? Yr(b[0]).harness : 0), (Z = Y && i[Y.prop]), (T = Xn(i, Zs)), y && (y._zTime < 0 && y.progress(1), e < 0 && h && o && !d ? y.render(-1, !0) : y.revert(h && m ? wn : au), (y._lazy = 0)), s)) {
				if ((wr((t._startAt = Tt.set(b, Me({data: 'isStart', overwrite: !1, parent: w, immediateRender: !0, lazy: !y && ne(l), startAt: null, delay: 0, onUpdate: u, onUpdateParams: c, callbackScope: p, stagger: 0}, s)))), (t._startAt._dp = 0), (t._startAt._sat = t), e < 0 && (Xt || (!o && !d)) && t._startAt.revert(wn), o && m && e <= 0 && r <= 0)) {
					e && (t._zTime = e)
					return
				}
			} else if (h && m && !y) {
				if ((e && (o = !1), (P = Me({overwrite: !1, data: 'isFromStart', lazy: o && !y && ne(l), immediateRender: o, stagger: 0, parent: w}, T)), Z && (P[Y.prop] = Z), wr((t._startAt = Tt.set(b, P))), (t._startAt._dp = 0), (t._startAt._sat = t), e < 0 && (Xt ? t._startAt.revert(wn) : t._startAt.render(-1, !0)), (t._zTime = e), !o)) a(t._startAt, et, et)
				else if (!e) return
			}
			for (t._pt = t._ptCache = 0, l = (m && ne(l)) || (l && !m), C = 0; C < b.length; C++) {
				if (
					((A = b[C]),
					(H = A._gsap || js(b)[C]._gsap),
					(t._ptLookup[C] = X = {}),
					ws[H.id] && yr.length && Yn(),
					(z = v === b ? C : v.indexOf(A)),
					Y &&
						(B = new Y()).init(A, Z || T, t, z, v) !== !1 &&
						((t._pt = M = new oe(t._pt, A, B.name, 0, 1, B.render, B, 0, B.priority)),
						B._props.forEach(function (g) {
							X[g] = M
						}),
						B.priority && (E = 1)),
					!Y || Z)
				)
					for (P in T) pe[P] && (B = Xa(P, T, t, z, A, v)) ? B.priority && (E = 1) : (X[P] = M = Js.call(t, A, P, 'get', T[P], z, v, 0, i.stringFilter))
				t._op && t._op[C] && t.kill(A, t._op[C]), S && t._pt && ((hr = t), lt.killTweensOf(A, X, t.globalTime(e)), (J = !t.parent), (hr = 0)), t._pt && l && (ws[H.id] = 1)
			}
			E && qa(t), t._onInit && t._onInit(t)
		}
		;(t._onUpdate = u), (t._initted = (!t._op || t._pt) && !J), _ && e <= 0 && k.render(Pe, !0, !0)
	},
	Lu = function (t, e, r, i, n, s, o) {
		var l = ((t._pt && t._ptCache) || (t._ptCache = {}))[e],
			u,
			c,
			p,
			h
		if (!l)
			for (l = t._ptCache[e] = [], p = t._ptLookup, h = t._targets.length; h--; ) {
				if (((u = p[h][e]), u && u.d && u.d._pt)) for (u = u.d._pt; u && u.p !== e && u.fp !== e; ) u = u._next
				if (!u) return (Os = 1), (t.vars[e] = '+=0'), to(t, o), (Os = 0), 1
				l.push(u)
			}
		for (h = l.length; h--; ) (c = l[h]), (u = c._pt || c), (u.s = (i || i === 0) && !n ? i : u.s + (i || 0) + s * u.c), (u.c = r - u.s), c.e && (c.e = gt(r) + Yt(c.e)), c.b && (c.b = u.s + Yt(c.b))
	},
	zu = function (t, e) {
		var r = t[0] ? Yr(t[0]).harness : 0,
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
	Fu = function (t, e, r, i) {
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
	Wi = function (t, e, r, i, n) {
		return ht(t) ? t.call(e, r, i, n) : Et(t) && ~t.indexOf('random(') ? ji(t) : t
	},
	Na = Qs + 'repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert',
	Wa = {}
se(Na + ',id,stagger,delay,duration,paused,scrollTrigger', function (a) {
	return (Wa[a] = 1)
})
var Tt = (function (a) {
	oa(t, a)
	function t(r, i, n, s) {
		var o
		typeof i == 'number' && ((n.duration = i), (i = n), (n = null)), (o = a.call(this, s ? i : Xi(i)) || this)
		var l = o.vars,
			u = l.duration,
			c = l.delay,
			p = l.immediateRender,
			h = l.stagger,
			f = l.overwrite,
			_ = l.keyframes,
			d = l.defaults,
			m = l.scrollTrigger,
			y = l.yoyoEase,
			b = i.parent || lt,
			w = (Nt(r) || la(r) ? sr(r[0]) : 'length' in i) ? [r] : ke(r),
			v,
			S,
			k,
			T,
			C,
			P,
			M,
			A
		if (((o._targets = w.length ? js(w) : In('GSAP target ' + r + ' not found. https://greensock.com', !ye.nullTargetWarn) || []), (o._ptLookup = []), (o._overwrite = f), _ || h || un(u) || un(c))) {
			if (((i = o.vars), (v = o.timeline = new ie({data: 'nested', defaults: d || {}, targets: b && b.data === 'nested' ? b.vars.targets : w})), v.kill(), (v.parent = v._dp = Je(o)), (v._start = 0), h || un(u) || un(c))) {
				if (((T = w.length), (M = h && ka(h)), Ke(h))) for (C in h) ~Na.indexOf(C) && (A || (A = {}), (A[C] = h[C]))
				for (S = 0; S < T; S++) (k = Xn(i, Wa)), (k.stagger = 0), y && (k.yoyoEase = y), A && Ur(k, A), (P = w[S]), (k.duration = +Wi(u, Je(o), S, P, w)), (k.delay = (+Wi(c, Je(o), S, P, w) || 0) - o._delay), !h && T === 1 && k.delay && ((o._delay = c = k.delay), (o._start += c), (k.delay = 0)), v.to(P, k, M ? M(S, P, w) : 0), (v._ease = Q.none)
				v.duration() ? (u = c = 0) : (o.timeline = 0)
			} else if (_) {
				Xi(Me(v.vars.defaults, {ease: 'none'})), (v._ease = Nr(_.ease || i.ease || 'none'))
				var E = 0,
					H,
					Y,
					B
				if (Nt(_))
					_.forEach(function (X) {
						return v.to(w, X, '>')
					}),
						v.duration()
				else {
					k = {}
					for (C in _) C === 'ease' || C === 'easeEach' || Fu(C, _[C], k, _.easeEach)
					for (C in k)
						for (
							H = k[C].sort(function (X, z) {
								return X.t - z.t
							}),
								E = 0,
								S = 0;
							S < H.length;
							S++
						)
							(Y = H[S]), (B = {ease: Y.e, duration: ((Y.t - (S ? H[S - 1].t : 0)) / 100) * u}), (B[C] = Y.v), v.to(w, B, E), (E += B.duration)
					v.duration() < u && v.to({}, {duration: u - v.duration()})
				}
			}
			u || o.duration((u = v.duration()))
		} else o.timeline = 0
		return f === !0 && !Us && ((hr = Je(o)), lt.killTweensOf(w), (hr = 0)), $e(b, Je(o), n), i.reversed && o.reverse(), i.paused && o.paused(!0), (p || (!u && !_ && o._start === Rt(b._time) && ne(p) && du(Je(o)) && b.data !== 'nested')) && ((o._tTime = -et), o.render(Math.max(0, -c) || 0)), m && wa(Je(o), m), o
	}
	var e = t.prototype
	return (
		(e.render = function (i, n, s) {
			var o = this._time,
				l = this._tDur,
				u = this._dur,
				c = i < 0,
				p = i > l - et && !c ? l : i < et ? 0 : i,
				h,
				f,
				_,
				d,
				m,
				y,
				b,
				w,
				v
			if (!u) _u(this, i, n, s)
			else if (p !== this._tTime || !i || s || (!this._initted && this._tTime) || (this._startAt && this._zTime < 0 !== c)) {
				if (((h = p), (w = this.timeline), this._repeat)) {
					if (((d = u + this._rDelay), this._repeat < -1 && c)) return this.totalTime(d * 100 + i, n, s)
					if (((h = Rt(p % d)), p === l ? ((_ = this._repeat), (h = u)) : ((_ = ~~(p / d)), _ && _ === p / d && ((h = u), _--), h > u && (h = u)), (y = this._yoyo && _ & 1), y && ((v = this._yEase), (h = u - h)), (m = _i(this._tTime, d)), h === o && !s && this._initted)) return (this._tTime = p), this
					_ !== m && (w && this._yEase && Ba(w, y), this.vars.repeatRefresh && !y && !this._lock && ((this._lock = s = 1), (this.render(Rt(d * _), !0).invalidate()._lock = 0)))
				}
				if (!this._initted) {
					if (ba(this, c ? i : h, s, n, p)) return (this._tTime = 0), this
					if (o !== this._time) return this
					if (u !== this._dur) return this.render(i, n, s)
				}
				if (((this._tTime = p), (this._time = h), !this._act && this._ts && ((this._act = 1), (this._lazy = 0)), (this.ratio = b = (v || this._ease)(h / u)), this._from && (this.ratio = b = 1 - b), h && !o && !n && !_ && (Ce(this, 'onStart'), this._tTime !== p))) return this
				for (f = this._pt; f; ) f.r(b, f.d), (f = f._next)
				;(w && w.render(i < 0 ? i : !h && y ? -et : w._dur * w._ease(h / this._dur), n, s)) || (this._startAt && (this._zTime = i)), this._onUpdate && !n && (c && bs(this, i, n, s), Ce(this, 'onUpdate')), this._repeat && _ !== m && this.vars.onRepeat && !n && this.parent && Ce(this, 'onRepeat'), (p === this._tDur || !p) && this._tTime === p && (c && !this._onUpdate && bs(this, i, !0, !0), (i || !u) && ((p === this._tDur && this._ts > 0) || (!p && this._ts < 0)) && wr(this, 1), !n && !(c && !o) && (p || o || y) && (Ce(this, p === l ? 'onComplete' : 'onReverseComplete', !0), this._prom && !(p < l && this.timeScale() > 0) && this._prom()))
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
			return this._initted || to(this, l), (u = this._ease(l / this._dur)), Lu(this, i, n, s, o, u, l) ? this.resetTo(i, n, s, o) : (jn(this, 0), this.parent || xa(this._dp, this, '_first', '_last', this._dp._sort ? '_start' : 0), this.render(0))
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
				p,
				h,
				f,
				_,
				d,
				m,
				y
			if ((!n || n === 'all') && fu(o, l)) return n === 'all' && (this._pt = 0), Ai(this)
			for (
				p = this._op = this._op || [],
					n !== 'all' &&
						(Et(n) &&
							((d = {}),
							se(n, function (b) {
								return (d[b] = 1)
							}),
							(n = d)),
						(n = zu(o, n))),
					y = o.length;
				y--;

			)
				if (~l.indexOf(o[y])) {
					;(h = u[y]), n === 'all' ? ((p[y] = n), (_ = h), (f = {})) : ((f = p[y] = p[y] || {}), (_ = n))
					for (d in _) (m = h && h[d]), m && ((!('kill' in m.d) || m.d.kill(d) === !0) && Zn(this, m, '_pt'), delete h[d]), f !== 'all' && (f[d] = 1)
				}
			return this._initted && !this._pt && c && Ai(this), this
		}),
		(t.to = function (i, n) {
			return new t(i, n, arguments[2])
		}),
		(t.from = function (i, n) {
			return Ni(1, arguments)
		}),
		(t.delayedCall = function (i, n, s, o) {
			return new t(n, 0, {immediateRender: !1, lazy: !1, overwrite: !1, delay: i, onComplete: n, onReverseComplete: n, onCompleteParams: s, onReverseCompleteParams: s, callbackScope: o})
		}),
		(t.fromTo = function (i, n, s) {
			return Ni(2, arguments)
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
Me(Tt.prototype, {_targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0})
se('staggerTo,staggerFrom,staggerFromTo', function (a) {
	Tt[a] = function () {
		var t = new ie(),
			e = Ps.call(arguments, 0)
		return e.splice(a === 'staggerFromTo' ? 5 : 4, 0, 0), t[a].apply(t, e)
	}
})
var eo = function (t, e, r) {
		return (t[e] = r)
	},
	Va = function (t, e, r) {
		return t[e](r)
	},
	Bu = function (t, e, r, i) {
		return t[e](i.fp, r)
	},
	Iu = function (t, e, r) {
		return t.setAttribute(e, r)
	},
	ro = function (t, e) {
		return ht(t[e]) ? Va : qs(t[e]) && t.setAttribute ? Iu : eo
	},
	$a = function (t, e) {
		return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e)
	},
	Yu = function (t, e) {
		return e.set(e.t, e.p, !!(e.s + e.c * t), e)
	},
	Ua = function (t, e) {
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
	Xu = function (t, e, r, i) {
		for (var n = this._pt, s; n; ) (s = n._next), n.p === i && n.modifier(t, e, r), (n = s)
	},
	Nu = function (t) {
		for (var e = this._pt, r, i; e; ) (i = e._next), (e.p === t && !e.op) || e.op === t ? Zn(this, e, '_pt') : e.dep || (r = 1), (e = i)
		return !r
	},
	Wu = function (t, e, r, i) {
		i.mSet(t, e, i.m.call(i.tween, r, i.mt), i)
	},
	qa = function (t) {
		for (var e = t._pt, r, i, n, s; e; ) {
			for (r = e._next, i = n; i && i.pr > e.pr; ) i = i._next
			;(e._prev = i ? i._prev : s) ? (e._prev._next = e) : (n = e), (e._next = i) ? (i._prev = e) : (s = e), (e = r)
		}
		t._pt = n
	},
	oe = (function () {
		function a(e, r, i, n, s, o, l, u, c) {
			;(this.t = r), (this.s = n), (this.c = s), (this.p = i), (this.r = o || $a), (this.d = l || this), (this.set = u || eo), (this.pr = c || 0), (this._next = e), e && (e._prev = this)
		}
		var t = a.prototype
		return (
			(t.modifier = function (r, i, n) {
				;(this.mSet = this.mSet || this.set), (this.set = Wu), (this.m = r), (this.mt = n), (this.tween = i)
			}),
			a
		)
	})()
se(Qs + 'parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger', function (a) {
	return (Zs[a] = 1)
})
ve.TweenMax = ve.TweenLite = Tt
ve.TimelineLite = ve.TimelineMax = ie
lt = new ie({sortChildren: !1, defaults: pi, autoRemoveChildren: !0, id: 'root', smoothChildTiming: !0})
ye.stringFilter = za
var vi = [],
	Sn = {},
	Vu = [],
	ko = 0,
	as = function (t) {
		return (Sn[t] || Vu).map(function (e) {
			return e()
		})
	},
	Ms = function () {
		var t = Date.now(),
			e = []
		t - ko > 2 &&
			(as('matchMediaInit'),
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
			as('matchMediaRevert'),
			e.forEach(function (r) {
				return r.onMatch(r)
			}),
			(ko = t),
			as('matchMedia'))
	},
	Ha = (function () {
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
							p
						return u && u !== s && u.data.push(s), n && (s.selector = ks(n)), (vt = s), (p = i.apply(s, arguments)), ht(p) && s._r.push(p), (vt = u), (s.selector = c), (s.isReverted = !1), p
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
						return i instanceof a ? r.push.apply(r, i.getTweens()) : i instanceof Tt && !(i.parent && i.parent.data === 'nested') && r.push(i)
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
	$u = (function () {
		function a(e) {
			;(this.contexts = []), (this.scope = e)
		}
		var t = a.prototype
		return (
			(t.add = function (r, i, n) {
				Ke(r) || (r = {matches: r})
				var s = new Ha(0, n || this.scope),
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
	Wn = {
		registerPlugin: function () {
			for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r]
			e.forEach(function (i) {
				return Aa(i)
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
			var n = Yr(t || {}).get,
				s = r ? va : ya
			return (
				r === 'native' && (r = ''),
				t &&
					(e
						? s(((pe[e] && pe[e].get) || n)(t, e, r, i))
						: function (o, l, u) {
								return s(((pe[o] && pe[o].get) || n)(t, o, l, u))
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
					for (var p = n; p--; ) i[p](c)
				}
			}
			t = t[0] || {}
			var s = pe[e],
				o = Yr(t),
				l = (o.harness && (o.harness.aliases || {})[e]) || e,
				u = s
					? function (c) {
							var p = new s()
							;(oi._pt = 0), p.init(t, r ? c + r : c, oi, 0, [t]), p.render(1, p), oi._pt && io(1, oi)
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
			return t && t.ease && (t.ease = Nr(t.ease, pi.ease)), To(pi, t || {})
		},
		config: function (t) {
			return To(ye, t || {})
		},
		registerEffect: function (t) {
			var e = t.name,
				r = t.effect,
				i = t.plugins,
				n = t.defaults,
				s = t.extendTimeline
			;(i || '').split(',').forEach(function (o) {
				return o && !pe[o] && !ve[o] && In(e + ' effect requires ' + o + ' plugin.')
			}),
				(is[e] = function (o, l, u) {
					return r(ke(o), Me(l || {}, n), u)
				}),
				s &&
					(ie.prototype[e] = function (o, l, u) {
						return this.add(is[e](o, Ke(l) ? l : (u = l) && {}, this), u)
					})
		},
		registerEase: function (t, e) {
			Q[t] = Nr(e)
		},
		parseEase: function (t, e) {
			return arguments.length ? Nr(t, e) : Q
		},
		getById: function (t) {
			return lt.getById(t)
		},
		exportRoot: function (t, e) {
			t === void 0 && (t = {})
			var r = new ie(t),
				i,
				n
			for (r.smoothChildTiming = ne(t.smoothChildTiming), lt.remove(r), r._dp = 0, r._time = r._tTime = lt._time, i = lt._first; i; ) (n = i._next), (e || !(!i._dur && i instanceof Tt && i.vars.onComplete === i._targets[0])) && $e(r, i, i._start - i._delay), (i = n)
			return $e(lt, r, 0), r
		},
		context: function (t, e) {
			return t ? new Ha(t, e) : vt
		},
		matchMedia: function (t) {
			return new $u(t)
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
		utils: {wrap: bu, wrapYoyo: Su, distribute: ka, random: Oa, snap: Ca, normalize: wu, getUnit: Yt, clamp: yu, splitColor: Ra, toArray: ke, selector: ks, mapRange: Ea, pipe: xu, unitize: Tu, interpolate: Pu, shuffle: Pa},
		install: da,
		effects: is,
		ticker: ge,
		updateRoot: ie.updateRoot,
		plugins: pe,
		globalTimeline: lt,
		core: {
			PropTween: oe,
			globals: pa,
			Tween: Tt,
			Timeline: ie,
			Animation: yi,
			getCache: Yr,
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
	return (Wn[a] = Tt[a])
})
ge.add(ie.updateRoot)
oi = Wn.to({}, {duration: 0})
var Uu = function (t, e) {
		for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; ) r = r._next
		return r
	},
	qu = function (t, e) {
		var r = t._targets,
			i,
			n,
			s
		for (i in e) for (n = r.length; n--; ) (s = t._ptLookup[n][i]), s && (s = s.d) && (s._pt && (s = Uu(s, i)), s && s.modifier && s.modifier(e[i], t, r[n], i))
	},
	ls = function (t, e) {
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
					qu(o, n)
				}
			},
		}
	},
	ae =
		Wn.registerPlugin(
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
			ls('roundProps', Cs),
			ls('modifiers'),
			ls('snap', Ca)
		) || Wn
Tt.version = ie.version = ae.version = '3.11.5'
ha = 1
Hs() && mi()
Q.Power0
Q.Power1
Q.Power2
Q.Power3
Q.Power4
Q.Linear
Q.Quad
Q.Cubic
Q.Quart
Q.Quint
Q.Strong
Q.Elastic
Q.Back
Q.SteppedEase
Q.Bounce
Q.Sine
Q.Expo
Q.Circ
/*!
 * CSSPlugin 3.11.5
 * https://greensock.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */ var Co,
	dr,
	ci,
	no,
	Fr,
	Oo,
	so,
	Hu = function () {
		return typeof window < 'u'
	},
	or = {},
	Ar = 180 / Math.PI,
	fi = Math.PI / 180,
	ti = Math.atan2,
	Mo = 1e8,
	oo = /([A-Z])/g,
	Gu = /(left|right|width|margin|padding|x)/i,
	Ku = /[\s,\(]\S/,
	Ue = {autoAlpha: 'opacity,visibility', scale: 'scaleX,scaleY', alpha: 'opacity'},
	Es = function (t, e) {
		return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e)
	},
	Zu = function (t, e) {
		return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e)
	},
	Qu = function (t, e) {
		return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e)
	},
	ju = function (t, e) {
		var r = e.s + e.c * t
		e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e)
	},
	Ga = function (t, e) {
		return e.set(e.t, e.p, t ? e.e : e.b, e)
	},
	Ka = function (t, e) {
		return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e)
	},
	Ju = function (t, e, r) {
		return (t.style[e] = r)
	},
	tc = function (t, e, r) {
		return t.style.setProperty(e, r)
	},
	ec = function (t, e, r) {
		return (t._gsap[e] = r)
	},
	rc = function (t, e, r) {
		return (t._gsap.scaleX = t._gsap.scaleY = r)
	},
	ic = function (t, e, r, i, n) {
		var s = t._gsap
		;(s.scaleX = s.scaleY = r), s.renderTransform(n, s)
	},
	nc = function (t, e, r, i, n) {
		var s = t._gsap
		;(s[e] = r), s.renderTransform(n, s)
	},
	ut = 'transform',
	Ie = ut + 'Origin',
	sc = function a(t, e) {
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
	Za = function (t) {
		t.translate && (t.removeProperty('translate'), t.removeProperty('scale'), t.removeProperty('rotate'))
	},
	oc = function () {
		var t = this.props,
			e = this.target,
			r = e.style,
			i = e._gsap,
			n,
			s
		for (n = 0; n < t.length; n += 3) t[n + 1] ? (e[t[n]] = t[n + 2]) : t[n + 2] ? (r[t[n]] = t[n + 2]) : r.removeProperty(t[n].substr(0, 2) === '--' ? t[n] : t[n].replace(oo, '-$1').toLowerCase())
		if (this.tfm) {
			for (s in this.tfm) i[s] = this.tfm[s]
			i.svg && (i.renderTransform(), e.setAttribute('data-svg-origin', this.svgo || '')), (n = so()), (!n || !n.isStart) && !r[ut] && (Za(r), (i.uncache = 1))
		}
	},
	Qa = function (t, e) {
		var r = {target: t, props: [], revert: oc, save: sc}
		return (
			t._gsap || ae.core.getCache(t),
			e &&
				e.split(',').forEach(function (i) {
					return r.save(i)
				}),
			r
		)
	},
	ja,
	Ds = function (t, e) {
		var r = dr.createElementNS ? dr.createElementNS((e || 'http://www.w3.org/1999/xhtml').replace(/^https/, 'http'), t) : dr.createElement(t)
		return r.style ? r : dr.createElement(t)
	},
	He = function a(t, e, r) {
		var i = getComputedStyle(t)
		return i[e] || i.getPropertyValue(e.replace(oo, '-$1').toLowerCase()) || i.getPropertyValue(e) || (!r && a(t, xi(e) || e, 1)) || ''
	},
	Eo = 'O,Moz,ms,Ms,Webkit'.split(','),
	xi = function (t, e, r) {
		var i = e || Fr,
			n = i.style,
			s = 5
		if (t in n && !r) return t
		for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(Eo[s] + t in n); );
		return s < 0 ? null : (s === 3 ? 'ms' : s >= 0 ? Eo[s] : '') + t
	},
	As = function () {
		Hu() && window.document && ((Co = window), (dr = Co.document), (ci = dr.documentElement), (Fr = Ds('div') || {style: {}}), Ds('div'), (ut = xi(ut)), (Ie = ut + 'Origin'), (Fr.style.cssText = 'border-width:0;line-height:0;position:absolute;padding:0'), (ja = !!xi('perspective')), (so = ae.core.reverting), (no = 1))
	},
	us = function a(t) {
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
	Do = function (t, e) {
		for (var r = e.length; r--; ) if (t.hasAttribute(e[r])) return t.getAttribute(e[r])
	},
	Ja = function (t) {
		var e
		try {
			e = t.getBBox()
		} catch {
			e = us.call(t, !0)
		}
		return (e && (e.width || e.height)) || t.getBBox === us || (e = us.call(t, !0)), e && !e.width && !e.x && !e.y ? {x: +Do(t, ['x', 'cx', 'x1']) || 0, y: +Do(t, ['y', 'cy', 'y1']) || 0, width: 0, height: 0} : e
	},
	tl = function (t) {
		return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Ja(t))
	},
	tn = function (t, e) {
		if (e) {
			var r = t.style
			e in or && e !== Ie && (e = ut), r.removeProperty ? ((e.substr(0, 2) === 'ms' || e.substr(0, 6) === 'webkit') && (e = '-' + e), r.removeProperty(e.replace(oo, '-$1').toLowerCase())) : r.removeAttribute(e)
		}
	},
	pr = function (t, e, r, i, n, s) {
		var o = new oe(t._pt, e, r, 0, 1, s ? Ka : Ga)
		return (t._pt = o), (o.b = i), (o.e = n), t._props.push(r), o
	},
	Ao = {deg: 1, rad: 1, turn: 1},
	ac = {grid: 1, flex: 1},
	br = function a(t, e, r, i) {
		var n = parseFloat(r) || 0,
			s = (r + '').trim().substr((n + '').length) || 'px',
			o = Fr.style,
			l = Gu.test(e),
			u = t.tagName.toLowerCase() === 'svg',
			c = (u ? 'client' : 'offset') + (l ? 'Width' : 'Height'),
			p = 100,
			h = i === 'px',
			f = i === '%',
			_,
			d,
			m,
			y
		return i === s || !n || Ao[i] || Ao[s] ? n : (s !== 'px' && !h && (n = a(t, e, r, 'px')), (y = t.getCTM && tl(t)), (f || s === '%') && (or[e] || ~e.indexOf('adius')) ? ((_ = y ? t.getBBox()[l ? 'width' : 'height'] : t[c]), gt(f ? (n / _) * p : (n / 100) * _)) : ((o[l ? 'width' : 'height'] = p + (h ? s : i)), (d = ~e.indexOf('adius') || (i === 'em' && t.appendChild && !u) ? t : t.parentNode), y && (d = (t.ownerSVGElement || {}).parentNode), (!d || d === dr || !d.appendChild) && (d = dr.body), (m = d._gsap), m && f && m.width && l && m.time === ge.time && !m.uncache ? gt((n / m.width) * p) : ((f || s === '%') && !ac[He(d, 'display')] && (o.position = He(t, 'position')), d === t && (o.position = 'static'), d.appendChild(Fr), (_ = Fr[c]), d.removeChild(Fr), (o.position = 'absolute'), l && f && ((m = Yr(d)), (m.time = ge.time), (m.width = d[c])), gt(h ? (_ * n) / p : _ && n ? (p / _) * n : 0))))
	},
	tr = function (t, e, r, i) {
		var n
		return no || As(), e in Ue && e !== 'transform' && ((e = Ue[e]), ~e.indexOf(',') && (e = e.split(',')[0])), or[e] && e !== 'transform' ? ((n = rn(t, i)), (n = e !== 'transformOrigin' ? n[e] : n.svg ? n.origin : $n(He(t, Ie)) + ' ' + n.zOrigin + 'px')) : ((n = t.style[e]), (!n || n === 'auto' || i || ~(n + '').indexOf('calc(')) && (n = (Vn[e] && Vn[e](t, e, r)) || He(t, e) || ga(t, e) || (e === 'opacity' ? 1 : 0))), r && !~(n + '').trim().indexOf(' ') ? br(t, e, n, r) + r : n
	},
	lc = function (t, e, r, i) {
		if (!r || r === 'none') {
			var n = xi(e, t, 1),
				s = n && He(t, n, 1)
			s && s !== r ? ((e = n), (r = s)) : e === 'borderColor' && (r = He(t, 'borderTopColor'))
		}
		var o = new oe(this._pt, t.style, e, 0, 1, Ua),
			l = 0,
			u = 0,
			c,
			p,
			h,
			f,
			_,
			d,
			m,
			y,
			b,
			w,
			v,
			S
		if (((o.b = r), (o.e = i), (r += ''), (i += ''), i === 'auto' && ((t.style[e] = i), (i = He(t, e) || i), (t.style[e] = r)), (c = [r, i]), za(c), (r = c[0]), (i = c[1]), (h = r.match(si) || []), (S = i.match(si) || []), S.length)) {
			for (; (p = si.exec(i)); ) (m = p[0]), (b = i.substring(l, p.index)), _ ? (_ = (_ + 1) % 5) : (b.substr(-5) === 'rgba(' || b.substr(-5) === 'hsla(') && (_ = 1), m !== (d = h[u++] || '') && ((f = parseFloat(d) || 0), (v = d.substr((f + '').length)), m.charAt(1) === '=' && (m = ui(f, m) + v), (y = parseFloat(m)), (w = m.substr((y + '').length)), (l = si.lastIndex - w.length), w || ((w = w || ye.units[e] || v), l === i.length && ((i += w), (o.e += w))), v !== w && (f = br(t, e, d, w) || 0), (o._pt = {_next: o._pt, p: b || u === 1 ? b : ',', s: f, c: y - f, m: (_ && _ < 4) || e === 'zIndex' ? Math.round : 0}))
			o.c = l < i.length ? i.substring(l, i.length) : ''
		} else o.r = e === 'display' && i === 'none' ? Ka : Ga
		return ca.test(i) && (o.e = 0), (this._pt = o), o
	},
	Ro = {top: '0%', bottom: '100%', left: '0%', right: '100%', center: '50%'},
	uc = function (t) {
		var e = t.split(' '),
			r = e[0],
			i = e[1] || '50%'
		return (r === 'top' || r === 'bottom' || i === 'left' || i === 'right') && ((t = r), (r = i), (i = t)), (e[0] = Ro[r] || r), (e[1] = Ro[i] || i), e.join(' ')
	},
	cc = function (t, e) {
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
			l && (tn(r, ut), s && (s.svg && r.removeAttribute('transform'), rn(r, 1), (s.uncache = 1), Za(i)))
		}
	},
	Vn = {
		clearProps: function (t, e, r, i, n) {
			if (n.data !== 'isFromStart') {
				var s = (t._pt = new oe(t._pt, e, r, 0, 0, cc))
				return (s.u = i), (s.pr = -10), (s.tween = n), t._props.push(r), 1
			}
		},
	},
	en = [1, 0, 0, 1, 0, 0],
	el = {},
	rl = function (t) {
		return t === 'matrix(1, 0, 0, 1, 0, 0)' || t === 'none' || !t
	},
	Lo = function (t) {
		var e = He(t, ut)
		return rl(e) ? en : e.substr(7).match(ua).map(gt)
	},
	ao = function (t, e) {
		var r = t._gsap || Yr(t),
			i = t.style,
			n = Lo(t),
			s,
			o,
			l,
			u
		return r.svg && t.getAttribute('transform') ? ((l = t.transform.baseVal.consolidate().matrix), (n = [l.a, l.b, l.c, l.d, l.e, l.f]), n.join(',') === '1,0,0,1,0,0' ? en : n) : (n === en && !t.offsetParent && t !== ci && !r.svg && ((l = i.display), (i.display = 'block'), (s = t.parentNode), (!s || !t.offsetParent) && ((u = 1), (o = t.nextElementSibling), ci.appendChild(t)), (n = Lo(t)), l ? (i.display = l) : tn(t, 'display'), u && (o ? s.insertBefore(t, o) : s ? s.appendChild(t) : ci.removeChild(t))), e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n)
	},
	Rs = function (t, e, r, i, n, s) {
		var o = t._gsap,
			l = n || ao(t, !0),
			u = o.xOrigin || 0,
			c = o.yOrigin || 0,
			p = o.xOffset || 0,
			h = o.yOffset || 0,
			f = l[0],
			_ = l[1],
			d = l[2],
			m = l[3],
			y = l[4],
			b = l[5],
			w = e.split(' '),
			v = parseFloat(w[0]) || 0,
			S = parseFloat(w[1]) || 0,
			k,
			T,
			C,
			P
		r ? l !== en && (T = f * m - _ * d) && ((C = v * (m / T) + S * (-d / T) + (d * b - m * y) / T), (P = v * (-_ / T) + S * (f / T) - (f * b - _ * y) / T), (v = C), (S = P)) : ((k = Ja(t)), (v = k.x + (~w[0].indexOf('%') ? (v / 100) * k.width : v)), (S = k.y + (~(w[1] || w[0]).indexOf('%') ? (S / 100) * k.height : S))), i || (i !== !1 && o.smooth) ? ((y = v - u), (b = S - c), (o.xOffset = p + (y * f + b * d) - y), (o.yOffset = h + (y * _ + b * m) - b)) : (o.xOffset = o.yOffset = 0), (o.xOrigin = v), (o.yOrigin = S), (o.smooth = !!i), (o.origin = e), (o.originIsAbsolute = !!r), (t.style[Ie] = '0px 0px'), s && (pr(s, o, 'xOrigin', u, v), pr(s, o, 'yOrigin', c, S), pr(s, o, 'xOffset', p, o.xOffset), pr(s, o, 'yOffset', h, o.yOffset)), t.setAttribute('data-svg-origin', v + ' ' + S)
	},
	rn = function (t, e) {
		var r = t._gsap || new Ya(t)
		if ('x' in r && !e && !r.uncache) return r
		var i = t.style,
			n = r.scaleX < 0,
			s = 'px',
			o = 'deg',
			l = getComputedStyle(t),
			u = He(t, Ie) || '0',
			c,
			p,
			h,
			f,
			_,
			d,
			m,
			y,
			b,
			w,
			v,
			S,
			k,
			T,
			C,
			P,
			M,
			A,
			E,
			H,
			Y,
			B,
			X,
			z,
			Z,
			J,
			g,
			rt,
			Wt,
			Ee,
			ct,
			zt
		return (
			(c = p = h = d = m = y = b = w = v = 0),
			(f = _ = 1),
			(r.svg = !!(t.getCTM && tl(t))),
			l.translate && ((l.translate !== 'none' || l.scale !== 'none' || l.rotate !== 'none') && (i[ut] = (l.translate !== 'none' ? 'translate3d(' + (l.translate + ' 0 0').split(' ').slice(0, 3).join(', ') + ') ' : '') + (l.rotate !== 'none' ? 'rotate(' + l.rotate + ') ' : '') + (l.scale !== 'none' ? 'scale(' + l.scale.split(' ').join(',') + ') ' : '') + (l[ut] !== 'none' ? l[ut] : '')), (i.scale = i.rotate = i.translate = 'none')),
			(T = ao(t, r.svg)),
			r.svg && (r.uncache ? ((Z = t.getBBox()), (u = r.xOrigin - Z.x + 'px ' + (r.yOrigin - Z.y) + 'px'), (z = '')) : (z = !e && t.getAttribute('data-svg-origin')), Rs(t, z || u, !!z || r.originIsAbsolute, r.smooth !== !1, T)),
			(S = r.xOrigin || 0),
			(k = r.yOrigin || 0),
			T !== en &&
				((A = T[0]),
				(E = T[1]),
				(H = T[2]),
				(Y = T[3]),
				(c = B = T[4]),
				(p = X = T[5]),
				T.length === 6
					? ((f = Math.sqrt(A * A + E * E)), (_ = Math.sqrt(Y * Y + H * H)), (d = A || E ? ti(E, A) * Ar : 0), (b = H || Y ? ti(H, Y) * Ar + d : 0), b && (_ *= Math.abs(Math.cos(b * fi))), r.svg && ((c -= S - (S * A + k * H)), (p -= k - (S * E + k * Y))))
					: ((zt = T[6]),
					  (Ee = T[7]),
					  (g = T[8]),
					  (rt = T[9]),
					  (Wt = T[10]),
					  (ct = T[11]),
					  (c = T[12]),
					  (p = T[13]),
					  (h = T[14]),
					  (C = ti(zt, Wt)),
					  (m = C * Ar),
					  C && ((P = Math.cos(-C)), (M = Math.sin(-C)), (z = B * P + g * M), (Z = X * P + rt * M), (J = zt * P + Wt * M), (g = B * -M + g * P), (rt = X * -M + rt * P), (Wt = zt * -M + Wt * P), (ct = Ee * -M + ct * P), (B = z), (X = Z), (zt = J)),
					  (C = ti(-H, Wt)),
					  (y = C * Ar),
					  C && ((P = Math.cos(-C)), (M = Math.sin(-C)), (z = A * P - g * M), (Z = E * P - rt * M), (J = H * P - Wt * M), (ct = Y * M + ct * P), (A = z), (E = Z), (H = J)),
					  (C = ti(E, A)),
					  (d = C * Ar),
					  C && ((P = Math.cos(C)), (M = Math.sin(C)), (z = A * P + E * M), (Z = B * P + X * M), (E = E * P - A * M), (X = X * P - B * M), (A = z), (B = Z)),
					  m && Math.abs(m) + Math.abs(d) > 359.9 && ((m = d = 0), (y = 180 - y)),
					  (f = gt(Math.sqrt(A * A + E * E + H * H))),
					  (_ = gt(Math.sqrt(X * X + zt * zt))),
					  (C = ti(B, X)),
					  (b = Math.abs(C) > 2e-4 ? C * Ar : 0),
					  (v = ct ? 1 / (ct < 0 ? -ct : ct) : 0)),
				r.svg && ((z = t.getAttribute('transform')), (r.forceCSS = t.setAttribute('transform', '') || !rl(He(t, ut))), z && t.setAttribute('transform', z))),
			Math.abs(b) > 90 && Math.abs(b) < 270 && (n ? ((f *= -1), (b += d <= 0 ? 180 : -180), (d += d <= 0 ? 180 : -180)) : ((_ *= -1), (b += b <= 0 ? 180 : -180))),
			(e = e || r.uncache),
			(r.x = c - ((r.xPercent = c && ((!e && r.xPercent) || (Math.round(t.offsetWidth / 2) === Math.round(-c) ? -50 : 0))) ? (t.offsetWidth * r.xPercent) / 100 : 0) + s),
			(r.y = p - ((r.yPercent = p && ((!e && r.yPercent) || (Math.round(t.offsetHeight / 2) === Math.round(-p) ? -50 : 0))) ? (t.offsetHeight * r.yPercent) / 100 : 0) + s),
			(r.z = h + s),
			(r.scaleX = gt(f)),
			(r.scaleY = gt(_)),
			(r.rotation = gt(d) + o),
			(r.rotationX = gt(m) + o),
			(r.rotationY = gt(y) + o),
			(r.skewX = b + o),
			(r.skewY = w + o),
			(r.transformPerspective = v + s),
			(r.zOrigin = parseFloat(u.split(' ')[2]) || 0) && (i[Ie] = $n(u)),
			(r.xOffset = r.yOffset = 0),
			(r.force3D = ye.force3D),
			(r.renderTransform = r.svg ? hc : ja ? il : fc),
			(r.uncache = 0),
			r
		)
	},
	$n = function (t) {
		return (t = t.split(' '))[0] + ' ' + t[1]
	},
	cs = function (t, e, r) {
		var i = Yt(e)
		return gt(parseFloat(e) + parseFloat(br(t, 'x', r + 'px', i))) + i
	},
	fc = function (t, e) {
		;(e.z = '0px'), (e.rotationY = e.rotationX = '0deg'), (e.force3D = 0), il(t, e)
	},
	Er = '0deg',
	Mi = '0px',
	Dr = ') ',
	il = function (t, e) {
		var r = e || this,
			i = r.xPercent,
			n = r.yPercent,
			s = r.x,
			o = r.y,
			l = r.z,
			u = r.rotation,
			c = r.rotationY,
			p = r.rotationX,
			h = r.skewX,
			f = r.skewY,
			_ = r.scaleX,
			d = r.scaleY,
			m = r.transformPerspective,
			y = r.force3D,
			b = r.target,
			w = r.zOrigin,
			v = '',
			S = (y === 'auto' && t && t !== 1) || y === !0
		if (w && (p !== Er || c !== Er)) {
			var k = parseFloat(c) * fi,
				T = Math.sin(k),
				C = Math.cos(k),
				P
			;(k = parseFloat(p) * fi), (P = Math.cos(k)), (s = cs(b, s, T * P * -w)), (o = cs(b, o, -Math.sin(k) * -w)), (l = cs(b, l, C * P * -w + w))
		}
		m !== Mi && (v += 'perspective(' + m + Dr), (i || n) && (v += 'translate(' + i + '%, ' + n + '%) '), (S || s !== Mi || o !== Mi || l !== Mi) && (v += l !== Mi || S ? 'translate3d(' + s + ', ' + o + ', ' + l + ') ' : 'translate(' + s + ', ' + o + Dr), u !== Er && (v += 'rotate(' + u + Dr), c !== Er && (v += 'rotateY(' + c + Dr), p !== Er && (v += 'rotateX(' + p + Dr), (h !== Er || f !== Er) && (v += 'skew(' + h + ', ' + f + Dr), (_ !== 1 || d !== 1) && (v += 'scale(' + _ + ', ' + d + Dr), (b.style[ut] = v || 'translate(0, 0)')
	},
	hc = function (t, e) {
		var r = e || this,
			i = r.xPercent,
			n = r.yPercent,
			s = r.x,
			o = r.y,
			l = r.rotation,
			u = r.skewX,
			c = r.skewY,
			p = r.scaleX,
			h = r.scaleY,
			f = r.target,
			_ = r.xOrigin,
			d = r.yOrigin,
			m = r.xOffset,
			y = r.yOffset,
			b = r.forceCSS,
			w = parseFloat(s),
			v = parseFloat(o),
			S,
			k,
			T,
			C,
			P
		;(l = parseFloat(l)), (u = parseFloat(u)), (c = parseFloat(c)), c && ((c = parseFloat(c)), (u += c), (l += c)), l || u ? ((l *= fi), (u *= fi), (S = Math.cos(l) * p), (k = Math.sin(l) * p), (T = Math.sin(l - u) * -h), (C = Math.cos(l - u) * h), u && ((c *= fi), (P = Math.tan(u - c)), (P = Math.sqrt(1 + P * P)), (T *= P), (C *= P), c && ((P = Math.tan(c)), (P = Math.sqrt(1 + P * P)), (S *= P), (k *= P))), (S = gt(S)), (k = gt(k)), (T = gt(T)), (C = gt(C))) : ((S = p), (C = h), (k = T = 0)), ((w && !~(s + '').indexOf('px')) || (v && !~(o + '').indexOf('px'))) && ((w = br(f, 'x', s, 'px')), (v = br(f, 'y', o, 'px'))), (_ || d || m || y) && ((w = gt(w + _ - (_ * S + d * T) + m)), (v = gt(v + d - (_ * k + d * C) + y))), (i || n) && ((P = f.getBBox()), (w = gt(w + (i / 100) * P.width)), (v = gt(v + (n / 100) * P.height))), (P = 'matrix(' + S + ',' + k + ',' + T + ',' + C + ',' + w + ',' + v + ')'), f.setAttribute('transform', P), b && (f.style[ut] = P)
	},
	dc = function (t, e, r, i, n) {
		var s = 360,
			o = Et(n),
			l = parseFloat(n) * (o && ~n.indexOf('rad') ? Ar : 1),
			u = l - i,
			c = i + u + 'deg',
			p,
			h
		return o && ((p = n.split('_')[1]), p === 'short' && ((u %= s), u !== u % (s / 2) && (u += u < 0 ? s : -s)), p === 'cw' && u < 0 ? (u = ((u + s * Mo) % s) - ~~(u / s) * s) : p === 'ccw' && u > 0 && (u = ((u - s * Mo) % s) - ~~(u / s) * s)), (t._pt = h = new oe(t._pt, e, r, i, u, Zu)), (h.e = c), (h.u = 'deg'), t._props.push(r), h
	},
	zo = function (t, e) {
		for (var r in e) t[r] = e[r]
		return t
	},
	pc = function (t, e, r) {
		var i = zo({}, r._gsap),
			n = 'perspective,force3D,transformOrigin,svgOrigin',
			s = r.style,
			o,
			l,
			u,
			c,
			p,
			h,
			f,
			_
		i.svg ? ((u = r.getAttribute('transform')), r.setAttribute('transform', ''), (s[ut] = e), (o = rn(r, 1)), tn(r, ut), r.setAttribute('transform', u)) : ((u = getComputedStyle(r)[ut]), (s[ut] = e), (o = rn(r, 1)), (s[ut] = u))
		for (l in or) (u = i[l]), (c = o[l]), u !== c && n.indexOf(l) < 0 && ((f = Yt(u)), (_ = Yt(c)), (p = f !== _ ? br(r, l, u, _) : parseFloat(u)), (h = parseFloat(c)), (t._pt = new oe(t._pt, o, l, p, h - p, Es)), (t._pt.u = _ || 0), t._props.push(l))
		zo(o, i)
	}
se('padding,margin,Width,Radius', function (a, t) {
	var e = 'Top',
		r = 'Right',
		i = 'Bottom',
		n = 'Left',
		s = (t < 3 ? [e, r, i, n] : [e + n, e + r, i + r, i + n]).map(function (o) {
			return t < 2 ? a + o : 'border' + o + a
		})
	Vn[t > 1 ? 'border' + a : a] = function (o, l, u, c, p) {
		var h, f
		if (arguments.length < 4)
			return (
				(h = s.map(function (_) {
					return tr(o, _, u)
				})),
				(f = h.join(' ')),
				f.split(h[0]).length === 5 ? h[0] : f
			)
		;(h = (c + '').split(' ')),
			(f = {}),
			s.forEach(function (_, d) {
				return (f[_] = h[d] = h[d] || h[((d - 1) / 2) | 0])
			}),
			o.init(l, f, p)
	}
})
var nl = {
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
			p,
			h,
			f,
			_,
			d,
			m,
			y,
			b,
			w,
			v,
			S,
			k,
			T,
			C
		no || As(), (this.styles = this.styles || Qa(t)), (C = this.styles.props), (this.tween = r)
		for (d in e)
			if (d !== 'autoRound' && ((c = e[d]), !(pe[d] && Xa(d, e, r, i, t, n)))) {
				if (((f = typeof c), (_ = Vn[d]), f === 'function' && ((c = c.call(r, i, t, n)), (f = typeof c)), f === 'string' && ~c.indexOf('random(') && (c = ji(c)), _)) _(this, t, d, c, r) && (T = 1)
				else if (d.substr(0, 2) === '--') (u = (getComputedStyle(t).getPropertyValue(d) + '').trim()), (c += ''), (vr.lastIndex = 0), vr.test(u) || ((m = Yt(u)), (y = Yt(c))), y ? m !== y && (u = br(t, d, u, y) + y) : m && (c += m), this.add(o, 'setProperty', u, c, i, n, 0, 0, d), s.push(d), C.push(d, 0, o[d])
				else if (f !== 'undefined') {
					if ((l && d in l ? ((u = typeof l[d] == 'function' ? l[d].call(r, i, t, n) : l[d]), Et(u) && ~u.indexOf('random(') && (u = ji(u)), Yt(u + '') || (u += ye.units[d] || Yt(tr(t, d)) || ''), (u + '').charAt(1) === '=' && (u = tr(t, d))) : (u = tr(t, d)), (h = parseFloat(u)), (b = f === 'string' && c.charAt(1) === '=' && c.substr(0, 2)), b && (c = c.substr(2)), (p = parseFloat(c)), d in Ue && (d === 'autoAlpha' && (h === 1 && tr(t, 'visibility') === 'hidden' && p && (h = 0), C.push('visibility', 0, o.visibility), pr(this, o, 'visibility', h ? 'inherit' : 'hidden', p ? 'inherit' : 'hidden', !p)), d !== 'scale' && d !== 'transform' && ((d = Ue[d]), ~d.indexOf(',') && (d = d.split(',')[0]))), (w = d in or), w)) {
						if ((this.styles.save(d), v || ((S = t._gsap), (S.renderTransform && !e.parseTransform) || rn(t, e.parseTransform), (k = e.smoothOrigin !== !1 && S.smooth), (v = this._pt = new oe(this._pt, o, ut, 0, 1, S.renderTransform, S, 0, -1)), (v.dep = 1)), d === 'scale')) (this._pt = new oe(this._pt, S, 'scaleY', S.scaleY, (b ? ui(S.scaleY, b + p) : p) - S.scaleY || 0, Es)), (this._pt.u = 0), s.push('scaleY', d), (d += 'X')
						else if (d === 'transformOrigin') {
							C.push(Ie, 0, o[Ie]), (c = uc(c)), S.svg ? Rs(t, c, 0, k, 0, this) : ((y = parseFloat(c.split(' ')[2]) || 0), y !== S.zOrigin && pr(this, S, 'zOrigin', S.zOrigin, y), pr(this, o, d, $n(u), $n(c)))
							continue
						} else if (d === 'svgOrigin') {
							Rs(t, c, 1, k, 0, this)
							continue
						} else if (d in el) {
							dc(this, S, d, h, b ? ui(h, b + c) : c)
							continue
						} else if (d === 'smoothOrigin') {
							pr(this, S, 'smooth', S.smooth, c)
							continue
						} else if (d === 'force3D') {
							S[d] = c
							continue
						} else if (d === 'transform') {
							pc(this, c, t)
							continue
						}
					} else d in o || (d = xi(d) || d)
					if (w || ((p || p === 0) && (h || h === 0) && !Ku.test(c) && d in o)) (m = (u + '').substr((h + '').length)), p || (p = 0), (y = Yt(c) || (d in ye.units ? ye.units[d] : m)), m !== y && (h = br(t, d, u, y)), (this._pt = new oe(this._pt, w ? S : o, d, h, (b ? ui(h, b + p) : p) - h, !w && (y === 'px' || d === 'zIndex') && e.autoRound !== !1 ? ju : Es)), (this._pt.u = y || 0), m !== y && y !== '%' && ((this._pt.b = u), (this._pt.r = Qu))
					else if (d in o) lc.call(this, t, d, u, b ? b + c : c)
					else if (d in t) this.add(t, d, u || t[d], b ? b + c : c, i, n)
					else if (d !== 'parseTransform') {
						Ks(d, c)
						continue
					}
					w || (d in o ? C.push(d, 0, o[d]) : C.push(d, 1, u || t[d])), s.push(d)
				}
			}
		T && qa(this)
	},
	render: function (t, e) {
		if (e.tween._time || !so()) for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next)
		else e.styles.revert()
	},
	get: tr,
	aliases: Ue,
	getSetter: function (t, e, r) {
		var i = Ue[e]
		return i && i.indexOf(',') < 0 && (e = i), e in or && e !== Ie && (t._gsap.x || tr(t, 'x')) ? (r && Oo === r ? (e === 'scale' ? rc : ec) : (Oo = r || {}) && (e === 'scale' ? ic : nc)) : t.style && !qs(t.style[e]) ? Ju : ~e.indexOf('-') ? tc : ro(t, e)
	},
	core: {_removeProperty: tn, _getMatrix: ao},
}
ae.utils.checkPrefix = xi
ae.core.getStyleSaver = Qa
;(function (a, t, e, r) {
	var i = se(a + ',' + t + ',' + e, function (n) {
		or[n] = 1
	})
	se(t, function (n) {
		;(ye.units[n] = 'deg'), (el[n] = 1)
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
ae.registerPlugin(nl)
var q = ae.registerPlugin(nl) || ae
q.core.Tween
function Fo(a, t) {
	for (var e = 0; e < t.length; e++) {
		var r = t[e]
		;(r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(a, r.key, r)
	}
}
function _c(a, t, e) {
	return t && Fo(a.prototype, t), e && Fo(a, e), a
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
	_r,
	gr,
	hi,
	sl,
	Rr,
	Vi,
	ol,
	rr,
	Le,
	al,
	ll = function () {
		return Lt || (typeof window < 'u' && (Lt = window.gsap) && Lt.registerPlugin && Lt)
	},
	ul = 1,
	ai = [],
	U = [],
	Ge = [],
	$i = Date.now,
	zs = function (t, e) {
		return e
	},
	gc = function () {
		var t = Vi.core,
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
	Ui = function (t) {
		return !!~ol.indexOf(t)
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
	Un = function (t, e) {
		var r = function i(n) {
			if (n || n === 0) {
				ul && (me.history.scrollRestoration = 'manual')
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
		sc: Un(function (a) {
			return arguments.length ? me.scrollTo(a, wt.sc()) : me.pageXOffset || _r[cn] || gr[cn] || hi[cn] || 0
		}),
	},
	wt = {
		s: fn,
		p: 'top',
		p2: 'Top',
		os: 'bottom',
		os2: 'Bottom',
		d: 'height',
		d2: 'Height',
		a: 'y',
		op: jt,
		sc: Un(function (a) {
			return arguments.length ? me.scrollTo(jt.sc(), a) : me.pageYOffset || _r[fn] || gr[fn] || hi[fn] || 0
		}),
	},
	re = function (t) {
		return Lt.utils.toArray(t)[0] || (typeof t == 'string' && Lt.config().nullTargetWarn !== !1 ? console.warn('Element not found:', t) : null)
	},
	Sr = function (t, e) {
		var r = e.s,
			i = e.sc
		Ui(t) && (t = _r.scrollingElement || gr)
		var n = U.indexOf(t),
			s = i === wt.sc ? 1 : 2
		!~n && (n = U.push(t) - 1), U[n + s] || t.addEventListener('scroll', Fs)
		var o = U[n + s],
			l =
				o ||
				(U[n + s] =
					Un(xr(t, r), !0) ||
					(Ui(t)
						? i
						: Un(function (u) {
								return arguments.length ? (t[r] = u) : t[r]
						  })))
		return (l.target = t), o || (l.smooth = Lt.getProperty(t, 'scrollBehavior') === 'smooth'), l
	},
	Bs = function (t, e, r) {
		var i = t,
			n = t,
			s = $i(),
			o = s,
			l = e || 50,
			u = Math.max(500, l * 3),
			c = function (_, d) {
				var m = $i()
				d || m - s > l ? ((n = i), (i = _), (o = s), (s = m)) : r ? (i += _) : (i = n + ((_ - n) / (m - o)) * (s - o))
			},
			p = function () {
				;(n = i = r ? 0 : i), (o = s = 0)
			},
			h = function (_) {
				var d = o,
					m = n,
					y = $i()
				return (_ || _ === 0) && _ !== i && c(_), s === o || y - o > u ? 0 : ((i + (r ? m : -m)) / ((r ? y : s) - d)) * 1e3
			}
		return {update: c, reset: p, getVelocity: h}
	},
	Ei = function (t, e) {
		return e && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t
	},
	Bo = function (t) {
		var e = Math.max.apply(Math, t),
			r = Math.min.apply(Math, t)
		return Math.abs(e) >= Math.abs(r) ? e : r
	},
	cl = function () {
		;(Vi = Lt.core.globals().ScrollTrigger), Vi && Vi.core && gc()
	},
	fl = function (t) {
		return (
			(Lt = t || ll()),
			Lt &&
				typeof document < 'u' &&
				document.body &&
				((me = window),
				(_r = document),
				(gr = _r.documentElement),
				(hi = _r.body),
				(ol = [me, _r, gr, hi]),
				Lt.utils.clamp,
				(al = Lt.core.context || function () {}),
				(Rr = 'onpointerenter' in hi ? 'pointer' : 'mouse'),
				(sl = xt.isTouch = me.matchMedia && me.matchMedia('(hover: none), (pointer: coarse)').matches ? 1 : 'ontouchstart' in me || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0),
				(Le = xt.eventTypes = ('ontouchstart' in gr ? 'touchstart,touchmove,touchcancel,touchend' : 'onpointerdown' in gr ? 'pointerdown,pointermove,pointercancel,pointerup' : 'mousedown,mousemove,mouseup,mouseup').split(',')),
				setTimeout(function () {
					return (ul = 0)
				}, 500),
				cl(),
				(Ls = 1)),
			Ls
		)
	}
jt.op = wt
U.cache = 0
var xt = (function () {
	function a(e) {
		this.init(e)
	}
	var t = a.prototype
	return (
		(t.init = function (r) {
			Ls || fl(Lt) || console.warn('Please gsap.registerPlugin(Observer)'), Vi || cl()
			var i = r.tolerance,
				n = r.dragMinimum,
				s = r.type,
				o = r.target,
				l = r.lineHeight,
				u = r.debounce,
				c = r.preventDefault,
				p = r.onStop,
				h = r.onStopDelay,
				f = r.ignore,
				_ = r.wheelSpeed,
				d = r.event,
				m = r.onDragStart,
				y = r.onDragEnd,
				b = r.onDrag,
				w = r.onPress,
				v = r.onRelease,
				S = r.onRight,
				k = r.onLeft,
				T = r.onUp,
				C = r.onDown,
				P = r.onChangeX,
				M = r.onChangeY,
				A = r.onChange,
				E = r.onToggleX,
				H = r.onToggleY,
				Y = r.onHover,
				B = r.onHoverEnd,
				X = r.onMove,
				z = r.ignoreCheck,
				Z = r.isNormalizer,
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
				wi = r.onLockAxis
			;(this.target = o = re(o) || gr), (this.vars = r), f && (f = Lt.utils.toArray(f)), (i = i || 1e-9), (n = n || 0), (_ = _ || 1), (zt = zt || 1), (s = s || 'wheel,touch,pointer'), (u = u !== !1), l || (l = parseFloat(me.getComputedStyle(hi).lineHeight) || 22)
			var le,
				xe,
				G,
				bt,
				ue,
				Ye,
				$t,
				x = this,
				Ze = 0,
				nt = 0,
				ar = Sr(o, jt),
				lr = Sr(o, wt),
				Zr = ar(),
				Ut = lr(),
				bi = ~s.indexOf('touch') && !~s.indexOf('pointer') && Le[0] === 'pointerdown',
				ur = Ui(o),
				dt = o.ownerDocument || _r,
				ce = [0, 0, 0],
				qt = [0, 0, 0],
				Si = 0,
				Ht = function () {
					return (Si = $i())
				},
				Xe = function (L, O) {
					return ((x.event = L) && f && ~f.indexOf(L.target)) || (O && bi && L.pointerType !== 'touch') || (z && z(L, O))
				},
				Pi = function () {
					x._vx.reset(), x._vy.reset(), xe.pause(), p && p(x)
				},
				cr = function () {
					var L = (x.deltaX = Bo(ce)),
						O = (x.deltaY = Bo(qt)),
						R = Math.abs(L) >= i,
						F = Math.abs(O) >= i
					A && (R || F) && A(x, L, O, ce, qt), R && (S && x.deltaX > 0 && S(x), k && x.deltaX < 0 && k(x), P && P(x), E && x.deltaX < 0 != Ze < 0 && E(x), (Ze = x.deltaX), (ce[0] = ce[1] = ce[2] = 0)), F && (C && x.deltaY > 0 && C(x), T && x.deltaY < 0 && T(x), M && M(x), H && x.deltaY < 0 != nt < 0 && H(x), (nt = x.deltaY), (qt[0] = qt[1] = qt[2] = 0)), (bt || G) && (X && X(x), G && (b(x), (G = !1)), (bt = !1)), Ye && !(Ye = !1) && wi && wi(x), ue && (rt(x), (ue = !1)), (le = 0)
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
						;(x.x = O), (x.y = R), (St || Math.abs(x.startX - O) >= n || Math.abs(x.startY - R) >= n) && (b && (G = !0), St || (x.isDragging = !0), kr(F, N), St || (m && m(x)))
					}
				},
				$ = (x.onPress = function (I) {
					Xe(I, 1) || (I && I.button) || ((x.axis = $t = null), xe.pause(), (x.isPressed = !0), (I = Ei(I)), (Ze = nt = 0), (x.startX = x.x = I.clientX), (x.startY = x.y = I.clientY), x._vx.reset(), x._vy.reset(), ee(Z ? o : dt, Le[1], Cr, c, !0), (x.deltaX = x.deltaY = 0), w && w(x))
				}),
				Qe = (x.onRelease = function (I) {
					if (!Xe(I, 1)) {
						Kt(Z ? o : dt, Le[1], Cr, !0)
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
									if ($i() - Si > 300 && !I.defaultPrevented) {
										if (I.target.click) I.target.click()
										else if (dt.createEvent) {
											var F = dt.createEvent('MouseEvents')
											F.initMouseEvent('click', !0, !0, me, 1, R.screenX, R.screenY, R.clientX, R.clientY, !1, !1, !1, !1, 0, null), I.target.dispatchEvent(F)
										}
									}
								})),
							(x.isDragging = x.isGesturing = x.isPressed = !1),
							p && !Z && xe.restart(!0),
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
				Te = function (L) {
					if (!Xe(L)) {
						var O = ar(),
							R = lr()
						Qr((O - Zr) * zt, (R - Ut) * zt, 1), (Zr = O), (Ut = R), p && xe.restart(!0)
					}
				},
				Re = function (L) {
					if (!Xe(L)) {
						;(L = Ei(L, c)), rt && (ue = !0)
						var O = (L.deltaMode === 1 ? l : L.deltaMode === 2 ? me.innerHeight : 1) * _
						Qr(L.deltaX * O, L.deltaY * O, 0), p && !Z && xe.restart(!0)
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
				al(this),
				(x.enable = function (I) {
					return x.isEnabled || (ee(ur ? dt : o, 'scroll', Fs), s.indexOf('scroll') >= 0 && ee(ur ? dt : o, 'scroll', Te, c, it), s.indexOf('wheel') >= 0 && ee(o, 'wheel', Re, c, it), ((s.indexOf('touch') >= 0 && sl) || s.indexOf('pointer') >= 0) && (ee(o, Le[0], $, c, it), ee(dt, Le[2], Qe), ee(dt, Le[3], Qe), Ft && ee(o, 'click', Ht, !1, !0), ct && ee(o, 'click', ki), J && ee(dt, 'gesturestart', De), g && ee(dt, 'gestureend', Ae), Y && ee(o, Rr + 'enter', jr), B && ee(o, Rr + 'leave', je), X && ee(o, Rr + 'move', Or)), (x.isEnabled = !0), I && I.type && $(I), Wt && Wt(x)), x
				}),
				(x.disable = function () {
					x.isEnabled &&
						(ai.filter(function (I) {
							return I !== x && Ui(I.target)
						}).length || Kt(ur ? dt : o, 'scroll', Fs),
						x.isPressed && (x._vx.reset(), x._vy.reset(), Kt(Z ? o : dt, Le[1], Cr, !0)),
						Kt(ur ? dt : o, 'scroll', Te, it),
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
				Z && Ui(o) && (rr = x),
				x.enable(d)
		}),
		_c(a, [
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
xt.register = fl
xt.getAll = function () {
	return ai.slice()
}
xt.getById = function (a) {
	return ai.filter(function (t) {
		return t.vars.id === a
	})[0]
}
ll() && Lt.registerPlugin(xt)
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
	K,
	st,
	Fe,
	ft,
	hl,
	qn,
	Hn,
	li,
	Pn,
	hn,
	It,
	Jn,
	Is,
	Zt,
	Io,
	Yo,
	ni,
	dl,
	fs,
	pl,
	he,
	_l,
	gl,
	ml,
	fr,
	Ys,
	lo,
	hs,
	dn = 1,
	Qt = Date.now,
	ds = Qt(),
	Oe = 0,
	Li = 0,
	mc = function a() {
		return Li && requestAnimationFrame(a)
	},
	Xo = function () {
		return (Jn = 1)
	},
	No = function () {
		return (Jn = 0)
	},
	Ve = function (t) {
		return t
	},
	zi = function (t) {
		return Math.round(t * 1e5) / 1e5 || 0
	},
	yl = function () {
		return typeof window < 'u'
	},
	vl = function () {
		return D || (yl() && (D = window.gsap) && D.registerPlugin && D)
	},
	qr = function (t) {
		return !!~hl.indexOf(t)
	},
	xl = function (t) {
		return (
			xr(t, 'getBoundingClientRect') ||
			(qr(t)
				? function () {
						return (Dn.width = K.innerWidth), (Dn.height = K.innerHeight), Dn
				  }
				: function () {
						return er(t)
				  })
		)
	},
	yc = function (t, e, r) {
		var i = r.d,
			n = r.d2,
			s = r.a
		return (s = xr(t, 'getBoundingClientRect'))
			? function () {
					return s()[i]
			  }
			: function () {
					return (e ? K['inner' + n] : t['client' + n]) || 0
			  }
	},
	vc = function (t, e) {
		return !e || ~Ge.indexOf(t)
			? xl(t)
			: function () {
					return Dn
			  }
	},
	mr = function (t, e) {
		var r = e.s,
			i = e.d2,
			n = e.d,
			s = e.a
		return Math.max(0, (r = 'scroll' + i) && (s = xr(t, r)) ? s() - xl(t)()[n] : qr(t) ? (Fe[r] || ft[r]) - (K['inner' + i] || Fe['client' + i] || ft['client' + i]) : t[r] - t['offset' + i])
	},
	pn = function (t, e) {
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
	ps = function (t, e) {
		if (t.enabled) {
			var r = e(t)
			r && r.totalTime && (t.callbackAnimation = r)
		}
	},
	ei = Math.abs,
	Tl = 'left',
	wl = 'top',
	uo = 'right',
	co = 'bottom',
	Wr = 'width',
	Vr = 'height',
	qi = 'Right',
	Hi = 'Left',
	Gi = 'Top',
	Ki = 'Bottom',
	_t = 'padding',
	Se = 'margin',
	Ti = 'Width',
	fo = 'Height',
	At = 'px',
	Be = function (t) {
		return K.getComputedStyle(t)
	},
	xc = function (t) {
		var e = Be(t).position
		t.style.position = e === 'absolute' || e === 'fixed' ? e : 'relative'
	},
	Wo = function (t, e) {
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
	bl = function (t) {
		var e = [],
			r = t.labels,
			i = t.duration(),
			n
		for (n in r) e.push(r[n] / i)
		return e
	},
	Tc = function (t) {
		return function (e) {
			return D.utils.snap(bl(t), e)
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
	wc = function (t) {
		return function (e, r) {
			return ho(bl(t))(e, r.direction)
		}
	},
	_n = function (t, e, r, i) {
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
	Vo = {startColor: 'green', endColor: 'red', indent: 0, fontSize: '16px', fontWeight: 'normal'},
	mn = {toggleActions: 'play', anticipatePin: 0},
	Gn = {top: 0, left: 0, center: 0.5, bottom: 1, right: 1},
	Cn = function (t, e) {
		if (ze(t)) {
			var r = t.indexOf('='),
				i = ~r ? +(t.charAt(r - 1) + 1) * parseFloat(t.substr(r + 1)) : 0
			~r && (t.indexOf('%') > r && (i *= e / 100), (t = t.substr(0, r - 1))), (t = i + (t in Gn ? Gn[t] * e : ~t.indexOf('%') ? (parseFloat(t) * e) / 100 : parseFloat(t) || 0))
		}
		return t
	},
	yn = function (t, e, r, i, n, s, o, l) {
		var u = n.startColor,
			c = n.endColor,
			p = n.fontSize,
			h = n.indent,
			f = n.fontWeight,
			_ = st.createElement('div'),
			d = qr(r) || xr(r, 'pinType') === 'fixed',
			m = t.indexOf('scroller') !== -1,
			y = d ? ft : r,
			b = t.indexOf('start') !== -1,
			w = b ? u : c,
			v = 'border-color:' + w + ';font-size:' + p + ';color:' + w + ';font-weight:' + f + ';pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;'
		return (v += 'position:' + ((m || l) && d ? 'fixed;' : 'absolute;')), (m || l || !d) && (v += (i === wt ? uo : co) + ':' + (s + parseFloat(h)) + 'px;'), o && (v += 'box-sizing:border-box;text-align:left;width:' + o.offsetWidth + 'px;'), (_._isStart = b), _.setAttribute('class', 'gsap-marker-' + t + (e ? ' marker-' + e : '')), (_.style.cssText = v), (_.innerText = e || e === 0 ? t + '-' + e : t), y.children[0] ? y.insertBefore(_, y.children[0]) : y.appendChild(_), (_._offset = _['offset' + i.op.d2]), On(_, 0, i, b), _
	},
	On = function (t, e, r, i) {
		var n = {display: 'block'},
			s = r[i ? 'os2' : 'p2'],
			o = r[i ? 'p2' : 'os2']
		;(t._isFlipped = i), (n[r.a + 'Percent'] = i ? -100 : 0), (n[r.a] = i ? '1px' : 0), (n['border' + s + Ti] = 1), (n['border' + o + Ti] = 0), (n[r.p] = e + 'px'), D.set(t, n)
	},
	W = [],
	Ns = {},
	nn,
	$o = function () {
		return Qt() - Oe > 34 && (nn || (nn = requestAnimationFrame(ir)))
	},
	ri = function () {
		;(!he || !he.isPressed || he.startX > ft.clientWidth) && (U.cache++, he ? nn || (nn = requestAnimationFrame(ir)) : ir(), Oe || Gr('scrollStart'), (Oe = Qt()))
	},
	_s = function () {
		;(ml = K.innerWidth), (gl = K.innerHeight)
	},
	Bi = function () {
		U.cache++, !It && !pl && !st.fullscreenElement && !st.webkitFullscreenElement && (!_l || ml !== K.innerWidth || Math.abs(K.innerHeight - gl) > K.innerHeight * 0.25) && qn.restart(!0)
	},
	Hr = {},
	bc = [],
	Sl = function a() {
		return Ot(V, 'scrollEnd', a) || Br(!0)
	},
	Gr = function (t) {
		return (
			(Hr[t] &&
				Hr[t].map(function (e) {
					return e()
				})) ||
			bc
		)
	},
	de = [],
	Pl = function (t) {
		for (var e = 0; e < de.length; e += 5) (!t || (de[e + 4] && de[e + 4].query === t)) && ((de[e].style.cssText = de[e + 1]), de[e].getBBox && de[e].setAttribute('transform', de[e + 2] || ''), (de[e + 3].uncache = 1))
	},
	po = function (t, e) {
		var r
		for (Zt = 0; Zt < W.length; Zt++) (r = W[Zt]), r && (!e || r._ctx === e) && (t ? r.kill(1) : r.revert(!0, !0))
		e && Pl(e), e || Gr('revert')
	},
	kl = function (t, e) {
		U.cache++,
			(e || !_e) &&
				U.forEach(function (r) {
					return Jt(r) && r.cacheID++ && (r.rec = 0)
				}),
			ze(t) && (K.history.scrollRestoration = lo = t)
	},
	_e,
	$r = 0,
	Uo,
	Sc = function () {
		if (Uo !== $r) {
			var t = (Uo = $r)
			requestAnimationFrame(function () {
				return t === $r && Br(!0)
			})
		}
	},
	Br = function (t, e) {
		if (Oe && !t) {
			Mt(V, 'scrollEnd', Sl)
			return
		}
		;(_e = V.isRefreshing = !0),
			U.forEach(function (i) {
				return Jt(i) && i.cacheID++ && (i.rec = i())
			})
		var r = Gr('refreshInit')
		dl && V.sort(),
			e || po(),
			U.forEach(function (i) {
				Jt(i) && (i.smooth && (i.target.style.scrollBehavior = 'auto'), i(0))
			}),
			W.slice(0).forEach(function (i) {
				return i.refresh()
			}),
			W.forEach(function (i, n) {
				if (i._subPinOffset && i.pin) {
					var s = i.vars.horizontal ? 'offsetWidth' : 'offsetHeight',
						o = i.pin[s]
					i.revert(!0, 1), i.adjustPinSpacing(i.pin[s] - o), i.refresh()
				}
			}),
			W.forEach(function (i) {
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
			kl(lo, 1),
			qn.pause(),
			$r++,
			(_e = 2),
			ir(2),
			W.forEach(function (i) {
				return Jt(i.vars.onRefresh) && i.vars.onRefresh(i)
			}),
			(_e = V.isRefreshing = !1),
			Gr('refresh')
	},
	Ws = 0,
	Mn = 1,
	Zi,
	ir = function (t) {
		if (!_e || t === 2) {
			;(V.isUpdating = !0), Zi && Zi.update(0)
			var e = W.length,
				r = Qt(),
				i = r - ds >= 50,
				n = e && W[0].scroll()
			if (((Mn = Ws > n ? -1 : 1), _e || (Ws = n), i && (Oe && !Jn && r - Oe > 200 && ((Oe = 0), Gr('scrollEnd')), (Pn = ds), (ds = r)), Mn < 0)) {
				for (Zt = e; Zt-- > 0; ) W[Zt] && W[Zt].update(0, i)
				Mn = 1
			} else for (Zt = 0; Zt < e; Zt++) W[Zt] && W[Zt].update(0, i)
			V.isUpdating = !1
		}
		nn = 0
	},
	Vs = [Tl, wl, co, uo, Se + Ki, Se + qi, Se + Gi, Se + Hi, 'display', 'flexShrink', 'float', 'zIndex', 'gridColumnStart', 'gridColumnEnd', 'gridRowStart', 'gridRowEnd', 'gridArea', 'justifySelf', 'alignSelf', 'placeSelf', 'order'],
	En = Vs.concat([Wr, Vr, 'boxSizing', 'max' + Ti, 'max' + fo, 'position', Se, _t, _t + Gi, _t + qi, _t + Ki, _t + Hi]),
	Pc = function (t, e, r) {
		di(r)
		var i = t._gsap
		if (i.spacerIsNative) di(i.spacerState)
		else if (t._gsap.swappedIn) {
			var n = e.parentNode
			n && (n.insertBefore(t, e), n.removeChild(e))
		}
		t._gsap.swappedIn = !1
	},
	gs = function (t, e, r, i) {
		if (!t._gsap.swappedIn) {
			for (var n = Vs.length, s = e.style, o = t.style, l; n--; ) (l = Vs[n]), (s[l] = r[l])
			;(s.position = r.position === 'absolute' ? 'absolute' : 'relative'), r.display === 'inline' && (s.display = 'inline-block'), (o[co] = o[uo] = 'auto'), (s.flexBasis = r.flexBasis || 'auto'), (s.overflow = 'visible'), (s.boxSizing = 'border-box'), (s[Wr] = Xs(t, jt) + At), (s[Vr] = Xs(t, wt) + At), (s[_t] = o[Se] = o[wl] = o[Tl] = '0'), di(i), (o[Wr] = o['max' + Ti] = r[Wr]), (o[Vr] = o['max' + fo] = r[Vr]), (o[_t] = r[_t]), t.parentNode !== e && (t.parentNode.insertBefore(e, t), e.appendChild(t)), (t._gsap.swappedIn = !0)
		}
	},
	kc = /([A-Z])/g,
	di = function (t) {
		if (t) {
			var e = t.t.style,
				r = t.length,
				i = 0,
				n,
				s
			for ((t.t._gsap || D.core.getCache(t.t)).uncache = 1; i < r; i += 2) (s = t[i + 1]), (n = t[i]), s ? (e[n] = s) : e[n] && e.removeProperty(n.replace(kc, '-$1').toLowerCase())
		}
	},
	vn = function (t) {
		for (var e = En.length, r = t.style, i = [], n = 0; n < e; n++) i.push(En[n], r[En[n]])
		return (i.t = t), i
	},
	Cc = function (t, e, r) {
		for (var i = [], n = t.length, s = r ? 8 : 0, o; s < n; s += 2) (o = t[s]), i.push(o, o in e ? e[o] : t[s + 1])
		return (i.t = t.t), i
	},
	Dn = {left: 0, top: 0},
	qo = function (t, e, r, i, n, s, o, l, u, c, p, h, f) {
		Jt(t) && (t = t(l)), ze(t) && t.substr(0, 3) === 'max' && (t = h + (t.charAt(4) === '=' ? Cn('0' + t.substr(3), r) : 0))
		var _ = f ? f.time() : 0,
			d,
			m,
			y
		if ((f && f.seek(0), Fi(t))) f && (t = D.utils.mapRange(f.scrollTrigger.start, f.scrollTrigger.end, 0, h, t)), o && On(o, r, i, !0)
		else {
			Jt(e) && (e = e(l))
			var b = (t || '0').split(' '),
				w,
				v,
				S,
				k
			;(y = re(e) || ft), (w = er(y) || {}), (!w || (!w.left && !w.top)) && Be(y).display === 'none' && ((k = y.style.display), (y.style.display = 'block'), (w = er(y)), k ? (y.style.display = k) : y.style.removeProperty('display')), (v = Cn(b[0], w[i.d])), (S = Cn(b[1] || '0', r)), (t = w[i.p] - u[i.p] - c + v + n - S), o && On(o, S, i, r - S < 20 || (o._isStart && S > 20)), (r -= r - S)
		}
		if (s) {
			var T = t + r,
				C = s._isStart
			;(d = 'scroll' + i.d2), On(s, T, i, (C && T > 20) || (!C && (p ? Math.max(ft[d], Fe[d]) : s.parentNode[d]) <= T + 1)), p && ((u = er(o)), p && (s.style[i.op.p] = u[i.op.p] - i.op.m - s._offset + At))
		}
		return f && y && ((d = er(y)), f.seek(h), (m = er(y)), (f._caScrollDist = d[i.p] - m[i.p]), (t = (t / f._caScrollDist) * h)), f && f.seek(_), f ? t : Math.round(t)
	},
	Oc = /(webkit|moz|length|cssText|inset)/i,
	Ho = function (t, e, r, i) {
		if (t.parentNode !== e) {
			var n = t.style,
				s,
				o
			if (e === ft) {
				;(t._stOrig = n.cssText), (o = Be(t))
				for (s in o) !+s && !Oc.test(s) && o[s] && typeof n[s] == 'string' && s !== '0' && (n[s] = o[s])
				;(n.top = r), (n.left = i)
			} else n.cssText = t._stOrig
			;(D.core.getCache(t).uncache = 1), e.appendChild(t)
		}
	},
	Cl = function (t, e, r) {
		var i = e,
			n = i
		return function (s) {
			var o = Math.round(t())
			return o !== i && o !== n && Math.abs(o - i) > 3 && Math.abs(o - n) > 3 && ((s = o), r && r()), (n = i), (i = s), s
		}
	},
	Go = function (t, e) {
		var r = Sr(t, e),
			i = '_scroll' + e.p2,
			n = function s(o, l, u, c, p) {
				var h = s.tween,
					f = l.onComplete,
					_ = {}
				u = u || r()
				var d = Cl(r, u, function () {
					h.kill(), (s.tween = 0)
				})
				return (
					(p = (c && p) || 0),
					(c = c || o - u),
					h && h.kill(),
					(l[i] = o),
					(l.modifiers = _),
					(_[i] = function () {
						return d(u + c * h.ratio + p * h.ratio * h.ratio)
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
			V.isTouch && Mt(t, 'touchmove', r.wheelHandler),
			n
		)
	},
	V = (function () {
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
				r = Wo(ze(r) || Fi(r) || r.nodeType ? {trigger: r} : r, mn)
				var n = r,
					s = n.onUpdate,
					o = n.toggleClass,
					l = n.id,
					u = n.onToggle,
					c = n.onRefresh,
					p = n.scrub,
					h = n.trigger,
					f = n.pin,
					_ = n.pinSpacing,
					d = n.invalidateOnRefresh,
					m = n.anticipatePin,
					y = n.onScrubComplete,
					b = n.onSnapComplete,
					w = n.once,
					v = n.snap,
					S = n.pinReparent,
					k = n.pinSpacer,
					T = n.containerAnimation,
					C = n.fastScrollEnd,
					P = n.preventOverlaps,
					M = r.horizontal || (r.containerAnimation && r.horizontal !== !1) ? jt : wt,
					A = !p && p !== 0,
					E = re(r.scroller || K),
					H = D.core.getCache(E),
					Y = qr(E),
					B = ('pinType' in r ? r.pinType : xr(E, 'pinType') || (Y && 'fixed')) === 'fixed',
					X = [r.onEnter, r.onLeave, r.onEnterBack, r.onLeaveBack],
					z = A && r.toggleActions.split(' '),
					Z = 'markers' in r ? r.markers : mn.markers,
					J = Y ? 0 : parseFloat(Be(E)['border' + M.p2 + Ti]) || 0,
					g = this,
					rt =
						r.onRefreshInit &&
						function () {
							return r.onRefreshInit(g)
						},
					Wt = yc(E, Y, M),
					Ee = vc(E, Y),
					ct = 0,
					zt = 0,
					it = Sr(E, M),
					Ft,
					Vt,
					wi,
					le,
					xe,
					G,
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
					Te,
					Re,
					Or,
					jr,
					je
				if (
					(Ys(g),
					(g._dir = M),
					(m *= 45),
					(g.scroller = E),
					(g.scroll = T ? T.time.bind(T) : it),
					(le = it()),
					(g.vars = r),
					(i = i || r.animation),
					'refreshPriority' in r && ((dl = 1), r.refreshPriority === -9999 && (Zi = g)),
					(H.tweenScroll = H.tweenScroll || {top: Go(E, wt), left: Go(E, jt)}),
					(g.tweenTo = Ft = H.tweenScroll[M.p]),
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
					i && ((i.vars.lazy = !1), i._initted || (i.vars.immediateRender !== !1 && r.immediateRender !== !1 && i.duration() && i.render(0, !0, !0)), (g.animation = i.pause()), (i.scrollTrigger = g), g.scrubDuration(p), $ && $.resetTo && $.resetTo('totalProgress', 0), (kr = 0), l || (l = i.vars.id)),
					W.push(g),
					v &&
						((!kn(v) || v.push) && (v = {snapTo: v}),
						'scrollBehavior' in ft.style && D.set(Y ? [ft, Fe] : E, {scrollBehavior: 'auto'}),
						U.forEach(function (O) {
							return Jt(O) && O.target === (Y ? st.scrollingElement || Fe : E) && (O.smooth = !1)
						}),
						(wi = Jt(v.snapTo)
							? v.snapTo
							: v.snapTo === 'labels'
							? Tc(i)
							: v.snapTo === 'labelsDirectional'
							? wc(i)
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
								var N = (O - G) / nt,
									St = i && !A ? i.totalProgress() : N,
									j = R ? 0 : ((St - Cr) / (Qt() - Pn)) * 1e3 || 0,
									ot = D.utils.clamp(-N, 1 - N, (ei(j / 2) * j) / 0.185),
									Dt = N + (v.inertia === !1 ? 0 : ot),
									Pt = li(0, 1, wi(Dt, g)),
									mt = Math.round(G + Pt * nt),
									at = v,
									fe = at.onStart,
									Gt = at.onInterrupt,
									kt = at.onComplete
								if (O <= bt && O >= G && mt !== O) {
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
					f && (_ === !1 || _ === Se || (_ = !_ && f.parentNode && f.parentNode.style && Be(f.parentNode).display === 'flex' ? !1 : _t), (g.pin = f), (Vt = D.core.getCache(f)), Vt.spacer ? (ar = Vt.pinState) : (k && ((k = re(k)), k && !k.nodeType && (k = k.current || k.nativeElement), (Vt.spacerIsNative = !!k), k && (Vt.spacerState = vn(k))), (Vt.spacer = Ut = k || st.createElement('div')), Ut.classList.add('pin-spacer'), l && Ut.classList.add('pin-spacer-' + l), (Vt.pinState = ar = vn(f))), r.force3D !== !1 && D.set(f, {force3D: !0}), (g.spacer = Ut = Vt.spacer), (Qr = Be(f)), (Si = Qr[_ + M.os2]), (ur = D.getProperty(f)), (dt = D.quickSetter(f, M.a, At)), gs(f, Ut, Qr), (Zr = vn(f))),
					Z)
				) {
					;(Ze = kn(Z) ? Wo(Z, Vo) : Vo), ($t = yn('scroller-start', l, E, M, Ze, 0)), (x = yn('scroller-end', l, E, M, Ze, 0, $t)), (bi = $t['offset' + M.op.d2])
					var ki = re(xr(E, 'content') || E)
					;(ue = this.markerStart = yn('start', l, ki, M, Ze, bi, 0, T)), (Ye = this.markerEnd = yn('end', l, ki, M, Ze, bi, 0, T)), T && (jr = D.quickSetter([ue, Ye], M.a, At)), !B && !(Ge.length && xr(E, 'fixedMarkers') === !0) && (xc(Y ? ft : E), D.set([$t, x], {force3D: !0}), (Xe = D.quickSetter($t, M.a, At)), (cr = D.quickSetter(x, M.a, At)))
				}
				if (T) {
					var I = T.vars.onUpdate,
						L = T.vars.onUpdateParams
					T.eventCallback('onUpdate', function () {
						g.update(0, 0, 1), I && I.apply(T, L || [])
					})
				}
				;(g.previous = function () {
					return W[W.indexOf(g) - 1]
				}),
					(g.next = function () {
						return W[W.indexOf(g) + 1]
					}),
					(g.revert = function (O, R) {
						if (!R) return g.kill(!0)
						var F = O !== !1 || !g.enabled,
							N = It
						F !== g.isReverted &&
							(F && ((Re = Math.max(it(), g.scroll.rec || 0)), (Te = g.progress), (Or = i && i.progress())),
							ue &&
								[ue, Ye, $t, x].forEach(function (St) {
									return (St.style.display = F ? 'none' : 'block')
								}),
							F && ((It = g), g.update(F)),
							f && (!S || !g.isActive) && (F ? Pc(f, Ut, ar) : gs(f, Ut, Be(f), Ht)),
							F || g.update(F),
							(It = N),
							(g.isReverted = F))
					}),
					(g.refresh = function (O, R) {
						if (!((It || !g.enabled) && !R)) {
							if (f && O && Oe) {
								Mt(a, 'scrollEnd', Sl)
								return
							}
							!_e && rt && rt(g), (It = g), (zt = Qt()), Ft.tween && (Ft.tween.kill(), (Ft.tween = 0)), $ && $.pause(), d && i && i.revert({kill: !1}).invalidate(), g.isReverted || g.revert(!0, !0), (g._subPinOffset = !1)
							for (var F = Wt(), N = Ee(), St = T ? T.duration() : mr(E, M), j = nt <= 0.01, ot = 0, Dt = 0, Pt = r.end, mt = r.endTrigger || h, at = r.start || (r.start === 0 || !h ? 0 : f ? '0 0' : '0 100%'), fe = (g.pinnedContainer = r.pinnedContainer && re(r.pinnedContainer)), Gt = (h && Math.max(0, W.indexOf(g))) || 0, kt = Gt, pt, Bt, Jr, Mr, yt, Ct, Ne, ts, go, Ci, We; kt--; ) (Ct = W[kt]), Ct.end || Ct.refresh(0, 1) || (It = g), (Ne = Ct.pin), Ne && (Ne === h || Ne === f || Ne === fe) && !Ct.isReverted && (Ci || (Ci = []), Ci.unshift(Ct), Ct.revert(!0, !0)), Ct !== W[kt] && (Gt--, kt--)
							for (Jt(at) && (at = at(g)), G = qo(at, h, F, M, it(), ue, $t, g, N, J, B, St, T) || (f ? -0.001 : 0), Jt(Pt) && (Pt = Pt(g)), ze(Pt) && !Pt.indexOf('+=') && (~Pt.indexOf(' ') ? (Pt = (ze(at) ? at.split(' ')[0] : '') + Pt) : ((ot = Cn(Pt.substr(2), F)), (Pt = ze(at) ? at : (T ? D.utils.mapRange(0, T.duration(), T.scrollTrigger.start, T.scrollTrigger.end, G) : G) + ot), (mt = h))), bt = Math.max(G, qo(Pt || (mt ? '100% 0' : St), mt, F, M, it() + ot, Ye, x, g, N, J, B, St, T)) || -0.001, nt = bt - G || ((G -= 0.01) && 0.001), ot = 0, kt = Gt; kt--; ) (Ct = W[kt]), (Ne = Ct.pin), Ne && Ct.start - Ct._pinPush <= G && !T && Ct.end > 0 && ((pt = Ct.end - Ct.start), ((Ne === h && Ct.start - Ct._pinPush < G) || Ne === fe) && !Fi(at) && (ot += pt * (1 - Ct.progress)), Ne === f && (Dt += pt))
							if (((G += ot), (bt += ot), j && (Te = D.utils.clamp(0, 1, D.utils.normalize(G, bt, Re))), (g._pinPush = Dt), ue && ot && ((pt = {}), (pt[M.a] = '+=' + ot), fe && (pt[M.p] = '-=' + it()), D.set([ue, Ye], pt)), f))
								(pt = Be(f)),
									(Mr = M === wt),
									(Jr = it()),
									(ce = parseFloat(ur(M.a)) + Dt),
									!St && bt > 1 && ((We = (Y ? st.scrollingElement || Fe : E).style), (We = {style: We, value: We['overflow' + M.a.toUpperCase()]}), (We.style['overflow' + M.a.toUpperCase()] = 'scroll')),
									gs(f, Ut, pt),
									(Zr = vn(f)),
									(Bt = er(f, !0)),
									(ts = B && Sr(E, Mr ? jt : wt)()),
									_ &&
										((Ht = [_ + M.os2, nt + Dt + At]),
										(Ht.t = Ut),
										(kt = _ === _t ? Xs(f, M) + nt + Dt : 0),
										kt && Ht.push(M.d, kt + At),
										di(Ht),
										fe &&
											W.forEach(function (Oi) {
												Oi.pin === fe && Oi.vars.pinSpacing !== !1 && (Oi._subPinOffset = !0)
											}),
										B && it(Re)),
									B && ((yt = {top: Bt.top + (Mr ? Jr - G : ts) + At, left: Bt.left + (Mr ? ts : Jr - G) + At, boxSizing: 'border-box', position: 'fixed'}), (yt[Wr] = yt['max' + Ti] = Math.ceil(Bt.width) + At), (yt[Vr] = yt['max' + fo] = Math.ceil(Bt.height) + At), (yt[Se] = yt[Se + Gi] = yt[Se + qi] = yt[Se + Ki] = yt[Se + Hi] = '0'), (yt[_t] = pt[_t]), (yt[_t + Gi] = pt[_t + Gi]), (yt[_t + qi] = pt[_t + qi]), (yt[_t + Ki] = pt[_t + Ki]), (yt[_t + Hi] = pt[_t + Hi]), (lr = Cc(ar, yt, S)), _e && it(0)),
									i ? ((go = i._initted), fs(1), i.render(i.duration(), !0, !0), (qt = ur(M.a) - ce + nt + Dt), (Pi = Math.abs(nt - qt) > 1), B && Pi && lr.splice(lr.length - 2, 2), i.render(0, !0, !0), go || i.invalidate(!0), i.parent || i.totalTime(i.totalTime()), fs(0)) : (qt = nt),
									We && (We.value ? (We.style['overflow' + M.a.toUpperCase()] = We.value) : We.style.removeProperty('overflow-' + M.a))
							else if (h && it() && !T) for (Bt = h.parentNode; Bt && Bt !== ft; ) Bt._pinOffset && ((G -= Bt._pinOffset), (bt -= Bt._pinOffset)), (Bt = Bt.parentNode)
							Ci &&
								Ci.forEach(function (Oi) {
									return Oi.revert(!1, !0)
								}),
								(g.start = G),
								(g.end = bt),
								(le = xe = _e ? Re : it()),
								!T && !_e && (le < Re && it(Re), (g.scroll.rec = 0)),
								g.revert(!1, !0),
								Ae && ((ct = -1), g.isActive && it(G + nt * Te), Ae.restart(!0)),
								(It = 0),
								i && A && (i._initted || Or) && i.progress() !== Or && i.progress(Or, !0).render(i.time(), !0, !0),
								(j || Te !== g.progress || T) && (i && !A && i.totalProgress(T && G < -0.001 && !Te ? D.utils.normalize(G, bt, 0) : Te, !0), (g.progress = (le - G) / nt === Te ? 0 : Te)),
								f && _ && (Ut._pinOffset = Math.round(g.progress * qt)),
								$ && $.invalidate(),
								c && !_e && c(g)
						}
					}),
					(g.getVelocity = function () {
						return ((it() - xe) / (Qt() - Pn)) * 1e3 || 0
					}),
					(g.endAnimation = function () {
						Di(g.callbackAnimation), i && ($ ? $.progress(1) : i.paused() ? A || Di(i, g.direction < 0, 1) : Di(i, i.reversed()))
					}),
					(g.labelToScroll = function (O) {
						return (i && i.labels && (G || g.refresh() || G) + (i.labels[O] / i.duration()) * nt) || 0
					}),
					(g.getTrailing = function (O) {
						var R = W.indexOf(g),
							F = g.direction > 0 ? W.slice(0, R).reverse() : W.slice(R + 1)
						return (
							ze(O)
								? F.filter(function (N) {
										return N.vars.preventOverlaps === O
								  })
								: F
						).filter(function (N) {
							return g.direction > 0 ? N.end <= G : N.start >= bt
						})
					}),
					(g.update = function (O, R, F) {
						if (!(T && !F && !O)) {
							var N = _e === !0 ? Re : g.scroll(),
								St = O ? 0 : (N - G) / nt,
								j = St < 0 ? 0 : St > 1 ? 1 : St || 0,
								ot = g.progress,
								Dt,
								Pt,
								mt,
								at,
								fe,
								Gt,
								kt,
								pt
							if ((R && ((xe = le), (le = T ? it() : N), v && ((Cr = kr), (kr = i && !A ? i.totalProgress() : j))), m && !j && f && !It && !dn && Oe && G < N + ((N - xe) / (Qt() - Pn)) * m && (j = 1e-4), j !== ot && g.enabled)) {
								if (
									((Dt = g.isActive = !!j && j < 1),
									(Pt = !!ot && ot < 1),
									(Gt = Dt !== Pt),
									(fe = Gt || !!j != !!ot),
									(g.direction = j > ot ? 1 : -1),
									(g.progress = j),
									fe && !It && ((mt = j && !ot ? 0 : j === 1 ? 1 : ot === 1 ? 2 : 3), A && ((at = (!Gt && z[mt + 1] !== 'none' && z[mt + 1]) || z[mt]), (pt = i && (at === 'complete' || at === 'reset' || at in i)))),
									P &&
										(Gt || pt) &&
										(pt || p || !i) &&
										(Jt(P)
											? P(g)
											: g.getTrailing(P).forEach(function (yt) {
													return yt.endAnimation()
											  })),
									A || ($ && !It && !dn ? ($._dp._time - $._start !== $._time && $.render($._dp._time - $._start), $.resetTo ? $.resetTo('totalProgress', j, i._tTime / i._tDur) : (($.vars.totalProgress = j), $.invalidate().restart())) : i && i.totalProgress(j, !!It)),
									f)
								) {
									if ((O && _ && (Ut.style[_ + M.os2] = Si), !B)) dt(zi(ce + qt * j))
									else if (fe) {
										if (((kt = !O && j > ot && bt + 1 > N && N + 1 >= mr(E, M)), S))
											if (!O && (Dt || kt)) {
												var Bt = er(f, !0),
													Jr = N - G
												Ho(f, ft, Bt.top + (M === wt ? Jr : 0) + At, Bt.left + (M === wt ? 0 : Jr) + At)
											} else Ho(f, Ut)
										di(Dt || kt ? lr : Zr), (Pi && j < 1 && Dt) || dt(ce + (j === 1 && !kt ? qt : 0))
									}
								}
								v && !Ft.tween && !It && !dn && Ae.restart(!0),
									o &&
										(Gt || (w && j && (j < 1 || !hs))) &&
										Hn(o.targets).forEach(function (yt) {
											return yt.classList[Dt || w ? 'add' : 'remove'](o.className)
										}),
									s && !A && !O && s(g),
									fe && !It ? (A && (pt && (at === 'complete' ? i.pause().totalProgress(1) : at === 'reset' ? i.restart(!0).pause() : at === 'restart' ? i.restart(!0) : i[at]()), s && s(g)), (Gt || !hs) && (u && Gt && ps(g, u), X[mt] && ps(g, X[mt]), w && (j === 1 ? g.kill(!1, 1) : (X[mt] = 0)), Gt || ((mt = j === 1 ? 1 : 3), X[mt] && ps(g, X[mt]))), C && !Dt && Math.abs(g.getVelocity()) > (Fi(C) ? C : 2500) && (Di(g.callbackAnimation), $ ? $.progress(1) : Di(i, at === 'reverse' ? 1 : !j, 1))) : A && s && !It && s(g)
							}
							if (cr) {
								var Mr = T ? (N / T.duration()) * (T._caScrollDist || 0) : N
								Xe(Mr + ($t._isFlipped ? 1 : 0)), cr(Mr)
							}
							jr && jr((-N / T.duration()) * (T._caScrollDist || 0))
						}
					}),
					(g.enable = function (O, R) {
						g.enabled || ((g.enabled = !0), Mt(E, 'resize', Bi), Mt(Y ? st : E, 'scroll', ri), rt && Mt(a, 'refreshInit', rt), O !== !1 && ((g.progress = Te = 0), (le = xe = ct = it())), R !== !1 && g.refresh())
					}),
					(g.getTween = function (O) {
						return O && Ft ? Ft.tween : $
					}),
					(g.setPositions = function (O, R) {
						f && ((ce += O - G), (qt += R - O - nt), _ === _t && g.adjustPinSpacing(R - O - nt)), (g.start = G = O), (g.end = bt = R), (nt = R - O), g.update()
					}),
					(g.adjustPinSpacing = function (O) {
						if (Ht && O) {
							var R = Ht.indexOf(M.d) + 1
							;(Ht[R] = parseFloat(Ht[R]) + O + At), (Ht[1] = parseFloat(Ht[1]) + O + At), di(Ht)
						}
					}),
					(g.disable = function (O, R) {
						if (g.enabled && (O !== !1 && g.revert(!0, !0), (g.enabled = g.isActive = !1), R || ($ && $.pause()), (Re = 0), Vt && (Vt.uncache = 1), rt && Ot(a, 'refreshInit', rt), Ae && (Ae.pause(), Ft.tween && Ft.tween.kill() && (Ft.tween = 0)), !Y)) {
							for (var F = W.length; F--; ) if (W[F].scroller === E && W[F] !== g) return
							Ot(E, 'resize', Bi), Ot(E, 'scroll', ri)
						}
					}),
					(g.kill = function (O, R) {
						g.disable(O, R), $ && !R && $.kill(), l && delete Ns[l]
						var F = W.indexOf(g)
						F >= 0 && W.splice(F, 1),
							F === Zt && Mn > 0 && Zt--,
							(F = 0),
							W.forEach(function (N) {
								return N.scroller === g.scroller && (F = 1)
							}),
							F || _e || (g.scroll.rec = 0),
							i && ((i.scrollTrigger = null), O && i.revert({kill: !1}), R || i.kill()),
							ue &&
								[ue, Ye, $t, x].forEach(function (N) {
									return N.parentNode && N.parentNode.removeChild(N)
								}),
							Zi === g && (Zi = 0),
							f &&
								(Vt && (Vt.uncache = 1),
								(F = 0),
								W.forEach(function (N) {
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
								return G || bt || g.refresh()
						  }) &&
						  (nt = 0.01) &&
						  (G = bt = 0),
					f && Sc()
			}),
			(a.register = function (r) {
				return ii || ((D = r || vl()), yl() && window.document && a.enable(), (ii = Li)), ii
			}),
			(a.defaults = function (r) {
				if (r) for (var i in r) mn[i] = r[i]
				return mn
			}),
			(a.disable = function (r, i) {
				;(Li = 0),
					W.forEach(function (s) {
						return s[i ? 'kill' : 'disable'](r)
					}),
					Ot(K, 'wheel', ri),
					Ot(st, 'scroll', ri),
					clearInterval(hn),
					Ot(st, 'touchcancel', Ve),
					Ot(ft, 'touchstart', Ve),
					_n(Ot, st, 'pointerdown,touchstart,mousedown', Xo),
					_n(Ot, st, 'pointerup,touchend,mouseup', No),
					qn.kill(),
					pn(Ot)
				for (var n = 0; n < U.length; n += 3) gn(Ot, U[n], U[n + 1]), gn(Ot, U[n], U[n + 2])
			}),
			(a.enable = function () {
				if (((K = window), (st = document), (Fe = st.documentElement), (ft = st.body), D && ((Hn = D.utils.toArray), (li = D.utils.clamp), (Ys = D.core.context || Ve), (fs = D.core.suppressOverwrites || Ve), (lo = K.history.scrollRestoration || 'auto'), (Ws = K.pageYOffset), D.core.globals('ScrollTrigger', a), ft))) {
					;(Li = 1),
						mc(),
						xt.register(D),
						(a.isTouch = xt.isTouch),
						(fr = xt.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
						Mt(K, 'wheel', ri),
						(hl = [K, st, Fe, ft]),
						D.matchMedia
							? ((a.matchMedia = function (l) {
									var u = D.matchMedia(),
										c
									for (c in l) u.add(c, l[c])
									return u
							  }),
							  D.addEventListener('matchMediaInit', function () {
									return po()
							  }),
							  D.addEventListener('matchMediaRevert', function () {
									return Pl()
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
							wt.m = Math.round(s.top + wt.sc()) || 0,
							jt.m = Math.round(s.left + jt.sc()) || 0,
							i ? (r.borderTopStyle = i) : r.removeProperty('border-top-style'),
							hn = setInterval($o, 250),
							D.delayedCall(0.5, function () {
								return (dn = 0)
							}),
							Mt(st, 'touchcancel', Ve),
							Mt(ft, 'touchstart', Ve),
							_n(Mt, st, 'pointerdown,touchstart,mousedown', Xo),
							_n(Mt, st, 'pointerup,touchend,mouseup', No),
							Is = D.utils.checkPrefix('transform'),
							En.push(Is),
							ii = Qt(),
							qn = D.delayedCall(0.2, Br).pause(),
							ni = [
								st,
								'visibilitychange',
								function () {
									var l = K.innerWidth,
										u = K.innerHeight
									st.hidden ? ((Io = l), (Yo = u)) : (Io !== l || Yo !== u) && Bi()
								},
								st,
								'DOMContentLoaded',
								Br,
								K,
								'load',
								Br,
								K,
								'resize',
								Bi,
							],
							pn(Mt),
							W.forEach(function (l) {
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
				'limitCallbacks' in r && (hs = !!r.limitCallbacks)
				var i = r.syncInterval
				;(i && clearInterval(hn)) || ((hn = i) && setInterval($o, i)), 'ignoreMobileResize' in r && (_l = a.isTouch === 1 && r.ignoreMobileResize), 'autoRefreshEvents' in r && (pn(Ot) || pn(Mt, r.autoRefreshEvents || 'none'), (pl = (r.autoRefreshEvents + '').indexOf('resize') === -1))
			}),
			(a.scrollerProxy = function (r, i) {
				var n = re(r),
					s = U.indexOf(n),
					o = qr(n)
				~s && U.splice(s, o ? 6 : 2), i && (o ? Ge.unshift(K, i, ft, i, Fe, i) : Ge.unshift(n, i))
			}),
			(a.clearMatchMedia = function (r) {
				W.forEach(function (i) {
					return i._ctx && i._ctx.query === r && i._ctx.kill(!0, !0)
				})
			}),
			(a.isInViewport = function (r, i, n) {
				var s = (ze(r) ? re(r) : r).getBoundingClientRect(),
					o = s[n ? Wr : Vr] * i || 0
				return n ? s.right - o > 0 && s.left + o < K.innerWidth : s.bottom - o > 0 && s.top + o < K.innerHeight
			}),
			(a.positionInViewport = function (r, i, n) {
				ze(r) && (r = re(r))
				var s = r.getBoundingClientRect(),
					o = s[n ? Wr : Vr],
					l = i == null ? o / 2 : i in Gn ? Gn[i] * o : ~i.indexOf('%') ? (parseFloat(i) * o) / 100 : parseFloat(i) || 0
				return n ? (s.left + l) / K.innerWidth : (s.top + l) / K.innerHeight
			}),
			(a.killAll = function (r) {
				if (
					(W.slice(0).forEach(function (n) {
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
V.version = '3.11.5'
V.saveStyles = function (a) {
	return a
		? Hn(a).forEach(function (t) {
				if (t && t.style) {
					var e = de.indexOf(t)
					e >= 0 && de.splice(e, 5), de.push(t, t.style.cssText, t.getBBox && t.getAttribute('transform'), D.core.getCache(t), Ys())
				}
		  })
		: de
}
V.revert = function (a, t) {
	return po(!a, t)
}
V.create = function (a, t) {
	return new V(a, t)
}
V.refresh = function (a) {
	return a ? Bi() : (ii || V.register()) && Br(!0)
}
V.update = function (a) {
	return ++U.cache && ir(a === !0 ? 2 : 0)
}
V.clearScrollMemory = kl
V.maxScroll = function (a, t) {
	return mr(a, t ? jt : wt)
}
V.getScrollFunc = function (a, t) {
	return Sr(re(a), t ? jt : wt)
}
V.getById = function (a) {
	return Ns[a]
}
V.getAll = function () {
	return W.filter(function (a) {
		return a.vars.id !== 'ScrollSmoother'
	})
}
V.isScrolling = function () {
	return !!Oe
}
V.snapDirectional = ho
V.addEventListener = function (a, t) {
	var e = Hr[a] || (Hr[a] = [])
	~e.indexOf(t) || e.push(t)
}
V.removeEventListener = function (a, t) {
	var e = Hr[a],
		r = e && e.indexOf(t)
	r >= 0 && e.splice(r, 1)
}
V.batch = function (a, t) {
	var e = [],
		r = {},
		i = t.interval || 0.016,
		n = t.batchMax || 1e9,
		s = function (u, c) {
			var p = [],
				h = [],
				f = D.delayedCall(i, function () {
					c(p, h), (p = []), (h = [])
				}).pause()
			return function (_) {
				p.length || f.restart(!0), p.push(_.trigger), h.push(_), n <= p.length && f.progress(1)
			}
		},
		o
	for (o in t) r[o] = o.substr(0, 2) === 'on' && Jt(t[o]) && o !== 'onRefreshInit' ? s(o, t[o]) : t[o]
	return (
		Jt(n) &&
			((n = n()),
			Mt(V, 'refresh', function () {
				return (n = t.batchMax())
			})),
		Hn(a).forEach(function (l) {
			var u = {}
			for (o in r) u[o] = r[o]
			;(u.trigger = l), e.push(V.create(u))
		}),
		e
	)
}
var Ko = function (t, e, r, i) {
		return e > i ? t(i) : e < 0 && t(0), r > i ? (i - e) / (r - e) : r < 0 ? e / (e - r) : 1
	},
	ms = function a(t, e) {
		e === !0 ? t.style.removeProperty('touch-action') : (t.style.touchAction = e === !0 ? 'auto' : e ? 'pan-' + e + (xt.isTouch ? ' pinch-zoom' : '') : 'none'), t === Fe && a(ft, e)
	},
	xn = {auto: 1, scroll: 1},
	Mc = function (t) {
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
	Ol = function (t, e, r, i) {
		return xt.create({
			target: t,
			capture: !0,
			debounce: !1,
			lockAxis: !0,
			type: e,
			onWheel: (i = i && Mc),
			onPress: i,
			onDrag: i,
			onScroll: i,
			onEnable: function () {
				return r && Mt(st, xt.eventTypes[0], Qo, !1, !0)
			},
			onDisable: function () {
				return Ot(st, xt.eventTypes[0], Qo, !0)
			},
		})
	},
	Ec = /(input|label|select|textarea)/i,
	Zo,
	Qo = function (t) {
		var e = Ec.test(t.target.tagName)
		;(e || Zo) && ((t._gsapAllow = !0), (Zo = e))
	},
	Dc = function (t) {
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
			p = c && c.get(),
			h = fr && ((t.content && re(t.content)) || (p && t.content !== !1 && !p.smooth() && p.content())),
			f = Sr(u, wt),
			_ = Sr(u, jt),
			d = 1,
			m = (xt.isTouch && K.visualViewport ? K.visualViewport.scale * K.visualViewport.width : K.outerWidth) / K.innerWidth,
			y = 0,
			b = Jt(i)
				? function () {
						return i(o)
				  }
				: function () {
						return i || 2.8
				  },
			w,
			v,
			S = Ol(u, t.type, !0, n),
			k = function () {
				return (v = !1)
			},
			T = Ve,
			C = Ve,
			P = function () {
				;(l = mr(u, wt)), (C = li(fr ? 1 : 0, l)), r && (T = li(0, mr(u, jt))), (w = $r)
			},
			M = function () {
				;(h._gsap.y = zi(parseFloat(h._gsap.y) + f.offset) + 'px'), (h.style.transform = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' + parseFloat(h._gsap.y) + ', 0, 1)'), (f.offset = f.cacheID = 0)
			},
			A = function () {
				if (v) {
					requestAnimationFrame(k)
					var Z = zi(o.deltaY / 2),
						J = C(f.v - Z)
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
			H,
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
				;(d = zi(((K.visualViewport && K.visualViewport.scale) || 1) / m)), E.pause(), z !== d && ms(u, d > 1.01 ? !0 : r ? !1 : 'x'), (H = _()), (Y = f()), P(), (w = $r)
			}),
			(t.onRelease = t.onGestureStart =
				function (z, Z) {
					if ((f.offset && M(), !Z)) B.restart(!0)
					else {
						U.cache++
						var J = b(),
							g,
							rt
						r && ((g = _()), (rt = g + (J * 0.05 * -z.velocityX) / 0.227), (J *= Ko(_, g, rt, mr(u, jt))), (E.vars.scrollX = T(rt))), (g = f()), (rt = g + (J * 0.05 * -z.velocityY) / 0.227), (J *= Ko(f, g, rt, mr(u, wt))), (E.vars.scrollY = C(rt)), E.invalidate().duration(J).play(0.01), ((fr && E.vars.scrollY >= l) || g >= l - 1) && D.to({}, {onUpdate: X, duration: J})
					}
					s && s(z)
				}),
			(t.onWheel = function () {
				E._ts && E.pause(), Qt() - y > 1e3 && ((w = 0), (y = Qt()))
			}),
			(t.onChange = function (z, Z, J, g, rt) {
				if (($r !== w && P(), Z && r && _(T(g[2] === Z ? H + (z.startX - z.x) : _() + Z - g[1])), J)) {
					f.offset && M()
					var Wt = rt[2] === J,
						Ee = Wt ? Y + z.startY - z.y : f() + J - rt[1],
						ct = C(Ee)
					Wt && Ee !== ct && (Y += ct - Ee), f(ct)
				}
				;(J || Z) && ir()
			}),
			(t.onEnable = function () {
				ms(u, r ? !1 : 'x'), V.addEventListener('refresh', X), Mt(K, 'resize', X), f.smooth && ((f.target.style.scrollBehavior = 'auto'), (f.smooth = _.smooth = !1)), S.enable()
			}),
			(t.onDisable = function () {
				ms(u, !0), Ot(K, 'resize', X), V.removeEventListener('refresh', X), S.kill()
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
					scrollY: Cl(f, f(), function () {
						return E.pause()
					}),
				},
				onUpdate: ir,
				onComplete: B.vars.onComplete,
			})),
			o
		)
	}
V.sort = function (a) {
	return W.sort(
		a ||
			function (t, e) {
				return (t.vars.refreshPriority || 0) * -1e6 + t.start - (e.start + (e.vars.refreshPriority || 0) * -1e6)
			}
	)
}
V.observe = function (a) {
	return new xt(a)
}
V.normalizeScroll = function (a) {
	if (typeof a > 'u') return he
	if (a === !0 && he) return he.enable()
	if (a === !1) return he && he.kill()
	var t = a instanceof xt ? a : Dc(a)
	return he && he.target === t.target && he.kill(), qr(t.target) && (he = t), t
}
V.core = {
	_getVelocityProp: Bs,
	_inputObserver: Ol,
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
vl() && D.registerPlugin(V)
/*!
 * ScrollToPlugin 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */ var te,
	Ml,
	nr,
	qe,
	Tr,
	El,
	Dl,
	Tn,
	Al = function () {
		return typeof window < 'u'
	},
	Rl = function () {
		return te || (Al() && (te = window.gsap) && te.registerPlugin && te)
	},
	Ll = function (t) {
		return typeof t == 'string'
	},
	jo = function (t) {
		return typeof t == 'function'
	},
	sn = function (t, e) {
		var r = e === 'x' ? 'Width' : 'Height',
			i = 'scroll' + r,
			n = 'client' + r
		return t === nr || t === qe || t === Tr ? Math.max(qe[i], Tr[i]) - (nr['inner' + r] || qe[n] || Tr[n]) : t[i] - t['offset' + r]
	},
	on = function (t, e) {
		var r = 'scroll' + (e === 'x' ? 'Left' : 'Top')
		return (
			t === nr && (t.pageXOffset != null ? (r = 'page' + e.toUpperCase() + 'Offset') : (t = qe[r] != null ? qe : Tr)),
			function () {
				return t[r]
			}
		)
	},
	Ac = function (t, e, r, i) {
		if ((jo(t) && (t = t(e, r, i)), typeof t != 'object')) return Ll(t) && t !== 'max' && t.charAt(1) !== '=' ? {x: t, y: t} : {y: t}
		if (t.nodeType) return {y: t, x: t}
		var n = {},
			s
		for (s in t) n[s] = s !== 'onAutoKill' && jo(t[s]) ? t[s](e, r, i) : t[s]
		return n
	},
	zl = function (t, e) {
		if (((t = El(t)[0]), !t || !t.getBoundingClientRect)) return console.warn("scrollTo target doesn't exist. Using 0") || {x: 0, y: 0}
		var r = t.getBoundingClientRect(),
			i = !e || e === nr || e === Tr,
			n = i ? {top: qe.clientTop - (nr.pageYOffset || qe.scrollTop || Tr.scrollTop || 0), left: qe.clientLeft - (nr.pageXOffset || qe.scrollLeft || Tr.scrollLeft || 0)} : e.getBoundingClientRect(),
			s = {x: r.left - n.left, y: r.top - n.top}
		return !i && e && ((s.x += on(e, 'x')()), (s.y += on(e, 'y')())), s
	},
	Jo = function (t, e, r, i, n) {
		return !isNaN(t) && typeof t != 'object' ? parseFloat(t) - n : Ll(t) && t.charAt(1) === '=' ? parseFloat(t.substr(2)) * (t.charAt(0) === '-' ? -1 : 1) + i - n : t === 'max' ? sn(e, r) - n : Math.min(sn(e, r), zl(t, e)[r] - n)
	},
	ta = function () {
		;(te = Rl()), Al() && te && typeof document < 'u' && document.body && ((nr = window), (Tr = document.body), (qe = document.documentElement), (El = te.utils.toArray), te.config({autoKillThreshold: 7}), (Dl = te.config()), (Ml = 1))
	},
	ln = {
		version: '3.11.5',
		name: 'scrollTo',
		rawVars: 1,
		register: function (t) {
			;(te = t), ta()
		},
		init: function (t, e, r, i, n) {
			Ml || ta()
			var s = this,
				o = te.getProperty(t, 'scrollSnapType')
			;(s.isWin = t === nr), (s.target = t), (s.tween = r), (e = Ac(e, i, t, n)), (s.vars = e), (s.autoKill = !!e.autoKill), (s.getX = on(t, 'x')), (s.getY = on(t, 'y')), (s.x = s.xPrev = s.getX()), (s.y = s.yPrev = s.getY()), Tn || (Tn = te.core.globals().ScrollTrigger), te.getProperty(t, 'scrollBehavior') === 'smooth' && te.set(t, {scrollBehavior: 'auto'}), o && o !== 'none' && ((s.snap = 1), (s.snapInline = t.style.scrollSnapType), (t.style.scrollSnapType = 'none')), e.x != null ? (s.add(s, 'x', s.x, Jo(e.x, t, 'x', s.x, e.offsetX || 0), i, n), s._props.push('scrollTo_x')) : (s.skipX = 1), e.y != null ? (s.add(s, 'y', s.y, Jo(e.y, t, 'y', s.y, e.offsetY || 0), i, n), s._props.push('scrollTo_y')) : (s.skipY = 1)
		},
		render: function (t, e) {
			for (var r = e._pt, i = e.target, n = e.tween, s = e.autoKill, o = e.xPrev, l = e.yPrev, u = e.isWin, c = e.snap, p = e.snapInline, h, f, _, d, m; r; ) r.r(t, r.d), (r = r._next)
			;(h = u || !e.skipX ? e.getX() : o), (f = u || !e.skipY ? e.getY() : l), (_ = f - l), (d = h - o), (m = Dl.autoKillThreshold), e.x < 0 && (e.x = 0), e.y < 0 && (e.y = 0), s && (!e.skipX && (d > m || d < -m) && h < sn(i, 'x') && (e.skipX = 1), !e.skipY && (_ > m || _ < -m) && f < sn(i, 'y') && (e.skipY = 1), e.skipX && e.skipY && (n.kill(), e.vars.onAutoKill && e.vars.onAutoKill.apply(n, e.vars.onAutoKillParams || []))), u ? nr.scrollTo(e.skipX ? h : e.x, e.skipY ? f : e.y) : (e.skipY || (i.scrollTop = e.y), e.skipX || (i.scrollLeft = e.x)), c && (t === 1 || t === 0) && ((f = i.scrollTop), (h = i.scrollLeft), p ? (i.style.scrollSnapType = p) : i.style.removeProperty('scroll-snap-type'), (i.scrollTop = f + 1), (i.scrollLeft = h + 1), (i.scrollTop = f), (i.scrollLeft = h)), (e.xPrev = e.x), (e.yPrev = e.y), Tn && Tn.update()
		},
		kill: function (t) {
			var e = t === 'scrollTo'
			;(e || t === 'scrollTo_x') && (this.skipX = 1), (e || t === 'scrollTo_y') && (this.skipY = 1)
		},
	}
ln.max = sn
ln.getOffset = zl
ln.buildGetter = on
Rl() && te.registerPlugin(ln)
const Rc = new eu({duration: 1.2, easing: a => Math.min(1, 1.001 - Math.pow(2, -10 * a)), direction: 'vertical', gestureDirection: 'vertical', smooth: !0, mouseMultiplier: 1, smoothTouch: !1, touchMultiplier: 2, infinite: !1})
function Fl(a) {
	Rc.raf(a), requestAnimationFrame(Fl)
}
requestAnimationFrame(Fl)
q.registerPlugin(V, ln)
const Lc = q.timeline(),
	zc = q.timeline({defaults: {durations: 0.5}, repeat: -1, repeatDelay: 1}),
	Fc = q.timeline({defaults: {durations: 0.5}, repeat: -1, repeatDelay: 1}),
	Bc = q.timeline({defaults: {durations: 0.5}, repeat: -1, repeatDelay: 1})
Lc.fromTo('.hero__title', {opacity: 0, x: 30}, {opacity: 1, duration: 1, x: 0}, 0.5).fromTo('.hero__subtitle', {opacity: 0, x: -30}, {opacity: 1, duration: 1, x: 0}, 1).fromTo('.hero__link', {opacity: 0, y: 30}, {opacity: 1, duration: 1, y: 0}, 1.5).fromTo('.header__logo', {y: -20, opacity: 0}, {y: 0, opacity: 1, duration: 1}, 0.5).fromTo('.header__navigation a', {y: -20, opacity: 0}, {y: 0, duration: 0.2, stagger: 0.15, opacity: 1}, 0.5).fromTo('.hero__background-video', {opacity: 0}, {opacity: 1, duration: 1}, 0.5)
const _o = window.pageYOffset || document.documentElement.scrollTop,
	Ic = document.querySelector('.about__title'),
	Yc = document.querySelector('.portfolio__main-title'),
	Xc = document.querySelector('.contacts__title')
function Nc() {
	const t = Ic.getBoundingClientRect().top + _o,
		e = document.querySelector('.hero__link'),
		r = document.querySelectorAll('.navigation__link')[0]
	e.addEventListener('click', function (i) {
		i.preventDefault(), q.to(window, {duration: 1.2, scrollTo: t, ease: 'expo.out'})
	}),
		r.addEventListener('click', function (i) {
			i.preventDefault(), q.to(window, {duration: 1.2, scrollTo: t, ease: 'expo.out'})
		})
}
function Wc() {
	const t = Yc.getBoundingClientRect().top + _o
	document.querySelectorAll('.navigation__link')[1].addEventListener('click', function (r) {
		r.preventDefault(), q.to(window, {duration: 1.2, scrollTo: t, ease: 'expo.out'})
	})
}
function Vc() {
	const t = Xc.getBoundingClientRect().top + _o
	document.querySelectorAll('.navigation__link')[2].addEventListener('click', function (r) {
		r.preventDefault(), q.to(window, {duration: 1.2, scrollTo: t, ease: 'expo.out'})
	})
}
Nc()
Wc()
Vc()
let Kn = q.utils.toArray('.about__box'),
	Bl = q.utils.toArray('.portfolio__card'),
	Il = q.utils.toArray('.contacts__item'),
	$c = q.utils.toArray('.footer__img-link')
Bc.to('.about__skill-box svg', {stagger: {each: 0.1, from: 'edges'}, scale: 1})
	.to('.about__skill-box svg', {stagger: {each: 0.1, from: 'edges'}, scale: 1.1})
	.to('.about__skill-box svg', {stagger: {each: 0.1, from: 'edges'}, scale: 1, ease: 'power1.out'})
$c.forEach(a => {
	Fc.to(a, {rotation: -20}).to(a, {rotation: 20}).to(a, {rotation: 0, ease: 'power1.out'})
})
let Uc = q.utils.toArray('.contacts__img')
Uc.forEach(a => {
	zc.to(a, {scale: 1.2}).to(a, {rotation: -20}).to(a, {rotation: 20}).to(a, {scale: 1, rotation: 0, ease: 'power1.out'})
})
V.isTouch !== 1 &&
	(Il.forEach(a => {
		q.fromTo(a, {opacity: 0, scale: 0}, {scale: 1, opacity: 1, scrollTrigger: {trigger: '.portfolio', start: 'bottom 94%', end: 'bottom 38%', scrub: !0}})
	}),
	Bl.forEach(a => {
		q.fromTo(a, {opacity: 0, scale: 0}, {scale: 1, opacity: 1, scrollTrigger: {trigger: a, start: '-130px 92%', end: '-90px 78%', scrub: !0}})
	}),
	q.fromTo('.portfolio__box', {opacity: 0, y: 100}, {y: 0, opacity: 1, scrollTrigger: {trigger: '.portfolio', start: 'top 88%', end: 'top 40%', scrub: !0}}),
	q.fromTo('.contacts__subtitle', {opacity: 0, y: 100}, {y: 0, opacity: 1, scrollTrigger: {trigger: '.portfolio', start: 'bottom 90%', end: 'bottom 42%', scrub: !0}}),
	q.fromTo('.footer__socials', {opacity: 0, x: -100}, {x: 0, opacity: 1, scrollTrigger: {trigger: '.footer', start: 'top 96%', end: '14% 90%', scrub: !0}}),
	q.fromTo('.footer__copy', {opacity: 0, x: 100}, {x: 0, opacity: 1, scrollTrigger: {trigger: '.footer', start: 'top 96%', end: '14% 90%', scrub: !0}}),
	q.fromTo('.contacts__title', {opacity: 0, y: 100}, {y: 0, opacity: 1, scrollTrigger: {trigger: '.portfolio', start: 'bottom 92%', end: 'bottom 40%', scrub: !0}}),
	q.fromTo(Kn[1], {opacity: 0, x: 100}, {opacity: 1, x: 0, scrollTrigger: {trigger: '.about', start: 'top 90%', end: 'top 45%', scrub: !0}}),
	q.fromTo(Kn[0], {opacity: 0, y: 100}, {opacity: 1, y: 0, scrollTrigger: {trigger: '.about', start: 'top 90%', end: 'top 45%', scrub: !0}}),
	q.fromTo('.about__title', {opacity: 0, y: 100}, {opacity: 1, y: 0, scrollTrigger: {trigger: '.header', start: '140% 10%', end: '150% 0%', scrub: !0}}),
	q.fromTo('.portfolio__main-title', {opacity: 0, y: 100}, {opacity: 1, y: 0, scrollTrigger: {trigger: '.about', start: '140% 94%', end: '150% 84%', scrub: !0}}))
V.isTouch == 1 &&
	(Il.forEach(a => {
		q.fromTo(a, {opacity: 0, scale: 0}, {scale: 1, opacity: 1, scrollTrigger: {trigger: '.portfolio', start: 'bottom 94%', end: 'bottom 38%', scrub: !0}})
	}),
	Bl.forEach(a => {
		q.fromTo(a, {opacity: 0, scale: 0}, {scale: 1, opacity: 1, scrollTrigger: {trigger: a, start: '-130px 92%', end: '-90px 78%', scrub: !0}})
	}),
	q.fromTo('.portfolio__box', {opacity: 0, y: 100}, {y: 0, opacity: 1, scrollTrigger: {trigger: '.about', start: '120% 80%', end: '125% 78%', scrub: !0}}),
	q.fromTo('.contacts__subtitle', {opacity: 0, y: 100}, {y: 0, opacity: 1, scrollTrigger: {trigger: '.portfolio', start: 'bottom 90%', end: 'bottom 42%', scrub: !0}}),
	q.fromTo('.footer__socials', {opacity: 0, x: -100}, {x: 0, opacity: 1, scrollTrigger: {trigger: '.footer', start: 'top 96%', end: '14% 90%', scrub: !0}}),
	q.fromTo('.footer__copy', {opacity: 0, x: 100}, {x: 0, opacity: 1, scrollTrigger: {trigger: '.footer', start: 'top 96%', end: '14% 90%', scrub: !0}}),
	q.fromTo('.contacts__title', {opacity: 0, y: 100}, {y: 0, opacity: 1, scrollTrigger: {trigger: '.portfolio', start: 'bottom 92%', end: 'bottom 40%', scrub: !0}}),
	q.fromTo(Kn[1], {opacity: 0, x: 100}, {opacity: 1, x: 0, scrollTrigger: {trigger: '.about', start: '42% 90%', end: '42% 55%', scrub: !0}}),
	q.fromTo(Kn[0], {opacity: 0, y: 100}, {opacity: 1, y: 0, scrollTrigger: {trigger: '.about', start: 'top 90%', end: 'top 45%', scrub: !0}}),
	q.fromTo('.about__title', {opacity: 0, y: 100}, {opacity: 1, y: 0, scrollTrigger: {trigger: '.header', start: '140% 10%', end: '150% 0%', scrub: !0}}),
	q.fromTo('.portfolio__main-title', {opacity: 0, y: 100}, {opacity: 1, y: 0, scrollTrigger: {trigger: '.about', start: '124% 94%', end: '130% 84%', scrub: !0}}))
