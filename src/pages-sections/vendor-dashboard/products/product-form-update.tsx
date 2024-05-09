import { Dispatch, FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup";
// GLOBAL CUSTOM COMPONENTS
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
// STYLED COMPONENTS
import { UploadImageBox, StyledClear } from "../styles";
import axios from "axios";
import { useRouter } from "next/navigation";
import uploadImage from "./firbaseStoringImages";
import { Typography } from "@mui/material";

// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  brand: yup.string().required("Brand is required!"),
  model: yup.string().required("Model is required!"),
  category: yup.string().required("Category is required!"),
  description: yup.string().required("Description is required!"),
  stock: yup.number().required("Stock is required!"),
  price: yup.number().required("Price is required!"),
  status: yup.string().required("Status is required!"),
  images: yup.array().min(1, "At least one image is required!"),
});

const INITIAL_VALUES = {
  id: null,
  brand: "",
  model: "",
  status: "",
  stock: 0,
  price: "",
  category: "",
  description: "",
  descriptionUrl: "",
  images: [] as string[],
};

// ================================================================

interface Props {
  product?: typeof INITIAL_VALUES;
  setProduct: Dispatch<typeof INITIAL_VALUES>;
}

const ProductFormUpdate: FC<Props> = (props) => {
  const { product, setProduct } = props;
  const [files, setFiles] = useState([]);
  const [formValues, setFormValues] = useState(product); // Separate state for form values
  const url =
    process.env.NODE_ENV === "production"
      ? "https://www.eurobrand.ba/api"
      : "http://localhost:8080";
  const router = useRouter();

  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const handleChangeDropZone = (newFiles: File[]) => {
    // Combine existing files with newly added files
    const updatedFiles = [...files];
    newFiles.forEach((newFile) => {
      if (!updatedFiles.some((file) => file.name === newFile.name)) {
        updatedFiles.push(newFile);
      }
    });

    // Update the files state with the combined files
    setFiles(updatedFiles);

    // Extract image URLs from all files (existing and newly added)
    const updatedImageUrls = [
      ...formValues.images,
      ...updatedFiles.map((file) => URL.createObjectURL(file)),
    ];

    // Update the images array in formValues with all image URLs
    setFormValues((prevValues) => ({
      ...prevValues,
      images: updatedImageUrls,
    }));
  };

  const handleExistingFileDelete = (image: string) => () => {
    // Filter out the deleted image from the product's images
    const updatedImages = formValues.images.filter((img) => img !== image);

    // Update the product state with the updated images
    setFormValues((prevProduct) => ({
      ...prevProduct,
      images: updatedImages,
    }));
  };

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    const uploadedImages = await Promise.all(
      files.map((file) => uploadImage(file, product.brand, product.model))
    );

    const updatedImageUrls = [...formValues.images, ...uploadedImages];

    formValues.brand = values.brand;
    formValues.model = values.model;
    formValues.category = values.category;
    formValues.images = updatedImageUrls;
    formValues.description = values.description;
    formValues.descriptionUrl = values.descriptionUrl;
    formValues.stock = values.stock;
    formValues.status = values.status;
    formValues.price = values.price;

    const response = await axios.post(url + "/products/save", formValues);
    if (response.status === 200) {
      router.push("/admin/products");
    }
  };

  // HANDLE DELETE UPLOAD IMAGE
  const handleFileDelete = (file: File) => () => {
    setFiles((files) => files.filter((item) => item.name !== file.name));
    setFormValues((prevValues) => ({
      ...prevValues,
      images: prevValues.images.filter(
        (imageUrl) => imageUrl !== URL.createObjectURL(file)
      ),
    }));
  };

  return (
    <Card sx={{ p: 6 }}>
      {formValues && (
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={formValues}
          validationSchema={VALIDATION_SCHEMA}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    name="brand"
                    label="Brand"
                    color="info"
                    size="medium"
                    placeholder="Brand"
                    value={values.brand}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.brand && !!errors.brand}
                    helperText={(touched.brand && errors.brand) as string}
                  />
                </Grid>

                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    name="model"
                    label="Model"
                    color="info"
                    size="medium"
                    placeholder="Model"
                    value={values.model}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.model && !!errors.model}
                    helperText={(touched.model && errors.model) as string}
                  />
                </Grid>

                <Grid item sm={4} xs={12}>
                  <TextField
                    select
                    fullWidth
                    name="category"
                    label="Category"
                    color="info"
                    size="medium"
                    placeholder="Category"
                    onBlur={handleBlur}
                    value={values.category || ""} // Use default value if values.tags is undefined
                    onChange={handleChange}
                    error={!!touched.category && !!errors.category}
                    helperText={(touched.category && errors.category) as string}
                  >
                    <MenuItem value={8}>Računari</MenuItem>
                    <MenuItem value={9}>Laptopi</MenuItem>
                    <MenuItem value={10}>Apple</MenuItem>
                    <MenuItem value={11}>Mobiteli</MenuItem>
                    <MenuItem value={12}>Monitori</MenuItem>
                    <MenuItem value={14}>Printeri</MenuItem>
                    <MenuItem value={15}>Miševi</MenuItem>
                    <MenuItem value={16}>Adapteri</MenuItem>
                    <MenuItem value={17}>Projektori</MenuItem>
                    <MenuItem value={18}>Diskovi</MenuItem>
                    <MenuItem value={19}>Tastature</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <DropZone onChange={(files) => handleChangeDropZone(files)} />

                  <Grid>
                    <FlexBox
                      flexDirection={"row"}
                      mt={2}
                      flexWrap="wrap"
                      gap={1}
                    >
                      {formValues && <Typography>Current images</Typography>}
                      {formValues.images.map((image, index) => {
                        return (
                          <UploadImageBox key={index}>
                            <Box component="img" src={image} width="100%" />
                            <StyledClear
                              onClick={handleExistingFileDelete(image)}
                            />
                          </UploadImageBox>
                        );
                      })}
                    </FlexBox>
                    {!!touched.images && errors.images && (
                      <div style={{ color: "red" }}>Unos slika je obavezan</div>
                    )}
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    rows={6}
                    multiline
                    fullWidth
                    color="info"
                    size="medium"
                    name="description"
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Description"
                    value={values.description}
                    error={!!touched.description && !!errors.description}
                    helperText={
                      (touched.description && errors.description) as string
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    rows={2}
                    multiline
                    fullWidth
                    color="info"
                    size="medium"
                    name="descriptionUrl"
                    label="Description Url"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Description Url"
                    value={values.descriptionUrl}
                    error={!!touched.descriptionUrl && !!errors.descriptionUrl}
                    helperText={
                      (touched.descriptionUrl &&
                        errors.descriptionUrl) as string
                    }
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="stock"
                    color="info"
                    size="medium"
                    label="Stock"
                    placeholder="Stock"
                    onBlur={handleBlur}
                    value={values.stock}
                    onChange={handleChange}
                    error={!!touched.stock && !!errors.stock}
                    helperText={(touched.stock && errors.stock) as string}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    name="status"
                    label="Status"
                    color="info"
                    size="medium"
                    placeholder="Status"
                    onBlur={handleBlur}
                    value={values.status || ""} // Use default value if values.tags is undefined
                    onChange={handleChange}
                    error={!!touched.status && !!errors.status}
                    helperText={(touched.status && errors.status) as string}
                  >
                    <MenuItem value={1}>Novo</MenuItem>
                    <MenuItem value={2}>Polovno</MenuItem>
                  </TextField>
                </Grid>

                <Grid item sm={6} xs={6}>
                  <TextField
                    fullWidth
                    name="price"
                    color="info"
                    size="medium"
                    type="number"
                    onBlur={handleBlur}
                    value={values.price}
                    label="Regular Price"
                    onChange={handleChange}
                    placeholder="Regular Price in KM, enter only value"
                    error={!!touched.price && !!errors.price}
                    helperText={(touched.price && errors.price) as string}
                  />
                </Grid>

                <Grid item sm={12} xs={12}>
                  <Button variant="contained" color="info" type="submit">
                    Save product
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      )}
    </Card>
  );
};

export default ProductFormUpdate;
