import {ExpensesServiceReaderDrivenPorts} from "../ports/driven/expenses-service-reader-driven.ports.ts";
import type {ExpenseDTO} from "../core/dtos/expense.dto.ts";
import InMemoryDataProvider from "../../../data-provider/in-memory-data-provider.ts";

export function ArrayReaderAdapter(): ExpensesServiceReaderDrivenPorts {

    function get(): ExpenseDTO[] {
        return InMemoryDataProvider.collection as ExpenseDTO[];
    }

    return {
      get
    };
}