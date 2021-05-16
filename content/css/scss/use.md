---
title : use
---



## @use

다른 스타일시트에서 mixins, functions, variables를 가져오는 방법입니다. (@import와 유사합니다.)

built-in modules을 가져올 때도 사용합니다.

> @import와 차이점 >  load된 횟수와 상관없이 1번만 포함됩니다.



### Namespace

Partial

```scss
// src/_corners.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}
```



사용자정의 Namespace

```scss
// style.scss
// @use "src/corners"; // as conners 
@use "src/corners" as c; // 사용자정의 namespace


.button {
  @include c.rounded;
  padding: 5px + corners.$radius;
}
```



\* namespace

```scss
// style.scss
@use "src/corners" as *;

.button {
  @include rounded;
  padding: 5px + $radius;
}
```

> 충돌을 발생할 수 있기 때문에 직접 정의한 모듈에만 사용하는 것을 권장합니다.



### Private Members

Sass는 `- or _` 로 시작하여 private을 쉽게 정의 할 수 있습니다. (Sass는 `-` 과 `_` 를 동일하게 다룬다.)

선언한 시트내에선 정상으로 동작하지만, public한 변수는 아닙니다.



```scss
// src/_corners.scss
$-radius: 3px;

@mixin rounded {
  border-radius: $-radius;
}
```

```scss
// style.scss
@use "src/corners";

.button {
  @include corners.rounded;

  // 에러입니다! $-radius에 접근할 수 없습니다.
  padding: 5px + corners.$-radius;
}
```



### Configuration

`@use #{url} with` 다음과 같은 방식으로 Partial에 인수를 넣어 모듈을 반환할 수 있습니다.

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



### Update Configuration after load

mixin을 이용해 모듈이 로드된 후에 구성요소를 업데이트할 수도 있습니다.

아래 예제는 모듈이 로드된 후에 구성요소가 정의되기 때문에 `!default` 구문이 없습니다.

```scss
// _library.scss
$-black: #000;
$-border-radius: 0.25rem;
$-box-shadow: null;

@function -box-shadow() {
  @return $-box-shadow or (0 0.5rem 1rem rgba($-black, 0.15));
}

@mixin configure($black: null, $border-radius: null, $box-shadow: null) {
  @if $black {
    $-black: $black !global
  }
  @if $border-radius {
    $-border-radius: $border-radius !global;
  }
  @if $box-shadow {
    $-box-shadow: $box-shadow !global;
  }
}

@mixin styles {
  code {
    border-radius: $-border-radius;
    box-shadow: -box-shadow();
  }
}

```

```scss
// style.scss
@use 'library';

@include library.configure(
  $black: #222,
  $border-radius: 0.1rem
);

@include library.styles;
```

