// Provided variables
let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
];

const displayChangeDue = document.getElementById('change-due');
const cashInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');

// Display initial values
document.getElementById('price-value').textContent = `$${price.toFixed(2)}`;
document.getElementById(
  'cid-value'
).textContent = `$${calculateTotalCid().toFixed(2)}`;

// Calculate total cash in drawer
function calculateTotalCid() {
  return cid.reduce((total, [, amount]) => total + amount, 0);
}

// Purchase button click event
purchaseBtn.addEventListener('click', () => {
  let cash = parseFloat(cashInput.value);

  // Validate input
  if (isNaN(cash) || cash < 0) {
    alert('Please enter a valid cash amount');
    return;
  }

  if (cash < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  }

  if (cash === price) {
    displayChangeDue.textContent =
      'No change due - customer paid with exact cash';
    return;
  }

  // Calculate change
  const result = checkCashRegister(price, cash, cid);
  displayChangeDue.innerHTML = formatResult(result);
});

// Cash register function
function checkCashRegister(price, cash, cid) {
  const currencyUnits = [
    { name: 'ONE HUNDRED', value: 100 },
    { name: 'TWENTY', value: 20 },
    { name: 'TEN', value: 10 },
    { name: 'FIVE', value: 5 },
    { name: 'ONE', value: 1 },
    { name: 'QUARTER', value: 0.25 },
    { name: 'DIME', value: 0.1 },
    { name: 'NICKEL', value: 0.05 },
    { name: 'PENNY', value: 0.01 },
  ];

  let changeDue = cash - price;
  let totalCid = 0;

  // Create a copy of cid and calculate total
  const cidCopy = JSON.parse(JSON.stringify(cid));
  for (let i = 0; i < cidCopy.length; i++) {
    totalCid += cidCopy[i][1];
  }
  totalCid = Math.round(totalCid * 100) / 100;

  // Check conditions
  if (changeDue > totalCid) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  }

  if (changeDue === totalCid) {
    return { status: 'CLOSED', change: cid };
  }

  // Calculate change
  const change = [];
  for (let i = 0; i < currencyUnits.length; i++) {
    const unit = currencyUnits[i];
    const cidIndex = cidCopy.findIndex(item => item[0] === unit.name);
    let availableAmount = cidCopy[cidIndex][1];
    let unitCount = 0;

    while (changeDue >= unit.value && availableAmount > 0) {
      changeDue = Math.round((changeDue - unit.value) * 100) / 100;
      availableAmount = Math.round((availableAmount - unit.value) * 100) / 100;
      unitCount += unit.value;
    }

    if (unitCount > 0) {
      change.push([unit.name, unitCount]);
      cidCopy[cidIndex][1] = availableAmount;
    }
  }

  if (changeDue > 0) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  }

  return { status: 'OPEN', change };
}

// Format result for display
function formatResult(result) {
  let output = `Status: ${result.status}`;

  if (result.status === 'OPEN') {
    result.change.forEach(item => {
      if (item && item[1] > 0) {
        output += `<p>${item[0]}: $${item[1]}</p>`;
      }
    });
  } else if (result.status === 'CLOSED') {
    const currencyOrder = [
      'PENNY',
      'NICKEL',
      'DIME',
      'QUARTER',
      'ONE',
      'FIVE',
      'TEN',
      'TWENTY',
      'ONE HUNDRED',
    ];

    currencyOrder.forEach(unit => {
      const item = result.change.find(i => i[0] === unit);
      if (item && item[1] > 0) {
        output += `<p>${item[0]}: $${item[1]}</p>`;
      }
    });
  }

  return output;
}
