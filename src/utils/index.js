import {jwtDecode} from "jwt-decode";

// Function to decode JWT token and retrieve user details
export const decodeToken = (token) => {
  try {
    // Check if token is a string
    if (typeof token !== 'string') {
      throw new Error('Invalid token: must be a string');
    }

    // Decode token
    const decoded = jwtDecode(token);
    const decodedString = JSON.stringify(decoded);
    const ab = decodedString.toString()

    return ab;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};



