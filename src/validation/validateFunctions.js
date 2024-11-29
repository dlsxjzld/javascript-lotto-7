import { Console } from '@woowacourse/mission-utils';

export const toThrowNewError = (condition, errorMessage) => {
  if (condition) {
    throw new Error(`[ERROR] ${errorMessage}\n`);
  }
};

const canDivide = (input) => {
  const money = Number(input);
  toThrowNewError(
    money % 1000 !== 0,
    '1000원 단위로 입력해야 합니다. ex) 8000',
  );
};
const isExceedThousand = (input) => {
  const convertedInput = Number(input);
  toThrowNewError(
    convertedInput >= 1000 === false,
    '1000원 이상만 입력 가능합니다. ex) 1000',
  );
};

export const checkPurchaseMoney = (input) => {
  try {
    isExceedThousand(input);
    canDivide(input);
    return true;
  } catch (error) {
    Console.print(error.message);
    return false;
  }
};
