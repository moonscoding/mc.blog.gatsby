



```shell
sudo minikube addons enable metrics-server
```



```shell
sudo kubectl proxy --address="0.0.0.0" -p 8001 --accept-hosts="^*$" -n kube-systemv
```



환경변수설정

```shell
$ export KUBECONFIG=`pwd`/kubeconfig/config
$ cp -i `pwd`/kubeconfig/config $HOME/.kube/config
```

