import { useState } from "react";
import serviceHost from "../../../../libs/service.host";
import styles from "./styles.module.css";
import classNames from "classnames";
// import { ReactComponent as Person } from "../../image/file-earmark-image.svg"


import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Document, Page, pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs';
pdfjs.GlobalWorkerOptions.workerSrc = '/libs/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs';


type Props = {
  pdf?: IImage
}
export default function PDF({ pdf }: Props) {
  const [currentPDF, setCurrentImage] = useState(pdf);

  return currentPDF ? <div className={classNames(styles.root, "mt-4")}>
    <Document

      onClick={() => {
        // location.href = `${serviceHost('mcontent')}/api/mcontent/static/catalog/position/pdf/${s.files.pdf.fileName}`
        // console.log('click')

        window.open(
          `${serviceHost('mcontent')}/api/mcontent/static/catalog/position/pdf/${currentPDF.fileName}`,
          '_blank' // <- This is what makes it open in a new window.
        );

      }}


      file={`${serviceHost('mcontent')}/api/mcontent/static/catalog/position/pdf/${currentPDF.fileName}`}
    // onLoadSuccess={onDocumentLoadSuccess}
    >
      <Page

        // className={classNames(styles.pdfpage)}
        // width={500}
        scale={0.3}
        // inputRef={(ref) => {console.log(ref)}}
        //  devicePixelRatio={5}
        pageNumber={1} />
    </Document>
    <small
      onClick={() => setCurrentImage(undefined)}
    >удалить pdf</small>
  </div>
    : <>
      {/* <Person width="50" height="50" /> */}
      <input type="hidden" name="delCurrentPDF" defaultValue="true" />
    </>
}
