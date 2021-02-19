- 배열의 기초
- 배열 요소 조작
  - 배열의 처음이나 끝네엇 요소 하나를 추가하거나 제거
  - 배열의 끝에 여러 요소 추가
  - 배열 일부 가져오기
  - 임의의 위치에 요소 추가하거나 제거하기
  - 배열 안에서 요소 교체하기
  - 특정 값으로 배열 채우기
  - 배열 정렬과 역순 정렬
- 배열 검색
  - map
  - filter
  - reduce
  - 삭제되거나 정의되지 않는 요소
  - 문자열 병합
  - group







## 배열기능



### group (custom)

javascript에서 내장으로 제공하는 함수가 없음

```js
var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
```





