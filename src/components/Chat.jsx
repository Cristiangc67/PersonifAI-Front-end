import React from "react";

const Chat = () => {
  return (
    <div className="w-full bg-neutral-900 mx-auto ">
      <div className=" h-11/12 bg-neutral-900 pt-10 px-30">Chat historial</div>
      <form action="" className="w-full h-1/12 flex justify-center gap-4">
        <input
          type="text"
          className=" w-1/2 h-10 rounded-3xl border border-gray-500 px-4 bg-neutral-700 focus:outline-0"
        />
        <button className="bg-white hover:bg-neutral-300 h-10 rounded-full cursor-pointer">
          <img
            src="src\assets\send.svg"
            className="h-10 p-1 pointer-events-none "
            alt=""
          />
        </button>
      </form>
    </div>
  );
};

export default Chat;
