export enum Operations {
  Addition = '+',
  Division = '/',
  Subtraction = '-',
  Multiplication = 'x',
}

export const OperationsOrder: Operations[] = [
  Operations.Division,
  Operations.Multiplication,
  Operations.Addition,
  Operations.Subtraction,
];

export interface ICalculator {
  calculate: Function;
}
