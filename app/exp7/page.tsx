'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RestApiTestingPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('GET /api/products');
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<string>('');
  const [responseBody, setResponseBody] = useState<string>('// Click "Send Request" to test the live endpoint.');
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'response' | 'headers'>('response');

  const executeRequest = async () => {
    setLoading(true);
    setResponseBody('Loading response from REST server...');

    try {
      let method = 'GET';
      let url = '/api/products';
      let body: any = null;

      if (selectedEndpoint === 'GET /api/products') {
        url = '/api/products?page=1&limit=5';
      } else if (selectedEndpoint === 'GET /api/products/prod_1') {
        url = '/api/products/prod_1';
      } else if (selectedEndpoint === 'POST /api/products') {
        method = 'POST';
        url = '/api/products';
        body = JSON.stringify({
          name: 'Acoustic Wireless Headphones',
          description: 'Active noise cancellation with 40-hour battery life',
          category: 'electronics',
          price: 149.99,
          quantity: 20,
          inStock: true
        });
      } else if (selectedEndpoint === 'PUT /api/products/prod_1') {
        method = 'PUT';
        url = '/api/products/prod_1';
        body = JSON.stringify({
          name: 'Tidewave Desk Lamp Pro',
          description: 'Updated LED Lamp with dual USB-C ports',
          category: 'home',
          price: 59.99,
          quantity: 15,
          inStock: true
        });
      } else if (selectedEndpoint === 'DELETE /api/products/prod_4') {
        method = 'DELETE';
        url = '/api/products/prod_4';
      } else if (selectedEndpoint === 'GET /api/products/invalid_404') {
        url = '/api/products/invalid_404';
      }

      const startTime = performance.now();
      const res = await fetch(url, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : {}
      });
      const endTime = performance.now();
      const elapsed = (endTime - startTime).toFixed(1);

      setResponseStatus(res.status);
      setResponseHeaders(`Status: ${res.status} ${res.statusText}\nTime: ${elapsed}ms\nContent-Type: ${res.headers.get('content-type')}`);

      if (res.status === 204) {
        setResponseBody('// 204 No Content - Record deleted successfully');
      } else {
        const json = await res.json();
        setResponseBody(JSON.stringify(json, null, 2));
      }
    } catch (err: any) {
      setResponseStatus(500);
      setResponseBody(JSON.stringify({ error: 'Connection Failure', message: err.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-6 gap-3">
        <div>
          <span className="text-[11px] font-mono uppercase bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded font-semibold border border-indigo-200">
            EXP 7 • RESTFUL APIS &amp; POSTMAN TESTING
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Product Catalog REST API</h1>
          <p className="text-xs text-slate-500">
            OpenAPI 3.0 Documentation + Swagger UI + Automated Postman Test Collection.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="http://localhost:5000/api-docs"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow transition"
          >
            Open Swagger UI ↗
          </a>
          <Link href="/" className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* Postman-Like Live Workbench */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden mb-8">
        {/* URL Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2">
            <span className="text-xs font-mono font-bold text-emerald-400">
              {selectedEndpoint.split(' ')[0]}
            </span>
            <select
              value={selectedEndpoint}
              onChange={(e) => setSelectedEndpoint(e.target.value)}
              className="bg-transparent text-xs font-mono text-slate-200 w-full focus:outline-none"
            >
              <option value="GET /api/products" className="bg-slate-900">http://localhost:5000/api/products?page=1&amp;limit=5</option>
              <option value="GET /api/products/prod_1" className="bg-slate-900">http://localhost:5000/api/products/prod_1</option>
              <option value="POST /api/products" className="bg-slate-900">POST http://localhost:5000/api/products (Create)</option>
              <option value="PUT /api/products/prod_1" className="bg-slate-900">PUT http://localhost:5000/api/products/prod_1 (Update)</option>
              <option value="DELETE /api/products/prod_4" className="bg-slate-900">DELETE http://localhost:5000/api/products/prod_4</option>
              <option value="GET /api/products/invalid_404" className="bg-slate-900">GET http://localhost:5000/api/products/invalid_404 (404 Test)</option>
            </select>
          </div>

          <button
            onClick={executeRequest}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
          >
            {loading ? 'Sending...' : 'Send Request'}
          </button>
        </div>

        {/* Response Meta */}
        <div className="px-5 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('response')}
              className={`font-semibold pb-1 border-b-2 transition ${activeTab === 'response' ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              Response Body
            </button>
            <button
              onClick={() => setActiveTab('headers')}
              className={`font-semibold pb-1 border-b-2 transition ${activeTab === 'headers' ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              Headers &amp; Status
            </button>
          </div>

          {responseStatus !== null && (
            <div className="flex items-center gap-3">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${responseStatus >= 200 && responseStatus < 300 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                {responseStatus} {responseStatus === 200 ? 'OK' : responseStatus === 201 ? 'CREATED' : responseStatus === 204 ? 'NO CONTENT' : responseStatus === 404 ? 'NOT FOUND' : 'RESPONSE'}
              </span>
            </div>
          )}
        </div>

        {/* Console / Output Window */}
        <div className="p-4 bg-slate-950 font-mono text-xs overflow-x-auto min-h-[320px] max-h-[480px]">
          {activeTab === 'response' ? (
            <pre className="text-emerald-400 leading-relaxed">{responseBody}</pre>
          ) : (
            <pre className="text-slate-300 leading-relaxed">{responseHeaders || '// Send a request to inspect response headers'}</pre>
          )}
        </div>
      </div>

      {/* Postman Collection Documentation Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-sm mb-2">Exported Postman Artifacts</h3>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          The project includes an official Postman collection v2.1 containing 10 ordered test cases covering health checks, product CRUD, boundary validations, whitelisted query sorting, and 404/400 error codes.
        </p>

        <div className="flex flex-wrap gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-slate-700 flex items-center gap-2">
            <span>📦 postman/exp7.postman_collection.json</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-slate-700 flex items-center gap-2">
            <span>⚙️ postman/exp7.environment.json</span>
          </div>
        </div>
      </div>
    </div>
  );
}
