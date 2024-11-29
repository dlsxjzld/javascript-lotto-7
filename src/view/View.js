import { Console } from '@woowacourse/mission-utils';
import { check } from '../validation/validateFunctions.js';

export const Input = {
  async readUserInput(message, validation, rest) {
    const input = await Console.readLineAsync(message);
    if (check(input, validation, rest)) {
      return input;
    }
    return this.readUserInput(message, validation, rest);
  },
};

export const Output = {
  printResult(result) {
    Console.print(`${result}`);
  },
};
