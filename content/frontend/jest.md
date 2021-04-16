---
title : jest
---



![image-20210331023740269](jest.assets/image-20210331023740269.png)

`jest`는 무엇일까?  



## 특징

- javascript test library(framework)
- 호환이 우수하다. (typescript, react, vue, angular, node,  babel, ..)
- Mocking에 적합하다. (jest.mock, jest.Unmock, ..)
- 시간 단위의 테스트가 가능하다. 
- 스냅샷을 사용한다.



## config & install

### ES6

현재 jest는 ES5까지 자동 인식하고 ES6를 인식하기 위해 Babel을 사용해야 한다.

```powershell
yarn add --dev babel-jest @babel/core @babel-preset-env
```

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```



### jest.config.js



## API

- `describe` 테스트 단위를 묶는 가장 큰 단위, 스코프를 공유하고 가독성을 높인다.

- `test(=it)` 기본테스트를 하는 문법, 기능적 차이는 없음

- `expect` 테스트할 변수나 값을 넣는다.

- afterAll(fn, timeout)

- afterEach(fn, timeout)

- beforeAll(fn, timeout)

- beforeEach(fn, timeout)

- describe(name, fn)

- describe.each

- describe.only

- describe.only.each

- describe.skip

- describe.skip.each

- test

- test.concurrent

- test.concurrent.each

- test.concurrent.only.each

- test.concurrent.skip.each

- test.each(table)(name, fn, timeout)

- test.only(name, fn, timeout)

- test.only.each(table)(name, fn)

- test.skip(name, fn)

- test.skip.each(name, fn)

- test.todo(name)

- `toBe` 문자열검증

- `toEqual` 객체검증 (toBe 실패)

  ```js
  function getUser(id) {
    return { id, email: `user${id}@test.com` }
  }
   
  expect(getUser(1)).toEqual({
      id: 1,
      email: `user1@test.com`,
  })
  ```

- `toBeTruthy, toBeFalsy` true / false 
  (다만, 자바스크립트는 boolean이 true / false에 한정되지 않아 실제 자바스크립트의 조건문과 동일하게 동작)

  ```js
  expect(0).toBeFalsy()
  expect("hello").toBeTruthy()
  ```

- `toHaveLength` 배열의 길이

- `toContain` 특정 원소가 배열에 들어있는지 

  ```js
  const numbers = ['1', '2']
  expect(numbers).toContain('1')
  expect(numbers).toContain('1')
  expect(numbers).not.toContain('3')
  ```

- `toMatch` 정규식 기반 테스트

  ```js
  expect(getUser(1).email).toBe("user1@test.com")
  expect(getUser(2).email).toMatch(/.*test.com$/)
  ```

- `toThrow` 예외발생

  ```js
  function getUser(id) {
    if (id <= 0) throw new Error("Invalid ID")
    return {
      id,
      email: `user${id}@test.com`,
    }
  }
  expect(getUser(-1)).toThrow()
  expect(getUser(-1)).toThrow("Invalid ID")
  ```









## Mock