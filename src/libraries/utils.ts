const operators: string[] = ['x', '/', '+', '-'];

/**
 * Normalizes user input. Since the input is first converted into an array of
 * data, multi-digits numbers and decimals will be incorrectly represented;
 * Example: '2+10x4' will become ['2', '+', '1', '0', 'x', '4']. This function
 * ensures their proper representation while preserving the array-based data
 * input so the correct expression is ['2', '+', '10', 'x', '4']
 * @param args Array from the expression string
 * @returns
 */
export function normalizeInput(args: string[]) {
  const result: string[] = [];
  if (operators.includes(args[0])) args = ['0'].concat(args);
  args.map((arg, index) => {
    const lastItem = result[result.length - 1];
    if (
      index > 0 &&
      !operators.includes(lastItem) &&
      !operators.includes(arg)
    ) {
      result[result.length - 1] = `${lastItem}${arg}`;
    } else {
      result.push(arg);
    }
  });
  return result;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const operations: any[] = input.filter(entry => !!isNaN(parseFloat(entry)));
  return {input, numbers, operations};
}
