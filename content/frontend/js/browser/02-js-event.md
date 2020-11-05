---
title: js event
---

# JavaScript

이 내용은 책 `러닝 자바스크립트`를 참고하여 작성하였습니다. (+ 내 생각)

DOM에는 200개 가까운 이벤트가 정의되어 있고 각 브라우저마다 비표준 이벤트를 따로 만들고 있음 (IE 망했으면)

참고한 내용

-   [Web 표준 Event 정의](https://developer.mozilla.org/ko/docs/Web/Events)

## addEventListener

모든 요소에는 addEventListener가 있으며 이 메서드를 통해 이벤트가 일어났을 때 호출할 함수를 지정

호출할 함수는 `Event 타입의 객체 하나만 매개변수`로 받음

( 해당 이벤트 객체에 이벤트에 대한 모든 내용이 들어 있으니 굳이 다른 곳에서 찾지 않아도 됨)

이벤트 모델은 이벤트 하나에 여러 가지 함수를 연결 할 수 있음 (이벤트 : 함수 = 1 : N)

예를 들어 사용자가 a태그를 클릭하면 브라우저는 이벤트에 응답해서 요청 페이지를 불러오는데 ..

이러한 기본 핸들러를 막으려면 `preventDefault()`를 호출

> 'on'과 차이점
>
> on은 구식방법으로 elt.onClick = function() { ... } 과 같이 사용하면 이벤트를 하나 밖에 선언할 수 없었음

## bubbling vs capturing

상위요소로 전달 : bubbling

하위 요소로 전달 : capturing

HTML은 계층적으로 이벤트를 꼭 한 곳에서 처리해야 하는 것은 아닌데 ..

( ex. 버튼을 클릭했을때 버튼 자체 처리도 가능하지만 버튼의 부모에서도 가능 )

이벤트 핸들러에서 다른 핸들러가 어떻게 호출 될지 영향을 주는 세 가지 방법이 있는데..

1. `preventDefault()`이며 이 메소드는 이벤트를 취소합니다.

    이벤트가 전달되기는 하지만 `defaultPrevented` 속성이 `true`로 변경되어 전, 이라면 브라우저는 이벤트를 무시

2. `stopPropagation`은 이벤트를 현재 요소에서 끝내고 더 전달하지 않음

3. `stopImmediatePropagation`은 가장 강력하며 다른 이벤트 핸들러 심지어 현재 요소에 연결된 이벤트 핸들러도 동작하지 않게 함

캡처링 > 버블링 순서대로 이벤트가 진행되며

이벤트가 실제 일어난 요소는 핸들러가 캡처링 다음 버블링이라는 일반적인 순서를 무시하고 추가된 순서대로 실행

```html
<html>
    // 뭐 대충 이런 식으로 해서 이벤트 순서를 확인해보면 // 아래와 같은 결과가 나온다 ...
    <script>
        function logEvent(handlerName, type, cancel, stop, stopImmediate) {
            return function(evt) {
                if (cancel) evt.preventDefault()
                if (stop) evt.stopPropagation()
                if (stopImmediate) evt.stopImmediatePropagation()
                console.log(`${type}:${handlerName}` + (evt.defaultPrevented ? ' (canceled)' : ''))
            }
        }

        function addEventLogger(elt, type, action) {
            const capture = type === 'capture'
            elt.addEventListener(
                'click',
                logEvent(elt.tagName, type, action === 'calcel', action === 'stop', action === 'stopI'),
                capture,
            )
        }
    </script>
</html>
```

```
capture: BODY
capture: DIV
capture: BUTTON
bubble: BUTTON
bubble: DIV
bubble: BODY
```

## event 종류

### drag

---

dragstart, drag, dragend, drop ...

### focus

---

사용자가 폼 필드 같은 편집 가능한 요소를 조작할 때 사용

사용자가 입력 필드를 클릭, 탭, 터치 하는 등의 `들어가는 행위`를 할 때 `foucs` 이벤트 발생

다른 곳을 클릭, 탭, 터치 하는 등의 `나오는 행위`를 할때 `blur`이벤트 발생

사용자가 필드를 `바꾸는 행위`를 할때 `change`이벤트 발생

#### focus vs blur

https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event

#### focusin vs focusout

> focusin & focusout은 표준이 아닌 IE 이벤트

버블링과 캡처링의 차이를 가지고 있음

focus vs blur 는 캡처링 이벤트로 버블링이 발생하지 않음

<img src="../../../../assets/images/image-20200204125303221.png" alt="image-20200204125303221" style="zoom:30%;" />

`focus` and `blur` events do not bubble

`focusin` and `focusout` bubbles to the parent elements, and can be delegated.

Otherwise they are the same, but `focusin` and `focusout` is not part of any standard,

but are in fact proprietary IE events, later adopted by some other browsers, but they are not supported cross browser.

### form

---

사용자의 전송버튼과 같은 submuit 이벤트

### input

---

mouse : click, mousedown, move, mouseup, mouseenter, mouseleave, mouseover, mousewheel ...

keyboard : keydown, keypress, keyup

### media

---

HTML5의 비디오, 오디오 플레이어에 관련한 이벤트

pause, play ...

### progress

---

브라우저가 콘텐츠를 불러오는 과정에서 발생

load, error ...

### touch

---

### scroll

---

#### Scroll with JS

참고

-   [MDN - scroll](https://developer.mozilla.org/ko/docs/Web/API/Document/scroll_event)

JS에서 사용할 수 있는 기본 속성값을 알아보자 ..

스크롤 이벤트는 빠른 속도로 실행됨으로 DOM 수정과 같은 느린 작업은 하지 말아야 .. ( setTimeout 같은 .. )

스크롤 이벤트가 브라우저별 표준이 아니라 .. 적용이 어려움 ( 해결책은 .. ? )

##### scrollHeight & clientHeight

-   scrollHeight
    -   읽기 전용
    -   CSS 높이를 초과하여, 보이지 않는 부분까지 포함한 내용의 높이
    -   scrollHeight의 값은 수직 스크롤바가 없는 clientHeight의 값과 같음
    -   padding값을 포함하지만 margin값은 포함하지 않음
-   clientHeight
    -   눈에 보이는 만큼의 높이 ( 사진에서는 검은 부분의 높이 )
-   offsetHeight
    -   좌우 스크롤바를 포함한 눈에 보이는 만큼의 높이

<img src="../../../../assets/images/image-20200325151825093.png" alt="image-20200325151825093" style="zoom:50%;" />

> 이 속성은 반올림된 정수(integer)입니다. 더욱 정교한 값이 필요하다면 [`Element.getBoundingClientRect()`](https://developer.mozilla.org/ko/docs/Web/API/Element/getBoundingClientRect)을 사용하십시오

##### scrollTop & (scrollBottom)

scrollTop은 내장 변수이나 scrollBottom은 별도로 구해줘야 함

##### scrollLeft & (scrollRight)

```javascript
var intElemScrollHeight = document.getElementById(해당_엘리먼트_아이디).scrollHeight
```

#### Scroll with JQuery

##### height()

-   관련 메소드
    -   [width()](https://www.w3schools.com/jquery/css_width.asp) - Sets or returns the width of an element
    -   [innerWidth()](https://www.w3schools.com/jquery/html_innerwidth.asp) - Returns the width of an element (includes padding)
    -   [innerHeight()](https://www.w3schools.com/jquery/html_innerheight.asp) - Returns the height of an element (includes padding)
    -   [outerWidth()](https://www.w3schools.com/jquery/html_outerwidth.asp) - Returns the width of an element (includes padding and border)
    -   [outerHeight()](https://www.w3schools.com/jquery/html_outerheight.asp) - Returns the height of an element (includes padding and border)

<img src="../../../../assets/images/image-20200325151923879.png" alt="image-20200325151923879" style="zoom:70%;" />

```javascript
// 반환
$('button').click(function() {
    alert($('div').height())
})

// 수정
$('div').height(value)
```

##### scrollTop

-   수직 스크롤바에 해당
-   현재 scroll의 값을 `반환`해주는 또는 `변경`해주는 API

```javascript
// 반환
$('div')
    .scrollTop()

    // 변경
    .scrollTop(value)

// 스크롤 최하단 자동 포커스
$(document).scrollTop($(document).height())
```

##### scrollBottom

##### JQuery Custom Scrollbar

[JQuery Custom Scrollbar](http://manos.malihu.gr/jquery-custom-content-scroller/)

조금 더 상향된 scroll plugin이라 생각해주세요

JS에서 scroll을 컨트롤 하는 것은 상당히 귀찮은 일입니다. 브라우저 별로 표준이 같지 않기 때문이죠

그래서 scroll에 한에서는 plugin을 사용하는 것도 괜찮습니다.

### checked

---

## EventBinding with Jquey

http://ankyu.entersoft.kr/Lecture/jquery/jquery_02_11.asp

bind(), delegate(), live(), on()

이벤트 바인딩 처리에 대한 고찰

### bind()

기본적으로 엘리먼트에 이벤트를 바인딩(선언, 할당), 이벤트 타입은 클릭, 마우스 오버/아웃 등등 ..

다양한 브라우저의 이벤트들이 들어가며, 이벤트 데이터 추가 데이터인데 잘 쓰이지 않음

```javascript
$('a').bind('click', function() {
    alert('클릭!')
})

// bind('click')과의 차이는 없음
$('a').click(function() {
    alert('클릭!')
})
```

### delegate()

부모의 엘리먼트에서 발생한 이벤트는 자식에게까지 전달되는데, 이 때 어떤 자식인지 체크해서 필터 해주는 기능

##

```javascript
$('div').bind('click', function(e) {
    if (e.taget.tagName == 'a') alert('클릭!')
})

$('div').delegate('a', 'click', function() {
    alert('클릭!')
})
```

### live()

동적 이벤트 리스너를 처리하기 위해 live() 사용

### on()

통합 이벤트 바인딩 메소드 on() = delegate() + live()

```javascript
$(document).on('click', 'a', function() {
    alert('클릭!')
})
```

## postMessage

https://developer.mozilla.org/ko/docs/Web/API/Window/postMessage
