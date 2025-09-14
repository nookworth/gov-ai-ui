import { useState } from "react";
import { BillList } from "./components/BillList";
import { Chat } from "./components/Chat";
import { TopNav } from "./components/TopNav";

type SelectedBill = {
  billId: number;
  billNumber: string;
  title: string;
};

function App() {
  const [chatResponseLoading, setChatResponseLoading] = useState<boolean>(false)
  const [selectedBill, setSelectedBill] = useState<SelectedBill | null>(null);

  const onBillClick = (billId: number, billNumber: string, title: string) => {
    setSelectedBill({ billId, billNumber, title });
  };

  const setLoading = (loading: boolean) => setChatResponseLoading(loading)

  return (
    <div className="md:space-y-16">
      <TopNav />
      <section className="flex md:flex-row px-8 gap-8 md:*:max-w-1/2">
        <BillList chatResponseLoading={chatResponseLoading} onClick={onBillClick} selectedBill={selectedBill}/>
        <Chat chatResponseLoading={chatResponseLoading} selectedBill={selectedBill} setChatResponseLoading={setLoading} />
      </section>
    </div>
  );
}

export default App;
