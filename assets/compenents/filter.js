import {correctTrigger, correctTriggerScroll} from './gsap'

const portfolioBtns = document.querySelectorAll('.portfolio__btn')
const portfolioCards = document.querySelectorAll('.portfolio__card')

portfolioBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		const value = btn.getAttribute('data-filter')

		if (value === 'all') {
			portfolioCards.forEach(card => {
				card.style.display = 'block'
			})
		} else {
			portfolioCards.forEach(card => {
				if (!card.classList.contains(value)) {
					card.style.display = 'none'
				} else {
					card.style.display = 'block'
				}
			})
		}
	})
})

const productBtns = document.querySelectorAll('.portfolio__btn')
let lastActiveBtn = null
let counter = 0
let defaultBtn = document.querySelector('.portfolio__btn')
if (counter == 0) {
	correctTrigger()
	correctTriggerScroll()
}
productBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		++counter
		if (counter !== 0) {
			correctTrigger()
			correctTriggerScroll()
		}
		if (lastActiveBtn) {
			lastActiveBtn.classList.remove('active')
		}
		defaultBtn.classList.remove('active')
		btn.classList.add('active')
		lastActiveBtn = btn
	})
})
