// supabaseCrud.ts
import { supabase } from '../../utils/supabaseClient';

// ----------------------
// Vendor CRUD
// ----------------------
export type Vendor = {
  vendorid?: number;
  vendorname: string;
  email?: string;
  phone?: string;
  address?: string;
  bankdetails?: string;
  gstnumber?: string;
};

const VENDOR_TABLE = 'vendors';
export const getVendors = async (): Promise<Vendor[]> => {
  const { data, error } = await supabase.from<Vendor>(VENDOR_TABLE).select('*');
  if (error) throw error;
  return data || [];
};

export const createVendor = async (vendor: Vendor): Promise<Vendor> => {
  const { data, error } = await supabase.from<Vendor>(VENDOR_TABLE).insert(vendor).select().single();
  if (error) throw error;
  return data;
};

export const getVendorById = async (vendorid: number): Promise<Vendor | null> => {
  const { data, error } = await supabase.from<Vendor>(VENDOR_TABLE).select('*').eq('vendorid', vendorid).single();
  if (error) throw error;
  return data;
};

export const updateVendor = async (
  vendorid: number,
  updatedData: Partial<Vendor>
): Promise<Vendor> => {
  const { data, error } = await supabase.from<Vendor>(VENDOR_TABLE).update(updatedData).eq('vendorid', vendorid).select().single();
  if (error) throw error;
  return data;
};

export const deleteVendor = async (vendorid: number): Promise<void> => {
  const { error } = await supabase.from(VENDOR_TABLE).delete().eq('vendorid', vendorid);
  if (error) throw error;
};

// ----------------------
// Product CRUD
// ----------------------
export type Product = {
  productid?: number;
  productname: string;
  productcategory?: string;
  unitofmeasurement?: string;
  productspecifications?: string;
  quantity?: number;
  vendorid: number;
};

const PRODUCT_TABLE = 'products';
export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from<Product>(PRODUCT_TABLE).select('*');
  if (error) throw error;
  return data || [];
};

export const createProduct = async (product: Product): Promise<Product> => {
  const { data, error } = await supabase.from<Product>(PRODUCT_TABLE).insert(product).select().single();
  if (error) throw error;
  return data;
};

export const getProductById = async (
  productid: number
): Promise<Product | null> => {
  const { data, error } = await supabase.from<Product>(PRODUCT_TABLE).select('*').eq('productid', productid).single();
  if (error) throw error;
  return data;
};

export const updateProduct = async (
  productid: number,
  updatedData: Partial<Product>
): Promise<Product> => {
  const { data, error } = await supabase.from<Product>(PRODUCT_TABLE).update(updatedData).eq('productid', productid).select().single();
  if (error) throw error;
  return data;
};

export const deleteProduct = async (productid: number): Promise<void> => {
  const { error } = await supabase.from(PRODUCT_TABLE).delete().eq('productid', productid);
  if (error) throw error;
};

// Add other table CRUD functions as needed
