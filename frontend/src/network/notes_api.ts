import { Note } from "../models/note";

 async function fecheData(input: RequestInfo, init?: RequestInit ) {
    
        const response = await fetch(input, init);
         if (response.ok){
            return response
         }
        else {
            const errorBody = await response.json();
            const errorMessage = errorBody.message;
            throw Error(errorMessage);
        }
         
}

export async function fecheNotes(): Promise<Note[]> {
    const response = await fecheData('/api/notes', {method: 'GET'});
    return  response.json();
}


export interface NoteInput {
    title: string;
    text?: string;
}

export async function createNotes(note: NoteInput): Promise<Note> {
    const response = await fecheData('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    });
    return response.json();
}

export async function deleteNotes(noteId: string) {
    await fecheData(`/api/notes/${noteId}`, {
        method: 'DELETE'
    });
}


export async function updateNotes(noteId: string, note: NoteInput): Promise<Note> {
    const response = await fecheData(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    });
    return response.json();
}