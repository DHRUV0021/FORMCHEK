pipeline {
    agent any

    environment {
        // Vercel token credentials se load karo
        VERCEL_TOKEN = credentials('8DqOKY0T1eFASXAfU5nVGl1u')
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'master', url: 'https://github.com/DHRUV0021/FORMCHEK'
            }
        }

        stage('Check Prerequisites') {
            steps {
                echo 'Checking if Node.js and npm are available...'
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                bat 'npm install --legacy-peer-deps'
            }
        }

        stage('Build Angular App') {
            steps {
                echo 'Building Angular application...'
                bat 'npm run build --prod'
            }
        }

        stage('Deploy to Vercel') {
            steps {
                echo 'Deploying to Vercel...'
                bat '''
                    npm install -g vercel
                    cd dist\\formchek
                    vercel --prod --token %VERCEL_TOKEN% --confirm --yes > ..\\deploy.txt
                    cd ..
                    type deploy.txt
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Successfully deployed to Vercel!'
            archiveArtifacts artifacts: 'deploy.txt', allowEmptyArchive: true
        }
        failure {
            echo '❌ Build or deployment failed!'
            echo 'Check the console output for details.'
        }
        always {
            echo 'Pipeline execution completed'
        }
    }
}
