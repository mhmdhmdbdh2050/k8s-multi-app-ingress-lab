# Kubernetes Multi-App Ingress Lab

A learning lab that routes three HTTP paths through NGINX Ingress to Kubernetes Services. It demonstrates Deployments, Services, path rewriting, an AWS Application Load Balancer (ALB) to NodePort traffic path, basic probes, and resource requests and limits. This is a lab, not a production deployment template.

## What the current manifests deploy

| Path | Deployment | Image in manifest | Container port | Notes |
|---|---|---|---:|---|
| `/mohamed` | `app1` | `menamagdyhalem/simple-webserver` | 3000 | Uses an external image. The local `app1/Dockerfile` and `index.html` are not referenced by this Deployment. |
| `/app2` | `app2` | `gcr.io/google-samples/hello-app:2.0` | 8080 | Uses Google's sample app. The local `app2/index.html` is not used by this Deployment. |
| `/tala` | `app3-deployment` | `app3:v1` | 80 | Locally built image; make it available to every Kubernetes node or use a registry image. |

The checked-in Kubernetes resources are `ingress.yaml` and the Deployment/Service pairs under `app1/`, `app2/`, and `app3/`. The manifests do not define ConfigMaps, an AWS ALB, an Ingress Controller, or a cluster. Those are external prerequisites or examples, not resources created by this repository.

## Request flow

```text
Browser → AWS ALB (optional) → worker NodePort → NGINX Ingress
        → Ingress path rule (rewrites path to /) → ClusterIP Service → Pod
```

The Ingress rules match any host and route by path. The rewrite annotation changes each matching request path to `/` before it reaches the backend.

## Prerequisites

- A running Kubernetes cluster and `kubectl` configured for it.
- NGINX Ingress Controller installed with an IngressClass named `nginx`.
- The `app3:v1` image available to the cluster, or a registry image substituted in `app3/deployment-app3.yml`.
- For AWS access, an ALB and target group configured to forward to the Ingress Controller's HTTP NodePort. The ALB is not provisioned by these manifests.

## Build the local app3 image

```bash
docker build -t app3:v1 app3
```

For a multi-node/containerd cluster, a local Docker image is not automatically available to Kubernetes nodes. Push the image to a registry accessible by the cluster and update the `image` field, or import it into every node using your cluster's documented image-loading process.

## Deploy and verify

```bash
kubectl apply -f app1/deployment-app1.yml
kubectl apply -f app2/deployment-app2.yml
kubectl apply -f app3/deployment-app3.yml
kubectl apply -f ingress.yaml

kubectl get deployments,pods,services
kubectl get ingress multi-app-ingress
kubectl describe ingress multi-app-ingress
```

Confirm that all three Deployments have ready replicas before testing. For a cluster-local test, send requests to the Ingress Controller's NodePort and set the host header only if your controller or upstream load balancer requires one:

```bash
curl -i http://<NODE-IP>:<INGRESS-NODEPORT>/mohamed
curl -i http://<NODE-IP>:<INGRESS-NODEPORT>/app2
curl -i http://<NODE-IP>:<INGRESS-NODEPORT>/tala
```

If an AWS ALB is configured, replace `<ALB-DNS>` with its current DNS name:

```text
http://<ALB-DNS>/mohamed
http://<ALB-DNS>/app2
http://<ALB-DNS>/tala
```

## Troubleshooting

```bash
kubectl get pods -o wide
kubectl describe ingress multi-app-ingress
kubectl get endpoints
kubectl logs deployment/app1
kubectl logs deployment/app2
kubectl logs deployment/app3-deployment
```

Check the Ingress Controller logs and AWS target health when requests do not reach the services. If the `app3` pod reports `ImagePullBackOff`, ensure the image is in a registry the cluster can access or imported on each node.

## Cleanup

```bash
kubectl delete -f ingress.yaml
kubectl delete -f app1/deployment-app1.yml
kubectl delete -f app2/deployment-app2.yml
kubectl delete -f app3/deployment-app3.yml
```

These commands remove only this lab's application resources. They do not remove the cluster, Ingress Controller, ALB, or AWS resources.
