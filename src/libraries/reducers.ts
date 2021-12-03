import {Operations, OperationsOrder, ICalculator} from '../types';
import {addition, division, multiplication, subtraction} from './operations';

/**
 * Return the corresponding operation function
 * @param operation The operation to be performed
 * @returns
 */
function calculator(operation: Operations): ICalculator | undefined {
  const operationMapper = new Map<Operations, ICalculator>([
    [Operations.Addition, {calculate: (a: number, b: number) => a + b}],
    [Operations.Subtraction, {calculate: (a: number, b: number) => a - b}],
    [Operations.Multiplication, {calculate: (a: number, b: number) => a * b}],
    [Operations.Division, {calculate: (a: number, b: number) => a / b}],
  ]);
  return operationMapper.get(operation);
}

/**
 * Call the appropriate operation function based on input parameters
 * @param args Array numbers to calculate
 * @param operation The operation to perform
 * @returns
 */
export function callOperation(
  args: number[] | string[],
  operation: Operations
) {
  if (!operation) return;

  const operationMapper = new Map<Operations, Function>();

  operationMapper.set(Operations.Addition, addition);
  operationMapper.set(Operations.Division, division);
  operationMapper.set(Operations.Subtraction, subtraction);
  operationMapper.set(Operations.Multiplication, multiplication);

  return operationMapper.get(operation)?.call(null, args);
}

/**
 * Perform arithmetic operations from an input array of string. This function
 * can only perform one type of operation a time
 * @param args Array of numbers in string format.
 * @param operation The operation to perform
 * @returns
 */
export function calculatorReducer(
  args: string[],
  operation: Operations
): string {
  return args.reduce((prev, current) => {
    const firstNumber = parseFloat(prev);
    const secondNumber = parseFloat(current);
    return calculator(operation)
      ?.calculate(firstNumber, secondNumber)
      .toString();
  });
}

/**
 * An arithmetic expression reducer following the `BODMAS` rule. All parameters
 * are the result of the `getExpressionData` function
 * @param numbers Array of the numbers to add in string format
 * @param operations Array of the operations to perform on these numbers
 * @returns
 */
export function expressionReducer(
  numbers: string[],
  operations: string[] | Operations[]
): string {
  OperationsOrder.forEach(operation => {
    if (operations.includes(operation)) {
      const operationIndex = operations.indexOf(operation);
      numbers.splice(
        operationIndex,
        2,
        callOperation(
          [numbers[operationIndex], numbers[operationIndex + 1]],
          OperationsOrder[OperationsOrder.indexOf(operation)]
        )
      );
      operations.splice(operationIndex, 1);
    }
  });
  if (numbers.length > 1) expressionReducer(numbers, operations);
  return numbers[0];
}
