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
        <Route path='/' element={<Home />} />
        <Route path='/Flashcards' element={<Flashcards />} />
        <Route path='/CreateSetForm' element={<CreateSetForm />} />
        <Route path='/NoPage' element={<NoPage />} />
      </Routes>
      <Footer />
    </>
  );
}
