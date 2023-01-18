import { BaseHeader } from "./components/BaseHeader";
import { BaseKanban } from "./components/BaseKanban";
import { BaseSidebar } from "./components/BaseSidebar";

function App() {
  return (
    <main id="main">
      <BaseSidebar />
      <div id="main_content">
        <BaseHeader />
        <BaseKanban />
      </div>
    </main>
  );
}

export default App;
