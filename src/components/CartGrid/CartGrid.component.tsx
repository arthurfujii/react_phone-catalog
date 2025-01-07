import { Product } from '../../types/Product';
import { CartProductCard } from '../CartProductCard/CartProductCard.component';

type Props = {
  cart: Product[];
};

export const CartGrid: React.FC<Props> = ({ cart }) => {
  return (
    <>
      <div className="cartGrid">
        {cart.map(product => (
          <CartProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};
