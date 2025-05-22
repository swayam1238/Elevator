import { useState } from 'react';
import { createProduct } from '../services/supabaseCrud';

interface Props {
  vendorId: number;
}

export const ProductForm: React.FC<Props> = ({ vendorId }) => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({ ...product, vendor_id: vendorId });
      alert('Product added!');
      setProduct({ name: '', category: '', price: 0 });
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <input
        placeholder="Category"
        value={product.category}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
      />
      <input
        placeholder="Price"
        type="number"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
      />
      <button type="submit">Add</button>
    </form>
  );
};
