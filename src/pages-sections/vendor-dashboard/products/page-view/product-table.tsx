import React, { PropsWithChildren } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
} from "@mui/material";
import Product from "models/Product.model";
import { StyledTableCell } from "pages-sections/vendor-dashboard/styles";
import { StyledIconButton } from "components/settings/styles";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Button } from "react-scroll";
import LazyImage from "components/LazyImage";

interface Props {
  products: Product[];
  handleDeleteProduct
}

const ProductTable: React.FC<Props> = ({ products, handleDeleteProduct }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const router = useRouter();


  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Box>
                      <LazyImage
                      width={50}
                      height={50}
                        alt="product image"
                        src={product.images[0]?.imageUrl}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.model}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>{product.price} KM</TableCell>
                  <TableCell>
                    <div
                      onClick={() =>
                        router.push(`/admin/products/${product.id}`)
                      }
                    >
                      <Edit />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div onClick={() => {
                      handleDeleteProduct(product.id);
                    }}>
                      <Delete />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductTable;
