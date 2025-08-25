# 🌦️ DevSecOps Weather App

A **Flask-based Weather Application** built with a **DevSecOps approach**.
This project demonstrates secure software development practices, containerization, CI/CD automation, and cloud deployment.

It fetches real-time **current weather, hourly, and 7-day forecasts** using the **OpenWeatherMap API** and serves them through a simple web UI.

---

## 🚀 Features
- ✅ Flask backend serving weather data via REST API
- ✅ Frontend with HTML, CSS, and JavaScript for weather display
- ✅ Current, hourly, and 7-day forecast support
- ✅ Error handling for invalid inputs
- ✅ Unit tests with `nose2`
- ✅ Containerized using **Docker**
- ✅ Continuous Integration & Deployment with **GitHub Actions**
- ✅ Dependency scanning and monitoring using **Snyk**
- ✅ Deployment on **AWS ECS (Fargate)** behind an **Application Load Balancer (ALB)**
- ✅ Custom domain integration with DNS (Porkbun)

---

## 🛠️ Tech Stack
- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Database**: None (data fetched directly from API)
- **API**: [OpenWeatherMap API](https://openweathermap.org/api)
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Security**: Snyk
- **Cloud Deployment**: AWS ECS (Fargate) + ALB + ECR

---

## 📂 Project Structure
```
weather-app/
│── app/                 # Flask app code
│   ├── static/          # CSS, JS
│   ├── templates/       # HTML templates
│   ├── __init__.py
│   └── routes.py
│
│── tests/               # Unit tests (nose2)
│── Dockerfile           # Container definition
│── requirements.txt     # Python dependencies
│── .github/workflows/   # GitHub Actions CI/CD pipelines
│── snyk-config.json     # Snyk configuration
│── README.md            # Project documentation
```

---

## ⚡ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Taraprasad-Sarangi/CurrentWeather.git
cd weather-app
```

### 2️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 3️⃣ Set Environment Variables
Create a `.env` file in the project root:
```
OPENWEATHER_API_KEY=your_api_key_here
```

### 4️⃣ Run Locally
```bash
python -m flask run
```
Visit: `http://127.0.0.1:5000`

---

## 🐳 Docker Usage

### Build Image
```bash
docker build -t weather-app .
```

### Run Container
```bash
docker run -p 5000:5000 -e OPENWEATHER_API_KEY=your_api_key_here weather-app
```

---

## 🔒 DevSecOps Practices
- **Snyk Integration**: Continuous dependency scanning for vulnerabilities
- **Automated Testing**: Runs unit tests in CI pipeline
- **Container Security**: Lightweight image with minimized attack surface
- **IAM & Security Groups**: Restricted AWS access policies
- **Custom Domain & ALB**: Secure networking setup (HTTPS optional for production)

---

## ☁️ Deployment on AWS
- Docker image pushed to **AWS ECR**
- Service runs on **ECS Fargate**
- Load-balanced using **Application Load Balancer (ALB)**
- Domain configured via **Porkbun DNS**

---

## 🧪 Testing
Run unit tests with:
```bash
nose2
```

---

## 📈 CI/CD Workflow
- **Push to GitHub → GitHub Actions**
   - Runs linting & tests
   - Scans dependencies via Snyk
   - Builds Docker image
   - Pushes to AWS ECR
   - Deploys to ECS

---

## 📌 Future Improvements
- [ ] Enable HTTPS with ACM + ALB
- [ ] Add Terraform for Infrastructure as Code (IaC)
- [ ] Add monitoring with AWS CloudWatch
- [ ] Improve UI with charts & animations

---

## 👨‍💻 Author
**Taraprasad Sarangi**
📧 sarangitaraprasad1@gmail.com
🔗 [LinkedIn](https://www.linkedin.com/in/taraprasad-sarangi/)
