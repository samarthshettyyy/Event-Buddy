import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

// Register the components you want to use
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetTracking = () => {
    const params = useParams(); // Get event ID from URL params
    const [eventData, setEventData] = useState(null);
    const [newExpense, setNewExpense] = useState({ category: '', amount: '' });
    const [updateDone, setUpdateDone] = useState({ category: '', amount: '' });

    useEffect(() => {
        // Fetch the event data based on eventId
        const fetchEventData = async () => {
            const response = await fetch(`http://localhost:5000/my-event/${params.id}`);
            const data = await response.json();
            setEventData(data);
        };
        fetchEventData();
    }, [params.id]);

    const handleAddExpense = () => {
        // Logic to add new expense
        const updatedExpenses = [...eventData.expenses, newExpense];
        setEventData({ ...eventData, expenses: updatedExpenses });
        setNewExpense({ category: '', amount: '' });
    };

    const handleUpdateExpenseDone = (index, value) => {
        const updatedExpensesDone = [...eventData.expensesDone];
        updatedExpensesDone[index].amount = value;
        setEventData({ ...eventData, expensesDone: updatedExpensesDone });
        console.warn(updatedExpensesDone);
    };

    const handleSubmitUpdate = async () => {
        // Submit updated expensesDone to the backend
        await fetch(`http://localhost:5000/my-event/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ expensesDone: eventData.expensesDone }),
            headers: { 'Content-Type': 'application/json' }
        });
    };

    if (!eventData) return <div>Loading...</div>;

    // Chart Data Setup
    const expenseCategories = eventData.expenses.map(e => e.category);
    const expensesData = eventData.expenses.map(e => e.amount);
    const expensesDoneData = eventData.expensesDone.map(e => e.amount);

    const chartData = {
        labels: expenseCategories,
        datasets: [
            {
                label: 'Planned Expenses',
                data: expensesData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Expenses Done',
                data: expensesDoneData,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: { beginAtZero: true },
        },
    };

    return (
        <div>
            <h2>Budget Tracking for Event</h2>

            {/* Bar Chart */}
            <Bar data={chartData} options={chartOptions} />

            {/* Add New Expense */}
            <h3>Add New Expense</h3>
            <input
                type="text"
                placeholder="Category"
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            />
            <input
                type="number"
                placeholder="Amount"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
            <button onClick={handleAddExpense}>Add Expense</button>

            {/* Update Expenses Done */}
            <h3>Update Expenses Done</h3>
            {eventData.expensesDone.map((expense, index) => (
                <div key={index}>
                    <span>{expense.category}</span>
                    <input
                        type="number"
                        value={expense.amount}
                        onChange={(e) => handleUpdateExpenseDone(index, e.target.value)}
                    />
                </div>
            ))}
            <button onClick={handleSubmitUpdate}>Update Expenses Done</button>
        </div>
    );
}

export default BudgetTracking;
