import Header from "./components/Header";
import WelcomeSection from "./components/WelcomeSection";
import Footer from "./components/Footer";
import RestSpreadDemo from "./components/RestSpreadDemo";
import StudentCardList from "./components/StudentCardList";
import StateString from "./components/StateString";
import StateNumber from "./components/StateNumber";
import StateBoolean from "./components/StateBoolean";
import StateArray from "./components/StateArray";
import StateObject from "./components/StateObject";
import StudentManager from "./components/StudentManager";

const App = () =>  {
  return (
    <div>
      <Header />
      <WelcomeSection />
      <RestSpreadDemo />
      <StudentCardList />

      <section className="section">
        <h2>useState Examples</h2>
        <StateString />
        <StateNumber />
        <StateBoolean />
        <StateArray />
        <StateObject />
      </section>

      <section className="section">
        <h2>useEffect + Local Storage</h2>
        <StudentManager />
      </section>

      <Footer />
    </div>
  );
}

export default App
