import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  //Get a NOte
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  //Add a Note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnotes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    //for frontend
    // let note = {
    //   _id: "66adfbf3ff17e18d334afadc8",
    //   user: "66aba0e3d3997d14b6b2e76b",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2024-08-03T09:44:19.717Z",
    //   __v: 0,
    // };
    if (!response.ok) {
      console.error("Failed to add note:", response.statusText);
      return;
    }

    const note = await response.json();
    setNotes(notes.concat(note));
    //concat return new note
    //setNotes(notes.concat(note));
  };
  //Delete a Note

  const deleteNote = async (_id) => {
    //api call deleting from backend
    const response = await fetch(`${host}/api/notes/deletenote/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    //console.log("deleting note with id" + response.json + _id);
    //"notes" is collection of notes,return only those notes in which id is not equal to note id
    const newNotes = notes.filter((note) => {
      return note._id !== _id;
    });
    setNotes(newNotes);
  };
  //Edit a Note
  const editNote = async (_id, title, description, tag) => {
    //API call for backend
    const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    //console.log(json);
    //logic to edit in client for frontend
    //we cant change state without setstate so we make copy  of notes
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === _id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        //we write break so loop stop if condion match
        break;
      }
    }
    setNotes(newNotes);
  };
  const getUserdata = async () => {
    // // API call
    const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (json) {
      console.log(json.name);
      console.log(json.email);
      // Optionally, you can return the data or store it in a state
      return json;
    } else {
      console.log("Failed to retrieve user data");
    }
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes, getUserdata }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
