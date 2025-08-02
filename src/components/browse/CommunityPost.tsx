
import { Heart, MessageSquare, Reply, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CommunityPostReply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  time: string;
}

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

interface CommunityPostProps {
  post: CommunityPostData;
  replies: CommunityPostReply[];
  showReplies: boolean;
  showReplyForm: boolean;
  replyText: string;
  onToggleReplies: () => void;
  onToggleReplyForm: () => void;
  onReplyTextChange: (text: string) => void;
  onReplySubmit: () => void;
}

const CommunityPost = ({
  post,
  replies,
  showReplies,
  showReplyForm,
  replyText,
  onToggleReplies,
  onToggleReplyForm,
  onReplyTextChange,
  onReplySubmit
}: CommunityPostProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={post.avatar}
            alt={post.author}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{post.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.time}</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                    {post.category}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-3">{post.content}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <button className="flex items-center hover:text-red-600 transition-colors">
                <Heart className="w-4 h-4 mr-1" />
                <span>{post.likes}</span>
              </button>
              <button 
                className="flex items-center hover:text-blue-600 transition-colors"
                onClick={onToggleReplies}
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                <span>{replies?.length || 0} replies</span>
              </button>
              <button 
                className="flex items-center hover:text-green-600 transition-colors"
                onClick={onToggleReplyForm}
              >
                <Reply className="w-4 h-4 mr-1" />
                <span>Reply</span>
              </button>
            </div>

            {/* Reply Form */}
            {showReplyForm && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <Textarea
                  placeholder="Write your reply..."
                  value={replyText}
                  onChange={(e) => onReplyTextChange(e.target.value)}
                  className="mb-3"
                  rows={3}
                />
                <div className="flex space-x-2">
                  <Button 
                    size="sm"
                    onClick={onReplySubmit}
                    disabled={!replyText?.trim()}
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Post Reply
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onToggleReplyForm}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Replies Section */}
            {showReplies && replies && (
              <div className="mt-4 space-y-3">
                <div className="border-t pt-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Replies</h4>
                  {replies.map((reply) => (
                    <div key={reply.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={reply.avatar}
                        alt={reply.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="font-medium text-gray-900">{reply.author}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-500">{reply.time}</span>
                        </div>
                        <p className="text-gray-700 text-sm mt-1">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityPost;
