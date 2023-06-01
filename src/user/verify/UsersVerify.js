import { verificationToken } from '../../verificationToken/VerificationToken';

const usersVerify = async () => {
    const token = localStorage.getItem('token')
    const url = "http://localhost:5000/auth/usersverify";
    try {
        const response = await verificationToken(url, {
            headers: {
                Authorization: token,
            },
        });
        const data = await response.json();
        console.log(data.message); 
    } catch (error) {
        console.error("Error:", error);
    }
};

export default usersVerify;