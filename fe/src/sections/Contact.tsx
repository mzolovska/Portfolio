import { useEffect, useState } from "react";
import { useContactApi, ContactResponseModel } from "../api/useContactApi";
import { AdminControls } from "./AdminControls";
import "./Contact.css";


const Contact = () => {
  const { fetchAllContacts, updateContact, createContact, deleteContact } = useContactApi();
  const [contacts, setContacts] = useState<ContactResponseModel[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await fetchAllContacts();
      setContacts(data);
    };

    fetchContacts();
  }, []);

  const handleModify = async (updatedContact: ContactResponseModel) => {
    await updateContact(updatedContact.contactId, updatedContact);
    setContacts((prev) => prev.map((c) => (c.contactId === updatedContact.contactId ? updatedContact : c)));
  };

  const handleAdd = async (newContact: ContactResponseModel) => {
    const addedContact = await createContact(newContact);
    setContacts((prev) => [...prev, addedContact]);
  };

  const handleDelete = async (id: string) => {
    await deleteContact(id);
    setContacts((prev) => prev.filter((c) => c.contactId !== id));
  };

  return (
    <div>
      <h2>Contacts</h2>
      <AdminControls
        entityType="Contact"
        fields={[{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "message", label: "Message" }]}
        onModify={handleModify}
        onAdd={handleAdd}
        onDelete={handleDelete}
        isSection={true}
      />
      {contacts.length > 0 ? (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.contactId}>
              <strong>{contact.name}</strong> - {contact.email}
              <p>{contact.message}</p>
              <AdminControls
                entity={contact}
                entityType="Contact"
                fields={[{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "message", label: "Message" }]}
                onModify={handleModify}
                onAdd={handleAdd}
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No contacts found.</p>
      )}
    </div>
  );
};

export default Contact;
