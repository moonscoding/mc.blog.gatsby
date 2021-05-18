---
index: 6
title: async
---





## findBy Queries

findBy 쿼리는 `getBy + waitFor`의 조합기능입니다.

They accept the waitFor options as the last argument 

(e.g. `await screen.findByText('text', queryOptions, waitForOptions)`).

`findBy` queries work when you expect an element to appear but the change to the DOM might not happen immediately.

```js
const button = screen.getByRole('button', { name: 'Click Me' })
fireEvent.click(button)
await screen.findByText('Clicked once')
fireEvent.click(button)
await screen.findByText('Clicked twice')
```



## waitFor

일정시간 기다려야하는 경우에 waitFor를 사용할 수 있습니다.

callback 함수가 오류를 반환하지 않을 때까지 기다립니다.

```js
function waitFor<T>(
  callback: () => T | Promise<T>,
  options?: {
    container?: HTMLElement
    timeout?: number
    interval?: number
    onTimeout?: (error: Error) => Error
    mutationObserverOptions?: MutationObserverInit
  }
): Promise<T>
```

```js
// 이 경우에는 mock 함수가 한 번 호출 될 때까지 기다립니다.
await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1))
```

`waitFor` may run the callback a variable number of times.

`waitFor`는 콜백을 가변 횟수만큼 실행할 수 있습니다.



This can be useful if you have a unit test that mocks API calls and you need to wait for your mock promises to all resolve.

이는 mock API 호출의 단위 테스트가 있고 모든 해결에 대한 모의 약속을 기다려야하는 경우 유용 할 수 있습니다.

If you return a promise in the `waitFor` callback (either explicitly or implicitly with `async` syntax), then the `waitFor` utility will not call your callback again until that promise rejects. This allows you to `waitFor` things that must be checked asynchronously.

`waitFor` 콜백에서 Promise을 반환하면 (명시적 또는 암시적인 `async` 구문으로) `waitFor` 유틸리티는 해당 Promise이 거부 될 때까지 콜백을 다시 호출하지 않습니다. 이를 통해 비동기 적으로 확인해야하는 waitFor를 가능게 합니다.



## waitForElementToBeRemoved

```js
// The options object is forwarded to `waitFor`.
function waitForElementToBeRemoved<T>(
  callback: (() => T) | T,
  options?: {
    container?: HTMLElement
    timeout?: number
    interval?: number
    onTimeout?: (error: Error) => Error
    mutationObserverOptions?: MutationObserverInit
  }
): Promise<void>
```

To wait for the removal of element(s) from the DOM you can use `waitForElementToBeRemoved`. The `waitForElementToBeRemoved` function is a small wrapper around the `waitFor` utility.

DOM에서 요소 제거를 기다리려면 `waitForElementToBeRemoved`를 사용할 수 있습니다. `waitForElementToBeRemoved` 함수는 `waitFor` 유틸리티를 둘러싼 작은 래퍼입니다.

```js
const el = document.querySelector('div.getOuttaHere')

waitForElementToBeRemoved(document.querySelector('div.getOuttaHere')).then(() =>
    console.log('Element no longer in DOM'),
)

el.setAttribute('data-neat', true)
// other mutations are ignored...

el.parentElement.removeChild(el)
// logs 'Element no longer in DOM'
```

`waitForElementToBeRemoved` will throw an error if the first argument is `null` or an empty array:

`waitForElementToBeRemoved`는 첫 번째 인수가 `null`이거나 빈 배열 인 경우 오류를 발생시킵니다.

```js
waitForElementToBeRemoved(null).catch(err => console.log(err))
waitForElementToBeRemoved(queryByText(/not here/i)).catch(err => console.log(err))
waitForElementToBeRemoved(queryAllByText(/not here/i)).catch(err => console.log(err))
waitForElementToBeRemoved(() => getByText(/not here/i)).catch(err => console.log(err))

// Error: The element(s) given to waitForElementToBeRemoved are already removed. waitForElementToBeRemoved requires that the element(s) exist(s) before waiting for removal.
```
