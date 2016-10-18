/* global Tesseract */

(function() {
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

      reader.addEventListener('load', function(e) {
        imgElement.src = e.target.result;
      });

      reader.readAsDataURL(files[0]);
    }
  }

  function parseImage(image) {
    Tesseract.recognize(image, {
      tessedit_char_blacklist: 'abcdefghijklmnopqrstuvwxyzæøå'
    })
    .progress(message => {
      if (message.status === 'recognizing text') {
        const progressContainer = document.getElementById('progress-container');
        progressContainer.style.visibility = 'visible';

        const progressElm = document.getElementById('progress-bar');
        progressElm.style.width = 100 * message.progress + '%';
      }
    })
    .then((result) => {
      const resultBox = document.getElementById('result-box');
      let sum = 0;

      result.words.forEach((word) => {
        if (word.text.match(/\d/)) {
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
