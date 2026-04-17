'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';

export default function BulkUpload() {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [resume, setResume] = useState<{ content: string; filename: string } | null>(null);
  const [form, setForm] = useState({
    senderEmail: '',
    senderPassword: '',
    body: `Hi {hr_name},\n\nI am writing to express my interest in the {role} role at {company_name}. I am an immediate joiner with extensive experience in mobile development.\n\nPlease find my resume attached.\n\nBest regards,\nAgnel Selvan`
  });

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setCsvData(results.data);
        }
      });
    }
  };

  const handleResumeUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev: any) => {
        setResume({
          content: ev.target.result.split(',')[1],
          filename: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!csvData.length || !form.senderEmail || !form.senderPassword) {
      alert('Please fill all fields and upload CSV');
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const response = await fetch('/api/send-bulk-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          csvData,
          senderEmail: form.senderEmail,
          senderPassword: form.senderPassword,
          body: form.body,
          resume: resume
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send emails');
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'An unexpected error occurred while sending emails.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-container">
      <div className="premium-container">
        <h1 className="title">
          Send Resume to <span className="gradient-text">Multiple companies in one click</span>
        </h1>

        <div className="main-grid">
          {/* Form */}
          <div className="glass-card form-section">
            <div className="input-grid">
              <div>
                <label className="input-label">1. Upload Contacts (CSV)</label>
                <input type="file" accept=".csv" onChange={handleFileUpload} className="file-input" />
                <p className="helper-text">
                  Required columns: <code className="code-highlight">email, name, company, role</code>
                </p>
              </div>
              <div>
                <label className="input-label">2. Select Resume (PDF)</label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} className="file-input" />
                {resume && <p className="attach-text">Attached: {resume.filename}</p>}
              </div>
            </div>

            <div className="input-grid">
              <div>
                <label className="input-label">Gmail Address</label>
                <input
                  type="email"
                  value={form.senderEmail}
                  onChange={e => setForm({ ...form, senderEmail: e.target.value })}
                  placeholder="you@gmail.com"
                  className="text-input"
                />
              </div>
              <div>
                <label className="input-label">App Password</label>
                <input
                  type="password"
                  value={form.senderPassword}
                  onChange={e => setForm({ ...form, senderPassword: e.target.value })}
                  placeholder="xxxx xxxx xxxx xxxx"
                  className="text-input"
                />
              </div>
            </div>

            <div>
              <label className="input-label" style={{ fontSize: '1rem' }}>Message Template</label>
              <textarea
                rows={6}
                value={form.body}
                onChange={e => setForm({ ...form, body: e.target.value })}
                className="text-input"
                style={{ fontSize: '0.9rem' }}
              />
              <p className="helper-text">
                Placeholders: {'{hr_name}'}, {'{company_name}'}, {'{role}'}
              </p>
            </div>

            <button
              onClick={handleSend}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, padding: '1.25rem' }}
            >
              {loading ? 'Sending Emails...' : `Send Application to ${csvData.length} Recipients`}
            </button>
          </div>

          {/* results preview */}
          <div className="glass-card results-section">
            <h3 style={{ marginBottom: '1.5rem' }}>Real-time Delivery Status</h3>
            {results.length === 0 ? (
              <div>
                <p style={{ color: 'var(--text-dim)' }}>Waiting for action...</p>
                {csvData.length > 0 && (
                  <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ marginBottom: '1rem', color: '#FFD700' }}>Queue Preview</h4>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                      {csvData.slice(0, 10).map((row, i) => (
                        <div key={i} className="queue-item">
                          <span style={{ color: 'white' }}>{row.email}</span> → {row.role}
                        </div>
                      ))}
                      {csvData.length > 10 && <div className="more-count">...and {csvData.length - 10} more</div>}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="results-list">
                {results.map((res, i) => (
                  <div key={i} className="result-item" style={{ borderLeft: `4px solid ${res.status === 'sent' ? '#FFD700' : '#ff4444'}` }}>
                    <div style={{ fontSize: '0.9rem' }}>
                      <div style={{ fontWeight: 600 }}>{res.email}</div>
                    </div>
                    <span className="status-badge" style={{ color: res.status === 'sent' ? '#FFD700' : '#ff4444' }}>{res.status.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        :root {
          --card-border: rgba(255, 255, 255, 0.1);
          --text-dim: rgba(255, 255, 255, 0.6);
        }
        .main-container { min-height: 100vh; padding: 5rem 1rem; background: #05070a; color: white; font-family: 'Inter, sans-serif'; }
        .premium-container { max-width: 1200px; margin: 0 auto; }
        .title { font-size: 2.5rem; margin-bottom: 2rem; line-height: 1.2; text-align: center; }
        .gradient-text { background: linear-gradient(135deg, #FFD700 0%, #FF8C00 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); border: 1px solid var(--card-border); border-radius: 20px; padding: 2.5rem; }
        .form-section { display: flex; flex-direction: column; gap: 1.5rem; }
        .input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .input-label { display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem; }
        .file-input { width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 8px; border: 1px solid var(--card-border); font-size: 0.8rem; color: white; }
        .text-input { width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; border: 1px solid var(--card-border); color: white; }
        .helper-text { font-size: 0.7rem; color: var(--text-dim); margin-top: 0.4rem; }
        .code-highlight { color: #FFD700; }
        .attach-text { font-size: 0.7rem; color: #FFD700; margin-top: 0.3rem; }
        .btn-primary { background: linear-gradient(135deg, #FFD700 0%, #FF8C00 100%); color: black; border: none; padding: 15px; border-radius: 12px; font-weight: 700; transition: transform 0.2s; }
        .btn-primary:active { transform: scale(0.98); }
        .results-section { overflow-y: auto; max-height: 80vh; }
        .results-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .result-item { padding: 0.75rem 1rem; background: rgba(255,255,255,0.03); border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
        .status-badge { font-size: 0.75rem; font-weight: 800; }
        .queue-item { margin-bottom: 0.4rem; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 0.2rem; }
        .more-count { font-size: 0.85rem; color: var(--text-dim); }

        @media (max-width: 1024px) {
          .main-grid { grid-template-columns: 1fr; gap: 2rem; }
          .title { font-size: 2rem; }
        }

        @media (max-width: 640px) {
          .main-container { padding: 2rem 1rem; }
          .input-grid { grid-template-columns: 1fr; }
          .glass-card { padding: 1.5rem; }
          .title { font-size: 1.75rem; }
          .btn-primary { padding: 1rem; }
        }
      `}</style>
    </main>

  );
}
