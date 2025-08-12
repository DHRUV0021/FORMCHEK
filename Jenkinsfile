pipeline {
  agent any

  environment {
    // Jenkins credentials id (Secret text)
    VERCEL_TOKEN = credentials('dbQPRXp6njR9J18nOBRH0z91')
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/DHRUV0021/FORMCHEK', branch: 'master'
      }
    }

    stage('Install dependencies') {
      steps {
        bat 'npm install --legacy-peer-deps'
      }
    }

    stage('Build') {
  steps {
    echo 'Starting build...'
    bat 'npm run build'
    echo 'Build completed.'
  }
}

stage('Deploy to Vercel') {
  steps {
    echo 'Starting deploy...'
    bat '''
      npm install -g vercel
      vercel --prod --token %VERCEL_TOKEN% --confirm --cwd dist/formchek > deploy.txt
      type deploy.txt
    '''
    echo 'Deploy completed.'
  }
}
  }

  post {
    success {
      echo 'Deployed to Vercel successfully!'
    }
    failure {
      echo 'Build or deploy failed. Check console output.'
    }
  }
}
