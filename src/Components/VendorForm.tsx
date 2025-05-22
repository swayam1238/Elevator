import React, { useEffect, useState } from 'react';
import {
  type Vendor,
  getVendors,
  createVendor,
  updateVendor,
  deleteVendor,
} from '../services/supabaseCrud';
import './VendorForm.css';

interface VendorFormProps { onVendorCreated: (vendorid: number) => void; }

const VendorForm: React.FC<VendorFormProps> = ({ onVendorCreated }) => {
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
    } catch (err: any) {
      console.error('Supabase error (getVendors):', err);
      setError(err.message || 'Failed to load vendors');
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
      const newVendor = await createVendor(vendorForm);
      alert('Vendor added!');
      onVendorCreated(newVendor.vendorid!);
      setVendorForm({
        vendorname: '',
        email: '',
        phone: '',
        address: '',
        bankdetails: '',
        gstnumber: '',
      });
      fetchVendors();
    } catch (err: any) {
      console.error('Supabase error (createVendor):', err);
      setError(err.message || 'Failed to add vendor');
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
    } catch (err: any) {
      console.error('Supabase error (deleteVendor):', err);
      setError(err.message || 'Failed to delete vendor');
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
    } catch (err: any) {
      console.error('Supabase error (updateVendor):', err);
      setError(err.message || 'Failed to update vendor');
    }
  };

  return (
    <div>
      <h2>{editingVendorId ? 'Edit Vendor' : 'Add Vendor'}</h2>
      <form className="vendor-form" onSubmit={editingVendorId ? handleUpdateVendor : handleAddVendor}>
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
      {error && <p className="error-message">{error}</p>}
      {!loading && vendors.length === 0 && <p>No vendors found.</p>}

      <div className="vendor-table-container">
        <table className="vendor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Bank Details</th>
              <th>GST Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.vendorid}>
                <td>{v.vendorname}</td>
                <td>{v.email || 'N/A'}</td>
                <td>{v.phone || 'N/A'}</td>
                <td>{v.address || 'N/A'}</td>
                <td>{v.bankdetails || 'N/A'}</td>
                <td>{v.gstnumber || 'N/A'}</td>
                <td>
                  <button className="manage-btn" onClick={() => onVendorCreated(v.vendorid!)}>Products</button>
                  <button className="edit-btn" onClick={() => handleEditVendor(v)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteVendor(v.vendorid)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorForm;
