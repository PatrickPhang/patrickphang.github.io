---
title: python利用百度天气api查询天气数据
date: 2017-01-03 19:20:28
categories: 爬虫
---
## 一.说明
本次实验的是百度天气的api,网址为：[click here](http://api.map.baidu.com/telematics/v3/weather?location=%E5%B9%BF%E5%B7%9E&output=json&ak=KPGX6sBfBZvz8NlDN5mXDNBF&callback=)  
查询广州的天气，返回json格式，然后解析内容（上面链接点开就知道了）。(可以使用chrome应用Postman来pretiffy json内容)  
<!-- more --> 
## 二.示例代码
```python
import requests
import urllib.request
import http.client
import json

#1.requests内置json解析方法
url = 'http://api.map.baidu.com/telematics/v3/weather?location=%E5%B9%BF%E5%B7%9E&output=json&ak=KPGX6sBfBZvz8NlDN5mXDNBF&callback='
r = requests.get(url)

print("查询日期："+r.json['date'])
print("城市："+r.json['results'][0]['currentCity'])
print("pm2.5值："+r.json['results'][0]['pm25'])
print("\n")
for i in range(0,4):
    print("日期："+r.json['results'][0]['weather_data'][i]['date'])
    print("天气："+r.json['results'][0]['weather_data'][i]['weather'])
    print("风力："+r.json['results'][0]['weather_data'][i]['wind'])
    print("温度："+r.json['results'][0]['weather_data'][i]['temperature'])
    print("---------------")




#2.urllib库 + json库的json.loads()
url = 'http://api.map.baidu.com/telematics/v3/weather?location=%E5%B9%BF%E5%B7%9E&output=json&ak=KPGX6sBfBZvz8NlDN5mXDNBF&callback='
request = urllib.request.urlopen(url).read().decode('utf8'))  #注意必须要.decode('utf8')，不然会有错误：the JSON object must be str, not 'bytes'
s = json.loads(request)

print("查询日期："+s['date'])
print("城市："+s['results'][0]['currentCity'])
print("pm2.5值："+s['results'][0]['pm25'])
print("\n")
for i in range(0,4):
    print("日期："+s['results'][0]['weather_data'][i]['date'])
    print("天气："+s['results'][0]['weather_data'][i]['weather'])
    print("风力："+s['results'][0]['weather_data'][i]['wind'])
    print("温度："+s['results'][0]['weather_data'][i]['temperature'])
    print("---------------")





#3.http.Client库 + json库的json.loads()
url = 'http://api.map.baidu.com/telematics/v3/weather?location=%E5%B9%BF%E5%B7%9E&output=json&ak=KPGX6sBfBZvz8NlDN5mXDNBF&callback='
httpClient = http.client.HTTPConnection('api.map.baidu.com', 80, timeout=30)
httpClient.request('GET',
                   '/telematics/v3/weather?location=%E5%B9%BF%E5%B7%9E&output=json&ak=KPGX6sBfBZvz8NlDN5mXDNBF&callback=')

response = httpClient.getresponse()
s = json.loads(response.read().decode('utf8'))  #注意必须要.decode('utf8')，不然会有错误：the JSON object must be str, not 'bytes'


print("查询日期："+s['date'])
print("城市："+s['results'][0]['currentCity'])
print("pm2.5值："+s['results'][0]['pm25'])
print("\n")
for i in range(0,4):
    print("日期："+s['results'][0]['weather_data'][i]['date'])
    print("天气："+s['results'][0]['weather_data'][i]['weather'])
    print("风力："+s['results'][0]['weather_data'][i]['wind'])
    print("温度："+s['results'][0]['weather_data'][i]['temperature'])
    print("---------------")
```

## 三.自己定义json解析函数
待解析json片段：
```python
{
	"showapi_res_code": 0,
	"showapi_res_error": "",
	"showapi_res_body": {
		"pagebean": {
			"allNum": 5034,
			"allPages": 252,
			"contentlist": [
				{
					"code2img": "http://app1.showapi.com/weixin_info/pubNum/xxxxxx.jpg",
					"id": "55cbfce16e36a9c5946e40b0",
					"pubNum": "xxxx",
					"tag": "",
					"type1_id": "44",
					"type1_name": "名人明星",
					"type2_id": "73",
					"type2_name": "时尚",
					"userLogo": "http://app1.showapi.com/weixin_info/pubNum/xxxx.jpg",
					"weiNum": "xxx66 "
				},
				{
					"code2img": "http://app1.showapi.com/weixin_info/pubNum/xxxx.jpg",
					"id": "55cbfcdf6e36a9c5946e40ae",
					"pubNum": "阳西县蓝星半岛旅游度假村",
					"tag": "添加微信号:xxxx22 ",
					"type1_id": "47",
					"type1_name": "生活购物",
					"type2_id": "100",
					"type2_name": "旅游",
					"userLogo": "http://app1.showapi.com/weixin_info/pubNum/xxxx.jpg",
					"weiNum": "xxxx22"
				}
```

函数：
```python
def json_path(d, path, sep='.'):
    pp = path.split(sep)
    t = d
    for p in pp:
        if type(t) is dict:
            t = t[p]
        elif type(t) is list:
            t = t[int(p)]
        else:
            t = None
    return t

import json
d = json.loads(s)
print json_path(d, "showapi_res_body.pagebean.contentlist.1.pubNum") #阳西县蓝星半岛旅游度假村
print json_path(d, "showapi_res_code") # 0
```

## 四.参考资料  
1. [知乎-为什么我已经知道了python的基本语法，可还是不会写个类似天气预报或者能聊天的小软件？](https://www.zhihu.com/question/36960036?from=profile_question_card)
2. [python结合API实现即时天气信息](http://www.jb51.net/article/78282.htm)
3. [python 调用 API 获得的JSON如何处理才能获得我想获得的内容呢?](https://www.zhihu.com/question/35446994)
4. [网上的天气 API 哪一个更加可靠？](https://www.zhihu.com/question/20575288)
5. [python day 08获取天气信息.制作天气预报软件](http://www.jianshu.com/p/0ca5b64cd104)
