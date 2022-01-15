import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    console.log(users.length);
    if (number === 4 || number === 2 || number === 3) {
      return (
        <span className="badge bg-primary">{`${users.length} человека тусанут с тобой сегодня`}</span>
      );
    }
    if (number === 1 || number > 4) {
      return (
        <span className="badge bg-primary">{`${users.length} человек тусанет с тобой сегодня`}</span>
      );
    }
    if (number === 0) {
      return (
        <span className="badge bg-danger">{"Никто с тобой не тусанет"}</span>
      );
    }
  };

  return (
    <>
      <h2>{renderPhrase(users.length)}</h2>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>

                  <td>
                    {user.qualities.map((qualitie) => (
                      <span
                        key={qualitie._id}
                        className={"badge m-1 bg-" + qualitie.color}
                      >
                        {qualitie.name}
                      </span>
                    ))}
                  </td>
                  <td>{user.profession.name}</td>
                  <td>{user.completedMeetings}</td>
                  <td>{user.rate}/5</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
