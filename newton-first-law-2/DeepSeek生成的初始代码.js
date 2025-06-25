document.addEventListener('DOMContentLoaded', function () {
  // 摩擦力滑块控制
  const frictionSlider = document.getElementById('frictionSlider');
  const frictionValue = document.getElementById('frictionValue');
  const physicsObject = document.getElementById('physicsObject');

  frictionSlider.addEventListener('input', function () {
    frictionValue.textContent = this.value + '%';
    const friction = parseInt(this.value);

    // 根据摩擦力改变物体外观
    if (friction < 30) {
      physicsObject.style.backgroundColor = '#FF6B6B';
    } else if (friction < 70) {
      physicsObject.style.backgroundColor = '#4A90E2';
    } else {
      physicsObject.style.backgroundColor = '#FFD166';
    }
  });

  // 模拟器按钮控制
  document.getElementById('startBtn').addEventListener('click', function () {
    physicsObject.style.transition = 'left 3s linear';
    physicsObject.style.left = 'calc(100% - 70px)';
  });

  document.getElementById('stopBtn').addEventListener('click', function () {
    physicsObject.style.transition = 'none';
  });

  document.getElementById('resetBtn').addEventListener('click', function () {
    physicsObject.style.transition = 'left 0.5s ease';
    physicsObject.style.left = '50px';
  });

  // 填空题检查
  document.getElementById('checkBlankBtn').addEventListener('click', function () {
    const feedback = document.getElementById('blankFeedback');
    feedback.classList.remove('hidden');
    feedback.textContent = "✓ 太棒了！定律表述完全正确！";
    feedback.className = "feedback success";
  });

  // 测验题逻辑
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
  document.getElementById('checkQuizBtn').addEventListener('click', function () {
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
  document.getElementById('resetQuizBtn').addEventListener('click', function () {
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(option => {
      option.classList.remove('selected', 'correct', 'incorrect');
    });

    const feedback = document.getElementById('quizFeedback');
    feedback.classList.add('hidden');
  });
});
