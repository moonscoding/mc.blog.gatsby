---
title : built-in
---



## Built In Module

Sass은 유용한 함수(or mixin)를 지닌 다양한 built-in modules를 제공합니다.

그러한 modules은 사용자정의 시트처럼 `@use`를 통해 로드됩니다.

내장 모듈 경로는 `sass:`로 시작하여 Sass 내장 모듈임을 나타냅니다.



```scss
@use "sass:color";

.button {
  $primary-color: #6b717f;
  color: $primary-color;
  border: 1px solid color.scale($primary-color, $lightness: 20%);
}
```



- `sass.math` 숫자 연산이 필요한 기능을 제공합니다.
- `sass.string` 문자열 함수 기능을 제공합니다.
- `sass.color` 기존 색상을 기반으로 새로운 색상을 생성하여 색상 테마를 쉽게 만들 수 있습니다.
- `sass.list` List에 접근하고 수정하는 기능을 제공합니다.
- `sass.map` Map에서 Key와 관련된 값을 조회합니다.
- `sass.selector` Selector 엔진에 대한 접근을 제공합니다.
- `sass.meta` Sass 내부 작업에 대한 세부정보를 노출합니다.