---
		title: rxjs
---

일정 시간동안 observable을 무시하고 그 후에 이벤트를 처리

debounce랑 차이점이 무어지 ... ?typora-root-url: ../../../moonscoding.github.io

# RxJS

http://sculove.github.io/slides/rxjs-lecture/#/

https://huns.me/development/2051

https://poiemaweb.com/angular-rxjs

ReactiveX - 데이터 플로우와 상태 변경을 전파한다는 생각에 근간을 둔 프로그래밍 패러다임

- 자극은 밖에서 안으로 흐른다.
- 자극이 있어야만 반응하는 수동성을 갖는다.

| 비동기(표준)                                              | RxJS                                         |
| --------------------------------------------------------- | -------------------------------------------- |
| - Callback<br>- Promise<br/>- Generator<br/>- Async/Await | - 비동기처리<br>- 데이터전파<br>- 데이터처리 |

```
`일관된 방식`으로 (Obserable)
`안전`하게 (Functional Programming)
`데이터 흐름`을 (Reactive)
`처리`하는 (Operator)
`라이브러리`입니다.
```

## Observer Pattern

기존 Observer Pattern의 문제점

- NewsPaper 구독이 중지된 경우, NewsScrapper와 NewsReader에게 어떻게 알려주지?

- NewsScrapper가 NewsPaper인 경우는 ? 무한루프 ?
- 구독 전에 다른 구독자에게 발송한 정보를 볼 수는 ?

![image-20200106163554213](01-rxjs-docs.assets/image-20200106163554213.png)

RxJS가 해결하려면 문제점을 개선한 방식

- next
- complete
- error

![image-20200106164951363](/_docs/rxjs/01-rxjs-docs.assets/image-20200106164951363.png)

## Functional Programming

> 함수형 프로그래밍은 자료처리를 `수학적 함수의 계산`으로 취급하고
>
> `상태 변경과 가변 데이터를 피하려`는 프로그래밍 패러다임

> 함수에 드러나지 않은 입력값 또는 결과을 부원인(Side Cause)라고 하고
>
> 이로 인해 발생한 결과를 부작용(Side Effect)라고 한다.

`High Order Function (고차함수)`

다른 함수를 인자로 받거나 그 결과로 함수를 반환하는 함수( filter, forEach, map, reduce, ... )

## Observable

### Pull vs Push

**What is Pull?** In Pull systems, the Consumer determines when it receives data from the data Producer.

**What is Push?** In Push systems, the Producer determines when to send data to the Consumer.

리엑티브 프로그래밍은 Push 방식으로 외부 환경이 애플리케이션에 데이터를 밀어넣는 방식을 사용

데이터를 가져오기 위해 구독해야함

### Observable & Observer

Observables are lazy Push collections of multiple values.

They fill the missing spot in the following table

외부 환경에서 애플리케이션 내부로 연속적으로 흐르는 데이터, 즉 데이터 스트림을 생성하고 방출하는 객체를 `Observable`,

Observable이 방출한 Notification을 획득하여 사용하는 객체를 Observer라 합니다.

<img src="/_docs/rxjs/01-rxjs-docs.assets/image-20200107134447243.png" alt="image-20200107134447243" style="zoom:70%;" />

- Observable lifecycle

```
생성
Observable.create();

구독
Observable.subscribe();

실행
Observer.next();

구독해제
Observer.complete();
Observable.unsubscribe();
```

- example

```javascript
import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
});
console.log('just after subscribe');
```

- result

```
just before subscribe
got value 1
got value 2
got value 3
just after subscribe
got value 4
done
```

### Cold vs Hot

#### Cold Observable

Observable이 구독되기 전까지 동작하지 않음 (default)

구독하면 처음으로 동작하기 시작, 따라서 Observer는 Observable의 방출 데이터를 모두 받을 수 있음

#### Hot Observable

한번 만 만들며, Observer들과 공유 -> Subject

## Operators

Observable Composition (생성, 연결, 분리, 합침 .. 등등)

Immutable Obserable 인스턴스 반환

RxJS에서 어휘같은 존재

### debounce

### audit vs throttle

```

        throttle         ^------------
        audit            ------------^

```

**audit**

일정 시간동안 observable을 무시하고 그 후에 이벤트를 처리

debounce랑 차이점이 무어지 ... ? debounce는 이벤트 호출에 따라 timer가 계속 지연됩니다.

**throttle**

소스 Observable의 값을 반환 한 다음 다른 Observable이 결정한 기간 동안 후속 소스 값을 무시한 다음이 프로세스를 반복합니다.

#### auditTime

```typescript
import { fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';

// Create observable that emits click events
const source = fromEvent(document, 'click');
// Emit clicks at a rate of at most one click per second
const example = source.pipe(auditTime(1000));
// Output (example): '(1s) --- Clicked --- (1s) --- Clicked'
const subscribe = example.subscribe(val => console.log('Clicked'));
```

#### throttleTime

### delayWhen

다른 Observable의 배출에 의해 결정된 주어진 시간 간격으로 소스 Observable로부터의 배출을 지연시킵니다.

## Subscription

**What is a Subscription?** A Subscription is an object that represents a disposable resource, usually the execution of an Observable. A Subscription has one important method, `unsubscribe`, that takes no argument and just disposes the resource held by the subscription. In previous versions of RxJS, Subscription was called "Disposable".

```javascript
import { interval } from 'rxjs';

const observable = interval(1000);
const subscription = observable.subscribe(x => console.log(x));
subscription.unsubscribe();
```

> subscription 포함관계

```javascript
import { interval } from 'rxjs';

const observable1 = interval(400);
const observable2 = interval(300);

const subscription = observable1.subscribe(x => console.log('first: ' + x));
const childSubscription = observable2.subscribe(x => console.log('second: ' + x));

subscription.add(childSubscription);

setTimeout(() => {
  // Unsubscribes BOTH subscription and childSubscription
  subscription.unsubscribe();
}, 1000);
```

```
second: 0
first: 0
second: 1
first: 1
second: 2
```

## Subjects

https://rxjs-dev.firebaseapp.com/guide/subject

https://www.learnrxjs.io/learn-rxjs/subjects

**concept**

**What is a Subject?** An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.

- 읽기 쓰기가 가능한 Observable (Observer + Observerable)
- 기능면에서 Observer Pattern과 동일

**Type**

- Subject
  - No initial value or replay behavior.
- AsyncSubject
  - 완료시 관찰자에게 최신 가치를 제공합니다.
- BehaviorSubject
  - 초기 값이 필요하고 현재 값 (마지막으로 방출 된 항목)을 새 가입자에게 내 보냅니다.
- ReplaySubject
  - 새 구독자에게 지정된 수의 마지막으로 방출 된 값 (재생)을 내 보냅니다.

**API**

- observers
- add
- remove
- notify
- subscribe
- unsubscribe

**example**

```javascript
/*
                   s1    n(r)   n(x)    s2     n(j)   c    n(s)
Subject            
        s1         ^-----r------x--------------j------|----------
        s2         ---------------------^------j------|----------
AsyncSubject       
        s1         ^----------------------------------j|---------
        s2         ---------------------^-------------j|---------
BehaviorSubject    
        s1         ^a----r------x--------------j------|----------
        s2         ---------------------^x-----j------|----------
ReplaySubject      
        s1         ^-----r------x--------------j------|----------
        s2         ---------------------^r-x---j------|----------
*/

// RxJS v6+
import { Subject, AsyncSubject, BehaviorSubject, ReplaySubject } from 'rxjs';

const subject = new Subject();
const asyncSubject = new AsyncSubject();
const behaviorSubject = new BehaviorSubject('a');
const replaySubject = new ReplaySubject(2);

const subjects = [subject, asyncSubject, behaviorSubject, replaySubject];
const log = subjectType => e => console.log(`${subjectType}: ${e}`);

console.log('SUBSCRIBE 1');
subject.subscribe(log('s1 subject'));
asyncSubject.subscribe(log('s1 asyncSubject'));
behaviorSubject.subscribe(log('s1 behaviorSubject'));
replaySubject.subscribe(log('s1 replaySubject'));

console.log('\nNEXT(r)');
subjects.forEach(o => o.next('r'));

console.log('\nNEXT(x)');
subjects.forEach(o => o.next('x'));

console.log('\nSUBSCRIBE 2');
subject.subscribe(log('s2 subject'));
asyncSubject.subscribe(log('s2 asyncSubject'));
behaviorSubject.subscribe(log('s2 behaviorSubject'));
replaySubject.subscribe(log('s2 replaySubject'));

console.log('\nNEXT(j)');
subjects.forEach(o => o.next('j'));

console.log('\nCOMPLETE');
subjects.forEach(o => o.complete());

console.log('\nNEXT(s)');
subjects.forEach(o => o.next('s'));

/*
OUTPUT:

SUBSCRIBE 1
s1 behaviorSubject: a

NEXT(r)
s1 subject: r
s1 behaviorSubject: r
s1 replaySubject: r

NEXT(x)
s1 subject: x
s1 behaviorSubject: x
s1 replaySubject: x

SUBSCRIBE 2
s2 behaviorSubject: x
s2 replaySubject: r
s2 replaySubject: x

NEXT(j)
s1 subject: j
s2 subject: j
s1 behaviorSubject: j
s2 behaviorSubject: j
s1 replaySubject: j
s2 replaySubject: j

COMPLETE
s1 asyncSubject: j
s2 asyncSubject: j

NEXT(s)
*/
```

## Scheduler

Observable이 전달하는 데이터의 시점, Observer가 데이터를 전달받는 시점을 조절하는 일을 담당

RxJS에서 효과적으로 처리하기 위해 만든 `가상 스케줄러`

- type
  - AyncScheduler
  - AsapScheduler
  - QueueScheduler

## Testing

## Filtering

### auditTime

When you are interested in ignoring a source observable for a given amout of time, you can use `auditTime`. A possible use case is to only emit certain events (i.e. mouse clicks) at a maximum rate per second. After the specified duration has passed, the timer is disabled and the most recent source value is emitted on the output Observable, and this process repeats for the next source value.

```
auditTime(duration: number, scheduler?: Scheduler): Observable
```

```javascript
import { fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';

// Create observable that emits click events
const source = fromEvent(document, 'click');

// Emit clicks at a rate of at most one click per second
const example = source.pipe(auditTime(1000));

// Output (example): '(1s) --- Clicked --- (1s) --- Clicked'
const subscribe = example.subscribe(val => console.log('Clicked'));
```

## keyup & ajax

- debounce : 마지막 요청만 한번
  - 특수키적용안되어있음
    - filter
    - distinctUntilChanged
- throttle : 설정 시간내 딱 한번

>

```javascript
const { fromEvent, from } = rxjs;
const { map, mergeAll, debounceTime, filter, distinctUntilChanged } = rxjs.operators;
const { ajax } = rxjs.ajax;

// observable ( <- event, emit )
const keyup$ = fromEvent(document.getElementById("search", "keyup")
  .pipe(
    debounceTime(300),
	  map(event => event.target.value),
    distinctUntilChange(),
    filter(query => query.trim().length > 0),
    map(query => ajax.getJson('http://api.github.com/search/users?q=${query}')),
    mergeAll()
  );
)

// observer ( <- subscribe )
keyup$.subscribe(value => {
  console.log(value);
});
```

> reset

```javascript
const { fromEvent, from } = rxjs;
const { map, mergeMap, debounceTime, filter, distinctUntilChanged } = rxjs.operators;
const { ajax } = rxjs.ajax;

const keyup$ = fromEvent(document.getElementById('search', 'keyup')).pipe(
  debounceTime(300),
  map(event => event.target.value),
  distinctUntilChange()
);

const users$ = keyup$.pipe(
  filter(query => query.trim().length > 0),
  tap(query => showLoading()),
  mergeMap(query => ajax.getJson('http://api.github.com/search/users?q=${query}')),
  tap(query => hideLoading())
);

users$.subscribe(value => {
  console.log(value);
});

const reset$ = keyup$.pipe(filter(query => query.trim().length <= 0));

reset$.subscribe(value => {
  hideLoading();
  $layer.innerHTML = '';
});
```

> weak network

- switchMap
  - 옵저버블을 받아 새로운 옵저버블을 생성

```javascript
const users$ = keyup$.pipe(
  filter(query => query.trim().length > 0),
  tap(query => showLoading()),
  switchMap(query => ajax.getJson('http://api.github.com/search/users?q=${query}')),
  tap(query => hideLoading())
);
```

> server error

- catchError

```javascript
const users$ = keyup$.pipe(
  filter(query => query.trim().length > 0),
  tap(query => showLoading()),
  switchMap(query => ajax.getJson('http://api.github.com/search/users?q=${query}')),
  catchError((e, org) => org),
  tap(query => hideLoading())
);
```

- retry

시간 조금 걸림 -> 크롬에서 제어

```javascript
const users$ = keyup$.pipe(
  filter(query => query.trim().length > 0),
  tap(query => showLoading()),
  switchMap(query => ajax.getJson('http://api.github.com/search/users?q=${query}')),
  retry(1),
  tap(query => hideLoading())
);
```

- finalize

```javascript
const users$ = keyup$.pipe(
  filter(query => query.trim().length > 0),
  tap(query => showLoading()),
  switchMap(query => ajax.getJson('http://api.github.com/search/users?q=${query}')),
  tap(query => hideLoading()),
  finalize(hideLoading)
);
```
