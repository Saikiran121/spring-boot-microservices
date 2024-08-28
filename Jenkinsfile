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
                script {
                    def branch = env.BRANCH_NAME ?: 'master'
                    git url: 'https://github.com/Saikiran121/spring-boot-microservices.git', branch: branch
                }
            }
        }

        stage('Build and Publish Docker Images') {
            parallel {
                stage('Build Discovery Server') {
                    steps {
                        script {
                            docker.build("discovery-server:latest", "discovery-server")
                            docker.withRegistry("https://${REGISTRY_URL}", "${DOCKER_CREDENTIALS_ID}") {
                                docker.image("discovery-server:latest").push("${BRANCH_NAME}")
                            }
                        }
                    }
                }

                stage('Build Movie Catalog Service') {
                    steps {
                        script {
                            docker.build("movie-catalog-service:latest", "movie-catalog-service")
                            docker.withRegistry("https://${REGISTRY_URL}", "${DOCKER_CREDENTIALS_ID}") {
                                docker.image("movie-catalog-service:latest").push("${BRANCH_NAME}")
                            }
                        }
                    }
                }

                stage('Build Movie Info Service') {
                    steps {
                        script {
                            docker.build("movie-info-service:latest", "movie-info-service")
                            docker.withRegistry("https://${REGISTRY_URL}", "${DOCKER_CREDENTIALS_ID}") {
                                docker.image("movie-info-service:latest").push("${BRANCH_NAME}")
                            }
                        }
                    }
                }

                stage('Build Ratings Data Service') {
                    steps {
                        script {
                            docker.build("ratings-data-service:latest", "ratings-data-service")
                            docker.withRegistry("https://${REGISTRY_URL}", "${DOCKER_CREDENTIALS_ID}") {
                                docker.image("ratings-data-service:latest").push("${BRANCH_NAME}")
                            }
                        }
                    }
                }
            }
        }

        stage('Deploy to Kubernetes (Staging)') {
            when {
                branch 'staging'
            }
            steps {
                script {
                    kubernetesDeploy(configs: "kubernetes/${branch}/deployment.yml", kubeconfigId: 'kubeconfig-staging')
                }
            }
        }

        stage('Deploy to Kubernetes (Production)') {
            when {
                branch 'production'
            }
            steps {
                script {
                    kubernetesDeploy(configs: "kubernetes/${branch}/deployment.yml", kubeconfigId: 'kubeconfig-production')
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
