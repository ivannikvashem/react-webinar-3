import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import {Link} from "react-router-dom";
import useSelector from "../../store/use-selector";

function BasketTool({ onOpen }) {
  const cn = bem('BasketTool');

  const select = useSelector(state => ({
    sum: state.basket.sum,
    amount: state.basket.amount,
  }));

  return (
    <div className={cn()}>
      <Link className={cn('link')} to="/">Главная</Link>
      <div className={cn('container')}>
        <span className={cn('label')}>В корзине:</span>
        <span className={cn('total')}>
          {select.amount
            ? `${select.amount} ${plural(select.amount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${numberFormat(select.sum)} ₽`
            : `пусто`}
        </span>
        <button onClick={onOpen}>Перейти</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired
};

BasketTool.defaultProps = {
  onOpen: () => {}
};

export default memo(BasketTool);
