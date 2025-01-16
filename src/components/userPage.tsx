import { useEffect, useState } from "react";

const UserApi: React.FC = () =>{
  const [user, setUser] = useState([])

  useEffect(() => {
    const userData = async () => {
     try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await res.json()
        setUser(data)
     } catch (error) {
        console.error(error)
     }
   }
   userData()
  }, [])

  return (
    <>
    <div className="user-container">
        {user.map((user: any) => {
             return (
                <div className="user-card" key={user?.id}>
                   <h2 className="user-title">username: {user?.username}</h2> 
                   <h2 className="user-email">email: {user?.email}</h2>
                   <h2 className="user-address">address :{user?.address?.city}</h2>
                   <h2 className="user-name">name :{user?.name}</h2>
                   <h2 className="user-website">website :{user?.website}</h2>
                   <h2 className="user-phone">phone :{user?.phone}</h2> <hr />
                </div>
             );
        })}
    </div>
    </>
  )
}

export default UserApi