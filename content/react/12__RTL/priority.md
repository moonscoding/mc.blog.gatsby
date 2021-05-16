---
index: 3
title: priority
---



테스트는 사용자가 코드와 상호 작용하는 방식과 유사해야하며 다음 `우선순위`를 권장합니다.



## Principles

테스트가 `소프트웨어가 사용되는 방식과 비슷할수록` 더 많은 자신감을 얻을 수 있습니다.

1. 렌더링 구성요소와 관련된 경우, `인스턴스가 아닌 DOM에 접근`하여 처리되어야 합니다.
2. `사용자의 사용방식`으로 응용 프로그램 구성 요소를 테스트하는데 유용합니다.
   (We *are* making some trade-offs here because we're using a computer and often a simulated browser environment, but in general, utilities should encourage tests that use the components the way they're intended to be used)
3. `Utility & API` 구현은 간단하고 유연해야 합니다.





## Priority

테스트는 사용자가 코드(구성 요소, 페이지 등)와 상호작용하는 방식과 유사해야 하기 때문에 아래 우선순위를 따라야 합니다.



### 1. Queries Accessible to Everyone

시각 / 마우스 사용자와 보조 기술을 사용하는 사용자의 경험을 반영하는 쿼리



#### getByRole

[accessibility tree](https://developer.mozilla.org/en-US/docs/Glossary/AOM)에 노출 된 모든 요소를 쿼리하는 데 사용할 수 있습니다.

`name` 옵션을 사용하면 [accessible name](https://www.w3.org/TR/accname-1.1/)으로 반환 된 요소를 필터링 할 수 있습니다.



#### getByLabelText

form 필드에만 유용하지만 사용자가 이러한 요소를 찾는 가장 좋은 방법이므로 가장 선호하는 방법이어야합니다.



#### getByPlaceholderText

placeholder는 label을 대체하지 않습니다. 그러나 그것이 당신이 가진 전부라면, 대안보다 낫습니다.



#### getByText

form에는 유용하지 않지만 사용자가 대부분의 비대화 형 요소(예 : div 및 span)일 때 찾는 첫 번째 방법입니다.



#### getByDisplayValue

form 요소의 현재 값은 채워진 값이있는 페이지를 탐색 할 때 유용 할 수 있습니다.





### 2. Semantic Queries

HTML5 및 ARIA 호환 선택기. 

이러한 속성과 상호 작용하는 사용자 경험은  browsers and assistive technology에 따라 다릅니다.



#### getByAltText

요소가 alt 텍스트 (img, area, Input,..)를 지원하는 요소 인 경우이를 사용하여 해당 요소를 찾을 수 있습니다.



#### getByTitle

title 속성은 스크린 리더가 일관되게 읽지 않으며 시력이있는 사용자에게는 기본적으로 표시되지 않습니다.





### 3. Test IDs

#### getByTestId

제목 속성은 스크린 리더가 일관되게 읽지 않으며 시력이있는 사용자에게는 기본적으로 표시되지 않습니다.
