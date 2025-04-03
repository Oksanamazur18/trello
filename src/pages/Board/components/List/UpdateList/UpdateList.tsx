import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store/store";
import { updateList } from "../../../../Board/components/List/listSlice";
import { nameRegex } from "../../../../../common/constants/regex";
interface IUpdateListProps {
  boardId: number;
  listId: number;
  initialTitle: string;
  isEditing: boolean;
  onClose: () => void;
}

const UpdateList = (props: IUpdateListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [listTitle, setListTitle] = useState(props.initialTitle);
  const [error, setError] = useState("");

  useEffect(() => {
    setListTitle(props.initialTitle);
  }, [props.initialTitle]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (nameRegex.test(value)) {
      setError("");
    } else {
      setError(
        "Назва може містити лише цифри, літери, пробіли, тире, крапки та нижні підкреслення.",
      );
    }
    setListTitle(value);
  };

  const handleSave = () => {
    if (error || !listTitle) {
      setError("Невірна назва списку");
      return;
    }

    dispatch(
      updateList({
        boardId: props.boardId,
        listId: props.listId,
        title: listTitle,
      }),
    )
      .unwrap()
      .then(() => {
        console.log("List updated successfully!");
        props.onClose();
      })
      .catch((err) => {
        setError("Не вдалося зберегти назву списку");
        console.error(err);
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  if (!props.isEditing) {
    return null;
  }

  return (
    <div className="titleChange">
      <input
        type="text"
        value={listTitle}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyPress}
        autoFocus
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UpdateList;
