import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "../api/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { socket } from "../lib/socket";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (formData: FormData) => {
    mutate(formData, {
      onSuccess: (data) => {
        socket.emit("join", data.user.id);
        navigate("/dashboard");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
      </div>

      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-slate-900/50 border border-slate-800 backdrop-blur-xl p-8 rounded-2xl shadow-2xl space-y-6"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
            <p className="text-slate-400 text-sm">Enter your credentials to access your tasks</p>
          </div>

          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
              <input 
                {...register("email")} 
                placeholder="name@example.com" 
                className={`w-full bg-slate-800/50 border ${errors.email ? 'border-red-500' : 'border-slate-700'} text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className={`w-full bg-slate-800/50 border ${errors.password ? 'border-red-500' : 'border-slate-700'} text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
              />
              {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password.message}</p>}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-lg text-center">
              <p className="text-red-400 text-sm font-medium">Invalid email or password</p>
            </div>
          )}

          <button 
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Logging in...
              </span>
            ) : "Login"}
          </button>

          <p className="text-center text-slate-400 text-sm pt-2">
            New user?{" "}
            <Link to="/" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;