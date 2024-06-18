"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../buttons/Button";
import { useSettingsModalStore } from "@/hooks/useModalStore";

type Props = { currentUser: User };

const SettingsModal = (props: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useSettingsModalStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: props.currentUser?.name,
      image: props.currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result.info?.secure_url, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong..."))
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b border-dark/30 pb-12">
          <h2 className="text-dark font-semibold tracking-wider">Profile</h2>
          <p className="text-dark font-light text-sm">
            Edit your public information here
          </p>
          <div className="flex flex-col mt-12">
            <Input
              disabled={isLoading}
              label="Name"
              id="name"
              errors={errors}
              required
              register={register}
            />
            <div className="pt-12">
              <p className="block text-sm font-medium leading-6 text-dark">
                Photo
              </p>
              <div className="mt-2 flex items-center gap-x-3">
                <Image
                  src={image || props.currentUser?.image || "/img/avatar.jpeg"}
                  alt="avatar"
                  className="rounded-full"
                  width={48}
                  height={48}
                />
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onSuccess={handleUpload}
                  uploadPreset="xomlbhyy"
                >
                  <Button disabled={isLoading} secondary type="button">
                    Change
                  </Button>
                </CldUploadButton>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            type="button"
            secondary
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
