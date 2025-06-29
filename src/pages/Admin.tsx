import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, Trash2, Edit, Upload, LogOut, X } from 'lucide-react';
import { getFullUrl } from '@/lib/utils';

const API = '/api';

const defaultBlog = {
  title: '',
  description: '',
  content: '',
  category: '',
  author: { name: '', designation: '', bio: '' },
  coverImage: '',
  attachments: [],
  tags: [],
  isPublished: true,
  slug: '',
};

const Admin = () => {
  // Auth state
  const [step, setStep] = useState('otp-request'); // 'otp-request', 'otp-verify', 'dashboard'
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [emailSent, setEmailSent] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  // Blog state
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [blogError, setBlogError] = useState('');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...defaultBlog });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingAttachments, setUploadingAttachments] = useState(false);

  // Add state for upload progress
  const [imageUploadProgress, setImageUploadProgress] = useState('');
  const [attachmentsUploadProgress, setAttachmentsUploadProgress] = useState('');

  // Categories (should match backend enum)
  const categories = [
    'Personal Finance', 'Investment', 'Business', 'Technology', 'AI & Technology',
    'Cloud Computing', 'Data Management', 'Machine Learning', 'DevOps', 'Integration'
  ];

  // Add new state for send status
  const [sendStatus, setSendStatus] = useState({}); // { [slug]: 'idle' | 'loading' | 'success' | 'error' }

  // Auth: OTP request
  const requestOtp = async () => {
    setOtpLoading(true);
    setOtpError('');
    try {
      const res = await fetch(`${API}/auth/send-otp`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to send OTP');
      setEmailSent(true);
      setStep('otp-verify');
    } catch (e) {
      setOtpError(e.message || 'Error sending OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  // Auth: OTP verify
  const verifyOtp = async () => {
    setOtpLoading(true);
    setOtpError('');
    try {
      const res = await fetch(`${API}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });
      if (!res.ok) throw new Error('Invalid OTP');
      const data = await res.json();
      setToken(data.token);
      localStorage.setItem('adminToken', data.token);
      setStep('dashboard');
      fetchBlogs(data.token);
    } catch (e) {
      setOtpError(e.message || 'Error verifying OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setToken('');
    localStorage.removeItem('adminToken');
    setStep('otp-request');
    setBlogs([]);
  };

  // Fetch blogs (admin)
  const fetchBlogs = async (tk = token) => {
    setLoadingBlogs(true);
    setBlogError('');
    try {
      const res = await fetch(`${API}/blog/posts`, {
        headers: { Authorization: `Bearer ${tk}` },
      });
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (e) {
      setBlogError(e.message || 'Error fetching blogs');
    } finally {
      setLoadingBlogs(false);
    }
  };

  useEffect(() => {
    if (token) {
      setStep('dashboard');
      fetchBlogs();
    }
  }, [token]);

  // Handle form field changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('author.')) {
      setForm({ ...form, author: { ...form.author, [name.split('.')[1]]: value } });
    } else if (name === 'tags') {
      setForm({ ...form, tags: value.split(',').map(t => t.trim()).filter(Boolean) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add the exact cover image upload handler from AdminDashboard
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      alert('Please log in to upload files');
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(`${API}/blog/upload-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        },
        body: formData
      });
      if (!response.ok) {
        if (response.status === 401) {
          alert('Session expired. Please log in again.');
          return;
        }
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload image');
      }
      const data = await response.json();
      if (!data.imageUrl) throw new Error('No imageUrl returned from server');
      setForm(prev => ({
        ...prev,
        coverImage: data.imageUrl
      }));
      if (e.target) e.target.value = '';
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  // Handle attachments upload
  const handleAttachmentsUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingAttachments(true);
    setAttachmentsUploadProgress('Uploading...');
    setFormError('');
    try {
      const formData = new FormData();
      Array.from(files).forEach((file: File) => {
        formData.append('files', file);
      });
      const res = await fetch(`${API}/blog/upload-attachments`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error('Attachments upload failed');
      const data = await res.json();
      if (!data.attachments) throw new Error('No attachments returned from server');
      setForm(prev => ({
        ...prev,
        attachments: [...(prev.attachments || []), ...data.attachments]
      }));
      if (e.target) e.target.value = '';
      setAttachmentsUploadProgress('');
    } catch (e) {
      setFormError(e.message || 'Error uploading attachments');
      setAttachmentsUploadProgress('Failed');
    } finally {
      setUploadingAttachments(false);
    }
  };

  // Handle blog create/update
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    try {
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `${API}/blog/posts/${form.slug}` : `${API}/blog/posts`;
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Error saving blog');
      }
      setForm({ ...defaultBlog });
      setEditing(false);
      fetchBlogs();
    } catch (e) {
      setFormError(e.message || 'Error saving blog');
    } finally {
      setFormLoading(false);
    }
  };

  // Edit blog
  const handleEdit = (blog) => {
    setForm({ ...blog, tags: blog.tags || [], attachments: blog.attachments || [], author: blog.author || { name: '', designation: '', bio: '' }, slug: blog.slug });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete blog
  const handleDelete = async (identifier) => {
    if (!window.confirm('Delete this blog post?')) return;
    setBlogError('');
    try {
      const res = await fetch(`${API}/blog/posts/${identifier}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error deleting blog');
      fetchBlogs();
    } catch (e) {
      setBlogError(e.message || 'Error deleting blog');
    }
  };

  // Remove attachment
  const handleRemoveAttachment = (idx) => {
    setForm({ ...form, attachments: form.attachments.filter((_, i) => i !== idx) });
  };

  // Handle send to subscribers
  const handleSendToSubscribers = async (blog) => {
    setSendStatus(prev => ({ ...prev, [blog.slug]: 'loading' }));
    try {
      const res = await fetch(`${API}/blog/send-to-subscribers/${blog.slug}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to send to subscribers');
      setSendStatus(prev => ({ ...prev, [blog.slug]: 'success' }));
      setTimeout(() => setSendStatus(prev => ({ ...prev, [blog.slug]: 'idle' })), 3000);
    } catch (e) {
      setSendStatus(prev => ({ ...prev, [blog.slug]: 'error' }));
      setTimeout(() => setSendStatus(prev => ({ ...prev, [blog.slug]: 'idle' })), 3000);
    }
  };

  // UI
  if (step === 'otp-request') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Request OTP to your admin email</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={requestOtp} disabled={otpLoading} className="w-full">
              {otpLoading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
            {otpError && <div className="text-red-500 mt-2">{otpError}</div>}
          </CardContent>
        </Card>
      </div>
    );
  }
  if (step === 'otp-verify') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verify OTP</CardTitle>
            <CardDescription>Enter the OTP sent to your admin email</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="mb-4"
            />
            <Button onClick={verifyOtp} disabled={otpLoading || !otp} className="w-full">
              {otpLoading ? 'Verifying...' : 'Verify OTP'}
            </Button>
            {otpError && <div className="text-red-500 mt-2">{otpError}</div>}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Blog Admin Dashboard</h1>
          <Button variant="outline" onClick={logout}><LogOut className="w-4 h-4 mr-2" />Logout</Button>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editing ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <Input name="title" placeholder="Title" value={form.title} onChange={handleFormChange} required />
              <Input name="description" placeholder="Description" value={form.description} onChange={handleFormChange} required />
              <Textarea name="content" placeholder="Content (HTML allowed)" value={form.content} onChange={handleFormChange} rows={6} required />
              <select name="category" value={form.category} onChange={handleFormChange} required className="w-full border rounded p-2">
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <div className="flex gap-2">
                <Input name="author.name" placeholder="Author Name" value={form.author.name} onChange={handleFormChange} required />
                <Input name="author.designation" placeholder="Designation" value={form.author.designation} onChange={handleFormChange} required />
              </div>
              <Textarea name="author.bio" placeholder="Author Bio" value={form.author.bio} onChange={handleFormChange} rows={2} required />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Cover Image</h3>
                <div className="space-y-2">
                  <label htmlFor="coverImage">Cover Image</label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="coverImage"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                    {form.coverImage && (
                      <div className="relative w-20 h-20">
                        <img
                          src={getFullUrl(form.coverImage)}
                          alt="Cover"
                          className="w-full h-full object-cover rounded"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2"
                          onClick={() => setForm({ ...form, coverImage: '' })}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Attachments</label>
                <Input type="file" multiple onChange={handleAttachmentsUpload} disabled={uploadingAttachments} />
                {attachmentsUploadProgress && <div className="text-xs text-gray-500 mt-1">{attachmentsUploadProgress}</div>}
                <ul className="mt-2 space-y-1">
                  {form.attachments.map((att, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <a href={att.url} target="_blank" rel="noopener noreferrer" className="underline">{att.name}</a>
                      <Button type="button" size="icon" variant="ghost" onClick={() => handleRemoveAttachment(idx)}>
                        <span className="sr-only">Remove</span>X
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <Input name="tags" placeholder="Tags (comma separated)" value={form.tags.join(', ')} onChange={handleFormChange} />
              <div className="flex items-center gap-2">
                <Switch checked={form.isPublished} onCheckedChange={v => setForm({ ...form, isPublished: v })} />
                <span>Published</span>
              </div>
              <Button type="submit" className="w-full" disabled={formLoading}>{formLoading ? (editing ? 'Saving...' : 'Creating...') : (editing ? 'Save Changes' : 'Create Blog')}</Button>
              {formError && <div className="text-red-500 mt-2">{formError}</div>}
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>All Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingBlogs ? <div>Loading blogs...</div> : blogError ? <div className="text-red-500">{blogError}</div> : (
              <ul className="divide-y">
                {blogs.map(blog => (
                  <li key={blog.slug} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{blog.title}</div>
                      <div className="text-xs text-gray-500">{blog.category}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(blog)}><Edit className="w-4 h-4" /></Button>
                      <Button size="icon" variant="destructive" onClick={() => handleDelete(blog._id || blog.slug)}><Trash2 className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline" onClick={() => handleSendToSubscribers(blog)} disabled={sendStatus[blog.slug]==='loading'}>
                        {sendStatus[blog.slug]==='loading' ? 'Sending...' : sendStatus[blog.slug]==='success' ? 'Sent!' : sendStatus[blog.slug]==='error' ? 'Error' : 'Send to Subscribers'}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin; 