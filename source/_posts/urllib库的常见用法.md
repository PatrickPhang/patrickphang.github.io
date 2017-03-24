---
title: urllib库的常见用法
date: 2017-01-03 19:17:09
categories: 爬虫
---
先导入三个包：
```python
import urllib.request
import urllib.parse
import http.cookiejar
```
<!-- more --> 
最简单的urlopen()
```python
url = "http://www.baidu.com"         
response = urllib.request.urlopen(url)
print(response.read())
```

### 1. 构造headers  
```python
user_agent = ''
cookie = ''
referer = ''
host = ''
content_type = ''
```

### 2. 构造Request实例对象
```python
url = 'http://www.baidu.com'
values = {'name' : 'Michael Foord',
          'location' :'Northampton',
          'language' :'Python' }
headers={'User-Agent':user_agent,'Cookie':cookie,'Referer':referer,'Host':host,'Content-Type':content_type}
```

### 3. HTTP高级方法
### ①使用Proxy代理
```python
proxy_handler = urllib.request.ProxyHandler({'http': 'http://www.example.com:3128/'})
opener = urllib.request.build_opener(proxy_handler)
```

### ②使用cookiejar
```python
cookie_jar = http.cookiejar.CookieJar()
cookie_jar_handler = urllib.request.HTTPCookieProcessor(cookiejar=cookie_jar)

opener.add_handler(cookie_jar_handler)
```

### ③发送
```python
# 1.安装全局opener，然后利用urlopen打开url   
urllib.request.install_opener(opener)                   
response = urllib.request.urlopen(url)

# 2.直接利用opener实例打开url:
response = opener.open(url)
```

### 4. 抓取网页
```python
data = urllib.parse.urlencode(values).encode('utf-8')  

req = urllib.request.Request(url,data,headers)
#或req.add_header('Referer', 'http://www.baidu.com')
#  req.add_header('Origin', 'https://passport.weibo.cn')
#  req.add_header('User-Agent', 'Mozilla/6.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X)...')

response = urllib.request.urlopen(req,timeout=10)
the_page = response.read().decode('utf-8')
```
或者这样：
```python
data = urllib.parse.urlencode({"act": "login", "email": "xianhu@qq.com", "password": "123456"})
request1 = urllib.request.Request(url,data=data,headers)    # POST方法
request2 = urllib.request.Request(url+"?%s" % data)         # GET方法
```

-------------------

-------------------

-------------------
## 其他方法
```python
#抓取网页中的图片：同样适用于抓取网络上的文件。右击鼠标，找到图片属性中的地址，然后进行保存。
response = urllib.request.urlopen("http://ww3.sinaimg.cn/large/7d742c99tw1ee.jpg",timeout=120)
with open("test.jpg", "wb") as file_img:
    file_img.write(response.read())
```
----

```python
# HTTP认证：即HTTP身份验证
password_mgr = urllib.request.HTTPPasswordMgrWithDefaultRealm()     # 创建一个PasswordMgr
password_mgr.add_password(realm=None, uri=url, user='username', passwd='password')   # 添加用户名和密码
handler = urllib.request.HTTPBasicAuthHandler(password_mgr)         # 创建HTTPBasicAuthHandler
opener = urllib.request.build_opener(handler)                       # 创建opner
response = opener.open(url, timeout=10)                             # 获取数据
```

-----
gzip压缩：
在header中加入：`'request.add_header('Accept-encoding', 'gzip')'`
这是关键:创建Request对象，添加一个 Accept-encoding 头信息告诉服务器你能接受 gzip 压缩数据

然后就是解压缩数据：
```python
import StringIO
import gzip

compresseddata = f.read()
compressedstream = StringIO.StringIO(compresseddata)
gzipper = gzip.GzipFile(fileobj=compressedstream)
print gzipper.read()
```
------
多线程爬取：
```python
from threading import Thread
from Queue import Queue
from time import sleep
# q是任务队列
#NUM是并发线程总数
#JOBS是有多少任务
q = Queue()
NUM = 2
JOBS = 10
#具体的处理函数，负责处理单个任务
def do_somthing_using(arguments):
    print arguments
#这个是工作进程，负责不断从队列取数据并处理
def working():
    while True:
        arguments = q.get()
        do_somthing_using(arguments)
        sleep(1)
        q.task_done()
#fork NUM个线程等待队列
for i in range(NUM):
    t = Thread(target=working)
    t.setDaemon(True)
    t.start()
#把JOBS排入队列
for i in range(JOBS):
    q.put(i)
#等待所有JOBS完成
q.join()
```
