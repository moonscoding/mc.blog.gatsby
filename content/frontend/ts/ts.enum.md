# enum

enum은 가능하면 value(string)를 동반하여 사용할 것을 권장합니다.

value를 동반하지 않으면 0부터 시작하는 인덱스가 자동으로 할당되는데, 이는 개발자가 예측하지 못한 버그를 만들어 낼 수 있습니다.



## enum - Object.keys, Object.values, Object.entries

> "value를 동반하지 않으면 0부터 시작하는 인덱스가 자동으로 할당되는데, 이는 개발자가 예측하지 못한 버그를 만들어 낼 수 있습니다."
>
> 다음 언급한 내용은 이 챕터에서도 동일합니다. value가 0부터 시작하는 인덱스일 경우 어떻게 동작하는지 확인해보세요.



### Object.keys

- value가 number(인덱스)일 경우, 
  - key, value가 결과에 모두 포함
- value가 string일 경우,
  - key만 결과에 포함

```ts
// value가 number(인덱스)일 경우, 
enum EPhone {
	Apple, Samsung
}
const phoneKeys = Object.keys(EPhone) // ["0", "1", "Apple", "Samsung"] 

// value가 string일 경우,
enum EPhone {
	Apple = 'IPhone', Samsung = 'Galuxy'
}
const phoneKeys = Object.keys(EPhone) // ['Apple', 'Samsung']
```



#### get enum key 

string-enum에선 Object.keys를 사용하면 쉽게 배열을 얻을 수 있지만 index-enum에선 약간의 조치가 필요함 

```ts
// index-enum
enum EPhone {
	Apple, Samsung
}

const phoneKeys = Object.keys(EPhone) // ["0", "1", "Apple", "Samsung"] 
const keys = fruitKeys.filter(key => isNaN(Number(key))) // ["Apple", "Samsung"] 
console.log(keys[EFruit.Apple]) // 'Apple'

// string-enum
enum EPhone {
	Apple = 'IPhone', Samsung = 'Galuxy'
}
const phoneKeys = Object.keys(EPhone) // ['Apple', 'Samsung']
console.log(keys[EFruit.Apple]) // 'Apple'
```




### Object.values

- value가 number(인덱스)일 경우, 
  - key, value가 결과에 모두 포함
- value가 string일 경우,
  - value만 결과에 포함

```ts
// value가 number(인덱스)일 경우, 
enum EPhone {
	Apple, Samsung
}
const phoneKeys = Object.values(EPhone) // ['Apple', 'Samsung', 0, 1]

// value가 string일 경우,
enum EPhone {
	Apple = 'IPhone', Samsung = 'Galuxy'
}
const phoneKeys = Object.values(EPhone) // ['IPhone', 'Galuxy']
```



### Object.entries

- value가 number(인덱스)일 경우, 
  - 동작이 특이해요. 아래 결과 확인
- value가 string일 경우,
  - entry = [key, value]인 배열을 반환

```ts
// value가 number(인덱스)일 경우, 
enum EPhone {
	Apple, Samsung
}
const phoneKeys = Object.entries(EPhone) // [["0", "Apple"], ["1", "Samsung"], ["Apple", 0], ["Samsung", 1]] 

// value가 string일 경우,
enum EPhone {
	Apple = 'IPhone', Samsung = 'Galuxy'
}
const phoneKeys = Object.entries(EPhone) // [["Apple", "IPhone"], ["Samsung", "Galuxy"]] 
```




