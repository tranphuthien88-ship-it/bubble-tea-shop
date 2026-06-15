import Link from 'next/link';
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image">
        🧋
      </div>

      <div className="product-content">
    
        <Link href={`/products/${product.id}`}>
          <h2>{product.name}</h2>
        </Link>

        <p>{product.description}</p>

        <div className="product-footer">
          <span className="product-price">
            {product.price.toLocaleString('vi-VN')}đ
          </span>

          <Link href={`/products/${product.id}`}>
            Xem sản phẩm
          </Link>
        </div>

        
      </div>
    </article>
  );
}