import { createContext, useContext, useState } from 'react';

const PersonsContext = createContext(null);

export const PersonsProvider = ({ children }) => {
    const [persons, setPersons] = useState([]);

    const loadPersons = (persons) => setPersons(persons);

    const emptyPersons = () => setPersons([]);

    return (
        <PersonsContext.Provider value={{ persons, loadPersons, emptyPersons }}>
            {children}
        </PersonsContext.Provider>
    );
};

export const usePersons = () => useContext(PersonsContext);
