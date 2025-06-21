export async function getPropertyFeatureData() {
    // Fake delay
    // console.log(filter)
    await new Promise((resolve) => setTimeout(resolve, 1400));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/property/list?feature=yes&limit=6"); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }
  export async function getPropertyHotData() {
    // Fake delay
    // console.log(filter)
    await new Promise((resolve) => setTimeout(resolve, 1400));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/property/list?hot=yes&limit=6"); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }

  export const getPropertyById = async (id: string) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/property/detail/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get Property");
    }
  
    return response.json();
  };

  export async function getPropertyFilterData(filter) {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 1400));
    console.log("filter")
    console.log(filter)
    let querystring=""
    if(filter.category){
      querystring +="&category="+filter.category
    }
    if(filter.keyword){
      querystring +="&keyword="+filter.keyword
    }
    if(filter.city){
      querystring +="&city="+filter.city
    }
    
    if(filter.propertytype){
      querystring +="&propertytype="+filter.propertytype
    }
    if(filter.location){
      querystring +="&location="+filter.location
    }
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/property/filterlist?limit="+filter.limit+"&skip="+filter.page+querystring); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }

  export async function getPropertyCompareData(propertycomparelist) {
    // Fake delay
    // console.log(filter)
    await new Promise((resolve) => setTimeout(resolve, 1400));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/property/propertyidlist?prolist="+propertycomparelist); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }

  export const getPropertyBySlug = async (slug: string) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/property/slug/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      cache: "no-store"
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get Property");
    }
  
    return response.json();
  };

  export const addPropertyAPI = async (title) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token
console.log("title")
console.log(title)
    // const token =process.env.NEXT_PUBLIC_TOKEN;
    const userData = JSON.parse(localStorage.getItem("user"));
console.log(userData.name);
// const token = localStorage.getItem("token"); // 🔹 Retrieve token
// // console.log("token")
//     const token =process.env.NEXT_PUBLIC_TOKEN;
const token =userData.token

  
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/property/sell", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: title,
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add Property");
    }
  
    return response.json();
  };


  export async function getPropertyListbyPropertypage(propertypage) {
    // Fake delay
    // console.log(filter)
    await new Promise((resolve) => setTimeout(resolve, 1400));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/property/propertylistpage/"+propertypage); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  };

  export async function getPropertyListTrends(propertytypeid,categoriesid) {
    // Fake delay
    // console.log(filter)
    await new Promise((resolve) => setTimeout(resolve, 1400));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/property/propertylisttrends?propertytypeid="+propertytypeid+"&categoriesid="+categoriesid); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  };

  export async function getPropertyListbyBuilder(builderid) {
    // Fake delay
    // console.log(filter)
    await new Promise((resolve) => setTimeout(resolve, 1400));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/property/propertylistbuilder/"+builderid); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  };