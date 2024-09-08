import type {ExpenseDTO} from "../../core/dtos/expense.dto.ts";

export interface ExpensesServiceReaderDrivenPorts {
    get(id?:string): ExpenseDTO[] | ExpenseDTO;
}