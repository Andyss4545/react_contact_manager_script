import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ContactService from "../../../service/ContactService";
import SpinnerImg from "../../Preloader/Spinner";

let EditContact = () => {
  const navigate = useNavigate();
  let { ContactId } = useParams();
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

  let { loading, contact, groups, errorMessage } = state;

  useEffect(() => {
    const fetchData = async () => {
      setState(() => ({ ...state, loading: true }));
      try {
        const Response = await ContactService.Contact(ContactId);
        const groupResponse = await ContactService.getGroups();
        setState(() => ({
          ...state,
          loading: false,
          contact: Response.data,
          groups: groupResponse.data,
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

  let updateInput = (event) => {
    event.preventDefault();

    setState(() => ({
      ...state.contact,
      contact: {
        [event.target.name]: event.target.value,
      },
      groups: [...state.groups],
    }));
  };

  let submitForm = async (event) => {
    event.preventDefault();

    try {
      let Response = await ContactService.updateContact(
        state.contact,
        ContactId
      );
      if (Response) {
        navigate(`/`, { replace: true });
      }
    } catch (error) {
      setState(() => ({ ...state.contact, errorMessage: error }));
      navigate(`/Edit/${ContactId}`, { replace: false });
    }
  };

  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(contact)}</pre> */}
      {/* <pre>{JSON.stringify(groups)}</pre> */}
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

      {loading ? (
        <SpinnerImg />
      ) : (
        <div key={contact.groupId} className="container">
          <form className="row g-3">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  required={true}
                  name="name"
                  onChange={updateInput}
                  value={contact.name}
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
                  onChange={updateInput}
                  value={contact.email}
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
                  onChange={updateInput}
                  value={contact.photo}
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
                  onChange={updateInput}
                  value={contact.mobile}
                  type="mobile"
                  className="form-control"
                  placeholder="Mobile"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input
                  required={true}
                  name="company"
                  onChange={updateInput}
                  value={contact.company}
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
                  onChange={updateInput}
                  value={contact.title}
                  type="text"
                  className="form-control"
                  placeholder="title"
                />
              </div>
              <div className="mb-3">
                <select
                  required={true}
                  name="groupId"
                  onChange={updateInput}
                  value={contact.groupId}
                  className="form-control"
                  id=""
                >
                  <option value="">Select Group</option>
                  {groups.length > 0 &&
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
                Update
              </Link>
              <Link to={"/Contact/List"} className="btn btn-dark btn-black">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default EditContact;
