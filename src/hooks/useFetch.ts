// src/hooks/useFetch.ts
import { useState, useEffect } from "react";

// Hook này dùng Generic <T> để có thể tái sử dụng cho bất kỳ kiểu dữ liệu nào (Mảng quốc gia hoặc 1 quốc gia)
export function useFetch<T>(
  apiCall: (...args: any[]) => Promise<T>,
  dependencies: any[] = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Biến flag để tránh lỗi Memory Leak nếu component bị unmount trước khi API trả về
    let isMounted = true;

    const fetchData = async () => {
      // 1. TODO: Bật trạng thái loading lên true, reset error về null trước khi gọi API
      setLoading(true);
      setError(null);
      try {
        const result = await apiCall(...dependencies);
        if (isMounted) {
          setData(result);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        // 5. TODO: Nếu isMounted bằng true, tắt trạng thái loading (set về false)
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, dependencies); // Hook sẽ chạy lại mỗi khi các giá trị trong dependencies thay đổi

  // Trả về các state để Component bên ngoài sử dụng
  return { data, loading, error, setData };
}
