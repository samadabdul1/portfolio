import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';

export default function AuthPage() {
  const [mode, setMode]         = useState('login');
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      if (mode === 'signup') {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        await setDoc(doc(db, 'users', cred.user.uid), { uid: cred.user.uid, displayName: name, email, createdAt: serverTimestamp() });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  async function handleGoogle() {
    try { await signInWithPopup(auth, googleProvider); }
    catch { setError('Google sign-in failed. Use Email/Password on localhost.'); }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#ff385c] grid place-items-center text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
            </div>
            <span className="text-2xl font-bold text-[#ff385c]">Stay</span>
          </div>
          <p className="text-gray-500 text-sm">Discover unique places to stay</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          {error && <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && <input type="text" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff385c]"/>}
            <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff385c]"/>
            <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff385c]"/>
            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-[#ff385c] to-[#e6683c] text-white rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition">
              {loading ? 'Please wait…' : mode === 'login' ? 'Continue' : 'Sign up'}
            </button>
          </form>
          <div className="my-4 flex items-center gap-3"><div className="flex-1 h-px bg-gray-200"/><span className="text-xs text-gray-400">or</span><div className="flex-1 h-px bg-gray-200"/></div>
          <button onClick={handleGoogle} className="w-full py-3 border border-gray-200 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>
        </div>
        <div className="mt-4 text-center bg-white border border-gray-200 rounded-2xl p-4 text-sm">
          {mode === 'login' ? <>New to Stay? <button onClick={()=>setMode('signup')} className="text-[#ff385c] font-semibold hover:underline">Sign up</button></> : <>Already have an account? <button onClick={()=>setMode('login')} className="text-[#ff385c] font-semibold hover:underline">Log in</button></>}
        </div>
      </div>
    </div>
  );
}
