import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '../components/shared/Header';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Toaster } from 'sonner';
import {
  Authorization,
  Favorites,
  Home,
  NotFound,
  Orders,
  Product,
  ProductCreate,
  ProductEdit,
  Registration,
  Users,
} from '@/pages';

export const App = () => {
  useAuth();
  console.log(import.meta.env.MODE);
  console.log(import.meta.env.VITE_API_URL);
  console.log(import.meta.env);
  

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Authorization />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products/create" element={<ProductCreate />} />
        <Route path="/products/:id/edit" element={<ProductEdit />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
};
