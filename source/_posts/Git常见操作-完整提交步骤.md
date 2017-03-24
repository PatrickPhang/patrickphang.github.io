---
title: Git常见操作(完整提交步骤)
date: 2017-01-03 20:38:18
categories: Github
mathjax: true
description: 啦啦啦~戳进来
---
## 从已有的Git仓库中克隆一个本地的镜像仓库：  

`git clone https://github.com/YourAccountName/name.git`

------------------
## 自己新建一个仓库并上传到远程仓库：
1. `git init` -> 初始化新的仓库
2. `git add README.md` -> 将新加入的untracked状态的文件加入跟踪并放入暂存区///将已修改的文件放入暂存区  
`git add .` -> 操作所有文件

    ```
    On branch master

    Initial commit

    Changes to be committed:
      (use "git rm --cached <file>..." to unstage)

            new file:   a01.txt
    ```

3. `git commit -m "第一次提交"` -> 将暂存区中的文件提交至HEAD所指向的分支，暂存区的文件将回到未修改状态  
  ```
  [master (root-commit) af05048] 第一次
    1 file changed, 3 insertions(+)
    create mode 100644 a01.txt
  ```

  其他常见方法：
  `git status` -> 查看仓库中文件的状态  
  `git rm a01.txt` -> 将已跟踪的文件从Git中移除  
  `git checkout -- a01.txt` -> 恢复被删除的文件(未被commit)  
  `git reset HEAD readme.txt` -> 恢复被修改的文件(未被commit),并不会更改文件内容，只是使之回到已修改状态  
  `git commit --amend -m a01.txt` -> 恢复被删除的文件(已被commit)

4. `git remote add origin https://github.com/YourAccountName/name.git` -> 这样就可以用origin这个名字来引用添加的远程仓库  

5. `git fetch origin` -> 并不能看到工作目录下有任何变化，只是把远程的数据抓取到本地，而不会把改动合并到当前分支上  
`git pull https://github.com/YourAccountName/name.git` -> 把远程仓库抓取到本地，并合并本地master分支

6. `git push -u origin master` -> 将本地的数据更新到远程仓库中  
`git push` -> 以后直接使用


----------------

## 遇到的错误(慢慢更新......)
### 1. `git push origin master`
```
To https://github.com/PatrickYates/patrickyates.github.com.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'https://github.com/PatrickYates/patrickyates
.github.com.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```
* 解决办法：当前的本地仓库不是最新的，应该pull到本地



### 2. `git pull https://github.com/YourAccountName/name.git`
```
From https://github.com/YourAccountName/name.git
 * branch            HEAD       -> FETCH_HEAD
fatal: refusing to merge unrelated histories```

```
>git pull https://github.com/YourAccountName/name.git
warning: no common commits
remote: Counting objects: 60, done.
remote: Compressing objects: 100% (51/51), done.
remote: Total 60 (delta 1), reused 60 (delta 1), pack-reused 0
Unpacking objects: 100% (60/60), done.
From https://github.com/YourAccountName/name.git
 * branch            HEAD       -> FETCH_HEAD
fatal: refusing to merge unrelated histories```
* 解决办法：本地代码与远程仓库代码完全不同，无法合并  

--------------------

## 其他Github精华教程：  
1. [交互编程-15分钟学会github](http://try.github.io/levels/1/challenges/1)  
2. [书籍-重量级教程progit](https://github.com/numbbbbb/progit-zh-pdf-epub-mobi)  
3. [书籍-git magic](https://github.com/blynn/gitmagic/tree/master/zh_cn)  
4. [教程-如何高效利用GitHub](http://www.yangzhiping.com/tech/github.html)  
5. [教程-git immersion](http://gitimmersion.com/)  
[中文版](http://igit.linuxtoy.org/contents.html)

## 参考资料
1. [必须要会的Git基本使用及常用命令操作](http://www.jianshu.com/p/555e7a188312)
