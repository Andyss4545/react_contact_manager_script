import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import ContactList from './components/Contacts/ContactList/ContactList';
import NavBar from './components/NavBar/Navbar';
import ViewContact from './components/Contacts/ViewContact/ViewContact';
import AddContact from './components/Contacts/AddContact/AddContact';
import EditContact from './components/Contacts/EditContact/EditContact';


function App() {
  return (
     <React.Fragment>
           <BrowserRouter>
              <NavBar/>
              <Routes>
                  <Route path='/' element={<ContactList/>} />
                  <Route path='/Contact/list' element={<ContactList/>}/>
                  <Route path='/Contact/Add' element={<AddContact/>} />
                  <Route path='/Contact/View/:ContactId' element={<ViewContact/>} />
                  <Route path='/Contact/Edit/:ContactId' element={<EditContact/>} />
              </Routes>
              
           </BrowserRouter>
     </React.Fragment>
  )
}

export default App;
