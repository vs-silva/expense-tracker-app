import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {ExpenseDTO} from "../integration/core/dtos/expense.dto.ts";
import Integration from "../integration";

const initialState: { expenses: ExpenseDTO[], totalExpense: number} = {
    expenses: <ExpenseDTO[]>[],
    totalExpense: <number>0,
};

function getAllExpenses(state: { expenses: ExpenseDTO[], totalExpense: number}): void {
    state.expenses = Integration.getAllExpenses();
    calculateTotalExpenses(state);
}

function registerExpense(state: { expenses: ExpenseDTO[], totalExpense: number}): void {
    Integration.registerExpense({
        title: '',
        description: '',
        cost: 0
    });

    getAllExpenses(state);
}

function calculateTotalExpenses(state: { expenses: ExpenseDTO[], totalExpense: number}): void {
    state.totalExpense = Integration.calculateTotalExpensesCost(Integration.getAllExpenses());
}

function updateExpense(state: { expenses: ExpenseDTO[], totalExpense: number }, action: PayloadAction<ExpenseDTO>):void {
    Integration.registerExpense(action.payload);
    getAllExpenses(state);
}

function removeExpense(state: { expenses: ExpenseDTO[], totalExpense: number }, action: PayloadAction<string>):void {
    Integration.removeExpense(action.payload);
    getAllExpenses(state);
}

export default createSlice({
    name: "expenses-state-manager",
    initialState,
    reducers: {
        getAllExpenses,
        registerExpense,
        updateExpense,
        removeExpense
    }
});