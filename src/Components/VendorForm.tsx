import React, { useEffect, useState } from 'react';
import {
  type Vendor,
  getVendors,
  createVendor,
  updateVendor,
  deleteVendor,
} from '../services/supabaseCrud';

const VendorManager: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [vendorForm, setVendorForm] = useState<Omit<Vendor, 'vendorid'>>({
    vendorname: '',
    email: '',
    phone: '',
    address: '',
    bankdetails: '',
    gstnumber: '',
  });

  const [editingVendorId, setEditingVendorId] = useState<number | null>(null);

  const fetchVendors = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getVendors();
      setVendors(data);
    } catch (err) {
      setError('Failed to load vendors');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // Add vendor handler
  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await createVendor(vendorForm);
      alert('Vendor added!');
      setVendorForm({
        vendorname: '',
        email: '',
        phone: '',
        address: '',
        bankdetails: '',
        gstnumber: '',
      });
      fetchVendors();
    } catch (err) {
      setError('Failed to add vendor');
      console.error(err);
    }
  };

  // Delete vendor handler
  const handleDeleteVendor = async (vendorid?: number) => {
    if (!vendorid) return;
    setError(null);
    if (!window.confirm('Are you sure you want to delete this vendor?')) return;

    try {
      await deleteVendor(vendorid);
      alert('Vendor deleted!');
      fetchVendors();
    } catch (err) {
      setError('Failed to delete vendor');
      console.error(err);
    }
  };

  // Edit vendor handler (populate form)
  const handleEditVendor = (vendor: Vendor) => {
    setEditingVendorId(vendor.vendorid ?? null);
    setVendorForm({
      vendorname: vendor.vendorname,
      email: vendor.email || '',
      phone: vendor.phone || '',
      address: vendor.address || '',
      bankdetails: vendor.bankdetails || '',
      gstnumber: vendor.gstnumber || '',
    });
  };

  // Update vendor handler
  const handleUpdateVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVendorId) return;
    setError(null);

    try {
      await updateVendor(editingVendorId, vendorForm);
      alert('Vendor updated!');
      setEditingVendorId(null);
      setVendorForm({
        vendorname: '',
        email: '',
        phone: '',
        address: '',
        bankdetails: '',
        gstnumber: '',
      });
      fetchVendors();
    } catch (err) {
      setError('Failed to update vendor');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{editingVendorId ? 'Edit Vendor' : 'Add Vendor'}</h2>
      <form onSubmit={editingVendorId ? handleUpdateVendor : handleAddVendor}>
        <input
          placeholder="Vendor Name"
          value={vendorForm.vendorname}
          required
          onChange={(e) =>
            setVendorForm({ ...vendorForm, vendorname: e.target.value })
          }
        />
        <input
          placeholder="Email"
          type="email"
          value={vendorForm.email || ''}
          onChange={(e) => setVendorForm({ ...vendorForm, email: e.target.value })}
        />
        <input
          placeholder="Phone"
          value={vendorForm.phone || ''}
          onChange={(e) => setVendorForm({ ...vendorForm, phone: e.target.value })}
        />
        <input
          placeholder="Address"
          value={vendorForm.address || ''}
          onChange={(e) => setVendorForm({ ...vendorForm, address: e.target.value })}
        />
        <input
          placeholder="Bank Details"
          value={vendorForm.bankdetails || ''}
          onChange={(e) =>
            setVendorForm({ ...vendorForm, bankdetails: e.target.value })
          }
        />
        <input
          placeholder="GST Number"
          value={vendorForm.gstnumber || ''}
          onChange={(e) => setVendorForm({ ...vendorForm, gstnumber: e.target.value })}
        />
        <button type="submit">{editingVendorId ? 'Update Vendor' : 'Add Vendor'}</button>
        {editingVendorId && (
          <button
            type="button"
            onClick={() => {
              setEditingVendorId(null);
              setVendorForm({
                vendorname: '',
                email: '',
                phone: '',
                address: '',
                bankdetails: '',
                gstnumber: '',
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Vendors List</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && vendors.length === 0 && <p>No vendors found.</p>}

      <ul>
        {vendors.map((v) => (
          <li key={v.vendorid}>
            <strong>{v.vendorname}</strong> — Email: {v.email || 'N/A'} — Phone: {v.phone || 'N/A'}
            <br />
            Address: {v.address || 'N/A'} — Bank: {v.bankdetails || 'N/A'} — GST: {v.gstnumber || 'N/A'}
            <br />
            <button onClick={() => handleEditVendor(v)}>Edit</button>{' '}
            <button onClick={() => handleDeleteVendor(v.vendorid)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorManager;
