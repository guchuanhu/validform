# validform
表单验证插件<br>
## 功能介绍
1、支持必须字段校验，最大长度最小长度校验，正则表达式校验；<br>
2、一次性全部校验和逐个校验；<br>
3、提交校验和获得焦点校验。<br>
## 使用讲解
1、引入validform.js和validform.css,样式表中.validtip和.iptsty可根据需要自行修改。<br>
2、加入此方法<br>
<pre>    $("#form1").validform({
        btnfn:fn,//提交按钮添加的函数
        onebyone:true,//true：一个接一个验证，false表单子项全验证
        onfocuscheck:true,//获得焦点开始验证
        whichcheck:[
            {
                name:'loginname',//必填
                required:[true,"账号不能为空"],//选填
                reg:['^[0-9]*$',"请输入数字"],//选填
                max:[10,"账号长度不能大于10"],//选填
                min:[6,"账号长度不能小于6"]//选填
            },
            {
                name:'email',//必填
                required:[true,"网址不能为空"],//选填
                reg:["[a-zA-z]+://[^\s]*","请输入正确网址如：https://www.baidu.com"]//选填
            }
        ]
    });
</pre>
