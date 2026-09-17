import { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import RepairGuides from './components/RepairGuides';
import GuideDetail from './components/GuideDetail';
import DiagnosticTool from './components/DiagnosticTool';
import CircuitLab from './components/CircuitLab';
import SpareParts from './components/SpareParts';
import Marketplace from './components/Marketplace';
import Courses from './components/Courses';
import Forum from './components/Forum';
import UserProgress from './components/UserProgress';
import AdminDesk from './components/AdminDesk';
import AuthModal from './components/AuthModal';
import LandingPage from './components/LandingPage';
import AiAssistantView from './components/AiAssistantView';
import SettingsView from './components/SettingsView';
import AboutView from './components/AboutView';
import HelpView from './components/HelpView';
import UserDatabaseManager from './components/UserDatabaseManager';
import FileStorageManager from './components/FileStorageManager';
import { storage } from './lib/storage';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { initialGuides, initialParts, initialCourses, initialPosts, initialVerifications } from './data';
import type { UserProfile, Guide, SparePart, Course, ForumPost, VerificationRequest } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => storage.getDarkMode());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => storage.getIsAuthenticated());
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => storage.getUserProfile());
  const [activeTab, setActiveTab] = useState('guides');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [guides, setGuides] = useState<Guide[]>(initialGuides);
  const [parts, setParts] = useState<SparePart[]>(initialParts);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [verifications, setVerifications] = useState<VerificationRequest[]>(() => {
    const saved = storage.getVerificationRequests();
    return saved.length > 0 ? saved : initialVerifications;
  });
  
  const [savedGuideIds, setSavedGuideIds] = useState<string[]>(() => storage.getSavedGuideIds());
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [initialSearchQuery, setInitialSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
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

  const handleVerificationRequest = (request: VerificationRequest) => {
    const newRequests = [request, ...verifications];
    setVerifications(newRequests);
    storage.saveVerificationRequests(newRequests);
  };

  const handleApproveVerification = (id: string) => {
    const request = verifications.find(v => v.id === id);
    const newRequests = verifications.map(v => 
      v.id === id 
        ? { ...v, status: 'Approved (Verified)', reviewerNotes: 'Verified official trading registration papers. Authenticated company.' } 
        : v
    );
    setVerifications(newRequests);
    storage.saveVerificationRequests(newRequests);
    
    if (request) {
      setPosts(prev => prev.map(p => {
        if (p.author.name.toLowerCase().includes(request.companyName.toLowerCase()) || request.companyName.toLowerCase().includes(p.author.name.toLowerCase())) {
          return { ...p, author: { ...p.author, isVerifiedCompany: true } };
        }
        return p;
      }));
      
      setParts(prev => prev.map(p => {
        if (p.supplier.name.toLowerCase().includes(request.companyName.toLowerCase()) || request.companyName.toLowerCase().includes(p.supplier.name.toLowerCase())) {
          return { ...p, supplier: { ...p.supplier, isVerifiedCompany: true } };
        }
        return p;
      }));
    }
  };

  const handleRejectVerification = (id: string, reason: string) => {
    const newRequests = verifications.map(v => 
      v.id === id ? { ...v, status: 'Rejected', reviewerNotes: reason } : v
    );
    setVerifications(newRequests);
    storage.saveVerificationRequests(newRequests);
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

  const pendingVerificationsCount = verifications.filter(v => v.status === 'Pending Review').length;

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
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-200 flex flex-col font-sans antialiased">
      {isOfflineMode && (
        <div className="bg-amber-400 text-stone-950 px-4 py-2 text-xs font-black flex items-center justify-center gap-2 shadow-sm z-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wifi-off"><line x1="2" x2="22" y1="2" y2="22"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 4.17-2.65"/><path d="M10.66 5c4.01-.36 8.14.9 11.34 3.82"/><path d="M16 12.5a5 5 0 0 1 3 4.5"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg>
          <span>OFFLINE BENCH MODE ACTIVE: Browsing {savedGuideIds.length} cached guides from local storage.</span>
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
      />
      
      <Navigation 
        activeTab={activeTab} 
        onSelectTab={(tabId: string) => {
          if (tabId === 'admin' && currentUser?.email !== 'sbheko1@gmail.com' && currentUser?.email !== 'diy.electronicsa@gmail.com') return;
          setActiveTab(tabId);
          setInitialSearchQuery(''); // Clear cross-tab triggers
        }} 
        pendingVerificationsCount={pendingVerificationsCount}
        currentUser={currentUser}
      />
      
      <div className="flex flex-1 min-h-0">
        <Sidebar 
          activeTab={activeTab} 
          onSelectTab={(tabId: string) => {
            if (tabId === 'admin' && currentUser?.email !== 'sbheko1@gmail.com' && currentUser?.email !== 'diy.electronicsa@gmail.com') return;
            if (tabId === 'devices') setActiveTab('guides');
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
          pendingVerificationsCount={pendingVerificationsCount}
        />
        
        <main className="flex-1 w-full pb-16 min-w-0">
          {activeTab === 'guides' && (
            <RepairGuides 
              guides={guides} 
              savedGuideIds={savedGuideIds} 
              onToggleSaveGuide={handleToggleSaveGuide}
              onSelectGuide={(guide) => setSelectedGuide(guide)}
              isOfflineOnly={isOfflineMode}
              onToggleOfflineOnly={() => setIsOfflineMode(!isOfflineMode)}
              initialSearchQuery={searchQuery}
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
              initialSearchQuery={initialSearchQuery || searchQuery} 
              onSelectMarketplace={handleSelectMarketplace}
            />
          )}
          
          {activeTab === 'marketplace' && (
            <Marketplace 
              initialSearchQuery={initialSearchQuery || searchQuery} 
              onRequestVerification={handleVerificationRequest}
              onSelectPartDetail={handleSourcePart}
            />
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
            />
          )}

          {activeTab === 'about' && (
            <AboutView />
          )}

          {activeTab === 'help' && (
            <HelpView />
          )}

          {activeTab === 'progress' && (
            <UserProgress 
              currentUser={currentUser}
              savedGuides={guides.filter(g => savedGuideIds.includes(g.id))}
              onOpenGuide={(g) => setSelectedGuide(g)}
              onRemoveSavedGuide={handleToggleSaveGuide}
              onNavigateToGuides={() => setActiveTab('guides')}
            />
          )}

          {activeTab === 'admin' && (
            <AdminDesk 
              verifications={verifications}
              onApproveVerification={handleApproveVerification}
              onRejectVerification={handleRejectVerification}
            />
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
