import { TopNav } from "./components/TopNav";

function App() {
  return (
    <div className="md:space-y-16">
      <TopNav />
      <section className="flex md:flex-row px-8 gap-8 justify-center">
        <div>Bill List</div>
        <div>Chat Area</div>
      </section>
    </div>
  );
}

export default App;
