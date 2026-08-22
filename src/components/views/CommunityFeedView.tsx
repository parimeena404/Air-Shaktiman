'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import {
  Users,
  Heart,
  MessageSquare,
  Share2,
  Plus,
  MapPin,
  Sparkles,
  Camera,
  Recycle,
  Trophy,
  Lightbulb,
  Hammer,
  AlertCircle,
  Utensils,
  X,
  ArrowRight,
} from 'lucide-react';

export const CommunityFeedView: React.FC = () => {
  const { socialPosts, toggleLikePost, addPostComment, createSocialPost, setActiveTab } = useEco();

  // Create Post Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postImageUrl, setPostImageUrl] = useState('');
  const [postType, setPostType] = useState<'Photo' | 'Contribution' | 'Achievement' | 'Idea' | 'Project' | 'Local Issue' | 'Food Rescue'>('Contribution');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [feedFilter, setFeedFilter] = useState<'For You' | 'Nearby' | 'Following' | 'Trending'>('For You');

  const postTypeIcons = {
    Photo: Camera,
    Contribution: Recycle,
    Achievement: Trophy,
    Idea: Lightbulb,
    Project: Hammer,
    'Local Issue': AlertCircle,
    'Food Rescue': Utensils,
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPostImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    createSocialPost({
      content: postContent,
      postType,
      imageUrl: postImageUrl || undefined,
      impactBadge: postType === 'Contribution' ? '8 kg Plastic Diverted' : 'Sustainability Action',
    });

    setShowCreateModal(false);
    setPostContent('');
    setPostImageUrl('');
  };

  const handleSendComment = (postId: string) => {
    if (!commentInput.trim()) return;
    addPostComment(postId, commentInput);
    setCommentInput('');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="bg-[#0D0F17] border-2 border-[#03E5B7] rounded-xl p-6 space-y-2 shadow-2xl glow-teal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#03E5B7]/20 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-mono font-black mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>SUSTAINABILITY SOCIAL NETWORK // CAMPUS FEED</span>
          </div>
          <h1 className="text-3xl font-black text-white font-mono tracking-wide">Community Action Feed</h1>
          <p className="text-xs text-slate-300 font-mono font-bold">
            See environmental actions, discoveries, projects, & achievements shared by fellow contestants.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-3 rounded-lg bg-[#FF007A] text-white text-xs font-black font-mono glow-pink flex items-center gap-2 hover:bg-[#FF007A]/90 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>CREATE POST (+50 PTS)</span>
        </button>
      </div>

      {/* Feed Filters Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#0D0F17] border border-slate-800">
        {(['For You', 'Nearby', 'Following', 'Trending'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFeedFilter(tab)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              feedFilter === tab
                ? 'bg-[#03E5B7] text-slate-950 font-bold shadow-md shadow-[#03E5B7]/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CREATE POST INPUT BAR CARD */}
      <div
        onClick={() => setShowCreateModal(true)}
        className="bg-squid-card border border-slate-800 rounded-2xl p-4 cursor-pointer hover:border-[#FF007A]/50 transition-colors flex items-center gap-3"
      >
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
          alt="User"
          className="w-10 h-10 rounded-full object-cover ring-2 ring-[#03E5B7]"
        />
        <div className="flex-1 text-xs text-slate-500 bg-[#07080E] border border-slate-800 rounded-xl px-4 py-2.5">
          Share something you've done, discovered or want to change...
        </div>
      </div>

      {/* SOCIAL FEED POSTS */}
      <div className="space-y-6">
        {socialPosts.map((post) => {
          const IconComp = postTypeIcons[post.postType] || Recycle;
          const isCommentsOpen = activeCommentPostId === post.id;

          return (
            <div key={post.id} className="bg-squid-card border border-slate-800 rounded-2xl p-6 space-y-4">
              {/* Post Author Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={post.authorAvatar} alt={post.authorName} className="w-10 h-10 rounded-full object-cover ring-2 ring-[#03E5B7]" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">{post.authorName}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#03E5B7]/15 text-[#03E5B7] font-mono font-bold">
                        {post.authorBadge}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#FF007A]" />
                      <span>{post.locationTag}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300">
                  <IconComp className="w-3.5 h-3.5 text-[#03E5B7]" />
                  <span>{post.postType}</span>
                </div>
              </div>

              {/* Post Text Content */}
              <p className="text-xs text-slate-200 leading-relaxed">{post.content}</p>

              {/* Optional Post Image (Full Uncropped Display) */}
              {post.imageUrl && (
                <div className="rounded-xl overflow-hidden border border-[#1D2133] bg-[#07080E]">
                  <img
                    src={post.imageUrl}
                    alt="Post Attachment"
                    className="w-full h-auto object-contain max-h-[850px] mx-auto rounded-xl"
                  />
                </div>
              )}

              {/* Impact Badge Bar */}
              {post.impactBadge && (
                <div className="p-3 rounded-xl bg-[#07080E] border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#03E5B7] font-bold">🌱 Impact: {post.impactBadge}</span>
                  {post.pointsEarned && (
                    <span className="text-[#FFC700] font-extrabold">+{post.pointsEarned} Eco Points</span>
                  )}
                </div>
              )}

              {/* Partner Link trigger */}
              {post.partnerLink && (
                <button
                  onClick={() => setActiveTab('redeem-rewards')}
                  className="w-full py-2 rounded-xl bg-[#FFC700]/10 border border-[#FFC700]/30 text-[#FFC700] text-xs font-bold font-mono hover:bg-[#FFC700]/20 flex items-center justify-center gap-1.5"
                >
                  <span>View {post.partnerLink.partnerName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Interaction Actions Bar */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => toggleLikePost(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      post.isLiked ? 'text-[#FF007A] font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-[#FF007A]' : ''}`} />
                    <span>{post.likesCount} Likes</span>
                  </button>

                  <button
                    onClick={() => setActiveCommentPostId(isCommentsOpen ? null : post.id)}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white"
                  >
                    <MessageSquare className="w-4 h-4 text-[#03E5B7]" />
                    <span>{post.comments.length} Comments</span>
                  </button>
                </div>

                <span className="text-slate-500 text-[10px]">{post.sharesCount} Shares</span>
              </div>

              {/* Comments Section */}
              {isCommentsOpen && (
                <div className="pt-3 border-t border-slate-800/80 space-y-3 animate-in fade-in">
                  <div className="space-y-2">
                    {post.comments.map((c) => (
                      <div key={c.id} className="p-2.5 rounded-xl bg-[#07080E] border border-slate-800 text-xs space-y-1">
                        <div className="flex justify-between font-mono">
                          <strong className="text-white font-bold">{c.authorName}</strong>
                          <span className="text-[10px] text-slate-500">{c.timestamp}</span>
                        </div>
                        <p className="text-slate-300 text-[11px]">{c.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 bg-[#07080E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
                    />
                    <button
                      onClick={() => handleSendComment(post.id)}
                      className="px-4 py-2 rounded-xl bg-[#03E5B7] text-slate-950 font-bold text-xs glow-teal"
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CREATE POST MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreatePost}
            className="bg-[#0D0F17] border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Create Community Post</h3>
              <button type="button" onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Post Category Format</label>
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value as any)}
                className="w-full bg-[#07080E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF007A]"
              >
                <option value="Contribution">♻️ Waste Contribution</option>
                <option value="Achievement">🏆 Achievement</option>
                <option value="Idea">💡 Idea</option>
                <option value="Project">🌱 Project Update</option>
                <option value="Local Issue">📍 Local Issue</option>
                <option value="Food Rescue">🍱 Food Rescue</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Share something for the planet...</label>
              <textarea
                rows={3}
                required
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Describe your environmental action, discovered waste spot, or project goal..."
                className="w-full bg-[#07080E] border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#FF007A]"
              />
            </div>

            {/* Image Upload Section */}
            <div className="space-y-1.5 font-mono">
              <label className="text-xs text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold">
                  <Camera className="w-3.5 h-3.5 text-[#03E5B7]" />
                  ATTACH PHOTO / MEDIA
                </span>
                <span className="text-[10px] text-slate-500">OPTIONAL</span>
              </label>

              {postImageUrl ? (
                <div className="relative rounded-xl overflow-hidden border-2 border-[#03E5B7] max-h-52 bg-[#07080E] p-2 glow-teal">
                  <img
                    src={postImageUrl}
                    alt="Uploaded Post Attachment Preview"
                    className="w-full h-auto object-contain max-h-48 mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setPostImageUrl('')}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-black/80 text-white hover:bg-red-600 transition-colors shadow-lg border border-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#1D2133] hover:border-[#03E5B7] rounded-2xl cursor-pointer bg-[#07080E] transition-all space-y-2 group">
                  <div className="w-10 h-10 rounded-full bg-[#03E5B7]/15 border border-[#03E5B7]/40 flex items-center justify-center text-[#03E5B7] group-hover:scale-110 transition-transform glow-teal">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div className="text-center space-y-0.5">
                    <span className="text-xs font-bold text-white">Click to upload photo or drag & drop</span>
                    <p className="text-[10px] text-slate-400">Supports PNG, JPG, WEBP</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-[#FF007A] text-white text-xs font-bold font-mono glow-pink hover:bg-[#FF007A]/90 transition-all">
              Publish Post (+50 Eco Points)
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
