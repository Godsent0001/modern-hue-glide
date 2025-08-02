
import { Search, Users, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CommunityPost from './CommunityPost';

interface CommunityPostData {
  id: number;
  author: string;
  avatar: string;
  title: string;
  content: string;
  likes: number;
  replies: number;
  time: string;
  category: string;
}

interface CommunitySectionProps {
  posts: CommunityPostData[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onCreateDiscussion: () => void;
  showReplies: {[key: number]: boolean};
  showReplyForm: {[key: number]: boolean};
  replyText: {[key: number]: string};
  replies: {[key: number]: any[]};
  onToggleReplies: (postId: number) => void;
  onToggleReplyForm: (postId: number) => void;
  onReplyTextChange: (postId: number, text: string) => void;
  onReplySubmit: (postId: number) => void;
}

const CommunitySection = ({
  posts,
  searchTerm,
  onSearchChange,
  onCreateDiscussion,
  showReplies,
  showReplyForm,
  replyText,
  replies,
  onToggleReplies,
  onToggleReplyForm,
  onReplyTextChange,
  onReplySubmit
}: CommunitySectionProps) => {
  return (
    <div className="space-y-6">
      {/* Community Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Community Discussions</h2>
              <p className="text-gray-600">Connect with other users and share experiences</p>
            </div>
            <Button onClick={onCreateDiscussion}>
              Start Discussion
            </Button>
          </div>
          
          {/* Search Bar for Community */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>2,847 members</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              <span>156 discussions</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <CommunityPost
            key={post.id}
            post={post}
            replies={replies[post.id] || []}
            showReplies={showReplies[post.id] || false}
            showReplyForm={showReplyForm[post.id] || false}
            replyText={replyText[post.id] || ''}
            onToggleReplies={() => onToggleReplies(post.id)}
            onToggleReplyForm={() => onToggleReplyForm(post.id)}
            onReplyTextChange={(text) => onReplyTextChange(post.id, text)}
            onReplySubmit={() => onReplySubmit(post.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunitySection;
