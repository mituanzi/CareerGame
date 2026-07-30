/* 逻辑层：混合模型引擎 (通用+职业) */
const Game = {
    state: {},
    history: [],
    currentRole: '',
    currentIndex: 0,
    currentEvents: [],

    init() {
        // 动态渲染角色列表
        const container = document.getElementById('role-container');
        if(container) {
            container.innerHTML = GameData.roles.map(r => `
                <div class="role-card" onclick="Game.start('${r.id}')">
                    <span class="role-icon">${r.icon}</span>
                    <div class="role-name">${r.name}</div>
                </div>
            `).join('');
        }
    },

    selectIdentity(type) {
        this.state.identity = type;
        this.showScreen('screen-role');
        
        // 根据身份显示不同的开场白
        const introEl = document.getElementById('role-intro');
        if (type === 'student') {
            introEl.innerHTML = "这将是一次<strong style='color:#fff'>深度模拟</strong>。<br>包含价值观测试与职业情境，请跟随直觉。<br>我们将帮你预判：你是否真的适合那个职业？";
        } else {
            introEl.innerHTML = "这将是一次<strong style='color:#fff'>全面体检</strong>。<br>包含性格复盘与现状诊断，请选择真实反应。<br>我们将帮你分析：当下的工作是否正在消耗你？";
        }
    },

    showScreen(id) {
        document.querySelectorAll('.container').forEach(el => el.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    },

    // === 核心修改：混合题库生成逻辑 ===
    start(role) {
        document.body.className = `theme-${role}`;
        this.currentRole = role;
        
        // 1. 获取通用题库并洗牌
        let universalPool = GameData.universal ? [...GameData.universal] : [];
        for (let i = universalPool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [universalPool[i], universalPool[j]] = [universalPool[j], universalPool[i]];
        }

        // 2. 获取职业题库并洗牌
        let rolePool = GameData.scenarios[role] ? [...GameData.scenarios[role]] : [];
        for (let i = rolePool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rolePool[i], rolePool[j]] = [rolePool[j], rolePool[i]];
        }

        // 3. 组合题库：先测性格(5题)，再测职业(5题)
        // 总量 10 题，保证数据采样准确，又不会太累
        this.currentEvents = [
            ...universalPool.slice(0, 5), // 前 5 题：性格价值观
            ...rolePool.slice(0, 5)       // 后 5 题：职业情境
        ];

        // 4. 初始化状态
        this.state = { energy: 50, meaning: 50, money: 50, tracks: {} };
        this.history = [];
        this.currentIndex = 0;

        this.showScreen('screen-game');
        this.loadEvent(0);
    },

    loadEvent(index) {
        // 扩展时间轴以适应 10 题
        const times = [
            "价值观测试 1", "价值观测试 2", "价值观测试 3", "价值观测试 4", "价值观测试 5",
            "职业情境 1", "职业情境 2", "职业情境 3", "职业情境 4", "职业情境 5"
        ];
        
        const event = this.currentEvents[index];
        document.getElementById('hud-time').innerText = times[index];
        document.getElementById("event-text").innerText = event.text;
        document.getElementById("btn-a").innerText = event.choices.do.text;
        document.getElementById("btn-b").innerText = event.choices.reject.text;
    },

        // === 修改 1：点击交互优化 ===
    handleAction(type) {
        const event = this.currentEvents[this.currentIndex];
        const choice = event.choices[type];

        // 1. 禁用按钮，防止狂点，并显示视觉反馈
        const btnA = document.getElementById('btn-a');
        const btnB = document.getElementById('btn-b');
        btnA.disabled = true; btnB.disabled = true;
        // 这里的 innerHTML 替换可以根据需要加个 loading 小图标，这里用文字提示代替
        btnA.style.opacity = '0.5'; 
        btnB.style.opacity = '0.5';

        // 2. 模拟思考时间，增加仪式感 (延迟 300ms 执行)
        setTimeout(() => {
            // 恢复按钮状态
            btnA.disabled = false; btnB.disabled = false;
            btnA.style.opacity = '1'; btnB.style.opacity = '1';

            // 3. 数值计算逻辑
            this.state.energy += choice.effects.e;
            this.state.meaning += choice.effects.m;
            this.state.money += choice.effects.y;
            
            ['energy', 'meaning', 'money'].forEach(k => {
                this.state[k] = Math.max(0, Math.min(100, this.state[k]));
            });

            if (choice.track) this.state.tracks[choice.track] = (this.state.tracks[choice.track] || 0) + 1;
            this.history.push({ round: this.currentIndex + 1, event: event.text, choice: choice.text, track: choice.track });

            // 4. 触发数值跳动动画
            this.animateNumber('val-energy', this.state.energy);
            this.animateNumber('val-meaning', this.state.meaning);
            this.animateNumber('val-money', this.state.money);

            this.currentIndex++;
            if (this.currentIndex >= 10) {
                this.showResult();
            } else {
                this.loadEvent(this.currentIndex);
            }
        }, 300); // 300ms 的思考延迟
    },

    // === 新增：数值跳动动画函数 ===
    animateNumber(id, newValue) {
        const el = document.getElementById(id);
        // 更新数值
        el.innerText = newValue;
        // 添加动画类
        el.classList.add('pulse');
        // 动画结束后移除类，以便下次触发
        setTimeout(() => el.classList.remove('pulse'), 400);
    },

    // === 修改 2：结果页加载动画 ===
    showResult() {
        this.showScreen('screen-result');
        
        // 1. 先显示一个“分析中”的骨架屏，制造悬念感
        document.getElementById('result-content').innerHTML = `
            <div class="report-card" style="opacity: 0.8;">
                <div class="skeleton-line" style="width: 40%; height: 24px; margin-bottom: 20px;"></div>
                <div class="skeleton-line" style="width: 100%; height: 12px;"></div>
                <div class="skeleton-line" style="width: 90%; height: 12px;"></div>
                <div class="skeleton-line" style="width: 95%; height: 12px; margin-bottom: 30px;"></div>
                
                <div class="mirror-grid">
                    <div class="skeleton-line" style="height: 80px; border-radius: 12px;"></div>
                    <div class="skeleton-line" style="height: 80px; border-radius: 12px;"></div>
                </div>
                <div class="skeleton-line" style="width: 50%; height: 50px; margin: 30px auto 0; border-radius: 25px;"></div>
            </div>
        `;

        // 2. 模拟计算时间 (600ms后生成真实报告)
        setTimeout(() => {
            this.renderResult();
        }, 600);
    },

    // === 抽离：真实报告渲染逻辑 ===
    renderResult() {
        // 以下是之前 showResult 的完整逻辑
        const sorted = Object.entries(this.state.tracks).sort((a, b) => b[1] - a[1]);
        const topTrack = sorted[0] ? sorted[0][0] : 'security';
        const lowTrack = sorted[sorted.length - 1] ? sorted[sorted.length - 1][0] : 'security';
        const trackNames = { tech: "技术创造", influence: "影响引领", freedom: "自由自主", security: "安全稳定", service: "服务贡献", challenge: "挑战突破" };
        
        const historyText = this.history.map(h => `第${h.round}轮:\n情境: ${h.event}\n选择: ${h.choice}\n倾向: ${trackNames[h.track] || '无'}`).join('\n\n');
        const aiPromptData = `我刚刚玩了一个叫《职业觉醒实验室》的职业模拟游戏，请帮我做一个深度职业诊断。我的身份：${this.state.identity === 'student' ? '在校学生/准毕业生' : '工作1-5年的职场人'}扮演角色：${this.currentRole}最终状态：能量 ${this.state.energy}%，意义 ${this.state.meaning}%，收益 ${this.state.money}%核心特质：${GameData.traits[topTrack].name}盲点特质：${GameData.traits[lowTrack].name}我的游戏历程：${historyText}请根据以上信息：1. 分析我目前的职业状态。2. 结合我的核心特质和盲点，给我两条具体的、可执行的建议。`.trim();
        window.currentAIPrompt = aiPromptData;

        let html = '';
        
        if (this.state.identity === 'student') {
            const recRole = this.getCareerSuggestion(topTrack);
            html = `
            <div class="report-card">
                <div class="report-header"><span class="report-icon">🗺️</span><div><div class="report-title">职业潜力地图</div><span class="report-sub">深度分析 | 包含性格与情境</span></div></div>
                <div style="margin-bottom:20px; font-size:13px; color:#aaa; line-height:1.6;">
                    经过 10 轮测试，你的底层特质是 <strong style="color:var(--accent-color)">${GameData.traits[topTrack].name}</strong>。
                </div>
                <div class="mirror-grid">
                    <div class="mirror-box mirror-good"><div class="mirror-title">✨ 你的天赋点</div><div class="mirror-desc">${GameData.traits[topTrack].pros}</div></div>
                    <div class="mirror-box mirror-bad"><div class="mirror-title">⚠️ 你的雷区</div><div class="mirror-desc">${GameData.traits[topTrack].cons}</div></div>
                </div>
                <div class="rec-card" style="margin-top:25px;">
                    <div class="rec-title">🚀 推荐起步方向</div>
                    <div class="rec-role" style="font-size:18px;">${recRole}</div>
                    <div class="rec-desc">建议你在实习或第一份工作中，优先寻找能接触该核心职能的岗位。</div>
                </div>
            </div>
            <button class="btn-ai" onclick="Game.copyAIPrompt()">🔍 一键生成 AI 深度解读</button>
            <button class="btn-restart" onclick="location.reload()">重新探索</button>`;
        } else {
            const energyColor = this.state.energy < 30 ? 'bad' : (this.state.energy < 60 ? 'warn' : 'good');
            const meaningColor = this.state.meaning < 30 ? 'bad' : (this.state.meaning < 60 ? 'warn' : 'good');
            const roleMap = { coder: 'tech', finance: 'challenge', soe: 'security', civil: 'service', academic: 'tech', medical: 'service' };
            const roleNeed = roleMap[this.currentRole];
            const matchScore = this.state.tracks[roleNeed] || 0;
            const matchColor = matchScore >= 3 ? 'good' : (matchScore >= 1 ? 'warn' : 'bad');
            const matchText = matchScore >= 3 ? '高度匹配' : (matchScore >= 1 ? '存在错位' : '严重错位');

            html = `
            <div class="report-card">
                <div class="report-header"><span class="report-icon">🏥</span><div><div class="report-title">职业状态体检报告</div><span class="report-sub">深度诊断 | 包含性格与情境</span></div></div>
                
                <div class="status-item"><div class="status-header"><span>⚡️ 能量储备</span><span>${this.state.energy}%</span></div><div class="status-track"><div class="status-fill fill-${energyColor}" style="width: ${this.state.energy}%"></div></div></div>
                <div class="status-item"><div class="status-header"><span>🌟 意义感</span><span>${this.state.meaning}%</span></div><div class="status-track"><div class="status-fill fill-${meaningColor}" style="width: ${this.state.meaning}%"></div></div></div>

                <div class="mirror-grid">
                    <div class="mirror-box mirror-good"><div class="mirror-title">✨ 你的天赋</div><div class="mirror-desc"><strong style="color:#fff">${GameData.traits[topTrack].name}</strong><br>${GameData.traits[topTrack].pros}</div></div>
                    <div class="mirror-box mirror-bad"><div class="mirror-title">⚠️ 你的软肋</div><div class="mirror-desc"><strong style="color:#fff">${GameData.traits[lowTrack].name}</strong><br>${GameData.traits[lowTrack].cons}</div></div>
                </div>
                
                <div class="diag-box" style="border-left-color: var(--accent-color);"><div class="diag-title">⚖️ 人岗匹配度分析</div><div class="diag-text">当前角色：<strong>${document.querySelector(`.role-card[onclick="Game.start('${this.currentRole}')"] .role-name`).innerText}</strong><br>匹配指数：<span style="color:${matchColor === 'good' ? '#2ecc71' : (matchColor === 'warn' ? '#f1c40f' : '#e74c3c')};">${matchText}</span></div></div>
                
                <div class="diag-box" style="border-left-color: #ffa502;"><div class="diag-title">💊 诊断建议</div><div class="diag-text" style="white-space: pre-wrap;">${this.getAdvice(this.state, matchScore, GameData.traits[topTrack].name)}</div></div>
            </div>
            <button class="btn-ai" onclick="Game.copyAIPrompt()">🔍 一键生成 AI 深度解读</button>
            <button class="btn-restart" onclick="location.reload()">重新体检</button>`;
        }
        
        document.getElementById('result-content').innerHTML = html;
    },

    // 辅助函数保持不变...
    copyAIPrompt() { /* ... 保持原样 ... */ },
    getCareerSuggestion(track) { /* ... 保持原样 ... */ },
    getAdvice(s, match, topTrack) { /* ... 保持原样 ... */ }

// 启动游戏
window.onload = () => Game.init();
