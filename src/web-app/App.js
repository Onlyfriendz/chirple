import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import DashBoard from '../components/Dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <HeroBanner/>
      <DashBoard/>
      <Footer />
    </div>
  );
}

export default App;
