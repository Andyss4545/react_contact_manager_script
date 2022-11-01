import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ContactService from "../../../service/ContactService";
import SpinnerImg from "../../Preloader/Spinner";

let ViewContact = () => {
  const { ContactId } = useParams();

  let [state, setState] = useState({
    contact: {},
    loading: false,
    errorMessage: "",
    group: {},
  });

  let { contact, loading, group, errorMessage } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(() => ({ ...state, loading: true }));
        let Response = await ContactService.Contact(ContactId);
        let groupResponse = await ContactService.getGroup(Response.data);
        setState(() => ({
          ...state,
          contact: Response.data,
          group: groupResponse.data,
          loading: false,
        }));
      } catch (error) {
        setState(() => ({
          ...state,
          loading: false,
          errorMessage: error,
        }));
      }
    };

    fetchData();
  }, [ContactId]);

  return loading ? (
    <SpinnerImg />
  ) : (
    <React.Fragment>
      {/* <pre>{JSON.stringify(group)}</pre> */}

      <div className="container">
        <div>
          <h3 className="h3Color">View Contaact</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            laudantium id doloribus minima qui magni officiis voluptatem, neque
            labore quos, obcaecati ad iste porro blanditiis sunt cupiditate,
            eaque sed nulla!
          </p>
        </div>
      </div>

      {Object.keys(contact).length > 0 && Object.keys(group).length > 0 && (
        <div key={contact.id} className="container mt-4">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className=" mt-4">
                    <ul id="list" className="list-group text-align-left">
                      <li className="list-group-item ">
                        Name: <span>{contact.name}</span>
                      </li>
                      <li className="list-group-item ">
                        Mobile: <span>{contact.mobile}</span>
                      </li>
                      <li className="list-group-item ">
                        Email: <span>{contact.email}</span>
                      </li>
                      <li className="list-group-item ">
                        Location: <span>{contact.location}</span>
                      </li>
                      <li className="list-group-item ">
                        Company: <span>{contact.company}</span>
                      </li>
                      <li className="list-group-item ">
                        Title: <span>{contact.title}</span>
                      </li>
                      <li className="list-group-item ">
                        Group: <span>{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 ">
              <div className="bgprofile align-item-center">
                <img
                  className="contact-img img-fluid mt-4"
                  src={contact.photo}
                  alt=""
                />
              </div>
              <button className="backbtn">
                <Link to={"/contact/list"}>Back</Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ViewContact;
