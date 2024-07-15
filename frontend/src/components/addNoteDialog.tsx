import React from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'
import { Note } from '../models/note'
import { useForm } from 'react-hook-form';
import * as notesApi from '../network/notes_api';
import {NoteInput}from "../network/notes_api"


interface AddNoteDialogProps {
    noteEdit ?: Note,
    onDismiss: () => void,
    onNoteAdded: (note:Note) => void,
    
}


const AddNoteDialog = ({onDismiss,onNoteAdded, noteEdit}:AddNoteDialogProps) => {

const {register ,handleSubmit, formState:{errors , isSubmitting}} = useForm<NoteInput>({
    defaultValues :{
        title: noteEdit?.title || "",
        text: noteEdit?.text || "",
    }
});

async function onSubmit(input:NoteInput){
    try{
        let noteResponse:Note;
        if(noteEdit){
            noteResponse = await notesApi.updateNotes(noteEdit._id,input);
        }
        else{

         noteResponse = await notesApi.createNotes(input);
        }
        onNoteAdded(noteResponse);
    }
    catch (error){
        console.error(error);
        alert(error);
    }}
  return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteEdit ? "Edit Note" : "Add Note"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id='addNoteForm' onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup className='mb-3'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' placeholder='Enter title' {...register("title" , {required: "Required"})} isInvalid={!!errors.title}/>
                        <Form.Control.Feedback type='invalid'>{errors.title?.message}</Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup className='mb-3'>
                        <Form.Label>text</Form.Label>
                        <Form.Control as='textarea' placeholder='Enter content' rows={5} {...register("text")}/>
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type='submit' form='addNoteForm' disabled={isSubmitting}>Add Note</Button>
            </Modal.Footer>
           
        </Modal>
  )
}

export default AddNoteDialog
