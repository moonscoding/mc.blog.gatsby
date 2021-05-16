---
title : function
index : 3
---



## function

함수를 사용하면 스타일시트 전체에서 재사용 할 수 있는 ` SassScript 값`에 대한 복잡한 작업을 정의 할 수 있습니다.

읽기 쉬운 방식으로 일반적인 공식과 동작을 쉽게 추상화 할 수 있습니다.

```scss
# function.scss
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}

.sidebar {
  float: left;
  margin-left: pow(4, 3) * 1px;
}
```

```css
# function.css
.sidebar {
  float: left;
  margin-left: 64px;
}
```



function에서 인수를 처리하는 방법 (mixin과 유사합니다.)

- Optional Arguments
- Arbitrary Arguments
- Keyword Arguments



### @return















함수도 value가 될 수 있으며 `$function`은 `meta.get-function()` 에 의해 반환된 함수여야 합니다. 

- meta.get-function($name, $css: false, $module: null)
- meta.call($function, $args...)

```scss
@use "sass:list";
@use "sass:meta";
@use "sass:string";

/// Return a copy of $list with all elements for which $condition returns `true`
/// removed.
@function remove-where($list, $condition) {
  $new-list: ();
  $separator: list.separator($list);
  @each $element in $list {
    @if not meta.call($condition, $element) {
      $new-list: list.append($new-list, $element, $separator: $separator);
    }
  }
  @return $new-list;
}

$fonts: Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif;

content {
  @function contains-helvetica($string) {
    @return string.index($string, "Helvetica");
  }
  font-family: remove-where($fonts, meta.get-function("contains-helvetica"));
}
```



## Special Function

CSS는 많은 함수를 내장하고 있으며, 대부분은 Sass에서 잘 동작합니다.

사용자 정의 또는 내장 함수가 아닌 Sass에서 호출된 함수는 `Plain CSS function`으로 컴파일됩니다. 

(Sass 인수 구문을 사용하지 않는 경우)

```scss
@debug var(--main-bg-color); // var(--main-bg-color)

$primary: #f2ece4;
$accent: #e1d7d2;
@debug radial-gradient($primary, $accent); // radial-gradient(#f2ece4, #e1d7d2)
```



하지만 `SassScript expression`으로 파싱 할 수없는 특수 구문이있는 몇 가지 예외가 있습니다.

이러한 예외함수는 [unquoted strings](https://sass-lang.com/documentation/values/strings#unquoted) 를 반환합니다. 

- `url` - 
- `calc, clamp, element, progid, expression` - 
- `min, max` - Sass, CSS 모두 정의된 함수가 있어 호출방식에 따라 컴파일이 다르게 됩니다.



```scss
@font-face {
    // This is parsed as an interpolated special function.
    src: url(#{$roboto-font-path}/Roboto-Regular.woff2) format("woff2");
    font-family: "Roboto";
    font-weight: 400;
}

.logo {
  $width: 800px;
  width: $width;
  position: absolute;
  left: calc(50% - #{$width / 2});
  top: 0;
}

.post {
  // 다음 max() 호출은 #{} 이외에 다른 Sass 기능을 호출하지 않음으로 CSS max()로 컴파일됩니다.
  padding-left: max(#{$padding}, env(safe-area-inset-left));
  padding-right: max(#{$padding}, env(safe-area-inset-right));
}

.sidebar {
  // 아래 함수는 #{}없이 Sass 변수를 참조함으로 Sass's built-in max()을 참조합니다.
  padding-left: max($padding, 20px);
  padding-right: max($padding, 20px);
}

```



### 