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

// const showOverlay = () => {
// 	const overlay = document.querySelector('.portfolio__loading-overlay')
// 	overlay.classList.add('show')
// 	setTimeout(() => {
// 		overlay.classList.remove('show')
// 	}, 500)
// }

const productBtns = document.querySelectorAll('.portfolio__btn')
let lastActiveBtn = null

let defaultBtn = document.querySelector('.portfolio__btn')
productBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		if (lastActiveBtn) {
			lastActiveBtn.classList.remove('active')
		}
		defaultBtn.classList.remove('active')
		btn.classList.add('active')
		lastActiveBtn = btn
	})
	// btn.addEventListener('click', showOverlay)
})
