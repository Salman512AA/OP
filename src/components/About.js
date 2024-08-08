import React from "react";

const About = () => {
  return (
    <div className="container ">
      <h1>About iNotebook</h1>
      <p>
        <strong>iNotebook</strong> is a simple and efficient way to manage your
        notes online. Whether you're a student, professional, or just someone
        who likes to stay organized, iNotebook offers an intuitive platform to
        keep all your notes in one place.
      </p>
      <h2>Features</h2>
      <ul>
        <li>
          <strong>Create Notes:</strong> Easily create and save notes with a
          title, description, and tags.
        </li>
        <li>
          <strong>Edit Notes:</strong> Modify your notes anytime to keep them
          up-to-date.
        </li>
        <li>
          <strong>Delete Notes:</strong> Remove notes that are no longer needed.
        </li>
        <li>
          <strong>Secure:</strong> All your notes are securely stored and
          accessible only by you.
        </li>
        <li>
          <strong>Responsive:</strong> Use iNotebook on any device, whether it's
          a desktop, tablet, or smartphone.
        </li>
      </ul>
      <h2>How to Use</h2>
      <ol>
        <li>
          <strong>Sign Up:</strong> Create a new account or log in with your
          existing credentials.
        </li>
        <li>
          <strong>Add Notes:</strong> Click on "Add Note" to create a new note.
          Fill in the details and save it.
        </li>
        <li>
          <strong>Edit or Delete:</strong> Click on the edit button to modify a
          note or the delete button to remove it.
        </li>
      </ol>
      <h2>Contact Us</h2>
      <p>
        For any support or feedback, feel free to reach out to us at{" "}
        <a href="mailto:msalman.haider2006@gmail">
          msalman.haider2006@gmail.com
        </a>
        .
      </p>
      <h2>Technologies Used</h2>
      <p>iNotebook is built using modern web technologies including:</p>
      <ul>
        <li>
          <strong>React:</strong> For building the user interface.
        </li>
        <li>
          <strong>Node.js and Express:</strong> For the backend server and API.
        </li>
        <li>
          <strong>MongoDB:</strong> For the database to store notes.
        </li>
      </ul>
    </div>
  );
};

export default About;
