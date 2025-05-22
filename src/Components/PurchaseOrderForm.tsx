import React, { useEffect, useState } from 'react';
import {
  type PurchaseOrder,
  getPurchaseOrders,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
} from '../services/supabaseCrud';
import './VendorForm.css'; // reuse styles

interface PurchaseOrderFormProps {
  vendorId: number;
  productId: number;
  onOrderSelect: (ponumber: number) => void;
}

const PurchaseOrderForm: React.FC<PurchaseOrderFormProps> = ({ vendorId, productId, onOrderSelect }) => {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<PurchaseOrder, 'ponumber'>>({
    requestdate: new Date().toISOString().slice(0, 10),
    expecteddeliverydate: new Date().toISOString().slice(0, 10),
    quantityordered: 0,
    unitprice: 0,
    deliveryterms: '',
    paymentterms: '',
    currency: '',
    postatus: '',
    productid: productId,
    vendorid: vendorId,
  });

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const all = await getPurchaseOrders();
      setOrders(all.filter(o => o.vendorid === vendorId && o.productid === productId));
    } catch {
      setError('Failed to fetch orders');
    }
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, [vendorId, productId]);

  const reset = () => {
    setEditingId(null);
    setForm({
      ...form,
      requestdate: new Date().toISOString().slice(0, 10),
      expecteddeliverydate: new Date().toISOString().slice(0, 10),
      quantityordered: 0,
      unitprice: 0,
      deliveryterms: '',
      paymentterms: '',
      currency: '',
      postatus: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingId) {
        await updatePurchaseOrder(editingId, form);
        alert('Order updated!');
      } else {
        await createPurchaseOrder(form);
        alert('Order added!');
      }
      reset();
      fetchOrders();
    } catch {
      setError('Save failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this order?')) return;
    setError(null);
    try {
      await deletePurchaseOrder(id);
      fetchOrders();
    } catch {
      setError('Delete failed');
    }
  };

  const startEdit = (o: PurchaseOrder) => {
    setEditingId(o.ponumber!);
    setForm({
      requestdate: o.requestdate,
      expecteddeliverydate: o.expecteddeliverydate,
      quantityordered: o.quantityordered,
      unitprice: o.unitprice,
      deliveryterms: o.deliveryterms,
      paymentterms: o.paymentterms,
      currency: o.currency,
      postatus: o.postatus,
      productid: productId,
      vendorid: vendorId,
    });
  };

  return (
    <div>
      <h2>{editingId ? 'Edit Order' : 'Add Order'}</h2>
      <form className="vendor-form" onSubmit={handleSubmit}>
        <input type="date" value={form.requestdate} required onChange={e => setForm({ ...form, requestdate: e.target.value })} />
        <input type="date" value={form.expecteddeliverydate} required onChange={e => setForm({ ...form, expecteddeliverydate: e.target.value })} />
        <input type="number" placeholder="Quantity" value={form.quantityordered} required onChange={e => setForm({ ...form, quantityordered: Number(e.target.value) })} />
        <input type="number" placeholder="Unit Price" value={form.unitprice} required onChange={e => setForm({ ...form, unitprice: Number(e.target.value) })} />
        <input placeholder="Delivery Terms" value={form.deliveryterms} onChange={e => setForm({ ...form, deliveryterms: e.target.value })} />
        <input placeholder="Payment Terms" value={form.paymentterms} onChange={e => setForm({ ...form, paymentterms: e.target.value })} />
        <input placeholder="Currency" value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })} />
        <input placeholder="PO Status" value={form.postatus} onChange={e => setForm({ ...form, postatus: e.target.value })} />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={reset}>Cancel</button>}
      </form>

      <h2>Purchase Orders</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && orders.length === 0 && <p>No orders found.</p>}
      <table className="vendor-table">
        <thead>
          <tr>
            <th>Request Date</th>
            <th>Expected Date</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Delivery Terms</th>
            <th>Payment Terms</th>
            <th>Currency</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.ponumber}>
              <td>{o.requestdate}</td>
              <td>{o.expecteddeliverydate}</td>
              <td>{o.quantityordered}</td>
              <td>{o.unitprice}</td>
              <td>{o.deliveryterms}</td>
              <td>{o.paymentterms}</td>
              <td>{o.currency}</td>
              <td>{o.postatus}</td>
<td>
  <button onClick={() => onOrderSelect(o.ponumber!)}>Manage</button>
  <button onClick={() => startEdit(o)}>Edit</button>
  <button onClick={() => handleDelete(o.ponumber!)}>Delete</button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrderForm;
