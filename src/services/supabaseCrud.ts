import { createClient } from '@supabase/supabase-js';

// 🔐 Replace with your actual values
const supabaseUrl = 'https://muqxcwnftaphlmxtwmem.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11cXhjd25mdGFwaGxteHR3bWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MDE1OTAsImV4cCI6MjA2Mjk3NzU5MH0.ZqPXXwk9XQ-8vqt8d4dJL5AlTbYmxhvLKBQ4RcHsE6o';

export const supabase = createClient(supabaseUrl, supabaseKey);

// ----------------------
// Vendor CRUD
// ----------------------
export type Vendor = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export const createVendor = async (vendor: Vendor) => {
  const { data, error } = await supabase.from('vendors').insert(vendor).select();
  if (error) throw error;
  return data;
};

export const getVendors = async () => {
  const { data, error } = await supabase.from('vendors').select('*');
  if (error) throw error;
  return data;
};

// ----------------------
// Product CRUD
// ----------------------
export type Product = {
  id?: number;
  name: string;
  category: string;
  price: number;
  vendor_id: number;
};

export const createProduct = async (product: Product) => {
  const { data, error } = await supabase.from('products').insert(product).select();
  if (error) throw error;
  return data;
};

export const getProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data;
};

// ✅ Get products for a specific vendor
export const getProductsByVendor = async (vendorId: number) => {
  const { data, error } = await supabase.from('products').select('*').eq('vendor_id', vendorId);
  if (error) throw error;
  return data;
};

