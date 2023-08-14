import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import One from './views/One';
import Two from './views/Two';
import MovieList from "./views/MovieList";


const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<One />} />
        <Route path="/two" element={<Two />} />
        <Route path="/movielist" element={<MovieList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;