import {afterAll, beforeAll, describe, expect, test, vi} from "vitest";
import {cleanup, fireEvent, render, RenderResult} from "@testing-library/react";
import {faker} from "@faker-js/faker";
import type {ExpenseDTO} from "../../../integration/core/dtos/expense.dto.ts";
import {ListItemComponent} from "../list-item.component.tsx";
import {ExpenseEmitterService} from "../../../integration/core/services/expense-emitter.service.ts";

describe("ListItemComponent tests", () => {

    let component: RenderResult;

    const fakeExpense: ExpenseDTO = {
            id: faker.database.mongodbObjectId(),
            title: faker.lorem.word(),
            description: faker.lorem.paragraph(),
            cost: faker.number.int({max: 100})
    };

    beforeAll(() => {
        component = render(<ListItemComponent />);
    });

    test('Should not render any element if no expenseDTO is provided', () => {
        expect(component.container.children.length).toEqual(0);
    });

    test('Should render component UI if item data is provided', () => {

        component.rerender(<ListItemComponent
            expense={fakeExpense}
        />);

        const container = component.getByTestId('list-item-component__container');
        const title = component.getByTestId('list-item-component__title');
        const description = component.getByTestId('list-item-component__description');
        const cost = component.getByTestId('list-item-component__cost');
        const deleteIcon = component.getByTestId('list-item-component__delete');

        expect(container).toBeTruthy();
        expect(container.id).toEqual(fakeExpense.id);

        expect(title).toBeTruthy();
        expect(description).toBeTruthy();
        expect(cost).toBeTruthy();

        expect(title.textContent).toBeTruthy();
        expect(description.textContent).toBeTruthy();
        expect(cost.textContent).toBeTruthy();

        expect(deleteIcon).toBeTruthy();
    });

    test('Should handle click event for remove and emit specific event-type', () => {

        const expectedEventType = /remove/i;

        const fakeEmit = (name: string, value: string): Promise<void> => {
            expect(name).toMatch(expectedEventType);
            expect(value).toEqual(fakeExpense.id);
            return Promise.resolve();
        };

        const fakeEmitter: ExpenseEmitterService = {
            emit: fakeEmit,
        };

        const spy = vi.spyOn(fakeEmitter, 'emit');

        component.rerender(<ListItemComponent
            expense={fakeExpense}
            emitter={fakeEmitter}
        />);

        const container = component.getByTestId('list-item-component__container');
        const deleteIcon = component.getByTestId('list-item-component__delete');

        expect(container).toBeTruthy();
        expect(container.id).toEqual(fakeExpense.id);

        expect(deleteIcon).toBeTruthy();

        fireEvent.click(deleteIcon);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledOnce();

    });

    test('Should handle click event for update and emit specific event-type', () => {

        const expectedEventType = /update/i;

        const fakeEmit = (name: string, value: string): Promise<void> => {
            expect(name).toMatch(expectedEventType);
            expect(value).toEqual(fakeExpense);
            return Promise.resolve();
        };

        const fakeEmitter: ExpenseEmitterService = {
            emit: fakeEmit,
        };

        const spy = vi.spyOn(fakeEmitter, 'emit');

        component.rerender(<ListItemComponent
            expense={fakeExpense}
            emitter={fakeEmitter}
        />);

        const container = component.getByTestId('list-item-component__container');
        const updateIcon = component.getByTestId('list-item-component__update');

        expect(container).toBeTruthy();
        expect(container.id).toEqual(fakeExpense.id);

        expect(updateIcon).toBeTruthy();

        fireEvent.click(updateIcon);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledOnce();

    });


    afterAll(() => {
        component.unmount();
        cleanup();
    });
});