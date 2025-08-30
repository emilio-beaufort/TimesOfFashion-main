import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User, ArrowRight, Loader2, Plus, Edit, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { firebaseService, BlogPost } from "@/services/firebaseService";
import { useToast } from "@/hooks/use-toast";

interface FirebaseBlogManagerProps {
  isAdmin?: boolean;
  maxPosts?: number;
  showCreateForm?: boolean;
}

const FirebaseBlogManager = ({ 
  isAdmin = false, 
  maxPosts = 10,
  showCreateForm = false 
}: FirebaseBlogManagerProps) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(showCreateForm);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    author: 'Times of Fashion',
    status: 'draft' as 'draft' | 'published' | 'archived'
  });
  const { toast } = useToast();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const blogPosts = await firebaseService.getBlogPosts({
        status: isAdmin ? undefined : 'published',
        limit: maxPosts,
        orderBy: 'publishedAt'
      });
      setBlogs(blogPosts);
    } catch (error) {
      console.error('Failed to load blogs:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        publishedAt: formData.status === 'published' ? new Date() as any : undefined
      };

      if (editingBlog) {
        await firebaseService.updateBlogPost(editingBlog.id!, blogData);
        toast({
          title: "Success",
          description: "Blog post updated successfully!"
        });
      } else {
        await firebaseService.createBlogPost(blogData);
        toast({
          title: "Success", 
          description: "Blog post created successfully!"
        });
      }

      resetForm();
      loadBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      category: blog.category,
      tags: blog.tags.join(', '),
      author: blog.author,
      status: blog.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await firebaseService.deleteBlogPost(id);
      toast({
        title: "Success",
        description: "Blog post deleted successfully!"
      });
      loadBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: '',
      tags: '',
      author: 'Times of Fashion',
      status: 'draft'
    });
    setEditingBlog(null);
    setShowForm(false);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Draft';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin bg-gradient-crimson-glow bg-clip-text text-transparent" />
        <span className="ml-2 text-lg font-inter">Loading blog posts...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-playfair font-bold">
            {isAdmin ? 'Blog Management' : 'Latest Articles'}
          </h2>
          <p className="text-muted-foreground font-inter">
            {isAdmin ? 'Create and manage your fashion blog posts' : 'Discover the latest in fashion and beauty'}
          </p>
        </div>
        {isAdmin && (
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-crimson-glow hover:bg-gradient-crimson-glow/90 text-primary font-inter"
          >
            <Plus className="mr-2 h-4 w-4" />
            {showForm ? 'Cancel' : 'New Post'}
          </Button>
        )}
      </div>

      {/* Create/Edit Form */}
      {isAdmin && showForm && (
        <Card className="shadow-elegant border-0">
          <CardHeader>
            <CardTitle className="font-playfair">
              {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter blog title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fashion-trends">Fashion Trends</SelectItem>
                      <SelectItem value="beauty-tips">Beauty Tips</SelectItem>
                      <SelectItem value="style-guides">Style Guides</SelectItem>
                      <SelectItem value="celebrity-fashion">Celebrity Fashion</SelectItem>
                      <SelectItem value="seasonal-looks">Seasonal Looks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  placeholder="Brief description of the post"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Write your blog content here..."
                  rows={8}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                  <Input
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="fashion, style, trends"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Author</label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-gradient-crimson-glow hover:bg-gradient-crimson-glow/90 text-primary">
                  {editingBlog ? 'Update Post' : 'Create Post'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full shadow-magazine border-0 overflow-hidden group hover:shadow-elegant transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`text-xs ${getStatusColor(blog.status)}`}>
                    {blog.status}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye size={14} />
                    <span>{blog.viewCount || 0}</span>
                  </div>
                </div>
                <CardTitle className="font-playfair text-xl leading-tight group-hover:bg-gradient-crimson-glow group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300">
                  {blog.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{blog.author}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground font-inter mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {blog.tags.slice(0, 3).map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-inter font-semibold bg-gradient-crimson-glow bg-clip-text text-transparent hover:bg-gradient-crimson-glow/80 group"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>

                  {isAdmin && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(blog)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(blog.id!)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground font-inter">
            {isAdmin ? 'No blog posts yet. Create your first post!' : 'No articles found. Check back soon!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default FirebaseBlogManager;
