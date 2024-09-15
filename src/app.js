import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

function ItemCounter(counter) {
  if (counter > 0) {
    return <span>| Выделяли {counter} {ItemCounterPrefix(counter)}</span>;
  }
}

function ItemCounterPrefix(counter) {
  const lastDigit = counter % 10;
  const lastTwoDigits = counter % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return <span>раз</span>;
  }
  if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return <span>раза</span>;
  }
  return <span>раз</span>;
}

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title} {ItemCounter(item.selectCount)}</div>
                <div className="Item-actions">
                  <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
