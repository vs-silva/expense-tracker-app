import {ReactElement} from "react";
import type{ExpenseDTO} from "../../integration/core/dtos/expense.dto.ts";
import {ListItemComponent} from "../list-item-component/list-item.component.tsx";
import {ExpenseEmitterService} from "../../integration/core/services/expense-emitter.service.ts";
import * as React from "react";
import {ExpenseEventConstants} from "../../integration/core/constants/expense-event.constants.ts";
import {useTranslation} from "react-i18next";

export function ListComponent(props: {expenses?: ExpenseDTO[], emitter?: ExpenseEmitterService}): ReactElement {

    const {expenses, emitter} = props;
    const { t } = useTranslation();

    if(!expenses) {
        return (<></>);
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>, eventName: string): void {
        event.stopPropagation();

        if(!emitter?.emit) {
            return;
        }

        emitter?.emit(eventName);
    }

    return (<div className="list-component__container" data-testid="list-component__container">
        <button
            type="button"
            className="list-component__add-button"
            data-testid="list-component__add-button" onClick={

            (event: React.MouseEvent<HTMLButtonElement>): void => handleClick(event, ExpenseEventConstants.ADD)

        }>{t('expenseMessages.list.addNewExpense').toString()}</button>
        <ul className="list-component__list" data-testid="list-component__list">
            {
                expenses.map(expense => (
                    <li key={expense.id}>
                        <ListItemComponent expense={expense} emitter={emitter}/>
                    </li>
                ))
            }
        </ul>
    </div>);
}