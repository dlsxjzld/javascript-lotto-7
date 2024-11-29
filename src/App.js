import { Console } from '@woowacourse/mission-utils';
import { Input } from './view/View.js';
import { purchaseMoney } from './validation/validateFunctions.js';

class App {
  async run() {
    const input = await Input.readUserInput(
      '구입금액을 입력해 주세요.\n',
      purchaseMoney,
    );
    Console.print(input);
  }
}

export default App;
