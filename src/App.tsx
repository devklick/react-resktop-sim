import "./App.css";
import Desktop from "./components/Desktop";
import useConditionalContextMenu from "./hooks/useConditionalContextMenu";

function App() {
  useConditionalContextMenu();
  return (
    <div className="App">
      <Desktop />
    </div>
  );
}

export default App;
