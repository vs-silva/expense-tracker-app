import {ExpenseDTO} from "../../core/dtos/expense.dto.ts";

export interface ExpensesServicesDriverPorts {
    calculateTotalExpensesCost(expenses: ExpenseDTO[]): number;
    getAllExpenses(): ExpenseDTO[];
    registerExpense(expense: ExpenseDTO): void;
    removeExpense(expenseId: string): void;
}