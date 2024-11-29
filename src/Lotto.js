class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
    if (new Set(numbers).size !== 6) {
      throw new Error('[ERROR] 로또 번호에 중복된 번호는 없어야 합니다.');
    }
  }

  getNumbers() {
    return this.#numbers;
  }

  checkMatch(winningNumbers, bonusNumber) {
    const hasBonusNumber = this.#numbers.includes(bonusNumber);
    const matchedCount = this.#numbers.filter((number) =>
      winningNumbers.includes(number),
    ).length;
    if (hasBonusNumber && matchedCount === 5) {
      return 'bonus';
    }
    return matchedCount;
  }
}

export default Lotto;
