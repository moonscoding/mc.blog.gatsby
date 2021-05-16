---
title : Flow Control

---

## Flow Control

- @if / @else
- @each
- @for
- @while



### @if @else



```scss
# ifelse.scss
@mixin avatar($size, $circle: false) {
  width: $size;
  height: $size;

  @if $circle {
    border-radius: $size / 2;
  }
}

.square-av {
  @include avatar(100px, $circle: false);
}
.circle-av {
  @include avatar(100px, $circle: true);
}
```



```css
# ifelse.css
.square-av {
	 width: 100px;
	 height: 100px;
}
 .circle-av {
	 width: 100px;
	 height: 100px;
	 border-radius: 50px;
}
```



### @each

```scss
# each_with_list.scss
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}
```





