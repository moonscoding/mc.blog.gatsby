---
index : 10
title: RTL
---



- <u>실행 디테일을 가지지 않는</u> React 컴포넌트를 테스트하게 하는 도구 모음
- 이러한 방식은 리팩토링을 수월하게 합니다.



## React Testing Library

경량 라이브러리이며, DOM 위주의 테스트로 내부 로직 변경에 자유로우며 구성요소의 내부 세부 정보를 테스트 하지 않는 것을 권장하고 웹페이지가 사용자와 상호작용 하는 방식에 중점을 두고 테스트

- If it relates to rendering components, then it should deal with DOM nodes rather than component instances, and it should not encourage dealing with component instances.
  **인스턴스가 아닌 DOM에 중점을 두고 테스트 하세요.**

- It should be generally useful for testing the application components in the way the user would use it. We _are_ making some trade-offs here because we're using a computer and often a simulated browser environment, but in general, utilities should encourage tests that use the components the way they're intended to be used.
  **사용자가 응용 프로그램 구성 요소를 테스트하는 것에 착안하여 테스트 하세요.**

- Utility implementations and APIs should be simple and flexible.

  **테스트 유틸리티는 간단하고 유연하게 만드세요.**





## Without Jest

If you're running your tests in the browser bundled with webpack (or similar) then `React Testing Library` should work out of the box for you. However, most people using React Testing Library are using it with the Jest testing framework with the `testEnvironment` set to `jest-environment-jsdom` (which is the default configuration with Jest).

Webpack (또는 유사)과 함께 번들로 제공되는 브라우저에서 테스트를 실행하는 경우 React Testing Library가 즉시 작동합니다. 그러나 React Testing Library를 사용하는 대부분의 사람들은 testEnvironment가 jest-environment-jsdom (Jest의 기본 구성)으로 설정된 Jest 테스트 프레임 워크와 함께 사용하고 있습니다.

`jsdom` is a pure JavaScript implementation of the DOM and browser APIs that runs in Node. If you're not using Jest and you would like to run your tests in Node, then you must install jsdom yourself. There's also a package called `global-jsdom` which can be used to setup the global environment to simulate the browser APIs.

jsdom은 Node.js에서 실행되는 DOM 및 브라우저 API의 순수한 JavaScript 구현입니다. Jest를 사용하지 않고 Node에서 테스트를 실행하려면 jsdom을 직접 설치해야합니다. 브라우저 API를 시뮬레이션하기 위해 전역 환경을 설정하는 데 사용할 수있는 global-jsdom이라는 패키지도 있습니다.



### with NextJS

```
npm i 
jest 
@testing-library/react 
@types/jest 
babel-jest 
@testing-library/jest-dom 
@testing-library/user-event 
@testing-library/dom -D
```





## 테스트 환경

### 랜더링 Mock (jsdom)

실제 브라우저가 아닌 환경에선 Node.js내에서 실행되는 `jsdom`을 사용하여 시뮬레이션하는 것을 권장합니다.

실제 브라우저와 마찬가지로 jsdom은 사용자 상호작용을 모델링할 수 있습니다.



### 함수 Mock

모의 함수는 특히 데이터를 불러올 때 유용합니다.

실제 API 종단점으로부터 발생한는 느려짐과 손상을 방지하기 위해 테스트에 Mock을 붙이는 것이 바람직합니다.



### 타이머 Mock

컴포넌트는 `setTimeout, setInverval Date.now`와 같은 시간을 기반으로한 함수를 사용할 수 있습니다.

테스트 환경에서 이러한 함수들은 수동으로 처리할 수 있는 대체품으로 Mock하는 것이 유용합니다.



### E2E 테스트

긴 작업흐름을 테스트하는데 유용합니다.

특히 비즈니스에 중요한 작업흐름을 테스트하는데 유용합니다. (이러한 경우는 실제 브라우저가 실제 앱 전체를 랜더하고, 실제 API를 호출하며, 세션과 쿠키를 사용하고, 다른 링크 사이를 이동하는 방법을 모두 테스트 하길 원합니다.)

이러한 시나리오는 `Cypress`와 같은 프레임워크나 `puppeteer` 같은 라이브러리를 사용하여 처리할 수 있습니다.

