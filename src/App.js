import { Console, Random } from '@woowacourse/mission-utils';
import { Input, Output } from './view/View.js';
import {
  purchaseMoney,
  winningNumbers as validateWinningNumbers,
} from './validation/validateFunctions.js';
import LottoList from './model/LottoList.js';

class App {
  async run() {
    const input = await Input.readUserInput(
      '구입금액을 입력해 주세요.\n',
      purchaseMoney,
    );

    const lottoList = new LottoList(input);
    lottoList.printLottoCount();

    const winningNumbers = await Input.readUserInput(
      '당첨 번호를 입력해 주세요.\n',
      validateWinningNumbers,
    );

    Output.printResult('');
    const bonusNumber = await Input.readUserInput(
      '보너스 번호를 입력해 주세요.\n',
      () => true,
    );
    console.log('bonusNumber', bonusNumber);
  }
}

export default App;
