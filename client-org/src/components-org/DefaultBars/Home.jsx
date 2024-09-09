import { Link, NavLink } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { faQ } from "../../Data/faQ";
import bg_video1 from "../../assets/Videos/video1.mp4";
import bg_image1 from "../../assets/Images/heart.jpg";
import bg_image3 from "../../assets/Images/cardio.jpg";
import bg_image4 from "../../assets/Images/diabetes.jpg";
import bg_image5 from "../../assets/Images/caltrack.jpg";
import bg_image6 from "../../assets/Images/parkinson.webp";
import bg_image7 from "../../assets/Images/mentalwellness.jpg";

function Home() {
  const { login, register, isLoading, isAuthenticated } = useKindeAuth();

  return (
    <>
      <div className="w-full h-[calc(100vh-112px)]  overflow-y-scroll relative">
        <video
          className="w-[100%] bg-transparent shadow-2xl h-[100%] top-0 -z-10 object-fill opacity-85 absolute "
          autoPlay
          loop
          muted
        >
          <source src={bg_video1} type="video/mp4" />
        </video>
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
                <em>"Health&nbsp;</em>
                <em>Meets&nbsp;</em>
                <em>Innovation"</em>
              </p>
            </p>
          </div>
        </section>
        <section className="flex flex-col h-fit lg:h-[80%] items-center justify-center">
          <div className="flex-col lg:flex-row justify-around items-center lg:gap-0 gap-5 my-5 flex w-[80%]">
            <NavLink to="/contents/sidebar/caltrack">
              <div className="w-[10rem] h-[10rem] hover:bg-slate-600 bg-slate-50 rounded-xl flex justify-center items-center relative object-cover -z-50">
                <img
                  src={bg_image5}
                  alt="ss"
                  className="w-full h-full absolute -z-10 rounded-xl "
                />
              </div>
              <span className="flex justify-center text-black">
                CardioAlert
              </span>
            </NavLink>
            <NavLink to="/contents/sidebar/symptoms">
              <div className="w-[10rem] h-[10rem] hover:bg-slate-600 bg-slate-50 rounded-xl flex justify-center items-center relative object-cover -z-50  ">
                <img
                  src={bg_image3}
                  alt="ss"
                  className="w-full h-full absolute -z-10 rounded-xl  "
                />
              </div>
              <span className="flex justify-center text-black">SymptoScan</span>
            </NavLink>
            <NavLink to="/contents/sidebar/cardio">
              <div className="w-[10rem] h-[10rem] text-white bg-slate-50 rounded-xl flex justify-center items-center relative object-cover -z-40">
                <img
                  src={bg_image1}
                  alt="ss"
                  className="w-full h-full absolute -z-10 rounded-xl  "
                />
              </div>
              <span className="flex justify-center">CardioAlert</span>
            </NavLink>
            <NavLink to="/contents/sidebar/suger">
              <div className="w-[10rem] h-[10rem] text-white bg-slate-50 rounded-xl flex justify-center items-center relative object-cover -z-40">
                <img
                  src={bg_image4}
                  alt="ss"
                  className="w-full h-full absolute -z-10 rounded-xl  "
                />
              </div>
              <span className="flex justify-center">SugerAlert</span>
            </NavLink>
            <NavLink to="/contents/sidebar/parkinsons">
              <div className="w-[10rem] h-[10rem] text-white bg-slate-50 rounded-xl flex justify-center items-center relative object-cover -z-40">
                <img
                  src={bg_image6}
                  alt="ss"
                  className="w-full h-full absolute -z-10 rounded-xl  "
                />
              </div>
              <span className="flex justify-center">Parkinsons</span>
            </NavLink>
            <NavLink to="/contents/sidebar/mentalwell">
              <div className="w-[10rem] h-[10rem] text-white bg-slate-50 rounded-xl flex justify-center items-center relative object-cover -z-40">
                <img
                  src={bg_image7}
                  alt="ss"
                  className="w-full h-full absolute -z-10 rounded-xl  "
                />
              </div>
              <span className="flex justify-center">MentalWell</span>
            </NavLink>
          </div>
        </section>

        <section className="flex flex-col h-[40%] items-center justify-center border-t-[1px]">
          <Link
            to="/doctors"
            className="text-3xl p-3 bg-slate-50 rounded-2xl hover:bg-slate-300"
          >
            Consult with our doctors
          </Link>
        </section>
        <section className="flex flex-col h-fit gap-5 border-t-[1px] p-10 w-full text-2xl cursor-pointer">
          <p>FAQs:</p>
          {faQ.map((item, index) => {
            return (
              <details key={index}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default Home;
