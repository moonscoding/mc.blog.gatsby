---
index: 0
title: priority
---

테스트는 사용자가 코드(구성요소, 페이지, ..)와 최대한 상호작용하는 방식과 유사해야 하고 이를 염두하여 우선순위를 권장

## **Queries Accessible to Everyone** queries that reflect the experience of visual/mouse users as well as those that use assistive technology

모든 사람이 액세스 할 수있는 쿼리 시각 / 마우스 사용자의 경험과 보조 기술을 사용하는 쿼리를 반영하는 쿼리

### getByRole

[accessibility tree](https://developer.mozilla.org/en-US/docs/Glossary/AOM)에 노출 된 모든 요소를 쿼리하는 데 사용할 수 있습니다.

`name` 옵션을 사용하면 [accessible name](https://www.w3.org/TR/accname-1.1/)으로 반환 된 요소를 필터링 할 수 있습니다.

### getByLabelText

form 필드에만 유용하지만 사용자가 이러한 요소를 찾는 가장 좋은 방법이므로 가장 선호하는 방법이어야합니다.

### getByPlaceholderText

placeholder는 label을 대체하지 않습니다. 그러나 그것이 당신이 가진 전부라면, 대안보다 낫습니다.

### getByText

form에는 유용하지 않지만 사용자가 대부분의 비대화 형 요소(예 : div 및 span)일 때 찾는 첫 번째 방법입니다.

### getByDisplayValue

form 요소의 현재 값은 채워진 값이있는 페이지를 탐색 할 때 유용 할 수 있습니다.

## **Semantic Queries** HTML5 and ARIA compliant selectors. Note that the user experience of interacting with these attributes varies greatly across browsers and assistive technology.

시맨틱 쿼리 HTML5 및 ARIA 호환 선택기. 이러한 속성과 상호 작용하는 사용자 경험은 브라우저와 보조 기술에 따라 크게 다릅니다.

### getByAltText

요소가 alt 텍스트 (img, area, Input,..)를 지원하는 요소 인 경우이를 사용하여 해당 요소를 찾을 수 있습니다.

### getByTitle

title 속성은 스크린 리더가 일관되게 읽지 않으며 시력이있는 사용자에게는 기본적으로 표시되지 않습니다.

## Test IDs

### getByTestId

제목 속성은 스크린 리더가 일관되게 읽지 않으며 시력이있는 사용자에게는 기본적으로 표시되지 않습니다.
