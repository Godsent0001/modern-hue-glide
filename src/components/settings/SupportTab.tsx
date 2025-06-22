
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, Mail, Phone, Clock, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SupportTab = () => {
  const navigate = useNavigate();

  const handleEmailClick = () => {
    window.location.href = 'mailto:support@aifreelance.com?subject=Support Request';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890?text=Hello, I need support with AI Freelance platform', '_blank');
  };

  const handleLiveChatClick = () => {
    navigate('/live-chat');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleLiveChatClick}
              className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors w-full text-left"
            >
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-medium">Live Chat</h3>
                <p className="text-sm text-gray-600">Chat with our support team</p>
              </div>
            </button>
            <button
              onClick={handleEmailClick}
              className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors w-full text-left"
            >
              <Mail className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-sm text-gray-600">support@aifreelance.com</p>
              </div>
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors w-full text-left"
            >
              <MessageSquare className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="font-medium">WhatsApp</h3>
                <p className="text-sm text-gray-600">Chat on WhatsApp</p>
              </div>
            </button>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-medium mb-4">Send us a message</h3>
            <div className="space-y-4">
              <Input placeholder="Subject" />
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="How can we help you?"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                Send Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Support Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Monday - Friday</span>
              <span>9:00 AM - 6:00 PM EST</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday</span>
              <span>10:00 AM - 4:00 PM EST</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTab;
