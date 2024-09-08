import {ExpenseDTO} from "../../core/dtos/expense.dto.ts";

export interface ExpensesServicesDriverPorts {
    calculateTotalExpensesCost(expenses: ExpenseDTO[]): number;
    getAllExpenses(): ExpenseDTO[];
    registerExpense(expense: ExpenseDTO): void;
    getExpenseById(expenseId: string): ExpenseDTO;
    removeExpense(expenseId: string): void;
    removeAllExpenses():void;
    updateExpense(expense: ExpenseDTO):void;
}