import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useSignup } from "../hooks/useSignup";

export default function SignUp() {
  const { register, handleSubmit, reset, watch } = useForm();
  const { signup } = useSignup();

  const submitHandler = async (data: {
    name: string;
    password: string;
    confirmPassword: string;
    email: string;
  }) => {
    try {
      signup(data, {
        onSettled: () => {
          reset();
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please Enter a valid email",
              },
            })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            required
            {...register("phone", {
              required: "This field is required",
              maxLength: 10,
              minLength: 10,
              pattern: {
                value: /^\d+$/,
                message: "Please Enter a valid phone number",
              },
            })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="name"
            required
            {...register("name", {
              required: "This field is required",
            })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
        </div>
        <p>
          You don't already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
