/* ================= 主逻辑控制 ================= */

/* ============ MBTI 风格认知层（与 track 价值层正交） ============ */
const COG_AXES = [['e', 'i'], ['s', 'n'], ['t', 'f'], ['j', 'p']];
const COG_LABEL = { e: '外倾', i: '内倾', s: '实感', n: '直觉', t: '思考', f: '情感', j: '判断', p: '知觉' };

// 职业认知九宫格细胞（行=F/T 轴，列=S/N 轴）——报告与海报共用单一来源
const GRID_CELLS = [
    [ {t:'关怀工匠', d:'亲手做出有温度的东西'}, {t:'人文纽带', d:'凝聚团队、传递温度'}, {t:'理想创造者', d:'用愿景感召他人'} ],
    [ {t:'稳健实干', d:'把事踏实落地'}, {t:'均衡协作者', d:'刚柔并济、弹性应对'}, {t:'远见探索者', d:'在可能性里找路'} ],
    [ {t:'精益工程师', d:'优化、可靠、重落地'}, {t:'务实分析者', d:'用数据与方法说话'}, {t:'系统架构师', d:'抽象建模、长远布局'} ]
];
// 根据认知轴计算九宫格落点（row 0=F上 2=T下；col 0=S左 2=N右）
function gridPos(axes) {
    const sn = axes[1], tf = axes[2];
    const totN = sn.va + sn.vb, totF = tf.va + tf.vb;
    const rN = totN === 0 ? 0.5 : sn.vb / totN;
    const rF = totF === 0 ? 0.5 : tf.vb / totF;
    const col = rN > 0.62 ? 2 : (rN < 0.38 ? 0 : 1);
    const row = rF > 0.62 ? 0 : (rF < 0.38 ? 2 : 1);
    return { row, col };
}

/* Canvas 辅助：十六进制色加透明度 */
function hexA(hex, a) {
    const h = (hex || '#00ff88').replace('#', '');
    const n = h.length === 3 ? h.split('').map(x => x + x).join('') : h;
    const r = parseInt(n.slice(0, 2), 16), g = parseInt(n.slice(2, 4), 16), b = parseInt(n.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
}
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}
function wrapText(ctx, text, x, y, maxW, lh) {
    const chars = (text || '').split('');
    let line = '', yy = y;
    for (const ch of chars) {
        const test = line + ch;
        if (ctx.measureText(test).width > maxW && line) { ctx.fillText(line, x, yy); line = ch; yy += lh; }
        else line = test;
    }
    if (line) ctx.fillText(line, x, yy);
    return yy;
}

// 凯尔西气质类型：由认知类型的第 2、3 字母（N/S × T/F）决定
const TEMPERAMENTS = {
    NT: { name: '理性者 · 战略家', desc: '相信世界可被理解与改造，热衷底层逻辑与长期可能性。' },
    SJ: { name: '守护者 · 管理者', desc: '重视秩序、责任与稳定，是系统里最可靠的齿轮与枢纽。' },
    NF: { name: '理想者 · 辅导者', desc: '以意义与人和关系为驱动，追求“做正确的事”。' },
    SP: { name: '艺术者 · 自由人', desc: '活在当下、灵活应变，用行动与手感拿结果。' }
};

// 16 种具体认知类型的职场工作姿态（在“气质层”之上再做细分，避免 INTP/ESTP 等只有笼统概括）
// 调性：连续倾向的“透镜”，不是命运判决书；描述聚焦“在职场里怎么干活”，不绝对化。
const TYPE_DESC = {
    ISTJ: '稳健执行者，信奉规则与程序，擅长把复杂任务拆解成可执行步骤。你在稳定、评价标准明确的环境里最能发光。注意：变化过快或目标模糊的环境会让你持续内耗。',
    ISFJ: '守护型协作者，重视责任与关系，愿意为团队默默兜底。你擅长维护系统、照顾他人需求，是组织里可靠的隐形支柱。注意：过度付出而忽视自己的边界会让你疲惫。',
    INFJ: '理想主义架构者，用愿景串联人与系统，追求工作与意义的统一。你擅长洞察长期趋势和人的真实需求。注意：理想与现实落差过大时容易 burnout。',
    INTJ: '系统性战略家，习惯先用模型想清全局再动手，追求高效与长期目标。你适合定义方向、搭建体系，而非重复执行。注意：低效流程和过多社交会快速消耗你。',
    ISTP: '冷静拆解者，喜欢亲自动手解决具体问题，对工具、逻辑和可验证的结果敏感。你适合技术、运维、实验类工作。注意：被会议、流程或情绪劳动绑架时会烦躁。',
    ISFP: '安静手艺者，在自由与审美里打磨有温度的作品，重视真实与当下。你适合设计、创作、照护等能直接感知成果的工作。注意：被催促、过度评判或困在僵化流程里会窒息。',
    INFP: '价值驱动创作者，为“意义”和“认同”而工作，内在价值感是你的燃料。你适合内容、设计、教育、心理、公益等能表达价值观的领域。注意：功利导向、过度流程化的环境会消耗你的热情。',
    INTP: '逻辑解构者，用模型、假设和系统思维拆解复杂问题，对“无用之学”也可能着迷。你适合研究、架构、数据分析、策略等需要深度思考的工作。注意：无意义的会议、重复性汇报和强社交任务会让你想逃离。',
    ESTP: '临场行动派，在变化、实战和即时反馈中拿结果，擅长快速试错与谈判。你适合销售、创业、运营、应急等高压高变现场。注意：案头规则、长期规划和重复文书会闷死你。',
    ESFP: '现场感染王，用能量、即兴和人际温度带动氛围，擅长让团队和客户“活”起来。你适合市场、活动、直播、客户成功等需要现场感的工作。注意：结构化长线任务、孤立办公和过度内省会让你厌倦。',
    ENFP: '可能性连接者，靠热情、创意和人际关系点燃项目，擅长把不同的人与点子串成故事。你适合创意、品牌、社群、BD、产品等需要愿景和连接的工作。注意：没有收尾伙伴帮你落地会让你焦虑。',
    ENTP: '点子爆破手，擅长挑战假设、快速原型和跨界联想，享受“把不可能辩成可能”。你适合策略、创新、产品、咨询等需要持续挑战的工作。注意：长期单一执行、缺乏新刺激会让你迅速倦怠。',
    ESTJ: '高效组织者，用流程、标准和明确目标推动执行，擅长让一群人把事情按时做完。你适合管理、运营、项目管理、体制/军队的执行岗。注意：模糊目标、低效会议和规则被随意打破会让你不安。',
    ESFJ: '关系型执行官，在团队和谐里高效运转，擅长通过服务他人来推动结果。你适合 HR、客服、行政、教务、社群运营等需要人际维护的工作。注意：冲突、孤立和不被认可会削弱你的动力。',
    ENFJ: '愿景型凝聚者，用价值观和感染力带队伍，擅长发现每个人的潜力并激发出来。你适合团队 lead、培训、教练、HR、公益组织等需要凝聚人心的工作。注意：过度承担他人情绪会让你耗尽。',
    ENTJ: '目标驱动指挥官，擅长定方向、调资源、拿结果，享受把宏大目标拆解成可执行战役。你适合高管、创业、战略、投资等需要决断与资源整合的岗位。注意：细节 micromanagement 和情绪拉扯会拉低你的效率。'
};

// 职业认知交叉表：价值原型(primary track) × 认知气质 → 建议
const CROSS_MAP = {
    tech: {
        NT: '你适合“底层架构/研究型”角色——把技术当成可复用的系统设计，而非救火。',
        SJ: '你适合“标准化交付”角色——在成熟团队做可靠技术骨干，流程和规范是你的护城河。',
        NF: '你适合“技术向善”角色——用技术解决具体人群的真实痛点（无障碍、教育、公益技术）。',
        SP: '你适合“手感型专家”角色——独立接项目、做自由开发者或技术博主，靠作品说话。'
    },
    influence: {
        NT: '你适合“战略型操盘”——做增长、战略、投资，用系统思维整合资源而非单纯社交。',
        SJ: '你适合“组织内协调者”——在大型组织做项目管理、BD，靠稳重信任拿资源。',
        NF: '你适合“愿景型 leader”——做社区、品牌、公益组织，用价值观凝聚人。',
        SP: '你适合“变通型生意人”——销售、创业、商务拓展，靠现场应变拿结果。'
    },
    freedom: {
        NT: '你适合“独立创造”——把技能产品化（SaaS、内容、咨询），自己定节奏。',
        SJ: '你适合“稳健自营”——小型工作室、顾问、远程合约岗，自由但有结构。',
        NF: '你适合“价值驱动的自由职业”——独立设计/写作/教练，按自己认同的方式接活。',
        SP: '你适合“即兴自由人”——自由职业、数字游民、项目制工作，拒绝打卡。'
    },
    security: {
        NT: '你适合“体系内专家”——在大平台/体制里找规则里的空白，做有壁垒的研究岗。',
        SJ: '你适合“标杆执行者”——体制内、大厂样板岗、风控合规，稳定是你的优势。',
        NF: '你适合“有温度的安稳岗”——HR、教务、医护行政，稳定且助人。',
        SP: '你适合“手艺型安稳”——技术蓝领、匠人、运维，靠熟练度拿稳定收入。'
    },
    service: {
        NT: '你适合“系统化助人”——做产品/运营中用户侧的系统设计，用机制放大善意。',
        SJ: '你适合“流程化服务”——客服管理、行政、教务，在结构中稳定输出。',
        NF: '你天生匹配“关系型助岗”——咨询、社工、用户研究、医护，边界感是你要注意的。',
        SP: '你适合“现场型服务”——活动、应急、一线支持，靠即时反应帮到人。'
    },
    challenge: {
        NT: '你适合“硬核攻坚”——创业、硬科技、咨询难题，把压力当燃料。',
        SJ: '你适合“可控的冒险”——大厂攻坚项目、派驻、轮岗，挑战但有兜底。',
        NF: '你适合“有意义的大仗”——社会创新、危机救援、变革项目。',
        SP: '你适合“高变数现场”——销售冲刺、创业、急诊/战地类，越不确定越兴奋。'
    }
};

/* ============ 热爱轴（Passion Axis） ============ */
const PASSION_META = {
    maker:     { name: '创造者', icon: '🔨', desc: '从无到有造出东西' },
    explorer:  { name: '探索者', icon: '🔬', desc: '搞懂复杂的系统和问题' },
    connector: { name: '连接者', icon: '🤝', desc: '帮助人成长、建立深度关系' },
    performer: { name: '表达者', icon: '🎤', desc: '影响、打动、带动一群人' }
};

const PASSION_CROSS_MAP = {
    maker: {
        tech: '你是手艺人——用技术创造作品，需要看到成品从手中诞生。纯执行的螺丝钉岗位会让你窒息。',
        influence: '你是产品人——不只是造东西，还要造出影响很多人的东西。你需要拥有从 0 到 1 的自主权。',
        freedom: '你是独立创造者——需要完全的创作自主权，不能被流程绑住。远程、自由职业或独立工作室是你的理想形态。',
        security: '你是匠人——在稳定的环境里精雕细琢，不急不躁。体制内或大平台的研究岗能让你安心打磨作品。',
        service: '你是社会创新者——创造的目的是解决真实的社会问题。公益技术、教育产品、无障碍设计是你的赛道。',
        challenge: '你是硬核创造者——越难的问题越激发你的创造力。创业、攻坚项目、极限挑战是你的舞台。'
    },
    explorer: {
        tech: '你是研究员——不满足于表面，要拆解到最底层。深度研究、架构设计、底层开发让你越钻越兴奋。',
        influence: '你是战略分析师——用深度洞察指导决策。行研、战略、投资分析让你把好奇心变成真金白银。',
        freedom: '你是自由学者——按自己的节奏探索世界。独立咨询、自由写作、数字游民让你不被组织节奏绑架。',
        security: '你是体系内智囊——在大平台里做深度研究岗。智库、研究院、合规分析让你安稳地追求深度。',
        service: '你是真相挖掘者——研究是为了帮助人看清现实。用户研究、社会调研、数据分析是你的助人方式。',
        challenge: '你是谜题猎人——越复杂的问题越让你上头。咨询、科研攻坚、疑难杂症是你的精神食粮。'
    },
    connector: {
        tech: '你是团队润滑剂——用技术能力帮助同事解决问题。代码 review、mentor、内部工具开发是你的表达方式。',
        influence: '你是人心凝聚者——用影响力把人拉到一起。社区运营、团队建设、跨部门协调让你充满能量。',
        freedom: '你是深度陪伴者——一对一地帮助他人成长。教练、咨询、mentor 是你的理想形态，不需要大舞台。',
        security: '你是组织温暖源——在稳定环境里持续滋养身边的人。HR、教务、行政让你细水长流地帮助人。',
        service: '你是天生助人者——帮助人就是你存在的意义。医护、社工、心理咨询是你的天然赛道，注意边界感。',
        challenge: '你是危机凝聚者——在高压中把团队拉到一起。应急响应、变革管理、危机公关让你既挑战又连接。'
    },
    performer: {
        tech: '你是技术布道者——用表达让技术被看见。技术写作、演讲、开源社区运营让你同时创造和表达。',
        influence: '你是舞台型领袖——享受聚光灯，用感染力带动一群人。品牌、营销、公开演讲是你的主场。',
        freedom: '你是独立内容人——用自己的声音影响世界。自媒体、播客、独立写作让你拥有完全的表達自由。',
        security: '你是组织代言人——在稳定平台里做汇报、展示、对外沟通。体制内的笔杆子或发言人是你的生态位。',
        service: '你是故事讲述者——用表达让被忽视的人被看见。公益传播、纪录片、倡导型内容是你的使命。',
        challenge: '你是高能表演者——在高压舞台上最闪亮。销售路演、创业 pitch、直播带贷让你肾上腺素飙升。'
    }
};

const Game = {
    state: {
        identity: 'worker',
        mode: 'deep', // 默认深度模式
        energy: 100,
        meaning: 50,
        money: 50,
        tracks: {},
        cog: {},
        passion: {}
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
        this.state.cog = {};
        this.state.passion = {};
        
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

        // 插入突发事件（约 1/3、2/3 处），从 crises 池随机抽取、不重复
        const _crises = (GameData.crises || []).slice();
        const _n = this.events.length;
        const _pos = [];
        if (_n >= 6) { _pos.push(Math.floor(_n * 0.34)); if (_n >= 12) _pos.push(Math.floor(_n * 0.67)); }
        _pos.sort((a, b) => b - a); // 从后往前插入，避免位置偏移
        _pos.forEach(pos => {
            if (_crises.length && pos < this.events.length) {
                const ci = Math.floor(Math.random() * _crises.length);
                this.events.splice(pos, 0, _crises.splice(ci, 1)[0]);
            }
        });

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
        
        const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        document.getElementById('hud-time').innerText = `${days[index % 7]} ${(9 + index * 2) % 24}:00`;

        const textEl = document.getElementById('event-text');
        textEl.innerText = event.text;
        
        textEl.style.opacity = 0;
        setTimeout(() => {
            textEl.style.transition = 'opacity 0.4s';
            textEl.style.opacity = 1;
        }, 50);

        const container = document.getElementById('option-btns');
        container.innerHTML = '';
        
        if (event.options) {
            event.options.forEach((opt, i) => {
                const btn = document.createElement('div');
                btn.className = 'act-btn';
                btn.innerText = opt.text;
                btn.onclick = () => this.handleAction(i);
                container.appendChild(btn);
            });
        }

        if (event.isCrisis) this.renderCrisisUI(event);
        else this.clearCrisisUI();
    },

    /* 突发事件 UI：危机样式 + 倒计时条 */
    renderCrisisUI(event) {
        const container = document.querySelector('.event-container');
        if (container) container.classList.add('crisis-mode');
        let bar = document.getElementById('crisis-timer');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'crisis-timer';
            bar.className = 'crisis-timer';
            const ab = document.querySelector('.action-btns');
            if (container && ab) container.insertBefore(bar, ab);
        }
        bar.style.display = 'block';
        this.startCrisisTimer(event.timer || 12, bar);
    },

    clearCrisisUI() {
        this.stopCrisisTimer();
        const container = document.querySelector('.event-container');
        if (container) container.classList.remove('crisis-mode');
        const bar = document.getElementById('crisis-timer');
        if (bar) bar.style.display = 'none';
    },

    startCrisisTimer(sec, bar) {
        this.stopCrisisTimer();
        let left = sec;
        bar.innerHTML = '<div class="crisis-timer-fill"></div><span class="crisis-timer-text">⏳ 危机决策 · 剩 ' + left + ' 秒</span>';
        const fill = bar.querySelector('.crisis-timer-fill');
        if (fill) fill.style.width = '100%';
        this._crisisTimer = setInterval(() => {
            left--;
            const t = bar.querySelector('.crisis-timer-text');
            if (t) t.innerText = '⏳ 危机决策 · 剩 ' + Math.max(0, left) + ' 秒';
            if (fill) fill.style.width = Math.max(0, left / sec * 100) + '%';
            if (left <= 0) {
                this.stopCrisisTimer();
                this.handleAction(1); // 超时：系统替你做了保守选择
            }
        }, 1000);
    },

    stopCrisisTimer() {
        if (this._crisisTimer) { clearInterval(this._crisisTimer); this._crisisTimer = null; }
    },

    /* 5. 处理选择 */
    handleAction(optionIndex) {
        this.stopCrisisTimer(); // 做选择前先停掉危机倒计时
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

        // 价值层：统计主导特质（累加计数，而非布尔标记——原版用 true 会导致排序失效）
        if (option.track) {
            const track = option.track === 'craftsman' ? 'tech' : option.track;
            this.state.tracks[track] = (this.state.tracks[track] || 0) + 1;
        }

        // 认知层：累加认知维度权重
        if (option.cog) {
            for (const k in option.cog) {
                this.state.cog[k] = (this.state.cog[k] || 0) + option.cog[k];
            }
        }

        // 热爱轴：累加内驱力信号
        if (option.passion) {
            for (const k in option.passion) {
                this.state.passion[k] = (this.state.passion[k] || 0) + option.passion[k];
            }
        }

        // 情境吐槽：把这次选择的代价/收益翻译成一句人话（实时反馈）
        if (option.effect) this.showQuip(option.effect);

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

    /* 6. 更新界面（实时仪表盘：环形进度 + 心跳 + 数值弹跳 + delta 飘字） */
    updateStats() {
        if (!this._lastStats) {
            this._lastStats = { energy: this.state.energy, meaning: this.state.meaning, money: this.state.money };
        }
        const C = 264; // 环形圆周长 ≈ 2πr (r=42)
        const map = [
            { key: 'energy',  ring: 'ring-energy',  id: 'val-energy' },
            { key: 'meaning', ring: 'ring-meaning', id: 'val-meaning' },
            { key: 'money',   ring: 'ring-money',   id: 'val-money' }
        ];
        map.forEach(({ key, ring, id }) => {
            const newVal = this.state[key];
            const delta = newVal - this._lastStats[key];
            const valEl = document.getElementById(id);
            valEl.innerText = newVal;

            // 环形进度（stroke-dashoffset 驱动）
            const ringEl = document.getElementById(ring);
            if (ringEl) ringEl.style.strokeDashoffset = C * (1 - Math.max(0, Math.min(100, newVal)) / 100);

            // 数值变化时：飘字 + 数字弹跳
            if (delta !== 0) {
                this.spawnFloat(valEl, delta);
                this.popVal(valEl);
            }
        });

        // 能量维度：始终心跳；低能量时变红加强（命悬一线的紧张感）
        const eRing = document.querySelector('.stat-ring[data-key="energy"]');
        if (eRing) {
            if (this.state.energy <= 20) { eRing.classList.add('beat-danger'); eRing.classList.remove('beat'); }
            else { eRing.classList.add('beat'); eRing.classList.remove('beat-danger'); }
        }

        this._lastStats = { energy: this.state.energy, meaning: this.state.meaning, money: this.state.money };
    },

    /* 仪表盘：数值弹跳（选择后数字轻微放大回落） */
    popVal(valEl) {
        valEl.classList.remove('pop');
        void valEl.offsetWidth; // 重置动画，确保连续触发也生效
        valEl.classList.add('pop');
        setTimeout(() => valEl.classList.remove('pop'), 420);
    },

    /* 仪表盘：数值飘字（+N / -N 上浮淡出） */
    spawnFloat(el, delta) {
        const ring = el.closest('.stat-ring');
        if (!ring) return;
        const s = document.createElement('span');
        s.className = 'stat-delta ' + (delta > 0 ? 'up' : 'down');
        s.innerText = (delta > 0 ? '+' : '') + delta;
        ring.appendChild(s);
        setTimeout(() => s.remove(), 1000);
    },

    /* 情境吐槽：把本次选择的代价/收益翻译成一句人话（单例：新吐槽替换旧的，避免连续选择时堆叠） */
    showQuip(effect) {
        const txt = this.getQuip(effect.energy || 0, effect.meaning || 0, effect.money || 0);
        if (!txt) return;
        let layer = document.getElementById('quip-layer');
        if (!layer) {
            layer = document.createElement('div');
            layer.id = 'quip-layer';
            document.body.appendChild(layer);
        }
        layer.innerHTML = ''; // 先清空已有吐槽，确保层里始终只有一个
        const t = document.createElement('div');
        t.className = 'quip-toast';
        t.innerText = txt;
        layer.appendChild(t);
        requestAnimationFrame(() => t.classList.add('show'));
        setTimeout(() => { if (t.parentNode) t.classList.remove('show'); }, 2600);
        setTimeout(() => { if (t.parentNode) t.remove(); }, 3100);
    },

    /* 吐槽文案生成（按三维度增减组合，贴合游戏"清醒、不替人做选择"的调性） */
    getQuip(e, m, y) {
        if (e === 0 && m === 0 && y === 0) return null;
        const quips = [];
        if (e < 0 && y > 0) quips.push('用命换钱，熟悉的配方。');
        if (e < 0 && m > 0) quips.push('理想很丰满，电量很骨感。');
        if (y < 0 && m > 0) quips.push('钱包瘪了，但眼睛亮了。');
        if (y < 0 && e > 0) quips.push('钱没了，命还在，不亏。');
        if (m < 0 && y > 0) quips.push('钱是到账了，魂好像掉了点。');
        if (e > 0 && m > 0 && y > 0) quips.push('三喜临门？今天宜上班。');
        if (e < 0 && m < 0 && y < 0) quips.push('三杀。今天不宜睁眼。');
        if (e > 0 && m === 0 && y === 0) quips.push('回血一口，缓缓。');
        if (m > 0 && e === 0 && y === 0) quips.push('意义感 +1，肉眼可见。');
        if (y > 0 && e === 0 && m === 0) quips.push('到账了，虽然不多。');
        if (quips.length) return quips[Math.floor(Math.random() * quips.length)];
        // 没命中明确组合的，按主导维度补一句
        const abs = [['e', e], ['m', m], ['y', y]].sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
        const [dom, v] = abs[0];
        if (dom === 'e') return v > 0 ? '电量回升，状态回来了。' : '电量告急，注意续航。';
        if (dom === 'm') return v > 0 ? '心里被填了一点东西。' : '意义感 -1，说不清哪里空。';
        return v > 0 ? '收益微涨，蚊子腿也是肉。' : '收益微降，肉疼。';
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

        // 6. 认知层：由 cog 累加值推断认知类型与气质
        const cog = this.state.cog || {};
        const axisDetails = [];
        let type = '';
        COG_AXES.forEach(([a, b]) => {
            const va = cog[a] || 0, vb = cog[b] || 0;
            const total = va + vb;
            let letter, clarity;
            if (total === 0) { letter = a.toUpperCase(); clarity = 0; }
            else if (va === vb) { letter = a.toUpperCase(); clarity = 50; }
            else if (va > vb) { letter = a.toUpperCase(); clarity = Math.round(va / total * 100); }
            else { letter = b.toUpperCase(); clarity = Math.round(vb / total * 100); }
            type += letter;
            axisDetails.push({ a, b, va, vb, letter, clarity });
        });
        const nOrS = type[1], tOrF = type[2], jOrP = type[3];
        let temp = 'NT';
        if (nOrS === 'N') temp = (tOrF === 'F') ? 'NF' : 'NT';
        else temp = (jOrP === 'P') ? 'SP' : 'SJ';
        const cognitive = { type, axes: axisDetails, temp };

        // 7. 热爱轴：排序内驱力信号
        const passion = this.state.passion || {};
        const passionSorted = Object.entries(passion)
            .sort((a, b) => b[1] - a[1]);
        const primaryPassion = (passionSorted[0] && passionSorted[0][0]) || 'maker';
        const passionTotal = passionSorted.reduce((s, e) => s + e[1], 0) || 1;

        return {
            scores: this.state,
            archetype: archetype,
            mainTrait: traitMap[primary],
            primaryKey: primary,
            isBurnout: reason === 'burnout',
            statusLevel: statusLevel,
            matchScore: matchScore,
            cognitive: cognitive,
            passion: passionSorted,
            primaryPassion: primaryPassion,
            passionTotal: passionTotal
        };
    },

    /* 生成学生报告（v7 热爱轴版） */
    generateStudentReport(result) {
        const arch = result.archetype;
        const trait = result.mainTrait;
        
        let recRole = trait.suit[0];
        if (result.scores.energy < 40) recRole = "soe";

        const roleNames = {
            coder: "程序员", finance: "金融民工", soe: "央企职员",
            civil: "体制内", academic: "高校青椒", medical: "医务工作者"
        };

        const pMeta = PASSION_META[result.primaryPassion];
        const crossInsight = (PASSION_CROSS_MAP[result.primaryPassion] && PASSION_CROSS_MAP[result.primaryPassion][result.primaryKey])
            || '你的热爱与价值取向组合独特，建议结合具体行业再做判断。';

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

                ${this.passionEngineHTML(result)}

                <div class="rec-card" style="margin-top: 20px;">
                    <div class="rec-title">🔥 热爱 × 价值 交叉洞察</div>
                    <div class="rec-desc" style="margin-top: 6px; line-height: 1.7; color: #ddd;">${crossInsight}</div>
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

                ${this.cognitiveBlockHTML(result)}

                <div class="rec-card">
                    <div class="rec-title">🎯 推荐职业剧本</div>
                    <div class="rec-role" style="color: var(--accent-color); font-size: 18px;">《${roleNames[recRole] || "职场通才"}》</div>
                    <div class="rec-desc" style="margin-top: 5px;">在这个剧本里，你的特质将成为核心竞争力，而不是负担。</div>
                </div>

                <button class="btn-share" onclick="Game.copyReport()">📋 复制结果发朋友圈</button>
                <button class="btn-ai" onclick="Game.openPoster()">🖼️ 生成我的职场人格卡</button>
                <button class="btn-restart" onclick="Game.restart()">重新测评</button>
            </div>
        `;
    },

    /* 生成热爱引擎区块（学生线 / 打工人线共用） */
    passionEngineHTML(result) {
        const passion = result.passion;
        const total = result.passionTotal;
        const primary = PASSION_META[result.primaryPassion];

        const bars = passion.map(([key, val]) => {
            const meta = PASSION_META[key];
            if (!meta) return '';
            const pct = total > 0 ? Math.round(val / total * 100) : 0;
            const isPrimary = key === result.primaryPassion;
            return `
                <div class="passion-bar-row">
                    <div class="passion-bar-label">
                        <span>${meta.icon} ${meta.name}</span>
                        <span style="font-size:11px;color:#999;">${pct}%</span>
                    </div>
                    <div class="status-track">
                        <div class="passion-bar-fill${isPrimary ? ' passion-primary' : ''}" style="width: ${pct}%"></div>
                    </div>
                </div>`;
        }).join('');

        return `
            <div class="insight-box" style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 20px; margin-bottom: 25px; position: relative;">
                <div style="position: absolute; top: -10px; left: 20px; font-size: 24px;">${primary.icon}</div>
                <div style="font-size: 18px; font-weight: 900; color: var(--accent-color); margin: 4px 0 2px;">你的热爱引擎 · ${primary.name}</div>
                <div style="font-size: 12px; color: #ccc; line-height: 1.7; margin-bottom: 14px;">
                    在 ${total} 次热爱信号中，「${primary.name}」出现了 ${passion[0] && passion[0][1] ? passion[0][1] : 0} 次——你对"${primary.desc}"的渴望远超其他方向。这不是能力判断，而是能量判断：${primary.desc.toLowerCase()}让你充电，而不是耗电。
                </div>
                ${bars}
            </div>`;
    },

    /* 生成认知风格 + 职业认知交叉区块（学生线 / 打工人线共用） */
    cognitiveBlockHTML(result) {
        const c = result.cognitive;
        const temp = TEMPERAMENTS[c.temp];
        const bars = c.axes.map(ax => {
            const total = ax.va + ax.vb;
            const leftPct = total === 0 ? 50 : Math.round(ax.va / total * 100);
            const dom = ax.letter.toLowerCase();
            const leftColor = dom === ax.a ? '#fff' : '#777';
            const rightColor = dom === ax.b ? '#fff' : '#777';
            const clarityTxt = total === 0 ? '样本不足' : (ax.clarity + '% 清晰');
            return `
                <div class="status-item" style="margin-bottom: 10px;">
                    <div class="status-header">
                        <span style="color:${leftColor}; font-weight:${dom === ax.a ? 700 : 400};">${ax.a.toUpperCase()} ${COG_LABEL[ax.a]}</span>
                        <span style="font-size: 11px; color: #999;">${clarityTxt}</span>
                        <span style="color:${rightColor}; font-weight:${dom === ax.b ? 700 : 400};">${COG_LABEL[ax.b]} ${ax.b.toUpperCase()}</span>
                    </div>
                    <div class="status-track"><div class="status-fill fill-good" style="width: ${leftPct}%"></div></div>
                </div>`;
        }).join('');

        const cross = (CROSS_MAP[result.primaryKey] && CROSS_MAP[result.primaryKey][c.temp]) || "你的价值取向与认知风格组合独特，建议结合具体行业再做判断。";

        return `
            <div class="insight-box" style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 20px; margin-bottom: 25px; position: relative;">
                <div style="position: absolute; top: -10px; left: 20px; font-size: 24px;">🧠</div>
                <div style="font-size: 18px; font-weight: 900; color: var(--accent-color); margin: 4px 0 2px;">你的认知风格 · ${c.type}</div>
                <div style="font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 6px;">${temp.name}</div>
                <div style="font-size: 12px; color: #ccc; line-height: 1.7; margin-bottom: 14px;">${TYPE_DESC[c.type] || temp.desc}</div>
                ${bars}
                ${this.cognitiveGridHTML(result)}
            </div>

            <div class="rec-card" style="margin-top: 15px;">
                <div class="rec-title">🔭 职业认知（价值原型 × 认知风格）</div>
                <div class="rec-desc" style="margin-top: 6px; line-height: 1.7; color: #ddd;">${cross}</div>
            </div>
        `;
    },

    /* 生成职业认知九宫格（S/N × T/F 双轴落点） */
    cognitiveGridHTML(result) {
        const { row: rowMe, col: colMe } = gridPos(result.cognitive.axes);
        const cells = GRID_CELLS;
        let html = '';
        for (let r = 0; r < 3; r++) {
            for (let col = 0; col < 3; col++) {
                const isMe = (r === rowMe && col === colMe);
                const cell = cells[r][col];
                const bg = isMe ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)';
                const bd = isMe ? 'var(--accent-color)' : 'rgba(255,255,255,0.08)';
                const sh = isMe ? 'box-shadow:0 0 14px rgba(120,200,255,0.35);' : '';
                const tag = isMe ? '<div style="font-size:10px;color:var(--accent-color);font-weight:700;margin-bottom:2px;">📍 你在这里</div>' : '';
                html += '<div style="background:' + bg + ';border:1px solid ' + bd + ';border-radius:10px;padding:9px 7px;min-height:58px;text-align:center;' + sh + '">' +
                    tag +
                    '<div style="font-size:12px;font-weight:700;color:' + (isMe ? 'var(--accent-color)' : '#eee') + ';">' + cell.t + '</div>' +
                    '<div style="font-size:10px;color:#aaa;line-height:1.4;margin-top:2px;">' + cell.d + '</div>' +
                '</div>';
            }
        }
        return '<div style="font-size:13px;color:#bbb;margin:14px 0 4px;">🔭 <b style="color:var(--accent-color);">职业认知地图</b> · 横轴 实感S ↔ 直觉N，纵轴 情感F ↔ 思考T</div>' +
            '<div style="display:flex;justify-content:space-between;font-size:10px;color:#888;margin:0 4px 4px;"><span>◀ 实感 S（具体·当下）</span><span>直觉 N（可能·长远）▶</span></div>' +
            '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:4px 0;">' + html + '</div>' +
            '<div style="display:flex;justify-content:space-between;font-size:10px;color:#888;margin:4px 4px 0;"><span>▲ 情感 F（人·感受）</span><span>思考 T（逻辑·效率）▼</span></div>';
    },

    /* 生成可分享海报（Canvas 零依赖绘制，v7 热爱轴版） */
    drawPoster(canvas, result) {
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        const accent = (getComputedStyle(document.body).getPropertyValue('--accent-color').trim()) || '#00ff88';
        const font = (w, bold) => (bold ? 'bold ' : '') + w + 'px "Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif';

        const bg = ctx.createLinearGradient(0, 0, 0, H);
        bg.addColorStop(0, '#1a1a1c'); bg.addColorStop(1, '#0f0f11');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
        const glow = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, W * 0.85);
        glow.addColorStop(0, hexA(accent, 0.2)); glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);

        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff'; ctx.font = font(42, true); ctx.fillText('职业觉醒实验室', W / 2, 84);
        ctx.fillStyle = '#888'; ctx.font = font(19, false); ctx.fillText('YOUR CAREER AWAKENING LAB', W / 2, 116);
        ctx.strokeStyle = accent; ctx.globalAlpha = 0.6; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(W / 2 - 120, 140); ctx.lineTo(W / 2 + 120, 140); ctx.stroke(); ctx.globalAlpha = 1;

        const arch = result.archetype, c = result.cognitive, temp = TEMPERAMENTS[c.temp];
        ctx.font = font(66, false); ctx.fillText(arch.emoji, W / 2, 230);
        ctx.fillStyle = accent; ctx.font = font(42, true); ctx.fillText(arch.label, W / 2, 285);
        ctx.fillStyle = '#aaa'; ctx.font = font(18, false); ctx.fillText('价值原型 · ' + result.mainTrait.name, W / 2, 312);

        // 热爱引擎
        const pMeta = PASSION_META[result.primaryPassion];
        ctx.fillStyle = '#fff'; ctx.font = font(26, true);
        ctx.fillText(pMeta.icon + ' 热爱引擎 · ' + pMeta.name, W / 2, 360);

        const passion = result.passion;
        const pTotal = result.passionTotal;
        const barX = 100, barW = W - 200, barH = 18, barGap = 36;
        let barY = 390;
        passion.forEach(([key, val]) => {
            const meta = PASSION_META[key];
            if (!meta) return;
            const pct = pTotal > 0 ? val / pTotal : 0;
            const isPrimary = key === result.primaryPassion;
            ctx.textAlign = 'left';
            ctx.fillStyle = isPrimary ? '#fff' : '#999';
            ctx.font = font(isPrimary ? 16 : 14, isPrimary);
            ctx.fillText(meta.icon + ' ' + meta.name, barX, barY + 13);
            const pctTxt = Math.round(pct * 100) + '%';
            ctx.textAlign = 'right';
            ctx.fillStyle = '#888'; ctx.font = font(13, false);
            ctx.fillText(pctTxt, barX + barW, barY + 13);
            ctx.fillStyle = 'rgba(255,255,255,0.08)';
            roundRect(ctx, barX, barY + 20, barW, barH, 6); ctx.fill();
            if (pct > 0) {
                ctx.fillStyle = isPrimary ? accent : 'rgba(255,255,255,0.2)';
                roundRect(ctx, barX, barY + 20, barW * pct, barH, 6); ctx.fill();
            }
            barY += barGap;
        });

        // 认知风格
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff'; ctx.font = font(26, true); ctx.fillText('认知风格 · ' + c.type, W / 2, barY + 30);
        ctx.fillStyle = '#bbb'; ctx.font = font(18, false); ctx.fillText(temp.name, W / 2, barY + 58);

        // 九宫格
        const gridY = barY + 80;
        const gridX = 80, cellW = (W - 160) / 3, cellH = 88;
        const { row: rowMe, col: colMe } = gridPos(c.axes);
        for (let r = 0; r < 3; r++) for (let col = 0; col < 3; col++) {
            const x = gridX + col * cellW, y = gridY + r * cellH;
            const me = (r === rowMe && col === colMe);
            ctx.fillStyle = me ? hexA(accent, 0.2) : 'rgba(255,255,255,0.04)';
            roundRect(ctx, x + 4, y + 4, cellW - 8, cellH - 8, 10); ctx.fill();
            ctx.strokeStyle = me ? accent : 'rgba(255,255,255,0.1)'; ctx.lineWidth = me ? 2 : 1;
            roundRect(ctx, x + 4, y + 4, cellW - 8, cellH - 8, 10); ctx.stroke();
            const cell = GRID_CELLS[r][col];
            if (me) {
                ctx.fillStyle = accent; ctx.font = font(13, true); ctx.fillText('📍 你在这里', x + cellW / 2, y + 22);
                ctx.fillStyle = accent; ctx.font = font(18, true); ctx.fillText(cell.t, x + cellW / 2, y + 52);
            } else {
                ctx.fillStyle = '#eee'; ctx.font = font(17, false); ctx.fillText(cell.t, x + cellW / 2, y + cellH / 2 - 2);
                ctx.fillStyle = '#999'; ctx.font = font(11, false); ctx.fillText(cell.d, x + cellW / 2, y + cellH / 2 + 16);
            }
        }
        ctx.fillStyle = '#777'; ctx.font = font(13, false);
        ctx.textAlign = 'left'; ctx.fillText('◀ 实感 S', gridX + 6, gridY + 3 * cellH + 20);
        ctx.textAlign = 'right'; ctx.fillText('直觉 N ▶', gridX + (W - 160) - 6, gridY + 3 * cellH + 20);
        ctx.textAlign = 'center';

        // 交叉建议
        const cross = (PASSION_CROSS_MAP[result.primaryPassion] && PASSION_CROSS_MAP[result.primaryPassion][result.primaryKey])
            || '你的组合独特，建议结合具体行业再判断。';
        const crossY = gridY + 3 * cellH + 50;
        ctx.fillStyle = accent; ctx.font = font(18, true); ctx.fillText('🔥 热爱 × 价值', W / 2, crossY);
        ctx.fillStyle = '#ddd'; ctx.font = font(16, false);
        wrapText(ctx, cross, W / 2, crossY + 30, W - 140, 26);

        ctx.fillStyle = '#666'; ctx.font = font(15, false);
        ctx.fillText('— 测测你的职场人格觉醒路径 —', W / 2, H - 34);
    },

    /* 海报弹窗：生成 / 关闭 / 下载 */
    openPoster() {
        const result = this.lastResult;
        if (!result) return;
        let overlay = document.getElementById('poster-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'poster-overlay';
            overlay.className = 'poster-overlay';
            overlay.innerHTML = '<div class="poster-modal">' +
                '<canvas id="poster-canvas" width="720" height="1280"></canvas>' +
                '<div class="poster-actions">' +
                    '<button class="btn-share" onclick="Game.downloadPoster()">📥 保存图片</button>' +
                    '<button class="btn-back" onclick="Game.closePoster()">关闭</button>' +
                '</div>' +
                '<div class="poster-tip">长按图片也可保存到相册</div>' +
            '</div>';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', (e) => { if (e.target === overlay) Game.closePoster(); });
        }
        overlay.style.display = 'flex';
        const canvas = document.getElementById('poster-canvas');
        this.drawPoster(canvas, result);
    },
    closePoster() {
        const o = document.getElementById('poster-overlay');
        if (o) o.style.display = 'none';
    },
    downloadPoster() {
        const c = document.getElementById('poster-canvas');
        if (!c) return;
        const a = document.createElement('a');
        a.download = '职场人格卡.png';
        a.href = c.toDataURL('image/png');
        a.click();
    },

    /* 生成打工人报告（v7 热爱轴版） */
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

        const pMeta = PASSION_META[result.primaryPassion];
        const crossInsight = (PASSION_CROSS_MAP[result.primaryPassion] && PASSION_CROSS_MAP[result.primaryPassion][result.primaryKey])
            || '你的热爱与价值取向组合独特，建议结合具体行业再做判断。';

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

                ${this.passionEngineHTML(result)}

                <div class="rec-card">
                    <div class="rec-title">🔥 热爱 × 价值 交叉洞察</div>
                    <div class="rec-desc" style="margin-top: 6px; line-height: 1.7; color: #ddd;">${crossInsight}</div>
                </div>

                <div class="insight-box" style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 14px; margin-top: 16px; font-size: 13px; color: #ccc; line-height: 1.7;">
                    🧬 <b style="color: var(--accent-color);">认知风格 ${result.cognitive.type}</b>（${TEMPERAMENTS[result.cognitive.temp].name}）· 你的"出厂设置"是【${result.mainTrait.name}】。上面的消耗或倦怠，往往发生在工作要求与你认知习惯相悖时——下一步调整，记得顺着自己的节奏。
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
                <button class="btn-ai" onclick="Game.openPoster()">🖼️ 生成我的职场人格卡</button>
                <button class="btn-restart" onclick="Game.restart()">重新测评</button>
            </div>
        `;
    },

    /* 新增：复制报告文本（v7 热爱轴版） */
    copyReport() {
        if (!this.lastResult) return;
        
        const arch = this.lastResult.archetype;
        const role = document.getElementById('hud-role').innerText;
        const pMeta = PASSION_META[this.lastResult.primaryPassion];
        
        let text = `我在【职业觉醒实验室】完成了测评！\n\n`;
        text += `👤 我的角色：${role}\n`;
        text += `🧬 核心人格：${arch.label} (${arch.emoji})\n`;
        text += `🔥 热爱引擎：${pMeta.icon} ${pMeta.name}\n`;
        text += `🧠 认知风格：${this.lastResult.cognitive.type}（${TEMPERAMENTS[this.lastResult.cognitive.temp].name}）\n`;
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
