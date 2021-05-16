---
title : extend
index : 8
---



## @extend

하나의 class가 다른 class의 모든 고유한 스타일을 가져야하는 경우,

하나의 selector에서 다른 selector로 css 속성집합을 공유할 수 있는 유용한 기법입니다.



다음은 bootstrap에서 많이 사용하는 클래스 선언 방식입니다.

https://getbootstrap.com/docs/5.0/utilities/borders/#border-color

아래 같은 방식은 HTML을 약간 더 복잡하게 만들며, 

모든 class를 포함하는 것을 잊을 경우 문제를 발생시킬 수 있습니다. 

```html
<!-- error.html -->
<div class="error error--serious">
  Oh no! You've been hacked!
</div>
```

```css
# error.css
.error {
  border: 1px #f00;
  background-color: #fdd;
}

.error--serious {
  border-width: 3px;
}
```



다음과 같이 선언하면 문제를 간단히 해결 할 수 있습니다.

```scss
# error.scss
.error {
  border: 1px #f00;
  background-color: #fdd;

  &--serious {
    @extend .error;
    border-width: 3px;
  }
}
```



`error--serious`는 마치 error가 있는 것처럼 동작하게 됩니다.

```css
# error.css
.error, .error--serious {
  border: 1px #f00;
  background-color: #fdd;
}
.error--serious {
  border-width: 3px;
}

```



### Placeholder Selector

Sass는 `placeholder`라는 특별한 Selector를 가집니다.

 `%`로 시작하며 CSS 출력엔 포함되지 않으며, HTML에 특정 클래스 이름을 사용하도록 요구하지 않습니다.

스타일규칙이 사용될 수 있거나 동시에 사용되지 않을 수도 있는 Sass를 작성할 때, `extend`가 목적인 스타일 규칙을 작성해야할 때, placeholder selector를 사용할 수 있습니다.

( `- or _` 를 사용하여 Private하게 사용할 수 있습니다.)

```scss
# extend.scss

/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```

각 클래스는 위의 `%message-shared` 와 동일한 속성을 같게 됩니다.

이러한 방식은 HTML 요소에 여러 클래스 이름을 작성하지 않아도 되게 합니다.



```css
# extend.css
.message, .success, .error, .warning {
	border: 1px solid #ccc;
	padding: 10px;
	color: #333;
}

.success {
	border-color: green;
}

.error {
	border-color: red;
}

.warning {
	border-color: yellow;
}
```

> `%equal-heights`과 같이 사용되지 않은 상속 속성은 생성되지 않습니다.





### Hot It Works

해당 클래스에 스타일 속성을 포함하는 Mixin과 달리, 

스타일 속성에 @extend를 요청하는 클래스가 추가되는 방식입니다.



> When extending selectors, Sass does `intelligent unification`



```scss
# extend.scss

.content nav.sidebar {
  @extend .info;
}

// p.info
p.info {
  background-color: #dee9fc;
}

// .guide .info, .guide .content nav.sidebar, .content .guide nav.sidebar
.guide .info {
  border: 1px solid rgba(#000, 0.8);
  border-radius: 2px;
}

// main.content .info, main.content nav.sidebar
main.content .info {
  font-size: 0.8em;
}
```



@extend 사용에 주의해야하는 점

- 실제 선택자가 아닌 placeholder selector의 확장에 사용해야합니다.
- 복잡한 선택자가 아닌 곳에 사용하세요.
- placeholder의 직접적 확장은 가능한 지양하세요.
- 조상 선택자 혹은 형제 선택자에 확장을 사용하지 마세요. 폭발적 확장의 원인이 됩니다.



> `@extend`의 장점과 관련해서는 극도로 의견이 갈립니다.
>
> Extend을 피해야 하는 여러 이유가 있습니다. https://www.sitepoint.com/avoid-sass-extend/
>
> 하지만, 두개의 선택자가 특징적으로 유사하고 관계를 유지해야 한다면 `@extend`는 좋은 대안입니다.



### Mixin vs Extend

Mixin은 인수를 사용하여 스타일을 구성해야 할 때 분명히 필요하며, 

스타일의 더미라면 Extend가 유용할 수 있습니다.

Extend는 클래스간의 관계를 표현할 때 가장 좋은 옵션입니다. (ex. error & error--serious)

