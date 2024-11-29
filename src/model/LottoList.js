import { Random } from '@woowacourse/mission-utils';
import Lotto from '../Lotto.js';
import { Output } from '../view/View.js';

const LOTTO_PRICE = 1_000;

export default class LottoList {
  #lottoCount;

  #lottoList;

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
  }
}
