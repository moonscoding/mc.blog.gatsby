# position & display



# position

포시션이란 이름처럼 태그들의 위치를 결정하는 CSS



## static

모든 태크는 처음에 position : static (default) 입니다

차례대로 왼쪽에서 오른쪽, 위에서 아래로 쌓입니다.



## relative

태그의 위치를 살짝 변경하 고 싶을 때 position : relative 를 사용합니다.

top, bottom, right, left를 통해 위치 조절이 가능합니다.



## absolute

relative가 static인 상태를 기준으로 주어진 픽셀만큼 움직였다면

absolute는 position : static 속성을 가지고 있지 않은 부모를 기준으로 움직임

만약 부모중에 position : relative, absolute, fixed 인 태그가 없다면 가장 상위 body가 기준

## fixed

항상 특정 위치에 고정되도록 처리하는 방식



# Container

- display - flex container 정의
- flex-flow 
  - flex-direction - flex items의 주 축(main-axis) 설정
  - flex-wrap - flex items의 여러 줄 묶음(줄바꿈) 설정
- justify-content - 주 축(main-axis) 정렬 방법을 설정
- align-content - 교차 축(cross-axis) 정렬 방법을 설정
- align-items - 교차 축(cross-axis)에서 items의 정렬 방법을 설정 



## display

`display : flex`,`display : inline-flex`



- flex - Block 특성의 Flex Container 정의 (수직쌓임)
- Inline-flex - Inline 특성의 Flex Container 정의 (수평쌓임)



> 여기서 말하는 수직과 수평 쌓임은 Items가 아니라 Container라는 것에 주의합시다.
> 두 값의 차이는 내부에 Items에는 영향을 주지 않습니다.



## flex-flow

단축 속성으로 flex items의 주 축(main axis) 설정

items의 여러 줄 묶음(줄 바꿈) 설정



- flex-flow
  - flex-direction : items의 주 축(main-axis) 설정 - row
  - flex-wrap  : items의 여러 줄 묶음(줄 바꿈) 설정 - nowrap



- flex-direction
   - row
   - row-reverse
   - column
   - column-reverse



- flex-wrap
  - nowrap : 모든 items를 여러 줄로 묶지 안음 (한 줄에 표시)
  - wrap : items 여러 줄로 묶음
  - wrap-reverse : items wrap의 역방향으로 여러 줄 묶음



## justify-content

주 축(main-axis)의 정렬 방법을 설정

- flex-start : items 시작점으로 정렬
- flex-end : items 끝점으로 정렬
- center : items 가운데 정렬
- space-between : 시작 item은 시작점에 마지막 item은 끝점에 정렬, 나머지 item은 사이에 고르게 정렬
- space-around : items 균등한 여백을 표함하여 정렬



## align-content

교차 축(cross-axis) 정렬 방법

`flex-wrap : wrap, flex-wrap : wrap-reverse (여러줄 속성들)` 에서만 사용 가능

- stretch
- flex-start
- flex-end
- center
- space-between
- space-abround



## align-items

교차 축(cross-axis)에서 Items의 정렬 방법

- stretch
- flex-start
- flex-end
- center
- baseline



> Items가 한 줄일 경우 `align-items` 속성을 사용하세요.





# Items

- order
- flex
  - flex-grow
  - flex-shrink
  - flex-basis
- align-self



## order

정렬순서 (number)

## flex

Item 너비(증가, 감소, 기본)

- flex-grow : item 증가 너비 비율 설정 - 0
- flex-shrink : item 감소 너비 비율 설정 - 1
- flex-basis : item (공간 배분 전) 기본 너비 설정 - auto



### flex-grow

증가너비



### flew-shrink

감소너비

감소너비는 요소의 너비(width, height, flex-basis)등에 영향을 받음

container의 너비가 줄어 items의 너비에 영향을 미치면,  영향을 미치기 시작한 지점부터 즐어든 거리 만큼 감소 너비 비율에 맞게 items 너비가 줄어든다.



### flex-basis

item의 (공간 배분 전) 기본 너비

