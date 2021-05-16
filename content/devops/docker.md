---
title : docker
---



컨테이너 기반의 운영환경을 지원

-   크로스 플랫폼 환경에서 호환성 유지에 유리
-   도커 파일을 이용해서 현상 유지에 유리 ( 시간이 지나도 같은 서버 환경을 구축할 수 있음 )

## Config

### install & uninstall

install

```shell
$ curl -fsSL https://get.docker.com/ | sh
```

```bash
$ yum install docker -y
```

uninstall

```shell
$ yum list installed | grep docker
```

### info

```shell
$ docker info
```

### version

```shell
$ docker version
```

### start & stop

start

```shell
$ service docker start
```

stop

```shell
$ service docker stop
```

## Image

### docker search

```shell
$ docker search <image>
```

### docker pull

-   버전체크?

```shell

```

```shell
$ docker pull <image>:<tag>
```

### docker images

```shell
$ docker images
$ docker images | grep <image>
```

### docker image

docker image ls [option][reop]

-   `--all`, `-a`
    -   show all images
-   `--digests`
    -   show digests
-   `--filter`, `-f`
    -   filter output based on conditions provided
-   `--format`
    -   pretty-print images using a go template
-   `--no-trunc`
    -   don't truncate output
-   `--quiet`, `-q`
    -   only show numeric IDs

```shell
$ docker image ls --all \<image>
```

## Container

### docker run

-   `-it`
-   `-d`
-   `-p`
-   `--name`

```shell
$ sudo docker run -d --name <\name> -p \<os_port>:\<container_port> \<image>
```

### docker log

## Docker File

Docker Image 생성을 위한 명령어 집합 파일

### Tutorial Dockerfile

```dockerfile
# 이미지
FROM \<image>:\<tag>

# 관리자
MAINTAINER \<username> \<<useremail>>

# ARG - 호출방법 $\<parameter>
ARG \<paramemer>

# WORKDIR
WORKDIR \<path>

# ADD - 복사 ( host_path 현재위치 -> Dockerfile )
ADD \<host_path> \<container_path>

# COPY
COPY \<host_path> \<container_path>

# RUN - to container
RUN \<command>

# ENV
ENV NODE_ENV \<profile>

# PORT
EXPOSE \<host_port_A> \<host_port_B>

# CMD
CMD ["npm", "start"]
```

NodeJS Sample

```dockerfile
# 이미지
FROM node:6.2.2

# 관리자
MAINTAINER SuperMoon \<jm921106@gmail.com>

# /app 디렉토리 생성
RUN mkdir -p /app

# /app 디덱토리를 WORKDIR로 설정
WORKDIR /app

# /현재 Dockerfile에 있는 경로의 모든 파일을 /app에 복사
ADD . /app

# npm install 실행
RUN npm install

# 환경변수 설정
ENV NODE_ENV development

# 포트 설정
EXPOSE 3000 80

# 컨테이너 실행 명령
CMD ["npm", "start"]
```

### docker build

-   `-t`

```shell
$ docker build -t \<repo>/\<image>:\<tag> \<build_target_dir>
```

## Docker Network

https://bluese05.tistory.com/15

docker network setting 하는 방법 & docker network 의 원리

![image-20200206192335454](/assets/images/image-20200206192335454.png)

### Docker0 interface

docker0 - virtual interface

-   IP는 자동으로 172.17.42.1로 설정되고 16bit netmask(255.255.0.0)로 설정
-   IP는 DHCP를 통해 할당 받는것이 아니고 docker 내부 로직에 의해 자동 할당
-   docker0은 일반적인 interface가 아니며, virtual ethernet bridge

### Container Network 구조

container는 각자만의 격리된 network 공간 할당

-   (linux namespace라는 기술을 이용하여 구현된 가상화 기법을 사용하여 각자 독립된 network 공간 할당)

container가 생성되면 해당 container에는 `pair interface`라고 하는 한 쌍의 interface 들이 생성

-   pair interface의 한 쪽은 container 내부 namespace에 할당되고 eth0이라는 이름으로 할당
-   pair interface의 나머지 한 쪽은 vethXXXX라는 이름으로 docker0 bridge에 binding되는 형태

### Network Type

네트워크 목록보기

```
docker network ls
```

#### 1. bridge

(default)

Docker daemon 실행시에 먼저 docker0 이라는 bridge 생성

컨테이너 생성시에, 각 컨테이너 마다 고유한 network namespace 영역이 생성

이 때, docker0 bridge에 container의 인터페이스들이 하나씩 binding 되는 구조

bridge 타입 조사

```
docker network inspect bridge
```

#### 2. host

컨테이너가 독립적인 네트워크 영역을 갖지 않고

Host와 네트워크를 함께 사용

host 타입으로 컨테이너 생성

```
docker run --net=host httpd web01
```

host 타입 IP address 확인

```
docker exec web01 ip addr show
```

host 타입 조사

```
docker network inspect host
```

#### 3. container

기존에 존재하는 다른 컨테이너의 network 환경을 고유

container 타입으로 컨테이너 생성

```
docker run --name web03 --net=container:{container_id} -d httpd
```

#### 4. none

격리된 네트워크 영역을 갖고 인터페이스가 없는 상태로 컨테이너 생성

인터페이스가 없는 상태로 컨테이너 생성

```
docker run --name web04
```

####

### PortForwarding

기본적으로 컨테이너는 외부와 통신이 불가능한 상태

따라서 외부와 통신을 위해서는 포트포워딩 설정 필요 (-p 옵션 사용)

```
docker run -d -p 8080:80 --name web05 httpd
```

#### docker-proxy

> docker host로 들어온 요청을 container로 넘김

docker-proxy는 kernel이 아닌 userland에서 수행

kernel과 상관없이 host가 받은 패킷을 그대로 container의 port로 넘김

docker-proxy는 container의 port를 노출하도록 설정한 수 만큼 추가 프로세스가 생성

## Docker Compose

### install

https://docs.docker.com/compose/install/

(OSX) already install

### command

#### start & stop

```
docker-compose start
docker-compose stop
```

#### up & down

stop -> rm -> up 과정으로 진행 ( up 명령어만으로 컨테이너 재생성 및 재시작 )

```
docker-compose up
docker-compose up -d

docker-compose up -d \<SERVICE_NAME>
docker-compose up -d --force-recreate \<SERVICE_NAME>
docker-compose up -d --build \<SERVICE_NAME>

docker-compose down --volumn
docker-compose down --v
```

#### ps

```
docker-compose ps
```

#### exec

```
docker-compose exec django ./manage.py makemigrations
docker-compose exec node npm run test
```

#### log

이름을 적지 않으면 docker-compse가 가진 모든 서비스의 로그를 출력

-f → 지금까지 쌓인 로그를 다 보여준 후에 셀로 빠져나오지 않고 지속적으로 출력

```
docker-compose logs django
```

## Docker Swarn

> 참조
>
> -   [https://docs.docker.com/engine/reference](https://docs.docker.com/engine/reference/commandline/image_ls/)
> -   [https://programmingsummaries.tistory.com/](https://programmingsummaries.tistory.com/392?category=695325) -->
