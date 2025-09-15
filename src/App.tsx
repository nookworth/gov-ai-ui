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
  const [chatResponseLoading, setChatResponseLoading] =
    useState<boolean>(false);
  const [selectedBill, setSelectedBill] = useState<SelectedBill | null>(null);

  const onBillClick = (billId: number, billNumber: string, title: string) => {
    setSelectedBill({ billId, billNumber, title });
  };

  const setLoading = (loading: boolean) => setChatResponseLoading(loading);

  return (
    <div className="space-y-8 lg:space-y-16">
      <TopNav />
      <section className="flex flex-col px-4 gap-4 lg:flex-row lg:px-8 lg:gap-8 *:w-full lg:*:w-1/2">
        <BillList
          chatResponseLoading={chatResponseLoading}
          onClick={onBillClick}
          selectedBill={selectedBill}
        />
        <Chat
          chatResponseLoading={chatResponseLoading}
          selectedBill={selectedBill}
          setChatResponseLoading={setLoading}
        />
      </section>
    </div>
  );
}

export default App;
