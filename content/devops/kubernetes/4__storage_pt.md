## 스토리지



### pvc

vagrant-minikube



pvc 알아보기 

```shell
$ cd /step11/minikube-pvc
$ kubectl apply -f pvc.yml

$ kubeget get pvc,pv

# 용량이 미니쿠배 용량으로 설정됨
# kubeget get sc
$ kubeget get storageclass 
```



pvc 사용하기  

hostpath - node내에 디스크, pod와 함께 사라지지 않음

```shell
$ kubectl apply -f pod.yml

# 
$ kubectl get pvc,pv,po

$ kubectl exec -it pod1 --sh

# /mnt 
# df -h 
```



### NFS 

vagrant-minikube

vagrant-nfs



nfs 확인

```shell
$ vagrant status
```



NFS 연결

```shell
$ vagrant ssh

# nfs
$ ping 172.16.20.10
```



NFS 사용하여 파드올리기

```shell
# pv 스팩
$ kubectl apply -f nfs-pv.yml

# pvc 스팩 - storageclass 없음, nfs-1 pv 이름연결
$ kubectl apply -f nfs-pvc.yml

$ kubectl get pvc,pv

$ kubectl apply -f nfs-client.yml

$ kubectl get po
```



파일을 만들고 해시를 비교해서 같은지

파일 공유되는지 검증

```shell
$ kubectl exec -it nfs-a bash

# df -h  # mount 경로 확인

# ls -lR > /mnt/talktalkforever.dat

# md5sum /mnt/talktalkforever.dat

$ kubectl exec -it nfs-b bash

# df -h

# md5sum /mnt/talktalkforever.dat
```





### SDS (GlusterFS)

vagrant-kubernetes (넘어가요)

vagrant-glusterfs



glusterfs 확인

```shell
$ vagrant status
```



연결확인

```shell
$ vagrant ssh master

$ ping 172.20.1.20
```



glusterfs 스토리지

```shell
$ kubectl apply -f gfs-sc.yml

$ kubectl get sc

$ kubectl apply -f gfs-pvc.yml

# pvc에 의해 pv가 만들어지는 것을 확인
$ kubectl get pvc,pv
```



pod 생성

```shell
$ kubectl apply -f gfs-client.yml

$ kubectl get po
```



파일을 만들고 해시를 비교해서 같은지

파일 공유되는지 검증

```shell
$ kubectl exec -it gfs-a bash

# df -h  # mount 경로 확인

# ls -lR > /mnt/talktalkforever.dat

# md5sum /mnt/talktalkforever.dat

$ kubectl exec -it gfs-b bash

# df -h

# md5sum /mnt/talktalkforever.dat
```



## 스테이트풀셋

### PV 유지

스테이트풀셋으로 PV를 만들고 데이터가 유지되는지 보자

vagrant-kubernetes



```shell
$ kubectl apply -f mysql-sts.yml

$ kubectl get svc,sts,po

$ kubectl get pvc,pv
```



mysql 가 pod 삭제에 유지되는가

```shell
$ kubectl exec -it mysql-0 -- bash

# mysql -u root -pqwerty

mysql> create database talktalkcic;

mysql> show databases;

$ kubectl delete -f mysql-sts.yml

$ kubectl get svc,sts,po

# pv가 유지됨
$ kubectl get pvc,pv
```



mysql 재배포

```shell
$ kubectl apply -f mysql-sts.yml

$ kubectl exec -it mysql-0 -- bash

# mysql -u root -pqwerty

mysql> show databases;
```



### 수동 테이크 오버

vagrant-kubernetes


하드웨어 보수작업이 필요할때

트랜잭션이 롤백될 수 있어 정지하고 하는 것을 권장 

```shell
$ kubectl apply -f mysql-sts.yml

# 돌고 있는 노드를 확인
$ kubectl get po -o wide

# 카돈으로 파드에 스케줄 금지
$ kubectl cordon node2

# 가동중인 파드를 node2에서 node1으로 이동
$ kubectl drain node2 --ignore-daemonsets

$ kubectl get po -o wide

$ kubectl uncordon node2
```



### 노드 장애시 동작

vagrant-kubernetes

```shell
$ vagrant halt node1

# 예제에서는 반복문으로 계속 확인 - 변경되지 않는다는 것을 인지하고 다음으로 넘어감
$ kubectl get no,po

$ kubectl delete node node1

# 넘어갔나?
$ kubectl get po -o wide
```



### 테이크 오버 자동화 코드

GKE는 정지한 노드를 대신해 다른 노드를 기동해 자기 회복을 한다.



온프레미스는?

정지한 노드를 K8s 클러스터에서 자동으로 제외해 해당 노드에서 돌던 파드를 빠르게 

다른 노드로 옮겨 서비스가 원활히 재개될 수 있도록 하자



**(1) k8s API 라이브러리를 사용하여 프로그램 개발**

상태 불명의 노드를 클러스터에서 제거하는 컨테이너 만들자

```shell
$ cd ../step12/liberator/container

# 어떤 기능인지 확인하자
$ vi main.py

$ docker login
$ docker build --tag jm92116/liberator:0.1 . # 아마 안올라가 질꺼임 이미 올려서

$ docker images
```



(2) **k8s 클러스터에 대한 조적 권한을 파드에 부여**

```shell
$ cd ../step12/k8s-rbac

$ vi service-account.yml

$ vi role-based-access-ctl.yml

$ kubectl describe clusterrole admin -n kube-system
```





(3) **네임스페이스추가**

노드 감시 기능을 수행하기 위한 서비스 어카운트, 클러스터롤, 클러스터롤바인딩

(네임스페이스관련은 스텝 15에서 자세히 배운다니까 일단스킵)

```shell
$ vi namespace.yml

$ kubectl apply -f k8s-rbac

$ kubectl get pods # 네임스페이스없이 파드 목록

$ kubectl get pods -n tkr-system 
```



**(4) 클러스터 구성변경 자동 대응**

데몬셋 - 데몬셋은 쿠버네티스를 구성하는 모든 노드에서 파드를 실행하기 위해 존재하는 컨트롤러

```shell
$ kubectl apply -f daemonset.yml

$ kubectl get ds
$ kubectl get ds -n tkr-system
```



### 장애회복테스트

```shell
$ kubectl get node,sts

$ kubectl get po -o wide # 어느 노드에서 도는지

# 흔적남기기
$ kubectl exec -it mysql-0 bash

# mysql -u root -pqwerty
mysql> create database talktalkmanse;
mysql> show databases;
```



```shell
# 중지하기 전에
$ kubectl get ep mysql # IP주소 확인

$ goto vagrant-kubernetes

$ vagrant halt node1 && while true; do date; kubectl get po -o wide; echo; sleep 15; done

$ kubectl get po -o wide

$ kubectl exec -it mysql-0 bash

# mysql -u root -pqwerty
mysql> show databases;

$ kubectl get ep mysql # IP주소 확인
```

