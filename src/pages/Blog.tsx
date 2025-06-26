import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, User, ArrowRight, Search, TrendingUp, Globe, BookOpen, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 45 },
    { id: 'export-guide', name: 'Export Guides', count: 12 },
    { id: 'market-insights', name: 'Market Insights', count: 8 },
    { id: 'compliance', name: 'Compliance', count: 7 },
    { id: 'success-stories', name: 'Success Stories', count: 6 },
    { id: 'technology', name: 'Technology', count: 5 },
    { id: 'industry-trends', name: 'Industry Trends', count: 7 }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "Complete Guide to Export Documentation in 2025",
      excerpt: "Everything you need to know about export documents, from commercial invoices to certificates of origin. A comprehensive guide for new exporters.",
      author: "Rajesh Kumar",
      date: "2024-12-15",
      category: "Export Guides",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
      featured: true
    },
    {
      id: 2,
      title: "UAE Market Opportunities for Indian Exporters in 2025",
      excerpt: "Discover the latest opportunities in the UAE market for Indian businesses. Key sectors, trade regulations, and market entry strategies.",
      author: "Priya Sharma",
      date: "2024-12-10",
      category: "Market Insights",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400",
      featured: true
    }
  ];

  const recentPosts = [
    {
      id: 3,
      title: "How AI is Transforming Export Market Research",
      excerpt: "Explore how artificial intelligence is revolutionizing the way businesses conduct market research for international expansion.",
      author: "Arjun Patel",
      date: "2024-12-08",
      category: "Technology",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400"
    },
    {
      id: 4,
      title: "EU's New Import Regulations: What Indian Exporters Need to Know",
      excerpt: "Breaking down the latest EU import regulations and compliance requirements that affect Indian exporters.",
      author: "Meera Singh",
      date: "2024-12-05",
      category: "Compliance",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=400"
    },
    {
      id: 5,
      title: "From ₹10L to ₹50Cr: A Textile Exporter's Journey",
      excerpt: "Success story of how a small textile manufacturer from Gujarat scaled their business through strategic export planning.",
      author: "Vikram Desai",
      date: "2024-12-02",
      category: "Success Stories",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400"
    },
    {
      id: 6,
      title: "Top 10 Export Markets for Indian Handicrafts in 2025",
      excerpt: "Detailed analysis of the most promising international markets for Indian handicraft exporters this year.",
      author: "Kavita Reddy",
      date: "2024-11-28",
      category: "Market Insights",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
    },
    {
      id: 7,
      title: "Digital Transformation in Export Operations",
      excerpt: "How digital tools and platforms are streamlining export operations and improving efficiency for global trade.",
      author: "Rohit Gupta",
      date: "2024-11-25",
      category: "Technology",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400"
    },
    {
      id: 8,
      title: "Ayurveda Exports: Navigating Global Regulatory Landscapes",
      excerpt: "Complete guide to exporting Ayurvedic products internationally, covering regulations in major markets.",
      author: "Dr. Anjali Sharma",
      date: "2024-11-22",
      category: "Compliance",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1544216717-3bbf52512659?w=400"
    },
    {
      id: 9,
      title: "Export Financing Options for Small Manufacturers",
      excerpt: "Comprehensive overview of financing options available to small and medium manufacturers looking to expand exports.",
      author: "Amit Joshi",
      date: "2024-11-20",
      category: "Export Guides",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400"
    }
  ];

  const popularTags = [
    "Export Documentation", "Market Research", "Trade Finance", "Compliance", 
    "Customs Procedures", "Export Incentives", "International Marketing", "DGFT",
    "Export Promotion", "Global Trade", "Supply Chain", "Quality Standards"
  ];

  const stats = [
    { label: "Articles Published", value: "150+" },
    { label: "Expert Contributors", value: "25+" },
    { label: "Monthly Readers", value: "50K+" },
    { label: "Countries Covered", value: "30+" }
  ];

  const allPosts = [...featuredPosts, ...recentPosts];
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           post.category.toLowerCase().replace(' ', '-') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              Export Knowledge Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Expert Insights for 
              <span className="text-indigo-600"> Global Trade Success</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Stay ahead in international trade with our latest insights, guides, and success stories. 
              From export documentation to market trends - your complete resource for global business.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles, guides, market insights..."
                  className="pl-10 pr-4 py-3 text-lg rounded-full border-2 border-gray-200 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="space-y-8 sticky top-8">
                  {/* Categories */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Tag className="w-5 h-5 mr-2 text-indigo-600" />
                        Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === category.id
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{category.name}</span>
                            <span className="text-sm text-gray-500">({category.count})</span>
                          </div>
                        </button>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Popular Tags */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Popular Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-indigo-100 hover:text-indigo-700 cursor-pointer transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Newsletter Signup */}
                  <Card className="bg-indigo-50 border-indigo-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-indigo-900">Stay Updated</CardTitle>
                      <CardDescription className="text-indigo-700">
                        Get weekly insights delivered to your inbox
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Input placeholder="Your email address" />
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                          Subscribe
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Featured Posts */}
                {selectedCategory === 'all' && !searchTerm && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      {featuredPosts.map((post) => (
                        <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="aspect-video overflow-hidden">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <CardHeader>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                                {post.category}
                              </span>
                              <span>{post.readTime}</span>
                            </div>
                            <CardTitle className="text-xl hover:text-indigo-600 transition-colors">
                              <Link to={`/blog/${post.id}`}>{post.title}</Link>
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                              {post.excerpt}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <User className="w-4 h-4" />
                                <span>{post.author}</span>
                                <Calendar className="w-4 h-4 ml-2" />
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                              </div>
                              <Button variant="ghost" size="sm" asChild>
                                <Link to={`/blog/${post.id}`}>
                                  Read More
                                  <ArrowRight className="ml-1 w-4 h-4" />
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Posts */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {searchTerm ? `Search Results (${filteredPosts.length})` : 'Latest Articles'}
                    </h2>
                    <div className="text-sm text-gray-500">
                      Showing {filteredPosts.length} articles
                    </div>
                  </div>

                  <div className="space-y-8">
                    {filteredPosts.map((post) => (
                      <Card key={post.id} className="hover:shadow-lg transition-shadow">
                        <div className="md:flex">
                          <div className="md:w-1/3">
                            <div className="aspect-video md:aspect-square overflow-hidden">
                              <img 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          </div>
                          <div className="md:w-2/3 md:pl-6">
                            <CardHeader className="pb-4">
                              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                  {post.category}
                                </span>
                                <span>{post.readTime}</span>
                              </div>
                              <CardTitle className="text-xl hover:text-indigo-600 transition-colors">
                                <Link to={`/blog/${post.id}`}>{post.title}</Link>
                              </CardTitle>
                              <CardDescription className="text-gray-600">
                                {post.excerpt}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <User className="w-4 h-4" />
                                  <span>{post.author}</span>
                                  <Calendar className="w-4 h-4 ml-2" />
                                  <span>{new Date(post.date).toLocaleDateString()}</span>
                                </div>
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to={`/blog/${post.id}`}>
                                    Read More
                                    <ArrowRight className="ml-1 w-4 h-4" />
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Load More Button */}
                  <div className="text-center mt-12">
                    <Button variant="outline" size="lg">
                      Load More Articles
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Export Business?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Get personalized export guidance from our experts and turn insights into action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              <Link to="/consulting/book-free-call">
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-indigo-600">
              <Link to="/consulting">
                View All Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
