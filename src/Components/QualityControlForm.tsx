import React, { useEffect, useState } from 'react';
import {
  type QualityControl,
  getQualityControls,
  createQualityControl,
  updateQualityControl,
  deleteQualityControl,
} from '../services/supabaseCrud';
import './VendorForm.css';

interface QualityControlFormProps {
  ponumber: number;
}

const QualityControlForm: React.FC<QualityControlFormProps> = ({ ponumber }) => {
  const [records, setRecords] = useState<QualityControl[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<QualityControl, 'qcid'>>({
    ponumber,
    qcchecklist: '',
    qcstatus: '',
    inspectiondate: new Date().toISOString().slice(0,10),
    inspectorname: '',
    testcertificates: '',
  });

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    try {
      const all = await getQualityControls();
      setRecords(all.filter(r => r.ponumber === ponumber));
    } catch {
      setError('Failed to fetch');
    }
    setLoading(false);
  };

  useEffect(() => { fetchList(); }, [ponumber]);

  const reset = () => {
    setEditingId(null);
    setForm({ ponumber, qcchecklist: '', qcstatus: '', inspectiondate: new Date().toISOString().slice(0,10), inspectorname: '', testcertificates: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingId) {
        await updateQualityControl(editingId, form);
        alert('Updated');
      } else {
        await createQualityControl(form);
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
    try { await deleteQualityControl(id); fetchList(); } catch { setError('Delete failed'); }
  };

  const startEdit = (r: QualityControl) => {
    setEditingId(r.qcid!);
    setForm({ ponumber, qcchecklist: r.qcchecklist, qcstatus: r.qcstatus, inspectiondate: r.inspectiondate, inspectorname: r.inspectorname, testcertificates: r.testcertificates });
  };

  return (
    <div>
      <h2>{editingId ? 'Edit QC' : 'Add QC'}</h2>
      <form className="vendor-form" onSubmit={handleSubmit}>
        <input placeholder="Checklist" value={form.qcchecklist} required onChange={e => setForm({ ...form, qcchecklist: e.target.value })} />
        <input placeholder="Status" value={form.qcstatus} required onChange={e => setForm({ ...form, qcstatus: e.target.value })} />
        <input type="date" value={form.inspectiondate} required onChange={e => setForm({ ...form, inspectiondate: e.target.value })} />
        <input placeholder="Inspector" value={form.inspectorname} onChange={e => setForm({ ...form, inspectorname: e.target.value })} />
        <input placeholder="Certificates" value={form.testcertificates} onChange={e => setForm({ ...form, testcertificates: e.target.value })} />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={reset}>Cancel</button>}
      </form>

      <h2>Quality Controls</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && records.length === 0 && <p>No records.</p>}
      <table className="vendor-table">
        <thead>
          <tr>
            <th>Checklist</th><th>Status</th><th>Date</th><th>Inspector</th><th>Certificates</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.qcid}>
              <td>{r.qcchecklist}</td>
              <td>{r.qcstatus}</td>
              <td>{r.inspectiondate}</td>
              <td>{r.inspectorname}</td>
              <td>{r.testcertificates}</td>
              <td><button onClick={() => startEdit(r)}>Edit</button><button onClick={() => handleDelete(r.qcid!)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QualityControlForm;
