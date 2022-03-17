---

title: 'Devops Git'
permalink: /docs/devops/git

toc: true
toc_sticky: true
toc_label: 'My Table of Contents'
toc_icon: 'cog'
typora-root-url: ../../../moonscoding.github.io
---## Basic



# Qustion

- 로컬저장소 커밋 가져오기

## 

# Git

### git --version

```
git --version
```

### git init

```
git init
```

### git clone

git clone [remote_url]

```
git clone http://
```

### git status

```
git status
```

### git add

git add [file_name]

-   `-i` 대화형 모드가 시작되며 파일의 일부분만 스테이징이 가능
-   `-p` 대화형 모드없이 바로 패치 모드 사용

```
git add .
git add src
```

### git commit

git commit -m [<message]

```
git commit -m "Which one best naver or kakao?"
```

git commit -C HEAD -a --amend

지정한 커밋의 로그 메시지를 다시 사용하여 기존 커밋을 수정

-c 사용시 기존 메시지를 수정할 수 있는 편집기 실행

```

```

### git diff

스테이지영역과 현재 작업트리의 차이점 확인

-   `--cached` 스테이징영역과 저장소의 차이
-   `HEAD` 저장소, 스테이징영역, 작업트리의 차이점을 모두 확인
-   `--stat` 변경사항에 대한 통계
    -   ![image-20191015002146574](/assets/images/image-20191015002146574.png)

```
git diff
```

### git mv

git mv [file_name][new_file_name]

```javascript
git mv a.txt b.txt
```

### git checkout

git checkout [file_name]

스테이징이나 커밋하지 않은 파일의 변경내용을 취소하고 원래 상태로 되돌림

```
git checkout b.txt
```

### git push

git push [remote_name][branch_name]

```
git push origin master
```

### git pull

git pull [remote_name][branch_name]

```
git pull origin master
```

### git fetch

원격 저장소의 변경사항을 가져와 원격 브랜치를 갱신

```
git fetch
```

### git stash

git stash ( = git stash save )

저장

git stash list

목록 조회

git stash show [stash_name]

단건 정보 조회

git stash pop

적용 + 삭제

git stash apply

적용

```
git stash
git stash pop
```

## Log

### git log

-   `-<number>` 출력 로그 갯수 설정
-   `--pretty=oneline`
    -   `--pretty=format:%h %s`
-   `-p` 변경된 내용 같이 출력
-   `--since="5 hours"`
-   `--before="5 hours"`
-   `--graph` 브랜치 트리 출력

```
git log
git log -10
git log --oneline --all -- graph
```

### git reflog

HEAD의 변경 이력을 알려주는 명령어

```
git reflog show
```

![image-20200413144836850](/assets/images/image-20200413144836850.png)

### git blame

git blame [file_name]

git blame -L 10,15 [file_name]

git blame -M [file_name]

## Config

### git config

--global 옵션은 전역 설정에 대한 옵션이며 현재 프로젝트에만 적용할 때는 설정하지 않음

git config (--global) --list

```

```

git config (--global) user.name [user_name]

```

```

git config (--global) user.email [user_email]

```

```

git config (--global) color.ui [color_ui]

터미널에 표시되는 메시지에 칼라를 설정

```
git config --global color.ui "auth"
```

### git remote

git remote add [name][url]

새로운 원격 저장소 추가

```
git remote add origin http://~
```

git remote

추가한 원격저장소 목록 확인

```
git remote
```

git remote show [name]

해당 원격 저장소의 정보 확인

```
git remote show origin
```

git remote rm [name]

원격 저장소 제거

```
git remote rm origin
```

## Branch

### git branch

-   `-r` 원격 저장소의 브랜치 확인
-   `-d` 삭제
-   `-a`

```
git branch
git branch <branch_name>
git branch -r
git branch -d <branch_name>
git branch -a
```

git branch [branch_name][new_branch_name]

git branch -m [branch_name][new_branch_name]

-   `-m` 존재하는 브랜치를 새로운 브랜치로 변경 **( Force! )**

```
git branch origin_branch target_branch
git branch -m origin_branch force_target_branch
```

### git checkout

git checkout [branch_name][tag_name]

git checkout -b [branch_name_B][branch_name_a]

git checkout -t [remote_url][branch_name]

```
git checkout <branch_name>
git checkout -b <branch_name>
git checkout -t <remote_url>/<branch_name>
```

### git merge

git merge [branch_name]

```
git checkout master
git merge target
```

`--squash` 브랜치명의 모든 커밋을 하나의 커밋으로 만듬

```
git merge --squash target
```

#### 일부분만 merge할 수 있을까?

https://junhobaik.github.io/git-specific-files-merge/

### git tag

git tag [tag_name][branch_name]

## Commit

### git revert

git revert [commit_key]

기존 커밋에서 변경한 내용을 취소하고 새로운 커밋 생성 (Rename 아님, Log 유지)

```
git revert <commit_key>
```

-   `-n` 바로 커밋하지 않고 --continue 옵션을 호출하여 진행
-   `--continue` -n 옵션을 진행
-   `--abort` -n 옵션을 취소

```
git revert -n <commit_key>

git status
===
"You are currently reverting commit <commit_key> "
~
===

git revert --continue
git revert --abort
```

### git reset

git reset [commit_name]

-   `--soft` 이전 커밋을 스테이징영역으로 전환
-   `--hard` 이전 커밋을 저장소와 작업트리에서 제거

```
# 최근 1개 커밋 취소
git reset HEAD^
```

### git rebase

https://cjh5414.github.io/git-rebase/

git rebase -i [commit_range]



#### Commit 통합

-   `-i` 대화형모드로 커밋 순서를 변경하거나 합치는 작업 가능
-   텍스트 에디터가 열리고 `HEAD`에서 `HEAD~~`까지 커밋이 표시
    -   `pick -> squash`로 변경하고 저장 & 종료 -> 두 개의 커밋이 하나의 커밋으로 통합

```
$ git rebase -i HEAD~${N}
```

```
pick <commit_id_a> <commit_comment_a>
pick <commit_id_b> <commit_comment_b>

# Rebase ...
# ~
```



#### Commit 수정

-   `-i` 대화형모드로 커밋 순서를 변경하거나 합치는 작업 가능
-   텍스트 에디터가 열리고 `HEAD`에서 `HEAD~${n}`까지 커밋이 표시
    -   `pick -> edit`으로 변경하고 저장 & 종료 -> 수정할 커밋이 체크아웃된 상태로 변경

```
$ git rebase -i HEAD~${n}
```

```
pick <commit_id_a> <commit_comment_a>
pick <commit_id_b> <commit_comment_b>

# Rebase ...
# ~
```

그 다음엔 ... ?

```
Stopped at <commit_id> <commit_comment>
You can amend the commit now, with

        git commit --amend

Once you are satisfied with your changes, run

        git rebase --continue
```

```
$ git push -f
```



##### commit 수정 (amend)

```
$ git commit --amend -m "change message"
$ git push -f
```



### git cherry-pick

git cherry-pick [commit_name]

특정 커밋만을 선택해 현재 브랜치에 커밋으로 만듬

-   `-n` 작업트리에 합치지만 커밋은 하지 않아 여러개의 커밋을 합쳐서 커밋 가능

```
git cherry-pick <commit_name>
```

## SubModule

### git submodule

git submodule

연관된 하위 모듈 조회

```

```

git submodule add [repo_url][submodule_url]

새로운 하위 모듈을 해당 경로에 추가

추가하고 초기화하지 않으며 커밋 해쉬 앞에 마이너스(-) 표기

```

```

git submodule init [submodule_url]

서브모듈 초기화

```

```

git submodule update [submodule_url]

서브 모듈 변경사항 적용

```

```



## File

### git mv

(히스토리를 유지한채로) 파일이름 변경

```git
git mv file1.txt file2.txt
```





## ETC

### git archive

git archive --format=tar --prefix=[dir_name][branch_name || tag_name] | gzip > [file_name].tar.gz

git archive --format=zip --prefix=[dir_name][branch_name || tag_name] | gzip > [file_name].zip

해당 브랜치나 태그를 압축파일로 만듬

-   `--prefix` 압출파일이 해당폴더 안에 생성되도록 처리

### git mergetool

설정에 merge.tool 값에 있는 머지툴을 찾아 실행

### git gc

저장소의 로그 최적화

로그가 변경되지 않고 저장 방식만 최적화

-   `--aggressive` 더 자세하게 최적화

### git rev-parse --show-toplevel

git 저장소내에 입력시 Root Dir를 반환

## GitFlow

> 참조
>
> -   [https://medium.com/@pks2974](https://medium.com/@pks2974/자주-사용하는-기초-git-명령어-정리하기-533b3689db81)
> -   [https://opentutorials.org](https://opentutorials.org/course/3843/24443)
> -   [https://blog.outsider.ne.kr](https://blog.outsider.ne.kr/572)
> -   [https://git-scm.com/](https://git-scm.com/book/ko/v2/Git-도구-고급-Merge)
