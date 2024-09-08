import {afterAll, beforeAll, describe, expect, test, vi} from "vitest";
import {cleanup, fireEvent, render, RenderResult} from "@testing-library/react";
import {faker} from "@faker-js/faker";
import type {ExpenseDTO} from "../../../integration/core/dtos/expense.dto.ts";
import {ListComponent} from "../list.component";
import {ExpenseEmitterService} from "../../../integration/core/services/expense-emitter.service.ts";

describe('ListComponent tests', () => {

    let component: RenderResult;

    const fakeExpensesCollections: ExpenseDTO[] = [
        {
            id: faker.database.mongodbObjectId(),
            title: faker.lorem.word(),
            description: faker.lorem.paragraph(),
            cost: faker.number.int({max: 100})
        },
        {
            id: faker.database.mongodbObjectId(),
            title: faker.lorem.word(),
            description: faker.lorem.paragraph(),
            cost: faker.number.int({max: 100})
        }
    ];

    beforeAll(() => {
        component = render(<ListComponent />);
    });

    test('Should not render any element if ExpenseDTO Collection is not provided', () => {
        expect(component.container.children.length).toEqual(0);
    });

    test('Should render component if ExpenseDTO Collection is provided', () => {

        component.rerender(<ListComponent
            expenses={fakeExpensesCollections}
        />);

        const container = component.getByTestId('list-component__container');
        const list = component.getByTestId('list-component__list');
        const listItem = component.getAllByTestId('list-item-component__container');

        expect(container).toBeTruthy();
        expect(list).toBeTruthy();
        expect(listItem).toBeTruthy();

    });

    test('Should handle click on and emit event to notify that a new expense should be added', () => {

        const expectedEventTypes = /add/i;

        const fakeEmit = (name: string): Promise<void> => {
            expect(name).toMatch(expectedEventTypes);
            return Promise.resolve();
        }

        const fakeEmitter: ExpenseEmitterService = {
            emit: fakeEmit,
        };

        const spy = vi.spyOn(fakeEmitter, 'emit');

        component.rerender(<ListComponent
            expenses={fakeExpensesCollections}
            emitter={fakeEmitter}
        />);

        const addButton = component.getByTestId('list-component__add-button');
        expect(addButton).toBeTruthy();

        fireEvent.click(addButton);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledOnce();


    });

    afterAll(() => {
        component.unmount();
        cleanup();
    });
});