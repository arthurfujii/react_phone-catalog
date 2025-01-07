import axios, { AxiosResponse } from 'axios';
import { Product } from '../types/Product';
import { Category } from '../types/Category';

const instance = axios.create({
  baseURL: 'http://localhost:3005',
  timeout: 10000,
});

export async function getProducts(sort?: string): Promise<Product[]> {
  const result = await instance
    .get(`/products`, { params: { sort } })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error);
    });

  return result;
}

export async function getCategories(): Promise<Category[]> {
  const result = await instance
    .get('/categories')
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error);
    });

  return result;
}

export async function getCategoryByCatId(catId: string) {
  const result = instance
    .get(`/categories/${catId}`)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error);
    });

  return result;
}

export async function getProductsByCatId(catId: string) {
  const result = instance
    .get(`/products/${catId}`)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error);
    });

  return result;
}

export async function getProductByProdId(
  catId: string | undefined,
  prodId: string | undefined,
) {
  if (catId || prodId) {
    const result = instance
      .get(`/products/${catId}/${prodId}`)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch(error => {
        throw new Error(error);
      });

    return result;
  }
}
// export async function getProductsSummary(): Promise<ProductSummary[]> {
//   const response = await fetch(`./api/products.json`);

//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }

//   return response.json();
// }

// export async function getProducts(catId: string): Promise<ProductSpecs[]> {
//   const response = await fetch(`./api/${catId}.json`);

//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }

//   return response.json();
// }

// export async function getCategories(): Promise<Category[]> {
//   const products = await getProductsSummary();
//   const categoryIds = Array.from(new Set(products.map(p => p.category)));

//   const categories = categoryIds.map(cat => ({
//     id: cat,
//     title: cat.charAt(0).toUpperCase() + cat.slice(1),
//     bannerImg: `public/img/category-${cat}-sqr.png`,
//     products: products.filter(p => p.category === cat),
//     productsCount: products.filter(p => p.category === cat).length,
//   }));

//   return categories;
// }

// export async function getCategoryByCatId(categoryId: string) {
//   const categories = await getCategories();

//   return categories.find(cat => cat.id === categoryId);
// }

// export async function getProductsByCatId(
//   categoryId: string,
// ): Promise<ProductSummary[]> {
//   const products = await getProductsSummary();

//   return products.filter(p => p.category === categoryId);
// }

// export async function locateProduct(
//   prodId: string,
//   catId: string,
// ): Promise<ProductSpecs | undefined> {
//   const products = await getProducts(catId);

//   return products.find((p: ProductSpecs) => p.id === prodId);
// }
