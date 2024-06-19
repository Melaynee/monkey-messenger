import Modal from "@/components/Modal";
import Button from "@/components/buttons/Button";
import Select from "@/components/inputs/select";
import { useChatUsers } from "@/hooks/useChatUsers";
import useChat from "@/hooks/useChats";
import { useUsers } from "@/hooks/useGetUsers";
import { useAddUserToGroupModalStore } from "@/hooks/useModalStore";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {};

const AddUserToGroupModal = (props: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useChat();
  const { isOpen, onClose } = useAddUserToGroupModalStore();

  const { data: users, isSuccess: isSuccessUsers } = useUsers();
  const { data: chatUsers, isSuccess: isSuccessChatUsers } =
    useChatUsers(chatId);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", members: [] },
  });

  const filteredUsers =
    users?.filter((user: User) => {
      return !chatUsers?.some((cu: User) => cu.id === user.id);
    }) || [];

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post(`/api/chats/${chatId}/add`, { ...data, members })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong..."))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      {isSuccessUsers && isSuccessChatUsers && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="border-b border-dark/30 pb-12">
              <h2 className="font-semibold text-dark">Add user to your chat</h2>
              <div className="mt-10 flex flex-col gap-y-8">
                <Select
                  disabled={isLoading}
                  label="Members"
                  options={
                    filteredUsers.map((user: User) => ({
                      value: user.id,
                      label: user.name,
                    })) || []
                  }
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
              onClick={onClose}
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
      )}
    </Modal>
  );
};

export default AddUserToGroupModal;
