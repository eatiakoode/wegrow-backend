

"use client"; // Add this at the top
import Image from "next/image";
import { getPropertyEnquiryTableData } from "@/api/propertyenquiry";
import { useState, useEffect } from "react";
// import Image from "next/image";
import Link from "next/link";

const AuthorReview = () => {
  const [enquiryList, setEnquiryList] = useState([]);
  const fetchEnquiryData = async () => {
        const data = await getPropertyEnquiryTableData();
        console.log("dataenquiryList")
        console.log(data)
        setEnquiryList(data);
      };
  // const reviewContent = [
  //   {
  //     id: 1,
  //     img: "/assets/images/resource/review.png",
  //     ratings: (
  //       <>
  //         {" "}
  //         <ul>
  //           <li className="list-inline-item">
  //             <a href="#">
  //               <i className="fa fa-star"></i>
  //             </a>
  //           </li>
  //           <li className="list-inline-item">
  //             <a href="#">
  //               <i className="fa fa-star"></i>
  //             </a>
  //           </li>
  //           <li className="list-inline-item">
  //             <a href="#">
  //               <i className="fa fa-star"></i>
  //             </a>
  //           </li>
  //           <li className="list-inline-item">
  //             <a href="#">
  //               <i className="fa fa-star"></i>
  //             </a>
  //           </li>
  //           <li className="list-inline-item">
  //             <a href="#">
  //               <i className="fa fa-star"></i>
  //             </a>
  //           </li>
  //         </ul>
  //       </>
  //     ),
  //     reviewOn: "Villa called Archangel",
  //     text: `Beautiful home, very picturesque and close to everything in jtree! A
  //     little warm for a hot weekend, but would love to come back during
  //     the cooler seasons! Lorem ipsum dolor sit amet, consectetur
  //     adipisicing elit. Accusantium voluptates eum, velit recusandae,
  //     ducimus earum aperiam commodi error officia optio aut et quae nam
  //     nostrum!`,
  //   },
  //   {
  //     id: 2,
  //     img: "/assets/images/resource/review4.png",
  //     ratings: (
  //       <>
  //         {" "}
  //         <ul>
  //           <li className="list-inline-item">
  //             <a href="#">
  //               <i className="fa fa-star"></i>
  //             </a>
  //           </li>
  //           <li className="list-inline-item">
  //             <a href="#">
  //               <i className="fa fa-star"></i>
  //             </a>
  //           </li>
  //           <li className="list-inline-item">
  //             <a href="#">
  //               <i className="fa fa-star"></i>
  //             </a>
  //           </li>
  //           <li className="list-inline-item">
  //             <a href="#">
  //               <i className="fa fa-star"></i>
  //             </a>
  //           </li>
  //           <li className="list-inline-item">
  //             <a href="#">
  //               <i className="fa fa-star"></i>
  //             </a>
  //           </li>
  //         </ul>
  //       </>
  //     ),
  //     reviewOn: "Sunset Studio",
  //     text: `Beautiful home, very picturesque and close to everything in jtree! A
  //     little warm for a hot weekend, but would love to come back during
  //     the cooler seasons! Lorem ipsum dolor sit amet, consectetur
  //     adipisicing elit. Accusantium voluptates eum, velit recusandae,
  //     ducimus earum aperiam commodi error officia optio aut et quae nam
  //     nostrum!`,
  //   },
  // ];
  useEffect(() => {
    fetchEnquiryData();
  }, []); 
  return (
    <>
      {enquiryList.map((item) => (
        <div className="media mt30" key={item.id}>
          
          <div className="media-body">
            <h5 className="review_title mt-0">
              
             
               <div> <span className="text-thm">Name: {item.name}</span></div>
               <div> <span className="text-thm">Email: {item.email}</span> </div>
              
              <span className="sspd_review float-end">
                Enquiry At: {new Date(item.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })}
                </span>
            </h5>
            <a className="review_date" href="#">
            For Property: {item?.propertyid?.title}
            </a>
            <p className="para">{item.message}</p>

           
          </div>
        </div>
      ))}
    </>
  );
};

export default AuthorReview;
