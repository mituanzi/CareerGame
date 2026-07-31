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
        
        // 【关键修复】调用渲染角色的函数
        this.renderRoles();
        
        this.showScreen('screen-role');
    },

    /* 【新增】2. 渲染角色卡片 */
    renderRoles() {
        const container = document.getElementById('role-container');
        container.innerHTML = ''; // 先清空

        // 如果 data.js 里没有定义 roles，这里给一个默认列表兜底
        const roles = GameData.roles || [
            { id: 'coder', name: '程序员', icon: '👨‍💻' },
            { id: 'finance', name: '金融民工', icon: '📈' },
            { id: 'soe', name: '央企职员', icon: '🏢' },
            { id: 'civil', name: '体制内', icon: '☕️' },
            { id: 'academic', name: '高校青椒', icon: '📚' },
            { id: 'medical', name: '医务工作者', icon: '🏥' }
        ];

        // 循环生成卡片
        roles.forEach(role => {
            const card = document.createElement('div');
            card.className = 'role-card';
            // 点击时触发 start 函数
            card.onclick = () => this.start(role.id);
            
            // 填充卡片内容
            card.innerHTML = `
                <span class="role-icon">${role.icon}</span>
                <div class="role-name">${role.name}</div>
            `;
            container.appendChild(card);
        });
    },

    /* 3. 开始游戏 */
    start(role) {
        this.currentRole = role;
        
        // 应用主题皮肤
        document.body.className = `theme-${role}`;

        // 初始化状态
        this.state.energy = 50;
        this.state.meaning = 50;
        this.state.money = 50;
        this.state.tracks = {};
        this.history = [];
        
        // 洗牌
        if (typeof GameData !== 'undefined' && GameData.events) {
            this.events = this.shuffle([...GameData.events]);
        } else {
            // 兜底数据，防止 data.js 没加载报错
            this.events = [{ text: "测试事件", options: [{text:"A", effect:{energy:1}}, {text:"B", effect:{money:1}}] }];
        }
        this.currentIndex = 0;
        
        // 更新 HUD
        const roleNames = {
            coder: "程序员", finance: "金融民工", soe: "央企职员",
            civil: "体制内", academic: "高校青椒", medical: "医务工作者"
        };
        document.getElementById('hud-role').innerText = roleNames[role] || "职场人";
        document.getElementById('hud-time').innerText = "周一 09:00";

        this.showScreen('screen-game');
        this.updateStats();
        this.loadEvent(0);
    },

    /* 4. 加载事件 */
    loadEvent(index) {
        if (index >= this.events.length) {
            this.endGame('normal');
            return;
        }

        const event = this.events[index];
        
        // 更新时间
        const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        document.getElementById('hud-time').innerText = `${days[index % 7]} ${(9 + index * 2) % 24}:00`;

        // 填充文本
        document.getElementById('event-text').innerText = event.text;

        const btnA = document.getElementById('btn-a');
        const btnB = document.getElementById('btn-b');
        
        if (event.options && event.options.length >= 2) {
            btnA.innerText = event.options[0].text;
            btnB.innerText = event.options[1].text;
        }
    },

    /* 5. 处理选择 */
    handleAction(optionIndex) {
        const event = this.events[this.currentIndex];
        const option = event.options[optionIndex];

        this.history.push({ event: event, choice: option.text });

        if (option.effect) {
            const e = option.effect.energy || 0;
            const m = option.effect.meaning || 0;
            const y = option.effect.money || 0;
            
            this.state.energy += e;
            this.state.meaning += m;
            this.state.money += y;
            
            this.state.energy = Math.max(0, Math.min(100, this.state.energy));
            this.state.meaning = Math.max(0, Math.min(100, this.state.meaning));
            this.state.money = Math.max(0, Math.min(100, this.state.money));
        }

        if (option.track) {
            this.state.tracks[option.track] = true;
        }

        this.updateStats();
        
        if (this.state.energy <= 0) {
            this.endGame('burnout');
            return;
        }

        this.currentIndex++;
        this.loadEvent(this.currentIndex);
    },

    /* 6. 更新界面 */
    updateStats() {
        document.getElementById('val-energy').innerText = this.state.energy;
        document.getElementById('val-meaning').innerText = this.state.meaning;
        document.getElementById('val-money').innerText = this.state.money;
    },

    /* 7. 结束游戏 */
    endGame(reason) {
        const result = this.calculateResult(reason);
        
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
                    <div class="radar-item"><span class="radar-name">能量</span><span class="radar-score">${this.state.energy}</span></div>
                    <div class="radar-item"><span class="radar-name">意义</span><span class="radar-score">${this.state.meaning}</span></div>
                    <div class="radar-item"><span class="radar-name">收益</span><span class="radar-score">${this.state.money}</span></div>
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
        let title, icon, sub, diagnosis;
        const avg = (this.state.energy + this.state.meaning + this.state.money) / 3;

        if (reason === 'burnout') {
            title = "职业倦怠"; icon = "🔋"; sub = "能量耗尽，不得不停下来";
            diagnosis = "长期的高压透支了你的身心。请务必重视休息。";
        } else if (avg > 80) {
            title = "职场赢家"; icon = "🏆"; sub = "你找到了完美的平衡点";
            diagnosis = "你在保持身心健康的同时，实现了经济自由和自我价值。";
        } else if (avg > 50) {
            title = "中坚力量"; icon = "🛡️"; sub = "虽有波折，但仍稳步前行";
            diagnosis = "你的职场之路虽有不易，但你证明了韧性。";
        } else {
            title = "觉醒边缘"; icon = "🌑"; sub = "或许需要停下来思考了";
            diagnosis = "现在的状态令人担忧。建议重新审视你的工作方式。";
        }
        return { title, icon, sub, diagnosis };
    },

    restart() {
        document.body.className = '';
        this.showScreen('screen-id');
    },

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
