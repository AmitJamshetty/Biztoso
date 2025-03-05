import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
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

    if (!/^[A-Za-z]{3,20}$/.test(username)) {
      newErrors.username = "Username must be 3-20 letters and only letters.";
    }

    if (!/^[A-Za-z\s]{3,30}$/.test(location)) {
      newErrors.location = "Location must be 3-30 letters and only letters.";
    }

    if (about.length < 10) {
      newErrors.about = "About section must have at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 10 * 1024 * 1024;
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPEG and PNG formats are allowed.");
        e.target.value = "";
        return;
      }
      if (file.size > maxSize) {
        alert("File size exceeds 10MB. Please select a smaller file.");
        e.target.value = "";
        return;
      }
      const newImgUrl = URL.createObjectURL(file);
      setImgUrl(newImgUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Registered successfully!");
      setEmail("");
      setPassword("");
      setImgUrl(null);
      setUsername("");
      setLocation("");
      setAbout("");
    }

    const formData = new FormData(e.target);

    if (imgUrl) {
      formData.append("imgUrl", imgUrl);
    }

    // console.log([...formData.entries()]);
    const { username, email, password, location, about } =
      Object.fromEntries(formData);
    // console.log(username, email, password, location, about, imgUrl);

    const resultData = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        location,
        about,
        imgUrl,
      }),
    });

    console.log(resultData);
  };

  return (
    <div className="font-sans md:min-h-screen md:w-full bg-gradient-to-r from-red-400 to-blue-400 md:flex md:flex-col md:justify-center md:items-center md:p-4 p-8">
      <h2 className="text-2xl text-gray-700 mb-6 text-center">Register</h2>
      <form
        className="md:w-sm"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="mb-6 border-none flex flex-col items-center">
          {imgUrl ? (
            <img
              src={imgUrl}
              name="imgUrl"
              alt="Uploaded preview"
              className="rounded-full h-30 w-30 border-none mb-6 cursor-pointer"
            />
          ) : (
            <img
              src="/assets/avatar.png"
              name="imgUrl"
              alt="avatar"
              className="rounded-full h-30 w-30 border-none mb-6 cursor-pointer"
            />
          )}
          <label className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer inline-block">
            Choose File
            <input
              type="file"
              name=""
              accept="image/jpeg, image/png"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex flex-col justify-center mb-6">
          <label className="text-base text-gray-700 block mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-50 px-3 py-1.75 rounded-md outline-none text-gray-600 placeholder:text-gray-400"
            placeholder="jhon"
          />
          {errors.username && (
            <p className="text-red-800 text-sm">{errors.username}</p>
          )}
        </div>

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

        <div className="flex flex-col justify-center mb-6">
          <label className="text-base text-gray-700 block mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-gray-50 px-3 py-1.75 text-gray-600 rounded-md outline-none placeholder:text-gray-400"
            placeholder="Bangalore"
          />
          {errors.location && (
            <p className="text-red-800 text-sm">{errors.location}</p>
          )}
        </div>

        <div className="flex flex-col justify-center mb-8">
          <label className="text-base text-gray-700 block mb-2">About</label>
          <textarea
            value={about}
            name="about"
            onChange={(e) => setAbout(e.target.value)}
            className="bg-gray-50 px-3 py-1.75 text-gray-600 rounded-md outline-none placeholder:text-gray-400"
            placeholder="description"
          ></textarea>
          {errors.about && (
            <p className="text-red-800 text-sm">{errors.about}</p>
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-gray-50 px-20 py-2 font-sans text-base rounded cursor-pointer"
          >
            Register
          </button>
          <button
            className="underline text-white cursor-pointer hover:text-blue-800"
            onClick={() => navigate("/login")}
          >
            Already have a account? Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;