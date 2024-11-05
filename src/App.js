import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import One from './views/One';
import Two from './views/Two';
import MovieList from "./views/MovieList";
import MovieDetail from "./views/MovieDetail";
import Cart from "./views/Cart";


const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<One />} />
        <Route path="/two" element={<Two />} />
        <Route path="/movielist" element={<MovieList />} />
        <Route path="/moviedetail/:id" element={<MovieDetail />} />
        <Route path="/cart/:id" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;