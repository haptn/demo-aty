import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,   // default: staleTime = 0
      keepPreviousData: true,   // có nên dùng trong tất cả trường hợp ko nhỉ?
      refetchOnWindowFocus: false,
      retry: 1    // try to refetch API only 1 time after failure
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
