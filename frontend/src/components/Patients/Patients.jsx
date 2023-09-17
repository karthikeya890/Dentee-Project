import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddPatientModel from "./Components/AddPatientModel/AddPatientModel";
import EditPatientModal from "./Components/EditPatientModal/EditPatientModal";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import {
  useGetPatientsQuery,
  useDeletePatientMutation,
} from "../../api/patient";
import "./Patients.css";

const Patients = () => {
  const { data, isSuccess } = useGetPatientsQuery();

  const [
    deletePatient,
    { isSuccess: deleteSuccess, isError: deleteError, data: deleteData, error },
  ] = useDeletePatientMutation();

  useEffect(() => {
    console.log("rendered");
    if (deleteSuccess) {
      toast.success(deleteData?.message);
      console.log("printed success add");
    } else if (deleteError) {
      toast.error(error?.data.message);
    }
  }, [deleteSuccess, deleteError]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      height: 50,
      renderCell: (params) => (
        <img
          style={{ height: "50px", width: "50px" }}
          className="rounded-5 "
          src={params.value}
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "age",
      headerName: "Age",
      width: 110,
    },
    {
      field: "gender",
      headerName: "Gender",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "Edit",
      renderCell: (info) => EditPatientModal(info.row),
    },
    {
      field: "Delete",
      renderCell: (info) => (
        <button
          onClick={() => {
            deletePatient({ publicId: info.row.publicId, id: info.row.id });
          }}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    },
  ];

  let info;

  if (isSuccess) {
    info = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        age: parseInt(item.age),
        gender: item.gender,
        email: item.email,
        image:
          item.imageUrl === ""
            ? "https://res.cloudinary.com/dcm21aeqp/image/upload/v1694841039/demo_img_tpnaak.jpg"
            : item.imageUrl,
        dob: item.dateOfBirth,
        publicId: item.publicId,
      };
    });
  }

  return (
    <div className="border flex-grow-1 d-flex flex-column align-items-center p-3">
      {AddPatientModel()}

      <Box className="bg-white" sx={{ height: 450, width: "100%" }}>
        <DataGrid
          rows={info || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[8]}
          checkboxSelection
          disableRowSelectionOnClick
          onProcessRowUpdateError={(error) => {
            console.log(error);
          }}
          processRowUpdate={(e1) => console.log(e1.id)}
        />
      </Box>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default Patients;
