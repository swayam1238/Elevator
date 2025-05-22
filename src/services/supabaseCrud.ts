// supabaseCrud.ts
import { createClient } from '@supabase/supabase-js';

// 🔐 Replace with your actual values
const supabaseUrl = 'https://muqxcwnftaphlmxtwmem.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11cXhjd25mdGFwaGxteHR3bWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MDE1OTAsImV4cCI6MjA2Mjk3NzU5MH0.ZqPXXwk9XQ-8vqt8d4dJL5AlTbYmxhvLKBQ4RcHsE6o';

export const supabase = createClient(supabaseUrl, supabaseKey);

// ----------------------
// Vendor CRUD
// ----------------------
// vendors_crud.ts



export type Vendor = {
  vendorid?: number;
  vendorname: string;
  email?: string;
  phone?: string;
  address?: string;
  bankdetails?: string;
  gstnumber?: string;
};

export const getVendors = async (): Promise<Vendor[]> => {
  const { data, error } = await supabase.from('Vendors').select('*');
  if (error) throw error;
  return data as Vendor[];
};

export const createVendor = async (vendor: Vendor): Promise<Vendor> => {
  const { data, error } = await supabase.from('Vendors').insert([vendor]).select().single();
  if (error) throw error;
  return data as Vendor;
};

export const getVendorById = async (vendorid: number): Promise<Vendor | null> => {
  const { data, error } = await supabase.from('Vendors').select('*').eq('vendorid', vendorid).single();
  if (error) throw error;
  return data as Vendor;
};

export const updateVendor = async (vendorid: number, updatedData: Partial<Vendor>): Promise<Vendor> => {
  const { data, error } = await supabase.from('Vendors').update(updatedData).eq('vendorid', vendorid).select().single();
  if (error) throw error;
  return data as Vendor;
};

export const deleteVendor = async (vendorid: number): Promise<void> => {
  const { error } = await supabase.from('Vendors').delete().eq('vendorid', vendorid);
  if (error) throw error;
};


// ----------------------
// Product CRUD
// ----------------------
// products_crud.ts

export type Product = {
  productid?: number;
  productname: string;
  productcategory?: string;
  unitofmeasurement?: string;
  productspecifications?: string;
  quantity?: number;
  vendorid: number;
};

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from('Products').select('*');
  if (error) throw error;
  return data as Product[];
};

export const createProduct = async (product: Product): Promise<Product> => {
  const { data, error } = await supabase.from('Products').insert([product]).select().single();
  if (error) throw error;
  return data as Product;
};

export const getProductById = async (productid: number): Promise<Product | null> => {
  const { data, error } = await supabase.from('Products').select('*').eq('productid', productid).single();
  if (error) throw error;
  return data as Product;
};

export const updateProduct = async (productid: number, updatedData: Partial<Product>): Promise<Product> => {
  const { data, error } = await supabase.from('Products').update(updatedData).eq('productid', productid).select().single();
  if (error) throw error;
  return data as Product;
};

export const deleteProduct = async (productid: number): Promise<void> => {
  const { error } = await supabase.from('Products').delete().eq('productid', productid);
  if (error) throw error;
};

// inventory_crud.ts

export type Inventory = {
  inventoryid?: number;
  productid: number;
  currentstock?: number;
  reorderlevel?: number;
  safetystock?: number;
  preferredwarehouse?: string;
  batchnumber?: string;
  storageconditions?: string;
  grnreference?: string;
  lastupdated?: string;
};

export const getInventory = async (): Promise<Inventory[]> => {
  const { data, error } = await supabase.from('Inventory').select('*');
  if (error) throw error;
  return data as Inventory[];
};

export const createInventory = async (inventory: Inventory): Promise<Inventory> => {
  const { data, error } = await supabase.from('Inventory').insert([inventory]).select().single();
  if (error) throw error;
  return data as Inventory;
};

export const getInventoryById = async (inventoryid: number): Promise<Inventory | null> => {
  const { data, error } = await supabase.from('Inventory').select('*').eq('inventoryid', inventoryid).single();
  if (error) throw error;
  return data as Inventory;
};

export const updateInventory = async (inventoryid: number, updatedData: Partial<Inventory>): Promise<Inventory> => {
  const { data, error } = await supabase.from('Inventory').update(updatedData).eq('inventoryid', inventoryid).select().single();
  if (error) throw error;
  return data as Inventory;
};

export const deleteInventory = async (inventoryid: number): Promise<void> => {
  const { error } = await supabase.from('Inventory').delete().eq('inventoryid', inventoryid);
  if (error) throw error;
};

// purchase_orders_crud.ts


export type PurchaseOrder = {
  ponumber?: number;
  requestdate?: string;
  expecteddeliverydate?: string;
  quantityordered?: number;
  unitprice?: number;
  deliveryterms?: string;
  paymentterms?: string;
  currency?: string;
  postatus?: string;
  productid: number;
  vendorid: number;
};

export const getPurchaseOrders = async (): Promise<PurchaseOrder[]> => {
  const { data, error } = await supabase.from('PurchaseOrders').select('*');
  if (error) throw error;
  return data as PurchaseOrder[];
};

export const createPurchaseOrder = async (po: PurchaseOrder): Promise<PurchaseOrder> => {
  const { data, error } = await supabase.from('PurchaseOrders').insert([po]).select().single();
  if (error) throw error;
  return data as PurchaseOrder;
};

export const getPurchaseOrderById = async (ponumber: number): Promise<PurchaseOrder | null> => {
  const { data, error } = await supabase.from('PurchaseOrders').select('*').eq('ponumber', ponumber).single();
  if (error) throw error;
  return data as PurchaseOrder;
};

export const updatePurchaseOrder = async (ponumber: number, updates: Partial<PurchaseOrder>): Promise<PurchaseOrder> => {
  const { data, error } = await supabase.from('PurchaseOrders').update(updates).eq('ponumber', ponumber).select().single();
  if (error) throw error;
  return data as PurchaseOrder;
};

export const deletePurchaseOrder = async (ponumber: number): Promise<void> => {
  const { error } = await supabase.from('PurchaseOrders').delete().eq('ponumber', ponumber);
  if (error) throw error;
};

// qualitycontrol_crud.ts


export type QualityControl = {
  qcid?: number;
  ponumber: number;
  qcchecklist?: string;
  qcstatus?: string;
  inspectiondate?: string;
  inspectorname?: string;
  testcertificates?: string;
};

export const getQualityControls = async (): Promise<QualityControl[]> => {
  const { data, error } = await supabase.from('QualityControl').select('*');
  if (error) throw error;
  return data as QualityControl[];
};

export const createQualityControl = async (qc: QualityControl): Promise<QualityControl> => {
  const { data, error } = await supabase.from('QualityControl').insert([qc]).select().single();
  if (error) throw error;
  return data as QualityControl;
};

export const getQualityControlById = async (qcid: number): Promise<QualityControl | null> => {
  const { data, error } = await supabase.from('QualityControl').select('*').eq('qcid', qcid).single();
  if (error) throw error;
  return data as QualityControl;
};

export const updateQualityControl = async (qcid: number, updatedData: Partial<QualityControl>): Promise<QualityControl> => {
  const { data, error } = await supabase.from('QualityControl').update(updatedData).eq('qcid', qcid).select().single();
  if (error) throw error;
  return data as QualityControl;
};

export const deleteQualityControl = async (qcid: number): Promise<void> => {
  const { error } = await supabase.from('QualityControl').delete().eq('qcid', qcid);
  if (error) throw error;
};


// vendorcompliance_crud.ts


export type VendorCompliance = {
  complianceid?: number;
  vendorid: number;
  compliancetype: string;
  compliancenumber?: string;
  issuedate?: string;
  expirydate?: string;
  documentlink?: string;
};

export const getVendorCompliances = async (): Promise<VendorCompliance[]> => {
  const { data, error } = await supabase.from('VendorCompliance').select('*');
  if (error) throw error;
  return data as VendorCompliance[];
};

export const createVendorCompliance = async (compliance: VendorCompliance): Promise<VendorCompliance> => {
  const { data, error } = await supabase.from('VendorCompliance').insert([compliance]).select().single();
  if (error) throw error;
  return data as VendorCompliance;
};

export const getVendorComplianceById = async (complianceid: number): Promise<VendorCompliance | null> => {
  const { data, error } = await supabase.from('VendorCompliance').select('*').eq('complianceid', complianceid).single();
  if (error) throw error;
  return data as VendorCompliance;
};

export const updateVendorCompliance = async (complianceid: number, updates: Partial<VendorCompliance>): Promise<VendorCompliance> => {
  const { data, error } = await supabase.from('VendorCompliance').update(updates).eq('complianceid', complianceid).select().single();
  if (error) throw error;
  return data as VendorCompliance;
};

export const deleteVendorCompliance = async (complianceid: number): Promise<void> => {
  const { error } = await supabase.from('VendorCompliance').delete().eq('complianceid', complianceid);
  if (error) throw error;
};


// logistics_crud.ts


export type Logistics = {
  logisticsid?: number;
  ponumber: number;
  deliveryschedule?: string;
  transportmode?: string;
  freightresponsibility?: string;
  carrierinformation?: string;
  trackingnumber?: string;
  deliveryconfirmation?: boolean;
};

export const getLogistics = async (): Promise<Logistics[]> => {
  const { data, error } = await supabase.from('Logistics').select('*');
  if (error) throw error;
  return data as Logistics[];
};

export const createLogistics = async (logistics: Logistics): Promise<Logistics> => {
  const { data, error } = await supabase.from('Logistics').insert([logistics]).select().single();
  if (error) throw error;
  return data as Logistics;
};

export const getLogisticsById = async (logisticsid: number): Promise<Logistics | null> => {
  const { data, error } = await supabase.from('Logistics').select('*').eq('logisticsid', logisticsid).single();
  if (error) throw error;
  return data as Logistics;
};

export const updateLogistics = async (logisticsid: number, updates: Partial<Logistics>): Promise<Logistics> => {
  const { data, error } = await supabase.from('Logistics').update(updates).eq('logisticsid', logisticsid).select().single();
  if (error) throw error;
  return data as Logistics;
};

export const deleteLogistics = async (logisticsid: number): Promise<void> => {
  const { error } = await supabase.from('Logistics').delete().eq('logisticsid', logisticsid);
  if (error) throw error;
};
