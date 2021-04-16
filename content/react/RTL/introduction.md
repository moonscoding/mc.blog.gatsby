---
index: 0
title: introduction
---

## React Testing Library

경량 라이브러리이며, DOM 위주의 테스트로 내부 로직 변경에 자유로우며 구성요소의 내부 세부 정보를 테스트 하지 않는 것을 권장하고 웹페이지가 사용자와 상호작용 하는 방식에 중점을 두고 테스트

-   If it relates to rendering components, then it should deal with DOM nodes rather than component instances, and it should not encourage dealing with component instances.
    **인스턴스가 아닌 DOM에 중점을 두고 테스트 하세요.**

-   It should be generally useful for testing the application components in the way the user would use it. We _are_ making some trade-offs here because we're using a computer and often a simulated browser environment, but in general, utilities should encourage tests that use the components the way they're intended to be used.
    **사용자가 응용 프로그램 구성 요소를 테스트하는 것에 착안하여 테스트 하세요.**

-   Utility implementations and APIs should be simple and flexible.

    **테스트 유틸리티는 간단하고 유연하게 만드세요.**
