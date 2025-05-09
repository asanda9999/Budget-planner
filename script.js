let income = 0;
let limits = {
  needs: 0,
  wants: 0,
  savings: 0
};

let totals = {
  needs: 0,
  wants: 0,
  savings: 0
};

function calculateBudget() {
  income = parseFloat(document.getElementById('income').value);
  if (isNaN(income) || income <= 0) {
    alert('Please enter a valid income.');
    return;
  }

  limits.needs = income * 0.5;
  limits.wants = income * 0.3;
  limits.savings = income * 0.2;

  totals.needs = 0;
  totals.wants = 0;
  totals.savings = 0;

  ['needs', 'wants', 'savings'].forEach(category => {
    document.getElementById(`${category}-list`).innerHTML = '';
    document.getElementById(`${category}-amount`).textContent = `Budget: R${limits[category].toFixed(2)}`;
    document.getElementById(`${category}-remaining`).textContent = `Remaining: R${limits[category].toFixed(2)}`;
  });

  // Reset remaining balance message
  updateRemainingBalance();
}

function addItem(category) {
  const itemInput = document.getElementById(`${category}-item`);
  const priceInput = document.getElementById(`${category}-price`);
  const itemName = itemInput.value.trim();
  const itemPrice = parseFloat(priceInput.value);

  if (itemName === '' || isNaN(itemPrice) || itemPrice <= 0) {
    alert('Please enter a valid item and price.');
    return;
  }

  if (totals[category] + itemPrice > limits[category]) {
    alert(`You've reached your ${category === 'needs' ? '50%' : category === 'wants' ? '30%' : '20%'} limit for ${capitalize(category)}.`);
    return;
  }

  const list = document.getElementById(`${category}-list`);
  const li = document.createElement('li');
  li.textContent = `${itemName} - R${itemPrice.toFixed(2)}`;
  list.appendChild(li);

  totals[category] += itemPrice;

  const remaining = limits[category] - totals[category];
  document.getElementById(`${category}-remaining`).textContent = `Remaining: R${remaining.toFixed(2)}`;

  // Update the overall remaining balance
  updateRemainingBalance();

  // Clear inputs
  itemInput.value = '';
  priceInput.value = '';
}

function updateRemainingBalance() {
  const totalSpent = totals.needs + totals.wants + totals.savings;
  const totalRemaining = income - totalSpent;

  const remainingMessage = document.getElementById('remaining-message');

  if (totalRemaining > 0) {
    remainingMessage.textContent = `This is what you have left this month: R${totalRemaining.toFixed(2)}`;
  } else {
    remainingMessage.textContent = `You've exceeded your budget for this month.`;
  }
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
