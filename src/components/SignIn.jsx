import React from "react";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const navigate = useNavigate();
  const rewards = (e) => {
    e.preventDefault();
    setTimeout(() => {
      //   navigate("/rewards");
      navigate("/fitness");
    }, 300);
  };
  return (
    <section className="">
      <img
        src="./Fitenss.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black w-24 opacity-80 via-transparent to-transparent rounded-md" />
      <div className="absolute inset-0 bg-gradient-to-tl from-black  opacity-30 via-transparent to-transparent rounded-md" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black  opacity-30 via-transparent to-transparent rounded-md" />
      <div className="absolute inset-0 bg-gradient-to-bl from-black  opacity-30 via-transparent to-transparent rounded-md" />
      <div className="flex items-center border  justify-center min-h-screen relative">
        <section className=" rounded-2xl shadow-xl   bg-black/45 md:bg-black/55 bg-opacity-100 p-5">
          <h1 className="  font-medium text-xl  text-[#FFF1DB] p-3 text-center">
            SignIn
          </h1>
          <form
            onSubmit={(e) => rewards(e)}
            className="py-4 gap-4 text-xl flex flex-col items-center"
          >
            <div className="flex py-4 items-center gap-4">
              <label className="px-2 text-orange-500 font-semibold">
                Email
              </label>
              <input
                required
                type="email"
                className=" outline-none text-neutral-600 font-medium text-[15px] bg-white/75 rounded-lg px-2 py-1"
              />
            </div>

            <div className="py-4 flex items-center text-xl gap-4 ">
              <label className="text-orange-500 font-semibold">Password</label>
              <input
                required
                type="password"
                className=" outline-none text-neutral-600 font-medium text-[15px] bg-white/75 rounded-lg py-1 px-2"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                // onClick={(e) => handleSubmit(e)}
                className=" py-1 px-3 shadow-lg hover:scale-105   bg-[#FF7777] text-white hover:opacity-90 rounded-lg font-normal text-[14px] "
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default SignIn;
