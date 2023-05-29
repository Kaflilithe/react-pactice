import { useEffect, useState } from "react";
import { Button } from "./components/template/Button";
import { Flex } from "./components/template/Flex";
import { Tab } from "./components/template/Tab";
import { Tabs } from "./components/template/Tabs";
import "./index.css";

function App() {
  const [tab, setTab] = useState(0);
  useEffect(() => {
    getTabFromParams();
    historyListener();
  }, []);

  function getTabFromParams() {
    const url = new URL(window.location.href);
    const tab = url.searchParams.get("tab");
    if (tab) {
      setTab(Number(tab));
    }
  }

  function setSearchParams(key: string, value: string) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState(null, "", url);
  }

  function historyListener() {
    window.addEventListener("popstate", (e) => {
      getTabFromParams();
    });
  }
  

  return (
    <div className="p-1">
      <Flex orientation="column" justify="center" align="center">
        <h2>Компанент Flex:</h2>
        <h4>Orientation</h4>
        <br />
        <Tabs
          onTabChange={(i) => {
            setTab(i);
            setSearchParams("tab", String(i));
          }}
          activeTab={tab}
          orientation="row"
          justify="center"
        >
          <Tab lifted size="lg" className="w-80" title="Вид">
            <Flex orientation="column">
              <p>Яблоко</p>
              <p>Апельсины</p>
              <p>Бананы</p>
              <p>Груши</p>
            </Flex>
          </Tab>
          <Tab lifted size="lg" className="w-80" title="<code2>">
            <pre>{`
              <Flex orientation="column|row|column-revers|row-revers"> 
                  <p>Яблоко</p>
                  <p>Апельсины</p>
                  <p>Бананы</p>
                  <p>Груши</p>
              </Flex>
          `}</pre>
          </Tab>
          <Tab lifted size="lg" className="w-80" title="<code3>">
            tab 3
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
    </div>
  );
}

export default App;
