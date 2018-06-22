$(document).ready(function(){
    function deviceCheck(){
        if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            // alert("使用行動裝置!");
            navPosition();
            navScroll();
        }
        else {
            // alert("使用桌上型裝置!");
            hover();
            navPosition();
            navScroll();
        }
    }
    deviceCheck();
    
    $(window).resize(function(){
        navPosition();
        windowWidth();
    });

    function windowWidth(){
        if( $(window).outerWidth() < 992 ){
            $("#rwdFlexJs").addClass('d-flex flex-column');
            $("#rwdFlexJs > div").eq(0).addClass('order-2');
            $("#rwdFlexJs > div").eq(1).addClass('order-1');
            $("#rwdFlexJs > div").eq(2).addClass('order-3');
        }else{
            $("#rwdFlexJs").removeClass('d-flex flex-column');
            $("#rwdFlexJs > div").eq(0).removeClass('order-2');
            $("#rwdFlexJs > div").eq(1).removeClass('order-1');
            $("#rwdFlexJs > div").eq(2).removeClass('order-3');
        }
        if( $(window).outerWidth() < 768 ){
            $("#rwdFooterJs").removeClass('d-flex justify-content-between');
            $("#rwdFooterJs .brand-footer").addClass('d-flex justify-content-around');
            $("#rwdFooterJs .copyright").removeClass('d-flex align-items-center');
        }else{
            $("#rwdFooterJs").addClass('d-flex justify-content-between');
            $("#rwdFooterJs .brand-footer").removeClass('d-flex justify-content-around');
            $("#rwdFooterJs .copyright").addClass('d-flex align-items-center');
        }
        if( $(window).outerWidth() < 576 ){
            $("#rwdBtnJs").addClass('flex-column');
            $("#rwdBtnJs .gBtn").removeClass('flex-fill');           
        }else{
            $("#rwdBtnJs").removeClass('flex-column');
            $("#rwdBtnJs .gBtn").addClass('flex-fill');  
        }
    }
    windowWidth();

    function hover(){
        $(".gBtn").hover(function(){
            $(this).addClass('hover');
        },function(){
            $(this).removeClass('hover');
        });
    } 

    var s2Position ,s4Position, s5Position;

    function navPosition(){
        s2Position = $("#s2").offset().top;
        s4Position = $("#s4").offset().top;
        s5Position = $("#s5").offset().top;
    }


    function navScroll(){              
        $(window).scroll(function(){
            const navArray = [...$("li.nav-item > a.nav-link")]; //index -> 0: #s2 , 1: #s4 , 2: #s5 
            if( $(window).scrollTop() >= (s5Position - 1 ) ){
                var changeActiveIndex =  navArray.findIndex(function( item , index ){
                        return item.hash == "#s5";
                });
                navActive(changeActiveIndex);
                goTop( true );
            }else if( $(window).scrollTop() >= (s4Position - 1)  &&  $(window).scrollTop() < (s5Position - 1) ){
                var changeActiveIndex =  navArray.findIndex(function( item , index ){
                        return item.hash == "#s4";
                });
                navActive(changeActiveIndex);
                goTop( true ) ;
            }else if( $(window).scrollTop() < (s4Position - 1) ){
                var changeActiveIndex =  navArray.findIndex(function( item , index ){
                        return item.hash == "#s2";
                });
                navActive(changeActiveIndex);
                goTop( false );
            }
        })

        function navActive( key ){
            var navCheck = $("li.nav-item").eq(key);
            var className = navCheck.attr('class');
            if( !className.match('active') ){
                $("li.nav-item").removeClass('active');
                navCheck.addClass('active');
            }
        }

        $("li.nav-item > a.nav-link").on('click', function(event) {
            event.preventDefault();
            // console.log(this.hash);
            $("html, body").animate({
                "scrollTop": $(this.hash).offset().top},500); 
                
            //rwd nav btn 開關
            navToggleMenu();    
        })
    }

    //rwd nav btn 
    $("button.navbar-toggler").click(function(){
        var className = $(".navbar-collapse").attr('class'); 
        if( className.match('show') ){
            // console.log('close');
            $(".hb-line").removeClass('hb-line-transition');
            $('.line-down').removeClass('line-down-transition');
            $('.line-up').removeClass('line-up-transition');
        }else{
            // console.log('show');
            $(".hb-line").addClass('hb-line-transition');
            $('.line-down').addClass('line-down-transition');
            $('.line-up').addClass('line-up-transition');
        } 
    });
    function navToggleMenu(){
        var windowWidth =  $(window).outerWidth();
        if( windowWidth < 992 ){
            $("button.navbar-toggler").click();
        }
    }

    // -----gotop----
	 $(".gotop").click(function(){
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    });
    function goTop( toggle ){
        if( toggle ){
            $(".gotop").addClass('gotopShow');
        }else{
            $(".gotop").removeClass('gotopShow');
        }     
    }


    $("#successShare").click(function(){
        window.open('https://www.kx.com.tw/%E6%88%90%E5%8A%9F%E6%A1%88%E4%BE%8B/');
    });
    $("#productService").click(function(){
        window.open('https://www.kx.com.tw/%E7%94%A2%E5%93%81%E8%88%87%E6%9C%8D%E5%8B%99/');
    });
    $("#joinGrop").click(function(){
        window.open('https://www.facebook.com/kinmaxofficial/?fref=ts 	');
    });

    var sendTime = 0;
    // vue.js
    var app = new Vue({
        el:"#app",
        data:{
            form : [
                {id : "user" , value : "" , check : false , isKeyup : false},
                {id : "mail" ,  value : "" , check : false , isKeyup : false},
                {id : "company" , value : "" , check : false , isKeyup : false},
                {id : "tel" , value : "" , check : false , isKeyup : false},
                {id : "area" , value : "" , check : true, isKeyup : true},
            ],
            isTrigger : false, 
            isFancyCheck : false, 
        },
        methods : {
            valueCheck : function( key ){
                var vm = this ;
                switch ( key ) {
                    case 'user' :
                        vm.form[0].isKeyup = true;
                        if( vm.form[0].value.trim() != '' ){
                            vm.form[0].check = true;
                        }else{
                            vm.form[0].check = false;
                        }
                    break;
                    case 'mail' :
                        vm.form[1].isKeyup = true;
                        var emailReg = /^\w+((-\w+)|(\.\w+))*\@[\w]+((\.|-)[\w]+)*\.[A-Za-z]+$/; 
                        if( vm.form[1].value.trim() != '' && emailReg.test(vm.form[1].value.trim()) ){
                            vm.form[1].check = true;
                        }else{
                            vm.form[1].check = false;
                        }
                    break;
                    case 'tel' :
                        vm.form[3].isKeyup = true;
                        if( vm.form[3].value.trim() != ''){
                            vm.form[3].check = true;
                        }else{
                            vm.form[3].check = false;
                        }
                    break;
                    case 'company' :
                        vm.form[2].isKeyup = true;
                        if( vm.form[2].value.trim() != '' ){
                            vm.form[2].check = true;
                        }else{
                            vm.form[2].check = false;
                        }
                    break;
                    default :
                        // console.log('錯誤') ;
                    break; 
                }
            },
            send:function(){
                var vm = this ;
                const checkStatus =  vm.form.every(function( item , i ){
                    return item.check == true && item.isKeyup == true
                });
                const formData = vm.form.map(function( obj , index , array ){
                    return {
                        "id" : obj.id,
                        "value" : obj.value
                    }
                });
                if( checkStatus ){
                    if( vm.isFancyCheck ){

                        if(!grecaptcha.getResponse(widgetId)){ //機器人 驗證
                            swal({
                                title: "請確認已勾選我不是機器人",
                                icon: "warning",
                            });
                            return ;
                        }
                        
                        if(sendTime == 0){
                            sendAjax(formData);
                        }
                    }else{
                        swal({
                            title: "請確認已詳讀相關注意事項",
                            icon: "warning",
                        }).then(function( confirm ){
                            $("#defaultCheck1").select();
                        });
                    }
                }else{
                    vm.form.forEach(function( obj , index , array){
                        obj.isKeyup = true;
                    });
                    swal({
                        title: "請確認資料是否填寫完整",
                        icon: "error",
                    });
                }
            }
        }
    });


    //****************************ajax 後端*********************************
    function sendAjax( data ){
        sendTime = 1; //設定sendTime
        // console.log(data);
        var formData = new FormData();
        data.forEach(function(item , i ){
            formData.append(item.id, item.value);
        });
        
        $.ajax({
			url : "form.php",
			data : formData,
			type : "post",
            cache : false,
            processData: false,  // tell jQuery not to process the data
		    contentType: false,  // tell jQuery not to set contentType
		    success : function(result){
                // console.log(result);
                swal({
                    title: "謝謝您填寫以下資料，我們將有專業人員與您聯繫，共創美好合作關係！",
                    icon: "success",
                }).then(function(confrim){ 
                    location.reload();
                });
		    },
		    error : function(error){
		    	console.log('傳送失敗');
		    } 
		});
    }
   
    // tweenMax
    //S1
    TweenMax.fromTo('#s1 .title', 1, {
        x : -20,
        y: -100,
        opacity: 0
    }, {
        x: 0,
        y: 0,
        opacity: 1,
        ease: Power3.easeOut
    });
    TweenMax.fromTo('#s1 .pImg', 1, {
        x: -150,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        delay : 1,
        ease: Elastic.easeOut.config(1, 0.3)
    });
    //s2
    var controller = new ScrollMagic.Controller();  //設定控制器    

    var wp = new TimelineMax().staggerFromTo('#s2 .sp-area', 0.5, {  //用timelinMax()的plug
            y: -50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
        }, 0.2); 

    var scene = new ScrollMagic.Scene({  //建立場景物件及屬性
            triggerElement: "#s2",
            reverse: true,
            offset:'100px',
        })
        .setTween(wp)  //設定與上面場景連接點
        // .addIndicators() // add indicators (requires plugin) //測試偵測點
        .addTo(controller);

    //S3
    var wp2 = new TimelineMax().staggerFromTo('.tM3 .sp-support-box', 0.5, {  //用timelinMax()的plug
            y: -50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
        }, 0.2);
    var scene2 = new ScrollMagic.Scene({
            triggerElement:".tM3",
            offset:"0px"
        })
        .setTween(wp2)  //設定與上面場景連接點
        // .addIndicators({name:'bgc start'})
        .addTo(controller);    

});



var verifyCallback = function(response) {
// alert(response);
};
var widgetId = '' ;
var onloadCallback = function() {
// Renders the HTML element with id 'example1' as a reCAPTCHA widget.
// The id of the reCAPTCHA widget is assigned to 'widgetId1'.
    widgetId = grecaptcha.render('g-recaptcha', {
        'sitekey' : '6LfFEl8UAAAAAMkm8zZFanVY-pycg0dm75ESKweD',
        'callback' : verifyCallback
    });
};