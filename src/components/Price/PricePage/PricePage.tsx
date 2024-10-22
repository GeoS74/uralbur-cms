import { useLoaderData, useNavigate } from "react-router-dom"
import serviceHost from "../../../libs/service.host"
import classNames from "classnames";
import styles from "./styles.module.css"
// import BackArrow from "../../BackArrow/BackArrow";
import OptionalHeader from "../PriceOptionalHeader/PriceOptionalHeader";

export default function PricePage() {
  const navigate = useNavigate();
  const price = useLoaderData() as IPrice || undefined;

  return <>
    {/* <BackArrow path={"/"} /> */}
    <div className={classNames(styles.root, "card")}>
      <OptionalHeader price={price} />

      <div className={classNames(styles.nested)}>

        {price ? <div>
          {/* <img src={`${serviceHost('mcontent')}/api/mcontent/static/images/slider/${s.image.fileName}`} loading="lazy" /> */}
          
          <a href={`${serviceHost('mcontent')}/api/mcontent/static/price/${price.fileName}`}>Скачать прайс</a>
          
          <div>
            <input type="submit"
              className={classNames(`mt-4 btn btn-outline-dark`)}
              value="Обновить прайс"
              onClick={() => navigate(`/price/edit`)}
            />
          </div>

        </div>
          :
          <>
            <div>Прайс не загружен</div>
            <div>
              <input type="submit"
                className={classNames(`mt-4 btn btn-outline-dark`)}
                value="Загрузить прайс"
                onClick={() => navigate(`/price/edit`)}
              />
            </div>
          </>
        }


      </div>

    </div>
  </>
}