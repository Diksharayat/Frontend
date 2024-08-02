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
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); 

  const [imageFile, setImageFile] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null); 
  const [categoryTitle, setCategoryTitle] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");

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

  const CustomModal = styled(Modal)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleEditImageChange = (event) => {
    const file = event.target.files[0];
    setEditImageFile(file);
  };

  const handleTitleChange = (event) => {
    setCategoryTitle(event.target.value);
  };

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", imageFile, categoryTitle, selectedDevice);

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", categoryTitle);
    formData.append("device", selectedDevice);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/upload-image`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to upload image");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Image uploaded successfully:", data);
        handleCloseAddModal();
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  // const handleEditSubmit = (event) => {
  //   event.preventDefault();
  //   if (!selectedCategory) return;

  //   const formData = new FormData();
  //   if (editImageFile) {
  //     formData.append("image", editImageFile);
  //   }
  //   formData.append("title", categoryTitle || selectedCategory.title);
  //   formData.append("device", selectedDevice || selectedCategory.device);
  //   formData.append("id", selectedCategory._id); 

  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories/${ca}`, {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to update category");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Category updated successfully:", data);
  //       setMenuItems((prevItems) =>
  //         prevItems.map((item) =>
  //           item._id === data._id ? data : item
  //         )
  //       );
  //       handleCloseEditModal();
  //     })
  //     .catch((error) => {
  //       console.error("Error updating category:", error);
  //     });
  // };

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenEditModal = (category) => {
    setSelectedCategory(category);
    setCategoryTitle(category.title);
    setSelectedDevice(category.device || "");
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
      <CustomModal
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            Add New Category
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="image-upload" style={{ marginBottom: 10 }}>
              Select Image:
            </label>
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              onChange={handleImageChange}
              style={{ marginBottom: 10 }}
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
      </CustomModal>

      <CustomModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-edit-title"
        aria-describedby="modal-edit-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            Edit Category
          </Typography>
          <form >
            <label htmlFor="edit-image-upload" style={{ marginBottom: 10 }}>
              Select New Image (optional):
            </label>
            <input
              type="file"
              accept="image/*"
              id="edit-image-upload"
              onChange={handleEditImageChange}
              style={{ marginBottom: 10 }}
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
      </CustomModal>

      <Grid container spacing={2}>
        {menuItems.map((category, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            key={index}
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
