import React from "react";
import NabBar from "./NavBar";
import { MapPin } from "lucide-react";
import Footer from "./Footer";
const Fitness = () => {
  const fit = [
    {
      name: "Iron Haven Fitness",
      location: "123 Muscle Street, Fitville, CA 90210",
      image: "./g1.jpg",
    },
    {
      name: "Pulse Performance Gym",
      location: "456 Energy Avenue, Trainertown, TX 73301",
      image: "./g2.jpg",
    },
    {
      name: "IPeak Form Fitness Center",
      location: "789 Summit Road, Elevation City, CO 80202",
      image: "./g3.jpg",
    },
    {
      name: "Iron Haven Fitness",
      location: "123 Muscle Street, Fitville, CA 90210",
      image: "./g4.jpg",
    },
    {
      name: "Body Boost Gym",
      location: "01 Wellness Way, Strengthsburg, NY 10001",
      image: "./g4.jpg",
    },
    {
      name: "Zenith Fitness Studio",
      location: "202 Power Place, Vitality Village, FL 33101",
      image: "./g1.jpg",
    },
    {
      name: "Zenith Fitness Studio",
      location: "202 Power Place, Vitality Village, FL 33101",
      image: "./g1.jpg",
    },
  ];
  return (
    <div>
      <NabBar />
      <p id="home"></p>
      <section className=" py-40  px-10">
        <h1 className=" font-semibold py-2">Our Centres</h1>
        <div className="flex items-center overflow-x-auto gap-4 border">
          {fit &&
            fit.map((data, index) => (
              <div key={index} className="h-auto ">
                <div className="w-[220px] md:w-[250px] h-[150px] ">
                  <img
                    src={data.image}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col px-1 gap-2">
                  <h1 className="flex pl-2 pt-1 flex-wrap">{data.name}</h1>
                  <div className="flex gap-2 ">
                    <span>
                      <MapPin className="w-4 text-orange-400" />
                    </span>
                    <p className="flex flex-wrap">{data.location}</p>
                  </div>
                  {/* <p className="flex  gap-2 pl-1  "><MapPin className="w-5 text-orange-400" />{data.location}</p> */}
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="my-40">
        <Footer />
      </section>
    </div>
  );
};

export default Fitness;
