# Typora + Gatsby

Kick off your project with this starter to create a powerful/flexible docs/tutorial web apps.

![gatsby-gitbook-starter](https://graphql-engine-cdn.hasura.io/learn-hasura/gatsby-gitbook-starter/assets/documentation_app_blog.png)

## 개념정리 Part

개념정리 Part는 여러 글중 사실에 기반한 개념을 정리할 때 사용하는 파트입니다. 여러 개념을 하이퍼링크를 통해 참조하도록 구성할 예정입니다.



### 분류기준

글을 분류하는 타입을 나누고 싶으나 글을 쓰다가 보면 어떤 변덕이 일어날지 알 수 없으니 

분류 A, B, C로 임의로 타입을 나누겠습니다.

- A타입(대분류) : 가장 큰 범주의 분류, 글의 기술적 범주 (eg. FE, BE, DB, DevOps)

- B타입(중분류) : 글이 포함되는 책의 제목 (eg. html, css, js)
- C타입 (소분류) : 글의 가장 작은 소주제 (eg. html-input, js-enum)

B타입 중분류는 내용을 분리하여 검색에 용이하게 처리합니다. 

C타입 소분류는 글을 최대한 작게 관리해야 모듈화에 편리합니다.



### 🔖 문서템플릿

글을 통일하는 문서 템플릿

유지보수 측면에서 어떻게 일괄수정이 가능하게 관리할 것인가 ?



####  Infomation



#### TOC (Table Of Content)



### 🗂 이미지관리 

이미지 관리를 어떻게 할 것인가 ?

Typora에서 지원하는 이미지관리방식을 웹서버(/static)에서 접근할 수 있도록 파싱하는 과정 추가



ex. 

`git-01-init.md` 라는 파일이 있고 해당 파일에서 이미지를 추가하면 

Typora의 `이미지 > 전역 이미지 설정 > ./${filename}.assets 경로로 이미지 복사`  속성에 따라

결과적으로 마크다운과 같은 레벨에 다음과 같은 폴더에 이미지가 추가됨 `./git-01-init.assets/image-${unique-key}.png`



build.

- 마크다운이 있는 폴더를 탐색하며 `postfix가 .assets인 폴더를 검색`하고 자원을 `/static` 으로 이동 (폴더와 같이)

- 마크다운 내용중에 이미지가 있다면 src 경로에 `/static/` 을 추가한다. (이미지는 아래 두 가지 타입이 있음)

  - ```SAS
    ![${unikey-key}](${src})
    ```

  - ```
    <img src="${src}" />
    ```





### 🔗 하이퍼링크

하이퍼링크를 어떻게 사용해야 잘 사용했다 소문이 날지 고민해 봅시다. 

우선 개념정리 파트는 아래와 같은 경로 규칙을 가지고 있습니다.

`/개념정리/대분류/중분류/소분류#태그`



###  🅼 마크다운

마크다운을 내 입맛에 맞게 커스터마이징 할 수 있을까 ?





























## Motivation

We wanted to create a [GraphQL tutorial](https://learn.hasura.io) series. The content would be written by developers for various languages/frameworks and what better than writing it in Markdown! And since this is a tutorial series we also needed rich embeds, syntax highlighting and more customisations.

We also wanted to serve these tutorials in sub paths of [learn.hasura.io](https://learn.hasura.io). To serve all these requirements, we decided to use Gatsby + MDX (Markdown + JSX) to extend markdown and used a neat consistent theme like the one at [GitBook](https://www.gitbook.com) and deployed as docker containers.

## 🔥 Features
- Write using Markdown / [MDX](https://github.com/mdx-js/mdx)
- GitBook style theme
- Syntax Highlighting using Prism [`Bonus`: Code diff highlighting]
- Search Integration with Algolia
- Progressive Web App, Works Offline
- Google Analytics Integration
- Automatically generated sidebar navigation, table of contents, previous/next
- Dark Mode toggle
- Edit on Github
- Fully customisable
- Rich embeds and live code editor using MDX
- Easy deployment: Deploy on Netlify / Now.sh / Docker

## 🔗 Live Demo

Here's a [live demo](https://learn.hasura.io/graphql/react)

## 🚀 Quickstart

Get started by running the following commands:

```
$ git clone git@github.com:hasura/gatsby-gitbook-starter.git
$ npm install
$ npm start
```

Visit `http://localhost:8000/` to view the app.

## 🔧 Configure

Write markdown files in `content` folder.

Open `config.js` for templating variables. Broadly configuration is available for `gatsby`, `header`, `sidebar` and `siteMetadata`.

- `gatsby` config for global configuration like 
    - `pathPrefix` - Gatsby Path Prefix
    - `siteUrl` - Gatsby Site URL
    - `gaTrackingId` - Google Analytics Tracking ID

- `header` config for site header configuration like
    - `title` - The title that appears on the top left
    - `githubUrl` - The Github URL for the docs website
    - `helpUrl` - Help URL for pointing to resources
    - `tweetText` - Tweet text
    - `links` - Links on the top right
    - `search` - Enable search and [configure Algolia](https://www.gatsbyjs.org/docs/adding-search-with-algolia/)

- `sidebar` config for navigation links configuration
    - `forcedNavOrder` for left sidebar navigation order. It should be in the format "/<filename>"
    - `frontLine` - whether to show a front line at the beginning of a nested menu.(Collapsing capability would be turned of if this option is set to true)
    - `links` - Links on the bottom left of the sidebar
    - `ignoreIndex` - Set this to true if the index.md file shouldn't appear on the left sidebar navigation. Typically this can be used for landing pages.

- `siteMetadata` config for website related configuration
    - `title` - Title of the website
    - `description` - Description of the website
    - `ogImage` - Social Media share og:image tag
    - `docsLocation` - The Github URL for Edit on Github

- For sub nesting in left sidebar, create a folder with the same name as the top level `.md` filename and the sub navigation is auto-generated. The sub navigation is alphabetically ordered.

### Algolia Configuration

To setup Algolia, go to `config.js` and update the `search` object to look like the one below:

```...,
	"search": {
		"enabled": true,
		"indexName": "MY_INDEX_NAME",
		"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
		"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
		"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
	},
```

Values for Algolia App ID, Search Key, and Admin Key can be obtained from Algolia Dashboard with the right set of permissions. Replace `MY_INDEX_NAME` with the Algolia Index name of your choice. To build the Algolia index, you need to run `npm run build` which will do a gatsby build along with content indexing in Algolia.

### Progressive Web App, Offline

To enable PWA, go to `config.js` and update the `pwa` object to look like the one below:

```
   "pwa": {
        "enabled": false, // disabling this will also remove the existing service worker.
        "manifest": {
            "name": "Gatsby Gitbook Starter",
            "short_name": "GitbookStarter",
            "start_url": "/",
            "background_color": "#6b37bf",
            "theme_color": "#6b37bf",
            "display": "standalone",
            "crossOrigin": "use-credentials",
            icons: [
                {
                    src: "src/pwa-512.png",
                    sizes: `512x512`,
                    type: `image/png`,
                },
            ],
        },
    }
```

## Live Code Editor

To render react components for live editing, add the `react-live=true` to the code section. For example:

```javascript react-live=true
<button>Edit my text</button>
```

In the above code, just add `javascript react-live=true` after the triple quote ``` to start rendering react components that can be edited by users.

## 🤖 SEO friendly

> This is a static site and comes with all the SEO benefits. Configure meta tags like title and description for each markdown file using MDX Frontmatter
>
> 이것은 정적 사이트이며 모든 SEO 이점이 함께 제공됩니다. MDX Frontmatter를 사용하여 각 마크 다운 파일에 대한 제목 및 설명과 같은 메타 태그 구성

```markdown
---
title: "Title of the page"
metaTitle: "Meta Title Tag for this page"
metaDescription: "Meta Description Tag for this page"
hide: false
collapsed: true
---
```

Canonical URLs are generated automatically.

## ☁️ Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/hasura/gatsby-gitbook-starter)

