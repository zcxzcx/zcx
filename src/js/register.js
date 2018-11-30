// ==========================register=======================
jQuery(function($){
    // 点击logo跳转到首页
    $(".logo").on("click",function(){
        location.href = "http://localhost/1808/1809/zcx/src/index.html";
    });

    // 点击登录条转到登录页面
    $('.toLog').click(function() {
        location.href="http://localhost/1808/1809/zcx/src/html/login.html";
    });

    // 系统自动生成随机用户名和密码
    $("#username").val(NW_code(6));
    $("#password").val(randomCode(6));
    
    // 用户输入用户名
    $("#username").on("click",function(){
        $("#username").val("");
    });
    // 用户名验证
    $("#username").on("keyup",function(){
        if($("#username").val() == null){
            $("#username").val(NW_code(6));
        }
        let username = $("#username").val();
        // 发起ajax请求；
        $.ajax({
            type : "get",
            url : "../api/userData.php",
            data : {
                "usrname" : username
            },
            async : true,
            success : function(str){
                if(str == "success"){
                }
            }

        });
    });

    // 用户输入密码
    $("#password").on("click",function(){
        $("#password").val("");
    });
    // 密码验证
    $("#password").on("keyup",function(){
        if($("#password").val() == null){
            $("#password").val(randomCode(6));
        }

        $password = $("#password").attr("type","passowrd");
        let password = $("#password").val();
        // 发起ajax请求 post
        $.ajax({
            type : "post",
            url : "../api/userData.php",
            data : {
                "password" : password
            },
            async : true,
            // success : function(str){
            //     if(str == "success"){
            //       
            //     }
            // }
        });

    });

    // 邮箱验证
    $("#email").on("keyup",function(){
        let email = $("#email").val();
        // 发起ajax请求
        $.ajax({
            type : "get",
            url :  "../api/userData.php",
            data : {
                "email" :email
            },
            async : true,
            success : function(str){
                if(str == "success"){

                }
            }
        });
        
    });

    // 提交注册
    $("#regBtn").on("click",function(){
        // 获取用户名和密码
        var username = $("#username").val();
        console.log(username);
        var password = $("#password").val();
        var email = $("#email").val();
        console.log(email);
        if($("#checkbox")[0].checked){
            $.ajax({
                type : "post",
                url : "../api/userData.php",
                data : {
                    "reg" : "reg",
                    "username" : username,
                    "password" : password,
                    "email" : email
                },
                async : true,
                success : function(str){
                    console.log(6);
                    if(str !=  "fail"){
                        console.log(666);
                        location.href="http://localhost/1808/1809/zcx/src/html/login.html?name="+str;
                    }else{}
                }

            })

        }else{
            alert("请阅读并同意相关《服务协议》");
        }

    });



})