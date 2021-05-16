---
title : react
---



## React

React는 core라이브러리와 dom라이브러리로 나누어 생각할 수 있습니다.

- `core 라이브러리` 컴포넌트 생성 및 관리합니다.
- `dom 라이브러리` 실제로 컴포넌트를 렌더링합니다. (렌더링 - 컴포넌트를 HTML으로 바꿔 브라우저에 나타냄)



### JSX

`JSX` 는 순수한 `Js`로 바꾸어 브라우저가 해석할 수 있도록 하는 문법입니다.

```
ReactDOM.render(<App />, document.getElementById('root'));
```





## React식으로 생각하기

https://ko.reactjs.org/docs/thinking-in-react.html

1. Component 구성도 그리기 (작은 것 부터 큰 것으로 개발할 것)

2. 데이터의 역할 구분하기 State vs Props (Context)

   State 찾기 (진리의 원천)

   1. 부모의 prop에서 가져올 수 없고
   2. 시간이 지남에도 변하지 않고
   3. 다른 데이터를 가지고 파생할 수 없고

3. State 위치 찾기

4. 역방향 데이터 흐름 추가하기 (State 끌어올리기)



## Question

### Q1. React 컴포넌트 생성주기에 우선순위를 줄 수 있을까?

# 