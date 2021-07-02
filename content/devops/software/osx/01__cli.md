---
title : cli
---



## alias (zsh)

OSX CommandLine에서 단축어(Alias)를 설정하는 방법을 알아봅니다.



1. `.zshrc` 파일로 진입하기

```bash
$ vi ~/.zshrc
```



2. alias 작성하기

```bash
# .zshrc

# ...
alias openzsh="vi ~/.zshrc"
# ...
```



3. 저장내용 실행하기 (source = 인수로 전달된 파일을 실행하는 bash 명령어)

```bash
$ source ~/.zshrc
```

# 