import React from "react";
import { Bookmark } from "lucide-react";
import Card from "./components/Card";

const App = () => {
  const jobOpenings = [
    {
      brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR556MwnY5oRUk0nsHvN-HKxvpvTzBFDHtYzpVuTO3L4w&s=10",
      company: "Google",
      datePosted: "3 days ago",
      role: "Frontend Engineer",
      tag1: "Full-time",
      tag2: "Senior Level",
      pay: 85,
      location: "Bangalore, India",
    },
    {
      brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf0lP2_kgCkHUWXDSmcPvGTYhE2XLv3amPV-aPYMxhrQ&s=10",
      company: "Meta",
      datePosted: "1 week ago",
      role: "Product Designer",
      tag1: "Full-time",
      tag2: "Mid Level",
      pay: 78,
      location: "Mumbai, India",
    },
    {
      brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJW-Kq9gfty56z8kGjFSbD8c4qkG3HmSul4stGRc3jig&s=10",
      company: "Amazon",
      datePosted: "5 days ago",
      role: "Backend Developer",
      tag1: "Full-time",
      tag2: "Junior Level",
      pay: 45,
      location: "Hyderabad, India",
    },
    {
      brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYaHC_9YxqnPCCaadcefalsMg2EOkjYOedtUHk1DvhWQ&s=10",
      company: "Netflix",
      datePosted: "2 weeks ago",
      role: "Data Scientist",
      tag1: "Full-time",
      tag2: "Senior Level",
      pay: 95,
      location: "Los Angeles, USA",
    },
    {
      brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ2WwEvTUHVPlvyQ2-TnGqUOloNMydpv5M9-73YQvjHg&s=10",
      company: "Apple",
      datePosted: "4 days ago",
      role: "iOS Engineer",
      tag1: "Full-time",
      tag2: "Senior Level",
      pay: 90,
      location: "Cupertino, USA",
    },
    {
      brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPZEN2r056LDjjb6IT5qShwFPl4uJy1-BAgP0hGMmiqQ&s=10",
      company: "Microsoft",
      datePosted: "10 days ago",
      role: "Cloud Solutions Architect",
      tag1: "Full-time",
      tag2: "Senior Level",
      pay: 88,
      location: "Pune, India",
    },
    {
      brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYaHC_9YxqnPCCaadcefalsMg2EOkjYOedtUHk1DvhWQ&s=10",
      company: "Netflix",
      datePosted: "6 weeks ago",
      role: "UI/UX Intern",
      tag1: "Part-time",
      tag2: "Junior Level",
      pay: 22,
      location: "Bangalore, India",
    },
    {
      brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR556MwnY5oRUk0nsHvN-HKxvpvTzBFDHtYzpVuTO3L4w&s=10",
      company: "Google",
      datePosted: "3 weeks ago",
      role: "Machine Learning Engineer",
      tag1: "Full-time",
      tag2: "Senior Level",
      pay: 92,
      location: "Mountain View, USA",
    },
    {
      brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJW-Kq9gfty56z8kGjFSbD8c4qkG3HmSul4stGRc3jig&s=10",
      company: "Amazon",
      datePosted: "8 days ago",
      role: "DevOps Engineer",
      tag1: "Full-time",
      tag2: "Mid Level",
      pay: 55,
      location: "Delhi, India",
    },
    {
      brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf0lP2_kgCkHUWXDSmcPvGTYhE2XLv3amPV-aPYMxhrQ&s=10",
      company: "Meta",
      datePosted: "12 weeks ago",
      role: "Marketing Associate",
      tag1: "Part-time",
      tag2: "Junior Level",
      pay: 25,
      location: "New York, USA",
    },
  ];

  return (
    <div className="parent">
      {jobOpenings.map((job, index) => (
        <div key={index}>
          <Card
          brandLogo={job.brandLogo}
          company={job.company}
          datePosted={job.datePosted}
          role={job.role}
          tag1={job.tag1}
          tag2={job.tag2}
          pay={job.pay}
          location={job.location}
        />
        </div>
      ))}
    </div>
  );
};

export default App;
