import { useState } from 'react';
import { createVendor } from '../services/supabaseCrud';

interface Props {
  onVendorCreated: (id: number) => void;
}

export const VendorForm: React.FC<Props> = ({ onVendorCreated }) => {
  const [vendor, setVendor] = useState({ vendorname: '', email: '', phone: '', address: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await createVendor(vendor);
      alert('Vendor created!');
      onVendorCreated(data[0].id); // pass vendor ID to parent
    } catch (error) {
      console.error(error);
      alert('Error creating vendor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Vendor</h2>
      <input placeholder="Vendor Name" onChange={(e) => setVendor({ ...vendor, vendorname: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setVendor({ ...vendor, email: e.target.value })} />
      <input placeholder="Phone" onChange={(e) => setVendor({ ...vendor, phone: e.target.value })} />
      <input placeholder="Address" onChange={(e) => setVendor({ ...vendor, address: e.target.value })} />
      <button type="submit">Submit</button>
    </form>
  );
};
