---
hide:true
index : 0
title : React Router DOM
---



# React

plugin : react-router-dom

react는 `SPA`이기 때문에 브라우저에서 지원하는 `뒤로가기` 기능을 제공받지 못한다.

즉 컴포넌트를 변경하여 화면이 수정되었다고 하더라도 `뒤로가기` 실행시 SPA 이전 페이지로 회귀합니다.

그래서 Router 기능을 이용하여 SPA 내에서 컴포넌트 변경을 히스토리에 남겨 `뒤로가기`를 사용할 수 있도록 지원합니다.

> Basic Routing : Link & Route

```react
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
```

> Nested Routing

```react
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
```

## API

https://reacttraining.com/react-router/web/api/Hooks

### BrowserRouter & HashRouter

-   BrowserRouter & HashRouter가 제공되며 두가지는 URL 저장 방식에 차이가 있음
    -   BrowserRouter는 URL 경로를 사용하며, 즉각적으로 서버에게 요청한다.
        특히 웹서버는 같은 페이지를 계속 제공해야 한다.
    -   HashRouter는 현재 위치를 저장한다.
        그래서 서버에 요청을 하지 않는다.

```react
import { BrowserRouter, Route, Link } from "react-router-dom";
```

#### Router

#### StaticRouter

#### BrowserRouter

이력을 관리하기 위해 HTML5의 history API(pushState, replaceState, prostate event)를 사용하는 라우터

(해쉬뱅 모드 사용 안함)

-   basename : string
-   getUserConfirmation : func
-   forceRefresh : bool
-   keyLength : number
-   children : node

#### HashRouter

URL의 해시부분(window.location.hash)을 사용하여 UI와 URL을 동기화하는 라우터

> **IMPORTANT NOTE:** Hash history does not support `location.key` or `location.state`. In previous versions we attempted to shim the behavior but there were edge-cases we couldn’t solve. Any code or plugin that needs this behavior won’t work. As this technique is only intended to support legacy browsers, we encourage you to configure your server to work with `<BrowserHistory>` instead.

-   basename : string
-   getUserConfirmation : func
-   hashType : string
    -   slash
    -   noslash
    -   hashbang
-   children : node

#### MemoryRouter

### Link

앱 내에서 다른 라우트로 이동할 때에는 일반 `<a href=''>` 형식을 사용하면 안됩니다. (새로고침)

새로고침을 리액트 라우터에 있는 `<Link>` 컴포넌트를 사용해야 합니다.

페dㅣ지를 새로 불러오는걸 막고, 원하는 라우트 화면으로 전환

-   to : string
-   to : object
-   to : function
-   replace : bool
-   innerRef : function
-   innerRef : RefObject

```react
<Link to="/hello/world">Hello, World!</Link>
```

#### NavLink

Link의 특별한 버전으로 렌더된 Element가 현재 URL과 일치할 때 스타일 혹은 클래스 속성을 추가할 수 있음

-   activeStyle
-   activeClassName

```react
const Menu = () => {
    const activeStyle = {
        color: 'green',
        fontSize: '2rem'
    };

    return (
        <div>
            <ul>
              <li>
                <NavLink exact to="/" activeStyle={activeStyle}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/about" activeStyle={activeStyle}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/about/foo" activeStyle={activeStyle}>
                  About Foo
                </NavLink>
              </li>
            </ul>
            <hr/>
        </div>
    );
};
```

### Route

-   `path` : string | string[]
-   `exact` : bool
    -   true - 정확히 path에 따른 경로로 반환
    -   false - path의 내용을 경로가 포함하고 있다면 반환
-   `strict` : bool
-   `history` :
    -   push, replace 를 통해 다른 경로로 이동하거나 앞 뒤 페이지로 전환 할 수 있음
-   `location` : object
    -   현재 경로에 대한 정보를 지니고 있고 URL 쿼리 정보도 가지고 있음
-   `match`
    -   이 객체에는 어떤 라우트에 매칭이 되었는지에 대한 정보가 이쏙 param 정보를 가지고 있음
-   `sensitive` : bool

```react
<Route path="/hello" component={Hello} />
```

#### match, history, location

별도 설정없이 Route는 기본 props로 `match, history, location`을 가짐

##### history

-   브라우저의 `window.history`와 유사
-   주소를 임의로 변경하거나 되돌아 갈 수 있도록
-   주소 변경시, SPA 특성을 지키기 위해 페이지 전체를 리로드하지 않음
-   location 포함

##### location

-   브라우저의 `window.location`과 유사
-   현재 페이지 정보를 지니고 있음
-   url의 query 정보를 `serach`라는 프로퍼티에 지니고 있음

##### match

-   Route의 path에 정의한 것과 매칭된 정보를 가지고 있음
-   params에 설정한 파라미터를 담고 있음

#### Route of Route

v4

Route 내부에 Route를 설정하는 방식이 달라짐

**before**

Foo 컴포넌트의 props.children의 자리에 Bar 컴포넌트가 들어가는 형식

```react
<Route path="foo" component={Foo}>
    <Route path=":id" component={Bar}/>
</Route>
```

**after**

Props.children을 사용하지 않고 라우트에서 보여주는 컴포넌트 내부에 또 Route를 사용

```react
const Post = ({match}) => {
    return (
        <div>
            포스트 {match.params.id}
        </div>
    );
};
```

```react
const Posts = ({match}) => {
    return (
        <div>
           <h2>Post List</h2>
           <ul>
                <li><Link to={`${match.url}/1`}>Post #1</Link></li>
                <li><Link to={`${match.url}/2`}>Post #2</Link></li>
                <li><Link to={`${match.url}/3`}>Post #3</Link></li>
                <li><Link to={`${match.url}/4`}>Post #4</Link></li>
           </ul>
           <Route exact path={match.url} render={()=>(<h3>Please select any post</h3>)}/>
           <Route path={`${match.url}/:id`} component={Post}/>
        </div>
    );
};
```

```react
class App extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <Route exact path="/" component={Home}/>
                <Switch>
                    <Route path="/about/:name" component={About}/>
                    <Route path="/about" component={About}/>
                </Switch>
                <Route path="/posts" component={Posts}/>
            </div>
        );
    }
}
```

### Switch

두 개 이상의 컴포넌트가 있을 때, Switch & Route를 사용합니다.

```react
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        {/* If the current URL is /about, this route is rendered
            while the rest are ignored */}
        <Route path="/about">
          <About />
        </Route>

        {/* Note how these two routes are ordered. The more specific
            path="/contact/:id" comes before path="/contact" so that
            route will render when viewing an individual contact */}
        <Route path="/contact/:id">
          <Contact />
        </Route>
        <Route path="/contact">
          <AllContacts />
        </Route>

        {/* If none of the previous routes render anything,
            this route acts as a fallback.

            Important: A route with path="/" will *always* match
            the URL because all URLs begin with a /. So that's
            why we put this one last of all */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
```

> [주의]
>
> `/contact` 를 `/contact/:id` 보다 위에 작성하면 id를 입력해도 후자는 나오지 않게 됩니다.

### Prompt

### Redirect

## URl Query

```shell
yarn add query-string
```

## CodeSpliting

https://velog.io/@velopert/react-code-splitting
