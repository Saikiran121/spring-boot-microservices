pipeline {
    agent any
    
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        DOCKER_REGISTRY_CREDENTIALS = 'docker'
    }
    
    stages {
        stage('Git Checkout') {
            steps {
                git 'https://github.com/Saikiran121/spring-boot-microservices.git'
            }
        }
	
	stage('Linting') {
            steps {
                script {
                    // Run linting tools
                    echo 'Running linting...'
                    sh 'eslint .'
                }
            }
        }
	
	stage('Testing') {
            steps {
                script {
                    // Run tests
                    echo 'Running tests...'
                    sh './run-tests.sh'  // Replace with your test command or script
                }
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar') {
                    sh """
                        $SCANNER_HOME/bin/sonar-scanner \
                        -Dsonar.projectKey=Spring-Micro \
                        -Dsonar.projectName=Spring-Micro \
                        -Dsonar.java.binaries=.
                    """
                }
            }
        }
        
        stage('Build and Push Docker Images') {
            steps {
                script {
                    // Determine the Docker tag based on the branch name
                    def dockerTag = "latest"
                    if (env.BRANCH_NAME == 'staging') {
                        dockerTag = "staging"
                    } else if (env.BRANCH_NAME == 'production') {
                        dockerTag = "production"
                    }
                    
                    // Services to build
                    def services = [
                        'movie-info-service',
                        'discovery-server',
                        'ratings-data-service',
                        'movie-catalog-service'
                    ]
                    
                    // Loop through each service and build/push Docker images
                    for (service in services) {
                        withDockerRegistry(credentialsId: DOCKER_REGISTRY_CREDENTIALS, toolName: 'docker') {
                            dir("/var/lib/jenkins/workspace/Test2/${service}/") {
                                sh """
                                    docker build -t saikiran8050/${service}:${dockerTag} .
                                    docker push saikiran8050/${service}:${dockerTag}
                                    docker rmi saikiran8050/${service}:${dockerTag}
                                """
                            }
                        }
                    }
                }
            }
        }
        
        stage('Deploy to Environment') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'staging') {
                        echo 'Deploying to staging environment...'
                        // Add your staging deployment logic here (e.g., Kubernetes deployment, Docker Swarm, etc.)
                    } else if (env.BRANCH_NAME == 'production') {
                        echo 'Deploying to production environment...'
                        // Add your production deployment logic here (e.g., Kubernetes deployment, Docker Swarm, etc.)
                    } else {
                        echo 'Not deploying, running on non-deployment branch (e.g., master)...'
                    }
                }
            }
        }
    }
}
