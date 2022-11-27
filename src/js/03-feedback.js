const formRef = document.querySelector('.feedback-form');
const emailRef = document.querySelector('input');
const textRef = document.querySelector('textarea');

const onInput = e => {
  let formInput = '';
  formInput += e.target.value;
  console.log(e.target.name, ': ', e.target.value);
};
formRef.addEventListener('input', onInput);
