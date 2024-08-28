pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_CREDENTIALS = 'docker'
        KUBECONFIG = '/var/lib/jenkins/.kube/config'  // Ensure this path matches where the kubeconfig will be written
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
                    echo 'Running linting...'
                    sh 'eslint .'
                }
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                script {
                    def dockerTag = "latest"
                    if (env.BRANCH_NAME == 'staging') {
                        dockerTag = "staging"
                    } else if (env.BRANCH_NAME == 'production') {
                        dockerTag = "production"
                    }

                    def services = [
                        'movie-info-service',
                        'discovery-server',
                        'ratings-data-service',
                        'movie-catalog-service'
                    ]

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

        stage('Configure Kubernetes') {
            steps {
                script {
                    echo 'Updating kubeconfig...'
                    sh 'aws eks --region ap-south-1 update-kubeconfig --name eksdmo'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            when {
                branch 'master'
            }
            steps {
                script {
                    echo 'Deploying Kubernetes YAML files...'
                    sh 'kubectl apply -f discovery-server.yaml'
                    sh 'kubectl apply -f ingress.yaml'
                    sh 'kubectl apply -f movie-info-service.yaml'
                    sh 'kubectl apply -f movie-catalog-service.yaml'
                    sh 'kubectl apply -f ratings-data-service.yaml'
                    sh 'kubectl apply -f sqlite-db.yaml'
                    sh 'kubectl apply -f network-policy.yaml'
                    sh 'kubectl apply -f namespace.yml'
                    sh 'kubectl apply -f frontend.yaml'
                }
            }
        }
    }
}

