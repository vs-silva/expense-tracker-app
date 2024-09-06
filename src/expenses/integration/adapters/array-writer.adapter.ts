import {ExpenseDTO} from "../core/dtos/expense.dto.ts";
import {ExpensesServiceWriterDrivenPorts} from "../ports/driven/expenses-service-writer-driven.ports.ts";

export function ArrayWriterAdapter(dataProvider:[]): ExpensesServiceWriterDrivenPorts {

    if(!Array.isArray(dataProvider)) {
        throw new Error("Provide an simple array as dataProvider");
    }

    function add(expense: ExpenseDTO): void {
        dataProvider.push(<never>{
            id: expense.id,
            title: expense.title,
            description: expense.description,
            cost: expense.cost
        });
    }

    return {
      add
    };
}