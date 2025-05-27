module.exports = {
  apps: [
    {
      name: 'my-pregnancy',
      script: 'dist/index.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs','uploads'],
      instances: 1,
      autorestart:true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 9000,
      },
    },
  ],
}
