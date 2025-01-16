import { useState, useEffect } from "react"
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

type Post = {
   id: number;
   title: string;
   body: string;
 };

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
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
    navigate('/')
  }

   const [data, setData] = useState<Post[]>([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

    useEffect(() => {
      const fetchPost = async () => {
        try {
           const response = await fetch('https://jsonplaceholder.typicode.com/posts')
           const data = await response.json()
           setData(data);
           setLoading(false); 

           Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: "POSTS FETCHED SUCCESSFULLY",
            showConfirmButton: false, 
            timer: 2000, 
            toast: true, 
          })

        } catch (error: any) {
           console.log(error);
           setError(error)
           setLoading(false);
        }
     }
     fetchPost()
    }, [])

    if (loading) {
      return <p><h1>Loading...</h1></p>;
    }
  
    if (error) {
      return <p>Error...</p>; 
    }
  
    return (
      <>
        <h1>WELCOME TO DASHBOARD!</h1>
        <div className="card-container">
          {data.map((item: Post) => (
            <div className = "card">
                <Card key ={item.id} title={item.title} style={{ width: 300 }}> {item.body}</Card>
                </div>
          ))}
        </div>
      </>
    )
  }

export default Dashboard;
