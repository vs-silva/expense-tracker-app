import type {ExpenseDTO} from "../../core/dtos/expense.dto.ts";

export interface ExpensesServiceWriterDrivenPorts {
    add(expense: ExpenseDTO):void;
    remove(id: string):void;
}