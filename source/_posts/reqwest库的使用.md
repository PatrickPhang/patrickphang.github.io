---
title: reqwest库的使用
date: 2017-01-03 19:22:08
categories: 爬虫
---
<!-- more --> 
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/reqwest/2.0.5/reqwest.js"></script>
    </head>
    <body>
        <h1>Hello There!</h1>
        <script>
            var a = {}
            reqwest({
                url:"http://swapi.co/api/people/1/",
                type:"json",
                method:"get",
                data:{tag:"life"},
                success:function (resp) {
                    a = resp
                }
            })
        </script>
    </body>
</html>
```
