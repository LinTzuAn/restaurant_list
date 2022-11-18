# 餐廳清單
這是一個可供使用者儲存喜愛餐廳的網站

## 功能描述
- 使用者可以新增餐廳資料

- 使用者可以修改餐廳資料

- 使用者可以刪除餐廳資料

- 使用者可以在首頁看到所有餐廳與它們的簡單資料：
  - 餐廳照片
  - 餐廳名稱
  - 餐廳分類
  - 餐廳評分
  
- 使用者可以再點進去看餐廳的詳細資訊：
  - 類別
  - 地址
  - 電話
  - 描述
  - 圖片
  
- 使用者可以透過搜尋餐廳名稱來找到特定的餐廳

- 使用者可以透過搜尋餐廳類別來找到特定的餐廳

- 使用者可以選擇讓餐廳依照名稱、類別、或地區排序

## 環境建置與需求
- express @4.18.2
- express-handlebars @3.0.0

## 安裝與執行
以下將說明你該如何啟動此專案

1. 打開你的終端機，clone 此專案至本機電腦
```
git clone https://github.com/LinTzuAn/restaurant_list.git
```

2. 進入專案資料夾
```
cd restaurant_list
```

3. 安裝套件
```
npm install
```

4. 新增.env檔案，並設置資料庫連線字串
```
MONGODB_URL=mongodb+srv://<account>:<password>@cluster0.<xxxxx>.mongodb.net/<table>?retryWrites=true&w=majority
```

5. 安裝seed
```
npm run seed
```

6. 執行
```
npm run dev
```

終端機顯示 `Express is running on localhost:3000` 即啟動完成，至[http://localhost:3000](http://localhost:3000)即可開始使用。

## 使用工具
- Visual Studio Code 
- Node 14.16.0
- express 4.18.3
- express-handlebars 3.0.0
- mongodb
- mongoose 5.9.7
