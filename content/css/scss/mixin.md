---
title : mixin
index : 7
---



## Mixin

`Mixin` 을 사용하면 재사용하려는 css 그룹을 만들어 사용할 수 있습니다.

또한, Mixin을 더 유연하게 사용하기위해 value를 전달할 수도 있습니다.



```scss
@mixin transform($property) {
  -webkit-transform: $property;
  -ms-transform: $property;
  transform: $property;
}

.box { 
  @include transform(rotate(30deg)); 
}
```



> Mixin names, like all Sass identifiers, treat hyphens and underscores as identical. 
>
> This means that `reset-list` and `reset_list` both refer to the same mixin.



Mixin에서 인수를 다루는 다양한 방법이 있습니다.

- `Optional Argument` @mixin myMixin($arg : 0)
- `Arbitrary Arguments` @mixin myMixin($args...)
- `Keyword Argument` @include myMixin($args : 4px)
- `Content Block`



### Optional Argument

Optional한 인수를 받을 수 있습니다.

```scss
@mixin replace-text($image, $x: 50%, $y: 50%) {
  text-indent: -99999em;
  overflow: hidden;
  text-align: left;

  background: {
    image: $image;
    repeat: no-repeat;
    position: $x $y;
  }
}

.mail-icon {
  @include replace-text(url("/images/mail.svg"), 0);
}
```



### Multiple Argument

```scss
@use "sass:meta";

@mixin syntax-colors($args...) {
  @debug meta.keywords($args);
  // (string: #080, comment: #800, variable: #60b)

  @each $name, $color in meta.keywords($args) {
    pre span.stx-#{$name} {
      color: $color;
    }
  }
}

@include syntax-colors(
  $string: #080,
  $comment: #800,
  $variable: #60b,
)
```



### Keyword Arguments

이는 여러 Optional 인수가 있는 mixin이나 

이름 없이 의미가 명확하지 않은 boolean 인수가 있는 mixin에 유용합니다.

```scss
# keywork_argument.scss
@mixin square($size : 10px, $radius: 0) {
  width: $size;
  height: $size;

  @if $radius != 0 {
    border-radius: $radius;
  }
}

.avatar {
  @include square($radius: 4px);
}
```

```css
# keywork_argument.css
.avatar {
	 width: 10px;
	 height: 10px;
	 border-radius: 4px;
}
```

> Because *any* argument can be passed by name be careful when renaming a mixin’s arguments…
>
> 다음과 방식을 사용할 때는 변수명이 변경되는 것에 유의해야 합니다.



### Content Blocks

본문에 `@content` 을 포함하여 Content Blocks을 사용한다고 선언 할 수 있습니다.

```scss
@mixin hover {
  &:not([disabled]):hover {
    @content;
  }
}

.button {
  border: 1px solid black;
  @include hover {
    border-width: 2px;
  }
}
```

