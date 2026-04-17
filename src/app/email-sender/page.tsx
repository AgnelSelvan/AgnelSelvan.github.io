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

      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      alert('Failed to send emails');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', padding: '5rem 0', background: '#05070a', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <div className="premium-container">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', lineHeight: 1.2 }}>
          Send Resume to <span className="gradient-text">Multiple companies in one click</span>
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '3rem' }}>
          {/* Form */}
          <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>1. Upload Contacts (CSV)</label>
                <input type="file" accept=".csv" onChange={handleFileUpload} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--card-border)', fontSize: '0.8rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>2. Select Resume (PDF)</label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--card-border)', fontSize: '0.8rem' }} />
                {resume && <p style={{ fontSize: '0.7rem', color: '#FFD700', marginTop: '0.3rem' }}>Attached: {resume.filename}</p>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Gmail Address</label>
                <input 
                  type="email" 
                  value={form.senderEmail} 
                  onChange={e => setForm({...form, senderEmail: e.target.value})}
                  placeholder="you@gmail.com" 
                  style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--card-border)', color: 'white' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>App Password</label>
                <input 
                  type="password" 
                  value={form.senderPassword} 
                  onChange={e => setForm({...form, senderPassword: e.target.value})}
                  placeholder="xxxx xxxx xxxx xxxx" 
                  style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--card-border)', color: 'white' }} 
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Message Template</label>
              <textarea 
                rows={6}
                value={form.body}
                onChange={e => setForm({...form, body: e.target.value})}
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--card-border)', color: 'white', fontSize: '0.9rem' }}
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
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
          <div className="glass-card" style={{ padding: '2.5rem', overflowY: 'auto', maxHeight: '80vh' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Real-time Delivery Status</h3>
            {results.length === 0 ? (
              <div>
                <p style={{ color: 'var(--text-dim)' }}>Waiting for action...</p>
                {csvData.length > 0 && (
                  <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ marginBottom: '1rem', color: '#FFD700' }}>Queue Preview</h4>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                      {csvData.slice(0, 10).map((row, i) => (
                        <div key={i} style={{ marginBottom: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.2rem' }}>
                          <span style={{ color: 'white' }}>{row.email}</span> → {row.role}
                        </div>
                      ))}
                      {csvData.length > 10 && <div>...and {csvData.length - 10} more</div>}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {results.map((res, i) => (
                  <div key={i} style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `4px solid ${res.status === 'sent' ? '#FFD700' : '#ff4444'}` }}>
                    <div style={{ fontSize: '0.9rem' }}>
                      <div style={{ fontWeight: 600 }}>{res.email}</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: res.status === 'sent' ? '#FFD700' : '#ff4444' }}>{res.status.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .premium-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .gradient-text { background: linear-gradient(135deg, #FFD700 0%, #FF8C00 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; }
        .btn-primary { background: linear-gradient(135deg, #FFD700 0%, #FF8C00 100%); color: black; border: none; padding: 15px; border-radius: 12px; font-weight: 700; transition: transform 0.2s; }
        .btn-primary:active { transform: scale(0.98); }
      `}</style>
    </main>
  );
}
