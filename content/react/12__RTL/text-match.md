---
index: 2
title: text-match
---

대부분의 쿼리 API는 `TextMatch`를 인수로 사용합니다. 



## TextMatch

`TextMatch`의 인수는 다음과 같습니다.

- `string`
- `regex`
- `function(true, false 반환)`



```html
<div>Hello World</div>
```



### TextMatch와 일치하는 경우

```js
// Matching a string:
screen.getByText('Hello World') // full string match
screen.getByText('llo Worl', { exact: false }) // substring match
screen.getByText('hello world', { exact: false }) // ignore case

// Matching a regex:
screen.getByText(/World/) // substring match
screen.getByText(/world/i) // substring match, ignore case
screen.getByText(/^hello world$/i) // full string match, ignore case
screen.getByText(/Hello W?oRlD/i) // substring match, ignore case, searches for "hello world" or "hello orld"

// Matching with a custom function:
screen.getByText((content, element) => content.startsWith('Hello'))
```



### TextMatch와 불일치하는 경우

```js
// full string does not match
screen.getByText('Goodbye World')

// case-sensitive regex with different case
screen.getByText(/hello world/)

// function looking for a span when it's actually a div:
screen.getByText((content, element) => {
    return element.tagName.toLowerCase() === 'span' && content.startsWith('Hello')
})
```





### Option

`TextMatch`  사용 쿼리는 문자열 일치의 Precision(정도)에 영향을주는 옵션을 포함 할 수 있습니다.



### exact

기본값은 `true`입니다. 대소문자를 구분하는 전체 문자열과 일치함을 뜻합니다.

`false`인 경우 부분 문자열과 일치하며 대소문자를 구분하지 않습니다.



### normalizer

normalization(정규화) 동작을 재정의하는 선택적 함수입니다.



Before running any matching logic against text in the DOM, `DOM Testing Library` automatically normalizes that text. By default, normalization consists of trimming whitespace from the start and end of text, and collapsing multiple adjacent whitespace characters into a single space.

DOM의 텍스트에 대해 일치하는 논리를 실행하기 전에 DOM 테스트 라이브러리는 해당 텍스트를 자동으로 정규화합니다. 기본적으로 정규화는 텍스트의 시작과 끝에서 공백을 자르고 인접한 여러 공백 문자를 단일 공백으로 축소하는 것으로 구성됩니다.



If you want to prevent that normalization, or provide alternative normalization (e.g. to remove Unicode control characters), you can provide a `normalizer` function in the options object. This function will be given a string and is expected to return a normalized version of that string.

해당 정규화를 방지하거나 대체 정규화를 제공하려는 경우 (예 : 유니 코드 제어 문자 제거), 옵션 객체에 `nomalizer` 기능을 제공 할 수 있습니다. 이 함수에는 문자열이 주어지며 해당 문자열의 정규화 된 버전을 반환 할 것으로 예상됩니다.



> Specifying a value for `normalizer` _replaces_ the built-in normalization, but you can call `getDefaultNormalizer` to obtain a built-in normalizer, either to adjust that normalization or to call it from your own normalizer.
>
> `normalizer`에 대한 값을 지정하면 기본 제공 정규화가 대체되지만 `getDefaultNormalizer`를 호출하여 해당 정규화를 조정하거나 자체 노멀 라이저에서 호출하여 기본 제공 노멀 라이저를 얻을 수 있습니다.



### getDefaultNormalizer

-   `trim` 
    -   기본값은 `true`이며, 선행 및 후행 공백을 제거합니다.
-   `collapseWhitespace` 
    -   기본값은 `true`이며, 내부 공백 (줄 바꿈, 탭, 반복되는 공백)을 단일 공백으로 축소합니다.



**정규화를 재정의하는 경우 A.**

```js
screen.getByText('text', {
    normalizer: getDefaultNormalizer({ trim: false }),
})
```



**정규화를 재정의하는 경우 B.**

기본 제공 정규화 동작의 일부를 유지하면서 일부 유니 코드 문자를 제거합니다.

```react
screen.getByText('text', {
    normalizer: str => getDefaultNormalizer({ trim: false })(str).replace(/[\u200E-\u200F]*/g, ''),
})
```

