import { Console } from '@woowacourse/mission-utils';

export const toThrowNewError = (condition, errorMessage) => {
  if (condition) {
    throw new Error(`[ERROR] ${errorMessage}\n`);
  }
};

const hasEmptySpace = (input) => {
  toThrowNewError(input.includes(' '), '공백은 제외해야 합니다. ex) 1000');
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

const isNumberType = (input) => {
  const money = Number(input);
  toThrowNewError(
    Number.isInteger(money) === false,
    '숫자만 입력해주세요. ex) 8000',
  );
};

// TODO:
// 당첨번호에 공백이 있는지
// 당첩번호가 ,로 나뉘는지
// 당첨 번호가 6개인지
// 각각의 당첨 번호가 1~45에 해당하는지

export const purchaseMoney = (input) => {
  hasEmptySpace(input);
  isNumberType(input);
  isExceedThousand(input);
  canDivide(input);
};

export const check = (input, validate) => {
  try {
    validate(input);
    return true;
  } catch (error) {
    Console.print(error.message);
    return false;
  }
};
