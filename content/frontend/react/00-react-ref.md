---
title: "00 React Ref"
metaTitle: "This is the title tag of this page"
metaDescription: "This is the meta description"
---



# React

## #ref



### React에선 Dom에 어떻게 접근할까 ?



React에서의 DOM 제어

Ref는 render 메서드에서 생성된 `DOM Element`나 `React Conponent`에 접근하는 방법을 제공

- `사용하는 경우` (이 외의 경우에는 되도록 사용하지 않는 것이 좋다.)
  - 포커스, 텍스트 선택영역, 혹은 미디어의 재생을 관리
  - 애니메이션을 직접적으로 실행
  - 서드 파티 DOM 라이브러리를 React와 같이 사용

> `남용하지마세요!` ref는 애플리케이션에 어떤 일이 일어나게 할 때 사용될 수 있습니다.
>
> 그럴 때 잠시 멈추고 어느 컴포넌트 계층에서 상태를 소유해야 할 지 신중히 고려하세요.
>
> ( 대부분 상위 계층이며, state 끌어올리기로 처리가 가능합니다.)



### React.createRef()

**Ref 생성하기**

ref 어트리뷰트를 통해 React 엘리먼트에 부착

보통 컴포넌트의 인스턴스가 생성될 때 Ref 프로퍼티로서 추가하고,

컴포넌트의 인스턴스의 어느 곳에서도 Ref에 접근할 수 있게 처리

```react
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

### current

**Ref 접근하기 & 사용하기**

render 메서드 안에서 ref가 엘리먼트에게 전달 되면 그 노드를 향한 참조는 ref의 current 어트리뷰트에 담긴다.

```react
const node = this.myref.current;
```

#### current 유형

1. ref 어트리뷰트가 HTML 엘리먼트에 쓰였다면 생성자에서 React.createRef()로 생성된 ref는
   자신이 전달받은 DOM 엘리먼트를 current 프로퍼티의 값으로 받음

2. ref 어트리뷰트가 커스텀 클래스 컴포넌트에 쓰였다면,
   ref 객체는 마운트된 컴포넌트의 인스턴스를 current 프로퍼티 값으로 받음

3. 함수 컴포넌트는 인스턴스가 없어 ref 어트리뷰트 사용 불가

#### exampleA : DOM element

`ref`를 수정하는 작업은 `componentDidMount` 또는 `componentDidUpdate` 생명주기 메서드가

호출되기 전에 이루어집니다.

```react
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // textInput DOM 엘리먼트를 저장하기 위한 ref를 생성합니다.
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // DOM API를 사용하여 명시적으로 text 타입의 input 엘리먼트를 포커스합니다.
    // 주의: 우리는 지금 DOM 노드를 얻기 위해 "current" 프로퍼티에 접근하고 있습니다.
    this.textInput.current.focus();
  }

  render() {
    // React에게 우리가 text 타입의 input 엘리먼트를
    // 우리가 생성자에서 생성한 `textInput` ref와 연결하고 싶다고 이야기합니다.
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />

        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

#### exampleB : Class Component

컴포넌트의 인스턴스가 마운트 된 이후 즉시 클릭되는 걸 흉내내기 위해 `CustomTextInput` 컴포넌트를 감싸는 걸 원한다면,

ref를 사용하여 `CustomTextInput` 컴포넌트의 인스턴스에 접근하고 직접 `focusTextInput` 메서드를 호출

단 클래스가 컴포넌트일 경우에만 동작합니다. (함수 컴포넌트일 경우 동작하지 않음)

```react
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

### 부모컴포넌트에게 DOM ref 공개

- 언제 어디서 쓰니 ?



### Callback ref

ref 어트리뷰트에 React.createRef()를 통해 생성된 ref를 전달하는 대신 함수를 전달

전달된 함수는 다른 곳에 저장되고 접근될 수 있는 React 컴포넌트의 인스턴스나 DOM 엘리먼트를 인자로서 받음

```react
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // DOM API를 사용하여 text 타입의 input 엘리먼트를 포커스합니다.
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // 마운트 되었을 때 자동으로 text 타입의 input 엘리먼트를 포커스합니다.
    this.focusTextInput();
  }

  render() {
    // text 타입의 input 엘리먼트의 참조를 인스턴스의 프로퍼티
    // (예를 들어`this.textInput`)에 저장하기 위해 `ref` 콜백을 사용합니다.
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

- Parent 자신의 콜백 ref를 inputRef prop으로서 CustomTextInput에게 전달

```react
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```