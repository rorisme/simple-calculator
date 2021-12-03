const operators: string[] = ['x', '/', '+', '-'];

/**
 * Returns true if the passed argument is an operator and false otherwise.
 * @param arg The argument to search in the input array
 * @returns
 */
function isArgAnOperator(arg: string): boolean {
  return operators.includes(arg);
}

function updateInputArray(input: string[], currentArg: string, index: number) {
  const lastArgIndex = input.length - 1;
  const lastArg = input[lastArgIndex];
  index > 0 && !isArgAnOperator(lastArg) && !isArgAnOperator(currentArg)
    ? input.splice(lastArgIndex, 1, `${lastArg}${currentArg}`)
    : input.push(currentArg);
}

/**
 * Normalizes user input. Since the input is first converted into an array of
 * data, multi-digits numbers and decimals will be incorrectly represented;
 * Example: '2+10x4' will become ['2', '+', '1', '0', 'x', '4']. This function
 * ensures their proper representation while preserving the array-based data
 * input so the correct expression is ['2', '+', '10', 'x', '4']
 * @param args Array from the expression string
 * @returns
 */
export function normalizeInput(args: string[]): string[] {
  const input: string[] = [];
  if (operators.includes(args[0])) args = ['0'].concat(args);
  args.forEach((currentArg, index) => {
    updateInputArray(input, currentArg, index);
  });
  return input;
}

/**
 * Separate digits (numbers) from operations. Expressions should be normalized
 * first using the `normalizeInput` function.
 * @param args Expression data array. Example ['2', '+', '3', '/' 4]
 * @returns
 */
export function getExpressionData(args: string[]) {
  const input: string[] = Array.from(args);
  const numbers = input.filter(entry => !isNaN(parseFloat(entry)));
  const operations = input.filter(entry => !!isNaN(parseFloat(entry)));
  return {input, numbers, operations};
}
