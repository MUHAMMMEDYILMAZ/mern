import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes:RequestHandler = async (req, res, next) => {
  try{
  const notes = await NoteModel.find().exec();
  res.status(200).json(notes);
  }
  catch(err){
    next(err);
  }
}

export const getNote:RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;
    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note ID");
        }


        const note = await NoteModel.findById(noteId).exec();
        
        if (!note) {
            throw createHttpError(404, "Note not found");
        }
            res.status(200).json(note);
        }  catch(error){
            next(error);
          } }

          
interface CreateNotBody{
    title?:string;
    text?:string;
    
}
  
export const createNote:RequestHandler<unknown,unknown,CreateNotBody,unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if(!title){
        throw createHttpError(400,"Title is required");
    }
    const newNote = await NoteModel.create({
        title: title,
        text: text,
    });
    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
}