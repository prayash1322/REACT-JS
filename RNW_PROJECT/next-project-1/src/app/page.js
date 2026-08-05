import Link from "next/link";
import StudentCard from "./components/StudentCard";

const students = [
  { name: "Aarav", city: "Surat", state: "Gujarat", country: "India", course: "Full stack Development" },
  { name: "Diya", city: "Ahmedabad", state: "Gujarat", country: "India", course: "Graphic Designing" },
  { name: "Kabir", city: "Mumbai", state: "Maharashtra", country: "India", course: "AI/ML Data Science" },
];

export default function Home() {
  return (
    <div className="page">
      <h1>Home Page</h1>
      <Link href="/about" className="nav-link">Go to About Page</Link>

      <h2>Student List</h2>
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
    </div>
  );
}
