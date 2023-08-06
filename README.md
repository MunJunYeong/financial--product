## 정기예금 및 적금 조회 서비스
## 적금 관련 계산기
## 나의 적금 상품 저장

### 금융감독원 오픈 API를 사용하여 정기예금, 적금 정보 조회 가능


## 환경 세팅
1. Front, Server 폴더에 있는 sample env 파일에서의 .sample을 제거한 후 각 로컬 환경에 알맞은 데이터를 채워 넣는다.
2. Front의 경우 개발 환경 실행 방법은 아래와 같다.
```
$ cd front
$ npm run start:dev
```
3. Server의 경우에는 Auth, Calc, Production 서버로 구성되어져 있어서 3개를 다 켜주어야 한다.
```
$ cd server
# auth server start
$ npm run start:auth:dev

# production server start
$ npm run start:prod:dev

# calc server start 
$ npm run start:calc:dev
```

## 주의점
- 사용 용어에 혼동이 올 수 있음.
* Savings - 정기적금
* Deposit - 정기예금
* Product - 적금이나 예금 등 사용자가 저장한 상품을 의미함.
