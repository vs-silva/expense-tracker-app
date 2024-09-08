export interface ExpenseEmitterService{
    emit(name: string, value?:unknown):void;
}