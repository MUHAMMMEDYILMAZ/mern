import React, { useEffect, useState } from 'react';
import {Note as NoteModel} from "./models/note"
import Notes from "./components/notes"
import './styles/global.css'
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from './styles/NotePage.module.css'
import * as notesApi from './network/notes_api'
import AddNoteDialog from './components/addNoteDialog';
import {FaPlus} from "react-icons/fa"


function App() {

    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
    const [noteEdit , setNoteEdit] = useState<NoteModel | null>(null);


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

   async function deleteNotes(note:NoteModel) {
    try{
        await notesApi.deleteNotes(note._id);
        setNotes(notes.filter((n) => n._id !== note._id));
    }
    catch (error){
        console.error(error);
        alert(error);
    }
    
   }

   

  return (
    <Container>
       <Button onClick={() => setShowAddNoteDialog(true)} className={`mb-4 ${styles.AddButton} ${styles.flexCenter}`}>
            <FaPlus className='me-1 mb-1'/>
        Add Note
        </Button>
        <Row xs={1} md={2} xl={3} className='g-4'>

             {notes.map((note) => ( 
              <Col key={note._id}>
                 <Notes  
                note={note}
                className={styles.note} 
                onDelete={deleteNotes}
                onNoteClick={setNoteEdit}

                   
                 />
                 </Col>
                ))
             }

        </Row>
        {showAddNoteDialog && 
            <AddNoteDialog  
            onDismiss={() => setShowAddNoteDialog(false)}
            onNoteAdded = {(note) =>{ setNotes([...notes, note]);
            setShowAddNoteDialog(false);
            }}
           
            />
        }
        {
            noteEdit && 
            <AddNoteDialog
            noteEdit={noteEdit}
            onDismiss={() => setNoteEdit(null)}
            onNoteAdded={(updatedNote) => {
                setNotes(notes.map(n => n._id === updatedNote._id ? updatedNote : n));
                setNoteEdit(null);
            }}
            />
        }
    </Container>
  );
}

export default App;
