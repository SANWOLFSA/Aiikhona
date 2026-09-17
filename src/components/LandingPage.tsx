import { useState } from 'react';
import { Cpu, Mail, Lock, User, ArrowRight, Image as ImageIcon, RefreshCw, AlertCircle } from 'lucide-react';
import type { UserProfile } from '../types';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function LandingPage({ 
  onLoginSuccess,
  darkMode,
  onToggleDarkMode
}: { 
  onLoginSuccess: (user: UserProfile) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState<'Technician' | 'Admin'>('Technician');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Hardcoded permanent background image
  const bgImage = "/background.jpg";

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (isSignUp && !name) return;

    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        // Create user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Initialize user profile in Firestore
        const newUserProfile: UserProfile = {
          id: firebaseUser.uid,
          name: name,
          email: email,
          authProvider: "Email Credentials",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
          role: selectedRole,
          repairsCompleted: 0,
          eWasteDivertedKg: 0,
          co2SavedKg: 0,
          reputationPoints: 100,
          badges: [],
          completedCourseIds: [],
          savedGuideIds: [],
          customBackground: bgImage
        };

        const docRef = doc(db, "users", firebaseUser.uid);
        try {
          await setDoc(docRef, newUserProfile);
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, `users/${firebaseUser.uid}`);
        }

        onLoginSuccess(newUserProfile);
      } else {
        // Sign in with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Retrieve user profile from Firestore
        const docRef = doc(db, "users", firebaseUser.uid);
        let userProfile: UserProfile;

        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            userProfile = docSnap.data() as UserProfile;
          } else {
            // Fallback if auth exists but no profile document in database yet
            userProfile = {
              id: firebaseUser.uid,
              name: email.split('@')[0],
              email: email,
              authProvider: "Email Credentials",
              avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
              role: selectedRole,
              repairsCompleted: 0,
              eWasteDivertedKg: 0,
              co2SavedKg: 0,
              reputationPoints: 100,
              badges: [],
              completedCourseIds: [],
              savedGuideIds: [],
              customBackground: bgImage
            };
            await setDoc(docRef, userProfile);
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `users/${firebaseUser.uid}`);
          throw err;
        }

        onLoginSuccess(userProfile);
      }
    } catch (err: any) {
      console.error(err);
      let errMsg = "Authentication failed. Please verify your credentials.";
      if (err.code === "auth/email-already-in-use") {
        errMsg = "This email is already registered.";
      } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        errMsg = "Invalid email or password.";
      } else if (err.code === "auth/weak-password") {
        errMsg = "Password must be at least 6 characters long.";
      } else if (err.code === "auth/invalid-email") {
        errMsg = "Please enter a valid email address.";
      } else if (err.code === "auth/operation-not-allowed") {
        errMsg = "Email/Password sign-in is not enabled in your Firebase project yet. Please go to: Firebase Console > Authentication > Sign-in method, edit 'Email/Password', switch it to Enabled, and click Save.";
      } else if (err.message) {
        errMsg = err.message;
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const firebaseUser = userCredential.user;

      // Retrieve user profile from Firestore
      const docRef = doc(db, "users", firebaseUser.uid);
      let userProfile: UserProfile;

      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          userProfile = docSnap.data() as UserProfile;
        } else {
          // Fallback if auth exists but no profile document in database yet
          userProfile = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "Google User",
            email: firebaseUser.email || "",
            authProvider: "Google SSO",
            avatar: firebaseUser.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
            role: selectedRole,
            repairsCompleted: 0,
            eWasteDivertedKg: 0,
            co2SavedKg: 0,
            reputationPoints: 100,
            badges: [],
            completedCourseIds: [],
            savedGuideIds: [],
            customBackground: bgImage
          };
          await setDoc(docRef, userProfile);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, `users/${firebaseUser.uid}`);
        throw err;
      }

      onLoginSuccess(userProfile);
    } catch (err: any) {
      console.error(err);
      let errMsg = err.message || "Google Authentication failed.";
      if (err.code === 'auth/operation-not-allowed') {
         errMsg = "Google sign-in is not enabled. Go to Firebase Console > Authentication > Sign-in method > Google, switch to Enabled, set a Support email, and click Save.";
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const firebaseUser = userCredential.user;

      // Retrieve user profile from Firestore
      const docRef = doc(db, "users", firebaseUser.uid);
      let userProfile: UserProfile;

      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          userProfile = docSnap.data() as UserProfile;
        } else {
          // Fallback if auth exists but no profile document in database yet
          userProfile = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "Facebook User",
            email: firebaseUser.email || "",
            authProvider: "Facebook SSO",
            avatar: firebaseUser.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
            role: selectedRole,
            repairsCompleted: 0,
            eWasteDivertedKg: 0,
            co2SavedKg: 0,
            reputationPoints: 100,
            badges: [],
            completedCourseIds: [],
            savedGuideIds: [],
            customBackground: bgImage
          };
          await setDoc(docRef, userProfile);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, `users/${firebaseUser.uid}`);
        throw err;
      }

      onLoginSuccess(userProfile);
    } catch (err: any) {
      console.error(err);
      let errMsg = err.message || "Facebook Authentication failed.";
      if (err.code === 'auth/operation-not-allowed') {
         errMsg = "Facebook sign-in is not enabled. Go to Firebase Console > Authentication > Sign-in method > Facebook, switch to Enabled, add your App ID/Secret, and click Save.";
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // Compute background style properties dynamically to prevent excessive zoom and stretching
  const bgStyle: React.CSSProperties = {
    backgroundImage: `url("${bgImage}")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundColor: "#0d0b0a", // Deep matching charcoal background color
    backgroundSize: "cover"
  };

  return (
    <div 
      className="min-h-screen text-stone-900 dark:text-stone-100 flex flex-col justify-between font-sans relative overflow-hidden transition-all duration-300"
      style={bgStyle}
    >
      {/* Extremely light overlay to keep the background bright and fully visible */}
      <div className="absolute inset-0 bg-stone-950/20 dark:bg-stone-950/40 transition-colors duration-200 pointer-events-none" />
      
      {/* Soft background glow details */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 bg-stone-950/40 p-4 md:p-3 rounded-2xl md:bg-transparent backdrop-blur-xs md:backdrop-blur-none">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shadow-xs">
            <Cpu className="w-5 h-5 text-stone-950 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-sm font-black tracking-wider text-white uppercase block leading-none drop-shadow-xs">DIYELECTRONICS</span>
            <span className="text-[9px] font-bold text-amber-400 tracking-widest uppercase block mt-1">Bench OS v2.1</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button 
            onClick={onToggleDarkMode} 
            className="px-3.5 py-2 rounded-xl border border-stone-200/40 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs text-xs font-bold text-stone-900 dark:text-stone-100 hover:opacity-90 transition-all shadow-md"
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-md w-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200/80 dark:border-stone-800/80 p-8 sm:p-10 rounded-[32px] shadow-2xl space-y-6">
          
          {/* Brand header matching uploaded layout format */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shadow-xs">
                <Cpu className="w-5.5 h-5.5 text-stone-950 stroke-[2.2]" />
              </div>
              <span className="text-xl font-black text-stone-900 dark:text-white tracking-tight">DIY Electronics</span>
            </div>
            
            <div className="space-y-1">
              <h1 className="text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100">
                {isSignUp ? "Create Bench Account" : "Welcome Back"}
              </h1>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-normal">
                {isSignUp ? "Register your electronic engineering bench workspace" : "Access your digital operating repair bench"}
              </p>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex flex-col gap-2 text-xs animate-fadeIn">
              <div className="flex items-start gap-2 text-amber-800 dark:text-amber-300">
                <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                <span className="font-bold">Project Access Notice</span>
              </div>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                {error.includes("sign-in is not enabled") 
                  ? "Your Google/Firebase account is in a Starter Tier project with restricted console permissions. To enter your workspace instantly with no setup or console configuration required, click the yellow '⚡ Access as Guest' button below!"
                  : error}
              </p>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button 
                    disabled={loading}
                    type="button"
                    onClick={() => setSelectedRole('Technician')}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${selectedRole === 'Technician' ? 'bg-stone-900 text-white border-stone-900 dark:bg-amber-400 dark:text-stone-950 dark:border-amber-400' : 'bg-stone-50 text-stone-400 border-stone-200 dark:bg-stone-800 dark:border-stone-700'} ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    As Technician
                  </button>
                  <button 
                    disabled={loading}
                    type="button"
                    onClick={() => setSelectedRole('Admin')}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${selectedRole === 'Admin' ? 'bg-stone-900 text-white border-stone-900 dark:bg-amber-400 dark:text-stone-950 dark:border-amber-400' : 'bg-stone-50 text-stone-400 border-stone-200 dark:bg-stone-800 dark:border-stone-700'} ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    As Compliance Admin
                  </button>
                </div>

                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400 dark:text-stone-500" />
                  <input 
                    required
                    disabled={loading}
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Full Name" 
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700/60 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all disabled:opacity-60" 
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400 dark:text-stone-500" />
              <input 
                required
                disabled={loading}
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address" 
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700/60 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all disabled:opacity-60" 
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400 dark:text-stone-500" />
              <input 
                required
                disabled={loading}
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password" 
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700/60 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all disabled:opacity-60" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 px-4 rounded-2xl bg-stone-900 dark:bg-stone-100 hover:opacity-90 text-white dark:text-stone-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>{loading ? "Authenticating..." : (isSignUp ? "Sign Up" : "Sign In")}</span>
              {!loading && <ArrowRight className="w-4 h-4 stroke-[2.5]" />}
            </button>
          </form>

          {/* Social Sign In Divider & Social SSO Buttons */}
          <div className="space-y-4">
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
              <span className="flex-shrink mx-4 text-[10px] text-stone-400 dark:text-stone-500 font-black uppercase tracking-widest">Or Secure Connect With</span>
              <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button 
                type="button"
                disabled={loading}
                onClick={handleGoogleSignIn}
                className="w-full py-3 px-4 rounded-2xl bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-750 active:scale-[0.99] border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-black text-xs transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-60"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.9h6.69c-.29 1.5-.114 2.78-.98 3.69v3.06h6.5c3.81-3.51 6.03-8.68 6.03-14.58z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-6.5-3.06c-.9.6-2.05.96-3.46.96-2.67 0-4.93-1.8-5.74-4.23H2.03v3.31C4.01 22.01 7.75 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.26 14.76a7.12 7.12 0 0 1 0-4.52V6.93H2.03A12.02 12.02 0 0 0 0 12c0 1.87.43 3.64 1.19 5.24l5.07-3.48z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.96 1.19 15.24 0 12 0 7.75 0 4.01 1.99 2.03 5.07l5.07 3.48c.81-2.43 3.07-4.23 5.74-4.23z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button 
                type="button"
                disabled={loading}
                onClick={handleFacebookSignIn}
                className="w-full py-3 px-4 rounded-2xl bg-[#1877F2] hover:bg-[#166FE5] active:scale-[0.99] text-white font-black text-xs transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-60"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Continue with Facebook</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-1">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </button>
          </div>

        </div>
      </main>

      <footer className="border-t border-stone-200/60 dark:border-stone-900 bg-white/20 dark:bg-stone-950/40 relative z-10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400 dark:text-stone-500">
          <span>© 2026 DIY Electronics Operating Platform. Right to Repair.</span>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">E-Waste Compliance</span>
            <span className="hover:underline cursor-pointer">Security Portal API</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
