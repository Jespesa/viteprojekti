<<<<<<< HEAD
import {fetchData} from './fetch';

const getItems = async () => {
  const url = 'http://localhost:3000/api/items';
  const items = await fetchData(url);

  if (items.error) {
    console.log('Tapahtui virhe fetch haussa!!');
    return;
  }
  console.log(items);
};

export {getItems};
=======
const getItems = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/items');
        const data = await response.json();
        console.log(response);
        console.log('Haetaan itemeitä ja mitä ikinä');
        console.log(data);
        data.forEach(element => {
            console.log(element);
            console.log(element.name);
        });
    } catch (error) {
        console.error('Virhe:', error);
    }
}
export{getItems};
>>>>>>> f68412fc22f7b29e150acd1f1e63c28449f3a758
