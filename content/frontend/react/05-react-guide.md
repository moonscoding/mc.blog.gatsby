# React 

Development Guide 



## Declare

선언적으로 생각하기

- 어떻게(how) 보다 무엇(what)에 집중하는 프로그래밍

```react
// 명령형 & 조작형 (절차형)
showButton();

// 선언형
<Button />
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