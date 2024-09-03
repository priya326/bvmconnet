import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/admin",
        visible: ["admin", "faculty", "hod"],
      },
      {
        icon: "/teacher.png",
        label: "Faculty Coordinators",
        href: "/list/faculty",
        visible: ["admin", "faculty"],
      },
      {
        icon: "/student.png",
        label: "Clubs",
        href: "/list/clubs",
        visible: ["admin"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "faculty", "hod"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "faculty", "hod"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "faculty", "hod"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "faculty", "hod"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex justify-center items-center gap-4 text-gray-900 py-2 lg:justify-start md:px-2 rounded-md hover:bg-[#effbff]"
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="py-2"
                  ></Image>
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
