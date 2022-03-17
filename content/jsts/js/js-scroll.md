# scroll



## wheel



## scroll

#### #1 Javascript

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



#### #2 Jquery

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



##### #3 JQuery Custom Scrollbar

[JQuery Custom Scrollbar](http://manos.malihu.gr/jquery-custom-content-scroller/)

조금 더 상향된 scroll plugin이라 생각해주세요

JS에서 scroll을 컨트롤 하는 것은 상당히 귀찮은 일입니다. 브라우저 별로 표준이 같지 않기 때문이죠

그래서 scroll에 한에서는 plugin을 사용하는 것도 괜찮습니다.