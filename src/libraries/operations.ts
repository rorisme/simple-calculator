import {Operators} from '../types';
import {calculatorReducer} from './reducers';

/**
 * Divides all items of an array of digits consecutively
 * @param args Array of the numbers to add in string format
 * @returns
 */
export function division(args: string[]) {
  return calculatorReducer(args, Operators.Division);
}

/**
 * Multiplies all items of an array of digits consecutively
 * @param args Array of the numbers to add in string format
 * @returns
 */
export function multiplication(args: string[]) {
  return calculatorReducer(args, Operators.Multiplication);
}

/**
 * Adds all items of an array of digits consecutively
 * @param args Array of the numbers to add in string format
 * @returns
 */
export function addition(args: string[]) {
  return calculatorReducer(args, Operators.Addition);
}

/**
 * Subtracts all items of an array of digits consecutively
 * @param args Array of the numbers to add in string format
 * @returns
 */
export function subtraction(args: string[]) {
  return calculatorReducer(args, Operators.Subtraction);
}
