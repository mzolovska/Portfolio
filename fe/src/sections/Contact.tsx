import { useEffect, useState } from "react";
import { useContactApi, ContactResponseModel } from "../api/useContactApi";
import { AdminControls } from "./AdminControls";
import "./Contact.css";
import Section from "../Section";

const Contact = () => {
  const { fetchAllContacts, updateContact, createContact, deleteContact } = useContactApi();
  const [contacts, setContacts] = useState<ContactResponseModel[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await fetchAllContacts();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleModify = async (updatedContact: ContactResponseModel) => {
    try {
      const updated = await updateContact(updatedContact.contactId, updatedContact);
      setContacts((prev) =>
        prev.map((c) => (c.contactId === updated.contactId ? updated : c))
      );
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleAdd = async (newContact: ContactResponseModel) => {
    try {
      const addedContact = await createContact(newContact);
      setContacts((prev) => [...prev, addedContact]);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.contactId !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="contact-page">
      <Section id="contact" title="Contact">

      {/* Add Contact Form */}
      <AdminControls
        entityType="Contact"
        fields={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "message", label: "Message" },
        ]}
        onAdd={handleAdd}

        onModify={handleModify}
        onDelete={handleDelete}
                isSection
      />

      {/* Contact List */}
      <div className="contact-container">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact.contactId} className="contact-card">
              <strong>{contact.name}</strong> - {contact.email}
              <p>{contact.message}</p>

              {/* Admin Controls for Modify/Delete */}
              <AdminControls
                entity={contact}
                entityType="Contact"
                fields={[
                  { key: "name", label: "Name" },
                  { key: "email", label: "Email" },
                  { key: "message", label: "Message" },
                ]}
                onAdd={handleAdd}

                onModify={handleModify}
                onDelete={handleDelete}
              />
            </div>
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </div>
      </Section>
    </div>
  );
};

export default Contact;
