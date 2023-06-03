import { ReactNode, useEffect, useState } from "react";
import { Button } from "./components/template/Button";
import { Flex } from "./components/template/Flex";
import { Tab } from "./components/template/Tab";
import { Tabs } from "./components/template/Tabs";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesPacking,
  faChevronLeft,
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

const host = "http://127.0.0.1:3000/";

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
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState<string[]>([]);

  useEffect(() => {
    getPathFromParams();
    historyListener();
  }, []);

  useEffect(() => {
    setSearchParams("path", url.join(","));
    getFiles(url.join(","));
  }, [url]);

  function getPathFromParams() {
    const url = new URL(window.location.href);
    const path = url.searchParams.get("path");
    if (path) {
      setUrl(path.split(","));
    }
  }

  function setSearchParams(key: string, value: string) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState(null, "", url);
  }

  function historyListener() {
    window.addEventListener("popstate", (e) => {
      getPathFromParams();
    });
  }

  function getFiles(params?: string) {

    fetch(`${host}?path=${!!params ? params : ""}`)
      .then((data) => data.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFiles(data.filter((f) => !f.hidden) as Array<File>);
        } else {
          throw new Error("файлы не пришли");
        }
      })
      .catch((e) => {
        setFiles([]);
        console.error(e);
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
    <div className="p-1 w-full max-w-lg m-auto">
      <header>
      <Flex
        orientation="row"
        className="w-full"
        align="center"
      >
        <Button
          size="xs"
          ghost
          circle
          disabled={!url.length}
          onClick={() => {
            setUrl(url.slice(0, -1));
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
        <p className="truncate" title={url.join("/")}>{url.join("/")}</p>
        </Flex>
      </header>

      <Flex
        orientation="column"
        className="w-full"
        justify="center"
        align="center"
      >
        {files
          .sort((a, b) => +b.isDir - +a.isDir)
          .map((item) => (
            <Button
              onClick={() => {
                if (item.isDir) {
                  setUrl([...url, item.name]);
                }
              }}
              key={item.name}
              className="w-full text-left normal-case"
              ghost
            >
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
                  <span className="opacity-60">
                    {convertDate(item.info.modTime)}
                  </span>
                </Flex>

                {!item.isDir && <p>{convertSize(item.info.size)}</p>}
              </Flex>
            </Button>
          ))}

        {!files.length && (
          <div>
            <div className="alert alert-warning">
              <Button
                size="xs"
                ghost
                circle
                disabled={!url.length}
                onClick={() => {
                  setUrl(url.slice(0, -1));
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </Button>
              <span>Файлов нет </span>
            </div>
          </div>
        )}
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
