import React, { useState, useEffect } from 'react';
import '../assets/css/style.css';
import { IoSearch } from "react-icons/io5";
import { LuTableProperties } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";

const Main = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isToggleOn, setIsToggleOn] = useState(true);

    const cards = Array(10).fill({
        number: 10,
        name: 'Ram Prakasha Yadav',
        status: 'In Queue',
    });

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsers(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }

    return (
        <div className="container">
            <header className="header">
                <h1>Dhakad Innovations</h1>
                <div className="input-container">
                    <IoSearch className="search-icon" />
                    <input type="text" placeholder="Search name/Token" />
                </div>
                <div className="available_token">
                    <p>Available Token</p>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={isToggleOn}
                            onChange={() => setIsToggleOn(!isToggleOn)}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className='header_icons'>
                    <MdDashboard className='header_icon header_icon_dash' />
                    <LuTableProperties className='header_icon header_icon_tab' />
                </div>
                <div className='header_selecter'>
                    <select className="select-option" defaultValue="option1">
                        <option value="option1">M</option>
                        <option value="option2">P</option>
                        <option value="option3">Q</option>
                    </select>
                </div>
            </header>

            <div className={isToggleOn ? "grid" : "other_grid"}>
                {isToggleOn ? (
                    users.map((user, index) => (
                        <div
                            key={user.id}
                            className={index === 0 ? "first-card" : "card"}
                        >
                            <h2>{user.id}</h2>
                            <p>{user.name}</p>
                            <div className={index === 0 ? "first-actions" : "actions"}>
                                <select defaultValue={index === 0 ? "Inprogress" : "In Queue"}>
                                    <option value="In Queue">In Queue</option>
                                    <option value="Inprogress">Inprogress</option>
                                    <option value="In Pending">In Pending</option>
                                    <option value="Incomplete">Incomplete</option>
                                </select>
                                {index > 0 && (
                                    <div className="buttons">
                                        <button className="visit-pad">Visit Pad</button>
                                        <button className="print_icon"><IoMdPrint /></button>
                                        {index > 1 && <button className="lab">Lab</button>}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    cards.map((card, index) => (
                        <div
                            key={index}
                            className={index === 0 ? "horizontal-first-card" : "horizontal-card"}
                        >
                            <h2>{card.number}</h2>
                            <p>{card.name}</p>
                            <div className={index === 0 ? "first-actions" : "actions"}>
                                <div className="buttons">
                                    <button className="visit-pad">Visit Pad</button>
                                    <button className="print_icon"><IoMdPrint /></button>
                                    <button className="lab">Lab</button>
                                </div>
                                <select defaultValue={index === 0 ? "Inprogress" : "In Queue"}>
                                    <option value="In Queue">In Queue</option>
                                    <option value="Inprogress">Inprogress</option>
                                    <option value="In Pending">In Pending</option>
                                    <option value="Incomplete">Incomplete</option>
                                </select>

                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Main;