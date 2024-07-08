import React, { useEffect, useState } from 'react';
import {Note as NoteModel} from "./models/note"
import Notes from "./components/notes"
import './styles/global.css'
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from './styles/NotePage.module.css'
import * as notesApi from './network/notes_api'
import AddNoteDialog from './components/addNoteDialog';


function App() {

   const [notes, setNotes] = useState<NoteModel[]>([]);
   useEffect(() => {
    async function loadNotes() {
    try{
        const notes = await notesApi.fecheNotes();
        setNotes(notes);

    } 
    catch (error) {
        console.error(error);
        alert(error)
   
    } }
    loadNotes();
   }, []);


   const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  return (
    <Container>
       <Button onClick={() => setShowAddNoteDialog(true)} className={styles.addNoteButton}>Add Note</Button>
        <Row xs={1} md={2} xl={3} className='g-4'>

             {notes.map((note) => ( 
              <Col key={note._id}>
                 <Notes  note={note} className={styles.note}/>
                 </Col>
                ))
             }

        </Row>
        {showAddNoteDialog && 
            <AddNoteDialog  
            onDismiss={() => setShowAddNoteDialog(false)}
            />
        }
    </Container>
  );
}

export default App;
