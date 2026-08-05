import meImage from '../assets/me.JPG'

function WelcomeSection() {
  const today = new Date();
  const currentDate = today.toLocaleDateString();

  return (
    <section className="welcome-section">
      <h2>Welcome</h2>
      <div className="welcome-info">
        <p>Name: Prayash</p>
        <p>Course: Full Stack Development</p>
        <p>Institute: Red & White Skill Education</p>
        <p>Date: {currentDate}</p>
      </div>
      <div className="welcome-image">
        <img
        src={meImage}
        alt="student"
      />
      </div>
    </section>
  );
}

export default WelcomeSection;
