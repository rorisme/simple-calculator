import {Operators, OperatorsOrder} from '../types';
import {calculate} from './calculator';

/**
 * Perform arithmetic operations from an input array of string. This function
 * can only perform one type of operation a time
 * @param args Array of numbers in string format.
 * @param operation The operation to perform
 * @returns
 */
export function calculatorReducer(
  args: string[],
  operation: Operators
): string {
  if (args.length === 0) return '';
  const result = args.reduce((prev, current) => {
    const leftHand = parseFloat(prev);
    const rightHand = parseFloat(current);
    switch (operation) {
      case Operators.Addition:
        return (leftHand + rightHand).toString();
      case Operators.Subtraction:
        return (leftHand - rightHand).toString();
      case Operators.Division:
        return (leftHand / rightHand).toString();
      case Operators.Multiplication:
        return (leftHand * rightHand).toString();
      default:
        throw new Error('Invalid operation');
    }
  });
  return result;
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
  operations: Operators[]
): string {
  OperatorsOrder.forEach(operator => {
    if (operations.includes(operator)) {
      const operationIndex = operations.indexOf(operator);
      numbers.splice(
        operationIndex,
        2,
        calculate(
          [numbers[operationIndex], numbers[operationIndex + 1]],
          OperatorsOrder[OperatorsOrder.indexOf(operator)]
        )
      );
      operations.splice(operationIndex, 1);
    }
  });
  if (numbers.length > 1) expressionReducer(numbers, operations);
  return numbers[0];
}
