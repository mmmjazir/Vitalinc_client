// "use client"
// import React from "react"
// import { Menu } from "lucide-react"
// import { Button } from "@/components/ui/button"

// const DashboardHeader = () => {
//   return (
//     <div className="w-full h-[60px] bg-white shadow fixed top-0 left-0 z-30 flex items-center justify-between px-4">

//       <div className="md:hidden block">
//         <Button variant="ghost" size="icon" >
//           <Menu />
//         </Button>
//       </div>

//     </div>
//   )
// }

// export default DashboardHeader

"use client";
import React, { useEffect, useRef, useState } from "react";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGetNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notification/notificationApi";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { LogoutDialog } from "@/app/components/Profile/LogoutDialog";

const DashboardHeader = ({ toggleMobileMenu, isMobile }) => {
  const { data, refetch } = useGetNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();

  const { user } = useSelector((state: any) => state.auth);

  const [notifications, setNotifications] = useState<any>([]);

  const [open, setOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const audio =
    typeof window !== "undefined" &&
    (new Audio(
      "https://res.cloudinary.com/dnxdbbhvq/video/upload/v1714914950/mixkit-long-pop-2358_uxd3f9.wav"
    ) as any);

  const playNotificationSound = () => {
    audio.load();
    if (audio) {
      audio.play();
    }
  };

  useEffect(() => {
    if (data) {
      setNotifications(data.notifications);
    }
    if (isSuccess) {
      refetch();
    }
  }, [data, isSuccess]);

  const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI as string;

  useEffect(() => {
    if (!user?._id) return;
    const socketId = socketIO(ENDPOINT, {
      transports: ["websocket"],
      withCredentials: true,
    });
    socketId.on("connect", () => {
      console.log("Socket connected");
      socketId.emit("joinSellerRoom", user._id);
    });

    socketId.on("newNotification", () => {
      refetch();
      playNotificationSound();
    });
    return () => {
      socketId.disconnect();
    };
  }, [user?._id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        buttonRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus({notificationId:id});
  };

  return (
    <div className="max-md:w-full md:w-[100vw] h-[60px] bg-white shadow fixed top-0 left-0 z-40 flex items-center justify-between px-4">
      {isMobile && (
        <button className="p-1" onClick={toggleMobileMenu}>
          <Menu size={20}/>
        </button>
      )}
      <div className="flex-1 flex justify-end items-center">
       <div className="flex gap-3 items-center">

      
        <div className="relative text-gray-600 rounded-lg cursor-pointer mr-5">
          <Button
            onClick={() => setOpen(!open)}
            variant="outline"
            size="icon"
            ref={buttonRef}
          >
            <Bell className="h-4 w-4" />
          </Button>
          <span className={`absolute font-Outfit -top-2 -right-2 ${notifications.length > 0 ? 'bg-secondary' : 'bg-gray-300' } rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white`}>
            {notifications && notifications.length}
          </span>
        </div>
      <LogoutDialog componentUsed={"DashboardHeader"} open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}  />
 </div>
        {open && (
          <div
            ref={notificationRef}
            className="w-[350px] h-[60vh] overflow-y-scroll custom-scrollbar py-3 px-2 border border-gray-300 bg-gray-50 shadow-xl absolute top-14 z-[1000000000] rounded"
          >
            <h5 className="text-center text-[20px] font-Poppins text-black  p-3">
              Notifications
            </h5>
            {notifications && notifications.length > 0 ? (
              notifications.map((item: any, index: number) => (
                <div
                  className=" bg-[#00000013] rounded-md font-Poppins border-b  border-b-[#0000000f]"
                  key={index}
                >
                  <div className="w-full flex items-center justify-between p-2">
                    <p className="text-black ">{item.title}</p>
                    <p
                      className="text-myPrimary hover:text-primary  cursor-pointer"
                      onClick={() => handleNotificationStatusChange(item._id)}
                    >
                      Mark as read
                    </p>
                  </div>
                  <p className="px-2 text-sm text-gray-600 ">{item.message}</p>
                  <p className="p-2 text-black text-[13px]">
                    {format(item.createdAt)}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-[calc(60vh-80px)]">
                <p className="text-black text-center font-Poppins">
                  No notifications at the moment.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
