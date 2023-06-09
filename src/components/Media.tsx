import { ReactNode, useEffect, useState } from "react";
import { ParentComponent } from "../types/core/base.type";

type MediaProps = {
  file: File;
};

export const Media = ({ file }: ParentComponent<MediaProps>) => {
  const [src, setSrc] = useState<string>("");
  const [type, setType] = useState<string>("");

  useEffect(() => {
    if (!Filetype.has(file.type)) {
      setSrc("");
      return;
    }
    console.log("file type", file.type);
    setType(file.type);
    if (file) {
      parseToUrl();
    }
  }, [file]);

  function parseToUrl() {   
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        setSrc(reader.result?.toString() || "");
      },
      false
    );
    reader.readAsDataURL(file);
  }

  const Filetype = new Map<string, ReactNode>([
    ["image/jpg", <img src={src} alt="" />],
    ["image/png", <img src={src} alt="" />],
    ["image/svg", <img src={src} alt="" />],
    ["image/jpeg", <img src={src} alt="" />],
    ["image/webp", <img src={src} alt="" />],
    ["audio/mpeg", <audio controls src={src} />],
    ["video/mp4", <video src={src} controls />],
  ]);
if(!Filetype.get(type)){
  return <div>Не удалось прочесть</div>
}
  return <div>{Filetype.get(type)}</div>;
};
