---
title : 'docker network'
---



- 컨테이너는 IP주소를 할당받아 **컨테이너 간 통신**하는 것이 가능해요.
- 컨테이너를 호스트 **외부 네트워크에 공개**하는 것 또한 가능해요.
- 같은 컨테이너에선 **컨테이너의 이름**으로 통신할 수도 있어요.

- (`--link` 는 deprecate 될 수있는 기능이기에, `docker network` 사용을 권장해요.)



​    Docker Network CLI 간략히 살펴보기

 ```bash
$ docker network ls # 컨테이너 네트워트를 리스트로 표시
$ docker network inspect # 네트워크명을 지정해서 자세한 내용을 표시
$ docker network create # 컨테이너 네트워크를 생성
$ docker network rm # 컨테이너 네트워크를 삭제
$ docker network connect # 컨테이너를 컨테이너 네트워크에 접속
$ docker network disconnect # 컨테이너를 컨테이너 네트워크에서 분리
 ```





## Port

컨테이너 포트를 호스트의 IP 주소로 공개하는 방법 (`-p {host_port}:{container_port}`)

```bash
$ docker run -d --name webserver -p 8080:80 nginx:latest
```





## Network 생성과 삭제

docker에서 네트워크란 어떤 개념일까요?

network를 생성할 때, 명시적으로 network를 지정하지 않으면, **외부와 연결된 DRIVER=bridge 네트워크**와 연결되요.

network는 별도의 IP 주소 범위가 지정되어 **다른 네트워크와 격리**되요.

```bash
$ docker network create apl-net
```





## Network 목록

```bash
$ docker network ls
```





## Network 연결

`docker run` 을 실행할 때 `--network` 옵션으로 네트워트를 선택할 수 있어요. (`--network {network_name}`)

```bash
$ docker run -d --name webserver --network my-network nginx:latest
```

