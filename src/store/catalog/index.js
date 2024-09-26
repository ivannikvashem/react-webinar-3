import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
    };
  }

  async load(params) {
    const response = await fetch(`/api/v1/articles?limit=${params?.limit ? params.limit : 10}&skip=${params?.skip ? params.skip : 0}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;