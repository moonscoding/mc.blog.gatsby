---
index: 4
title: screen
---



모든 `query`는 `container`를 첫 번째 인수로 허용합니다.

일단적으로 `document.body`를 사용하는 것이 흔한 방법이지만, RTL는 pre-bound된 모든 query가 있는 `screen`을 제공합니다.



## Screen

```react 
import { screen } from '@testing-library/dom'

document.body.innerHTML = `
  <label for="example">Example</label>
  <input id="example" />
`

const exampleInput = screen.getByLabelText('Example')
```



## Debugging

### screen.debug()

편의를 위해 `screen`에는 쿼리 외에 `debug 메소드` 도 표시됩니다.

이 방법은 `console.log(prettyDOM())`를 위한 `shortcut`입니다.



```react
import { screen } from '@testing-library/dom'

document.body.innerHTML = `
  <button>test</button>
  <span>multi-test</span>
  <div>multi-test</div>
`

// debug document
screen.debug()
// debug single element
screen.debug(screen.getByText('test'))
// debug multiple elements
screen.debug(screen.getAllByText('multi-test'))
```



### screen.logTestingPlaygroundURL()

[`testing-playground`](https://testing-playground.com/)를 사용해서 디버깅하기 위해 `screen`은 브라우저에서 열 수있는 URL을 기록하는 편리한 방법을 제공합니다.



```react
import { screen } from '@testing-library/dom'

document.body.innerHTML = `
  <button>test</button>
  <span>multi-test</span>
  <div>multi-test</div>
`

// log entire document to testing-playground
screen.logTestingPlaygroundURL()
// log a single element
screen.logTestingPlaygroundURL(screen.getByText('test'))
```

