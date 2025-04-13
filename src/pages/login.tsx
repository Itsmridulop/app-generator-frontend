import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const { register, handleSubmit, reset, watch } = useForm();
  const { login } = useLogin();

  const submitHandler = (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    login(
      { email: data.email, password: data.password },
      {
        onSettled: () => reset(),
      },
    );
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
            placeholder="you@example.com"
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="• • • • • • • •"
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
            placeholder="• • • • • • • •"
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
          <Link to="/signup" className="underline">
            Signup
          </Link>
        </p>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}
