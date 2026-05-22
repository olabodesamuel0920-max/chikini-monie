"use client";

import { useState, useEffect } from "react";
import { Lock, ArrowRight, Info, ShieldAlert, KeyRound, LayoutDashboard, ChefHat, BarChart3, Bike, RefreshCw, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InternalAccessGateProps {
  children: React.ReactNode;
  dashboardName: string;
}

type PreviewRole = "Staff" | "Kitchen" | "Manager" | "Rider";

export default function InternalAccessGate({ children, dashboardName }: InternalAccessGateProps) {
  const [hasAccess, setHasAccess] = useState(false);
  const [selectedRole, setSelectedRole] = useState<PreviewRole | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const access = sessionStorage.getItem("chikini_internal_access");
    const role = sessionStorage.getItem("chikini_preview_role") as PreviewRole | null;
    
    if (access === "true") {
      setIsVerified(true);
      setHasAccess(true);
      if (role) {
        setSelectedRole(role);
      }
    }
    setIsLoading(false);
  }, []);

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const expectedCode = process.env.NEXT_PUBLIC_INTERNAL_PREVIEW_CODE || "CHIKINI-DEMO";
    
    if (!enteredCode.trim()) {
      setError("Please enter the preview access code.");
      return;
    }

    if (enteredCode.trim().toUpperCase() === expectedCode.trim().toUpperCase()) {
      sessionStorage.setItem("chikini_internal_access", "true");
      setIsVerified(true);
      setHasAccess(true);
    } else {
      setError("Incorrect preview access code. Please verify the code and try again.");
    }
  };

  const handleSelectRole = (role: PreviewRole) => {
    setSelectedRole(role);
    sessionStorage.setItem("chikini_preview_role", role);
  };

  const handleClearAccess = () => {
    sessionStorage.removeItem("chikini_internal_access");
    sessionStorage.removeItem("chikini_preview_role");
    setHasAccess(false);
    setIsVerified(false);
    setSelectedRole(null);
    setEnteredCode("");
    setError(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-gray-500 font-black uppercase tracking-widest">
        Verifying Staging Access...
      </div>
    );
  }

  // Define roles metadata
  const rolesList: { type: PreviewRole; label: string; desc: string; icon: typeof LayoutDashboard }[] = [
    { type: "Staff", label: "Staff Panel", desc: "Manage digital orders stream", icon: LayoutDashboard },
    { type: "Kitchen", label: "Kitchen Display", desc: "Segregated food prep pipeline", icon: ChefHat },
    { type: "Rider", label: "Rider Logistics", desc: "Mock delivery & dispatch simulation", icon: Bike },
    { type: "Manager", label: "Manager Suite", desc: "Aggregated business metrics", icon: BarChart3 },
  ];

  return (
    <AnimatePresence mode="wait">
      {!isVerified ? (
        // Step 1: Code Verification Page
        <motion.div
          key="verification-gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-[#050505] flex items-center justify-center p-6 pt-28 pb-16 font-body"
        >
          <div className="max-w-md w-full glass p-8 md:p-12 rounded-[3rem] border border-white/10 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <KeyRound className="w-40 h-40" />
            </div>

            <div className="w-16 h-16 bg-primary/20 rounded-3xl flex items-center justify-center text-primary mx-auto mb-8 border border-primary/30">
              <Lock className="w-8 h-8" />
            </div>

            <h2 className="text-3xl font-black italic gold-text mb-2 uppercase tracking-tight font-heading">
              Business Review Access
            </h2>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-6">
              Staging Operational Panels Gate
            </p>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              The <span className="text-white font-bold">{dashboardName}</span> is reserved for internal staff, riders, and manager review. Please enter the preview access code to enter.
            </p>

            <form onSubmit={handleVerifyCode} className="space-y-6 text-left">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">
                  Preview Access Code
                </label>
                <input
                  type="text"
                  placeholder="Enter code (e.g., CHIKINI-DEMO)"
                  value={enteredCode}
                  onChange={(e) => {
                    setEnteredCode(e.target.value);
                    if (error) setError(null);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-center font-bold tracking-widest focus:outline-none focus:border-primary transition-all uppercase placeholder:normal-case placeholder:tracking-normal"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400 text-xs font-medium"
                >
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full premium-gradient py-5 rounded-2xl text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 cursor-pointer"
              >
                Verify Credentials
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-8 bg-white/5 border border-white/10 p-5 rounded-2xl flex items-start gap-3 text-left">
              <Info className="text-accent w-5 h-5 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[10px] text-accent uppercase tracking-wider font-bold">
                  Staging Safety Disclaimer
                </p>
                <p className="text-[10px] text-gray-500 leading-normal font-medium">
                  This is preview access control for business review only. Production staff accounts, secure login, permissions, and audit logs require final production setup.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : !selectedRole ? (
        // Step 2: Role Selection Page
        <motion.div
          key="role-selection-gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-[#050505] flex items-center justify-center p-6 pt-28 pb-16 font-body"
        >
          <div className="max-w-2xl w-full glass p-8 md:p-12 rounded-[3.5rem] border border-white/10 text-center shadow-2xl relative overflow-hidden">
            <h2 className="text-3xl font-black italic gold-text mb-2 uppercase tracking-tight font-heading">
              Select Preview Role
            </h2>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-8">
              Simulation Role Configurator
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {rolesList.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.type}
                    onClick={() => handleSelectRole(role.type)}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 text-left hover:bg-white/10 hover:border-primary/50 hover:scale-[1.02] active:scale-95 transition-all group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-all shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-bold uppercase tracking-wider">
                        {role.label}
                      </h4>
                      <p className="text-gray-500 text-xs mt-0.5 leading-normal">
                        {role.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 bg-white/5 border border-white/10 p-5 rounded-2xl flex items-start gap-3 text-left max-w-lg mx-auto">
              <Info className="text-gray-500 w-5 h-5 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                  Reviewer Notice
                </p>
                <p className="text-[10px] text-gray-500 leading-normal font-medium">
                  Selecting a role presets interface elements. This is for demonstration filtering and review simulation only, not real authentication.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button 
                onClick={handleClearAccess}
                className="text-[11px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-2 hover:text-red-300 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Cancel Access Verification
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        // Step 3: Main Dashboard Content
        <motion.div
          key="authenticated-dashboard-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Custom Operation Banner */}
          <div className="bg-primary/10 border-b border-primary/20 py-2 px-6 flex flex-col sm:flex-row items-center justify-between fixed top-16 left-0 right-0 z-[45] backdrop-blur-md gap-2 sm:gap-4 font-body">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
              Preview Access Mode • Business Review Only • Role: {selectedRole}
            </p>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSelectedRole(null)}
                className="text-[9px] bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10 font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3 h-3" /> Change Role
              </button>
              <button 
                onClick={handleClearAccess}
                className="text-[9px] bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest transition-all cursor-pointer"
              >
                Clear Preview Access
              </button>
            </div>
          </div>
          <div className="pt-8">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
