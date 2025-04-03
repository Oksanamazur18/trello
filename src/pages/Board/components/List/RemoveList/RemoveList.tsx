import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store/store";
import { removeList } from "../listSlice";

interface IRemoveListProps {
  boardId: string | undefined;
  listId: number;
  onListRemove: () => void;
}

const RemoveList = ({ boardId, listId, onListRemove }: IRemoveListProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveList = () => {
    if (!boardId) return;
    dispatch(removeList({ boardId, listId }))
      .unwrap()
      .then(() => {
        console.log("List removed successfully!");
        onListRemove();
      })
      .catch((error) => {
        console.error("Failed to remove list:", error);
      });
  };

  return (
    <div>
      <input
        className="btn-delete-list"
        type="button"
        value="Видалити список"
        onClick={handleRemoveList}
      />
    </div>
  );
};

export default RemoveList;
