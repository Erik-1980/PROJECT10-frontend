import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { verificationToken } from '../verificationToken/VerificationToken';

function MainPageAdmin() {
    const [orders, setOrders] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const url = `http://localhost:5000/order/allorders`;
            try {
                const response = await verificationToken(url, {
                    headers: {
                        Authorization: token,
                    },
                });
                const data = await response.json();
                if (data.error) {
                    // setError(data.error);
                } else {
                    const allOrders = data.orders;
                    setOrders(allOrders);
                };
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchOrders();
    }, [token]);

    useEffect(() => {
        if (orders?.length > 0) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            const ctx = document.getElementById('salesChart').getContext('2d');
            const formattedDates = orders.map(dateString => {
                const date = new Date(dateString.createdAt);
                return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
              });
            const quantity = orders.map(item => item.quantity);
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: formattedDates,
                    datasets: [{
                        label: 'Sales',
                        data: quantity,
                        backgroundColor: 'rgba(0, 255, 0, 0.8)',
                        borderColor: 'rgba(0, 0, 0, 1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [orders]);

    return (
        <div style={{maxWidth: '1500px', margin: '0 auto'}}>
            <h1 style={{fontFamily: 'fantasy', textAlign: 'center'}}>WELCOME TO THE ADMINISTRATOR PAGE </h1>
            <canvas id="salesChart" />
            <p>Sales</p>
        </div>
    );
};

export default MainPageAdmin;
