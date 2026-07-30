/* 逻辑层：完整版 (包含动效与混合题库) */
const Game = {
    state: {},
    history: [],
    currentRole: '',
    currentIndex: 0,
    currentEvents: [],

    // 1. 初始化：生成角色列表
    init() {
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

    // 2. 身份选择：显示开场白
    selectIdentity(type) {
        this.state.identity = type;
        this.showScreen('screen-role');
        
        const introEl = document.getElementById('role-intro');
        if (type === 'student') {
            introEl.innerHTML = "这将是一次<strong style='color:#fff'>深度模拟</strong>。<br>包含价值观测试与职业情境，请跟随直觉。<br>我们将帮你预判：你是否真的适合那个职业？";
        } else {
            introEl.innerHTML = "这将是一次<strong style='color:#fff'>全面体检</strong>。<br>包含性格复盘与现状诊断，请选择真实反应。<br>我们将帮你分析：当下的工作是否正在消耗你？";
        }
    },

    // 3. 页面切换：控制容器显示
    showScreen(id) {
        document.querySelectorAll('.container').forEach(el => el.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    },

    // 4. 游戏开始：组装题库
    start(role) {
        document.body.className = `theme-${role}`;
        this.currentRole = role;
        
        // --- 混合题库逻辑 ---
        // 获取通用题并洗牌
        let universalPool = GameData.universal ? [...GameData.universal] : [];
        for (let i = universalPool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [universalPool[i], universalPool[j]] = [universalPool[j], universalPool[i]];
        }

        // 获取职业题并洗牌
        let rolePool = GameData.scenarios[role] ? [...GameData.scenarios[role]] : [];
        for (let i = rolePool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rolePool[i], rolePool[j]] = [rolePool[j], rolePool[i]];
        }

        // 组合：前5题性格，后5题职业
        this.currentEvents = [
            ...universalPool.slice(0, 5),
            ...rolePool.slice(0, 5)
        ];

        this.state = { energy: 50, meaning: 50, money: 50, tracks: {} };
        this.history = [];
        this.currentIndex = 0;

        this.showScreen('screen-game');
        this.loadEvent(0);
    },

    // 5. 加载题目
    loadEvent(index) {
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

    // 6. 点击交互：含动效逻辑
    handleAction(type) {
        const event = this.currentEvents[this.currentIndex];
        const choice = event.choices[type];

        // 禁用按钮防止狂点
        const btnA = document.getElementById('btn-a');
        const btnB = document.getElementById('btn-b');
        btnA.disabled = true; btnB.disabled = true;
        btnA.style.opacity = '0.5'; 
        btnB.style.opacity = '0.5';

        // 模拟思考延迟 300ms
        setTimeout(() => {
            // 恢复按钮
            btnA.disabled = false; btnB.disabled = false;
            btnA.style.opacity = '1'; btnB.style.opacity = '1';

            // 计算数值
            this.state.energy += choice.effects.e;
            this.state.meaning += choice.effects.m;
            this.state.money += choice.effects.y;
            
            ['energy', 'meaning', 'money'].forEach(k => {
                this.state[k] = Math.max(0, Math.min(100, this.state[k]));
            });

            if (choice.track) this.state.tracks[choice.track] = (this.state.tracks[choice.track] || 0) + 1;
            this.history.push({ round: this.currentIndex + 1, event: event.text, choice: choice.text, track: choice.track });

            // 触发数值跳动动画
            this.animateNumber('val-energy', this.state.energy);
            this.animateNumber('val-meaning', this.state.meaning);
            this.animateNumber('val-money', this.state.money);

            this.currentIndex++;
            if (this.currentIndex >= 10) {
                this.showResult();
            } else {
                this.loadEvent(this.currentIndex);
            }
        }, 300);
    },

    // 新增：数值跳动动画
    animateNumber(id, newValue) {
        const el = document.getElementById(id);
        el.innerText = newValue;
        el.classList.add('pulse');
        setTimeout(() => el.classList.remove('pulse'), 400);
    },

    // 7. 显示结果：含骨架屏加载
    showResult() {
        this.showScreen('screen-result');
        
        // 先显示骨架屏
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

        // 600ms 后渲染真实报告
        setTimeout(() => {
            this.renderResult();
        }, 600);
    },

    // 8. 渲染最终报告
    renderResult() {
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

    // 9. 复制提示词
    copyAIPrompt() {
        if (!window.currentAIPrompt) return;
        navigator.clipboard.writeText(window.currentAIPrompt).then(() => {
            alert("已复制！\n\n请打开 Kimi、豆包、通义千问等免费 AI 软件，粘贴发送，即可获得专属深度解读。");
        }).catch(err => {
            const textArea = document.createElement("textarea");
            textArea.value = window.currentAIPrompt;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            alert("已复制！\n\n请打开 Kimi、豆包、通义千问等免费 AI 软件，粘贴发送，即可获得专属深度解读。");
        });
    },

    // 10. 辅助建议函数
    getCareerSuggestion(track) {
        const map = { tech: "研发工程师/数据科学家/技术专家", influence: "产品经理/项目管理/创业者", freedom: "自由职业/独立开发者/远程工作", security: "体制内/国企/大型集团职能岗", service: "客户成功/教育/咨询/运营", challenge: "早期创业核心成员/销售冠军/攻坚负责人" };
        return map[track] || "综合型岗位";
    },

    getAdvice(s, match, topTrack) {
        if (match >= 3) { return `恭喜你！你的内核特质与当前职业高度契合。你找对了赛道。\n建议：\n1. 蓄力：多做一些能发挥「${topTrack}」优势的项目，打造核心竞争力。\n2. 平衡：注意能量值(${s.energy}%)，保持可持续的节奏。`; }
        else { return `警报：你的内核与当前工作存在错位。这可能是你感到“累”或“没意思”的根源。\n建议：\n1. 微调：在现有工作中，主动申请偏向「${topTrack}」的任务。\n2. 副业：下班后开启一个符合你特质的小项目，找回掌控感。\n3. 换行：如果能量值过低，不要裸辞，先做职业访谈。`; }
    }
};

// 启动游戏
window.onload = () => Game.init();
