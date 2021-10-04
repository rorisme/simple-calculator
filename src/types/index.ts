export enum Operators {
  Addition = '+',
  Division = '/',
  Subtraction = '-',
  Multiplication = 'x',
}

export enum Operations {
  Addition = 'Addition',
  Division = 'Division',
  Subtraction = 'Subtraction',
  Multiplication = 'Multiplication',
}

export const OperatorsOrder: Operators[] = [
  Operators.Division,
  Operators.Multiplication,
  Operators.Addition,
  Operators.Subtraction,
];
