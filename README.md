# Web Portfolio

Portfolio is now live at https://evanzdev.com

## Installation
Prerequisite:  
1. Docker

### Development
Copy the contents of `.env.example` into `.env.development`.
```
cp .env.example .env.development
```

Navigate to the root directory. Build the image
```
docker build -t portfolio-dev --target dev .
```

To launch the container.
```
docker run --env-file .env.development -p 3000:3000 portfolio-dev
```

### Production
For now, it's the same as the steps in development. 
Copy the contents of `.env.example` into `.env.production`.
```
cp .env.example .env.production
```

Navigate to the root directory. Build the image
```
docker build -t portfolio-prod --target production .
```

To launch the container.
```
docker run --env-file .env.production -p 3000:3000 portfolio-prod
```
