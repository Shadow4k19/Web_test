<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Origin");
    header("Content-Type: application/json; charset=UTF-8");

class contentAPI {
    private $pdo;
    private $data;

    public function __construct($pdo, $data) {
        $this->pdo = $pdo;
        $this->data = $data;
    }

    public function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        switch($method) {
            case 'GET':
                $this->handleGet();
                break;
            case 'POST':
                $this->handlePost();
                break;
            case 'PUT':
                $this->handlePut();
                break;
            case 'DELETE':
                $this->handleDelete();
                break;
            default:
                $this->sendResponse(array("message" => "Invalid Method", "status" => 405), 405);
                break;
        }
    }

    private function handleGet() {
        try {
            if(!isset($_GET['id'])) {
                $sql = "SELECT * FROM content";
                $stmt = $this->pdo->prepare($sql);
                $stmt->execute();
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            } else {
                $id = $_GET['id'];
                $sql = "SELECT * FROM content WHERE id = :id";
                $stmt = $this->pdo->prepare($sql);
                $stmt->bindParam(":id", $id);
                $stmt->execute();
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            if($data){
                $response = array("message" => "Successfully", "data" => $data, "status" => 200);
                $this->sendResponse($response, 200);
            }else{
                $response = array("message" => "Not Found", "status" => 404);
                $this->sendResponse($response, 404);
            }
        } catch(PDOException $e) {
            $this->sendResponse(array("message" => $e->getMessage()), 400);
        }
    }

    private function handlePost() {
        try {
            if(isset($_POST['title']) && isset($_FILES['img']) && isset($_POST['content'])&& isset($_POST['content2']) && isset($_POST['content3']) && isset($_POST['content4'])) {
                $title = $_POST['title'];
                $img = $_FILES['img'];
                $content = $_POST['content'];
                $targetDir = "IMG_CONTENT/";
                $targetFile = $targetDir . basename($img['name']);
                $uploadOk = 1;
                $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
                $content2 = $_POST['content2'];
                $content3 = $_POST['content3'];
                $content4 = $_POST['content4'];
                
                $check = getimagesize($img['tmp_name']);
                if($check !== false){
                    $uploadOk = 1;
                }else{
                    $error = "File is not an image";
                    $this->sendResponse(array("message" => $error), 400);
                    return;
                }

                /*if(file_exists($targetDir)){
                    $error = "File already exists";
                    $this->sendResponse(array("message" => $error), 400);
                    return;
                }*/

                if($img['size'] > 500000){
                    $error = "File is too large";
                    $this->sendResponse(array("message" => $error), 400);
                    return;
                }

                if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "JPEG"){
                    $error = "Only JPG, JPEG, PNG files are allowed.";
                    $this->sendResponse(array("message" => $error), 400);
                    return;
                }

                if ($uploadOk == 0) {
                    $error = "Sorry, your file was not uploaded.";
                    $this->sendResponse(array("message" => $error), 400);
                    return;
                }else{
                    if(move_uploaded_file($img['tmp_name'], $targetFile)){
                        $sql = "INSERT INTO content (title, img, content) VALUES (:title, :img, :content, :content2, :content3, :content4)";
                        $stmt = $this->pdo->prepare($sql);
                        $url = $targetFile;
                        $stmt->bindParam(":title", $title);
                        $stmt->bindParam(":img", $url);
                        $stmt->bindParam(":content", $content);
                        $stmt->bindParam(":content2", $content2);
                        $stmt->bindParam(":content3", $content3);
                        $stmt->bindParam(":content4", $content4);
                        $stmt->execute();
                        $response = array("message" => "Create sucessfuly", "status" => 201);
                        $this->sendResponse($response, 201);
                    }else{
                        $response = array("message" => "Error can't upload new data", status => 400);
                        $this->sendResponse($response, 400);
                    }
                }
            } else {
                $response = array("message" => "Please fill in all details");
                $this->sendResponse($response, 400);
            }
        } catch(PDOException $e) {
            $this->sendResponse(array("message" => $e->getMessage()), 400);
        }
    }

    private function handlePut() {
        try {
            if(isset($this->data->title) && isset($this->data->id) && isset($this->data->content) && isset($this->data->content2)&& isset($this->data->content3)&& isset($this->data->content4)) {
                $id = $this->data->id;
                $title = $this->data->title;
                $content = $this->data->content;
                $content2 = $this->data->content2;
                $content3 = $this->data->content3;
                $content4 = $this->data->content4;

                $targetFile = null;
                if(isset($this->data->img)) {
                    $img = $this->data->img;
                    $targetDir = "IMG_CONTENT";
                    $targetFile = "$targetDir/content_$id.jpg";

                    $imageData = base64_decode($img);
                    if ($imageData === false) {
                        $this->sendResponse(array("message" => "Base64 decoding failed.", "status" => 400), 400);
                        return;
                    }

                    if (strlen($imageData) > 500000) {
                        $this->sendResponse(array("message" => "File is too large.", "status" => 400), 400);
                        return;
                    }
                    $finfo = finfo_open(FILEINFO_MIME_TYPE);
                    $mimeType = finfo_buffer($finfo, $imageData);
                    finfo_close($finfo);

                    if (!in_array($mimeType, ["image/jpeg", "image/png"])) {
                        $this->sendResponse(array("message" => "Only JPG, JPEG, PNG files are allowed.", "status" => 400), 400);
                        return;
                    }
                }

                $checkdata = $this->pdo->prepare("SELECT * FROM content WHERE id = :id");
                $checkdata->bindParam(":id", $id, PDO::PARAM_INT);
                $checkdata->execute();
                $row = $checkdata->fetch(PDO::FETCH_ASSOC);

                if (!$row) {
                    $this->sendResponse(array("message" => "Record not found", "status" => 404), 404);
                    return;
                }

                if ($targetFile) {
                    if (!empty($row['img']) && file_exists($row['img'])) {
                        unlink($row['img']);
                    }
                    if (file_put_contents($targetFile, $imageData) === false) {
                        $this->sendResponse(array("message" => "Failed to save image.", "status" => 500), 500);
                        return;
                    }
                }
                $sql = "UPDATE content SET title = :title, content = :content, content2 = :content2, content3 = :content3, content4 = :content4";
                if ($targetFile) {
                    $sql .= ", img = :img";
                }
                $sql .= " WHERE id = :id";
                $stmt = $this->pdo->prepare($sql);
                $stmt->bindParam(":title", $title);
                $stmt->bindParam(":content", $content);
                $stmt->bindParam(":content2", $content2);
                $stmt->bindParam(":content3", $content3);
                $stmt->bindParam(":content4", $content4);
                if ($targetFile) {
                    $stmt->bindParam(":img", $targetFile);
                }
                $stmt->bindParam(":id", $id, PDO::PARAM_INT);
                $stmt->execute();

                $this->sendResponse(array("message" => "Update successful" , "status" => 200), 200);
            } else {
                $this->sendResponse(array("message" => "Please fill in all details", "status" => 400), 400);
            }
        } catch (PDOException $e) {
            $this->sendResponse(array("message" => $e->getMessage(), "status" => 500), 500);
        }
    }
    
    private function handleDelete() {
        try {
            if(isset($this->data->id)) {
                $id = $this->data->id;
                $check = $this->pdo->prepare("SELECT * FROM content WHERE id = :id");
                $check->bindParam(":id", $id, PDO::PARAM_INT);
                $check->execute();
                $row = $check->fetch(PDO::FETCH_ASSOC);
                if($row) {
                    $imgPath = $row['img'];
                    if(file_exists($imgPath)){
                        unlink($imgPath);
                    }
                    $stmt = $this->pdo->prepare("DELETE FROM content WHERE id = :id");
                    $stmt->bindParam(":id", $id, PDO::PARAM_INT);
                    $stmt->execute();
                    $response = array("message" => "Delete complete", "status" => 200);
                   
                    $this->sendResponse($response, 200);
                } else {
                    $response = array("message" => "Record not found", "status" => 404);
                    $this->sendResponse($response, 404);
                }
            } else {
                $response = array("message" => "Please provide an ID", "status" => 400);
                $this->sendResponse($response, 400);
            }
        } catch(PDOException $e) {
            $this->sendResponse(array("message" => $e->getMessage(), "status" => 400), 400);
        }
    }

    private function sendResponse($response, $status) {
        //http_response_code($status);
        echo json_encode($response);
        exit();
    }
}

# Main
require_once "Server.php";

$data = null;
$data = json_decode(file_get_contents("php://input"));
session_start();
$api = new contentAPI($pdo, $data);
$api->handleRequest();
?>
