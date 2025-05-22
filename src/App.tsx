import { useState } from 'react';
import { VendorForm } from './Components/VendorForm';
import { ProductForm } from './Components/ProductForm';
import { ProductList } from './Components/ProductList';

const App = () => {
  const [vendorId, setVendorId] = useState<number | null>(null);

  return (
    <div>
      {!vendorId ? (
        <VendorForm onVendorCreated={setVendorId} />
      ) : (
        <>
          <ProductForm vendorId={vendorId} />
          <ProductList vendorId={vendorId} />
        </>
      )}
    </div>
  );
};

export default App;
