import Header from "../../components/Header/Header";
import { useClinicsQuery } from "../../api/clinic";

import { Link } from "react-router-dom";
import { differenceInDays, parseISO, format } from "date-fns";
import "./Clinics.css";

const Clinics = () => {
  const { data, isSuccess, isLoading } = useClinicsQuery();

  if (isLoading) return <div>still Loading....</div>;

  if (isSuccess)
    return (
      <div className="Clinics-container">
        <Header />
        {data.length > 0 && (
          <main className="Clinics-main-container">
            <div className="d-flex justify-content-between align-items-center ">
              <h5 className="Clinics-h5">SELECTION OF CLINIC</h5>
              <Link to="/addClinic">
                <button className="btn btn-primary me-3"> + Add Clinic</button>
              </Link>
            </div>
            <div className="Clinics-cards row">
              {data.map((item) => {
                const expireDate = parseISO(item.validTill);

                const currentDate = new Date();

                const daysDifference = differenceInDays(
                  expireDate,
                  currentDate
                );

                return (
                  <div
                    key={item.id}
                    className=" col-md-6 col-lg-4  d-flex flex-column  align-items-center"
                  >
                    <div
                      className={
                        daysDifference < 0
                          ? "Clinic-card-inactive"
                          : "Clinic-card-active"
                      }
                    >
                      <Link to="/manage/dashboard" className="Clinic-card-link">
                        <div>
                          <h6>{item.name}</h6>
                          {daysDifference > 0 && (
                            <p>
                              License will Expire within {daysDifference} days{" "}
                            </p>
                          )}
                          {daysDifference === 0 && (
                            <p>License will Expire Today </p>
                          )}
                          {daysDifference < 0 && <p>License Expired </p>}
                          <p className="p-0">{item.address}</p>
                          <p>Your {item.user.role} of this clinic</p>
                          {daysDifference < 0 && (
                            <p className="text-danger fw-bold m-0">InActive</p>
                          )}
                          {daysDifference >= 0 && (
                            <p className="text-success fw-bold m-0">Active</p>
                          )}
                          <p className="text-primary fw-bold m-0 mt-1">
                            ValidTill : {format(expireDate, "dd-MMM-yyyy")}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        )}
        {data.length === 0 && (
          <main className="Clinics-main-container">
            <div className="d-flex justify-content-between align-items-center ">
              <h5 className="Clinics-h5">SELECTION OF CLINIC</h5>
              <Link to="/addClinic">
                <button className="btn btn-primary me-3"> + Add Clinic</button>
              </Link>
            </div>
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
              <p style={{ fontSize: "30px" }} className="text-danger fw-bold">
                No clinics are Added.
              </p>
            </div>
          </main>
        )}
      </div>
    );
};

export default Clinics;
