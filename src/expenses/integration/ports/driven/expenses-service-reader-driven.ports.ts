import {ExpenseDTO} from "../../core/dtos/expense.dto.ts";

export interface ExpensesServiceReaderDrivenPorts {
    get(): ExpenseDTO[];
}