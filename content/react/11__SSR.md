---
hide: true
index : 9
title: SSR
---

# React

Server Side Rendering (Universal Rendering)

-   `ReactDOMServer.renderToString()` server에서 html 생성
-   `ReactDOM.hydrate()` 로 클라이언트 재사용
    -   event handling 만 붙인다

**Server Side Render ... 과연 좋은가 ( 빠른가 ) ?**

-   정답이 없음 .. 상황에 따라 ..

**동작**

-   React 의 render() 함수는 React Element(==javascript object)를 반환
-   javascript 환경이면 render() 함수 호출은 문제가 없음
-   Virtual DOM tree는 실제 DOM tree와 다른 javascript 객체 트리
-   Virtual DOM tree는 string으로 변환 == server side template

**주의사항**

-   서버에서 실행하면 안되는 코드 ( -> componentDidMount() lifecycle 이후에 동작할 수 있도록 주의)
    -   `window`,`document` 접근 코드
    -   `DOM` 검색 & 조작 API
-   render() 함수는 server에서 실행됨을 주의
-   환경변수(process.env.BROWSER) 사용으로 분기하는 방법도 있음

**server client 같이 사용하지만 분기가 필요한 부분**

-   build시 다른 파일을 바라보도록 설정
-   Package.json에서 분기 처리
