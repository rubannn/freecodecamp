const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const output = document.getElementById('results-div');

function isValidPhoneNumber(number) {
  const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
  return phoneRegex.test(number);
}

checkBtn.addEventListener('click', () => {
  let number = userInput.value.trim();
  if (!number) alert('Please provide a phone number');

  if (isValidPhoneNumber(number)) {
    output.innerText = `Valid US number: ${number}`;
  } else {
    output.innerText = `Invalid US number: ${number}`;
  }
  userInput.value = '';
});

clearBtn.addEventListener('click', () => {
  output.innerText = '';
});
