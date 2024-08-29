import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";

const AddCategory = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryImageUrl, setCategoryImageUrl] = useState("");
  const [editImageFile, setEditImageFile] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/category`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        console.log("Fetched categories:", data[0].categories);
        setMenuItems(data[0].categories);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenuItems();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/categories/${categoryId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      setMenuItems((prevItems) =>
        prevItems.filter((item) => item.categoryId !== categoryId)
      );

      console.log("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const CustomCard = styled(Card)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      cursor: "pointer",
    },
  }));

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "4px",
    boxShadow: 24,
    p: 4,
  };

  const addToCartBtnStyle = {
    backgroundColor: "#ffd93cf0",
    fontWeight: "900",
    color: "#26120fbd",
    padding: "6px 6px",
  };

  const handleTitleChange = (event) => {
    setCategoryTitle(event.target.value);
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const newCategory = {
      title: categoryTitle,
      image: categoryImageUrl,
    
      dishes: [],
    };
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add category");
      }
  
      const newCategoryData = await response.json();
      console.log("Category added successfully:", newCategoryData);
  
      setMenuItems((prevItems) => [...prevItems, newCategoryData.data]);
      handleCloseAddModal();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  


  const handleSaveEditChanges = async (event) => {
    event.preventDefault();

    const updatedCategory = {
      title: categoryTitle,
      image: editImageFile ? await uploadImage(editImageFile) : selectedCategory.image,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/categories/${selectedCategory.categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCategory),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const data = await response.json();
      console.log("Category updated successfully:", data);

      setMenuItems((prevItems) =>
        prevItems.map((item) =>
          item.categoryId === selectedCategory.categoryId
            ? { ...item, title: categoryTitle, image: updatedCategory.image }
            : item
        )
      );

      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/upload-image`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      const data = await response.json();
      return data.imageUrl; 
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleOpenAddModal = () => {
    setCategoryTitle(""); 
    setCategoryImageUrl(""); 
    setOpenAddModal(true);
  };
  
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenEditModal = (category) => {
    setSelectedCategory(category);
    setCategoryTitle(category.title);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => setOpenEditModal(false);

  return (
    <Grid>
      <Button
        onClick={handleOpenAddModal}
        variant="contained"
        style={addToCartBtnStyle}
      >
        Add Category
      </Button>
      <Modal
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="modal-add-title"
        aria-describedby="modal-add-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            Add New Category
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Category Image URL"
              variant="outlined"
              fullWidth
              value={categoryImageUrl}
              onChange={(e) => setCategoryImageUrl(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Category Title"
              variant="outlined"
              fullWidth
              value={categoryTitle}
              onChange={handleTitleChange}
              sx={{ marginBottom: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Add Category
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-edit-title"
        aria-describedby="modal-edit-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            Edit Category
          </Typography>
          <form onSubmit={handleSaveEditChanges}>
            <TextField
              label="Category Image URL"
              variant="outlined"
              fullWidth
              value={selectedCategory ? selectedCategory.image : ""}
              onChange={(e) => setSelectedCategory({ ...selectedCategory, image: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Category Title"
              variant="outlined"
              fullWidth
              value={categoryTitle}
              onChange={handleTitleChange}
              sx={{ marginBottom: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Save Changes
            </Button>
          </form>
        </Box>
      </Modal>

      <Grid container spacing={2}>
        {menuItems.map((category) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            key={category.categoryId}
            style={{ marginBottom: "20px", marginTop: "20px" }}
          >
            <CustomCard>
              <img
                src={category.image}
                alt={category.title}
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#26120fbd",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                  gutterBottom
                >
                  {category.title}
                </Typography>
                <Grid
                  container
                  style={{
                    display: 'flex',
                    gap: '25px',
                    width: '100%',
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleOpenEditModal(category)}
                    style={{
                      backgroundColor: "#FFA500",
                      fontWeight: "900",
                      color: "white",
                      padding: "10px 20px",
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleDeleteCategory(category.categoryId)}
                    style={{
                      backgroundColor: "red",
                      fontWeight: "900",
                      color: "white",
                      padding: "10px 20px",
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
              </CardContent>
            </CustomCard>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default AddCategory;
