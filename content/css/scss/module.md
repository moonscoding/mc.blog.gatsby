---
title : module
index: 5
---



## Module

하나의 sass 파일에 모든 내용을 작성할 필요는 없으며 `@use` 를 사용해서 분할할 수 있습니다.



```scss
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```



```scss
// styles.scss
@use 'base';

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```

