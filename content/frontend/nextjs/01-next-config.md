

# onDemandEntries

Next.js는 서버가 개발시 메모리 구축 페이지를 처리하거나 유지하는 방법을 제어 할 수있는 몇 가지 옵션을 제공합니다.

```javascript
module.exports = {
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
}
```



