"use client";

import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Progress } from "@/components/ui/progress";
import { HomeIcon, Layers, Power, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

function Sidebar() {
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );
  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/dashboard",
      icon: <HomeIcon />,
    },
    {
      id: 2,
      name: "Explore",
      path: "/dashboard/explore",
      icon: <Layers />,
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <Shield />,
      path: "/dashboard/upgrade",
    },
    {
      id: 4,
      name: "Logout",
      icon: <Power />,
      path: "/dashboard/logout",
    },
  ];

  const path = usePathname();

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image alt="company logo" src="/logo.svg" width={160} height={100} />
      <hr className="my-5" />
      <ul>
        {Menu.map((item, index) => (
          <Link key={index} href={item.path}>
            <div
              className={`flex items-center gap-2 text-gray-600 p-3 mb-2 cursor-pointer rounded-lg hover:bg-gray-100 hover:text-black ${
                path === item.path && "bg-gray-100 text-black"
              }`}
            >
              <div className="text-3xl">{item.icon}</div>
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </ul>

      <div className="absolute bottom-10 w-[80%]">
        <Progress value={(userCourseList?.length / 5) * 100} />
        <h2 className="text-sm my-2">
          {userCourseList?.length} out of 5 course created
        </h2>
        <h2 className="text-xs text-gray-500">
          Upgrade your plan for unlimited course generate
        </h2>
      </div>
    </div>
  );
}

export default Sidebar;
