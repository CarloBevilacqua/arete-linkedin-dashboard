import { useEffect, useState } from 'react';
import { BarChart, PieChart } from 'recharts';
import scrapeLinkedIn from './scraper';

const RealData = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    scrapeLinkedIn('https://www.linkedin.com/in/carlobevilacquaariosti').then(data => setProfile(data));
  }, []);

  if (!profile) return <div>Loading...</div>;

  const experienceData = profile.experience.map((exp, idx) => ({name: `Exp ${idx+1}`, value: 1}));
  const skillsData = profile.skills.map((skill, idx) => ({name: skill, value: 1}));

  return (
    <div className="p-4">
      <h1>Real LinkedIn Data</h1>
      <h2>{profile.name}</h2>
      <p>{profile.headline}</p>
      <p>{profile.summary}</p>
      <p>Followers: {profile.followers}</p>
      <p>Location: {profile.location}</p>
      <h3>Experience</h3>
      <BarChart width={600} height={300} data={experienceData} />
      <h3>Skills</h3>
      <PieChart width={400} height={400} data={skillsData} />
    </div>
  );
};

export default RealData;