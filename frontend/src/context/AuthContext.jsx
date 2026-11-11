
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "canteen_users";
const CURRENT_KEY = "canteen_current_user";

const defaultAdmin = {
  id: "admin-001",
  name: "Canteen Admin",
  email: "admin@canteenpro.com",
  password: "Admin@123",
  role: "admin",
};

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

      if (!saved.some((u) => u.email === defaultAdmin.email)) {
        saved.unshift(defaultAdmin);
      }

      return saved;
    } catch {
      return [defaultAdmin];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CURRENT_KEY) || "null");
    } catch {
      return null;
    }
  });

  // Save users
  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  // Save current user
  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_KEY);
    }
  }, [user]);

  // Register
  const register = ({ name, email, password }) => {
    const normalized = email.trim().toLowerCase();

    if (users.some((u) => u.email === normalized)) {
      return {
        success: false,
        message: "This email is already registered.",
      };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalized,
      password,
      role: "user",
    };

    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);

    return { success: true, user: newUser };
  };

  // Login
  const login = (email, password) => {
    const found = users.find(
      (u) =>
        u.email === email.trim().toLowerCase() &&
        u.password === password
    );

    if (!found) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    setUser(found);

    return { success: true, user: found };
  };

  // Logout
  const logout = () => {
    setUser(null);
  };

  // Update Profile
  const updateProfile = (updates) => {
    if (!user) return;

    const updated = { ...user, ...updates };

    setUser(updated);

    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? updated : u))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        setUsers,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return value;
};
