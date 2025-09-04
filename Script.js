// Select elements
const form = document.getElementById('transaction-form');
const descInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const transactionsList = document.getElementById('transactions-list');
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('money-plus');
const expenseEl = document.getElementById('money-minus');

// Get transactions from localStorage or start empty
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function save() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateTotals() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, a) => acc + a, 0);
  const income = amounts.filter(a => a > 0).reduce((acc, a) => acc + a, 0);
  const expense = amounts.filter(a => a < 0).reduce((acc, a) => acc + a, 0);

  balanceEl.textContent = `₹${total.toFixed(2)}`;
  incomeEl.textContent = `₹${income.toFixed(2)}`;
  expenseEl.textContent = `₹${Math.abs(expense).toFixed(2)}`;
}

function renderTransactions() {
  transactionsList.innerHTML = '';
  transactions.forEach(t => {
    const li = document.createElement('li');
    li.className = t.amount < 0 ? 'minus' : 'plus';
    li.innerHTML = `
      <div>
        <strong>${t.description}</strong>
        <div class="small-date">${t.date}</div>
      </div>
      <div>
        <span>${t.amount < 0 ? '-' : '+'}₹${Math.abs(t.amount).toFixed(2)}</span>
        <button class="delete-btn" data-id="${t.id}">✕</button>
      </div>
    `;
    transactionsList.appendChild(li);
  });
  updateTotals();
}

function addTransaction(e) {
  e.preventDefault();
  const description = descInput.value.trim();
  const amountValue = parseFloat(amountInput.value);
  const type = typeSelect.value;

  if (!description || isNaN(amountValue)) {
    alert('Please enter valid description and amount');
    return;
  }

  const amount = type === 'expense' ? -Math.abs(amountValue) : Math.abs(amountValue);

  const transaction = {
    id: Date.now(),
    description,
    amount,
    date: new Date().toISOString().split('T')[0]
  };

  transactions.unshift(transaction); // newest first
  save();
  renderTransactions();
  form.reset();
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  save();
  renderTransactions();
}

// Event listeners
form.addEventListener('submit', addTransaction);

transactionsList.addEventListener('click', (e) => {
  if (e.target.matches('.delete-btn')) {
    const id = Number(e.target.dataset.id);
    removeTransaction(id);
  }
});

// initial render
renderTransactions();
