# Screenshot checklist

Capture these after deploying the current manifests. Do not use old captures as evidence for the current version.

- [ ] `kubectl get nodes -o wide`
- [ ] `kubectl get pods -A -o wide`
- [ ] `kubectl get ingress -A`
- [ ] AWS ALB listener and target-group configuration
- [ ] Browser route `/app1`
- [ ] Browser route `/app2`
- [ ] Browser route `/app3`

Save real captures in this directory and add links from the README. Before publishing AWS screenshots, redact account numbers, public IP addresses, VPC and subnet identifiers, and unrelated console details.
