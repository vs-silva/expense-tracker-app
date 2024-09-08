import type {ExpenseDTO} from "../core/dtos/expense.dto.ts";
import { v4 as uuidv4 } from 'uuid';
import {ExpensesServiceWriterDrivenPorts} from "../ports/driven/expenses-service-writer-driven.ports.ts";
import InMemoryDataProvider from "../../../data-provider/in-memory-data-provider.ts";

export function ArrayWriterAdapter(): ExpensesServiceWriterDrivenPorts {

    function write(expense: ExpenseDTO): void {

        if(expense.id) {
            remove(expense.id);
        }

        const temporaryCollection: unknown[] = [...InMemoryDataProvider.collection];

        temporaryCollection.push({
            id: expense.id || uuidv4(),
            title: expense.title,
            description: expense.description,
            cost: expense.cost
        });

        InMemoryDataProvider.collection = temporaryCollection;
    }

    function remove(id?: string): void {

        if(!id) {
            InMemoryDataProvider.collection = [];
            return;
        }

        const temporaryCollection: unknown[] = [...InMemoryDataProvider.collection];
        const index = temporaryCollection.findIndex(item => (item as ExpenseDTO).id === id);

        if(index !== -1) {
            temporaryCollection.splice(index, 1);
        }

        InMemoryDataProvider.collection = temporaryCollection;

    }

    return {
      write,
      remove
    };
}