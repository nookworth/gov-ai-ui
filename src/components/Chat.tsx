import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BASE_URL = import.meta.env.DEV ? "http://0.0.0.0:3000" : "";

export const Chat = ({ activeBill }: { activeBill: number | null }) => {
  useEffect(() => {
    const analyze = async () => {
      try {
        const response = await fetch(`${BASE_URL}/analyze`, {
          body: JSON.stringify({
            bill_id: activeBill,
            query: "What concerns relative to the separation of church and state are present in this bill?"
          }),
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
        });

        if (!response.ok) {
          throw new Error(`HTTP error. status: ${response.status}`);
        }

        const data = await response.json();
        console.log({ data });
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    analyze();
  }, [activeBill]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
};
