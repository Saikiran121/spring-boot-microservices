pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_CREDENTIALS = 'docker'
        AWS_CREDENTIALS_ID = 'aws-jenkins-demo'
        AWS_REGION = 'ap-south-1'
        CLUSTER_NAME = 'eksdemo' // Updated cluster name
        KUBECONFIG = '/var/lib/jenkins/.kube/config' // Ensure this is correct
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

        stage('Configure AWS CLI') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: AWS_CREDENTIALS_ID]]) {
                    script {
                        echo 'Configuring AWS CLI...'
                        sh """
                            aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID}
                            aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY}
                            aws configure set region ${AWS_REGION}
                        """
                    }
                }
            }
        }

        stage('Update Kubeconfig') {
            steps {
                script {
                    echo 'Updating kubeconfig...'
                    sh """
                        aws eks --region ${AWS_REGION} update-kubeconfig --name ${CLUSTER_NAME}
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    echo 'Deploying to Kubernetes...'
                    sh 'kubectl apply -f k8s/namespace.yml'
                }
            }
        }
    }
}

