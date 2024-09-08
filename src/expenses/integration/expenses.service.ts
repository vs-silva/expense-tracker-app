import type {ExpenseDTO} from "./core/dtos/expense.dto.ts";
import {ExpensesServicesDriverPorts} from "./ports/driver/expenses-services-driver.ports.ts";
import {ExpensesServiceReaderDrivenPorts} from "./ports/driven/expenses-service-reader-driven.ports.ts";
import {ExpensesServiceWriterDrivenPorts} from "./ports/driven/expenses-service-writer-driven.ports.ts";


export function ExpensesService(reader: ExpensesServiceReaderDrivenPorts, writer: ExpensesServiceWriterDrivenPorts): ExpensesServicesDriverPorts {

    function calculateTotalExpensesCost(expenses: ExpenseDTO[]): number {
        return expenses.reduce((accumulator: number, expense: ExpenseDTO):number => ( accumulator + expense.cost), 0);
    }

    function getAllExpenses(): ExpenseDTO[] {
        return reader.get() as ExpenseDTO[];
    }

    function registerExpense(expense: ExpenseDTO):void {
        writer.write(expense);
    }

    function removeExpense(expenseId: string):void {
        writer.remove(expenseId);
    }

    function getExpenseById(expenseId: string): ExpenseDTO {
        return reader.get(expenseId) as ExpenseDTO;
    }

    function removeAllExpenses(): void {
        writer.remove();
    }

    function updateExpense(expense: ExpenseDTO): void {
        const existentExpense: ExpenseDTO | undefined = getExpenseById(expense.id as string);

        if(!existentExpense) {
            return;
        }

        writer.write(expense);
    }

    return {
        calculateTotalExpensesCost,
        getAllExpenses,
        registerExpense,
        removeExpense,
        getExpenseById,
        removeAllExpenses,
        updateExpense
    };
}