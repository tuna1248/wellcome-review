import React, { useState, useEffect } from 'react';
import { 
  Globe,
  Star, 
  ThumbsUp, 
  MessageCircle,
  Share2,
  MoreHorizontal,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  AlertCircle,
  BrainCircuit,
  Loader2,
  Search,
  Tag,
  Flag,
  Copy,
  BarChart3,
  TrendingUp,
  Users,
  StickyNote,
  Stethoscope,
  Key,
  X
} from 'lucide-react';
import { socialMediaGraphService } from '../services/graphApi';

// Fallback AI response
const generateAIResponse = async (prompt: string, role: string, context: string) => {
  return "Thank you for your feedback. We appreciate your interaction!";
};

export interface Review {
  id: string;
  author: string;
  patientType: 'Verified Patient' | 'Guest' | 'Anonymous';
  rating: number; 
  source: 'Facebook' | 'Meta' | string;
  date: string;
  content: string;
  commentImage?: string;
  status: 'Replied' | 'Pending' | 'Escalated' | 'Flagged';
  reply?: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  topics: string[]; 
  internalNotes?: string[]; 
  likes?: number;
  postText?: string;
  postLink?: string;
  postImage?: string;
  postMetrics?: { likes: number, comments: number, shares?: number };
  accountName?: string;
  procedure?: string;
}

const ReputationView: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Replied' | 'Negative'>('All');
  const [filterSource, setFilterSource] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [internalNoteText, setInternalNoteText] = useState('');
  const [addingNoteTo, setAddingNoteTo] = useState<string | null>(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  
  // Facebook/Meta API State
  const [metaToken, setMetaToken] = useState('');
  const [syncError, setSyncError] = useState<string | null>(null);
  
  const [selectedPost, setSelectedPost] = useState<Review | null>(null);

  // Parse token from URL and auto-sync
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');
    
    if (tokenFromUrl) {
      setMetaToken(tokenFromUrl);
      performSync(tokenFromUrl);
    }
  }, []);

  const averageRating = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '0.0';
  const totalReviews = reviews.length;
  const pendingCount = reviews.filter(r => r.status === 'Pending').length;
  const npsScore = reviews.length > 0 ? 72 : 0; // Using a static or calculated value depending on real logic

  const filteredReviews = reviews.filter(r => {
    const matchesStatus = filterStatus === 'All' ? true : 
                          filterStatus === 'Negative' ? r.rating <= 3 : 
                          r.status === filterStatus;
    const matchesSource = filterSource === 'All' ? true : r.source === filterSource;
    const contentStr = r.content || '';
    const authorStr = r.author || '';
    const matchesSearch = contentStr.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          authorStr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSource && matchesSearch;
  });

  const handleReply = (id: string) => {
    if (!replyText.trim()) return;
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'Replied', reply: replyText } : r));
    setReplyingTo(null);
    setReplyText('');
  };

  const handleAddInternalNote = (id: string) => {
    if (!internalNoteText.trim()) return;
    setReviews(prev => prev.map(r => r.id === id ? { ...r, internalNotes: [...(r.internalNotes || []), internalNoteText] } : r));
    setAddingNoteTo(null);
    setInternalNoteText('');
  };

  const handleGenerateAIResponse = async (review: Review) => {
    setIsGenerating(true);
    setReplyText(''); 
    const prompt = `Write a professional response to a patient review. Review: "${review.content}". Rating: ${review.rating}/5. Context: Dental Clinic. Tone: Empathetic. Max 50 words.`;
    
    try {
      const response = await generateAIResponse(prompt, 'Manager', 'Reputation');
      setReplyText(response.replace(/"/g, ''));
    } catch {
      setReplyText("Thank you for your feedback.");
    } finally {
      setIsGenerating(false);
    }
  };

  const performSync = async (tokenToUse: string) => {
    if (!tokenToUse.trim()) {
      setSyncError("Lütfen Meta Token'ı girin.");
      return;
    }
    setSyncError(null);
    setIsSyncing(true);
    
    try {
      const fetchedComments = await socialMediaGraphService.fetchAllCommentsAsReviews(tokenToUse);
      
      setReviews(prev => {
        const existingIds = new Set(prev.map(r => r.id));
        const newComments = fetchedComments.filter(c => !existingIds.has(c.id));
        return [...newComments, ...prev];
      });
      setHasMore(socialMediaGraphService.hasMoreComments());
    } catch (err: any) {
      setSyncError(err.message || "Meta yorumları çekilirken hata oluştu.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLoadMore = async () => {
    if (!metaToken.trim() || !hasMore) return;
    
    setSyncError(null);
    setIsLoadingMore(true);
    
    try {
      const fetchedComments = await socialMediaGraphService.loadMoreCommentsAsReviews(metaToken);
      
      setReviews(prev => {
        const existingIds = new Set(prev.map(r => r.id));
        const newComments = fetchedComments.filter(c => !existingIds.has(c.id));
        return [...prev, ...newComments];
      });
      setHasMore(socialMediaGraphService.hasMoreComments());
    } catch (err: any) {
      setSyncError(err.message || "Daha fazla yorum çekilirken hata oluştu.");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSync = async () => {
    await performSync(metaToken);
  };

  const getSourceIcon = (source: string) => {
    switch(source) {
      case 'Facebook': return <Users size={14} className="text-indigo-500" />;
      case 'Instagram': return <CheckCircle2 size={14} className="text-pink-600" />;
      default: return <MessageCircle size={14} className="text-slate-500" />;
    }
  };

  // Dynamic source breakdown based on reviews
  const fbCount = reviews.filter(r => r.source === 'Facebook').length;
  const igCount = reviews.filter(r => r.source === 'Instagram').length;

  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
        
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          <div className="mb-2">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              Reputation Command Center
            </h2>
            <p className="text-slate-500 text-sm mt-1">Monitor sentiment, manage reviews, and analyze patient feedback across all channels.</p>
          </div>
        </div>
        {syncError && <div className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl border border-red-100 shadow-sm">{syncError}</div>}


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           
           <div className="lg:col-span-8 space-y-4">
              
              <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-2">
                 <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                    {['All', 'Pending', 'Replied', 'Negative'].map(status => (
                       <button
                          key={status}
                          onClick={() => setFilterStatus(status as any)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                             filterStatus === status 
                             ? 'bg-slate-800 text-white shadow-sm' 
                             : 'text-slate-500 hover:bg-slate-50'
                          }`}
                       >
                          {status}
                       </button>
                    ))}
                    <div className="w-px h-6 bg-slate-200 mx-1"></div>
                    {['Facebook', 'Instagram'].map(src => (
                       <button
                          key={src}
                          onClick={() => setFilterSource(src === filterSource ? 'All' : src)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                             filterSource === src 
                             ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                             : 'text-slate-500 hover:bg-slate-50'
                          }`}
                       >
                          {getSourceIcon(src)} {src}
                       </button>
                    ))}
                 </div>
                 
                 <div className="relative w-full md:w-48">
                    <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                    <input 
                       type="text" 
                       placeholder="Search reviews..." 
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                 </div>
              </div>

               <div className="space-y-4">
                  {isSyncing ? (
                     Array.from({length: 3}).map((_, idx) => (
                        <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 animate-pulse">
                           <div className="flex items-start gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                              <div className="flex-1">
                                 <div className="h-4 bg-slate-200 rounded w-1/4 mb-2"></div>
                                 <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                              </div>
                           </div>
                           <div className="pl-[52px] space-y-2 mt-4">
                              <div className="h-3 bg-slate-200 rounded w-full"></div>
                              <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                              <div className="h-3 bg-slate-200 rounded w-4/6"></div>
                           </div>
                        </div>
                     ))
                  ) : filteredReviews.map(review => (
                    <div key={review.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-emerald-200 transition-all group">
                       <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">
                                {review.author.charAt(0)}
                             </div>
                             <div>
                                <div className="flex items-center gap-2">
                                   <h4 className="font-bold text-slate-800 text-sm">{review.author}</h4>
                                   {review.patientType === 'Verified Patient' && (
                                      <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-100 font-bold flex items-center gap-0.5">
                                         <CheckCircle2 size={8}/> Verified
                                      </span>
                                   )}
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                   <div className="flex text-amber-400">
                                      {Array.from({length: 5}).map((_, i) => (
                                         <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-slate-200" : ""} />
                                      ))}
                                   </div>
                                   <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                     • {review.date} on {getSourceIcon(review.source)} <span className="font-medium text-slate-600">{review.source}</span>
                                     {review.accountName && <span className="ml-1 px-1.5 py-0.5 bg-slate-100 rounded text-slate-500 font-bold">{review.accountName}</span>}
                                   </span>
                                </div>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                             {review.status === 'Escalated' && (
                                <span className="text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded font-bold border border-red-100 flex items-center gap-1">
                                   <Flag size={10}/> Escalated
                                </span>
                             )}
                             <button className="text-slate-300 hover:text-slate-600 p-1"><MoreHorizontal size={16}/></button>
                          </div>
                       </div>

                        <div className="pl-[52px]">
                           {review.content && <p className="text-sm text-slate-700 leading-relaxed mb-3">"{review.content}"</p>}
                           {review.commentImage && (
                              <div className="mb-3">
                                 <img src={review.commentImage} alt="Comment Attachment" className="max-w-[150px] rounded-lg border border-slate-200" />
                              </div>
                           )}
                           
                           <div className="flex flex-wrap gap-2 mb-4">
                             {review.postText && (
                                <button onClick={() => setSelectedPost(review)} className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200 flex items-center gap-1 hover:bg-slate-200 transition-colors">
                                   <MessageCircle size={10}/> Post: {review.postText.length > 25 ? review.postText.substring(0, 25) + '...' : review.postText}
                                </button>
                             )}
                             {review.procedure && (
                                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200 flex items-center gap-1">
                                   <Stethoscope size={10}/> {review.procedure}
                                </span>
                             )}
                             {review.topics.map(topic => (
                                <span key={topic} className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100 flex items-center gap-1">
                                   <Tag size={10}/> {topic}
                                </span>
                             ))}
                          </div>

                          {review.internalNotes && review.internalNotes.length > 0 && (
                             <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 mb-3 text-xs">
                                <div className="flex items-center gap-1 text-amber-800 font-bold mb-1">
                                   <StickyNote size={10}/> Internal Team Notes
                                </div>
                                <ul className="list-disc list-inside text-amber-700 space-y-1">
                                   {review.internalNotes.map((note, idx) => (
                                      <li key={idx}>{note}</li>
                                   ))}
                                </ul>
                             </div>
                          )}

                          {review.reply ? (
                             <div className="bg-slate-50 p-3 rounded-lg border-l-2 border-emerald-500">
                                <div className="flex justify-between items-center mb-1">
                                   <p className="text-xs font-bold text-slate-700">Response from Clinic</p>
                                   <button className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1">
                                      <Copy size={10}/> Copy
                                   </button>
                                </div>
                                <p className="text-xs text-slate-600 italic">{review.reply}</p>
                             </div>
                          ) : (
                             <div className="flex items-center gap-2">
                                {replyingTo === review.id ? (
                                   <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-200 animate-in fade-in">
                                      <div className="flex justify-between items-center mb-2">
                                         <span className="text-xs font-bold text-slate-500">Drafting Reply...</span>
                                         <button 
                                            onClick={() => handleGenerateAIResponse(review)}
                                            disabled={isGenerating}
                                            className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:text-emerald-700 bg-white px-2 py-1 rounded border border-emerald-100 shadow-sm"
                                         >
                                            {isGenerating ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12}/>}
                                            {isGenerating ? 'Drafting...' : 'AI Suggestion'}
                                         </button>
                                      </div>
                                      <textarea
                                         autoFocus
                                         className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm mb-2 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                                         placeholder="Write your response here..."
                                         rows={3}
                                         value={replyText}
                                         onChange={(e) => setReplyText(e.target.value)}
                                      />
                                      <div className="flex gap-2 justify-end">
                                         <button onClick={() => setReplyingTo(null)} className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-200 rounded-lg">Cancel</button>
                                         <button onClick={() => handleReply(review.id)} className="px-3 py-1.5 text-xs font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Post Reply</button>
                                      </div>
                                   </div>
                                ) : addingNoteTo === review.id ? (
                                   <div className="flex-1 bg-amber-50 p-3 rounded-lg border border-amber-200 animate-in fade-in">
                                      <span className="text-xs font-bold text-amber-800 mb-2 block">Add Internal Note (Team Only)</span>
                                      <input 
                                         autoFocus
                                         type="text" 
                                         className="w-full p-2 bg-white border border-amber-200 rounded-lg text-sm mb-2 focus:ring-2 focus:ring-amber-500 outline-none"
                                         placeholder="e.g. Discussed with Dr. Scott..."
                                         value={internalNoteText}
                                         onChange={(e) => setInternalNoteText(e.target.value)}
                                         onKeyDown={(e) => e.key === 'Enter' && handleAddInternalNote(review.id)}
                                      />
                                      <div className="flex gap-2 justify-end">
                                         <button onClick={() => setAddingNoteTo(null)} className="px-3 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-100 rounded-lg">Cancel</button>
                                         <button onClick={() => handleAddInternalNote(review.id)} className="px-3 py-1.5 text-xs font-bold bg-amber-600 text-white rounded-lg hover:bg-amber-700">Save Note</button>
                                      </div>
                                   </div>
                                ) : (
                                   <>
                                      <button 
                                         onClick={() => setReplyingTo(review.id)}
                                         className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
                                      >
                                         <MessageCircle size={14} /> Reply
                                      </button>
                                      <button 
                                         onClick={() => setAddingNoteTo(review.id)}
                                         className="px-3 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
                                      >
                                         <StickyNote size={14} /> Note
                                      </button>
                                      <button className="px-3 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors">
                                         <Share2 size={14} />
                                      </button>
                                   </>
                                )}
                             </div>
                          )}
                       </div>
                    </div>
                 ))}
                 
                 {!isSyncing && filteredReviews.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                       <Users size={48} className="mx-auto mb-4 text-slate-200" />
                       <p className="text-slate-500 font-medium">No reviews found. Try syncing Meta data.</p>
                       <button onClick={() => { setFilterStatus('All'); setFilterSource('All'); setSearchQuery(''); }} className="mt-2 text-emerald-600 text-sm font-bold hover:underline">Clear Filters</button>
                    </div>
                 )}

                 {hasMore && filteredReviews.length > 0 && (
                    <div className="flex justify-center mt-6">
                       <button 
                          onClick={handleLoadMore}
                          disabled={isLoadingMore}
                          className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
                       >
                          {isLoadingMore ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                          {isLoadingMore ? 'Yükleniyor...' : 'Daha Fazla Yükle'}
                       </button>
                    </div>
                 )}
              </div>
           </div>

           <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <BarChart3 size={18} className="text-blue-500"/> Source Breakdown
                 </h3>
                 <div className="space-y-4">
                    {[
                       { label: 'Facebook', count: fbCount, rating: 5.0, icon: Users, color: 'text-indigo-500' },
                       { label: 'Instagram', count: igCount, rating: 5.0, icon: CheckCircle2, color: 'text-pink-600' },
                    ].map(src => (
                       <div 
                          key={src.label} 
                          className="flex items-center justify-between"
                       >
                          <div className="flex items-center gap-3">
                             <src.icon size={16} className={src.color} />
                             <span className="text-sm font-medium text-slate-700">{src.label}</span>
                          </div>
                          <div className="flex items-center gap-3">
                             <span className="text-xs text-slate-400">{src.count} reviews</span>
                             <div className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                                <Star size={10} className="text-amber-400 fill-amber-400" />
                                <span className="text-xs font-bold text-slate-700">{src.rating}</span>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles size={100} /></div>
                 <h3 className="font-bold text-lg mb-2 relative z-10">Engage Followers</h3>
                 <p className="text-slate-300 text-xs mb-4 relative z-10 leading-relaxed">
                    Automatically reply to your latest 5 social media comments with AI suggestions.
                 </p>
                 <button className="w-full bg-white text-slate-900 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors relative z-10">
                    Auto-Reply
                 </button>
              </div>

            </div>
        </div>
      </div>

      {selectedPost && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedPost(null)}></div>
            <div className="bg-white rounded-2xl w-full max-w-md relative z-10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                     {selectedPost.source === 'Instagram' ? <CheckCircle2 size={16} className="text-pink-600"/> : <Users size={16} className="text-indigo-500"/>}
                     Post Details
                  </h3>
                  <button onClick={() => setSelectedPost(null)} className="text-slate-400 hover:text-slate-600 p-1 bg-white rounded-full border border-slate-200 shadow-sm transition-colors">
                     <X size={16}/>
                  </button>
               </div>
               <div className="p-5 max-h-[70vh] overflow-y-auto">
                  {selectedPost.postImage && (
                     <div className="w-full h-48 rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-200 shadow-sm">
                        <img src={selectedPost.postImage} alt="Post" className="w-full h-full object-cover" />
                     </div>
                  )}
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedPost.postText}</p>
                  
                  {selectedPost.postMetrics && (
                     <div className="flex flex-wrap gap-4 mt-5 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2">
                           <ThumbsUp size={16} className="text-blue-500"/>
                           <span className="font-bold text-slate-700">{selectedPost.postMetrics.likes}</span>
                           <span className="text-xs text-slate-500">Likes</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <MessageCircle size={16} className="text-emerald-500"/>
                           <span className="font-bold text-slate-700">{selectedPost.postMetrics.comments}</span>
                           <span className="text-xs text-slate-500">Comments</span>
                        </div>
                        {selectedPost.postMetrics.shares !== undefined && (
                           <div className="flex items-center gap-2">
                              <Share2 size={16} className="text-purple-500"/>
                              <span className="font-bold text-slate-700">{selectedPost.postMetrics.shares}</span>
                              <span className="text-xs text-slate-500">Shares</span>
                           </div>
                        )}
                     </div>
                  )}
               </div>
               <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                  <a 
                     href={selectedPost.postLink} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-sm"
                  >
                     <Globe size={14}/> View Original Post
                  </a>
               </div>
            </div>
         </div>
      )}
    </>
  );
};

export default ReputationView;
