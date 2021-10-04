import {Operators} from '../types';
import {addition, division, multiplication, subtraction} from './operations';

/**
 * Call a specified operation based on input parameters
 * @param args Array numbers to calculate
 * @param operator The operation to perform
 * @returns
 */
export function calculate(args: number[] | string[], operator: Operators) {
  const OperationMapper = new Map<Operators, Function>();

  OperationMapper.set(Operators.Addition, addition);
  OperationMapper.set(Operators.Division, division);
  OperationMapper.set(Operators.Subtraction, subtraction);
  OperationMapper.set(Operators.Multiplication, multiplication);

  if (!operator) return;
  const operation = OperationMapper.get(operator);
  if (!operation) throw new Error('Invalid operator');
  const result = operation.call(null, args);
  return result;
}
