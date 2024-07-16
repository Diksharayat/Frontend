import { toast } from "react-toastify";

const AddToCarts = async (product_id, name, description, price, image) => {
  try {
   
    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
   
      toast.error("Please log in to add items to the cart");
      return;
    }
  
    const cleanedPrice = parseFloat(price.replace('$', ''));
    const newItem = { product_id, name, description, price: cleanedPrice, image, quantity: 1, totalPrice: cleanedPrice };
    let existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const existingItemIndex = existingCartItems.findIndex(item => item.product_id === product_id);

    if (existingItemIndex !== -1) {
      existingCartItems[existingItemIndex].quantity++;
      existingCartItems[existingItemIndex].totalPrice = existingCartItems[existingItemIndex].quantity * existingCartItems[existingItemIndex].price;
    } else {
      existingCartItems.push(newItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    toast.success("Item added to the cart");
    console.log(existingCartItems);
  } catch (error) {
    console.error('Error adding item:', error);
  }
};

 export default AddToCarts