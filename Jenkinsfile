pipeline {
    agent any

    environment {
        // Jenkins credentials se Vercel token load karo
        VERCEL_TOKEN = credentials('8DqOKY0T1eFASXAfU5nVGl1u') // Ye ID change karo apne credentials ke according
        NODE_VERSION = '18' // Node.js version specify karo
    }

    tools {
        nodejs "${NODE_VERSION}" // Jenkins mein Node.js plugin install karna hoga
    }

    stages {
        stage('Cleanup Workspace') {
            steps {
                echo 'Cleaning workspace...'
                deleteDir()
            }
        }

        stage('Checkout Code') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'master', url: 'https://github.com/DHRUV0021/FORMCHEK'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                script {
                    if (isUnix()) {
                        sh 'npm install --legacy-peer-deps'
                    } else {
                        bat 'npm install --legacy-peer-deps'
                    }
                }
            }
        }

        stage('Build Angular App') {
            steps {
                echo 'Building Angular application...'
                script {
                    if (isUnix()) {
                        sh 'npm run build --prod'
                    } else {
                        bat 'npm run build --prod'
                    }
                }
            }
        }

        stage('Deploy to Vercel') {
            steps {
                echo 'Deploying to Vercel...'
                script {
                    if (isUnix()) {
                        sh '''
                            npm install -g vercel
                            cd dist/formchek
                            vercel --prod --token ${VERCEL_TOKEN} --confirm --yes > ../deploy.txt
                            cat ../deploy.txt
                        '''
                    } else {
                        bat '''
                            npm install -g vercel
                            cd dist\\formchek
                            vercel --prod --token %VERCEL_TOKEN% --confirm --yes > ..\\deploy.txt
                            type ..\\deploy.txt
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo '✅ Successfully deployed to Vercel!'
            // Optional: Archive deploy logs
            archiveArtifacts artifacts: 'deploy.txt', allowEmptyArchive: true
        }
        failure {
            echo '❌ Build or deployment failed!'
            // Optional: Send notification
        }
        always {
            echo 'Pipeline execution completed'
            // Cleanup if needed
        }
    }
}
