---
title : react > hook > useEffect
---



`Side Effect`(Effect - React 컴포넌트 안에서 데이터를 가져오거나 구독하고 DOM을 직접 조작하는 작업)를 처리합니다.

Class Component방식에 익숙하다면 useEffect를 `componentDidMount, compontntDidUpdate, componentWillUnmount`가 합쳐진 것과 유사합니다.

서버 랜더링이라면 자바스크립트가 모두 다운로드 될 때까지 `useEffect, useLayoutEffect` 어느 것도 실행되지 않습니다.





## useEffect

React가 DOM을 업데이트한 뒤 추가로 코드를 실행해야 하는 경우가 있습니다.

React는 DOM을 바꾼 뒤에 useEffect(effect 함수)를 실행합니다.



```react 
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

useEffect는 React에게 컴포넌트가 랜더링되고 어떤 일을 수행해야 하는지 말합니다.

React는 우리가 useEffect를 통해 넘긴 함수(effect)를 기억했다가 DOM 업데이트를 수행하고 해당 함수를 실행합니다. 



> 대부분 effect는 비동기로 동작합니다.
>
> 별도로 동기로 동작하는 effect 처리가 필요할 경우 `useLayoutEffect`를 사용할 수 있습니다.



> componentDidMount, componentDidUpdate와 달리 useEffect에서 사용되는 effect는 
>
> 브라우저가 화면을 업데이트하는 것을 차단하지 않습니다. (?)



### clean-up (componentWillUnmount)

Subscription이 필요하다면, 반드시 Unsubscription도 필요할 것입니다. 

Class Component에서는 이를 `componentDidMount, componentWillUnmount`에서 각각 처리했습니다.



```react
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    
    // effect 이후에 어떻게 정리(clean-up)할 것인지 표시합니다.
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

effect 함수는 return되는 함수를 통해서 componentWillUnmount의 역할을 대체할 수 있습니다.

이는 effect를 위한 추가적인 정리(clean-up) 매커니즘입니다. 모든 effect는 clean-up 반환 함수를 가질 수 있습니다.



>  Q. effect가 clean-up되는 시점은 언제인가요?
>
> React 컴포넌트의 마운트가 해제될 때 clean-up을 실행합니다.



### effect의 호출 (componentDidUpdate)

componentDidMount에서 componentWillUnmount가 실행되기 전에

 `props.friend` 값에 변동이 있다면 아래 코드는 그것을 인식하지 못할 것 입니다.

```react
componentDidMount() {
  ChatAPI.subscribeToFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}

componentWillUnmount() {
  ChatAPI.unsubscribeFromFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}
```



그렇기 때문에 기존 Class Component는 `componentDidUpdate`를 통해 변경된 값을 재할당하는 로직이 필요합니다.

```react
componentDidUpdate(prevProps) {
  // 이전 friend.id에서 구독을 해지합니다.
  ChatAPI.unsubscribeFromFriendStatus(
    prevProps.friend.id,
    this.handleStatusChange
  );
  // 다음 friend.id를 구독합니다.
  ChatAPI.subscribeToFriendStatus(
    this.props.friend.id,
    this.handleStatusChange
  );
}
```



그러나 useEffect는 아래 코드로 충분합니다. (componentDidMount + componentWillUnmount + componentDidUpdate)

**useEffect는 모든 랜더링 이후에 effect를 실행**되기 때문에 `componentDidUpdate`  의미를 내포합니다.

```react
useEffect(() => {
  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
```



### 최적화를 위한 Array Parameter

effect는 모든 랜더링에 호출되기 때문에 효과적이나 때로는 이것이 성능 저하를 야기할 수 있습니다.

Class Component에서는 `componentDidUpdate`에서 `prevProps, prevState`와의 비교를 통해 이를 해결합니다.  

```react
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```



useEffec에서는 방법이 상대적으로 간단합니다.

아래 useEffect는 두 번째 매개변수인 `[count]`에 의해서 

count가 `변경`(변경은 현재값과 이전값이 달라졌을 경우를 의미 ) 될 때만 effect를 실행할 것입니다.

```react
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```



#### 빈 배열 (componentDidMount)

effect를 실행하고 이를 정리(clean-up)하는 과정을 (마운트와 마운트 해제 시에)딱 한 번씩만 실행하고 싶다면, 

빈 배열(`[]`)을 두 번째 인수로 넘기면 됩니다.  (특별한 문법은 아니고 빈 배열이기 때문에 갱신지 않을 뿐이라고 합니다.)



> **빈 배열(`[]`)을 넘기게 되면, effect 안의 prop과 state는 초깃값을 유지하게 됩니다.**

성능최적화를 위해 빈배열을 사용할 때, 내부에 사용하지 않는 props나 state가 있는지 유심히 확인해야 합니다.

```react
function Example({ someProp }) {
  function doSomething() {
    console.log(someProp);  
  }

  useEffect(() => {
    doSomething();
  }, []); // 🔴 이것은 안전하지 않습니다 (`someProp`을 사용하는`doSomething`을 호출합니다)
}
```



일반적으로 어떤 props, state가 참조되는지 기억하는 건 어렵습니다 

**일반적으로 [그 내부의 effect에 필요한 함수 컴포넌트를 선언하려는 이유](https://ko.reactjs.org/docs/hooks-faq.html#performance-optimizations)입니다.**

```React
function Example({ someProp }) {
  useEffect(() => {
    function doSomething() {
      console.log(someProp);    
    }

    doSomething();
  }, [someProp]); // ✅ OK (우리 effect는`someProp` 만 사용합니다)
}
```



### Multiple Effect

useEffect는 여러번 사용이 가능합니다. 그로 인해 서로 관련 없는 로직을 분리할 수 있습니다.



### effect의 빈번한 호출

[link](https://ko.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often)

```react
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // 이 effect는 'count' state에 따라 다릅니다    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 버그: `count`가 종속성으로 지정되지 않았습니다
  return <h1>{count}</h1>;
}
```

다음 예제는 마운트후에 1초마다 count가 +1 되는 것을 의도했습니다.

하지만 다음 effect 함수는 count값의 변경을 인식하지 못합니다. 

(effect 콜백이 실행됐을 때 count 값이 0으로 설정된 클로저를 생성했기 때문입니다.)

종속항목으로 [count]를 지정하면 문제가 해결되지만 count의 변경마다 setInterval이 재설정됩니다.



#### [1] 함수적 갱신

[link](https://ko.reactjs.org/docs/hooks-reference.html#functional-updates)

```react
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ 이것은 외부의 'count' 변수에 의존하지 않습니다
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ 우리의 effect는 컴포넌트 범위의 변수를 사용하지 않습니다

  return <h1>{count}</h1>;
}
```



#### [2] useRef

인스턴스 필드 기능로 사용할 수 있는 `useRef`를 이용한 방식입니다.

```react
function Example(props) {
  // 최신 props를 ref에 보관하십시오.  
  const latestProps = useRef(props);  
  useEffect(() => {    
    latestProps.current = props;  
  });
  
  useEffect(() => {
    function tick() {
      // 언제든지 최신 props 읽기     
      console.log(latestProps.current);    
    }

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []); // 이 effect는 다시 실행되지 않습니다
}
```





## useLayoutEffect

`useEffect`에 입력된 함수는 랜더링 결과가 DOM에 반영된 후에 `비동기`로 호출되지만,

`useLayoutEffect`는 모든 DOM  변경 후에 `동기적`으로 발생합니다.

DOM에서 레이아웃을 읽고 동기적으로 리랜더링하는 경우에 사용하세요.

**useLayoutEffect 내부에 예정된 갱신은 브라우저가 화면을 그리기 이전 시점에 동기적으로 수행됩니다.** 



> Class Component에서 코드를 변환하는 경우라면
>
> useLayoutEffect는 componentDidMount, componentDidUpdate와 동일한 단계를 실행하게 된다는 것에 주의하세요.



### useEffect를 먼저 고려해야하는 이유

단 그렇기에 useLayoutEffect에 입력한 함수에서 연산이 많다면 브라우저가 먹통이 될 수 있습니다.

특별한 이유가 없다면, useEffect를 사용하고 랜더링 직후 Dom 요소의 값을 읽는 경우라면 useLayoutEffect를 사용해야 합니다.
