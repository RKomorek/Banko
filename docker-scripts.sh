#!/bin/bash

# Scripts para facilitar o uso do Docker com a aplicação Banko

echo "🐳 Scripts Docker para Banko"
echo "=============================="

case "$1" in
  "build")
    echo "🔨 Construindo imagem Docker..."
    docker build -t banko-app .
    ;;
  
  "dev")
    echo "🚀 Iniciando ambiente de desenvolvimento..."
    docker-compose --profile dev up -d banko-dev
    echo "✅ Aplicação rodando em: http://localhost:3001"
    ;;
  
  "prod")
    echo "🚀 Iniciando aplicação em produção..."
    docker-compose up -d banko-app
    echo "✅ Aplicação rodando em: http://localhost:3000"
    ;;
  
  "logs")
    echo "📋 Mostrando logs..."
    docker-compose logs -f banko-app
    ;;
  
  "stop")
    echo "🛑 Parando containers..."
    docker-compose down
    ;;
  
  "clean")
    echo "🧹 Limpando containers e imagens..."
    docker-compose down --rmi all --volumes --remove-orphans
    docker system prune -f
    ;;
  
  "shell")
    echo "🐚 Abrindo shell no container..."
    docker-compose exec banko-app sh
    ;;
  
  "health")
    echo "🏥 Verificando saúde da aplicação..."
    curl -f http://localhost:3000/api/health || echo "❌ Aplicação não está respondendo"
    ;;
  
  *)
    echo "Uso: $0 {build|dev|prod|logs|stop|clean|shell|health}"
    echo ""
    echo "Comandos disponíveis:"
    echo "  build  - Construir imagem Docker"
    echo "  dev    - Iniciar ambiente de desenvolvimento"
    echo "  prod   - Iniciar aplicação em produção"
    echo "  logs   - Mostrar logs da aplicação"
    echo "  stop   - Parar todos os containers"
    echo "  clean  - Limpar containers e imagens"
    echo "  shell  - Abrir shell no container"
    echo "  health - Verificar saúde da aplicação"
    ;;
esac 