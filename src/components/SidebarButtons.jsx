import React, { useState } from "react";
import { BiMessageDetail } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import { auth } from "../utils/firebase";

const SidebarButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    auth.signOut();
  };
  return (
    <div className="flex space-x-2">
      <div className="flex justify-center">
        <div>
          <div class="dropend relative">
            <FiMoreVertical
              onClick={() => setIsOpen(!isOpen)}
              size={25}
              className="cursor-pointer rounded-lg hover:text-blue-700"
            />
            <ul
              onClick={handleLogout}
              className={`absolute ${
                isOpen ? "block" : "hidden"
              } cursor-pointer bg-slate-100 px-2 py-2 text-gray-600 top-8 rounded-xl`}
            >
              <li>Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarButtons;
