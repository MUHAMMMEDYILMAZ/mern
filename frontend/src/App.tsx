import React, { useEffect, useState } from 'react';
import {Note as NoteModel} from "./models/note"
import Notes from "./components/notes"
import './styles/global.css'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import styles from './styles/NotePage.module.css'
import * as notesApi from './network/notes_api'
import AddNoteDialog from './components/addNoteDialog';
import {FaPlus} from "react-icons/fa"


function App() {

    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
    const [noteEdit , setNoteEdit] = useState<NoteModel | null>(null);
    const [notesLoading, setNotesLoading] = useState(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);


   const [notes, setNotes] = useState<NoteModel[]>([]);
   useEffect(() => {
    async function loadNotes() {
    try{
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await notesApi.fecheNotes();
        setNotes(notes);

    } 
    catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
    } finally{
        setNotesLoading(false);
    
    }

}
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

   const notesGrid =
   <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>

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
   

  return (
    <Container className={styles.notesPage}>
       <Button onClick={() => setShowAddNoteDialog(true)} className={`mb-4 ${styles.AddButton} ${styles.flexCenter}`}>
            <FaPlus className='me-1 mb-1'/>
        Add Note
        </Button>
        
        {notesLoading && <Spinner animation='border' variant='primary'/>}
        {showNotesLoadingError && <div>Failed to load notes</div>}
        {!notesLoading && !showNotesLoadingError && 
        <>
        {
            notes.length > 0 ?   notesGrid
            : <div className='text-center'>No notes</div>
        }
        </>
        }

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
