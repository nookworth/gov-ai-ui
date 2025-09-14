import { useState } from "react";
import { BillList } from "./components/BillList";
import { Chat } from "./components/Chat";
import { TopNav } from "./components/TopNav";

function App() {
  const [activeBill, setActiveBill] = useState<number | null>(null)
  const onBillClick = (billId: number) => setActiveBill(billId)

  return (
    <div className="md:space-y-16">
      <TopNav />
      <section className="flex md:flex-row px-8 gap-8 md:*:max-w-1/2">
        <BillList onClick={onBillClick} />
        <Chat activeBill={activeBill} />
      </section>
    </div>
  );
}

export default App;
