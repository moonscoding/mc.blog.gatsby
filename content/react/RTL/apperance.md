---
index: 0
title: appearance
---

Sometimes you need to test that an element is present and then disappears or vice versa.

## Waiting for apperance

If you need to wait for an element to appear,

the [async wait utilities](https://testing-library.com/docs/dom-testing-library/api-async) allow you to wait for an assertion to be satisfied before proceeding.

The `wait` utilities retry until the query passes or times out.

_The async methods return a Promise, so you must always use `await` or `.then(done)` when calling them._

요소가 나타날 때까지 기다려야하는 경우

비동기 대기 유틸리티를 사용하면 진행하기 전에 어설 션이 충족 될 때까지 기다릴 수 있습니다.

`wait` 유틸리티는 쿼리가 통과하거나 시간이 초과 될 때까지 재시도합니다.

_비동기 메서드는 Promise를 반환하므로 호출 할 때 항상 `await` 또는 `.then (done)`을 사용해야합니다._

### Using `findBy` Queries

```js
test('movie title appears', async () => {
    // element is initially not present...
    // wait for appearance and return the element
    const movie = await findByText('the lion king')
})
```

### Using `waitFor`

```js
test('movie title appears', async () => {
    // element is initially not present...

    // wait for appearance inside an assertion
    await waitFor(() => {
        expect(getByText('the lion king')).toBeInTheDocument()
    })
})
```

## Waiting for disapperance

The `waitForElementToBeRemoved` [async helper](https://testing-library.com/docs/dom-testing-library/api-async) function uses a callback to query for the element on each DOM mutation and resolves to `true` when the element is removed.

`waitForElementToBeRemoved` async helper 함수는 콜백을 사용하여 각 DOM 변형의 요소를 쿼리하고 요소가 제거되면 true로 확인됩니다.

```js
test('movie title no longer present in DOM', async () => {
    // element is removed
    await waitForElementToBeRemoved(() => queryByText('the mummy'))
})
```

Using [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) is more efficient than polling the DOM at regular intervals with `waitFor`.

`MutationObserver`를 사용하는 것이 `waitFor`를 사용하여 일정한 간격으로 DOM을 폴링하는 것보다 더 효율적입니다.

The `waitFor` [async helper](https://testing-library.com/docs/dom-testing-library/api-async) function retries until the wrapped function stops throwing an error.

This can be used to assert that an element disappears from the page.

`waitFor` async helper 함수는 래핑 된 함수가 오류 발생을 멈출 때까지 재 시도합니다.

이것은 요소가 페이지에서 사라지는 것을 주장하는 데 사용할 수 있습니다.

```js
test('movie title goes away', async () => {
    // element is initially present...
    // note use of queryBy instead of getBy to return null
    // instead of throwing in the query itself
    await waitFor(() => {
        expect(queryByText('i, robot')).not.toBeInTheDocument()
    })
})
```
