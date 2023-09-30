import { Routes, Route } from "react-router-dom";

import Header from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreateSetForm from "./pages/CreateSetForm";
import Flashcards from "./pages/Flashcards";
import ChoosePageToEdit from "./pages/ChoosePageToEdit";
import EditSetForm from "./pages/EditSetForm";
import FlashcardPage from "./pages/FlashcardPage";
import NoPage from "./pages/NoPage";
import DeleteSetPage from "./pages/DeleteSetPage";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/flashcards' element={<Flashcards />} />
        <Route path='/createsetform' element={<CreateSetForm />} />
        <Route path='/choosepagetoedit' element={<ChoosePageToEdit />} />
        <Route path='/editsetform/:flashcardId' element={<EditSetForm />} />
        <Route path='/deleteset' element={<DeleteSetPage />} />
        <Route path='/flashcard/:flashcardId' element={<FlashcardPage />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
      <Footer />
    </>
  );
}
