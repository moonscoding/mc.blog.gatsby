---
index : 5
title : Portal
---



부모 컴포넌트의 DOM 계층 구조 바깥에 있는 DOM 노드로 자식을 랜더링하는 방법을 제공합니다.

```react
ReactDOM.createPortal(child, container)
```

- `child` - element, string, fragment 등등 어떤 종류든 랜더링할 수 있는 React의 자식 컴포넌트
- `container` - DOM 엘리먼트



## Portal 

render 메서드에서 Element를 반환할 때 그 Element는 부모 노드에서 가장 가까운 자식으로 DOM에 마운트됩니다.

그런데 가끔 DOM의 다른 위치에 자식을 삽입하는 것이 유용할 수 있습니다.



```react
render() {
  return ReactDOM.createPortal(
    this.props.children,
    domNode  
  );
}
```

React는 새로운 div를 생성하지 *않고* `domNode` 안에 자식을 렌더링합니다.
`domNode`는 DOM 노드라면 어떠한 것이든 유효하고, 그것은 DOM 내부의 어디에 있든지 상관없습니다.



### HOC 활용한 Portal 사례

HOC를 활용해서 실제 Portal이 어떻게 사용되는지 살펴봅시다.



```react
export const Layer = ({ id = 'layer-root', children }) => {
    return ReactDOM.createPortal(
        <div className="layer">
            {children}
        </div>,
        document.getElementById(id),
    )
}
```

Layer 컴포넌트를 사용하면 `#layer-root(혹은 원하는 DOM Node)`에 자식 컴포넌트를 설정할 수 있습니다.





### Portal 생성순서

Portal의 자식 컴포넌트는 어디에도 연결되지 않은 DOM 노드로 마운트된 후에

Portal 엘리먼트가 DOM 트리에 삽입됩니다.



> Portal을 이용할 때 `키보드 focus 관리`가 매우 중요하단 것에 유념해야 합니다. 

```react
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}
```

만약 자식 컴포넌트가 Mount될 때 그것을 즉시 DOM 트리에 연결해야 한다면 

 (DOM 노드를 계산하거나, 자식 노드에서 autoFocus를 사용해야 하는 경우) 

Portal 컴포넌트가 React 트리에 삽입되어 있을 때만 별도로 추가된 Portal 엘리먼트를 연결하도록 설정합니다.



### Portal의 이벤트 버블링

Portal이 DOM 트리 어느 곳에든 존재할 수 있다고 하더라도, 일반적인 자식 컴포넌트와 동일하게 동작합니다.

이는 DOM 트리에서의 위치에 상관없이 Portal은 여전히 React 트리에 존재하기 때문입니다.

이것은 이벤트 버블링에서도 포함됩니다. 

**Portal 내부에서 발생한 이벤트는 실제 DOM 트리에서 그 상위가 아니라 하더라도 React 트리에 포함된 상위로 전파됩니다.**



```html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>

```

`#app-root` 안에 있는 Parent 컴포넌트는 형제 노드인 `#modal-root` 안의 컴포넌트에서 전파된 이벤트가 포착되지 않았을 경우 그것을 포착할 수 있습니다.																																																																

```react
// 여기 이 두 컨테이너는 DOM에서 형제 관계입니다.
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Parent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 이것은 Child에 있는 버튼이 클릭 되었을 때 발생하고 Parent의 state를 갱신합니다.
    // 비록 버튼이 DOM 상에서 직계 자식이 아니라고 하더라도 말입니다.
    this.setState(state => ({
      clicks: state.clicks + 1
    }));
  }
  
  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools to observe that the button
          is not a child of the div with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  // 이 버튼에서의 클릭 이벤트는 부모로 버블링됩니다.
  // 왜냐하면 'onClick' 속성이 정의되지 않았기 때문입니다.
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}

ReactDOM.render(<Parent />, appRoot);
```

Portal에서 버블링된 이벤트를 부모 컴포넌트에서 포착한다는 것은 본질적으로 Portal에 의존하지 않은 조금 더 유연한 추상화 개발이 가능함을 의미합니다.

Modal 컴포넌트를 랜더링할 때 부모는 그것이 Portal을 사용했는지와 관계없지 Modal의 이벤트를 포착 가능합니다.