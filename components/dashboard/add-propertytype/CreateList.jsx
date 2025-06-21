"use client";

import { useState, useEffect } from "react";
import { addPropertytypeAPI } from "../../../api/propertytype";
import { getCategoryTableData } from "../../../api/category";

const CreateList = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoryTableData();
        console.log("response")
        console.log(response)

        setCategories(response || []);
      } catch (err) {
        console.error("Error fetching Category:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim() !== "") setError("");
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const addPropertytype = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");

    try {
      const data = await addPropertytypeAPI(title, selectedCategory);
      console.log(data);
      alert(data.message);
      setTitle("");
      setSelectedCategory("");
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <>
      <form onSubmit={addPropertytype} className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="propertytypeTitle">Propertytype Title</label>
            <input
              type="text"
              className="form-control"
              id="propertytypeTitle"
              value={title}
              onChange={handleTitleChange}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="categorySelect">Select Category</label>
            <select
              id="categorySelect"
              className="selectpicker form-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Category --</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button type="button" className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmswegrow/my-dashboard'}>Back</button>
            <button type="submit" className="btn btn2 float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
