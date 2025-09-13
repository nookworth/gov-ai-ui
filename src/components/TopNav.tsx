import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SESSIONS = ["2025 General Session"];
const STATES = ["UT"];

export const TopNav = () => {
  return (
    <div className="w-full flex max-md:flex-col justify-start gap-8 border-y-2 border-border py-4 px-8 bg-chart-2">
      <Select>
        <SelectTrigger className="min-w-45 w-fit">
          <SelectValue placeholder="Utah" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>State</SelectLabel>
            {STATES.map((state) => {
              return <SelectItem value={state}>{state}</SelectItem>;
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="min-w-45 w-fit">
          <SelectValue placeholder="2025 General Session" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>State</SelectLabel>
            {SESSIONS.map((state) => {
              return <SelectItem value={state}>{state}</SelectItem>;
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
