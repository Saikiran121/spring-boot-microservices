pipeline {
    agent any
    
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
    }
    
    
    stages {
        
        stage('Git Checkout') {
            steps {
                git 'https://github.com/Saikiran121/spring-boot-microservices.git'
            }
        }
        
        stage('SonarQube') {
            steps {
                withSonarQubeEnv('sonar') {
                    sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.projectKey=Spring-Micro -Dsonar.projectName=Spring-Micro -Dsonar.java.binaries=. '''
                }
            }
        }
        
        stage('movie-info-service') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', toolName: 'docker') {
                        dir('/var/lib/jenkins/workspace/Test2/movie-info-service/') {
                            sh 'docker build -t saikiran8050/movie-info-service:latest .'
                            sh 'docker push saikiran8050/movie-info-service:latest'
                            sh 'docker rmi saikiran8050/movie-info-service:latest'
                        }
                    }
                }
            }
        }
        
        stage('discovery-server') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', toolName: 'docker') {
                        dir('/var/lib/jenkins/workspace/Test2/discovery-server/') {
                            sh 'docker build -t saikiran8050/discovery-server:latest .'
                            sh 'docker push saikiran8050/discovery-server:latest'
                            sh 'docker rmi saikiran8050/discovery-server:latest'
                        }
                    }
                }
            }
        }
        
        stage('ratings-data-service') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', toolName: 'docker') {
                        dir('/var/lib/jenkins/workspace/Test2/ratings-data-service/') {
                            sh 'docker build -t saikiran8050/ratings-data-service:latest .'
                            sh 'docker push saikiran8050/ratings-data-service:latest'
                            sh 'docker rmi saikiran8050/ratings-data-service:latest'
                        }
                    }
                }
            }
        }
        
        stage('movie-catalog-service') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', toolName: 'docker') {
                        dir('/var/lib/jenkins/workspace/Test2/movie-catalog-service/') {
                            sh 'docker build -t saikiran8050/movie-catalog-service:latest .'
                            sh 'docker push saikiran8050/movie-catalog-service:latest'
                            sh 'docker rmi saikiran8050/movie-catalog-service:latest'
                        }
                    }
                }
            }
        }
    }
}
