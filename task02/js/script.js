// Получаем элементы
const numberInput = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');

function intToRoman(num) {
  const dec = 'IVXLCDM';
  let rom = '';
  let p = 0;

  while (num > 0) {
    const k = num % 10;
    num = Math.floor(num / 10);

    if (k === 4 || k === 9) {
      rom = dec[p] + dec[p + 1 + (k === 9 ? 1 : 0)] + rom;
    } else if (k > 0) {
      rom =
        (k >= 5 ? dec[p + 1] : '') +
        dec[p].repeat(k - 5 * (k >= 5 ? 1 : 0)) +
        rom;
    }

    p += 2;
  }

  return rom;
}

convertBtn.addEventListener('click', () => {
  const value = numberInput.value.trim(); // Получаем введённое значение и убираем пробелы

  // Проверка на пустое значение или не число
  if (value === '' || isNaN(value)) {
    output.textContent = 'Please enter a valid number';
    return;
  }

  const number = parseInt(value, 10);

  // Проверка на меньше 1
  if (number < 1) {
    output.textContent = 'Please enter a number greater than or equal to 1';
    return;
  }

  // Проверка на больше или равно 4000
  if (number >= 4000) {
    output.textContent = 'Please enter a number less than or equal to 3999';
    return;
  }

  // Если всё в пределах, можно выполнить конвертацию (пример)
  output.textContent = `${intToRoman(number)}`;
});
