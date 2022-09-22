import { Stores } from '../../types/stores'
import { MockApi } from '../mockapi'

const response1 =
        {
            "dataDefinition": {
                "data": [],
                "meta": [],
                "resources": []
            },
            "_id": "631aefa5b9085d08feab3e65",
            "name": "Call",
            "description": "Make a Call",
            "tags": [
                "PARALLEL",
                "POWER",
                "CALL",
                "中文",
                "NEW"
            ],
            "modelDefinition": {
                "cellsinfo": {
                    "cells": [
                        {
                            "type": "uml.StartState",
                            "size": {
                                "width": 30,
                                "height": 30
                            },
                            "position": {
                                "x": 390,
                                "y": 30
                            },
                            "angle": 0,
                            "id": "10ef91c9-7373-481e-bd14-7224aaf663e8",
                            "z": 1,
                            "attrs": {
                                "circle": {
                                    "fill": "#4b4a67",
                                    "stroke": "none"
                                }
                            }
                        },
                        {
                            "type": "uml.EndState",
                            "size": {
                                "width": 30,
                                "height": 30
                            },
                            "position": {
                                "x": 420,
                                "y": 460
                            },
                            "angle": 0,
                            "id": "b0ecc23c-5eca-4509-8f4f-8030f069a494",
                            "z": 2,
                            "attrs": {
                                ".outer": {
                                    "stroke": "#4b4a67",
                                    "stroke-width": 2
                                },
                                ".inner": {
                                    "fill": "#4b4a67"
                                }
                            }
                        },
                        {
                            "type": "standard.Rectangle",
                            "position": {
                                "x": 640,
                                "y": 20
                            },
                            "size": {
                                "width": 160,
                                "height": 45
                            },
                            "angle": 0,
                            "id": "b3b8f2df-1f81-401b-8cf2-886f9d94056e",
                            "z": 3,
                            "attrs": {
                                "label": {
                                    "text": "777"
                                }
                            }
                        },
                        {
                            "type": "standard.Rectangle",
                            "position": {
                                "x": 60,
                                "y": 300
                            },
                            "size": {
                                "width": 160,
                                "height": 67.5
                            },
                            "angle": 0,
                            "id": "6f6c22b3-f9e9-4b9d-bc6a-c88f48782331",
                            "z": 3,
                            "attrs": {
                                "label": {
                                    "text": "车机端正常显示通话应用\n界面，包含通话记录、联\n系人、拨号"
                                }
                            }
                        },
                        {
                            "type": "standard.Rectangle",
                            "position": {
                                "x": 770,
                                "y": 280
                            },
                            "size": {
                                "width": 160,
                                "height": 45
                            },
                            "angle": 0,
                            "id": "83880359-8e0e-49a9-85f9-490b24215389",
                            "z": 3,
                            "attrs": {
                                "label": {
                                    "text": "简洁横幅通知取消浮窗回\n覆按钮"
                                }
                            }
                        },
                        {
                            "type": "standard.Rectangle",
                            "position": {
                                "x": 270,
                                "y": 530
                            },
                            "size": {
                                "width": 160,
                                "height": 85
                            },
                            "angle": 0,
                            "id": "7ff99c32-1931-4a91-97f7-472c15aeecd9",
                            "z": 3,
                            "attrs": {
                                "label": {
                                    "text": "adb shell getprop\nsys.iopgp.enable"
                                }
                            }
                        },
                        {
                            "type": "standard.Rectangle",
                            "position": {
                                "x": 90,
                                "y": 40
                            },
                            "size": {
                                "width": 160,
                                "height": 45
                            },
                            "angle": 0,
                            "id": "73279590-724b-497a-8b68-8ad33cd5195c",
                            "z": 3,
                            "attrs": {
                                "label": {
                                    "text": "55"
                                }
                            }
                        },
                        {
                            "type": "standard.Polygon",
                            "position": {
                                "x": 370,
                                "y": 110
                            },
                            "size": {
                                "width": 70,
                                "height": 45
                            },
                            "angle": 0,
                            "id": "a8e9c8b6-1ae1-432c-8d50-37a72bee1cb5",
                            "z": 4,
                            "attrs": {
                                "body": {
                                    "refPoints": "0,10 10,0 20,10 10,20",
                                    "fill": "#FCFCFC",
                                    "cursor": "grab"
                                },
                                "label": {
                                    "text": "x"
                                }
                            }
                        },
                        {
                            "type": "standard.Link",
                            "source": {
                                "id": "10ef91c9-7373-481e-bd14-7224aaf663e8"
                            },
                            "target": {
                                "id": "a8e9c8b6-1ae1-432c-8d50-37a72bee1cb5"
                            },
                            "router": {
                                "name": "manhattan"
                            },
                            "connector": {
                                "name": "rounded"
                            },
                            "id": "6133cf07-d1a7-4c1e-a3b2-963004228ceb",
                            "z": 6,
                            "attrs": {
                                "line": {
                                    "strokeWidth": 3
                                }
                            }
                        },
                        {
                            "type": "standard.Link",
                            "source": {
                                "id": "a8e9c8b6-1ae1-432c-8d50-37a72bee1cb5"
                            },
                            "target": {
                                "id": "b3b8f2df-1f81-401b-8cf2-886f9d94056e"
                            },
                            "router": {
                                "name": "manhattan"
                            },
                            "connector": {
                                "name": "rounded"
                            },
                            "id": "f6577dd7-2ada-40cd-8fa2-9b9eef6038b4",
                            "z": 8,
                            "labels": [
                                {
                                    "attrs": {
                                        "text": {
                                            "text": "yes"
                                        }
                                    }
                                }
                            ],
                            "attrs": {
                                "line": {
                                    "strokeWidth": 3
                                }
                            }
                        },
                        {
                            "type": "standard.Link",
                            "source": {
                                "id": "6f6c22b3-f9e9-4b9d-bc6a-c88f48782331"
                            },
                            "target": {
                                "id": "7ff99c32-1931-4a91-97f7-472c15aeecd9"
                            },
                            "router": {
                                "name": "manhattan"
                            },
                            "connector": {
                                "name": "rounded"
                            },
                            "id": "21af43e5-5aad-47ca-9836-07852becc546",
                            "z": 11,
                            "attrs": {
                                "line": {
                                    "strokeWidth": 3
                                }
                            }
                        },
                        {
                            "type": "standard.Link",
                            "source": {
                                "id": "7ff99c32-1931-4a91-97f7-472c15aeecd9"
                            },
                            "target": {
                                "id": "b0ecc23c-5eca-4509-8f4f-8030f069a494"
                            },
                            "router": {
                                "name": "manhattan"
                            },
                            "connector": {
                                "name": "rounded"
                            },
                            "id": "7a17a85b-8098-4b4c-a775-a259b4b9039b",
                            "z": 12,
                            "attrs": {
                                "line": {
                                    "strokeWidth": 3
                                }
                            }
                        },
                        {
                            "type": "standard.Link",
                            "source": {
                                "id": "83880359-8e0e-49a9-85f9-490b24215389"
                            },
                            "target": {
                                "id": "b0ecc23c-5eca-4509-8f4f-8030f069a494"
                            },
                            "router": {
                                "name": "manhattan"
                            },
                            "connector": {
                                "name": "rounded"
                            },
                            "id": "07575b8d-6205-43f8-a6cc-39cfe9b0d026",
                            "z": 13,
                            "labels": [
                                {
                                    "attrs": {
                                        "text": {
                                            "text": "yes"
                                        }
                                    }
                                }
                            ],
                            "attrs": {
                                "line": {
                                    "strokeWidth": 3
                                }
                            }
                        },
                        {
                            "type": "standard.Link",
                            "source": {
                                "id": "b3b8f2df-1f81-401b-8cf2-886f9d94056e"
                            },
                            "target": {
                                "id": "83880359-8e0e-49a9-85f9-490b24215389"
                            },
                            "router": {
                                "name": "manhattan"
                            },
                            "connector": {
                                "name": "rounded"
                            },
                            "id": "d8ddc08e-339e-4b73-ab7b-fcfcf43c9159",
                            "z": 14,
                            "attrs": {
                                "line": {
                                    "strokeWidth": 3
                                }
                            }
                        },
                        {
                            "type": "standard.Link",
                            "source": {
                                "id": "a8e9c8b6-1ae1-432c-8d50-37a72bee1cb5"
                            },
                            "target": {
                                "id": "73279590-724b-497a-8b68-8ad33cd5195c"
                            },
                            "router": {
                                "name": "manhattan"
                            },
                            "connector": {
                                "name": "rounded"
                            },
                            "id": "abee3742-ca54-43fc-b43a-49ed89694fa3",
                            "z": 15,
                            "labels": [
                                {
                                    "attrs": {
                                        "text": {
                                            "text": "no"
                                        }
                                    }
                                }
                            ],
                            "attrs": {
                                "line": {
                                    "strokeWidth": 3
                                }
                            }
                        },
                        {
                            "type": "standard.Link",
                            "source": {
                                "id": "73279590-724b-497a-8b68-8ad33cd5195c"
                            },
                            "target": {
                                "id": "6f6c22b3-f9e9-4b9d-bc6a-c88f48782331"
                            },
                            "router": {
                                "name": "manhattan"
                            },
                            "connector": {
                                "name": "rounded"
                            },
                            "id": "e4dd342d-fedb-4474-8062-db36467d9ee5",
                            "z": 16,
                            "attrs": {
                                "line": {
                                    "strokeWidth": 3
                                }
                            }
                        }
                    ]
                },
                "props": {
                    "9b3983b4-2c12-45a9-89b8-774b8ef1fa13": {
                        "props": {
                            "name": "OPPO_30",
                            "description": "开始播放5s",
                            "_id": "631fede107e97c70bd37cf4b",
                            "params": "",
                            "tags": "DEMO "
                        }
                    },
                    "b3b8f2df-1f81-401b-8cf2-886f9d94056e": {
                        "props": {
                            "name": "OPPO_32",
                            "description": "adb shell getprop sys.iopgp.enable",
                            "params": "",
                            "tags": "DEMO "
                        }
                    },
                    "83880359-8e0e-49a9-85f9-490b24215389": {
                        "props": {
                            "name": "OPPO_32",
                            "description": "adb shell getprop sys.iopgp.enable",
                            "params": "",
                            "tags": "DEMO "
                        }
                    },
                    "6f6c22b3-f9e9-4b9d-bc6a-c88f48782331": {
                        "props": {
                            "name": "OPPO_32",
                            "description": "adb shell getprop sys.iopgp.enable",
                            "params": "",
                            "tags": "DEMO "
                        }
                    },
                    "7ff99c32-1931-4a91-97f7-472c15aeecd9": {
                        "props": {
                            "name": "OPPO_32",
                            "description": "adb shell getprop sys.iopgp.enable",
                            "params": "",
                            "tags": "DEMO "
                        }
                    },
                    "73279590-724b-497a-8b68-8ad33cd5195c": {
                        "props": {
                            "name": "OPPO_32",
                            "description": "adb shell getprop sys.iopgp.enable",
                            "params": "",
                            "tags": "DEMO "
                        }
                    },
                    "f6577dd7-2ada-40cd-8fa2-9b9eef6038b4": {
                        "props": {
                            "label": "yes"
                        }
                    },
                    "abee3742-ca54-43fc-b43a-49ed89694fa3": {
                        "props": {
                            "label": "no"
                        }
                    },
                    "07575b8d-6205-43f8-a6cc-39cfe9b0d026": {
                        "props": {
                            "label": "yes"
                        }
                    }
                }
            }
        }

        let temparry =[]
        temparry.push(response1)

        const responses1 =
        {
            "offset": 0,
            "total": 1}
        Object.assign(responses1,{"data":temparry})
const mbtlist: Stores.mbt[] = [

    
    {
        "dataDefinition": {
            "data": [],
            "meta": [],
            "resources": []
        },
        "_id": "631aefa5b9085d08feab3e65",
        "name": "Call",
        "description": "Make a Call",
        "tags": [
            "PARALLEL",
            "POWER",
            "CALL",
            "中文",
            "NEW"
        ],
       
        "modelDefinition": {
            "cellsinfo": {
                "cells": [
                    {
                        "type": "uml.StartState",
                        "size": {
                            "width": 30,
                            "height": 30
                        },
                        "position": {
                            "x": 390,
                            "y": 30
                        },
                        "angle": 0,
                        "id": "10ef91c9-7373-481e-bd14-7224aaf663e8",
                        "z": 1,
                        "attrs": {
                            "circle": {
                                "fill": "#4b4a67",
                                "stroke": "none"
                            }
                        }
                    },
                    {
                        "type": "uml.EndState",
                        "size": {
                            "width": 30,
                            "height": 30
                        },
                        "position": {
                            "x": 420,
                            "y": 460
                        },
                        "angle": 0,
                        "id": "b0ecc23c-5eca-4509-8f4f-8030f069a494",
                        "z": 2,
                        "attrs": {
                            ".outer": {
                                "stroke": "#4b4a67",
                                "stroke-width": 2
                            },
                            ".inner": {
                                "fill": "#4b4a67"
                            }
                        }
                    },
                    {
                        "type": "standard.Rectangle",
                        "position": {
                            "x": 640,
                            "y": 20
                        },
                        "size": {
                            "width": 160,
                            "height": 180
                        },
                        "angle": 0,
                        "id": "b3b8f2df-1f81-401b-8cf2-886f9d94056e",
                        "z": 3,
                        "attrs": {
                            "label": {
                                "text": "音频通过高清音频通路进\n行播放（direct_pcm，lo\ngdump工\n具确认），且通过高清音\n频通路后音频数据类型为\n96khz（dumpsys media.\naudio_flinger指\n令确认），并且声音播放\n无杂音、卡顿和底噪等异\n常"
                            }
                        }
                    },
                    {
                        "type": "standard.Rectangle",
                        "position": {
                            "x": 60,
                            "y": 300
                        },
                        "size": {
                            "width": 160,
                            "height": 45
                        },
                        "angle": 0,
                        "id": "6f6c22b3-f9e9-4b9d-bc6a-c88f48782331",
                        "z": 3,
                        "attrs": {
                            "label": {
                                "text": "验证展开音量条音量侧键\n调节功能"
                            }
                        }
                    },
                    {
                        "type": "standard.Rectangle",
                        "position": {
                            "x": 770,
                            "y": 280
                        },
                        "size": {
                            "width": 160,
                            "height": 80
                        },
                        "angle": 0,
                        "id": "83880359-8e0e-49a9-85f9-490b24215389",
                        "z": 3,
                        "attrs": {
                            "label": {
                                "text": "长按通知工具---应用详情\n---通知管理---允许通知\n并勾选横幅"
                            }
                        }
                    },
                    {
                        "type": "standard.Rectangle",
                        "position": {
                            "x": 240,
                            "y": 360
                        },
                        "size": {
                            "width": 160,
                            "height": 180
                        },
                        "angle": 0,
                        "id": "7ff99c32-1931-4a91-97f7-472c15aeecd9",
                        "z": 3,
                        "attrs": {
                            "label": {
                                "text": "音频通过高清音频通路进\n行播放（direct_pcm，lo\ngdump工\n具确认），且通过高清音\n频通路后音频数据类型为\n96khz（dumpsys media.\naudio_flinger指\n令确认），并且声音播放\n无杂音、卡顿和底噪等异\n常"
                            }
                        }
                    },
                    {
                        "type": "standard.Rectangle",
                        "position": {
                            "x": 150,
                            "y": 160
                        },
                        "size": {
                            "width": 115,
                            "height": 115
                        },
                        "angle": 0,
                        "id": "73279590-724b-497a-8b68-8ad33cd5195c",
                        "z": 3,
                        "attrs": {
                            "label": {
                                "text": "第一条命令打印[p\nersist.\nsys.\noplus.\nosense.version]:\n[0]"
                            }
                        }
                    },
                    {
                        "type": "standard.Polygon",
                        "position": {
                            "x": 370,
                            "y": 110
                        },
                        "size": {
                            "width": 70,
                            "height": 45
                        },
                        "angle": 0,
                        "id": "a8e9c8b6-1ae1-432c-8d50-37a72bee1cb5",
                        "z": 4,
                        "attrs": {
                            "body": {
                                "refPoints": "0,10 10,0 20,10 10,20",
                                "fill": "#FCFCFC",
                                "cursor": "grab"
                            },
                            "label": {
                                "text": "x"
                            }
                        }
                    },
                    {
                        "type": "standard.Link",
                        "source": {
                            "id": "10ef91c9-7373-481e-bd14-7224aaf663e8"
                        },
                        "target": {
                            "id": "a8e9c8b6-1ae1-432c-8d50-37a72bee1cb5"
                        },
                        "router": {
                            "name": "manhattan"
                        },
                        "connector": {
                            "name": "rounded"
                        },
                        "id": "6133cf07-d1a7-4c1e-a3b2-963004228ceb",
                        "z": 6,
                        "attrs": {
                            "line": {
                                "strokeWidth": 3
                            }
                        }
                    },
                    {
                        "type": "standard.Link",
                        "source": {
                            "id": "a8e9c8b6-1ae1-432c-8d50-37a72bee1cb5"
                        },
                        "target": {
                            "id": "b3b8f2df-1f81-401b-8cf2-886f9d94056e"
                        },
                        "router": {
                            "name": "manhattan"
                        },
                        "connector": {
                            "name": "rounded"
                        },
                        "id": "f6577dd7-2ada-40cd-8fa2-9b9eef6038b4",
                        "z": 8,
                        "labels": [
                            {
                                "attrs": {
                                    "text": {
                                        "text": "yes"
                                    }
                                }
                            }
                        ],
                        "attrs": {
                            "line": {
                                "strokeWidth": 3
                            }
                        }
                    },
                    {
                        "type": "standard.Link",
                        "source": {
                            "id": "6f6c22b3-f9e9-4b9d-bc6a-c88f48782331"
                        },
                        "target": {
                            "id": "7ff99c32-1931-4a91-97f7-472c15aeecd9"
                        },
                        "router": {
                            "name": "manhattan"
                        },
                        "connector": {
                            "name": "rounded"
                        },
                        "id": "21af43e5-5aad-47ca-9836-07852becc546",
                        "z": 11,
                        "attrs": {
                            "line": {
                                "strokeWidth": 3
                            }
                        }
                    },
                    {
                        "type": "standard.Link",
                        "source": {
                            "id": "7ff99c32-1931-4a91-97f7-472c15aeecd9"
                        },
                        "target": {
                            "id": "b0ecc23c-5eca-4509-8f4f-8030f069a494"
                        },
                        "router": {
                            "name": "manhattan"
                        },
                        "connector": {
                            "name": "rounded"
                        },
                        "id": "7a17a85b-8098-4b4c-a775-a259b4b9039b",
                        "z": 12,
                        "attrs": {
                            "line": {
                                "strokeWidth": 3
                            }
                        }
                    },
                    {
                        "type": "standard.Link",
                        "source": {
                            "id": "83880359-8e0e-49a9-85f9-490b24215389"
                        },
                        "target": {
                            "id": "b0ecc23c-5eca-4509-8f4f-8030f069a494"
                        },
                        "router": {
                            "name": "manhattan"
                        },
                        "connector": {
                            "name": "rounded"
                        },
                        "id": "07575b8d-6205-43f8-a6cc-39cfe9b0d026",
                        "z": 13,
                        "labels": [
                            {
                                "attrs": {
                                    "text": {
                                        "text": "yes"
                                    }
                                }
                            }
                        ],
                        "attrs": {
                            "line": {
                                "strokeWidth": 3
                            }
                        }
                    },
                    {
                        "type": "standard.Link",
                        "source": {
                            "id": "b3b8f2df-1f81-401b-8cf2-886f9d94056e"
                        },
                        "target": {
                            "id": "83880359-8e0e-49a9-85f9-490b24215389"
                        },
                        "router": {
                            "name": "manhattan"
                        },
                        "connector": {
                            "name": "rounded"
                        },
                        "id": "d8ddc08e-339e-4b73-ab7b-fcfcf43c9159",
                        "z": 14,
                        "attrs": {
                            "line": {
                                "strokeWidth": 3
                            }
                        }
                    },
                    {
                        "type": "standard.Link",
                        "source": {
                            "id": "a8e9c8b6-1ae1-432c-8d50-37a72bee1cb5"
                        },
                        "target": {
                            "id": "73279590-724b-497a-8b68-8ad33cd5195c"
                        },
                        "router": {
                            "name": "manhattan"
                        },
                        "connector": {
                            "name": "rounded"
                        },
                        "id": "abee3742-ca54-43fc-b43a-49ed89694fa3",
                        "z": 15,
                        "labels": [
                            {
                                "attrs": {
                                    "text": {
                                        "text": "no"
                                    }
                                }
                            }
                        ],
                        "attrs": {
                            "line": {
                                "strokeWidth": 3
                            }
                        }
                    },
                    {
                        "type": "standard.Link",
                        "source": {
                            "id": "73279590-724b-497a-8b68-8ad33cd5195c"
                        },
                        "target": {
                            "id": "6f6c22b3-f9e9-4b9d-bc6a-c88f48782331"
                        },
                        "router": {
                            "name": "manhattan"
                        },
                        "connector": {
                            "name": "rounded"
                        },
                        "id": "e4dd342d-fedb-4474-8062-db36467d9ee5",
                        "z": 16,
                        "attrs": {
                            "line": {
                                "strokeWidth": 3
                            }
                        }
                    }
                ]
            },
            "props": {
                "9b3983b4-2c12-45a9-89b8-774b8ef1fa13": {
                    "props": {
                        "name": "OPPO_30",
                        "description": "开始播放5s",
                        "_id": "631fede107e97c70bd37cf4b",
                        "params": "",
                        "tags": "DEMO "
                    }
                },
                "b3b8f2df-1f81-401b-8cf2-886f9d94056e": {
                    "props": {
                        "name": "test55",
                        "description": "55",
                        "params": "file ",
                        "tags": "NEWONE TEST "
                    }
                },
                "83880359-8e0e-49a9-85f9-490b24215389": {
                    "props": {
                        "name": "OPPO_29",
                        "description": "长按通知工具---应用详情\n---通知管理---允许通知\n并勾选横幅",
                        "params": "",
                        "tags": "DEMO "
                    }
                },
                "6f6c22b3-f9e9-4b9d-bc6a-c88f48782331": {
                    "props": {
                        "name": "OPPO_28",
                        "description": "验证展开音量条音量侧键\n调节功能",
                        "params": "",
                        "tags": "DEMO "
                    }
                },
                "7ff99c32-1931-4a91-97f7-472c15aeecd9": {
                    "props": {
                        "name": "OPPO_36",
                        "description": "音频通过高清音频通路进行播放（direct_pcm，logdump工具确认），且通过高清音频通路后音频数据类型为96khz（dumpsys media.audio_flinger指令确认），并且声音播放无杂音、卡顿和底噪等异常",
                        "params": "",
                        "tags": "DEMO "
                    }
                },
                "73279590-724b-497a-8b68-8ad33cd5195c": {
                    "props": {
                        "name": "OPPO_31",
                        "description": "第一条命令打印[p\nersist.\nsys.\noplus.\nosense.version]:\n[0]",
                        "params": "",
                        "tags": "DEMO "
                    }
                },
                "f6577dd7-2ada-40cd-8fa2-9b9eef6038b4": {
                    "props": {
                        "label": "yes"
                    }
                },
                "abee3742-ca54-43fc-b43a-49ed89694fa3": {
                    "props": {
                        "label": "no"
                    }
                },
                "07575b8d-6205-43f8-a6cc-39cfe9b0d026": {
                    "props": {
                        "label": "yes"
                    }
                }
            }
        }
    }   
,
{
    _id:'uuid2',
    name: "camera",
    description: "Take photos when lock screen",
    tags: ["Camera", "OS"],
    // keep modelData open right now
    modelDefinition: {
        keytest: "value"
    },
    dataDefinition: {
        resources: [
            {
                name: "phone1",
                type: "sut"
            },
            {
                name: "phone2",
                type: "sut"
            }
        ],
        // static or dynamic(Pairwise), default is static
        dataType:  "number"
        ,
        // either use dataUrl or data
        dataUrl:  "http://localhost"

        ,
        data: [Object],
        // meta 
        metaTemplate:  "template{}",
        
        meta: [],
    }


},
{
    _id:'uuid3',
    name: "multimedia3",
    description: "Play multimedia files locally",
    tags: ["multimedia", "OS"],
    // keep modelData open right now
    modelDefinition: {
        keytest: "value"
    },
    dataDefinition: {
        resources: [
            {
                name: "phone1",
                type: "sut"
            },
            {
                name: "phone2",
                type: "sut"
            }
        ],
        // static or dynamic(Pairwise), default is static
        dataType: "number"
        ,
        // either use dataUrl or data
        dataUrl:  "http://localhost"

        ,
        data: [],
        // meta 
        metaTemplate: "",
        meta: [],
    }
}
,
{
    _id:'uuid4',
    name: "multimedia4",
    description: "Play multimedia throw wifi",
    tags: ["multimedia", "OS"],
    // keep modelData open right now
    modelDefinition: {
        keytest: "value"
    },
    dataDefinition: {
        resources: [
            {
                name: "phone1",
                type: "sut"
            },
            {
                name: "phone2",
                type: "sut"
            }
        ],
        // static or dynamic(Pairwise), default is static
        dataType: "number"
        ,
        // either use dataUrl or data
        dataUrl:  "http://localhost"

        ,
        data: [],
        // meta 
        metaTemplate: "",
        meta: [],
    }
}
,
{
    _id:'uuid5',
    name: "multimedia5",
    description: "Play multimedia files output by bluetooth",
    tags: ["multimedia", "OS"],
    // keep modelData open right now
    modelDefinition: {
        keytest: "value"
    },
    dataDefinition: {
        resources: [
            {
                name: "phone1",
                type: "sut"
            },
            {
                name: "phone2",
                type: "sut"
            }
        ],
        // static or dynamic(Pairwise), default is static
        dataType: "number"
        ,
        // either use dataUrl or data
        dataUrl:  "http://localhost"

        ,
        data: [],
        // meta 
        metaTemplate: "",
        meta: [],
    }
}
,
{
    _id:'uuid6',
    name: "multimedia6",
    description: "Play multimedia files  output by speaker",
    tags: ["multimedia", "OS"],
    // keep modelData open right now
    modelDefinition: {
        keytest: "value"
    },
    dataDefinition: {
        resources: [
            {
                name: "phone1",
                type: "sut"
            },
            {
                name: "phone2",
                type: "sut"
            }
        ],
        // static or dynamic(Pairwise), default is static
        dataType: "number"
        ,
        // either use dataUrl or data
        dataUrl:  "http://localhost"

        ,
        data: [],
        // meta 
        metaTemplate: "",
        meta: [],
    }
}
,
{
    _id:'uuid7',
    name: "multimedia7",
    description: "Play multimedia files output by earphone",
    tags: ["multimedia", "OS"],
    // keep modelData open right now
    modelDefinition: {
        keytest: "value"
    },
    dataDefinition: {
        resources: [
            {
                name: "phone1",
                type: "sut"
            },
            {
                name: "phone2",
                type: "sut"
            }
        ],
        // static or dynamic(Pairwise), default is static
        dataType: "number"
        ,
        // either use dataUrl or data
        dataUrl:  "http://localhost"

        ,
        data: [],
        // meta 
        metaTemplate: "",
        meta: [],
    }
}
,{
    _id:'uuid8',
    name: "Microphone8",
    description: "Recording voice call",
    tags: ["Microphone", "OS"],
    // keep modelData open right now
    modelDefinition: {
        keytest: "value"
    },
    dataDefinition: {
        resources: [
            {
                name: "phone1",
                type: "sut"
            },
            {
                name: "phone2",
                type: "sut"
            }
        ],
        // static or dynamic(Pairwise), default is static
        dataType: "number"
        ,
        // either use dataUrl or data
        dataUrl:  "http://localhost"

        ,
        data: [],
        // meta 
        metaTemplate: "",
        meta: [],
    }
}
,{
    _id:'uuid9',
    name: "Microphone",
    description: "Recording environment sounds",
    tags: ["Microphone", "OS"],
    // keep modelData open right now
    modelDefinition: {
        keytest: "value"
    },
    dataDefinition: {
        resources: [
            {
                name: "phone1",
                type: "sut"
            },
            {
                name: "phone2",
                type: "sut"
            }
        ],
        // static or dynamic(Pairwise), default is static
        dataType: "number"
        ,
        // either use dataUrl or data
        dataUrl:  "http://localhost"

        ,
        data: [],
        // meta 
        metaTemplate: "",
        meta: [],
    }



}]


export default <MockApi.obj[]>[
    {
        url: '/mbt-models',
        type: 'post',
        response: (options) => {
            const failRes: MockApi.response = {
                code: 500,
                msg: '生成mbt失败,重复记录',
                data: null
            }
            if (!options.body) return failRes
            const { name } = options.body
            const mbt = mbtlist.find(mbt => mbt.name === name)
            if (mbt ) return failRes
            return {
                code: 200,
                msg: 'Create Mbt Successfully',
                data: null
            }
        }
    },
    {
        url: '/mbt-models?page=1&perPage=5',
        type: 'get',
        response: {
            code: 200,
            msg: '获取mbt成功',
            data: mbtlist.slice(1,6)
        }
    },

    {
        url: '/mbt-models?search=*',
        type: 'get',
        response: (options) => {
            const failRes: MockApi.response = {
                code: 400,
                msg: '获取mbt失败',
                data: null
            }
            const mbt_name = options.url.slice(options.url.indexOf('/') + 1)
            console.log('mbt_name:',mbt_name);
            debugger
            if (!mbt_name) return failRes
            const mbt = mbtlist.find(mbt => mbt.name === mbt_name)
            if (mbt ) return failRes
            return {
                code: 200,
                msg: 'Get Mbt Successfully!!!',
                data: responses1
            }
        }
    },
    {
        
        url:'/mbt-models/*',
        type: 'get',
        response: (options) => {
            const failRes: MockApi.response = {
                code: 400,
                msg: '获取mbt失败',
                data: null
            }
            const mbt_id = options.url.slice(options.url.indexOf('/') + 1)
            
            if (!mbt_id) return failRes
            
            const mbt = mbtlist.find(mbt => mbt._id === mbt_id)
            if (mbt ) return failRes
            return {
                code: 200,
                msg: 'Get Mbt Successfully2',
                data: response1
            }
            

        }
    },
    {
        
        url:'/mbt-models/*',
        type: 'delete',
        response: (options) => {
            const failRes: MockApi.response = {
                code: 400,
                msg: '删除mbt失败',
                data: null
            }
            const mbt_id = options.url.slice(options.url.lastIndexOf('/') + 1)
            console.log('....mbt_id:',mbt_id);
            if (!mbt_id) return failRes
            
            const mbt = mbtlist.find(mbt => mbt._id === mbt_id)
            if (!mbt ) return failRes
            return {
                code: 200,
                msg: 'Delete Mbt Successfully',
                data: mbtlist.filter(mbt=>{
                    console.log('mbt:',mbt,"mbt.id",mbt._id,"mbt_id:",mbt_id)
                    if(mbt._id!=mbt_id) return mbt;
                })
            }
            

        }
    },
    {
        url: '/mbt-models',
        type: 'get',
        response: {
            code: 200,
            msg: '获取mbtlist成功',
            data: mbtlist
        }
    },

]

