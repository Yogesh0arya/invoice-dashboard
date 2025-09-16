import { useNavigate } from "react-router-dom";
import { ChevronLeft, User } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <header className="bg-[#F3E8FF]  ">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            onClick={handleGoHome}
            className="cursor-pointer flex items-center justify-center space-x-3"
          >
            <ChevronLeft className="h-6 w-6 text-black" />
            Back
          </div>
          <h1 className="text-xl md:text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center rounded-full bg-white p-2 ">
            <User className="h-6 w-6" />
          </div>
        </div>
      </div>
    </header>
  );
};
