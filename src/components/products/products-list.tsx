"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProducts } from "@/redux/slice/productsSlice";
import { ItemInterface, ProductsItem } from "@/components/products/item";

export function ProductsList() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-wrap p-10">
        {products && products?.map((item: ItemInterface, index: number) => {
          return (
            <div key={index}>
              <ProductsItem item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
