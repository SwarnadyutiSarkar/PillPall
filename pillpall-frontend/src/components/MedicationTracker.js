import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MedicationTracker() {
  const [medications, setMedications] = useState([]);
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [frequency, setFrequency] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  const token = localStorage.getItem('token');

  const fetchMedications = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/medications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMedications(data);
    } catch (error) {
      alert('Error fetching medications');
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/medications/add', 
        { name, dose, frequency, reminderTime }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMedications();
      setName('');
      setDose('');
      setFrequency('');
      setReminderTime('');
    } catch (error) {
      alert('Error adding medication');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Medication Name" 
          required 
        />
        <input 
          type="text" 
          value={dose} 
          onChange={(e) => setDose(e.target.value)} 
          placeholder="Dose" 
          required 
        />
        <input 
          type="text" 
          value={frequency} 
          onChange={(e) => setFrequency(e.target.value)} 
          placeholder="Frequency" 
          required 
        />
        <input 
          type="datetime-local" 
          value={reminderTime} 
          onChange={(e) => setReminderTime(e.target.value)} 
          required 
        />
        <button type="submit">Add Medication</button>
      </form>
      <ul>
        {medications.map((med) => (
          <li key={med._id}>
            {med.name} - {med.dose} - {med.frequency} - {new Date(med.reminderTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedicationTracker;
