import {describe, expect, test, vi} from "vitest";
import {faker} from "@faker-js/faker";
import {ExpensesServicesDriverPorts} from "../ports/driver/expenses-services-driver.ports.ts";
import {ExpensesService} from "../expenses.service.ts";
import {ExpenseDTO} from "../core/dtos/expense.dto.ts";
import {ArrayReaderAdapter} from "../adapters/array-reader.adapter.ts";
import {ArrayWriterAdapter} from "../adapters/array-writer.adapter.ts";


describe("Expenses Service tests", () => {

    const fakeDataProvider: [] = [];

    const service: ExpensesServicesDriverPorts = ExpensesService(
        ArrayReaderAdapter(fakeDataProvider),
        ArrayWriterAdapter(fakeDataProvider)
    );

    describe("addExpenses port tests", () => {

        expect(service.calculateTotalExpensesCost).toBeDefined();
        expect(service.calculateTotalExpensesCost).toBeInstanceOf(Function);

        test("addExpenses return the total sum of expenses amount", () => {

            const fakeExpenses : ExpenseDTO[] = [
                <ExpenseDTO>{
                    id: faker.database.mongodbObjectId(),
                    title: faker.lorem.word(),
                    description: faker.lorem.sentence(),
                    cost: 10
                },
                <ExpenseDTO>{
                    id: faker.database.mongodbObjectId(),
                    title: faker.lorem.word(),
                    description: faker.lorem.sentence(),
                    cost: 5
                }
            ];

            const spy = vi.spyOn(service, 'calculateTotalExpensesCost');
            const result = service.calculateTotalExpensesCost(fakeExpenses);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeExpenses);

            const expected = 15;
            expect(result).toEqual(expected);

        });

    });

    describe('getAllExpenses port tests', () => {

        expect(service.getAllExpenses).toBeDefined();
        expect(service.getAllExpenses).toBeInstanceOf(Function);

        test("getAllExpenses should return an expenses collection", () => {

            const spy = vi.spyOn(service, 'getAllExpenses');
            const result = service.getAllExpenses();

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith();

            expect(result.length).toEqual(0);
        });

    });

    describe('registerExpense port tests', () => {

        expect(service.registerExpense).toBeDefined();
        expect(service.registerExpense).toBeInstanceOf(Function);

        test('registerExpense should register a new expense to the expenses collection', () => {

            const initialExpenses = service.getAllExpenses();
            expect(initialExpenses.length).toEqual(0);

            const fakeExpense : ExpenseDTO = {
              id: faker.database.mongodbObjectId(),
              title: faker.lorem.word(),
              description: faker.lorem.sentence(),
              cost: 200
            };

            const spy = vi.spyOn(service, 'registerExpense');
            service.registerExpense(fakeExpense);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeExpense);

            const result = service.getAllExpenses();
            expect(result.length).toEqual(1);

            expect(result).toEqual(expect.arrayContaining(<ExpenseDTO[]>[
                expect.objectContaining(<ExpenseDTO>{
                    id: expect.any(String),
                    title: expect.any(String),
                    description: expect.any(String),
                    cost: expect.any(Number)
                })
            ]));

        });

    });

    //getById
    //removeExpense
    //removeAllExpenses

});