import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import MusicTable from "./components/MusicTable";
import About from "./components/About";
import TrackInfo from "./components/TrackInfo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="music" element={<MusicTable />} />
          <Route path="music/:id" element={<TrackInfo />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
