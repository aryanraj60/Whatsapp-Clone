import { auth, provider } from "@/utils/firebase";
import React from "react";
const whatsappLogo = "/assests/whatsapp-logo.png";

const Login = () => {
  const handleLogin = () => {
    auth.signInWithPopup(provider).catch((e) => {
      alert(e);
    });
  };

  return (
    <div className="h-screen bg-black flex justify-center items-center">
      <div className="flex flex-col justify-center items-center space-y-8">
        <img src={whatsappLogo} className="w-28" />
        <button
          onClick={handleLogin}
          className="px-3 py-3 font-medium tracking-wider shadow-md shadow-slate-300 hover:bg-white hover:text-black text-slate-200 border border-slate-100 rounded-lg text-xl"
        >
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
