import { useEffect, useState } from 'react';
import { getProducts } from '../services/supabaseCrud';

interface Props {
  vendorId: number;
}

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  vendor_id: number;
};

export const ProductList: React.FC<Props> = ({ vendorId }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        const filtered = allProducts.filter((p: Product) => p.vendor_id === vendorId);
        setProducts(filtered);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [vendorId]);

  return (
    <div>
      <h2>Your Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.category} - ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
};
