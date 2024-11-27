 <div align="center">
 <h1> Báo cáo cuối kỳ </h1>
 </div>

**1.1. Tên đề tài:** Ứng dụng tạo, quản lý ghi chú nhắc nhở

**1.2. Thành viên nhóm:**

| MSSV          | Tên thành viên     |
| ------------- | ------------------ |
| 2174801030168 | Nguyễn Đỗ Gia Phú  |
| 217480103i0059 | Đặng Đăng Đăng     |
| 2174801030168 | Nguyễn Đỗ Nhật Tân |

**2. Giới thiệu công nghệ:**

- **Client side:**

  - _@clerk/clerk-react:_ Cung cấp các hàm xác thực và quản lý người dùng (authentication) của nền tảng Clerk cho React (như firebase auth)
  - _@formkit/drag-and-drop:_ Hỗ trợ tính năng kéo-thả (drag-and-drop) cho các components React
  - _@radix-ui/react:_ Bộ công cụ UI nâng cao với các thành phần có khả năng truy cập tốt (accessible components)
  - _@tanstack/react-query:_ Quản lý dữ liệu server-side hiệu quả với các tính năng như caching, refetching, và state management
  - _@uploadthing/react:_ Cung cấp giải pháp tải lên tệp (file upload) trong React
  - _axios:_ Thư viện HTTP client để gửi yêu cầu API với cú pháp đơn giản
  - _class-variance-authority:_ Giúp tạo các classnames CSS một cách linh hoạt và dễ kiểm soát
  - _clsx:_ Xử lý và kết hợp các classnames có điều kiện
  - _cmdk:_ Tạo các giao diện command menu phong cách giống macOS Spotlight
  - _date-fns:_ Thư viện xử lý ngày giờ (date-time) đơn giản và hiệu quả
  - _framer-motion:_ Cung cấp công cụ tạo hiệu ứng chuyển động (animations) mượt mà trong React
  - _lucide-react:_ Bộ biểu tượng (icon) hiện đại, tùy chỉnh, và nhẹ cho React
  - _react:_ Thư viện xây dựng giao diện người dùng (UI) phổ biến
  - _react-day-picker:_ Công cụ tạo và tùy chỉnh lịch (date picker) trong React
  - _react-dom:_ Kết xuất (render) các thành phần React vào DOM
  - _react-hook-form:_ Hỗ trợ quản lý form và xử lý input hiệu quả bằng hooks
  - _react-router-dom:_ Thư viện điều hướng (routing) cho React
  - _tailwind-merge:_ Kết hợp các class Tailwind CSS, ưu tiên các giá trị cụ thể hơn
  - _tailwindcss-animate:_ Cung cấp các hiệu ứng chuyển động được cấu hình sẵn cho Tailwind CSS
  - _uploadthing:_ Thư viện hỗ trợ tải lên tệp với cấu hình đơn giản.
  - _socket.io-client:_ Cho phép kết nối và làm việc với một kênh WebSocket
  - _vite:_ Công cụ build nhanh, hỗ trợ Hot Module Replacement (HMR) (reload lại ứng dụng khi code thay đổi), build hiệu quả, cấu hình đơn giản, và tương thích với các framework hiện đại như React, Vue.

- **Server-side:**
  - _@clerk/express:_ Cung cấp middleware xác thực người dùng và quản lý tài khoản cho Express.
  - _@neondatabase/serverless:_ Thư viện để kết nối và làm việc với cơ sở dữ liệu PostgreSQL trên nền tảng cloud của Neon.
  - _cors:_ Giúp xử lý các yêu cầu CORS (Cross-Origin Resource Sharing) trong ứng dụng web.
  - _dotenv:_ Quản lý các biến môi trường trong ứng dụng Node.js từ file .env.
  - _drizzle-orm:_ Thư viện ORM (Object Relational Mapping) cho phép tương tác với cơ sở dữ liệu SQL trong JavaScript.
  - _express:_ Framework phổ biến để xây dựng ứng dụng web nhanh chóng và dễ dàng trong Node.js.
  - _helmet:_ Tăng cường bảo mật HTTP cho ứng dụng Express bằng cách thêm các header bảo mật.
  - _module-alias:_ Cho phép định nghĩa đường dẫn riêng cho các module trong Node.js để dễ dàng import.
  - _morgan:_ Middleware cho Express, giúp ghi nhận các yêu cầu HTTP để theo dõi và phân tích.
  - _node-cron:_ Thư viện tạo tác vụ được hẹn giờ trước trong Node.js.
  - _socket.io:_ Thư viện giúp xây dựng các ứng dụng thời gian thực, hỗ trợ WebSockets trong Node.js.
  - _uploadthing:_ Giúp tải lên và xử lý tệp trong các ứng dụng web với tính năng đơn giản và mạnh mẽ.
  - _drizzle-kit:_ Một số công cụ hỗ trợ SQL ORM của drizzle-orm.
  - _eslint:_ Công cụ kiểm tra và sửa cú pháp mã nguồn.
  - _jest:_ Framework test mạnh mẽ cho JavaScript.
  - _nodemon:_ Tự động restart ứng dụng Node.js khi thay đổi file.
  - _prettier:_ Công cụ định dạng mã tự động.
  - _supertest:_ Kiểm thử HTTP request/response cho ứng dụng Node.js.
  - _ts-jest:_ Chạy thư viện Jest với TypeScript.
  - _ts-node:_ Chạy mã TypeScript mà không đi qua bước build bằng ts compile.
  - _typescript:_ Ngôn ngữ mở rộng tính năng cho JavaScript.

**3. Hướng dẫn cài đặt:**

- Client-side:

```bash
npm install @clerk/clerk-react @formkit/drag-and-drop @tanstack/react-query @uploadthing/react axios class-variance-authority clsx cmdk date-fns framer-motion lucide-react react-day-picker react-dom react-hook-form react-router-dom tailwind-merge tailwindcss-animate uploadthing socket.io-client

# Thêm tailwind và thư viện hỗ trợ
npm install -D tailwindcss postcss autoprefixer
```

- Server-side:

```bash
npm install @clerk/express @neondatabase/serverless cors dotenv drizzle-orm express helmet module-alias morgan node-cron socket.io uploadthing
npm install -D drizzle-kit eslint jest nodemon prettier supertest ts-jest ts-node typescript
```

**4. Hướng dẫn tạo dự án mới:**

- Client-side:

Khởi tạo một dự án React mới bằng Vite:

```bash
npm create vite@latest <tên dự án> -- --template react-ts
```

- Server-side:

Trước khi khởi tạo thì tạo sẵn một thư mục rồi truy cập vào thư mục đấy bằng Visual Studio Code

```bash
# Nếu muốn dùng lệnh:
mkdir <tên thư mục>
cd <tên thư mục>
# Sau khi đã bên trong thư mục thì gõ:
npm init -y
```

**5. Cấu trúc dự án sau khi tạo và cấu hình dự án:**

- Client-side:

B1: Hướng dẫn cấu hình Tailwind hoặc có thể xem tại https://tailwindcss.com/docs/guides/vite

```bash
npx tailwindcss init -p
```

Sau câu lệnh đấy thì sẽ có một file tailwind.config.js và vào đấy thay đổi cấu hình như sau:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Sau khi cấu hình xong file tailwind.config.js thì cần xoá một số file có sẵn như file App.css (xoá cả import trong App.tsx)

Xoá xong ta vào file index.css xoá hết nội dung và copy các dòng sau vào file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

B2: Cấu hình shadcn để sử dụng components từ shadcn (không bắt buộc):
Có thể xem hướng dẫn tại trang: https://ui.shadcn.com/docs/installation/vite

```bash
# Khởi tạo shadcn
npx shadcn@latest init -d
# Sau đấy ta thêm một số component
npx shadcn@latest add avatar badge button calendar card command dialog dropdown-menu input popover separator toast
```

Và thế là đã hoàn thành cấu hình client dự án từ đầu

- Server-side:

B1: Tạo một thư mục src để chứa các file của dự án, và tạo thêm cả một file đầu vào tên index.ts

B2: Vào package.json chỉnh sửa khoá "main" và "script" thành như sau:

```json
{
  // ...
  "main": "src/index.ts",
  "scripts": {
    "start": "ts-node src/index.ts",
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start:dist": "node dist/src/index.js",
    "lint": "eslint --fix src test",
    "test": "jest",
    "typecheck": "tsc --noEmit"
  }
  // ...
}
```

B3: Ta thêm file cấu hình tsconfig.json tại thư mục gốc:

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "sourceMap": true,
    "target": "esnext",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true,
    "strict": true,
    "skipLibCheck": true,
    "baseUrl": "./src"
  }
}
```

B4: Ta viết một dự án express nhỏ trong file index.ts

```typescript
import express, { Application } from "express";
const PORT = 3000;

const app: Application = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
```

Và thế là đã hoàn thành cấu hình server dự án từ đầu

**6. Cú pháp chạy dự án:**

```bash
# Cho client và cả server (sau khi cấu hình hoặc clone từ git)
npm run dev
```

**7. Giải thích Data được sử dụng trong dự án:**

Bảng Ghi chú (Notes):

- id: Id ghi chú
- title: Tên ghi chú
- content: Nội dung ghi chú
- isPinned: Ghi chú có được ghim hay không?
- isArchived: Ghi chú có được lưu trữ không?
- remindAt: Ghi chú được nhắc nhở lúc nào
- images: Ảnh của ghi chú
- createdAt: Thời điểm ghi chú được tạo
- createdBy: Người dùng tạo ghi chú
- updatedAt: Thời điểm ghi chú được cập nhật nội dung

Bảng Nhãn (Tags):

- id: Id nhãn
- name: Tên nhãn
- createdAt: Thời điểm nhãn được tạo
- createdBy: Người dùng tạo nhãn
- updatedAt: Thời điểm nhãn được cập nhật nội dung

Bảng quan hệ giữa Ghi chú và Nhãn (NotesToTags):

- noteId: Id khoá ngoại của Ghi chú
- tagId: Id khoá ngoại của Nhãn

**8. Source code:**

- Client:
  Link: https://github.com/NDJafu/scheduling-web
- Server:
  Link: https://github.com/NDJafu/kys-api
- Folder Tree:
  - Scheduling-web: Main folder chứa dự án
    - fonts: chứa file fonts sử dụng trong dự án
    - src: 
      - apis: Chứa các hàm để tương tác với API bên ngoài.
      - assets: Lưu trữ các tài sản tĩnh như hình ảnh, font, icon.
      - components: Nơi ở của các thành phần giao diện tái sử dụng.
      - constants: Đựng các hằng số, giá trị không đổi trong ứng dụng.
      - contexts: Quản lý dữ liệu toàn cục, chia sẻ giữa các component.
      - hooks: Tạo các hàm tùy chỉnh để tái sử dụng logic.
      - layouts: Xác định cấu trúc chung của các trang.
      - lib: Lưu trữ các thư viện hoặc hàm hỗ trợ chung.
      - pages: Chứa các trang riêng lẻ của ứng dụng.