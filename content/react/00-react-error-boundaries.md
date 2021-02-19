---
hide : true
---



# React



# ErrorBoundaries

일부분의 UI 때문에 전체 자바 스크립트가 중단되선 안되기 때문에

하위 컴포넌트 어디서든 자바스크립트 에러를 기록 깨진 컴포넌트 트리 대신 `대체 UI`를 보여줌



다만 다음과 같은 에러는 대상이 아님 (비동기에러)

- 이벤트 핸들러
- 비동기 코드
- 서버 사이드 렌더링
- 자식이 아닌 경계에서 발생하는 에러



## 어디에 위치해야 할까?

The granularity(세분화) of error boundaries is up to you.

## API

### getDerivedStateFromError

```react
static getDerivedStateFromError(error: any) {
  return { error, errorInfo }
}
```

### componentDidCatch

```react
componentDidCatch(error: any, errorInfo: any) {
  this.setState({
    error: error,
    errorInfo: errorInfo,
  })
}
```



## ErrorBoundaries in Hook

hook에서는 아직 관련 기능을 지원하지 않음 .. 헐

https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes



그럼 여기서 궁금한 점이 ClassComopnent로 만들어서 Hook에 사용이 가능한가 ? (가능)

https://github.com/facebook/react/issues/14981

