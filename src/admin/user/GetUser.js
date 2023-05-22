import { useState } from "react";
import { fetchWithAuth } from '../../general/RefreshToken';
import MessageBox from '../product/MessageBox';

export default function GetUser (){
    const [user, setUser] = useState([]);
    const [showModalMessage, setShowModalMessage] = useState(false);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem('token')
    const handleGetUsers = async () => {
      const url = `http://localhost:5000/user/currentuser`;
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
          const user_info = Object.entries(data.user);
          setUser(user_info);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleCancel = () => {
      setShowModalMessage(false);
    };

    return(
        <div className="get-user">
            <button className="add-button" onClick={handleGetUsers} disabled={!token}>
        Get User
      </button>
      <br />
      <table>
        <tbody>
           {user.map(([key, value]) => (
           <tr key={key}>
             <td>{key}</td>
             <td>{value || "N/A"}</td>
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
    )
}