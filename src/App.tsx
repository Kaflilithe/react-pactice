import { Flex } from "./components/template/Flex";
import "./index.css";

function App() {
  return (
    <div className="p-1">
      <Flex
        orientation="row"
        justify="center"
        align="center"
        className="gap-4"
        title="Fruits"
        onClick={() => alert("Пошел нахуй")}
      >
        <div>Ananas</div>
        <div>Apple</div>
        <div>Apple</div>
      </Flex>
    </div>
  );
}

export default App;
