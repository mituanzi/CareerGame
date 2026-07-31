/* ================= 主逻辑控制 ================= */
const Game = {
    state: {
        identity: 'worker',
        energy: 50,
        meaning: 50,
        money: 50,
        tracks: {}
    },
    
    history: [],
    currentIndex: 0,
    currentRole: null,
    events: [],

    /* 1. 身份选择 */
    selectIdentity(type) {
        this.state.identity = type;
        
        const introText = type === 'student' 
            ? "年轻的你站在人生的岔路口，每一次选择都将塑造未来的模样。" 
            : "在职场摸爬滚打多年的你，是否还记得当初为何出发？";
        
        document.getElementById('role-intro').innerText = introText;
        this.showScreen('screen-role');
    },

    /* 2. 开始游戏 */
    start(role) {
        this.currentRole = role;
        
        // 【核心】应用主题皮肤 (theme-coder, theme-finance 等)
        // 这一步会让 CSS 变量生效，界面变色
        document.body.className = `theme-${role}`;

        // 初始化状态
        this.state.energy = 50;
        this.state.meaning = 50;
        this.state.money = 50;
        this.state.tracks = {};
        this.history = [];
        
        // 洗牌
        this.events = this.shuffle([...GameData.events]);
        this.currentIndex = 0;
        
        // 【新增】更新 HUD 显示的角色名
        const roleNames = {
            coder: "程序员",
            finance: "金融民工",
            soe: "央企职员",
            civil: "体制内",
            academic: "高校青椒",
            medical: "医务工作者"
        };
        document.getElementById('hud-role').innerText = roleNames[role] || "职场人";
        document.getElementById('hud-time').innerText = "周一 09:00";

        this.showScreen('screen-game');
        this.updateStats();
        this.loadEvent(0);
    },

    /* 3. 加载事件 */
    loadEvent(index) {
        if (index >= this.events.length) {
            this.endGame('normal');
            return;
        }

        const event = this.events[index];
        
        // 简单的时间推进模拟
        const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        document.getElementById('hud-time').innerText = `${days[index % 7]} ${(9 + index * 2) % 24}:00`;

        // 填充事件文本
        document.getElementById('event-text').innerText = event.text;

        // 填充按钮选项
        const btnA = document.getElementById('btn-a');
        const btnB = document.getElementById('btn-b');
        
        if (event.options && event.options.length >= 2) {
            btnA.innerText = event.options[0].text;
            btnB.innerText = event.options[1].text;
        }
    },

    /* 4. 处理选择 */
    handleAction(optionIndex) {
        const event = this.events[this.currentIndex];
        const option = event.options[optionIndex];

        // 记录历史
        this.history.push({ event: event, choice: option.text });

        // 更新数值
        if (option.effect) {
            // 安全取值，防止未定义
            const e = option.effect.energy || 0;
            const m = option.effect.meaning || 0;
            const y = option.effect.money || 0;
            
            this.state.energy += e;
            this.state.meaning += m;
            this.state.money += y;
            
            // 边界限制 (0-100)
            this.state.energy = Math.max(0, Math.min(100, this.state.energy));
            this.state.meaning = Math.max(0, Math.min(100, this.state.meaning));
            this.state.money = Math.max(0, Math.min(100, this.state.money));
        }

        // 记录关键轨迹
        if (option.track) {
            this.state.tracks[option.track] = true;
        }

        this.updateStats();
        
        // 判断特殊结局 (比如能量归零)
        if (this.state.energy <= 0) {
            this.endGame('burnout');
            return;
        }

        // 进入下一回合
        this.currentIndex++;
        this.loadEvent(this.currentIndex);
    },

    /* 5. 更新界面数值 */
    updateStats() {
        // 数值更新
        document.getElementById('val-energy').innerText = this.state.energy;
        document.getElementById('val-meaning').innerText = this.state.meaning;
        document.getElementById('val-money').innerText = this.state.money;

        // 简单的脉冲动效
        const orbs = document.querySelectorAll('.stat-orb');
        orbs.forEach(orb => {
            orb.classList.add('pulse');
            setTimeout(() => orb.classList.remove('pulse'), 300);
        });
    },

    /* 6. 结束游戏 */
    endGame(reason) {
        const result = this.calculateResult(reason);
        
        // 生成报告 HTML (适配 CSS 结构)
        const resultHTML = `
            <div class="report-card">
                <div class="report-header">
                    <span class="report-icon">${result.icon}</span>
                    <div>
                        <div class="report-title">${result.title}</div>
                        <span class="report-sub">${result.sub}</span>
                    </div>
                </div>
                
                <div class="radar-grid">
                    <div class="radar-item">
                        <span class="radar-name">能量</span>
                        <span class="radar-score">${this.state.energy}</span>
                    </div>
                    <div class="radar-item">
                        <span class="radar-name">意义</span>
                        <span class="radar-score">${this.state.meaning}</span>
                    </div>
                    <div class="radar-item">
                        <span class="radar-name">收益</span>
                        <span class="radar-score">${this.state.money}</span>
                    </div>
                </div>

                <div class="diag-box">
                    <div class="diag-title">🧠 职业诊断</div>
                    <div class="diag-text">${result.diagnosis}</div>
                </div>
            </div>
            <button class="btn-restart" onclick="Game.restart()">重新开始</button>
        `;

        document.getElementById('result-content').innerHTML = resultHTML;
        this.showScreen('screen-result');
    },

    calculateResult(reason) {
        // 根据数值计算结局
        let title, icon, sub, diagnosis;
        const avg = (this.state.energy + this.state.meaning + this.state.money) / 3;

        if (reason === 'burnout') {
            title = "职业倦怠";
            icon = "🔋";
            sub = "能量耗尽，不得不停下来";
            diagnosis = "长期的高压透支了你的身心。记住，职场是马拉松，不是百米冲刺。请务必重视休息与调整。";
        } else if (avg > 80) {
            title = "职场赢家";
            icon = "🏆";
            sub = "你找到了完美的平衡点";
            diagnosis = "你在保持身心健康的同时，实现了经济自由和自我价值，这是职场人的终极形态。";
        } else if (avg > 50) {
            title = "中坚力量";
            icon = "🛡️";
            sub = "虽有波折，但仍稳步前行";
            diagnosis = "你的职场之路虽有不易，但你证明了韧性。或许可以思考一下，哪一项指标是你下一步的提升点。";
        } else {
            title = "觉醒边缘";
            icon = "🌑";
            sub = "或许需要停下来思考了";
            diagnosis = "现在的状态令人担忧。继续这样下去可能会面临职业倦怠。建议重新审视你的工作方式和目标。";
        }

        return { title, icon, sub, diagnosis };
    },

    restart() {
        document.body.className = ''; // 重置主题色
        this.showScreen('screen-id');
    },

    /* 工具函数 */
    showScreen(screenId) {
        document.querySelectorAll('.container').forEach(el => el.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    },
    
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
};
