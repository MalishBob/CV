//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
const skillsArr = {
	'CMS / Frameworks / library': {
		'Bitrix': '80%',
		'MODX': '90%',
		'WordPress': '40%',
		'Joomla': '40%',
		'Simpla': '30%',
		'UMI': '30%'
	},
	'Languages': {
		'HTML': '95%',
		'CSS': '90%',
		'JavaScript': '30%',
		'Jquery': '70%',
		'PHP': '40%',
		'SQL': '40%'
	},
	'Personal': {
		'linux': '40%',
		'apache': '45%',
		'nginx': '45%'
	}
}
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

function scrollToTargetAdjusted(element){
	var headerOffset = 40;
	var bodyRect = document.body.getBoundingClientRect().top;
	var elementRect = element.getBoundingClientRect().top;
	var elementPosition = elementRect - bodyRect;
	var offsetPosition = elementPosition - headerOffset;

	console.log(offsetPosition);

	window.scrollTo({
		top: offsetPosition,
		behavior: "smooth"
	});
}

function addSkills(){
	var i = 0;
	var j = 0;
	for (var section in skillsArr) {
		i++;

		skillItemSect = document.createElement("div");
		skillItemSect.classList.add('skills-block');
		skillItemSect.classList.add('skills-block-'+i);
		skillItemSect.innerHTML = `<h4>${section}</h4>`;

		document.querySelector('.skills-wrap').appendChild(skillItemSect);

		sect = skillsArr[section];
		for (var item in sect) {
			j++;
			
			skillItemElm = document.createElement("div");
			skillItemElm.classList.add('skill-progress');
			skillItemElm.innerHTML = `
									<div class="skill-progress-title">${sect[item]} ${item}</div>
									<div class="skill-progress-max"></div>
									<div class="skill-progress-current" style="width: ${sect[item]};">
										<div class="skill-progress-current-inner"></div>
									</div>
									`;
			skillItemSect.appendChild(skillItemElm);
		}
	}
}

function createPDF() {
	var element = document.getElementById('toPrint');
	var opt = {
	  margin:       1,
	  filename:     'Azad_MAMEDOV_CV.pdf',
	  image:        { type: 'jpeg', quality: 0.98 },
	  html2canvas:  { scale: 2 },
	  jsPDF:        { unit: 'mm', format: [310, 414.5], orientation: 'portrait' }
	};

	html2pdf().set(opt).from(element).save();
}

function trackScroll() {
	var scrolled = window.pageYOffset;
	var coords = document.documentElement.clientHeight;

	if (scrolled > coords) {
		goTopBtn.classList.add('back_to_top-show');
	}
	if (scrolled < coords) {
		goTopBtn.classList.remove('back_to_top-show');
	}
}

function backToTop() {
	if (window.pageYOffset > 0) {
		window.scrollBy(0, -80);
		setTimeout(backToTop, 5);
	}
}

window.onload = function() {
	const anchors = document.querySelectorAll('a.scroll-to')
	for (let anchor of anchors) {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()
			const blockID = anchor.getAttribute('href')
			scrollToTargetAdjusted(document.querySelector(blockID));
			burger_menu_close.click();
		})
	}

	window.addEventListener('scroll', function(e){
		elmSkills = document.getElementById('skills');
		skillsWrap = elmSkills.querySelector('.skills-wrap');
		offset = 150;

		if(document.documentElement.scrollTop+offset >= elmSkills.offsetTop && !skillsWrap.childNodes.length) {
			addSkills();
		}
	});

	download_pdf.addEventListener('click', function(){
		createPDF();
	});


	// Open burger menu
	burger_menu.addEventListener('click', function(){
		let burger_menu = document.querySelector('header nav.mobile');
		burger_menu_overlay.classList.add('overlay-active');
		burger_menu.classList.add("mobile-nav-active");
	});

	// Close burger menu
	burger_menu_close.addEventListener('click', function(){
		let burger_menu = document.querySelector('header nav.mobile');
		burger_menu.classList.remove("mobile-nav-active");
		burger_menu_overlay.classList.remove('overlay-active');
	});

	burger_menu_overlay.addEventListener('click', function(){
		burger_menu_close.click();
		burger_menu_overlay.classList.remove('overlay-active');
	});


	// Scroll to top
	window.addEventListener('scroll', trackScroll);
	goTopBtn.addEventListener('click', backToTop);
}








