import {memo, useState} from "react";
import './style.css';


function Paginator({count, onAction}) {
  let pages = [];
  let pageSize = 10;
  const [currentIndex, setIndex] = useState(0);

  for (let i = 0; i < Math.ceil(count / 10); i++) {
    pages.push(i);
  }

  function goToPage(index) {
    if (currentIndex > 0 || currentIndex <= pages.length) {
      setIndex(index);
      onAction({skip: index * pageSize, limit: pageSize});
    }
  }

  function showPaginatorBtn(page) {
    return (
      page === 0 ||
      page === pages.length - 1 ||
      page === currentIndex - 1 ||
      page === currentIndex + 1 ||
      page === currentIndex
    );
  }

  return(
    <div className="Paginator">
      {pages.map((page) => (
          showPaginatorBtn(page) ? <div key={page}>
            {(page === currentIndex - 1 && currentIndex > 2) ? <span>...</span> : '' }<button disabled={page == currentIndex} onClick={() => goToPage(page)}
                                   className={currentIndex == page ? "Paginator-item-active" : "Paginator-item"}>{page + 1}</button>
              {(page === currentIndex + 1 && currentIndex < pages.length - 2) ? <span>...</span> : '' }
          </div>
            : ''
      ))}

    </div>
  )
}

export default memo(Paginator);
