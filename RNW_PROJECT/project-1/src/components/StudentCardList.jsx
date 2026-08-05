import StudentCard from "./StudentCard";

const students = [
  { name: "Om", city: "Surat", state: "Gujarat", country: "India", course: "Full Stack Development" },
  { name: "Diya", city: "Ahmedabad", state: "Gujarat", country: "India", course: "Graphic Designing" },
  { name: "Kabir", city: "Mumbai", state: "Maharashtra", country: "India", course: "Video editing" },
  { name: "Isha", city: "Pune", state: "Maharashtra", country: "India", course: "Graphic Designing" },
  { name: "Reyansh", city: "Vadodara", state: "Gujarat", country: "India", course: "AI/ML Data Science" },
];

function StudentCardList() {
  return (
    <section style={{ padding: "20px",  }}>
      <h2 style={{marginBottom:"15px", color:"indigo",textAlign:"center"}}>Student Cards (Props Example)</h2>
      <div className="card-list">
        {students.map((student, index) => (
          <StudentCard
            key={index}
            name={student.name}
            city={student.city}
            state={student.state}
            country={student.country}
            course={student.course}
          />
        ))}
      </div>
    </section>
  );
}

export default StudentCardList;
