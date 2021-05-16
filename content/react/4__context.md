---
index : 4
title: Ccontext
hide : false
---



하위 모든 React Component에 data를 바로 전달할 수 있는

 강력 API

(React에서는 사용하지 않는 것을 권장하고 있음)



- Context를 이용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공
- Context를 사용하면 컴포넌트 재사용이 어려움, Context보다 컴포넌트 합성이 더 간단한 경우가 있음
  - 체이닝되어 내려가는 것이 아니라, 사용할 곳에 합성으로 컴포넌트를 children으로 전달하는 방식



**Context 활용**

```react
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // Provider를 이용해 하위 트리에 테마 값을 보내줍니다.
    // 아무리 깊숙히 있어도, 모든 컴포넌트가 이 값을 읽을 수 있습니다.
    // 아래 예시에서는 dark를 현재 선택된 테마 값으로 보내고 있습니다.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 현재 선택된 테마 값을 읽기 위해 contextType을 지정합니다.
  // React는 가장 가까이 있는 테마 Provider를 찾아 그 값을 사용할 것입니다.
  // 이 예시에서 현재 선택된 테마는 dark입니다.
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

### React.creactContext

트리 상위에서 가장 가까이 있는 짝이 맞는 Provider로부터 현재값을 읽음

`defaultValue` 매개변수는 트리안에서 적절한 Provider를 찾지 못했을 때만 사용

> 하위 컴포넌트에서 context 참조할 때

```react
const MyContext = React.createContext(defaultValue);
```

> 하위 컴포넌트에서 context 수정할 때

```react
// createContext에 보내는 기본값의 모양을
// 하위 컴포넌트가 받고 있는 매개변수 모양과 동일하게 만드는 것 잊지마세요!
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});
```

### Context.Provider

context 하위에 있는 컴포넌트들에게 context의 변화를 알림

하위에 또 다른 Provider를 배치하는 것도 가능, 이 경우 하위 Provider값 우선

하위에서 context를 구독하는 모든 컴포넌트는 Provider의 value prop이 바뀔때마다 다시 렌더링되고

이 전파는 `shouldComponentUpdate`의 영향을 받지 않기 때문에

중간에 있는 컴포넌트가 업데이트를 중지한다고 해도 트리 끝에 있는 컴포넌트까지 전달 가능 (독립적으로 동작한다.)

```react
<MyContext.Provider value={/* 어떤 값 */}>
```

### Class.contextType

생성된 context 객체를 원하는 클래스의 contextType에 프로퍼티로 지정 가능

그러면 this.context를 이용해서 해당 Context의 가장 가까운 Provider를 찾아 그 값을 읽음

**typeA (stable)**

```react
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* MyContext의 값을 이용한 코드 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* ... */
  }
}
MyClass.contextType = MyContext;
```

**typeB (latest)**

```react
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* context 값을 이용한 렌더링 */
  }
}
```

### Context.Consumer

context의 변화를 구독하는 React 컴포넌트로 `함수 컴포넌트` 안에서 context를 읽기 위해서 쓸 수 있습니다.

Context.Consumer의 자식은 `함수`여야 합니다.

**consumer typeA**

```react
<MyContext.Consumer>
  {value => /* context 값을 이용한 렌더링 */}
</MyContext.Consumer>
```

**consumer typeB (매개변수가 2개 이상일 때)**

```react 
<ThemeContext.Consumer>
  {({theme, toggleTheme}) => (
    <button
      onClick={toggleTheme}
      style={{backgroundColor: theme.background}}>
      Toggle Theme
    </button>
  )}
</ThemeContext.Consumer>
```

### Context.displayName

Context 객체는 displayName 문자열 속성을 설정 가능

이 속성으로 context를 어떻게 보여줄 지 결정

```react
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" in DevTools
<MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools
```

**잘못된 context 사용법**

다음은 App 컴포넌트가 재 랜더링될 때 마다 하위로 context가 전파되어 성능 낭비를 가져올 수 있습니다.

```react 
class App extends React.Component {
  render() {
    return (
      <Provider value={{something: 'something'}}>
        <Toolbar />
      </Provider>
    );
  }
}
```

**올바른 context 사용법 (state로 끌어올리기)**

state로 끌어 올린다면 컴포넌트가 재 랜더링 되어도 context가 전파되지 않습니다.

```react
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: 'something'},
    };
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
```