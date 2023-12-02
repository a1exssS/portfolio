import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Draggable } from 'gsap/Draggable'
import { EaselPlugin } from 'gsap/EaselPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { PixiPlugin } from 'gsap/PixiPlugin'
import { TextPlugin } from 'gsap/TextPlugin'




function correctTriggerScroll() {
	const lenis = new Lenis({
		duration: 1.2,
		easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		direction: 'vertical',
		gestureDirection: 'vertical',
		smooth: true,
		mouseMultiplier: 1,
		smoothTouch: false,
		touchMultiplier: 2,
		infinite: false,
	})

	function raf(time) {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}
	requestAnimationFrame(raf)
}
let contacts = gsap.utils.toArray('.contacts__item')

if (ScrollTrigger.isTouch !== 1 && window.innerWidth >= 768) {
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

	const tl = gsap.timeline()
	const tlStep = gsap.timeline({
		defaults: {
			durations: 0.5,
		},
		repeat: -1,
		repeatDelay: 1,
	})
	const tlStep2 = gsap.timeline({
		defaults: {
			durations: 0.5,
		},
		repeat: -1,
		repeatDelay: 1,
	})
	const tlStep3 = gsap.timeline({
		defaults: {
			durations: 0.5,
		},
		repeat: -1,
		repeatDelay: 1,
	})

	tl.fromTo(
		'.hero__title',
		{
			opacity: 0,
			x: 30,
		},
		{
			opacity: 1,
			duration: 1,
			x: 0,
		},
		0.5
	)
		.fromTo(
			'.hero__subtitle',
			{
				opacity: 0,
				x: -30,
			},
			{
				opacity: 1,
				duration: 1,
				x: 0,
			},
			1
		)
		.fromTo(
			'.hero__link',
			{
				opacity: 0,
				y: 30,
			},
			{
				opacity: 1,
				duration: 1,
				y: 0,
			},
			1.5
		)
		.fromTo(
			'.header__logo',
			{
				y: -20,
				opacity: 0,
			},
			{
				y: 0,
				opacity: 1,
				duration: 1,
			},
			0.5
		)
		.fromTo(
			'.header__navigation a',
			{
				y: -20,
				opacity: 0,
			},
			{
				y: 0,
				duration: 0.2,
				stagger: 0.15,
				opacity: 1,
			},
			0.5
		)
		.fromTo(
			'.hero__background-video',
			{
				opacity: 0,
			},
			{
				opacity: 1,
				duration: 1,
			},
			0.5
		)

	const scrollTop = window.pageYOffset || document.documentElement.scrollTop

	const aboutSectionLocation = document.querySelector('.about__title')
	const portfolioSectionLocation = document.querySelector('.portfolio__main-title')
	const contactsSectionLocation = document.querySelector('.contacts__title')

	function aboutSection() {
		const rect = aboutSectionLocation.getBoundingClientRect()
		const top = rect.top + scrollTop

		const btn1 = document.querySelector('.hero__link')
		const btn2 = document.querySelectorAll('.navigation__link')[0]
		btn1.addEventListener('click', function (e) {
			e.preventDefault()
			gsap.to(window, {
				duration: 1.2,
				scrollTo: top,
				ease: 'expo.out',
			})
		})
		btn2.addEventListener('click', function (e) {
			e.preventDefault()
			gsap.to(window, {
				duration: 1.2,
				scrollTo: top,
				ease: 'expo.out',
			})
		})
	}

	function portfolioSection() {
		const rect = portfolioSectionLocation.getBoundingClientRect()
		const top = rect.top + scrollTop

		const btn = document.querySelectorAll('.navigation__link')[1]
		btn.addEventListener('click', function (e) {
			e.preventDefault()
			gsap.to(window, {
				duration: 1.2,
				scrollTo: top,
				ease: 'expo.out',
			})
		})
	}

	function contactsSection() {
		const rect = contactsSectionLocation.getBoundingClientRect()
		const top = rect.top + scrollTop

		const btn = document.querySelectorAll('.navigation__link')[2]
		btn.addEventListener('click', function (e) {
			e.preventDefault()
			gsap.to(window, {
				duration: 1.2,
				scrollTo: top,
				ease: 'expo.out',
			})
		})
	}

	aboutSection()
	portfolioSection()
	contactsSection()
	let aboutBox = gsap.utils.toArray('.about__box')
	let card = gsap.utils.toArray('.portfolio__card')
	let footerLink = gsap.utils.toArray('.footer__img-link')
	tlStep3
		.to('.about__skill-box svg', {
			stagger: {
				each: 0.1,
				from: 'edges',
			},
			scale: 1,
		})
		.to('.about__skill-box svg', {
			stagger: {
				each: 0.1,
				from: 'edges',
			},
			scale: 1.1,
		})
		.to('.about__skill-box svg', {
			stagger: {
				each: 0.1,
				from: 'edges',
			},
			scale: 1,
			ease: 'power1.out',
		})
	footerLink.forEach(item => {
		tlStep2
			.to(item, {
				rotation: -20,
			})
			.to(item, {
				rotation: 20,
			})
			.to(item, {
				rotation: 0,
				ease: 'power1.out',
			})
	})
	let contactsImg = gsap.utils.toArray('.contacts__img')
	contactsImg.forEach(item => {
		tlStep
			.to(item, {
				scale: 1.2,
			})
			.to(item, {
				rotation: -20,
			})
			.to(item, {
				rotation: 20,
			})
			.to(item, {
				scale: 1,
				rotation: 0,

				ease: 'power1.out',
			})
	})

	card.forEach(item => {
		gsap.fromTo(
			item,
			{
				opacity: 0,
				scale: 0,
			},
			{
				scale: 1,
				opacity: 1,
				scrollTrigger: {
					trigger: '.about',
					start: 'bottom 94%',
					end: 'bottom 38%',

					scrub: true,
				},
			}
		)
	})
	gsap.fromTo(
		'.portfolio__box',
		{
			opacity: 0,
			y: 100,
		},
		{
			y: 0,
			opacity: 1,
			scrollTrigger: {
				trigger: '.portfolio',
				start: 'top 88%',
				end: 'top 40%',
				scrub: true,
			},
		}
	)


	gsap.fromTo(
		aboutBox[1],
		{
			opacity: 0,
			x: 100,
		},
		{
			opacity: 1,
			x: 0,
			scrollTrigger: {
				trigger: '.about',
				start: 'top 90%',
				end: 'top 45%',

				scrub: true,
			},
		}
	)

	gsap.fromTo(
		aboutBox[0],
		{
			opacity: 0,
			y: 100,
		},
		{
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: '.about',
				start: 'top 90%',
				end: 'top 45%',

				scrub: true,
			},
		}
	)
	gsap.fromTo(
		'.about__title',
		{
			opacity: 0,
			y: 100,
		},
		{
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: '.header',
				start: '140% 10%',
				end: '150% 0%',

				scrub: true,
			},
		}
	)
	gsap.fromTo(
		'.portfolio__main-title',
		{
			opacity: 0,
			y: 100,
		},
		{
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: '.about',
				start: '140% 94%',
				end: '150% 84%',

				scrub: true,
			},
		}
	)
}

// if (ScrollTrigger.isTouch == 1) {
// 	// card.forEach(item => {
// 	// 	gsap.fromTo(
// 	// 		item,
// 	// 		{
// 	// 			opacity: 0,
// 	// 			scale: 0,
// 	// 		},
// 	// 		{
// 	// 			scale: 1,
// 	// 			opacity: 1,
// 	// 			scrollTrigger: {
// 	// 				trigger: '.about',
// 	// 				start: 'bottom 94%',
// 	// 				end: 'bottom 38%',

// 	// 				scrub: true,
// 	// 			},
// 	// 		}
// 	// 	)
// 	// })
// 	// gsap.fromTo(
// 	// 	'.portfolio__box',
// 	// 	{
// 	// 		opacity: 0,
// 	// 		y: 100,
// 	// 	},
// 	// 	{
// 	// 		y: 0,
// 	// 		opacity: 1,
// 	// 		scrollTrigger: {
// 	// 			trigger: '.about',
// 	// 			start: '120% 80%',
// 	// 			end: '125% 78%',
// 	// 			scrub: true,
// 	// 		},
// 	// 	}
// 	// )

// 	// gsap.fromTo(
// 	// 	aboutBox[1],
// 	// 	{
// 	// 		opacity: 0,
// 	// 		x: 100,
// 	// 	},
// 	// 	{
// 	// 		opacity: 1,
// 	// 		x: 0,
// 	// 		scrollTrigger: {
// 	// 			trigger: '.about',
// 	// 			start: '42% 90%',
// 	// 			end: '42% 55%',

// 	// 			scrub: true,
// 	// 		},
// 	// 	}
// 	// )

// 	// gsap.fromTo(
// 	// 	aboutBox[0],
// 	// 	{
// 	// 		opacity: 0,
// 	// 		y: 100,
// 	// 	},
// 	// 	{
// 	// 		opacity: 1,
// 	// 		y: 0,
// 	// 		scrollTrigger: {
// 	// 			trigger: '.about',
// 	// 			start: 'top 90%',
// 	// 			end: 'top 45%',

// 	// 			scrub: true,
// 	// 		},
// 	// 	}
// 	// )
// 	// gsap.fromTo(
// 	// 	'.about__title',
// 	// 	{
// 	// 		opacity: 0,
// 	// 		y: 100,
// 	// 	},
// 	// 	{
// 	// 		opacity: 1,
// 	// 		y: 0,
// 	// 		scrollTrigger: {
// 	// 			trigger: '.header',
// 	// 			start: '140% 10%',
// 	// 			end: '150% 0%',

// 	// 			scrub: true,
// 	// 		},
// 	// 	}
// 	// )
// 	// gsap.fromTo(
// 	// 	'.portfolio__main-title',
// 	// 	{
// 	// 		opacity: 0,
// 	// 		y: 100,
// 	// 	},
// 	// 	{
// 	// 		opacity: 1,
// 	// 		y: 0,
// 	// 		scrollTrigger: {
// 	// 			trigger: '.about',
// 	// 			start: '124% 94%',
// 	// 			end: '130% 84%',

// 	// 			scrub: true,
// 	// 		},
// 	// 	}
// 	// )
// }

function correctTrigger() {
	gsap.fromTo(
		'.contacts__title',
		{
			opacity: 0,
			y: 100,
		},
		{
			y: 0,
			opacity: 1,
			scrollTrigger: {
				trigger: '.contacts',
				start: 'top 92%',
				end: 'top 80%',
				scrub: true,
			},
		}
	)
	gsap.fromTo(
		'.contacts__subtitle',
		{
			opacity: 0,
			y: 100,
		},
		{
			y: 0,
			opacity: 1,
			scrollTrigger: {
				trigger: '.contacts',
				start: 'top 90%',
				end: 'top 76%',
				scrub: true,
			},
		}
	)
	contacts.forEach(item => {
		gsap.fromTo(
			item,
			{
				opacity: 0,
				scale: 0,
			},
			{
				scale: 1,
				opacity: 1,
				scrollTrigger: {
					trigger: '.contacts',
					start: 'top 88%',
					end: 'top 75%',
					scrub: true,
				},
			}
		)
	})
	gsap.fromTo(
		'.footer__socials',
		{
			opacity: 0,
			x: -100,
		},
		{
			x: 0,
			opacity: 1,
			scrollTrigger: {
				trigger: '.footer',
				start: 'top 96%',
				end: '10% 92%',
				scrub: true,
			},
		}
	)
	gsap.fromTo(
		'.footer__copy',
		{
			opacity: 0,
			x: 100,
		},
		{
			x: 0,
			opacity: 1,
			scrollTrigger: {
				trigger: '.footer',
				start: 'top 96%',
				end: '10% 92%',
				scrub: true,
			},
		}
	)
	ScrollTrigger.refresh()
}
export { correctTrigger, correctTriggerScroll }
