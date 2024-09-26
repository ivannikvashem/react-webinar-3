import {memo, useCallback, useEffect, useState} from "react";
import {useNavigation, useParams} from "react-router-dom";
import PageLayout from "../page-layout";
import Head from "../head";
import BasketTool from "../basket-tool";
import useStore from "../../store/use-store";
import './style.css';
import {numberFormat} from "../../utils";

function ItemDetails() {
  let {itemId} = useParams();
  const store = useStore();
  const [item, setItem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);



  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(`/api/v1/articles/${itemId}?fields=*,madeIn(title,code),category(title)`);
        const data = await response.json();
        setItem(data.result)
        setIsLoaded(true);
      } catch (err) {
        console.error('Ошибка', err)
      }
    };

    fetchData();
  }, [itemId]);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const handleAddToBasket = () => {
    callbacks.addToBasket(item._id);
  }

  return (

      <PageLayout>
        {isLoaded ?
          <>
          <Head title={item.title}/>
          <BasketTool onOpen={callbacks.openModalBasket}/>
          <div className="Item-details">
            <p>{item.description}</p>
            <p>Страна производитель: <strong>{item.madeIn.title} ({item.madeIn.code})</strong></p>
            <p>Категория: <strong>{item.category.title}</strong></p>
            <p>Год выпуска: <strong>{item.edition}</strong></p>
            <h3><strong>Цена: {numberFormat(item.price)} ₽</strong></h3>
            <button onClick={handleAddToBasket}>Добавить</button>
            </div>
          </>
          : <Head title="Загрузка..."/>
          }
    </PageLayout>
  )
}


export default memo(ItemDetails);
