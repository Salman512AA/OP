import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  //destructuring ,instead we can also write context.notes
  const { notes, getNotes, editNote } = context;
  //the effect runs only once, after the initial render (when the component mounts).
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
      // eslint-disable-next-line
    } else {
      navigate("/login");
    }
  }, []);
  const updateNote = (currentNote) => {
    //ref.current.click() method is often used to trigger a click event on a button (or any other clickable element) from another button
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  //refrence of model
  const ref = useRef();
  const refClose = useRef();
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "general",
  });
  const handleClick = (e) => {
    //we write e.preventDefault(); so that page dont reload whrn we submit
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    //we want to show update alert when we click update
    props.showAlert("updated successfuly", "success");
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
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        //d-none hide button
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 my-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
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
                    name="edescription"
                    value={note.edescription}
                    id="edescription"
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
                    value={note.etag}
                    name="etag"
                    id="etag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Note</h2>
        <div className="container mx-2">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              showAlert={props.showAlert}
              note={note}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
