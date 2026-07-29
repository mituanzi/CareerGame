/* 逻辑层：游戏引擎与交互 */
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
    },

    showScreen(id) {
        document.querySelectorAll('.container').forEach(el => el.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    },

    start(role) {
        document.body.className = `theme-${role}`;
        this.currentRole = role;
        
        let pool = GameData.scenarios[role] ? [...GameData.scenarios[role]] : [];
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        this.currentEvents = pool.slice(0, 5);

        this.state = { energy: 50, meaning: 50, money: 50, tracks: {} };
        this.history = [];
        this.currentIndex = 0;

        this.showScreen('screen-game');
        this.loadEvent(0);
    },

    loadEvent(index) {
        const event = this.currentEvents[index];
        document.getElementById('hud-time').innerText = ["周一 09:00", "周二 14:00", "周三 10:00", "周四 20:00", "周五 16:00"][index];
        document.getElementById("event-text").innerText = event.text;
        document.getElementById("btn-a").innerText = event.choices.do.text;
        document.getElementById("btn-b").innerText = event.choices.reject.text;
    },

    handleAction(type) {
        const event = this.currentEvents[this.currentIndex];
        const choice = event.choices[type];

        this.state.energy += choice.effects.e;
        this.state.meaning += choice.effects.m;
        this.state.money += choice.effects.y;
        
        ['energy', 'meaning', 'money'].forEach(k => {
            this.state[k] = Math.max(0, Math.min(100, this.state[k]));
        });

        if (choice.track) this.state.tracks[choice.track] = (this.state.tracks[choice.track] || 0) + 1;
        this.history.push({ round: this.currentIndex + 1, event: event.text, choice: choice.text, track: choice.track });

        document.getElementById('val-energy').innerText = this.state.energy;
        document.getElementById('val-meaning').innerText = this.state.meaning;
        document.getElementById('val-money').innerText = this.state.money;

        this.currentIndex++;
        if (this.currentIndex >= 5) {
            this.showResult();
        } else {
            this.loadEvent(this.currentIndex);
        }
    },

    showResult() {
        this.showScreen('screen-result');
        
        const sorted = Object.entries(this.state.tracks).sort((a, b) => b[1] - a[1]);
        const topTrack = sorted[0] ? sorted[0][0] : 'security';
        const lowTrack = sorted[sorted.length - 1] ? sorted[sorted.length - 1][0] : 'security';
        const trackNames = { tech: "技术创造", influence: "影响引领", freedom: "自由自主", security: "安全稳定", service: "服务贡献", challenge: "挑战突破" };
        
        const historyText = this.history.map(h => `第${h.round}轮:\n情境: ${h.event}\n选择: ${h.choice}\n倾向: ${trackNames[h.track] || '无'}`).join('\n\n');
        const aiPromptData = `我刚刚玩了一个叫《职业觉醒实验室》的职业模拟游戏，请帮我做一个深度职业诊断。我的身份：${this.state.identity === 'student' ? '在校学生/准毕业生' : '工作1-5年的职场人'}扮演角色：${this.currentRole}最终状态：能量 ${this.state.energy}%，意义 ${this.state.meaning}%，收益 ${this.state.money}%核心特质：${GameData.traits[topTrack].name}盲点特质：${GameData.traits[lowTrack].name}我的游戏历程：${historyText}请根据以上信息：1. 分析我目前的职业状态。2. 结合我的核心特质和盲点，给我两条具体的、可执行的建议。`.trim();
        window.currentAIPrompt = aiPromptData;

        let html = '';
        if (this.state.identity === 'student') {
            html = `
            <div class="report-card">
                <div class="report-header"><span class="report-icon">🧬</span><div><div class="report-title">职业基因图谱</div><span class="report-sub">基于本能偏好的客观分析</span></div></div>
                <div class="mirror-grid">
                    <div class="mirror-box mirror-good"><div class="mirror-title">✨ 核心优势</div><div class="mirror-desc"><strong style="color:#fff">${GameData.traits[topTrack].name}</strong><br>${GameData.traits[topTrack].pros}</div></div>
                    <div class="mirror-box mirror-bad"><div class="mirror-title">🕳️ 潜在盲点</div><div class="mirror-desc"><strong style="color:#fff">${GameData.traits[lowTrack].name}</strong><br>${GameData.traits[lowTrack].cons}</div></div>
                </div>
                <div class="radar-grid">${sorted.map(([key, value]) => `<div class="radar-item"><span class="radar-name">${trackNames[key]}</span><span class="radar-score">${value} 分</span></div>`).join('')}</div>
                <div class="rec-card"><div class="rec-title">🚀 推荐起步方向</div><div class="rec-role">${this.getCareerSuggestion(topTrack).split('/')[0]}</div><div class="rec-desc">建议你在实习或第一份工作中，优先寻找能接触该核心职能的岗位。</div></div>
            </div>
            <button class="btn-ai" onclick="Game.copyAIPrompt()">🔍 一键生成 AI 深度解读 (免费)</button><button class="btn-restart" onclick="location.reload()">重新探索</button>`;
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
                <div class="report-header"><span class="report-icon">🏥</span><div><div class="report-title">职业状态体检报告</div><span class="report-sub">生成时间：${new Date().toLocaleDateString()}</span></div></div>
                <div class="status-item"><div class="status-header"><span>⚡️ 能量储备</span><span>${this.state.energy}%</span></div><div class="status-track"><div class="status-fill fill-${energyColor}" style="width: ${this.state.energy}%"></div></div></div>
                <div class="status-item"><div class="status-header"><span>🌟 意义感</span><span>${this.state.meaning}%</span></div><div class="status-track"><div class="status-fill fill-${meaningColor}" style="width: ${this.state.meaning}%"></div></div></div>
                <div class="mirror-grid">
                    <div class="mirror-box mirror-good"><div class="mirror-title">✨ 你的天赋</div><div class="mirror-desc"><strong style="color:#fff">${GameData.traits[topTrack].name}</strong><br>${GameData.traits[topTrack].pros}</div></div>
                    <div class="mirror-box mirror-bad"><div class="mirror-title">⚠️ 你的软肋</div><div class="mirror-desc"><strong style="color:#fff">${GameData.traits[lowTrack].name}</strong><br>${GameData.traits[lowTrack].cons}</div></div>
                </div>
                <div class="diag-box" style="border-left-color: var(--accent-color);"><div class="diag-title">⚖️ 人岗匹配度分析</div><div class="diag-text">当前角色：<strong>${document.querySelector(`.role-card[onclick="Game.start('${this.currentRole}')"] .role-name`).innerText}</strong><br>匹配指数：<span style="color:${matchColor === 'good' ? '#2ecc71' : (matchColor === 'warn' ? '#f1c40f' : '#e74c3c')};">${matchText}</span><div style="margin-top:10px;"><div class="status-track" style="height:12px; border-radius:6px;"><div class="status-fill fill-${matchColor}" style="width: ${matchScore * 20}%"></div></div></div></div></div>
                <div class="diag-box" style="border-left-color: #ffa502;"><div class="diag-title">💊 诊断建议</div><div class="diag-text" style="white-space: pre-wrap;">${this.getAdvice(this.state, matchScore, GameData.traits[topTrack].name)}</div></div>
            </div>
            <button class="btn-ai" onclick="Game.copyAIPrompt()">🔍 一键生成 AI 深度解读 (免费)</button><button class="btn-restart" onclick="location.reload()">重新体检</button>`;
        }
        document.getElementById('result-content').innerHTML = html;
    },

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
