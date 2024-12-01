import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from 'routes';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import MainLayout from 'layouts/MainLayout';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'utils/api';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path={'*'} element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
