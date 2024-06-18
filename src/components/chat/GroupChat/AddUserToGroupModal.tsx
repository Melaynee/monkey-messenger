import getUsers from "@/actions/getUsers";
import Modal from "@/components/Modal";
import Button from "@/components/buttons/Button";
import Select from "@/components/inputs/select";
import useChat from "@/hooks/useChats";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddUserToGroupModal = (props: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[] | []>([]);
  const { chatId } = useChat();

  const {
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
      .post(`/api/chats/${chatId}/add`, { ...data, members })
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
            <h2 className="font-semibold text-dark">Add user to your chat</h2>
            <div className="mt-10 flex flex-col gap-y-8">
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
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
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUserToGroupModal;
