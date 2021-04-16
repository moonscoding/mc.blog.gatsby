---
index: 0
title: text-match
---

대부분의 쿼리 API는 TextMatch를 인수로 사용합니다.

이는 인수가 문자열, 정규식 또는 일치에 대해 true를 반환하고

불일치에 대해 false를 반환하는 함수일 수 있음을 의미합니다.

```html
<div>Hello World</div>
```

**찾을 수 있는 경우**

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

**찾을 수 없는 경우**

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

## Precision

TextMatch를 사용하는 쿼리는 문자열 일치의 Precision에 영향을주는 옵션을 포함 할 수 있는 최종 인수로 객체 사용

### exact

Defaults to `true`; matches full strings, case-sensitive.

When false, matches substrings and is not case-sensitive.

기본값은 true입니다. 대소 문자를 구분하는 전체 문자열과 일치합니다.

false 인 경우 부분 문자열과 일치하며 대소 문자를 구분하지 않습니다.

### normalizer

An optional function which overrides normalization behavior.

정규화 동작을 재정의하는 선택적 함수입니다.

Before running any matching logic against text in the DOM, `DOM Testing Library` automatically normalizes that text. By default, normalization consists of trimming whitespace from the start and end of text, and collapsing multiple adjacent whitespace characters into a single space.

DOM의 텍스트에 대해 일치하는 논리를 실행하기 전에 DOM 테스트 라이브러리는 해당 텍스트를 자동으로 정규화합니다. 기본적으로 정규화는 텍스트의 시작과 끝에서 공백을 자르고 인접한 여러 공백 문자를 단일 공백으로 축소하는 것으로 구성됩니다.

If you want to prevent that normalization, or provide alternative normalization (e.g. to remove Unicode control characters), you can provide a `normalizer` function in the options object. This function will be given a string and is expected to return a normalized version of that string.

해당 정규화를 방지하거나 대체 정규화를 제공하려는 경우 (예 : 유니 코드 제어 문자 제거), 옵션 객체에 `nomalizer` 기능을 제공 할 수 있습니다. 이 함수에는 문자열이 주어지며 해당 문자열의 정규화 된 버전을 반환 할 것으로 예상됩니다.

> Specifying a value for `normalizer` _replaces_ the built-in normalization, but you can call `getDefaultNormalizer` to obtain a built-in normalizer, either to adjust that normalization or to call it from your own normalizer.

### getDefaultNormalizer

-   `trim`:
    -   Defaults to `true`. Trims leading and trailing whitespace
        기본은 `true`이며, 선행 및 후행 공백 제거
-   `collapseWhitespace`:
    -   Defaults to `true`. Collapses inner whitespace (newlines, tabs, repeated spaces) into a single space.
        기본은 `true`이며, 내부 공백 (줄 바꿈, 탭, 반복되는 공백)을 단일 공백으로 축소

```js
screen.getByText('text', {
    normalizer: getDefaultNormalizer({ trim: false }),
})

// To override normalization to remove some Unicode characters whilst keeping some (but not all) of the built-in normalization behavior :
// 기본 제공 정규화 동작의 일부 (전부는 아님)를 유지하면서 일부 유니 코드 문자를 제거하기 위해 정규화를 재정의하려면 :
screen.getByText('text', {
    normalizer: str => getDefaultNormalizer({ trim: false })(str).replace(/[\u200E-\u200F]*/g, ''),
})
```
