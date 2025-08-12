pipeline {
  agent any

  environment {
    // Jenkins credentials id (Secret text) used above
    VERCEL_TOKEN = credentials('8DqOKY0T1eFASXAfU5nVGl1u')
    // OPTIONAL: set if you need scope/org/project; not required if using --cwd to dist
    // VERCEL_ORG = 'your-vercel-org'
    // VERCEL_PROJECT = 'your-vercel-project'
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/your-username/your-angular-repo.git', branch: 'main'
      }
    }

    stage('Install dependencies') {
      steps {
        // runs on Windows agent
        bat 'npm ci'
      }
    }

    stage('Build') {
      steps {
        // Make sure this builds into dist/<appname>
        bat 'npm run build'
      }
    }

    stage('Deploy to Vercel') {
      steps {
        // replace <app-name> with the folder name inside dist
        bat """
          npm install -g vercel
          vercel --prod --token=%VERCEL_TOKEN% --confirm --cwd dist\\<app-name>
        """
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
