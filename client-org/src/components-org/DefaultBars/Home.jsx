import { Link, NavLink } from "react-router-dom";
import { faQ } from "../../Data/faQ";

import bg_video1 from "../../assets/Videos/video1.mp4";
import bg_image1 from "../../assets/Images/heart.jpg";
import bg_image3 from "../../assets/Images/cardio.jpg";
import bg_image4 from "../../assets/Images/diabetes.jpg";
import bg_image5 from "../../assets/Images/caltrack.jpg";
import bg_image6 from "../../assets/Images/parkinson.webp";
import bg_image7 from "../../assets/Images/mentalwellness.jpg";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function Home() {
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <>
      <div className="w-full h-[calc(100vh-112px)] overflow-y-scroll relative">
        <video
          className="w-full bg-transparent shadow-xl h-full top-0 -z-10 object-cover opacity-80 absolute"
          autoPlay
          loop
          muted
        >
          <source src={bg_video1} type="video/mp4" />
        </video>
        {/* <section className="flex flex-col h-full text-gray-800">
          <div className="lg:w-1/2 bg-gradient-to-br from-gray-200 to-gray-300 h-full flex flex-col items-center justify-evenly p-8 rounded-r-xl shadow-lg">
            <div className="text-center space-y-5">
              <p className="text-3xl lg:text-4xl font-bold tracking-wide">
                Welcome To
              </p>
              <p className="text-5xl lg:text-6xl roboto-mono-medium">
                HealthVitals-AI
              </p>
            </div>
            <div className="text-center space-y-5">
              <p className="text-3xl lg:text-4xl font-semibold">
                Platform Where
              </p>
              <p className="text-5xl lg:text-6xl flex flex-wrap justify-center items-center font-light italic">
                <span>&quot;Health&nbsp;</span>
                <span>Meets&nbsp;</span>
                <span>Innovation&quot;</span>
              </p>
            </div>
          </div>
        </section> */}
        <section className=" flex flex-col h-[100%] text-white ">
          <div className="lg:w-[50%]  bg-gradient-to-r from-blue-500 h-full flex flex-col items-center justify-evenly ">
            <p className="lg:text-4xl  text-4xl  flex flex-col items-center space-y-5">
              <p>Welcome To </p>
              <p className="lg:text-6xl text-5xl roboto-mono-medium">
                HealthVitals-AI
              </p>
            </p>
            <p className="text-4xl flex flex-col items-center space-y-5">
              <p>Platform Where</p>
              <p className="lg:text-6xl text-5xl flex flex-col lg:flex-row items-center lg:w-full w-[90%]">
                <em>&quot;Health&nbsp;</em>
                <em>Meets&nbsp;</em>
                <em>Innovation&quot;</em>
              </p>
            </p>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center py-10">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                link: "/contents/sidebar/caltrack",
                image: bg_image5,
                name: "Caltrack",
              },
              {
                link: "/contents/sidebar/symptoms",
                image: bg_image3,
                name: "SymptoScan",
              },
              {
                link: "/contents/sidebar/cardio",
                image: bg_image1,
                name: "CardioAlert",
              },
              {
                link: "/contents/sidebar/suger",
                image: bg_image4,
                name: "SugerAlert",
              },
              {
                link: "/contents/sidebar/parkinsons",
                image: bg_image6,
                name: "Parkinsons",
              },
              {
                link: "/contents/sidebar/mentalwell",
                image: bg_image7,
                name: "MentalWell",
              },
            ].map(({ link, image, name }) => (
              <NavLink key={name} to={link} className="group">
                <div className="w-40 h-40 relative overflow-hidden rounded-xl shadow-lg group-hover:scale-105 transform transition-transform duration-300">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover absolute -z-10"
                  />
                  <span className="absolute bottom-3 left-0 right-0 text-center text-gray-800 font-medium bg-white bg-opacity-70 py-1">
                    {name}
                  </span>
                </div>
              </NavLink>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-center py-10 border-t">
          <Link
            to="/doctors"
            className="text-3xl p-3 bg-gray-800 text-white rounded-2xl hover:bg-gray-600 shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            Consult with our doctors
          </Link>
        </section>

        <section className="flex flex-col gap-5 border-t p-10 w-full text-2xl">
          {/* <p className="font-bold text-gray-800">FAQs:</p> */}
          {faQ.map((item, index) => (
            <div key={index} className="border-b pb-4">
              <button
                onClick={() =>
                  setActiveIndex((prevIndex) =>
                    prevIndex === index ? null : index
                  )
                }
                className="w-full text-left cursor-pointer font-medium focus:outline-none flex items-center justify-between text-gray-800 hover:text-gray-600"
              >
                <span>{item.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  activeIndex === index
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="mt-2 text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default Home;

// function Home() {
//   const [activeIndex, setActiveIndex] = useState(null);
//   return (
//     <>
//       <div className="w-full h-[calc(100vh-112px)]  overflow-y-scroll relative">
//         <video
//           className="w-[100%] bg-transparent shadow-2xl h-[100%] top-0 -z-10 object-fill opacity-85 absolute "
//           autoPlay
//           loop
//           muted
//         >
//           <source src={bg_video1} type="video/mp4" />
//         </video>
//         <section className=" flex flex-col h-[100%] text-white ">
//           <div className="lg:w-[50%]  bg-gradient-to-r from-blue-500 h-full flex flex-col items-center justify-evenly ">
//             <p className="lg:text-4xl  text-4xl  flex flex-col items-center space-y-5">
//               <p>Welcome To </p>
//               <p className="lg:text-6xl text-5xl roboto-mono-medium">
//                 HealthVitals-AI
//               </p>
//             </p>
//             <p className="text-4xl flex flex-col items-center space-y-5">
//               <p>Platform Where</p>
//               <p className="lg:text-6xl text-5xl flex flex-col lg:flex-row items-center lg:w-full w-[90%]">
//                 <em>&quot;Health&nbsp;</em>
//                 <em>Meets&nbsp;</em>
//                 <em>Innovation&quot;</em>
//               </p>
//             </p>
//           </div>
//         </section>
//         <section className="flex flex-col h-fit lg:h-[80%] items-center justify-center">
//           <div className="flex-col lg:flex-row justify-around items-center lg:gap-0 gap-5 my-5 flex w-[80%]">
//             <NavLink to="/contents/sidebar/caltrack">
//               <div className="w-[10rem] h-[10rem] hover:bg-slate-600 bg-slate-50 rounded-xl flex justify-center items-center relative object-cover -z-50">
//                 <img
//                   src={bg_image5}
//                   alt="ss"
//                   className="w-full h-full absolute -z-10 rounded-xl "
//                 />
//               </div>
//               <span className="flex justify-center text-black">
//                 CardioAlert
//               </span>
//             </NavLink>
//             <NavLink to="/contents/sidebar/symptoms">
//               <div className="w-[10rem] h-[10rem] hover:bg-slate-600 bg-slate-50 rounded-xl flex justify-center items-center relative object-cover -z-50  ">
//                 <img
//                   src={bg_image3}
//                   alt="ss"
//                   className="w-full h-full absolute -z-10 rounded-xl  "
//                 />
//               </div>
//               <span className="flex justify-center text-black">SymptoScan</span>
//             </NavLink>
//             <NavLink to="/contents/sidebar/cardio">
//               <div className="w-[10rem] h-[10rem] text-white bg-slate-50 rounded-xl flex justify-center items-center relative object-cover -z-40">
//                 <img
//                   src={bg_image1}
//                   alt="ss"
//                   className="w-full h-full absolute -z-10 rounded-xl  "
//                 />
//               </div>
//               <span className="flex justify-center">CardioAlert</span>
//             </NavLink>
//             <NavLink to="/contents/sidebar/suger">
//               <div className="w-[10rem] h-[10rem] text-white bg-slate-50 rounded-xl flex justify-center items-center relative object-cover -z-40">
//                 <img
//                   src={bg_image4}
//                   alt="ss"
//                   className="w-full h-full absolute -z-10 rounded-xl  "
//                 />
//               </div>
//               <span className="flex justify-center">SugerAlert</span>
//             </NavLink>
//             <NavLink to="/contents/sidebar/parkinsons">
//               <div className="w-[10rem] h-[10rem] text-white bg-slate-50 rounded-xl flex justify-center items-center relative object-cover -z-40">
//                 <img
//                   src={bg_image6}
//                   alt="ss"
//                   className="w-full h-full absolute -z-10 rounded-xl  "
//                 />
//               </div>
//               <span className="flex justify-center">Parkinsons</span>
//             </NavLink>
//             <NavLink to="/contents/sidebar/mentalwell">
//               <div className="w-[10rem] h-[10rem] text-white bg-slate-50 rounded-xl flex justify-center items-center relative object-cover -z-40">
//                 <img
//                   src={bg_image7}
//                   alt="ss"
//                   className="w-full h-full absolute -z-10 rounded-xl  "
//                 />
//               </div>
//               <span className="flex justify-center">MentalWell</span>
//             </NavLink>
//           </div>
//         </section>
//         <section className="flex flex-col h-[40%] items-center justify-center border-t-[1px]">
//           <Link
//             to="/doctors"
//             className="text-3xl p-3 bg-slate-50 rounded-2xl hover:bg-slate-300"
//           >
//             Consult with our doctors
//           </Link>
//         </section>
//         <section className="flex flex-col h-fit gap-5 border-t-[1px] p-10 w-full text-2xl">
//           <p>FAQs:</p>
//           {faQ.map((item, index) => (
//             <div key={index} className="border-b pb-2">
//               <button
//                 onClick={() =>
//                   setActiveIndex((prevIndex) =>
//                     prevIndex === index ? null : index
//                   )
//                 }
//                 className="w-full text-left cursor-pointer font-medium focus:outline-none flex items-center justify-between"
//               >
//                 <span>{item.question}</span>
//                 {activeIndex === index ? (
//                   <ChevronUp className="w-5 h-5 text-gray-500" />
//                 ) : (
//                   <ChevronDown className="w-5 h-5 text-gray-500" />
//                 )}
//               </button>
//               <div
//                 className={`transition-all duration-300 ease-in-out overflow-hidden ${
//                   activeIndex === index
//                     ? "max-h-screen opacity-100"
//                     : "max-h-0 opacity-0"
//                 }`}
//               >
//                 <p className="mt-2">{item.answer}</p>
//               </div>
//             </div>
//           ))}
//         </section>
//       </div>
//     </>
//   );
// }
