import { Random } from '@woowacourse/mission-utils';
import Lotto from '../Lotto.js';

import { LOTTO_PRICE } from '../constants/constant.js';

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

  getLottoCount() {
    return this.#lottoCount;
  }

  getLottoList() {
    return this.#lottoList;
  }
}
