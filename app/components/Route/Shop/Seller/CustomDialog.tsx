import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FC } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  component: any;
  setRoute?: (route: string) => void;
  refetch?: any;
  pharmacyInfo:any;
};

const CustomDialog: FC<Props> = ({
  open,
  setOpen,
  component: Component,
  refetch,
  pharmacyInfo,
}) => {
  return (
    <Dialog
     open={open}
     onOpenChange={(isOpen)=> setOpen(isOpen)}
     >
      <DialogContent className="sm:max-w-[500px]">
      <Component setOpen={setOpen} pharmacyInfo={pharmacyInfo} refetch={refetch}/>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
