import { useState } from "react";
import type { Product } from "../types";

export function useInventory() {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (name: string, price: number, quantity: number) => {
    const newProduct: Product = {
      id: Date.now(),
      name,
      price,
      quantity,
    };
    setProducts([...products, newProduct]);
  };

  const updateQuantity = (id: number, delta: number) => {
    setProducts(products.map(p =>
      p.id === id
        ? { ...p, quantity: Math.max(0, p.quantity + delta) }
        : p
    ));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return { products, addProduct, updateQuantity, deleteProduct };
}