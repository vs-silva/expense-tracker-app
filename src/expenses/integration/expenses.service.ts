import type {ExpenseDTO} from "./core/dtos/expense.dto.ts";
import {ExpensesServicesDriverPorts} from "./ports/driver/expenses-services-driver.ports.ts";
import {ExpensesServiceReaderDrivenPorts} from "./ports/driven/expenses-service-reader-driven.ports.ts";
import {ExpensesServiceWriterDrivenPorts} from "./ports/driven/expenses-service-writer-driven.ports.ts";


export function ExpensesService(reader: ExpensesServiceReaderDrivenPorts, writer: ExpensesServiceWriterDrivenPorts): ExpensesServicesDriverPorts {

    if(!reader) {
       throw new Error("Reader adapter does not exist");
    }

    if(!writer) {
        throw new Error("Writer adapter does not exist");
    }

    function calculateTotalExpensesCost(expenses: ExpenseDTO[]): number {
        return expenses.reduce((accumulator: number, expense: ExpenseDTO):number => ( accumulator + expense.cost), 0);
    }

    function getAllExpenses(): ExpenseDTO[] {
        return reader.get();
    }

    function registerExpense(expense: ExpenseDTO):void {
        writer.add(expense);
    }

    function removeExpense(expenseId: string):void {
        writer.remove(expenseId);
    }

    return {
        calculateTotalExpensesCost,
        getAllExpenses,
        registerExpense,
        removeExpense
    };
}