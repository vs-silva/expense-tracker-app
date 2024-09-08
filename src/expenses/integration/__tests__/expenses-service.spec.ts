import {describe, expect, test, vi} from "vitest";
import {faker} from "@faker-js/faker";
import {ExpensesServicesDriverPorts} from "../ports/driver/expenses-services-driver.ports.ts";
import {ExpensesService} from "../expenses.service.ts";
import type {ExpenseDTO} from "../core/dtos/expense.dto.ts";
import {ArrayReaderAdapter} from "../adapters/array-reader.adapter.ts";
import {ArrayWriterAdapter} from "../adapters/array-writer.adapter.ts";

describe("Expenses Service tests", () => {

    const service: ExpensesServicesDriverPorts = ExpensesService(
        ArrayReaderAdapter(),
        ArrayWriterAdapter()
    );

    describe("calculateTotalExpensesCost port tests", () => {

        test('calculateTotalExpensesCost should be exist on the service', () => {
            expect(service.calculateTotalExpensesCost).toBeDefined();
            expect(service.calculateTotalExpensesCost).toBeInstanceOf(Function);
        });

        test("calculateTotalExpensesCost return the total sum of expenses amount", () => {

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

        test('getAllExpenses should be exist on the service', () => {
            expect(service.getAllExpenses).toBeDefined();
            expect(service.getAllExpenses).toBeInstanceOf(Function);
        });

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

        test('registerExpense should be exist on the service', () => {
            expect(service.registerExpense).toBeDefined();
            expect(service.registerExpense).toBeInstanceOf(Function);
        });

        test('registerExpense should register a new expense to the expenses collection', () => {

            const initialExpenses = service.getAllExpenses();
            expect(initialExpenses.length).toEqual(0);

            const fakeExpense : ExpenseDTO = {
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

    describe('getExpenseById port tests', () => {

        test('getExpenseById should be exist on the service', () => {
            expect(service.getExpenseById).toBeDefined();
            expect(service.getExpenseById).toBeInstanceOf(Function);
        });

        test('getExpenseById should return an expense by id', () => {

            const fakeExpense : ExpenseDTO = {
                title: faker.lorem.word(),
                description: faker.lorem.sentence(),
                cost: faker.number.int({min: 10, max: 200})
            };

            service.registerExpense(fakeExpense);
            const allExpenses = service.getAllExpenses();
            expect(allExpenses.length).toBeGreaterThan(0);

            const lastExpense = allExpenses[allExpenses.length - 1] as ExpenseDTO;
            const lastExpenseId: string = lastExpense.id as string;

            const spy = vi.spyOn(service, 'getExpenseById');
            const expense = service.getExpenseById(lastExpenseId);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(lastExpenseId);

            expect(expense).toBeDefined();
            expect(expense.id).toEqual(lastExpenseId);

            expect(expense).toEqual(expect.objectContaining(<ExpenseDTO>{
                id: expect.any(String),
                title: expect.any(String),
                description: expect.any(String),
                cost: expect.any(Number)
            }));

        });

    });

    describe('removeExpense port tests', () => {

        test('removeExpense should be exist on the service', () => {
            expect(service.removeExpense).toBeDefined();
            expect(service.removeExpense).toBeInstanceOf(Function);
        });

        test('removeExpense remove an existent expense from the expenses collection', () => {

            const fakeExpense : ExpenseDTO = {
                title: faker.lorem.word(),
                description: faker.lorem.sentence(),
                cost: faker.number.int({min: 10, max: 100})
            };

            service.registerExpense(fakeExpense);

            const initialAllExpenses = service.getAllExpenses();
            expect(initialAllExpenses.length).toBeGreaterThan(0);

            const lastExpense = initialAllExpenses[initialAllExpenses.length - 1] as ExpenseDTO;
            const lastExpenseId: string = lastExpense.id as string;

            const spy = vi.spyOn(service, 'removeExpense');
            service.removeExpense(lastExpenseId);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(lastExpenseId);

            const afterAllExpenses = service.getAllExpenses();
            expect(afterAllExpenses.length).toBeLessThan(initialAllExpenses.length);
        });

    });

    describe('removeAllExpenses port tests', () => {

        test('removeAllExpenses should be exist on the service', () => {
            expect(service.removeAllExpenses).toBeDefined();
            expect(service.removeAllExpenses).toBeInstanceOf(Function);
        });

        test('removeAllExpenses should remove all existent expenses', () => {

            const fakeExpense : ExpenseDTO = {
                title: faker.lorem.word(),
                description: faker.lorem.sentence(),
                cost: faker.number.int({min: 10, max: 100})
            };

            service.registerExpense(fakeExpense);
            const initialAllExpenses = service.getAllExpenses();
            expect(initialAllExpenses.length).toBeGreaterThan(0);

            const spy = vi.spyOn(service, 'removeAllExpenses');
            service.removeAllExpenses();

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith();

            const afterAllExpenses = service.getAllExpenses();
            expect(afterAllExpenses.length).toEqual(0);

        });

    });

    describe('updateExpense port tests', () => {

        test('updateExpense should be exist on the service', () => {
            expect(service.updateExpense).toBeDefined();
            expect(service.updateExpense).toBeInstanceOf(Function);
        });

        test('updateExpense should update an existent expense', () => {

            const fakeExpense : ExpenseDTO = {
                title: faker.lorem.word(),
                description: faker.lorem.sentence(),
                cost: faker.number.int({min: 5, max: 150})
            };

            service.registerExpense(fakeExpense);

            let allExpenses = service.getAllExpenses();
            expect(allExpenses.length).toBeGreaterThan(0);

            const fakeUpdatedExpense = <ExpenseDTO>{
                id: (allExpenses[allExpenses.length - 1] as ExpenseDTO).id,
                title: faker.lorem.word(),
                description: faker.lorem.sentence(),
                cost: faker.number.int({min: 10, max: 100})
            }

            const spy = vi.spyOn(service, 'updateExpense');
            service.updateExpense(fakeUpdatedExpense);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeUpdatedExpense);

            allExpenses = service.getAllExpenses();
            const updatedExpense = allExpenses[allExpenses.length - 1] as ExpenseDTO;

            expect(updatedExpense.id).toEqual(fakeUpdatedExpense.id);
            expect(updatedExpense.title).toEqual(fakeUpdatedExpense.title);
            expect(updatedExpense.description).toEqual(fakeUpdatedExpense.description);
            expect(updatedExpense.cost).toEqual(fakeUpdatedExpense.cost);

            expect(updatedExpense.title).not.toEqual(fakeExpense.title);
            expect(updatedExpense.description).not.toEqual(fakeExpense.description);
            expect(updatedExpense.cost).not.toEqual(fakeExpense.cost);

        });

    });


});