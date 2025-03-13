# DevOps Demo Project

A comprehensive demonstration of DevOps capabilities for simulated device monitoring with Jenkins/Zuul CI/CD pipeline.

## Project Overview

This project showcases DevOps practices relevant to embedded systems development, focusing on CI/CD automation using Jenkins and Zuul. It implements a simplified device telemetry monitoring system that could be used for fitness trackers or GPS devices.

## Repository Structure

```
project-devops/
├── dashboard/          # React.js frontend for data visualization
├── device-simulator/   # Python service that simulates device telemetry
├── docker/             # Docker configuration files
└── jenkins/            # Jenkins pipeline configuration
```

## Key Features

- **Python Simulation Service**: Generates realistic device telemetry data
- **Visualization Dashboard**: Real-time data visualization using React
- **CI/CD Pipeline**: Automated build, test, and deployment with Jenkins and Zuul
- **Containerization**: Docker containers for all components
- **Monitoring**: Application health and pipeline execution metrics

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (for local dashboard development)
- Python 3.8+ (for local simulator development)
- Jenkins server (local or cloud-based)
- Git

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd project-devops
   ```

2. Start the development environment:
   ```
   docker-compose up -d
   ```

3. Access the dashboard at http://localhost:3000

## Development Workflow

1. Create a feature branch from `development`
2. Make your changes and commit
3. Push your branch and create a pull request
4. Jenkins/Zuul will automatically run the CI pipeline
5. After approval and successful tests, changes will be merged

## CI/CD Pipeline

The project uses a Jenkins pipeline with Zuul integration for code review and gating. The pipeline includes:

- Code checkout
- Dependency installation
- Unit testing
- Code quality analysis
- Docker image building
- Deployment to staging environment

## Documentation

For more detailed information, refer to:

- [Project Requirements Document](./PRD.md)
- [Implementation Steps](./steps.md)


