---
index : 2
title: LifeCycle
---

모든 Component는 여러 종류의 `LifeCycle 메서드`를 가지며 이 메서드들은 `Overriding`하여 특정 시점에 코드가 실행되도록 설정할 수있습니다.

## LifeCycle

![image-20210417214659736](life-cycle.assets/image-20210417214659736.png)

https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/



### Mount

아래 메서드들은 컴포넌트의 인스턴스가 생성되어 DOM상에 삽입될 때에 순서대로 호출합니다.

1. constructor()

2. static getDerivedStateFromProps()

3. render()

4. componentDidMount()



### Update

props, state가 변경되면 갱신이 발생합니다. 아래 메서드들은 컴포넌트가 다시 랜더링될 떄 순서대로 호출됩니다.

1. static getDerivedStateFromProps()

2. shouldComponentUpdate()

3. render()

4. getSnapshotBeforeUpdate()

5. componentDidUpdate()



### Unmount

아래 메서드는 컴포넌트가 DOM상에서 제거될 때 호출됩니다.

1. componentWillUnmount()



### Error Handling

아래 메서드들은 다음과 같은 상황에 발생합니다.

- 자식 컴포넌트를 랜더링하거나 

- 자식 컴포넌트가 생명주기 메서드를 호출하거나 

- 자식 컴포넌트가 생성자 메서드를 호출하는 과정에서 오류가 발생했거나



1. static getDerivedStateFromError()

2. componentDidCatch()





## LifeCycle Method

### 













---



### Question. FunctionComponent

#### 1. FunctionComponent에서 함수내의 스코프는 언제 실행될까 ?

FunctionComponent 자체는 호출마다 계속 실행됩니다.

Context, State 따위가 변경되었을 때, React는 화면을 재구성하기 위해 FunctionComponent를 재호출합니다.



#### 2. 부모, 자식 FunctionComponent가 있을 때 어떤 useEffect가 먼저 호출되나요 ?

Parent, Child 컴포넌트가 각각 useEffect를 가지고 있다면,

호출 순서는 Child -> Partnet 순입니다.

```react
<Parent>
  <Child></Child>
</Parent>
```



#### 3. Parent Component의 useEffect가 먼저 호출되게 하려면 어떻게 하나요 ?

[2]에서 언급했듯이 Partnet, Child 컴포넌트가 각각 있다면 useEffect의 호출 순서는 Child -> Partnet 순입니다.

ClassComponent에서는 componentWillMount(componentWillUpdate)를 사용할 수 있지만

다음 자료에 따르면 https://reactjs.org/docs/react-component.html#unsafe_componentwillmount

componentWillMount(componentWillUpdate)는 더이상 사용하지 않을 것을 권장합니다.

만약 componentWillMount(componentWillUpdate)를 요청하는 이유가 렌더링 전에 상태를 초기화하려고하기 때문이라면 useState에서 수행하세요

만약 componentWillMount(componentWillUpdate)를 요청하는 이유가 생명주기의 순서를 맞춰주기 위함이라면,

문제가 있습니다. 설계를 다시 하세요.

다만 Parent의 useEffect가 먼저 호출되야 하는 경우가 있습니다.

이럴때 사용할 수 있는 방법이 몇 가지 있는데요.

1. 부모의 state 변경에 따라 자식 useEffect가 동작하도록 처리하기
2. setTimeout 이용하여 useEffect 내부동작을 제일 마지막에 실행시키기



#### 4. useEffect는 어떻게 동작하나요 ?

```
We pass in a function that we want React to run every time our component gets rendered or updated. This function can also return a function that’ll get called when our component needs to cleanup the old render. So if React renders our component, and we call setStateVariable at some point, React will need to re-render it. Here is what roughly what happens:
```

#### 5. useEffect(() => {}, [])와 useEffect(() => {}, [something]) 중에 어떤게 먼저 동작하나요

Hook에서 중요한것은 어떠한 스코프(반복이나 조건)안에 Hook을 넣지 않는 것입니다.

Hook은 호출되는 순서에 따라 실행되기 때문입니다.

따라서 위의 두가지 경우도 Hook안에서 먼저 호출되는 것이 먼저 실행됩니다.
