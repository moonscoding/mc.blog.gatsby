# Promise



## Promise





## Promise 병렬

### Promise.All

### 모든 반복이 종료될 때 resolve 하기

```js
const arr = [1,2,3];
const promises = [];

for(let i=0; i<arr.length; i ++) {
  promises.push(new Promise((resolve, reject) => { resolve() })
}
                
Promise.all(promises).then((results : []) => {
    
})
```

https://stackoverflow.com/questions/31426740/how-to-return-many-promises-and-wait-for-them-all-before-doing-other-stuff



### Promise.race