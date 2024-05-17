
import { Product } from '@/types';




export const SingleProduct = (props: {product:Product}) => {
    const { product } = props;
    return (
    <div className="product">
            <img src={product.productImage } alt={product.productName} />
      <h3>{product.productName}</h3>
      <p>{product.productDescription}</p>
      <span>${product.productPrice}</span>
      <p>In Stock: {product.productQuantityInStock}</p>
    </div>
  );
};


