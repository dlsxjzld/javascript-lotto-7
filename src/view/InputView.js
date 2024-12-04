import { Console } from '@woowacourse/mission-utils';
import { check } from '../validation/validateFunctions.js';

export const InputView = {
  async readUserInput(message, validation, rest) {
    const input = await Console.readLineAsync(message);
    if (check(input, validation, rest)) {
      return input;
    }
    return this.readUserInput(message, validation, rest);
  },
};
