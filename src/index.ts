import {expressionReducer} from './libraries/reducers';
import {getExpressionData, normalizeInput} from './libraries/utils';

(function (args: string[]) {
  const cmdInput = Array.from(args[2]);
  const expression: string[] = normalizeInput(cmdInput);
  const data = getExpressionData(expression);
  const result = expressionReducer(data.numbers, data.operations);
  console.log(parseFloat(result));
})(process.argv);
