# FoodCareAPI
Đây là repo về API viết ở phía server, sử dụng hệ cơ sở dữ liệu là Microsoft SQL SERVER.
## 1. Cài thư viện
* Dễ dàng cài đặt với câu lệnh `npm install`
## 2. Cấu trúc thư mục phát triển
- `app`: Nơi viết chương trình chính ở đây.
- `app\configs`: Nơi chứa các thiết lập hệ thống như Database connection info, thiết lập hệ thống.
- `app\controllers`: Nơi cung cấp các method được yêu cầu bởi người dùng. 
- `app\models`: Nơi chứa các thành phần lưu trữ (variable) và các method liên quan đến nó.
- `app\routes`: Nơi điều hướng đường dẫn url của API.
- `app\schemas`: Chưa nghĩ ra cái này để làm gì vì mình dùng mssqlserver chứ không phải mongoDB :))
- `app\schemas`: Nơi chứa các method kiểm tra dữ liệu.
- `bin`: Nơi chứa các system files.
- `node_modules`: chứa các modules của node được cài vào hệ thống.
## 3. Chạy hết thống
* Dễ dàng ta thực hiện câu lệnh `npm start` tại cửa sổ dòng lệnh.

## 4. Requirement
- NodeJS
- SQL SERVER (có server lo rùi, vì cài đủ rùi :)) )

## 5. Bản quyền

Bản quyền thuộc nhóm lập trình backend: Nguyễn An Hưng - Nguyễn Cửu Nhật Quang thuộc trường ĐH Bách Khoa, Đại Học Đà Nẵng.