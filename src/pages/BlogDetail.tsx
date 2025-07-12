import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, User, ArrowLeft, Tag, X, Maximize2 } from 'lucide-react';
import { getFullUrl } from '@/lib/utils';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(getFullUrl(`/api/blog/posts/${slug}/public`))
      .then((res) => {
        if (!res.ok) throw new Error('Blog post not found');
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err && typeof err.message === 'string' ? err.message : 'Error fetching blog post');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20 text-lg text-gray-500">Loading blog post...</div>;
  }
  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }
  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-12 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Button asChild variant="ghost" className="mb-6">
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
              </Link>
            </Button>
            <div className="mb-6">
              <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mr-2">
                {post.category}
              </span>
              <span className="inline-block text-gray-500 text-sm mr-2">
                {post.readTime ? `${post.readTime} min read` : ''}
              </span>
              <span className="inline-block text-gray-500 text-sm">
                <Calendar className="inline w-4 h-4 mr-1" />
                {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString() : ''}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center mb-8 text-gray-600">
              <User className="w-5 h-5 mr-2" />
              <span className="font-medium">{post.author?.name}</span>
              {post.author?.designation && (
                <span className="ml-2 text-sm text-gray-400">{post.author.designation}</span>
              )}
            </div>
            <div className="aspect-video rounded-lg overflow-hidden mb-8">
              <img
                src={getFullUrl(post.coverImage || post.image) || '/placeholder.svg'}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Description</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
              </CardContent>
            </Card>
            {post.tags && post.tags.length > 0 && (
              <div className="mb-8">
                <div className="font-semibold mb-2 flex items-center">
                  <Tag className="w-4 h-4 mr-2 text-indigo-600" /> Tags:
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Attachments */}
            {post.attachments && post.attachments.length > 0 && (
              <section className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Attachments</h3>
                <div className="flex flex-col gap-2">
                  {post.attachments.map((att, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {att.type && att.type.startsWith('image/') ? (
                        <div className="flex items-center gap-2">
                          <img
                            src={getFullUrl(att.url)}
                            alt={att.name}
                            className="max-h-24 rounded border"
                            loading="lazy"
                          />
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedImage({ url: getFullUrl(att.url), name: att.name })}
                            className="flex items-center gap-1"
                          >
                            <Maximize2 className="w-4 h-4" />
                            View Full Image
                          </Button>
                        </div>
                      ) : att.type === 'application/pdf' ? (
                        <a
                          href={getFullUrl(att.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline flex items-center gap-2"
                        >
                          <span>{att.name}</span>
                          <Button size="sm" variant="outline">Download PDF</Button>
                        </a>
                      ) : (
                        <a
                          href={getFullUrl(att.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline flex items-center gap-2"
                        >
                          <span>{att.name}</span>
                          <Button size="sm" variant="outline">Download</Button>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 text-gray-800"
              size="icon"
            >
              <X className="w-4 h-4" />
            </Button>
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              className="max-w-full max-h-full object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail; 