import {Note as NoteModel} from "../models/note"
import { Card } from 'react-bootstrap';
import  styles from '../styles/Note.module.css'
import { formatDate } from "../utils/formateDate";
import {MdDelete} from "react-icons/md"

interface NoteProps {
    note: NoteModel;
    onDelete : (note: NoteModel) => void;
    className?: string;
    onNoteClick: (note: NoteModel) => void;
    }


    const Notes = ({ onNoteClick, note , onDelete , className }:NoteProps) => {
    const {title, text , updatedAt, createdAt} = note;

    let createdUpdatedText :string ;
    if(updatedAt>createdAt){
        createdUpdatedText = "Updated at: "  + formatDate(updatedAt);
    }
    else{
        createdUpdatedText = "Created at: " + formatDate(createdAt);
    }



  return (
    
   <Card className={`${styles.noteCard} ${className}`}
    onClick={() => onNoteClick(note)}
    >
    <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.flexcenter}>{title}
        <MdDelete className="text-muted ms-auto"
        onClick={(e) =>{ onDelete(note)
        e.stopPropagation();
        }}
        />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
    </Card.Body>
    <Card.Footer>
        <small className={styles.textmuted}> {createdUpdatedText}</small>
    </Card.Footer>
   </Card>
   

  )
}

export default Notes
