pipeline {
    agent any

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
                    dir dist\\formchek\\browser
                    echo Current vercel.json:
                    if exist vercel.json (
                        echo ✅ vercel.json found
                        type vercel.json
                    )
                    echo Checking index.html:
                    if exist "dist\\formchek\\browser\\index.html" (
                        echo ✅ index.html found in browser folder
                    ) else (
                        echo ❌ index.html not found
                        exit /b 1
                    )
                '''
            }
        }

        stage('Deploy to Vercel') {
            steps {
                echo '🚀 Deploying to Vercel...'
                script {
                    // REPLACE_YOUR_TOKEN_HERE with your actual Vercel token
                    def vercelToken = "8DqOKY0T1eFASXAfU5nVGl1u"

                    bat """
                        echo Deploying with Vercel from browser folder...
                        cd dist\\formchek\\browser
                        npx vercel --token ${vercelToken} --prod --confirm > ..\\..\\..\\deploy.txt 2>&1
                    """

                    bat '''
                        echo === Deploy logs ===
                        if exist deploy.txt (
                            type deploy.txt
                            echo Searching for deployment URL:
                            findstr /i "https://" deploy.txt || echo No URL found
                        )
                    '''
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                echo '🔍 Verifying deployment...'
                bat '''
                    if exist deploy.txt (
                        echo Final deployment status:
                        type deploy.txt
                        echo.
                        echo Looking for deployment URL:
                        findstr /C:"https://" deploy.txt
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
                if exist deploy.txt (
                    echo ✅ Checking deployment URL:
                    findstr /C:"https://" deploy.txt || echo No deployment URL found
                )
            '''
        }
        failure {
            echo '❌ Pipeline failed!'
            bat '''
                echo Checking logs:
                if exist deploy.txt (type deploy.txt)
            '''
        }
    }
}
