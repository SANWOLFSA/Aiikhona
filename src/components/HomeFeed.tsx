import { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2, Image, Send, CheckCircle2, HelpCircle, Sparkles } from 'lucide-react';
import type { ForumPost, UserProfile } from '../types';
import type { ThemeConfig } from '../lib/theme';
import { initialParts } from '../data';

export default function HomeFeed({
  posts,
  currentUser,
  onAddPost,
  onAddReply,
  onToggleLike,
  themeConfig
}: {
  posts: ForumPost[];
  currentUser: UserProfile;
  onAddPost: (post: ForumPost) => void;
  onAddReply: (postId: string, content: string) => void;
  onToggleLike: (postId: string) => void;
  themeConfig?: ThemeConfig;
}) {
  const [newPostText, setNewPostText] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Smartphones');
  const [newModel, setNewModel] = useState('');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle && !newPostText) return;

    const post: ForumPost = {
      id: `fb_post_${Date.now()}`,
      title: newTitle || newPostText.slice(0, 60) + '...',
      content: newPostText || newTitle,
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        role: currentUser.role,
        isVerifiedCompany: currentUser.isVerifiedCompany
      },
      deviceCategory: newCategory,
      deviceModel: newModel || 'Universal',
      issueType: 'General Diagnostic',
      tags: [newCategory, newModel].filter(Boolean),
      upvotes: 1,
      repliesCount: 0,
      isSolved: false,
      createdAt: 'Just now',
      replies: []
    };

    onAddPost(post);
    setNewPostText('');
    setNewTitle('');
    setNewModel('');
    setIsCreateModalOpen(false);
  };

  const handleReplySubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim()) return;
    onAddReply(postId, replyInput);
    setReplyInput('');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Facebook Style Stories / Shortcuts Bar */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {initialParts.slice(0, 5).map((part, i) => (
          <div key={part.id} className="w-28 h-44 rounded-2xl relative overflow-hidden shadow-sm shrink-0 cursor-pointer group">
            <img src={`https://source.unsplash.com/random/300x400?electronics&sig=${i}`} alt={part.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-3">
              <div className="w-7 h-7 rounded-full border-2 border-blue-500 overflow-hidden bg-white">
                <img src={currentUser.avatar} alt="User" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white inline-block mb-1">{part.category}</span>
                <p className="text-white text-xs font-bold leading-tight truncate">{part.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Facebook Style "What's on your mind?" Create Post Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover border" referrerPolicy="no-referrer" />
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex-1 text-left px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-750 transition-colors text-xs font-medium"
          >
            What's on your mind or repair bench today, {currentUser.name.split(' ')[0]}?
          </button>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-1 text-center">
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center gap-2 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors"
          >
            <Image className="w-4 h-4 text-emerald-500" />
            <span>Photo/Video</span>
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center gap-2 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Tag IC / Model</span>
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center gap-2 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-blue-500" />
            <span>Ask Help</span>
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => {
          const isCommenting = activeCommentPostId === post.id;
          return (
            <div key={post.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
              {/* Post Author Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover border" referrerPolicy="no-referrer" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{post.author.name}</span>
                      {post.author.isVerifiedCompany && (
                        <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold">✓</span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <span>{post.createdAt}</span> • <span>{post.deviceCategory}</span> ({post.deviceModel})
                    </p>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${post.isSolved ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'}`}>
                  {post.isSolved ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <HelpCircle className="w-3 h-3 text-amber-500" />}
                  <span>{post.isSolved ? 'SOLVED' : 'ACTIVE'}</span>
                </span>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3 space-y-2">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">{post.title}</h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {post.tags.map((t, idx) => (
                      <span key={idx} className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">#{t}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Likes & Comments Count Bar */}
              <div className="px-4 py-2 border-t border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <ThumbsUp className="w-3 h-3" />
                  </div>
                  <span>{post.upvotes} technician likes</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{post.repliesCount || post.replies.length} comments</span>
                </div>
              </div>

              {/* Action Buttons (Like, Comment, Share) */}
              <div className="px-2 py-1 grid grid-cols-3 gap-1">
                <button 
                  onClick={() => onToggleLike(post.id)}
                  className="flex items-center justify-center gap-2 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4 text-blue-600" />
                  <span>Like</span>
                </button>
                <button 
                  onClick={() => setActiveCommentPostId(isCommenting ? null : post.id)}
                  className="flex items-center justify-center gap-2 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                  <span>Comment</span>
                </button>
                <button 
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="flex items-center justify-center gap-2 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors"
                >
                  <Share2 className="w-4 h-4 text-indigo-500" />
                  <span>Share</span>
                </button>
              </div>

              {/* Comments Section */}
              {isCommenting && (
                <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="space-y-2.5">
                    {post.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start gap-2.5 text-xs">
                        <img src={reply.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} alt={reply.author} className="w-7 h-7 rounded-full object-cover border mt-0.5" referrerPolicy="no-referrer" />
                        <div className="flex-1 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 dark:text-white">{reply.author}</span>
                            <span className="text-[10px] text-slate-400">{reply.createdAt}</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                    {post.replies.length === 0 && (
                      <p className="text-xs text-slate-400 text-center py-2">No technical comments yet. Be the first to advise!</p>
                    )}
                  </div>

                  <form onSubmit={(e) => handleReplySubmit(post.id, e)} className="flex items-center gap-2 pt-2">
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover border" referrerPolicy="no-referrer" />
                    <input 
                      type="text" 
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      placeholder="Write a technical reply or diagnostic tip..."
                      className="flex-1 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Create Post Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <form onSubmit={handlePostSubmit} className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Create Repair & Forum Post</h3>
              <button type="button" onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Post Title / Issue Summary</label>
                <input 
                  type="text" 
                  required
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)} 
                  placeholder="e.g., iPhone 15 Pro Max short on PP_VDD_MAIN" 
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Device Category</label>
                  <select 
                    value={newCategory} 
                    onChange={e => setNewCategory(e.target.value)} 
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100"
                  >
                    <option>Smartphones</option>
                    <option>Gaming Consoles</option>
                    <option>Laptops & PCs</option>
                    <option>TVs & Monitors</option>
                    <option>Audio & Headphones</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Specific Model / IC</label>
                  <input 
                    type="text" 
                    value={newModel} 
                    onChange={e => setNewModel(e.target.value)} 
                    placeholder="e.g. A2849 / PMIC" 
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">What's on your mind / Diagnostic details</label>
                <textarea 
                  rows={4}
                  required
                  value={newPostText}
                  onChange={e => setNewPostText(e.target.value)}
                  placeholder="Describe your boardview readings, thermal camera results, or ask colleagues for advice..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">Cancel</button>
              <button type="submit" className={`px-5 py-2 rounded-xl ${themeConfig?.primaryBg || 'bg-blue-600'} text-white text-xs font-black hover:opacity-90`}>Post to Feed</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
