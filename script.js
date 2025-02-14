// Initialize variables
let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

// Currency unit values
const currencyUnit = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

// Initialize variables and currency unit values remain the same

// Function to calculate change
function calculateChange(price, cash, cid) {
  let changeDue = Math.round((cash - price) * 100) / 100;
  let totalCID = Math.round(cid.reduce((acc, curr) => acc + curr[1], 0) * 100) / 100;
  
  // Handle exact change
  if (changeDue === 0) {
    return "No change due - customer paid with exact cash";
  }
  
  // Handle insufficient cash
  if (changeDue < 0) {
    return "Customer does not have enough money to purchase the item";
  }
  
  // Handle exact drawer amount
  if (changeDue === totalCID) {
    return "Status: CLOSED " + cid
      .filter(item => item[1] > 0)
      .map(item => `${item[0]}: $${item[1]}`)
      .join(" ");
  }
  
  // Calculate change with available denominations
  let change = [];
  let cidCopy = [...cid].reverse();
  
  for (let [unit, amount] of cidCopy) {
    const unitValue = currencyUnit[unit];
    let unitAmount = 0;
    amount = Math.round(amount * 100) / 100;
    
    while (changeDue >= unitValue && amount > 0) {
      changeDue = Math.round((changeDue - unitValue) * 100) / 100;
      amount = Math.round((amount - unitValue) * 100) / 100;
      unitAmount = Math.round((unitAmount + unitValue) * 100) / 100;
    }
    
    if (unitAmount > 0) {
      change.push([unit, unitAmount]);
    }
  }
  
  // Check if exact change can be given
  if (changeDue > 0) {
    return "Status: INSUFFICIENT_FUNDS";
  }
  
  // Format and return change
  return "Status: OPEN " + change
    .map(item => `${item[0]}: $${item[1]}`)
    .join(" ");
}

// Event listener code
document.addEventListener('DOMContentLoaded', function() {
  const purchaseBtn = document.getElementById('purchase-btn');
  const cashInput = document.getElementById('cash');
  const changeDisplay = document.getElementById('change-due');
  
  purchaseBtn.addEventListener('click', function() {
    const cashValue = parseFloat(cashInput.value);
    const result = calculateChange(price, cashValue, [...cid]);
    
    if (result.includes("Customer does not have enough money")) {
      alert(result);
    } else {
      changeDisplay.textContent = result;
    }
  });
});
