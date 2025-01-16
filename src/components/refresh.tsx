import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Refresh = () => {
  const [refreshToken, setRefreshToken] = useState("")
  const navigate = useNavigate()
  const getToken = localStorage.getItem('refreshToken')
    if (!getToken) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: "Unauthorized Access",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      }).then(() => {
        navigate('/')
      })
    }
   let getRefreshToken: any
    useEffect (() => {
      getRefreshToken = async () => {
        try {
        const res = await axios.post('http://localhost:8000/api/v1/auth/refresh', refreshToken, {
        headers: { 'Content-Type': 'application/json' },
        })
        setRefreshToken(refreshToken)  
        return res.data
        } catch (error) {
          console.log(error)
        }
      }
    },[])
  return (
    <div>
      {getRefreshToken()}
    </div>
  )
}

export default Refresh
