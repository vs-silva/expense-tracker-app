import {ExpenseDTO} from "../../core/dtos/expense.dto.ts";

export interface ExpensesServiceWriterDrivenPorts {
    add(expense: ExpenseDTO):void;
}