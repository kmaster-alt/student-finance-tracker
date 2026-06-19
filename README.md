# Student Finance Tracker

## About
This is a simple app built to help track student expenses. You can add transactions, view them in a table, search through them, and check totals. The data stays saved in the browser using localStorage.

## Features
- Add and delete transactions
- Search through records using text/regex
- Show total number of transactions and total amount
- Save data with localStorage
- Responsive design for mobile, tablet, and desktop

## Data
Each transaction contains:
- id
- description
- amount
- category
- date

## Validation
The app uses regex to validate:
- Description: no spaces at the beginning or end
- Amount: valid numbers with up to 2 decimal places
- Category: letters, spaces, and hyphens only
- Date: YYYY-MM-DD format
- Extra test for repeated words

## How to Use
1. Open "index.html" in a browser.
2. Fill out the form and add a transaction.
3. Use the search box to filter records.
4. Data is saved automatically.

## Testing
Open "tests.html" and check the browser console to see the regex tests.


