import { Random } from '@woowacourse/mission-utils';
import Lotto from '../Lotto.js';
import { Output } from '../view/View.js';

const LOTTO_PRICE = 1_000;

const MONEY_FOR_LOTTO_WINNING_MATCH = Object.freeze({
  3: 5_000,
  4: 50_000,
  5: 1_500_000,
  bonus: 30_000_000,
  6: 2_000_000_000,
});

const LOTTO_MATCH_KEY = [3, 4, 5, 'bonus', 6];

export default class LottoList {
  #lottoCount;

  #lottoList;

  #lottoWinningCount = {
    3: 0,
    4: 0,
    5: 0,
    bonus: 0,
    6: 0,
  };

  constructor(input) {
    this.#lottoCount = Number(input) / LOTTO_PRICE;
    this.#lottoList = Array.from(
      { length: this.#lottoCount },
      () => new Lotto(Random.pickUniqueNumbersInRange(1, 45, 6)),
    );
  }

  printLottoCount() {
    Output.printResult('');
    Output.printResult(
      `${this.#lottoCount.toLocaleString()}개를 구매했습니다.`,
    );
    this.printLottoList();
  }

  printLottoList() {
    this.#lottoList.forEach((lotto) => {
      Output.printResult(`[${lotto.getNumbers().join(', ')}]`);
    });
    Output.printResult('');
  }

  printWinningResult() {
    Output.printResult('');
    Output.printResult('당첨 통계');
    Output.printResult('---');
    this.printLottoWinningCount();
    const calculatedProfit = this.calculateProfit();
    Output.printResult(
      `총 수익률은 ${calculatedProfit.toLocaleString()}%입니다.`,
    );
  }

  updateLottoWinningCount(winningNumbers, bonusNumber) {
    this.#lottoList.forEach((lotto) => {
      const matchCount = lotto.checkMatch(winningNumbers, bonusNumber);
      if (this.#lottoWinningCount[matchCount] === undefined) {
        return;
      }
      this.#lottoWinningCount[matchCount] += 1;
    });
  }

  printLottoWinningCount() {
    LOTTO_MATCH_KEY.forEach((key) => {
      if (key === 'bonus') {
        this.printBonus(key);
        return;
      }
      this.printNormal(key);
    });
  }

  printBonus(key) {
    Output.printResult(
      `5개 일치, 보너스 볼 일치 (${MONEY_FOR_LOTTO_WINNING_MATCH[key].toLocaleString()}원) - ${this.#lottoWinningCount[key].toLocaleString()}개`,
    );
  }

  printNormal(key) {
    Output.printResult(
      `${key}개 일치 (${MONEY_FOR_LOTTO_WINNING_MATCH[key].toLocaleString()}원) - ${this.#lottoWinningCount[key].toLocaleString()}개`,
    );
  }

  calculateProfit() {
    let profit = 0;
    LOTTO_MATCH_KEY.forEach((key) => {
      profit +=
        MONEY_FOR_LOTTO_WINNING_MATCH[key] * this.#lottoWinningCount[key];
    });
    return Number(
      ((profit / (this.#lottoCount * LOTTO_PRICE)) * 100).toFixed(1),
    );
  }
}
