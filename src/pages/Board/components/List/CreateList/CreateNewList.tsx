import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../../store/store';
import { addNewList } from '../../../../Board/components/List/listSlice';
import NewModalList from './NewModalList';

import { IList } from '../../../../../common/interfaces/IList';

interface ICreateNewListProps {
  boardId: string | undefined;
  currentLists: IList[];
  onListCreate: ()=> void;
}

const CreateNewList = (props: ICreateNewListProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.lists.error);

  const handleAddList = async (listName: string) => {
    if (!props.boardId) {
      console.error('Board ID is undefined');
      return;
    }

    const position = props.currentLists.length + 1;

    dispatch(addNewList({ boardId: props.boardId, title: listName, position }))
      .unwrap()
      .then(() => {
        props.onListCreate();
        console.log('List created successfully!');
        setModalOpen(false);
      })
      .catch((err) => {
        console.error('Error creating list:', err);
      });
     
  };

  return (
    <div>
      <button className="create-list-btn" onClick={() => setModalOpen(true)}>
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
