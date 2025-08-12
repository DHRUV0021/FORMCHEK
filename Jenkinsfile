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
        bat 'npm run build'
      }
    }

    stage('Deploy to Vercel') {
      steps {
        bat """
          npm install -g vercel
          vercel --prod --token %VERCEL_TOKEN% --confirm --cwd dist/formchek > deploy.txt
          type deploy.txt
        """
        // Parse deploy.txt to extract URL (optional)
        script {
          def deployLog = readFile('deploy.txt')
          def matcher = deployLog =~ /https:\\/\\/[^\\s]+/
          if (matcher.find()) {
            echo "Deployed URL: ${matcher.group(0)}"
          } else {
            echo "Could not find deployed URL in logs."
          }
        }
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
