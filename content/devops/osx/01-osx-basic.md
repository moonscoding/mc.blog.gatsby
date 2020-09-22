

# OSX



## shell

### ~~/etc/profile~~

환경 변수와 bash가 수행되는 프로그램을 제어하는 **전역적인** 시스템 설정과 관련된 파일

/etc/profile은 변수와 bash를 실행하는 모든 사용자가 수행하는 프로그램을 포함



### ~~/etc/bashrc~~

별칭(alias)과 bash가 수행될 때 실행되는 함수를 제어하는 **전역적인** 시스템 설정과 관련 파일



### ~/.bash_profile

환경 변수와 bash가 수행될 때 실행되는 프로그램을 제어하는 **지역적인** 시스템 설정과 관련된 파일

이들 환경 변수들은 오직 그 사용자에게만 한정되며, 그 이외의 다른 사람에게는 영향을 미치지 않음

(모든 사용자에게 영향을 주는 `/etc/profile` )



다음 파일을 항상 실행시키고 싶다면

`~/.bashrc` 파일에 다음을 추가하세요. **(안되는데 ... ? -> ohMyZsh로 갈아탐)**

```shell
if [ -f ~/.bash_profile ]; then
    . ~/.bash_profile
fi
```



### ~/.bashrc

별칭(alias)과 bash가 수행될 때 실행되는 함수를 제어하는 **지역적인** 시스템 설정과 관련 파일

이들 환경 변수들은 오직 그 사용자에게만 한정되며, 그 이외의 다른 사람에게는 영향을 미치지 않음

(모든 사용자에게 영향을 주는 `/etc/bashrc` )



### ~/.bash_logout

사용자가 로그 아웃하기 바로 직전에 실행하는 프로그램에 관한 bash의 지역적인 시스템 설정과 관련 파일

이들 환경 변수들은 오직 그 사용자에게만 한정되며, 그 이외의 다른 사람에게는 영향을 미치지 않음



## brew



### command

#### 검색

```
brew serach <package>
```



#### 설치

```
brew install <package>
```



[TODO] 다른 이름으로 설치 가능한가?

```shell
...
```





#### 위치

```
brew ls <package>
```



## OnMyZsh



install

```shell
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```



install from brew

```
brew update
brew install zsh
```





## Network

### PortForwading



<img src="../../assets/images/image-20200203161154701.png" alt="image-20200203161154701" style="zoom:50%;" />



> Network Utility > 포트 스캔 > `127.0.0.1` 검색



검색 후에 원하는 포트가 없다면 OSX 운영체제에 해당 포트가 열여있지 않은 것



