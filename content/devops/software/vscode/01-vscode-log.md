---
title : vscode-log
typora-root-url: ../../../../public
---



vscode에서 간단하게 로그를 생성할 수 있는 plugin이 있어 소개한다.

사실 개발이란 무한한 디버그의 연속인데,

그 과정에서 콘솔을 타이핑하는 시간을 조금이라도 아낄 수 있는 이유로 이 플러그인은 꽤나 유용할 수 있다.

[다운로드](https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log)



**ConsoleLog 만들기**

(원하는 변수를 포커스 한 상태로) `ctrl + alt + L`

(여러 변수를 포커스 한 상태로) `ctrl + alt + L `

​	여기서 여러 변수는 `alt`를 통해 선택 가능하다



**사용 가능 속성**

기본값에서 크게 바꿀 속성은 없어 보이지만 한번 확인

<img src="/static/images/image-20200426020507046.png" alt="image-20200426020507046" style="zoom: 67%;" />

- 세미콜론여부
- WrapperClass 동봉여부
- WrapperFunction 동봉여부
- Custom Prefix
  - DEBUG를 위한 console이란 것을 알려주기 위해 전치사를 사용하는 것을 권장
- Quote (", ', `)
- Wrapper Console 여부



**모든 ConsoleLog 주석 처리하기**

`alt + shift + C`



**모든  ConsoleLog 주석 해제하기**

`alt + shift + U`



**모든 ConsoleLog 삭제하기**

`alt + shift + D`