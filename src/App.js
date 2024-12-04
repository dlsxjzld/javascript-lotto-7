import { InputView } from './view/InputView.js';
import { OutputView } from './view/OutputView.js';
import {
  purchaseMoney,
  winningNumbers as validateWinningNumbers,
  bonusNumber as validateBonusNumber,
} from './validation/validateFunctions.js';
import LottoList from './model/LottoList.js';

class App {
  async run() {
    const input = await this.getPurchaseMoney();
    const lottoList = new LottoList(input);
    this.printLottoInstruction(lottoList);

    const winningNumbers = await this.getWinningNumbers();
    const bonusNumber = await this.getBonusNumber(winningNumbers);
    lottoList.updateLottoWinningCount(winningNumbers, bonusNumber);
    lottoList.printWinningResult();
  }

  async getPurchaseMoney() {
    const input = await InputView.readUserInput(
      '구입금액을 입력해 주세요.\n',
      purchaseMoney,
    );
    return input;
  }

  async getWinningNumbers() {
    const winningNumbers = await InputView.readUserInput(
      '당첨 번호를 입력해 주세요.\n',
      validateWinningNumbers,
    );
    return winningNumbers.split(',').map(Number);
  }

  async getBonusNumber(winningNumbers) {
    OutputView.printResult('');
    const bonusNumber = await InputView.readUserInput(
      '보너스 번호를 입력해 주세요.\n',
      validateBonusNumber,
      winningNumbers,
    );
    return Number(bonusNumber);
  }

  printLottoInstruction(lottoList) {
    this.printLottoCount(lottoList);
    this.printLottoList(lottoList);
  }

  printLottoCount(lottoList) {
    OutputView.printResult('');
    OutputView.printResult(
      `${lottoList.getLottoCount().toLocaleString()}개를 구매했습니다.`,
    );
  }

  printLottoList(lottoList) {
    lottoList
      .getLottoList()
      .forEach((lottoNumbers) =>
        OutputView.printResult(`[${lottoNumbers.join(', ')}]`),
      );
    OutputView.printResult('');
  }
}

export default App;
