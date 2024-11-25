 <div align="center">
 <h1> Báo cáo cuối kỳ </h1>
 </div>

**1.1. Tên đề tài:** Ứng dụng tạo, quản lý ghi chú nhắc nhở

**1.2. Thành viên nhóm:**

| MSSV          | Tên thành viên     |
| ------------- | ------------------ |
| 2174801030168 | Nguyễn Đỗ Gia Phú  |
| 2174801030059 | Đặng Đăng Đăng     |
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
  - _vite:_ Công cụ build nhanh, hỗ trợ Hot Module Replacement (HMR) (reload lại ứng dụng khi code thay đổi), build hiệu quả, cấu hình đơn giản, và tương thích với các framework hiện đại như React, Vue.

- **Server-side:**
  - _@typescript-eslint/eslint-plugin:_ Plugin mở rộng ESLint hỗ trợ TypeScript.
  - _@typescript-eslint/parser:_ Parser (bộ phân tích cú pháp) TypeScript cho ESLint.
  - _drizzle-kit:_ SQL ORM và công cụ di chuyển dữ liệu.
  - _eslint:_ Công cụ kiểm tra và sửa cú pháp mã nguồn.
  - _eslint-config-airbnb-typescript:_ Quy tắc ESLint chuẩn Airbnb + TypeScript.
  - _eslint-import-resolver-typescript:_ Hỗ trợ import mô đun TypeScript cho ESLint.
  - _eslint-plugin-import:_ Plugin ESLint quản lý import/export.
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
npm i @clerk/clerk-react @formkit/drag-and-drop @tanstack/react-query @uploadthing/react axios class-variance-authority clsx cmdk date-fns framer-motion lucide-react react-day-picker react-dom react-hook-form react-router-dom tailwind-merge tailwind-animate uploadthing

# Thêm tailwind và thư viện hỗ trợ
npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p

# Khỏi tạo shadcn:
npx shadcn@latest init
```

- Server-side:
