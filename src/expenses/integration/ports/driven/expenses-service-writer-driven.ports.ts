import type {ExpenseDTO} from "../../core/dtos/expense.dto.ts";

export interface ExpensesServiceWriterDrivenPorts {
    write(expense: ExpenseDTO):void;
    remove(id?: string):void;
}
