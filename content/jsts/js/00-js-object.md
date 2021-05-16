



## window & document

window 와 document 의 차이는 무엇인가 ?

window 와 document에 각각 이벤트를 전역으로 설정하고 중간 dom에서 e.stopPropagation()를 호출할 때 다른 점이 발생했다



- window
  - 브라우저를 시작할 때 가장 처음 생성되는 객체
  - 이 `창` 이라는 것을 생성하고 난 후에 이 안에 다른 창(window)나 문서(document)를 추가 가능
  - 