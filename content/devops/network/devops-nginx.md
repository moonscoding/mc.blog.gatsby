# nginx

동시접속 처리에 특화된 웹 서버 프로그램

Apache 보다 동작인 단순하며, 전달자 역할만 하기에 동시 접속에 특화





## conf

### **context**

6개의 context를 가지며, 

기본 상속 모델은 부모 블럭에서 자식 블럭으로 상속 받는 순

형제 블럭이나 부모 블럭으로 전달되느 경우 없음



- Global

- Http

- Server

- If

- Location

  - Nested Location
  - If in location
  - limit_except 

  

### **directive**

- Normal directive
  - 컨텐스트 당 한 개의 값 ( root, index ... )
- Array directive
  - 컨텍스트에서 여러 개의 값을 갖는 디렉티브 ( access_log, fastcgi_param ... )
- Action directive
  - 설정과 다른 액션을 수행하는 디렉티브 ( rewrite, fastcgi_pass ... )
- Try_files directive



#### Normal directive

- 정의하지 않을 경우 부모 블럭 것을 상속
- 자식 블럭에서 부모의 것과 동일한 디렉티브를 정의한 경우 부모의 것 오버라이드



ex) root



#### Array directive

- 정의하지 않을 경우 부모 블럭의 것을 상속
- 동일한 디렉티브를 여러 번 정의할 경우, 추가 가능
- 자식 블럭에서 부모의 것과 동일한 디렉티브를 정의한 경우 , 부모의 것을 오버라이드
- 여러 개를 정의했다면 자식 블럭에도 중복으로 정의



ex) access_log, fastcgi_param 



#### Action directive

- 부모의 것을 상속 않함
- 자식 블럭에서 재정의해도 각 컨텍스트에서 실행



ex) rewrite, try_files



**try_files** 

server 블럭에서 try_files를 정의하는 경우, nginx 에서 최하위 우선순위를 갖는 location 블럭 생성

따라서 매칭되는 location 블럭이 있다면 server 블럭내의 try_files는 실행되지 않음

```nginx
server {
    try_files $uri /index.php; # This never executes.
 
    location / {
        # Whatever here, or empty.
    }
 
    location ~ \.php$ {
        # If this location executes then try_files still does not execute.
        # Even if location / did not exist.
    }
}
```

# 