"use client";
import React from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  EmailLoginSchema,
  emailLoginSchema,
} from "@/lib/api/auth/emailLogIn.z";
import { zodResolver } from "@hookform/resolvers/zod";
import { googleLogin, login } from "@/lib/api/auth";
import { FcGoogle } from "react-icons/fc";

const LogInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailLoginSchema>({
    resolver: zodResolver(emailLoginSchema),
  });

  const onSubmit: SubmitHandler<EmailLoginSchema> = async (data) => {
    try {
      await login(data.emailAddress, data.password);
    } catch (error) {
      console.log("Fail to Log in");
    }
  };

  // function handle google login/signup (if account existed, login , else signup)
  const handleGoogleLogin = async () => {
    await googleLogin();
  };

  return (
    <div className="w-[250px]">
      {/* Email Input */}
      <div className="my-5">
        <Input label="Email" {...register("emailAddress")} />
        {errors.emailAddress && (
          <p className="pt-1 text-sm text-red-800 font-medium">
            {errors.emailAddress?.message}
          </p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <Input type="password" label="Password" {...register("password")} />
        {errors.password && (
          <p className="pt-1 text-sm text-red-800 font-medium">
            {errors.password?.message}
          </p>
        )}
      </div>

      {/* Button */}
      <div className="mt-5">
        <Button size="small" isFull onClick={handleSubmit(onSubmit)}>
          Log in
        </Button>
      </div>

      {/* Google Login */}
      <Button
        variant="secondary"
        size="medium"
        className="w-[250px] mt-4"
        onClick={handleGoogleLogin}
      >
        <FcGoogle />
        <p className="text-sm font-medium">Continue with Google</p>
      </Button>
    </div>
  );
};

export default LogInForm;
