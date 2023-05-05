import Lenis from '@studio-freight/lenis'
import {gsap} from 'gsap'
import {Flip} from 'gsap/Flip'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {Observer} from 'gsap/Observer'
import {ScrollToPlugin} from 'gsap/ScrollToPlugin'
import {Draggable} from 'gsap/Draggable'
import {EaselPlugin} from 'gsap/EaselPlugin'
import {MotionPathPlugin} from 'gsap/MotionPathPlugin'
import {PixiPlugin} from 'gsap/PixiPlugin'
import {TextPlugin} from 'gsap/TextPlugin'

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

gsap.registerPlugin(Flip, ScrollTrigger, Observer, ScrollToPlugin, Draggable, EaselPlugin, MotionPathPlugin, PixiPlugin, TextPlugin)

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
