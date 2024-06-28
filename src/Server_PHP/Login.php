<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Origin");
    header("Content-Type: application/json; charset=UTF-8");

    class LoginAPI {
        private $data;
        private $pdo;

        public function __construct($data){
            $this->data = $data;
            $this->connectDB();
        }

        private function connectDB(){
            try{
                require_once "Server.php";
                $this->pdo = $pdo;
            } catch (PDOException $e) {
                $this->sendResponse(array("success" => false, "message" => "Error: " . $e->getMessage()), 500);
                exit;
            }
        }

        public function authenticate(){
            if($this->validateInput()){
                $this->checkUser();
            } else {
                $this->sendResponse(array("success" => false, "message" => "All input required"), 400);
            }
        }

        private function validateInput(){
            if (isset($this->data->username) && isset($this->data->password)) {
                return true;
            } else {
                error_log('Missing input: ' . json_encode($this->data));
                return false;
            }
        }

        private function checkUser(){
            try {
                $username = $this->data->username;
                $password = $this->data->password;

                $stmt = $this->pdo->prepare("SELECT * FROM user WHERE username = :username AND password = :password");
                $stmt->bindParam(":username", $username);
                $stmt->bindParam(":password", $password);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    $user = $stmt->fetch();
                    $response = array(
                        "id" => $user['id'],
                        "username" => $user['username'],
                        "role" => $user['role'],
                        "status" => 200,
                    );
                    $this->sendResponse($response, 200);
                } else {
                    $this->sendResponse(array("message" => "Wrong username or Password.", "status" => 404), 404);
                }
            } catch (PDOException $e) {
                $this->sendResponse(array("success" => false, "message" => "Connection failed: " . $e->getMessage()), 500);
            } finally {
                $this->pdo = null; 
            }
        }

        private function sendResponse($response, $status) {
            //http_response_code($status);
            echo json_encode($response);
        }
    }

    $data = json_decode(file_get_contents("php://input"));
    session_start();
    if($data){
        $api = new LoginAPI($data);
        $api->authenticate();
    }
?>
