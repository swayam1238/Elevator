import React, { useEffect, useState } from 'react';
import {
  type Product,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/supabaseCrud';

interface Props {
  vendorid: number;
}

const VendorProducts: React.FC<Props> = ({ vendorid }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [productForm, setProductForm] = useState<Omit<Product, 'productid'>>({
    productname: '',
    productcategory: '',
    unitofmeasurement: '',
    productspecifications: '',
    quantity: 0,
    vendorid,
  });

  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  // Fetch products filtered by vendorid
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const allProducts = await getProducts();
      const filtered = allProducts.filter((p) => p.vendorid === vendorid);
      setProducts(filtered);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [vendorid]);

  // Add product handler
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await createProduct(productForm);
      alert('Product added!');
      setProductForm({
        productname: '',
        productcategory: '',
        unitofmeasurement: '',
        productspecifications: '',
        quantity: 0,
        vendorid,
      });
      fetchProducts();
    } catch (err) {
      setError('Failed to add product');
      console.error(err);
    }
  };

  // Delete product handler
  const handleDeleteProduct = async (productid?: number) => {
    if (!productid) return;
    setError(null);
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteProduct(productid);
      alert('Product deleted!');
      fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
      console.error(err);
    }
  };

  // Edit product handler (populate form)
  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.productid ?? null);
    setProductForm({
      productname: product.productname,
      productcategory: product.productcategory || '',
      unitofmeasurement: product.unitofmeasurement || '',
      productspecifications: product.productspecifications || '',
      quantity: product.quantity || 0,
      vendorid: product.vendorid,
    });
  };

  // Update product handler
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProductId) return;
    setError(null);

    try {
      await updateProduct(editingProductId, productForm);
      alert('Product updated!');
      setEditingProductId(null);
      setProductForm({
        productname: '',
        productcategory: '',
        unitofmeasurement: '',
        productspecifications: '',
        quantity: 0,
        vendorid,
      });
      fetchProducts();
    } catch (err) {
      setError('Failed to update product');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{editingProductId ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={editingProductId ? handleUpdateProduct : handleAddProduct}>
        <input
          placeholder="Product Name"
          value={productForm.productname}
          required
          onChange={(e) =>
            setProductForm({ ...productForm, productname: e.target.value })
          }
        />
        <input
          placeholder="Category"
          value={productForm.productcategory || ''}
          onChange={(e) =>
            setProductForm({ ...productForm, productcategory: e.target.value })
          }
        />
        <input
          placeholder="Unit of Measurement"
          value={productForm.unitofmeasurement || ''}
          onChange={(e) =>
            setProductForm({ ...productForm, unitofmeasurement: e.target.value })
          }
        />
        <input
          placeholder="Specifications"
          value={productForm.productspecifications || ''}
          onChange={(e) =>
            setProductForm({ ...productForm, productspecifications: e.target.value })
          }
        />
        <input
          placeholder="Quantity"
          type="number"
          min={0}
          value={productForm.quantity || 0}
          onChange={(e) =>
            setProductForm({ ...productForm, quantity: Number(e.target.value) })
          }
        />
        <button type="submit">{editingProductId ? 'Update Product' : 'Add Product'}</button>
        {editingProductId && (
          <button
            type="button"
            onClick={() => {
              setEditingProductId(null);
              setProductForm({
                productname: '',
                productcategory: '',
                unitofmeasurement: '',
                productspecifications: '',
                quantity: 0,
                vendorid,
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Your Products</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && products.length === 0 && <p>No products found.</p>}

      <ul>
        {products.map((p) => (
          <li key={p.productid}>
            <strong>{p.productname}</strong> — {p.productcategory || 'N/A'} —{' '}
            {p.unitofmeasurement || 'N/A'} — Qty: {p.quantity ?? 0}
            <br />
            Specs: {p.productspecifications || 'N/A'}
            <br />
            <button onClick={() => handleEditProduct(p)}>Edit</button>{' '}
            <button onClick={() => handleDeleteProduct(p.productid)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorProducts;
