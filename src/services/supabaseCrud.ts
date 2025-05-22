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

// ----------------------
// Vendor Compliance CRUD
// ----------------------
export type VendorCompliance = {
  complianceid?: number;
  vendorid: number;
  compliancetype: string;
  compliancenumber: string;
  issuedate: string;
  expirydate: string;
  documentlink?: string;
};

const VENDORCOMPLIANCE_TABLE = 'vendorcompliance';

export const getVendorCompliances = async (): Promise<VendorCompliance[]> => {
  const { data, error } = await supabase.from<VendorCompliance>(VENDORCOMPLIANCE_TABLE).select('*');
  if (error) throw error;
  return data || [];
};

export const createVendorCompliance = async (
  vc: VendorCompliance
): Promise<VendorCompliance> => {
  const { data, error } = await supabase.from<VendorCompliance>(VENDORCOMPLIANCE_TABLE).insert(vc).select().single();
  if (error) throw error;
  return data;
};

export const getVendorComplianceById = async (
  complianceid: number
): Promise<VendorCompliance | null> => {
  const { data, error } = await supabase.from<VendorCompliance>(VENDORCOMPLIANCE_TABLE).select('*').eq('complianceid', complianceid).single();
  if (error) throw error;
  return data;
};

export const updateVendorCompliance = async (
  complianceid: number,
  updatedData: Partial<VendorCompliance>
): Promise<VendorCompliance> => {
  const { data, error } = await supabase.from<VendorCompliance>(VENDORCOMPLIANCE_TABLE).update(updatedData).eq('complianceid', complianceid).select().single();
  if (error) throw error;
  return data;
};

export const deleteVendorCompliance = async (
  complianceid: number
): Promise<void> => {
  const { error } = await supabase.from(VENDORCOMPLIANCE_TABLE).delete().eq('complianceid', complianceid);
  if (error) throw error;
};

// ----------------------
// Purchase Orders CRUD
// ----------------------
export type PurchaseOrder = {
  ponumber?: number;
  requestdate: string;
  expecteddeliverydate: string;
  quantityordered: number;
  unitprice: number;
  deliveryterms: string;
  paymentterms: string;
  currency: string;
  postatus: string;
  productid: number;
  vendorid: number;
};

const PURCHASEORDERS_TABLE = 'purchaseorders';

export const getPurchaseOrders = async (): Promise<PurchaseOrder[]> => {
  const { data, error } = await supabase.from<PurchaseOrder>(PURCHASEORDERS_TABLE).select('*');
  if (error) throw error;
  return data || [];
};

export const createPurchaseOrder = async (
  po: PurchaseOrder
): Promise<PurchaseOrder> => {
  const { data, error } = await supabase.from<PurchaseOrder>(PURCHASEORDERS_TABLE).insert(po).select().single();
  if (error) throw error;
  return data;
};

export const getPurchaseOrderById = async (
  ponumber: number
): Promise<PurchaseOrder | null> => {
  const { data, error } = await supabase.from<PurchaseOrder>(PURCHASEORDERS_TABLE).select('*').eq('ponumber', ponumber).single();
  if (error) throw error;
  return data;
};

export const updatePurchaseOrder = async (
  ponumber: number,
  updatedData: Partial<PurchaseOrder>
): Promise<PurchaseOrder> => {
  const { data, error } = await supabase.from<PurchaseOrder>(PURCHASEORDERS_TABLE).update(updatedData).eq('ponumber', ponumber).select().single();
  if (error) throw error;
  return data;
};

export const deletePurchaseOrder = async (
  ponumber: number
): Promise<void> => {
  const { error } = await supabase.from(PURCHASEORDERS_TABLE).delete().eq('ponumber', ponumber);
  if (error) throw error;
};

// ----------------------
// Inventory CRUD
// ----------------------
export type Inventory = {
  inventoryid?: number;
  productid: number;
  currentstock: number;
  reorderlevel: number;
  safetystock: number;
  preferredwarehouse: string;
  batchnumber: string;
  storageconditions: string;
  gmreference: string;
  lastupdated: string;
};

const INVENTORY_TABLE = 'inventory';

export const getInventory = async (): Promise<Inventory[]> => {
  const { data, error } = await supabase.from<Inventory>(INVENTORY_TABLE).select('*');
  if (error) throw error;
  return data || [];
};

export const createInventory = async (
  inventory: Inventory
): Promise<Inventory> => {
  const { data, error } = await supabase.from<Inventory>(INVENTORY_TABLE).insert(inventory).select().single();
  if (error) throw error;
  return data;
};

export const getInventoryById = async (
  inventoryid: number
): Promise<Inventory | null> => {
  const { data, error } = await supabase.from<Inventory>(INVENTORY_TABLE).select('*').eq('inventoryid', inventoryid).single();
  if (error) throw error;
  return data;
};

export const updateInventory = async (
  inventoryid: number,
  updatedData: Partial<Inventory>
): Promise<Inventory> => {
  const { data, error } = await supabase.from<Inventory>(INVENTORY_TABLE).update(updatedData).eq('inventoryid', inventoryid).select().single();
  if (error) throw error;
  return data;
};

export const deleteInventory = async (
  inventoryid: number
): Promise<void> => {
  const { error } = await supabase.from(INVENTORY_TABLE).delete().eq('inventoryid', inventoryid);
  if (error) throw error;
};

// ----------------------
// Logistics CRUD
// ----------------------
export type Logistics = {
  logisticsid?: number;
  ponumber: number;
  deliveryschedule: string;
  transportmode: string;
  freightresponsibility: string;
  carrierinformation: string;
  trackingnumber: string;
  deliveryconfirmation: boolean;
};

const LOGISTICS_TABLE = 'logistics';

export const getLogistics = async (): Promise<Logistics[]> => {
  const { data, error } = await supabase.from<Logistics>(LOGISTICS_TABLE).select('*');
  if (error) throw error;
  return data || [];
};

export const createLogistics = async (
  logistics: Logistics
): Promise<Logistics> => {
  const { data, error } = await supabase.from<Logistics>(LOGISTICS_TABLE).insert(logistics).select().single();
  if (error) throw error;
  return data;
};

export const getLogisticsByPonumber = async (
  ponumber: number
): Promise<Logistics | null> => {
  const { data, error } = await supabase.from<Logistics>(LOGISTICS_TABLE).select('*').eq('ponumber', ponumber).single();
  if (error) throw error;
  return data;
};

export const updateLogistics = async (
  logisticsid: number,
  updatedData: Partial<Logistics>
): Promise<Logistics> => {
  const { data, error } = await supabase.from<Logistics>(LOGISTICS_TABLE).update(updatedData).eq('logisticsid', logisticsid).select().single();
  if (error) throw error;
  return data;
};

export const deleteLogistics = async (
  logisticsid: number
): Promise<void> => {
  const { error } = await supabase.from(LOGISTICS_TABLE).delete().eq('logisticsid', logisticsid);
  if (error) throw error;
};

// ----------------------
// Quality Control CRUD
// ----------------------
export type QualityControl = {
  qcid?: number;
  ponumber: number;
  qcchecklist: string;
  qcstatus: string;
  inspectiondate: string;
  inspectorname: string;
  testcertificates: string;
};

const QUALITYCONTROL_TABLE = 'qualitycontrol';

export const getQualityControls = async (): Promise<QualityControl[]> => {
  const { data, error } = await supabase.from<QualityControl>(QUALITYCONTROL_TABLE).select('*');
  if (error) throw error;
  return data || [];
};

export const createQualityControl = async (
  qc: QualityControl
): Promise<QualityControl> => {
  const { data, error } = await supabase.from<QualityControl>(QUALITYCONTROL_TABLE).insert(qc).select().single();
  if (error) throw error;
  return data;
};

export const getQualityControlById = async (
  qcid: number
): Promise<QualityControl | null> => {
  const { data, error } = await supabase.from<QualityControl>(QUALITYCONTROL_TABLE).select('*').eq('qcid', qcid).single();
  if (error) throw error;
  return data;
};

export const updateQualityControl = async (
  qcid: number,
  updatedData: Partial<QualityControl>
): Promise<QualityControl> => {
  const { data, error } = await supabase.from<QualityControl>(QUALITYCONTROL_TABLE).update(updatedData).eq('qcid', qcid).select().single();
  if (error) throw error;
  return data;
};

export const deleteQualityControl = async (
  qcid: number
): Promise<void> => {
  const { error } = await supabase.from(QUALITYCONTROL_TABLE).delete().eq('qcid', qcid);
  if (error) throw error;
};
