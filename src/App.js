import logo from './logo.svg';
import Form from './components/Form/Form';
import './Styles/App.scss';

function App() {
  return (
    <div className='App'>
      <header className='AppHeader'>        
        <h1 className= 'title'>Sign up for email updates</h1>
        <p class="subtitle">* Indicates Required Field</p>
      </header>
      <Form />
    </div>
  );
}

export default App;

