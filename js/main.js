/* ================= 主逻辑控制 ================= */
const Game = {
    state: {
        identity: 'worker',
        mode: 'deep', // 默认深度模式
        energy: 100,
        meaning: 50,
        money: 50,
        tracks: {}
    },
    
    history: [],       // 用于存放历史状态快照，支持回退
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
        
        this.renderRoles();
        this.showScreen('screen-role');
    },

    /* 新增：模式选择 */
    selectMode(mode) {
        this.state.mode = mode;
        
        // 更新UI样式
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (mode === 'deep') {
            document.getElementById('btn-mode-deep').classList.add('active');
        } else {
            document.getElementById('btn-mode-shallow').classList.add('active');
        }
    },

    /* 2. 渲染角色卡片 */
    renderRoles() {
        const container = document.getElementById('role-container');
        container.innerHTML = ''; 

        const roles = GameData.roles || [
            { id: 'coder', name: '程序员', icon: '👨‍💻' },
            { id: 'finance', name: '金融民工', icon: '📈' },
            { id: 'soe', name: '央企职员', icon: '🏢' },
            { id: 'civil', name: '体制内', icon: '☕️' },
            { id: 'academic', name: '高校青椒', icon: '📚' },
            { id: 'medical', name: '医务工作者', icon: '🏥' }
        ];

        roles.forEach(role => {
            const card = document.createElement('div');
            card.className = 'role-card';
            card.onclick = () => this.start(role.id);
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
        this.state.energy = 100;
        this.state.meaning = 50;
        this.state.money = 50;
        this.state.tracks = {};
        
        // 清空历史记录
        this.history = [];
        document.getElementById('btn-back').style.display = 'none';

        // 加载事件逻辑
        let allEvents = GameData.universal ? [...GameData.universal] : [];
        
        if (GameData.scenarios && GameData.scenarios[role]) {
            allEvents = [...allEvents, ...GameData.scenarios[role]];
        }

        // 洗牌
        this.events = this.shuffle(allEvents);
        
        // 【核心修改】根据模式截断题库
        if (this.state.mode === 'shallow') {
            this.events = this.events.slice(0, 15);
        }

        this.currentIndex = 0;
        
        // 更新 HUD 显示
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
        const textEl = document.getElementById('event-text');
        textEl.innerText = event.text;
        
        // 简单的淡入效果重置
        textEl.style.opacity = 0;
        setTimeout(() => {
            textEl.style.transition = 'opacity 0.4s';
            textEl.style.opacity = 1;
        }, 50);

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

        // 【核心修改】在进行任何状态修改前，先保存当前状态快照到历史栈
        // 使用 JSON 序列化来实现深拷贝，保存完整状态
        const snapshot = JSON.parse(JSON.stringify(this.state));
        this.history.push({
            state: snapshot,
            index: this.currentIndex
        });

        // 显示撤回按钮
        document.getElementById('btn-back').style.display = 'block';

        // 应用效果
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

    /* 新增：撤回功能 */
    goBack() {
        if (this.history.length === 0) return;

        // 从历史栈中取出上一个状态
        const lastStep = this.history.pop();
        
        // 恢复状态
        this.state = lastStep.state;
        this.currentIndex = lastStep.index;

        // 刷新 UI
        this.updateStats();
        this.loadEvent(this.currentIndex);

        // 如果历史栈空了，隐藏按钮
        if (this.history.length === 0) {
            document.getElementById('btn-back').style.display = 'none';
        }
    },

    /* 6. 更新界面 */
    updateStats() {
        const eVal = this.state.energy;
        const eEl = document.getElementById('val-energy');
        eEl.innerText = eVal;
        
        // 危险警告动画
        if (eVal <= 20) {
            eEl.classList.add('danger-shake');
        } else {
            eEl.classList.remove('danger-shake');
        }

        document.getElementById('val-meaning').innerText = this.state.meaning;
        document.getElementById('val-money').innerText = this.state.money;
    },

    /* 7. 结束游戏：根据身份生成不同报告 */
    endGame(reason) {
        const result = this.calculateResult(reason);
        
        let resultHTML = '';
        if (this.state.identity === 'student') {
            resultHTML = this.generateStudentReport(result);
        } else {
            resultHTML = this.generateWorkerReport(result);
        }

        document.getElementById('result-content').innerHTML = resultHTML;
        this.showScreen('screen-result');
    },

    /* 核心算法：计算特质与结果 */
    calculateResult(reason) {
        const tracks = this.state.tracks;
        let maxTrack = { key: 'tech', count: 0 };
        for (let key in tracks) {
            if (tracks[key] > maxTrack.count) {
                maxTrack = { key: key, count: tracks[key] };
            }
        }

        const traitMap = {
            tech: { name: "技术专精型", desc: "你崇尚逻辑与专业壁垒，相信硬实力是立身之本。", suit: ["coder", "academic"] },
            influence: { name: "资源整合型", desc: "你擅长影响他人，在复杂关系中如鱼得水。", suit: ["finance", "civil"] },
            freedom: { name: "自主独立型", desc: "你厌恶束缚，追求掌控感和自由度。", suit: ["coder"] },
            security: { name: "稳健防御型", desc: "你风险厌恶，追求确定性和秩序。", suit: ["soe", "civil"] },
            service: { name: "服务奉献型", desc: "你在帮助他人中获得满足，具有利他精神。", suit: ["medical", "civil"] },
            challenge: { name: "挑战突破型", desc: "你渴望成就，愿意为高回报承担高压。", suit: ["finance"] }
        };

        const currentRole = this.currentRole;
        const matchScore = traitMap[maxTrack.key].suit.includes(currentRole) ? 90 : 60;

        let statusLevel = "健康";
        if (reason === 'burnout' || this.state.energy < 20) statusLevel = "危险";
        else if (this.state.energy < 40 || this.state.meaning < 30) statusLevel = "亚健康";

        return {
            scores: this.state,
            mainTrait: traitMap[maxTrack.key],
            isBurnout: reason === 'burnout',
            statusLevel: statusLevel,
            matchScore: matchScore,
            avgScore: (this.state.energy + this.state.meaning + this.state.money) / 3
        };
    },

    /* 生成学生报告 */
    generateStudentReport(result) {
        const trait = result.mainTrait;
        let recRole = trait.suit[0];
        if (result.scores.energy < 40) recRole = "soe";

        const roleNames = { coder: "程序员", finance: "金融民工", soe: "央企职员", civil: "体制内", academic: "高校青椒", medical: "医务工作者" };

        return `
            <div class="report-card">
                <div class="report-header"><span class="report-icon">🔍</span><div><div class="report-title">职业特质画像</div><span class="report-sub">基于你的决策偏好分析</span></div></div>
                <div class="trait-box" style="background: rgba(0,0,0,0.2); border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 4px solid var(--accent-color);">
                    <div style="font-size: 18px; font-weight: bold; color: var(--accent-color); margin-bottom: 8px;">${trait.name}</div>
                    <div style="font-size: 14px; line-height: 1.6; color: #ddd;">${trait.desc}</div>
                </div>
                <div class="mirror-grid">
                    <div class="mirror-box mirror-good"><div class="mirror-title">💪 潜在优势</div><div class="mirror-desc">你在面对不确定性时展现出了“${trait.name}”的特质。</div></div>
                    <div class="mirror-box mirror-bad"><div class="mirror-title">⚠️ 需警惕</div><div class="mirror-desc">初入职场，切忌眼高手低。</div></div>
                </div>
                <div class="rec-card"><div class="rec-title">🎯 推荐职业剧本</div><div class="rec-role" style="color: var(--accent-color);">《${roleNames[recRole] || "职场通才"}》</div></div>
                <button class="btn-restart" onclick="Game.restart()">重新测评</button>
            </div>`;
    },

    /* 生成打工人报告 */
    generateWorkerReport(result) {
        const trait = result.mainTrait;
        const score = result.scores;
        let diagnosis = { title: "职场状态正常", text: "继续保持。", action: "观望" };
        
        if (result.isBurnout) diagnosis = { title: "严重职业倦怠", text: "身心能量已逼近极限。", action: "立即休息" };
        else if (result.matchScore < 70 && score.meaning < 40) diagnosis = { title: "人岗匹配度低", text: "内在特质与当前工作存在冲突。", action: "考虑转型" };
        else if (score.money > 70 && score.meaning < 30) diagnosis = { title: "金手铐陷阱", text: "收益很高，但意义感缺失。", action: "寻找意义" };
        else if (score.energy < 30) diagnosis = { title: "身心亚健康", text: "能量条见红，不可持续。", action: "调整节奏" };

        return `
            <div class="report-card">
                <div class="report-header"><span class="report-icon">${result.isBurnout ? "🚑" : "🩺"}</span><div><div class="report-title">${diagnosis.title}</div><span class="report-sub">当前状态：${result.statusLevel}</span></div></div>
                <div class="status-bars" style="margin-bottom: 25px;">
                    <div class="status-item"><div class="status-header"><span>能量储备</span><span>${score.energy}%</span></div><div class="status-track"><div class="status-fill fill-${score.energy > 60 ? 'good' : (score.energy > 30 ? 'warn' : 'bad')}" style="width: ${score.energy}%"></div></div></div>
                    <div class="status-item"><div class="status-header"><span>意义感</span><span>${score.meaning}%</span></div><div class="status-track"><div class="status-fill fill-${score.meaning > 60 ? 'good' : (score.meaning > 30 ? 'warn' : 'bad')}" style="width: ${score.meaning}%"></div></div></div>
                    <div class="status-item"><div class="status-header"><span>经济收益</span><span>${score.money}%</span></div><div class="status-track"><div class="status-fill fill-good" style="width: ${score.money}%"></div></div></div>
                </div>
                <div class="diag-box"><div class="diag-title">🧠 深度诊断</div><div class="diag-text">${diagnosis.text}</div></div>
                <div class="mirror-grid" style="margin-top: 20px;">
                    <div class="mirror-box mirror-good"><div class="mirror-title">✅ 你的本色</div><div class="mirror-desc">核心特质："${trait.name}"。</div></div>
                    <div class="mirror-box mirror-bad"><div class="mirror-title">⚠️ 当下风险</div><div class="mirror-desc">匹配度：${result.matchScore}%。</div></div>
                </div>
                <div class="rec-card"><div class="rec-title">💊 行动建议</div><div class="rec-role">${diagnosis.action}</div></div>
                <button class="btn-restart" onclick="Game.restart()">重新测评</button>
            </div>`;
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
