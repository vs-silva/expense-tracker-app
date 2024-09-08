import {ReactElement} from "react";
import type {ExpenseDTO} from "../../integration/core/dtos/expense.dto.ts";
import {ExpenseEventConstants} from "../../integration/core/constants/expense-event.constants.ts";
import {ExpenseEmitterService} from "../../integration/core/services/expense-emitter.service.ts";
import * as React from "react";
import {useTranslation} from "react-i18next";

export function ListItemComponent(props: {expense?: ExpenseDTO, emitter?: ExpenseEmitterService }): ReactElement {

    const { expense, emitter } = props;
    const { t } = useTranslation();

    if(!expense) {
        return (<></>);
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>, eventName: string, expense: ExpenseDTO):void {
        event.stopPropagation();

        if(!expense.id || !emitter?.emit || !eventName) {
            return;
        }

        const emitterOptions = {
            [ExpenseEventConstants.REMOVE]: (emitter: ExpenseEmitterService, expense: ExpenseDTO) => emitter?.emit(eventName, expense.id),
            [ExpenseEventConstants.UPDATE]: (emitter: ExpenseEmitterService, expense: ExpenseDTO) => emitter?.emit(eventName, expense),
        };

        const emitterOption = emitterOptions[eventName];

        if (emitterOption) {
            emitterOption(emitter, expense);
            return;
        }

    }

    return (
        <div id={expense.id} className="list-item-component__container" data-testid="list-item-component__container">

            <p className="list-item-component__title" data-testid="list-item-component__title">{expense.title}</p>
            <p className="list-item-component__description"
               data-testid="list-item-component__description">{expense.description}</p>
            <p className="list-item-component__cost" data-testid="list-item-component__cost">{expense.cost}</p>

            <button className="list-item-component__update" data-testid="list-item-component__update" onClick={
                (event: React.MouseEvent<HTMLButtonElement>): void => handleClick(event, ExpenseEventConstants.UPDATE, expense)
            }> {t('expenseMessages.listItem.editExpense').toString()} </button>

            <button className="list-item-component__delete" data-testid="list-item-component__delete" onClick={
                (event: React.MouseEvent<HTMLButtonElement>): void => handleClick(event, ExpenseEventConstants.REMOVE, expense)
            }> {t('expenseMessages.listItem.removeExpense').toString()}</button>

        </div>);
}