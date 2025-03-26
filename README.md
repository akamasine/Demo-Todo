
## Deployment Steps

1. Start Minikube:
```bash
minikube start
```

2. Enable Ingress Controller:
```bash
minikube addons enable ingress
```

3. Add host entry:
```bash
echo "$(minikube ip) todo-app.local" | sudo tee -a /etc/hosts
```

4. Build and load Docker images:
```bash
# Build and load frontend
cd frontend
docker build -t todo-frontend:latest .
minikube image load todo-frontend:latest

# Build and load backend
cd ../backend
docker build -t todo-backend:latest .
minikube image load todo-backend:latest
```
OR We can set docker to use minikube 
```bash 
#Setting up minikube as docker env
eval $(minikube docker-env)
```
and build the images using 
```bash 
docker build -t <tag> .
```
This will directly build the images in minikube



5. Apply Kubernetes manifests:
```bash
cd ../k8s-manifests
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f postgres-pv.yaml
kubectl apply -f postgres-deployment.yaml
kubectl apply -f postgres-service.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f ingress.yaml
```

6. Access the application:
- Open your browser and navigate to `http://todo-app.local`

## Kubernetes Components

1. **ConfigMap**: Stores database configuration
2. **Secret**: Stores database password
3. **PersistentVolume**: Provides persistent storage for PostgreSQL
4. **Deployments**: Manage pods for frontend, backend, and database
5. **Services**: Provide networking between components
6. **Ingress**: Manages external access to the services

## Application Features

- Create new todos
- List all todos
- Toggle todo completion status
- Persistent storage of todos in PostgreSQL

## Development

### Frontend
- React application
- Uses Axios for API calls
- Styled with CSS

### Backend
- Node.js/Express server
- PostgreSQL database connection
- RESTful API endpoints

### Database
- PostgreSQL 15
- Persistent storage using Kubernetes PV/PVC

## Troubleshooting

1. Check pod status:
```bash
kubectl get pods
```

2. Check service status:
```bash
kubectl get svc
```

3. Check ingress status:
```bash
kubectl get ingress
```

4. View pod logs:
```bash
kubectl logs <pod-name>
```

5. Check ingress controller logs:
```bash
kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx
```

6. Check image in minikube
```bash
minikube image ls
```

## Cleanup

To remove all resources:
```bash
kubectl delete -f k8s-manifests/
```

## Notes

- This setup is for development/testing purposes
- For production, consider:
  - Using proper storage solutions instead of hostPath
  - Implementing proper security measures
  - Setting up monitoring and logging
  - Using proper domain names and SSL certificates

