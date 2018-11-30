<?php

   // 1.创建连接数据库，主机名localhost，用户名root， 密码为空，数据库名字；
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "1809";//"zhaochenxi"

    // 2.创建连接（对象）
    $conn = new mysqli($servername,$username,$password,$dbname);

    // 3.检测连接
    // echo "连接成功";

    // 4.查询前设置编码,防止乱码
    $conn->set_charset('utf8');


     // 5.获取前端返回的参数
    $goodslists=isset($_GET['goodslists'])?$_GET['goodslists']:null;
    $id=isset($_GET['id'])?$_GET['id']:null;
    $page=isset($_GET['page'])?$_GET['page']:null;

    $qty=15;
    // 6.获取数据库全部商品
    if($goodslists){
        // 编写sql语句
        $sql='select * from goodslists';

        //获取查询结果集
        $result = $conn->query($sql);

        //使用查询结果集
        //得到数组
        $row = $result->fetch_all(MYSQLI_ASSOC);
        // $row1=array_slice($row,($page-1)*$qty, $qty);
        $res=array(
            'total'=>count($row),
            'data'=>array_slice($row,0, $qty)
        );
        //把结果输出到前台
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
    }

    // 获取当前id的商品
    if($id){
        $sql="select * from goodslists where id='$id'";
        $result = $conn->query($sql);
        $row = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($row);
    }

    if($page){
        // 编写sql语句
        $sql_page='select * from goodslists';

       //获取查询结果集
        $result_page= $conn->query($sql_page);

        //使用查询结果集
       //得到数组
        $row_page = $result_page->fetch_all(MYSQLI_ASSOC);
 
         $row_page1=array_slice($row_page,($page-1)*$qty, $qty);
        // var_dump($row_page1);
       //把结果输出到前台
        echo json_encode($row_page1,JSON_UNESCAPED_UNICODE);
    }

    //释放查询结果集，避免资源浪费
    // $result->close();
    
    // 关闭数据库，避免资源浪费
    // $conn->close();

?>