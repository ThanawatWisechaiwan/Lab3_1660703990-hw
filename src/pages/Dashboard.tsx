import { useInventoryContext } from "../context/InventoryContext";

export default function Dashboard() {
  const { products } = useInventoryContext();

  const totalItems = products.length;

  const totalValue = products.reduce(
    (sum: number, p: any) => sum + p.price * p.quantity,
    0
  );

  const outOfStock = products.filter(
    (p: any) => p.quantity === 0
  ).length;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <p>จำนวนรายการสินค้า: {totalItems}</p>
      <p>มูลค่ารวม: {totalValue}</p>
      <p>จำนวนรายการที่สินค้าของหมด: {outOfStock}</p>
    </div>
  );
}
