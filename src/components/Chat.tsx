import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const BASE_URL = import.meta.env.DEV ? "http://0.0.0.0:3000" : "";

type SelectedBill = {
  billId: number;
  billNumber: string;
  title: string;
};

export const Chat = ({
  chatResponseLoading,
  selectedBill,
  setChatResponseLoading
}: {
  chatResponseLoading: boolean;
  selectedBill: SelectedBill | null;
  setChatResponseLoading: (loading: boolean) => void;
}) => {
  const [analysisResult, setAnalysisResult] = useState<string>("");

  useEffect(() => {
    if (!selectedBill) return;

    const analyze = async () => {
      try {
        setChatResponseLoading(true);

        const response = await fetch(`${BASE_URL}/analyze`, {
          body: JSON.stringify({
            bill_id: selectedBill.billId,
            query:
              "What concerns relative to the separation of church and state are present in this bill?",
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        if (!response.ok) {
          throw new Error(`HTTP error. status: ${response.status}`);
        }

        const data = await response.json();
        setAnalysisResult(data.analysis || data.result || JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching bills:", error);
      } finally {
        setChatResponseLoading(false)
      }
    };

    analyze();
  }, [selectedBill]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
        <CardDescription>Selected bills will appear below</CardDescription>
      </CardHeader>
      <CardContent>
        {selectedBill && (
          <div className="mb-4">
            <Badge variant="neutral" className="w-full justify-start">
              <div className="flex flex-col items-start">
                <span className="font-semibold text-xs">
                  {selectedBill.billNumber.toUpperCase()}
                </span>
                <span className="text-xs opacity-70">{selectedBill.title}</span>
              </div>
            </Badge>
          </div>
        )}

        <Textarea
          value={analysisResult}
          readOnly
          placeholder="Analysis results will appear here..."
          className="min-h-[200px]"
        />
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
};
