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

    const description = form.description.value.trim();
    const amount = form.amount.value;
    const category = form.category.value.trim();
    const date = form.date.value;

    const descriptionRegex = /^\S(?:.*\S)?$/;
    const amountRegex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
    const categoryRegex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    if (
        !descriptionRegex.test(description) ||
        !amountRegex.test(amount) ||
        !categoryRegex.test(category) ||
        !dateRegex.test(date)
    ) {
        message.textContent = "Invalid input";
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount,
        category,
        date
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