import { Routes, Route } from "react-router-dom";

import Header from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreateSetForm from "./pages/CreateSetForm";
import Flashcards from "./pages/Flashcards";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/flashcards' element={<Flashcards />} />
        <Route path='/createsetform' element={<CreateSetForm />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
      <Footer />
    </>
  );
}
