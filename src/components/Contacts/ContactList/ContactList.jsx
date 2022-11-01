import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactService from "../../../service/ContactService";
import SpinnerImg from "../../Preloader/Spinner";

let ContactList = () => {
  let [search, setSearch] = useState({
    text: "",
  });

  let searchContacts = (event) => {
    setSearch(() => ({
      ...search,
      text: event.target.value,
    }));

    let theContacts = Contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setState(() => ({
      ...state,
      filterContacts: theContacts,
    }));
  };

  let [state, setState] = useState({
    Contacts: [],
    filterContacts: [],
    loading: false,
    errorMessage: "",
  });

  let { filterContacts, Contacts, loading } = state;

  useEffect(() => {
    let fetchData = async () => {
      setState(() => ({ ...state, loading: true }));
      try {
        let Response = await ContactService.ContactList();
        setState(() => ({
          ...state,
          filterContacts: Response.data,
          Contacts: Response.data,
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
    //eslint-disable-next-line
  }, []);

  let deleteContact = async (ContactId) => {
    try {
      let Response = await ContactService.deleteContact(ContactId);
      if (Response) {
        setState(() => ({ ...state, loading: true }));
        ContactService.ContactList().then((Response) => {
          setState(() => ({
            ...state,
            filterContacts: Response.data,
            Contacts: Response.data,
            loading: false,
          }));
        });
      }
    } catch (error) {
      setState(() => ({
        ...state,
        errorMessage: error,
        loading: false,
      }));
    }
  };

  return loading ? (
    <SpinnerImg />
  ) : (
    <React.Fragment>
      {/* <pre>{JSON.stringify(search.text)}</pre> */}
      <div className="container">
        <div className="titleCon">
          <p>Contact Manager Script</p>

          <Link className="btn btn-primary ms-2" to={"/Contact/Add"}>
            New
          </Link>
        </div>

        <div className="desc">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem,
            eligendi. Enim unde id, natus sequi, culpa architecto quos dolores
            sunt esse assumenda corrupti commodi mollitia neque labore excepturi
            iure alias.
          </p>
        </div>
        <div className="row">
          <div className="col-md-4">
            <form className="d-flex my-2">
              <input
                name="text"
                onChange={searchContacts}
                value={search.text}
                type="text"
                className="form-control ml-4"
                placeholder="Search Name"
              />
              <button className="btn btn-outline-success">Search</button>
            </form>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {Object.keys(filterContacts).length > 0 &&
            Contacts.map((contact) => {
              return (
                <div key={contact.id} className="col-md-6">
                  <div className="card my-3">
                    <div className="card-body">
                      <div className="row ">
                        <div className="bgprofile align-item-center">
                          <img
                            className="contact-img img-fluid"
                            src={contact.photo}
                            alt=""
                          />
                        </div>
                        <div className="margcard mt-4">
                          <ul className="list-group ">
                            <li className="list-group-item list-group-action">
                              Name: <span>{contact.name}</span>
                            </li>
                            <li className="list-group-item list-group-action">
                              Mobile: <span>{contact.mobile}</span>
                            </li>
                            <li className="list-group-item list-group-action">
                              Email: <span>{contact.email}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div id="btn" className="mb-3 mt-4 text-align-center">
                        <Link
                          className="btn btngroup btn-primary "
                          to={`/Contact/Edit/${contact.id}`}
                        >
                          Edit
                        </Link>

                        <Link
                          className="btn btngroup btn-success ml-3"
                          to={`/Contact/View/${contact.id}`}
                        >
                          View
                        </Link>

                        <Link
                          onClick={() => deleteContact(contact.id)}
                          className="btn btngroup btn-danger ml-3"
                        >
                          Delete
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactList;
