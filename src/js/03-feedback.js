const formRef = document.querySelector('.feedback-form');
const emailRef = document.querySelector('input');
const textRef = document.querySelector('textarea');

const onInput = e => {
  console.log(e.target.value);
  e.target.reset();
};
formRef.addEventListener('input', onInput);
