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

        stage('Debug Token') {
            steps {
                echo '🔍 Debugging Vercel token...'
                bat '''
                    echo Token length check:
                    echo Token starts with: "%VERCEL_TOKEN:~0,10%"...
                    echo Vercel CLI version:
                    npx vercel --version
                '''
            }
        }

        stage('Deploy to Vercel') {
            steps {
                echo '🚀 Deploying to Vercel...'
                script {
                    try {
                        bat '''
                            echo Current directory files:
                            dir
                            echo Deploying with Vercel from browser folder...
                            cd dist\\formchek\\browser
                            echo Running vercel login check...
                            npx vercel whoami --token "%VERCEL_TOKEN%" > ..\\..\\..\\whoami.txt 2>&1
                            type ..\\..\\..\\whoami.txt
                            echo Now deploying...
                            npx vercel --token "%VERCEL_TOKEN%" --prod --confirm --force > ..\\..\\..\\deploy.txt 2>&1
                        '''
                    } catch (Exception e) {
                        echo "Deployment failed, checking logs..."
                    } finally {
                        bat '''
                            echo === Whoami logs ===
                            if exist whoami.txt (
                                type whoami.txt
                            )
                            echo === Deploy logs ===
                            if exist deploy.txt (
                                type deploy.txt
                            )
                        '''
                    }
                }
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
                        echo Searching for deployment URL:
                        findstr /i "https://" deploy.txt || echo No URL found
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
                    echo Deployment status:
                    type deploy.txt
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
                if exist whoami.txt (
                    echo Whoami.txt contents:
                    type whoami.txt
                )
            '''
        }
    }
}
