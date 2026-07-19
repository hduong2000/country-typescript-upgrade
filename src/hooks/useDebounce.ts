// src/hooks/useDebounce.ts
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  // 1. Tạo state lưu trữ giá trị đã debounce
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 2. Thiết lập setTimeout để cập nhật giá trị sau khoảng delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 3. Hàm Cleanup: Clear timeout nếu value thay đổi trước khi delay kết thúc
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  // 4. Trả về giá trị đã debounce
  return debouncedValue;
}