---
index : 3
title: Ref
---



`Ref`는 render 메서드에서 생성된 DOM 노드나 React 엘리먼트에 접근하는 방법을 제공합니다.



## ref with DOM

Ref의 바람직한 사례는 다음과 같습니다.

이외에 선언적으로 해결이 가능한 경우에는 Ref 사용을 지양해야 합니다. (Ex. open, close 메서드를 두는 대신, isOpen prop을 사용하세요.)

1. 포커스, 텍스트 선택영역, 혹은 미디어의 재생을 관리할 때

2. 애니메이션을 직접적으로 실행할 때

3. 서드 파티 DOM 라이브러리를 React와 같이 사용할 때



> `Ref 남용하지마세요!`
>
>  ref는 애플리케이션에 `어떤 일이 일어나게 할 때` 사용될 수 있습니다.
>
> 그럴 때 잠시 멈추고 어느 컴포넌트 계층에서 상태를 소유해야 할 지 신중히 고려하세요.
>
> ( 대부분 상위 계층이며, state 끌어올리기로 처리가 가능합니다.)



### Ref 생성하기 - React.createRef()

Ref는 `React.createRef()`를 통해 생성되고 `ref` 어트리뷰트를 통해 React 엘리먼트에 부착됩니다.



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

보통 컴포넌트의 인스턴스가 생성(contructor)될 때 Ref 프로퍼티로서 추가하고, 컴포넌트의 인스턴스의 어느 곳에서도 Ref에 접근할 수 있게 처리합니다.



### Ref 접근하기 - current

```react
const node = this.myref.current;
```

render 메서드 안에서 ref가 엘리먼트에게 전달됐을 때, 그 노드를 향한 참조는 ref의 `current` 필드에 담긴다.



### Ref current 사용 유형

1. ref 필드가 HTML 엘리먼트에 쓰였다면 생성자에서 React.createRef()로 생성된 ref는 자신이 전달받은 `DOM 엘리먼트`를 current 프로퍼티의 값으로 받습니다.
2. ref 필드가 커스텀 클래스 컴포넌트에 쓰였다면, ref 객체는 마운트된` 컴포넌트의 인스턴스`를 current 프로퍼티 값으로 받습니다.
3. `함수 컴포넌트`는 인스턴스가 없어 ref 필드를 사용할 수 없습니다. 



#### [1] DOM 엘리먼트에서 Ref 사용하기

컴포넌트가 마운트될 때 React는 current 필드에 DOM 엘리먼트를 대입하고,

컴포넌트의 마운트가 해제될 때 current 필드를 다시 null로 돌려 놓습니다.



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

`ref`를 수정하는 작업은 `componentDidMount` 또는 `componentDidUpdate` 생명주기 메서드가

호출보다 앞서 이루어집니다.



#### [2] 클래스 컴포넌트에서 Ref 사용하기

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

컴포넌트의 인스턴스가 마운트 된 이후 즉시 클릭되는 걸 흉내내기 위해 `CustomTextInput` 컴포넌트를 감싸는 걸 원한다면, ref를 사용하여 `CustomTextInput` 컴포넌트의 인스턴스에 접근하고 직접 `focusTextInput` 메서드를 호출합니다.



> 단 클래스가 컴포넌트일 경우에만 동작합니다. (함수 컴포넌트일 경우 동작하지 않음)



#### [3] 함수 컴포넌트와 Ref

함수 컴포넌트는 인스턴스가 없기 때문에 ref 어트리뷰트를 사용할 수 없습니다.

함수 컴포넌트에 ref를 사용하고 싶다면 forwardRef(useImperativeHandle과 함께)를 사용하거나 클래스 컴포넌트로 변경할 수 있습니다.



```react
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // 이 코드는 동작하지 않습니다.
    return (
      <MyFunctionComponent ref={this.textInput} />
    );
  }
}
```



> ref 어트리뷰트를 함수 컴포넌트에서 사용하는 것은 가능합니다. (useRef)



### 부모컴포넌트에게 DOM Ref 공개

드문 경우로, 부모 컴포넌트에서 자식 컴포넌트의 DOM 노드에 접근하려 하는 경우가 있습니다.

(자식 컴포넌트의 DOM 노드에 접근하는 것은 컴포넌트의 DOM 노드를 파괴하기 때문에 권장하지 않습니다.)



React 16.3 이후로 `Ref Forwarding`을 사용하는 것을 권장합니다.

Ref Forwading은 컴포넌트가 자식 컴포넌트의 Ref를 자신의 Ref로서 외부에 노출시키게 합니다. 

자식 컴포넌트의 DOM 노드를 부모 컴포넌트에게 공개하는 방법이 있습니다.



### Callback Ref

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

-   Parent 자신의 콜백 ref를 inputRef prop으로서 CustomTextInput에게 전달

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



## forwarding ref

`ref 전달`은 컴포넌트를 통해 자식 중 하나에 `ref`를 자동으로 전달하는 기법입니다. 

일반적으로 필요하지 않지만 재사용 가능한 컴포넌트 라이브러리와 같은 어떤 컴포넌트에서 유용할 수 있습니다



## QnA

