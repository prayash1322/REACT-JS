import Link from "next/link";

export default function About() {
  return (
    <div className="page">
      <h1>About Page</h1>
      <p>This is a basic Next.js app built for the React and Next.js project.</p>
      <Link href="/" className="nav-link">Back to Home</Link>
    </div>
  );
}
