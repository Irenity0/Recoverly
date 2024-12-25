import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const routeTitles = {
      "/": "Home - Recoverly",
      "/allItems": "Recoverly Items",
      "/items/:id": "Item Details - Recoverly",
      "/blogs": "Blogs - Recoverly",
      "/aboutus": "About Us - Recoverly",
      "/additem": "Add Item - Recoverly",
      "/recoveredItems": "Recovered Items - Recoverly",
      "/myitems": "My Items - Recoverly",
      "/updateItem/:id": "Update Item - Recoverly",
      "/auth/login": "Login - Recoverly",
      "/auth/register": "Register - Recoverly",
    };

    // Get the matching title or use a default
    const currentPath = location.pathname;
    const matchedTitle =
      Object.entries(routeTitles).find(([key]) =>
        new RegExp(`^${key.replace(/:\w+/g, "\\w+")}$`).test(currentPath)
      )?.[1] || "Recoverly";

    document.title = matchedTitle;
  }, [location]);

  return null; // Does not render anything visible
};

export default DynamicTitle;
