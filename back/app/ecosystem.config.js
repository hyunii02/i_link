module.exports = {
  apps: [
    {
      name: "app",
      script: "./app.js",
      watch: "false",
      ignore_watch: ["*.log"],
      exec_mode: "cluster",
      autorestart: true,
      wait_ready: true, // Node.js 앱으로부터 앱 실행 시작 신호를 직접 받겠다
      listen_timeout: 50000, // 앱 실행 신호까지 기다릴 최대 시간 (단위: ms)
      kill_timeout: 5000, // 새 프로세스 실행 완료 후 예전 프로세스 교체하기까지 기다리는 시간
    },
  ],
};
