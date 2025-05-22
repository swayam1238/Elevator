import { useState } from 'react';
import VendorForm from './Components/VendorForm';
import ProductForm from './Components/ProductForm';
import VendorComplianceForm from './Components/VendorComplianceForm';
import PurchaseOrderForm from './Components/PurchaseOrderForm';
import InventoryForm from './Components/InventoryForm';
import LogisticsForm from './Components/LogisticsForm';
import QualityControlForm from './Components/QualityControlForm';
import './App.css';

const App = () => {
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [productId, setProductId] = useState<number | null>(null);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  // Step 1: choose or add vendor
  if (!vendorId) {
    return <VendorForm onVendorCreated={setVendorId} />;
  }

  // Step 2: under a vendor, manage compliance and products
  if (vendorId && !productId) {
    return (
      <div>
        <button className="back-btn" onClick={() => setVendorId(null)}>
          &larr; Back to Vendors
        </button>
        <VendorComplianceForm vendorId={vendorId} />
        <ProductForm vendorId={vendorId} onProductSelect={setProductId} />
      </div>
    );
  }

  // Step 3: under a product, manage inventory and purchase orders
  if (vendorId && productId && !orderNumber) {
    return (
      <div>
        <button className="back-btn" onClick={() => setProductId(null)}>
          &larr; Back to Products
        </button>
        <InventoryForm productId={productId} />
        <PurchaseOrderForm
          vendorId={vendorId}
          productId={productId}
          onOrderSelect={setOrderNumber}
        />
      </div>
    );
  }

  // Step 4: under a purchase order, manage logistics and quality control
  if (vendorId && productId && orderNumber) {
    return (
      <div>
        <button className="back-btn" onClick={() => setOrderNumber(null)}>
          &larr; Back to Orders
        </button>
        <LogisticsForm ponumber={orderNumber} />
        <QualityControlForm ponumber={orderNumber} />
      </div>
    );
  }

  return null;
};

export default App;