---
index: 0
title: setup
---

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

