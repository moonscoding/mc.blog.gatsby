## REST

```
REST는 Client에서 Server에 데이터를 요청할 때 활용하는 인터페이스와 같습니다.

Server가 얼마나 REST에 가까운 API Design을 했느냐에 따라 Client 개발자는 예상가는 데이터 처리를 할 수 있습니다.

개발자들과 협업할 때 통일된 약속은 매우 중요합니다.

만약 통일된 약속이 없다면 명세서 확인으로 부족하여 어떤 데이터가 반환되는지 소스코드를 일일이 확인해야하는 불상사가 발생할 수도 있죠.

그리고 REST 설계방식은 배우기도 그리 어렵지 않습니다.

이런 이유로 예상가는 WEB API Design을 하기 위해 REST API를 강조하는 것이죠.

( 하지만 약속이 중요할 뿐 반드시 REST 설계형식을 따라야 한다는 것은 아닙니다. GraphQL과 같은 방식도 있죠. )
```

## HTTP Method

### GET

조회관련기능에 사용하며 QueryString도 조회조건에만 사용합니다.

### POST

생성관련기능에 사용

RequestBody에 생성할 데이터를 전달합니다.

### PATCH

수정관련기능에 사용 ( 수정할 필드만 전달 )

RequestBody에 수정할 데이터를 전달합니다.

### PUT

수정관련기능에 사용 ( 수정할 데이터의 모든 필드 전달 )

RequestBody에 수정할 데이터를 전달합니다.

### DELETE

삭제관련기능에 사용

## HTTP URL

REST API는 HTTP URL를 통해 Resource간의 계층 구조를 표현

만약 ParentResource 목록에서 내부 ChildResource 목록을 함께 조회하고자 하면 어떻게 해야할까

### Relation

> REST 개똥철학 Part1 - 데이터의 조회 범위는 어떻게 설정할 수 있을까 ?

-   [1] GET - /parent/:parentId/child
-   [2] GET - /child?parentId={parentId}

[1] GET - /parent/:parentId/child

주소가 상위부터 타고 내려오기 때문에 상위 데이터를 포함하여 반환

```json
{
    "parentName" : "John"
    "parentAge" : 61
    "child" : [
    	{
    		"childName" : "Tony"
    		"childAge" : 32
		},
		{
    		"childName" : "Suzan"
    		"childAge" : 28
		}
    ]
}
```

[2] GET - /child?parentId={parentId}

요청 Resource가 child임으로 상위 데이터 포함하지 않음

```json
[
	{
		"childName" : "Tony"
		"childAge" : 32
	},
	{
    	"childName" : "Suzan"
    	"childAge" : 28
	}
]
```

> REST 개똥철학 Part2 - 계층 구조에서 목록의 목록을 조회하고자 할때 어떻게 처리할 수 있을까?

-   [1] GET - /parent/:parentId/child

-   [2] GET - /parent/child

[1]번의 구조로는 parent 목록 데이터의 child 목록 데이터를 받아오는데 구조적 한계가 있습니다.

따라서 parent 목록 데이터의 child 목록 데이터를 받아오기 위해선 [2]번의 구조로 사용하는 것을 추천합니다.

### Customizing

> REST 개똥철학 Part3 - 일반화된 API 외에 커스터마이징된 API를 구현할 수 있을까 ?

-   발생할수 있는 경우
    -   조회과정에서 특정 검색조건 외에는 허용하고 싶지 않을 경우
    -   수정과정에서 특정 컬럼을 제외하고 수정을 허용하고 싶지 않은 경우
    -   생성을 목록으로 해야하는 경우, 생성과 수정을 동시에 해야하는 경우

path내 추가하는 것은 예상 가능한 계층 구조에 불리하지만,

Swagger 혹은 KakaoOpenAPI 예제를 살펴보면 커스터마이징된 기능을 나타내기 위해 HTTP URL 마지막에 목적을 표현

-   사용예제
    -   GET - /pet/`findByStatus`?status={status}
    -   POST - /user/`createWithArray`
    -   PATCH - /pet/:petId/`setActive`

즉, 일반적인 REST 규칙을 따르고 URL의 마지막에 부분에 자세한 행위 및 목적을 표현합니다.

### NonPathVariable

카카오 OpenAPI 처리방식에서 식별자를 PathVariable로 관리하지 않는 방식을 확인

-   GET - /parent/child?parentId={parentId}

PathVariable을 통한 식별자를 두지 않고 QueryString으로만 조회조건을 관리

-   [장점] 하나의 API로 모두 처리가 가능

-   [단점] 일반화된 REST 처리방식이 아님 & 단건처리와 목록처리의 경계가 명확하지 않음

## Request Parameter

-   [https://medium.com/@fullsour/](https://medium.com/@fullsour/when-should-you-use-path-variable-and-query-parameter-a346790e8a6d)

### path variable

Resource의 식별자를 통하여 조회할 경우 사용

### query string

The query component contains non-hierarchical data

-   filtering
-   sorting
-   field selection
-   paging
    -   [1] query 처리 방식
    -   [2] header link 처리 방식

### request body

## HTTP Status

### HATEOAS & Lazy

`Hypermedia As The Engine Application State`의 약자로 어플리케이션 상태를 전이할 수 있는 메커니즘

(Resource간에 강력한 의존성을 가진다는 단점이 있습니다)

> Lazy

Lazy란 Relation을 갖는 데이터 구조에서 연관 데이터를 Hypermedia로 가져올지 조회된 실제 데이터로 가져올지 설정하는 값입니다.

기본적인 Lazy 값은 true로 구성되어 있으며 Lazy 값을 false로 설정하면 모든 데이터를 한번에 가져옵니다.

## Count

[1] Content-Range

https://stackoverflow.com/questions/5393558/how-should-i-implement-a-count-verb-in-my-restful-web-service

[2] X-Total-Count

[3] Body

header에 처리하는 것이 구성에는 유리할 수 있으나 응답받는 입장에서는 번거로울 수 있음

## Pagenation

## Bulk

[https://apihandyman.io](https://apihandyman.io/api-design-tips-and-tricks-getting-creating-updating-or-deleting-multiple-resources-in-one-api-call/)

동시에 여러 REST API를 처리해야 하는 경우에도 단건 Resource 관리를 활용해서 데이터를 처리하는 것을 추천합니다.

## Rate Limiting

https://liquid-docs.readthedocs.io/en/latest/restapi.html#header-response

The API is provided to you to conduct normal business activities through your own interface(s). Any activity using Liquid API, that causes lossage or creates service degradation for other users, is constituted as abuse by Liquid. A few examples of API Abuse activities are stated below:

-   Sending a huge number of Check Availability commands for already registered domain names, repeatedly.
-   Adding a large number of Sub-Resellers and/or Customers who do not have any Orders.

Rate limiting in Liquid API is primarily considered on a per-reseller basis. Generally, you may make up to 100 API calls per 15 minutes. When you make more API calls than allowed, your reseller API Key will be temporary suspended, this suspension will not impact your reseller account.

> 참조
>
> -   [REST spring docs - https://docs.spring.io](https://docs.spring.io/spring-data/rest/docs/current/reference/html/#reference)
>
> -   [REST good presentation - https://www.slideshare.net/brotherjinho](https://www.slideshare.net/brotherjinho/restful-api-64494716)
> -   [REST rate limiting - https://liquid-docs.readthedocs.io](https://liquid-docs.readthedocs.io/en/latest/restapi.html#header-response)
> -   [REST kako open api - https://developers.kakao.com/](https://developers.kakao.com/)
> -   [REST multiple design - https://apihandyman.io](https://apihandyman.io/api-design-tips-and-tricks-getting-creating-updating-or-deleting-multiple-resources-in-one-api-call/)
