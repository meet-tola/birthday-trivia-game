import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const UserMenu = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const useMenuHandler = () => {
    setOpenUserMenu(!openUserMenu);
  };

  const links = [
    { name: "Stats", path: "/stats" },
    { name: "Leaderboards", path: "/leaderboards" },
  ];

  return (
    <div
      className="text-xl mt-1 cursor-pointer p-2"
      onMouseEnter={() => setOpenUserMenu(true)}
      onMouseLeave={() => setOpenUserMenu(false)}
    >
      <div className="relative">
        <LayoutGrid />
        {openUserMenu && (
          <ul className="absolute bg-primary z-[99] top-7 sm:left-[-60px] left-[-80px] p-3 text-white rounded-md text-center">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                onClick={() => setOpenUserMenu(false)}
              >
                <li className="hover:underline">
                  {link.name}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
