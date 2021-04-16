---
index: 0
title: fireEvent
---

## fireEvent

### fireEvent(node: HTMLElement, event: Event)

```js
// <button>Submit</button>
fireEvent(
    getByText(container, 'Submit'),
    new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
    }),
)
```

### fireEvent\[eventName](node: HTMLElement, eventProperties: Object)

Convenience methods for firing DOM events.

Check out [src/event-map.js](https://github.com/testing-library/dom-testing-library/blob/master/src/event-map.js) for a full list as well as default `eventProperties`.

```js
// <button>Submit</button>
const rightClick = { button: 2 }
fireEvent.click(getByText('Submit'), rightClick)
// default `button` property for click events is set to `0` which is a left click.
```

## createEvent

Convenience methods for creating DOM events that can then be fired by `fireEvent`, allowing you to have a reference to the event created: this might be useful if you need to access event properties that cannot be initiated programmatically (such as `timeStamp`).

```js
const myEvent = createEvent.click(node, { button: 2 })
fireEvent(node, myEvent)
// myEvent.timeStamp can be accessed just like any other properties from myEvent
```
