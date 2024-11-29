import { MissionUtils } from '@woowacourse/mission-utils';
import App from '../src/App.js';
import { checkPurchaseMoney } from '../src/validation/validateFunctions.js';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce(
    (acc, number) => acc.mockReturnValueOnce(number),
    MissionUtils.Random.pickUniqueNumbersInRange,
  );
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

const runException = async (input) => {
  // given
  const logSpy = getLogSpy();

  const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];
  const INPUT_NUMBERS_TO_END = ['1000', '1,2,3,4,5,6', '7'];

  mockRandoms([RANDOM_NUMBERS_TO_END]);
  mockQuestions([input, ...INPUT_NUMBERS_TO_END]);

  // when
  const app = new App();
  await app.run();

  // then
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
};

describe('로또 테스트', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test.skip('기능 테스트', async () => {
    // given
    const logSpy = getLogSpy();

    mockRandoms([
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38],
      [7, 11, 16, 35, 36, 44],
      [1, 8, 11, 31, 41, 42],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [1, 3, 5, 14, 22, 45],
    ]);
    mockQuestions(['8000', '1,2,3,4,5,6', '7']);

    // when
    const app = new App();
    await app.run();

    // then
    const logs = [
      '8개를 구매했습니다.',
      '[8, 21, 23, 41, 42, 43]',
      '[3, 5, 11, 16, 32, 38]',
      '[7, 11, 16, 35, 36, 44]',
      '[1, 8, 11, 31, 41, 42]',
      '[13, 14, 16, 38, 42, 45]',
      '[7, 11, 30, 40, 42, 43]',
      '[2, 13, 22, 32, 38, 45]',
      '[1, 3, 5, 14, 22, 45]',
      '3개 일치 (5,000원) - 1개',
      '4개 일치 (50,000원) - 0개',
      '5개 일치 (1,500,000원) - 0개',
      '5개 일치, 보너스 볼 일치 (30,000,000원) - 0개',
      '6개 일치 (2,000,000,000원) - 0개',
      '총 수익률은 62.5%입니다.',
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test.skip('예외 테스트', async () => {
    await runException('1000j');
  });

  test('구입금액 1000 단위로 나뉘는지 테스트', async () => {
    const canDivide = (input) => {
      const money = Number(input);
      if (money % 1000 !== 0) {
        return false;
      }
      return true;
    };
    expect(canDivide('1000')).toBe(true);
    expect(canDivide('1010')).toBe(false);
  });

  test('구입금액 1000원 이상인지 테스트', async () => {
    const isExceedThousand = (input) => {
      if (Number(input) < 1000) {
        return false;
      }
      return true;
    };
    expect(isExceedThousand('1000')).toBe(true);
    expect(isExceedThousand('999')).toBe(false);
  });

  test.only('구입금액 숫자만 입력했는지 테스트', async () => {
    const isNumberType = (input) => {
      if (!Number.isInteger(Number(input))) {
        return false;
      }
      return true;
    };

    expect(isNumberType('1000')).toBe(true);
    expect(isNumberType('999j')).toBe(false);
    expect(isNumberType('1000.0')).toBe(true);
    expect(isNumberType(NaN)).toBe(false);
    expect(isNumberType(Infinity)).toBe(false);
  });
});
