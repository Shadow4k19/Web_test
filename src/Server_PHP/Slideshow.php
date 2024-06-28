<?php 
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Origin");
    header("Content-Type: application/json; charset=UTF-8");

class slideshowAPI {
    private $pdo;
    private $data;
    
    public function __construct($pdo, $data) {
        $this->pdo = $pdo;
        $this->data = $data;
    }
    
    public function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
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
            if (!isset($_GET['id'])) {
                $sql = "SELECT * FROM slideshow";
                $stmt = $this->pdo->prepare($sql);
                $stmt->execute();
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            } else {
                $id = $_GET['id'];
                $sql = "SELECT * FROM slideshow WHERE id = :id";
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
        } catch (PDOException $e) {
            $this->sendResponse(array("message" => $e->getMessage(), "status" => 400), 400);
        }
    }

    private function handlePost() {
        try {
            if (isset($_FILES['url'])) {
                $img = $_FILES['url'];
                $targetDir = "IMG_SLIDESHOW/";
                $targetFile = $targetDir . basename($img['name']);
                $uploadOk = 1;
                $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    
                $check = getimagesize($img['tmp_name']);
                if ($check !== false) {
                    $uploadOk = 1;
                } else {
                    $error = "File is not an image.";
                    $this->sendResponse(array("message" => $error), 400);
                    return;
                }
    
                if (file_exists($targetFile)) {
                    $error = "File already exists.";
                    $this->sendResponse(array("message" => $error), 400);
                    return;
                }
    
                if ($img['size'] > 500000) {
                    $error = "File is too large.";
                    $this->sendResponse(array("message" => $error), 400);
                    return;
                }
    
                if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
                    $error = "Only JPG, JPEG, PNG files are allowed.";
                    $this->sendResponse(array("message" => $error), 400);
                    return;
                }
    
                if ($uploadOk == 0) {
                    $error = "Sorry, your file was not uploaded.";
                    $this->sendResponse(array("message" => $error), 400);
                    return;
                } else {
                    if (move_uploaded_file($img['tmp_name'], $targetFile)) {
                        $url = $targetFile;
                        $stmt = $this->pdo->prepare("INSERT INTO slideshow (url) VALUES (:url)");
                        $stmt->bindParam(":url", $url);
                        $stmt->execute();
                        $response = array("message" => "Create Complete", "status" => 201);
                        $this->sendResponse($response, 201);
                    } else {
                        $error = "Sorry, there was an error uploading your file.";
                        $this->sendResponse(array("message" => $error), 400);
                        return;
                    }
                }
            } else {
                $response = array("message" => "Please fill all details", "status" => 400);
                $this->sendResponse($response, 400);
            }
        } catch (PDOException $e) {
            $this->sendResponse(array("message" => $e->getMessage(), "status" => 400), 400);
        }
    }    
    private function handlePut() {
        try {
            if ($this->data && isset($this->data->id) && isset($this->data->url)) {
                $id = $this->data->id;
                $imgData = $this->data->url;
    
                $imgPath = "IMG_SLIDESHOW/slideshow_$id.jpg";
                $imgFile = fopen($imgPath, "wb");
                fwrite($imgFile, base64_decode($imgData));
                fclose($imgFile);
    
                $stmt = $this->pdo->prepare("UPDATE slideshow SET url = :url WHERE id = :id");
                $stmt->bindParam(":id", $id);
                $stmt->bindParam(":url", $imgPath);
                $stmt->execute();
    
                $response = array("message" => "Update Complete", "status" => 200);
                $this->sendResponse($response, 200);
            } else {
                $response = array("message" => "Please fill all details", "status" => 400);
                $this->sendResponse($response, 400);
            }
        } catch (PDOException $e) {
            $this->sendResponse(array("message" => $e->getMessage(), "status" => 400), 400);
        }
    }

    private function handleDelete() {
        try {
            if (isset($this->data->id)) {
                $id = $this->data->id;
                $checkdata = $this->pdo->prepare("SELECT * FROM slideshow WHERE id = :id");
                $checkdata->bindParam(":id", $id);
                $checkdata->execute();
                $row = $checkdata->fetch(PDO::FETCH_ASSOC);
                if ($row) {
                    // Delete the image file from the server
                    $imagePath = $row['url'];
                    if (file_exists($imagePath)) {
                        unlink($imagePath);
                    }
                    
                    $stmt = $this->pdo->prepare("DELETE FROM slideshow WHERE id = :id");
                    $stmt->bindParam(":id", $id);
                    $stmt->execute();
                    
                    $response = array("message" => "Delete Complete", "status" => 200);
                    $this->sendResponse($response, 200);
                } else {
                    $response = array("message" => "Data Not Found", "status" => 404);
                    $this->sendResponse($response, 404);
                }
            } else {
                $response = array("message" => "Please provide the ID", "status" => 400);
                $this->sendResponse($response, 400);
            }
        } catch (PDOException $e) {
            $this->sendResponse(array("message" => $e->getMessage(), "status" => 400), 400);
        }
    }    

    private function sendResponse($response, $status) {
        header("Content-Type: application/json");
        echo json_encode($response);
    }
}

require_once "Server.php";

$data = null;
$data = json_decode(file_get_contents("php://input"));
session_start();
$api = new slideshowAPI($pdo, $data);
$api->handleRequest();
?>
