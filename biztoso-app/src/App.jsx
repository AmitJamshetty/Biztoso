import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center gap-4 my-10">
      <div
        onClick={() => navigate("/register")}
        className="cursor-pointer hover:font-semibold"
      >
        Register
      </div>
      <div
        onClick={() => navigate("/login")}
        className="cursor-pointer hover:font-semibold"
      >
        Login
      </div>
    </div>
  );
}

export default App;
