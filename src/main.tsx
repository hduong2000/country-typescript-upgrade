// src/main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Khởi tạo một instance Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Dữ liệu sẽ được coi là "Fresh" trong 5 phút, không fetch lại bừa bãi
      refetchOnWindowFocus: false, // Không tự động gọi lại API khi user tab ra ngoài rồi quay lại
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);