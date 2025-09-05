function cleanText(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  return str.replace(/[^a-z0-9]/gi, '').toLowerCase();
}

function isPalindrome(str) {
  const cleaned = cleanText(str);
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

document.getElementById('check-btn').addEventListener('click', function () {
  const input = document.getElementById('text-input').value.trim();
  const resultEl = document.getElementById('result');

  if (!input) {
    alert('Please input a value');
    return;
  }

  if (isPalindrome(input)) {
    resultEl.textContent = `${input} is a palindrome.`;
  } else {
    resultEl.textContent = `${input} is not a palindrome.`;
  }
});
