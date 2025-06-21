'use client'

import { useState } from "react";
import AppointmentCalendar from "../common/AppointmentCalendar";
import { addEnquiryAPI } from "@/api/frontend/enquiry";
import { useRouter, useParams } from "next/navigation";

const Form = () => {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [successmsg, setSuccessmsg] = useState("");
  const router = useRouter();
  
   
  
  
  // const addProperty = async (e) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const requiredFields = [
      { key: "name", value: name, name: "Name" },
      { key: "email", value: email, name: "Email" },
      { key: "phone", value: phone, name: "Phone" },
      { key: "subject", value: subject, name: "Subject" },
      { key: "appointmentDate", value: appointmentDate, name: "Appointment Date" },
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
        name, email, phone, message, subject,
        date:appointmentDate
      };
      console.log(payload)
      console.log("payload")
      const res = await addEnquiryAPI(payload);
      if(res.status=="success"){
        setSuccessmsg(res.message)
        setName("")
        setEmail("")
        setPhone("")
        setSubject("")
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
    <form className="contact_form" action="#" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
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
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
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
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
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
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <input
              id="form_subject"
              name="form_subject"
              className="form-control required"
              // required="required"
              type="text"
              placeholder="Subject"
              value={subject} onChange={(e) => setSubject(e.target.value)}
            />
            {error.subject && <span className="text-danger">{error.subject}</span>}
          </div>
        </div>
        {/* End .col */}
        <div className="col-md-6">
          <div className="form-group">
            <AppointmentCalendar onDateChange={setAppointmentDate} />
            {error.appointmentDate && <span className="text-danger">{error.appointmentDate}</span>}
          </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
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
          </div>
          {/* End .col */}
          {successmsg && <span className="text-success">{successmsg}</span>}
          
          <div className="col-sm-12">
            <div className="form-group mb0">
            
              <button type="submit" className="btn btn-lg btn-thm">
                Send Message
              </button>
            </div>
          {/* End button submit */}
        </div>
        </div>
      
    </form>
  );
};

export default Form;
