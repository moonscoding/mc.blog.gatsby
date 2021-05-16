---
title : nested
index : 4
---



## Nested

HTML은 `계층(hierarchy)`에 주목하지만 CSS는 그렇지 않습니다.

sass를 사용하면 HTML과 동일하게 CSS 선택기를 시각적 계층구조를 따르도록 `중첩(nested)`할 수 있습니다.

(단, 지나친 중첩은 유지관리가 어려울 수 있습니다.)



```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

