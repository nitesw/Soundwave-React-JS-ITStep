import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import MusicTable from "./components/MusicTable";
import About from "./components/About";
import TrackInfo from "./components/TrackInfo";
import CreateTrack from "./components/CreateTrack";
import EditTrack from "./components/EditTrack";
import Favourites from "./components/Favourites";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="music" element={<MusicTable />} />
          <Route path="music/create" element={<CreateTrack />} />
          <Route path="music/edit/:id" element={<EditTrack />} />
          <Route path="music/:id" element={<TrackInfo />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
