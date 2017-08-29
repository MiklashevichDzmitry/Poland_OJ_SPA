const inputFile = document.getElementById('file');
const submitButton = document.getElementsByClassName('submitButton')[0];
const outputText = document.getElementById('fakeText');
const serverURN = 'https://ojworkexpert.herokuapp.com'; // You need to change this with real site name

let files = null;
let XHR = new XMLHttpRequest();
let formData = new FormData();

inputFile.addEventListener('change', function (e) {
  submitButton.disabled = false;
  submitButton.style.opacity = 1.0;
  submitButton.addEventListener('mouseover', function (e) {
    submitButton.style.backgroundColor = "gray";
  });
  submitButton.addEventListener('mouseout', function (e) {
    submitButton.style.backgroundColor = "yellow";
  });
  submitButton.style.cursor = 'pointer';

  outputText.style.fontSize = '13px';
  outputText.innerText = event.target.value || 'Some error';

  files = e.target.files;
});

submitButton.addEventListener('click', function (e) {
  formData.append("file", files[0]);
  XHR.open('post', serverURN + '/send', true);
  XHR.send(formData);
  XHR.addEventListener('readystatechange', alert('Резюме загружено. Мы свяжемся с вами!'), false);
  location.reload();
});
