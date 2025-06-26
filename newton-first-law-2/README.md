[TOC]

## 效果

![](./README_assets/1-screenshot.gif)

## 提示词

下面这版提示词失败了，但还是有意义的。

```markdown
## 角色

大佬，你是一名特级高中物理老师，擅长开发青少年互动教育内容，寓教于乐地教学生物理知识。请叫我hans7。

## 目标

我希望实现一个网页，教牛顿第一定律。请输出一篇详细的技术方案。不要直接编写完整代码，编写完整代码前必须征得我的同意。

拆解：

1. 该网页风格应活泼灵动、具备视觉吸引力、交互性强、寓教于乐。
2. 在技术方案中，应给出一个json文件，描述页面风格。
3. 包含支持直链的卡通风格图。

## 目标用户

15岁的高一学生Hans，其喜爱的卡通形象为名侦探柯南。

## 页面框架

1. 标题栏：包含标题和emoji。
2. 学习伙伴：名侦探柯南。
3. 知识讲解：分为多个小节，重点和难点需采用不同颜色的高亮强调。
4. 实验互动模块：概念类：交互模拟器。记忆类：填空、朗读挑战。
5. “知识挑战”测验：单选题。
6. 总结鼓励：学习伙伴再现。

## 技术栈

1. 仅限于HTML+CSS3+JavaScript，分为不同文件。
2. 如有需要，可引用图片素材库Unsplash。
3. 所有的文案都放在一个单独的JS配置文件。
```

改进：

```markdown
## 角色

大佬，你是一名特级高中物理老师，擅长开发青少年互动教育内容，寓教于乐地教学生物理知识。请叫我hans7。

## 目标

我希望实现一个网页，教牛顿第一定律。

拆解：

1. 该网页风格应活泼灵动、具备视觉吸引力、交互性强、寓教于乐。
2. 描述页面风格的JSON文件如下：

{
  "colorPalette": {
    "primary": "#4A90E2",
    "secondary": "#FF6B6B",
    "accent": "#FFD166",
    "background": "RGB(178,222,236)", // 淡蓝色
    "sectionBackground": "RGB(130,205,230)" // 天蓝色
    // 文字颜色请自行确定，应与 sectionBackground 相配
  },
  "typography": {
    "titleFont": "'Fredoka One', cursive",
    "bodyFont": "'Nunito', sans-serif",
    "titleSize": "2.5rem",
    "sectionTitleSize": "1.8rem"
  },
  "effects": {
    "cardShadow": "0 8px 16px rgba(0,0,0,0.1)",
    "hoverScale": "scale(1.03)",
    "transition": "all 0.3s ease"
  },
  "borderRadius": "12px",
  "animationIntensity": "medium"
}

## 目标用户

15岁的高一学生Hans，其喜爱的卡通形象为名侦探柯南。

## 页面框架

1. 标题栏：包含标题和emoji。
2. 学习伙伴：名侦探柯南。素材见《必须用到的素材》
3. 知识讲解：分为多个小节，重点和难点需采用不同颜色的高亮强调。
4. 实验互动模块：概念类：交互模拟器。记忆类：填空、朗读挑战。
5. “知识挑战”测验：单选题。
6. 总结鼓励：学习伙伴再现。

## 必须用到的素材

- 思考中的柯南：`./assets/conan-thinking.png`，1328px*1328px
- 点赞的柯南：`./assets/conan-thumb-up.png`，1328px*1328px

## 技术栈

1. 仅限于HTML+CSS3+JavaScript。注意，三者应分为不同文件。
2. 如有需要，可引用图片素材库Unsplash。
3. 所有的文案应放在一个单独的JS配置文件`config.js`。
```

### 后续改动

```markdown
大佬，请参考下面这段代码修改“惯性模拟实验室”的逻辑，使之与下面代码的逻辑一致。注意：你只需要输出代码修改的部分，不要输出与本次需求无关的部分。

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
```

DeepSeek胡乱生成了些东西，我就继续说：“大佬，不要改动“惯性模拟实验室”原有的HTML代码和CSS代码，而是调整我刚刚给你的JS代码，适配当前已有HTML和CSS代码。”结果看到它继续投机取巧，我就放弃了，人工进行适配。

```markdown
大佬，请帮我为“记忆挑战”的3个blank增加填空能力，初始值为空字符串，并实现判定逻辑。注意：你只需要输出代码修改的部分，不要输出与本次需求无关的部分。
```

这次输出的代码没问题，直接用了，只是不优雅。
