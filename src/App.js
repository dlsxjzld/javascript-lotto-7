import { Console, Random } from '@woowacourse/mission-utils';
import { Input, Output } from './view/View.js';
import { purchaseMoney } from './validation/validateFunctions.js';
import LottoList from './model/LottoList.js';

class App {
  async run() {
    const input = await Input.readUserInput(
      '구입금액을 입력해 주세요.\n',
      purchaseMoney,
    );

    const lottoList = new LottoList(input);
    lottoList.printLottoCount();
  }
}

export default App;
