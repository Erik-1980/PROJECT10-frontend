import { useState } from 'react';
import { fetchWithAuth } from '../../general/RefreshToken';
import MessageBox from '../product/MessageBox';

export default function GetAllUsers() {
    const [users, setUsers] = useState([]);
    const [showModalMessage, setShowModalMessage] = useState(false);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");
  
    const handleGetUsers = async () => {
      const url = `http://localhost:5000/user`;
      try {
        const response = await fetchWithAuth(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = await response.json();
        if (data.error) {
          setShowModalMessage(true)
          setMessage(data.error);
        } else {
          const users_info = data.users;
          setUsers(users_info);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleCancel = () => {
      setShowModalMessage(false);
    };

    return (
      <div className="get-user">
        <button className="add-button" onClick={handleGetUsers} disabled={!token}>
          Get All Users
        </button>
        <br />
        <table>
          <thead>
            <tr>
              {users[0] && Object.keys(users[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, index) => (
                  <td key={index}>{value || "N/A"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {showModalMessage &&
        <MessageBox
          message={message}
          onCancel={handleCancel}
        />
      }
      </div>
    );
  }
  