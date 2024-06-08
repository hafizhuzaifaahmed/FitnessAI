import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GeneratePlan.css';

const GeneratePlan = ({isOpen}) => {
  const [days, setDays] = useState('');
  const [formData, setFormData] = useState({ goal: '' });
  const [dayMuscles, setDayMuscles] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleDaysChange = (e) => {
    const value = e.target.value;
    setDays(value);

    // Initialize form data for the number of days entered
    const newDayMuscles = Array.from({ length: value }, (_, index) => ({
      day: index + 1,
      targetMuscle: '',
    }));

    setDayMuscles(newDayMuscles);
  };

  const handleDayMuscleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDayMuscles = dayMuscles.map((data, idx) =>
      idx === index ? { ...data, [name]: value } : data
    );

    setDayMuscles(updatedDayMuscles);
  };

  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    dayMuscles.forEach((data, index) => {
      if (!data.targetMuscle) {
        newErrors[index] = `Target muscle for day ${index + 1} is required`;
      }
    });

    if (!formData.goal) {
      newErrors.goal = 'Goal is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      navigate('/plan', { state: { values: { dayMuscles, goal: formData.goal } } });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div  className={`content ${isOpen ? 'shifted' : ''}`}>
      <div className="generate-plan-container">
      <h1 className="generate-plan-heading">Fitness Plan Generator</h1>
      <form className="generate-plan-form" onSubmit={handleSubmit}>
        <div>
          <label>
            Number of Days:
            <input
              type="number"
              value={days}
              onChange={handleDaysChange}
              min="1"
              max="7"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Goal:
            <select
              name="goal"
              onChange={handleGoalChange}
              value={formData.goal}
              required
            >
              <option value="" label="Select goal" />
              <option value="weight loss" label="Weight Loss" />
              <option value="muscle gain" label="Muscle Gain" />
              <option value="general fitness" label="General Fitness" />
            </select>
          </label>
          {errors.goal && <div className="error-message">{errors.goal}</div>}
        </div>

        {dayMuscles.map((data, index) => (
          <div key={index}>
            <label>
              Day {index + 1} - Target Muscle:
              <select
                name="targetMuscle"
                onChange={(e) => handleDayMuscleChange(index, e)}
                value={data.targetMuscle}
                required
              >
                <option value="" label="Select target muscle" />
                <option value="arms" label="Arms" />
                <option value="legs" label="Legs" />
                <option value="core" label="Core" />
                <option value="chest" label="Chest" />
                <option value="back" label="Back" />
                <option value="shoulders" label="Shoulders" />
              </select>
            </label>
            {errors[index] && (
              <div className="error-message">{errors[index]}</div>
            )}
          </div>
        ))}

        <button type="submit">Generate Plan</button>
      </form>
    </div>
    </div>
  );
};

export default GeneratePlan;
