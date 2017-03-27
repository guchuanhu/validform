(function(){
            $.fn.validform = function(opt){
                var headname = "vf-data-",
                    last = [],
                    iptlist = [];

                opt.reminder = {};

                opt.whichcheck.forEach(function(v){
                    var ipt = $("input[name="+v.name+"]");
                    if(ipt.length){
                        if(!opt.reminder[v.name]){
                            opt.reminder[v.name] ={};
                        }
                        for(var k in v){
                            if(typeof v[k] !== "string"){
                                opt.reminder[v.name][headname+k] = v[k][1];
                            }
                            if(!ipt.attr(k)){
                                ipt.attr(headname+k,v[k][0]);
                            }
                        }
                    }
                });

                $(this).find("input").each(function(i,d){
                    iptlist.push(d);
                    if($(d).attr("valid-button")){
                        $(d).on("click",function(){
                            var tobtn = true;
                            iptlist[opt.onebyone?"every":"forEach"](function(obj,k,a){
                                return tipsBorn.call(obj,k,last,opt.reminder[$(obj).attr("name")],headname);
                            });

                            last.forEach(function(v){
                                tobtn = v&&tobtn;
                            });
                            if(tobtn){
                                opt.btnfn();
                            }
                        });
                    }else if(opt.onfocuscheck){
                        last[i] = false;
                        $(d).on("blur",function(){
                            $(d).unbind("keyup");
                        }).on("focus",function(){
                            $(d).keyup(function(){
                                tipsBorn.call(this,i,last,opt.reminder[$(d).attr("name")],headname);
                            });
                        });
                    }
                });

            };

            function tipsBorn(i,last,reminders,headname){
                if($(this).next(".validtip").length){
                    $(this).removeClass("iptsty")
                        .next(".validtip").hide();
                }else{
                    $(this).after("<div class='validtip'>123</div>");
                }

                {
                    if($(this).attr(headname+"required")){
                        if(!$(this).val()){
                            var a = reminders?reminders[headname+"required"]:"不能为空提示语有误";
                            $(this).addClass("iptsty").next(".validtip").css({"display":"inline-block"}).text(a);
                            last[i] = false;
                            return false;
                        }
                    }
                    if($(this).attr(headname+"reg")){
                        var dataReg = $(this).attr(headname+"reg"),reg;
                        reg = new RegExp(dataReg);
                        if(!$(this).val().match(reg)){
                            var b = reminders?reminders[headname+"reg"]:"正则表达式提示语有误";
                            $(this).addClass("iptsty").next(".validtip").css({"display":"inline-block"}).text(b);
                            last[i] = false;
                            return false;
                        }
                    }
                    if($(this).attr(headname+"max")){
                        if($(this).val().length>$(this).attr(headname+"max")-0){
                            var a = reminders?reminders[headname+"max"]:"max提示语有误";
                            $(this).addClass("iptsty").next(".validtip").css({"display":"inline-block"}).text(a);
                            last[i] = false;
                            return false;
                        }
                    }
                    if($(this).attr(headname+"min")){
                        if($(this).val().length<$(this).attr(headname+"min")-0){
                            var a = reminders?reminders[headname+"min"]:"max提示语有误";
                            $(this).addClass("iptsty").next(".validtip").css({"display":"inline-block"}).text(a);
                            last[i] = false;
                            return false;
                        }
                    }
                }
                last[i] = true;
                return true;
            }
        })();
