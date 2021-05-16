---
index: 5
title: fireEvent
---



`user-event` 는 fireEvent에서 제공하는 것보다 진보된 브라우저 상황을 제공하는 라이브러리입니다. 



## fireEvent

`eventProperties` 의 전체목록이 필요하다면 다음을 확인하세요.  [src/event-map.js](https://github.com/testing-library/dom-testing-library/blob/master/src/event-map.js) 



### 사용방식1. fireEvent(node: HTMLElement, event: Event)

```js
// <button>Submit</button>
fireEvent(
    getByText(container, 'Submit'),
    new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
    }),
)
```



### 사용방식2. fireEvent\[eventName]

```js
fireEvent[eventName](node: HTMLElement, eventProperties: Object)
```


```js
// <button>Submit</button>
// default `button` property for click events is set to `0` which is a left click.
const rightClick = { button: 2 }

fireEvent.click(getByText('Submit'), rightClick)
```



### target

두 번째 매개변수로 `target`을 제공하면, 이벤트를 수신하는 노드에 할당됩니다. 

이 것은 `change` 이벤트에 유용합니다.

```react
fireEvent.change(getByLabelText(/username/i), { target: { value: 'a' } })
```



### dataTransfer

`Drag Event`는 작업중에 전송된 데이터가 포함된 `dataTransfer` 속성이 있습니다.

```react
fireEvent.drop(getByLabelText(/drop files here/i), {
  dataTransfer: {
    files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })],
  },
})
```



### Keyboard event

`keyPress, keyDown, keyUp` 세 가지 이벤트가 있습니다.

````react
fireEvent.keyDown(domNode, { key: 'Enter', code: 'Enter' })
fireEvent.keyDown(domNode, { key: 'A', code: 'KeyA' })
````



### createEvent

```shell
createEvent[eventName](node: HTMLElement, eventProperties: Object)
```

이벤트에 대한 reference를 갖게 하기 위해, event를 직접 생성할 수 있습니다.

프로그래밍 방식으로 시작할 수 없는 이벤트 속성에 접근해야하는 경우 효과적입니다. (such as `timeStamp`)



```js
const myEvent = createEvent.click(node, { button: 2 })
fireEvent(node, myEvent)
// myEvent.timeStamp can be accessed just like any other properties from myEvent
```

`myEvent.timeStamp` 는 다른 속성처럼 접근 가능합니다.



```react
// simulate the 'input' event on a file input
fireEvent(
  input,
  createEvent('input', input, {
    target: { files: inputFiles },
    ...init,
  })
)
```

`generic event`를 생성할 수도 있습니다.





## user-event

### @testing-library/user-event

```shell
npm install --save-dev @testing-library/user-event
```



`userEvent` 는  한 가지 예외를 제외하고 동기식입니다. (`type`)

`before/after` 블록 내에서 userEvent를 사용하지 않는 것이 좋습니다.



### API

- `click`(element, eventInit, options)
- `dblClick`(element, eventInit, options)
- `type`(element, text, [options])
- `upload`(element, file, [{ clickInit, changeInit }])
- `clear`(element)
- `selectOptions`(element, values) / `deselectOptions`(element, values)
- `tab`({ shift, focusTrap })
- `hover`(element) / `unhover`(element)
- `paste`(element, text, eventInit, options)



### type (element, text, [options])

`input, textarea` 태그에 텍스트를 입력하는데 사용합니다.

`options.delay` 입력되는 두 문자 사이를 통과하는 ms입니다. (default : 0)



```react
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('type', () => {
  render(<textarea />)

  userEvent.type(screen.getByRole('textbox'), 'Hello,{enter}World!')
  expect(screen.getByRole('textbox')).toHaveValue('Hello,\nWorld!')
})
```

`userEvent.type`은 `promise`를 반환하지만,  options.delay를 사용한다면 `await`가 필요합니다.

