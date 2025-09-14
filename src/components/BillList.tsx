import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const PUBLIC_KEY = import.meta.env.VITE_TIDB_DATAAPP_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_TIDB_DATAAPP_PRIVATE_KEY;
const URL =
  "https://us-west-2.data.tidbcloud.com/api/v1beta/app/dataapp-raHlDywv/endpoint/available_bills";

type Bill = {
  meta: { bill_id: number; bill_number: string; source: string; title: string };
};

export const BillList = ({ onClick }: { onClick: (billId: number) => void }) => {
  const [availableBills, setAvailableBills] = useState<Bill[]>([]);

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
          const parsedBills = rows.map(({ meta }: { meta: string }) => ({
            meta: JSON.parse(meta),
          }));
          setAvailableBills(parsedBills);
        }
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, []);

  return (
    <div className="space-x-2 space-y-2">
      {availableBills.map(({ meta }) => (
        <Button key={meta.bill_id} className="cursor-pointer w-fit h-fit" onClick={() => onClick(meta.bill_id)}>
          <div className="text-left">
            <div className="">
              {meta.bill_number.toUpperCase()}
            </div>
            <div className="">
              {meta.title}
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};
