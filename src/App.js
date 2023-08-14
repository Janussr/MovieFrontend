import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import One from './views/One';
import Two from './views/Two';


const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<One />} />
        <Route path="/two" element={<Two />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;