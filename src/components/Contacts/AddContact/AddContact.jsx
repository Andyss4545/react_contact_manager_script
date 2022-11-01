import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContactService from "../../../service/ContactService";

let AddContact = () => {
  let navigate = useNavigate();
  let [state, setState] = useState({
    loading: false,
    contact: {
      name: " ",
      email: " ",
      photo: " ",
      mobile: " ",
      location: " ",
      company: " ",
      title: " ",
      groupId: " ",
    },
    groups: [],
    errorMessage: " ",
  });

  useEffect(() => {
    let fetchData = async () => {
      try {
        setState(() => ({ ...state, loading: true }));

        let groupResponse = await ContactService.getGroups();
        setState(() => ({
          ...state,
          groups: groupResponse.data,
          loading: false,
        }));
      } catch (error) {
        setState(() => ({
          ...state,
          errorMessage: error,
          loading: false,
        }));
      }
    };

    fetchData();
    //eslint-disable-next-line
  }, []);

  let { contact, groups } = state;

  let updateInput = (event) => {
    event.preventDefault();

    setState(() => ({
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },

      groups: [...state.groups],
    }));
  };

  let submitForm = (event) => {
    event.preventDefault();
    const fetchData = async () => {
      try {
        let Response = await ContactService.createContact(state.contact);

        if (Response) {
          navigate("/Contact/list", { replace: true });
        }
      } catch (error) {
        setState(() => ({ ...state, errorMessage: error }));
        navigate("/Contact/Add", { replace: false });
      }
    };

    fetchData();
    //eslint-disable-next-line
  };

  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(contact)}</pre> */}
      <div className="container">
        <div>
          <h3 className="h3Color">Add Contaact</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            laudantium id doloribus minima qui magni officiis voluptatem, neque
            labore quos, obcaecati ad iste porro blanditiis sunt cupiditate,
            eaque sed nulla!
          </p>
        </div>
      </div>

      {
        <div className="container">
          <form className="row g-3">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  required={true}
                  name="name"
                  value={contact.name}
                  onChange={updateInput}
                  type="name"
                  className="form-control"
                  placeholder="Name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  required={true}
                  name="email"
                  value={contact.email}
                  onChange={updateInput}
                  type="email"
                  className="form-control"
                  placeholder="email"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Photo Url
                </label>
                <input
                  required={true}
                  name="photo"
                  value={contact.photo}
                  onChange={updateInput}
                  type="text"
                  className="form-control"
                  placeholder="Photo Url"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile
                </label>
                <input
                  required={true}
                  name="mobile"
                  value={contact.mobile}
                  onChange={updateInput}
                  type="mobile"
                  className="form-control"
                  placeholder="Mobile"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  required={true}
                  name="location"
                  value={contact.location}
                  onChange={updateInput}
                  type="text"
                  className="form-control"
                  placeholder="Location"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input
                  required={true}
                  name="company"
                  value={contact.company}
                  onChange={updateInput}
                  type="text"
                  className="form-control"
                  placeholder="Company"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  required={true}
                  name="title"
                  value={contact.title}
                  onChange={updateInput}
                  type="text"
                  className="form-control"
                  placeholder="title"
                />
              </div>
              <div className="mb-3">
                <select
                  required={true}
                  name="groupId"
                  value={contact.groupId}
                  onChange={updateInput}
                  className="form-control"
                  id=""
                >
                  <option value="">Select a Group</option>
                  {groups?.length > 0 &&
                    groups.map((group) => {
                      return (
                        <option value={group.id} key={group.id}>
                          {group.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="formbtn">
              <Link onClick={submitForm} className="btn btn-success">
                Create
              </Link>
              <Link to={"/Contact/List"} className="btn btn-dark btn-black">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      }
    </React.Fragment>
  );
};

export default AddContact;
