import React from "react";
import { IoIosFitness } from "react-icons/io";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className=" bg-[#212432] text-white py-8 md:py-11 fixed bottom-0 w-full z-10 border-t  flex flex-col">
      <div className="flex gap-4 md:gap-28 items-center justify-center  ">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold">Service</h1>
          <p className="text-xs">Training</p>
          <p className="text-xs">Coaching</p>
          <p className="text-xs">Consulting</p>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-bold">Navigate</h1>
          <a href="#home" className="text-xs">
            Home
          </a>
          <Link to="/rewards" className="text-xs">
            Reward
          </Link>
        </div>
        <div>
          <h1>Contact</h1>
          <p className="text-xs">Email:fitnessclub@gmail.com</p>
          <a className="text-xs">Call:+91900002080</a>
        </div>
      </div>

      <div className="pt-2">
        <hr className="border border-white opacity-40   mx-20" />
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <span>
            <IoIosFitness className="w-10 text-orange-400 h-10" />
          </span>
          <h1>Fitness Club</h1>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Fitness Club. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
