import { Random } from '@woowacourse/mission-utils';
import Lotto from '../Lotto.js';

import {
  LOTTO_MATCH_KEY,
  LOTTO_PRICE,
  MONEY_FOR_LOTTO_WINNING_MATCH,
} from '../constants/constant.js';

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

  getLottoCount() {
    return this.#lottoCount;
  }

  getLottoList() {
    return this.#lottoList.map((lotto) => lotto.getNumbers());
  }

  getLottoWinningCount() {
    return this.#lottoWinningCount;
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
