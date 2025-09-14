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
    return (
      <div className="space-x-2 space-y-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="w-64 h-16" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-x-2 space-y-2">
      {availableBills.map((bill) => (
        <Button
          key={bill.bill_id}
          className="cursor-pointer w-fit h-fit"
          disabled={parseInt(bill.bill_id) === selectedBill?.billId || chatResponseLoading}
          onClick={() => onClick(parseInt(bill.bill_id), bill.bill_number, bill.title)}
        >
          <div className="text-left">
            <div className="">{bill.bill_number.toUpperCase()}</div>
            <div className="">{bill.title}</div>
          </div>
        </Button>
      ))}
    </div>
  );
};
