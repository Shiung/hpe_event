<?php
// DB
define('DB_DRIVER', 'mysqli');
define('DB_HOSTNAME', 'localhost');
// define('DB_USERNAME', 'kxeventweb'); //root
// define('DB_PASSWORD', 'yNGy7da7TCtm24Xw'); //root
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'root');
define('DB_DATABASE', 'web_kxevent');
define('DB_PORT', '3306');
/** 建立資料表時預設的文字編碼 */
define('DB_CHARSET', 'utf8');
/** 資料庫對照型態。如果不確定請勿更改。 */
define('DB_COLLATE', 'utf8_unicode_ci');

date_default_timezone_set("Asia/Taipei");

class DB {
	public $db_host ;
	public $database ;
	public $user ;
	public $password ;
	public $pdo ;
	public $error;
	public $lastId;

	public function __construct() {
		try {
			$this->db_host = DB_HOSTNAME;
	        $this->database = DB_DATABASE;
	        $this->user = DB_USERNAME;
	        $this->password = DB_PASSWORD;
	        $dsn = "mysql:host=".$this->db_host.";port=3306;dbname=".$this->database.";charset=utf8";
	        $options = array(
						PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION
						);
	        $this->pdo = new PDO($dsn,$this->user,$this->password,$options);
		} catch (Exception $e) {
			$this->error = $e->getMessage();
		}
        
    }

    public function DB_Query($sql,$dic=null){
    	$pdo = $this->pdo;
		$object = $pdo->prepare($sql);
		if($dic){
			foreach ($dic as $key=>$value) {
				$object -> bindValue($key,$value);
			}
		}
		if($object -> execute()){
			return 	$object -> fetchAll(PDO::FETCH_ASSOC);
		}else{
			$this->error = $object -> errorCode();
			return false;
		}

    }

    public function DB_Update($table,$data,$checkColumn){
    	$pdo = $this->pdo;

		//<---insert into table (keys) values (values) on duplicate key update key=value-->;
		$updateBind = array();
    	foreach ($data as $key => $value) {
    		if(!in_array($key,$checkColumn)){
    			array_push($updateBind,$key."=:".$key);
    		}
    	}
    	$sql = sprintf("insert into %s ( %s ) values(:%s ) ON DUPLICATE KEY UPDATE %s",$table,implode(',',array_keys($data)),implode(',:',array_keys($data)),implode(",",$updateBind));
    	$object = $pdo->prepare($sql);
    	// print_r($data) ;
    	foreach ($data as $key => $value) {
    		$object->bindValue(":".$key,$value);	
    	}	
    	$result = $object->execute();
    	$this->lastId = $pdo->lastInsertId();
    	// echo $this->lastId;
    	if(!$result){
    		$this->error = $object->errorCode();
    		return false;
    	}else{
    		return $result;
    	}
    }
}  
?>