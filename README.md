# 🚀 Kubernetes Multi-App Ingress Lab

A hands-on Kubernetes project demonstrating multiple web applications exposed through Kubernetes Services, NGINX Ingress Controller, NodePort, and an AWS Application Load Balancer (ALB).

## 📌 Architecture

```text
Internet
   │
   ▼
AWS Application Load Balancer
   │ HTTP :80
   ▼
EC2 Worker Nodes
   │ NodePort :30491
   ▼
NGINX Ingress Controller
   │
   ├── /mohamed ──► app1-svc:2000 ──► APP1
   ├── /app2    ──► app2-svc:2500 ──► APP2
   └── /tala    ──► app3-service:9000 ──► APP3
```

## ☸️ Kubernetes Cluster

| Node | Role |
|---|---|
| k8s-master | Control Plane |
| k8s-worker1 | Worker |
| k8s-worker2 | Worker |

- Kubernetes: `v1.37.1`
- Runtime: `containerd`

## 🌐 Applications

### APP1

- Route: `/mohamed`
- Service: `app1-svc`
- Service port: `2000`
- Target port: `3000`
- NGINX-based custom HTML application

### APP2

- Route: `/app2`
- Service: `app2-svc`
- Service port: `2500`
- Container port: `8080`
- Custom HTML/CSS romantic interface
- Uses ConfigMap: `app2-ui`
- No external image file is required

### APP3

- Route: `/tala`
- Service: `app3-service`
- Service port: `9000`
- Target port: `80`
- Docker image: `app3:v1`
- Custom `I MISS YOU` web page

## 🔀 Ingress

Main Ingress:

```text
multi-app-ingress
```

Ingress class:

```text
nginx
```

Routes:

| Path | Service | Port |
|---|---|---:|
| `/mohamed` | `app1-svc` | 2000 |
| `/app2` | `app2-svc` | 2500 |
| `/tala` | `app3-service` | 9000 |

Rewrite annotation:

```yaml
nginx.ingress.kubernetes.io/rewrite-target: /
```

## 🔌 NGINX Ingress Controller

Installed with Helm:

```bash
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace
```

NodePorts:

- HTTP: `30491`
- HTTPS: `31317`

The controller is exposed as a `NodePort` so the AWS ALB can forward traffic to the EC2 worker nodes.

## ☁️ AWS Application Load Balancer

Traffic flow:

```text
AWS ALB
   ↓
EC2 Worker Node
   ↓
NodePort 30491
   ↓
NGINX Ingress
   ↓
Kubernetes Service
   ↓
Pod
```

The ALB uses an HTTP listener on port `80` and forwards traffic to the Kubernetes NGINX NodePort `30491`.

## 🧩 Main Kubernetes Resources

```text
Deployments:
- app1
- app2
- app3-deployment

Services:
- app1-svc
- app2-svc
- app3-service

Ingress:
- multi-app-ingress

ConfigMaps:
- app1-ui
- app2-ui
```

## 📁 Project Structure

```text
k8s-multi-app-ingress-lab/
│
├── app1/
│   └── index.html
│
├── app2/
│   └── index.html
│
├── app3/
│   ├── Dockerfile
│   └── index.html
│
├── deployment-cloud.yaml
├── deployment-devops.yaml
├── deployment-k8s.yaml
├── ingress.yaml
└── README.md
```

## ⚙️ Useful Commands

### Nodes

```bash
kubectl get nodes -o wide
```

### Pods

```bash
kubectl get pods -o wide
```

### Deployments

```bash
kubectl get deployments
```

### Services

```bash
kubectl get svc
```

### Ingress

```bash
kubectl get ingress
```

### Ingress Details

```bash
kubectl describe ingress multi-app-ingress
```

### NGINX Controller

```bash
kubectl get pods -n ingress-nginx
```

### NGINX Service

```bash
kubectl get svc -n ingress-nginx
```

### Endpoints

```bash
kubectl get endpoints
```

### NGINX Logs

```bash
kubectl logs -n ingress-nginx deployment/ingress-nginx-controller
```

## 🧪 Testing

Replace `ALB-DNS` with the DNS name of the AWS Application Load Balancer.

```text
http://ALB-DNS/mohamed
http://ALB-DNS/app2
http://ALB-DNS/tala
```

Example using the current ALB hostname:

```text
http://ing-1240743497.eu-north-1.elb.amazonaws.com/mohamed
http://ing-1240743497.eu-north-1.elb.amazonaws.com/app2
http://ing-1240743497.eu-north-1.elb.amazonaws.com/tala
```

## 🔍 Testing the NodePort

```bash
curl -H "Host: ing-1240743497.eu-north-1.elb.amazonaws.com" \
http://127.0.0.1:30491/mohamed
```

```bash
curl -H "Host: ing-1240743497.eu-north-1.elb.amazonaws.com" \
http://127.0.0.1:30491/app2
```

```bash
curl -H "Host: ing-1240743497.eu-north-1.elb.amazonaws.com" \
http://127.0.0.1:30491/tala
```

## 🛠️ Technologies Used

- Kubernetes
- Docker
- containerd
- NGINX
- NGINX Ingress Controller
- Helm
- AWS EC2
- AWS Application Load Balancer
- NodePort
- ConfigMap
- YAML
- HTML
- CSS
- Linux
- Bash

## 🎯 What This Project Demonstrates

### Kubernetes

- Deployments
- Pods
- Services
- ClusterIP
- NodePort
- Ingress
- ConfigMaps
- Labels and selectors
- Service discovery
- Replica management

### Networking

- Kubernetes networking
- Service-to-Pod communication
- NodePort
- Ingress routing
- HTTP Host headers
- AWS Load Balancer integration

### AWS

- EC2
- Application Load Balancer
- Target Groups
- Health Checks
- Security Groups
- VPC networking

### DevOps

- Docker
- Kubernetes
- Helm
- Linux
- YAML
- Containerized applications
- Infrastructure troubleshooting

## 🧠 Important Networking Concept

The AWS ALB does not directly communicate with Kubernetes Services.

The traffic flow is:

```text
AWS ALB
   ↓
EC2 Node
   ↓
NodePort 30491
   ↓
NGINX Ingress Controller
   ↓
Ingress Rules
   ↓
Kubernetes Service
   ↓
Pod
```

## 🩺 Troubleshooting

```bash
kubectl get pods -A
kubectl get svc -A
kubectl get ingress
kubectl describe ingress multi-app-ingress
kubectl get endpoints
kubectl logs -n ingress-nginx deployment/ingress-nginx-controller
```

## 🚀 Future Improvements

- Add HTTPS using AWS Certificate Manager
- Add a domain using Route 53
- Add Horizontal Pod Autoscaler
- Add Kubernetes Secrets
- Add Persistent Volumes
- Add Prometheus and Grafana
- Add CI/CD using GitHub Actions
- Add Docker image registry
- Deploy applications using Helm
- Implement NetworkPolicies
- Add centralized logging

## 📚 Project Goal

The goal is to build a realistic Kubernetes environment where multiple applications are deployed and accessed through different URL paths using a single external entry point.

```text
                    AWS ALB
                       │
                       ▼
              NGINX Ingress
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
     /mohamed        /app2          /tala
        │              │              │
        ▼              ▼              ▼
      APP1           APP2           APP3
        │              │              │
        └──────────────┼──────────────┘
                       ▼
                Kubernetes Pods
```

## ⭐ Project Highlights

```text
✔ Kubernetes Cluster
✔ Multiple Applications
✔ Multiple Deployments
✔ Kubernetes Services
✔ NGINX Ingress
✔ NodePort
✔ AWS Application Load Balancer
✔ ConfigMaps
✔ Custom HTML/CSS
✔ AWS EC2
✔ Helm
✔ Linux
✔ Kubernetes Networking
```

---

⭐ This project demonstrates a complete Kubernetes application routing architecture from the Internet to Kubernetes Pods using AWS ALB, NodePort, and NGINX Ingress.

