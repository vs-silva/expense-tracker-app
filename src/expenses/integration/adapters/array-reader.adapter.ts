import {ExpensesServiceReaderDrivenPorts} from "../ports/driven/expenses-service-reader-driven.ports.ts";
import type {ExpenseDTO} from "../core/dtos/expense.dto.ts";
import InMemoryDataProvider from "../../../data-provider/in-memory-data-provider.ts";

export function ArrayReaderAdapter(): ExpensesServiceReaderDrivenPorts {

    function get(id?: string): ExpenseDTO[] | ExpenseDTO {

        if(!id) {
            return InMemoryDataProvider.collection as ExpenseDTO[];
        }

        return InMemoryDataProvider.collection.find(item => (item as ExpenseDTO).id === id) as ExpenseDTO;

    }

    return {
      get
    };
}