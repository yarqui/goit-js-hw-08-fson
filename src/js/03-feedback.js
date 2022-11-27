import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const emailRef = document.querySelector('input');
const textRef = document.querySelector('textarea');
const submitBtnRef = document.querySelector('button');

const onSave = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const onLoad = key => {
  try {
    const serializedState = localStorage.getItem(key);

    if (serializedState === null) {
      return undefined;
    }

    const parsedData = JSON.parse(serializedState);

    emailRef.value = parsedData.email;
    textRef.value = parsedData.message;

    return parsedData;
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

onLoad('feedback-form-state');

const onInput = e => {
  const {
    elements: { email, message },
  } = e.currentTarget;

  const formData = {
    [email.name]: email.value,
    [message.name]: message.value,
  };
  onSave('feedback-form-state', formData);
};

// formRef.addEventListener('input', onInput);
formRef.addEventListener('input', throttle(onInput, 500));

function onClear(firstField, secondField) {
  firstField.value = '';
  secondField.value = '';
  localStorage.removeItem('feedback-form-state');
}

const onSubmit = e => {
  e.preventDefault();

  const {
    elements: { email, message },
  } = e.currentTarget;

  const sentData = {
    [email.name]: email.value,
    [message.name]: message.value,
  };
  console.log('sentData:', sentData);

  onClear(email, message);
};

formRef.addEventListener('submit', onSubmit);
