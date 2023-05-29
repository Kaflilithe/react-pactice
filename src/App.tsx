import { Button } from "./components/template/Button";
import { Flex } from "./components/template/Flex";
import { Tab } from "./components/template/Tab";
import { Tabs } from "./components/template/Tabs";
import "./index.css";

function App() {
  return (
    <div className="p-1">
      <Flex orientation="column" justify="center" align="center">
        <h2>Компанент Flex:</h2>
        <h4>Orientation</h4>
        <br />
        <Tabs onTabChange={i => console.log(i)} orientation="row" justify="center">
          <Tab lifted size="lg" className="w-80" title="Вид">
            <Flex orientation="column">
              <p>Яблоко</p>
              <p>Апельсины</p>
              <p>Бананы</p>
              <p>Груши</p>
            </Flex>
          </Tab>
          <Tab lifted size="lg" className="w-80" title="<code>">
            <pre>{`
              <Flex orientation="column|row|column-revers|row-revers"> 
                  <p>Яблоко</p>
                  <p>Апельсины</p>
                  <p>Бананы</p>
                  <p>Груши</p>
              </Flex>
          `}</pre>
          </Tab>
        </Tabs>
        <h4>Justify</h4>
        <br />
        <Tabs lifted size="lg" orientation="row" justify="center">
          <Tab className="w-80" title="Вид">
            <Flex orientation="row" justify="center">
              <p>Яблоко</p>
              <p>Апельсины</p>
              <p>Бананы</p>
              <p>Груши</p>
            </Flex>
          </Tab>
          <Tab className="w-80" title="<code>">
            <pre>{`
              <Flex orientation="row" justify="center"> 
                  <p>Яблоко</p>
                  <p>Апельсины</p>
                  <p>Бананы</p>
                  <p>Груши</p>
              </Flex>
          `}</pre>
          </Tab>
        </Tabs>
      </Flex>
      {/* <Flex
        orientation="column"
        justify="center"
        align="center"
        className="gap-4"
        title="Fruits"
      >
        <div>Ananas</div>
        <div>Apple</div>
        <div>Apple</div>
        <button disabled></button>
        <Button color="accent" loading disabled>
          Button
        </Button>
      <Tabs orientation="row">
        <Tab size="lg" title="Lemon">Lemon is yellow</Tab>
        <Tab size="lg" title="Strawberry">Strawberry is red</Tab>
        <Tab size="lg" title="Pear">Pear is green</Tab>
      </Tabs>
      </Flex>  */}
    </div>
  );
}

export default App;
