import { Product } from '../../../types/Product';
import { calculateDiscount } from '../../../utils/calculateDiscount';

type Props = {
  showDiscount?: boolean;
  product: Product;
};

export const Price: React.FC<Props> = ({ showDiscount, product }) => {
  if (product) {
    return (
      <div className="price">
        {showDiscount ? (
          <>
            <div className="price-current">
              <h3>${product.fullPrice}</h3>
            </div>
            <div className="price-full">${product.fullPrice}</div>
            <h3 className="price-discount">
              {calculateDiscount(product).toFixed(1)}% OFF
            </h3>
          </>
        ) : (
          <>
            <div className="price-current">
              <h3>${product.fullPrice}</h3>
            </div>
          </>
        )}
      </div>
    );
  }

  return;
};
