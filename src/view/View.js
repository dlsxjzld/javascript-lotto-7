import { Console } from '@woowacourse/mission-utils';

export const Input = {
  async readUserInput(message, validation, ...rest) {
    const input = await Console.readLineAsync(message);
    if (validation(input, rest)) {
      return input;
    }
    return this.readUserInput(message, validation, rest);
  },
};

export const Output = {
  printResult() {
    Console.print(``);
  },
};
