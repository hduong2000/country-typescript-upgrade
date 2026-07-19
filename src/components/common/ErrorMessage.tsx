// src/components/common/ErrorMessage.tsx

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void; // Dấu '?' nghĩa là prop này không bắt buộc phải truyền
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-6 text-center">
      {/* 1. TODO: Render một Icon cảnh báo (hoặc một emoji ví dụ: ⚠️, ❌) với kích thước lớn, màu đỏ/cam */}
      <div className="text-5xl text-red-500 mb-4">⚠️</div>
      
      {/* 2. TODO: Tiêu đề thông báo lỗi (ví dụ: "Đã xảy ra lỗi!") viết đậm */}
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Đã xảy ra lỗi!</h2>
      
      {/* 3. TODO: Hiển thị biến {message} được truyền vào bằng text màu xám nhạt hơn */}
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
      
      {/* 4. TODO: Kiểm tra nếu có prop `onRetry` thì hiển thị một Button "Thử lại". 
          Style button này nổi bật một chút (có hover, rounded, bg-blue hoặc bg-red) */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Thử lại
        </button>
      )}
      
    </div>
  );
}