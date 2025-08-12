pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('dbQPRXp6njR9J18nOBRH0z91')
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

        // NEW: Install Vercel CLI separately
        stage('Install Vercel CLI') {
            steps {
                echo 'Installing Vercel CLI...'
                bat 'npm install -g vercel'
                bat 'vercel --version'
            }
        }

        // FIXED: Deploy stage with proper commands
        stage('Deploy to Vercel') {
            steps {
                echo 'Deploying to Vercel...'
                // Step 1: Check build directory exists
                bat 'dir dist'
                bat 'dir dist\\formchek'

                // Step 2: Go to build directory and deploy
                bat 'cd dist\\formchek && vercel --prod --token %VERCEL_TOKEN% --confirm --yes'

                // Step 3: Create deploy.txt file with output (separate command)
                bat '''
                cd dist\\formchek
                vercel --prod --token %VERCEL_TOKEN% --confirm --yes > ..\\..\\deploy.txt
                cd ..\\..
                echo Deployment log created:
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
        }
        always {
            echo 'Pipeline execution completed'
        }
    }
}
