import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CreateSet from "./CreateSet";

export default function App() {
  const [uuids, setNewUuid] = useState<string[]>([uuidv4()]);

  function handleNewUuid() {
    setNewUuid((prevUuid: any) => [...prevUuid, uuidv4()]);
  }

  return (
    <>
      <button onClick={handleNewUuid}>New question</button>
      {uuids.map((uuid) => {
        return <CreateSet key={uuid} />;
      })}
    </>
  );
}
