import axios from "axios";
import { useEffect, useState } from "react";
import ListComponent from "./pages_components/ListComponent";
import { v4 as uuidv4 } from "uuid";

export default function Flashcards() {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5174/getsets")
      .then((res: any) => {
        setSets(res.data);
      })
      .catch((error) => {
        console.error("Error fetching sets:", error);
      });
  }, []);

  return (
    <>
      <div>Flashcards</div>
      <ul>
        {sets.map((set: any) => {
          return (
            <ListComponent set={set.Tables_in_flashcards} key={uuidv4()} />
          );
        })}
      </ul>
    </>
  );
}
