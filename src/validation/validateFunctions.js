import { Console } from '@woowacourse/mission-utils';
import {
  DELIMITER,
  LOTTO_PRICE,
  MAX_RANGE,
  MIN_RANGE,
  RIGHT_WINNING_NUMBER_COUNT,
} from '../constants/constant.js';

export const toThrowNewError = (condition, errorMessage) => {
  if (condition) {
    throw new Error(`[ERROR] ${errorMessage}\n`);
  }
};

const hasEmptySpace = (input) => {
  toThrowNewError(input.includes(' '), '공백은 제외해야 합니다.');
};

const canDivide = (input) => {
  const money = Number(input);
  toThrowNewError(
    money % LOTTO_PRICE !== 0,
    '1000원 단위로 입력해야 합니다. ex) 8000',
  );
};
const isExceedThousand = (input) => {
  const convertedInput = Number(input);
  toThrowNewError(
    convertedInput >= LOTTO_PRICE === false,
    '1000원 이상만 입력 가능합니다. ex) 1000',
  );
};

const isNumberType = (input) => {
  const number = Number(input);
  toThrowNewError(Number.isInteger(number) === false, '숫자만 입력해주세요.');
};

const canSplit = (input) => {
  const winningNumbers = input.split(DELIMITER);
  toThrowNewError(
    winningNumbers.length !== RIGHT_WINNING_NUMBER_COUNT,
    '당첨 번호 6개를 입력해주세요. ex) 1,2,3,4,5,6',
  );
};

const isCorrectRange = (input) => {
  const numbers = input.split(DELIMITER).map(Number);
  toThrowNewError(
    numbers.some((number) => number < MIN_RANGE || number > MAX_RANGE),
    '1~45 범위만 입력해주세요.',
  );
};

const isAllPositiveNumberType = (input) => {
  const numbers = input.split(DELIMITER).map(Number);
  toThrowNewError(
    numbers.some((number) => Number.isInteger(number) === false),
    '숫자만 입력해주세요. ex) 1,2,3,4,5,6',
  );
};

const hasDuplicateNumber = (input) => {
  const numbers = input.split(DELIMITER).map(Number);
  toThrowNewError(
    new Set(numbers).size !== RIGHT_WINNING_NUMBER_COUNT,
    '중복되는 숫자는 안됩니다.',
  );
};

const isWinningNumbersHasBonusNumber = (input, numbers) => {
  toThrowNewError(
    numbers.includes(Number(input)),
    '당첨 번호와 중복되는 숫자는 안됩니다.',
  );
};

export const purchaseMoney = (input) => {
  hasEmptySpace(input);
  isNumberType(input);
  isExceedThousand(input);
  canDivide(input);
};

export const winningNumbers = (input) => {
  hasEmptySpace(input);
  canSplit(input);
  isAllPositiveNumberType(input);
  hasDuplicateNumber(input);
  isCorrectRange(input);
};

export const bonusNumber = (input, numbers) => {
  hasEmptySpace(input);
  isNumberType(input);
  isCorrectRange(input);
  isWinningNumbersHasBonusNumber(input, numbers);
};

export const check = (input, validate, rest) => {
  try {
    validate(input, rest);
    return true;
  } catch (error) {
    Console.print(error.message);
    return false;
  }
};
