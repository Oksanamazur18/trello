import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { closeModal, updateCardData } from './modalSlice';
import { useParams } from 'react-router-dom';
import styles from './modal.module.scss';
import { ICard } from '../../common/interfaces/ICard';
import { fetchBoard } from '../Board/boardSlice';
import { useNavigate } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Modal = () => {
  const { isOpen, cardData } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch<AppDispatch>();
  const { board_id } = useParams<{ board_id: string }>();
  const navigate = useNavigate();
  const listId = useSelector((state: RootState) => state.modal.list_id);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedCardData, setEditedCardData] = useState<ICard | null>(null);

  useEffect(() => {
    if (cardData) {
      setEditedCardData({ ...cardData });
    }
  }, [cardData]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!board_id) {
    console.error('board_id is undefined!');
    return <div>Error: Board ID is missing.</div>;
  }

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(closeModal());
    navigate(`/board/${board_id}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedCardData((prevState) =>
      prevState ? { ...prevState, [name]: value } : null
    );
  };


  const handleSave = () => {
    if (editedCardData && board_id && listId !== null) {
      navigate(`/board/${board_id}`);
      dispatch(updateCardData({ updatedCardData: editedCardData, boardId: board_id, listId }))
        .unwrap()
        .then(() => {
          console.log('Card updated successfully!');
          dispatch(fetchBoard(board_id));
          dispatch(closeModal());
        })
        .catch((error) => {
          console.error('Failed to update card:', error);
        });
    }
    setIsEditingTitle(false);
    setIsEditingDescription(false);
  };
  
  const handleClickTitle = (e: React.MouseEvent) => {
    e.stopPropagation();  
    setIsEditingTitle(true);  
  };

  const handleClickDescription = (e: React.MouseEvent) => {
    e.stopPropagation();  
    setIsEditingDescription(true);  
  };

  const handleClickOut=(e:React.MouseEvent)=>{
    e.stopPropagation();
    handleSave();
  }

  const handleBlur = () => {

        handleSave();
      };
  return (
    <div className={styles.modal} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) =>handleClickOut(e)}>
        <button className={styles.close} onClick={handleClose}>
        <FontAwesomeIcon  icon={faXmark} />
        </button>
        
        <div  onClick={handleClickTitle}>
        {isEditingTitle ? (
          <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
          className='text'
            type="text"
            id="title"
            name="title"
            value={editedCardData?.title || ''}
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
        </div>) :
          (<p className='text'><span>Title: </span> {editedCardData?.title}</p>)}
      </div>
        
      <div  onClick={handleClickDescription}>
        {isEditingDescription ? (
           <div className="form-group">
           <label htmlFor="description">Description:</label>
           <textarea
             id="description"
             name="description"
             value={editedCardData?.description || ''}
             onChange={handleInputChange}
           />
         </div>) :
          (<p className='text'><span>Description:</span> {editedCardData?.description}</p>)}
      </div>
       
    
        <button className={styles.btnSave} onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default Modal;



