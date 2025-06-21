'use client'

import { useState } from "react";

import { addPropertyEnquiryAPI } from "@/api/frontend/propertyenquiry";
import { useRouter, useParams } from "next/navigation";

const ContactWithAgent = ({property}) => {
  // const [appointmentDate, setAppointmentDate] = useState(null);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  // const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const requiredFields = [
      { key: "name", value: name, name: "Name" },
      { key: "email", value: email, name: "Email" },
      { key: "phone", value: phone, name: "Phone" },
      { key: "budget", value: budget, name: "Budget" },
      // { key: "subject", value: subject, name: "Subject" },
      // { key: "appointmentDate", value: appointmentDate, name: "Appointment Date" },
      { key: "message", value: message, name: "Message" },
      
    ];
  
    requiredFields.forEach(field => {
      if (!field.value || (typeof field.value === "string" && !field.value.trim())) {
        console.log("field.name"+field.name)
        newErrors[field.key] = `${field.name} is required`;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      console.log("test")
      return setError(newErrors);
    }
    try {
      // console.log(propertySelectedImgs)
      const payload = {
        name, email, phone, message, budget,
        propertyid:property._id
        // date:appointmentDate
      };
      console.log(payload)
      console.log("payload")
      const res = await addPropertyEnquiryAPI(payload);
      if(res.success){
        setSuccessmsg(res.message)
        setName("")
        setEmail("")
        setPhone("")
        // setSubject("")
        setMessage("")
      }

      setError({});
      router.push("/thank-you");
    // (Reset other fields here if needed)
  } catch (err) {
    setError({ general: err.message || "Something went wrong" });
  }
  };
  return (
    <form action="#" onSubmit={handleSubmit}>
      <ul className="sasw_list mb0">
        <li className="search_area">
          <div className="form-group mb-3">
            <input
              id="form_name"
              name="form_name"
              className="form-control"
              // required="required"
              type="text"
              placeholder="Name"
              value={name} onChange={(e) => setName(e.target.value)}
            />
            {error.name && <span className="text-danger">{error.name}</span>}
          </div>
        </li>
        {/* End li */}
        <li className="search_area">
          <div className="form-group mb-3">
          <input
              id="form_phone"
              name="form_phone"
              className="form-control required phone"
              // required="required"
              type="phone"
              placeholder="Phone"
              value={phone} onChange={(e) => setPhone(e.target.value)}
            />
            {error.phone && <span className="text-danger">{error.phone}</span>}
          </div>
        </li>{" "}
        {/* End li */}
        <li className="search_area">
          <div className="form-group mb-3">
          <input
              id="form_email"
              name="form_email"
              className="form-control required email"
              // required="required"
              type="email"
              placeholder="Email"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <span className="text-danger">{error.email}</span>}
          </div>
        </li>{" "}
        {/* End li */}
        <li className="search_area">
          <div className="form-group mb-3">
            <select
              id="form_budget"
              name="form_budget"
              className="form-control"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}>
              <option value="">Select Budget</option>
              <option value="1cr">Upto 2cr</option>
              <option value="2 - 5cr">2 - 5cr</option>
              <option value="5 - 10cr">5 - 10cr</option>
              <option value="above 10cr">Above 10cr</option>
            </select>            
            <span className="flaticon-download-1 fz12"></span>
            {error.budget && <span className="text-danger">{error.budget}</span>}
          </div>
        </li>
        {/* End li */}
        <li className="search_area">
          <div className="form-group mb-3">
          <textarea
                id="form_message"
                name="form_message"
                className="form-control required"
                rows="1"
                // required="required"
                placeholder="Your Message"
                value={message} onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              {error.message && <span className="text-danger">{error.message}</span>}
          </div>
        </li>{" "}
        {/* End li */}

        <li>
        {successmsg && <span className="text-success">{successmsg}</span>}
          <div className="search_option_button">
            <button type="submit" className="btn btn-block btn-thm w-100">
              Request
            </button>
          </div>
        </li>{" "}
        {/* End li */}
      </ul>
    </form>
  );
};

export default ContactWithAgent;
