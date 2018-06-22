<?php

include("model/db.php"); 
include("model/PHPMailer-master/PHPMailerAutoload.php");
include("model/mail.php");

if( isset($_REQUEST['user']) ){
    $db = new DB() ;
    $table = "attend";//guest
    $user = $_REQUEST['user'];
    $company = $_REQUEST['company'];
    $country = $_REQUEST['area'];
    $email = $_REQUEST['mail'];
    $tel = $_REQUEST['tel'];

    $data = array(
        "section" => 1,//活動一
        "username" => $user ,
        "company" => $company,
        "country" => $country,
        "email" => $email,
        "phone" => $tel,
        "createdtime" => time()
        );
    $checkColumn =array("id");
    $result = $db -> DB_Update($table,$data,$checkColumn);

    // send mail by phpMailer
    $mail = new Mail();
    $title = "測試標題擎昊科技mail";
    $content = "恭喜你註冊成功";
    // $recipient = "jack@ne-plus.com"; //傳送地址
    // $recipientName = "熊XX";
    echo $mail -> sendMail($title,$content,$email,$user,$tel,$company);
    // echo true;
}else{
    echo false;
}

?>