import throttle from 'lodash.throttle';
const LOCAL_STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onSubmitForm);
form.addEventListener('input', throttle(onInputForm, 500));

function onSubmitForm(e) {
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
  form.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

const saveDate = {};
function onInputForm(e) {
  const { name, value } = e.target;
  saveDate[name] = value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saveDate));
}

function onFillInput() {
  const storObj = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (!storObj) return;
  Object.keys(storObj).forEach(el => {
    form.elements[el].value = storObj[el];
  });
}
onFillInput();
