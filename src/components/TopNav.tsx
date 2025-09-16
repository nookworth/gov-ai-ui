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
    <div className="w-full flex justify-between items-center border-y-2 border-border py-4 px-8 bg-secondary-background/60">
      <section className="gap-8 flex flex-row">
        <Select>
          <SelectTrigger className="md:min-w-45 w-fit">
            <SelectValue placeholder="UT" />
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
            <SelectValue placeholder="2025 General Session" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Session</SelectLabel>
              {SESSIONS.map((state) => {
                return <SelectItem value={state}>{state}</SelectItem>;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
      <header>
        <h1>Utah Gov AI</h1>
        <p className="max-md:hidden">Your guide to Utah House and Senate bills</p>
      </header>
    </div>
  );
};
