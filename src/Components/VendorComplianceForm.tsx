import React, { useEffect, useState } from 'react';
import {
  type VendorCompliance,
  getVendorCompliances,
  createVendorCompliance,
  updateVendorCompliance,
  deleteVendorCompliance,
} from '../services/supabaseCrud';
import './VendorForm.css'; // you can create a separate CSS if needed

interface VendorComplianceFormProps {
  vendorId: number;
}

const VendorComplianceForm: React.FC<VendorComplianceFormProps> = ({ vendorId }) => {
  const [list, setList] = useState<VendorCompliance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<VendorCompliance, 'complianceid'>>({
    vendorid: vendorId,
    compliancetype: '',
    compliancenumber: '',
    issuedate: new Date().toISOString().slice(0,10),
    expirydate: new Date().toISOString().slice(0,10),
    documentlink: '',
  });

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    try {
      const all = await getVendorCompliances();
      setList(all.filter(item => item.vendorid === vendorId));
    } catch (err) {
      setError('Failed to fetch compliances');
    }
    setLoading(false);
  };

  useEffect(() => { fetchList(); }, [vendorId]);

  const reset = () => {
    setEditingId(null);
    setForm({ ...form, compliancetype: '', compliancenumber: '', documentlink: '', issuedate: new Date().toISOString().slice(0,10), expirydate: new Date().toISOString().slice(0,10) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingId) {
        await updateVendorCompliance(editingId, form);
        alert('Updated');
      } else {
        await createVendorCompliance(form);
        alert('Added');
      }
      reset();
      fetchList();
    } catch {
      setError('Save failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this record?')) return;
    setError(null);
    try {
      await deleteVendorCompliance(id);
      fetchList();
    } catch {
      setError('Delete failed');
    }
  };

  return (
    <div>
      <h2>{editingId ? 'Edit Compliance' : 'Add Compliance'}</h2>
      <form onSubmit={handleSubmit} className="vendor-form">
        <input placeholder="Type" value={form.compliancetype} required onChange={e => setForm({ ...form, compliancetype: e.target.value })} />
        <input placeholder="Number" value={form.compliancenumber} required onChange={e => setForm({ ...form, compliancenumber: e.target.value })} />
        <input type="date" value={form.issuedate} required onChange={e => setForm({ ...form, issuedate: e.target.value })} />
        <input type="date" value={form.expirydate} required onChange={e => setForm({ ...form, expirydate: e.target.value })} />
        <input placeholder="Document Link" value={form.documentlink} onChange={e => setForm({ ...form, documentlink: e.target.value })} />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={reset}>Cancel</button>}
      </form>

      <h2>Compliances</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && list.length === 0 && <p>No records.</p>}
      <table className="vendor-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Number</th>
            <th>Issue</th>
            <th>Expiry</th>
            <th>Doc</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.complianceid}>
              <td>{item.compliancetype}</td>
              <td>{item.compliancenumber}</td>
              <td>{item.issuedate}</td>
              <td>{item.expirydate}</td>
              <td>{item.documentlink || 'N/A'}</td>
              <td>
                <button onClick={() => {
                  setEditingId(item.complianceid!);
                  setForm({ ...form,
                    compliancetype: item.compliancetype,
                    compliancenumber: item.compliancenumber,
                    issuedate: item.issuedate,
                    expirydate: item.expirydate,
                    documentlink: item.documentlink || ''
                  });
                }}>Edit</button>
                <button onClick={() => handleDelete(item.complianceid!)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorComplianceForm;
