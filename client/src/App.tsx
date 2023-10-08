import { Routes, Route } from "react-router-dom";

import Header from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreateSetForm from "./pages/CreateSetForm";
import Flashcards from "./pages/ChooseFlashcardSet";
import ChoosePageToEdit from "./pages/ChoosePageToEdit";
import EditSetForm from "./pages/EditSetForm";
import FlashcardPage from "./pages/UseFlashcardSet";
import NoPage from "./pages/NoPage";
import ChooseSetToDelete from "./pages/ChooseSetToDelete";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/flashcards' element={<Flashcards />} />
        <Route path='/create-set-form' element={<CreateSetForm />} />
        <Route path='/choose-page-to-edit' element={<ChoosePageToEdit />} />
        <Route path='/edit-set-form/:flashcardId' element={<EditSetForm />} />
        <Route path='/choose-set-to-delete' element={<ChooseSetToDelete />} />
        <Route path='/flashcard/:flashcardId' element={<FlashcardPage />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
      <Footer />
    </>
  );
}
