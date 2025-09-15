import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const BASE_URL = import.meta.env.DEV ? "http://0.0.0.0:3000" : "https://gov-ai-agent.fly.dev";

type SelectedBill = {
  billId: number;
  billNumber: string;
  title: string;
};

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

export const Chat = ({
  chatResponseLoading,
  selectedBill,
  setChatResponseLoading,
}: {
  chatResponseLoading: boolean;
  selectedBill: SelectedBill | null;
  setChatResponseLoading: (loading: boolean) => void;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || !selectedBill) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setChatResponseLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/analyze`, {
        body: JSON.stringify({
          bill_id: selectedBill.billId,
          query: messageContent.trim(),
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

      const assistantMessage: Message = {
        id: `${Date.now()}-assistant`,
        content: data.analysis || data.result || JSON.stringify(data),
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage: Message = {
        id: `${Date.now()}-error`,
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setChatResponseLoading(false);
    }
  };

  const handleQuickQuestion = () => {
    setUserInput(
      "What concerns relative to the separation of church and state are present in this bill?"
    );
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(userInput);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        {selectedBill ? (
          <Badge className="w-full justify-start h-fit bg-chart-2 text-white">
            <div className="flex flex-col items-start">
              <span className="font-semibold text-xs">
                {selectedBill?.billNumber.toUpperCase()}
              </span>
              <span className="text-xs">{selectedBill?.title}</span>
            </div>
          </Badge>
        ) : (
          <CardTitle>Select a bill to begin chatting!</CardTitle>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className={`min-h-[200px] max-h-[400px] space-y-4 p-2 overflow-y-scroll ${messages?.length ? "" : "invisible"}`}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex my-2 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-main text-main-foreground"
                    : "bg-secondary-background text-foreground"
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">
                  {message.content}
                </div>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          {chatResponseLoading && (
            <div className="flex justify-start mb-2">
              <div className="bg-secondary-background text-foreground p-3 rounded-lg">
                <div className="text-sm">Thinking...</div>
              </div>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <form onSubmit={handleInputSubmit} className="w-full flex gap-2">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask a question about this bill..."
            disabled={chatResponseLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={!selectedBill || chatResponseLoading || !userInput.trim()}
          >
            Send
          </Button>
        </form>
        {selectedBill && (
          <Button
            className="cursor-pointer w-fit block"
            onClick={handleQuickQuestion}
          >
            Ask about separation of church and state
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
