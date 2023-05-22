import { Button } from "./components/template/Button";
import { Flex } from "./components/template/Flex";
import "./index.css";

function App() {
  return (
    <div className="p-1">
      <Flex
        orientation="column"
        justify="center"
        align="center"
        className="gap-4"
        title="Fruits"
      >
        <div>Ananas</div>
        <div>Apple</div>
        <div>Apple</div>
        <Button background="secondary">Button</Button>
      </Flex>
    </div>
  );
}

export default App;
