window.onload = function() {
	const anchors = document.querySelectorAll('a.scroll-to')
	for (let anchor of anchors) {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()
			const blockID = anchor.getAttribute('href')
			scrollToTargetAdjusted(document.querySelector(blockID));
		})
	}
}



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