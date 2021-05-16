---
index : 7
title : Profiler
---



`Profiler`는 React 애플리케이션이 랜더링하는 빈도와 랜더링 비용을 측정합니다.

`Profiler`의 목적은 `Memorization 같이 성능 최적화 방법`을 활용할 수 있는 느린 부분을 식별하는 것입니다.

Profiler는 약간의 오버헤드를 만들기에 `프로덕션 빌드`에서는 비활성화 됩니다.

## Profiler

`Profiler`는 React 트리내에 어디에나 추가 가능하며 트리의 특정 부분의 렌더링 비용을 계산합니다.

Profiler는 두 가지 props를 요구하는데요. `id`,  `onRender 콜백(함수)`이며 React 컴포넌트에 업데이트가 `커밋`되면 호출됩니다.



```react
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>      
      <Navigation {...props} />
    </Profiler>
    <Main {...props} />
  </App>
);
```

Navigation 컴포넌트와 자손 컴포넌트을 프로파일하기 위해서 다음과 같이 설정합니다.



> `Profiler`는 가벼운 컴포넌트지만 필요할 때만 설정하세요.
>
> 각 Profiler는 CPU, Memory 비용을 소모하기 때문입니다.



### onRender 콜백

React는 프로파일 트리내에 컴포넌트가 업데이트가 `커밋`될 때마다 이 함수를 호출합니다.

이 함수는 무엇이 렌더링 되었는지 그리고 얼마나 걸렸는지 설명하는 입력값을 받습니다.



```react
function onRenderCallback(
  id, // 방금 커밋된 Profiler 트리의 "id"
  phase, // "mount" (트리가 방금 마운트가 된 경우) 혹은 "update"(트리가 리렌더링된 경우)
  actualDuration, // 커밋된 업데이트를 렌더링하는데 걸린 시간
  baseDuration, // 메모이제이션 없이 하위 트리 전체를 렌더링하는데 걸리는 예상시간 
  startTime, // React가 언제 해당 업데이트를 렌더링하기 시작했는지
  commitTime, // React가 해당 업데이트를 언제 커밋했는지
  interactions // 이 업데이트에 해당하는 상호작용들의 집합
) {
  // 렌더링 타이밍을 집합하거나 로그...
}
```



### Profiler 중첩

`Profiler` 컴포넌트는 하위 트리의 다른 컴포넌트들을 계산하기 위해 중첩해서 사용가능합니다.

```react
render(
  <App>
    <Profiler id="Panel" onRender={callback}>
      <Panel {...props}>
        <Profiler id="Content" onRender={callback}>
          <Content {...props} />
        </Profiler>
        <Profiler id="PreviewPane" onRender={callback}>
          <PreviewPane {...props} />
        </Profiler>
      </Panel>
    </Profiler>
  </App>
);
```

