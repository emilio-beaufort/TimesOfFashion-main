import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  LogOut, 
  Plus, 
  FileText, 
  Users, 
  Mail, 
  Settings,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { firebaseService, BlogPost } from "@/services/firebaseService";
import { useToast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    author: 'Times of Fashion Admin',
    status: 'published' as 'draft' | 'published' | 'archived'
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    
    loadBlogs();
  }, [navigate]);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const blogPosts = await firebaseService.getBlogPosts({
        limit: 50,
        orderBy: 'createdAt'
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

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminEmail');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully."
    });
    navigate('/admin/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast({
        title: "Missing Fields",
        description: "Please fill in title and content",
        variant: "destructive"
      });
      return;
    }

    setCreating(true);

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
          description: "Blog post created and stored in Firebase!"
        });
      }

      resetForm();
      loadBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post to Firebase",
        variant: "destructive"
      });
    } finally {
      setCreating(false);
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
    setShowCreateForm(true);
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
      author: 'Times of Fashion Admin',
      status: 'published'
    });
    setEditingBlog(null);
    setShowCreateForm(false);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-elegant">
        <Loader2 className="h-8 w-8 animate-spin bg-gradient-crimson-glow bg-clip-text text-transparent" />
        <span className="ml-2 text-lg font-inter">Loading admin panel...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-elegant">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-playfair font-bold">
                Times of Fashion <span className="bg-gradient-deep-luxury-red bg-clip-text text-transparent">Admin</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {localStorage.getItem('adminEmail')}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Blogs</p>
                  <p className="text-3xl font-bold font-playfair bg-gradient-crimson-glow bg-clip-text text-transparent">{blogs.length}</p>
                </div>
                <FileText className="h-8 w-8 bg-gradient-crimson-glow/60 bg-clip-text text-transparent" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Published</p>
                  <p className="text-3xl font-bold font-playfair text-green-600">
                    {blogs.filter(b => b.status === 'published').length}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-green-600/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                  <p className="text-3xl font-bold font-playfair text-yellow-600">
                    {blogs.filter(b => b.status === 'draft').length}
                  </p>
                </div>
                <Edit className="h-8 w-8 text-yellow-600/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-3xl font-bold font-playfair text-blue-600">
                    {blogs.reduce((sum, blog) => sum + (blog.viewCount || 0), 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="blogs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="blogs">Blog Management</TabsTrigger>
            <TabsTrigger value="create">Create Blog</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Blog Management Tab */}
          <TabsContent value="blogs">
            <Card className="shadow-elegant border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="font-playfair">All Blog Posts</CardTitle>
                  <Button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-gradient-crimson-glow hover:bg-gradient-crimson-glow/90 text-primary"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    New Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogs.map((blog, index) => (
                    <motion.div
                      key={blog.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold font-playfair">{blog.title}</h3>
                          <Badge className={`text-xs ${getStatusColor(blog.status)}`}>
                            {blog.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{blog.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{blog.viewCount || 0} views</span>
                          </div>
                        </div>
                      </div>
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
                    </motion.div>
                  ))}

                  {blogs.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg text-muted-foreground">No blog posts yet</p>
                      <p className="text-sm text-muted-foreground">
                        Create your first blog post to get started
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Blog Tab */}
          <TabsContent value="create">
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
                      <label className="block text-sm font-medium mb-2">Title *</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="Enter blog title"
                        required
                        disabled={creating}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => setFormData({...formData, category: value})}
                        disabled={creating}
                      >
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
                      disabled={creating}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Content *</label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      placeholder="Write your blog content here..."
                      rows={12}
                      required
                      disabled={creating}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                      <Input
                        value={formData.tags}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        placeholder="fashion, style, trends"
                        disabled={creating}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Author</label>
                      <Input
                        value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                        placeholder="Author name"
                        disabled={creating}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <Select 
                        value={formData.status} 
                        onValueChange={(value: any) => setFormData({...formData, status: value})}
                        disabled={creating}
                      >
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
                    <Button 
                      type="submit" 
                      className="bg-gradient-crimson-glow hover:bg-gradient-crimson-glow/90 text-primary"
                      disabled={creating}
                    >
                      {creating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {creating ? 'Saving...' : (editingBlog ? 'Update Post' : 'Create Post')}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={resetForm}
                      disabled={creating}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="shadow-elegant border-0">
              <CardHeader>
                <CardTitle className="font-playfair">Admin Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Site Name</label>
                    <Input defaultValue="Times of Fashion" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Admin Email</label>
                    <Input defaultValue="admin@gmail.com" disabled />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Site Description</label>
                  <Input defaultValue="Your ultimate destination for fashion trends and beauty tips" />
                </div>

                <Button className="bg-gradient-crimson-glow hover:bg-gradient-crimson-glow/90 text-primary">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
