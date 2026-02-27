import { useState } from "react";
import { Heart, MessageCircle, Share2, Search, TrendingUp, Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";

interface Post {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  category: "support" | "tips" | "story";
  isLiked?: boolean;
}

const mockPosts: Post[] = [
  {
    id: "1",
    author: "User #1",
    avatar: "https://i.pravatar.cc/150?img=33",
    time: "2h ago",
    content: "Just wanted to share that cooling sheets have been a game changer for my night sweats! Anyone else tried them?",
    likes: 24,
    comments: 8,
    category: "tips",
  },
  {
    id: "2",
    author: "User #2",
    avatar: "https://i.pravatar.cc/150?img=34",
    time: "5h ago",
    content: "Having a rough day with hot flashes. Feeling supported by this community helps so much. Thank you all! 💕",
    likes: 42,
    comments: 15,
    category: "support",
  },
  {
    id: "3",
    author: "User #3",
    avatar: "https://i.pravatar.cc/150?img=35",
    time: "1d ago",
    content: "My partner and I had a great conversation about symptoms using the partner feature. Communication is everything!",
    likes: 31,
    comments: 6,
    category: "story",
  },
  {
    id: "4",
    author: "User #4",
    avatar: "https://i.pravatar.cc/150?img=36",
    time: "1d ago",
    content: "Does anyone have recommendations for natural remedies? I'm trying to avoid HRT if possible.",
    likes: 18,
    comments: 12,
    category: "support",
  },
];

export function Community() {
  const [posts, setPosts] = useState(mockPosts);
  const [activeTab, setActiveTab] = useState("all");

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const filteredPosts = activeTab === "all" 
    ? posts 
    : posts.filter(post => post.category === activeTab);

  return (
    <div className="min-h-full pb-6 max-w-md mx-auto">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 bg-white/80 backdrop-blur-xl sticky top-0 z-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Community</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search discussions..."
            className="pl-10 bg-white/60 backdrop-blur-sm border-gray-200 rounded-xl h-12"
          />
        </div>
      </div>

      {/* Stats Banner */}
      <div className="px-5 mb-6">
        <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl p-5 text-white shadow-lg">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1676629650907-d50f2f27db20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwb3J0aXZlJTIwd29tZW4lMjBjb21tdW5pdHklMjB0b2dldGhlcnxlbnwxfHx8fDE3NzIxNDcyNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Community"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-20"
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5" />
              <p className="font-medium">12,847 Members Strong</p>
            </div>
            <p className="text-sm opacity-90">
              You're not alone on this journey. Connect, share, and support each other.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-white/60 backdrop-blur-sm h-12 rounded-xl">
            <TabsTrigger value="all" className="flex-1 rounded-lg data-[state=active]:bg-white">
              All
            </TabsTrigger>
            <TabsTrigger value="support" className="flex-1 rounded-lg data-[state=active]:bg-white">
              Support
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex-1 rounded-lg data-[state=active]:bg-white">
              Tips
            </TabsTrigger>
            <TabsTrigger value="story" className="flex-1 rounded-lg data-[state=active]:bg-white">
              Stories
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Posts */}
      <div className="px-5 space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-md"
          >
            {/* Post Header */}
            <div className="flex items-start gap-3 mb-3">
              <ImageWithFallback
                src={post.avatar}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{post.author}</p>
                <p className="text-sm text-gray-500">{post.time}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                post.category === "support"
                  ? "bg-blue-100 text-blue-700"
                  : post.category === "tips"
                  ? "bg-green-100 text-green-700"
                  : "bg-purple-100 text-purple-700"
              }`}>
                {post.category}
              </div>
            </div>

            {/* Post Content */}
            <p className="text-gray-700 mb-4">{post.content}</p>

            {/* Post Actions */}
            <div className="flex items-center gap-6 text-gray-500">
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-2 transition-colors ${
                  post.isLiked ? "text-rose-500" : "hover:text-rose-500"
                }`}
              >
                <Heart className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`} />
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-rose-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-rose-500 transition-colors ml-auto">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trending Topics */}
      <div className="px-5 mt-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-rose-500" />
            <h3 className="font-semibold text-gray-800">Trending Topics</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["#HotFlashHelp", "#SleepTips", "#PartnerSupport", "#NaturalRemedies", "#MenopauseJourney"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-rose-100 text-rose-700 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
