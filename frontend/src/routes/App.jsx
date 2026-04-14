import { useState, useEffect } from "react";
import {
  Bell,
  ChevronDown,
  CircleDollarSign,
  Download,
  Eye,
  EyeOff,
  Home,
  Moon,
  Plus,
  Settings,
  ShoppingCart,
  Utensils,
  Car,
  House,
  User,
  Wallet,
  Receipt,
  X,
  Menu,
  Sun,
  LogOut,
  TrendingUp,
  TrendingDown,
  PieChart as PieIcon,
  BarChart2,
  CheckCircle,
  AlertCircle,
  Trash2,
  Edit2,
  ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
} from "recharts";

/* =========================
   HELPERS
========================= */
const cls = (...v) => v.filter(Boolean).join(" ");
const fmt = (n) =>
  "$" +
  Number(n)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const today = () => new Date().toISOString().split("T")[0];

const STORAGE_KEYS = {
  USERS: "expense_manager_users",
  AUTH: "expense_manager_auth",
  EXPENSES: "expense_manager_expenses",
  DARK: "expense_manager_dark",
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* =========================
   INITIAL DATA
========================= */
const INITIAL_USERS = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@email.com",
    password: "password123",
    avatar: null,
  },
];

const CATEGORIES = [
  { key: "Groceries", color: "#33C27F", icon: ShoppingCart },
  { key: "Rent", color: "#FF9F43", icon: House },
  { key: "Dining", color: "#3B82F6", icon: Utensils },
  { key: "Transport", color: "#F6C453", icon: Car },
  { key: "Shopping", color: "#F06292", icon: Receipt },
  { key: "Other", color: "#A78BFA", icon: Wallet },
];

const INITIAL_EXPENSES = [
  {
    id: 1,
    userId: 1,
    title: "Groceries",
    category: "Groceries",
    date: "2024-04-23",
    amount: 150,
    note: "Weekly grocery shopping",
  },
  {
    id: 2,
    userId: 1,
    title: "Rent",
    category: "Rent",
    date: "2024-04-20",
    amount: 1200,
    note: "Monthly rent",
  },
  {
    id: 3,
    userId: 1,
    title: "Dining Out",
    category: "Dining",
    date: "2024-04-18",
    amount: 45,
    note: "",
  },
  {
    id: 4,
    userId: 1,
    title: "Transportation",
    category: "Transport",
    date: "2024-04-15",
    amount: 60,
    note: "Uber rides",
  },
  {
    id: 5,
    userId: 1,
    title: "Shopping",
    category: "Shopping",
    date: "2024-04-10",
    amount: 95,
    note: "Clothes",
  },
  {
    id: 6,
    userId: 1,
    title: "Groceries",
    category: "Groceries",
    date: "2024-03-28",
    amount: 130,
    note: "",
  },
  {
    id: 7,
    userId: 1,
    title: "Dining Out",
    category: "Dining",
    date: "2024-03-20",
    amount: 55,
    note: "",
  },
  {
    id: 8,
    userId: 1,
    title: "Transport",
    category: "Transport",
    date: "2024-03-15",
    amount: 40,
    note: "",
  },
];

const INITIAL_INCOME = 5000;

const CHART_DATA = [
  { name: "Mar 1", income: 800, expense: 150 },
  { name: "Mar 15", income: 1500, expense: 350 },
  { name: "Apr 1", income: 900, expense: 200 },
  { name: "Apr 16", income: 1200, expense: 500 },
  { name: "Apr 23", income: 700, expense: 120 },
  { name: "May 7", income: 1800, expense: 800 },
  { name: "May 20", income: 2600, expense: 400 },
];

/* =========================
   TOAST
========================= */
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={cls(
        "fixed bottom-6 right-6 z-[999] flex items-center gap-3 rounded-2xl px-5 py-4 shadow-2xl text-white text-[15px] font-semibold transition-all",
        type === "success" ? "bg-emerald-500" : "bg-rose-500",
      )}
    >
      {type === "success" ? (
        <CheckCircle className="h-5 w-5" />
      ) : (
        <AlertCircle className="h-5 w-5" />
      )}
      {msg}
      <button onClick={onClose}>
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

/* =========================
   AUTH PAGE
========================= */
function AuthField({ label, children }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function AuthPage({ onLogin, users, onRegister }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [show, setShow] = useState({ pw: false, cpw: false });
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const resetForm = () => {
    setForm({ name: "", email: "", password: "", confirm: "" });
    setError("");
  };

  const handleLogin = () => {
    const user = users.find(
      (u) => u.email === form.email && u.password === form.password,
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    onLogin(user);
  };

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("All fields are required.");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords don't match.");
      return;
    }

    if (users.some((u) => u.email.toLowerCase() === form.email.toLowerCase())) {
      setError("Email already registered.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      avatar: null,
    };

    onRegister(newUser);
  };

  return (
    <div className="min-h-screen min-w-[1366px] bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-8 py-10 overflow-x-auto">
      <div className="w-[460px]">
        <div className="flex flex-col items-center mb-8">
          <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl mb-4">
            <Wallet className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Expense Manager
          </h1>
          <p className="text-slate-500 mt-1 text-[15px]">
            Track your finances with ease
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.10)] p-8">
          <div className="flex rounded-2xl bg-slate-100 p-1 mb-7">
            {["login", "register"].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  resetForm();
                }}
                className={cls(
                  "flex-1 py-2.5 rounded-xl text-[15px] font-semibold transition-all",
                  mode === m
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-800",
                )}
              >
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-5 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-rose-600 text-[14px] flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            {mode === "register" && (
              <AuthField label="Full Name">
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="John Doe"
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-[15px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </AuthField>
            )}

            <AuthField label="Email Address">
              <input
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                type="email"
                placeholder="you@email.com"
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-[15px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </AuthField>

            <AuthField label="Password">
              <div className="relative">
                <input
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  type={show.pw ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 pr-12 text-[15px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => ({ ...s, pw: !s.pw }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {show.pw ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </AuthField>

            {mode === "register" && (
              <AuthField label="Confirm Password">
                <div className="relative">
                  <input
                    value={form.confirm}
                    onChange={(e) => set("confirm", e.target.value)}
                    type={show.cpw ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 pr-12 text-[15px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => ({ ...s, cpw: !s.cpw }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {show.cpw ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </AuthField>
            )}
          </div>

          <button
            onClick={mode === "login" ? handleLogin : handleRegister}
            className="mt-6 h-12 w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-[16px] font-bold text-white shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:scale-[1.01] transition-all active:scale-[0.99]"
          >
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>

          {mode === "login" && (
            <p className="mt-4 text-center text-[13px] text-slate-500">
              Demo:{" "}
              <span className="font-semibold text-blue-500">
                alex@email.com
              </span>{" "}
              / <span className="font-semibold text-blue-500">password123</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================
   APP SHELL
========================= */
function AppShell({
  activePage,
  setActivePage,
  user,
  onLogout,
  children,
  dark,
  toggleDark,
}) {
  const [notifications, setNotifications] = useState(false);

  const navItems = [
    { key: "home", label: "Home", icon: Home },
    { key: "reports", label: "Reports", icon: BarChart2 },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  const nav = (key) => setActivePage(key);

  return (
    <div
      className={cls(
        "min-h-screen min-w-[1366px] transition-colors duration-300 overflow-x-auto",
        dark ? "bg-slate-900" : "bg-[#eef2f8]",
      )}
    >
      <div className="w-[1366px] min-h-screen mx-auto">
        <div
          className={cls(
            "min-h-screen overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.10)]",
            dark ? "bg-slate-800" : "bg-[#f7f8fc]",
          )}
        >
          <header
            className={cls(
              "h-[86px] flex items-center justify-between px-10 border-b sticky top-0 z-40 backdrop-blur-md",
              dark
                ? "bg-slate-800/90 border-slate-700"
                : "bg-white/85 border-slate-200/70",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md">
                <Wallet className="h-6 w-6" />
              </div>
              <span
                className="text-[20px] font-extrabold tracking-tight"
                style={{ color: dark ? "#fff" : "#0f172a" }}
              >
                Expense Manager
              </span>
            </div>

            <nav className="flex items-center gap-2">
              {navItems.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => nav(key)}
                  className={cls(
                    "flex items-center gap-2 rounded-2xl px-5 py-2.5 text-[15px] font-semibold transition-all",
                    activePage === key
                      ? "bg-blue-500 text-white shadow-md shadow-blue-200"
                      : dark
                        ? "text-slate-300 hover:bg-slate-700"
                        : "text-slate-600 hover:bg-slate-100",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleDark}
                className={cls(
                  "grid h-10 w-10 place-items-center rounded-full transition",
                  dark
                    ? "bg-slate-700 text-yellow-400"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                )}
              >
                {dark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setNotifications((v) => !v)}
                  className={cls(
                    "grid h-10 w-10 place-items-center rounded-full transition relative",
                    dark
                      ? "bg-slate-700 text-slate-300"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                  )}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500" />
                </button>

                {notifications && (
                  <div
                    className={cls(
                      "absolute right-0 top-12 w-72 rounded-2xl shadow-2xl z-50 border p-4",
                      dark
                        ? "bg-slate-800 border-slate-700"
                        : "bg-white border-slate-100",
                    )}
                  >
                    <h4
                      className={cls(
                        "font-bold text-[15px] mb-3",
                        dark ? "text-white" : "text-slate-900",
                      )}
                    >
                      Notifications
                    </h4>
                    {[
                      "Rent due in 3 days",
                      "Monthly budget 80% used",
                      "New expense added",
                    ].map((n, i) => (
                      <div
                        key={i}
                        className={cls(
                          "py-2.5 border-b text-[13px] last:border-b-0",
                          dark
                            ? "border-slate-700 text-slate-300"
                            : "border-slate-100 text-slate-600",
                        )}
                      >
                        🔔 {n}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative group">
                <button className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-blue-500/30 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-[14px]">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <span
                    className={cls(
                      "text-[14px] font-semibold",
                      dark ? "text-white" : "text-slate-800",
                    )}
                  >
                    {user.name.split(" ")[0]}
                  </span>
                </button>

                <div
                  className={cls(
                    "absolute right-0 top-12 w-48 rounded-2xl shadow-2xl z-50 border hidden group-hover:block",
                    dark
                      ? "bg-slate-800 border-slate-700"
                      : "bg-white border-slate-100",
                  )}
                >
                  <div
                    className={cls(
                      "px-4 py-3 border-b text-[13px]",
                      dark
                        ? "border-slate-700 text-slate-300"
                        : "border-slate-100 text-slate-500",
                    )}
                  >
                    {user.email}
                  </div>
                  <button
                    onClick={onLogout}
                    className="flex w-full items-center gap-2 px-4 py-3 text-[14px] text-rose-500 hover:bg-rose-50 rounded-b-2xl transition"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </header>

          <main className="min-h-[calc(100vh-86px)]">{children}</main>
        </div>
      </div>
    </div>
  );
}

/* =========================
   SHARED UI BLOCKS
========================= */
function StatCard({ label, value, gradient, icon: Icon, trend }) {
  return (
    <div
      className={cls(
        "relative overflow-hidden rounded-[20px] p-6 text-white",
        `bg-gradient-to-r ${gradient}`,
      )}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-4 top-3 h-16 w-24 rounded-full bg-white blur-sm" />
        <div className="absolute right-12 bottom-2 h-12 w-28 rounded-full bg-white blur-sm" />
      </div>

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[15px] font-medium text-white/85">{label}</p>
          <p className="mt-1 text-[34px] font-extrabold tracking-tight leading-none">
            {value}
          </p>
          {trend && <p className="mt-2 text-[12px] text-white/70">{trend}</p>}
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 flex-shrink-0">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, right, children, className = "", dark }) {
  return (
    <section
      className={cls(
        "rounded-[22px] p-7",
        dark
          ? "bg-slate-700 shadow-none"
          : "bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]",
        className,
      )}
    >
      {(title || right) && (
        <div className="mb-5 flex items-center justify-between gap-2">
          {title && (
            <h3
              className={cls(
                "text-[22px] font-bold tracking-tight",
                dark ? "text-white" : "text-slate-900",
              )}
            >
              {title}
            </h3>
          )}
          {right}
        </div>
      )}
      {children}
    </section>
  );
}

function ExpenseRow({ item, dark, onDelete, onEdit }) {
  const cat = CATEGORIES.find((c) => c.key === item.category) || CATEGORIES[5];
  const Icon = cat.icon;

  return (
    <div
      className={cls(
        "flex items-center justify-between py-4 border-t first:border-t-0 group",
        dark ? "border-slate-600" : "border-slate-100",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className="grid h-12 w-12 place-items-center rounded-full text-white flex-shrink-0"
          style={{ backgroundColor: cat.color }}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <div
            className={cls(
              "text-[16px] font-bold",
              dark ? "text-white" : "text-slate-900",
            )}
          >
            {item.title}
          </div>
          <div
            className={cls(
              "text-[14px]",
              dark ? "text-slate-400" : "text-slate-400",
            )}
          >
            {item.category} •{" "}
            {new Date(item.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "2-digit",
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={cls(
            "text-[16px] font-bold",
            dark ? "text-white" : "text-slate-900",
          )}
        >
          {fmt(item.amount)}
        </span>

        <div className="hidden group-hover:flex items-center gap-1 ml-2">
          {onEdit && (
            <button
              onClick={() => onEdit(item)}
              className="p-1 text-blue-500 hover:bg-blue-50 rounded-lg"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(item.id)}
              className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
/* =========================
   EXPENSE MODAL
========================= */
function ExpenseModal({ open, onClose, onSave, dark, editing }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Groceries",
    date: today(),
    note: "",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (editing) {
      setForm(editing);
    } else {
      setForm({
        title: "",
        amount: "",
        category: "Groceries",
        date: today(),
        note: "",
      });
    }
  }, [editing, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className={cls(
          "w-[500px] rounded-2xl p-6 shadow-2xl",
          dark ? "bg-slate-800" : "bg-white",
        )}
      >
        <h2
          className={cls(
            "text-xl font-bold mb-4",
            dark ? "text-white" : "text-slate-900",
          )}
        >
          {editing ? "Edit Expense" : "Add Expense"}
        </h2>

        <div className="space-y-3">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className={cls(
              "w-full p-3 border rounded-xl",
              dark
                ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                : "bg-white border-slate-200 text-slate-900",
            )}
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => set("amount", e.target.value)}
            className={cls(
              "w-full p-3 border rounded-xl",
              dark
                ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                : "bg-white border-slate-200 text-slate-900",
            )}
          />

          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className={cls(
              "w-full p-3 border rounded-xl",
              dark
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-white border-slate-200 text-slate-900",
            )}
          >
            {CATEGORIES.map((c) => (
              <option key={c.key}>{c.key}</option>
            ))}
          </select>

          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className={cls(
              "w-full p-3 border rounded-xl",
              dark
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-white border-slate-200 text-slate-900",
            )}
          />

          <textarea
            placeholder="Note"
            value={form.note}
            onChange={(e) => set("note", e.target.value)}
            className={cls(
              "w-full p-3 border rounded-xl",
              dark
                ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                : "bg-white border-slate-200 text-slate-900",
            )}
          />
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className={cls(
              "flex-1 p-3 rounded-xl font-semibold",
              dark
                ? "bg-slate-600 text-white hover:bg-slate-500"
                : "bg-gray-200 text-slate-900 hover:bg-gray-300",
            )}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!form.title || !form.amount) return;
              onSave({ ...form, amount: Number(form.amount) });
              onClose();
            }}
            className="flex-1 p-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   DASHBOARD
========================= */
function DashboardPage({
  expenses,
  income,
  onAddExpense,
  onDeleteExpense,
  onEditExpense,
  dark,
  user,
}) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const totalExp = expenses.reduce((s, e) => s + Number(e.amount), 0);
  const balance = income - totalExp;

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1
          className={cls(
            "text-2xl font-bold",
            dark ? "text-white" : "text-slate-900",
          )}
        >
          Welcome, {user.name.split(" ")[0]}
        </h1>

        <button
          onClick={() => {
            setEditing(null);
            setModal(true);
          }}
          className="bg-blue-500 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-600 transition"
        >
          Add Expense
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Balance"
          value={fmt(balance)}
          gradient="from-green-400 to-green-500"
          icon={Wallet}
        />
        <StatCard
          label="Income"
          value={fmt(income)}
          gradient="from-orange-400 to-orange-500"
          icon={TrendingUp}
        />
        <StatCard
          label="Expenses"
          value={fmt(totalExp)}
          gradient="from-red-400 to-red-500"
          icon={TrendingDown}
        />
      </div>

      {/* LIST */}
      <SectionCard title="Recent Expenses" dark={dark}>
        {expenses.map((e) => (
          <ExpenseRow
            key={e.id}
            item={e}
            dark={dark}
            onDelete={onDeleteExpense}
            onEdit={(item) => {
              setEditing(item);
              setModal(true);
            }}
          />
        ))}
      </SectionCard>

      <ExpenseModal
        open={modal}
        onClose={() => setModal(false)}
        editing={editing}
        dark={dark}
        onSave={(data) => {
          if (editing) onEditExpense({ ...editing, ...data });
          else onAddExpense(data);
        }}
      />
    </div>
  );
}

/* =========================
   REPORTS PAGE
========================= */
function ReportsPage({ expenses, income, dark }) {
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0);

  const pieData = CATEGORIES.map((c) => ({
    name: c.key,
    value: expenses
      .filter((e) => e.category === c.key)
      .reduce((s, e) => s + e.amount, 0),
    color: c.color,
  })).filter((d) => d.value > 0);

  return (
    <div className="p-8">
      <h1
        className={cls(
          "text-2xl font-bold mb-6",
          dark ? "text-white" : "text-slate-900",
        )}
      >
        Reports
      </h1>

      <div className="grid grid-cols-2 gap-6">
        {/* PIE */}
        <SectionCard title="Category Split" dark={dark}>
          <div className="h-[250px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value">
                  {pieData.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* SUMMARY */}
        <SectionCard title="Summary" dark={dark}>
          <p>Income: {fmt(income)}</p>
          <p>Expenses: {fmt(totalExp)}</p>
          <p>Saving: {fmt(income - totalExp)}</p>
        </SectionCard>
      </div>
    </div>
  );
}
/* =========================
   SETTINGS PAGE
========================= */
function SField({ label, children, dark }) {
  return (
    <div>
      <label
        className={cls(
          "block text-[13px] font-semibold mb-1.5",
          dark ? "text-slate-300" : "text-slate-700",
        )}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function SettingsPage({ user, onUpdateUser, dark, toggleDark, onLogout }) {
  const [tab, setTab] = useState("account");
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    newPw: "",
    confirmPw: "",
  });
  const [show, setShow] = useState({ p: false, cp: false });
  const [notifs, setNotifs] = useState({
    rent: true,
    budget: true,
    weekly: false,
    email: true,
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setForm({
      name: user.name,
      email: user.email,
      newPw: "",
      confirmPw: "",
    });
  }, [user]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) {
      setToast({ msg: "Name and email are required.", type: "error" });
      return;
    }

    if (form.newPw && form.newPw !== form.confirmPw) {
      setToast({ msg: "Passwords don't match!", type: "error" });
      return;
    }

    onUpdateUser({
      ...user,
      name: form.name.trim(),
      email: form.email.trim(),
      ...(form.newPw ? { password: form.newPw } : {}),
    });

    setForm((f) => ({ ...f, newPw: "", confirmPw: "" }));
    setToast({ msg: "Settings saved successfully!", type: "success" });
  };

  const tabs = [
    { key: "account", label: "Account Settings", icon: User },
    { key: "notify", label: "Notifications", icon: Bell },
    { key: "appear", label: "Appearance", icon: Moon },
  ];

  return (
    <div className="w-full h-full px-10 py-8">
      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="grid grid-cols-[260px_1fr] gap-8">
        <aside
          className={cls(
            "rounded-[22px] p-6 h-fit",
            dark
              ? "bg-slate-700"
              : "bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]",
          )}
        >
          <h2
            className={cls(
              "text-[28px] font-extrabold mb-6",
              dark ? "text-white" : "text-slate-900",
            )}
          >
            Settings
          </h2>

          <div className="space-y-2">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={cls(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[14px] font-semibold transition",
                  tab === key
                    ? dark
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-600"
                    : dark
                      ? "text-slate-300 hover:bg-slate-600"
                      : "text-slate-500 hover:bg-slate-100",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}

            <button
              onClick={onLogout}
              className={cls(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[14px] font-semibold transition text-rose-500",
                dark ? "hover:bg-slate-600" : "hover:bg-rose-50",
              )}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </aside>

        <div>
          <h1
            className={cls(
              "text-[32px] font-extrabold mb-6",
              dark ? "text-white" : "text-slate-900",
            )}
          >
            {tabs.find((t) => t.key === tab)?.label}
          </h1>

          {tab === "account" && (
            <div
              className={cls(
                "rounded-[22px] p-8",
                dark
                  ? "bg-slate-700"
                  : "bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]",
              )}
            >
              <div
                className="flex items-center gap-5 mb-8 pb-8 border-b"
                style={{ borderColor: dark ? "#475569" : "#f1f5f9" }}
              >
                <div className="relative">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[28px] font-bold overflow-hidden">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-blue-600 text-white ring-2 ring-white flex items-center justify-center">
                    <Edit2 className="h-3 w-3" />
                  </button>
                </div>

                <div>
                  <h3
                    className={cls(
                      "text-[18px] font-bold",
                      dark ? "text-white" : "text-slate-900",
                    )}
                  >
                    {user.name}
                  </h3>
                  <p
                    className={cls(
                      "text-[14px]",
                      dark ? "text-slate-400" : "text-slate-500",
                    )}
                  >
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="space-y-5 max-w-[620px]">
                <SField label="Full Name" dark={dark}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Your full name"
                    className={cls(
                      "h-12 w-full rounded-xl border px-4 text-[15px] outline-none transition",
                      dark
                        ? "bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                        : "bg-white border-slate-200 text-slate-900",
                    )}
                  />
                </SField>

                <SField label="Email Address" dark={dark}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@email.com"
                    className={cls(
                      "h-12 w-full rounded-xl border px-4 text-[15px] outline-none transition",
                      dark
                        ? "bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                        : "bg-white border-slate-200 text-slate-900",
                    )}
                  />
                </SField>

                <SField label="New Password" dark={dark}>
                  <div className="relative">
                    <input
                      type={show.p ? "text" : "password"}
                      value={form.newPw}
                      onChange={(e) => set("newPw", e.target.value)}
                      placeholder="Enter new password"
                      className={cls(
                        "h-12 w-full rounded-xl border px-4 pr-12 text-[15px] outline-none transition",
                        dark
                          ? "bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                          : "bg-white border-slate-200 text-slate-900",
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => ({ ...s, p: !s.p }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {show.p ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </SField>

                <SField label="Confirm Password" dark={dark}>
                  <div className="relative">
                    <input
                      type={show.cp ? "text" : "password"}
                      value={form.confirmPw}
                      onChange={(e) => set("confirmPw", e.target.value)}
                      placeholder="Confirm new password"
                      className={cls(
                        "h-12 w-full rounded-xl border px-4 pr-12 text-[15px] outline-none transition",
                        dark
                          ? "bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                          : "bg-white border-slate-200 text-slate-900",
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => ({ ...s, cp: !s.cp }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {show.cp ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </SField>

                <button
                  onClick={handleSave}
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-[15px] font-bold text-white shadow-lg shadow-blue-200 hover:scale-[1.01] transition mt-2"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {tab === "notify" && (
            <div
              className={cls(
                "rounded-[22px] p-8 space-y-5",
                dark
                  ? "bg-slate-700"
                  : "bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]",
              )}
            >
              {[
                {
                  key: "rent",
                  label: "Rent Due Reminder",
                  desc: "Get notified 3 days before rent is due",
                },
                {
                  key: "budget",
                  label: "Budget Alerts",
                  desc: "Alert when you reach 80% of monthly budget",
                },
                {
                  key: "weekly",
                  label: "Weekly Summary",
                  desc: "Weekly spending summary every Sunday",
                },
                {
                  key: "email",
                  label: "Email Notifications",
                  desc: "Receive notifications via email",
                },
              ].map(({ key, label, desc }) => (
                <div
                  key={key}
                  className={cls(
                    "flex items-center justify-between py-4 border-b last:border-b-0",
                    dark ? "border-slate-600" : "border-slate-100",
                  )}
                >
                  <div>
                    <p
                      className={cls(
                        "text-[15px] font-semibold",
                        dark ? "text-white" : "text-slate-900",
                      )}
                    >
                      {label}
                    </p>
                    <p
                      className={cls(
                        "text-[13px] mt-0.5",
                        dark ? "text-slate-400" : "text-slate-500",
                      )}
                    >
                      {desc}
                    </p>
                  </div>

                  <button
                    onClick={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))}
                    className={cls(
                      "relative h-6 w-11 rounded-full transition-colors",
                      notifs[key]
                        ? "bg-blue-500"
                        : dark
                          ? "bg-slate-600"
                          : "bg-slate-200",
                    )}
                  >
                    <span
                      className={cls(
                        "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                        notifs[key] ? "translate-x-5" : "translate-x-0",
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === "appear" && (
            <div
              className={cls(
                "rounded-[22px] p-8",
                dark
                  ? "bg-slate-700"
                  : "bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]",
              )}
            >
              <div
                className={cls(
                  "flex items-center justify-between py-4 border-b",
                  dark ? "border-slate-600" : "border-slate-100",
                )}
              >
                <div>
                  <p
                    className={cls(
                      "text-[15px] font-semibold",
                      dark ? "text-white" : "text-slate-900",
                    )}
                  >
                    Dark Mode
                  </p>
                  <p
                    className={cls(
                      "text-[13px] mt-0.5",
                      dark ? "text-slate-400" : "text-slate-500",
                    )}
                  >
                    Switch between light and dark theme
                  </p>
                </div>

                <button
                  onClick={toggleDark}
                  className={cls(
                    "relative h-6 w-11 rounded-full transition-colors",
                    dark ? "bg-blue-500" : "bg-slate-200",
                  )}
                >
                  <span
                    className={cls(
                      "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                      dark ? "translate-x-5" : "translate-x-0",
                    )}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================
   ROOT APP
========================= */
export default function App() {
  const [users, setUsers] = useState(() =>
    loadJSON(STORAGE_KEYS.USERS, INITIAL_USERS),
  );
  const [auth, setAuth] = useState(() => loadJSON(STORAGE_KEYS.AUTH, null));
  const [page, setPage] = useState("home");
  const [dark, setDark] = useState(() => loadJSON(STORAGE_KEYS.DARK, false));
  const [expenses, setExpenses] = useState(() =>
    loadJSON(STORAGE_KEYS.EXPENSES, INITIAL_EXPENSES),
  );
  const [income] = useState(INITIAL_INCOME);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.USERS, users);
  }, [users]);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.AUTH, auth);
  }, [auth]);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.EXPENSES, expenses);
  }, [expenses]);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.DARK, dark);
  }, [dark]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
  };

  const handleLogin = (user) => {
    setAuth(user);
    setPage("home");
  };

  const handleRegister = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setAuth(newUser);
    setPage("home");
    showToast("Account created!");
  };

  const handleLogout = () => {
    setAuth(null);
    setPage("home");
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
    );
    setAuth(updatedUser);
    showToast("Profile updated!");
  };

  const handleAddExpense = (form) => {
    if (!auth) return;

    const newExpense = {
      ...form,
      id: Date.now(),
      userId: auth.id,
      amount: Number(form.amount),
    };

    setExpenses((prev) => [newExpense, ...prev]);
    showToast("Expense added!");
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    showToast("Expense deleted!", "error");
  };

  const handleEditExpense = (updated) => {
    setExpenses((prev) =>
      prev.map((e) =>
        e.id === updated.id
          ? { ...updated, amount: Number(updated.amount) }
          : e,
      ),
    );
    showToast("Expense updated!");
  };

  const userExpenses = auth
    ? expenses
        .filter((e) => e.userId === auth.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  if (!auth) {
    return (
      <>
        {toast && (
          <Toast
            msg={toast.msg}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        <AuthPage
          onLogin={handleLogin}
          users={users}
          onRegister={handleRegister}
        />
      </>
    );
  }

  return (
    <>
      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <AppShell
        activePage={page}
        setActivePage={setPage}
        user={auth}
        onLogout={handleLogout}
        dark={dark}
        toggleDark={() => setDark((d) => !d)}
      >
        {page === "home" && (
          <DashboardPage
            expenses={userExpenses}
            income={income}
            onAddExpense={handleAddExpense}
            onDeleteExpense={handleDeleteExpense}
            onEditExpense={handleEditExpense}
            dark={dark}
            user={auth}
          />
        )}

        {page === "reports" && (
          <ReportsPage expenses={userExpenses} income={income} dark={dark} />
        )}

        {page === "settings" && (
          <SettingsPage
            user={auth}
            onUpdateUser={handleUpdateUser}
            dark={dark}
            toggleDark={() => setDark((d) => !d)}
            onLogout={handleLogout}
          />
        )}
      </AppShell>
    </>
  );
}
