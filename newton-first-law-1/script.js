// 应用风格配置
function applyStyleConfig() {
  const style = {
    colorScheme: {
      primary: "#4A6FA5",
      secondary: "#FF6B6B",
      accent: "#6ECCAF",
      background: "#F9F7F7",
      text: "#333333"
    },
    typography: {
      heading: "'Fredoka One', cursive",
      body: "'Nunito', sans-serif"
    },
    elements: {
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      animationSpeed: "0.3s"
    },
    components: {
      button: {
        padding: "10px 20px",
        hoverEffect: "scale(1.05)"
      },
      card: {
        padding: "20px",
        margin: "15px 0"
      }
    }
  };

  document.documentElement.style.setProperty('--primary', style.colorScheme.primary);
  document.documentElement.style.setProperty('--secondary', style.colorScheme.secondary);
  document.documentElement.style.setProperty('--accent', style.colorScheme.accent);
  document.documentElement.style.setProperty('--background', style.colorScheme.background);
  document.documentElement.style.setProperty('--text', style.colorScheme.text);
  document.documentElement.style.setProperty('--border-radius', style.elements.borderRadius);
  document.documentElement.style.setProperty('--box-shadow', style.elements.boxShadow);
  document.documentElement.style.setProperty('--animation-speed', style.elements.animationSpeed);
}

// 公交车动画
function setupBusAnimation() {
  const busStartBtn = document.getElementById('bus-start');
  const busStopBtn = document.getElementById('bus-stop');
  const passenger = document.querySelector('.passenger');
  const bus = document.querySelector('.bus');

  busStartBtn.addEventListener('click', () => {
    bus.style.transform = 'translateX(50px)';
    passenger.style.transform = 'translateX(-15px) rotate(-5deg)';
  });

  busStopBtn.addEventListener('click', () => {
    bus.style.transform = 'translateX(0)';
    passenger.style.transform = 'translateX(15px) rotate(5deg)';

    // 重置动画
    setTimeout(() => {
      passenger.style.transform = 'translateX(0) rotate(0)';
    }, 500);
  });
}

// 实验功能
function setupExperiment() {
  const frictionSlider = document.getElementById('friction');
  const forceSlider = document.getElementById('force');
  const frictionValue = document.getElementById('friction-value');
  const forceValue = document.getElementById('force-value');
  const startBtn = document.getElementById('start-experiment');
  const resetBtn = document.getElementById('reset-experiment');
  const cart = document.getElementById('experiment-cart');
  const forceIndicator = document.querySelector('.force-indicator');

  // 更新滑块值显示
  frictionSlider.addEventListener('input', () => {
    frictionValue.textContent = `${frictionSlider.value}%`;
  });

  forceSlider.addEventListener('input', () => {
    forceValue.textContent = `${forceSlider.value}%`;
  });

  // 开始实验
  startBtn.addEventListener('click', () => {
    const friction = parseInt(frictionSlider.value) / 100;
    const force = parseInt(forceSlider.value);

    // 显示推力指示器
    forceIndicator.style.width = `${force * 2}px`;

    // 重置位置
    cart.style.left = '50px';

    // 模拟运动
    let position = 50;
    let velocity = force / 10;
    const deceleration = friction * 0.2;

    const moveCart = () => {
      velocity -= deceleration;
      position += velocity;

      // 获取实验区域宽度
      const experimentArea = document.querySelector('.experiment-area');
      const areaWidth = experimentArea.clientWidth;

      // 计算最大位置（距离右侧50px）
      const maxPosition = areaWidth - 60 - 50; // 60是物体宽度，50是右侧边距

      // 停止条件：速度<=0 或 到达右侧边界
      if (velocity <= 0 || position >= maxPosition) {
        // 确保不会超过边界
        if (position > maxPosition) {
          position = maxPosition;
          cart.style.left = `${position}px`;
        }
        // 停止动画
        forceIndicator.style.width = '0';
        return;
      }

      cart.style.left = `${position}px`;
      requestAnimationFrame(moveCart);
    };

    moveCart();
  });

  // 重置实验
  resetBtn.addEventListener('click', () => {
    cart.style.left = '50px';
    forceIndicator.style.width = '0';
  });
}

// 测验功能
function setupQuiz() {
  const quizContainer = document.querySelector('.quiz-container');
  const quizData = content.quiz;

  let html = '';

  quizData.forEach((q, qIndex) => {
    html += `
      <div class="quiz-item">
        <div class="quiz-question">${qIndex + 1}. ${q.question}</div>
        <div class="quiz-options">
    `;

    q.options.forEach((option, oIndex) => {
      html += `
        <div class="quiz-option" data-question="${qIndex}" data-option="${oIndex}">
          ${option}
        </div>
      `;
    });

    html += `
        </div>
        <div class="explanation" id="explanation-${qIndex}">
          <strong>解释:</strong> ${q.explanation}
        </div>
      </div>
    `;
  });

  quizContainer.innerHTML = html;

  // 添加选项选择事件
  const options = document.querySelectorAll('.quiz-option');
  options.forEach(option => {
    option.addEventListener('click', function () {
      const questionIndex = this.dataset.question;
      const optionIndex = parseInt(this.dataset.option);
      const correctIndex = quizData[questionIndex].answer;
      const explanation = document.getElementById(`explanation-${questionIndex}`);

      // 移除同问题其他选项的选择状态
      const siblings = document.querySelectorAll(`.quiz-option[data-question="${questionIndex}"]`);
      siblings.forEach(sib => sib.classList.remove('selected', 'correct', 'incorrect'));

      // 添加选择状态
      this.classList.add('selected');

      // 检查答案
      if (optionIndex === correctIndex) {
        this.classList.add('correct');
      } else {
        this.classList.add('incorrect');
        // 高亮显示正确答案
        siblings[correctIndex].classList.add('correct');
      }

      // 显示解释
      explanation.style.display = 'block';
    });
  });
}

// 生活实例展示
function setupRealLifeExamples() {
  const examplesContainer = document.querySelector('.examples-container');
  let html = '';

  content.realLifeExamples.forEach(example => {
    html += `
      <div class="example-card">
        <div class="example-icon">⚡</div>
        <div class="example-text">${example}</div>
      </div>
    `;
  });

  examplesContainer.innerHTML = html;
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  applyStyleConfig();
  setupBusAnimation();
  setupExperiment();
  setupQuiz();
  setupRealLifeExamples();

  // 动态更新标题
  document.getElementById('main-title').textContent = content.title;
});
