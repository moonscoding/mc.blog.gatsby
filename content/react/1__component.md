---
title : Component
---



전역 객체 `Raact` 는 React 라이브러리의 진입점입니다. 

script 태그를 사용해서 React를 불러오면 전역 객체 `React`를 통해 최상위 API를 사용할 수 있습니다.



## Component

React Component를 사용하면 UI를 독립적이고 재사용할 수 있는 부분으로 나누고 각 부분을 분리하여 생각할 수 있습니다.

- React.Component
- React.PureComponent
- React.memo - React Component를 정의할 때 래핑될 수 있는 함수의 형태로 할 수 있습니다.



### React.Component

React.Component는 ES6 class를 사용하여 React 컴포넌트를 정의할 때 기초가 되는 class입니다.

```react
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

`render()` 는 React.Component의 하위 class에서 반드시 정의해야하는 메서드입니다.





## Element

### Element 생성하기

JSX를 사용할 것을 권장합니다.

JSX는 단지 `React.createElement()`를 호출하는 편리한 문법에 불과합니다. (그렇기에 JSX를 사용하면 `createElement(), createFactory()`와 같은 메서드들을 직접 호출하는 일은 거의 없습니다.)



### Element 변환하기

React는 Element를 조작하는 API를 제공합니다.

- cloneElement()
- isValidElement()
- React.Children





## Suspense

`Suspense`를 사용하면 Component가 랜더링하기 전에 다른 직업이 먼저 이루어지도록 `대기합니다.`

현재 Suspense는 단 하나의 사용 사례 `React.lazy`를 사용하여 Component를 동적으로 불러오기만 지원합니다.

차 후에 데이터 불러오기와 같은 사용 사례를 지원할 계획.

- React.lazy
- React.Suspense

