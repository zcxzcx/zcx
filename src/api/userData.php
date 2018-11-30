<?php

    // 创建连接数据库，主机名localhost，用户名root， 密码为空，数据库名字；
    $servername = "localhost";
    $username = "root";
    $password = ""; 
    $dbname = "1809";//"zhaochenxi"

    // 创建连接（对象）
    $conn= new mysqli($servername ,$username ,$password,$dbname);    

    // 检测连接
    // echo "连接成功";

    // 查询前设置编码，防止乱码
    $conn->set_charset('utf8');


    // 获取前端返回参数
    $username=isset($_GET['username'])?$_GET['username']:null;
    $password=isset($_POST['password'])?$_POST['password']:null;
    $email=isset($_GET['email'])?$_GET['email']:null;
    $reg=isset($_POST['reg'])?$_POST['reg']:null;
    $login=isset($_POST['login'])?$_POST['login']:null;


    // 用户名验证:不能使用特殊字符（只能使用数字、字母、下划线、横杠）必须以字母开头长度4-20
    if($username){
        if(preg_match("/^[a-zA-Z][\w\-]{3,19}$/",$username)) {
            $sql_name="select * from userData where username ='$username'";
            $result_name = $conn->query($sql_name);
            if($result_name->num_rows>0){
                echo "success";
            }
        }else{
                echo "fail";
        }
    }

    // 密码验证:  长度小于10
    if($password){
        if(preg_match("/^[\s\S][^\s]{1,10}$/",$password)) {
        }else{
            echo "fail";
        }
    }

    // 邮箱
    if($email){
        if(preg_match("/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i",$email)) {
        }else{
            echo "fail";
        }
    }

    // reg
    if($reg){
        $username=isset($_POST['username'])?$_POST['username']:null;
        $password=isset($_POST['password'])?$_POST['password']:null;
        $password=md5($password);
        $email=isset($_POST['email'])?$_POST['email']:null;

        // 写入数据库
        $sql = "insert into userData (username, password, email) values ('$username','$password','$email')";
        $result= $conn->query($sql); 
        if($result){
            echo $username;
        }else{
            echo false;
        }
    }

    // login
    if($login){
        $username=isset($_POST['username'])?$_POST['username']:null;
        $password=isset($_POST['password'])?$_POST['password']:null;
        $check=isset($_POST['check'])?$_POST['check']:null;
        $password=md5($password);

        $sql="select * from userData where username='$username' and password='$password'";

        // 执行查询语句
        $result =$conn->query($sql);

        // var_dump($result);
        if($result->num_rows>0){
            $row = $result->fetch_all(MYSQLI_ASSOC);
            $currentUser=$row[0];
            if($check==true){
                setcookie('uid', $currentUser['uid'], time() + 3600*24*7, '/');
                setcookie('username', $currentUser['username'], time() + 3600*24*7, '/');
                echo $username;
            }
        }else{
            echo false;
        }
    }


?>

