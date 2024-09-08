import {ExpensesService} from "./expenses.service.ts";
import {ArrayReaderAdapter} from "./adapters/array-reader.adapter.ts";
import {ArrayWriterAdapter} from "./adapters/array-writer.adapter.ts";

export default ExpensesService(ArrayReaderAdapter(), ArrayWriterAdapter());