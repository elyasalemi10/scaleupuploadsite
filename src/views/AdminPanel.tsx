'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Lock, LogOut, Paperclip, Send, X, CheckCircle2, AlertCircle } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const SENDING_DOMAIN = 'scaleupwithai.ai';
const MAX_ATTACHMENTS = 5;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = () => {
      const result = String(reader.result || '');
      const idx = result.indexOf(',');
      resolve(idx >= 0 ? result.slice(idx + 1) : '');
    };
    reader.readAsDataURL(file);
  });
}

function buildAuthHeader(creds) {
  return 'Basic ' + btoa(`${creds.username}:${creds.password}`);
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function AdminPanel() {
  const [credentials, setCredentials] = useState(null);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [name, setName] = useState('');
  const [prefix, setPrefix] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [sendSuccess, setSendSuccess] = useState('');

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    const prevTitle = document.title;
    document.title = 'Admin';
    return () => {
      document.head.removeChild(meta);
      document.title = prevTitle;
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!loginUser || !loginPass) {
      setLoginError('Username and password are required');
      return;
    }
    setLoginLoading(true);
    try {
      const creds = { username: loginUser, password: loginPass };
      const res = await fetch(`${API_BASE_URL}/api/admin-verify`, {
        method: 'POST',
        headers: {
          Authorization: buildAuthHeader(creds),
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200) {
        setCredentials(creds);
        setLoginPass('');
      } else if (res.status === 401) {
        setLoginError('Invalid username or password');
      } else {
        setLoginError('Server error, please try again');
      }
    } catch {
      setLoginError('Network error, please try again');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setCredentials(null);
    setLoginUser('');
    setLoginPass('');
    setName('');
    setPrefix('');
    setTo('');
    setSubject('');
    setBody('');
    setFiles([]);
    setSendError('');
    setSendSuccess('');
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    setSendError('');
    setSendSuccess('');
    const merged = [...files];
    for (const f of selected) {
      if (merged.length >= MAX_ATTACHMENTS) break;
      merged.push(f);
    }
    const totalBytes = merged.reduce((sum, f) => sum + f.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      setSendError(`Attachments exceed 4 MB total (currently ${formatBytes(totalBytes)})`);
    }
    setFiles(merged);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setSendError('');
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setSendError('');
    setSendSuccess('');

    if (!name.trim() || !prefix.trim() || !to.trim() || !subject.trim() || !body) {
      setSendError('Please fill in name, prefix, recipient, subject, and body');
      return;
    }
    if (files.length > MAX_ATTACHMENTS) {
      setSendError(`Maximum ${MAX_ATTACHMENTS} attachments`);
      return;
    }
    const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      setSendError(`Attachments exceed 4 MB total (currently ${formatBytes(totalBytes)})`);
      return;
    }

    setSending(true);
    try {
      const attachments = await Promise.all(
        files.map(async (f) => ({
          filename: f.name,
          content: await readFileAsBase64(f),
        }))
      );

      const res = await fetch(`${API_BASE_URL}/api/admin-send-email`, {
        method: 'POST',
        headers: {
          Authorization: buildAuthHeader(credentials),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          prefix: prefix.trim(),
          to: to.trim(),
          subject: subject.trim(),
          body,
          attachments,
        }),
      });

      if (res.status === 401) {
        setCredentials(null);
        setSendError('Session expired, please log in again');
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSendError(data.error || `Failed to send (HTTP ${res.status})`);
        return;
      }

      setSendSuccess(`Email sent to ${to.trim()}`);
      setTo('');
      setSubject('');
      setBody('');
      setFiles([]);
    } catch {
      setSendError('Network error, please try again');
    } finally {
      setSending(false);
    }
  };

  if (!credentials) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mb-3">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Admin Sign In</h1>
            <p className="text-sm text-gray-500 mt-1">Restricted area</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
            <div>
              <Label htmlFor="admin-user">Username</Label>
              <Input
                id="admin-user"
                type="text"
                autoComplete="username"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                disabled={loginLoading}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="admin-pass">Password</Label>
              <Input
                id="admin-pass"
                type="password"
                autoComplete="current-password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                disabled={loginLoading}
                className="mt-1"
              />
            </div>

            {loginError && (
              <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <Button type="submit" disabled={loginLoading} className="w-full">
              {loginLoading ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Send Email</h1>
            <p className="text-sm text-gray-500">From any address @{SENDING_DOMAIN}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} type="button">
            <LogOut className="w-4 h-4 mr-1" />
            Sign out
          </Button>
        </div>

        <form
          onSubmit={handleSend}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5"
          autoComplete="off"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from-name">Sender name</Label>
              <Input
                id="from-name"
                type="text"
                placeholder="Accounts"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                className="mt-1"
                disabled={sending}
              />
            </div>
            <div>
              <Label htmlFor="from-prefix">Email prefix</Label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <Input
                  id="from-prefix"
                  type="text"
                  placeholder="accounts"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  maxLength={64}
                  className="rounded-r-none"
                  disabled={sending}
                />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
                  @{SENDING_DOMAIN}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Letters, digits, and . _ + - only</p>
            </div>
          </div>

          <div>
            <Label htmlFor="to-email">Recipient</Label>
            <Input
              id="to-email"
              type="email"
              placeholder="someone@example.com"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              maxLength={254}
              className="mt-1"
              disabled={sending}
            />
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              maxLength={200}
              className="mt-1"
              disabled={sending}
            />
          </div>

          <div>
            <Label htmlFor="body">Body</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={16}
              maxLength={50000}
              className="mt-1 min-h-[320px] font-sans whitespace-pre-wrap"
              style={{ whiteSpace: 'pre-wrap' }}
              disabled={sending}
            />
            <p className="text-xs text-gray-500 mt-1">Empty lines and whitespace are preserved.</p>
          </div>

          <div>
            <Label>Attachments ({files.length}/{MAX_ATTACHMENTS})</Label>
            <div className="mt-1 flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                disabled={sending || files.length >= MAX_ATTACHMENTS}
              >
                <Paperclip className="w-4 h-4 mr-1" />
                Add files
              </Button>
              <span className="text-xs text-gray-500">
                {formatBytes(totalBytes)} / 4 MB total
              </span>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {files.length > 0 && (
              <ul className="mt-3 space-y-2">
                {files.map((f, i) => (
                  <li
                    key={`${f.name}-${i}`}
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm"
                  >
                    <div className="min-w-0 flex-1 truncate">
                      <span className="font-medium text-gray-900 truncate">{f.name}</span>
                      <span className="text-gray-500 ml-2">{formatBytes(f.size)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      disabled={sending}
                      className="text-gray-400 hover:text-red-600 ml-3"
                      aria-label={`Remove ${f.name}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {sendError && (
            <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{sendError}</span>
            </div>
          )}
          {sendSuccess && (
            <div className="flex items-start gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{sendSuccess}</span>
            </div>
          )}

          <div className="flex items-center justify-end pt-2 border-t border-gray-100">
            <Button type="submit" disabled={sending}>
              <Send className="w-4 h-4 mr-1" />
              {sending ? 'Sending…' : 'Send email'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}