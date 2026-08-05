import { useState, useEffect } from "react";

function StudentManager() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const savedStudents = localStorage.getItem("students");
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  function addStudent() {
    if (name.trim() === "") return;
    setStudents([...students, name]);
    setName("");
  }

  function deleteStudent(index) {
    const updatedStudents = students.filter((student, i) => i !== index);
    setStudents(updatedStudents);
  }

  return (
    <div style={{ padding: "10px", margin: "10px 0" }}>
      <h3>Student Information Manager</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter student name"
        className="manager-input"
      />
      <button onClick={addStudent} className="btn">Add Student</button>

      <ul className="student-list">
        {students.map((student, index) => (
          <li key={index}>
            {student}
            <button onClick={() => deleteStudent(index)} className="btn btn-delete">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentManager;
