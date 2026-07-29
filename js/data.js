/* 数据层：完整版剧本库 (每个职业8个事件) */
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
        // ================= 程序员 =================
        coder: [
            // 原有5个
            { text: "你攻克了一个困扰团队一个月的技术难题，CEO在全员大会上点名表扬你，并给了你一笔可观的期权。这是技术人的高光时刻。", choices: { do: { text: "享受这份荣耀，并以此为契机要求带独立小组，承担更大压力。", effects: {e:-5,m:20,y:10}, track: "challenge" }, reject: { text: "低调处理，只想安安静静写代码，不想被推到前台卷管理。", effects: {e:10,m:5,y:0}, track: "tech" } } },
            { text: "公司最新架构调整，你有机会转做“技术管理”，工资涨一级，但基本告别代码，主要工作是开会和写PPT。", choices: { do: { text: "接受转型，这是职场上升的必经之路，我不做别人也会做。", effects: {e:-10,m:-5,y:15}, track: "influence" }, reject: { text: "拒绝，我无法忍受失去创造工具的快乐，哪怕升职无望。", effects: {e:5,m:15,y:-5}, track: "tech" } } },
            { text: "一个猎头给你推了一个远程工作机会，薪资少20%，但你可以自由安排时间，甚至去大理旅居。", choices: { do: { text: "立刻辞职，生活不应该只有代码，还有远方。", effects: {e:15,m:15,y:-10}, track: "freedom" }, reject: { text: "太冒险了，现在的环境，保住大厂高薪饭票更重要。", effects: {e:-5,m:-10,y:5}, track: "security" } } },
            { text: "你发现团队里那个代码写得烂的同事，因为和老板关系好，晋升速度比你快。", choices: { do: { text: "我也得学着“懂事”，主动找老板汇报思想，加入政治游戏。", effects: {e:-10,m:-15,y:10}, track: "influence" }, reject: { text: "嗤之以鼻，继续深耕技术。我相信长期看，硬实力才是护城河。", effects: {e:-5,m:10,y:-5}, track: "tech" } } },
            { text: "为了赶进度，底层架构埋下了隐患。修好它需要停服三天，不修也许永远不出事。", choices: { do: { text: "申请停服修复，我是工程师，必须对代码负责。", effects: {e:-20,m:20,y:-10}, track: "tech" }, reject: { text: "加上监控补丁，祈祷在跳槽前别暴雷。", effects: {e:5,m:-30,y:5}, track: "security" } } },
            // 新增3个
            { text: "团队扩张，你负责面试。来了一个技术比你强、但性格傲慢的人；另一个技术平庸但听话。你有投票权。", choices: { do: { text: "投给强者，团队实力第一，哪怕以后他可能顶替我。", effects: {e:-5,m:10,y:-5}, track: "tech" }, reject: { text: "投给听话的，技术可以培养，但我需要一个好相处的队友。", effects: {e:5,m:-10,y:0}, track: "security" } } },
            { text: "你维护的老系统每天报警，业务方却拒绝重构，只让你“修修补补”。你感觉自己在做电子垃圾清理员。", choices: { do: { text: "发起“起义”，写好迁移方案逼业务方表态。", effects: {e:-20,m:15,y:-5}, track: "challenge" }, reject: { text: "领工资而已，别太入戏，修Bug也是一种修行。", effects: {e:-5,m:-20,y:5}, track: "security" } } },
            { text: "上线出了大Bug，其实是产品需求逻辑漏洞，但开会时产品经理暗示是你“执行不到位”。", choices: { do: { text: "当面甩出会议记录和聊天截图，绝不背锅。", effects: {e:5,m:5,y:-5}, track: "influence" }, reject: { text: "算了，技术本身就是兜底的，默默修好算我倒霉。", effects: {e:-10,m:-10,y:5}, track: "service" } } }
        ],

        // ================= 金融民工 =================
        finance: [
            // 原有5个
            { text: "你主控的项目今年给公司赚了上千万，年终奖到账的那一刻，你觉得之前的通宵都值了。", choices: { do: { text: "用这笔钱买个大件奖励自己，明年继续拼，高薪就是正义。", effects: {e:-20,m:-5,y:30}, track: "challenge" }, reject: { text: "看着数字感到空虚，把部分收入捐给公益，寻找内心安宁。", effects: {e:-5,m:15,y:-10}, track: "service" } } },
            { text: "你有机会接触到顶级企业家，听他们讲述商业帝国的逻辑。这种顶层视野让你大开眼界。", choices: { do: { text: "珍惜机会，努力学习他们的思维，梦想成为他们。", effects: {e:-10,m:5,y:5}, track: "influence" }, reject: { text: "保持距离，我只想执行交易，不想被宏大叙事绑架。", effects: {e:5,m:-5,y:0}, track: "security" } } },
            { text: "IPO项目过会前夕，你发现一个小的合规瑕疵。指出它可能导致项目流产，奖金泡汤；忽略它，大概率没人发现。", choices: { do: { text: "必须指出，我不愿在职业生涯里埋下地雷。", effects: {e:-5,m:20,y:-20}, track: "tech" }, reject: { text: "为了团队和奖金，选择忽略。这行都是这么干的。", effects: {e:-10,m:-20,y:15}, track: "security" } } },
            { text: "你发现自己经手的资金流向了房地产泡沫，你的工作本质是把普通人储蓄变成富人游戏。", choices: { do: { text: "申请转岗去做行研，哪怕钱少，也要离创造价值近一点。", effects: {e:-5,m:20,y:-10}, track: "service" }, reject: { text: "别想太多，这就是金融本质，赚钱才是硬道理。", effects: {e:-5,m:-20,y:15}, track: "security" } } },
            { text: "客户亏损严重，打电话骂了你十分钟。你需要安抚情绪，但心里也明白这是市场风险。", choices: { do: { text: "专业安抚，发送详细分析报告，用数据说话。", effects: {e:-20,m:-5,y:10}, track: "service" }, reject: { text: "转接客服部，我不应该直接面对这种情绪垃圾。", effects: {e:5,m:-5,y:-5}, track: "security" } } },
            // 新增3个
            { text: "所里有一个去中后台（风控/运营）的机会，收入腰斩，但从此告别业绩压力，朝九晚五。", choices: { do: { text: "立刻申请，我的健康和生活比钱重要。", effects: {e:15,m:5,y:-15}, track: "freedom" }, reject: { text: "拒绝，我还年轻，不能这么早退休，前台才有暴富机会。", effects: {e:-10,m:-5,y:5}, track: "challenge" } } },
            { text: "你写的一篇看空报告引发了股价大跌，公司高层受到压力，暗示你“以后这种报告少发”。", choices: { do: { text: "坚持发布，分析师的尊严在于独立性。", effects: {e:-10,m:20,y:-10}, track: "tech" }, reject: { text: "识时务者为俊杰，以后只写看多报告，保护饭碗。", effects: {e:5,m:-20,y:10}, track: "security" } } },
            { text: "业务部为了冲业绩，想绕过合规流程做一个高风险产品。你是合规负责人。", choices: { do: { text: "坚决否决，哪怕得罪业务老大，合规是我的底线。", effects: {e:-10,m:10,y:-5}, track: "tech" }, reject: { text: "睁只眼闭只眼，业务活了大家才有奖金拿。", effects: {e:-5,m:-15,y:10}, track: "security" } } }
        ],

        // ================= 央企职员 =================
        soe: [
            // 原有5个
            { text: "单位分房了。虽然地段一般，但这在一线城市意味着省去了几百万房贷压力，家人终于松了口气。", choices: { do: { text: "感恩这份安稳，接受体制内的游戏规则。", effects: {e:-5,m:-10,y:20}, track: "security" }, reject: { text: "房子有了，但感觉这辈子也就这样了，不甘心。", effects: {e:0,m:-5,y:15}, track: "freedom" } } },
            { text: "领导找你谈话，想调你去核心部门当秘书，这通常是升迁快车道，但也是最累的岗位。", choices: { do: { text: "抓住机会，离权力中心越近，机会越多。", effects: {e:-20,m:-5,y:10}, track: "influence" }, reject: { text: "婉拒，我不想把生活全献给工作，清闲挺好。", effects: {e:10,m:5,y:-5}, track: "freedom" } } },
            { text: "你在专业领域发表了高质量论文，有私企想高薪挖你去做技术专家，打破薪资天花板。", choices: { do: { text: "跳槽！体制内天花板太低，我要去市场检验价值。", effects: {e:5,m:10,y:15}, track: "tech" }, reject: { text: "拒绝，外面风浪大，体制内的平台值得留下。", effects: {e:-5,m:-5,y:0}, track: "security" } } },
            { text: "为了应付检查，部门需要编造一份“创新成果”汇报。领导暗示你笔杆子好。", choices: { do: { text: "婉拒，申请去一线干苦差事，也不愿造假。", effects: {e:-10,m:5,y:-5}, track: "freedom" }, reject: { text: "接受任务，写得天花乱坠，大家都在演。", effects: {e:-5,m:-25,y:5}, track: "security" } } },
            { text: "同事是典型的“关系户”，经常把工作推给你。他刚又把麻烦报表扔给你。", choices: { do: { text: "当面拒绝：“我手头也紧，帮不了。”", effects: {e:5,m:5,y:0}, track: "freedom" }, reject: { text: "为了维持和平，帮他把活干了，不想惹事。", effects: {e:-15,m:-10,y:0}, track: "security" } } },
            // 新增3个
            { text: "单位工会组织“红歌合唱比赛”，要求下班排练。你知道这纯属浪费时间，但不去会被通报。", choices: { do: { text: "积极报名，还要领唱，这种表现机会比干活强。", effects: {e:-10,m:-10,y:5}, track: "influence" }, reject: { text: "站在后排装样子，心里骂娘，面子上过得去就行。", effects: {e:-5,m:-5,y:0}, track: "security" } } },
            { text: "集团总部有一个借调名额，去两年能解决职级，但要去偏远分公司，夫妻两地分居。", choices: { do: { text: "为了级别，牺牲两年的家庭团聚是值得的。", effects: {e:-15,m:-10,y:10}, track: "challenge" }, reject: { text: "算了，级别可以等，孩子的童年不能等。", effects: {e:5,m:5,y:-5}, track: "service" } } },
            { text: "年底评优，你和另一个同事票数相同。但他平时给领导开车，你平时在机房干活。", choices: { do: { text: "主动找领导汇报思想，争取把票拉过来。", effects: {e:-5,m:-15,y:5}, track: "influence" }, reject: { text: "随缘，如果领导给我就要，不给拉倒。", effects: {e:0,m:-5,y:0}, track: "security" } } }
        ],

        // ================= 体制内 =================
        civil: [
            // 原有5个
            { text: "你帮一位办事的老人解决了大麻烦，老人握着你的手说：“你是真正为人民服务的好干部。”", choices: { do: { text: "这一刻，我觉得繁文缛节都值了，这就是意义。", effects: {e:5,m:25,y:-5}, track: "service" }, reject: { text: "感动只是一瞬，现实还要面对年底考核压力。", effects: {e:-5,m:0,y:0}, track: "security" } } },
            { text: "上级下达了一个“必须完成”但不合逻辑的指标，强制执行会损害基层利益。", choices: { do: { text: "如实反馈困难，提出修改建议，哪怕被批执行力不强。", effects: {e:-10,m:10,y:-5}, track: "influence" }, reject: { text: "照单全收，压力下传，只要我不背锅。", effects: {e:5,m:-20,y:5}, track: "security" } } },
            { text: "办事大厅来了一位情绪激动的群众，手续不全但跑了大半天。后面排队的人开始抱怨。", choices: { do: { text: "“原则上不行但想办法办”，利用午休帮他补齐。", effects: {e:-15,m:15,y:-5}, track: "service" }, reject: { text: "公事公办，温和拒绝。为了效率，必须牺牲少数人。", effects: {e:5,m:-15,y:5}, track: "security" } } },
            { text: "巡查组来检查，台账资料有缺失。补齐需要造假，不补可能被问责。", choices: { do: { text: "连夜补造，为了集体荣誉，这点形式主义是代价。", effects: {e:-20,m:-15,y:5}, track: "security" }, reject: { text: "实事求是说明情况，不助长这种风气。", effects: {e:5,m:10,y:-10}, track: "freedom" } } },
            { text: "单位有个下乡扶贫的名额，条件艰苦，但回来后提干概率大。", choices: { do: { text: "主动报名，基层履历是未来晋升的关键筹码。", effects: {e:-25,m:5,y:10}, track: "challenge" }, reject: { text: "家里离不开人，还是守在机关里安稳。", effects: {e:5,m:-5,y:0}, track: "security" } } },
            // 新增3个
            { text: "年底互评，同事暗示你给他打“优秀”，他也会给你打“优秀”。这是个利益交换。", choices: { do: { text: "同意，这是机关生存法则，大家好才是真的好。", effects: {e:-5,m:-5,y:5}, track: "influence" }, reject: { text: "凭良心打分，不想搞这种小圈子交易。", effects: {e:5,m:5,y:-5}, track: "tech" } } },
            { text: "领导让你写一份讲话稿，只有一句话的要求：“要有高度，但又要接地气”。这种模糊指示最难写。", choices: { do: { text: "找以前的稿子拼凑，不求有功但求无过。", effects: {e:-5,m:-10,y:0}, track: "security" }, reject: { text: "硬着头皮创新，试图在形式中找出一点新意。", effects: {e:-15,m:10,y:-5}, track: "challenge" } } },
            { text: "科室的临时工把档案搞乱了，按规定应该辞退，但他家里很困难。", choices: { do: { text: "按规矩办事，这种隐患不能留，辞退。", effects: {e:-5,m:-10,y:5}, track: "tech" }, reject: { text: "私下批评一顿，帮他瞒下来，保住他的饭碗。", effects: {e:-5,m:10,y:-5}, track: "service" } } }
        ],

        // ================= 高校青椒 =================
        academic: [
            // 原有5个
            { text: "你收到了一封学生信件，说你的一堂课改变了他的人生观。这种精神富足感是钱买不来的。", choices: { do: { text: "把更多精力投入教学，这才是大学老师的灵魂。", effects: {e:-5,m:20,y:-5}, track: "service" }, reject: { text: "感动归感动，评职称只看论文，还是搞科研。", effects: {e:-10,m:-5,y:5}, track: "security" } } },
            { text: "学校提供了“教学型教授”晋升通道，名额少但竞争小，意味着放弃科研项目。", choices: { do: { text: "走教学路线，我喜欢和学生在一起。", effects: {e:5,m:10,y:-5}, track: "service" }, reject: { text: "绝不放弃科研，哪怕竞争激烈，也要留在学术主战场。", effects: {e:-15,m:5,y:0}, track: "tech" } } },
            { text: "导师让你帮他的“关系户”学生代写毕业论文，拒绝可能导致延毕。", choices: { do: { text: "严词拒绝，大不了延期，不能玷污学术尊严。", effects: {e:-20,m:15,y:-10}, track: "freedom" }, reject: { text: "忍气吞声，导师资源决定未来。", effects: {e:-5,m:-25,y:5}, track: "security" } } },
            { text: "为了评职称，你可以选择追逐热点发“水刊”，或死磕冷门重要课题。", choices: { do: { text: "选择冷门课题，学术是马拉松，不为帽子折腰。", effects: {e:-15,m:20,y:-10}, track: "tech" }, reject: { text: "现实一点，先评上职称再说。", effects: {e:-5,m:-15,y:10}, track: "security" } } },
            { text: "你有机会接一个横向课题，赚钱多，但会占用大量科研时间，偏离学术主线。", choices: { do: { text: "接！有了钱才能更好搞科研，这叫以商养学。", effects: {e:-5,m:-5,y:20}, track: "influence" }, reject: { text: "不接，我要保持学术纯粹性，不想变成生意人。", effects: {e:5,m:5,y:-10}, track: "tech" } } },
            // 新增3个
            { text: "实验室的离心机坏了，需要更换核心零件。可以用科研经费买新的，也可以自己修。", choices: { do: { text: "自己动手修，省下的经费能带学生吃顿好的。", effects: {e:-10,m:5,y:0}, track: "service" }, reject: { text: "直接申请买新的，时间宝贵，别浪费在修机器上。", effects: {e:5,m:-5,y:-5}, track: "tech" } } },
            { text: "一个学生因为论文被毙在办公室哭了一下午，甚至提到了抑郁。", choices: { do: { text: "放下手头工作，陪他聊到晚上，心理干预比论文重要。", effects: {e:-15,m:15,y:-5}, track: "service" }, reject: { text: "通知辅导员来处理，我不仅是导师，更是科研压力的承担者。", effects: {e:5,m:-15,y:5}, track: "security" } } },
            { text: "报账时，财务说发票抬头写错了一个字。重开要一个月，你面临“找票抵扣”的诱惑。", choices: { do: { text: "按规定重新开票，哪怕项目结项延期。", effects: {e:-10,m:10,y:-5}, track: "tech" }, reject: { text: "找张其他发票顶上，大家都这么干，别太死板。", effects: {e:5,m:-15,y:5}, track: "security" } } }
        ],

        // ================= 医务工作者 =================
        medical: [
            // 原有5个
            { text: "你成功抢救了一位危重病人，家属跪地感谢。那种从死神手里抢人的成就感无与伦比。", choices: { do: { text: "这就是学医初心，哪怕累死，这一刻也值了。", effects: {e:-10,m:30,y:-5}, track: "service" }, reject: { text: "成就感只是一瞬，身体透支的痛苦是真实的。", effects: {e:10,m:-10,y:0}, track: "security" } } },
            { text: "连轴转30小时，你头晕眼花。来了重症手术，你现在的状态成功率80%；休息4小时再做是95%，但可能错过窗口。", choices: { do: { text: "坚持上台，我是医生，哪怕拼命也要给病人机会。", effects: {e:-35,m:10,y:-5}, track: "service" }, reject: { text: "交班给状态好的同事，承认生理极限。", effects: {e:10,m:-5,y:-5}, track: "security" } } },
            { text: "患者家属跪求用“最好的药”，其实是无效进口安慰剂；有效廉价药会被质疑没尽力。", choices: { do: { text: "坚持用廉价药，花半小时解释，哪怕被投诉。", effects: {e:-20,m:15,y:-5}, track: "tech" }, reject: { text: "顺家属意开进口药，皆大欢喜，避免纠纷。", effects: {e:5,m:-20,y:5}, track: "security" } } },
            { text: "你有一项独创手术技法，可申请专利转化为商业项目，但需花精力跑市场。", choices: { do: { text: "走出这一步，医生也可以是企业家。", effects: {e:-20,m:-5,y:25}, track: "influence" }, reject: { text: "不想分心，医生本职是治病，赚钱太俗。", effects: {e:5,m:5,y:-10}, track: "tech" } } },
            { text: "你发现病历复制粘贴带进了上一位患者姓名，这是严重医疗隐患。", choices: { do: { text: "立即报告科室，主动承认错误并整改。", effects: {e:-25,m:10,y:-10}, track: "tech" }, reject: { text: "悄悄改掉，祈祷没人发现，保住口碑。", effects: {e:-5,m:-15,y:0}, track: "security" } } },
            // 新增3个
            { text: "科室主任把进修名额给了资历比你浅的“关系户”，你本来最有资格去。", choices: { do: { text: "找主任理论，凭什么牺牲公平？", effects: {e:-10,m:-5,y:-5}, track: "freedom" }, reject: { text: "忍气吞声，在体制内，站队比技术重要。", effects: {e:-5,m:-15,y:5}, track: "security" } } },
            { text: "孩子发烧在家，今晚是你值夜班。老公/老婆打电话来抱怨你不管家。", choices: { do: { text: "跟护士长请假，这次我必须回去，家比工作重要。", effects: {e:5,m:5,y:-10}, track: "freedom" }, reject: { text: "咬牙坚持，穿上白大褂，我就不属于自己。", effects: {e:-20,m:-5,y:5}, track: "service" } } },
            { text: "医药代表塞给你一个信封，说是“讲课费”，金额不低，而你确实周末帮他们做过培训。", choices: { do: { text: "收下，这是知识变现，只要不过分。", effects: {e:-5,m:-5,y:15}, track: "influence" }, reject: { text: "拒收，红线不能碰，万一被拍录像就完了。", effects: {e:5,m:5,y:-5}, track: "security" } } }
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
