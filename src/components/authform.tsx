"use client";

import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./inputs/input";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "./buttons/Button";
import AuthSocialButton from "./buttons/AuthSocialButton";
import { signIn } from "next-auth/react";

type Props = {};

type Variant = "LOGIN" | "REGISTER";

const AuthForm = (props: Props) => {
  const [variant, setVariant] = React.useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleVariant = React.useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .then(() => toast.success("Register success"))
        .catch((error) => {
          toast.error("Something went wrong");
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in");
        }
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              label="Name"
              register={register}
              id="name"
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            label="Email address"
            type="email"
            register={register}
            id="email"
            errors={errors}
            disabled={isLoading}
          />
          <Input
            label="Password"
            type="password"
            register={register}
            id="password"
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button fullWidth type="submit" disabled={isLoading}>
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-dark/60">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
          <div className="flex gap-2 justify-center text-sm mt-6 px-6 text-dark/60">
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
            <div className="underline cursor-pointer" onClick={toggleVariant}>
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
