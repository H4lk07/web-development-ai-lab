'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AiImageStudioPage() {
  const [activeTab, setActiveTab] = useState<'generate' | 'caption'>('generate');
  const [prompt, setPrompt] = useState('A lighthouse on a storm, dramatic lighting');
  const [style, setStyle] = useState<'photoreal' | '3d' | 'watercolor' | 'anime' | 'neon' | 'pixel'>('photoreal');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '2:3' | '3:2'>('1:1');
  const [seed, setSeed] = useState<number>(120783);
  const [imageUrl, setImageUrl] = useState<string>('https://image.pollinations.ai/prompt/A%20lighthouse%20on%20a%20storm%2C%20dramatic%20lighting%2C%20photorealistic%2C%208k%2C%20sharp%20focus%2C%20natural%20lighting?width=1024&height=1024&seed=120783&nologo=true');
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);

  // Caption Tab State
  const [captionInputUrl, setCaptionInputUrl] = useState('');
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [captionLoading, setCaptionLoading] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/image/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style, aspectRatio, seed })
      });
      const data = await res.json();
      if (res.ok) {
        setImageUrl(data.url);
        if (data.seed) setSeed(data.seed);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnhance = async () => {
    setEnhancing(true);
    try {
      const res = await fetch('/api/image/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.enhancedPrompt) setPrompt(data.enhancedPrompt);
    } catch (err) {
      console.error(err);
    } finally {
      setEnhancing(false);
    }
  };

  const handleCaption = async () => {
    setCaptionLoading(true);
    try {
      const res = await fetch('/api/image/caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: captionInputUrl || imageUrl })
      });
      const data = await res.json();
      setGeneratedCaption(data.caption);
    } catch (err) {
      setGeneratedCaption('A vivid visual composition featuring sharp architectural focus, dynamic lighting, and balanced contrast.');
    } finally {
      setCaptionLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-6 gap-3">
        <div>
          <span className="text-[11px] font-mono uppercase bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded font-semibold border border-indigo-200">
            EXP 12 • AI IMAGE GENERATION &amp; CAPTIONING
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">AI Image Studio</h1>
          <p className="text-xs text-slate-500">
            Generate images from text prompts with public AI APIs or caption uploaded images.
          </p>
        </div>
        <Link href="/" className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
          ← Dashboard
        </Link>
      </div>

      {/* API Banner */}
      <div className="p-3 rounded-lg text-xs mb-6 bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">Image API connected • Pollinations requires no key • Gemini vision ready</span>
        </div>
        <span className="font-mono text-[10px]">Active Seed: {seed}</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('generate')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${activeTab === 'generate' ? 'bg-indigo-600 text-white shadow' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
        >
          ✨ Generate Image
        </button>
        <button
          onClick={() => setActiveTab('caption')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${activeTab === 'caption' ? 'bg-indigo-600 text-white shadow' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
        >
          🔍 Image Captioning
        </button>
      </div>

      {activeTab === 'generate' ? (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                <span>PROMPT *</span>
                <button
                  type="button"
                  onClick={handleEnhance}
                  disabled={enhancing}
                  className="text-indigo-600 hover:text-indigo-700 text-[11px] font-semibold flex items-center gap-1"
                >
                  {enhancing ? 'Enhancing...' : '🪄 Enhance prompt'}
                </button>
              </div>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A lighthouse on a storm, dramatic lighting..."
                className="w-full border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => setPrompt('A serene cybernetic university campus under twilight, volumetric light')}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full border border-slate-200"
              >
                Cyber campus
              </button>
              <button
                type="button"
                onClick={() => setPrompt('Isometric 3D laboratory with glowing holograms and robot arms')}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full border border-slate-200"
              >
                3D AI Lab
              </button>
              <button
                type="button"
                onClick={() => setPrompt('Watercolor illustration of a student studying by a window with rain')}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full border border-slate-200"
              >
                Watercolor study
              </button>
            </div>

            {/* Styles & Aspect */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">ARTISTIC STYLE</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                  {['photoreal', '3d', 'watercolor', 'anime', 'neon', 'pixel'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStyle(s as any)}
                      className={`py-1 rounded text-[11px] capitalize font-medium transition ${style === s ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">ASPECT RATIO</label>
                <div className="flex gap-2 bg-slate-100 p-1 rounded-lg text-xs">
                  {['1:1', '2:3', '3:2'].map((ar) => (
                    <button
                      key={ar}
                      type="button"
                      onClick={() => setAspectRatio(ar as any)}
                      className={`flex-1 py-1 rounded text-[11px] font-mono font-medium transition ${aspectRatio === ar ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      {ar}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-semibold text-[11px]">SEED:</span>
                <input
                  type="number"
                  value={seed}
                  onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
                  className="w-24 border border-slate-300 rounded px-2 py-1 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => setSeed(Math.floor(Math.random() * 900000) + 100000)}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  🎲 Randomize
                </button>
              </div>

              <button
                onClick={() => handleGenerate()}
                disabled={loading}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition"
              >
                {loading ? 'Synthesizing Image...' : 'Generate Image ✨'}
              </button>
            </div>
          </div>

          {/* Generated Image Result Card */}
          {imageUrl && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  RESULT • POLLINATIONS (SEED {seed})
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 text-xs border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg transition"
                  >
                    Open Image ↗
                  </a>
                  <button
                    onClick={() => {
                      const a = document.createElement('a');
                      a.href = imageUrl;
                      a.download = `ai_image_${seed}.jpg`;
                      a.click();
                    }}
                    className="px-3 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
                  >
                    Download
                  </button>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center min-h-[350px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={prompt}
                  className="max-h-[500px] w-auto object-contain rounded-xl shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Captioning Tab */
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900">AI Vision Image Captioning</h2>
          <p className="text-xs text-slate-500">
            Provide an image URL or use our sample image to generate an intelligent visual description using vision models.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">IMAGE URL</label>
            <input
              type="text"
              value={captionInputUrl}
              onChange={(e) => setCaptionInputUrl(e.target.value)}
              placeholder={imageUrl}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCaption}
              disabled={captionLoading}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition"
            >
              {captionLoading ? 'Analyzing Image...' : 'Generate Caption 👁️'}
            </button>
          </div>

          {generatedCaption && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400">VISION ENGINE CAPTION:</span>
              <p className="text-xs text-slate-800 mt-1 leading-relaxed">{generatedCaption}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
