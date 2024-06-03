import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { User } from "@prisma/client";
import Button from "../buttons/Button";

type Props = {
  className?: string;
  user: User;
};

const ProfileForm = (props: Props) => {
  return (
    <form className={cn("grid items-start gap-4", props.className)}>
      <div className="grid gap-2">
        <Label htmlFor="firstname">First Name</Label>
        <Input id="firstname" defaultValue={props.user.name ?? ""} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="lastname">Last Name</Label>
        <Input id="lastname" defaultValue="" />
      </div>
      <Button type="submit">Add contact</Button>
    </form>
  );
};

export default ProfileForm;
