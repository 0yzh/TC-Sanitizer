const _regex = /(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)|(\d{1,2},)|(\d{4}\s)|((0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9](am|pm)|(0[0-9]|1[0-9]|2[0-3]|[0-9])(am|pm))/g;

// const _regex = /(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)|(\d{1,2},)|(\d{4})|(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9](am|pm)/g;
const original = document.querySelector('.original');
const submit = document.querySelector('.submit');
const clipboard = document.querySelector('.clipboard');
const updated = document.querySelector('.sanitized');

const sanitize = () => {
  const _stored = [];
  const _serialized = original.value.split(' ');
  _serialized.forEach(e => {
    if (e.search(_regex) !== -1) {
      _stored.push(e.replace(e, e.split('').join('&#xfeff;')));
    } else {
      _stored.push(e);
    }
  });
  updated.value = _stored.join(' ');
};

const copyToClipboard = () => {
  const compiledCopy = updated.value;
  const dummyInput = document.createElement('input');
  dummyInput.setAttribute('id', 'dummy-input');
  document.body.appendChild(dummyInput);
  document.getElementById('dummy-input').value = compiledCopy;
  dummyInput.select();
  document.execCommand('copy');
  document.body.removeChild(dummyInput);
};

submit.addEventListener('click', sanitize);
clipboard.addEventListener('click', copyToClipboard);
