import { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line max-len
import { NavigationPath } from '../../components/NavigationPath/NavigationPath.component';
import {
  DispatchContext,
  StatesContext,
} from '../../store/GlobalStateProvider';
import { useParams } from 'react-router-dom';
import {
  getCategories,
  getProductByProdId,
  getProducts,
} from '../../api/products';
import { BackPath } from '../../components/BackPath/BackPath.component';
// eslint-disable-next-line max-len
import { ProductDetailsMain } from '../../components/ProductDetailsMain/ProductDetailsMain.component';
// eslint-disable-next-line max-len
import { ProductDetailsDescription } from '../../components/ProductDetailsDescription/ProductDetailsDescription.component';
// eslint-disable-next-line max-len
import { ProductDetailsSpecs } from '../../components/ProductDetailsSpecs/ProductDetailsSpecs.component';
// eslint-disable-next-line max-len
import { ProductSlider } from '../../components/base/ProductSlider/ProductSlider.component';
// eslint-disable-next-line max-len
import { ProductDetailsCarousel } from '../../components/ProductDetailsCarousel/ProductDetailsCarousel.component';
import { Product } from '../../types/Product';
import { Category } from '../../types/Category';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { category: categoryId } = useParams();
  const { isReady, selectedProduct } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);
  const [category, setCategory] = useState<Category>();
  const [suggested, setSuggested] = useState<Product[]>();

  useEffect(() => {
    getCategories().then(cats => {
      setCategory(
        cats.find((cat: Category) => cat.category_name === categoryId),
      );
    });
  }, [categoryId]);

  useEffect(() => {
    getProductByProdId(categoryId, productId).then(prod => {
      if (prod) {
        dispatch({ type: 'selectedProduct', payload: prod });
      }

      return;
    });
  }, [categoryId, dispatch, productId]);

  useEffect(() => {
    getProducts().then(prods => {
      setSuggested(
        prods.filter(p => p.categoryId === selectedProduct?.categoryId),
      );
    });
  }, [selectedProduct]);

  if (category && isReady && selectedProduct) {
    return (
      <div className="productDetails-page">
        <NavigationPath
          firstLevel={category.category_name}
          secondLevel={selectedProduct.name}
        />
        <BackPath />
        <h2 className="title">{selectedProduct.name}</h2>
        <div className="productDetailCard">
          <ProductDetailsCarousel />
          <ProductDetailsMain />
        </div>
        <ProductDetailsDescription />
        <ProductDetailsSpecs />
        {suggested && (
          <div className="productDetails-page__suggested">
            <ProductSlider
              title="You may also like"
              products={suggested}
              showDiscount={false}
            />
          </div>
        )}
      </div>
    );
  } else {
    return 'Loading... Please wait';
  }
};
