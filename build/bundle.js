/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	/* global Tesseract */

	(function () {
	  'use strict';

	  const fileInput = document.getElementById('file-input');
	  fileInput.addEventListener('change', fileAdded);

	  function fileAdded(event) {
	    const files = event.target.files;
	    const imgElement = document.getElementById('preview-image');

	    if (files && files[0]) {
	      reset();

	      parseImage(files[0]);
	      const reader = new FileReader();

	      reader.addEventListener('load', function (e) {
	        imgElement.src = e.target.result;
	      });

	      reader.readAsDataURL(files[0]);
	    }
	  }

	  function parseImage(image) {
	    Tesseract.recognize(image, {
	      tessedit_char_blacklist: 'abcdefghijklmnopqrstuvwxyzæøåABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ'
	    }).progress(message => {
	      if (message.status === 'recognizing text') {
	        const progressContainer = document.getElementById('progress-container');
	        progressContainer.style.visibility = 'visible';

	        const progressElm = document.getElementById('progress-bar');
	        progressElm.style.width = 100 * message.progress + '%';
	      }
	    }).then(result => {
	      const resultBox = document.getElementById('result-box');
	      let sum = 0;

	      result.words.forEach(word => {
	        if (word.text.match(/[0-9]+/)) {
	          resultBox.innerHTML += word.text + '<br />';
	          sum += +word.text;
	        }
	      });

	      resultBox.innerHTML += '<hr />SUM:' + sum + '<hr />';
	    });
	  }
	  function reset() {
	    const progressContainer = document.getElementById('progress-container');
	    progressContainer.style.visibility = 'hidden';

	    const progressElm = document.getElementById('progress-bar');
	    progressElm.style.width = 0;

	    const resultBox = document.getElementById('result-box');
	    resultBox.innerHTML = '';
	  }
	})();

/***/ }
/******/ ]);