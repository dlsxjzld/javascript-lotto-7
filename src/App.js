import { Input } from './view/InputView.js';
import { Output } from './view/OutputView.js';
import {
  purchaseMoney,
  winningNumbers as validateWinningNumbers,
  bonusNumber as validateBonusNumber,
} from './validation/validateFunctions.js';
import LottoList from './model/LottoList.js';

class App {
  #winningNumbers;

  #bonusNumber;

  async run() {
    const input = await this.getPurchaseMoney();
    const lottoList = new LottoList(input);
    lottoList.printLottoCount();

    await this.getWinningNumbers();
    await this.getBonusNumber();
    lottoList.updateLottoWinningCount(this.#winningNumbers, this.#bonusNumber);
    lottoList.printWinningResult();
  }

  async getPurchaseMoney() {
    const input = await Input.readUserInput(
      '구입금액을 입력해 주세요.\n',
      purchaseMoney,
    );
    return input;
  }

  async getWinningNumbers() {
    const winningNumbers = await Input.readUserInput(
      '당첨 번호를 입력해 주세요.\n',
      validateWinningNumbers,
    );
    this.#winningNumbers = winningNumbers.split(',').map(Number);
  }

  async getBonusNumber() {
    Output.printResult('');
    const bonusNumber = await Input.readUserInput(
      '보너스 번호를 입력해 주세요.\n',
      validateBonusNumber,
      this.#winningNumbers,
    );
    this.#bonusNumber = Number(bonusNumber);
  }
}

export default App;
