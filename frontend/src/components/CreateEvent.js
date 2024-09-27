import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [collaborators, setCollaborators] = useState([]);
    const [collaboratorEmail, setCollaboratorEmail] = useState('');
    const [budget, setBudget] = useState(0);
    const [expenses, setExpenses] = useState([{ category: '', amount: '' }]);
    const [expensesDone, setExpensesDone] = useState([{ category: '', amount: 0 }]);
    const navigate = useNavigate();

    const handleAddCollaborator = () => {
        setCollaborators([...collaborators, collaboratorEmail]);
        setCollaboratorEmail('');
    };

    const handleExpenseChange = (index, key, value) => {
        const updatedExpenses = [...expenses];
        updatedExpenses[index][key] = value;
        setExpenses(updatedExpenses);

        const updatedExpensesDone = [...expensesDone];
        if (key === 'category') {
            updatedExpensesDone[index].category = value; // Keep categories in sync
        } else if (key === 'amount') {
            updatedExpensesDone[index].amount = 0; // Update amount if necessary
        }
        setExpensesDone(updatedExpensesDone);
    };

    const handleAddExpense = () => {
        setExpenses([...expenses, { category: '', amount: '' }]);
        setExpensesDone([...expensesDone, { category: '', amount: 0 }]);
    };

    /*const handleCreateEvent = async (e) => {
        e.preventDefault();

        const eventData = {
            name,
            type,
            date,
            time,
            location,
            description,
            collaborators,
            budget,
            expenses
        };

        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Event created:', data);
                // Optionally reset the form here
            } else {
                console.error('Failed to create event:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };*/

    const handleCreateEvent = async () => {

        const createdBy = JSON.parse(localStorage.getItem("user"))._id;

        const eventData = {
            name,
            type,
            date,
            time,
            location,
            description,
            collaborators,
            budget,
            expenses, 
            expensesDone,
            createdBy
        };

        let result = await fetch("http://localhost:5000/create-event", {
            method: 'post',
            body: JSON.stringify(eventData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);

        navigate("/");
    }

    return (
        <div>
            <h2>Create Event</h2>
            <form onSubmit={handleCreateEvent}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event Name" required />
                <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Event Type" required />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>

                {/* Collaborator Input */}
                <input
                    type="email"
                    value={collaboratorEmail}
                    onChange={(e) => setCollaboratorEmail(e.target.value)}
                    placeholder="Collaborator Email"
                />
                <button type="button" onClick={handleAddCollaborator}>Add Collaborator</button>

                {/* Budget Input */}
                <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget" />

                {/* Expense Inputs */}
                <h3>Expenses</h3>
                {expenses.map((expense, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={expense.category}
                            onChange={(e) => handleExpenseChange(index, 'category', e.target.value)}
                            placeholder="Expense Category"
                            required
                        />
                        <input
                            type="number"
                            value={expense.amount}
                            onChange={(e) => handleExpenseChange(index, 'amount', e.target.value)}
                            placeholder="Amount"
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddExpense}>Add Another Expense</button>

                <button type="submit">Create Event</button>
            </form>
        </div>
    );
}

export default CreateEvent;
