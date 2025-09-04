

import csv
import os

FILE = "expenses.csv"

# Ensure file exists
if not os.path.exists(FILE):
    with open(FILE, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["Amount", "Category", "Note"])

def add_expense(amount, category, note):
    with open(FILE, "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([amount, category, note])
    print("✅ Expense saved!")

def view_expenses():
    with open(FILE, "r") as f:
        reader = csv.reader(f)
        next(reader)  # skip header
        for row in reader:
            print(f"Amount: {row[0]} | Category: {row[1]} | Note: {row[2]}")

def total_expenses():
    total = 0
    with open(FILE, "r") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            total += float(row[0])
    print(f"💵 Total spent: {total}")

while True:
    print("\n1. Add Expense\n2. View Expenses\n3. View Total\n4. Exit")
    choice = input("Enter your choice: ")

    if choice == "1":
        amount = input("Enter amount: ")
        category = input("Enter category: ")
        note = input("Enter note: ")
        add_expense(amount, category, note)
    elif choice == "2":
        view_expenses()
    elif choice == "3":
        total_expenses()
    elif choice == "4":
        print("👋 Exiting...")
        break
    else:
        print("❌ Invalid choice. Try again.")
