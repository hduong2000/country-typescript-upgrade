// src/components/common/Loader.tsx

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-transparent">
      {/* Vòng xoay Spinner */}
      <div className="animate-spin rounded-full border-4 border-gray-200 border-t-blue-500 dark:border-zinc-700 dark:border-t-blue-400 h-16 w-16" />
      
      {/* Text hiển thị (Nằm ngoài vòng xoay) */}
      <p className="mt-4 text-sm font-medium text-gray-500 dark:text-zinc-400 animate-pulse">
        Đang tải dữ liệu...
      </p>
    </div>
  );
}