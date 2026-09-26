function createHalloweenAmbient() {

	if(!document .body.classList.contains('theme-halloween')) {
		return;
	}

	const container = document.getElementById('ambientBg');
	if (!container) return;
	
	const icons = [
		// Череп
		`<svg viewBox="0 0 24 24" fill="none" stroke="#ff7518" stroke-width="1.5"><path d="M12 2C7.58 2 4 5.58 4 10c0 2.5 1.12 4.73 2.89 6.23.4.34.61.85.54 1.37l-.23 1.62c-.1.71.45 1.34 1.17 1.34h7.26c.72 0 1.27-.63 1.17-1.34l-.23-1.62c-.07-.52.14-1.03.54-1.37C18.88 14.73 20 12.5 20 10c0-4.42-3.58-8-8-8z"/><path d="M10 20v1M12 20v1M14 20v1M9 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM15 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>`,
		// Тыква
		`<svg viewBox="0 0 24 24" fill="none" stroke="#ff7518" stroke-width="1.5"><path d="M12 2v3M8 6c-2.5 0-4.5 2.5-4.5 6s2 6 4.5 6c1.2 0 2.3-.6 3-1.5.7.9 1.8 1.5 3 1.5 2.5 0 4.5-2.5 4.5-6s-2-6-4.5-6c-1.2 0-2.3.6-3 1.5-.7-.9-1.8-1.5-3-1.5z"/><path d="M10 11l1 1-1 1M14 11l-1 1 1 1M10 16s1 1 2 1 2-1 2-1"/></svg>`,
		// Летучая мышь
		`<svg viewBox="0 0 24 24" fill="none" stroke="#ff7518" stroke-width="1.5"><path d="M12 10c-2-3-6-4-9-2 1 2 1 4 3 5-2 2-2 4-1 6 3-1 5-3 7-1 2-2 4 0 7 1 1-2 1-4-1-6 2-1 2-3 3-5-3-2-7-1-9 2z"/></svg>`,
		// Паук
		`<svg viewBox="0 0 24 24" fill="none" stroke="#ff7518" stroke-width="1.5"><path d="M12 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M8 12c-2-1-4 0-5 2M8 15c-3 0-5 2-5 4M16 12c2-1 4 0 5 2M16 15c3 0 5 2 5 4"/></svg>`
	];
	
	for (let i = 0; i < 12; i++) {
		const item = document.createElement('div');
		item.classList.add('ambient-item');
		item.innerHTML = icons[Math.floor(Math.random() * icons.length)];
		
		const size = (22 + Math.random() * 26) + 'px';
		item.style.left = Math.random() * 90 + 'vw';
		item.style.top = Math.random() * 90+ 'vh';
		item.style.width = size;
		item.style.height = size;
		item.style.animationDuration = (6 + Math.random() * 6) + 's';
		item.style.animationDelay = (Math.random() * 4) + 's';
		item.style.opacity = (0.15 + Math.random() * 0.25).toString();
		
		container.appendChild(item);
	}
	
	for (let i = 0; i < 25; i++) {
		const dot = document.createElement('div');
		dot.classList.add('ambient-item');
		
		const dotSize = (3 + Math.random() * 5) + 'px';
		dot.style.width = dotSize;
		dot.style.height = dotSize;
		dot.style.borderRadius = '50%';
		dot.style.backgroundColor = '#ff7518';
		dot.style.boxShadow = '0 0 8px #ff7518, 0 0 12px #ff7518';
		
		dot.style.left = Math.random() * 95 + 'vw';
		dot.style.top = Math.random() * 95 + 'vh';
		dot.style.animationDuration = (3 + Math.random() * 5) + 's';
		dot.style.animationDelay = (Math.random() * 3)+ 's';
		dot.style.opacity = (0.2 + Math.random() * 0.5).toString();
		
		container.appendChild(dot);
	}
}

document.addEventListener('DOMContentLoaded', createHalloweenAmbient);

document.addEventListener('DOMContentLoaded', () => {
	const navButtons = document.querySelectorAll('.nav-btn');
	const sections = document.querySelectorAll('section[id]');
	const navBar = document.getElementById('categoryNav');

	navButtons.forEach(button => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
		
		const targetId = button.getAttribute('data-target');
		const targetSection = document.getElementById(targetId);

		if (targetSection) {

			navButtons.forEach(btn => btn.classList.remove('active'));
			button.classList.add('active');

			const navHeight = navBar ? navBar.offsetHeight : 0;
			const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;

			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});
		}
	});
});

	window.addEventListener('scroll', () => {
		let currentSectionId = '';
		const navHeight = navBar ? navBar.offsetHeight : 0;

		const isAtBottom = (window.innerHeight + window.pageYOffset) >= (document.documentElement.scrollHeight - 100);

		if (isAtBottom && sections.length > 0) {
			currentSectionId = sections[sections.length - 1].getAttribute('id');
		} else {
			sections.forEach(section => {
				const rect = section.getBoundingClientRect();

				if (rect.top <= navHeight + 100 && rect.bottom >=navHeight + 20) {
					currentSectionId = section.getAttribute('id');
					}
			});
		}
	if (currentSectionId) {
		navButtons.forEach(button => {
			if (button.getAttribute('data-target') === currentSectionId)
				if (!button.classList.contains('active')) {
					navButtons.forEach(btn => btn.classList.remove('active'));
					button.classList.add('active');

					button.scrollIntoView({
						behavior: 'smooth',
						inline: 'center',
						block: 'nearest'
					});
				}
			});
		}
	});
});
