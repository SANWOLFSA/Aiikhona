import { useState } from 'react';
import { MessageSquare, ThumbsUp, CheckCircle2, MessageCircle, HelpCircle, Plus, X } from 'lucide-react';
import type { ForumPost, UserProfile } from '../types';

export default function Forum({ 
  posts, 
  currentUser, 
  onAddPost, 
  onAddReply, 
  onToggleLike 
}: { 
  posts: ForumPost[]; 
  currentUser: UserProfile; 
  onAddPost: (post: ForumPost) => void; 
  onAddReply: (postId: string, content: string) => void; 
  onToggleLike: (postId: string) => void; 
}) {
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  
  // New Post Form
  const [newTitle, setNewTitle] = useState("");
  const [newCat, setNewCat] = useState("Gaming Consoles");
  const [newModel, setNewModel] = useState("");
  const [newIssue, setNewIssue] = useState("");
  const [newContent, setNewContent] = useState("");
  
  // New Reply Form
  const [replyContent, setReplyContent] = useState("");

  const categories = ["All", "Gaming Consoles", "Laptops & PCs", "Smartphones", "TVs & Monitors", "Audio & Headphones"];

  const filteredPosts = posts.filter(post => {
    if (category !== "All" && post.deviceCategory !== category) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return post.title.toLowerCase().includes(q) || post.content.toLowerCase().includes(q) || post.deviceModel.toLowerCase().includes(q);
    }
    return true;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const post: ForumPost = {
      id: `post_${Date.now()}`,
      title: newTitle,
      content: newContent,
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        role: currentUser.role
      },
      deviceCategory: newCat,
      deviceModel: newModel || "Universal",
      issueType: newIssue || "General Fault",
      tags: [newCat, newModel].filter(Boolean),
      upvotes: 1,
      repliesCount: 0,
      isSolved: false,
      createdAt: "Just now",
      replies: []
    };

    onAddPost(post);
    setNewTitle("");
    setNewContent("");
    setNewModel("");
    setIsPostModalOpen(false);
  };

  const handleCreateReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent || !selectedPost) return;

    onAddReply(selectedPost.id, replyContent);
    
    // Simulate updating active drawer view
    const updatedPost = {
      ...selectedPost,
      repliesCount: selectedPost.repliesCount + 1,
      replies: [
        ...selectedPost.replies,
        {
          id: `rep_${Date.now()}`,
          author: currentUser.name,
          avatar: currentUser.avatar,
          role: currentUser.role,
          content: replyContent,
          createdAt: "Just now",
          upvotes: 0
        }
      ]
    };
    setSelectedPost(updatedPost);
    setReplyContent("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {!selectedPost ? (
        <>
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-bold">
                <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                <span>Tech Help Bench</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">Community Repair Forum & Colleague Board</h1>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                Stuck on a tricky board or micro-soldering job? Post your diagnostic readings, oscilloscope screen caps, and collaborate with certified master technicians to trace fault lines.
              </p>
            </div>
            <button 
              onClick={() => setIsPostModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black transition-all flex items-center gap-1.5 shadow-sm active:scale-98 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Ask Troubleshooting Question</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
            <input 
              type="text" 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search posts by symptom, model, or IC number..." 
              className="flex-1 min-w-[240px] px-3 py-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-400" 
            />
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setCategory(cat)} 
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${category === cat ? "bg-amber-400 text-stone-950 shadow-xs" : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredPosts.map(post => (
              <div 
                key={post.id} 
                className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${post.isSolved ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300" : "bg-amber-100 dark:bg-amber-950/60 text-amber-850 dark:text-amber-300"}`}>
                      {post.isSolved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <HelpCircle className="w-3.5 h-3.5 text-amber-500" />}
                      <span>{post.isSolved ? "SOLVED" : "OPEN THREAD"}</span>
                    </span>
                    <span className="text-[11px] text-stone-400 font-medium">{post.deviceCategory} • {post.deviceModel}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 leading-snug hover:text-amber-500 transition-colors">{post.title}</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">{post.content}</p>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2.5 py-0.5 rounded-lg border border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 text-stone-500 font-medium">#{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-stone-100 dark:border-stone-800 md:pl-6 shrink-0 flex md:flex-col justify-between md:justify-around gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full border" referrerPolicy="no-referrer" />
                    <div>
                      <span className="font-bold text-stone-800 dark:text-stone-200 block">{post.author.name}</span>
                      <span className="text-[10px] text-stone-400">{post.author.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-stone-500 text-[11px] font-mono">
                    <span className="flex items-center gap-1.5">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.upvotes}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{post.repliesCount} replies</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <button onClick={() => setSelectedPost(null)} className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 font-bold flex items-center gap-1.5 pb-2">
              <X className="w-4 h-4" />
              <span>Back to Forums</span>
            </button>

            <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{selectedPost.deviceCategory} • {selectedPost.deviceModel}</span>
                <span className="text-xs text-stone-400 font-mono">{selectedPost.createdAt}</span>
              </div>
              
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 leading-snug">{selectedPost.title}</h1>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-normal whitespace-pre-wrap">{selectedPost.content}</p>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={selectedPost.author.avatar} alt={selectedPost.author.name} className="w-9 h-9 rounded-full border" referrerPolicy="no-referrer" />
                  <div>
                    <span className="font-bold text-stone-800 dark:text-stone-200 text-xs block">{selectedPost.author.name}</span>
                    <span className="text-[10px] text-stone-400">{selectedPost.author.role}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    onToggleLike(selectedPost.id);
                    setSelectedPost({ ...selectedPost, upvotes: selectedPost.upvotes + 1 });
                  }}
                  className="px-3 py-1.5 rounded-xl border bg-stone-50 dark:bg-stone-800 hover:border-amber-400 text-stone-600 dark:text-stone-300 text-xs font-bold flex items-center gap-1.5"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Upvote ({selectedPost.upvotes})</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black text-stone-400 uppercase tracking-wider">REPLIES ({selectedPost.replies.length})</h3>
              
              <div className="space-y-3">
                {selectedPost.replies.map(reply => (
                  <div key={reply.id} className={`p-5 rounded-2xl border ${reply.isAcceptedAnswer ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60" : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800"} space-y-3`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <img src={reply.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} alt={reply.author} className="w-8 h-8 rounded-full border" referrerPolicy="no-referrer" />
                        <div>
                          <span className="font-bold text-stone-800 dark:text-stone-200 text-xs block">{reply.author}</span>
                          <span className="text-[10px] text-stone-400">{reply.role} • {reply.createdAt}</span>
                        </div>
                      </div>

                      {reply.isAcceptedAnswer && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Accepted Solution</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-wrap">{reply.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleCreateReply} className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 space-y-3">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">Leave Technical Advice / Bench Checkpoint</label>
              <textarea 
                rows={4}
                required
                value={replyContent}
                onChange={e => setReplyContent(e.target.value)}
                placeholder="Give exact multimeter instructions, pin names, thermal expectations..."
                className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800 text-xs focus:ring-2 focus:ring-amber-400"
              />
              <div className="flex justify-end">
                <button type="submit" className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs transition-all shadow-xs">
                  Post Technical Reply
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-xs h-fit space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-400 pb-2 border-b border-stone-100 dark:border-stone-800">Thread Telemetry</h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Device Category:</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">{selectedPost.deviceCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Target Model:</span>
                <span className="font-mono font-bold text-stone-800 dark:text-stone-200">{selectedPost.deviceModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Reported Symptom:</span>
                <span className="font-bold text-stone-850 dark:text-stone-200">{selectedPost.issueType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Resolution Status:</span>
                <span className={`font-bold ${selectedPost.isSolved ? "text-emerald-500" : "text-amber-500"}`}>{selectedPost.isSolved ? "Verified Solved" : "Unresolved Standby"}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <form onSubmit={handleCreatePost} className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-4 shadow-2xl">
            <button type="button" onClick={() => setIsPostModalOpen(false)} className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-black text-stone-900 dark:text-stone-100">Ask the Technical Community</h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Issue Title (Short Summary)</label>
                <input required type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Nintendo Switch M92 Pin 5 shorted, draws 0.01A" className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs focus:ring-2 focus:ring-amber-400" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Device Category</label>
                  <select value={newCat} onChange={e => setNewCat(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs">
                    <option>Gaming Consoles</option>
                    <option>Laptops & PCs</option>
                    <option>Smartphones</option>
                    <option>TVs & Monitors</option>
                    <option>Audio & Headphones</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Specific Model</label>
                  <input type="text" value={newModel} onChange={e => setNewModel(e.target.value)} placeholder="e.g. A1706 Logic Board 820-00840" className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Reported Symptom</label>
                <input type="text" value={newIssue} onChange={e => setNewIssue(e.target.value)} placeholder="e.g. stuck at 5V, power cycling..." className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs" />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">Detailed Diagnostic Observations</label>
                <textarea required rows={5} value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="List all your standby rail voltage measurements, diode mode test point outputs, and parts you have swapped..." className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs" />
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-2">
              <button type="button" onClick={() => setIsPostModalOpen(false)} className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-bold">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black">Publish Thread</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
