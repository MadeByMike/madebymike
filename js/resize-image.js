(function () {
	var make_resizeable = function(obj){

		var resize_handle = document.createElement('div');
		resize_handle.classList.add('js-resizable-handle');
		obj.appendChild(resize_handle);

		resize_handle.addEventListener('mousedown', initDrag, false);
		resize_handle.addEventListener('touchstart', initDrag, false);

		var startX, startWidth, startHeight;

		function initDrag(e) {
			startX = e.clientX || e.touches[0].clientX;
			startWidth = parseInt(document.defaultView.getComputedStyle(obj).width, 10);
			document.documentElement.addEventListener('mousemove', doDrag, false);
			document.documentElement.addEventListener('touchmove', doDrag, false);
			document.documentElement.addEventListener('mouseup', stopDrag, false);
			document.documentElement.addEventListener('touchend', stopDrag, false);
			document.documentElement.addEventListener('touchcancel', stopDrag, false);
		}

		function doDrag(e) {			
			var newX = e.clientX || e.touches[0].clientX;
			obj.style.width = (startWidth + newX - startX) + 'px';
		}

		function stopDrag(e) {
			document.documentElement.removeEventListener('mousemove', doDrag, false);
			document.documentElement.removeEventListener("touchmove", doDrag, false);
			document.documentElement.removeEventListener('mouseup', stopDrag, false);
			document.documentElement.removeEventListener('touchend', stopDrag, false);
			document.documentElement.removeEventListener('touchcancel', stopDrag, false);
		}

	}

	var resizable = document.querySelectorAll('.js-resizable');
	for(var i=0; i < resizable.length; i++){
		make_resizeable(resizable[i]);
	}

	window.onresize = function(event) {
		for(var i=0; i < resizable.length; i++){
			resizable[i].removeAttribute("style");
		}
	};

})();
