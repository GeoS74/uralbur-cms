import { useState } from "react";
import serviceHost from "../../../../libs/service.host";
import styles from "./styles.module.css";
import classNames from "classnames";
import { ReactComponent as Person } from "../../image/file-earmark-image.svg"

type Props = {
  image?: IImage
}
export default function Image({ image }: Props) {
  const [currentImage, setCurrentImage] = useState(image);

  return currentImage ? <div className={classNames(styles.root, "mt-4")}>
    <img src={`${serviceHost('mcontent')}/api/mcontent/static/catalog/position/images/${currentImage.fileName}`} loading="lazy" />
    <small
      onClick={() => setCurrentImage(undefined)}
    >удалить изображение</small>
  </div>
    : <>
      <Person width="50" height="50" />
      <input type="hidden" name="delCurrentImage" defaultValue="true" />
    </>
}