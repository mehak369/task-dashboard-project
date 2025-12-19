import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegister } from "../api/useAuth";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => navigate("/login")
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-full h-full -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[45%] h-[45%] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[45%] h-[45%] rounded-full bg-blue-900/20 blur-[120px]" />
      </div>

      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-slate-900/40 border border-slate-800 backdrop-blur-2xl p-8 rounded-2xl shadow-2xl space-y-5"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h2>
            <p className="text-slate-400 text-sm">Access your Task Dashboard</p>
          </div>

          <div className="space-y-4">
            {/* Name Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
              <input 
                {...register("name")} 
                placeholder="John Doe" 
                className={`w-full bg-slate-800/40 border ${errors.name ? 'border-red-500/50' : 'border-slate-700'} text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name.message}</p>}
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
              <input 
                {...register("email")} 
                placeholder="john@example.com" 
                className={`w-full bg-slate-800/40 border ${errors.email ? 'border-red-500/50' : 'border-slate-700'} text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600`}
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
                className={`w-full bg-slate-800/40 border ${errors.password ? 'border-red-500/50' : 'border-slate-700'} text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600`}
              />
              {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password.message}</p>}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-center">
              <p className="text-red-400 text-sm font-medium">Registration failed. Try again.</p>
            </div>
          )}

          <button 
            disabled={isPending}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] mt-2"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating account...
              </span>
            ) : "Register"}
          </button>

          <p className="text-center text-slate-400 text-sm pt-2">
            Already registered?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;