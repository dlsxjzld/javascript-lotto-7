import {
  LOTTO_MATCH_KEY,
  LOTTO_PRICE,
  MONEY_FOR_LOTTO_WINNING_MATCH,
} from '../constants/constant.js';

export default class Statistics {
  #lottoWinningCount = {
    3: 0,
    4: 0,
    5: 0,
    bonus: 0,
    6: 0,
  };

  constructor(lottoList, winningNumbers, bonusNumber) {
    this.lottoList = lottoList;
    this.winningNumbers = winningNumbers;
    this.bonusNumber = bonusNumber;
    this.updateLottoWinningCount(winningNumbers, bonusNumber);
  }

  getLottoWinningCount() {
    return this.#lottoWinningCount;
  }

  updateLottoWinningCount(winningNumbers, bonusNumber) {
    const lottoList = this.lottoList.getLottoList();
    lottoList.forEach((lotto) => {
      const matchCount = lotto.checkMatch(winningNumbers, bonusNumber);
      if (this.#lottoWinningCount[matchCount] === undefined) {
        return;
      }
      this.#lottoWinningCount[matchCount] += 1;
    });
  }

  calculateProfit() {
    const lottoCount = this.lottoList.getLottoCount();
    const profit = LOTTO_MATCH_KEY.reduce(
      (acc, key) =>
        acc + MONEY_FOR_LOTTO_WINNING_MATCH[key] * this.#lottoWinningCount[key],
      0,
    );
    return Number(((profit / (lottoCount * LOTTO_PRICE)) * 100).toFixed(1));
  }
}
