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
    lastResult: null,  // 【新增】用于存储最后一次计算的结果，供分享功能使用

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
        
        // 【重要】保存计算结果，供分享功能使用
        this.lastResult = result;
        
        let resultHTML = '';
        if (this.state.identity === 'student') {
            resultHTML = this.generateStudentReport(result);
        } else {
            resultHTML = this.generateWorkerReport(result);
        }

        document.getElementById('result-content').innerHTML = resultHTML;
        this.showScreen('screen-result');
    },

    /* 核心算法：计算特质与结果（重构版） */
    calculateResult(reason) {
        // 1. 统计特质轨迹
        const tracks = this.state.tracks;
        
        // 将 tracks 对象转为数组并排序，找出最强的两个特质
        let sortedTracks = Object.keys(tracks).sort((a, b) => tracks[b] - tracks[a]);
        
        // 如果没有任何轨迹（极少见），给默认值
        if (sortedTracks.length === 0) sortedTracks = ['tech'];
        
        const primary = sortedTracks[0]; // 第一特质
        const secondary = sortedTracks[1] || sortedTracks[0]; // 第二特质

        // 2. 定义16种职场人格原型（组合映射）
        const archetypes = {
            // --- 技术流 ---
            "tech-tech": { 
                label: "沉默的大山", emoji: "🏔️",
                desc: "你信奉「逻辑至上」。在喧嚣的职场中，你是一块硬骨头，不擅长也不屑于搞政治。你的安全感完全来自于不可替代的专业能力。"
            },
            "tech-freedom": { 
                label: "孤独极客", emoji: "🦅",
                desc: "代码是你对抗世界的武器。你极其反感被束缚，哪怕给再多的钱，如果限制了你的自由，你也会毫不犹豫地离开。"
            },
            "tech-influence": { 
                label: "架构师", emoji: "🏗️",
                desc: "你不仅能搞定难题，还能搞定人。你正在从「做事」向「管事」转型，虽然有时会觉得身不由己，但你知道这是通往话语权的必经之路。"
            },

            // --- 野心流 ---
            "challenge-influence": { 
                label: "破局骑士", emoji: "⚔️",
                desc: "天生的野心家。你享受高压和高回报，善于在混乱中建立秩序。你很难在一个安稳的位置上待太久，那会让你感到窒息。"
            },
            "challenge-tech": { 
                label: "特种兵", emoji: "🎖️",
                desc: "你是解决危机的一把好手。比起办公室政治，你更喜欢用结果说话。只要给足激励，你愿意去攻克最难的山头。"
            },
            "challenge-freedom": { 
                label: "连续创业者", emoji: "🚀",
                desc: "你的体内藏着不安分的基因。常规的工作对你来说是一种折磨，你总是在寻找下一个跃升的机会，哪怕需要承担巨大的风险。"
            },

            // --- 自由流 ---
            "freedom-tech": { 
                label: "数字游民", emoji: "🏝️",
                desc: "你对「.remote」有着执念。你认为工作是为了更好地生活，而不是相反。如果一份工作让你失去了对时间的掌控，你会果断止损。"
            },
            "freedom-security": { 
                label: "隐形中产", emoji: "🏡",
                desc: "你看似追求安稳，实则是在追求一种「低能耗」的生活方式。你不想在职场这出戏里投入太多情绪，只想按时打卡，去过自己的小日子。"
            },

            // --- 稳健流 ---
            "security-security": { 
                label: "压舱石", emoji: "🛡️",
                desc: "你是组织中最可靠的螺丝钉。你厌恶风险，追求确定性。这不代表你平庸，而是你更看重生活的安稳与秩序，你是团队的定心丸。"
            },
            "security-service": { 
                label: "温暖的基石", emoji: "🕯️",
                desc: "温和而坚定。你愿意为了集体利益默默付出，不求闻达。你是团队中那个最让人安心的人，虽然常常被忽略，但不可或缺。"
            },
            "security-influence": { 
                label: "职场谋士", emoji: "♟️",
                desc: "深谙生存之道。你懂得如何在复杂的组织关系中保护自己。你未必是业务最强的，但一定是最「懂」领导心思的，这也是一种稀缺能力。"
            },

            // --- 服务流 ---
            "service-tech": { 
                label: "名医/匠人", emoji: "🩺",
                desc: "你把工作当成一门手艺来打磨。你不喜欢那些虚头巴脑的管理动作，只想把事做好，帮助具体的人。这是你意义感的来源。"
            },
            "service-influence": { 
                label: "政委/HR", emoji: "🤝",
                desc: "你擅长连接他人，在帮助他人中获得成就感。你适合做那个居中协调的角色，虽然有时候会因为不懂拒绝而受累，但你的好人缘是护身符。"
            },

            // --- 影响流 ---
            "influence-tech": { 
                label: "产品经理", emoji: "📱",
                desc: "你站在技术与商业的十字路口。你理解逻辑，更懂人性。你善于调动资源，把别人的代码变成自己的功绩，这没什么不好意思的。"
            },
            "influence-freedom": { 
                label: "外交官", emoji: "🕊️",
                desc: "你天生属于需要与人打交道的岗位。你能在不同的利益方之间游刃有余，且极其厌恶被具体的执行细节困住。"
            }
        };

        // 3. 匹配原型
        let archetypeKey = `${primary}-${secondary}`;
        let archetype = archetypes[archetypeKey] || archetypes[`${secondary}-${primary}`];
        
        if (!archetype) {
            archetype = { 
                label: "探索者", emoji: "🗺️", 
                desc: "你正在寻找属于自己的路。你的特质尚未完全固化，保持着对世界的好奇与开放，一切皆有可能。" 
            };
        }

        // 4. 计算匹配度
        const traitMap = {
            tech: { name: "技术创造", suit: ["coder", "academic"] },
            influence: { name: "影响引领", suit: ["finance", "civil"] },
            freedom: { name: "自由自主", suit: ["coder"] },
            security: { name: "安全稳定", suit: ["soe", "civil"] },
            service: { name: "服务贡献", suit: ["medical", "civil"] },
            challenge: { name: "挑战突破", suit: ["finance"] }
        };

        const currentRole = this.currentRole;
        const matchScore = traitMap[primary].suit.includes(currentRole) ? 90 : 60;

        // 5. 计算状态等级
        let statusLevel = "健康";
        if (reason === 'burnout' || this.state.energy < 20) statusLevel = "危险";
        else if (this.state.energy < 40 || this.state.meaning < 30) statusLevel = "亚健康";

        return {
            scores: this.state,
            archetype: archetype,
            mainTrait: traitMap[primary],
            isBurnout: reason === 'burnout',
            statusLevel: statusLevel,
            matchScore: matchScore
        };
    },

    /* 生成学生报告（优化版） */
    generateStudentReport(result) {
        const arch = result.archetype;
        const trait = result.mainTrait;
        
        let recRole = trait.suit[0];
        if (result.scores.energy < 40) recRole = "soe";

        const roleNames = {
            coder: "程序员", finance: "金融民工", soe: "央企职员",
            civil: "体制内", academic: "高校青椒", medical: "医务工作者"
        };

        return `
            <div class="report-card">
                <div class="archetype-box" style="text-align: center; margin-bottom: 30px; padding: 25px 0;">
                    <div class="archetype-icon" style="font-size: 50px; margin-bottom: 10px;">${arch.emoji}</div>
                    <div class="archetype-label" style="font-size: 26px; font-weight: 900; color: var(--accent-color); margin-bottom: 5px;">${arch.label}</div>
                    <div class="archetype-sub" style="font-size: 12px; color: #888; letter-spacing: 2px;">YOUR CAREER ARCHETYPE</div>
                </div>

                <div class="insight-box" style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 20px; margin-bottom: 25px; position: relative;">
                    <div style="position: absolute; top: -10px; left: 20px; font-size: 24px;">💡</div>
                    <div style="font-size: 14px; line-height: 1.8; color: #ddd; margin-top: 5px;">
                        ${arch.desc}
                    </div>
                </div>

                <div class="mirror-grid">
                    <div class="mirror-box mirror-good">
                        <div class="mirror-title">✨ 你的天赋</div>
                        <div class="mirror-desc">这种性格特质，是你的出厂设置。找到能发挥它的场景，你会比别人跑得更快。</div>
                    </div>
                    <div class="mirror-box mirror-bad">
                        <div class="mirror-title">⚠️ 你的雷区</div>
                        <div class="mirror-desc">初入职场，不仅要发挥优势，更要看清自己的性格底色可能在哪里碰壁。</div>
                    </div>
                </div>

                <div class="rec-card">
                    <div class="rec-title">🎯 推荐职业剧本</div>
                    <div class="rec-role" style="color: var(--accent-color); font-size: 18px;">《${roleNames[recRole] || "职场通才"}》</div>
                    <div class="rec-desc" style="margin-top: 5px;">在这个剧本里，你的特质将成为核心竞争力，而不是负担。</div>
                </div>

                <button class="btn-share" onclick="Game.copyReport()">📋 复制结果发朋友圈</button>
                <button class="btn-restart" onclick="Game.restart()">重新测评</button>
            </div>
        `;
    },

    /* 生成打工人报告（优化版） */
    generateWorkerReport(result) {
        const arch = result.archetype;
        const score = result.scores;
        
        let diagnosis = { title: "职场状态正常", text: "继续保持，注意劳逸结合。", action: "观望" };
        
        if (result.isBurnout) {
            diagnosis = { title: "严重职业倦怠", text: "你的身心能量已逼近极限，这不仅影响效率，更损害健康。", action: "立即休息" };
        } else if (result.matchScore < 70 && score.meaning < 40) {
            diagnosis = { title: "人岗匹配度低", text: "你的内在特质与当前工作存在冲突，这正在消耗你的心理资本。", action: "考虑转型" };
        } else if (score.money > 70 && score.meaning < 30) {
            diagnosis = { title: "金手铐陷阱", text: "收益很高，但意义感缺失。你正在用灵魂换金钱。", action: "寻找意义" };
        } else if (score.energy < 30) {
            diagnosis = { title: "身心亚健康", text: "能量条已经见红，虽然还在坚持，但这是不可持续的。", action: "调整节奏" };
        }

        return `
            <div class="report-card">
                <div class="archetype-box" style="text-align: center; margin-bottom: 20px; padding-top: 10px;">
                    <div class="archetype-icon" style="font-size: 40px; margin-bottom: 8px;">${arch.emoji}</div>
                    <div class="archetype-label" style="font-size: 22px; font-weight: 900; color: var(--accent-color);">${arch.label}</div>
                    <div style="font-size: 12px; color: #888; margin-top: 5px;">当前状态：${result.statusLevel}</div>
                </div>

                <div class="status-bars" style="margin-bottom: 20px;">
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

                <div class="diag-box" style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 15px; border-left: 4px solid ${result.isBurnout ? '#e74c3c' : 'var(--accent-color)'};">
                    <div class="diag-title">🧠 深度诊断</div>
                    <div class="diag-text">${diagnosis.text}</div>
                </div>

                <div class="rec-card" style="margin-top: 20px;">
                    <div class="rec-title">💊 行动建议</div>
                    <div class="rec-role" style="color: ${result.isBurnout ? '#e74c3c' : 'var(--accent-color)'};">${diagnosis.action}</div>
                    <div class="rec-desc" style="font-size: 12px; color: #aaa; margin-top: 8px;">
                        ${result.isBurnout ? "建议立刻申请休假，或寻求心理咨询支持。" : 
                        (result.matchScore < 70 ? "建议利用业余时间探索更适合你特质的岗位，尝试投递简历。" : 
                        "目前状态良好，继续保持学习，积累更高层级的资本。")}
                    </div>
                </div>

                <button class="btn-share" onclick="Game.copyReport()">📋 复制结果发朋友圈</button>
                <button class="btn-restart" onclick="Game.restart()">重新测评</button>
            </div>
        `;
    },

    /* 新增：复制报告文本（修正版） */
    copyReport() {
        if (!this.lastResult) return;
        
        const arch = this.lastResult.archetype;
        const role = document.getElementById('hud-role').innerText;
        
        let text = `我在【职业觉醒实验室】完成了测评！\n\n`;
        text += `👤 我的角色：${role}\n`;
        text += `🧬 核心人格：${arch.label} (${arch.emoji})\n`;
        text += `⚡️ 能量值：${this.state.energy} | 🌟 意义感：${this.state.meaning} | 💰 收益：${this.state.money}\n\n`;
        
        if (this.state.identity === 'student') {
            text += `🔮 测评结果：${arch.desc}`;
        } else {
            text += `💊 职场诊断：提醒我要关注自己的状态了。`;
        }
        
        text += `\n来测测你的职场人格画像 👉 https://mituanzi.github.io/CareerGame/`;

        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        alert('✅ 报告已复制到剪贴板，快去粘贴发朋友圈吧！');
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
