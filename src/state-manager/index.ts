import {configureStore} from "@reduxjs/toolkit";
import ExpensesStateManager from "../expenses/store/expenses-state-manager.ts";

export const store = configureStore({
    reducer: {
        expensesStoreSlice: ExpensesStateManager.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;