import React, { useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  //destructuring ,instead we can also write context.notes
  const { addNote } = context;
  // eslint-disable-next-line
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    //we write e.preventDefault(); so that page dont reload whrn we submit
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    //we write this because after update note we want our form on screen empty
    setNote({ title: "", description: "", tag: "" });
    //when we click add note of form
    props.showAlert("added successfuly", "success");
  };
  const onChange = (e) => {
    //he code setNote({ ...note, [e.target.name]: e.target.value }); only updates the property of the note state object that corresponds to the input field being changed. The rest of the properties in the note object remain unchanged.
    //it is necessary to include the name attribute in your input elements for e.target.name to work correctly.
    //[e.target.name]: e.target.value sat the value which we input
    //name="title" mean  e.target.name is associated with title
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3 my-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              id="description"
              value={note.description}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              name="tag"
              value={note.tag}
              id="tag"
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
