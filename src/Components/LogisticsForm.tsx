import React, { useEffect, useState } from 'react';
import {
  type Logistics,
  getLogistics,
  createLogistics,
  updateLogistics,
  deleteLogistics,
} from '../services/supabaseCrud';
import './VendorForm.css';

interface LogisticsFormProps {
  ponumber: number;
}

const LogisticsForm: React.FC<LogisticsFormProps> = ({ ponumber }) => {
  const [records, setRecords] = useState<Logistics[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Logistics, 'logisticsid'>>({
    ponumber,
    deliveryschedule: new Date().toISOString().slice(0,10),
    transportmode: '',
    freightresponsibility: '',
    carrierinformation: '',
    trackingnumber: '',
    deliveryconfirmation: false,
  });

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    try {
      const all = await getLogistics();
      setRecords(all.filter(r => r.ponumber === ponumber));
    } catch {
      setError('Failed to fetch');
    }
    setLoading(false);
  };

  useEffect(() => { fetchList(); }, [ponumber]);

  const reset = () => {
    setEditingId(null);
    setForm({ ponumber, deliveryschedule: new Date().toISOString().slice(0,10), transportmode: '', freightresponsibility: '', carrierinformation: '', trackingnumber: '', deliveryconfirmation: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingId) {
        await updateLogistics(editingId, form);
        alert('Updated');
      } else {
        await createLogistics(form);
        alert('Added');
      }
      reset(); fetchList();
    } catch {
      setError('Save failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete?')) return;
    setError(null);
    try { await deleteLogistics(id); fetchList(); } catch { setError('Delete failed'); }
  };

  const startEdit = (r: Logistics) => {
    setEditingId(r.logisticsid!);
    setForm({ ponumber, deliveryschedule: r.deliveryschedule, transportmode: r.transportmode, freightresponsibility: r.freightresponsibility, carrierinformation: r.carrierinformation, trackingnumber: r.trackingnumber, deliveryconfirmation: r.deliveryconfirmation });
  };

  return (
    <div>
      <h2>{editingId ? 'Edit Logistics' : 'Add Logistics'}</h2>
      <form className="vendor-form" onSubmit={handleSubmit}>
        <input type="date" value={form.deliveryschedule} required onChange={e => setForm({ ...form, deliveryschedule: e.target.value })} />
        <input placeholder="Transport Mode" value={form.transportmode} onChange={e => setForm({ ...form, transportmode: e.target.value })} />
        <input placeholder="Freight Responsibility" value={form.freightresponsibility} onChange={e => setForm({ ...form, freightresponsibility: e.target.value })} />
        <input placeholder="Carrier Info" value={form.carrierinformation} onChange={e => setForm({ ...form, carrierinformation: e.target.value })} />
        <input placeholder="Tracking #" value={form.trackingnumber} onChange={e => setForm({ ...form, trackingnumber: e.target.value })} />
        <label>
          Delivered?
          <input type="checkbox" checked={form.deliveryconfirmation} onChange={e => setForm({ ...form, deliveryconfirmation: e.target.checked })} />
        </label>
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={reset}>Cancel</button>}
      </form>

      <h2>Logistics Records</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && records.length === 0 && <p>No records.</p>}
      <table className="vendor-table">
        <thead>
          <tr>
            <th>Schedule</th><th>Mode</th><th>Freight</th><th>Carrier</th><th>Tracking</th><th>Delivered</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.logisticsid}>
              <td>{r.deliveryschedule}</td>
              <td>{r.transportmode}</td>
              <td>{r.freightresponsibility}</td>
              <td>{r.carrierinformation}</td>
              <td>{r.trackingnumber}</td>
              <td>{r.deliveryconfirmation ? 'Yes' : 'No'}</td>
              <td><button onClick={() => startEdit(r)}>Edit</button><button onClick={() => handleDelete(r.logisticsid!)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogisticsForm;
