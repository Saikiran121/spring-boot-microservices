pipeline {
    agent any

    environment {
        STAGING_SERVER = '13.235.17.189'
        PRODUCTION_SERVER = '13.126.234.208'
        DOCKERHUB_CREDENTIALS_ID = 'Dockerhub'
        GIT_REPO_URL = 'https://github.com/Saikiran121/spring-boot-microservices.git'
    }

    stages {
<<<<<<< HEAD
        stage('Git Checkout') {
            steps {
                git 'https://github.com/Saikiran121/spring-boot-microservices.git'
            }
        }

        stage('Linting') {
=======
        stage('Checkout') {
>>>>>>> fd961b944ac89a4174cf5c776e1b41d68c4cf8e2
            steps {
                script {
                    def branch = env.BRANCH_NAME ?: 'master'
                    git url: 'https://github.com/Saikiran121/spring-boot-microservices.git', branch: branch
                }
            }
        }

<<<<<<< HEAD
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
=======
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
>>>>>>> fd961b944ac89a4174cf5c776e1b41d68c4cf8e2
                            }
                        }
                    }
                }
            }
        }

<<<<<<< HEAD
        stage('Deploy to Environment') {
=======
        stage('Deploy to Kubernetes (Staging)') {
            when {
                branch 'staging'
            }
>>>>>>> fd961b944ac89a4174cf5c776e1b41d68c4cf8e2
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
