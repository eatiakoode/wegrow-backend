"use client";
import { useState } from "react";
import Image from "next/image";

const WhyChoose = ({ style = "" }) => {
  const [expanded, setExpanded] = useState({
    mission: false,
    vision: false,
    commitment: false,
  });

  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Mission */}
      <div className="col-md-6 col-lg-4 col-xl-4">
        <div className={`why_chose_us ${style}`}>
          <div className="icon">
            <Image
              width={60}
              height={60}
              className="img-fluid"
              src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/mission.svg`}
              // src="/assets/images/mission.svg"
              alt="Mission"
            />
          </div>
          <div className="details">
            <h4>Our Mission</h4>
            <p className={`description ${expanded.mission ? "expanded" : "collapsed"}`}>
             To deliver <strong>personalized, reliable, and result-oriented</strong> property solutions by blending expertise, innovation, and an unwavering commitment to client success.
            </p>
            <button onClick={() => toggleExpand("mission")} className="btn-link">
              {expanded.mission ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="col-md-6 col-lg-4 col-xl-4">
        <div className={`why_chose_us ${style}`}>
          <div className="icon">
            <Image
              width={60}
              height={60}
              className="img-fluid"
              // src="/assets/images/vision.svg"
              src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/vision.svg`}
              alt="Vision"
            />
          </div>
          <div className="details">
            <h4>Our Vision</h4>
            <p className={`description ${expanded.vision ? "expanded" : "collapsed"}`}>
              To establish <strong>WeGrow Infraventures Pvt. Ltd.</strong> as the most <strong>respected and dependable real estate consulting firm </strong> in the region — recognized for <strong>integrity, transparency</strong>, and a relentless focus on client satisfaction.
            </p>
            <button onClick={() => toggleExpand("vision")} className="btn-link">
              {expanded.vision ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>

      {/* Commitment */}
      <div className="col-md-6 col-lg-4 col-xl-4">
        <div className={`why_chose_us ${style}`}>
          <div className="icon">
            <Image
              width={60}
              height={60}
              className="img-fluid"
              // src="/assets/images/commit.svg"
              src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/commit.svg`}
              alt="Commitment"
            />
          </div>
          <div className="details">
            <h4>Our Promise</h4>
            <p className={`description ${expanded.commitment ? "expanded" : "collapsed"}`}>
             WeGrow is more than a real estate consultancy — we are your <strong>partners in growth </strong>. We are committed to empowering every client with the <strong>right information, expert guidance</strong>, and <strong>opportunities that align with their financial goals</strong>. We’re here to help you grow — every step of the way.
            </p>
            <button onClick={() => toggleExpand("commitment")} className="btn-link">
              {expanded.commitment ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChoose;

