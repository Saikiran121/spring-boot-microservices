pipeline {
    agent any

    environment {
        STAGING_SERVER = '13.235.17.189'
        PRODUCTION_SERVER = '13.126.234.208'
        DOCKERHUB_CREDENTIALS_ID = 'Dockerhub'
        GIT_REPO_URL = 'https://github.com/Saikiran121/spring-boot-microservices.git'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from the Git repository
                git url: "${GIT_REPO_URL}", branch: 'main'
            }
        }

        stage('Build and Publish Docker Images') {
            parallel {
                stage('Build Discovery Server') {
                    steps {
                        dir('discovery-server') {
                            sh './mvnw clean package'
                            sh 'docker build -t backend/discovery-server:latest .'
                        }
                    }
                }
                stage('Build Movie Catalog Service') {
                    steps {
                        dir('movie-catalog-service') {
                            sh './mvnw clean package'
                            sh 'docker build -t backend/movie-catalog-service:latest .'
                        }
                    }
                }
                stage('Build Movie Info Service') {
                    steps {
                        dir('movie-info-service') {
                            sh './mvnw clean package'
                            sh 'docker build -t backend/movie-info-service:latest .'
                        }
                    }
                }
                stage('Build Ratings Data Service') {
                    steps {
                        dir('ratings-data-service') {
                            sh './mvnw clean package'
                            sh 'docker build -t backend/ratings-data-service:latest .'
                        }
                    }
                }
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    // Push Docker images to DockerHub
                    sh 'docker push backend/discovery-server:latest'
                    sh 'docker push backend/movie-catalog-service:latest'
                    sh 'docker push backend/movie-info-service:latest'
                    sh 'docker push backend/ratings-data-service:latest'
                }
            }
        }

        stage('Deploy to Kubernetes (Staging)') {
            steps {
                // Deploy the services to the staging environment
                sh 'kubectl apply -f kubernetes/discovery-server/deployment.yml --context=${STAGING_SERVER}'
                sh 'kubectl apply -f kubernetes/movie-catalog-service/deployment.yml --context=${STAGING_SERVER}'
                sh 'kubectl apply -f kubernetes/movie-info-service/deployment.yml --context=${STAGING_SERVER}'
                sh 'kubectl apply -f kubernetes/ratings-data-service/deployment.yml --context=${STAGING_SERVER}'
            }
        }

        stage('Deploy to Kubernetes (Production)') {
            when {
                branch 'main' // Deploy to production only when the main branch is built
            }
            steps {
                // Deploy the services to the production environment
                sh 'kubectl apply -f kubernetes/discovery-server/deployment.yml --context=${PRODUCTION_SERVER}'
                sh 'kubectl apply -f kubernetes/movie-catalog-service/deployment.yml --context=${PRODUCTION_SERVER}'
                sh 'kubectl apply -f kubernetes/movie-info-service/deployment.yml --context=${PRODUCTION_SERVER}'
                sh 'kubectl apply -f kubernetes/ratings-data-service/deployment.yml --context=${PRODUCTION_SERVER}'
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}

