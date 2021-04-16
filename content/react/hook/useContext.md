---
title : react > hook > useContext
---



```react
const value = useContext(MyContext);
```

- MyContext - context 객체
- value - MyContext.Provier의 value



`useContext`는 `MyContext.Provider`와 같이 사용해야 합니다.

`MyContext.Provider`가 갱신되면,  `useContext`는 가장 최신의 `value`를 사용하여 랜더러를 트리거 합니다.

`useContext`를 호출한 컴포넌트는 context 값이 변경되면 항상 리랜더링 될 것입니다.



## useContext

```react
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('black');
const ContextSample = () => {
  const theme = useContext(ThemeContext);
  const style = {
    width: '24px',
    height: '24px',
    background: theme
  };
  return <div style={style} />;
};

export default ContextSample;
```

