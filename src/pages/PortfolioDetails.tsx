
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Calendar, Tag, User, Download, FileText } from 'lucide-react';

const PortfolioDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock portfolio data - in a real app, this would come from an API
  const portfolio = {
    id: parseInt(id || '1'),
    title: "Complete API Documentation Overhaul",
    description: "Redesigned and rewrote comprehensive API documentation for a fintech startup, improving developer adoption by 40%. This project involved creating clear, concise documentation that made complex financial APIs accessible to developers of all skill levels.",
    category: "Documentation",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["API", "Documentation", "Technical Writing", "Fintech"],
    specialist: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    completedDate: "June 2024",
    duration: "3 weeks",
    clientFeedback: "Exceptional work that transformed our developer experience. The documentation is now clear, comprehensive, and has significantly reduced support tickets.",
    challenges: "The main challenge was understanding complex financial concepts and translating them into developer-friendly language while maintaining technical accuracy.",
    solution: "Created a structured approach with clear examples, step-by-step guides, and interactive API explorer to help developers understand and implement the APIs effectively.",
    results: [
      "40% increase in developer adoption",
      "60% reduction in support tickets",
      "95% positive developer feedback",
      "50% faster integration time"
    ],
    technologies: ["REST APIs", "OpenAPI", "Postman", "Markdown", "GitBook"],
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    documents: [
      {
        name: "API Documentation Guide.pdf",
        size: "2.4 MB",
        type: "PDF",
        downloadUrl: "#"
      },
      {
        name: "Implementation Examples.docx",
        size: "1.8 MB",
        type: "DOCX",
        downloadUrl: "#"
      }
    ]
  };

  const handleDownload = (doc: any) => {
    // In a real app, this would trigger the actual download
    const element = document.createElement('a');
    element.href = doc.downloadUrl;
    element.download = doc.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
            <img
              src={portfolio.image}
              alt={portfolio.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={portfolio.specialist.avatar}
              alt={portfolio.specialist.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{portfolio.title}</h1>
              <p className="text-gray-600">by {portfolio.specialist.name}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {portfolio.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{portfolio.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{portfolio.challenges}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{portfolio.solution}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Results & Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {portfolio.results.map((result, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {result}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="italic text-gray-700 border-l-4 border-blue-500 pl-4">
                  "{portfolio.clientFeedback}"
                </blockquote>
              </CardContent>
            </Card>

            {/* Downloadable Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Project Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portfolio.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDownload(doc)}
                        size="sm"
                        className="flex items-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Images */}
            <Card>
              <CardHeader>
                <CardTitle>Project Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolio.images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`Project image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Project Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Completed:</span>
                      <span className="ml-2 font-medium">{portfolio.completedDate}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <User className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Duration:</span>
                      <span className="ml-2 font-medium">{portfolio.duration}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Tag className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">Category:</span>
                      <span className="ml-2 font-medium">{portfolio.category}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    className="w-full mb-3"
                    onClick={() => navigate(`/ai-specialist/${portfolio.specialist.name.toLowerCase().replace(' ', '-')}`)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    View Specialist Profile
                  </Button>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetails;
