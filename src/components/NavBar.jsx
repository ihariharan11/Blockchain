import React from "react";
import { IoIosFitness } from "react-icons/io";
import { Trophy } from "lucide-react";
// import { fitnessRewardsABI } from "../FitnessRewardsABI"; // Import ABI
import { Link } from "react-router-dom";

const NabBar = () => {
  return (
    <section className="py-7 top-0 border-b fixed bg-white z-10 items-center  w-full justify-between ">
      <div className="flex px-5 items-center justify-between">
        <span className="flex items-center gap-4 text-lg">
          <IoIosFitness className="text-orange-400 w-8 h-8" />
          Fitness Club
        </span>
        <div className="flex gap-2 md:gap-8 px-2 flex-wrap">
          <Link className="hover:text-orange-400" to="/fitness">
            Home
          </Link>
          <Link className="hover:text-orange-400" to="/rewards">
            {/* <Trophy /> */}
            Rewards
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NabBar;
