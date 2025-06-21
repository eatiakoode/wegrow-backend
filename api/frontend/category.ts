export async function getCategoryTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));
  

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/category"); // Replace with actual API endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array in case of an error
  }
}


export const getCategoryById = async (id: string) => {
  // const token = localStorage.getItem("token"); // 🔹 Retrieve token


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

  const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/category/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get category");
  }

  return response.json();
};

