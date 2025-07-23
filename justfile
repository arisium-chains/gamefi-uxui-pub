# WLD Wacky Racers - Just Commands

# Start development server
dev:
    npm run dev

# Build the project
build:
    npm run build

# Start production server
start:
    npm run start

# Run linting
lint:
    npm run lint

# Install dependencies
install:
    npm install

# Clean and reinstall dependencies
clean-install:
    rm -rf node_modules package-lock.json
    npm install

# Run tests (if available)
test:
    npm test

# Build and start production
prod: build start

# Development with auto-restart
dev-watch:
    npm run dev --turbo

# Show available commands
help:
    @just --list