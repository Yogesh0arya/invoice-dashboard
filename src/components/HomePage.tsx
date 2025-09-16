import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen w-screen">
      {/* Background */}
      <iframe
        src="src/components/ui/WebGL_Fluid_Animation/sim.html"
        className="absolute w-full h-full top-0 left-0 border-0"
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col h-full max-w-6xl mx-auto p-4 text-center text-white pointer-events-none">
        {/* Center Section */}
        <div className="flex-grow flex flex-col items-center justify-center pointer-events-none">
          <div className="animate-float">
            <h1
              className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 
             animate-shine 
             bg-gradient-to-r from-white via-blue-400 to-white 
             bg-[length:200%_100%] bg-clip-text text-transparent"
            >
              Invoice Manager
            </h1>
          </div>
          <p className="text-md sm:text-lg mb-6">
            Manage all your invoices easily in one place. Track payments,
            monitor overdue invoices, and keep your business finances organized.
          </p>
          <div className="relative pointer-events-auto">
            <div
              className="absolute inset-0 transition-all duration-300 mx-auto w-60 rounded-full"
              style={{
                boxShadow:
                  "rgba(108, 99, 255, 0.7) 0px 0px 35px, rgba(108, 99, 255, 0.4) 0px 0px 70px, rgba(108, 99, 255, 0.2) 0px 0px 100px",
              }}
            ></div>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 rounded-full text-lg font-semibold duration-200 flex bg-black/80 backdrop-blur-sm border-2 border-[#6C63FF] items-center justify-center gap-2 mx-auto"
            >
              Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-6">By Yogesh Arya</p>
        </div>

        {/* Footer Section */}
        <footer className="text-sm text-gray-300 space-y-1 pointer-events-auto">
          <p>+91 8770852087</p>
          <p>yogesh084arya@gmail.com</p>
          <a href="https://yogesharya.in" className="underline">
            Portfolio
          </a>
        </footer>
      </div>
    </div>
  );
};
