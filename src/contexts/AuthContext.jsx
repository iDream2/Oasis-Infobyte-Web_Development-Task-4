import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const register = (username, password) => {
    // In a real app, you would send a request to the backend here.
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      alert('User already exists');
    } else {
      // Add new user to the list
      const newUser = { username, password };
      setUsers([...users, newUser]);
      setUser(newUser);
    }
  };

  const login = (username, password) => {
    // In a real app, you would verify the credentials with the backend here.
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setUser(user);
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
