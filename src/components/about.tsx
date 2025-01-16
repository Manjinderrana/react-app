import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const About = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const getToken = localStorage.getItem('accessToken');
    if (!getToken) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: "Unauthorized Access",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      }).then(() => {
        navigate('/'); // Redirect after showing the alert
      });
    }
  }, [navigate]);

return (
    <div className="contact">
      <span>
        <h2>Mobile number: +91 9876543210</h2>
        <h2>Gmail: +91 9876543210</h2>
        <h2>Address: 123, ABC Street, XYZ City</h2>
      </span>
    </div>
  );
};

export default About;
