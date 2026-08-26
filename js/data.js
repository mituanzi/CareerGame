/* ================= 游戏数据配置（已注入 cog 认知维度标签） ================= */
const GameData = {
    "roles": [
        {
            "id": "coder",
            "icon": "💻",
            "name": "程序员"
        },
        {
            "id": "finance",
            "icon": "💰",
            "name": "金融民工"
        },
        {
            "id": "soe",
            "icon": "🏭",
            "name": "央企职员"
        },
        {
            "id": "civil",
            "icon": "🏛️",
            "name": "体制内"
        },
        {
            "id": "academic",
            "icon": "📚",
            "name": "高校青椒"
        },
        {
            "id": "medical",
            "icon": "⚕️",
            "name": "医务工作者"
        }
    ],
    "universal": [
        {
            "text": "面对一个复杂且模糊的问题时，你通常的反应是？",
            "options": [
                {
                    "text": "试图拆解逻辑，寻找规律和结构。",
                    "effect": {
                        "energy": 0,
                        "meaning": 5,
                        "money": 0
                    },
                    "track": "tech",
                    "cog": {
                        "i": 1,
                        "n": 1,
                        "t": 1
                    }
                },
                {
                    "text": "寻求他人意见，听听专家或朋友怎么说。",
                    "effect": {
                        "energy": 0,
                        "meaning": 0,
                        "money": 0
                    },
                    "track": "influence",
                    "cog": {
                        "e": 1,
                        "f": 1
                    }
                }
            ]
        },
        {
            "text": "如果一份工作能给你极高的社会地位，但需要牺牲大量的个人生活，你会？",
            "options": [
                {
                    "text": "接受，成王败寇，没有付出哪有回报。",
                    "effect": {
                        "energy": -10,
                        "meaning": 0,
                        "money": 10
                    },
                    "track": "challenge",
                    "cog": {
                        "t": 1,
                        "j": 1
                    }
                },
                {
                    "text": "拒绝，工作是为了生活，不能本末倒置。",
                    "effect": {
                        "energy": 10,
                        "meaning": 5,
                        "money": -5
                    },
                    "track": "freedom",
                    "cog": {
                        "i": 1,
                        "f": 1
                    }
                }
            ]
        },
        {
            "text": "在一个团队中，你更倾向于扮演哪种角色？",
            "options": [
                {
                    "text": "那个提出新想法、指明方向的人。",
                    "effect": {
                        "energy": 0,
                        "meaning": 5,
                        "money": 0
                    },
                    "track": "influence",
                    "cog": {
                        "e": 1,
                        "n": 1
                    }
                },
                {
                    "text": "那个负责落地执行、确保不出错的人。",
                    "effect": {
                        "energy": 0,
                        "meaning": 0,
                        "money": 5
                    },
                    "track": "security",
                    "cog": {
                        "s": 1,
                        "j": 1
                    }
                }
            ]
        },
        {
            "text": "面对突如其来的变动，你的心态通常是？",
            "options": [
                {
                    "text": "兴奋，变动意味着新的机会。",
                    "effect": {
                        "energy": 5,
                        "meaning": 5,
                        "money": 0
                    },
                    "track": "freedom",
                    "cog": {
                        "n": 1,
                        "p": 1
                    }
                },
                {
                    "text": "担忧，变动带来不确定性。",
                    "effect": {
                        "energy": -5,
                        "meaning": 0,
                        "money": 0
                    },
                    "track": "security",
                    "cog": {
                        "s": 1,
                        "j": 1
                    }
                }
            ]
        },
        {
            "text": "你更愿意为什么样的成就而感到自豪？",
            "options": [
                {
                    "text": "帮助了具体的人，解决了他们的痛苦。",
                    "effect": {
                        "energy": 0,
                        "meaning": 10,
                        "money": 0
                    },
                    "track": "service",
                    "cog": {
                        "s": 1,
                        "f": 1
                    }
                },
                {
                    "text": "攻克了难题，创造了某种纪录或作品。",
                    "effect": {
                        "energy": 0,
                        "meaning": 10,
                        "money": 0
                    },
                    "track": "tech",
                    "cog": {
                        "n": 1,
                        "t": 1
                    }
                }
            ]
        },
        {
            "text": "在做决定时，你更依赖什么？",
            "options": [
                {
                    "text": "数据和事实，哪怕结论很冷酷。",
                    "effect": {
                        "energy": 0,
                        "meaning": 0,
                        "money": 0
                    },
                    "track": "tech",
                    "cog": {
                        "t": 1,
                        "s": 1
                    }
                },
                {
                    "text": "直觉和人情，要考虑大家的感受。",
                    "effect": {
                        "energy": 0,
                        "meaning": 5,
                        "money": 0
                    },
                    "track": "service",
                    "cog": {
                        "f": 1,
                        "n": 1
                    }
                }
            ]
        },
        {
            "text": "对于“规则”，你的看法是？",
            "options": [
                {
                    "text": "规则就是用来遵守的。",
                    "effect": {
                        "energy": 0,
                        "meaning": 0,
                        "money": 5
                    },
                    "track": "security",
                    "cog": {
                        "j": 1,
                        "s": 1
                    }
                },
                {
                    "text": "规则是用来打破的。",
                    "effect": {
                        "energy": 0,
                        "meaning": 5,
                        "money": 0
                    },
                    "track": "freedom",
                    "cog": {
                        "n": 1,
                        "p": 1
                    }
                }
            ]
        },
        {
            "text": "当看到别人犯错时，你通常会选择？",
            "options": [
                {
                    "text": "直接指出，这对大家都好。",
                    "effect": {
                        "energy": 0,
                        "meaning": 0,
                        "money": 0
                    },
                    "track": "tech",
                    "cog": {
                        "t": 1,
                        "e": 1
                    }
                },
                {
                    "text": "委婉提醒，给对方留面子。",
                    "effect": {
                        "energy": 0,
                        "meaning": 0,
                        "money": 0
                    },
                    "track": "influence",
                    "cog": {
                        "f": 1
                    }
                }
            ]
        },
        {
            "text": "你理想中的周末是？",
            "options": [
                {
                    "text": "彻底躺平，谁也别找我。",
                    "effect": {
                        "energy": 10,
                        "meaning": 0,
                        "money": 0
                    },
                    "track": "security",
                    "cog": {
                        "i": 1
                    }
                },
                {
                    "text": "去尝试没做过的事。",
                    "effect": {
                        "energy": -5,
                        "meaning": 5,
                        "money": 0
                    },
                    "track": "challenge",
                    "cog": {
                        "n": 1,
                        "p": 1
                    }
                }
            ]
        },
        {
            "text": "如果有一笔资金，你会倾向于？",
            "options": [
                {
                    "text": "存起来或买稳健理财。",
                    "effect": {
                        "energy": 0,
                        "meaning": 0,
                        "money": 10
                    },
                    "track": "security",
                    "cog": {
                        "s": 1,
                        "j": 1
                    }
                },
                {
                    "text": "投资自己或创业。",
                    "effect": {
                        "energy": 0,
                        "meaning": 0,
                        "money": -10
                    },
                    "track": "challenge",
                    "cog": {
                        "n": 1,
                        "p": 1
                    }
                }
            ]
        },
        {
            "text": "周一早晨，闹钟响起，你感到一阵强烈的疲惫。",
            "options": [
                {
                    "text": "猛灌一杯咖啡，强行开机。",
                    "effect": {
                        "energy": -5,
                        "money": 0,
                        "meaning": 5
                    },
                    "cog": {
                        "j": 1
                    }
                },
                {
                    "text": "请假一天，给自己放个假。",
                    "effect": {
                        "energy": 20,
                        "money": -50,
                        "meaning": 0
                    },
                    "cog": {
                        "p": 1,
                        "i": 1
                    }
                }
            ]
        },
        {
            "text": "领导在群里问谁愿意接手一个没人要的烂摊子项目。",
            "options": [
                {
                    "text": "主动站出来，刷波存在感。",
                    "effect": {
                        "energy": -15,
                        "meaning": 10,
                        "money": 5
                    },
                    "cog": {
                        "e": 1,
                        "j": 1
                    }
                },
                {
                    "text": "假装没看见，火速潜水。",
                    "effect": {
                        "energy": 5,
                        "meaning": -5,
                        "money": 0
                    },
                    "cog": {
                        "i": 1,
                        "p": 1
                    }
                }
            ]
        },
        {
            "text": "同事邀请你下班去聚餐，但你其实很想回家躺平。",
            "options": [
                {
                    "text": "去社交，维护人际关系。",
                    "effect": {
                        "energy": -10,
                        "meaning": 5,
                        "money": -10
                    },
                    "cog": {
                        "e": 1,
                        "f": 1
                    }
                },
                {
                    "text": "拒绝，回家享受独处时光。",
                    "effect": {
                        "energy": 15,
                        "meaning": 5,
                        "money": 0
                    },
                    "cog": {
                        "i": 1
                    }
                }
            ]
        },
        {
            "text": "下班高峰期，外面下起了暴雨，打车排队要200多位。",
            "options": [
                {
                    "text": "加价呼叫，不管多贵先回家。",
                    "effect": {
                        "energy": 0,
                        "meaning": 0,
                        "money": -30
                    },
                    "cog": {
                        "j": 1
                    }
                },
                {
                    "text": "在工位蹭网加班，等雨停。",
                    "effect": {
                        "energy": -10,
                        "meaning": 0,
                        "money": 0
                    },
                    "cog": {
                        "s": 1,
                        "p": 1
                    }
                }
            ]
        }
    ],
    "scenarios": {
        "coder": [
            {
                "text": "你攻克了一个困扰团队一个月的技术难题，CEO在全员大会上点名表扬你。",
                "options": [
                    {
                        "text": "享受荣耀，要求带独立小组。",
                        "effect": {
                            "energy": -5,
                            "meaning": 20,
                            "money": 10
                        },
                        "track": "challenge",
                        "cog": {
                            "e": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "低调处理，只想安静写代码。",
                        "effect": {
                            "energy": 10,
                            "meaning": 5,
                            "money": 0
                        },
                        "track": "tech",
                        "cog": {
                            "i": 1,
                            "t": 1
                        }
                    }
                ]
            },
            {
                "text": "架构调整，你有机会转做“技术管理”，工资涨一级，但告别代码。",
                "options": [
                    {
                        "text": "接受转型，这是职场上升必经之路。",
                        "effect": {
                            "energy": -10,
                            "meaning": -5,
                            "money": 15
                        },
                        "track": "influence",
                        "cog": {
                            "j": 1,
                            "e": 1
                        }
                    },
                    {
                        "text": "拒绝，无法忍受失去创造的快乐。",
                        "effect": {
                            "energy": 5,
                            "meaning": 15,
                            "money": -5
                        },
                        "track": "tech",
                        "cog": {
                            "n": 1,
                            "i": 1
                        }
                    }
                ]
            },
            {
                "text": "猎头推了一个远程工作机会，薪资少20%，但可旅居。",
                "options": [
                    {
                        "text": "立刻辞职，生活不应只有代码。",
                        "effect": {
                            "energy": 15,
                            "meaning": 15,
                            "money": -10
                        },
                        "track": "freedom",
                        "cog": {
                            "p": 1,
                            "f": 1
                        }
                    },
                    {
                        "text": "太冒险，保住大厂饭票更重要。",
                        "effect": {
                            "energy": -5,
                            "meaning": -10,
                            "money": 5
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "代码写得烂的同事因和老板关系好，晋升比你快。",
                "options": [
                    {
                        "text": "学着“懂事”，加入政治游戏。",
                        "effect": {
                            "energy": -10,
                            "meaning": -15,
                            "money": 10
                        },
                        "track": "influence",
                        "cog": {
                            "e": 1
                        }
                    },
                    {
                        "text": "嗤之以鼻，继续深耕技术。",
                        "effect": {
                            "energy": -5,
                            "meaning": 10,
                            "money": -5
                        },
                        "track": "tech",
                        "cog": {
                            "i": 1,
                            "t": 1
                        }
                    }
                ]
            },
            {
                "text": "底层架构埋下隐患，修好需停服三天，不修也许不出事。",
                "options": [
                    {
                        "text": "申请停服修复，对代码负责。",
                        "effect": {
                            "energy": -20,
                            "meaning": 20,
                            "money": -10
                        },
                        "track": "tech",
                        "cog": {
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "加补丁，祈祷跳槽前别暴雷。",
                        "effect": {
                            "energy": 5,
                            "meaning": -30,
                            "money": 5
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "p": 1
                        }
                    }
                ]
            },
            {
                "text": "面试时，一个技术强但傲慢，一个平庸但听话，你投谁？",
                "options": [
                    {
                        "text": "投给强者，团队实力第一。",
                        "effect": {
                            "energy": -5,
                            "meaning": 10,
                            "money": -5
                        },
                        "track": "tech",
                        "cog": {
                            "t": 1
                        }
                    },
                    {
                        "text": "投给听话的，技术可以培养。",
                        "effect": {
                            "energy": 5,
                            "meaning": -10,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "老系统每天报警，业务方拒绝重构，你感觉在做垃圾清理员。",
                "options": [
                    {
                        "text": "发起“起义”，逼业务方表态。",
                        "effect": {
                            "energy": -20,
                            "meaning": 15,
                            "money": -5
                        },
                        "track": "challenge",
                        "cog": {
                            "e": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "领工资而已，别太入戏。",
                        "effect": {
                            "energy": -5,
                            "meaning": -20,
                            "money": 5
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "p": 1
                        }
                    }
                ]
            },
            {
                "text": "上线Bug是产品逻辑漏洞，但产品经理暗示是你执行不到位。",
                "options": [
                    {
                        "text": "甩出记录，绝不背锅。",
                        "effect": {
                            "energy": 5,
                            "meaning": 5,
                            "money": -5
                        },
                        "track": "influence",
                        "cog": {
                            "t": 1,
                            "e": 1
                        }
                    },
                    {
                        "text": "算了，技术本质是兜底。",
                        "effect": {
                            "energy": -10,
                            "meaning": -10,
                            "money": 5
                        },
                        "track": "service",
                        "cog": {
                            "f": 1
                        }
                    }
                ]
            },
            {
                "text": "产品经理突然加需求，下周上线AI大模型功能。",
                "options": [
                    {
                        "text": "怒怼：做不了！",
                        "effect": {
                            "energy": -5,
                            "meaning": 10,
                            "money": -10
                        },
                        "cog": {
                            "t": 1
                        }
                    },
                    {
                        "text": "接下，复制粘贴开源代码。",
                        "effect": {
                            "energy": -15,
                            "meaning": -10,
                            "money": 20
                        },
                        "cog": {
                            "s": 1,
                            "p": 1
                        }
                    }
                ]
            },
            {
                "text": "凌晨2点代码跑通，你在注释里看到了前人留下的脏话。",
                "options": [
                    {
                        "text": "加上自己的脏话提交。",
                        "effect": {
                            "energy": -10,
                            "meaning": -5,
                            "money": 10
                        },
                        "cog": {
                            "p": 1
                        }
                    },
                    {
                        "text": "重构代码，让它像个艺术品。",
                        "effect": {
                            "energy": -20,
                            "meaning": 20,
                            "money": 0
                        },
                        "track": "craftsman",
                        "cog": {
                            "n": 1,
                            "t": 1
                        }
                    }
                ]
            },
            {
                "text": "你发现团队使用了有严重漏洞的开源库。",
                "options": [
                    {
                        "text": "默默修好并提交Patch。",
                        "effect": {
                            "energy": -10,
                            "meaning": 15,
                            "money": 0
                        },
                        "track": "tech",
                        "cog": {
                            "t": 1,
                            "i": 1
                        }
                    },
                    {
                        "text": "提个Issue，然后不管了。",
                        "effect": {
                            "energy": 0,
                            "meaning": 0,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "p": 1
                        }
                    }
                ]
            },
            {
                "text": "公司号召“技术下沉”业务，让你去一线轮岗三个月。",
                "options": [
                    {
                        "text": "拒绝，我就在工位写代码。",
                        "effect": {
                            "energy": 5,
                            "meaning": -5,
                            "money": -5
                        },
                        "track": "tech",
                        "cog": {
                            "i": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "去轮岗，了解一下业务也不错。",
                        "effect": {
                            "energy": -15,
                            "meaning": 5,
                            "money": 5
                        },
                        "track": "influence",
                        "cog": {
                            "e": 1,
                            "n": 1
                        }
                    }
                ]
            }
        ],
        "finance": [
            {
                "text": "主控项目赚了上千万，年终奖到账，你觉得通宵值了。",
                "options": [
                    {
                        "text": "买大件奖励自己，明年继续拼。",
                        "effect": {
                            "energy": -20,
                            "meaning": -5,
                            "money": 30
                        },
                        "track": "challenge",
                        "cog": {
                            "j": 1
                        }
                    },
                    {
                        "text": "把钱捐公益，寻找内心安宁。",
                        "effect": {
                            "energy": -5,
                            "meaning": 15,
                            "money": -10
                        },
                        "track": "service",
                        "cog": {
                            "f": 1
                        }
                    }
                ]
            },
            {
                "text": "有机会接触顶级企业家，听他们讲商业帝国逻辑。",
                "options": [
                    {
                        "text": "珍惜机会，梦想成为他们。",
                        "effect": {
                            "energy": -10,
                            "meaning": 5,
                            "money": 5
                        },
                        "track": "influence",
                        "cog": {
                            "n": 1
                        }
                    },
                    {
                        "text": "保持距离，只想执行交易。",
                        "effect": {
                            "energy": 5,
                            "meaning": -5,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "IPO过会前夕，发现小合规瑕疵，指出可能项目流产。",
                "options": [
                    {
                        "text": "必须指出，不愿埋地雷。",
                        "effect": {
                            "energy": -5,
                            "meaning": 20,
                            "money": -20
                        },
                        "track": "tech",
                        "cog": {
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "为了奖金忽略，这行都这样。",
                        "effect": {
                            "energy": -10,
                            "meaning": -20,
                            "money": 15
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "p": 1
                        }
                    }
                ]
            },
            {
                "text": "发现经手资金流向房地产泡沫，工作本质是把储蓄变富人游戏。",
                "options": [
                    {
                        "text": "转岗做行研，离创造价值近点。",
                        "effect": {
                            "energy": -5,
                            "meaning": 20,
                            "money": -10
                        },
                        "track": "service",
                        "cog": {
                            "n": 1,
                            "f": 1
                        }
                    },
                    {
                        "text": "别想太多，赚钱是硬道理。",
                        "effect": {
                            "energy": -5,
                            "meaning": -20,
                            "money": 15
                        },
                        "track": "security",
                        "cog": {
                            "s": 1
                        }
                    }
                ]
            },
            {
                "text": "客户亏损严重，骂了你十分钟。",
                "options": [
                    {
                        "text": "专业安抚，用数据说话。",
                        "effect": {
                            "energy": -20,
                            "meaning": -5,
                            "money": 10
                        },
                        "track": "service",
                        "cog": {
                            "t": 1,
                            "f": 1
                        }
                    },
                    {
                        "text": "转接客服，不面对情绪垃圾。",
                        "effect": {
                            "energy": 5,
                            "meaning": -5,
                            "money": -5
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "i": 1
                        }
                    }
                ]
            },
            {
                "text": "有去中后台机会，收入腰斩，但告别业绩压力。",
                "options": [
                    {
                        "text": "申请，健康比钱重要。",
                        "effect": {
                            "energy": 15,
                            "meaning": 5,
                            "money": -15
                        },
                        "track": "freedom",
                        "cog": {
                            "f": 1
                        }
                    },
                    {
                        "text": "拒绝，前台才有暴富机会。",
                        "effect": {
                            "energy": -10,
                            "meaning": -5,
                            "money": 5
                        },
                        "track": "challenge",
                        "cog": {
                            "s": 1
                        }
                    }
                ]
            },
            {
                "text": "看空报告引发股价大跌，高层暗示少发这种。",
                "options": [
                    {
                        "text": "坚持发布，尊严在于独立。",
                        "effect": {
                            "energy": -10,
                            "meaning": 20,
                            "money": -10
                        },
                        "track": "tech",
                        "cog": {
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "以后只写看多，保饭碗。",
                        "effect": {
                            "energy": 5,
                            "meaning": -20,
                            "money": 10
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "p": 1
                        }
                    }
                ]
            },
            {
                "text": "业务部想绕过合规做高风险产品。",
                "options": [
                    {
                        "text": "坚决否决，合规是底线。",
                        "effect": {
                            "energy": -10,
                            "meaning": 10,
                            "money": -5
                        },
                        "track": "tech",
                        "cog": {
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "睁只眼闭只眼，大家才有奖金。",
                        "effect": {
                            "energy": -5,
                            "meaning": -15,
                            "money": 10
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "f": 1
                        }
                    }
                ]
            },
            {
                "text": "美股熔断，客户疯狂打电话。",
                "options": [
                    {
                        "text": "专业安抚：技术性调整。",
                        "effect": {
                            "energy": -5,
                            "meaning": -5,
                            "money": 20
                        },
                        "cog": {
                            "t": 1
                        }
                    },
                    {
                        "text": "老实承认：我也慌。",
                        "effect": {
                            "energy": -10,
                            "meaning": 10,
                            "money": -20
                        },
                        "cog": {
                            "f": 1,
                            "i": 1
                        }
                    }
                ]
            },
            {
                "text": "有一个内幕消息，胜率很高但违规。",
                "options": [
                    {
                        "text": "坚决不碰，红线不能踩。",
                        "effect": {
                            "energy": 0,
                            "meaning": 10,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "小仓位试一下，没人会查。",
                        "effect": {
                            "energy": -10,
                            "meaning": -20,
                            "money": 30
                        },
                        "track": "challenge",
                        "cog": {
                            "p": 1
                        }
                    }
                ]
            },
            {
                "text": "领导让你去陪大客户喝酒，你酒精过敏。",
                "options": [
                    {
                        "text": "为了单子，硬喝。",
                        "effect": {
                            "energy": -20,
                            "meaning": -10,
                            "money": 20
                        },
                        "track": "challenge",
                        "cog": {
                            "e": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "以茶代酒，真诚沟通。",
                        "effect": {
                            "energy": -5,
                            "meaning": 5,
                            "money": -5
                        },
                        "track": "influence",
                        "cog": {
                            "f": 1,
                            "e": 1
                        }
                    }
                ]
            },
            {
                "text": "做尽调时发现目标公司财务造假。",
                "options": [
                    {
                        "text": "如实写在报告里。",
                        "effect": {
                            "energy": -5,
                            "meaning": 15,
                            "money": -10
                        },
                        "track": "tech",
                        "cog": {
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "暗示对方整改，否则不投。",
                        "effect": {
                            "energy": -5,
                            "meaning": -5,
                            "money": 0
                        },
                        "track": "influence",
                        "cog": {
                            "f": 1,
                            "e": 1
                        }
                    }
                ]
            }
        ],
        "soe": [
            {
                "text": "单位分房了，虽然地段一般，但省了几百万房贷。",
                "options": [
                    {
                        "text": "感恩安稳，接受规则。",
                        "effect": {
                            "energy": -5,
                            "meaning": -10,
                            "money": 20
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "不甘心，这辈子就这样了？",
                        "effect": {
                            "energy": 0,
                            "meaning": -5,
                            "money": 15
                        },
                        "track": "freedom",
                        "cog": {
                            "n": 1
                        }
                    }
                ]
            },
            {
                "text": "领导调你去核心部门当秘书，升迁快但最累。",
                "options": [
                    {
                        "text": "抓住机会，离权力中心近。",
                        "effect": {
                            "energy": -20,
                            "meaning": -5,
                            "money": 10
                        },
                        "track": "influence",
                        "cog": {
                            "e": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "婉拒，不想把生活献给工作。",
                        "effect": {
                            "energy": 10,
                            "meaning": 5,
                            "money": -5
                        },
                        "track": "freedom",
                        "cog": {
                            "i": 1,
                            "f": 1
                        }
                    }
                ]
            },
            {
                "text": "发表高质量论文，私企想高薪挖你。",
                "options": [
                    {
                        "text": "跳槽！去市场检验价值。",
                        "effect": {
                            "energy": 5,
                            "meaning": 10,
                            "money": 15
                        },
                        "track": "tech",
                        "cog": {
                            "n": 1
                        }
                    },
                    {
                        "text": "拒绝，外面风浪大。",
                        "effect": {
                            "energy": -5,
                            "meaning": -5,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "s": 1
                        }
                    }
                ]
            },
            {
                "text": "部门需编造“创新成果”汇报，领导暗示你写。",
                "options": [
                    {
                        "text": "婉拒，去一线干苦差事。",
                        "effect": {
                            "energy": -10,
                            "meaning": 5,
                            "money": -5
                        },
                        "track": "freedom",
                        "cog": {
                            "t": 1
                        }
                    },
                    {
                        "text": "接受，写得天花乱坠。",
                        "effect": {
                            "energy": -5,
                            "meaning": -25,
                            "money": 5
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "f": 1
                        }
                    }
                ]
            },
            {
                "text": "“关系户”同事把麻烦报表扔给你。",
                "options": [
                    {
                        "text": "当面拒绝。",
                        "effect": {
                            "energy": 5,
                            "meaning": 5,
                            "money": 0
                        },
                        "track": "freedom",
                        "cog": {
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "帮他干了，不想惹事。",
                        "effect": {
                            "energy": -15,
                            "meaning": -10,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "f": 1,
                            "s": 1
                        }
                    }
                ]
            },
            {
                "text": "工会组织红歌合唱，强制参加。",
                "options": [
                    {
                        "text": "积极报名领唱。",
                        "effect": {
                            "energy": -10,
                            "meaning": -10,
                            "money": 5
                        },
                        "track": "influence",
                        "cog": {
                            "e": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "后排装样子。",
                        "effect": {
                            "energy": -5,
                            "meaning": -5,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "i": 1,
                            "p": 1
                        }
                    }
                ]
            },
            {
                "text": "总部借调名额，去两年解决职级，但需两地分居。",
                "options": [
                    {
                        "text": "为了级别牺牲家庭。",
                        "effect": {
                            "energy": -15,
                            "meaning": -10,
                            "money": 10
                        },
                        "track": "challenge",
                        "cog": {
                            "j": 1
                        }
                    },
                    {
                        "text": "算了，孩子童年不能等。",
                        "effect": {
                            "energy": 5,
                            "meaning": 5,
                            "money": -5
                        },
                        "track": "service",
                        "cog": {
                            "f": 1
                        }
                    }
                ]
            },
            {
                "text": "年底评优，你和给领导开车的同事票数相同。",
                "options": [
                    {
                        "text": "找领导汇报思想。",
                        "effect": {
                            "energy": -5,
                            "meaning": -15,
                            "money": 5
                        },
                        "track": "influence",
                        "cog": {
                            "e": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "随缘，不给拉倒。",
                        "effect": {
                            "energy": 0,
                            "meaning": -5,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "p": 1
                        }
                    }
                ]
            },
            {
                "text": "单位组织“岗位练兵”，其实就是考试，排名全系统通报。",
                "options": [
                    {
                        "text": "通宵复习，必须考第一。",
                        "effect": {
                            "energy": -20,
                            "meaning": -5,
                            "money": 5
                        },
                        "track": "challenge",
                        "cog": {
                            "j": 1
                        }
                    },
                    {
                        "text": "裸考，考成啥样算啥样。",
                        "effect": {
                            "energy": 5,
                            "meaning": 0,
                            "money": 0
                        },
                        "track": "freedom",
                        "cog": {
                            "p": 1
                        }
                    }
                ]
            },
            {
                "text": "食堂今天有很难抢的红烧肉。",
                "options": [
                    {
                        "text": "提前溜号去排队。",
                        "effect": {
                            "energy": 5,
                            "meaning": 0,
                            "money": 0
                        },
                        "cog": {
                            "s": 1
                        }
                    },
                    {
                        "text": "老实等到点吃剩的。",
                        "effect": {
                            "energy": 0,
                            "meaning": -5,
                            "money": 0
                        },
                        "cog": {
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "有亲戚想让你帮走后门办业务。",
                "options": [
                    {
                        "text": "严词拒绝，违反原则。",
                        "effect": {
                            "energy": 0,
                            "meaning": 15,
                            "money": -5
                        },
                        "track": "tech",
                        "cog": {
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "悄悄帮了，都是亲戚。",
                        "effect": {
                            "energy": -5,
                            "meaning": -10,
                            "money": 0
                        },
                        "track": "influence",
                        "cog": {
                            "f": 1
                        }
                    }
                ]
            },
            {
                "text": "上级视察，部门让你负责接待摆盘。",
                "options": [
                    {
                        "text": "做得尽善尽美，连水果缝隙都对齐。",
                        "effect": {
                            "energy": -5,
                            "meaning": -5,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "随便摆摆，意思一下。",
                        "effect": {
                            "energy": 0,
                            "meaning": 0,
                            "money": 0
                        },
                        "track": "freedom",
                        "cog": {
                            "p": 1
                        }
                    }
                ]
            }
        ],
        "civil": [
            {
                "text": "帮办事老人解决麻烦，他说你是好干部。",
                "options": [
                    {
                        "text": "觉得繁文缛节都值了。",
                        "effect": {
                            "energy": 5,
                            "meaning": 25,
                            "money": -5
                        },
                        "track": "service",
                        "cog": {
                            "f": 1
                        }
                    },
                    {
                        "text": "感动一瞬，还要面对考核。",
                        "effect": {
                            "energy": -5,
                            "meaning": 0,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "上级下达不合逻辑指标，强制执行损害基层利益。",
                "options": [
                    {
                        "text": "如实反馈困难。",
                        "effect": {
                            "energy": -10,
                            "meaning": 10,
                            "money": -5
                        },
                        "track": "influence",
                        "cog": {
                            "t": 1
                        }
                    },
                    {
                        "text": "照单全收，压力下传。",
                        "effect": {
                            "energy": 5,
                            "meaning": -20,
                            "money": 5
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "大厅群众情绪激动，手续不全但跑大半天。",
                "options": [
                    {
                        "text": "利用午休帮他补齐。",
                        "effect": {
                            "energy": -15,
                            "meaning": 15,
                            "money": -5
                        },
                        "track": "service",
                        "cog": {
                            "f": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "公事公办，温和拒绝。",
                        "effect": {
                            "energy": 5,
                            "meaning": -15,
                            "money": 5
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "t": 1
                        }
                    }
                ]
            },
            {
                "text": "巡查组检查，台账缺失，补齐需造假。",
                "options": [
                    {
                        "text": "连夜补造，为了荣誉。",
                        "effect": {
                            "energy": -20,
                            "meaning": -15,
                            "money": 5
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "实事求是，不助长风气。",
                        "effect": {
                            "energy": 5,
                            "meaning": 10,
                            "money": -10
                        },
                        "track": "freedom",
                        "cog": {
                            "t": 1,
                            "i": 1
                        }
                    }
                ]
            },
            {
                "text": "有下乡扶贫名额，条件苦但提干概率大。",
                "options": [
                    {
                        "text": "报名，履历关键。",
                        "effect": {
                            "energy": -25,
                            "meaning": 5,
                            "money": 10
                        },
                        "track": "challenge",
                        "cog": {
                            "j": 1
                        }
                    },
                    {
                        "text": "守在机关安稳。",
                        "effect": {
                            "energy": 5,
                            "meaning": -5,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "s": 1
                        }
                    }
                ]
            },
            {
                "text": "同事互评暗示交换“优秀”。",
                "options": [
                    {
                        "text": "同意，生存法则。",
                        "effect": {
                            "energy": -5,
                            "meaning": -5,
                            "money": 5
                        },
                        "track": "influence",
                        "cog": {
                            "f": 1,
                            "e": 1
                        }
                    },
                    {
                        "text": "凭良心打分。",
                        "effect": {
                            "energy": 5,
                            "meaning": 5,
                            "money": -5
                        },
                        "track": "tech",
                        "cog": {
                            "t": 1
                        }
                    }
                ]
            },
            {
                "text": "写讲话稿，要求“有高度又接地气”。",
                "options": [
                    {
                        "text": "拼凑以前稿子。",
                        "effect": {
                            "energy": -5,
                            "meaning": -10,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "p": 1
                        }
                    },
                    {
                        "text": "硬着头皮创新。",
                        "effect": {
                            "energy": -15,
                            "meaning": 10,
                            "money": -5
                        },
                        "track": "challenge",
                        "cog": {
                            "n": 1
                        }
                    }
                ]
            },
            {
                "text": "临时工搞乱档案，按规定辞退但他家困难。",
                "options": [
                    {
                        "text": "辞退，隐患不能留。",
                        "effect": {
                            "energy": -5,
                            "meaning": -10,
                            "money": 5
                        },
                        "track": "tech",
                        "cog": {
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "私下批评，帮他瞒下。",
                        "effect": {
                            "energy": -5,
                            "meaning": 10,
                            "money": -5
                        },
                        "track": "service",
                        "cog": {
                            "f": 1
                        }
                    }
                ]
            },
            {
                "text": "领导让你帮他接孩子放学。",
                "options": [
                    {
                        "text": "去接，这是拉近关系好机会。",
                        "effect": {
                            "energy": -10,
                            "meaning": -10,
                            "money": 5
                        },
                        "track": "influence",
                        "cog": {
                            "e": 1,
                            "f": 1
                        }
                    },
                    {
                        "text": "借口工作忙推脱。",
                        "effect": {
                            "energy": 0,
                            "meaning": 5,
                            "money": -5
                        },
                        "track": "freedom",
                        "cog": {
                            "i": 1
                        }
                    }
                ]
            },
            {
                "text": "单位搞“数字化改革”，系统做得很难用。",
                "options": [
                    {
                        "text": "认真学习怎么用，还要教别人。",
                        "effect": {
                            "energy": -10,
                            "meaning": 0,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "吐槽几句，尽量避开不用。",
                        "effect": {
                            "energy": 0,
                            "meaning": 5,
                            "money": 0
                        },
                        "track": "freedom",
                        "cog": {
                            "p": 1
                        }
                    }
                ]
            },
            {
                "text": "隔壁科室大姐推销保险。",
                "options": [
                    {
                        "text": "买一份，以后好办事。",
                        "effect": {
                            "energy": 0,
                            "meaning": -5,
                            "money": -20
                        },
                        "track": "influence",
                        "cog": {
                            "f": 1,
                            "e": 1
                        }
                    },
                    {
                        "text": "坚决不买，死活不要。",
                        "effect": {
                            "energy": -5,
                            "meaning": 5,
                            "money": 0
                        },
                        "track": "freedom",
                        "cog": {
                            "t": 1,
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "窗口服务遇到难缠的人，录像威胁投诉。",
                "options": [
                    {
                        "text": "态度更温和，叫领导来处理。",
                        "effect": {
                            "energy": -15,
                            "meaning": 0,
                            "money": 0
                        },
                        "track": "service",
                        "cog": {
                            "f": 1,
                            "e": 1
                        }
                    },
                    {
                        "text": "停止服务，叫保安。",
                        "effect": {
                            "energy": 5,
                            "meaning": -10,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "j": 1
                        }
                    }
                ]
            }
        ],
        "academic": [
            {
                "text": "收到学生信件，说你的课改变了他人生观。",
                "options": [
                    {
                        "text": "投入更多精力教学。",
                        "effect": {
                            "energy": -5,
                            "meaning": 20,
                            "money": -5
                        },
                        "track": "service",
                        "cog": {
                            "f": 1
                        }
                    },
                    {
                        "text": "感动归感动，评职称看论文。",
                        "effect": {
                            "energy": -10,
                            "meaning": -5,
                            "money": 5
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "有“教学型教授”晋升通道，放弃科研。",
                "options": [
                    {
                        "text": "走教学路线，喜欢和学生在一起。",
                        "effect": {
                            "energy": 5,
                            "meaning": 10,
                            "money": -5
                        },
                        "track": "service",
                        "cog": {
                            "f": 1
                        }
                    },
                    {
                        "text": "不放弃科研，留主战场。",
                        "effect": {
                            "energy": -15,
                            "meaning": 5,
                            "money": 0
                        },
                        "track": "tech",
                        "cog": {
                            "n": 1,
                            "t": 1
                        }
                    }
                ]
            },
            {
                "text": "导师让你帮“关系户”代写毕业论文。",
                "options": [
                    {
                        "text": "严词拒绝，大不了延期。",
                        "effect": {
                            "energy": -20,
                            "meaning": 15,
                            "money": -10
                        },
                        "track": "freedom",
                        "cog": {
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "忍气吞声，导师决定未来。",
                        "effect": {
                            "energy": -5,
                            "meaning": -25,
                            "money": 5
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "f": 1
                        }
                    }
                ]
            },
            {
                "text": "评职称可选择发“水刊”或死磕冷门课题。",
                "options": [
                    {
                        "text": "选冷门课题，不为帽子折腰。",
                        "effect": {
                            "energy": -15,
                            "meaning": 20,
                            "money": -10
                        },
                        "track": "tech",
                        "cog": {
                            "n": 1,
                            "t": 1
                        }
                    },
                    {
                        "text": "现实点，先评上职称。",
                        "effect": {
                            "energy": -5,
                            "meaning": -15,
                            "money": 10
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "接横向课题赚钱多，但偏离学术主线。",
                "options": [
                    {
                        "text": "接！有钱才能搞科研。",
                        "effect": {
                            "energy": -5,
                            "meaning": -5,
                            "money": 20
                        },
                        "track": "influence",
                        "cog": {
                            "e": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "不接，保持学术纯粹。",
                        "effect": {
                            "energy": 5,
                            "meaning": 5,
                            "money": -10
                        },
                        "track": "tech",
                        "cog": {
                            "i": 1,
                            "n": 1
                        }
                    }
                ]
            },
            {
                "text": "离心机坏了，可用经费买新的，也可自己修。",
                "options": [
                    {
                        "text": "自己修，省钱带学生吃顿好的。",
                        "effect": {
                            "energy": -10,
                            "meaning": 5,
                            "money": 0
                        },
                        "track": "service",
                        "cog": {
                            "s": 1,
                            "f": 1
                        }
                    },
                    {
                        "text": "买新的，时间宝贵。",
                        "effect": {
                            "energy": 5,
                            "meaning": -5,
                            "money": -5
                        },
                        "track": "tech",
                        "cog": {
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "学生论文被毙，在办公室哭一下午。",
                "options": [
                    {
                        "text": "陪他聊，心理干预比论文重要。",
                        "effect": {
                            "energy": -15,
                            "meaning": 15,
                            "money": -5
                        },
                        "track": "service",
                        "cog": {
                            "f": 1
                        }
                    },
                    {
                        "text": "通知辅导员处理。",
                        "effect": {
                            "energy": 5,
                            "meaning": -15,
                            "money": 5
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "发票抬头写错，面临“找票抵扣”诱惑。",
                "options": [
                    {
                        "text": "按规定重新开票。",
                        "effect": {
                            "energy": -10,
                            "meaning": 10,
                            "money": -5
                        },
                        "track": "tech",
                        "cog": {
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "找其他发票顶上。",
                        "effect": {
                            "energy": 5,
                            "meaning": -15,
                            "money": 5
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "p": 1
                        }
                    }
                ]
            },
            {
                "text": "学院让你兼任行政职务（如班主任/秘书）。",
                "options": [
                    {
                        "text": "拒绝，只想搞学术。",
                        "effect": {
                            "energy": 5,
                            "meaning": 5,
                            "money": -5
                        },
                        "track": "freedom",
                        "cog": {
                            "i": 1,
                            "n": 1
                        }
                    },
                    {
                        "text": "接受，晋升需要行政履历。",
                        "effect": {
                            "energy": -10,
                            "meaning": -5,
                            "money": 5
                        },
                        "track": "influence",
                        "cog": {
                            "e": 1,
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "有人质疑你的观点，并在学术会议上公开抨击。",
                "options": [
                    {
                        "text": "有理有据地回击。",
                        "effect": {
                            "energy": -10,
                            "meaning": 10,
                            "money": 0
                        },
                        "track": "tech",
                        "cog": {
                            "t": 1,
                            "e": 1
                        }
                    },
                    {
                        "text": "保持微笑，会后私下沟通。",
                        "effect": {
                            "energy": -5,
                            "meaning": 0,
                            "money": 0
                        },
                        "track": "influence",
                        "cog": {
                            "f": 1,
                            "i": 1
                        }
                    }
                ]
            },
            {
                "text": "学生想让你帮忙介绍对象。",
                "options": [
                    {
                        "text": "帮他留意身边合适的人。",
                        "effect": {
                            "energy": -5,
                            "meaning": 5,
                            "money": 0
                        },
                        "track": "service",
                        "cog": {
                            "f": 1,
                            "e": 1
                        }
                    },
                    {
                        "text": "拒绝，这不是导师职责。",
                        "effect": {
                            "energy": 0,
                            "meaning": 0,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "t": 1,
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "申请到了国外访学机会，但孩子刚上幼儿园。",
                "options": [
                    {
                        "text": "放弃机会，陪孩子成长。",
                        "effect": {
                            "energy": 5,
                            "meaning": 10,
                            "money": -5
                        },
                        "track": "service",
                        "cog": {
                            "f": 1
                        }
                    },
                    {
                        "text": "全家一起去，或者两地分居一年。",
                        "effect": {
                            "energy": -15,
                            "meaning": 5,
                            "money": 5
                        },
                        "track": "challenge",
                        "cog": {
                            "n": 1,
                            "j": 1
                        }
                    }
                ]
            }
        ],
        "medical": [
            {
                "text": "成功抢救危重病人，家属跪地感谢。",
                "options": [
                    {
                        "text": "哪怕累死也值了。",
                        "effect": {
                            "energy": -10,
                            "meaning": 30,
                            "money": -5
                        },
                        "track": "service",
                        "cog": {
                            "f": 1
                        }
                    },
                    {
                        "text": "成就感一瞬，透支痛苦是真实的。",
                        "effect": {
                            "energy": 10,
                            "meaning": -10,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "s": 1
                        }
                    }
                ]
            },
            {
                "text": "连轴转30小时，重症手术成功率80%，休息后95%。",
                "options": [
                    {
                        "text": "坚持上台，给病人机会。",
                        "effect": {
                            "energy": -35,
                            "meaning": 10,
                            "money": -5
                        },
                        "track": "service",
                        "cog": {
                            "f": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "交班给同事，承认极限。",
                        "effect": {
                            "energy": 10,
                            "meaning": -5,
                            "money": -5
                        },
                        "track": "security",
                        "cog": {
                            "t": 1,
                            "i": 1
                        }
                    }
                ]
            },
            {
                "text": "家属跪求用无效进口药，有效廉价药被质疑。",
                "options": [
                    {
                        "text": "坚持廉价药，解释清楚。",
                        "effect": {
                            "energy": -20,
                            "meaning": 15,
                            "money": -5
                        },
                        "track": "tech",
                        "cog": {
                            "t": 1
                        }
                    },
                    {
                        "text": "顺家属意，避免纠纷。",
                        "effect": {
                            "energy": 5,
                            "meaning": -20,
                            "money": 5
                        },
                        "track": "security",
                        "cog": {
                            "f": 1,
                            "s": 1
                        }
                    }
                ]
            },
            {
                "text": "独创手术技法，可申请专利跑市场。",
                "options": [
                    {
                        "text": "走出这一步，医生也可做企业家。",
                        "effect": {
                            "energy": -20,
                            "meaning": -5,
                            "money": 25
                        },
                        "track": "influence",
                        "cog": {
                            "e": 1,
                            "n": 1
                        }
                    },
                    {
                        "text": "不分心，治病是本职。",
                        "effect": {
                            "energy": 5,
                            "meaning": 5,
                            "money": -10
                        },
                        "track": "tech",
                        "cog": {
                            "i": 1,
                            "t": 1
                        }
                    }
                ]
            },
            {
                "text": "病历复制粘贴带进上一位患者姓名。",
                "options": [
                    {
                        "text": "报告科室，承认错误整改。",
                        "effect": {
                            "energy": -25,
                            "meaning": 10,
                            "money": -10
                        },
                        "track": "tech",
                        "cog": {
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "悄悄改掉，祈祷没人发现。",
                        "effect": {
                            "energy": -5,
                            "meaning": -15,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "p": 1
                        }
                    }
                ]
            },
            {
                "text": "进修名额给了“关系户”，你最有资格。",
                "options": [
                    {
                        "text": "找主任理论。",
                        "effect": {
                            "energy": -10,
                            "meaning": -5,
                            "money": -5
                        },
                        "track": "freedom",
                        "cog": {
                            "t": 1,
                            "e": 1
                        }
                    },
                    {
                        "text": "忍气吞声，站队重要。",
                        "effect": {
                            "energy": -5,
                            "meaning": -15,
                            "money": 5
                        },
                        "track": "security",
                        "cog": {
                            "f": 1,
                            "s": 1
                        }
                    }
                ]
            },
            {
                "text": "孩子发烧，今晚夜班，家人抱怨。",
                "options": [
                    {
                        "text": "请假回家，家比工作重要。",
                        "effect": {
                            "energy": 5,
                            "meaning": 5,
                            "money": -10
                        },
                        "track": "freedom",
                        "cog": {
                            "f": 1,
                            "i": 1
                        }
                    },
                    {
                        "text": "咬牙坚持，穿白大褂不属于自己。",
                        "effect": {
                            "energy": -20,
                            "meaning": -5,
                            "money": 5
                        },
                        "track": "service",
                        "cog": {
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "药代塞信封，说是讲课费，金额不低。",
                "options": [
                    {
                        "text": "收下，知识变现。",
                        "effect": {
                            "energy": -5,
                            "meaning": -5,
                            "money": 15
                        },
                        "track": "influence",
                        "cog": {
                            "e": 1,
                            "f": 1
                        }
                    },
                    {
                        "text": "拒收，红线不能碰。",
                        "effect": {
                            "energy": 5,
                            "meaning": 5,
                            "money": -5
                        },
                        "track": "security",
                        "cog": {
                            "t": 1,
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "患者治好了，但没钱付医药费。",
                "options": [
                    {
                        "text": "帮他想办法申请救助。",
                        "effect": {
                            "energy": -10,
                            "meaning": 15,
                            "money": 0
                        },
                        "track": "service",
                        "cog": {
                            "f": 1
                        }
                    },
                    {
                        "text": "那是社保和财务的事，我不管。",
                        "effect": {
                            "energy": 0,
                            "meaning": 0,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "i": 1
                        }
                    }
                ]
            },
            {
                "text": "科室任务重，想辞职去私立医院，钱多事少。",
                "options": [
                    {
                        "text": "走，身体是自己的。",
                        "effect": {
                            "energy": 15,
                            "meaning": -5,
                            "money": 20
                        },
                        "track": "freedom",
                        "cog": {
                            "f": 1
                        }
                    },
                    {
                        "text": "公立平台大，再坚持一下。",
                        "effect": {
                            "energy": -5,
                            "meaning": 0,
                            "money": -5
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "值班室条件太差，没有洗澡水。",
                "options": [
                    {
                        "text": "忍了，忙起来没空洗澡。",
                        "effect": {
                            "energy": -5,
                            "meaning": 0,
                            "money": 0
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "自己买简易洗澡装备。",
                        "effect": {
                            "energy": 5,
                            "meaning": 0,
                            "money": -5
                        },
                        "track": "tech",
                        "cog": {
                            "j": 1
                        }
                    }
                ]
            },
            {
                "text": "有患者家属送锦旗，同时也送了购物卡。",
                "options": [
                    {
                        "text": "收锦旗，退购物卡。",
                        "effect": {
                            "energy": 0,
                            "meaning": 15,
                            "money": 0
                        },
                        "track": "service",
                        "cog": {
                            "f": 1,
                            "t": 1
                        }
                    },
                    {
                        "text": "都收了，这也是心意。",
                        "effect": {
                            "energy": -5,
                            "meaning": -10,
                            "money": 10
                        },
                        "track": "security",
                        "cog": {
                            "s": 1,
                            "f": 1
                        }
                    }
                ]
            }
        ]
    },
    "traits": {
        "tech": {
            "name": "技术创造",
            "pros": "拥有不可替代的专业壁垒。",
            "cons": "容易陷入“工具人”陷阱。"
        },
        "influence": {
            "name": "影响引领",
            "pros": "天生资源整合者。",
            "cons": "易被认为“光说不练”。"
        },
        "freedom": {
            "name": "自由自主",
            "pros": "强大自我驱动力。",
            "cons": "对规章制度天然排斥。"
        },
        "security": {
            "name": "安全稳定",
            "pros": "优秀执行者，极少犯错。",
            "cons": "路径依赖严重。"
        },
        "service": {
            "name": "服务贡献",
            "pros": "高情商链接者。",
            "cons": "边界感弱，情绪耗竭风险高。"
        },
        "challenge": {
            "name": "挑战突破",
            "pros": "抗压能力极强。",
            "cons": "难以忍受重复工作。"
        }
    }
};
