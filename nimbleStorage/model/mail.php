<?php  

class Mail extends PHPMailer{

	public function __construct(){
// =====建立mail sever 環境 init(sender,mailServerSetting)========
		$this->IsSMTP(); //設定使用SMTP方式寄信   
		$this->SMTPAuth = true; //設定SMTP需要驗證   
		$this->SMTPSecure = "ssl";
		$this->Host = "smtp.gmail.com"; //設定SMTP主機   
		$this->Port = 465; //設定SMTP埠位，預設為25埠  
		$this->CharSet = "utf8"; //設定郵件編碼   
		 
		$this->Username = "kinmax.event@gmail.com"; //設定驗證帳號   
		$this->Password = "KXsharon888"; //設定驗證密碼 

		$this->From = "customer@kx.com.tw"; //設定寄件者信箱   
		$this->FromName = "擎昊科技"; //設定寄件者姓名 

		$this->WordWrap = 20; //每50行斷一次行
		$this->IsHTML(true); //設定郵件內容為HTML

	}
	public function sendMail($title,$content,$recipient,$recipientName,$telephone,$company){
// ===== send(title,body,recipient)========
		$this->Subject = sprintf("%s",$title); //設定郵件標題

		//設定信件內容
		$content = sprintf('<p>擎昊科技 - Nimble Storage 新註冊客戶：<span></span></p><p>姓名：<span>%s</span></p><p>公司：<span>%s</span></p><p>Email：<span>%s</span></p><p>電話：<span>%s</span></p>',$recipientName,$company,$recipient,$telephone);
		$this->Body = $content; //設定郵件內容 

		$this->AddAddress("ekx@kx.com.tw", ""); //設定收件者郵件及名稱 
		$this->AddBCC('sharon@indextw.com', 'Sharon'); // 密件副本
		$this->AddBCC('avy@kx.com.tw', 'Avy'); // 密件副本
		$this->AddBCC('joe.hung@tgilive.com', 'Joe'); // 密件副本

		//信件寄送
		if(!$this->Send()) {   
			echo "Mailer Error: " . $this->ErrorInfo;   
			// return false;
		} else {   
			// echo "Message sent!";   
			return true;
		}
	}
}

?>	
