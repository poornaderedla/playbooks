import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getFullUrl } from "@/lib/utils";

const categories = [
  "All",
  "Personal Finance",
  "Investment",
  "Business",
  "Technology"
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(getFullUrl('/api/blog/posts/public'))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
      .then((data) => {
        setBlogPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading blogs...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-100 via-white to-primary-200 py-20" style={{ borderRadius: '0 0 64px 64px / 0 0 48px 48px' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-6 bg-primary-100 text-primary-800 hover:bg-primary-100">
              EXIM Pro Blog
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-600 bg-clip-text text-transparent leading-tight pb-3 overflow-visible">
              Insights for Global Trade Success
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-4xl mx-auto">
              Stay ahead in international trade with our latest insights, guides, and success stories. From export documentation to market trends – your complete resource for global business.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">
                {selectedCategory === "All" 
                  ? "No blog posts available at the moment." 
                  : `No posts found in the \"${selectedCategory}\" category.`}
              </p>
              {selectedCategory !== "All" && (
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory("All")}
                >
                  View All Posts
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post._id || post.slug} className="group hover:shadow-lg transition-shadow duration-300">
                  {/* Show blog image if available */}
                  {post.coverImage || post.image ? (
                    <img
                      src={getFullUrl(post.coverImage || post.image)}
                      alt={post.title}
                      className="aspect-video w-full object-cover rounded-t-lg"
                      loading="lazy"
                    />
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg">
                      <img src="/placeholder.svg" alt="placeholder" className="w-full h-full object-cover opacity-30" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="block group-hover:text-primary transition-colors line-clamp-2 font-bold text-lg md:text-xl mb-1 hover:underline focus:underline">
                      {post.title}
                    </Link>
                    <CardDescription className="line-clamp-3">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author?.name || post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{post.publishedDate ? new Date(post.publishedDate).toLocaleDateString() : ''}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags && post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <Button className="w-full group/btn">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
