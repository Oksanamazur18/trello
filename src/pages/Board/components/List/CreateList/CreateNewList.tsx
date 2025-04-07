import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../../store/store.ts";
import { addNewList } from "../listSlice.ts";
import NewModalList from "./NewModalList.tsx";
import type { IList } from "../../../../../common/interfaces/IList.d.ts";

interface ICreateNewListProps {
  boardId: string | undefined;
  currentLists: IList[];
  onListCreate: () => void;
}

const CreateNewList = ({boardId,currentLists,onListCreate}: ICreateNewListProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.lists.error);

  const handleAddList = async (listName: string) => {
    if (!boardId) {
      console.error("Board ID is undefined");
      return;
    }

    const position = currentLists.length + 1;
    dispatch(addNewList({ boardId, title: listName, position }))
      .unwrap()
      .then(() => {
        onListCreate();
        console.log("List created successfully!");
        setModalOpen(false);
      })
      .catch((err) => {
        console.error("Error creating list:", err);
      });
  };

  return (
    <div>
      <button type="button" className="create-list-btn" onClick={() => setModalOpen(true)}>
        + створити список
      </button>

      <NewModalList
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddList}
      />

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CreateNewList;
