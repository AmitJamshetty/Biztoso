import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        password
      )
    ) {
      newErrors.password =
        "Password must be at least 6 characters long, containing at least one      uppercase, one number, and one special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setEmail("");
      setPassword("");
    }
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      alert("Login successful!");
      const base64Url = data.user.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const userDetails = JSON.parse(atob(base64));
      localStorage.setItem("username", JSON.stringify(userDetails.username));
      console.log(userDetails.username);
    } else {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="font-sans md:min-h-screen md:w-full bg-gradient-to-r from-red-400 to-blue-400 md:flex md:flex-col md:justify-center md:items-center md:p-4 p-8">
      <h2 className="text-2xl text-gray-700 mb-6 text-center">Login</h2>
      <form
        className="md:w-sm"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-center mb-6">
          <label className="text-base text-gray-700 block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 px-3 py-1.75 rounded-md outline-none text-gray-600 placeholder:text-gray-400"
            placeholder="example@mail.com"
          />
          {errors.email && (
            <p className="text-red-800 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col justify-center mb-6">
          <label className="text-base text-gray-700 block mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 px-3 py-1.75 rounded-md outline-none text-gray-600 placeholder:text-gray-400"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-800 text-sm">{errors.password}</p>
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-gray-50 px-20 py-2 font-sans text-base rounded cursor-pointer"
          >
            Login
          </button>
          <button
            className="underline text-white cursor-pointer hover:text-blue-800"
            onClick={() => navigate("/register")}
          >
            Create a account? Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;