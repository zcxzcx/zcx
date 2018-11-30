// ================================login==========================
jQuery(function($){
    // 点击Logo跳转到首页
    $(".logo").click(function(){
        location.href = "http://localhost/1808/1809/zcx/src/index.html";
    });

    // 打开页面生成随机验证码随机颜色
    $('.code').css('background', randomColor(16));
    $('.code').html(randomCode(4));
    // 点击验证码，生成随机验证码随机颜色
    $('.code').click(function() {
        $('.code').css('background', randomColor(16));
        $('.code').html(randomCode(4));
    });

    // 注册新会员，跳转到注册页面
    $(".newVip").on("click",function(){
        location.href = "http://localhost/1808/1809/zcx/src/html/register.html";
    });

    // 点击登录按钮
    $('#logBtn').click(function() {
        // 检验验证码是否正确
        var codeNum=$('#checkcode').val();
        var realCode=$('.code').html();
        if(codeNum==realCode){
            console.log(codeNum);
            // 获取用户名、密码
            var username=$('#username').val();
            var password=$('#password').val();
            var check=$('#checkbox')[0].checked;
            $.ajax({
                url: '../api/userData.php',
                type: 'post',
                async: true,
                data: {
                        'login':'login',
                        'username': username,
                        'password': password,
                        'check':check
                },
                success : function(str){
                    if(str!= "fail"){
                    console.log(str);
                    location.href="http://localhost/1808/1809/zcx/src/index.html?name="+username;
                    }
                }
            })
            // .success(function(str) {
                
            // })
        }
        else{
            alert('验证码不正确');
            $('.code').css('background', randomColor(16));
            $('.code').html(randomCode(4));

        }
        
    });


})


