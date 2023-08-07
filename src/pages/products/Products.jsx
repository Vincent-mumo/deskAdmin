import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Products.scss"
import deleted from "../../images/delete.png"
import {useDispatch, useSelector} from "react-redux"
import {deleteProduct, getProducts} from "../../redux/apiCalls"

const Products = () => {
  const products = useSelector((state) => state.product.products)
  const dispatch = useDispatch()


  //fetching products
  useEffect(() => {
     getProducts(dispatch)
  },[dispatch])



  //deleting a single product
  const handleDelete = (id) => {
    deleteProduct(id,dispatch)
  }

  //columns for data grid
  const columns = [
    {field:"_id",headerName:"ID",width:240},
    {field:"name",headerName:"Product Name",width:200,renderCell:(params) => {
      return (
        <div className="productData">
          <img src={params.row.image} alt="" />
          {params.row.name}
        </div>
      )
    }},
    {field:"type",headerName:"Type",width:100},
    {field:"price",headerName:"Price",width:100},
    {field:"category",headerName:"Category",width:100},
    {field:"size",headerName:"Size",width:80},
    {field:"color",headerName:"Color",width:130},
    {field:"action",headerName:"Action",width:115,renderCell:(params)=> {
      return (
        <div className="viewing">
        <Link to={"/products/" + params.row._id}>
          <button>View</button>
        </Link>
        <img src={deleted} alt="" onClick={() => handleDelete(params.row._id)} />
        </div>
      )
    }}

  ]



  return (
    <div className='products'>
      <div className="top">
        <Link to="/"><button>Go Back</button></Link>
        <Link to="/products/new"><button>Create new Product</button></Link>
        </div>
        <h1>All Products data.</h1>
        <DataGrid
        rows={products}
        {...products}
       initialState={{
         ...products.initialState,
         pagination: { paginationModel: { pageSize: 7 } },
       }}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={5} paginationMode="client" pagination={true}
        checkboxSelection
      />
      </div>
  )
}

export default Products