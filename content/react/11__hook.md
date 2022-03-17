---
index : 9
title: Hook
---



## Hook

Class 작성없이 React의 여러 기능을 사용할 수 있는 새로운 방식의 함수형 React Component이다. useEffect, useState, useContext, useReducer과 같이 다양한 기본 내장 Hook을 가지고 있고 필요에 따라 Custom Hook을 만들 수 있다. 

## Function vs Class

FunctionComponent인 Hook은 v16.8에 새로 추가 되었고 Class 작성없이 React의 여러 기능을 사용할 수 있다. 그러나 Hook이 앞 선 ClassComponent의 컨셉을 대체하진 않으며 두 방식 모두 공식 지원 예정이다.

### Class Component

전통적으로 사용하던 방식으로 React.Component를 상속받아 직관적인 상태선언과 생명주기함수를 사용한다.

### Function Component

Hook은 새로운 props, state, context, refs, 그리고 lifestyle의 관리방식을 제공한다. 놀랍게도 이 또한 모두 Hook으로 구성되어 있기 때문에 확장성에 매우 용이하다. 

## Custom Hook

앞 서 설명한 Hook은 확장성에 대한 특징은 Custom Hook에서 특히 두드러진다. Hook은 JSX를 반환하여 DOM 컴포넌트로 사용할 수 있지만, 필요에 따라 컴포넌트 로직을 재사용하여 Custom Hook으로 사용할 수 있다.