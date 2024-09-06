import {ExpensesServiceReaderDrivenPorts} from "../ports/driven/expenses-service-reader-driven.ports.ts";
import {ExpenseDTO} from "../core/dtos/expense.dto.ts";

export function ArrayReaderAdapter(dataProvider:[]): ExpensesServiceReaderDrivenPorts {

    if(!Array.isArray(dataProvider)) {
        throw new Error("Provide an simple array as dataProvider");
    }

    function get(): ExpenseDTO[] {
        return dataProvider as ExpenseDTO[];
    }

    return {
      get
    };
}