---
index : 8
title: ErrorBoundary
---



- `Error Boundary`는 자식 컴포넌트 트리 내에 자바스크립트 오류를 감지하고 충돌이 발생한 컴포넌트 트리를 대신하여 대체 UI를 표시하는 React 컴포넌트입니다.
- 하위 트리에 존재하는 `랜더링과정, 생명주기 메서드, 모든 생성자`에 대해서 오류를 감지합니다.
- Class Component에 `static getDrivedStateFromError(), componentDidCatch()` 를 정의할 경우 해당 컴포넌트는 `Error Boundary`가 됩니다.



# Error Boundary

Error Boundary는 자바스크립트의 `catch {}` 구문과 유사하게 동작하지만 컴포넌트에 적용됩니다.

Class Component에 `static getDrivedStateFromError(), componentDidCatch()` 를 정의할 경우 해당 컴포넌트는 `Error Boundary`가 됩니다. 그런 후에 일반 컴포넌트로 사용할 수 있습니다.

```react
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```



### 에러의 대상이 아닌 경우

다음의 경우는 ErrorBoundary의 에러 대상이 아닙니다.

-   비동기 코드 (이벤트 핸들러 ...)
-   서버 사이드 렌더링
-   자식이 아닌 경계에서 발생하는 에러 



### Error Boundary 배치 위치

> *The granularity(세분화) of error boundaries is up to you.*
>
> Error Boundary의 세분화된 부분은 개발자에게 달려 있습니다.

- 서버 사이드 프레임워크가 충돌을 해결하는 것처럼 `최상위 경로의 컴포넌트를 감싸` 유저에게 문제 발생의 메시지를 전달할 수 있습니다.

- 에러 경계의 `각 위젯을 에러 경계로 감싸` 애플리케이션의 나머지 부분이 충돌하지 않도록 보호할 수도 있습니다.



### static getDerivedStateFromError()

하위 자손 컴포넌트에서 오류가 발생했을 때 호출됩니다.

이 메세드는 매개변수로 오류를 전달받고, 갱신된 state값을 반드시 반환해야 합니다.

```react
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // state를 갱신하여 다음 렌더링에서 대체 UI를 표시합니다.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // 별도로 작성한 대체 UI를 렌더링할 수도 있습니다.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```



> getDerivedStateFromError는 `render 단계에서 호출`되어, 부수효과를 발생시키면 안됩니다 
>
> 해당하는 경우 `componentDidCatch()`를 대신 사용하세요.



### componentDidCatch()

자손 컴포넌트에서 오류가 발생했을 때에 호출됩니다.

`커밋(?)` 단계에서 호출되어 부수효과를 발생시켜도 됩니다. (오류 로그 기록등을 위해 사용 가능)

```react
componentDidCatch(error: any, errorInfo: any) {
  this.setState({
    error: error,
    errorInfo: errorInfo,
  })
}
```

- `error` 발생한 오류
- `info` 어떠한 컴포넌트가 오류를 발생시켰는지에 대한 정보(`componentStack` 키를 갖는 객체)



> `componentDidCatch()`가 오류를 처리하는 방식은 프로덕션과 개발 빌드가 약간 다릅니다.
>
> 개발 빌드에서는 오류가 window까지 전파되나 프로덕션 빌드에선 전파되지 않습니다.



## Error Boundary in hook

hook에서는 아직 관련 기능을 지원하지 않습니다.

https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes



ClassComopnent의 Error Boundary는 hook의 에러를 감지하는가? 감지합니다.

https://github.com/facebook/react/issues/14981
