# Build reactjs app with production mode
npm run build

# Move to build folder
cd dist

# Clone index.html into 200.html
cp index.html 200.html

# Start deploying via Surge
# The command means deploy current folder to domain paul-photo-app.surge.sh
npx surge . class_demo.surge.sh