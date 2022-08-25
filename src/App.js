
import './App.css';
import { Provider } from 'react-redux'
import store from './redux/store'
import Component from './component'

function App() {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
}

export default App;
