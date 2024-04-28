import React from "react";
import { Link } from 'react-router-dom';
import {Navbar} from '../components';
import Footer from "../components/Land/Footer.js";
import image5 from "../assets/img/image5.jpg";
import mission1 from "../assets/img/mission1.jfif"
import approach from "../assets/img/approach.jpg"
import commitment from "../assets/img/commitment.jpg";
import { FcAbout } from "react-icons/fc";
import { BiGroup } from "react-icons/bi";
import { AiOutlineAim, AiOutlineGateway, AiOutlineFlag, AiOutlineWarning, AiOutlineLineChart } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi"
import { FaExclamationCircle } from "react-icons/fa";
import { GiWaterDrop } from "react-icons/gi";
import AOS from "aos";
import { useEffect } from "react";
import 'aos/dist/aos.css';

export default function Landing() {

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-sine',
    }, []);

  });

  return (
    <>
      <main>
      <div className="relative pb-32 content-center items-center justify-center"
          style={{
            minHeight: "75vh",
            backgroundImage: `url(${image5})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
            <div style={{paddingBottom:'150px'}}><Navbar transparent={true} /></div>
          
          <div className="absolute top-0 w-full h-full bg-center bg-cover">
            <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"></span>
          </div>

          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-0" data-aos='zoom-in'>
                  <h1 className="text-white font-semibold text-5xl" style={{ fontSize: "4rem" }}>Aquasense </h1>
                  <p className="mt-4 text-lg text-gray-300" style={{ fontSize: "1.2rem", paddingBottom: '3rem' }}>
                    Welcome to Water Pipeline Network Monitoring System!
                  </p>
                  <Link to='/dashboard/home'><button className="bg-transparent hover:bg-white text-white hover:text-black font-bold py-4 px-6 rounded-full transition-colors duration-300 border border-white">
                    Get Started
                  </button></Link>
                </div>
              </div>

            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >

              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 105 0 105"
              ></polygon>
            </svg>
          </div>
        </div >

        <section className="pb-20 bg-gray-300 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
            </div>
            <div className="flex flex-wrap">
            </div>


            <div className="flex flex-wrap items-center mt-32">
  <div className="w-full md:w-7/12 px-12 mr-auto ml-auto">
    <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
      <i className="fas fa-user-friends text-xl"></i>
      <FcAbout className="text-blue-600 text-4xl" />
    </div>
    <h3 className="text-3xl mb-2 font-semibold leading-normal about">About Us</h3>
    <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700 text-justify" data-aos="fade-up" data-aos-once="true" data-aos-anchor=".about" data-aos-anchor-placement="top-center">
      At AquaSense Network, we think that one of the most important problems confronting humanity is water scarcity and management, and we think that technology can help solve this problem. Our team, who was established with the goal of revolutionizing the management of water supplies, is dedicated to creating cutting-edge solutions that uplift communities and advance sustainability.
    </p>
    <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700 text-justify" data-aos="fade-up" data-aos-once="true" data-aos-anchor=".about" data-aos-anchor-placement="top-center">
      Acknowledging the critical role that effective water management plays in guaranteeing a sustainable future, we have set out to develop the all-encompassing web and mobile application known as AquaSense Network. This platform functions as a central location for the mapping, analysis, and optimization of water supply networks, with an emphasis on effectiveness, openness, and community involvement.
    </p>
  </div>

  <div className="w-full md:w-5/12 px-4 mr-auto ml-auto relative z-10 pt-20" data-aos="fade-up" data-aos-once="true">
    <div className="rectangle-wrapper overflow-hidden" style={{ maxWidth: "500px", maxHeight: "400px", position: "relative", margin: "0 auto" }}>
      <img
        alt="..."
        src={image5}
        className="rectangle-image object-cover"
        style={{ width: "100%", height: "100%", borderRadius: "45px" }}
      />
    </div>
  </div>




            </div>
          </div>

        </section>

        <section className="pb-20 bg-gray-300 -mt-24">
          <div className="container mx-auto px-4" >
            <div style={{ paddingTop: '3rem' }} className="flex flex-wrap">
              <h2 className="w-full text-center text-3xl font-semibold mb-8 pt-16">Key Features</h2>

              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-2 md:px-4 text-center" data-aos='zoom-in' data-aos-delay="0" data-aos-once='true'>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full h-full mb-8 shadow-lg rounded-lg hover:shadow-xl transition duration-300 custom-padding transform hover:scale-105">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <AiOutlineGateway className="text-black text-4xl" />
                    </div>
                    <h6 className="text-xl font-semibold">Pipeline Network Visualization</h6>
                    <p className="mt-2 mb-4 text-gray-600 text-justify">
                      Users can view the water pipeline network in their vicinity through interactive maps and simulations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-2 md:px-4 text-center" data-aos='zoom-in' data-aos-delay="0" data-aos-once='true'>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full h-full mb-8 shadow-lg rounded-lg hover:shadow-xl transition duration-300 custom-padding transform hover:scale-105">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                      <AiOutlineFlag className="text-black text-4xl" />
                    </div>
                    <h6 className="text-xl font-semibold">Real-Time Marking of Problems</h6>
                    <p className="mt-2 mb-4 text-gray-600 text-justify">
                      Detected problems are automatically marked on the map for easy identification by maintenance teams.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-2 md:px-4 text-center" data-aos='zoom-in' data-aos-delay="0" data-aos-once='true'>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full h-full mb-8 shadow-lg rounded-lg hover:shadow-xl transition duration-300 custom-padding transform hover:scale-105">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                      <GiWaterDrop className="text-blue-600 text-4xl" />
                    </div>
                    <h6 className="text-xl font-semibold">Estimation of Water Sufficiency</h6>
                    <p className="mt-2 mb-4 text-gray-600 text-justify">
                      Utilize data to estimate how long the available water storage can meet the demand, enabling better resource management.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-2 md:px-4 text-center" data-aos='zoom-in' data-aos-delay="0" data-aos-once='true'>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full h-full mb-8 shadow-lg rounded-lg hover:shadow-xl transition duration-300 custom-padding transform hover:scale-105">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <AiOutlineWarning className="text-black text-4xl" />
                    </div>
                    <h6 className="text-xl font-semibold">Fault Detection and Reporting</h6>
                    <p className="mt-2 mb-4 text-gray-600 text-justify">
                      Users can report pipeline issues and faults by uploading pictures and specifying the location.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-2 md:px-4 text-center" data-aos='zoom-in' data-aos-delay="0" data-aos-once='true'>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full h-full mb-8 shadow-lg rounded-lg hover:shadow-xl transition duration-300 custom-padding transform hover:scale-105">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                      <AiOutlineLineChart className="text-black text-4xl" />
                    </div>
                    <h6 className="text-xl font-semibold">Analytical Insights</h6>
                    <p className="mt-2 mb-4 text-gray-600 text-justify">
                      Analyze fault frequency to prioritize repairs and maintenance efforts. Provide timelines and time spans of water supply for effective planning.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-2 md:px-4 text-center" data-aos='zoom-in' data-aos-delay="0" data-aos-once='true'>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full h-full mb-8 shadow-lg rounded-lg hover:shadow-xl transition duration-300 custom-padding transform hover:scale-105">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                      <FaExclamationCircle className="text-black text-4xl" />
                    </div>
                    <h6 className="text-xl font-semibold">Education and Awareness Page</h6>
                    <p className="mt-2 mb-4 text-gray-600 text-justify">
                      Deliver educational content on water conservation practices and appeal to users to be mindful of their water usage.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        <section style={{ paddingBottom: '6rem' }} className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 101 0 101"
              ></polygon>
            </svg>
          </div>

          


          <div className="container mx-auto px-0 md:px-0 mission"> {/* Added px-4 for padding on all sides and md:px-0 to remove padding on medium screens and above */}
  <div className="items-center flex flex-wrap">
    <div className="w-full md:w-5/12 px-4 md:px-4 mb-8 md:mb-0" data-aos="fade-in" data-aos-once="true" data-aos-anchor=".mission" data-aos-anchor-placement="top-center"> {/* Added md:px-4 for padding on all sides on medium screens and above */}
      <div className="rectangle-wrapper pt-5" style={{ width: "500px", height: "380px", position: "relative", margin: "0 auto" }}>
        <img
          alt="..."
          src={mission1}
          className="rectangle-image"
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "45px", marginTop: "20px" }}
        />
      </div>
    </div>
    <div className="w-full md:w-7/12 px-4 md:pl-12" data-aos="fade-in" data-aos-once="true" data-aos-anchor=".mission" data-aos-anchor-placement="top-center"> {/* Added md:pl-4 for padding-left on medium screens and above */}
      <div className="md:pr-12">
        <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
          <i className="fas fa-rocket text-xl"></i>
          <AiOutlineAim className="text-black text-4xl" />
        </div>
        <h3 className="text-3xl font-semibold">
          Our Mission
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-gray-600 text-justify">
          Our goal is straightforward but profound: to improve water supply management, cut down on waste, and guarantee that everyone has reliable, high-quality access to water. By giving communities the means and means to actively engage in the enhancement of their water supply systems, we hope to empower them.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-gray-600 text-justify">
          Our goal is to establish a society where water resources are handled in a way that is sustainable, equitable, and innovative, with a long-lasting effect on coming generations.
        </p>
      </div>
    </div>
  </div>
</div>







          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2560 100">
            <polygon
              // fill="#CBD5DB" 
              className="text-gray-300 fill-current"
              points="2560 0 2560 101 0 101"
            ></polygon>
          </svg>

        </section>


        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{ height: "80px" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <section style={{ paddingTop: '3rem' }} className="pb-20 bg-gray-300 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">


            </div>
            <div className="flex flex-wrap"> </div>


            <div className="flex flex-wrap  items-center mt-32 approach">
              <div className="w-full lg:w-7/12 px-14 mr-auto ml-auto pb-40" data-aos='fade-in' data-aos-once='true' data-aos-anchor=".approach" data-aos-anchor-placemnt='top-center'>
                <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                  <i className="fas fa-user-friends text-xl"></i>
                  <HiOutlineDocumentText className="text-black text-4xl" />
                </div>
                <div className="approach">
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Our Approach
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700 text-justify">
                  Our multimodal approach to water management at AquaSense Network makes use of state-of-the-art tools including data analytics, GIS mapping, and community involvement techniques. We give users predictive analyses, real-time monitoring capabilities, and actionable insights through the integration of various tools and approaches, empowering them to allocate resources optimally and make well-informed decisions.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700 text-justify">
                  We are aware that solving the intricate problems associated with water management calls for a comprehensive and cooperative strategy. For this reason, we collaborate closely to co-create solutions that are suited to the unique demands and circumstances of local communities, governments, NGOs, and water utilities.
                </p>

                </div>
                

              </div>

              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto" data-aos='fade-in' data-aos-once='true' data-aos-anchor=".approach" data-aos-anchor-placemnt='top-center'>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded-lg bg-gray-300 pb-20" style={{ borderRadius: "40px" }}>
                  <img
                    alt="..."
                    src={approach}
                    className="w-full align-middle rounded-t-lg"
                    style={{ width: "550px", height: "400px", borderRadius: "40px",marginTop: "30px" }}
                  />




                </div>
              </div>

            </div>
          </div>

        </section>



        <section style={{ paddingBottom: '9rem' }} className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 101 0 101"
              ></polygon>
            </svg>
          </div>
          <div className="container mx-auto px-4 md:px-0">
          <div className="container mx-auto px-4 md:px-0">
  <div className="items-center flex flex-wrap">
    <div className="w-full md:w-5/12 ml-auto mr-auto md:px-16 pb-0" data-aos='fade-in' data-aos-once='true' data-aos-anchor=".commit">
      <img
        alt="..."
        src={commitment}
        className="w-full align-middle rounded-t-lg"
        style={{ width: "500px", height: "350px", borderRadius: "40px", marginTop: "130px" }}
      />
    </div>
    <div className="w-full md:w-7/12 ml-auto mr-auto md:px-4 commit">
      <div className="md:pr-12" data-aos='fade-in' data-aos-once='true' data-aos-anchor=".commit" data-aos-anchor-placemnt='top-center'>
        <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
          <i className="fas fa-rocket text-xl"></i>
          <BiGroup className="text-black text-4xl" />
        </div>
        <h3 className="text-3xl font-semibold">
          Our Commitment
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-gray-600 text-justify">
          Our dedication lies in promoting constructive transformation and producing a noticeable influence on water management strategies worldwide. Our team comprises committed individuals with expertise in software development, community involvement, and water resources management. Together, we push the frontiers of innovation to produce scalable and sustainable solutions.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-gray-600 text-justify">
          Come along with us as we work to make a world where water is appreciated, well managed, and available to everyone. By working together, we can create a world in which everyone succeeds and nothing is overlooked.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-gray-600 text-justify">
          We feel privileged that you have selected AquaSense Network as your water management partner. Together, let's change things, one drop at a time.
        </p>
      </div>
    </div>
  </div>
</div>
</div>
        </section>

        
      </main >
      <Footer />
    </>
  );
}