import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Input from './components/Input'
import List from './components/List'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="mt-5 mx-auto w-50">
        <Input />
        
      </div>
    </div>
  );
}

export default App;
