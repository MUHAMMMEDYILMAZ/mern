import {Note as NoteModel} from "../models/note"
import { Card } from 'react-bootstrap';
import  styles from '../styles/Note.module.css'
import { formatDate } from "../utils/formateDate";

interface NoteProps {
    note: NoteModel;
    className?: string;
    }


    const Notes = ({ note , className }:NoteProps) => {
    const {title, text , updatedAt, createdAt} = note;

    let createdUpdatedText :string ;
    if(updatedAt>createdAt){
        createdUpdatedText = "Updated at: "  + formatDate(updatedAt);
    }
    else{
        createdUpdatedText = "Created at: " + formatDate(createdAt);
    }



  return (
    
   <Card className={`${styles.noteCard} ${className}`} >
    <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
    </Card.Body>
    <Card.Footer>
        <small className="text-muted"> {createdUpdatedText}</small>
    </Card.Footer>
   </Card>
   

  )
}

export default Notes
