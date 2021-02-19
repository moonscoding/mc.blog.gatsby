- 문서 객체 모델
- 용어 사용
- get 메서드
- DOM 요소 쿼리
- DOM 요소 조작
- 새 DOM 요소 만들기
- 요소 스타일링
- 데이터 속성
- 이벤트
  - 이벤트 버블링과 캡처링
  - 이벤트 카테고리
- ajax



# Browser



## Head, Body





## Script 속성

https://developer.mozilla.org/ko/docs/Web/HTML/Element/script

### src

외부 스크립트를 가르키는 URL

### type

스크립트의 유형 

- 생략 또는 JavaScript MIME 유형
- module
- 다른 모든 값

### async

HTML 구문 분석중에도 스크립트를 가져오며 사용 가능해지는 즉시 평가를 수행

모듈 스크립트와 의존 스크립트를 지연 큐에서 실행함으로 함께 병렬로 가져오며, 동시에 구문 분석을 수행하고 사용이 가능해지는 즉시 평가



### defer

브라우저가 스크립트를 문서 분석 이후에 `DomContentLoaded` 발생 이전에 실행해야 함을 나타내는 boolean 속성

defer 속성을 가진 스크립트는 자신의 평가가 끝나기 전까지 `DomContentLoaded` 이벤트의 발생을 막음

