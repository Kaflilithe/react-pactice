import { ReactNode, useEffect, useState } from "react";
import { Button } from "./components/template/Button";
import { Flex } from "./components/template/Flex";
import { Tab } from "./components/template/Tab";
import { Tabs } from "./components/template/Tabs";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesPacking,
  faCircleQuestion,
  faDiagnoses,
  faFileLines,
  faFileWord,
  faFileZipper,
  faFolder,
  faHeadphones,
  faImage,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { JsxElement } from "typescript";

interface File {
  name: string;
  isDir: boolean;
  hidden: boolean;
  info: {
    mode: number;
    modTime: string;
    size: number;
  };
}
const monthList = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];
const FileToIcon = new Map<string, ReactNode>([
  ["jpg", <FontAwesomeIcon icon={faImage} />],
  ["png", <FontAwesomeIcon icon={faImage} />],
  ["svg", <FontAwesomeIcon icon={faImage} />],
  ["mp3", <FontAwesomeIcon icon={faHeadphones} />],
  ["mp4", <FontAwesomeIcon icon={faVideo} />],
  ["zip", <FontAwesomeIcon icon={faFileZipper} />],
  ["txt", <FontAwesomeIcon icon={faFileLines} />],
  ["doc", <FontAwesomeIcon icon={faFileWord} />],
  ["docx", <FontAwesomeIcon icon={faFileWord} />],
  ["dmg", <FontAwesomeIcon icon={faBoxesPacking} />],
]);
function App() {
  const [tab, setTab] = useState(0);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    getTabFromParams();
    historyListener();
    getFiles();
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

  function getFiles(params?: string[]) {
    fetch("http://127.0.0.1:3000/?path=Downloads")
      .then((date) => date.json())
      .then((date) => {
        setFiles(date as Array<File>);
      });
  }

  function convertSize(size: number) {
    if (String(size).length > 9) {
      return (size / 1_000_000_000).toFixed(1) + "гб";
    }
    if (String(size).length > 6) {
      return (size / 1_000_000).toFixed(1) + "мб";
    }
    if (String(size).length > 3) {
      return (size / 1000).toFixed(1) + "кб";
    }
    return size + "б";
  }

  function convertDate(date: string) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = monthList[d.getMonth()];
    const day = d.getDate();
    return `${day} ${month}, ${year}`;
  }

  function checkPermission(params: string, isDir: boolean) {
    if (isDir) {
      return <FontAwesomeIcon icon={faFolder} />;
    }
    const splitname = params.split(".");
    const extension = splitname[splitname.length - 1];
    return (
      FileToIcon.get(extension) || <FontAwesomeIcon icon={faCircleQuestion} />
    );
  }

  return (
    <div className="p-1">
      <Flex
        orientation="column"
        className="w-full max-w-lg m-auto "
        justify="center"
        align="center"
      >
        {files
          .filter((f) => !f.hidden)
          .sort((a, b) => +b.isDir - +a.isDir)
          .map((item) => (
            <Button className="w-full text-left normal-case" ghost>
              <Flex
                orientation="row"
                className="w-full p-1"
                justify="between"
                align="center"
              >
                <Flex orientation="column">
                  <Flex orientation="row">
                    {checkPermission(item.name, item.isDir)}
                    <p className="truncate w-52 ml-2.5" title={item.name}>
                      {item.name}
                    </p>
                  </Flex>
                  <span className="opacity-60">{convertDate(item.info.modTime)}</span>
                </Flex>

                {!item.isDir && <p>{convertSize(item.info.size)}</p>}
              </Flex>
            </Button>
          ))}
      </Flex>
    </div>
  );
}

export default App;

{
  /* <Tabs
          onTabChange={(i) => {
            setTab(i);
            setSearchParams("tab", String(i));
          }}
          activeTab={tab}
          orientation="row"
          justify="center"
        >
          <Tab lifted size="lg" className="w-80" title="Вид">
          </Tab>
          <Tab lifted size="lg" className="w-80" title="<code2>">
            <p>ddd</p>
          </Tab>
          <Tab lifted size="lg" className="w-80" title="<code3>">
            tab 3
          </Tab>
        </Tabs> */
}
