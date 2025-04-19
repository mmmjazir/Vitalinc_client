"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../Dashboard.module.css";

import {
  BriefcaseMedical,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  Store,
} from "lucide-react";
import React, { type FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "./DashboardSidebarItems";
import { Button } from "@/components/ui/button";

type Props = {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  activeItem?: string;
};

const DashboardSideBar: FC<Props> = ({ isCollapsed, setIsCollapsed }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className={`relative rounded-r-lg shadow-md bg-white h-full flex flex-col`}
    >
      <div className="flex justify-center items-center px-1 py-[0.35rem] border-b mb-3">
        <div
          className={`transition-all duration-300 ease-in-out ${
            isCollapsed ? "w-[5.5rem]" : "w-[7.3rem]"
          }`}
        >
          {/* <Link href="/">
            <img src={isCollapsed ? "/assets/logo.png" : "/assets/vitalinc.png"} alt="Logo" className="w-full" />
          </Link> */}
          <Link href="/">
            <div className="relative w-full h-auto aspect-[6/4]">
              {" "}
              {/* Maintains aspect ratio */}
              <Image
                src={isCollapsed ? "/assets/logo.png" : "/assets/vitalinc.png"}
                alt="Logo"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </Link>
        </div>
      </div>

      <div className="overflow-hidden">
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Shop Profile",
              icon: Store,
              href: "/seller/shop",
              variant: "ghost",
            },
            {
              title: "Add Medicine",
              icon: CirclePlus,
              href: "/seller/add-medicine",
              variant: "ghost",
            },
            {
              title: "Medicine Inventory",
              icon: BriefcaseMedical,
              href: "/seller/medicine-inventory",
              variant: "ghost",
            },
          ]}
        />
      </div>
      {!isMobile && (
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-20 -right-3 rounded-full p-2 shadow-sm !bg-white"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      )}
    </div>
  );
};

export default DashboardSideBar;
