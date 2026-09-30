import express from 'express';
import os from 'os';

const app = express();
const PORT = 3000;

app.get("*", (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mohamed • Cloud Workspace</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body {
      background: radial-gradient(circle at top, #1a233a 0%, #080d1a 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #e2e8f0;
      padding: 20px;
    }
    .card {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(16px);
      border-radius: 24px;
      padding: 40px;
      max-width: 520px;
      width: 100%;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399;
      padding: 6px 16px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 24px;
    }
    .badge-dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 10px #10b981;
    }
    h1 {
      font-size: 30px;
      font-weight: 700;
      background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 12px;
    }
    p.subtitle {
      color: #94a3b8;
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      text-align: left;
    }
    .info-box {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.07);
      padding: 16px;
      border-radius: 14px;
    }
    .label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      margin-bottom: 6px;
    }
    .val {
      font-size: 13px;
      font-weight: 600;
      color: #f1f5f9;
      font-family: monospace;
      word-break: break-all;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">
      <span class="badge-dot"></span> Production Cluster Active
    </div>
    <h1>Welcome, Mohamed</h1>
    <p class="subtitle">Multi-Application Kubernetes Routing & Ingress Engine is successfully deployed via AWS ALB.</p>
    
    <div class="info-grid">
      <div class="info-box">
        <div class="label">Active Pod</div>
        <div class="val">${os.hostname()}</div>
      </div>
      <div class="info-box">
        <div class="label">Ingress Route</div>
        <div class="val">/mohamed</div>
      </div>
      <div class="info-box">
        <div class="label">Service Name</div>
        <div class="val">app1-svc:2000</div>
      </div>
      <div class="info-box">
        <div class="label">Cluster Node</div>
        <div class="val">Kubernetes Worker</div>
      </div>
    </div>
  </div>
</body>
</html>`;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Web Server is listening at port ${PORT}`);
  console.log(os.hostname());
});
