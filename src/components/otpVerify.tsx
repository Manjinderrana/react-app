import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";

export const OTP: React.FC = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (otp: string) => setOtp(otp);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/verifyMail",
        {otp},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        text: res?.data?.message,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
      navigate("/");
    } catch (error: any) {
      console.error("Login error: ", error?.response?.data?.message)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: error?.response?.data?.message,
        showConfirmButton: false, 
        timer: 2000, 
        toast: true, 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <OtpInput
          value={otp}
          onChange={handleInputChange}
          numInputs={6}
          renderInput={(inputProps) => (
            <input
              {...inputProps}
              style={{
                ...inputProps.style,
                border: "1px solid transparent",
                borderRadius: "8px",
                width: "54px",
                margin: "10px",
                height: "54px",
                fontSize: "12px",
                color: "#000",
                fontWeight: "400",
                caretColor: "blue",
              }}
              className="otp-input"
            />
          )}
          shouldAutoFocus={true}
          inputStyle={{
            border: "1px solid transparent",
            borderRadius: "8px",
            width: "54px",
            height: "54px",
            fontSize: "12px",
            color: "#000",
            fontWeight: "400",
            caretColor: "blue",
          }}
        />
        <button type="submit">Enter</button>
      </div>
      <p>Enter OTP</p>
      <style>
        {`
          .otp-input:focus {
            border: 1px solid #CFD3DB;
            outline: none;
          }
        `}
      </style>
    </form>
  );
};
