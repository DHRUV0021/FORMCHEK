pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('8DqOKY0T1eFASXAfU5nVGl1u')
    }

    stages {
        stage('Checkout') {
            steps {
                echo '🔥 Checking out code...'
                git branch: 'master', url: 'https://github.com/DHRUV0021/FORMCHEK'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                bat 'npm install --legacy-peer-deps'
            }
        }

        stage('Build Application') {
            steps {
                echo '🏗️ Building Angular app...'
                bat 'npm run build --prod'
            }
        }

        stage('Verify Build & Config') {
            steps {
                echo '✅ Verifying build and Vercel config...'
                bat '''
                    echo Build directory contents:
                    dir dist\\formchek
                    echo Browser directory contents:
                    dir dist\\formchek\\browser
                    echo Current vercel.json:
                    if exist vercel.json (
                        echo ✅ vercel.json found
                        type vercel.json
                    ) else (echo ❌ vercel.json not found)
                    echo Checking index.html in browser folder:
                    if exist "dist\\formchek\\browser\\index.html" (
                        echo ✅ index.html found in browser folder
                    ) else (
                        echo ❌ index.html not found in browser folder
                        echo Checking in dist/formchek:
                        if exist "dist\\formchek\\index.html" (
                            echo ✅ index.html found in formchek
                        ) else (
                            echo ❌ index.html not found anywhere
                            exit /b 1
                        )
                    )
                '''
            }
        }

        stage('Deploy to Vercel') {
            steps {
                echo '🚀 Deploying to Vercel...'
                bat '''
                    echo Current directory files:
                    dir
                    echo Deploying with Vercel...
                    npx vercel --token "%VERCEL_TOKEN%" --prod --confirm > deploy.txt 2>&1
                    type deploy.txt
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo '🔍 Verifying deployment...'
                bat '''
                    echo Deployment completed!
                    if exist deploy.txt (
                        echo Final deployment logs:
                        type deploy.txt
                    )
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline completed successfully!'
            bat '''
                echo ✅ Build successful
                echo ✅ Deployment successful
                if exist deploy.txt (
                    echo Deployment URL:
                    findstr /C:"https://" deploy.txt
                )
            '''
        }
        failure {
            echo '❌ Pipeline failed!'
            bat '''
                echo Checking for any deployment logs:
                if exist deploy.txt (
                    echo Deploy.txt contents:
                    type deploy.txt
                )
                echo Checking Vercel CLI status:
                npx vercel --version 2>nul || echo Vercel CLI not available
            '''
        }
    }
}
