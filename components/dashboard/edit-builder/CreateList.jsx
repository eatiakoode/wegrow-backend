"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getBuilderById, updateBuilderAPI } from "../../../api/builder";


const CreateList = () => {
  const params = useParams();  
    const id = params?.id;  
    const router = useRouter();
    const [builder, setBuilder] = useState({ title: "", status: false,description: "", });
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");  
    const [logo, setLogo] = useState(null);
    const [logoimage, setLogoImage] = useState(null);
    const uploadLogo = (e) => {
      setLogo(e.target.files[0]);
      setLogoImage("")

  };
    useEffect(() => {
      if (!id) return;      
      const fetchBuilder = async () => {
        try {
          const data = await getBuilderById(id);
          console.log("data")
          console.log(data)
          console.log(process.env.NEXT_PUBLIC_API_URL+data.data.logoimage)
          // setBuilder({ title: data.data.title, status: data.data.status, description: data.data.description });
          setTitle(data.data.title)
          setSlug(data.data.slug)
          setStatus(data.data.status)
          setDescription(data.data.description)
          if(data.data.logoimage) {
          setLogoImage(process.env.NEXT_PUBLIC_API_URL+data.data.logoimage)
          }
        } catch (error) {
          console.error("Error fetching Builder:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBuilder();
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("description", description);
        formData.append("status", status);
        if (logo) {
          formData.append("logo", logo);
        }
        await updateBuilderAPI(id, formData);
        alert("Builder updated successfully!");
        router.push("/cmswegrow/my-builder");
      } catch (error) {
        alert("Failed to update Builder.");
        console.error(error);
      }
    };
  
    // const handleChange = (e) => {
    //   setBuilder((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // };
  
    // const handleStatusChange = () => {
    //   setBuilder((prev) => ({ ...prev, status: !prev.status }));
    // };
  
    if (loading) return <p>Loading...</p>;
  return (
    <>
    <form onSubmit={handleSubmit} className="row">
    <div className="col-lg-12">
                <div className="wrap-custom-file">
                    <input
                        type="file"
                        id="image1"
                        accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp, image/avif"
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
          <label htmlFor="BuilderTitle">Builder Title</label>
          <input
        type="text"
        className="form-control"
        id="BuilderTitle"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="BuilderSlug">Builder Slug</label>
          <input
        type="text"
        className="form-control"
        id="BuilderSlug"
        name="slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="BuilderDescription">Description</label>
            <textarea id="BuilderDescription" className="form-control" name="description" rows="7"  value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Builder description"></textarea>
            {error.description && <span className="text-danger">{error.description}</span>}
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
  value={status ? "active" : "deactive"}
  onChange={(e) => setStatus(e.target.value === "active")}
>
        <option value="active">Active</option>
        <option value="deactive">Deactive</option>
      </select>
        </div>
      </div>
      {/* End .col */}

     


      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmswegrow/my-builder'}>Back</button>
          <button className="btn btn2 float-end">Submit</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
