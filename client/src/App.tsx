import { Routes, Route } from "react-router-dom";

import Header from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import CreateSetForm from "./pages/CreateSetForm/CreateSetForm";
import Flashcards from "./pages/ChooseFlashcardSet/ChooseFlashcardSet";
import ChoosePageToEdit from "./pages/ChoosePageToEdit/ChoosePageToEdit";
import EditSetForm from "./pages/EditSetForm/EditSetForm";
import PlayWithFlashcards from "./pages/PlayWithFlashcards/PlayWithFlashcards";
import NoPage from "./pages/NoPage/NoPage";
import ChooseSetToDelete from "./pages/ChooseSetToDelete/ChooseSetToDelete";

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
        <Route
          path='/flashcard/:flashcardId'
          element={<PlayWithFlashcards />}
        />
        <Route path='*' element={<NoPage />} />
      </Routes>
      <Footer />
    </>
  );
}
