/* 数据层：存放角色配置、剧本库、特质分析 */
const GameData = {
    // 角色配置
    roles: [
        { id: 'coder', icon: '💻', name: '程序员' },
        { id: 'finance', icon: '💰', name: '金融民工' },
        { id: 'soe', icon: '🏭', name: '央企职员' },
        { id: 'civil', icon: '🏛️', name: '体制内' },
        { id: 'academic', icon: '📚', name: '高校青椒' },
        { id: 'medical', icon: '⚕️', name: '医务工作者' }
    ],
    
    // 剧本库
    scenarios: {
        coder: [
            { text: "你攻克了一个困扰团队一个月的技术难题，CEO在全员大会上点名表扬你，并给了你一笔可观的期权。这是技术人的高光时刻。", choices: { do: { text: "享受这份荣耀，并以此为契机要求带独立小组，承担更大压力。", effects: {e:-5,m:20,y:10}, track: "challenge" }, reject: { text: "低调处理，只想安安静静写代码，不想被推到前台卷管理。", effects: {e:10,m:5,y:0}, track: "tech" } } },
            { text: "公司最新架构调整，你有机会转做“技术管理”，工资涨一级，但基本告别代码，主要工作是开会和写PPT。", choices: { do: { text: "接受转型，这是职场上升的必经之路，我不做别人也会做。", effects: {e:-10,m:-5,y:15}, track: "influence" }, reject: { text: "拒绝，我无法忍受失去创造工具的快乐，哪怕升职无望。", effects: {e:5,m:15,y:-5}, track: "tech" } } },
            { text: "一个猎头给你推了一个远程工作机会，薪资少20%，但你可以自由安排时间，甚至去大理旅居。", choices: { do: { text: "立刻辞职，生活不应该只有代码，还有远方。", effects: {e:15,m:15,y:-10}, track: "freedom" }, reject: { text: "太冒险了，现在的环境，保住大厂高薪饭票更重要。", effects: {e:-5,m:-10,y:5}, track: "security" } } },
            { text: "你发现团队里那个代码写得烂的同事，因为和老板关系好，晋升速度比你快。", choices: { do: { text: "我也得学着“懂事”，主动找老板汇报思想，加入政治游戏。", effects: {e:-10,m:-15,y:10}, track: "influence" }, reject: { text: "嗤之以鼻，继续深耕技术。我相信长期看，硬实力才是护城河。", effects: {e:-5,m:10,y:-5}, track: "tech" } } },
            { text: "为了赶进度，底层架构埋下了隐患。修好它需要停服三天，不修也许永远不出事。", choices: { do: { text: "申请停服修复，我是工程师，必须对代码负责。", effects: {e:-20,m:20,y:-10}, track: "tech" }, reject: { text: "加上监控补丁，祈祷在跳槽前别暴雷。", effects: {e:5,m:-30,y:5}, track: "security" } } }
        ],
        finance: [
            { text: "你主控的项目今年给公司赚了上千万，年终奖到账的那一刻，你觉得之前的通宵都值了。", choices: { do: { text: "用这笔钱买个大件奖励自己，明年继续拼，高薪就是正义。", effects: {e:-20,m:-5,y:30}, track: "challenge" }, reject: { text: "看着数字感到空虚，把部分收入捐给公益，寻找内心安宁。", effects: {e:-5,m:15,y:-10}, track: "service" } } },
            { text: "你有机会接触到顶级企业家，听他们讲述商业帝国的逻辑。这种顶层视野让你大开眼界。", choices: { do: { text: "珍惜机会，努力学习他们的思维，梦想成为他们。", effects: {e:-10,m:5,y:5}, track: "influence" }, reject: { text: "保持距离，我只想执行交易，不想被宏大叙事绑架。", effects: {e:5,m:-5,y:0}, track: "security" } } },
            { text: "IPO项目过会前夕，你发现一个小的合规瑕疵。指出它可能导致项目流产，奖金泡汤；忽略它，大概率没人发现。", choices: { do: { text: "必须指出，我不愿在职业生涯里埋下地雷。", effects: {e:-5,m:20,y:-20}, track: "tech" }, reject: { text: "为了团队和奖金，选择忽略。这行都是这么干的。", effects: {e:-10,m:-20,y:15}, track: "security" } } },
            { text: "你发现自己经手的资金流向了房地产泡沫，你的工作本质是把普通人储蓄变成富人游戏。", choices: { do: { text: "申请转岗去做行研，哪怕钱少，也要离创造价值近一点。", effects: {e:-5,m:20,y:-10}, track: "service" }, reject: { text: "别想太多，这就是金融本质，赚钱才是硬道理。", effects: {e:-5,m:-20,y:15}, track: "security" } } },
            { text: "客户亏损严重，打电话骂了你十分钟。你需要安抚情绪，但心里也明白这是市场风险。", choices: { do: { text: "专业安抚，发送详细分析报告，用数据说话。", effects: {e:-20,m:-5,y:10}, track: "service" }, reject: { text: "转接客服部，我不应该直接面对这种情绪垃圾。", effects: {e:5,m:-5,y:-5}, track: "security" } } }
        ],
        soe: [
            { text: "单位分房了。虽然地段一般，但这在一线城市意味着省去了几百万房贷压力，家人终于松了口气。", choices: { do: { text: "感恩这份安稳，接受体制内的游戏规则。", effects: {e:-5,m:-10,y:20}, track: "security" }, reject: { text: "房子有了，但感觉这辈子也就这样了，不甘心。", effects: {e:0,m:-5,y:15}, track: "freedom" } } },
            { text: "领导找你谈话，想调你去核心部门当秘书，这通常是升迁快车道，但也是最累的岗位。", choices: { do: { text: "抓住机会，离权力中心越近，机会越多。", effects: {e:-20,m:-5,y:10}, track: "influence" }, reject: { text: "婉拒，我不想把生活全献给工作，清闲挺好。", effects: {e:10,m:5,y:-5}, track: "freedom" } } },
            { text: "你在专业领域发表了高质量论文，有私企想高薪挖你去做技术专家，打破薪资天花板。", choices: { do: { text: "跳槽！体制内天花板太低，我要去市场检验价值。", effects: {e:5,m:10,y:15}, track: "tech" }, reject: { text: "拒绝，外面风浪大，体制内的平台值得留下。", effects: {e:-5,m:-5,y:0}, track: "security" } } },
            { text: "为了应付检查，部门需要编造一份“创新成果”汇报。领导暗示你笔杆子好。", choices: { do: { text: "婉拒，申请去一线干苦差事，也不愿造假。", effects: {e:-10,m:5,y:-5}, track: "freedom" }, reject: { text: "接受任务，写得天花乱坠，大家都在演。", effects: {e:-5,m:-25,y:5}, track: "security" } } },
            { text: "同事是典型的“关系户”，经常把工作推给你。他刚又把麻烦报表扔给你。", choices: { do: { text: "当面拒绝：“我手头也紧，帮不了。”", effects: {e:5,m:5,y:0}, track: "freedom" }, reject: { text: "为了维持和平，帮他把活干了，不想惹事。", effects: {e:-15,m:-10,y:0}, track: "security" } } }
        ],
        civil: [
            { text: "你帮一位办事的老人解决了大麻烦，老人握着你的手说：“你是真正为人民服务的好干部。”", choices: { do: { text: "这一刻，我觉得繁文缛节都值了，这就是意义。", effects: {e:5,m:25,y:-5}, track: "service" }, reject: { text: "感动只是一瞬，现实还要面对年底考核压力。", effects: {e:-5,m:0,y:0}, track: "security" } } },
            { text: "上级下达了一个“必须完成”但不合逻辑的指标，强制执行会损害基层利益。", choices: { do: { text: "如实反馈困难，提出修改建议，哪怕被批执行力不强。", effects: {e:-10,m:10,y:-5}, track: "influence" }, reject: { text: "照单全收，压力下传，只要我不背锅。", effects: {e:5,m:-20,y:5}, track: "security" } } },
            { text: "办事大厅来了一位情绪激动的群众，手续不全但跑了大半天。后面排队的人开始抱怨。", choices: { do: { text: "“原则上不行但想办法办”，利用午休帮他补齐。", effects: {e:-15,m:15,y:-5}, track: "service" }, reject: { text: "公事公办，温和拒绝。为了效率，必须牺牲少数人。", effects: {e:5,m:-15,y:5}, track: "security" } } },
            { text: "巡查组来检查，台账资料有缺失。补齐需要造假，不补可能被问责。", choices: { do: { text: "连夜补造，为了集体荣誉，这点形式主义是代价。", effects: {e:-20,m:-15,y:5}, track: "security" }, reject: { text: "实事求是说明情况，不助长这种风气。", effects: {e:5,m:10,y:-10}, track: "freedom" } } },
            { text: "单位有个下乡扶贫的名额，条件艰苦，但回来后提干概率大。", choices: { do: { text: "主动报名，基层履历是未来晋升的关键筹码。", effects: {e:-25,m:5,y:10}, track: "challenge" }, reject: { text: "家里离不开人，还是守在机关里安稳。", effects: {e:5,m:-5,y:0}, track: "security" } } }
        ],
        academic: [
            { text: "你收到了一封学生信件，说你的一堂课改变了他的人生观。这种精神富足感是钱买不来的。", choices: { do: { text: "把更多精力投入教学，这才是大学老师的灵魂。", effects: {e:-5,m:20,y:-5}, track: "service" }, reject: { text: "感动归感动，评职称只看论文，还是搞科研。", effects: {e:-10,m:-5,y:5}, track: "security" } } },
            { text: "学校提供了“教学型教授”晋升通道，名额少但竞争小，意味着放弃科研项目。", choices: { do: { text: "走教学路线，我喜欢和学生在一起。", effects: {e:5,m:10,y:-5}, track: "service" }, reject: { text: "绝不放弃科研，哪怕竞争激烈，也要留在学术主战场。", effects: {e:-15,m:5,y:0}, track: "tech" } } },
            { text: "导师让你帮他的“关系户”学生代写毕业论文，拒绝可能导致延毕。", choices: { do: { text: "严词拒绝，大不了延期，不能玷污学术尊严。", effects: {e:-20,m:15,y:-10}, track: "freedom" }, reject: { text: "忍气吞声，导师资源决定未来。", effects: {e:-5,m:-25,y:5}, track: "security" } } },
            { text: "为了评职称，你可以选择追逐热点发“水刊”，或死磕冷门重要课题。", choices: { do: { text: "选择冷门课题，学术是马拉松，不为帽子折腰。", effects: {e:-15,m:20,y:-10}, track: "tech" }, reject: { text: "现实一点，先评上职称再说。", effects: {e:-5,m:-15,y:10}, track: "security" } } },
            { text: "你有机会接一个横向课题，赚钱多，但会占用大量科研时间，偏离学术主线。", choices: { do: { text: "接！有了钱才能更好搞科研，这叫以商养学。", effects: {e:-5,m:-5,y:20}, track: "influence" }, reject: { text: "不接，我要保持学术纯粹性，不想变成生意人。", effects: {e:5,m:5,y:-10}, track: "tech" } } }
        ],
        medical: [
            { text: "你成功抢救了一位危重病人，家属跪地感谢。那种从死神手里抢人的成就感无与伦比。", choices: { do: { text: "这就是学医初心，哪怕累死，这一刻也值了。", effects: {e:-10,m:30,y:-5}, track: "service" }, reject: { text: "成就感只是一瞬，身体透支的痛苦是真实的。", effects: {e:10,m:-10,y:0}, track: "security" } } },
            { text: "连轴转30小时，你头晕眼花。来了重症手术，你现在的状态成功率80%；休息4小时再做是95%，但可能错过窗口。", choices: { do: { text: "坚持上台，我是医生，哪怕拼命也要给病人机会。", effects: {e:-35,m:10,y:-5}, track: "service" }, reject: { text: "交班给状态好的同事，承认生理极限。", effects: {e:10,m:-5,y:-5}, track: "security" } } },
            { text: "患者家属跪求用“最好的药”，其实是无效进口安慰剂；有效廉价药会被质疑没尽力。", choices: { do: { text: "坚持用廉价药，花半小时解释，哪怕被投诉。", effects: {e:-20,m:15,y:-5}, track: "tech" }, reject: { text: "顺家属意开进口药，皆大欢喜，避免纠纷。", effects: {e:5,m:-20,y:5}, track: "security" } } },
            { text: "你有一项独创手术技法，可申请专利转化为商业项目，但需花精力跑市场。", choices: { do: { text: "走出这一步，医生也可以是企业家。", effects: {e:-20,m:-5,y:25}, track: "influence" }, reject: { text: "不想分心，医生本职是治病，赚钱太俗。", effects: {e:5,m:5,y:-10}, track: "tech" } } },
            { text: "你发现病历复制粘贴带进了上一位患者姓名，这是严重医疗隐患。", choices: { do: { text: "立即报告科室，主动承认错误并整改。", effects: {e:-25,m:10,y:-10}, track: "tech" }, reject: { text: "悄悄改掉，祈祷没人发现，保住口碑。", effects: {e:-5,m:-15,y:0}, track: "security" } } }
        ]
    },
    
    // 特质分析库
    traits: {
        tech: { name: "技术创造", pros: "拥有不可替代的专业壁垒，是团队的定海神针。", cons: "容易陷入“工具人”陷阱，忽视人际链接和商业价值。" },
        influence: { name: "影响引领", pros: "天生的资源整合者，擅长利用规则、撬动人心。", cons: "若缺乏硬技能支撑，易被认为“光说不练”。" },
        freedom: { name: "自由自主", pros: "强大的自我驱动力，拒绝盲从。", cons: "对规章制度天然排斥，在科层制组织中极其痛苦。" },
        security: { name: "安全稳定", pros: "优秀的执行者，风险意识强，极少犯大错。", cons: "路径依赖严重，面对变革适应慢。" },
        service: { name: "服务贡献", pros: "高情商的链接者，在服务中获极大满足感。", cons: "边界感弱，情绪耗竭风险高。" },
        challenge: { name: "挑战突破", pros: "开疆拓土的先锋，抗压能力极强。", cons: "耐性不足，难以忍受重复性工作。" }
    }
};
