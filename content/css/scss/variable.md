---
title : variables
index : 1
---



## Variable

스타일 시트 전체에서 재사용할 정보를 저장하는 방법입니다.

`$`기호를 사용하여 변수를 만듭니다.



```scss
# variable.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

scss가 빌드될 때, 변수를 상수로 변경합니다.



```css
# variable.css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```



### default variable

이렇게하면 변수가 정의되지 않았거나 해당 값이 `null `인 경우에만 변수에 값이 할당됩니다.

 그렇지 않으면 기존 값이 사용됩니다.



```scss
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}
```



```scss
// style.scss
@use 'library' with (
  $black: #222,
  $border-radius: 0.1rem
);
```

`$box-shadow` 값을 설정하지 않았기 때문에 default 값으로 설정됨



### Built In Variable

Sass 레벨에서 지원하는 변수가 있습니다.

차후에 배울 `built-in module`과 함께 다루도록 하겠습니다.

```scss
@use "sass:math" as math;

// This assignment will fail.
math.$pi: 0;
```



### scope

상위에 선언된 변수는 전역변수입니다.

```scss
$global-variable: global value;

.content {
  $local-variable: local value;
  global: $global-variable;
  local: $local-variable;
}

.sidebar {
  global: $global-variable;

  // $local-variable가 스코프내에 없습니다.
  // local: $local-variable;
}
```



### shadowing

지역변수는 전역변수와 같은 이름으로 선언할 수 있는데, 전역 변수의 값을 scope내에서 덮어쓸 수 있습니다.

```scss
$variable: global value;

.content {
  $variable: local value;
  value: $variable; // local value;
}

.sidebar {
  value: $variable; // global value;
}
```



```scss
$variable: first global value;

.content {
  $variable: second global value !global;
  value: $variable; // second global value;
}

.sidebar {
  value: $variable; // second global value;
}
```

`!global` 기능을 사용하면 전역범위에서 전역변수의 값을 덮어쓸 수 있습니다.

