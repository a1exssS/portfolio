import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock'
const menu = document.querySelector('[data-menu]')
const openButton = document.querySelector('[data-menu-open]')
const closeButton = document.querySelector('[data-menu-close]')
const headerLinks = document.querySelectorAll('.navigation__link')
headerLinks.forEach(event => {
	event.addEventListener('click', () => {
		menu.dataset.menu = 'close'
		enableBodyScroll(menu)
		openButton.innerHTML = `
		<svg class="header__img-icon">
			<use xlink:href="/assets/images/sprite.svg#menu" />
		</svg>`
	})
})
function toggleMenu() {
	if (menu.getAttribute('data-menu') === 'open') {
		menu.dataset.menu = 'close'
		enableBodyScroll(menu)
		openButton.innerHTML = `
		<svg class="header__img-icon">
			<use xlink:href="/assets/images/sprite.svg#menu" />
		</svg>`
	} else {
		menu.dataset.menu = 'open'
		disableBodyScroll(menu)
		openButton.innerHTML = `
		<svg class="header__img-icon">
			<use xlink:href="/assets/images/sprite.svg#close" />
		</svg>`
	}
}

openButton.addEventListener('click', toggleMenu)
closeButton.addEventListener('click', toggleMenu)
