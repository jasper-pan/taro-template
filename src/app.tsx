import React from 'react';
import 'taro-ui/dist/style/index.scss';
import '@/assets/scss/app.scss';
import Stores from './store';
import './assets/scss/icon.scss';
// import './i18n';

class App extends React.Component {
  render() {
    return (
      <Stores.Provider>
        {this.props.children} 
      </Stores.Provider>
    );
  };
}

export default App;
