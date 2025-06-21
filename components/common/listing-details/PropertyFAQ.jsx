// "use client";

// import { useState, useEffect } from "react";

const PropertyFAQ = ({ faqs }) => {
  // const [faqs, setFaqs] = useState([]);

  // const fetchFaqs = async (id) => {
  //   try {
  //     const data = await getFaqByPropertyIdData(id);
  //     console.log(" faq data")
  //     console.log(data)
  //     setFaqs(data.data);
  //   } catch (error) {
  //     console.error("Error fetching FAQs:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (property?._id) {
  //     fetchFaqs(property._id);
  //   }
  // }, [property?._id]);
  return (
    <div className="accordion" id="accordionExample">
      {faqs?.slice(0, 38).map((singleItem,index) => (
      <div className="card floor_plan" key={index}>
        <div id={`heading${index}`}>
          <h2 className="mb-0">
            <button
              className="btn btn-link accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded="false"
              aria-controls={`collapse${index}`}
            >
             {singleItem.title}
            </button>
          </h2>
        </div>
        <div
          id={`collapse${index}`}
          className="collapse"
          aria-labelledby={`heading${index}`}
          data-bs-parent="#accordionExample"
        >
          <div className="card-body text-center">
            
          {singleItem.description}
          </div>
        </div>
      </div>
       ))}
      
    </div>
  );
};

export default PropertyFAQ;
