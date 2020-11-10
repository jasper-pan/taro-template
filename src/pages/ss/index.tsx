import React from 'react';
 
import { View} from '@tarojs/components'
import './index.scss'
import Stores from '../../store';

type PageStateProps = {
  store: {
    counterStore: {
      counter: number,
      increment: Function,
      decrement: Function,
      incrementAsync: Function
    }
  }
}

interface Index {
  props: PageStateProps;
}
 
const Index =  () => {
  // Do not destructure data!
  const stores = Stores.useContainer();
  const {counter} = stores
 
  return (
    <View>
        
      has order {counter.count}
    </View>
  )
}

 
export default Index
