/* ================= 游戏数据配置（v8：赛道由答题推导，不再由开局选择决定） ================= */
const GameData = {
    "professions": [
        {
            "id": "coder",
            "name": "工程师",
            "icon": "💻",
            "tagline": "把东西造出来，并且让它真的跑起来",
            "profile": {
                "tech": 1.0,
                "freedom": 0.7,
                "challenge": 0.3,
                "influence": 0.1,
                "service": 0.1,
                "security": 0.0
            }
        },
        {
            "id": "finance",
            "name": "金融与商业",
            "icon": "📈",
            "tagline": "在高压和高回报里换话语权",
            "profile": {
                "challenge": 1.0,
                "influence": 0.8,
                "freedom": 0.3,
                "tech": 0.2,
                "service": 0.0,
                "security": 0.0
            }
        },
        {
            "id": "soe",
            "name": "央企国企",
            "icon": "🏭",
            "tagline": "大体系里的确定性和长周期项目",
            "profile": {
                "security": 1.0,
                "tech": 0.4,
                "service": 0.4,
                "influence": 0.3,
                "challenge": 0.1,
                "freedom": 0.0
            }
        },
        {
            "id": "civil",
            "name": "体制内",
            "icon": "🏛️",
            "tagline": "把事办成，也把秩序守住",
            "profile": {
                "security": 1.0,
                "service": 0.6,
                "influence": 0.5,
                "tech": 0.1,
                "challenge": 0.0,
                "freedom": 0.1
            }
        },
        {
            "id": "academic",
            "name": "高校与科研",
            "icon": "📚",
            "tagline": "围绕一个真问题，长期地挖下去",
            "profile": {
                "tech": 0.8,
                "freedom": 0.6,
                "challenge": 0.4,
                "service": 0.3,
                "influence": 0.2,
                "security": 0.1
            }
        },
        {
            "id": "medical",
            "name": "医疗与公共卫生",
            "icon": "⚕️",
            "tagline": "在别人的关键时刻，被需要",
            "profile": {
                "service": 1.0,
                "tech": 0.5,
                "security": 0.4,
                "challenge": 0.3,
                "influence": 0.1,
                "freedom": 0.0
            }
        }
    ],
    "painPoints": [
        {
            "id": "money",
            "icon": "💰",
            "name": "钱不到位",
            "desc": "付出和回报明显不匹配，看不到涨上去的路径",
            "read": "money"
        },
        {
            "id": "meaning",
            "icon": "🧭",
            "name": "不知道图什么",
            "desc": "事情做得还行，但感受不到它跟我有关系",
            "read": "meaning"
        },
        {
            "id": "burnout",
            "icon": "🔋",
            "name": "身体先撑不住",
            "desc": "长期疲惫，睡眠和情绪都在报警",
            "read": "energy"
        },
        {
            "id": "growth",
            "icon": "🧗",
            "name": "没有成长空间",
            "desc": "一眼望得到头，很久没学到新东西了",
            "read": "coherence"
        }
    ],
    "universal": [
        {
            "id": "u01",
            "text": "完全自由的一整天，没有任何安排，你最可能做什么？",
            "instrument": true,
            "options": [
                {
                    "text": "找个项目动手做——修东西、写代码、做模型、搞烹饪，总之手不能停。",
                    "effect": {
                        "energy": 5,
                        "meaning": 5,
                        "money": 0
                    },
                    "passion": {
                        "maker": 2
                    },
                    "cog": {
                        "i": 1,
                        "s": 1
                    }
                },
                {
                    "text": "钻进一个感兴趣的话题——纪录片、论文、维基百科兔子洞，越查越兴奋。",
                    "effect": {
                        "energy": 5,
                        "meaning": 5,
                        "money": 0
                    },
                    "passion": {
                        "explorer": 2
                    },
                    "cog": {
                        "i": 1,
                        "n": 1
                    }
                },
                {
                    "text": "约朋友深聊，或者去认识新的人。",
                    "effect": {
                        "energy": 0,
                        "meaning": 5,
                        "money": 0
                    },
                    "passion": {
                        "connector": 2
                    },
                    "cog": {
                        "e": 1,
                        "f": 1
                    }
                },
                {
                    "text": "准备某个表达——写文章、拍视频、做播客，把想法分享出去。",
                    "effect": {
                        "energy": -5,
                        "meaning": 10,
                        "money": 0
                    },
                    "passion": {
                        "performer": 2
                    },
                    "cog": {
                        "e": 1,
                        "n": 1
                    }
                }
            ]
        },
        {
            "id": "u02",
            "text": "朋友圈里，谁的状态最让你心里“咯噔”一下？",
            "instrument": true,
            "options": [
                {
                    "text": "那个做出了爆款产品/作品的人。",
                    "effect": {
                        "energy": 0,
                        "meaning": 5,
                        "money": 0
                    },
                    "passion": {
                        "maker": 1,
                        "performer": 1
                    },
                    "cog": {
                        "n": 1
                    }
                },
                {
                    "text": "那个活成了自己样子、完全不被世俗绑架的人。",
                    "effect": {
                        "energy": 5,
                        "meaning": 5,
                        "money": -5
                    },
                    "track": "freedom",
                    "passion": {
                        "explorer": 2
                    },
                    "cog": {
                        "i": 1,
                        "p": 1
                    }
                },
                {
                    "text": "那个被很多人认可、站在聚光灯下的人。",
                    "effect": {
                        "energy": 0,
                        "meaning": 5,
                        "money": 0
                    },
                    "track": "influence",
                    "passion": {
                        "performer": 2
                    },
                    "cog": {
                        "e": 1
                    }
                },
                {
                    "text": "那个身边围满了人、关系特别好的。",
                    "effect": {
                        "energy": 0,
                        "meaning": 5,
                        "money": 0
                    },
                    "passion": {
                        "connector": 2
                    },
                    "cog": {
                        "e": 1,
                        "f": 1
                    }
                }
            ]
        },
        {
            "id": "u03",
            "text": "上一次完全忘记时间、连手机都没看，是在做什么？",
            "instrument": true,
            "options": [
                {
                    "text": "在创造某个东西——写代码/做PPT/写文章/做手工/画画。",
                    "effect": {
                        "energy": 5,
                        "meaning": 10,
                        "money": 0
                    },
                    "passion": {
                        "maker": 2
                    },
                    "cog": {
                        "i": 1,
                        "n": 1
                    }
                },
                {
                    "text": "在研究某个问题——越复杂越上头，搞懂了特别爽。",
                    "effect": {
                        "energy": 5,
                        "meaning": 10,
                        "money": 0
                    },
                    "passion": {
                        "explorer": 2
                    },
                    "cog": {
                        "i": 1,
                        "t": 1
                    }
                },
                {
                    "text": "在跟某个人深聊——帮他想通了什么事，或者一起碰撞出了火花。",
                    "effect": {
                        "energy": 0,
                        "meaning": 10,
                        "money": 0
                    },
                    "passion": {
                        "connector": 2
                    },
                    "cog": {
                        "e": 1,
                        "f": 1
                    }
                },
                {
                    "text": "在准备某个表达——演讲稿/视频/文章，反复打磨想让它更好。",
                    "effect": {
                        "energy": -5,
                        "meaning": 10,
                        "money": 0
                    },
                    "passion": {
                        "performer": 2
                    },
                    "cog": {
                        "n": 1,
                        "j": 1
                    }
                }
            ]
        },
        {
            "id": "u04",
            "text": "小时候（10 岁以前），你最沉迷的事最接近哪个？",
            "instrument": true,
            "options": [
                {
                    "text": "搭积木/拆玩具/画画/做各种“小发明”。",
                    "effect": {
                        "energy": 5,
                        "meaning": 5,
                        "money": 0
                    },
                    "passion": {
                        "maker": 2
                    },
                    "cog": {
                        "i": 1,
                        "s": 1
                    }
                },
                {
                    "text": "问“为什么”/看百科全书/收集标本或卡片。",
                    "effect": {
                        "energy": 5,
                        "meaning": 5,
                        "money": 0
                    },
                    "passion": {
                        "explorer": 2
                    },
                    "cog": {
                        "i": 1,
                        "n": 1
                    }
                },
                {
                    "text": "过家家/当孩子王/照顾小动物/当小组长。",
                    "effect": {
                        "energy": 0,
                        "meaning": 5,
                        "money": 0
                    },
                    "passion": {
                        "connector": 1,
                        "performer": 1
                    },
                    "cog": {
                        "e": 1,
                        "f": 1
                    }
                },
                {
                    "text": "表演节目/讲故事/在台上发言/组织活动。",
                    "effect": {
                        "energy": 0,
                        "meaning": 5,
                        "money": 0
                    },
                    "passion": {
                        "performer": 2
                    },
                    "cog": {
                        "e": 1,
                        "n": 1
                    }
                }
            ]
        },
        {
            "id": "u05",
            "text": "每种工作都有恶心的部分，你最不能忍受哪个？",
            "instrument": true,
            "options": [
                {
                    "text": "每天重复同样的事，没有任何创造空间。",
                    "effect": {
                        "energy": -5,
                        "meaning": -5,
                        "money": 0
                    },
                    "track": "freedom",
                    "passion": {
                        "maker": 1
                    },
                    "cog": {
                        "n": 1,
                        "p": 1
                    }
                },
                {
                    "text": "永远在表面，不被允许深入了解。",
                    "effect": {
                        "energy": -5,
                        "meaning": -5,
                        "money": 0
                    },
                    "track": "tech",
                    "passion": {
                        "explorer": 1
                    },
                    "cog": {
                        "i": 1,
                        "t": 1
                    }
                },
                {
                    "text": "完全不跟人接触，一个人对着屏幕一整天。",
                    "effect": {
                        "energy": -5,
                        "meaning": -5,
                        "money": 0
                    },
                    "track": "service",
                    "passion": {
                        "connector": 1
                    },
                    "cog": {
                        "e": 1,
                        "f": 1
                    }
                },
                {
                    "text": "做了很多但没人知道、没有反馈。",
                    "effect": {
                        "energy": -5,
                        "meaning": -5,
                        "money": 0
                    },
                    "track": "influence",
                    "passion": {
                        "performer": 1
                    },
                    "cog": {
                        "e": 1
                    }
                }
            ]
        },
        {
            "id": "u06",
            "text": "刷手机时，你更倾向于？",
            "instrument": true,
            "options": [
                {
                    "text": "自己产出——写点什么、拍点什么、做个小工具。",
                    "effect": {
                        "energy": 0,
                        "meaning": 5,
                        "money": 0
                    },
                    "passion": {
                        "maker": 1,
                        "performer": 1
                    },
                    "cog": {
                        "n": 1,
                        "i": 1
                    }
                },
                {
                    "text": "研究学习——看深度内容、学新东西、做笔记。",
                    "effect": {
                        "energy": 5,
                        "meaning": 5,
                        "money": 0
                    },
                    "passion": {
                        "explorer": 2
                    },
                    "cog": {
                        "i": 1,
                        "n": 1
                    }
                },
                {
                    "text": "社交连接——回消息、约人、在群里聊天。",
                    "effect": {
                        "energy": 0,
                        "meaning": 0,
                        "money": 0
                    },
                    "passion": {
                        "connector": 2
                    },
                    "cog": {
                        "e": 1,
                        "f": 1
                    }
                },
                {
                    "text": "纯放松——刷视频、看剧、什么都不想。",
                    "effect": {
                        "energy": 10,
                        "meaning": 0,
                        "money": 0
                    },
                    "cog": {
                        "s": 1,
                        "p": 1
                    }
                }
            ]
        },
        {
            "id": "u07",
            "text": "如果你和朋友们一起做一个项目（旅行/创业/公益都算），你最自然地会成为？",
            "instrument": true,
            "options": [
                {
                    "text": "那个把想法变成现实的人——做攻略/搭框架/出成品。",
                    "effect": {
                        "energy": -5,
                        "meaning": 10,
                        "money": 0
                    },
                    "passion": {
                        "maker": 2
                    },
                    "cog": {
                        "i": 1,
                        "j": 1
                    }
                },
                {
                    "text": "那个研究最深的人——把每个细节搞明白，给大家讲明白。",
                    "effect": {
                        "energy": -5,
                        "meaning": 10,
                        "money": 0
                    },
                    "passion": {
                        "explorer": 1,
                        "performer": 1
                    },
                    "cog": {
                        "i": 1,
                        "n": 1
                    }
                },
                {
                    "text": "那个把大家黏在一起的人——协调分工、照顾情绪、解决冲突。",
                    "effect": {
                        "energy": -5,
                        "meaning": 5,
                        "money": 0
                    },
                    "passion": {
                        "connector": 2
                    },
                    "cog": {
                        "e": 1,
                        "f": 1
                    }
                },
                {
                    "text": "那个对外代表团队的人——展示成果、讲故事、拉资源。",
                    "effect": {
                        "energy": -5,
                        "meaning": 5,
                        "money": 0
                    },
                    "passion": {
                        "performer": 2
                    },
                    "cog": {
                        "e": 1,
                        "n": 1
                    }
                }
            ]
        },
        {
            "id": "u08",
            "text": "以下哪个场景最能让你感到“活着”？",
            "instrument": true,
            "options": [
                {
                    "text": "看着一个东西从无到有在自己手里诞生。",
                    "effect": {
                        "energy": 10,
                        "meaning": 10,
                        "money": 0
                    },
                    "passion": {
                        "maker": 2
                    },
                    "cog": {
                        "i": 1,
                        "s": 1
                    }
                },
                {
                    "text": "突然搞懂了一个困扰你很久的复杂问题。",
                    "effect": {
                        "energy": 10,
                        "meaning": 10,
                        "money": 0
                    },
                    "passion": {
                        "explorer": 2
                    },
                    "cog": {
                        "i": 1,
                        "t": 1
                    }
                },
                {
                    "text": "有人跟你说“因为你，我决定改变了”。",
                    "effect": {
                        "energy": 5,
                        "meaning": 15,
                        "money": 0
                    },
                    "passion": {
                        "connector": 2
                    },
                    "cog": {
                        "e": 1,
                        "f": 1
                    }
                },
                {
                    "text": "台下/屏幕前的人因为你的表达而产生共鸣。",
                    "effect": {
                        "energy": 0,
                        "meaning": 15,
                        "money": 0
                    },
                    "passion": {
                        "performer": 2
                    },
                    "cog": {
                        "e": 1,
                        "n": 1
                    }
                }
            ]
        },
        {
            "id": "u09",
            "text": "如果最终人们只记得你一件事，你希望是？",
            "instrument": true,
            "options": [
                {
                    "text": "他创造了一些了不起的东西。",
                    "effect": {
                        "energy": 0,
                        "meaning": 15,
                        "money": 0
                    },
                    "passion": {
                        "maker": 2
                    },
                    "cog": {
                        "i": 1,
                        "n": 1
                    }
                },
                {
                    "text": "他搞明白了别人没搞明白的东西。",
                    "effect": {
                        "energy": 0,
                        "meaning": 15,
                        "money": 0
                    },
                    "passion": {
                        "explorer": 2
                    },
                    "cog": {
                        "i": 1,
                        "t": 1
                    }
                },
                {
                    "text": "他改变了很多人的生命。",
                    "effect": {
                        "energy": 0,
                        "meaning": 15,
                        "money": 0
                    },
                    "track": "service",
                    "passion": {
                        "connector": 2
                    },
                    "cog": {
                        "e": 1,
                        "f": 1
                    }
                },
                {
                    "text": "他的表达影响了整整一代人。",
                    "effect": {
                        "energy": 0,
                        "meaning": 15,
                        "money": 0
                    },
                    "track": "influence",
                    "passion": {
                        "performer": 2
                    },
                    "cog": {
                        "e": 1,
                        "n": 1
                    }
                }
            ]
        },
        {
            "id": "u10",
            "text": "即使一分钱不赚、没人知道，你仍然会做的是什么？",
            "instrument": true,
            "options": [
                {
                    "text": "做东西——写代码/做手工/写文章/画画，创造本身就是回报。",
                    "effect": {
                        "energy": 5,
                        "meaning": 10,
                        "money": 0
                    },
                    "passion": {
                        "maker": 2
                    },
                    "cog": {
                        "i": 1,
                        "n": 1
                    }
                },
                {
                    "text": "研究问题——搞清楚世界怎么运转，纯粹的好奇。",
                    "effect": {
                        "energy": 5,
                        "meaning": 10,
                        "money": 0
                    },
                    "passion": {
                        "explorer": 2
                    },
                    "cog": {
                        "i": 1,
                        "t": 1
                    }
                },
                {
                    "text": "帮助身边的人——陪他们度过难关，看他们变好。",
                    "effect": {
                        "energy": 0,
                        "meaning": 10,
                        "money": 0
                    },
                    "track": "service",
                    "passion": {
                        "connector": 2
                    },
                    "cog": {
                        "e": 1,
                        "f": 1
                    }
                },
                {
                    "text": "表达和记录——写下想法、拍视频、做播客，不管有没有人看。",
                    "effect": {
                        "energy": 0,
                        "meaning": 10,
                        "money": 0
                    },
                    "passion": {
                        "performer": 2
                    },
                    "cog": {
                        "i": 1,
                        "n": 1
                    }
                }
            ]
        },
        {
            "id": "u11",
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
                    "passion": {
                        "explorer": 1,
                        "maker": 1
                    },
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
                    "passion": {
                        "connector": 1
                    },
                    "cog": {
                        "e": 1,
                        "f": 1
                    }
                }
            ]
        },
        {
            "id": "u12",
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
                    "passion": {
                        "performer": 1
                    },
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
                    "passion": {
                        "explorer": 1
                    },
                    "cog": {
                        "i": 1,
                        "f": 1
                    }
                }
            ]
        },
        {
            "id": "u13",
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
                    "passion": {
                        "performer": 1,
                        "explorer": 1
                    },
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
                    "passion": {
                        "maker": 1
                    },
                    "cog": {
                        "s": 1,
                        "j": 1
                    }
                }
            ]
        },
        {
            "id": "u14",
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
                    "passion": {
                        "explorer": 1
                    },
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
            "id": "u15",
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
                    "passion": {
                        "connector": 2
                    },
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
                    "passion": {
                        "maker": 1,
                        "explorer": 1
                    },
                    "cog": {
                        "n": 1,
                        "t": 1
                    }
                }
            ]
        },
        {
            "id": "u16",
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
                    "passion": {
                        "explorer": 1
                    },
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
                    "passion": {
                        "connector": 1
                    },
                    "cog": {
                        "f": 1,
                        "n": 1
                    }
                }
            ]
        },
        {
            "id": "u17",
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
                    "passion": {
                        "explorer": 1
                    },
                    "cog": {
                        "n": 1,
                        "p": 1
                    }
                }
            ]
        },
        {
            "id": "u18",
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
                    "passion": {
                        "performer": 1
                    },
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
                    "passion": {
                        "connector": 1
                    },
                    "cog": {
                        "f": 1
                    }
                }
            ]
        },
        {
            "id": "u19",
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
                    "passion": {
                        "explorer": 1
                    },
                    "cog": {
                        "n": 1,
                        "p": 1
                    }
                }
            ]
        },
        {
            "id": "u20",
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
                    "passion": {
                        "explorer": 1
                    },
                    "cog": {
                        "n": 1,
                        "p": 1
                    }
                }
            ]
        },
        {
            "id": "u21",
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
            "id": "u22",
            "text": "领导在群里问谁愿意接手一个没人要的烂摊子项目。",
            "options": [
                {
                    "text": "主动站出来，刷波存在感。",
                    "effect": {
                        "energy": -15,
                        "meaning": 10,
                        "money": 5
                    },
                    "passion": {
                        "performer": 1,
                        "connector": 1
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
            "id": "u23",
            "text": "同事邀请你下班去聚餐，但你其实很想回家躺平。",
            "options": [
                {
                    "text": "去社交，维护人际关系。",
                    "effect": {
                        "energy": -10,
                        "meaning": 5,
                        "money": -10
                    },
                    "passion": {
                        "connector": 1
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
            "id": "u24",
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
                "id": "coder01",
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
                        "passion": {
                            "performer": 1
                        },
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
                        "passion": {
                            "maker": 1
                        },
                        "cog": {
                            "i": 1,
                            "t": 1
                        }
                    }
                ]
            },
            {
                "id": "coder02",
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
                        "passion": {
                            "performer": 1
                        },
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
                        "passion": {
                            "maker": 2
                        },
                        "cog": {
                            "n": 1,
                            "i": 1
                        }
                    }
                ]
            },
            {
                "id": "coder03",
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
                        "passion": {
                            "explorer": 1
                        },
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
                "id": "coder04",
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
                        "passion": {
                            "performer": 1
                        },
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
                        "passion": {
                            "maker": 1
                        },
                        "cog": {
                            "i": 1,
                            "t": 1
                        }
                    }
                ]
            },
            {
                "id": "coder05",
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
                        "passion": {
                            "maker": 1,
                            "explorer": 1
                        },
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
                "id": "coder06",
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
                        "passion": {
                            "explorer": 1
                        },
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
                "id": "coder07",
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
                        "passion": {
                            "performer": 1
                        },
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
                "id": "coder08",
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
                        "passion": {
                            "performer": 1
                        },
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
                        "passion": {
                            "connector": 1
                        },
                        "cog": {
                            "f": 1
                        }
                    }
                ]
            },
            {
                "id": "coder09",
                "text": "产品经理突然加需求，下周上线AI大模型功能。",
                "options": [
                    {
                        "text": "怒怼：做不了！",
                        "effect": {
                            "energy": -5,
                            "meaning": 10,
                            "money": -10
                        },
                        "passion": {
                            "maker": 1
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
                "id": "coder10",
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
                        "passion": {
                            "maker": 2
                        },
                        "cog": {
                            "n": 1,
                            "t": 1
                        }
                    }
                ]
            },
            {
                "id": "coder11",
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
                        "passion": {
                            "maker": 1
                        },
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
                "id": "coder12",
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
                        "passion": {
                            "maker": 1
                        },
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
                        "passion": {
                            "explorer": 1
                        },
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
                "id": "finance01",
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
                        "passion": {
                            "performer": 1
                        },
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
                        "passion": {
                            "connector": 1
                        },
                        "cog": {
                            "f": 1
                        }
                    }
                ]
            },
            {
                "id": "finance02",
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
                        "passion": {
                            "performer": 1
                        },
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
                "id": "finance03",
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
                        "passion": {
                            "explorer": 1
                        },
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
                "id": "finance04",
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
                        "passion": {
                            "explorer": 1,
                            "connector": 1
                        },
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
                "id": "finance05",
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
                        "passion": {
                            "connector": 1
                        },
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
                "id": "finance06",
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
                        "passion": {
                            "explorer": 1
                        },
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
                        "passion": {
                            "performer": 1
                        },
                        "cog": {
                            "s": 1
                        }
                    }
                ]
            },
            {
                "id": "finance07",
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
                        "passion": {
                            "explorer": 1
                        },
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
                "id": "finance08",
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
                        "passion": {
                            "explorer": 1
                        },
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
                "id": "finance09",
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
                        "passion": {
                            "connector": 1
                        },
                        "cog": {
                            "f": 1,
                            "i": 1
                        }
                    }
                ]
            },
            {
                "id": "finance10",
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
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "p": 1
                        }
                    }
                ]
            },
            {
                "id": "finance11",
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
                        "passion": {
                            "performer": 1
                        },
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
                        "passion": {
                            "connector": 1
                        },
                        "cog": {
                            "f": 1,
                            "e": 1
                        }
                    }
                ]
            },
            {
                "id": "finance12",
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
                        "passion": {
                            "explorer": 1
                        },
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
                        "passion": {
                            "connector": 1,
                            "performer": 1
                        },
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
                "id": "soe01",
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
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "n": 1
                        }
                    }
                ]
            },
            {
                "id": "soe02",
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
                        "passion": {
                            "performer": 1
                        },
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
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "i": 1,
                            "f": 1
                        }
                    }
                ]
            },
            {
                "id": "soe03",
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
                        "passion": {
                            "explorer": 1
                        },
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
                "id": "soe04",
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
                        "passion": {
                            "maker": 1
                        },
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
                "id": "soe05",
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
                        "passion": {
                            "performer": 1
                        },
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
                        "passion": {
                            "connector": 1
                        },
                        "cog": {
                            "f": 1,
                            "s": 1
                        }
                    }
                ]
            },
            {
                "id": "soe06",
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
                        "passion": {
                            "performer": 1
                        },
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
                "id": "soe07",
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
                        "passion": {
                            "performer": 1
                        },
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
                        "passion": {
                            "connector": 1
                        },
                        "cog": {
                            "f": 1
                        }
                    }
                ]
            },
            {
                "id": "soe08",
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
                        "passion": {
                            "performer": 1
                        },
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
                "id": "soe09",
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
                "id": "soe10",
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
                "id": "soe11",
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
                        "passion": {
                            "connector": 1
                        },
                        "cog": {
                            "f": 1
                        }
                    }
                ]
            },
            {
                "id": "soe12",
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
                        "passion": {
                            "maker": 1
                        },
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
                "id": "civil01",
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
                        "passion": {
                            "connector": 1
                        },
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
                "id": "civil02",
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
                        "passion": {
                            "performer": 1
                        },
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
                "id": "civil03",
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
                        "passion": {
                            "connector": 2
                        },
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
                "id": "civil04",
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
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "t": 1,
                            "i": 1
                        }
                    }
                ]
            },
            {
                "id": "civil05",
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
                        "passion": {
                            "performer": 1
                        },
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
                "id": "civil06",
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
                        "passion": {
                            "connector": 1
                        },
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
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "t": 1
                        }
                    }
                ]
            },
            {
                "id": "civil07",
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
                        "passion": {
                            "maker": 1
                        },
                        "cog": {
                            "n": 1
                        }
                    }
                ]
            },
            {
                "id": "civil08",
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
                        "passion": {
                            "connector": 1
                        },
                        "cog": {
                            "f": 1
                        }
                    }
                ]
            },
            {
                "id": "civil09",
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
                        "passion": {
                            "connector": 1,
                            "performer": 1
                        },
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
                "id": "civil10",
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
                "id": "civil11",
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
                        "passion": {
                            "connector": 1
                        },
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
                "id": "civil12",
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
                        "passion": {
                            "connector": 1
                        },
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
                "id": "academic01",
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
                        "passion": {
                            "connector": 2
                        },
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
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "s": 1,
                            "j": 1
                        }
                    }
                ]
            },
            {
                "id": "academic02",
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
                        "passion": {
                            "connector": 2
                        },
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
                        "passion": {
                            "explorer": 1,
                            "maker": 1
                        },
                        "cog": {
                            "n": 1,
                            "t": 1
                        }
                    }
                ]
            },
            {
                "id": "academic03",
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
                        "passion": {
                            "maker": 1
                        },
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
                "id": "academic04",
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
                        "passion": {
                            "explorer": 2
                        },
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
                "id": "academic05",
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
                        "passion": {
                            "performer": 1
                        },
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
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "i": 1,
                            "n": 1
                        }
                    }
                ]
            },
            {
                "id": "academic06",
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
                        "passion": {
                            "maker": 1,
                            "connector": 1
                        },
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
                "id": "academic07",
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
                        "passion": {
                            "connector": 2
                        },
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
                "id": "academic08",
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
                        "passion": {
                            "maker": 1
                        },
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
                "id": "academic09",
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
                        "passion": {
                            "explorer": 1
                        },
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
                        "passion": {
                            "performer": 1
                        },
                        "cog": {
                            "e": 1,
                            "j": 1
                        }
                    }
                ]
            },
            {
                "id": "academic10",
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
                        "passion": {
                            "explorer": 1,
                            "performer": 1
                        },
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
                        "passion": {
                            "connector": 1
                        },
                        "cog": {
                            "f": 1,
                            "i": 1
                        }
                    }
                ]
            },
            {
                "id": "academic11",
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
                        "passion": {
                            "connector": 2
                        },
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
                "id": "academic12",
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
                        "passion": {
                            "connector": 1
                        },
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
                        "passion": {
                            "explorer": 1
                        },
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
                "id": "medical01",
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
                        "passion": {
                            "connector": 1
                        },
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
                "id": "medical02",
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
                        "passion": {
                            "connector": 1
                        },
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
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "t": 1,
                            "i": 1
                        }
                    }
                ]
            },
            {
                "id": "medical03",
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
                        "passion": {
                            "explorer": 1
                        },
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
                        "passion": {
                            "connector": 1
                        },
                        "cog": {
                            "f": 1,
                            "s": 1
                        }
                    }
                ]
            },
            {
                "id": "medical04",
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
                        "passion": {
                            "performer": 1,
                            "maker": 1
                        },
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
                        "passion": {
                            "maker": 1
                        },
                        "cog": {
                            "i": 1,
                            "t": 1
                        }
                    }
                ]
            },
            {
                "id": "medical05",
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
                        "passion": {
                            "maker": 1
                        },
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
                "id": "medical06",
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
                        "passion": {
                            "performer": 1
                        },
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
                        "passion": {
                            "connector": 1
                        },
                        "cog": {
                            "f": 1,
                            "s": 1
                        }
                    }
                ]
            },
            {
                "id": "medical07",
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
                        "passion": {
                            "connector": 1
                        },
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
                "id": "medical08",
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
                        "passion": {
                            "performer": 1
                        },
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
                "id": "medical09",
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
                        "passion": {
                            "connector": 2
                        },
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
                "id": "medical10",
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
                        "passion": {
                            "explorer": 1
                        },
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
                "id": "medical11",
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
                        "passion": {
                            "maker": 1
                        },
                        "cog": {
                            "j": 1
                        }
                    }
                ]
            },
            {
                "id": "medical12",
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
                        "passion": {
                            "connector": 1
                        },
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
    "student": [
        {
            "id": "stu01",
            "text": "选课。一门公认水、给分高、简历好看；一门出了名的难，但你确实想搞懂它。",
            "options": [
                {
                    "text": "选水课。GPA 是硬通货，别的都是虚的。",
                    "effect": {
                        "energy": 5,
                        "meaning": -10,
                        "money": 10
                    },
                    "track": "security",
                    "cog": {
                        "s": 1,
                        "j": 1
                    }
                },
                {
                    "text": "选难课。GPA 少零点几无所谓，我想知道自己啃不啃得下来。",
                    "effect": {
                        "energy": -10,
                        "meaning": 15,
                        "money": -5
                    },
                    "track": "challenge",
                    "passion": {
                        "explorer": 2
                    },
                    "cog": {
                        "n": 1,
                        "p": 1
                    }
                }
            ],
            "line": "student"
        },
        {
            "id": "stu02",
            "text": "你是社团负责人，换届前一个月，一家公司给了你实习机会。",
            "options": [
                {
                    "text": "留任做完这一年。这群人是我带出来的。",
                    "effect": {
                        "energy": -10,
                        "meaning": 15,
                        "money": -10
                    },
                    "track": "service",
                    "passion": {
                        "connector": 2
                    },
                    "cog": {
                        "e": 1,
                        "f": 1
                    }
                },
                {
                    "text": "退下来去实习。社团离了谁都转。",
                    "effect": {
                        "energy": 0,
                        "meaning": -5,
                        "money": 15
                    },
                    "track": "freedom",
                    "passion": {
                        "maker": 1
                    },
                    "cog": {
                        "t": 1,
                        "i": 1
                    }
                },
                {
                    "text": "两边都扛，能撑多久算多久。",
                    "effect": {
                        "energy": -20,
                        "meaning": 5,
                        "money": 5
                    },
                    "track": "challenge",
                    "passion": {
                        "performer": 1
                    },
                    "cog": {
                        "j": 1,
                        "e": 1
                    }
                }
            ],
            "line": "student"
        },
        {
            "id": "stu03",
            "text": "小组作业，队友随你挑。一个是大神但基本不跟人说话，一个跟你聊得来但要你带着做。",
            "options": [
                {
                    "text": "选大神。结果最重要，我宁愿少干活。",
                    "effect": {
                        "energy": 10,
                        "meaning": -5,
                        "money": 10
                    },
                    "track": "security",
                    "cog": {
                        "t": 1,
                        "j": 1
                    }
                },
                {
                    "text": "选聊得来的。这次分数我不是很在乎。",
                    "effect": {
                        "energy": -5,
                        "meaning": 10,
                        "money": -5
                    },
                    "track": "service",
                    "passion": {
                        "connector": 1
                    },
                    "cog": {
                        "f": 1,
                        "e": 1
                    }
                },
                {
                    "text": "选大神，但我主动负责跟他沟通那一块。",
                    "effect": {
                        "energy": -10,
                        "meaning": 10,
                        "money": 5
                    },
                    "track": "influence",
                    "passion": {
                        "performer": 1
                    },
                    "cog": {
                        "e": 1,
                        "t": 1
                    }
                }
            ],
            "line": "student"
        },
        {
            "id": "stu04",
            "text": "导师问你要不要接他的横向项目——钱给得不薄，但做的是重复的交付活。",
            "options": [
                {
                    "text": "接。先拿到钱和导师的信任，其他以后再说。",
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
                    "text": "婉拒，说想做自己的课题。",
                    "effect": {
                        "energy": 5,
                        "meaning": 20,
                        "money": -10
                    },
                    "track": "tech",
                    "passion": {
                        "explorer": 1
                    },
                    "cog": {
                        "i": 1,
                        "n": 1
                    }
                },
                {
                    "text": "接，但想办法把它改造成能发论文的东西。",
                    "effect": {
                        "energy": -15,
                        "meaning": 15,
                        "money": 10
                    },
                    "track": "challenge",
                    "passion": {
                        "maker": 2
                    },
                    "cog": {
                        "n": 1,
                        "p": 1
                    }
                }
            ],
            "line": "student"
        },
        {
            "id": "stu05",
            "text": "如果明天必须定下来，哪条路让你最不慌？",
            "options": [
                {
                    "text": "考公考编。确定性本身就是答案。",
                    "effect": {
                        "energy": 5,
                        "meaning": 0,
                        "money": 5
                    },
                    "track": "security",
                    "cog": {
                        "s": 1,
                        "j": 1
                    }
                },
                {
                    "text": "去竞争最激烈的地方。慌说明我在乎。",
                    "effect": {
                        "energy": -10,
                        "meaning": 10,
                        "money": 10
                    },
                    "track": "challenge",
                    "passion": {
                        "performer": 1
                    },
                    "cog": {
                        "e": 1,
                        "t": 1
                    }
                },
                {
                    "text": "先不定义自己，多试几条。",
                    "effect": {
                        "energy": 0,
                        "meaning": 5,
                        "money": -5
                    },
                    "track": "freedom",
                    "passion": {
                        "explorer": 1
                    },
                    "cog": {
                        "p": 1,
                        "n": 1
                    }
                },
                {
                    "text": "做点自己的东西，哪怕暂时不赚钱。",
                    "effect": {
                        "energy": 5,
                        "meaning": 15,
                        "money": -15
                    },
                    "track": "tech",
                    "passion": {
                        "maker": 2
                    },
                    "cog": {
                        "i": 1,
                        "p": 1
                    }
                }
            ],
            "line": "student"
        },
        {
            "id": "stu06",
            "text": "你的毕设在答辩上被外校评委当场夸。导师说这个方向是他组的，不算你独立成果。",
            "options": [
                {
                    "text": "当场把贡献说清楚，哪怕场面难看。",
                    "effect": {
                        "energy": -10,
                        "meaning": 15,
                        "money": -5
                    },
                    "track": "challenge",
                    "passion": {
                        "performer": 2
                    },
                    "cog": {
                        "e": 1,
                        "t": 1
                    }
                },
                {
                    "text": "算了，反正评委已经记住了我。",
                    "effect": {
                        "energy": 5,
                        "meaning": 5,
                        "money": 0
                    },
                    "track": "freedom",
                    "passion": {
                        "maker": 1
                    },
                    "cog": {
                        "p": 1,
                        "f": 1
                    }
                },
                {
                    "text": "私下找导师谈，让他下次带我署名。",
                    "effect": {
                        "energy": -5,
                        "meaning": 0,
                        "money": 10
                    },
                    "track": "influence",
                    "passion": {
                        "connector": 1
                    },
                    "cog": {
                        "j": 1,
                        "f": 1
                    }
                }
            ],
            "line": "student"
        },
        {
            "id": "stu07",
            "text": "唯一的公派名额，给了成绩差你一截、但跟院里关系近的同学。",
            "options": [
                {
                    "text": "去问个说法。规则就该写清楚。",
                    "effect": {
                        "energy": -10,
                        "meaning": 10,
                        "money": 0
                    },
                    "track": "challenge",
                    "passion": {
                        "performer": 1
                    },
                    "cog": {
                        "t": 1,
                        "e": 1
                    }
                },
                {
                    "text": "不问了，把精力放回自己能控制的事上。",
                    "effect": {
                        "energy": 0,
                        "meaning": 5,
                        "money": 0
                    },
                    "track": "tech",
                    "passion": {
                        "maker": 1
                    },
                    "cog": {
                        "i": 1,
                        "j": 1
                    }
                },
                {
                    "text": "真心替他高兴，也当面对他说了。",
                    "effect": {
                        "energy": -5,
                        "meaning": 10,
                        "money": 0
                    },
                    "track": "service",
                    "passion": {
                        "connector": 2
                    },
                    "cog": {
                        "f": 1,
                        "e": 1
                    }
                }
            ],
            "line": "student"
        },
        {
            "id": "stu08",
            "text": "实习单位想留你，条件比预期好，但岗位内容跟你读研的方向完全无关。",
            "options": [
                {
                    "text": "留下。真实的工作比再读三年值钱。",
                    "effect": {
                        "energy": 5,
                        "meaning": -5,
                        "money": 20
                    },
                    "track": "freedom",
                    "passion": {
                        "maker": 1
                    },
                    "cog": {
                        "p": 1,
                        "t": 1
                    }
                },
                {
                    "text": "拒绝，回去读书。方向比起点重要。",
                    "effect": {
                        "energy": -5,
                        "meaning": 15,
                        "money": -20
                    },
                    "track": "tech",
                    "passion": {
                        "explorer": 2
                    },
                    "cog": {
                        "i": 1,
                        "n": 1
                    }
                },
                {
                    "text": "先谈一个能兼顾的兼职安排。",
                    "effect": {
                        "energy": -15,
                        "meaning": 5,
                        "money": 10
                    },
                    "track": "influence",
                    "cog": {
                        "j": 1,
                        "e": 1
                    }
                }
            ],
            "line": "student"
        },
        {
            "id": "stu09",
            "text": "哪种课程考核方式最让你难受？",
            "options": [
                {
                    "text": "每次都是同一套作业的重复。",
                    "effect": {
                        "energy": -10,
                        "meaning": -10,
                        "money": 0
                    },
                    "track": "freedom",
                    "passion": {
                        "maker": 2
                    },
                    "cog": {
                        "n": 1,
                        "p": 1
                    }
                },
                {
                    "text": "只考背诵，不许你提出自己的看法。",
                    "effect": {
                        "energy": -10,
                        "meaning": -10,
                        "money": 0
                    },
                    "track": "tech",
                    "passion": {
                        "explorer": 2
                    },
                    "cog": {
                        "i": 1,
                        "n": 1
                    }
                },
                {
                    "text": "全程个人战，谁也不许帮谁。",
                    "effect": {
                        "energy": -10,
                        "meaning": -10,
                        "money": 0
                    },
                    "track": "service",
                    "passion": {
                        "connector": 2
                    },
                    "cog": {
                        "f": 1,
                        "e": 1
                    }
                },
                {
                    "text": "交上去就没了下文，没人告诉你做得怎么样。",
                    "effect": {
                        "energy": -10,
                        "meaning": -10,
                        "money": 0
                    },
                    "track": "influence",
                    "passion": {
                        "performer": 2
                    },
                    "cog": {
                        "e": 1,
                        "j": 1
                    }
                }
            ],
            "line": "student"
        },
        {
            "id": "stu10",
            "text": "你想转专业。家里说\"再读一年就毕业了，别折腾\"。",
            "options": [
                {
                    "text": "转。方向错了，越早止损越好。",
                    "effect": {
                        "energy": -5,
                        "meaning": 20,
                        "money": -15
                    },
                    "track": "freedom",
                    "passion": {
                        "explorer": 1
                    },
                    "cog": {
                        "n": 1,
                        "p": 1
                    }
                },
                {
                    "text": "不转，把想学的当自学方向。",
                    "effect": {
                        "energy": 5,
                        "meaning": -5,
                        "money": 5
                    },
                    "track": "security",
                    "passion": {
                        "maker": 1
                    },
                    "cog": {
                        "s": 1,
                        "j": 1
                    }
                },
                {
                    "text": "不转，但用辅修和作品证明我能做。",
                    "effect": {
                        "energy": -10,
                        "meaning": 10,
                        "money": 0
                    },
                    "track": "challenge",
                    "passion": {
                        "performer": 1
                    },
                    "cog": {
                        "t": 1,
                        "e": 1
                    }
                }
            ],
            "line": "student"
        },
        {
            "id": "stu11",
            "text": "你写的小工具被半个年级用着，但没人知道是谁做的。",
            "options": [
                {
                    "text": "挺好的，东西在跑就行。",
                    "effect": {
                        "energy": 5,
                        "meaning": 10,
                        "money": 0
                    },
                    "track": "tech",
                    "passion": {
                        "maker": 2
                    },
                    "cog": {
                        "i": 1,
                        "p": 1
                    }
                },
                {
                    "text": "发条说说清楚。我想让人记住我做的东西。",
                    "effect": {
                        "energy": 0,
                        "meaning": 5,
                        "money": 5
                    },
                    "track": "influence",
                    "passion": {
                        "performer": 2
                    },
                    "cog": {
                        "e": 1,
                        "j": 1
                    }
                },
                {
                    "text": "借这个机会组个队，把它做大。",
                    "effect": {
                        "energy": -10,
                        "meaning": 10,
                        "money": 5
                    },
                    "track": "challenge",
                    "passion": {
                        "connector": 1
                    },
                    "cog": {
                        "e": 1,
                        "t": 1
                    }
                }
            ],
            "line": "student"
        },
        {
            "id": "stu12",
            "text": "你在帮同学补一门你擅长的课。花掉的正好是你自己项目卡住的那晚。",
            "options": [
                {
                    "text": "继续讲完。他明天要考。",
                    "effect": {
                        "energy": -10,
                        "meaning": 15,
                        "money": 0
                    },
                    "track": "service",
                    "passion": {
                        "connector": 2
                    },
                    "cog": {
                        "f": 1,
                        "e": 1
                    }
                },
                {
                    "text": "道歉，回去赶自己的进度。",
                    "effect": {
                        "energy": 5,
                        "meaning": -10,
                        "money": 0
                    },
                    "track": "tech",
                    "passion": {
                        "maker": 1
                    },
                    "cog": {
                        "i": 1,
                        "t": 1
                    }
                },
                {
                    "text": "改成拉个群，让会的人一起讲。",
                    "effect": {
                        "energy": -5,
                        "meaning": 10,
                        "money": 0
                    },
                    "track": "influence",
                    "passion": {
                        "connector": 1
                    },
                    "cog": {
                        "j": 1,
                        "e": 1
                    }
                }
            ],
            "line": "student"
        },
        {
            "id": "stu13",
            "text": "毕业论文选题：一个热点方向，好发、老师熟、三个月能交；一个你真想搞懂的问题，可能三年出不来。",
            "options": [
                {
                    "text": "选热点。先拿到入场券。",
                    "effect": {
                        "energy": 5,
                        "meaning": -10,
                        "money": 10
                    },
                    "track": "security",
                    "cog": {
                        "s": 1,
                        "t": 1
                    }
                },
                {
                    "text": "选那个真想搞懂的。",
                    "effect": {
                        "energy": -15,
                        "meaning": 25,
                        "money": -10
                    },
                    "track": "tech",
                    "passion": {
                        "explorer": 2
                    },
                    "cog": {
                        "n": 1,
                        "i": 1
                    }
                },
                {
                    "text": "选热点的壳，把真问题塞进去。",
                    "effect": {
                        "energy": -10,
                        "meaning": 15,
                        "money": 5
                    },
                    "track": "challenge",
                    "passion": {
                        "maker": 1
                    },
                    "cog": {
                        "n": 1,
                        "p": 1
                    }
                }
            ],
            "line": "student"
        },
        {
            "id": "stu14",
            "text": "十年后的同学聚会上，你最希望别人用哪句话介绍你？",
            "options": [
                {
                    "text": "\"他做出来的东西一直在被人用。\"",
                    "effect": {
                        "energy": 0,
                        "meaning": 10,
                        "money": 0
                    },
                    "track": "tech",
                    "passion": {
                        "maker": 2
                    },
                    "cog": {
                        "i": 1,
                        "s": 1
                    }
                },
                {
                    "text": "\"他把一个很难的领域讲明白了。\"",
                    "effect": {
                        "energy": 0,
                        "meaning": 10,
                        "money": 5
                    },
                    "track": "influence",
                    "passion": {
                        "performer": 2
                    },
                    "cog": {
                        "e": 1,
                        "n": 1
                    }
                },
                {
                    "text": "\"很多人是他一手带出来的。\"",
                    "effect": {
                        "energy": 0,
                        "meaning": 10,
                        "money": 0
                    },
                    "track": "service",
                    "passion": {
                        "connector": 2
                    },
                    "cog": {
                        "f": 1,
                        "e": 1
                    }
                },
                {
                    "text": "\"他一直在换赛道，而且每次都成了。\"",
                    "effect": {
                        "energy": 0,
                        "meaning": 10,
                        "money": 10
                    },
                    "track": "challenge",
                    "passion": {
                        "explorer": 1
                    },
                    "cog": {
                        "p": 1,
                        "n": 1
                    }
                }
            ],
            "line": "student"
        },
        {
            "id": "stu15",
            "text": "哪种\"我很擅长\"，你听了更舒服？",
            "options": [
                {
                    "text": "\"我擅长把没人会做的东西做出来。\"",
                    "effect": {
                        "energy": 5,
                        "meaning": 10,
                        "money": 0
                    },
                    "track": "tech",
                    "passion": {
                        "maker": 2
                    },
                    "cog": {
                        "i": 1,
                        "p": 1
                    }
                },
                {
                    "text": "\"我擅长把复杂的东西拆到别人能懂。\"",
                    "effect": {
                        "energy": 0,
                        "meaning": 10,
                        "money": 5
                    },
                    "track": "influence",
                    "passion": {
                        "explorer": 1
                    },
                    "cog": {
                        "n": 1,
                        "t": 1
                    }
                },
                {
                    "text": "\"我擅长让一群人愿意一起干。\"",
                    "effect": {
                        "energy": -5,
                        "meaning": 15,
                        "money": 0
                    },
                    "track": "service",
                    "passion": {
                        "connector": 2
                    },
                    "cog": {
                        "e": 1,
                        "f": 1
                    }
                },
                {
                    "text": "\"我擅长在没人看好的时候证明我是对的。\"",
                    "effect": {
                        "energy": -10,
                        "meaning": 10,
                        "money": 10
                    },
                    "track": "challenge",
                    "passion": {
                        "performer": 1
                    },
                    "cog": {
                        "t": 1,
                        "n": 1
                    }
                }
            ],
            "line": "student"
        }
    ],
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
    },
    "crises": {
        "worker": [
            {
                "id": "cr01",
                "isCrisis": true,
                "text": "💥 突发！公司突然宣布组织架构调整，你所在的部门被整体列入裁员名单。HR 给你两个选择——",
                "timer": 12,
                "options": [
                    {
                        "text": "争取转岗到核心业务，从头再拼一次",
                        "effect": {
                            "energy": -15,
                            "meaning": 5,
                            "money": 0
                        },
                        "track": "challenge",
                        "passion": {
                            "performer": 1
                        },
                        "cog": {
                            "e": 1,
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "拿 N+3 赔偿体面离开，给自己一段缓冲",
                        "effect": {
                            "energy": 10,
                            "meaning": 0,
                            "money": -5
                        },
                        "track": "freedom",
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "i": 1,
                            "f": 1,
                            "p": 1
                        }
                    }
                ]
            },
            {
                "id": "cr02",
                "isCrisis": true,
                "text": "📞 突发！竞品 HR 深夜来电，开出双倍薪资挖你，但要求一周内到另一座城市报到。",
                "timer": 12,
                "options": [
                    {
                        "text": "接下 offer，去陌生城市重新开始",
                        "effect": {
                            "energy": -10,
                            "meaning": -5,
                            "money": 20
                        },
                        "track": "challenge",
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "e": 1,
                            "s": 1,
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "婉拒，留在熟悉的环境与人际里",
                        "effect": {
                            "energy": 5,
                            "meaning": 5,
                            "money": -10
                        },
                        "track": "security",
                        "passion": {
                            "connector": 1
                        },
                        "cog": {
                            "i": 1,
                            "n": 1,
                            "f": 1
                        }
                    }
                ]
            },
            {
                "id": "cr03",
                "isCrisis": true,
                "text": "🏥 突发！家人深夜突发疾病住院，需要有人陪床。接下来的日子，你的精力会被严重分割。",
                "timer": 13,
                "options": [
                    {
                        "text": "请假亲自照料，工作先放一放",
                        "effect": {
                            "energy": -12,
                            "meaning": 12,
                            "money": -5
                        },
                        "track": "service",
                        "passion": {
                            "connector": 2
                        },
                        "cog": {
                            "i": 1,
                            "f": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "请护工、靠远程维持工作节奏",
                        "effect": {
                            "energy": -8,
                            "meaning": -5,
                            "money": -10
                        },
                        "track": "security",
                        "cog": {
                            "e": 1,
                            "t": 1,
                            "p": 1
                        }
                    }
                ]
            },
            {
                "id": "cr04",
                "isCrisis": true,
                "text": "🔥 突发！你主导的项目出现重大数据事故，全公司都知道了。是扛下来，还是撇清？",
                "timer": 11,
                "options": [
                    {
                        "text": "主动站出来担责并带队补救",
                        "effect": {
                            "energy": -15,
                            "meaning": 10,
                            "money": 0
                        },
                        "track": "challenge",
                        "passion": {
                            "performer": 1
                        },
                        "cog": {
                            "e": 1,
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "低调撇清，先保住自己的绩效",
                        "effect": {
                            "energy": -5,
                            "meaning": -10,
                            "money": 5
                        },
                        "track": "security",
                        "cog": {
                            "i": 1,
                            "t": 1,
                            "p": 1
                        }
                    }
                ]
            },
            {
                "id": "cr05",
                "isCrisis": true,
                "text": "🩺 突发！年度体检报告写着「过劳预警」，医生严肃建议你立刻调整作息。",
                "timer": 12,
                "options": [
                    {
                        "text": "听从医嘱，规律作息、拒绝无效加班",
                        "effect": {
                            "energy": 18,
                            "meaning": 8,
                            "money": -8
                        },
                        "track": "security",
                        "cog": {
                            "i": 1,
                            "s": 1,
                            "f": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "先撑过这阵子，身体自己能扛",
                        "effect": {
                            "energy": -18,
                            "meaning": 0,
                            "money": 8
                        },
                        "track": "challenge",
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "e": 1,
                            "n": 1,
                            "t": 1,
                            "p": 1
                        }
                    }
                ]
            },
            {
                "id": "cr06",
                "isCrisis": true,
                "text": "🎰 突发！朋友拉你入场一个来钱极快的项目，但灰色地带、风险极高，还要你押上积蓄。",
                "timer": 11,
                "options": [
                    {
                        "text": "All in，赌一把大的",
                        "effect": {
                            "energy": -10,
                            "meaning": -8,
                            "money": 18
                        },
                        "track": "challenge",
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "e": 1,
                            "n": 1,
                            "p": 1
                        }
                    },
                    {
                        "text": "只做观察，守住本金与底线",
                        "effect": {
                            "energy": 0,
                            "meaning": 3,
                            "money": -2
                        },
                        "track": "security",
                        "cog": {
                            "i": 1,
                            "s": 1,
                            "t": 1,
                            "j": 1
                        }
                    }
                ]
            },
            {
                "id": "cr07",
                "isCrisis": true,
                "text": "😤 突发！新来的上司当众把你的方案贬得一文不值，并暗示「不换思路就换人」。",
                "timer": 12,
                "options": [
                    {
                        "text": "正面沟通，坚持自己的专业判断",
                        "effect": {
                            "energy": -8,
                            "meaning": 8,
                            "money": 0
                        },
                        "track": "influence",
                        "passion": {
                            "performer": 1,
                            "maker": 1
                        },
                        "cog": {
                            "e": 1,
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "先低头照做，保住眼前的位子",
                        "effect": {
                            "energy": -12,
                            "meaning": -6,
                            "money": 3
                        },
                        "track": "security",
                        "cog": {
                            "i": 1,
                            "f": 1,
                            "p": 1
                        }
                    }
                ]
            },
            {
                "id": "cr08",
                "isCrisis": true,
                "text": "🌪️ 突发！一纸政策下来，你所在的高薪赛道被一夜收紧，同行纷纷转行。",
                "timer": 12,
                "options": [
                    {
                        "text": "果断转型，去学一门全新的硬技能",
                        "effect": {
                            "energy": -10,
                            "meaning": 5,
                            "money": -5
                        },
                        "track": "tech",
                        "passion": {
                            "explorer": 1,
                            "maker": 1
                        },
                        "cog": {
                            "i": 1,
                            "n": 1,
                            "t": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "坚守原地，相信寒冬终会过去",
                        "effect": {
                            "energy": -5,
                            "meaning": -3,
                            "money": 2
                        },
                        "track": "security",
                        "cog": {
                            "i": 1,
                            "s": 1,
                            "f": 1
                        }
                    }
                ]
            }
        ],
        "student": [
            {
                "id": "crs01",
                "isCrisis": true,
                "timer": 12,
                "text": "💥 突发！保研规则半夜改了：绩点只占四成，新增\"科研成果\"打分。你绩点第二，论文零篇。",
                "options": [
                    {
                        "text": "两周内硬凑一篇出来，哪怕只是挂名",
                        "effect": {
                            "energy": -20,
                            "meaning": -10,
                            "money": 5
                        },
                        "track": "security",
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "j": 1,
                            "t": 1
                        }
                    },
                    {
                        "text": "放弃保研，把这两个月拿去准备出国或求职",
                        "effect": {
                            "energy": -5,
                            "meaning": 10,
                            "money": -10
                        },
                        "track": "freedom",
                        "passion": {
                            "maker": 1
                        },
                        "cog": {
                            "p": 1,
                            "e": 1
                        }
                    }
                ]
            },
            {
                "id": "crs02",
                "isCrisis": true,
                "timer": 11,
                "text": "💥 突发！导师把你做了大半年的成果拿去报项目，说你可以署个第三作者。",
                "options": [
                    {
                        "text": "接受。得罪他的代价你付不起",
                        "effect": {
                            "energy": -10,
                            "meaning": -20,
                            "money": 5
                        },
                        "track": "security",
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "i": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "谈条件：要么第一作者，要么撤稿",
                        "effect": {
                            "energy": -15,
                            "meaning": 15,
                            "money": -10
                        },
                        "track": "challenge",
                        "passion": {
                            "performer": 1
                        },
                        "cog": {
                            "e": 1,
                            "t": 1
                        }
                    }
                ]
            },
            {
                "id": "crs03",
                "isCrisis": true,
                "timer": 13,
                "text": "💥 突发！家里摊牌：不再供你读研，要么考公要么直接工作。",
                "options": [
                    {
                        "text": "先应下来，考公一年，边考边想清楚",
                        "effect": {
                            "energy": -5,
                            "meaning": -10,
                            "money": 10
                        },
                        "track": "security",
                        "passion": {
                            "connector": 1
                        },
                        "cog": {
                            "s": 1,
                            "j": 1
                        }
                    },
                    {
                        "text": "自己解决学费，把想读的方向读下去",
                        "effect": {
                            "energy": -20,
                            "meaning": 20,
                            "money": -20
                        },
                        "track": "freedom",
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "n": 1,
                            "p": 1
                        }
                    }
                ]
            },
            {
                "id": "crs04",
                "isCrisis": true,
                "timer": 12,
                "text": "💥 突发！实习公司的转正 offer 和研究生录取，同一天要你答复。转正岗位跟你读的方向完全无关。",
                "options": [
                    {
                        "text": "签转正。确定的收入比一个学位实在",
                        "effect": {
                            "energy": 5,
                            "meaning": -15,
                            "money": 20
                        },
                        "track": "security",
                        "passion": {
                            "maker": 1
                        },
                        "cog": {
                            "s": 1,
                            "t": 1
                        }
                    },
                    {
                        "text": "去读。有些窗口错过就没了",
                        "effect": {
                            "energy": -10,
                            "meaning": 15,
                            "money": -25
                        },
                        "track": "challenge",
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "n": 1,
                            "f": 1
                        }
                    }
                ]
            },
            {
                "id": "crs05",
                "isCrisis": true,
                "timer": 11,
                "text": "💥 突发！竞赛队友在比赛前两周集体退出，只剩你。交不上去，这半年白干。",
                "options": [
                    {
                        "text": "一个人做完，砍到只剩核心功能",
                        "effect": {
                            "energy": -25,
                            "meaning": 20,
                            "money": 0
                        },
                        "track": "challenge",
                        "passion": {
                            "maker": 1
                        },
                        "cog": {
                            "i": 1,
                            "p": 1
                        }
                    },
                    {
                        "text": "找别的队收留，哪怕只能打下手",
                        "effect": {
                            "energy": -5,
                            "meaning": -5,
                            "money": 5
                        },
                        "track": "service",
                        "passion": {
                            "connector": 1
                        },
                        "cog": {
                            "e": 1,
                            "f": 1
                        }
                    }
                ]
            },
            {
                "id": "crs06",
                "isCrisis": true,
                "timer": 12,
                "text": "💥 突发：你发现课题组一篇在投论文的数据像是拼的。通讯作者是导师，署名里没有你。",
                "options": [
                    {
                        "text": "匿名反映。这事不能装作没看见",
                        "effect": {
                            "energy": -15,
                            "meaning": 25,
                            "money": -15
                        },
                        "track": "challenge",
                        "passion": {
                            "explorer": 1
                        },
                        "cog": {
                            "i": 1,
                            "f": 1
                        }
                    },
                    {
                        "text": "什么都没说，但开始准备离开这个组",
                        "effect": {
                            "energy": -10,
                            "meaning": -15,
                            "money": 0
                        },
                        "track": "freedom",
                        "passion": {
                            "maker": 1
                        },
                        "cog": {
                            "n": 1,
                            "j": 1
                        }
                    }
                ]
            }
        ]
    }
};
