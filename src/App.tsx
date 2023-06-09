import { ReactNode, useEffect, useState } from "react";
import { Button } from "./components/template/Button";
import { Flex } from "./components/template/Flex";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesPacking,
  faChevronLeft,
  faCircleQuestion,
  faFileLines,
  faFileWord,
  faFileZipper,
  faFolder,
  faHeadphones,
  faImage,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { ParentComponent } from "./types/core/base.type";
import { Media } from "./components/Media";
import { Modal } from "./components/template/Modal";

const host = "http://127.0.0.1:3000/";

interface DirFile {
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
  ["webp", <FontAwesomeIcon icon={faImage} />],
  ["mp3", <FontAwesomeIcon icon={faHeadphones} />],
  ["mp4", <FontAwesomeIcon icon={faVideo} />],
  ["zip", <FontAwesomeIcon icon={faFileZipper} />],
  ["txt", <FontAwesomeIcon icon={faFileLines} />],
  ["doc", <FontAwesomeIcon icon={faFileWord} />],
  ["docx", <FontAwesomeIcon icon={faFileWord} />],
  ["dmg", <FontAwesomeIcon icon={faBoxesPacking} />],
]);

type AppState = {
  files: DirFile[];
  url: string[];
  media?: File;
  modal: boolean;
};

function App() {
  const [state, setState] = useState<AppState>({
    files: [],
    url: [],
    modal: false,
  });

  useEffect(() => {
    getPathFromParams();
    historyListener();
  }, []);

  useEffect(() => {
    setSearchParams("path", state.url.join(","));
    getFiles(state.url.join(","));
  }, [state.url]);

  function getPathFromParams() {
    const url = new URL(window.location.href);
    const path = url.searchParams.get("path");
    if (path) {
      setState((state) => ({ ...state, url: path.split(",") }));
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
          setState(state=>({...state, files:data.filter((f) => !f.hidden) as Array<DirFile>}));
        } else {
          throw new Error("файлы не пришли");
        }
      })
      .catch((e) => {
        setState(state=>({...state,files:[]}));
        console.error(e);
      });
  }
  function loadFile(params: string) {
    fetch(`${host}static/${!!params ? params : ""}`)
      .then((data) => data.blob())
      .then((blob) => {
        const f = new File([blob], params, { type: blob.type });
        setState((state) => ({
          ...state,
          media: f,
        }));
        openModal();
      });
  }

  function openModal() {
    setState((state) => ({
      ...state,
      modal: true,
    }));
  }
  function closeModal() {
    setState((state) => ({
      ...state,
      modal: false,
    }));
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
        <Flex orientation="row" className="w-full" align="center">
          <Button
            size="xs"
            ghost
            circle
            disabled={!state.url.length}
            onClick={() => {
              setState(state=>({...state, url:state.url.slice(0, -1)}))
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <p className="truncate" title={state.url.join("/")}>
            {state.url.join("/")}
          </p>
        </Flex>
      </header>

      <Modal position="bottom" close={() => closeModal()} open={state.modal}>
        {state.media && <Media file={state.media} />}
      </Modal>

      <Flex
        orientation="column"
        className="w-full"
        justify="center"
        align="center"
      >
        {state.files
          .sort((a, b) => +b.isDir - +a.isDir)
          .map((item) => (
            <Button
              onClick={() => {
                if (item.isDir) {
                  setState(state=>({...state,url:[...state.url, item.name]}))
                } else {
                  loadFile(state.url.join("/") + `/${item.name}`);
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

        {!state.files.length && (
          <div>
            <div className="alert alert-warning">
              <Button
                size="xs"
                ghost
                circle
                disabled={!state.url.length}
                onClick={() => {
                  setState(state=>({...state,url:state.url.slice(0, -1)}))
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
