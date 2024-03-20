import { FC, useEffect, useState } from "react";
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
import api from "utils/__api__/sales";
import Category from "models/Category.model";

// FORM FIELDS VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  brand: yup.string().required("Brand is required!"),
  model: yup.string().required("Model is required!"),
  category: yup.string().required("Category is required!"),
  description: yup.string().required("Description is required!"),
  stock: yup.number().required("Stock is required!"),
  price: yup.number().required("Price is required!"),
  status: yup.string().required("Status is required!"),
});

// ================================================================
interface Props {
  initialValues: any;
  handleFormSubmit: (values: any) => void;
}
// ================================================================

const ProductForm: FC<Props> = (props) => {
  const { initialValues, handleFormSubmit } = props;
  const [categories, setCategories] = useState<Category[]>([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    api.getCategoriesTwo().then((data) => setCategories(data));
  }, []);

  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const handleChangeDropZone = (files: File[]) => {
    files.forEach((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setFiles(files);
  };

  // HANDLE DELETE UPLOAD IMAGE
  const handleFileDelete = (file: File) => () => {
    setFiles((files) => files.filter((item) => item.name !== file.name));
  };

  return (
    <Card sx={{ p: 6 }}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
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
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={(touched.name && errors.name) as string}
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
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={(touched.name && errors.name) as string}
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
                  <MenuItem value={8}>Racunari</MenuItem>
                  <MenuItem value={9}>Laptopi</MenuItem>
                  <MenuItem value={10}>Konzole</MenuItem>
                  <MenuItem value={11}>Mobiteli</MenuItem>
                  <MenuItem value={12}>Monitori</MenuItem>
                  <MenuItem value={13}>Racunarska oprema</MenuItem>
                  <MenuItem value={14}>Printeri</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <DropZone onChange={(files) => handleChangeDropZone(files)} />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => {
                    return (
                      <UploadImageBox key={index}>
                        <Box component="img" src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDelete(file)} />
                      </UploadImageBox>
                    );
                  })}
                </FlexBox>
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
    </Card>
  );
};

export default ProductForm;
