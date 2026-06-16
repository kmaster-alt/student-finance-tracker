const form = document.getElementById("transaction-form");
const recordsBody = document.getElementById("records-body");
const message = document.getElementById("message");

// load from localStorage or start empty
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

render();

// submit form
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    // regex rules
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
        message.style.color = "red";
        return;
    }

    const newTransaction = {
        id: Date.now(),
        description,
        amount,
        category,
        date
    };

    transactions.push(newTransaction);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    form.reset();

    message.textContent = "Transaction added successfully";
    message.style.color = "green";

    render();
});

// render table
function render() {
    recordsBody.innerHTML = "";

    transactions.forEach(t => {
        recordsBody.innerHTML += `
            <tr>
                <td>${t.description}</td>
                <td>${t.amount}</td>
                <td>${t.category}</td>
                <td>${t.date}</td>
            </tr>
        `;
    });
}