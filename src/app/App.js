import React, { useState, useEffect } from "react";
import api from "./api";
import Users from "./components/users";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        setUsers(newArray);
    };
    return (
        <div>
            {users && (
                <Users
                    onDelete={handleDelete}
                    onToggleBookMark={handleToggleBookMark}
                    users={users}
                />
            )}
        </div>
    );
}

export default App;
