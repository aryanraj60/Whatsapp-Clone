import React from "react";

const Avatar = ({ photoURL }) => {
  return (
    <img
      src={photoURL}
      class="rounded-full w-10"
      alt="Avatar"
      referrerPolicy="no-referrer"
    />
  );
};

export default Avatar;
