// 生活实例展示
function setupRealLifeExamples() {
  const examplesContainer = document.querySelector('.life-examples-container');
  const html = config.realLifeExamples.reduce((html, example) => {
    return html + `
      <div class="life-example-card">
        <div class="example-icon">⚡</div>
        <div class="example-text">${example}</div>
      </div>
    `;
  }, '');
  examplesContainer.innerHTML = html;
}

function setupExperiment() {
  // 摩擦力滑块控制
  const frictionSlider = document.getElementById('frictionSlider');
  const forceSlider = document.getElementById('forceSlider');
  const frictionValue = document.getElementById('frictionValue');
  const forceValue = document.getElementById('forceValue');
  const physicsObject = document.getElementById('physicsObject');
  const experimentArea = document.querySelector('.physics-simulator');

  frictionSlider.addEventListener('input', (e) => {
    frictionValue.textContent = e.target.value + '%';
    const friction = parseInt(e.target.value);

    // 根据摩擦力改变物体外观
    if (friction < 30) {
      physicsObject.style.backgroundColor = '#FF6B6B';
    } else if (friction < 70) {
      physicsObject.style.backgroundColor = '#4A90E2';
    } else {
      physicsObject.style.backgroundColor = '#FFD166';
    }
  });

  forceSlider.addEventListener('input', (e) => {
    forceValue.textContent = e.target.value + '%';
  });

  // 模拟器按钮控制
  document.getElementById('startBtn').addEventListener('click', () => {
    const friction = parseInt(frictionSlider.value) / 100;
    const force = parseInt(forceSlider.value);

    // 重置位置
    physicsObject.style.left = '50px';

    // 模拟运动
    let position = 50;
    let velocity = force / 10;
    const deceleration = friction * 0.2;

    const movePhysicsObject = () => {
      velocity -= deceleration;
      position += velocity;

      // 获取实验区域宽度
      const areaWidth = experimentArea.clientWidth;

      // 计算最大位置（距离右侧50px）
      const maxPosition = areaWidth - 60 - 50; // 60是物体宽度，50是右侧边距

      // 停止条件：速度<=0 或 到达右侧边界
      if (velocity <= 0 || position >= maxPosition) {
        // 确保不会超过边界
        if (position > maxPosition) {
          position = maxPosition;
          physicsObject.style.left = `${position}px`;
        }
        return;
      }

      physicsObject.style.left = `${position}px`;
      requestAnimationFrame(movePhysicsObject);
    };

    movePhysicsObject();
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    physicsObject.style.left = '50px';
  });
}

function setupMemorizationChallenge() {
  const blank1 = document.getElementById('blank1');
  const blank2 = document.getElementById('blank2');
  const blank3 = document.getElementById('blank3');
  const blanks = [blank1, blank2, blank3];
  const checkBlankBtn = document.getElementById('checkBlankBtn');
  const blankFeedback = document.getElementById('blankFeedback');

  const correctAnswers = {
    blank1: "匀速直线运动",
    blank2: "静止状态",
    blank3: "外力"
  };

  // 检查填空答案
  checkBlankBtn.addEventListener('click', function () {
    const answer1 = blank1.value.trim();
    const answer2 = blank2.value.trim();
    const answer3 = blank3.value.trim();

    const isCorrect1 = checkAnswer(answer1, correctAnswers.blank1);
    const isCorrect2 = checkAnswer(answer2, correctAnswers.blank2);
    const isCorrect3 = checkAnswer(answer3, correctAnswers.blank3);
    const correctCount = isCorrect1 + isCorrect2 + isCorrect3;

    // 更新输入框样式
    updateBlankStyle(blank1, isCorrect1);
    updateBlankStyle(blank2, isCorrect2);
    updateBlankStyle(blank3, isCorrect3);

    if (correctCount === blanks.length) {
      blankFeedback.textContent = "✔️ 太棒了！所有填空都正确！";
      blankFeedback.className = "feedback success";
    } else {
      blankFeedback.textContent = `💡 你填对了 ${correctCount} / ${blanks.length} 个空，请再检查一下，加油！`;
      blankFeedback.className = "feedback failure";
    }

    blankFeedback.classList.remove('hidden');
  });

  // 检查单个答案
  function checkAnswer(userAnswer, correctAnswer) {
    return userAnswer === correctAnswer;
  }

  // 更新输入框样式
  function updateBlankStyle(inputElement, isCorrect) {
    inputElement.classList.remove('correct', 'incorrect');

    if (isCorrect) {
      inputElement.classList.add('correct');
    } else {
      inputElement.classList.add('incorrect');
    }
  }

  // 添加回车键提交功能
  blanks.forEach(input => {
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        checkBlankBtn.click();
      }
    });
  });
}

// 测验题逻辑
function setupQuiz() {
  const options = document.querySelectorAll('.option');
  let selectedOptions = [];

  options.forEach(option => {
    option.addEventListener('click', function () {
      // 移除同组其他选项的选中状态
      const question = this.closest('.question');
      const questionOptions = question.querySelectorAll('.option');
      questionOptions.forEach(opt => opt.classList.remove('selected'));

      // 标记当前选中选项
      this.classList.add('selected');
      selectedOptions.push(this);
    });
  });

  // 检查测验答案
  document.getElementById('checkQuizBtn').addEventListener('click', () => {
    const feedback = document.getElementById('quizFeedback');
    feedback.classList.remove('hidden');

    let correctCount = 0;
    const allOptions = document.querySelectorAll('.option');

    allOptions.forEach(option => {
      option.classList.remove('correct', 'incorrect');

      if (option.classList.contains('selected')) {
        const isCorrect = option.getAttribute('data-correct') === 'true';

        if (isCorrect) {
          option.classList.add('correct');
          correctCount++;
        } else {
          option.classList.add('incorrect');
        }
      }
    });

    if (correctCount === 3) {
      feedback.textContent = "🎉 太棒了！全部回答正确！你对牛顿第一定律掌握得很好！";
      feedback.className = "feedback success";
    } else {
      feedback.textContent = `💡 你答对了 ${correctCount}/3 题。再复习一下知识点，你一定能掌握！`;
      feedback.className = "feedback failure";
    }
  });

  // 重置测验
  document.getElementById('resetQuizBtn').addEventListener('click', () => {
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(option => {
      option.classList.remove('selected', 'correct', 'incorrect');
    });

    const feedback = document.getElementById('quizFeedback');
    feedback.classList.add('hidden');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupRealLifeExamples();
  setupExperiment();
  setupMemorizationChallenge();
  setupQuiz();
});
