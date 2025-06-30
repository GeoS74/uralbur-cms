import { Converter } from "md-conv";

import { useLoaderData } from "react-router-dom"
import serviceHost from "../../../libs/service.host"
import classNames from "classnames";
import styles from "./styles.module.css"
import BackArrow from "../../BackArrow/BackArrow";
import OptionalHeader from "../CatalogPositionOptionalHeader/CatalogPositionOptionalHeader";
import { ReactComponent as DefaultImg } from "../image/file-earmark-image.svg";

const converter = new Converter();

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Document, Page, pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs';
pdfjs.GlobalWorkerOptions.workerSrc = '/libs/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs';

// const url = new URL(
//   "../../../libs/pdf.worker.min.ts",
//   import.meta.url,
// ).toString();
// console.log(url)
// pdfjs.GlobalWorkerOptions.workerSrc =  url;


export default function CatalogPositionPage() {
  const s = useLoaderData() as ICatalogPosition;

  return <>
    <BackArrow path={"/catalog/positions"} />
    <div className={classNames(styles.root, "card")}>
      <OptionalHeader
        id={s.id}
        createdAt={s.createdAt}
        _updatePositions={() => true} // читай про эту функцию в readme к компоненте CatalogPosition
      />

      <div className={classNames(styles.nested)}>

        {s.level.title ? <div><i>раздел каталога: {s.level.title}</i></div> : <></>}

        {!s.files.image.fileName ?
          <DefaultImg width="50" height="50" />
          : <img src={`${serviceHost('mcontent')}/api/mcontent/static/catalog/position/images/${s.files.image.fileName}`} loading="lazy" />
        }


        {s.level.title ? <div>раздел каталога: {s.level.title}</div> : <></>}
        {s.title ? <div><h3>{s.title}</h3></div> : <></>}
        {s.article ? <div><h5>{s.article}</h5></div> : <></>}
        {s.description ? <div
          dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(s.description) }}
        ></div> : <></>}

        {/* <a href={`${serviceHost('mcontent')}/api/mcontent/static/catalog/position/pdf/${s.files.pdf.fileName}`}>pdf</a> */}


        {/* <object data={`${serviceHost('mcontent')}/api/mcontent/static/catalog/position/pdf/${s.files.pdf.fileName}`} type="application/pdf" width="100%" height="100%">
          <p>Alternative text - include a link <a href={`${serviceHost('mcontent')}/api/mcontent/static/catalog/position/pdf/${s.files.pdf.fileName}`}>to the PDF!</a></p>
        </object> */}


        {/* <div className={classNames(styles.pdftest)}> */}
        <Document
          file={`${serviceHost('mcontent')}/api/mcontent/static/catalog/position/pdf/${s.files.pdf.fileName}`}
        // onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page

            // className={classNames(styles.pdfpage)}
            // width={500}
            scale={1}
            // inputRef={(ref) => {console.log(ref)}}
            //  devicePixelRatio={5}
            pageNumber={1} />
        </Document>
        {/* </div> */}


        <div>Отображается на странице: {s.isPublic ? "да" : "нет"}</div>
      </div>

    </div>
  </>
}