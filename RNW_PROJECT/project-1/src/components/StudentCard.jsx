function StudentCard(props) {
  return (
    <div className="student-card">
      <h3>{props.name}</h3>
      <p>City: {props.city}</p>
      <p>State: {props.state}</p>
      <p>Country: {props.country}</p>
      <p>Course: {props.course}</p>
    </div>
  );
}

export default StudentCard;
