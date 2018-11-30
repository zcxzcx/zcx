// ============================goodslist=================
jQuery(function($){

   let all_shopping_goods='';
    // 获取url
    let url=getUrl("name");
    $('.little_main h3').html(`<span>首页 > </span><span>${url}</span>`);
    let username=getUrl("username");
    
    $('header').load('common_header.html',function(){
        if(username){
            console.log($('header #name'));
            $('header #name').css('display', 'inline-block').html(username);
            $('header #login').css('display', 'none');
            $('header #reg').css('display', 'none');
            $('header #out').css('display', 'inline-block');

            // 退出登录
            $('header #out').click(function() {
                $('#name').css('display', 'none');
                $('#login').css('display', 'inline-block');
                $('#reg').css('display', 'inline-block');
                $('#out').css('display', 'none');
                location.href="http://localhost/1808/1809/zcx/src/html/goodslist.html";
            });        
        }
            // // 点击logo跳转到首页
            // $('.toIndex').click(function() {
            //     console.log(0);
            //     location.href ="http://localhost/1808/1809/zcx/src/index.html";
            // });
           

            // 跳到注册页面
            $('#reg').click(function() {
                location.href="http://localhost/1808/1809/zcx/src/html/register.html";
            });

            // 跳到登录页面
            $('#login').click(function() {
                location.href="http://localhost/1808/1809/zcx/src/html/login.html";
            });

            // 跳到首页(点击logo)
            $('.toIndex').click(function() {
                console.log(123);
                if(username){
                    location.href="http://localhost/1808/1809/zcx/src/index.html?username="+username;
                }else{
                    location.href="http://localhost/1808/1809/zcx/src/index.html?";
                }
            });

    });

    // $('nav').load('common_nav.html');

    // 加载导航
    $('nav').load('common_nav.html',function(){
        // // 跳转到首页(分类-首页)
        $('.shouye').click(function(){
            console.log(0000);
            location.href ="http://localhost/1808/1809/zcx/src/index.html";
        });
    });

    // 加载底部
    $('footer').load('common_footer.html');


    // 侧栏购物车弹窗
        $('.fix_car').load('common_fix_car.html',function(){
             let isClick=true;
            $('.showCar').click(function(){
                
                if(isClick===true){
                    $('.bigCar').css('display', 'block');

                }else{
                    $('.bigCar').css('display', 'none');
                }
                isClick=!isClick;
            });
            $('.hide').click(function() {
                if(isClick===true){
                    $('.bigCar').css('display', 'block');
                }else{
                    $('.bigCar').css('display', 'none');
                }
                isClick=!isClick;
            });
            $('.ToCheckout').click(function() {
                if(username){
                    location.href='http://localhost/1808/1809/zcx/src/html/shoppingCar.html?username='+username;
                }else{
                  location.href='http://localhost/1808/1809/zcx/src/html/login.html';
                }
            });

             // 回到顶部
            $('#toTop').click(function() {
                $('html,body').animate({scrollTop:0}, 1000);
            });

        });

    let datalist='';
    // 发送ajax请求获取数据库所有数据，生成页面
    $.ajax({
        url: '../api/index.php',
        type: 'get',
        data: {'goodslists': 'goodslists'},
    })
    .success(function(str) {
        datalist=JSON.parse(str);
        let len=Math.ceil(datalist.total/15);
        datalist=datalist.data;
        console.log(datalist);
        create_all_goodslists(datalist,len);
        createPage(datalist,len);

        // 默认排序
        $('.auto').click(function() {
            function sortNumber(a,b){ 
                var Sales1=a.id;
                var Sales2=b.id;
                return Sales1-Sales2;
            }
            datalist.sort(sortNumber);
            create_all_goodslists(datalist);
        });

        let isSort=true;

        // 销量排序
        $('.sales').click(function() {
            console.log(isSort);
                if(isSort){
                    // 升序
                    function sortNumber(a,b){ 
                        var Sales1=a.Sales;
                        var Sales2=b.Sales;
                        return Sales1-Sales2;
                    }
                    datalist.sort(sortNumber);
                    create_all_goodslists(datalist);
                }else{
                    function sortNumber(a,b){ 
                        var Sales1=a.Sales;
                        var Sales2=b.Sales;
                        return Sales2-Sales1;
                    }
                    datalist.sort(sortNumber);
                    create_all_goodslists(datalist);
                }
            isSort=!isSort;
        });

        let isHot=true;

        // 人气排序
        $('.hot').click(function() {
            if(isHot){
                // 升序
                function sortNumber(a,b){ 
                    var hot1=a.hot;
                    var hot2=b.hot;
                    return hot1-hot2;
                }
                datalist.sort(sortNumber);
                create_all_goodslists(datalist);
            }else{
                function sortNumber(a,b){ 
                    var hot1=a.hot;
                    var hot2=b.hot;
                    return hot2-hot1;
                }
                datalist.sort(sortNumber);
                create_all_goodslists(datalist);
            }
            isHot=!isHot;
        });

        // 价格排序
        let isPrice=true;
        // 人气排序
        $('.price').click(function() {
            if(isPrice){
                // 升序
                function sortNumber(a,b){ 
                    var price1=a.mallPrice;
                    var price2=b.mallPrice;
                    return price1-price2;
                }
                datalist.sort(sortNumber);
                create_all_goodslists(datalist);
            }else{
                function sortNumber(a,b){ 
                    var price1=a.mallPrice;
                    var price2=b.mallPrice;
                    return price2-price1;
                }
                datalist.sort(sortNumber);
                create_all_goodslists(datalist);
            }
            isPrice=!isPrice;
        });
    });

    // 生成商品列表
    function create_all_goodslists(datalist,len){
        let all_goodslists='';
        for(let i=0;i<datalist.length;i++){
            content=`<li id="${datalist[i].id}">                   
                        <a href="#" class="ToDetail"><img src="../${datalist[i].imagesMain}" class="bigImg"></a>
                        <div class="showMore">
                            <p class="littleImg"><a href="#"><img src="../${datalist[i].imagesMain}"></a></p>
                            <p class="title"><a href="#"  class="ToDetail">${datalist[i].title}</a><span><a href="#">${datalist[i].intro}</a></span></p>
                          
                            <p class="all_price">
                                <span id="price1">￥ ${datalist[i].mallPrice}  </span>
                                <span id="price2"><del>  ￥ ${datalist[i].marketingPrice}</del></span>
                                <span></span>
                            </p>
                            <p id="addToCompare">
                                <a href="#">
                                <input type="checkbox" />加入对比
                                </a>
                            </p>
                            <p class="saleQty">
                            <span><i class="blue"> ${datalist[i].Sales}</i>商品销量</span>
                            <span><i class="brown"> ${datalist[i].evaluate}</i>用户评论</span>
                            </p>
                            <div class="addToCar">
                                <a href="http://localhost/1808/1809/zcx/src/html/shoppingCar.html?username='+username">加入购物车</a>
                            </div>
                        </div>
                     </li>`

            all_goodslists+=content;
            // console.log(content);
        }
        $('#goodslists').html(all_goodslists);
    }


    // 生成分页
    function createPage(datalist,len){
        console.log(len);
        // 页数
        $("#pagination2").pagination({
            currentPage: 1,
            totalPage: len,
            callback: function(current) {
               topage(current);
            }
        });
    }

    function topage(current){
        $.ajax({
            url: '../api/index.php',
            type: 'get',
            data: {'page': current},
        })
        .success(function(str) {
            let nextstr=JSON.parse(str);
            create_all_goodslists(nextstr);
        })
    }

    // 跳转到详情页
    $('#goodslists').delegate('.ToDetail','click',function(e){
        let id=$(this).closest('li').attr('id');
        id=encodeURI(id);
        if(username){
            location.href='http://localhost/1808/1809/zcx/src/html/details.html?username='+username+'&id='+id;
        }else{
            location.href='http://localhost/1808/1809/zcx/src/html/details.html?id='+id;
        }
    });

    // 出现 加入购物车 弹窗
   $('#goodslists').hover(function(e) {
     var $currentLi=$(e.target);
    $currentLi.find('.showMore').animate({'bottom': 0});
   }, function(e) {
     var $currentLi=$(e.target);
       $currentLi.find('.showMore').animate({'bottom': -115});
   });

   // 加入商品到购物车
   $('#goodslists').delegate('.addToCar','click',function(e){
        let id=$(this).closest('li').attr('id');
        id=encodeURI(id);
        // 发送请求获取当前商品
       let current_goods='';
        // 发送请求获取数据库所有数据，生成页面
        $.ajax({
            url: '../api/index.php',
            type: 'get',
            data: {'id': id},
        })
        .success(function(str) {
            current_goods=JSON.parse(str);
            current_goods=current_goods[0];
            sendToCar(current_goods);
            init();
        });

            // 再次发送请求写入购物车数据库
            function sendToCar(current_goods){
                let new_current_goods=JSON.stringify(current_goods);
                $.ajax({
                    url: '../api/shoppingCar.php',
                    type: 'get',
                    data: {'current_goods':new_current_goods},
                })
                .success(function(str) {
                    all_shopping_goods=JSON.parse(str);
                    renderCar(all_shopping_goods);
                });
            }


            // 飞入购物车效果
            let $currentImg=$(this).parent().parent().find('.bigImg');
            console.log($currentImg);
    });
   
    // 生成购物车页面
    init();
    function init(){
        $.ajax({
            url: '../api/shoppingCar.php',
            type: 'get',
            data: {'all': 'all'},
        })
        .success(function(str) {
            init_goods=JSON.parse(str);
            renderCar(init_goods);
        });
    }

    // 购物车弹窗的商品显示
    function renderCar(all_shopping_goods){
            if(all_shopping_goods==''){
                $('#shoppingBox').html('<p class="nothing">暂无商品</p>');
            }else{
                let allprice=0;
                $('.shoppingBox').html(all_shopping_goods.map(function(index, elem) {
                    let imgurl=index.imagesMain.replace('imagesgoodslists','');
                    let qtys = index.qty*1+1;
                        allprice+=index.mallPrice*qtys;
                        return `<li id="${index.id}">
                                    <a href="#"><img class="carImg" src="../images/goodslists/${imgurl}"/></a>
                                    <p class="carTitle"><a href="#">${index.title}</a></p>
                                    <p class="carPrice">
                                        <span>${index.mallPrice} </span>
                                        <span>&times;${index.qty*1+1}</span>
                                    </p>
                                    <span class="carDel"><a href="#">X</a></span>
                                </li>
                        `
                    }).join(''));
                $('.allprice').html('￥'+allprice.toFixed(2));
            }
    }

    // 删除单个商品
    $('main').delegate('.carDel', 'click', function() {
        // 找到id，发送到到数据库
        let delId=$(this).closest('li').attr('id');
        console.log(delId);
        $.ajax({
            url: '../api/shoppingCar.php',
            type: 'get',
            data: {'delId': delId},
        })
        .success(function(str) {
            // 重新渲染
            init();
        })
    });
})