import axios from "axios";

class ContactService {
  static ContactList() {
    let serverURL = `http://localhost:4000/contacts`;
    return axios.get(serverURL);
  }

  static Contact(ContactId) {
    let dataURL = `http://localhost:4000/contacts/${ContactId}`;
    return axios.get(dataURL);
  }

  // get all groups
  static getGroups() {
    let dataURL = `http://localhost:4000/Groups`;
    return axios.get(dataURL);
  }

  // get single groups
  static getGroup(contact) {
    let groupId = contact.groupId;
    let dataURL = `http://localhost:4000/Groups/${groupId}`;
    return axios.get(dataURL);
  }

  // create single contact
  static createContact(contact) {
    let serverURL = `http://localhost:4000/contacts`;
    return axios.post(serverURL, contact);
  }

  static updateContact(contact, ContactId) {
    let dataUrl = `http://localhost:4000/contacts/${ContactId}`;
    return axios.put(dataUrl, contact);
  }

  static deleteContact(ContactId) {
    let serverURL = `http://localhost:4000/contacts/${ContactId}`;
    return axios.delete(serverURL);
  }
}

export default ContactService;
