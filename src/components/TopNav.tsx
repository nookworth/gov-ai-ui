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
    <div className="w-full flex justify-start gap-8 border-y-2 border-border py-4 px-8 bg-secondary-background/60">
      <Select>
        <SelectTrigger className="md:min-w-45 w-fit">
          <SelectValue placeholder="State" />
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
        <SelectTrigger className="md:min-w-45 w-fit">
          <SelectValue placeholder="Session" />
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
