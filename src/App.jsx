import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BarChart, PieChart, LineChart } from 'recharts';
import data from './data.json';
import RealData from './RealData';
import './App.css';

function App() {
  const [teamFilter, setTeamFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState(3);
  const [memberFilter, setMemberFilter] = useState('');

  const filteredData = data.filter(item => 
    (teamFilter ? item.team === teamFilter : true) &&
    (memberFilter ? item.name.toLowerCase().includes(memberFilter.toLowerCase()) : true)
  );

  // Placeholder for time filter (multiply by time for demo)
  const adjustedData = filteredData.map(item => ({...item, activityLevel: item.activityLevel * (timeFilter / 3)}));

  // Ranking for most active
  const sortedData = [...adjustedData].sort((a, b) => b.activityLevel - a.activityLevel);

  const dashboardContent = (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Areté LinkedIn Dashboard</h1>
      <div className="flex gap-4 my-4">
        <select onChange={e => setTeamFilter(e.target.value)} className="border p-2">
          <option value="">Tutti i Team</option>
          <option value="Market Intelligence">Market Intelligence</option>
          <option value="Leadership">Leadership</option>
          <option value="Growth Strategies">Growth Strategies</option>
          <option value="Policy Evaluation">Policy Evaluation</option>
        </select>
        <input type="text" placeholder="Filtro Membro" onChange={e => setMemberFilter(e.target.value)} className="border p-2" />
        <select onChange={e => setTimeFilter(parseInt(e.target.value))} className="border p-2">
          <option value="1">1 Mese</option>
          <option value="3">3 Mesi</option>
          <option value="6">6 Mesi</option>
          <option value="12">1 Anno</option>
        </select>
      </div>
      <h2>Post Areté Interagiti</h2>
      <BarChart width={600} height={300} data={adjustedData}>
        {/* Add axes and bars for likes, comments, shared */}
      </BarChart>
      <h2>% Attività Agrifood</h2>
      <PieChart width={400} height={400}>
        {/* Pie for percentAgrifood */}
      </PieChart>
      <h2>Classifica Attività</h2>
      <LineChart width={600} height={300} data={sortedData}>
        {/* Line for activityLevel */}
      </LineChart>
      <table className="w-full border mt-4">
        <thead>
          <tr><th>Nome</th><th>Team</th><th>Likes</th><th>Commenti</th><th>Shared</th><th>% Agrifood</th></tr>
        </thead>
        <tbody>
          {adjustedData.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.team}</td>
              <td>{item.likes}</td>
              <td>{item.comments}</td>
              <td>{item.postsShared}</td>
              <td>{item.percentAgrifood}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <Router>
      <nav className="p-4 bg-blue-500 text-white">
        <Link to="/" className="mr-4">Dashboard</Link>
        <Link to="/real-data">Real Data</Link>
      </nav>
      <Routes>
        <Route path="/" element={dashboardContent} />
        <Route path="/real-data" element={<RealData />} />
      </Routes>
    </Router>
  );
}

export default App;