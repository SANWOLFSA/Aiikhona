import { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import PhonesPage from './components/PhonesPage';
import RepairGuides from './components/RepairGuides';
import GuideDetail from './components/GuideDetail';
import DiagnosticTool from './components/DiagnosticTool';
import CircuitLab from './components/CircuitLab';
import SpareParts from './components/SpareParts';
import Marketplace from './components/Marketplace';
import Courses from './components/Courses';
import Forum from './components/Forum';
import UserProgress from './components/UserProgress';
import AuthModal from './components/AuthModal';
import LandingPage from './components/LandingPage';
import AiAssistantView from './components/AiAssistantView';
import BlueprintViewer from './components/BlueprintViewer';
import SettingsView from './components/SettingsView';
import AboutView from './components/AboutView';
import HelpView from './components/HelpView';
import UserDatabaseManager from './components/UserDatabaseManager';
import FileStorageManager from './components/FileStorageManager';
import HomeFeed from './components/HomeFeed';
import DeviceDirectoryView from './components/catalog/LazyDeviceDirectory';
import { usePathname, navigate } from './hooks/usePathname';
import SessionTimeoutWatcher from './components/SessionTimeoutWatcher';
import NotFound from './components/NotFound';
const TheoryHub = lazy(() => import('./components/theory/TheoryHub'));
const MultimeterPage = lazy(() => import('./components/meter/MultimeterPage'));
const AdminDesk = lazy(() => import('./components/AdminDesk'));
const HubRoutes = lazy(() => import('./components/hub/HubRoutes'));
import { useAdminStatus } from './lib/admin';
import { usePendingVerificationsCount } from './lib/marketplace';
import { storage } from './lib/storage';
import { APP_THEMES, DEFAULT_THEME_ID, getNextThemeId } from './lib/theme';
import { auth, db, isFirebaseConfigured } from './lib/firebase';
import { onAuthStateChanged, signOut, type User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initialGuides, initialParts, initialCourses, initialPosts } from './data';
import type { UserProfile, Guide, SparePart, Course, ForumPost } from './types';

const ROUTED_TABS = ['home', 'devices', 'phones', 'blueprint_viewer', '3d_viewer', 'social_annotator', 'guides', 'diagnostic', 'circuit', 'parts', 'marketplace', 'studies', 'theory', 'multimeter', 'forum', 'ai_assistant', 'user_db', 'file_storage', 'settings', 'about', 'help', 'progress', 'admin', 'search', 'device', 'components', 'answers', 'teardowns', 'contributors'];
const TAB_ALIASES: Record<string, string> = { learning: 'studies', electrical_theory: 'theory', exam_room: 'theory' };
function pathForTab(tab: string): string {
  const t = TAB_ALIASES[tab] || tab;
  return t === 'home' ? '/' : `/${t.replace(/_/g, '-')}`;
}
/** Repair hub pages (universal search, device & component pages, Answers, teardowns, guide editor/viewer). */
function isHubPath(pathname: string): boolean {
  return /^\/(search|device|components|answers|teardowns|contributors)(\/|$)/.test(pathname) || /^\/guides\/(new|edit|view)(\/|$)/.test(pathname);
}
const hubFallback = <div className="p-10 text-center text-sm text-slate-500">Loading…</div>;
function tabFromPath(pathname: string): string {
  const seg = (pathname.split('/')[1] || '').replace(/-/g, '_');
  const t = TAB_ALIASES[seg] || seg;
  if (!t) return 'home';
  return ROUTED_TABS.includes(t) ? t : 'not_found';
}

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => storage.getDarkMode());
  const [themeId, setThemeId] = useState<string>(() => storage.getAppTheme());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => storage.getIsAuthenticated());
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => storage.getUserProfile());
  // Main tabs are synced with the URL path (/devices, /guides, /marketplace, ...) so links are shareable
  // and browser back/forward work. Sub-paths (e.g. /devices/tv/samsung/...) belong to the tab's own router.
  const { pathname, search: urlSearch } = usePathname();
  const activeTab = tabFromPath(pathname);
  const isHub = isHubPath(pathname);
  // ?q= deep links (e.g. /marketplace?q=iPhone 13 battery from a device page) prefill the tab's search.
  const urlQ = urlSearch.get('q') || '';
  const setActiveTab = (tab: string) => navigate(pathForTab(tab));
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [guides, setGuides] = useState<Guide[]>(initialGuides);
  const [parts, setParts] = useState<SparePart[]>(initialParts);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  // Admin UI visibility comes from Firebase (claim / admins doc / users.role, or the
  // VITE_ADMIN_EMAILS bootstrap list). Real authority is enforced by the security rules.
  const adminStatus = useAdminStatus();
  const isAdmin = adminStatus.isAdmin;
  const pendingVerificationsCount = usePendingVerificationsCount(isAdmin);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [authChecked, setAuthChecked] = useState<boolean>(!isFirebaseConfigured);
  
  const [savedGuideIds, setSavedGuideIds] = useState<string[]>(() => storage.getSavedGuideIds());
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [initialSearchQuery, setInitialSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentTheme = APP_THEMES[themeId] || APP_THEMES[DEFAULT_THEME_ID];

  const handleCycleTheme = () => {
    const next = getNextThemeId(themeId);
    setThemeId(next);
    storage.setAppTheme(next);
  };

  const handleSelectTheme = (newThemeId: string) => {
    setThemeId(newThemeId);
    storage.setAppTheme(newThemeId);
  };
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    storage.setDarkMode(darkMode);
  }, [darkMode]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      setAuthChecked(true);
      if (firebaseUser) {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const profile = docSnap.data() as UserProfile;
            setCurrentUser(profile);
            setIsAuthenticated(true);
            storage.setIsAuthenticated(true);
            storage.saveUserProfile(profile);
          }
        } catch (error) {
          console.error("Error fetching user profile from Firestore:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Non-admins who land on /admin are sent home once auth + admin checks resolve.
  const adminResolved = authChecked && (!firebaseUser || (adminStatus.uid === firebaseUser.uid && !adminStatus.loading));
  useEffect(() => {
    if (activeTab === 'admin' && adminResolved && !isAdmin) navigate('/', { replace: true });
  }, [activeTab, adminResolved, isAdmin]);

  const handleToggleSaveGuide = (guide: Guide) => {
    const newSavedIds = storage.toggleSaveGuide(guide.id);
    setSavedGuideIds(newSavedIds);
    
    if (newSavedIds.includes(guide.id)) {
      storage.saveGuideOffline(guide);
    } else {
      storage.removeGuideOffline(guide.id);
    }
  };

  const handleCompleteRepair = (eWasteSaved: number) => {
    const updatedUser = {
      ...currentUser,
      repairsCompleted: currentUser.repairsCompleted + 1,
      eWasteDivertedKg: currentUser.eWasteDivertedKg + eWasteSaved,
      co2SavedKg: currentUser.co2SavedKg + (eWasteSaved * 18.5),
      reputationPoints: currentUser.reputationPoints + 50,
    };
    setCurrentUser(updatedUser);
    storage.saveUserProfile(updatedUser);
  };

  const handleSourcePart = (partNumber: string) => {
    setInitialSearchQuery(partNumber);
    setActiveTab('parts');
  };

  const handleSelectMarketplace = (brand: string) => {
    setInitialSearchQuery(brand);
    setActiveTab('marketplace');
  };

  const handleAddPost = (post: ForumPost) => {
    setPosts([post, ...posts]);
  };

  const handleAddReply = (postId: string, content: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const newReply = {
          id: `rep_${Date.now()}`,
          author: currentUser.name,
          avatar: currentUser.avatar,
          role: currentUser.role,
          content,
          createdAt: 'Just now',
          upvotes: 0
        };
        return {
          ...p,
          repliesCount: p.repliesCount + 1,
          replies: [...p.replies, newReply]
        };
      }
      return p;
    }));
  };

  const handleToggleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, upvotes: p.upvotes + 1 };
      }
      return p;
    }));
  };

  const handleCourseComplete = (courseId: string, courseTitle: string) => {
    if (!currentUser.completedCourseIds.includes(courseId)) {
      const updatedUser = {
        ...currentUser,
        completedCourseIds: [...currentUser.completedCourseIds, courseId],
        reputationPoints: currentUser.reputationPoints + 100,
        badges: [
          ...currentUser.badges,
          {
            id: `cert_${Date.now()}`,
            name: `${courseTitle.split(':')[0]} Certified`,
            icon: 'Award',
            description: `Passed comprehensive electrical examination for ${courseTitle}`,
            unlockedAt: new Date().toISOString().split('T')[0]
          }
        ]
      };
      setCurrentUser(updatedUser);
      storage.saveUserProfile(updatedUser);
    }
  };

  const logSearch = async (query: string, resultsCount: number) => {
    try {
      await addDoc(collection(db, 'searchLogs'), {
        query,
        resultsCount,
        timestamp: serverTimestamp(),
        userId: currentUser?.uid || 'anonymous'
      });
    } catch (e) {
      console.error("Error logging search:", e);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Error signing out:", e);
    }
    setIsAuthenticated(false);
    setIsAuthModalOpen(false);
    storage.clearSession();
  };


  if (!isAuthenticated) {
    return (
      <LandingPage 
        darkMode={darkMode} 
        onToggleDarkMode={() => setDarkMode(!darkMode)} 
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
          storage.setIsAuthenticated(true);
          storage.saveUserProfile(user);
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans antialiased">
      {isOfflineMode && (
        <div className="bg-slate-900 text-slate-200 border-b border-slate-800 px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 shadow-xs z-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><line x1="2" x2="22" y1="2" y2="22"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 4.17-2.65"/><path d="M10.66 5c4.01-.36 8.14.9 11.34 3.82"/><path d="M16 12.5a5 5 0 0 1 3 4.5"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg>
          <span className="tracking-wide">OFFLINE VAULT ACTIVE: Accessing {savedGuideIds.length} verified technical manuals cached locally.</span>
        </div>
      )}

      <Header 
        currentUser={currentUser}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        isOfflineMode={isOfflineMode}
        onToggleOfflineMode={() => setIsOfflineMode(!isOfflineMode)}
        savedGuidesCount={savedGuideIds.length}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectTab={setActiveTab}
        activeTab={activeTab}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        themeConfig={currentTheme}
        onCycleTheme={handleCycleTheme}
        logSearch={logSearch}
      />
      
      <Navigation 
        activeTab={activeTab} 
        onSelectTab={(tabId: string) => {
          if (tabId === 'admin' && !isAdmin) return;
          setActiveTab(tabId);
          setInitialSearchQuery(''); // Clear cross-tab triggers
        }} 
        pendingVerificationsCount={pendingVerificationsCount}
        currentUser={currentUser}
        isAdmin={isAdmin}
        themeConfig={currentTheme}
      />
      
      <div className="flex flex-1 min-h-0">
        <Sidebar 
          activeTab={activeTab} 
          onSelectTab={(tabId: string) => {
            if (tabId === 'admin' && !isAdmin) return;
            if (tabId === 'devices') setActiveTab('devices');
            else if (tabId === 'learning') setActiveTab('studies');
            else if (tabId === 'marketplace') setActiveTab('marketplace');
            else if (tabId === 'forum') setActiveTab('forum');
            else if (tabId === 'ai_assistant') setActiveTab('ai_assistant');
            else if (tabId === 'user_db') setActiveTab('user_db');
            else if (tabId === 'file_storage') setActiveTab('file_storage');
            else if (tabId === 'settings') setActiveTab('settings');
            else if (tabId === 'about') setActiveTab('about');
            else if (tabId === 'help') setActiveTab('help');
            else setActiveTab(tabId);
            setInitialSearchQuery('');
          }}
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
          currentUser={currentUser}
          isAdmin={isAdmin}
          pendingVerificationsCount={pendingVerificationsCount}
          themeConfig={currentTheme}
        />
        
        <main className="flex-1 w-full pb-16 min-w-0 max-w-7xl mx-auto">
          {activeTab === 'not_found' && <NotFound onGoHome={() => setActiveTab('home')} />}
          {activeTab === 'home' && (
            <HomeFeed 
              posts={posts} 
              currentUser={currentUser} 
              onAddPost={handleAddPost} 
              onAddReply={handleAddReply} 
              onToggleLike={handleToggleLike} 
              themeConfig={currentTheme} 
              onOpenAuth={() => setIsAuthModalOpen(true)}
              onSelectMarketplace={handleSelectMarketplace}
            />
          )}
          {activeTab === 'devices' && (
            <DeviceDirectoryView 
              savedGuideIds={savedGuideIds} 
              onToggleSaveGuide={handleToggleSaveGuide}
              onSourcePart={handleSourcePart}
              onOpenAuth={() => setIsAuthModalOpen(true)}
            />
          )}
          {activeTab === 'phones' && <PhonesPage themeConfig={currentTheme} onNavigateTo3D={() => setActiveTab('blueprint_viewer')} />}
          {(activeTab === 'blueprint_viewer' || activeTab === '3d_viewer' || activeTab === 'social_annotator') && (
            <BlueprintViewer 
              themeConfig={currentTheme} 
              currentUser={currentUser}
              initialView={activeTab === 'social_annotator' ? 'annotator' : 'boardview'}
              onOpenAuth={() => setIsAuthModalOpen(true)}
            />
          )}
          {isHub && (
            <Suspense fallback={hubFallback}>
              <HubRoutes onOpenAuth={() => setIsAuthModalOpen(true)} />
            </Suspense>
          )}
          {activeTab === 'guides' && !isHub && (
            <Suspense fallback={hubFallback}>
              <HubRoutes onOpenAuth={() => setIsAuthModalOpen(true)} />
            </Suspense>
          )}
          {activeTab === 'guides' && !isHub && (
            <RepairGuides 
              guides={guides} 
              savedGuideIds={savedGuideIds} 
              onToggleSaveGuide={handleToggleSaveGuide}
              onSelectGuide={(guide) => setSelectedGuide(guide)}
              isOfflineOnly={isOfflineMode}
              onToggleOfflineOnly={() => setIsOfflineMode(!isOfflineMode)}
              initialSearchQuery={searchQuery || urlQ}
              onNavigateToDiagnostic={() => setActiveTab('diagnostic')}
              onSourcePart={handleSourcePart}
            />
          )}

          {activeTab === 'diagnostic' && (
            <DiagnosticTool 
              onSourcePart={handleSourcePart} 
              onOpenGuide={(id) => {
                const guide = guides.find(g => g.id === id);
                if (guide) setSelectedGuide(guide);
              }} 
            />
          )}
          
          {activeTab === 'circuit' && <CircuitLab />}
          
          {activeTab === 'parts' && (
            <SpareParts 
              parts={parts} 
              initialSearchQuery={initialSearchQuery || searchQuery || urlQ} 
              onSelectMarketplace={handleSelectMarketplace}
            />
          )}
          
          {activeTab === 'marketplace' && (
            <Marketplace 
              initialSearchQuery={initialSearchQuery || searchQuery || urlQ} 
              onSelectPartDetail={handleSourcePart}
              themeConfig={currentTheme}
              onOpenAuth={() => setIsAuthModalOpen(true)}
            />
          )}

          {activeTab === 'theory' && (
            <Suspense fallback={<div className="p-10 text-center text-sm text-slate-500">Loading Electrical Theory…</div>}>
              <TheoryHub themeConfig={currentTheme} />
            </Suspense>
          )}

          {activeTab === 'multimeter' && (
            <Suspense fallback={<div className="p-10 text-center text-sm text-slate-500">Loading Multimeter Lab…</div>}>
              <MultimeterPage themeConfig={currentTheme} />
            </Suspense>
          )}

          {activeTab === 'studies' && (
            <Courses 
              courses={courses}
              onCourseComplete={handleCourseComplete}
            />
          )}

          {activeTab === 'forum' && (
            <Forum 
              posts={posts}
              currentUser={currentUser}
              onAddPost={handleAddPost}
              onAddReply={handleAddReply}
              onToggleLike={handleToggleLike}
            />
          )}

          {activeTab === 'ai_assistant' && (
            <AiAssistantView />
          )}

          {activeTab === 'user_db' && (
            <UserDatabaseManager currentUser={currentUser} />
          )}

          {activeTab === 'file_storage' && (
            <FileStorageManager currentUser={currentUser} />
          )}

          {activeTab === 'settings' && (
            <SettingsView 
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode(!darkMode)}
              currentUser={currentUser}
              onUpdateUser={(updatedUser) => {
                setCurrentUser(updatedUser);
                storage.saveUserProfile(updatedUser);
              }}
              themeId={themeId}
              onSelectTheme={handleSelectTheme}
              onCycleTheme={handleCycleTheme}
            />
          )}

          {activeTab === 'about' && (
            <AboutView />
          )}

          {activeTab === 'help' && (
            <HelpView onNavigate={setActiveTab} />
          )}

          {activeTab === 'progress' && (
            <UserProgress 
              currentUser={currentUser}
              savedGuides={guides.filter(g => savedGuideIds.includes(g.id))}
              onOpenGuide={(g) => setSelectedGuide(g)}
              onRemoveSavedGuide={handleToggleSaveGuide}
              onNavigateToGuides={() => setActiveTab('guides')}
              onOpenAuth={() => setIsAuthModalOpen(true)}
            />
          )}

          {activeTab === 'admin' && isAdmin && (
            <Suspense fallback={<div className="p-10 text-center text-sm text-slate-500">Loading Admin Desk…</div>}>
              <AdminDesk themeConfig={currentTheme} />
            </Suspense>
          )}
        </main>
      </div>

      {/* Guide Detail Modal */}
      {selectedGuide && (
        <GuideDetail 
          guide={selectedGuide}
          onClose={() => setSelectedGuide(null)}
          onCompleteRepair={handleCompleteRepair}
          onSourcePart={handleSourcePart}
          onToggleSaveGuide={handleToggleSaveGuide}
          isSaved={savedGuideIds.includes(selectedGuide.id)}
        />
      )}

      {/* Ends the session after SESSION_MAX_HOURS (default 5h) */}
      <SessionTimeoutWatcher isAuthenticated={isAuthenticated} onExpired={handleSignOut} />

      {/* General Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
          storage.setIsAuthenticated(true);
          storage.saveUserProfile(user);
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
}
