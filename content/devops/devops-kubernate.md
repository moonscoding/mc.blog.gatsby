# kubernate

### 쿠버네티스

컨테이너를 여러 호스트에 쉽고 빠르게 ...

-   auto container scheduling
-   self-healing
-   horizontal scaling
-   service discovery and load banlancing
-   auto rollout & rollback
-   secret and configuration management

*   oserve

####  상태관리

쿠버네티스 시스템이 상태를 표현하는 구성 단위는 object

yaml 파일의 kind 속성 ..

#### Pod

컨테이너를 묶는 기본 작업 단위

스케줄링이 될 단일 컨테이너, 컨테이너 그룹

같은 컨테이너 ... ? 다른 컨테이너도 가능 ... ?

#### ReplicaSet

#### deployment

deployment -> replicaset -> pod -> container

#### Service

clusterIP, LoadBalance 두 가지 타입 존재

-   clusterIP 클러스터 내부에서만 사용하는 VIP 부여
-   LoadBalancer 외부에서 접근 가능한 External-IP, VIP 모두 부여

#### Ingress

트래픽분산 ...

### Helm

쿠버네티스 패키지 매니저

`차트`라 불리는 패키지를 생성하면 애플리케이션 실행에 필요한 리소스, 의존성, 구성 가능한 변수 지정

쿠버네티스 Yaml 매니페스트를 감싼 Wrapper

-   chart
-   repository
-   release
