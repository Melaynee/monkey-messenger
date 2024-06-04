import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/input";
import Select from "../inputs/select";
import Button from "../buttons/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
};

const GroupChatModal = (props: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", members: [] },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/chats", { ...data, isGroup: true })
      .then(() => {
        router.refresh();
        props.onClose();
      })
      .catch(() => toast.error("Something went wrong..."))
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal onClose={props.onClose} isOpen={props.isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-dark/30 pb-12">
            <h2 className="font-semibold text-dark">Create a group chat</h2>
            <p className="mt-1 text-sm text-dark font-light">
              Create a chat with more than 2 people.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                label="Name"
                id="name"
                disabled={isLoading}
                required
                errors={errors}
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={props.users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value: any) =>
                  setValue("members", value, { shouldValidate: true })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            onClick={props.onClose}
            type="button"
            secondary
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
