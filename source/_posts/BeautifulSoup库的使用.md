---
title: BeautifulSoup库的使用
date: 2017-01-03 19:19:22
categories: 爬虫
---
## 导入所需包
`from bs4 import BeautifulSoup`  
`soup = BeautifulSoup(html)`
## 解析顺序
'lxml'->'html5lib'->'html.parser'
<!-- more --> 
## 对象种类
有四种类型：Tag，NavigableString，BeautifulSoup，Comment。  
BeautifulSoup将文档转化为树形结构，每个节点都是上述四种类型的Python对象。

## 遍历文档树
BeautifulSoup对象作为一棵树，有多个节点。对于一个节点，相对于它所在的位置，有子节点、父节点、兄弟节点。

#### 1. 子节点  
    * 一个Tag可包含多个Tag以及字符串，这些都是这个Tag的子节点。而NavigableString不会有子节点。
    * 如果想要获得某个Tag：`soup.tag_name`  
    * 通过点取属性，只能获得当前名字的第一个tag，若要获取所有，需要使用搜索文档树中的方法:`soup.find_all('tag_name')`  
    * tag的.contents属性可将所有子节点以列表的方式输出。可通过tag的.children生成器，对所有子节点遍历。  
    * `.contents`和`.children`只对获取Tag的直接子节点，`.descendants`可对Tag的所有子孙节点遍历。  
    * 如果tag只有一个NavigableString类型子节点，则可用`.string`获取。如果包含多个，使用`.strings`遍历。若输出的字符串中包含空格或空行，使用`.stripped_strings`去除。
    ```python
    res = soup.stripped_strings
    print(list(res))
    ```

#### 2. 父节点  
`.parent` -> 当前节点的父节点  
`.parents` -> 当前节点的所有父辈节点  

#### 3. 兄弟节点  
拥有同一父节点的节点之间：  
`.next_sibling`  
`.previous_sibling`  

    所有兄弟节点：  
    `.next_siblings`  
    `.previous_siblings`  

    指向下一个或上一个解析对象：  
    `.next_element`  
    `.previous_element`  
    `.next_elements`  
    `.previous_elements`  

---

----

---



### 搜索文档树：find(str)和find_all(str)  
>其中的str，代表了tag的name。可以是纯字符串、正则表达式、列表（任一匹配就满足条件，是或运算）、True（返回所有Tag节点不返回字符串节点）。  
另一种入参不是str，而是method。此方法是一个函数，只接受一个元素入参，若此函数返回True表示入参匹配要求。例如：
def has_class_but_no_id(tag):
return tag.has_attr('class') and not tag.has_attr('id')    
综上，过滤器包括：纯字符串、正则表达式、列表、True、方法这几种。

#### 1. `find_all(name,attrs,recursive,text,**kwargs)`
该方法搜索当前节点的所有tag子节点。  
1. `name`参数：  
指的是tag的name属性，字符串对象自动忽略。
过滤器可以使用全部种类。  
2. `keyword`参数：
如果一个入参指定了名字，但是并不是上述提到的入参名字，搜索时会把该入参当做是tag的属性来搜索。  
例如：`soup.find_all(id='link2')`会返回tag中存在属性id，并且id对应的值是link2的tag。  
以上方法可使用除方法之外的所有过滤器。  
某些特殊属性不能这样直接使用，则使用如下方法：
`soup.find_all(attrs={"key":"value"})`  
例如要使用class属性进行搜索，由于class是python中的保留字，不能直接写成入参，目前有两种方法：
soup.find_all('tag.name',class_='class_value')
soup.find_all('tag.name',attrs={'class':'class_value'})
class_方法可以使用全部过滤器。
另外，因为class是一个多值属性，所以只需要匹配一个值，就可以得到结果，所谓的不完全匹配。
使用完全匹配时，过滤器中的字符顺序需要和实际相符合才能得到对应结果。  
3. `text`参数：  
搜索的是Tag中的字符串内容，可使用全部过滤器。
4. `limit`参数：
限制返回数量。  
5. `recursive`参数：
find_all()默认是搜索当前节点的所有子孙节点，若只需要搜索直接的子节点，则设置recursive=False。  

find_all()是实际当中用的最广泛的。因此有了等价的简化版：
`soup.find_all('a')`或`soup('a')`

#### 2. `find(name,attrs,recursive,text,**kwargs)`  
find()方法等价于find_all(limit=1)，返回符合条件的第一个对象。  
区别在于，前者直接返回结果，后者返回只有一个元素的列表。若没有对象符合条件，前者返回None，后者返回空列表。  
简化版：`soup.find('head').find('title')`或`soup.head.title`

        除了find()和find_all()之外还有一些搜索的方法：
        find_parent()
        find_next_sibling()
        find_previous_sibling()
        上面三种可以在后面加's'表示所有。
        find_next()
        find_previous()
        find_all_next()
        find_all_previous()

#### 3. CSS选择器(.select()方法)  
Tag或BeautifulSoup对象的.select()方法。  
`res = soup.select('#wrapperto')` -> tag's id  
`res = soup.select('img[src]')` -> 'img' tags有'src' attributes  
`res = soup.select('img[src=...]')` -> 'src' attributes是...  

----

----

----

## 输出
* `soup.prettify()`将文档树格式化之后输出。    
* 若不注重格式，则可使用python的`str()`或`unicode()`。    
* 如果想得到tag中包含的文本内容，使用`get_text()`，可获取到当前节点的文本，以及子孙节点中的文本。返回的是Unicode。  
* 可以指定参数设置分隔符如`get_text("|")`是以“|”作为分隔符。  
* `get_text(strip=True)`可去除文本前后的空白。  
* 或者用`.stripped_strings`进行遍历。获得父级标签下的所有子标签内的文本信息，相当于处理多个文本的高级的get_text()方法  

----

----

----

## 编码
1.soup使用Unicode编码。  
2.BeautifulSoup对象的.original_encoding属性来获取自动识别编码的结果。  
3.在创建BeautifulSoup对象时，指定入参`from_encoding`来告知文档的编码方式。  
4.有时转码时有些特殊字符替换成了特殊的Unicode，可通过BeautifulSoup对象的`.contains_repalcement_characters`属性来判断是否有此情况，为True即为有特殊替换。  
5.输出编码统一为UTF8，若想要其他的编码，则和一般的python字符串相同，需要进行手动设置。


-----

----

----

完整实例代码
```python
import requests,urllib.request
from bs4 import BeautifulSoup

source_code = requests.get(url,headers=header)
wb_data = source_code.text

soup = BeautifulSoup(wb_data,'lxml')
titles = soup.select('body > div.main-content > ul > li > div.article-info > h3 > a')
images = soup.select('body > div.main-content > ul > li > img')

#获取网页信息
for title,image in zip(titles,images):
    data = {
        'title':title.get_text(),
        'image':image.get('src')
    }
print(data)

#下载
download_links = []
folder_path = "C:/Users/asus-pc/Desktop"
for pic_tag in soup.find_all('img'):
    pic_link = pic_tag.get('src')
    download_links.append(pic_link)
for item in download_links:
    urllib.request.urlretrieve(item,folder_path+item[-5:])
    print("done!")

```
