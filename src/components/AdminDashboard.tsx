import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Mail, 
  FileText, 
  Settings, 
  TrendingUp, 
  Eye,
  Heart,
  Calendar,
  Download,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { firebaseService, NewsletterSubscription, UserAccount } from "@/services/firebaseService";
import { useToast } from "@/hooks/use-toast";
import FirebaseBlogManager from "./FirebaseBlogManager";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalBlogs: 0,
    totalSubscriptions: 0,
    totalUsers: 0,
    recentActivity: []
  });
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [analyticsData, subscriptionsData] = await Promise.all([
        firebaseService.getAnalytics(),
        firebaseService.getNewsletterSubscriptions('active')
      ]);

      setAnalytics(analyticsData);
      setSubscriptions(subscriptionsData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: any) => {
    if (!date) return '';
    if (typeof date === 'object' && 'toDate' in date) {
      return date.toDate().toLocaleDateString();
    }
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    return '';
  };

  const exportSubscriptions = () => {
    const csvContent = [
      ['Email', 'First Name', 'Source', 'Subscribed Date', 'Status'],
      ...subscriptions.map(sub => [
        sub.email,
        sub.firstName || '',
        sub.source,
        formatDate(sub.subscribedAt),
        sub.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-subscriptions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const StatCard = ({ title, value, icon: Icon, trend }: any) => (
    <Card className="shadow-elegant border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold font-playfair bg-gradient-crimson-glow bg-clip-text text-transparent">{value}</p>
            {trend && (
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                {trend}
              </p>
            )}
          </div>
          <div className="h-12 w-12 bg-gradient-crimson-glow/10 rounded-full flex items-center justify-center">
            <Icon className="h-6 w-6 bg-gradient-crimson-glow bg-clip-text text-transparent" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin bg-gradient-crimson-glow bg-clip-text text-transparent" />
        <span className="ml-2 text-lg font-inter">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-elegant p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-playfair font-bold mb-2">
            Times of Fashion <span className="bg-gradient-deep-luxury-red bg-clip-text text-transparent">Admin</span>
          </h1>
          <p className="text-lg text-muted-foreground font-inter">
            Manage your fashion blog and newsletter subscriptions
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Blog Posts"
            value={analytics.totalBlogs}
            icon={FileText}
            trend="+12% this month"
          />
          <StatCard
            title="Newsletter Subscribers"
            value={analytics.totalSubscriptions}
            icon={Mail}
            trend="+8% this week"
          />
          <StatCard
            title="Registered Users"
            value={analytics.totalUsers}
            icon={Users}
            trend="+15% this month"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="blog" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="blog">Blog Management</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Blog Management Tab */}
          <TabsContent value="blog">
            <FirebaseBlogManager isAdmin={true} showCreateForm={false} />
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers">
            <Card className="shadow-elegant border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="font-playfair">Newsletter Subscribers</CardTitle>
                  <Button
                    onClick={exportSubscriptions}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptions.map((subscription, index) => (
                    <motion.div
                      key={subscription.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-gradient-crimson-glow/10 rounded-full flex items-center justify-center">
                          <Mail className="h-5 w-5 bg-gradient-crimson-glow bg-clip-text text-transparent" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {subscription.firstName || 'Anonymous'} 
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {subscription.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Subscribed: {formatDate(subscription.subscribedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          className={
                            subscription.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }
                        >
                          {subscription.status}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {subscription.source}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {subscriptions.length === 0 && (
                  <div className="text-center py-8">
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">No subscribers yet</p>
                    <p className="text-sm text-muted-foreground">
                      Subscribers will appear here when they sign up for your newsletter
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-elegant border-0">
                <CardHeader>
                  <CardTitle className="font-playfair">Popular Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Summer Fashion Trends 2024</p>
                        <p className="text-sm text-muted-foreground">Fashion Trends</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>1,234</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>89</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">10 Beauty Tips for Glowing Skin</p>
                        <p className="text-sm text-muted-foreground">Beauty Tips</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>987</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>76</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elegant border-0">
                <CardHeader>
                  <CardTitle className="font-playfair">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <p className="text-sm">New subscriber: jane@example.com</p>
                      <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      <p className="text-sm">Blog post published: "Winter Style Guide"</p>
                      <span className="text-xs text-muted-foreground ml-auto">5 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                      <p className="text-sm">Newsletter sent to 150 subscribers</p>
                      <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="shadow-elegant border-0">
              <CardHeader>
                <CardTitle className="font-playfair">Site Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Site Name</label>
                    <Input defaultValue="Times of Fashion" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Email</label>
                    <Input defaultValue="contact@timesoffashion.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Site Description</label>
                  <Input defaultValue="Your ultimate destination for fashion trends and beauty tips" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Instagram</label>
                    <Input placeholder="@timesoffashion" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Twitter</label>
                    <Input placeholder="@timesoffashion" />
                  </div>
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

export default AdminDashboard;
