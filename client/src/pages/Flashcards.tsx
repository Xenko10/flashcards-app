import axios from "axios";
import { useEffect, useState } from "react";

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
          return <li>{set.Tables_in_flashcards}</li>;
        })}
      </ul>
    </>
  );
}
