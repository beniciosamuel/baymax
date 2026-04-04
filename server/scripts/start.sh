main() {
  echo "Starting server..."

  npm run build

  exec nodemon
}

main "$1"
