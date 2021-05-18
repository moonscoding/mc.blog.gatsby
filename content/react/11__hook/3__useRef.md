---
index : 3
title : useRef
---

`useRef`는 초기 인자(`initialValue`)를  `current` 필드로  가진 변경가능한 `ref` 객체를 반환합니다.

반환된 ref 객체는 컴포넌트의 전 생명주기에서 계속 유지됩니다.

```react
const refContainer = useRef(initialValue);
```

## DOM Value

일반적으로  DOM에 접근하는 방식으로 refs에 친숙할 수 있습니다.

`\<div ref={myRef} /\>`처럼 ref를 사용하면, React는 매 랜더링마다 변경된 DOM 노드에 `.current` 프로퍼티를 설정합니다.



## Instance Value

useRef는 인스턴스 필드를 사용하는 방법을 제공합니다. (이것은 useRef가 순수 자바스크립트 객체를 생성하기 때문입니다.)



## useCallback Ref

useRef는 내용(.current)이 변경될 때 랜더링되지 않습니다. 따라서 그것을 캐치할 수 없습니다.

React가 DOM 노드에 ref를 attach, detach할 때 어떤 코드를 실행하고 싶다면 `useCallback Ref`를 사용해야 합니다.



```react
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {    
    if (node !== null) {      
      setHeight(node.getBoundingClientRect().height);    
    }  
  }, []);
  
  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>      
    	<h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}
```

React는 ref가 다른 노드에 연결될 때마다 해당 콜백을 호출합니다. 

`[]`를 useCallback의 두 번째 인자로 전달하기 때문에 마운트 혹은 마운트가 해제될 때만 함수가 다시 호출됩니다.



