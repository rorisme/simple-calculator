import {expressionReducer} from '../libraries/reducers';
import {getExpressionData, normalizeInput} from '../libraries/utils';

test('2+3+3 should equals 8', () => {
  const cmdInput = Array.from('2+3+3');
  const expression = normalizeInput(cmdInput);
  const data = getExpressionData(expression);
  const result = expressionReducer(data.numbers, data.operations);
  expect(parseFloat(result)).toEqual(parseFloat('8'));
});

test('2+3-3 should equals 2', () => {
  const cmdInput = Array.from('2+3-3');
  const expression = normalizeInput(cmdInput);
  const data = getExpressionData(expression);
  const result = expressionReducer(data.numbers, data.operations);
  expect(parseFloat(result)).toEqual(parseFloat('2'));
});

test('5/2-3 should equals -0.5', () => {
  const cmdInput = Array.from('5/2-3');
  const expression = normalizeInput(cmdInput);
  const data = getExpressionData(expression);
  const result = expressionReducer(data.numbers, data.operations);
  expect(parseFloat(result)).toEqual(parseFloat('-0.5'));
});

test('should support multiple expressions', () => {
  const cmdInput = Array.from('2+1+3');
  const expression = normalizeInput(cmdInput);
  const data = getExpressionData(expression);
  const result = expressionReducer(data.numbers, data.operations);
  expect(parseFloat(result)).toEqual(parseFloat('6'));
});

test('should follow `BODMAS` rule', () => {
  const cmdInput = Array.from('3-5/2+3x12+4x3-4');
  const expression = normalizeInput(cmdInput);
  const data = getExpressionData(expression);
  const result = expressionReducer(data.numbers, data.operations);
  expect(parseFloat(result)).toEqual(parseFloat('-27.5'));
});

test('should handle invalid expressions gracefully', () => {
  const cmdInput = Array.from('//5+2');
  const expression = normalizeInput(cmdInput);
  const data = getExpressionData(expression);
  const result = expressionReducer(data.numbers, data.operations);
  expect(parseFloat(result)).toEqual(NaN);
});
