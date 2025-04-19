// import { FC } from "react";
// import {Modal,Box} from '@mui/material'

// interface Props {
//     open: boolean;
//     setOpen: (open:boolean) => void;
//     component: any;
//     setRoute?: (route: string) => void;
//     refetch?: any 
// }

// const CustomModal: FC<Props> = ({open,setOpen,setRoute,component:Component,refetch}) => {
//   return (
//     <Modal
//     open={open}
//     onClose={()=> setOpen(false)}
//     aria-labelledby="modal-modal-title"
//     aria-describedby="modal-modal-description"
//     >
//     <Box className='absolute -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] w-full md:w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none'>
//        <Component setOpen={setOpen} setRoute={setRoute} refetch={refetch}/>
//     </Box>
//     </Modal>
//   )
// }

// export default CustomModal



import type { FC } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  component: any
  setRoute?: (route: string) => void
  refetch?: any
}

const CustomModal: FC<Props> = ({ open, setOpen, setRoute, component: Component, refetch }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[95%] md:w-[450px] rounded-[8px] shadow outline-none p-4">
        <Component setOpen={setOpen} setRoute={setRoute} refetch={refetch} />
      </DialogContent>
    </Dialog>
  )
}

export default CustomModal