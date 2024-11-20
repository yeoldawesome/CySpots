import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Contacts = ({ contacts, setContacts }) => {
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:8081/contact");
        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        alert("There was an error loading contacts: " + error);
      }
    };
    fetchContacts();
  }, [setContacts]);

  return (
    <div className="container">
      <h2 className="text-center mt-4">Contacts List</h2>
      <ul className="list-group">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <li key={contact.id} className="list-group-item">
              <strong>{contact.contact_name}</strong> - {contact.phone_number}
              <p>{contact.message}</p>
              {contact.image_url && (
                <img
                  src={`http://localhost:8081${contact.image_url}`}
                  alt={contact.contact_name}
                  style={{ width: '50px', height: '50px', marginRight: '15px', objectFit: 'cover' }}
                />
              )}
            </li>
          ))
        ) : (
          <p>No contacts available</p>
        )}
      </ul>
    </div>
  );
};

export default Contacts;
