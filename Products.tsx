import { useState } from "react";
import { useInventoryContext } from "../context/InventoryContext";
import type { Product } from "../types";

export default function Products() {
  const { products, addProduct, updateQuantity, deleteProduct } = useInventoryContext();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [search, setSearch] = useState("");

  const filtered = products.filter((p: Product) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Products</h1>

      {/* Search */}
      <input
        className="border p-2 my-2 w-full"
        placeholder="ค้นหา..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Form */}
      <div className="flex gap-2 my-2">
        <input placeholder="ชื่อ" onChange={e => setName(e.target.value)} className="border p-1" />
        <input type="number" placeholder="ราคา" onChange={e => setPrice(+e.target.value)} className="border p-1" />
        <input type="number" placeholder="จำนวน" onChange={e => setQty(+e.target.value)} className="border p-1" />
        <button
          className="bg-blue-500 text-white px-2"
          onClick={() => addProduct(name, price, qty)}
        >
          เพิ่ม
        </button>
      </div>

      {/* List */}
      {filtered.map((p: Product) => (
        <div
          key={p.id}
          className={`p-3 border my-2 ${p.quantity === 0 ? "bg-red-50" : ""}`}
        >
          <p>{p.name}</p>
          <p>{p.price} บาท</p>
          <p>คงเหลือ: {p.quantity}</p>

          <div className="flex gap-2 mt-2">
            <button onClick={() => updateQuantity(p.id, 1)}>+</button>
            <button onClick={() => updateQuantity(p.id, -1)}>-</button>
            <button onClick={() => deleteProduct(p.id)}>ลบ</button>
          </div>

          {p.quantity === 0 && <p className="text-red-500">สินค้าหมด</p>}
        </div>
      ))}
    </div>
  );
}