import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const PUBLIC_KEY = import.meta.env.VITE_TIDB_DATAAPP_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_TIDB_DATAAPP_PRIVATE_KEY;
const URL =
  "https://us-west-2.data.tidbcloud.com/api/v1beta/app/dataapp-raHlDywv/endpoint/available_bills";

type Bill = {
  bill_id: string;
  bill_number: string;
  source: string;
  title: string;
};

type SelectedBill = {
  billId: number;
  billNumber: string;
  title: string;
};

export const BillList = ({
  chatResponseLoading,
  onClick,
  selectedBill,
}: {
  chatResponseLoading: boolean;
  onClick: (billId: number, billNumber: string, title: string) => void;
  selectedBill: SelectedBill | null;
}) => {
  const [availableBills, setAvailableBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      if (!PUBLIC_KEY || !PRIVATE_KEY) {
        console.error("Missing API keys");
        return;
      }

      try {
        const response = await fetch(URL, {
          headers: {
            Authorization: `Basic ${btoa(`${PUBLIC_KEY}:${PRIVATE_KEY}`)}`,
          },
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error. status: ${response.status}`);
        }

        const data = await response.json();
        const rows = data?.data?.rows;
        if (rows) {
          setAvailableBills(rows);
        }
      } catch (error) {
        console.error("Error fetching bills:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBills();
  }, []);

  if (isLoading) {
    const widths = ["w-3/4", "w-1/2", "w-5/6", "w-2/3", "w-3/5", "w-4/5"];
    return (
      <div className="space-x-2 space-y-2 overflow-y-scroll max-h-[75vh] h-full">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className={`${widths[index]} h-16`} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-x-2 space-y-2 overflow-y-scroll max-h-[75vh] h-full">
      {availableBills.map((bill) => (
        <Button
          key={bill.bill_id}
          className="cursor-pointer max-w-full h-fit"
          disabled={
            parseInt(bill.bill_id) === selectedBill?.billId ||
            chatResponseLoading
          }
          onClick={() =>
            onClick(parseInt(bill.bill_id), bill.bill_number, bill.title)
          }
        >
          <div className="text-left text-wrap max-lg:text-xs">
            <div className="">{bill.bill_number.toUpperCase()}</div>
            <div className="">{bill.title}</div>
          </div>
        </Button>
      ))}
    </div>
  );
};
