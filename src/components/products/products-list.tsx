"use client";

import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter, useParams } from "next/navigation";

import { getProducts } from "@/redux/slice/productsSlice";
import { ItemInterface, ProductsItem } from "@/components/products/item";
import PaginationComponent from "../table/pagination";
import { EmptyData } from "./empty";
import LoaderComponent from "../loader";

export function ProductsList() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentPage: page } = useParams();

  const {
    products,
    loading,
    // currentPage: page,
  } = useAppSelector((state: any) => state.products);
  const [per_page, setPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");

  const getProductsHandler = useCallback(() => {
    dispatch(getProducts({ page: Number(page), per_page, search }));
  }, [dispatch, page, per_page, search]);

  useEffect(() => {
    getProductsHandler();
  }, [getProductsHandler]);

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <div className="flex justify-center min-h-screen ">
      {!loading && products?.data?.length > 0 ? (
        <div>
          <div className="flex flex-wrap p-10">
            {products?.data?.map((item: ItemInterface, index: number) => {
              return (
                <div key={index} className="m-5">
                  <ProductsItem item={item} />
                </div>
              );
            })}
          </div>
          <div className="flex w-full justify-center pb-10">
            <PaginationComponent
              pageSize={10}
              outline
              nextIcon="Next"
              prevIcon="Previous"
              total={products.total}
              current={Number(page) || 1}
              onChange={(e) => {
                router.push(`/products/${e}`);
              }}
            />
          </div>
        </div>
      ) : (
        <EmptyData />
      )}
    </div>
  );
}
