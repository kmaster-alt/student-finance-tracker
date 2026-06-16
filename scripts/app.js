const form = document.getElementById("transaction-form");
const recordsBody = document.getElementById("records-body");
const message = document.getElementById("message");
const searchInput = document.getElementById("search");
const totalCount = document.getElementById("total-count");
const totalAmount = document.getElementById("total-amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

form.addEventListener("submit", addTransaction);
searchInput.addEventListener("input", searchTransactions);

render();

function addTransaction(e) {
    e.preventDefault();

    const transaction = {
        id: Date.now(),
        description: form.description.value,
        amount: form.amount.value,
        category: form.category.value,
        date: form.date.value
    };

    transactions.push(transaction);
    save();

    form.reset();
    message.textContent = "Transaction added!";
    render();
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    save();
    render();
}

function searchTransactions() {
    let filtered = transactions;

    try {
        const regex = new RegExp(this.value, "i");
        filtered = transactions.filter(t =>
            regex.test(t.description) ||
            regex.test(t.category) ||
            regex.test(t.date)
        );
    } catch {
        filtered = transactions;
    }

    render(filtered);
}

function render(data = transactions) {
    recordsBody.innerHTML = data.map(t => `
        <tr>
            <td>${t.description}</td>
            <td>${t.amount}</td>
            <td>${t.category}</td>
            <td>${t.date}</td>
            <td><button onclick="deleteTransaction(${t.id})">Delete</button></td>
        </tr>
    `).join("");

    totalCount.textContent = transactions.length;

    totalAmount.textContent = transactions
        .reduce((sum, t) => sum + Number(t.amount), 0)
        .toFixed(2);
}

function save() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}