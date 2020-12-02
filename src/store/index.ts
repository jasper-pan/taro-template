import { createContainer } from 'unstated-next';
import { useState } from 'react';

const useStore = () => {
  let [count, setCount] = useState(0)
  let decrement = () => setCount(count - 1)
  let increment = () => setCount(count + 1)
  return { count, decrement, increment }

};

const Stores = createContainer(useStore);

export default Stores;
