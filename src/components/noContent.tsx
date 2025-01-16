import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const NoContent: React.FC = () => {
    const navigate = useNavigate();
    navigate('/')
    const getToken = localStorage.getItem('accessToken');
    
    if (!getToken) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: "Unauthorized Access",
        showConfirmButton: false, 
        timer: 2000, 
        toast: true, 
      })
    }
    return(
     <div className="header">
         <h2>404 No Content</h2>
     </div>
    )
 }
 
 export default NoContent
 