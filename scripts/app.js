const form = document.getElementById("transaction-form");
const recordsBody = document.getElementById("records-body");
const message = document.getElementById("message");

let transactions = [];

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let description = document.getElementById("description").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;

    // Regex validation
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
        description,
        amount,
        category,
        date
    };

    transactions.push(transaction);

    displayTransactions();

    message.textContent = "Transaction added successfully";

    form.reset();
});

function displayTransactions() {

    recordsBody.innerHTML = "";

    transactions.forEach(function (transaction) {

        recordsBody.innerHTML += `
        <tr>
            <td>${transaction.description}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.category}</td>
            <td>${transaction.date}</td>
        </tr>
        `;
    });

}