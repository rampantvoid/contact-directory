import { useEffect, useState } from 'react';

interface Contact {
  name: string;
  number: string;
}

const App = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newName, setNewName] = useState<string>('');
  const [newNumber, setNewNumber] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = () => {
    if (newName && newNumber) {
      const isDuplicate = contacts.some(
        (contact) => contact.name === newName && contact.number === newNumber
      );

      if (!isDuplicate) {
        setContacts([...contacts, { name: newName, number: newNumber }]);
        setNewName('');
        setNewNumber('');
      } else {
        alert('Contact already exists!');
      }
    }
  };

  const handleDeleteContact = (index: number) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  const handleEditContact = (
    index: number,
    field: 'name' | 'number',
    value: string
  ) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };

  const handleSearchContacts = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.number.includes(searchTerm)
  );

  return (
    <div className='bg-black min-h-screen flex flex-col items-center justify-center'>
      <h2 className='text-white text-3xl font-bold mb-6'>Contact Directory</h2>
      <div className='flex mb-4 w-1/2'>
        <input
          type='text'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder='Enter Name'
          className='px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none w-full'
        />
        <input
          type='text'
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          placeholder='Enter Phone Number'
          className='px-4 py-2 border border-gray-300 focus:outline-none w-full'
        />
        <button
          onClick={handleAddContact}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md w-full'
        >
          Add Contact
        </button>
      </div>
      <input
        type='text'
        value={searchTerm}
        onChange={handleSearchContacts}
        placeholder='Search Contacts'
        className='px-4 py-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2  w-1/2'
      />
      <ul className='w-1/2'>
        {filteredContacts.map((contact, index) => (
          <li
            key={index}
            className='flex justify-between items-center bg-white p-4 mb-2 rounded-md shadow-md'
          >
            <input
              type='text'
              value={contact.name}
              onChange={(e) => handleEditContact(index, 'name', e.target.value)}
              className='px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='text'
              value={contact.number}
              onChange={(e) =>
                handleEditContact(index, 'number', e.target.value)
              }
              className='px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              onClick={() => handleDeleteContact(index)}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md ml-2'
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
