import { useLoaderData } from "react-router-dom"
import Image from "./Image/Image";
import Feature from "./Feature/Feature";
import Sale from "./Sale/Sale";
import Delivery from "./Delivery/Delivery";
import SearchForm from "../../Main/SearchForm/SearchForm";
import classNames from "classnames";
import styles from "./styles.module.css"
import Head from "../../Head/Head";

export default function ProductPage() {
    const product = useLoaderData() as IProduct;

    return <>
    <Head 
        title={`${product.title} купить в Челябинске по низкой цене - компания SIGNAL`}
        description={`${product.title} купить в магазине автозапчастей и запасных частей к спецтехнике в Челябинске по низкой цене - компания SIGNAL`}
    />
    <SearchForm />

    <div className={classNames(styles.root)}>
        <Image {...product} />
        <div>
            <Feature {...product} />
            <Sale />
            <Delivery />
        </div>
    </div>
    </>
}