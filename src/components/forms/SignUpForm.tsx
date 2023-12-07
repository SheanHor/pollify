"use client";
import React from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmailSignupSchema,
  emailSignupSchema,
} from "@/lib/api/auth/emailSignUp.z";
import { signup } from "@/lib/api/auth";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSignupSchema>({
    resolver: zodResolver(emailSignupSchema),
  });

  const onSubmit: SubmitHandler<EmailSignupSchema> = async (data) => {
    try {
      // console.log("data", data);
      await signup(data.emailAddress, data.password);
    } catch (error) {
      console.log("Fail to Sign Up");
    }
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
        <Button isFull onClick={handleSubmit(onSubmit)}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignUpForm;
