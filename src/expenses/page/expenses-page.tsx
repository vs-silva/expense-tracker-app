import {Dispatch, ReactElement, useEffect, useState} from "react";
import {AppDispatch} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import type {UnknownAction} from "@reduxjs/toolkit";
import type {ExpenseDTO} from "../integration/core/dtos/expense.dto.ts";
import ExpensesStateManager from "../state-mananger/expenses-state-manager.ts";
import {ListComponent} from "../components/list-component/list.component.tsx";
import eventBus from "../../event-bus";
import EventBus from "../../event-bus";
import {ExpenseEventConstants} from "../integration/core/constants/expense-event.constants.ts";

export function ExpensesPage(): ReactElement {

    const [initialLoad, setInitialLoad] = useState(true);
    const dispatch: Dispatch<UnknownAction> = useDispatch<AppDispatch>();

    // @ts-ignore
    const { expenses, totalExpense }: { expenses: ExpenseDTO[], totalExpense: number} = useSelector(state => state.expensesStoreSlice);

    const {
        getAllExpenses,
        registerExpense,
        updateExpense,
        removeExpense
    } = ExpensesStateManager.actions;

    useEffect(() => {

        if(initialLoad) {
            setInitialLoad(false);
            dispatch(getAllExpenses());
            return;
        }

        EventBus.on(ExpenseEventConstants.ADD, ():void => {
            dispatch(registerExpense());
        });

        EventBus.on(ExpenseEventConstants.UPDATE, (expense):void => {
            dispatch(updateExpense(expense as ExpenseDTO));
        });

        EventBus.on(ExpenseEventConstants.REMOVE, (expenseId):void => {
            dispatch(removeExpense(expenseId as string));
        });

    }, [initialLoad]);


    return (<div className="expenses-page">
        <ListComponent
            expenses={expenses}
            emitter={eventBus}
        />
    </div>);
}