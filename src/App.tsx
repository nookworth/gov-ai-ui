import { BillList } from "./components/BillList";
import { TopNav } from "./components/TopNav";

function App() {
  return (
    <div className="md:space-y-16">
      <TopNav />
      <section className="flex md:flex-row px-8 gap-8 md:*:max-w-1/2">
        <BillList />
        <div>Chat Area</div>
      </section>
    </div>
  );
}

export default App;
