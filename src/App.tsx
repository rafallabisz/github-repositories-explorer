import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from 'routes';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import MainLayout from 'layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={'*'} element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;