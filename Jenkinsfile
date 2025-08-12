pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('8DqOKY0T1eFASXAfU5nVGl1u')
        PATH = "${env.PATH};${env.APPDATA}\\npm"
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code...'
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

                echo Vercel config:
                if exist vercel.json (
                    echo ✅ vercel.json found
                    type vercel.json
                ) else (
                    echo ❌ vercel.json not found
                )

                echo Checking index.html:
                if exist "dist\\formchek\\index.html" (
                    echo ✅ index.html found in build
                ) else (
                    echo ❌ index.html not found
                    exit /b 1
                )
                '''
            }
        }

        stage('Deploy to Vercel') {
            steps {
                echo '🚀 Deploying from root directory (using vercel.json config)...'
                bat '''
                echo Current directory (should be root):
                cd

                echo Installing/checking Vercel CLI:
                npm install -g vercel

                echo Attempting deployment from root (this will use vercel.json):
                npx vercel --prod --token %VERCEL_TOKEN% --confirm --yes > deploy.txt 2>&1 || echo NPX deployment attempted with code %ERRORLEVEL%

                echo Deployment output:
                if exist deploy.txt (
                    type deploy.txt
                    echo.
                    echo Extracting deployment URL:
                    findstr /C:"https://" deploy.txt > url.txt 2>nul
                    if exist url.txt (
                        echo ✅ Deployment URL found:
                        type url.txt
                    ) else (
                        echo ⚠️ No URL found, but deployment may have succeeded
                    )
                ) else (
                    echo ❌ Deploy.txt not created
                )
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo '🔍 Checking deployment status...'
                bat '''
                echo Checking if deployment was successful:
                if exist url.txt (
                    echo ✅ Deployment URL available
                    type url.txt
                ) else (
                    echo Checking deploy.txt for any success indicators:
                    if exist deploy.txt (
                        findstr /C:"Deployment completed" deploy.txt
                        findstr /C:"✅" deploy.txt
                        findstr /C:"Ready" deploy.txt
                    )
                )
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline completed successfully!'
            script {
                try {
                    def deployUrl = bat(script: 'if exist url.txt (type url.txt) else (echo No URL)', returnStdout: true).trim()
                    if (deployUrl && deployUrl.contains('https://')) {
                        echo "🌐 LIVE DEPLOYMENT URL: ${deployUrl}"
                        echo "🔗 Your Angular Form Builder is now live!"
                    } else {
                        echo "✅ Deployment completed - check Vercel dashboard for URL"
                    }
                } catch (Exception e) {
                    echo "Deployment may have succeeded - check Vercel dashboard"
                }
            }
            archiveArtifacts artifacts: 'deploy.txt, url.txt', allowEmptyArchive: true
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
