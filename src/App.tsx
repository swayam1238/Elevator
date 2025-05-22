import { useState } from 'react';
import VendorForm from './Components/VendorForm';
import ProductForm from './Components/ProductForm';

const App = () => {
  const [vendorId, setVendorId] = useState<number | null>(null);

  return (
    <div>
      {!vendorId ? (
        <VendorForm onVendorCreated={setVendorId} />
      ) : (
        <>
          <button className="back-btn" onClick={() => setVendorId(null)}>
            &larr; Back to Vendors
          </button>
          <ProductForm vendorId={vendorId} />
        </>
      )}
    </div>
  );
};

export default App;
