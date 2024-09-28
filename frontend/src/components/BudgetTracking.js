import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import './BudgetTracking.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Register the components you want to use
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetTracking = () => {
    const params = useParams(); // Get event ID from URL params
    const [eventData, setEventData] = useState(null);
    const [newExpense, setNewExpense] = useState({ category: '', amount: '' });
    const [updateDone, setUpdateDone] = useState({ category: '', amount: '' });
    const [formattedResponse, setFormattedResponse] = useState('');

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
    };

    const handleSubmitUpdate = async () => {
        // Submit updated expensesDone to the backend
        await fetch(`http://localhost:5000/my-event/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ expensesDone: eventData.expensesDone }),
            headers: { 'Content-Type': 'application/json' }
        });
    };

    const handleGenerateResponse = async () => {
        const genAI = new GoogleGenerativeAI("AIzaSyAmjoNzOfIMnAyyW3RXjWLJn34lunZsRok"); // Replace with your actual API key
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chatSession = model.startChat({
            generationConfig: {
                temperature: 1,
                topP: 0.95,
                topK: 64,
                maxOutputTokens: 8192,
                responseMimeType: "text/plain",
            },
        });

        const result = await chatSession.sendMessage(`Based on the budget data, you planned to spend ${eventData.budget} in total, and you have spent ${eventData.expensesDone.reduce((sum, e) => sum + parseInt(e.amount), 0)}. Provide advice on wise spending for the categories: ${eventData.expenses.map(e => e.category).join(', ')}`);

        const responseText = await result.response.text();

        // Format the response after retrieving the plain text
        const formatted = formatGeminiResponse(responseText);
        setFormattedResponse(formatted);
    };

    const formatGeminiResponse = (response) => {
        // Basic formatting logic for the response
        return response
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text between ** **
            .replace(/- (.*?)$/gm, '<li>$1</li>') // List items
            .replace(/\n\n/g, '</p><p>') // Paragraphs
            .replace(/\n/g, '<br>'); // Line breaks
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
            <h1>Budget Tracker</h1>
            <hr></hr>
            <br></br>

            {/* Bar Chart */}
            <div className='box'>
                <div className='chart-div'>
                    <Bar data={chartData} options={chartOptions} />
                </div>

                {/* Add New Expense */}
                <div className='add-new'>
                    <div className='add-new-sub'>
                        <div className='sub-div'>
                            <h3>Add New Expense</h3>
                            <input
                                type="text"
                                placeholder="Category"
                                className='input-exp'
                                value={newExpense.category}
                                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                className='input-exp'
                                value={newExpense.amount}
                                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                            />
                            <button onClick={handleAddExpense} className='bud-btn'>Add Expense</button>
                        </div>

                        {/* Update Expenses Done */}
                        <div className='sub-div'>
                            <h3>Update Expenses Done</h3>
                            {eventData.expensesDone.map((expense, index) => (
                                <div key={index}>
                                    <span>{expense.category}</span>
                                    <input
                                        type="number"
                                        className='input-exp'
                                        value={expense.amount}
                                        onChange={(e) => handleUpdateExpenseDone(index, e.target.value)}
                                    />
                                </div>
                            ))}
                            <button onClick={handleSubmitUpdate} className='bud-btn'>Update Expenses Done</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Generate Response Section */}
            <br></br>
            <br></br>
            <div className='response-section'>
                <button onClick={handleGenerateResponse} className='bud-btn'>Generate Spending Advice</button>
                <div className='response-text' dangerouslySetInnerHTML={{ __html: formattedResponse }} />
            </div>
        </div>
    );
}

export default BudgetTracking;
