// Wishes
// Less code (checked)
// Better valiation (checked)
// Better Erros(set, clear, display)
// Have full control over inputs
// Don't deal with events (checked)
// Eaiser Inputs (checked)

import { useForm } from "react-hook-form";
import { FieldError } from "react-hook-form/dist/types";

interface LoginForm {
  username: string;
  password: string;
  email: string;
  errors?: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
    reset,
    resetField,
  } = useForm<LoginForm>({ mode: "onChange" });
  const onValid = (data: LoginForm) => {
    console.log("I'm valid");
    // setError("errors", {message:"backend is offline sorry"})
    //fetch()같은거 하고 난 다음에
    // setError("username", {message:"Taken username"})
    // reset(); // 다 리셋하게
    resetField("password"); //password 필드만 리셋하게
  };
  const onInvalid = (errors: FieldError) => {
    // console.log(errors)
  };
  // console.log(errors)
  // console.log(watch("email")) //하나 필드만 볼 수 있음. arg없으면 전체 봄.
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("username", {
          required: "username is required",
          minLength: {
            message: "The username should be longer than 5 chars",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      {errors.username?.message}
      <input
        {...register("email", {
          required: "email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email) ? "bg-red-500" : ""}`}
      />
      {errors.email?.message}
      <input
        {...register("password", {
          required: "password is required",
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
      {errors.errors?.message}
    </form>
  );
}
