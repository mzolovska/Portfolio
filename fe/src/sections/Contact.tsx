import { useEffect, useState } from "react";
import { useContactApi, ContactResponseModel } from '../api/useContactApi';

const Contact = () => {
  const { fetchAllContacts } = useContactApi();
  const [contacts, setContacts] = useState<ContactResponseModel[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await fetchAllContacts();
      setContacts(data);
    };

    fetchContacts();
  }, []);

  return (
    <div>
      <h2>Contacts</h2>
      {contacts.length > 0 ? (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.contactId}>
              <strong>{contact.name}</strong> - {contact.email}
              <p>{contact.message}</p>
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
