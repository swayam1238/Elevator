import React, { useEffect, useState } from 'react';
import {
  type Inventory,
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
} from '../services/supabaseCrud';
import './VendorForm.css';

interface InventoryFormProps {
  productId: number;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ productId }) => {
  const [items, setItems] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Inventory, 'inventoryid'>>({
    productid: productId,
    currentstock: 0,
    reorderlevel: 0,
    safetystock: 0,
    preferredwarehouse: '',
    batchnumber: '',
    storageconditions: '',
    gmreference: '',
    lastupdated: new Date().toISOString().slice(0,10),
  });

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const all = await getInventory();
      setItems(all.filter(i => i.productid === productId));
    } catch {
      setError('Fetch failed');
    }
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, [productId]);

  const reset = () => {
    setEditingId(null);
    setForm({ ...form, currentstock: 0, reorderlevel: 0, safetystock: 0, preferredwarehouse: '', batchnumber: '', storageconditions: '', gmreference: '', lastupdated: new Date().toISOString().slice(0,10) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingId) {
        await updateInventory(editingId, form);
        alert('Updated');
      } else {
        await createInventory(form);
        alert('Added');
      }
      reset();
      fetchItems();
    } catch {
      setError('Save failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this record?')) return;
    setError(null);
    try {
      await deleteInventory(id);
      fetchItems();
    } catch {
      setError('Delete failed');
    }
  };

  const startEdit = (i: Inventory) => {
    setEditingId(i.inventoryid!);
    setForm({
      productid: productId,
      currentstock: i.currentstock,
      reorderlevel: i.reorderlevel,
      safetystock: i.safetystock,
      preferredwarehouse: i.preferredwarehouse,
      batchnumber: i.batchnumber,
      storageconditions: i.storageconditions,
      gmreference: i.gmreference,
      lastupdated: i.lastupdated,
    });
  };

  return (
    <div>
      <h2>{editingId ? 'Edit Inventory' : 'Add Inventory'}</h2>
      <form className="vendor-form" onSubmit={handleSubmit}>
        <input type="number" placeholder="Current Stock" value={form.currentstock} onChange={e => setForm({ ...form, currentstock: Number(e.target.value) })} required />
        <input type="number" placeholder="Reorder Level" value={form.reorderlevel} onChange={e => setForm({ ...form, reorderlevel: Number(e.target.value) })} required />
        <input type="number" placeholder="Safety Stock" value={form.safetystock} onChange={e => setForm({ ...form, safetystock: Number(e.target.value) })} required />
        <input placeholder="Warehouse" value={form.preferredwarehouse} onChange={e => setForm({ ...form, preferredwarehouse: e.target.value })} />
        <input placeholder="Batch Number" value={form.batchnumber} onChange={e => setForm({ ...form, batchnumber: e.target.value })} />
        <input placeholder="Storage Conditions" value={form.storageconditions} onChange={e => setForm({ ...form, storageconditions: e.target.value })} />
        <input placeholder="GM Reference" value={form.gmreference} onChange={e => setForm({ ...form, gmreference: e.target.value })} />
        <input type="date" value={form.lastupdated} onChange={e => setForm({ ...form, lastupdated: e.target.value })} required />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={reset}>Cancel</button>}
      </form>

      <h2>Inventory Records</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && items.length === 0 && <p>No records.</p>}
      <table className="vendor-table">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Reorder Lvl</th>
            <th>Safety Stock</th>
            <th>Warehouse</th>
            <th>Batch</th>
            <th>Storage</th>
            <th>GM Ref</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i.inventoryid}>
              <td>{i.currentstock}</td>
              <td>{i.reorderlevel}</td>
              <td>{i.safetystock}</td>
              <td>{i.preferredwarehouse}</td>
              <td>{i.batchnumber}</td>
              <td>{i.storageconditions}</td>
              <td>{i.gmreference}</td>
              <td>{i.lastupdated}</td>
              <td>
                <button onClick={() => startEdit(i)}>Edit</button>
                <button onClick={() => handleDelete(i.inventoryid!)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryForm;
