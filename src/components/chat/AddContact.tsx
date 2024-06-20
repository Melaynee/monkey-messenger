import { User } from "@prisma/client";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import Button from "../buttons/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import useMediaQuery from "@custom-react-hooks/use-media-query";
import ProfileForm from "./ProfileForm";
import { useAddContactModalStore } from "@/hooks/useModalStore";

type Props = {
  data?: User;
};

const AddContact = (props: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { isOpen, onClose } = useAddContactModalStore();
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-hover">Add contact</DialogTitle>
            <DialogDescription>
              Email will be <span className="font-semibold">visible</span> once{" "}
              <span className="font-semibold italic">{props.data?.name}</span>{" "}
              adds you as a contact.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm user={props.data!} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-hover">Add contact</DrawerTitle>
          <DrawerDescription>
            Email will be <span className="font-semibold">visible</span> once{" "}
            <span className="font-semibold italic">{props.data?.name}</span>{" "}
            adds you as a contact.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm user={props.data!} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button type="button" fullWidth onClick={onClose}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddContact;
