import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import ItemDetails from "../components/item-details";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
    },
    {
      path: '/item/:itemId',
      element: <ItemDetails />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}/>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
