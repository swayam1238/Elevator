import React, { useEffect, useState } from 'react';
import {
  type Product,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/supabaseCrud';
import './ProductForm.css';

interface ProductFormProps {
  vendorId: number;
}

const ProductForm: React.FC<ProductFormProps> = ({ vendorId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const [productForm, setProductForm] = useState<Omit<Product, 'productid'>>({
    productname: '',
    productcategory: '',
    unitofmeasurement: '',
    productspecifications: '',
    quantity: 0,
    vendorid: vendorId,
  });

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const all = await getProducts();
      setProducts(all.filter((p) => p.vendorid === vendorId));
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [vendorId]);

  const resetForm = () => {
    setEditingProductId(null);
    setProductForm({
      productname: '',
      productcategory: '',
      unitofmeasurement: '',
      productspecifications: '',
      quantity: 0,
      vendorid: vendorId,
    });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await createProduct(productForm);
      alert('Product added!');
      resetForm();
      fetchProducts();
    } catch (err) {
      setError('Failed to add product');
      console.error(err);
    }
  };

  const handleEdit = (prod: Product) => {
    setEditingProductId(prod.productid ?? null);
    setProductForm({
      productname: prod.productname,
      productcategory: prod.productcategory || '',
      unitofmeasurement: prod.unitofmeasurement || '',
      productspecifications: prod.productspecifications || '',
      quantity: prod.quantity || 0,
      vendorid: vendorId,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProductId) return;
    setError(null);
    try {
      await updateProduct(editingProductId, productForm);
      alert('Product updated!');
      resetForm();
      fetchProducts();
    } catch (err) {
      setError('Failed to update product');
      console.error(err);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm('Delete this product?')) return;
    setError(null);
    try {
      await deleteProduct(id);
      alert('Product deleted!');
      fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{editingProductId ? 'Edit Product' : 'Add Product'}</h2>
<form className="product-form" onSubmit={editingProductId ? handleUpdate : handleAdd}>
        <input
          placeholder="Product Name"
          value={productForm.productname}
          required
          onChange={(e) => setProductForm({ ...productForm, productname: e.target.value })}
        />
        <input
          placeholder="Category"
          value={productForm.productcategory}
          onChange={(e) => setProductForm({ ...productForm, productcategory: e.target.value })}
        />
        <input
          placeholder="Unit of Measurement"
          value={productForm.unitofmeasurement}
          onChange={(e) => setProductForm({ ...productForm, unitofmeasurement: e.target.value })}
        />
        <input
          placeholder="Specifications"
          value={productForm.productspecifications}
          onChange={(e) => setProductForm({ ...productForm, productspecifications: e.target.value })}
        />
        <input
          placeholder="Quantity"
          type="number"
          min={0}
          value={productForm.quantity}
          onChange={(e) => setProductForm({ ...productForm, quantity: Number(e.target.value) })}
        />
        <button type="submit">{editingProductId ? 'Update' : 'Add'}</button>
        {editingProductId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <h2>Your Products</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && products.length === 0 && <p>No products found.</p>}

      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Specifications</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.productid}>
                <td>{p.productname}</td>
                <td>{p.productcategory || 'N/A'}</td>
                <td>{p.unitofmeasurement || 'N/A'}</td>
                <td>{p.productspecifications || 'N/A'}</td>
                <td>{p.quantity ?? 0}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(p.productid)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductForm;
