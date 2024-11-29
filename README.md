# javascript-lotto-precourse

# javascript-lotto-precourse

### 시간 분배 목표 (4시간)

- 구현 기능 목록 정리 30분
- 코드 작성 2시간 30분
- 리팩토링 1시간

## 구현 기능 목록

- 당첨은 1등부터 5등까지 있다. 당첨 기준과 금액은 아래와 같다.

  - 1등: 6개 번호 일치 / 2,000,000,000원
  - 2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
  - 3등: 5개 번호 일치 / 1,500,000원
  - 4등: 4개 번호 일치 / 50,000원
  - 5등: 3개 번호 일치 / 5,000원

- 로또 구입 금액을 입력하면 구입 금액에 해당하는 만큼 로또를 발행해야 한다.
  - [x] 구입 금액은 1,000원 단위로 입력 받으며 1,000원으로 나누어 떨어지지 않는 경우 예외 처리한다.
  - [x] 구입 금액은 양수여야 한다.
  - [x] 로또 1장의 가격은 1,000원이다.
  - [x] 1개의 로또를 발행할 때 중복되지 않는 6개의 숫자를 뽑는다.
  - [x] 공백 있으면 안된다.
- 당첨 번호와 보너스 번호를 입력받는다.
  - [x] 로또 번호의 숫자 범위는 1~45까지이다.
  - [x] 당첨 번호에 공백 있으면 안된다.
  - [x] 당첨 번호는 숫자만 입력되어야 한다.
  - [x] 당첨 번호는 쉼표(,)를 기준으로 구분한다.
  - [x] 당첨 번호는 중복되는 숫자가 있으면 안된다.
  - [ ] 보너스 번호에 공백 있으면 안된다.
  - [ ] 보너스 번호는 1~45 이고 숫자만 입력되어야 한다.
  - [ ] 보너스 번호와 당첨 번호는 중복되면 안된다.
- 발행한 로또 수량 및 번호를 출력한다.
  - [x] 로또 번호는 오름차순으로 정렬하여 보여준다.
- 사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 내역 및 수익률을 출력하고 로또 게임을 종료한다.
  - 수익률은 소수점 둘째 자리에서 반올림한다.
    - 100.0%
    - 51.5%
    - 1,000,000.0%
- 사용자가 잘못된 값을 입력할 경우
  - "[ERROR]"로 시작하는 메시지와 함께 `Error`를 발생
  - 해당 메시지를 출력한 다음 해당 지점부터 다시 입력을 받는다.

1. 입력
2. 검증
3. 로또 동작
4. 출력

# 고민되는 점

Model에서 View를 갖고 있어도 될까? 로또리스트 모델에서 로또 개수 출력해도 될까?

- 현재는 App(컨트롤러)에서 하는 중
