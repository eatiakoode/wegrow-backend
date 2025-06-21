"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAmenityById, updateAmenityAPI } from "../../../api/amenity";


const CreateList = () => {
  const params = useParams();
    // console.log("Params:", params); // Debugging log
  
    const id = params?.id;
    // console.log("Amenity ID:", id); // Debugging log
  
    const router = useRouter();
    const [amenity, setAmenity] = useState({ title: "", status: false });
    const [loading, setLoading] = useState(true);
    const [logo, setLogo] = useState(null);
    const [logoimage, setLogoImage] = useState(null);
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const uploadLogo = (e) => {
      setLogoImage("")
      setLogo(e.target.files[0]);
  };
  
    useEffect(() => {
      if (!id) return;
      
      const fetchAmenity = async () => {
        try {
          const data = await getAmenityById(id);
          console.log("Fetched Amenity Data:", data); // Debugging log
          setAmenity({ title: data.data.title, status: data.data.status });
          setTitle(data.data.title)
          // setSlug(data.data.slug)
          setStatus(data.data.status)
          if(data.data.image) {
            setLogoImage(process.env.NEXT_PUBLIC_API_URL+data.data.image)
            }
        } catch (error) {
          console.error("Error fetching Amenity:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAmenity();
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("status", status);
        if (logo) {
          formData.append("logo", logo);
        }
        await updateAmenityAPI(id, formData);
        alert("Amenity updated successfully!");
        router.push("/cmswegrow/my-amenities");
      } catch (error) {
        alert("Failed to update Amenity.");
        console.error(error);
      }
    };
  
    const handleChange = (e) => {
      setAmenity((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleStatusChange = () => {
      setAmenity((prev) => ({ ...prev, status: !prev.status }));
    };
  
    if (loading) return <p>Loading...</p>;
  return (
    <>
    <form onSubmit={handleSubmit} className="row">
    <div className="col-lg-12">
                <div className="wrap-custom-file">
                    <input
                        type="file"
                        id="image1"
                        accept="image/png, image/gif, image/jpeg, image/svg+xml"
                        onChange={uploadLogo}
                    />
                   <label
                      htmlFor="image1"
                      style={
                        logoimage                          
                        ? { backgroundImage: `url(${logoimage})` }
                          : logo
                          ? { backgroundImage: `url(${URL.createObjectURL(logo)})` }
                          : undefined
                      }
                    >
                        <span>
                            <i className="flaticon-download"></i> Upload Photo{" "}
                        </span>
                    </label>
                </div>
                <p>*minimum 260px x 260px</p>
            </div>
            {/* End .col */}
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="amenityTitle">Amenity Title</label>
          <input
        type="text"
        className="form-control"
        id="amenityTitle"
        name="title"
        value={amenity.title}
        onChange={handleChange}
      />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Status</label>
          <select
        className="selectpicker form-select"
        data-live-search="true"
        data-width="100%"
        value={amenity.status ? "active" : "deactive"}
        onChange={(e) =>
          setAmenity((prev) => ({
            ...prev,
            status: e.target.value === "active",
          }))
        }
      >
        <option value="active">Active</option>
        <option value="deactive">Deactive</option>
      </select>
        </div>
      </div>
      {/* End .col */}

     


      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmswegrow/my-amenities'}>Back</button>
          <button className="btn btn2 float-end">Submit</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
