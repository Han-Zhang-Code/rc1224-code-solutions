import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

export type MenuItem = {
  name: string;
  iconUrl: string;
  path: string;
};

type Props = {
  menuItems: MenuItem[];
};

export function AppDrawer({ menuItems }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div
        className={` text-black transition-all duration-300 ${
          isOpen ? 'w-80' : 'w-35'
        } flex flex-col`}>
        <button
          className="p-6 text-black hover:border-none border-none focus:outline-none "
          onClick={() => setIsOpen(!isOpen)}>
          <FaBars size={24} />
        </button>
        {isOpen && (
          <h1 className="text-black text-2xl p-4 font-bold">Hylian Shopping</h1>
        )}
        <ul className="flex-1">
          {menuItems.map((menu) => (
            <li key={menu.name} className="py-3 px-4">
              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded-md transition ${
                    isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
                  }`
                }>
                <img src={menu.iconUrl} alt={menu.name} className="w-8 h-8" />
                {isOpen && <span className="text-black">{menu.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-grow p-4 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
}
