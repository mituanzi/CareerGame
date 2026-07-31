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
        
        // 渲染角色卡片
        this.renderRoles();
        
        this.showScreen('screen-role');
    },

    /* 2. 渲染角色卡片 */
    renderRoles() {
        const container = document.getElementById('role-container');
        container.innerHTML = ''; 

        // 从数据文件读取角色配置
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
        this.state.energy = 50;
        this.state.meaning = 50;
        this.state.money = 50;
        this.state.tracks = {};
        this.history = [];
        
        // 【核心修改】加载事件逻辑：通用库 + 职业库
        // 1. 先复制通用库
        let allEvents = GameData.universal ? [...GameData.universal] : [];
        
        // 2. 再把该角色的专属库合并进去
        if (GameData.scenarios && GameData.scenarios[role]) {
            allEvents = [...allEvents, ...GameData.scenarios[role]];
        }

        // 3. 洗牌
        this.events = this.shuffle(allEvents);
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
        
        // 更新时间显示
        const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        document.getElementById('hud-time').innerText = `${days[index % 7]} ${(9 + index * 2) % 24}:00`;

        // 填充事件文本
        document.getElementById('event-text').innerText = event.text;

        const btnA = document.getElementById('btn-a');
        const btnB = document.getElementById('btn-b');
        
        // 填充按钮文本
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
    /* 7. 结束游戏：根据身份生成不同报告 */
    endGame(reason) {
        // 基础数据准备
        const result = this.calculateResult(reason);
        
        // 根据身份选择不同的报告模板
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
        // 1. 统计特质轨迹
        const tracks = this.state.tracks;
        let maxTrack = { key: 'tech', count: 0 };
        for (let key in tracks) {
            if (tracks[key] > maxTrack.count) {
                maxTrack = { key: key, count: tracks[key] };
            }
        }

        // 2. 定义特质画像
        const traitMap = {
            tech: { name: "技术专精型", desc: "你崇尚逻辑与专业壁垒，相信硬实力是立身之本。", suit: ["coder", "academic"] },
            influence: { name: "资源整合型", desc: "你擅长影响他人，在复杂关系中如鱼得水。", suit: ["finance", "civil"] },
            freedom: { name: "自主独立型", desc: "你厌恶束缚，追求掌控感和自由度。", suit: ["coder"] }, // 自由职业倾向
            security: { name: "稳健防御型", desc: "你风险厌恶，追求确定性和秩序。", suit: ["soe", "civil"] },
            service: { name: "服务奉献型", desc: "你在帮助他人中获得满足，具有利他精神。", suit: ["medical", "civil"] },
            challenge: { name: "挑战突破型", desc: "你渴望成就，愿意为高回报承担高压。", suit: ["finance"] }
        };

        // 3. 计算匹配度 (仅打工人需要)
        const currentRole = this.currentRole;
        const matchScore = traitMap[maxTrack.key].suit.includes(currentRole) ? 90 : 60;

        // 4. 计算状态等级
        let statusLevel = "健康";
        if (reason === 'burnout' || this.state.energy < 20) statusLevel = "危险";
        else if (this.state.energy < 40 || this.state.meaning < 30) statusLevel = "亚健康";

        return {
            scores: this.state,
            mainTrait: traitMap[maxTrack.key], // 主导特质
            isBurnout: reason === 'burnout',
            statusLevel: statusLevel,
            matchScore: matchScore,
            avgScore: (this.state.energy + this.state.meaning + this.state.money) / 3
        };
    },

    /* 生成学生报告：侧重特质分析与择业建议 */
    generateStudentReport(result) {
        const trait = result.mainTrait;
        
        // 推荐职业逻辑
        let recRole = trait.suit[0]; // 默认推荐第一个
        // 如果能量低，推荐稍微安稳一点的
        if (result.scores.energy < 40) {
            recRole = "soe"; 
        }

        const roleNames = {
            coder: "程序员", finance: "金融民工", soe: "央企职员",
            civil: "体制内", academic: "高校青椒", medical: "医务工作者"
        };

        return `
            <div class="report-card">
                <div class="report-header">
                    <span class="report-icon">🔍</span>
                    <div>
                        <div class="report-title">职业特质画像</div>
                        <span class="report-sub">基于你的决策偏好分析</span>
                    </div>
                </div>
                
                <div class="trait-box" style="background: rgba(0,0,0,0.2); border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 4px solid var(--accent-color);">
                    <div style="font-size: 18px; font-weight: bold; color: var(--accent-color); margin-bottom: 8px;">
                        ${trait.name}
                    </div>
                    <div style="font-size: 14px; line-height: 1.6; color: #ddd;">
                        ${trait.desc}
                    </div>
                </div>

                <div class="mirror-grid">
                    <div class="mirror-box mirror-good">
                        <div class="mirror-title">💪 潜在优势</div>
                        <div class="mirror-desc">你在面对不确定性时展现出了“${trait.name}”的特质。这在未来的职业生涯中将是你的核心护城河。</div>
                    </div>
                    <div class="mirror-box mirror-bad">
                        <div class="mirror-title">⚠️ 需警惕</div>
                        <div class="mirror-desc">初入职场，切忌眼高手低。现在的模拟得分不代表真实战力，保持谦逊，从基础做起。</div>
                    </div>
                </div>

                <div class="rec-card">
                    <div class="rec-title">🎯 推荐职业剧本</div>
                    <div class="rec-role" style="color: var(--accent-color);">《${roleNames[recRole] || "职场通才"}》</div>
                    <div class="rec-desc">根据你的特质组合，我们建议你尝试体验该剧本，这能最大化发挥你的性格优势。</div>
                </div>

                <button class="btn-restart" onclick="Game.restart()">重新测评</button>
            </div>
        `;
    },

    /* 生成打工人报告：侧重状态诊断与去留建议 */
    generateWorkerReport(result) {
        const trait = result.mainTrait;
        const score = result.scores;
        
        // 诊断逻辑
        let diagnosis = { title: "职场状态正常", text: "继续保持，注意劳逸结合。", action: "观望" };
        
        if (result.isBurnout) {
            diagnosis = { title: "严重职业倦怠", text: "你的身心能量已逼近极限，这不仅影响效率，更损害健康。必须立刻停下来。", action: "立即休息" };
        } else if (result.matchScore < 70 && score.meaning < 40) {
            diagnosis = { title: "人岗匹配度低", text: "你的内在特质与当前工作存在较大冲突，这正在消耗你的心理资本。", action: "考虑转型" };
        } else if (score.money > 70 && score.meaning < 30) {
            diagnosis = { title: "金手铐陷阱", text: "收益很高，但意义感缺失。你正在用灵魂换金钱。", action: "寻找意义" };
        } else if (score.energy < 30) {
            diagnosis = { title: "身心亚健康", text: "能量条已经见红，虽然还在坚持，但这是不可持续的。", action: "调整节奏" };
        }

        return `
            <div class="report-card">
                <div class="report-header">
                    <span class="report-icon">${result.isBurnout ? "🚑" : "🩺"}</span>
                    <div>
                        <div class="report-title">${diagnosis.title}</div>
                        <span class="report-sub">当前状态：${result.statusLevel}</span>
                    </div>
                </div>
                
                <div class="status-bars" style="margin-bottom: 25px;">
                    <div class="status-item">
                        <div class="status-header"><span>能量储备</span><span>${score.energy}%</span></div>
                        <div class="status-track"><div class="status-fill fill-${score.energy > 60 ? 'good' : (score.energy > 30 ? 'warn' : 'bad')}" style="width: ${score.energy}%"></div></div>
                    </div>
                    <div class="status-item">
                        <div class="status-header"><span>意义感</span><span>${score.meaning}%</span></div>
                        <div class="status-track"><div class="status-fill fill-${score.meaning > 60 ? 'good' : (score.meaning > 30 ? 'warn' : 'bad')}" style="width: ${score.meaning}%"></div></div>
                    </div>
                    <div class="status-item">
                        <div class="status-header"><span>经济收益</span><span>${score.money}%</span></div>
                        <div class="status-track"><div class="status-fill fill-good" style="width: ${score.money}%"></div></div>
                    </div>
                </div>

                <div class="diag-box" style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; border-left: 4px solid ${result.isBurnout ? '#e74c3c' : 'var(--accent-color)'};">
                    <div class="diag-title">🧠 深度诊断</div>
                    <div class="diag-text">${diagnosis.text}</div>
                </div>

                <div class="mirror-grid" style="margin-top: 20px;">
                    <div class="mirror-box mirror-good">
                        <div class="mirror-title">✅ 你的本色</div>
                        <div class="mirror-desc">你的核心特质是"${trait.name}"。这是一种天赋，找到能发挥它的场景，你就会发光。</div>
                    </div>
                    <div class="mirror-box mirror-bad">
                        <div class="mirror-title">⚠️ 当下风险</div>
                        <div class="mirror-desc">匹配度：${result.matchScore}%。${result.matchScore < 70 ? '当前工作可能压抑了你的天性。' : '岗位与特质较为匹配。'}</div>
                    </div>
                </div>

                <div class="rec-card">
                    <div class="rec-title">💊 行动建议</div>
                    <div class="rec-role" style="color: ${result.isBurnout ? '#e74c3c' : 'var(--accent-color)'};">${diagnosis.action}</div>
                    <div class="rec-desc">
                        ${result.isBurnout ? "建议立刻申请休假，或寻求心理咨询支持。" : 
                        (result.matchScore < 70 ? "建议利用业余时间探索更适合你特质的岗位，尝试投递简历。" : 
                        "目前状态良好，继续保持学习，积累更高层级的资本。")}
                    </div>
                </div>

                <button class="btn-restart" onclick="Game.restart()">重新测评</button>
            </div>
        `;
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
